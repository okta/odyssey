/*!
 * Copyright (c) 2026-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { createContext, useContext } from "react";

import { useMediaQuery } from "./theme/useMediaQuery.js";

/**
 * Every color scheme an app can ask for. This list is the one source of truth for scheme names. `ResolvedColorScheme`, the token sets, and the per-scheme keys of `designTokensOverride` all derive from it, so adding a scheme such as a high-contrast one starts here.
 */
export const colorSchemeValues = ["light", "dark", "system"] as const;

/**
 * The color scheme an app asks for. `system` follows the operating system's
 * `prefers-color-scheme` setting and updates live when it changes.
 */
export type ColorScheme = (typeof colorSchemeValues)[number];

/** The color scheme actually rendered, after `system` is resolved. */
export type ResolvedColorScheme = Exclude<ColorScheme, "system">;

/** Every color scheme Odyssey renders, which is every requested scheme except `system`. */
export const resolvedColorSchemeValues = colorSchemeValues.filter(
  (colorScheme): colorScheme is ResolvedColorScheme => colorScheme !== "system",
);

export const defaultColorScheme: ColorScheme = "light";

export const ColorSchemeContext =
  createContext<ResolvedColorScheme>(defaultColorScheme);

/**
 * Returns the color scheme Odyssey is rendering, `light` or `dark`. Use it for
 * anything Odyssey does not style itself, such as a chart library or a logo
 * that ships separate light and dark artwork.
 */
export const useColorScheme = () => useContext(ColorSchemeContext);

/**
 * Resolves a requested color scheme to the one to render. With nothing
 * requested, a nested provider inherits its parent's resolved scheme so a
 * `Surface` inside a dark app stays dark.
 */
export const useResolvedColorScheme = ({
  colorScheme,
}: {
  colorScheme?: ColorScheme;
}): ResolvedColorScheme => {
  const parentColorScheme = useColorScheme();
  const isSystemDark = useMediaQuery("(prefers-color-scheme: dark)");

  if (colorScheme === "system") {
    return isSystemDark ? "dark" : "light";
  }

  return colorScheme ?? parentColorScheme;
};
