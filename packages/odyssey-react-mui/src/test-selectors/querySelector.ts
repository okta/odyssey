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
  featureTestSelector: LocalFeatureTestSelector,
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
  let capturedElement: HTMLElement | null = null

  if ("selector" in featureTestSelector && querySelectorOptions) {
    const sharedProps = {
      element: parentElement,
      queryMethod: queryMethod || "get",
      queryOptions:
        Object.fromEntries(
          (Object.entries(featureTestSelector.selector.options) as (
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

    capturedElement = (
      featureTestSelector.selector.method === "ByRole"
      ? (
        getByRoleQuerySelector({
          ...sharedProps,
          role: Array.isArray(featureTestSelector.selector.role) || role
            ? role || ""
            : featureTestSelector.selector.role,
        })
      )
      : (
        getByTextQuerySelector({
          ...sharedProps,
          selectionMethod: featureTestSelector.selector.method,
          text: featureTestSelector.selector.text,
        })
      )
    )
  }
  else if ("isControlledElement" in featureTestSelector && featureTestSelector.isControlledElement) {
    capturedElement = getControlledElement({ element: parentElement })
  }

  const getAccessibleText =
    "accessibleText" in featureTestSelector
      ? (
        <LabelName extends keyof (typeof featureTestSelector)["accessibleText"]>(
          labelName: LabelName,
        ) => {
          if (!capturedElement) {
            throw new ElementError("No child HTML element available", parentElement)
          }

          return (
            getComputedAccessibleText({
              element: capturedElement,
              type: featureTestSelector.accessibleText[labelName],
            })
          )
        }
      )
      : null;

  const selectChild =
    "feature" in featureTestSelector
      ? (
        <
          FeatureName extends keyof (typeof featureTestSelector)["feature"]
        >({
          featureName,
          options,
          queryMethod,
          role,
        }: (
          {
            featureName: FeatureName,
            // options?: (typeof featureTestSelector)["feature"][FeatureName] extends TestSelector
            // ? Record<
            //     keyof (typeof featureTestSelector)["feature"][FeatureName]["selector"]["options"],
            //     string | RegExp
            //   >
            // : never,
          }
          & (
            Pick<Parameters<ReturnType<typeof querySelector<(
              (typeof featureTestSelector)["feature"][FeatureName] extends TestSelector
              ? (typeof featureTestSelector)["feature"][FeatureName]
              : never
            )>>>[0], "options" | "queryMethod" | "role">
          )
        )) => {
          if (!capturedElement) {
            throw new ElementError("No child HTML element available", parentElement)
          }

          return querySelector(
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error: Type 'FeatureName' cannot be used to index type 'Record<string, FeatureTestSelector>'.ts(2536)
            // It's my opinion this is a TypeScript bug because the type works even if it says it doesn't. -Kevin Ghadyani
            featureTestSelector.feature[featureName],
          )({
            element: capturedElement,
            options,
            queryMethod,
            role,
          })
        }
      )
    : null

  return {
    element: capturedElement,
    getAccessibleText,
    selectChild,
  };
};
