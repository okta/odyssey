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

import { createContext } from "react";
import * as DesignTokens from "@okta/odyssey-design-tokens";

export const tokens = { ...DesignTokens };

type TokensType = typeof tokens;
export type Theme = { [T in keyof TokensType]: TokensType[T] };
export type PartialTheme = Partial<Theme>;
export type ThemeKey = keyof Theme;
export type ThemeValue = Theme[ThemeKey];

const ThemeContext = createContext<Theme>(tokens);

ThemeContext.displayName = "ThemeContext";

export { ThemeContext };
