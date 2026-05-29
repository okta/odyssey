import type { ASTPath, FileInfo, API as JSCodeshiftAPI } from "jscodeshift";

import { createScopedLogger } from "@okta/odyssey-prompts";
import { namedTypes } from "ast-types";

import { transformComponentUsage } from "./codemods/transformComponentUsage.js";
import {
  ComponentAlias,
  transformNamedImport,
} from "./codemods/transformNamedImport.js";
import { COMPONENT_MAPPINGS } from "./mappings/index.js";
import { MigrationOptions } from "./migrate.js";

type TransformOptions = Pick<
  MigrationOptions,
  "components" | "isCI" | "logger"
> & {
  odysseyVerbose?: boolean;
};

/**
 * Main jscodeshift transformer for migrating contribution components.
 *
 * @param {FileInfo} fileInfo - The file information provided by jscodeshift.
 * @param {JSCodeshiftAPI} api - The jscodeshift API instance.
 * @param {TransformOptions} options - The transform options (component comma-separated list).
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
  const logger = createScopedLogger({
    label: fileInfo.path,
    baseLogger: options.logger,
    isCI: options.isCI,
    verbose: options.odysseyVerbose,
  });

  try {
    const fileRoot = j(fileInfo.source);

    for (const key of componentKeys) {
      const mapping = COMPONENT_MAPPINGS[key];
      if (!mapping) {
        throw new TypeError(`Missing component mapping for: ${key}`);
      }

      const { packages: sourcePackages } = mapping.source;
      const { package: targetPackage } = mapping.target;

      const componentAliases: ComponentAlias[] = [];
      // Search for imports from every source package in the mapping.
      for (const sourcePackage of sourcePackages) {
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
              logger,
            );

            if (alias) {
              componentAliases.push(alias);
            }
            if (modified) {
              hasChanges = true;
            }
          });
      }

      // Replace JSX usage for each component alias.
      for (const { localName, targetLocalName } of componentAliases) {
        transformComponentUsage(
          j,
          fileRoot,
          mapping,
          localName,
          targetLocalName,
          logger,
        );
        hasChanges = true;
      }
    }

    // Only reprint the file if the transformer actually changed something.
    return hasChanges ? fileRoot.toSource() : fileInfo.source;
  } catch (error) {
    if (error instanceof TypeError) {
      throw error;
    }

    logger({
      message: `skipped: ${error instanceof Error ? error.message : String(error)}`,
      type: "debug",
    });
    return fileInfo.source;
  }
}

transformer.parser = "tsx";
