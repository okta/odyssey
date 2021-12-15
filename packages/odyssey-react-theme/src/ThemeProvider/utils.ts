/*!
 * Copyright (c) 2021-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import type { Theme, PartialTheme, ThemeValue } from "./context";

export const isThemeValue = (value: unknown): value is ThemeValue => {
  return ["number", "string"].includes(typeof value);
};

export const reduceTheme = (
  prevTheme: Theme,
  nextTheme: PartialTheme
): Theme => {
  if (prevTheme === nextTheme) return prevTheme;

  return Object.entries(nextTheme).reduce(
    (memo, [k, v]) => (isThemeValue(v) ? { ...memo, [k]: v } : memo),
    prevTheme
  );
};

export const asCustomProps = (
  theme: PartialTheme
): Record<string, ThemeValue> => {
  return Object.fromEntries(
    Object.entries(flat(theme)).map(([k, v]) => ["--" + k, v])
  );
};

function flat(theme: PartialTheme, prefix = ""): PartialTheme {
  return Object.entries(theme).reduce(
    (memo, [k, v]) =>
      Object.assign(
        memo,
        v === Object(v) ? flat(v as PartialTheme, k + "-") : { [prefix + k]: v }
      ),
    {}
  );
}
