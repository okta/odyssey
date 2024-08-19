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
