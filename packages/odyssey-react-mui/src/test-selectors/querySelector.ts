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
  type AccessibleLabelSelector,
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

export type InnerQuerySelectorProps<
  LocalFeatureTestSelector extends FeatureTestSelector,
  LocalQueryMethod extends QueryMethod,
> = {
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
    : object
  : object) &
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
    : object);

export const querySelector =
  <LocalFeatureTestSelector extends FeatureTestSelector>(
    /**
     * Selectors object including features and accessible text selections.
     */
    featureTestSelector: LocalFeatureTestSelector,
  ) =>
  <LocalQueryMethod extends QueryMethod = "get">(
    /**
     * Refers to Testing Library's canvas. This is usually `screen`, but Storybook uses `within(canvas)`.
     */
    containerElement: HTMLElement,
    props: InnerQuerySelectorProps<LocalFeatureTestSelector, LocalQueryMethod>,
  ) => {
    const { queryMethod } = props || {};
    const localQueryMethod = queryMethod || ("get" as const);
    const querySelectorOptions = "options" in props ? props.options : undefined;
    const role = "role" in props ? (props.role as AriaRole) : undefined;

    // This `let` is difficult to make into a `const`. It makes the code unreadable.
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

    if (!capturedElement) {
      throw new ElementError(
        "No child HTML element available",
        containerElement,
      );
    }

    if (!("accessibleText" in featureTestSelector)) {
      throw new Error("Missing `accessibleText` in `FeatureTestSelector`");
    }

    const getAccessibleText = <
      LabelName extends LocalFeatureTestSelector extends AccessibleLabelSelector
        ? keyof LocalFeatureTestSelector["accessibleText"]
        : keyof AccessibleLabelSelector,
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
    };

    const selectChild = <
      FeatureName extends LocalFeatureTestSelector extends FeatureSelector
        ? keyof LocalFeatureTestSelector["feature"]
        : keyof FeatureSelector,
      ChildQueryMethod extends QueryMethod,
    >({
      featureName,
      queryMethod,
      ...otherProps
    }: {
      featureName: FeatureName;
    } & InnerQuerySelectorProps<
      LocalFeatureTestSelector extends FeatureSelector
        ? LocalFeatureTestSelector["feature"][FeatureName]
        : FeatureTestSelector,
      ChildQueryMethod
    >) => {
      if (!capturedElement) {
        throw new ElementError(
          "No child HTML element available",
          containerElement,
        );
      }

      if (!("feature" in featureTestSelector)) {
        throw new Error("Missing `feature` in `FeatureTestSelector`");
      }

      type Options = Record<
        LocalFeatureTestSelector extends FeatureSelector
          ? LocalFeatureTestSelector["feature"][FeatureName] extends TestSelector
            ? keyof LocalFeatureTestSelector["feature"][FeatureName]["selector"]["options"]
            : string
          : string,
        string | RegExp
      >;

      return querySelector(
        featureTestSelector.feature[
          featureName
        ] as LocalFeatureTestSelector extends FeatureSelector
          ? LocalFeatureTestSelector["feature"][FeatureName]
          : FeatureTestSelector,
      )(
        capturedElement,
        // @ts-expect-error: Type '{ role?: AriaRole | undefined; options?: Record<string, string | RegExp> | undefined; queryMethod: ChildQueryMethod | undefined; }' is not assignable to type '(LocalFeatureTestSelector extends FeatureSelector ? LocalFeatureTestSelector["feature"][FeatureName] : FeatureTestSelector) extends { ...; } ? Role extends AriaRole[] ? { ...; } : object : object'.ts(2345)
        // The `as` on `featureTestSelector.feature[featureName]` is the cause, but we can't remove that or other things break. The type `FeatureTestSelector` is probably the important one. -Kevin Ghadyani
        {
          queryMethod,
          ...("options" in otherProps
            ? {
                options: otherProps.options as Options,
              }
            : {}),
          ...("role" in otherProps
            ? {
                role: otherProps.role as AriaRole,
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
        getAccessibleText as LocalFeatureTestSelector extends AccessibleLabelSelector
          ? typeof getAccessibleText
          : never,
      selectChild:
        selectChild as LocalFeatureTestSelector extends FeatureSelector
          ? typeof selectChild
          : never,
    };
  };
