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

import * as lightModeDesignTokens from "@okta/odyssey-design-tokens";
import * as darkModeDesignTokens from "@okta/odyssey-design-tokens/dark";

import type { DesignTokens } from "./theme/theme.js";
import type { ResolvedColorScheme } from "./useColorScheme.js";

import {
  getColorSchemeDesignTokensOverride,
  type GetColorSchemeDesignTokensOverrideArgs,
} from "./getColorSchemeDesignTokensOverride.js";

// Each side compiles to `true` only when the two token modules have the same names with the same value types. A token in one module but not the other, or a string in one and a number in the other, turns it into `false` and fails the build here, at the one place that swaps one module for the other.
type IsExactMatch<First, Second> = [First] extends [Second]
  ? [Second] extends [First]
    ? true
    : false
  : false;

export type DarkAndLightTokensMatch =
  IsExactMatch<
    typeof darkModeDesignTokens,
    typeof lightModeDesignTokens
  > extends true
    ? true
    : "@okta/odyssey-design-tokens/dark must export exactly the names and value types of @okta/odyssey-design-tokens";

// Assigning `true` fails to compile when the type above resolves to the message string.
export const darkAndLightTokensMatch: DarkAndLightTokensMatch = true;

// Keyed by `ResolvedColorScheme`, so adding a scheme to `colorSchemeValues` fails to compile here until that scheme has a token set.
const designTokensByColorScheme: Record<ResolvedColorScheme, DesignTokens> = {
  dark: darkModeDesignTokens,
  light: lightModeDesignTokens,
};

export type ResolveColorSchemeDesignTokensArgs =
  GetColorSchemeDesignTokensOverrideArgs;

/**
 * Returns the full token set for a color scheme: Odyssey's tokens for that scheme, then that scheme's share of `designTokensOverride` on top. See `getColorSchemeDesignTokensOverride` for which share each shape gives each scheme.
 */
export const resolveColorSchemeDesignTokens = ({
  colorScheme,
  designTokensOverride,
}: ResolveColorSchemeDesignTokensArgs): DesignTokens => {
  const colorSchemeDesignTokensOverride = getColorSchemeDesignTokensOverride({
    colorScheme,
    designTokensOverride,
  });

  // `PaletteNeutralSurface` is an alias the token build resolves to `HueNeutralWhite`, so it would not follow an override of `HueNeutralWhite` on its own. Apps overrode `HueNeutralWhite` before the alias existed, and components keep moving onto the alias, so the alias follows that override unless it is overridden itself.
  return {
    ...designTokensByColorScheme[colorScheme],
    ...(colorSchemeDesignTokensOverride?.HueNeutralWhite && {
      PaletteNeutralSurface: colorSchemeDesignTokensOverride.HueNeutralWhite,
    }),
    ...colorSchemeDesignTokensOverride,
  };
};
