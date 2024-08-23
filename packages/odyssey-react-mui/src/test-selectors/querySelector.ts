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
  type FeatureSelector,
  type FeatureTestSelector,
  type TestSelector,
} from "./featureTestSelector";
import { getComputedAccessibleText } from "./getComputedAccessibleText";
import {
  getByRoleQuerySelector,
  getByTextQuerySelector,
  type QueryMethod,
} from "./getByQuerySelector";
import { getControlledElement } from "./linkedHtmlSelectors";
import { ElementError } from "./sanityChecks";

// export type QuerySelectorOptions<LocalFeatureTestSelector extends FeatureTestSelector> = (
//   LocalFeatureTestSelector extends {
//     selector: {
//       options: Record<infer TestSelectorKey, unknown>;
//     };
//   } ? Record<TestSelectorKey, string | RegExp> : {}
// )

export type QuerySelectorOptions<
  LocalFeatureTestSelector extends FeatureTestSelector,
> = LocalFeatureTestSelector extends TestSelector
  ? Record<
      keyof LocalFeatureTestSelector["selector"]["options"],
      string | RegExp
    >
  : Record<string, string>;

export const querySelector =
  <LocalFeatureTestSelector extends FeatureTestSelector>(
    /**
     * Selectors object including features and accessible text selections.
     */
    featureTestSelector: LocalFeatureTestSelector,
  ) =>
  (
    /**
     * Refers to Testing Library's canvas. This is usually `screen`, but Storybook uses `within(canvas)`.
     */
    containerElement: HTMLElement,
  ) =>
  <LocalQueryMethod extends QueryMethod = "get">(
    props?: {
      /**
       * Testing Library method used to query elements.
       */
      queryMethod?: LocalQueryMethod;
    } & (LocalFeatureTestSelector extends {
      selector: {
        role: infer Role;
      };
    }
      ? Role extends AriaRole[]
        ? {
            /**
             * Role is used when you have an optional `role`; otherwise, it'd baked into the metadata.
             */
            role: Role[number];
          }
        : {
            role?: never;
          }
      : {
          role?: never;
        }) &
      (LocalFeatureTestSelector extends TestSelector
        ? {
            /**
             * Helps narrow down HTML selection to the correct element.
             */
            options: Record<
              keyof LocalFeatureTestSelector["selector"]["options"],
              string | RegExp
            >;
          }
        : {
            options?: never;
          }),
  ) => {
    const { options: querySelectorOptions, queryMethod, role } = props || {};

    const localQueryMethod = queryMethod || ("get" as const);

    let capturedElement: HTMLElement | null = null;

    if ("selector" in featureTestSelector && querySelectorOptions) {
      const sharedProps = {
        element: containerElement,
        queryMethod: localQueryMethod,
        queryOptions: Object.fromEntries(
          Object.entries(featureTestSelector.selector.options).map(
            ([testSelectorsKey, testingLibraryKey]) => [
              testingLibraryKey,
              querySelectorOptions[testSelectorsKey],
            ],
          ),
        ) as Record<
          LocalFeatureTestSelector extends TestSelector
            ? LocalFeatureTestSelector["selector"]["options"][keyof LocalFeatureTestSelector["selector"]["options"]]
            : string,
          string | RegExp
        >,
      };

      capturedElement =
        featureTestSelector.selector.method === "ByRole"
          ? getByRoleQuerySelector({
              ...sharedProps,
              role:
                Array.isArray(featureTestSelector.selector.role) || role
                  ? role || ""
                  : featureTestSelector.selector.role,
            })
          : getByTextQuerySelector({
              ...sharedProps,
              selectionMethod: featureTestSelector.selector.method,
              text: featureTestSelector.selector.text,
            });
    } else if (
      "isControlledElement" in featureTestSelector &&
      featureTestSelector.isControlledElement
    ) {
      try {
        capturedElement = getControlledElement({ element: containerElement });
      } catch (error) {
        if (queryMethod === "query") {
          capturedElement = null;
        }

        throw error;
      }
    }

    const getAccessibleText =
      "accessibleText" in featureTestSelector
        ? <
            LabelName extends
              keyof (typeof featureTestSelector)["accessibleText"],
          >(
            labelName: LabelName,
          ) => {
            if (!capturedElement) {
              throw new ElementError(
                "No child HTML element available",
                containerElement,
              );
            }

            return getComputedAccessibleText({
              element: capturedElement,
              type: featureTestSelector.accessibleText[labelName],
            });
          }
        : null;

    const selectChild = <
      FeatureName extends LocalFeatureTestSelector extends FeatureSelector
        ? keyof LocalFeatureTestSelector["feature"]
        : keyof FeatureSelector,
    >(
      featureName: FeatureName,
    ) => {
      if (!capturedElement) {
        throw new ElementError(
          "No child HTML element available",
          containerElement,
        );
      }

      if (!("feature" in featureTestSelector)) {
        throw new Error("Missing feature in featureTestSelector");
      }

      return querySelector(
        featureTestSelector.feature[
          featureName
        ] as LocalFeatureTestSelector extends FeatureSelector
          ? LocalFeatureTestSelector["feature"][FeatureName]
          : FeatureTestSelector,
      )(capturedElement);
    };

    return {
      element: capturedElement as LocalQueryMethod extends "get"
        ? HTMLElement
        : HTMLElement | null,
      getAccessibleText,
      selectChild:
        selectChild as LocalFeatureTestSelector extends FeatureSelector
          ? typeof selectChild
          : never,
    };
  };
