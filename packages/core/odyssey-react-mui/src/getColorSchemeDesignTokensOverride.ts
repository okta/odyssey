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

import type { DesignTokens, DesignTokensOverride } from "./theme/theme.js";

import {
  type ResolvedColorScheme,
  resolvedColorSchemeValues,
} from "./useColorScheme.js";

/**
 * A design tokens override for each color scheme, keyed by scheme name. Each scheme reads only its own entry, and a scheme with no entry renders Odyssey's tokens for that scheme unchanged.
 *
 * Token names cannot sit next to the scheme keys. Either every key is a scheme name or the object is a flat `DesignTokensOverride`.
 */
export type ColorSchemeDesignTokensOverride = {
  [ColorSchemeName in ResolvedColorScheme]?: DesignTokensOverride;
} & {
  [TokenName in keyof DesignTokens]?: never;
};

/**
 * A flat design tokens override, which applies in light mode only. Scheme names cannot appear as keys, so an object that mixes token names and scheme keys fits neither shape and fails to compile.
 */
export type FlatDesignTokensOverride = DesignTokensOverride & {
  [ColorSchemeName in ResolvedColorScheme]?: never;
};

/** Either shape `designTokensOverride` accepts. */
export type ColorSchemeAwareDesignTokensOverride =
  | ColorSchemeDesignTokensOverride
  | FlatDesignTokensOverride;

/**
 * Returns `true` when an override is keyed by color scheme rather than by token name. No token is named after a color scheme, so a defined scheme key at the top level settles which shape it is. A scheme key set to `undefined` does not count, because the flat shape allows it when optional properties accept `undefined`.
 */
export const isColorSchemeDesignTokensOverride = (
  designTokensOverride: ColorSchemeAwareDesignTokensOverride,
): designTokensOverride is ColorSchemeDesignTokensOverride =>
  resolvedColorSchemeValues.some(
    (colorScheme) => designTokensOverride[colorScheme] !== undefined,
  );

export type GetColorSchemeDesignTokensOverrideArgs = {
  colorScheme: ResolvedColorScheme;
  designTokensOverride?: ColorSchemeAwareDesignTokensOverride;
};

/**
 * Returns the tokens to override for one color scheme, from either shape `designTokensOverride` accepts.
 *
 * A flat override applies to light mode only. That keeps every app that passed `designTokensOverride` before dark mode existed rendering exactly as it did, and a dark render never inherits colors that were picked for a light surface. An app that wants overrides in dark mode passes the keyed shape.
 */
export const getColorSchemeDesignTokensOverride = ({
  colorScheme,
  designTokensOverride,
}: GetColorSchemeDesignTokensOverrideArgs):
  | DesignTokensOverride
  | undefined => {
  if (!designTokensOverride) {
    return undefined;
  }

  if (isColorSchemeDesignTokensOverride(designTokensOverride)) {
    return designTokensOverride[colorScheme];
  }

  return colorScheme === "light" ? designTokensOverride : undefined;
};
