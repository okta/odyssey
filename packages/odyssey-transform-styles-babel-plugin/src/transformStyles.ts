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
import type {
  VariableDeclaration,
  ObjectExpression,
  NewExpression,
} from "@babel/traverse/node_modules/@babel/types";
import type { File } from "./compile";
import { resolve, dirname } from "path";
import compileFactory from "./compileFactory";
import {
  tokenObjectExpression,
  variableDeclaration,
  identityObjectProxy,
  identityObjectProxyVariableDeclaration,
} from "./nodes";
import { normalizeOpts, shouldInclude } from "./normalizeOpts";

export interface TransformStylesOpts {
  include?: Array<string | RegExp>;
  identityObjectProxy: boolean;
}

export default function transformStyles({
  types: t,
}: typeof Babel): Babel.PluginObj {
  const fileMap = new Map<string, File>();
  const compile = compileFactory();

  return {
    name: "odyssey-transform-styles",

    visitor: {
      ImportDeclaration(path, state) {
        if (state.opts === false) {
          return;
        }
        const opts = normalizeOpts(state.opts);

        const importer = state?.file?.opts?.filename;
        if (typeof importer !== "string") {
          return;
        }

        const specifier = path.node.specifiers[0];
        if (!t.isImportDefaultSpecifier(specifier)) {
          return;
        }

        const importee = path.node.source.value;
        if (!shouldInclude(importee, opts.include)) {
          return;
        }

        if (opts.identityObjectProxy) {
          path.replaceWith(
            identityObjectProxyVariableDeclaration({
              name: specifier.local.name,
            }) as VariableDeclaration
          );

          return;
        }

        const filePath = resolve(dirname(importer), importee);
        let file = fileMap.get(filePath);

        if (!file) {
          file = compile({ filePath });
          fileMap.set(filePath, file);
        }

        path.replaceWith(
          variableDeclaration({
            name: specifier.local.name,
            ...file,
          }) as VariableDeclaration
        );
      },

      CallExpression(path, state) {
        if (state.opts === false) {
          return;
        }
        const opts = normalizeOpts(state.opts);

        const importer = state?.file?.opts?.filename;
        if (typeof importer !== "string") {
          return;
        }

        const callee = path.node.callee;
        if (!t.isIdentifier(callee)) {
          return;
        }
        if (callee.name !== "require") {
          return;
        }

        const argument = path.node.arguments[0];
        if (!t.isStringLiteral(argument)) {
          return;
        }
        const importee = argument.value;
        if (!shouldInclude(importee, opts.include)) {
          return;
        }

        if (opts.identityObjectProxy) {
          path.replaceWith(identityObjectProxy() as NewExpression);

          return;
        }

        const filePath = resolve(dirname(importer), importee);
        let file = fileMap.get(filePath);

        if (!file) {
          file = compile({ filePath });
          fileMap.set(filePath, file);
        }

        path.replaceWith(tokenObjectExpression(file) as ObjectExpression);
      },
    },
  };
}
