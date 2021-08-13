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

import type * as Babel from '@babel/core';
import type {
  VariableDeclaration,
  ObjectExpression
} from '@babel/traverse/node_modules/@babel/types';
import { resolve, dirname } from 'path';
import attachHook from './attachHook';
import { objectExpression, variableDeclaration } from './nodes';

export type FileMap = Map<string, { digest: string, styles: string }>

export default function transformScssModules (
  { types: t }: typeof Babel
): Babel.PluginObj {

  const fileMap: FileMap = new Map();

  return {
    name: 'transform-scss-modules',

    pre () {
      attachHook({ fileMap });
    },

    visitor: {
      ImportDeclaration (path, state) {
        const importer = state?.file?.opts?.filename;
        if (typeof importer !== 'string') { return; }

        const specifier = path.node.specifiers[0]
        if (!t.isImportDefaultSpecifier(specifier)) { return; }

        const importee = path.node.source.value
        if (!isScssModule(importee)) { return; }

        const resolvedPath = resolve(dirname(importer), importee);

        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const tokens = require(resolvedPath);
        const file = fileMap.get(resolvedPath);
        if (!file) { return }

        path.replaceWith(
          variableDeclaration({
            ...file,
            name: specifier.local.name,
            tokens
          }) as VariableDeclaration
        );
      },

      CallExpression (path, state) {
        const importer = state?.file?.opts?.filename;
        if (typeof importer !== 'string') { return; }

        const callee = path.node.callee
        if (!t.isIdentifier(callee)) { return }
        if (callee.name !== 'require') { return }

        const argument = path.node.arguments[0]
        if (!t.isStringLiteral(argument)) { return }
        const importee = argument.value
        if (!isScssModule(importee)) { return }

        const resolvedPath = resolve(dirname(importer), importee);

        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const tokens = require(resolvedPath);
        const file = fileMap.get(resolvedPath);
        if (!file) { return }

        path.replaceWith(
          objectExpression({
            ...file,
            tokens
          }) as ObjectExpression
        )
      }
    }
  };
}

function isScssModule (candidate: string) {
  return /\.module\.scss$/i.test(candidate)
}