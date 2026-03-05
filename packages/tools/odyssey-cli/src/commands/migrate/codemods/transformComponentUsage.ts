import type { ExpressionKind } from "ast-types/lib/gen/kinds.js";

import { valueToNode } from "@babel/types";
import { namedTypes } from "ast-types";
import { Collection, JSCodeshift } from "jscodeshift";
import partition from "lodash.partition";

import {
  ComponentMapping,
  ComponentPropMap,
  PropMapping,
} from "../mappings/index.js";
import { Logger } from "../utils.js";

type ResolvedAttr = {
  targetPath: string;
  value: namedTypes.JSXAttribute["value"];
};

type ResolveAttributesResult = {
  /** Unmapped attributes preserved as-is (e.g. leading comments, data-/aria- attributes). */
  passthroughAttrs: namedTypes.JSXAttribute[];
  resolvedAttrs: ResolvedAttr[];
};

const isExpression = (node: unknown): node is ExpressionKind =>
  namedTypes.Expression.check(node);

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
      message: `nested source prop "${fullPath}" ${reason}, skipping`,
    });
    return [];
  });

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
const resolveAttributes = (
  j: JSCodeshift,
  attrs: namedTypes.JSXAttribute[],
  propMap: ComponentPropMap,
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
        message: `unsupported attribute name type for "${attr.name.namespace.name}:${attr.name.name.name}", skipping — verify manually`,
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
          message: `nested source prop "${attrName}" is not an inline object expression and could not be destructured, passing through as-is — verify manually`,
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
          message: `prop "${attrName}" has no mapping but has leading comments or is a data/aria attribute — preserved as-is`,
        });
        passthroughAttrs.push(attr);
      } else {
        logger({
          type: "warn",
          message: `prop "${attrName}" has no mapping and was dropped`,
        });
      }
    }
  }

  return { resolvedAttrs, passthroughAttrs };
};

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
 * Converts resolved props into final JSX attributes.
 *
 * Flat target paths become direct JSX attributes.
 * Dotted target paths (e.g. "tableLayoutOptions.columns") are grouped by
 * their top-level key and combined into a single JSX attribute with an
 * object expression value.
 *
 * @param {JSCodeshift} j - The jscodeshift API instance.
 * @param {ResolvedProp[]} entries - The resolved prop entries.
 * @returns {namedTypes.JSXAttribute[]} The final JSX attributes.
 *
 * @example
 *  buildTargetAttributes(j, [
 *    { targetPath: "onRowSelectionChange", value: {handler} },
 *    { targetPath: "tableLayoutOptions.columns", value: {cols} },
 *    { targetPath: "tableLayoutOptions.hasSorting", value: null },
 *  ])
 *  → [
 *    <JSXAttribute onRowSelectionChange={handler} />,
 *    <JSXAttribute tableLayoutOptions={{ columns: cols, hasSorting: true }} />
 *  ]
 */
const buildTargetAttributes = (
  j: JSCodeshift,
  entries: ResolvedAttr[],
): namedTypes.JSXAttribute[] => {
  const [nested, flat] = partition(entries, ({ targetPath }) =>
    targetPath.includes("."),
  );

  const flatAttrs = flat.map(({ targetPath, value }) =>
    j.jsxAttribute(j.jsxIdentifier(targetPath), value),
  );

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

  const nestedAttrs = Array.from(nestedGroups, ([topKey, properties]) =>
    j.jsxAttribute(
      j.jsxIdentifier(topKey),
      j.jsxExpressionContainer(j.objectExpression(properties)),
    ),
  );

  return [...nestedAttrs, ...flatAttrs];
};

/**
 * Transforms all JSX usages of a component: renames tags and remaps props.
 *
 * Finds all JSXOpeningElement/JSXClosingElement nodes matching the local name,
 * renames them to the target name, resolves attributes through the propMap,
 * injects default props (if not already present), groups nested targets,
 * and rebuilds the attribute list.
 *
 * @param {JSCodeshift} j - The jscodeshift API instance.
 * @param {Collection<unknown>} fileRoot - The root AST collection for the file.
 * @param {ComponentMapping} mapping - The component mapping with propMap and defaultProps.
 * @param {string} localName - The current local name of the component (may be an alias).
 * @param {string} targetLocalName - The new local name to use for the component.
 * @param {Logger} logger - The logger function to emit warnings or errors during transformation.
 * @returns {void}
 *
 * @example
 *  Given: <DT columns={cols} hasSearch />
 *  with propMap: { columns: "cols" }, defaultProps: { availableLayouts: ["table"] }
 *  → <DT cols={cols} availableLayouts={["table"]} />
 */
export const transformComponentUsage = (
  j: JSCodeshift,
  fileRoot: Collection<unknown>,
  mapping: ComponentMapping,
  localName: string,
  targetLocalName: string,
  logger: Logger,
): void => {
  const { propMap, defaultProps } = mapping;

  // Find all JSX elements that use the local name.
  fileRoot
    .find(j.JSXOpeningElement, {
      name: { type: "JSXIdentifier", name: localName },
    })
    .forEach((elementPath) => {
      // Rename the opening tag.
      elementPath.value.name = j.jsxIdentifier(targetLocalName);

      // Partition existing attributes into spread vs named.
      const [spreadAttrs, attrs] = partition(
        elementPath.value.attributes,
        (attr): attr is namedTypes.JSXSpreadAttribute =>
          namedTypes.JSXSpreadAttribute.check(attr),
      );

      const { resolvedAttrs, passthroughAttrs } = resolveAttributes(
        j,
        attrs,
        propMap,
        logger,
      );

      // Add defaults for target paths not already provided by user props.
      if (defaultProps) {
        const existingPaths = new Set(
          resolvedAttrs.map((attr) => attr.targetPath),
        );
        for (const [targetPath, value] of Object.entries(defaultProps)) {
          if (!existingPaths.has(targetPath)) {
            resolvedAttrs.push({
              targetPath,
              value: j.jsxExpressionContainer(
                // @babel/types type doesn't match ast-types, but are compatible at runtime.
                valueToNode(value) as ExpressionKind,
              ),
            });
          }
        }
      }

      elementPath.value.attributes = [
        ...spreadAttrs,
        ...passthroughAttrs,
        ...buildTargetAttributes(j, resolvedAttrs),
      ];
    });

  // Rename closing tags.
  fileRoot
    .find(j.JSXClosingElement, {
      name: { type: "JSXIdentifier", name: localName },
    })
    .forEach((closingPath) => {
      closingPath.value.name = j.jsxIdentifier(targetLocalName);
    });
};
