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

import * as t from "@babel/types";
import template from "@babel/template";
import type { Tokens } from "./compile";

interface ObjectExpressionArgs {
  tokens: Tokens;
  styles: string;
  digest: string;
}

interface ProxyVariableDeclarationArgs {
  name: string;
}

interface VariableDeclarationArgs extends ObjectExpressionArgs {
  name: string;
}

export function variableDeclaration({
  name,
  tokens,
  styles,
  digest,
}: VariableDeclarationArgs): t.VariableDeclaration {
  return t.variableDeclaration("const", [
    t.variableDeclarator(
      t.identifier(name),
      tokenObjectExpression({ tokens, styles, digest })
    ),
  ]);
}

export function identityObjectProxy(): t.NewExpression {
  return t.newExpression(t.identifier("Proxy"), [
    t.objectExpression([]),
    t.objectExpression([
      t.objectProperty(
        t.identifier("get"),
        t.functionExpression(
          null,
          [t.identifier("target"), t.identifier("key")],
          t.blockStatement([
            t.ifStatement(
              t.binaryExpression(
                "===",
                t.identifier("key"),
                t.stringLiteral("__esModule")
              ),
              t.blockStatement([t.returnStatement(t.booleanLiteral(false))])
            ),
            t.returnStatement(t.identifier("key")),
          ])
        )
      ),
    ]),
  ]);
}

export function identityObjectProxyVariableDeclaration({
  name,
}: ProxyVariableDeclarationArgs): t.VariableDeclaration {
  return t.variableDeclaration("const", [
    t.variableDeclarator(t.identifier(name), identityObjectProxy()),
  ]);
}

export function tokenObjectExpression({
  tokens,
  styles,
  digest,
}: ObjectExpressionArgs): t.ObjectExpression {
  const body = template.ast(`return \`${styles}\``) as t.ReturnStatement;

  return t.objectExpression([
    t.objectProperty(t.identifier("__digest"), t.stringLiteral(digest)),
    t.objectProperty(
      t.identifier("__template"),
      t.functionExpression(
        null,
        [t.identifier("theme")],
        t.blockStatement([body])
      )
    ),
    ...tokenObjectProperties(tokens),
  ]);
}

function tokenObjectProperties(tokens: Tokens): t.ObjectProperty[] {
  return Object.entries(tokens).map(([key, value]) =>
    t.objectProperty(t.stringLiteral(key), t.stringLiteral(value))
  );
}
