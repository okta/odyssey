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
  type AriaRole,
  type FeatureTestSelector,
  type TestSelector,
} from "./featureTestSelector";
import { getComputedAccessibleText } from "./getComputedAccessibleText";
import { getByRoleQuerySelector, getByTextQuerySelector, type QueryMethod } from "./getByQuerySelector";
import { getControlledElement } from "./linkedHtmlSelectors";
import { ElementError } from "./sanityChecks";

// export type TestSelectorOptions<TestSelectors extends FeatureTestSelector> = (
//   TestSelectors extends {
//     selector: {
//       options: Record<infer TestSelectorKey, unknown>;
//     };
//   } ? Record<TestSelectorKey, string | RegExp> : {}
// )

export type TestSelectorRole<LocalFeatureTestSelector extends FeatureTestSelector> = (
  LocalFeatureTestSelector extends {
    selector: {
      role: infer Role;
    }
  }
  ? Role extends AriaRole[]
    ? Role[number]
    : never
  : never
)

export type QuerySelectorOptions<LocalFeatureTestSelector extends FeatureTestSelector> = (
  LocalFeatureTestSelector extends TestSelector
  ? Record<keyof LocalFeatureTestSelector["selector"]["options"], string | RegExp>
  : {}
)

export const querySelector = <LocalFeatureTestSelector extends FeatureTestSelector>(
  /**
   * Selectors object including features and accessible text selections.
   */
  testSelector: LocalFeatureTestSelector,
) => ({
  element: parentElement,
  options: querySelectorOptions,
  queryMethod,
  role,
}: {
  /**
   * Refers to Testing Library's canvas. This is usually `screen`, but Storybook uses `within(canvas)`.
   */
  element: HTMLElement;
  /**
   * Helps narrow down HTML selection to the correct element.
   */
  options?: QuerySelectorOptions<LocalFeatureTestSelector>
  /**
   * Testing Library method used to query elements.
   */
  queryMethod?: QueryMethod
  /**
   * Role is used when you have an optional `role`; otherwise, it'd baked into the metadata.
   */
  role?: TestSelectorRole<LocalFeatureTestSelector>
}) => {
  if ("selector" in testSelector && querySelectorOptions) {
    const sharedProps = {
      element: parentElement,
      queryMethod: queryMethod || "get",
      queryOptions:
        Object.fromEntries(
          (Object.entries(testSelector.selector.options) as (
            Array<[keyof QuerySelectorOptions<LocalFeatureTestSelector>, QuerySelectorOptions<LocalFeatureTestSelector>[keyof QuerySelectorOptions<LocalFeatureTestSelector>]]>
          ))
          .map(
            ([testSelectorsKey, testingLibraryKey]) => [
              testingLibraryKey,
              querySelectorOptions[testSelectorsKey],
            ],
          ),
        ),
    }

    const capturedElement = (
      testSelector.selector.method === "ByRole"
      ? (
        getByRoleQuerySelector({
          ...sharedProps,
          role: Array.isArray(testSelector.selector.role) || role
            ? role || ""
            : testSelector.selector.role,
        })
      )
      : (
        getByTextQuerySelector({
          ...sharedProps,
          selectionMethod: testSelector.selector.method,
          text: testSelector.selector.text,
        })
      )
    )

    // TODO: This forces all functions to `get` rather than allowing `query` to return `null`. We should probably figure out a better way to tell TypeScript `null` is fine sometimes, but then error if there's no element when calling `selectChild` rather than having to use `?.`.
    if (!capturedElement) {
      throw new ElementError("No element exists for thsi query.", parentElement)
    }

    const selectChild =
      "feature" in testSelector
        ? (
          <
            FeatureName extends keyof (typeof testSelector)["feature"]
          >({
            featureName,
            options,
            // queryMethod,
            // role,
          }: (
            {
              featureName: FeatureName,
              options?: (typeof testSelector)["feature"][FeatureName] extends TestSelector
              ? Record<
                  keyof (typeof testSelector)["feature"][FeatureName]["selector"]["options"],
                  string | RegExp
                >
              : never,
            }
            // & (
            //   Pick<Parameters<ReturnType<typeof querySelector<(
            //       (typeof testSelector)["feature"][FeatureName] extends TestSelector
            //       ? (typeof testSelector)["feature"][FeatureName]
            //       : never
            //     )>>>[0], "queryMethod" | "role">
            // )
          )) => {
            return querySelector(
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error: Type 'FeatureName' cannot be used to index type 'Record<string, FeatureTestSelector>'.ts(2536)
              // It's my opinion this is a TypeScript bug because the type works even if it says it doesn't. -Kevin Ghadyani
              testSelector.feature[featureName],
            )({
              element: (
                testSelector.feature[featureName].isControlledElement
                  ? getControlledElement({ element: capturedElement })
                  : capturedElement
              ),
              options,
              // queryMethod,
              // role,
            })
          }
        )
        : null;

    const selectAccessibleLabel =
      "accessibleLabel" in testSelector
        ? <LabelName extends keyof (typeof testSelector)["accessibleLabel"]>(
            labelName: LabelName,
          ) =>
            getComputedAccessibleText({
              element: capturedElement,
              type: testSelector.accessibleLabel[labelName],
            })
        : null;

    return {
      element: capturedElement,
      selectChild,
      selectAccessibleLabel,
    };
  }

  return {
    element: null,
  };
};
