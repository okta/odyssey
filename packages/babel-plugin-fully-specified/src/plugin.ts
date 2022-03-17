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
import { resolve, extname, dirname } from "path";
import { existsSync, lstatSync } from "fs";

const isNodeModule = (candidate: string): boolean => {
  if (candidate.startsWith(".") || candidate.startsWith("/")) {
    return false;
  }

  try {
    require.resolve(candidate);
    return true;
  } catch (e) {
    if (e instanceof Error) {
      const error: NodeJS.ErrnoException = e;
      if (error.code == "MODULE_NOT_FOUND") return false;
      throw error;
    }
  }
  return false;
};

const skipModule = (candidate: string) =>
  !candidate.startsWith(".") ||
  isNodeModule(candidate) ||
  [".js", ".scss"].includes(extname(candidate));

export function plugin({
  types: t,
}: {
  types: typeof BabelTypes;
}): Babel.PluginObj {
  return {
    name: "fully-specified",
    visitor: {
      // @ts-expect-error type annotations don't support multiple visitor foo|bar|baz syntactic sugar
      "ImportDeclaration|ExportNamedDeclaration|ExportAllDeclaration": (
        path: Babel.NodePath<
          | BabelTypes.ImportDeclaration
          | BabelTypes.ExportNamedDeclaration
          | BabelTypes.ExportAllDeclaration
        >,
        state: Babel.PluginPass
      ): void => {
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
        if (skipModule(candidate)) {
          return;
        }

        const dirPath = resolve(dirname(state.filename), candidate);

        const fullySpecifiedLiteral = t.stringLiteral(
          existsSync(dirPath) && lstatSync(dirPath).isDirectory()
            ? `${candidate}${candidate.endsWith("/") ? "" : "/"}index.js`
            : `${candidate}.js`
        );

        switch (path.node.type) {
          case "ImportDeclaration":
            path.replaceWith(
              t.importDeclaration(path.node.specifiers, fullySpecifiedLiteral)
            );
            return;
          case "ExportNamedDeclaration":
            path.replaceWith(
              t.exportNamedDeclaration(
                path.node.declaration,
                path.node.specifiers,
                fullySpecifiedLiteral
              )
            );
            return;
          case "ExportAllDeclaration":
            path.replaceWith(t.exportAllDeclaration(fullySpecifiedLiteral));
            return;
          default:
            throw new Error("Invalid path node type for visitor!");
        }
      },
    },
  };
}
