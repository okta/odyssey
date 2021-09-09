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

import * as t from '@babel/types';

export type Tokens = Record<string, string>;
export interface ObjectExpressionArgs {
  tokens: Tokens;
  styles: string,
  digest: string;
}

export interface VariableDeclarationArgs extends ObjectExpressionArgs {
  name: string,
}

export function variableDeclaration (
  { name, tokens, styles, digest }: VariableDeclarationArgs
): t.VariableDeclaration {
  return t.variableDeclaration(
    "const",
    [
      t.variableDeclarator(
        t.identifier(name),
        objectExpression({ tokens, styles, digest })
      )
    ]
  );
}

export function objectExpression (
  { tokens, styles, digest }: ObjectExpressionArgs
): t.ObjectExpression {
  const body = t.blockStatement([
    t.returnStatement(t.stringLiteral(styles))
  ]);

  return t.objectExpression([
    t.objectProperty(t.identifier('__digest'), t.stringLiteral(digest)),
    t.objectProperty(t.identifier('__template'), t.functionExpression(null, [], body)),
    ...tokenObjectProperties(tokens)
  ]);
}

function tokenObjectProperties (
  tokens: Tokens
): t.ObjectProperty[] {
  return Object.entries(tokens).map(([ key, value ]) => t.objectProperty(
    t.stringLiteral(key),
    t.stringLiteral(value)
  ));
}
