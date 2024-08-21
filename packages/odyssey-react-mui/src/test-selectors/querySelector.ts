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
import { getByQuerySelector } from "./getByQuerySelector";
import { interpolateString } from "./interpolateString";
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
  options?: (TestSelectors extends TestSelector
    ? Record<
        TestSelectors["selector"]["templateVariableNames"][number],
        string | RegExp
      > &
        (TestSelectors extends TestSelector & {
          method: "ByRole";
          role: infer Role;
        }
          ? Role extends AriaRole[]
            ? {
                role: Role[number];
              }
            : object
          : object)
    : object) &
    (TestSelectors extends {
      selector: {
        method: "ByRole";
        role: AriaRole[];
      };
    }
      ? {
          role: TestSelectors["selector"]["role"][number];
        }
      : object) & {
      queryMethod?: Parameters<typeof getByQuerySelector>[0]["queryMethod"];
    };
  /**
   * Selectors object.
   */
  testSelectors: TestSelectors;
}) => {
  const capturedElement =
    "selector" in testSelectors && testSelectors.selector
      ? getByQuerySelector({
          element: parentElement,
          queryMethod: querySelectorOptions?.queryMethod || "get",
          queryOptions:
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
                selectionMethod: testSelectors.selector.method,
                role: Array.isArray(testSelectors.selector.role)
                  ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error: Property 'role' does not exist on type 'TestSelectors extends { selector: { method: "ByRole"; role: AriaRole[]; }; } ? { role: TestSelectors["selector"]["role"][number]; } : {}'.ts(2339)
                    // This is erroring, but the type and code work. They does narrow the type properly. It's just here where TypeScript doesn't understand that both `querySelectorOptions` exists as does the `role` property on it. It _has_ to passed in based on the way the types were written, so it's safe to ignore this error for now. -Kevin Ghadyani
                    querySelectorOptions.role
                  : testSelectors.selector.role,
              }
            : {
                selectionMethod: testSelectors.selector.method,
                text: querySelectorOptions
                  ? interpolateString(
                      testSelectors.selector.text,
                      querySelectorOptions,
                    )
                  : testSelectors.selector.text,
              }),
        })
      : parentElement;

  const selectChild =
    "feature" in testSelectors && testSelectors.feature && capturedElement
      ? <
          FeatureName extends keyof (typeof testSelectors)["feature"],
          FeatureTestSelectors extends
            (typeof testSelectors)["feature"][FeatureName],
        >(
          featureName: FeatureName,
          options?: (FeatureTestSelectors extends TestSelector
            ? Record<
                FeatureTestSelectors["selector"]["templateVariableNames"][number],
                string | RegExp
              > &
                (FeatureTestSelectors extends TestSelector & {
                  method: "ByRole";
                  role: infer Role;
                }
                  ? Role extends AriaRole[]
                    ? {
                        role: Role[number];
                      }
                    : object
                  : object)
            : object) &
            (FeatureTestSelectors extends {
              selector: {
                method: "ByRole";
                role: AriaRole[];
              };
            }
              ? {
                  role: FeatureTestSelectors["selector"]["role"][number];
                }
              : object) & {
              queryMethod?: Parameters<
                typeof getByQuerySelector
              >[0]["queryMethod"];
            },
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
            // It's my opinion this is a TypeScript bug because the type works even if it says it doesn't. -Kevin Ghadyani
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
