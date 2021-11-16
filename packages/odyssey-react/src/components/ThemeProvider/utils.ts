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

import type { ThemeShape } from "./context";

export const buildTheme = (
  prevTheme: ThemeShape,
  theme: ThemeShape
): ThemeShape => {
  if (prevTheme === theme) return prevTheme;

  return Object.entries(theme).reduce(
    (memo, [k, v]) => (typeof v === "object" ? memo : { ...memo, [k]: v }),
    prevTheme
  );
};

export const asCustomProps = (
  theme: ThemeShape
): Record<string, string | number> => {
  return Object.fromEntries(
    Object.entries(flat(theme)).map(([k, v]) => [`--${k}`, v])
  );
};

function flat(theme: ThemeShape, prefix = ""): ThemeShape {
  return Object.entries(theme).reduce((memo, [k, v]) => {
    const next = typeof v === "object" ? flat(v, k + "-") : { [prefix + k]: v };
    return Object.assign(memo, next);
  }, {});
}
