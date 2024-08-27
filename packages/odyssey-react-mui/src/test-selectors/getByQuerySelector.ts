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

export const getByQuerySelector = <
  LocalQueryMethod extends QueryMethod = "get",
>({
  element,
  queryMethod,
  queryOptions,
  role,
  selectionMethod,
  text,
}: {
  element: HTMLElement;
  queryMethod: LocalQueryMethod;
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

  const capturedElement =
    selectionMethod === "ByRole"
      ? executeTestingLibraryMethod<ByRoleMethods>({
          canvas,
          queryMethod,
          selectionMethod,
        })(role, queryOptions)
      : executeTestingLibraryMethod<ByTextMethods>({
          canvas,
          queryMethod,
          selectionMethod,
        })(text, queryOptions);

  return capturedElement as LocalQueryMethod extends "get"
    ? HTMLElement
    : HTMLElement | null;
};

export const getByRoleQuerySelector = <LocalQueryMethod extends QueryMethod>({
  element,
  queryMethod,
  queryOptions,
  role,
}: {
  element: HTMLElement;
  queryMethod: LocalQueryMethod;
  queryOptions?: ByRoleOptions;
  role: ByRoleMatcher;
}) =>
  getByQuerySelector({
    element,
    queryMethod,
    queryOptions,
    role,
    selectionMethod: "ByRole",
  });

export const getByTextQuerySelector = <LocalQueryMethod extends QueryMethod>({
  element,
  queryMethod,
  queryOptions,
  selectionMethod,
  text,
}: {
  element: HTMLElement;
  queryMethod: LocalQueryMethod;
  queryOptions?: SelectorMatcherOptions;
  selectionMethod: TextSelectorMethod;
  text: Matcher;
}) =>
  getByQuerySelector({
    element,
    queryMethod,
    queryOptions,
    selectionMethod,
    text,
  });
