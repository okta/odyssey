import type { Logger } from "@okta/odyssey-prompts";

import { namedTypes } from "ast-types";
import { ASTPath, Collection, JSCodeshift } from "jscodeshift";
import partition from "lodash.partition";

import type { ComponentMapping } from "../mappings/types.js";

import {
  findOrCreateImportDeclaration,
  getImportedSpecifierName,
} from "./importUtils.js";

export type ComponentAlias = {
  localName: string;
  targetLocalName: string;
};

type ImportResult = {
  alias: ComponentAlias | null;
  modified: boolean;
};

/**
 * Transforms named import specifiers from the source module to the target module.
 *
 * NOTE: Type imports are always consolidated to inline `type` keyword syntax
 * (e.g. `import { type Foo }`) rather than standalone `import type { Foo }`.
 *
 *
 * @param {JSCodeshift} j - The jscodeshift API instance.
 * @param {Collection<unknown>} fileRoot - The root AST collection for the file.
 * @param {string} targetPackage - The target package to migrate imports to.
 * @param {ComponentMapping} mapping - The component mapping with target names and prop map.
 * @param {ASTPath<namedTypes.ImportDeclaration>} importPath - The AST path to the source import declaration.
 * @param {Logger} logger - The logger function to emit warnings or errors during transformation.
 * @returns {ImportResult} An object with the component alias (if found) and whether the AST was modified.
 *
 * @example
 *  import { DataTable as DT } from "@okta/contrib"
 *  → import { DataView as DT } from "@okta/odyssey"
 *  returns { alias: { localName: "DT", targetLocalName: "DT" }, modified: true }
 */
export const transformNamedImport = (
  j: JSCodeshift,
  fileRoot: Collection<unknown>,
  targetPackage: string,
  mapping: ComponentMapping,
  importPath: ASTPath<namedTypes.ImportDeclaration>,
  logger: Logger,
): ImportResult => {
  const { component: sourceComponent, propsType: sourcePropsType } =
    mapping.source;
  const { component: targetComponent, propsType: targetPropsType } =
    mapping.target;

  const [sourceSpecifiers, otherSpecifiers] = partition(
    importPath.value.specifiers,
    (specifier): specifier is namedTypes.ImportSpecifier => {
      // Type Narrowing: we only care about ImportSpecifier nodes.
      if (!j.ImportSpecifier.check(specifier)) return false;
      const importedName = getImportedSpecifierName(specifier);
      return (
        importedName === sourceComponent || importedName === sourcePropsType
      );
    },
  );

  if (sourceSpecifiers.length === 0) return { alias: null, modified: false };

  const targetImport = findOrCreateImportDeclaration(
    j,
    fileRoot,
    targetPackage,
  );

  // Always strip matched specifiers from the source import first.
  // e.g. import { DataTable, Button } from "@okta/odyssey-react-mui"
  //    → importPath.specifiers = [Button]  (DataTable removed before adding DataView)
  importPath.value.specifiers = otherSpecifiers;

  let componentAlias: ComponentAlias | null = null;
  for (const specifier of sourceSpecifiers) {
    const importedName = getImportedSpecifierName(specifier);
    const isType = importedName === sourcePropsType;
    // Use alias if exists, otherwise use the imported name.
    const sourceName = (specifier.local?.name ?? importedName) as string;
    if (!sourceName) {
      throw new Error("Unable to determine imported name for specifier");
    }
    const targetName = isType ? targetPropsType : targetComponent;

    const newSpecifier = {
      // create import specifier with alias if it exists
      ...j.importSpecifier(
        j.identifier(targetName),
        sourceName !== importedName ? j.identifier(sourceName) : null,
      ),
      // add `type` modifier for props specifiers
      ...(isType ? { importKind: "type" } : {}),
    };

    // sourceName differs from importedName when the source import uses an alias,
    // e.g. `Typography as WpTypography` — in that case we must add the aliased
    // specifier even when the unaliased target symbol already exists.
    const isAliased = sourceName !== importedName;

    const targetSpecifierExists = (targetImport.specifiers ?? []).some(
      (targetSpecifier) => {
        if (!j.ImportSpecifier.check(targetSpecifier)) return false;
        const name = getImportedSpecifierName(targetSpecifier);
        const localName = (targetSpecifier.local?.name ?? name) as string;
        if (isAliased) {
          // Adding { imported: targetName, local: sourceName }.
          // Skip only when the same local binding already exists to prevent
          // collisions or exact duplicates.
          return localName === sourceName;
        } else {
          // Adding { imported: targetName } (unaliased, binds to targetName).
          // Skip when the target already imports this symbol in any form.
          return name === targetName;
        }
      },
    );

    if (targetSpecifierExists) {
      logger({
        type: "warn",
        message: `Skipped "${targetName}" import — already present in target import`,
      });
      // The specifier already exists in the target, but JSX still references the
      // old source name. Capture the alias so the JSX rename step can rewrite it.
      // Both conditions must be true: type imports have no JSX to rewrite, and
      // aliased imports already bind to the correct local name.
      if (!isType && !isAliased) {
        componentAlias = {
          localName: sourceName,
          targetLocalName: targetComponent,
        };
      }
    } else {
      targetImport.specifiers = [
        ...(targetImport.specifiers ?? []),
        newSpecifier,
      ];

      // Capture the component (non-type) alias for JSX replacement.
      if (!isType) {
        componentAlias = {
          localName: sourceName,
          targetLocalName:
            sourceName !== sourceComponent ? sourceName : targetComponent,
        };
      }
    }
  }

  // Remove the source import if it's now empty and points to a different package.
  const isSameImport = importPath.value === targetImport;
  if (!isSameImport && otherSpecifiers.length === 0) {
    j(importPath).remove();
  }

  return { alias: componentAlias, modified: true };
};
