import type { Logger } from "@okta/odyssey-prompts";

import { namedTypes } from "ast-types";
import { ASTPath, Collection, JSCodeshift } from "jscodeshift";
import partition from "lodash.partition";

import { ComponentMapping } from "../mappings/index.js";
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

    const targetSpecifierExists = (targetImport.specifiers ?? []).some(
      (specifier) => {
        if (!j.ImportSpecifier.check(specifier)) return false;
        const name = getImportedSpecifierName(specifier);
        return name === targetName || specifier.local?.name === sourceName;
      },
    );

    if (targetSpecifierExists) {
      logger({
        type: "warn",
        message: `Skipped "${targetName}" import — already present (or alias "${sourceName}")`,
      });
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
