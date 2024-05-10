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
  type ByRoleOptions,
  type GetByText,
  GetByRole,
} from "@testing-library/dom";

import {
  type FeatureTestSelector,
  type TestSelector,
} from "./featureTestSelector";
import { odysseyTestSelectors } from "./odysseyTestSelectors";

export const interpolateString = (
  string: string,
  values: Record<string, string | RegExp>,
) => {
  const interpolatedString = eval(`
    ${Object.entries(values)
      .map(
        ([key, value]) =>
          `const ${key} = ${
            typeof value === "string" ? JSON.stringify(value) : value
          };`,
      )
      .join("")}

    \`${string}\`
  `) as string;

  if (/^\/*(.+)\/$/.test(interpolatedString)) {
    return eval(interpolatedString) as RegExp;
  }

  return interpolatedString;
};

const getByQuerySelector = ({
  canvas,
  method,
  options,
  role,
  text,
}: {
  canvas: BoundFunctions<typeof queries>;
  method: "ByRole" | "ByLabelText" | "ByPlaceholderText" | "ByText";
  options?: ByRoleOptions;
  role?: Parameters<GetByRole>[1];
  text?: Parameters<GetByText>[1];
}) => {
  if (method === "ByRole") {
    return canvas.getByRole(
      // TODO: These should eventually reference `query` as the function identifier.
      role!,
      options,
    );
  } else if (method === "ByLabelText") {
    return canvas.getByLabelText(
      // These should eventually reference `query` as the function identifier.
      text!, // TODO: Use TypeScript `Infer` to ensure `label` is required when it's `ByLabelText`.
      options,
    );
  } else if (method === "ByPlaceholderText") {
    return canvas.getByPlaceholderText(
      // These should eventually reference `query` as the function identifier.
      text!, // TODO: Use TypeScript `Infer` to ensure `label` is required when it's `ByLabelText`.
      options,
    );
  } else if (method === "ByText") {
    return canvas.getByText(
      // These should eventually reference `query` as the function identifier.
      text!, // TODO: Use TypeScript `Infer` to ensure `description` is required when it's `ByLabelText`.
      options,
    );
  }

  return null;
};

export const querySelector = <TestSelectors extends FeatureTestSelector>({
  canvas,
  templateArgs: templateArgsProp,
  testSelectors,
}: {
  /**
   * Testing Library canvas. This is usually `screen`, but Storybook uses `within(canvas)`.
   */
  canvas: BoundFunctions<typeof queries>;
  templateArgs?: TestSelectors extends TestSelector
    ? Record<
        TestSelectors["selector"]["templateVariableNames"][number],
        string | RegExp
      >
    : never;
  testSelectors: TestSelectors;
}) => {
  const element =
    "selector" in testSelectors
      ? getByQuerySelector({
          canvas,
          method: testSelectors.selector.method,
          options:
            templateArgsProp && testSelectors.selector.options
              ? Object.fromEntries(
                  Object.entries(testSelectors.selector.options).map(
                    ([key, value]) => [
                      key,
                      interpolateString(value, templateArgsProp),
                    ],
                  ),
                )
              : testSelectors.selector.options,
          ...(testSelectors.selector.method === "ByRole"
            ? {
                role: templateArgsProp
                  ? (interpolateString(
                      testSelectors.selector?.role,
                      templateArgsProp,
                    ) as string)
                  : testSelectors.selector?.role,
              }
            : {
                text: templateArgsProp
                  ? interpolateString(
                      testSelectors.selector?.text,
                      templateArgsProp,
                    )
                  : testSelectors.selector?.text,
              }),
        })
      : null;

  const select =
    "feature" in testSelectors
      ? <FeatureName extends keyof (typeof testSelectors)["feature"]>(
          featureName: FeatureName,
          templateArgs?: (typeof testSelectors)["feature"][FeatureName] extends TestSelector
            ? Record<
                (typeof testSelectors)["feature"][FeatureName]["selector"]["templateVariableNames"][number],
                string | RegExp
              >
            : never,
        ) =>
          querySelector({
            canvas: element ? within(element) : canvas,
            templateArgs,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error: Type 'FeatureName' cannot be used to index type 'Record<string, FeatureTestSelector>'.ts(2536)
            testSelectors: testSelectors.feature[featureName],
          })
      : null;

  return {
    element,
    select,
  };
};

export const queryOdysseySelector = <
  ComponentName extends keyof typeof odysseyTestSelectors,
>({
  canvas,
  componentName,
  templateArgs,
}: {
  canvas: Parameters<
    typeof querySelector<(typeof odysseyTestSelectors)[ComponentName]>
  >[0]["canvas"];
  /**
   * Name of the component you want to select within.
   */
  componentName: ComponentName;
  /**
   * String or RegExp values required for this selector.
   */
  templateArgs?: Parameters<
    typeof querySelector<(typeof odysseyTestSelectors)[ComponentName]>
  >[0]["templateArgs"];
}) =>
  querySelector({
    canvas,
    templateArgs,
    testSelectors: odysseyTestSelectors[componentName],
  });
