import type { Logger } from "@okta/odyssey-prompts";
import type { ExpressionKind } from "ast-types/lib/gen/kinds.js";

import { valueToNode } from "@babel/types";
import { namedTypes } from "ast-types";
import { Collection, JSCodeshift } from "jscodeshift";
import partition from "lodash.partition";
import { print as printAST } from "recast";

import { ComponentMapping } from "../mappings/index.js";
import {
  buildTargetAttributes,
  findEnclosingFunction,
  findUnstableDeps,
  isAttrWithExpressionContainer,
  resolveAttributes,
  resolveHookWrapping,
} from "./componentUtils.js";
import { findOrCreateImportDeclaration } from "./importUtils.js";

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
 *  → const availableLayouts = useMemo(() => ["table"], []);
 *  → <DT cols={cols} availableLayouts={availableLayouts} />
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

  // Track created hook declarations per scope to avoid duplicates.
  // Each base variable name (e.g. "getData") maps to a list of entries,
  // one per unique expression. Identical expressions reuse the same hoisted
  // variable; different expressions get a suffixed name (e.g. getData_2).
  type MemoEntry = {
    declaration: namedTypes.VariableDeclaration;
    expressionSource: string;
    hoistedName: string;
  };
  const memos = new Map<namedTypes.BlockStatement, Map<string, MemoEntry[]>>();
  let needsUseMemo = false;
  let needsUseCallback = false;

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

      const enclosingResult = findEnclosingFunction(j, elementPath);
      const shouldMemoize = enclosingResult.type === "block";

      // Build the target list of attributes and which can be memoized for this element.
      const { attrs: targetAttrs, memoizableNames } = buildTargetAttributes(
        j,
        resolvedAttrs,
        shouldMemoize,
      );

      if (shouldMemoize) {
        const { body: enclosingBody } = enclosingResult;
        // Build memo/callback declarations for this element's wrappable attributes.
        const memoDeclarations = targetAttrs.reduce(
          (acc, attr) => {
            // Only wrap attributes with expression values that reference variables.
            if (
              namedTypes.JSXIdentifier.check(attr.name) &&
              memoizableNames.has(attr.name.name) &&
              isAttrWithExpressionContainer(attr)
            ) {
              const baseVarName = attr.name.name;
              const expression = attr.value.expression;
              const hookStrategy = resolveHookWrapping(j, expression);

              if (hookStrategy) {
                const { hookName, callExpression, dependencies } = hookStrategy;
                const expressionSource = printAST(expression).code;
                const entries = acc.get(baseVarName) ?? [];
                const existingEntry = entries.find(
                  (entry) => entry.expressionSource === expressionSource,
                );

                if (existingEntry) {
                  // Identical expression already hoisted — reuse the variable.
                  logger({
                    type: "debug",
                    message: `Reusing existing ${hookName} for "${existingEntry.hoistedName}" in this scope`,
                  });
                  attr.value = j.jsxExpressionContainer(
                    j.identifier(existingEntry.hoistedName),
                  );
                } else {
                  // Check if baseVarName is already declared in the enclosing scope
                  // to avoid shadowing variables (e.g. const getData = ...).
                  const nameExistsInScope = enclosingBody.body.some(
                    (statement) =>
                      namedTypes.VariableDeclaration.check(statement) &&
                      statement.declarations.some(
                        (declaration) =>
                          namedTypes.VariableDeclarator.check(declaration) &&
                          namedTypes.Identifier.check(declaration.id) &&
                          declaration.id.name === baseVarName,
                      ),
                  );
                  const existingCount =
                    entries.length + (nameExistsInScope ? 1 : 0);
                  const hoistedName =
                    existingCount === 0
                      ? baseVarName
                      : `${baseVarName}_${existingCount + 1}`;

                  if (hookName === "useMemo") needsUseMemo = true;
                  if (hookName === "useCallback") needsUseCallback = true;

                  entries.push({
                    declaration: j.variableDeclaration("const", [
                      j.variableDeclarator(
                        j.identifier(hoistedName),
                        callExpression,
                      ),
                    ]),
                    expressionSource,
                    hoistedName,
                  });
                  acc.set(baseVarName, entries);

                  // Detect dependencies declared in the same scope with unstable initializers
                  // (inline arrays, objects, functions, or call expressions) that would
                  // cause the hook to re-compute on every render.
                  const unstableDeps = findUnstableDeps(
                    enclosingBody,
                    dependencies,
                  );

                  const hasUnstableDeps = unstableDeps.length > 0;
                  logger({
                    type: "warn",
                    message: {
                      title: `Created ${hookName} for "${hoistedName}"`,
                      details: [
                        `Verify type assertion (e.g., ${hookName}<Type>)`,
                        ...(hasUnstableDeps
                          ? [
                              `These properties [${unstableDeps.join(", ")}] need to be wrapped in useMemo/useCallback`,
                            ]
                          : []),
                      ],
                    },
                  });

                  attr.value = j.jsxExpressionContainer(
                    j.identifier(hoistedName),
                  );
                }
              } else {
                // Expression is not an object, array, or function (e.g., Identifier, NumericLiteral, TemplateLiteral)
                logger({
                  type: "debug",
                  message: `Skipped hook wrapping for "${attr.name.name}" - expression is a simple value`,
                });
              }
            } else {
              const attrName = namedTypes.JSXIdentifier.check(attr.name)
                ? attr.name.name
                : attr.name.type;

              // Warn when a bare identifier reference points to an unstable
              // declaration in the same scope (e.g. const onPress = () => ...).
              if (
                isAttrWithExpressionContainer(attr) &&
                namedTypes.Identifier.check(attr.value.expression) &&
                findUnstableDeps(enclosingBody, [attr.value.expression.name])
                  .length > 0
              ) {
                logger({
                  type: "warn",
                  message: {
                    title: `"${attrName}" references "${attr.value.expression.name}"`,
                    details: [
                      `These variables [${attr.value.expression.name}] need to be wrapped in useMemo/useCallback`,
                    ],
                  },
                });
              } else {
                logger({
                  type: "debug",
                  message: `Skipped useMemo for "${attrName}" - not memoizable or not an expression`,
                });
              }
            }
            return acc;
          },
          memos.get(enclosingBody) ?? new Map<string, MemoEntry[]>(),
        );
        memos.set(enclosingBody, memoDeclarations);
      } else {
        const message = `Kept inline arrays/objects/functions as-is - ${enclosingResult.type === "class" ? "hooks not available for class components" : "no block body for hooks"}`;
        logger({
          type: "warn",
          message,
        });
      }

      elementPath.value.attributes = [
        ...spreadAttrs,
        ...passthroughAttrs,
        ...targetAttrs,
      ];
    });

  if (needsUseCallback) {
    findOrCreateImportDeclaration(j, fileRoot, "react", {
      specifierName: "useCallback",
    });
  }
  if (needsUseMemo) {
    findOrCreateImportDeclaration(j, fileRoot, "react", {
      specifierName: "useMemo",
    });
  }

  // Insert collected memo declarations at the top of each function body,
  // after leading variable/function declarations. Hooks must be called
  // unconditionally before any early/conditional returns to satisfy the
  // Rules of Hooks.
  for (const [block, entries] of memos) {
    const declarations = [...entries.values()]
      .flat()
      .map((entry) => entry.declaration);

    if (declarations.length > 0) {
      const statements = block.body;
      const firstNonDeclarationIndex = statements.findIndex(
        (statement) =>
          !namedTypes.VariableDeclaration.check(statement) &&
          !namedTypes.FunctionDeclaration.check(statement),
      );
      const insertIndex =
        firstNonDeclarationIndex >= 0
          ? firstNonDeclarationIndex
          : statements.length;

      statements.splice(insertIndex, 0, ...declarations);
    }
  }
  // Rename closing tags.
  fileRoot
    .find(j.JSXClosingElement, {
      name: { type: "JSXIdentifier", name: localName },
    })
    .forEach((closingPath) => {
      closingPath.value.name = j.jsxIdentifier(targetLocalName);
    });
};
