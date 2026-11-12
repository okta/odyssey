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
import { describe, expect, test } from "vitest";

import {
  type ColorSchemeAwareDesignTokensOverride,
  type ColorSchemeDesignTokensOverride,
  getColorSchemeDesignTokensOverride,
  isColorSchemeDesignTokensOverride,
} from "./getColorSchemeDesignTokensOverride.js";
import { type DesignTokensOverride } from "./theme/theme.js";

const flatDesignTokensOverride: DesignTokensOverride = {
  HueNeutralWhite: "#f0f1f2",
};

const keyedDesignTokensOverride: ColorSchemeDesignTokensOverride = {
  dark: { HueNeutralWhite: "#010203" },
  light: { HueNeutralWhite: "#fefefe" },
};

describe(isColorSchemeDesignTokensOverride.name, () => {
  test("flat override", () => {
    expect(isColorSchemeDesignTokensOverride(flatDesignTokensOverride)).toBe(
      false,
    );
  });

  test("override keyed by both schemes", () => {
    expect(isColorSchemeDesignTokensOverride(keyedDesignTokensOverride)).toBe(
      true,
    );
  });

  test("override keyed by the dark scheme only", () => {
    expect(
      isColorSchemeDesignTokensOverride({
        dark: { HueNeutralWhite: "#010203" },
      }),
    ).toBe(true);
  });

  test("flat override with a scheme key set to undefined", () => {
    expect(
      isColorSchemeDesignTokensOverride({
        dark: undefined,
        HueNeutralWhite: "#f0f1f2",
      }),
    ).toBe(false);
  });

  test("empty override", () => {
    expect(isColorSchemeDesignTokensOverride({})).toBe(false);
  });

  test("override that mixes a scheme key with a token name", () => {
    const mixedDesignTokensOverride = {
      dark: { HueNeutralWhite: "#010203" },
      TypographyColorBody: "#123456",
    };

    // @ts-expect-error A token name next to a scheme key fits neither shape, so it would silently lose the token.
    const designTokensOverride: ColorSchemeAwareDesignTokensOverride =
      mixedDesignTokensOverride;

    expect(isColorSchemeDesignTokensOverride(designTokensOverride)).toBe(true);
  });

  test("full light token set passed as a flat override", () => {
    expect(
      isColorSchemeDesignTokensOverride({ ...lightModeDesignTokens }),
    ).toBe(false);
  });
});

describe(getColorSchemeDesignTokensOverride.name, () => {
  test("no override", () => {
    expect(
      getColorSchemeDesignTokensOverride({ colorScheme: "light" }),
    ).toBeUndefined();
  });

  test("flat override in light mode", () => {
    expect(
      getColorSchemeDesignTokensOverride({
        colorScheme: "light",
        designTokensOverride: flatDesignTokensOverride,
      }),
    ).toStrictEqual({ HueNeutralWhite: "#f0f1f2" });
  });

  test("flat override in dark mode", () => {
    expect(
      getColorSchemeDesignTokensOverride({
        colorScheme: "dark",
        designTokensOverride: flatDesignTokensOverride,
      }),
    ).toBeUndefined();
  });

  test("keyed override in light mode", () => {
    expect(
      getColorSchemeDesignTokensOverride({
        colorScheme: "light",
        designTokensOverride: keyedDesignTokensOverride,
      }),
    ).toStrictEqual({ HueNeutralWhite: "#fefefe" });
  });

  test("keyed override in dark mode", () => {
    expect(
      getColorSchemeDesignTokensOverride({
        colorScheme: "dark",
        designTokensOverride: keyedDesignTokensOverride,
      }),
    ).toStrictEqual({ HueNeutralWhite: "#010203" });
  });

  test("keyed override with no entry for the rendered scheme", () => {
    expect(
      getColorSchemeDesignTokensOverride({
        colorScheme: "dark",
        designTokensOverride: { light: { HueNeutralWhite: "#fefefe" } },
      }),
    ).toBeUndefined();
  });
});
