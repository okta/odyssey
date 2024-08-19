/*!
 * Copyright (c) 2024-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import {
  queries,
  within,
  type BoundFunctions,
  type ByRoleMatcher,
  type ByRoleOptions,
  type Matcher,
  type SelectorMatcherOptions,
} from "@testing-library/dom";

export type RoleSelectorMethod = "ByRole";

export type TextSelectorMethod =
  | "ByLabelText"
  | "ByPlaceholderText"
  | "ByText"
  | "ByAltText"
  | "ByTitle";

export type QueryMethod = "find" | "get" | "query";

export type ByRoleMethods =
  | "getByRole"
  // | "getAllByRole"
  | "queryByRole";
// | "queryAllByRole"
// | "findByRole"
// | "findAllByRole"

export type ByTextMethods =
  | "getByLabelText"
  // | "getAllByLabelText"
  | "queryByLabelText"
  // | "queryAllByLabelText"
  // | "findByLabelText"
  // | "findAllByLabelText"
  | "getByPlaceholderText"
  // | "getAllByPlaceholderText"
  | "queryByPlaceholderText"
  // | "queryAllByPlaceholderText"
  // | "findByPlaceholderText"
  // | "findAllByPlaceholderText"
  | "getByText"
  // | "getAllByText"
  | "queryByText"
  // | "queryAllByText"
  // | "findByText"
  // | "findAllByText"
  | "getByAltText"
  // | "getAllByAltText"
  | "queryByAltText"
  // | "queryAllByAltText"
  // | "findByAltText"
  // | "findAllByAltText"
  | "getByTitle"
  // | "getAllByTitle"
  | "queryByTitle";
// | "queryAllByTitle"
// | "findByTitle"
// | "findAllByTitle"

export const executeTestingLibraryMethod = <
  CanvasMethods extends keyof BoundFunctions<typeof queries>,
>({
  canvas,
  queryMethod,
  selectionMethod,
}: {
  canvas: Pick<BoundFunctions<typeof queries>, CanvasMethods>;
  queryMethod: QueryMethod;
  selectionMethod: RoleSelectorMethod | TextSelectorMethod;
}) =>
  canvas[
    queryMethod.concat(selectionMethod) as keyof Pick<
      BoundFunctions<typeof queries>,
      CanvasMethods
    >
  ];

export const getByQuerySelector = ({
  element,
  queryMethod,
  queryOptions,
  role,
  selectionMethod,
  text,
}: {
  element: HTMLElement;
  queryMethod: QueryMethod;
} & (
  | {
      queryOptions?: ByRoleOptions;
      role: ByRoleMatcher;
      selectionMethod: RoleSelectorMethod;
      text?: never;
    }
  | {
      queryOptions?: SelectorMatcherOptions;
      role?: never;
      selectionMethod: TextSelectorMethod;
      text: Matcher;
    }
)) => {
  const canvas = within(element);

  if (selectionMethod === "ByRole") {
    return executeTestingLibraryMethod<ByRoleMethods>({
      canvas,
      queryMethod,
      selectionMethod,
    })(role, queryOptions);
  } else if (
    selectionMethod === "ByLabelText" ||
    selectionMethod === "ByPlaceholderText" ||
    selectionMethod === "ByText"
  ) {
    return executeTestingLibraryMethod<ByTextMethods>({
      canvas,
      queryMethod,
      selectionMethod,
    })(text, queryOptions);
  }

  return null;
};

// getByQuerySelector({
//   element: document.createElement('div'),
//   selectionMethod: "ByRole",
//   queryOptions: {
//     name: "fun"
//   },
//   queryMethod: "get",
//   role: "yo"
// })

// getByQuerySelector({
//   element: document.createElement('div'),
//   selectionMethod: "ByLabelText",
//   queryOptions: {
//     exact: true,
//   },
//   queryMethod: "get",
//   text: "yo",
// })
