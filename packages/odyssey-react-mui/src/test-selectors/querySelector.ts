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

import { within } from "@testing-library/dom";

import { getByQuerySelector, interpolateString } from "./elementSelector";
import {
  type FeatureTestSelector,
  type TestSelector,
} from "./featureTestSelector";
import { getComputedAccessibleText } from "./getAccessibleText";
import { getControlledElement } from "./linkedHtmlSelectors";

export const querySelector = <TestSelectors extends FeatureTestSelector>({
  element: parentElement,
  options: querySelectorOptions,
  testSelectors,
}: {
  /**
   * Refers to Testing Library's canvas. This is usually `screen`, but Storybook uses `within(canvas)`.
   */
  element: HTMLElement;
  /**
   * Required values help narrow down selection.
   */
  options?: TestSelectors extends TestSelector
    ? Record<
        TestSelectors["selector"]["templateVariableNames"][number],
        string | RegExp
      >
    : never;
  /**
   * Selectors object.
   */
  testSelectors: TestSelectors;
}) => {
  const capturedElement =
    "selector" in testSelectors && testSelectors.selector
      ? getByQuerySelector({
          canvas: within(parentElement),
          method: testSelectors.selector.method,
          options:
            querySelectorOptions && testSelectors.selector.options
              ? Object.fromEntries(
                  Object.entries(testSelectors.selector.options).map(
                    ([key, value]) => [
                      key,
                      interpolateString(value, querySelectorOptions),
                    ],
                  ),
                )
              : testSelectors.selector.options,
          ...(testSelectors.selector.method === "ByRole"
            ? {
                role: querySelectorOptions
                  ? // Even though the interpolation function could return a RegExp, our `role` type ensures they can only pass a string. TypeScript has no way of knowing which template will return a RegExp or string, so that's why we have to force it ourselves with `as`.
                    (interpolateString(
                      testSelectors.selector?.role,
                      querySelectorOptions,
                    ) as string)
                  : testSelectors.selector?.role,
              }
            : {
                text: querySelectorOptions
                  ? interpolateString(
                      testSelectors.selector?.text,
                      querySelectorOptions,
                    )
                  : testSelectors.selector?.text,
              }),
        })
      : parentElement;

  const selectChild =
    "feature" in testSelectors && testSelectors.feature
      ? <FeatureName extends keyof (typeof testSelectors)["feature"]>(
          featureName: FeatureName,
          options?: (typeof testSelectors)["feature"][FeatureName] extends TestSelector
            ? Record<
                (typeof testSelectors)["feature"][FeatureName]["selector"]["templateVariableNames"][number],
                string | RegExp
              >
            : never,
        ) =>
          querySelector({
            element: capturedElement
              ? testSelectors.feature[featureName].isControlledElement
                ? getControlledElement({ element: capturedElement })
                : capturedElement
              : parentElement,
            options,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error: Type 'FeatureName' cannot be used to index type 'Record<string, FeatureTestSelector>'.ts(2536)
            testSelectors: testSelectors.feature[featureName],
          })
      : null;

  const selectLabel =
    "label" in testSelectors && testSelectors.label && capturedElement
      ? <LabelName extends keyof (typeof testSelectors)["label"]>(
          labelName: LabelName,
        ) =>
          getComputedAccessibleText({
            element: capturedElement,
            type: testSelectors.label[labelName],
          })
      : null;

  return {
    element: capturedElement,
    selectChild,
    selectLabel,
  };
};
