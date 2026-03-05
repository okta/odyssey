import type { ASTPath, FileInfo, API as JSCodeshiftAPI } from "jscodeshift";

import { namedTypes } from "ast-types";

import { transformComponentUsage } from "./codemods/transformComponentUsage.js";
import {
  ComponentAlias,
  transformNamedImport,
} from "./codemods/transformNamedImport.js";
import { COMPONENT_MAPPINGS } from "./mappings/index.js";
import { MigrationOptions } from "./migrate.js";

type TransformOptions = Pick<MigrationOptions, "components" | "logger">;

/**
 * Main jscodeshift transformer for migrating contribution components.
 *
 * @param {FileInfo} fileInfo - The file information provided by jscodeshift.
 * @param {JSCodeshiftAPI} api - The jscodeshift API instance.
 * @param {TransformOptions} options - The transform options (component comma-separated list).
 * @param {Logger} logger - The logger function to emit warnings or errors during transformation.
 * @returns {string} The transformed source code.
 * @throws {Error} If required options are missing or no component mapping is found.
 */
export default function transformer(
  fileInfo: FileInfo,
  api: JSCodeshiftAPI,
  options: TransformOptions,
): string {
  const j = api.jscodeshift;

  if (!options.components) {
    throw new Error("Missing required option: components");
  }

  const componentKeys = options.components.split(",");

  let hasChanges = false;

  try {
    const fileRoot = j(fileInfo.source);

    for (const key of componentKeys) {
      const mapping = COMPONENT_MAPPINGS[key];
      if (!mapping) {
        throw new TypeError(`Missing component mapping for: ${key}`);
      }

      const { package: sourcePackage } = mapping.source;
      const { package: targetPackage } = mapping.target;

      const componentAliases: ComponentAlias[] = [];
      // Search for imports from every source package in the mapping.
      fileRoot
        .find(j.ImportDeclaration, {
          source: { value: sourcePackage },
        })
        .forEach((importPath: ASTPath<namedTypes.ImportDeclaration>) => {
          const { alias, modified } = transformNamedImport(
            j,
            fileRoot,
            targetPackage,
            mapping,
            importPath,
            options.logger,
          );

          if (alias) {
            componentAliases.push(alias);
          }
          if (modified) {
            hasChanges = true;
          }
        });

      // Replace JSX usage for each component alias.
      for (const { localName, targetLocalName } of componentAliases) {
        transformComponentUsage(
          j,
          fileRoot,
          mapping,
          localName,
          targetLocalName,
          options.logger,
        );
      }
    }

    // Only reprint the file if the transformer actually changed something.
    return hasChanges ? fileRoot.toSource() : fileInfo.source;
  } catch (error) {
    if (error instanceof TypeError) {
      throw error;
    }

    options.logger({
      message: `skipped ${fileInfo.path}: ${error instanceof Error ? error.message : String(error)}`,
      type: "warn",
    });
    return fileInfo.source;
  }
}

transformer.parser = "tsx";
