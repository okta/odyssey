import type { ExpressionKind } from "ast-types/lib/gen/kinds.js";

import { namedTypes } from "ast-types";
import { ASTPath, JSCodeshift } from "jscodeshift";
import partition from "lodash.partition";

import type { PropMapping } from "../mappings/index.js";
import type { Logger } from "../utils.js";

type ResolvedAttr = {
  targetPath: string;
  value: namedTypes.JSXAttribute["value"];
};

type ResolveAttributesResult = {
  /** Unmapped attributes preserved as-is (e.g. leading comments, data-/aria- attributes). */
  passthroughAttrs: namedTypes.JSXAttribute[];
  resolvedAttrs: ResolvedAttr[];
};

/**
 * Result of building target attributes from resolved props.
 */
type BuildTargetAttributesResult = {
  attrs: namedTypes.JSXAttribute[];
  memoizableNames: Set<string>;
};

/**
 *  Discriminated union describing the enclosing context of a JSX element for memoization purposes.
 */
type EnclosingFunctionResult =
  | { body: namedTypes.BlockStatement; type: "block" }
  | { type: "class" }
  | { type: "unsupported" };

/**
 * Type used to narrow id to Identifier rather than PatternKind in variable declarations.
 */
type TargetDeclarator = namedTypes.VariableDeclarator & {
  id: namedTypes.Identifier;
  init: ExpressionKind;
};

/**
 * Discriminated union returned by `classifyWrappableExpression` that carries
 * both the hook name and the narrowed expression type for useMemo vs useCallback.
 */
type WrappableExpression =
  | {
      expression: namedTypes.ObjectExpression | namedTypes.ArrayExpression;
      hookName: "useMemo";
    }
  | {
      expression:
        | namedTypes.ArrowFunctionExpression
        | namedTypes.FunctionExpression;
      hookName: "useCallback";
    };

/**
 * Result from resolveHookWrapping indicating how an expression
 * should be wrapped in a React hook.
 */
export type HookWrapping = {
  /** The fully built hook call expression node. */
  callExpression: namedTypes.CallExpression;
  dependencies: string[];
  hookName: "useMemo" | "useCallback";
};

/**
 * Type guard to identify AST nodes that are valid expressions for useMemo/useCallback values.
 */
const isExpression = (node: unknown): node is ExpressionKind =>
  namedTypes.Expression.check(node);

/**
 * Classifies an expression as wrappable by a React hook.
 *
 * - Objects / arrays → `useMemo`
 * - Arrow / function expressions → `useCallback`
 * - Everything else → `null` (no wrapping needed)
 */
const classifyWrappableExpression = (
  expr: unknown,
): WrappableExpression | null => {
  if (
    namedTypes.ObjectExpression.check(expr) ||
    namedTypes.ArrayExpression.check(expr)
  ) {
    return { hookName: "useMemo", expression: expr };
  }
  if (
    namedTypes.ArrowFunctionExpression.check(expr) ||
    namedTypes.FunctionExpression.check(expr)
  ) {
    return { hookName: "useCallback", expression: expr };
  }
  return null;
};

const findObjectProperty = (key: string, obj?: namedTypes.ObjectExpression) =>
  obj?.properties.find(
    (prop): prop is namedTypes.Property | namedTypes.ObjectProperty => {
      // Skip non-property nodes (SpreadElement, SpreadProperty, etc.)
      if (
        !namedTypes.Property.check(prop) &&
        !namedTypes.ObjectProperty.check(prop)
      ) {
        return false;
      }

      // Match identifier keys: { foo: ... }
      if (namedTypes.Identifier.check(prop.key)) {
        return prop.key.name === key;
      }

      // Match string literal keys: { "foo": ... }
      if (namedTypes.StringLiteral.check(prop.key)) {
        return prop.key.value === key;
      }

      return false;
    },
  );

/**
 * Unwraps a JSX attribute value to a raw AST expression.
 *
 * Boolean shorthand (value=null, e.g. <Comp hasX />) becomes explicit `true`.
 * JSXExpressionContainers are unwrapped to their inner expression.
 *
 * @param {JSCodeshift} j - The jscodeshift API instance.
 * @param {namedTypes.JSXAttribute["value"]} value - The JSX attribute value.
 * @returns {ExpressionKind} The unwrapped expression.
 */
const unwrapExpression = (
  j: JSCodeshift,
  value: namedTypes.JSXAttribute["value"],
): ExpressionKind => {
  if (
    namedTypes.JSXExpressionContainer.check(value) &&
    isExpression(value.expression)
  ) {
    return value.expression;
  }

  if (isExpression(value)) {
    return value;
  }

  // Boolean shorthand: <Comp hasX /> → true
  return j.booleanLiteral(true);
};

/**
 * Recursively walks a nested PropMapping alongside the source ObjectExpression,
 * extracting leaf values and producing resolved prop entries.
 *
 * At each level the mapping keys correspond to property names in the AST object.
 * - **string target (leaf)**: extracts the property value and emits a ResolvedProp.
 * - **object target (branch)**: expects a nested ObjectExpression and recurses.
 *
 * @param {JSCodeshift} j - The jscodeshift API instance.
 * @param {namedTypes.ObjectExpression} objectExpression - The current ObjectExpression AST node.
 * @param {Record<string, PropMapping>} sourceMapping - Nested mapping fragment mirroring the source structure.
 * @param {string} diagnosticPath - Dot-joined path for warning messages (e.g. "options.theme").
 * @param {Logger} logger - The logger function to emit warnings about missing properties or type mismatches.
 * @returns {ResolvedProp[]} Resolved entries with target paths and their corresponding values.
 *
 * @example
 *
 *  Given AST for `{ theme: { color: "red" } }` and mapping `{ theme: { color: "targetKey" } }`:
 *  resolveNestedSource(j, objExpr, mapping, "config")
 *  → [{ targetPath: "targetKey", value: JSXExpressionContainer("red") }]
 */
const resolveNestedSource = (
  j: JSCodeshift,
  objectExpression: namedTypes.ObjectExpression,
  sourceMapping: Record<string, PropMapping>,
  diagnosticPath: string,
  logger: Logger,
): ResolvedAttr[] =>
  Object.entries(sourceMapping).flatMap(([sourceKey, targetPath]) => {
    const sourceProperty = findObjectProperty(sourceKey, objectExpression);
    const fullPath = `${diagnosticPath}.${sourceKey}`;

    // Leaf: extract value and map to target path
    if (
      sourceProperty &&
      typeof targetPath === "string" &&
      isExpression(sourceProperty.value)
    ) {
      return [
        {
          targetPath,
          value: j.jsxExpressionContainer(sourceProperty.value),
        },
      ];
    }

    // Branch: recurse into nested object
    if (
      sourceProperty &&
      typeof targetPath !== "string" &&
      namedTypes.ObjectExpression.check(sourceProperty.value)
    ) {
      return resolveNestedSource(
        j,
        sourceProperty.value,
        targetPath,
        fullPath,
        logger,
      );
    }

    // All other cases: property missing, unsupported value type, or non-object where object expected
    const reason = !sourceProperty
      ? "was not found in the object expression"
      : typeof targetPath === "string"
        ? "has an unsupported value type"
        : "expected an object but got a different expression type";

    logger({
      type: "warn",
      message: `Skipped nested prop "${fullPath}" — ${reason}`,
    });
    return [];
  });

/**
 * Type guard to identify JSX attributes with expression containers.
 */
export const isAttrWithExpressionContainer = (
  attr: unknown,
): attr is namedTypes.JSXAttribute & {
  value: namedTypes.JSXExpressionContainer;
} =>
  namedTypes.JSXAttribute.check(attr) &&
  namedTypes.JSXExpressionContainer.check(attr.value);

/**
 * Resolves all JSX attributes through the propMap, producing an array of ResolvedProp entries.
 *
 * Handles three cases per propMap entry:
 * - **string value**: flat source → target mapping. Value is passed through as-is.
 * - **object value**: nested source extraction. Walks into the ObjectExpression
 *   to extract sub-properties.
 * - **Unmapped**: attribute has no propMap entry and is dropped.
 *
 * @param {JSCodeshift} j - The jscodeshift API instance.
 * @param {namedTypes.JSXAttribute[]} attrs - The JSX attributes from the opening element.
 * @param {ComponentPropMap} propMap - Source → target prop mappings.
 * @param {Logger} logger - The logger function to emit warnings about missing properties, type mismatches, or unmapped props.
 * @returns {ResolvedProp[]} Resolved entries with target paths and their corresponding values.
 *
 * @example
 *  Given <DataTable columns={cols} options={{ sort: true }} />
 *  with propMap: { columns: "cols", options: { sort: "layout.sort" } }
 *  resolveAttributes(j, attrs, propMap) → [
 *    { targetPath: "cols", value: {cols} },
 *    { targetPath: "layout.sort", value: {true} }
 *  ]
 */
export const resolveAttributes = (
  j: JSCodeshift,
  attrs: namedTypes.JSXAttribute[],
  propMap: Record<string, PropMapping>,
  logger: Logger,
): ResolveAttributesResult => {
  const resolvedAttrs: ResolvedAttr[] = [];
  const passthroughAttrs: namedTypes.JSXAttribute[] = [];

  for (const attr of attrs) {
    // Type Narrowing: only JSXAttribute has a name, so we can skip non-JSXAttribute nodes.
    // e.g. <DataTable xml:lang="en" /> → attr.name is JSXNamespacedName { namespace: "xml", name: "lang" }
    if (!namedTypes.JSXIdentifier.check(attr.name)) {
      // Skip non-identifier attribute names (e.g. JSXNamespacedName)
      logger({
        type: "warn",
        message: `Skipped "${attr.name.namespace.name}:${attr.name.name.name}" - unsupported attribute name type, verify manually`,
      });
      continue;
    }

    const attrName = attr.name.name;
    const mapping = propMap[attrName];
    if (mapping) {
      if (typeof mapping === "string") {
        // Flat mapping: source attr → target path
        // <DataTable label="hi" /> with propMap: { label: "title" } → resolvedAttrs.push({ targetPath: "title", value: attr.value })
        resolvedAttrs.push({ targetPath: mapping, value: attr.value });
      } else if (
        namedTypes.JSXExpressionContainer.check(attr.value) &&
        namedTypes.ObjectExpression.check(attr.value.expression)
      ) {
        // Nested source: extract sub-properties from object expression
        // <DataTable options={{ sort: true }} /> with propMap: { options: { sort: "layout.sort" } }
        resolvedAttrs.push(
          ...resolveNestedSource(
            j,
            attr.value.expression,
            mapping,
            attrName,
            logger,
          ),
        );
      } else {
        // If the value isn't an ObjectExpression, we can't extract individual properties.
        // <Component options={someVariable} /> or <Component options={getConfig()} />
        logger({
          type: "warn",
          message: `Kept "${attrName}" as-is - nested mapping expects an inline object, verify manually`,
        });
        resolvedAttrs.push({ targetPath: attrName, value: attr.value });
      }
    } else {
      // No mapping: handle passthrough or drop
      // Preserve unmapped props that have leading comments (e.g. // @ts-ignore, // eslint-disable-next-line)
      const hasLeadingComments =
        Array.isArray(attr.comments) &&
        attr.comments.some((comment) => comment.leading);
      // Preserve data- and aria- attributes
      const isDataAttr =
        attrName.startsWith("data-") || attrName.startsWith("aria-");

      if (hasLeadingComments || isDataAttr) {
        logger({
          type: "info",
          message: `Preserved "${attrName}" - unmapped but data/aria or has leading comments`,
        });
        passthroughAttrs.push(attr);
      } else {
        logger({
          type: "warn",
          message: `Dropped "${attrName}" - no mapping found`,
        });
      }
    }
  }

  return { resolvedAttrs, passthroughAttrs };
};

/**
 * Converts resolved props into final JSX attributes.
 *
 * Flat target paths become direct JSX attributes.
 * Dotted target paths (e.g. "tableLayoutOptions.columns") are grouped by
 * their top-level key and combined into a single JSX attribute with an
 * object expression value.
 *
 * If memoization is enabled, tracks which attributes have object/array
 * expression values for later memo creation.
 *
 * @param {JSCodeshift} j - The jscodeshift API instance.
 * @param {ResolvedProp[]} entries - The resolved prop entries.
 * @param {boolean} shouldMemoize - Whether to track memoizable attributes.
 * @returns {BuildTargetAttributesResult} The final JSX attributes and names to memoize.
 *
 * @example
 *  buildTargetAttributes(j, [
 *    { targetPath: "onRowSelectionChange", value: {handler} },
 *    { targetPath: "tableLayoutOptions.columns", value: {cols} },
 *    { targetPath: "tableLayoutOptions.hasSorting", value: null },
 *  ], true)
 *  → {
 *    attrs: [
 *      <JSXAttribute onRowSelectionChange={handler} />,
 *      <JSXAttribute tableLayoutOptions={{ columns: cols, hasSorting: true }} />
 *    ],
 *    memoizableNames: Set { "tableLayoutOptions" }
 *  }
 */
export const buildTargetAttributes = (
  j: JSCodeshift,
  entries: ResolvedAttr[],
  shouldMemoize: boolean = true,
): BuildTargetAttributesResult => {
  const [nested, flat] = partition(entries, ({ targetPath }) =>
    targetPath.includes("."),
  );

  // Returns { attr, memoizableName } where memoizableName is the targetPath if memoizable, else null.
  const flatAttrs = flat.map(({ targetPath, value }) => {
    const attr = j.jsxAttribute(j.jsxIdentifier(targetPath), value);
    // Only memoize flat attributes whose value is an expression container with an object or array expression, e.g. <Comp options={{ sort: true }} /> or <Comp items={myArray} />
    const isMemoizable =
      shouldMemoize &&
      isAttrWithExpressionContainer(attr) &&
      classifyWrappableExpression(attr.value.expression) !== null;

    return { attr, memoizableName: isMemoizable ? targetPath : null };
  });

  // Group nested props by top-level key so they merge into a single object attribute.
  // e.g. "tableLayoutOptions.columns" + "tableLayoutOptions.hasSorting" → tableLayoutOptions={{ columns, hasSorting }}
  const nestedGroups = new Map<string, namedTypes.Property[]>();

  for (const { targetPath, value } of nested) {
    // Nested prop: "tableLayoutOptions.columns" → topKey="tableLayoutOptions", propertyKey="columns"
    // Deeper:      "tableLayoutOptions.a.b"     → topKey="tableLayoutOptions", propertyKey="a", deepSegments=["b"]
    const [topKey, propertyKey, ...deepSegments] = targetPath.split(".");
    const expression = unwrapExpression(j, value);

    // Build nested object from inside out: ["b"] + expr → { b: expr }
    const propertyValue = deepSegments.reduceRight<ExpressionKind>(
      (acc, segment) =>
        j.objectExpression([j.property("init", j.identifier(segment), acc)]),
      expression,
    );

    const prop = j.property("init", j.identifier(propertyKey), propertyValue);

    // Enable shorthand syntax when key matches value: { columns: columns } → { columns }
    if (
      namedTypes.Identifier.check(propertyValue) &&
      propertyValue.name === propertyKey
    ) {
      prop.shorthand = true;
    }

    const existing = nestedGroups.get(topKey);
    if (existing) {
      existing.push(prop);
    } else {
      nestedGroups.set(topKey, [prop]);
    }
  }

  // All nested attributes are object expressions, so always memoizable if shouldMemoize is true.
  const nestedAttrs = Array.from(nestedGroups, ([topKey, properties]) => ({
    attr: j.jsxAttribute(
      j.jsxIdentifier(topKey),
      j.jsxExpressionContainer(j.objectExpression(properties)),
    ),
    memoizableName: shouldMemoize ? topKey : null,
  }));

  return [...nestedAttrs, ...flatAttrs].reduce<BuildTargetAttributesResult>(
    (acc, { attr, memoizableName }) => {
      acc.attrs.push(attr);
      if (memoizableName !== null) {
        acc.memoizableNames.add(memoizableName);
      }
      return acc;
    },
    {
      attrs: [],
      memoizableNames: new Set<string>(),
    },
  );
};

/**
 * Finds the nearest enclosing function for a JSX opening element and
 * classifies it so callers can decide how to handle memoization.
 *
 * - `"block"` — a regular function/arrow with a block body where `useMemo`
 *   declarations can be inserted.
 * - `"class"` — the nearest function is a class or object method
 *   (e.g. `render()`), where React hooks are invalid.
 * - `"unsupported"` — no enclosing function, or expression-bodied arrow
 *   (e.g. `() => <Comp />`), where we cannot insert declarations.
 *
 * @param {JSCodeshift} j - The jscodeshift API instance.
 * @param {ASTPath<namedTypes.JSXOpeningElement>} path - Path to the JSX opening element.
 * @returns {EnclosingFunctionResult} Discriminated result describing the enclosing context.
 *
 * @example
 *  function App() { return <DataView />; }
 *  findEnclosingFunction(...) → { type: "block", body: BlockStatement }
 *
 *  const App = () => <DataView />;
 *  findEnclosingFunction(...) → { type: "unsupported" }
 *
 *  class App extends Component { render() { return <DataView />; } }
 *  findEnclosingFunction(...) → { type: "class" }
 */
export const findEnclosingFunction = (
  j: JSCodeshift,
  path: ASTPath<namedTypes.JSXOpeningElement>,
): EnclosingFunctionResult => {
  const closestCollection = j(path).closest(j.Function);

  if (closestCollection.size() > 0) {
    const node = closestCollection.nodes()[0];

    // Class methods (e.g. render()) and object methods cannot use hooks
    if (
      namedTypes.ClassMethod.check(node) ||
      namedTypes.ObjectMethod.check(node)
    ) {
      return { type: "class" };
    }

    // Only block-bodied functions can receive inserted declarations.
    if (j.Function.check(node) && j.BlockStatement.check(node.body)) {
      return { type: "block", body: node.body };
    }
  }

  return { type: "unsupported" };
};

/**
 * Checks if an expression is an unstable reference — one that creates a new
 * identity on every render. Covers object literals, array literals, arrow
 * functions, function expressions, and bare function calls (e.g. `getConfig()`).
 */
const isUnstableInitializer = (node: unknown): boolean =>
  classifyWrappableExpression(node) !== null ||
  namedTypes.CallExpression.check(node);

/**
 * Given a function body and a list of dependency names, finds which of those
 * dependencies are declared in the same scope with an unstable initializer (inline
 * object, array, function, or call expression). These will cause the
 * useMemo/useCallback to re-compute on every render.
 *
 * Only inspects top-level variable declarations in the enclosing body —
 * does not chase through nested scopes or aliases.
 *
 * @param {namedTypes.BlockStatement} enclosingBody - The function body to search.
 * @param {string[]} depNames - The dependency names to check.
 * @returns {string[]} Dependency names whose declarations have unstable initializers.
 *
 * @example
 *  Given function body containing: const columns = [col1, col2];
 *  findUnstableDeps(body, ["columns", "onChange"]) → ["columns"]
 */
export const findUnstableDeps = (
  enclosingBody: namedTypes.BlockStatement,
  depNames: string[],
): string[] => {
  if (depNames.length === 0) {
    return [];
  }

  const targetNames = new Set(depNames);

  return enclosingBody.body
    .filter((node) => namedTypes.VariableDeclaration.check(node))
    .flatMap(
      (statement: namedTypes.VariableDeclaration) => statement.declarations,
    )
    .filter(
      (declarator): declarator is TargetDeclarator =>
        // Type guard to ensure we have an Identifier id and an init expression to check for instability
        namedTypes.VariableDeclarator.check(declarator) &&
        namedTypes.Identifier.check(declarator.id) &&
        targetNames.has(declarator.id.name) &&
        declarator.init !== null &&
        isUnstableInitializer(declarator.init),
    )
    .map((declarator) => declarator.id.name);
};

/**
 * Collects unique identifier names that represent variable references
 * within an AST subtree, applying standard scope-aware filtering.
 *
 * Excludes identifiers that are:
 * - Non-computed object property keys (`{ key: value }` — keeps `value` but not `key`)
 * - Non-computed member expression properties (`obj.prop` — keeps `obj` but not `prop`)
 *
 * An optional `excludeNames` set can be provided to skip specific names
 * (e.g. function parameter names for useCallback deps).
 *
 * @param {JSCodeshift} j - The jscodeshift API instance.
 * @param {unknown} root - The AST node to search within.
 * @param {Set<string>} [excludeNames] - Identifier names to exclude from results.
 * @returns {string[]} Unique identifier names found in value positions.
 */
const collectIdentifierDeps = (
  j: JSCodeshift,
  root: namedTypes.ASTNode | namedTypes.ASTNode[],
  excludeNames?: Set<string>,
): string[] => {
  // j().find() only searches descendants, not the root node itself.
  // When the root IS a bare Identifier (e.g. expression-bodied arrow `() => rows`),
  // short-circuit and return it directly.
  if (!Array.isArray(root) && namedTypes.Identifier.check(root)) {
    return excludeNames?.has(root.name) ? [] : [root.name];
  }

  const deps = new Set(
    j(root)
      .find(j.Identifier)
      .filter((path: ASTPath<namedTypes.Identifier>): boolean => {
        if (excludeNames?.has(path.node.name)) {
          return false;
        }

        if (
          !path.parentPath ||
          typeof path.parentPath !== "object" ||
          !("value" in path.parentPath)
        ) {
          throw new Error("Invalid AST path: parentPath missing or malformed");
        }
        const parent = (path.parentPath as ASTPath<namedTypes.Node>).value;

        // Check if identifier is part of an object/array property: { key: value } or { key }
        if (j.Property.check(parent) || j.ObjectProperty.check(parent)) {
          // Include if it's a value (key !== path) OR if it's a shorthand/computed key
          return (
            parent.key !== path.node ||
            parent.shorthand === true ||
            parent.computed === true
          );
          // Check if identifier is part of a member expression: obj.prop or obj[prop] or obj?.prop
        } else if (
          j.MemberExpression.check(parent) ||
          j.OptionalMemberExpression.check(parent)
        ) {
          // Include if it's the object being accessed or a computed property access.
          // In obj.prop, include 'obj' but not 'prop'. In obj[prop], include both 'obj' and 'prop'.
          return (
            parent.object === path.node ||
            (parent.computed === true && parent.property === path.node)
          );
        } else {
          return true;
        }
      })
      .paths()
      .map((path) => path.node.name),
  );

  return [...deps];
};

/**
 * Determines the appropriate React hook wrapping for an expression.
 *
 * - Objects/arrays → `useMemo(() => expr, [deps])`
 * - Arrow/function expressions → `useCallback(fn, [deps])`
 * - All other expressions → `null` (no wrapping needed)
 *
 * For useCallback, function parameter names are automatically excluded
 * from the dependency array since they are locally scoped.
 *
 * @param {JSCodeshift} j - The jscodeshift API instance.
 * @param {unknown} expression - The expression to analyze.
 * @returns {HookWrapping | null} Hook strategy or null if no wrapping is needed.
 */
export const resolveHookWrapping = (
  j: JSCodeshift,
  expression: unknown,
): HookWrapping | null => {
  const classified = classifyWrappableExpression(expression);
  if (!classified) return null;
  // For useCallback, exclude function parameter names from deps
  const excludeNames =
    classified.hookName === "useCallback"
      ? new Set(
          classified.expression.params.flatMap((param) =>
            // Handle both Identifier params and patterns (e.g. `{ param }`, `[param]`)
            namedTypes.Identifier.check(param)
              ? [param.name]
              : j(param)
                  .find(j.Identifier)
                  .nodes()
                  .map((id) => id.name),
          ),
        )
      : undefined;

  const depsRoot =
    classified.hookName === "useCallback"
      ? classified.expression.body
      : classified.expression;

  const dependencies = collectIdentifierDeps(j, depsRoot, excludeNames);

  return {
    hookName: classified.hookName,
    dependencies,
    callExpression: j.callExpression(j.identifier(classified.hookName), [
      classified.hookName === "useMemo"
        ? j.arrowFunctionExpression([], classified.expression)
        : classified.expression,
      j.arrayExpression(dependencies.map(j.identifier)),
    ]),
  };
};
