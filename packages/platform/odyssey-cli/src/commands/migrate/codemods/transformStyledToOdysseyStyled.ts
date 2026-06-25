/*!
 * Copyright (c) 2022-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import type { API, FileInfo } from "jscodeshift";

import { namedTypes } from "ast-types";
import partition from "lodash.partition";

import {
  findOrCreateImportDeclaration,
  getImportedSpecifierName,
} from "./importUtils.js";

const EMOTION_STYLED_SOURCE = "@emotion/styled";
const MUI_STYLES_SOURCE = "@mui/material/styles";
const TARGET_PACKAGE = "@okta/odyssey-react-mui";
const TARGET_EXPORT = "createOdysseyStyledComponent";
const ODYSSEY_TOKENS_PROP = "odysseyDesignTokens";

// Duck-typed shapes for TypeScript AST nodes that ast-types doesn't expose
// as named types. Type predicates verify at runtime; no `as` casts needed.
type TsTypeLiteralNode = { members: unknown[]; type: "TSTypeLiteral" };
type TsPropertySignatureNode = { key: unknown; type: "TSPropertySignature" };

// ast-types doesn't model TypeScript-specific fields on CallExpression (e.g.
// typeParameters). This alias makes the unavoidable widening cast explicit and
// localised rather than scattered throughout the code.
type CallExpressionWithTypeParams = namedTypes.CallExpression & {
  typeParameters?: TsTypeParameterInstantiationNode;
};

type TsTypeParameterInstantiationNode = { params: unknown[] };

const isTsTypeLiteral = (node: unknown): node is TsTypeLiteralNode =>
  typeof node === "object" &&
  node !== null &&
  (node as { type?: string }).type === "TSTypeLiteral";

const isTsPropertySignature = (
  node: unknown,
): node is TsPropertySignatureNode =>
  typeof node === "object" &&
  node !== null &&
  (node as { type?: string }).type === "TSPropertySignature";

/**
 * Returns `typeParameterInstantiation` with the `odysseyDesignTokens` property
 * removed from its first TSTypeLiteral param. Returns `null` when the resulting
 * type would be empty (was the only member), indicating the whole generic
 * should be dropped.
 */
const calculateTypeParamsWithoutOdysseyTokens = (
  typeParameterInstantiation:
    | TsTypeParameterInstantiationNode
    | null
    | undefined,
): TsTypeParameterInstantiationNode | null => {
  if (typeParameterInstantiation == null) return null;

  const firstParam = typeParameterInstantiation.params[0];
  if (!isTsTypeLiteral(firstParam)) return typeParameterInstantiation;

  const remainingMembers = firstParam.members.filter(
    (member) =>
      !(
        isTsPropertySignature(member) &&
        namedTypes.Identifier.check(member.key) &&
        member.key.name === ODYSSEY_TOKENS_PROP
      ),
  );

  if (remainingMembers.length === 0) return null;

  return {
    ...typeParameterInstantiation,
    params: [{ ...firstParam, members: remainingMembers }],
  };
};

export default function transformer(fileInfo: FileInfo, api: API): string {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);

  // Collect the local names bound to `styled` from any source package.
  const styledLocalNames = new Set<string>();

  // Step 1: Remove `styled` imports and record their local names.
  root.find(j.ImportDeclaration).forEach((importDeclarationPath) => {
    const sourceValue = importDeclarationPath.node.source.value;
    if (typeof sourceValue !== "string") return;

    if (sourceValue === EMOTION_STYLED_SOURCE) {
      // `import styled from "@emotion/styled"` — default import.
      const [defaultSpecifiers] = partition(
        importDeclarationPath.node.specifiers ?? [],
        (specifier) => namedTypes.ImportDefaultSpecifier.check(specifier),
      );

      defaultSpecifiers.forEach((defaultSpecifier) => {
        const localName = defaultSpecifier.local?.name;
        styledLocalNames.add(
          typeof localName === "string" ? localName : "styled",
        );
      });

      if (defaultSpecifiers.length > 0) {
        j(importDeclarationPath).remove();
      }
    } else if (sourceValue === MUI_STYLES_SOURCE) {
      // `import { styled } from "@mui/material/styles"` — named import.
      const [styledSpecifiers, remainingSpecifiers] = partition(
        importDeclarationPath.node.specifiers ?? [],
        (specifier): specifier is namedTypes.ImportSpecifier =>
          namedTypes.ImportSpecifier.check(specifier) &&
          getImportedSpecifierName(specifier) === "styled",
      );

      styledSpecifiers.forEach((styledSpecifier) => {
        const localName = styledSpecifier.local?.name;
        styledLocalNames.add(
          typeof localName === "string" ? localName : "styled",
        );
      });

      if (styledSpecifiers.length > 0) {
        if (remainingSpecifiers.length === 0) {
          j(importDeclarationPath).remove();
        } else {
          importDeclarationPath.node.specifiers = remainingSpecifiers;
        }
      }
    }
  });

  if (styledLocalNames.size === 0) return fileInfo.source;

  // Skip files that use tagged template literals — they require manual migration
  // because CSS string syntax can't be automatically converted to JS objects.
  const hasTaggedTemplateLiterals =
    root.find(j.TaggedTemplateExpression).filter((taggedTemplatePath) => {
      const templateTag = taggedTemplatePath.node.tag;
      if (namedTypes.MemberExpression.check(templateTag)) {
        return (
          namedTypes.Identifier.check(templateTag.object) &&
          styledLocalNames.has(templateTag.object.name)
        );
      }
      return (
        namedTypes.Identifier.check(templateTag) &&
        styledLocalNames.has(templateTag.name)
      );
    }).length > 0;

  if (hasTaggedTemplateLiterals) {
    process.stderr.write(
      `[migrate-styled] ${fileInfo.path}: tagged template literal — skipping, migrate manually\n`,
    );
    return fileInfo.source;
  }

  // Step 2: Add `createOdysseyStyledComponent` to the @okta/odyssey-react-mui import.
  findOrCreateImportDeclaration(j, root, TARGET_PACKAGE, {
    specifierName: TARGET_EXPORT,
  });

  // Step 3a: `styled("tag", opts)<Type>(styles)` → `createOdysseyStyledComponent({ tag: "tag", ...opts })(styles)`.
  // The outer CallExpression is the styles call; its callee is the inner call `styled("tag", opts)`.
  // Babel attaches `<Type>` type parameters to the outer call, not the inner.
  root.find(j.CallExpression).forEach((outerCallPath) => {
    const outerCallee = outerCallPath.node.callee;
    if (!namedTypes.CallExpression.check(outerCallee)) return;
    const innerCallee = outerCallee.callee;
    if (!namedTypes.Identifier.check(innerCallee)) return;
    if (!styledLocalNames.has(innerCallee.name)) return;

    const [tagArg, optionsArg] = outerCallee.arguments;
    if (!namedTypes.StringLiteral.check(tagArg)) return;

    // Merge `"tag"` and options into a single object arg: `{ tag: "tag", ...opts }`.
    const tagProperty = j.property("init", j.identifier("tag"), tagArg);
    const optionProperties = namedTypes.ObjectExpression.check(optionsArg)
      ? optionsArg.properties
      : [];
    const argsObject = j.objectExpression([tagProperty, ...optionProperties]);

    outerCallee.callee = j.identifier(TARGET_EXPORT);
    outerCallee.arguments = [argsObject];

    // Babel puts type parameters on the outer call — filter and write back.
    const outerNode = outerCallPath.node as CallExpressionWithTypeParams;
    outerNode.typeParameters =
      calculateTypeParamsWithoutOdysseyTokens(outerNode.typeParameters) ??
      undefined;
  });

  // Step 3b: `styled.tag<Type>(styles)` → `createOdysseyStyledComponent({ tag: "tag" })<Type>(styles)`.
  root.find(j.CallExpression).forEach((callExpressionPath) => {
    const calleeNode = callExpressionPath.node.callee;
    if (!namedTypes.MemberExpression.check(calleeNode)) return;
    if (!namedTypes.Identifier.check(calleeNode.object)) return;
    if (!styledLocalNames.has(calleeNode.object.name)) return;
    if (!namedTypes.Identifier.check(calleeNode.property)) return;

    const tagName = calleeNode.property.name;
    const styleArguments = callExpressionPath.node.arguments;

    const callNode = callExpressionPath.node as CallExpressionWithTypeParams;
    const filteredTypeParams = calculateTypeParamsWithoutOdysseyTokens(
      callNode.typeParameters,
    );

    const argsObject = j.objectExpression([
      j.property("init", j.identifier("tag"), j.literal(tagName)),
    ]);
    const innerCall = j.callExpression(j.identifier(TARGET_EXPORT), [
      argsObject,
    ]);
    const outerCall = j.callExpression(
      innerCall,
      styleArguments,
    ) as CallExpressionWithTypeParams;

    if (filteredTypeParams != null) {
      outerCall.typeParameters = filteredTypeParams;
    }

    callExpressionPath.replace(outerCall);
  });

  // Step 4: Remove `odysseyDesignTokens={...}` JSX attributes — no longer needed
  // after migration because createOdysseyStyledComponent auto-injects them from context.
  root.find(j.JSXAttribute, { name: { name: ODYSSEY_TOKENS_PROP } }).remove();

  return root.toSource({ quote: "double" });
}

transformer.parser = "tsx";
