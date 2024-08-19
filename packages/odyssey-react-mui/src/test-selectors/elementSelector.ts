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
  type BoundFunctions,
  type ByRoleOptions,
  type GetByRole,
  type GetByText,
} from "@testing-library/dom";

export const isRegExpString = (string: string) => /^\/*(.+)\/$/.test(string);

export const interpolateString = (
  string: string,
  replacements: Record<string, string | RegExp>,
) => {
  // Writes out all replacement pairs as "const variableName = value" because we don't know which we want. Then at the end, we `return` the value we want by simply adding it as the last thing in eval'd code.
  const interpolatedString = eval(`
    ${Object.entries(replacements)
      .map(
        ([variableName, value]) =>
          `const ${variableName} = ${
            typeof value === "string" ? JSON.stringify(value) : value
          };`,
      )
      .join("")}

    \`${string}\`
  `) as string;

  if (isRegExpString(interpolatedString)) {
    // If this string matches the RegExp format, we know that it's a RegExp, and we'll evaluate it to one. TypeScript has no way of knowing the resulting type, so we have to set that ourselves.
    return eval(interpolatedString) as RegExp;
  }

  // This interpolated string is just a string.
  return interpolatedString;
};

export const getByQuerySelector = ({
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
