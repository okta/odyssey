/*!
 * Copyright (c) 2026-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import type { ESLint, Rule } from "eslint";

import reactPerfPlugin from "eslint-plugin-react-perf";

// React decides whether a function is a component by its PascalCase name, so a leading capital is the same test React and the hooks rules apply. `render: function C()` in a story matches through its `C`.
const COMPONENT_NAME = /^[A-Z]/;

// The rules of hooks treat `use` followed by a capital as a hook, so `user` or `useless` is a plain function and stays out of render scope.
const HOOK_NAME = /^use[A-Z]/;

const RENDER_SCOPE_KINDS = {
  memoized: "memoized",
  notAFunction: "notAFunction",
  render: "render",
  unknown: "unknown",
} as const;

type RenderScopeKind =
  (typeof RENDER_SCOPE_KINDS)[keyof typeof RENDER_SCOPE_KINDS];

// Storybook calls a story's `render` as a component, so hooks are allowed in it whatever the function itself is named.
const STORY_RENDER_KEY = "render";

// Storybook's CSF files, the only place a `render` property is a story's render. `.mdx` is left out: it holds no story objects, only references to them.
const STORY_FILE_NAME = /\.stories\.[cm]?[jt]sx?$/;

const COMPONENT_WRAPPER_NAMES = ["forwardRef", "memo"];

// A value built inside a `useMemo` factory already keeps its identity until a dependency changes. `useCallback` is left out on purpose: its body runs on every call, so a render prop wrapped in it still creates new props each time it runs.
const MEMOIZING_HOOK_NAMES = ["useMemo"];

const FUNCTION_NODE_TYPES = [
  "ArrowFunctionExpression",
  "FunctionDeclaration",
  "FunctionExpression",
];

const getCalleeName = (callee: Rule.Node): string | undefined =>
  callee.type === "Identifier"
    ? callee.name
    : callee.type === "MemberExpression" &&
        callee.property.type === "Identifier"
      ? callee.property.name
      : undefined;

const getFunctionName = (functionNode: Rule.Node): string | undefined => {
  if (
    (functionNode.type === "FunctionDeclaration" ||
      functionNode.type === "FunctionExpression") &&
    functionNode.id
  ) {
    return functionNode.id.name;
  }

  const { parent } = functionNode;

  if (parent.type === "VariableDeclarator" && parent.id.type === "Identifier") {
    return parent.id.name;
  }

  if (
    (parent.type === "Property" || parent.type === "MethodDefinition") &&
    !parent.computed &&
    parent.key.type === "Identifier"
  ) {
    return parent.key.name;
  }

  return undefined;
};

const getCallbackOwnerName = (functionNode: Rule.Node): string | undefined =>
  functionNode.parent.type === "CallExpression" &&
  functionNode.parent.arguments[0] === functionNode
    ? getCalleeName(functionNode.parent.callee as Rule.Node)
    : undefined;

const isCallArgument = (functionNode: Rule.Node): boolean =>
  functionNode.parent.type === "CallExpression" &&
  functionNode.parent.arguments.some((argument) => argument === functionNode);

// A story or meta object is often wrapped in `satisfies Meta` or `as StoryObj`. ESLint's node types describe plain JavaScript, so these TypeScript-only kinds are matched as strings.
const TYPE_ASSERTION_NODE_TYPES: string[] = [
  "TSAsExpression",
  "TSSatisfiesExpression",
];

// A story or meta object sits at module scope, either exported directly or bound to a top-level `const`.
const getUnwrappedExpressionParent = (expression: Rule.Node): Rule.Node =>
  TYPE_ASSERTION_NODE_TYPES.includes(expression.parent.type)
    ? getUnwrappedExpressionParent(expression.parent)
    : expression.parent;

const isModuleLevelObject = (objectNode: Rule.Node): boolean => {
  const objectParent = getUnwrappedExpressionParent(objectNode);

  return (
    objectParent.type === "ExportDefaultDeclaration" ||
    (objectParent.type === "VariableDeclarator" &&
      objectParent.parent.type === "VariableDeclaration" &&
      (objectParent.parent.parent.type === "Program" ||
        (objectParent.parent.parent.type === "ExportNamedDeclaration" &&
          objectParent.parent.parent.parent.type === "Program")))
  );
};

export type IsStoryRenderArgs = {
  filename: string;
  functionNode: Rule.Node;
};

const isStoryRender = ({ filename, functionNode }: IsStoryRenderArgs) =>
  STORY_FILE_NAME.test(filename) &&
  functionNode.parent.type === "Property" &&
  functionNode.parent.value === functionNode &&
  !functionNode.parent.computed &&
  functionNode.parent.key.type === "Identifier" &&
  functionNode.parent.key.name === STORY_RENDER_KEY &&
  isModuleLevelObject(functionNode.parent.parent);

export type GetRenderScopeKindArgs = {
  filename: string;
  node: Rule.Node;
};

const getRenderScopeKind = ({
  filename,
  node,
}: GetRenderScopeKindArgs): RenderScopeKind => {
  if (!FUNCTION_NODE_TYPES.includes(node.type)) {
    return RENDER_SCOPE_KINDS.notAFunction;
  }

  const functionName = getFunctionName(node) ?? "";
  const callbackOwnerName = getCallbackOwnerName(node) ?? "";

  if (MEMOIZING_HOOK_NAMES.includes(callbackOwnerName)) {
    return RENDER_SCOPE_KINDS.memoized;
  }

  return COMPONENT_NAME.test(functionName) ||
    HOOK_NAME.test(functionName) ||
    isStoryRender({ filename, functionNode: node }) ||
    COMPONENT_WRAPPER_NAMES.includes(callbackOwnerName)
    ? RENDER_SCOPE_KINDS.render
    : RENDER_SCOPE_KINDS.unknown;
};

export type IsInRenderScopeArgs = {
  filename: string;
  /**
   * Set once the walk has left a function that is not called on the spot, such as one a `useMemo` factory returns. Its body runs whenever it is called, not while the factory runs, so the factory no longer keeps what it builds stable.
   */
  hasLeftDeferredFunction?: boolean;
  node: Rule.Node;
};

/**
 * Walks outward from a node to the nearest enclosing component, hook, or story `render`. A test callback or module-level helper is not render scope: hooks cannot run there, so the fix the rule asks for is not available.
 */
export const isInRenderScope = ({
  filename,
  hasLeftDeferredFunction = false,
  node,
}: IsInRenderScopeArgs): boolean => {
  const renderScopeKind = getRenderScopeKind({ filename, node });

  return renderScopeKind === RENDER_SCOPE_KINDS.render
    ? true
    : (renderScopeKind === RENDER_SCOPE_KINDS.memoized &&
          !hasLeftDeferredFunction) ||
        node.type === "Program"
      ? false
      : isInRenderScope({
          filename,
          // A callback passed to a call, such as `rows.map(...)`, runs while the factory does. Any other function, such as one the factory returns, runs later.
          hasLeftDeferredFunction:
            hasLeftDeferredFunction ||
            (renderScopeKind === RENDER_SCOPE_KINDS.unknown &&
              !isCallArgument(node)),
          node: node.parent,
        });
};

export type CreateRenderScopeRuleArgs = {
  message: string;
  upstreamRule: Rule.RuleModule;
};

/**
 * Narrows an `eslint-plugin-react-perf` rule to props created inside render scope, and replaces its message with the fix.
 */
export const createRenderScopeRule = ({
  message,
  upstreamRule,
}: CreateRenderScopeRuleArgs): Rule.RuleModule => ({
  create: (context) =>
    upstreamRule.create(
      // The rule context is frozen, so the filtering `report` goes on an object that inherits everything else from it.
      Object.create(context, {
        report: {
          // The upstream rules always report positionally, as `report(node, message)`, and the message is replaced, so only the node is read.
          // The walk starts at the value's parent: a reported function is the value being created, so its own name says nothing about where it is created.
          value: (node: Rule.Node) =>
            isInRenderScope({ filename: context.filename, node: node.parent })
              ? context.report({ messageId: "createdInRender", node })
              : undefined,
        },
      }) as Rule.RuleContext,
    ),
  meta: {
    ...upstreamRule.meta,
    docs: {
      ...upstreamRule.meta?.docs,
      description: message,
    },
    messages: {
      createdInRender: message,
    },
    type: "problem",
  },
});

export const memoizedPropsPlugin: ESLint.Plugin = {
  meta: {
    name: "memoized-props",
  },
  rules: {
    "no-new-array-as-prop": createRenderScopeRule({
      message:
        "This array is created on every render, so a memoized child re-renders each time. Wrap it in `useMemo`, or move it to module scope if it does not depend on props or state.",
      upstreamRule: reactPerfPlugin.rules["jsx-no-new-array-as-prop"],
    }),
    "no-new-function-as-prop": createRenderScopeRule({
      message:
        "This function is created on every render, so a memoized child re-renders each time. Wrap it in `useCallback`.",
      upstreamRule: reactPerfPlugin.rules["jsx-no-new-function-as-prop"],
    }),
    "no-new-object-as-prop": createRenderScopeRule({
      message:
        "This object is created on every render, so a memoized child re-renders each time. Wrap it in `useMemo`, or move it to module scope if it does not depend on props or state.",
      upstreamRule: reactPerfPlugin.rules["jsx-no-new-object-as-prop"],
    }),
  },
};
