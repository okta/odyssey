/*!
 * Copyright (c) 2021-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import type * as Babel from "@babel/core";
import * as BabelTypes from "@babel/types";

const getNodeModulePath = (filePath: string) => {
  if (
    filePath.startsWith(".") ||
    filePath.startsWith("/") ||
    filePath.endsWith(".js")
  ) {
    return null;
  }

  try {
    return require.resolve(filePath);
  } catch (error) {
    if (error instanceof Error && "code" in error) {
      const { code } = error as NodeJS.ErrnoException;

      if (
        code === "MODULE_NOT_FOUND" ||
        code === "ERR_PACKAGE_PATH_NOT_EXPORTED"
      ) {
        return null;
      }

      throw error;
    }
  }

  return false;
};

/**
 * Adds `/index.js` and `FILENAME.js` to imports that don't have it.
 *
 * It was originally added to files for us to be ESM-compliant, but this is now a manual process in Odyssey after adding `"type": "module"` to `package.json`. It now only adds it for library imports.
 *
 * We need to add `.js` extensions to library imports or Next.js and Vitest have issues loading modules outside of the Odyssey repo.
 */
export function plugin({
  types: babelTypes,
}: {
  types: typeof BabelTypes;
}): Babel.PluginObj {
  return {
    name: "fully-specified",
    visitor: {
      // @ts-expect-error Type annotations don't support multiple visitor "foo|bar|baz" syntactic sugar.
      "ImportDeclaration|ExportNamedDeclaration|ExportAllDeclaration": (
        path: Babel.NodePath<
          | BabelTypes.ImportDeclaration
          | BabelTypes.ExportNamedDeclaration
          | BabelTypes.ExportAllDeclaration
        >,
        state: Babel.PluginPass,
      ) => {
        if (!state.filename) {
          return;
        }

        if (path.node.type === "ImportDeclaration") {
          if (path.node.importKind === "type") {
            return;
          }
        } else {
          if (path.node.exportKind === "type") {
            return;
          }
        }

        const candidate = path.node.source?.value;

        if (!candidate) {
          return;
        }

        const nodeModulePath = getNodeModulePath(candidate);

        if (!nodeModulePath) {
          return;
        }

        const fullySpecifiedLiteral = babelTypes.stringLiteral(
          nodeModulePath.endsWith("/index.js")
            ? `${candidate}${candidate.endsWith("/") ? "" : "/"}index.js`
            : `${candidate}.js`,
        );

        switch (path.node.type) {
          case "ImportDeclaration": {
            path.replaceWith(
              babelTypes.importDeclaration(
                path.node.specifiers,
                fullySpecifiedLiteral,
              ),
            );

            return;
          }

          case "ExportNamedDeclaration": {
            path.replaceWith(
              babelTypes.exportNamedDeclaration(
                path.node.declaration,
                path.node.specifiers,
                fullySpecifiedLiteral,
              ),
            );

            return;
          }

          case "ExportAllDeclaration": {
            path.replaceWith(
              babelTypes.exportAllDeclaration(fullySpecifiedLiteral),
            );

            return;
          }

          default: {
            throw new Error("Invalid path node type for visitor!");
          }
        }
      },
    },
  };
}
