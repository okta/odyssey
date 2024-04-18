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
import { testSelectors, type FeatureTestSelector } from "./testSelectors";

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
      // These should eventually reference `query` as the function identifier.
      role!,
      options,
    );
  } else if (method === "ByLabelText") {
    return canvas.getByLabelText(
      // These should eventually reference `query` as the function identifier.
      text!, // Use TypeScript `Infer` to ensure `label` is required when it's `ByLabelText`.
      options,
    );
  } else if (method === "ByPlaceholderText") {
    return canvas.getByPlaceholderText(
      // These should eventually reference `query` as the function identifier.
      text!, // Use TypeScript `Infer` to ensure `label` is required when it's `ByLabelText`.
      options,
    );
  } else if (method === "ByText") {
    return canvas.getByText(
      // These should eventually reference `query` as the function identifier.
      text!, // Use TypeScript `Infer` to ensure `description` is required when it's `ByLabelText`.
      options,
    );
  }

  return null;
};

export const querySelector = <TestSelector extends FeatureTestSelector>({
  canvas,
  templateArgs,
  testSelector,
}: {
  /**
   * Testing Library canvas. This is usually `screen`, but Storybook uses `within(canvas)`.
   */
  canvas: BoundFunctions<typeof queries>;
  templateArgs: Record<string, string | RegExp>;
  testSelector: TestSelector;
}) => {
  const element = testSelector.selector
    ? getByQuerySelector({
        canvas,
        method: testSelector.selector.method,
        options: Object.fromEntries(
          Object.entries(testSelector.selector.options || {}).map(
            ([key, value]) => [key, interpolateString(value, templateArgs)],
          ),
        ),
        ...(testSelector.selector.method === "ByRole"
          ? {
              role: interpolateString(
                testSelector.selector?.role,
                templateArgs,
              ) as string,
            }
          : {
              text: interpolateString(
                testSelector.selector?.text,
                templateArgs,
              ),
            }),
      })
    : null;

  // canvas
  // [`get${
  //   testSelector
  //   .selector
  //   .method as (
  //     | "ByRole"
  //     | "ByLabelText"
  //     | "ByText"
  //     | "ByPlaceholderText"
  //   )
  // }`](
  //   interpolateString<
  //     string
  //   >(
  //     (
  //       testSelector
  //       .selector
  //       ?.role
  //     )
  //     ?? (
  //       testSelector
  //       .selector
  //       ?.text
  //     ),
  //     templateArgs,
  //   ),
  //   (
  //     testSelector
  //     .options
  //   ),
  //   // satisfies ByRoleOptions
  // )

  if (testSelector.feature) {
    return {
      element,
      feature: Object.fromEntries(
        Object.keys(testSelector.feature).flatMap((featureName) =>
          testSelector.feature?.[featureName]
            ? [
                [
                  featureName,
                  (templateArgs: Record<string, string | RegExp>) =>
                    querySelector({
                      canvas: element ? within(element) : canvas,
                      templateArgs,
                      testSelector: testSelector.feature?.[featureName] || {}, // This shouldn't need an `||`, but TS complains for no reason.
                    }),
                ],
              ]
            : [],
        ),
      ),
    };
  }

  return {
    element,
  };
};

//   const secondaryTestSelector = featureName
//     ? testSelector?.feature[
//         featureName as keyof typeof testSelector.feature
//       ] // TypeScript doesn't understand what to do with `[featureName]`, so I went head and typed it separately.
//     : null;

//   if (testSelector.selector) {
//     const rootElement = querySelector({
//       canvas,
//       description,
//       label,
//       selector: testSelector.selector,
//       roleOverride,
//       text,
//     });

//     if (rootElement && secondaryTestSelector) {
//       return querySelector({
//         canvas: within(rootElement),
//         description,
//         label,
//         selector: secondaryTestSelector.selector,
//         roleOverride,
//         text,
//       });
//     }

//     return rootElement;
//   }

//   if (secondaryTestSelector) {
//     return querySelector({
//       canvas,
//       description,
//       label,
//       selector: secondaryTestSelector.selector,
//       roleOverride,
//       text,
//     });
//   }

//   return null;
// };

// const element = (
//   selectComponent({
//     componentName: "Callout",
//     // featureName: "link",
//     label: "You've done something wrong",
//   })
// )

export const queryOdysseySelector = <
  ComponentName extends keyof typeof testSelectors,
>({
  canvas,
  componentName,
  templateArgs,
}: {
  canvas: Parameters<typeof querySelector>[0]["canvas"];
  /**
   * Name of the component you want to select within.
   */
  componentName: ComponentName;
  templateArgs: Parameters<typeof querySelector>[0]["templateArgs"];
}) =>
  querySelector({
    canvas,
    templateArgs,
    testSelector: testSelectors[componentName],
  });

// const element = (
//   queryOdysseySelector({
//     canvas: within(document.body),
//     componentName: "Callout",
//     templateArgs: {
//       role: "alert",
//       title: "You've done something wrong",
//     }
//   })
//   .feature
//   ?.link({
//     linkText: "",
//   })
// )

// element
