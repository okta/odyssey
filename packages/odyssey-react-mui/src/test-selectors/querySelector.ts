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
  type AccessibleTextSelector,
  type AriaRole,
  type ElementChildSelector,
  type TestSelector,
  type ElementSelector,
} from "./testSelector";
import { getComputedAccessibleText } from "./getComputedAccessibleText";
import {
  getByRoleQuerySelector,
  getByTextQuerySelector,
  type QueryMethod,
} from "./getByQuerySelector";
import { getControlledElement } from "./linkedHtmlSelectors";
import { ElementError } from "./sanityChecks";

export type InnerQuerySelectorProps<
  LocalTestSelector extends TestSelector,
  LocalQueryMethod extends QueryMethod,
> = {
  /**
   * Testing Library method used to query elements.
   */
  queryMethod?: LocalQueryMethod;
} & (LocalTestSelector extends ElementSelector
  ? LocalTestSelector["elementSelector"] extends {
      role: infer Role;
    }
    ? Role extends AriaRole[]
      ? {
          /**
           * Role is used when you have an optional `role`; otherwise, it's baked into the metadata.
           */
          role: Role[number];
        }
      : object
    : object
  : object) &
  (LocalTestSelector extends ElementSelector
    ? {
        /**
         * Helps narrow down HTML selection to the correct element.
         */
        options: Record<
          keyof LocalTestSelector["elementSelector"]["options"],
          string | RegExp
        >;
      }
    : object);

export const captureElement = <
  LocalTestSelector extends TestSelector,
  QuerySelectorOptions extends Record<string, string | RegExp>,
  LocalQueryMethod extends QueryMethod = "get",
>({
  containerElement,
  queryMethod,
  querySelectorOptions,
  role,
  testSelector,
}: {
  containerElement: HTMLElement;
  queryMethod: LocalQueryMethod;
  querySelectorOptions?: QuerySelectorOptions;
  role?: AriaRole;
  testSelector: LocalTestSelector;
}) => {
  if ("elementSelector" in testSelector && querySelectorOptions) {
    const sharedProps = {
      element: containerElement,
      queryMethod,
      queryOptions: Object.fromEntries(
        Object.entries(testSelector.elementSelector.options).map(
          ([testSelectorOptionKey, testingLibraryOptionKey]) => [
            testingLibraryOptionKey,
            querySelectorOptions[testSelectorOptionKey],
          ],
        ),
      ),
    };

    if (testSelector.elementSelector.method === "ByRole") {
      return getByRoleQuerySelector({
        ...sharedProps,
        role:
          Array.isArray(testSelector.elementSelector.role) || role
            ? role || ""
            : testSelector.elementSelector.role,
      });
    }

    return getByTextQuerySelector({
      ...sharedProps,
      selectionMethod: testSelector.elementSelector.method,
      text: testSelector.elementSelector.text,
    });
  } else if (
    "isControlledElement" in testSelector &&
    testSelector.isControlledElement
  ) {
    try {
      return getControlledElement({ element: containerElement });
    } catch (error) {
      if (queryMethod === "query") {
        return null;
      }

      throw error;
    }
  }

  return null;
};

export const querySelector =
  <LocalTestSelector extends TestSelector>(
    /**
     * Selectors object including children and accessible text selections.
     */
    testSelector: LocalTestSelector,
  ) =>
  <LocalQueryMethod extends QueryMethod = "get">(
    props: {
      /**
       * Refers to Testing Library's canvas. This is usually `screen`, but Storybook uses `within(canvas)`.
       */
      element: HTMLElement;
    } & InnerQuerySelectorProps<LocalTestSelector, LocalQueryMethod>,
  ) => {
    const { element: containerElement, queryMethod } = props;

    const capturedElement = captureElement({
      containerElement,
      queryMethod: queryMethod || ("get" as const),
      querySelectorOptions: "options" in props ? props.options : undefined,
      role: "role" in props ? (props.role as AriaRole) : undefined,
      testSelector,
    });

    const getAccessibleText = <
      LabelName extends LocalTestSelector extends AccessibleTextSelector
        ? keyof LocalTestSelector["accessibleText"]
        : never,
    >(
      labelName: LabelName,
    ) => {
      if (!capturedElement) {
        throw new ElementError(
          "No child HTML element available",
          containerElement,
        );
      }

      if (!("accessibleText" in testSelector)) {
        throw new Error("Missing `accessibleText` in `TestSelector`");
      }

      return getComputedAccessibleText({
        element: capturedElement,
        type: testSelector.accessibleText[labelName],
      });
    };

    const selectChild = <
      ChildName extends LocalTestSelector extends ElementChildSelector
        ? keyof LocalTestSelector["children"]
        : keyof ElementChildSelector,
      ChildQueryMethod extends QueryMethod = "get",
    >(
      childProps: {
        name: ChildName;
      } & InnerQuerySelectorProps<
        LocalTestSelector extends ElementChildSelector
          ? LocalTestSelector["children"][ChildName]
          : TestSelector,
        ChildQueryMethod
      >,
    ) => {
      if (!capturedElement) {
        throw new ElementError(
          "No child HTML element available",
          containerElement,
        );
      }

      if (!("children" in testSelector)) {
        throw new Error("Missing `children` in `TestSelector`");
      }

      type Options = Record<
        LocalTestSelector extends ElementChildSelector
          ? LocalTestSelector["children"][ChildName] extends ElementSelector
            ? keyof LocalTestSelector["children"][ChildName]["elementSelector"]["options"]
            : never
          : never,
        string | RegExp
      >;

      return querySelector(
        testSelector.children[
          childProps.name
        ] as LocalTestSelector extends ElementChildSelector
          ? LocalTestSelector["children"][ChildName]
          : TestSelector,
      )(
        // @ts-expect-error: Type '{ role?: AriaRole | undefined; options?: Record<LocalTestSelector extends ElementChildSelector ? LocalTestSelector["children"][ChildName] extends TestSelector ? keyof LocalTestSelector["children"][ChildName]["selector"]["options"] : string : string, string | RegExp> | undefined; element: HTMLElement...' is not assignable to type '(LocalTestSelector extends ElementChildSelector ? LocalTestSelector["children"][ChildName] : TestSelector) extends { ...; } ? Role extends AriaRole[] ? { ...; } : object : object'.ts(2345)
        // `as testSelector.children[ChildName]` narrows the props down enough that TypeScript errors here. We're passing the correct information, but it doesn't know that, and it's difficult to fix this. -Kevin Ghadyani
        {
          element: capturedElement,
          queryMethod: childProps.queryMethod,
          ...("options" in childProps && childProps.options
            ? {
                options: childProps.options as Options,
              }
            : {}),
          ...("role" in childProps && childProps.role
            ? {
                role: childProps.role as AriaRole,
              }
            : {}),
        },
      );
    };

    return {
      element: capturedElement as LocalQueryMethod extends "get"
        ? HTMLElement
        : HTMLElement | null,
      getAccessibleText:
        getAccessibleText as LocalTestSelector extends AccessibleTextSelector
          ? typeof getAccessibleText
          : never,
      selectChild: selectChild as LocalTestSelector extends ElementChildSelector
        ? typeof selectChild
        : never,
    };
  };
