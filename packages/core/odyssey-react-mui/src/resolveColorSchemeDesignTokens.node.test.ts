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
import { describe, expect, test } from "vitest";

import { resolveColorSchemeDesignTokens } from "./resolveColorSchemeDesignTokens.js";

describe(resolveColorSchemeDesignTokens.name, () => {
  test("no override in each scheme", () => {
    expect(
      resolveColorSchemeDesignTokens({ colorScheme: "light" }),
    ).toStrictEqual({ ...lightModeDesignTokens });
    expect(
      resolveColorSchemeDesignTokens({ colorScheme: "dark" }),
    ).toStrictEqual({ ...darkModeDesignTokens });
  });

  test("flat HueNeutralWhite override in light mode", () => {
    expect(
      resolveColorSchemeDesignTokens({
        colorScheme: "light",
        designTokensOverride: { HueNeutralWhite: "#f0f1f2" },
      }),
    ).toStrictEqual({
      ...lightModeDesignTokens,
      HueNeutralWhite: "#f0f1f2",
      PaletteNeutralSurface: "#f0f1f2",
    });
  });

  test("HueNeutralWhite and PaletteNeutralSurface both overridden", () => {
    expect(
      resolveColorSchemeDesignTokens({
        colorScheme: "light",
        designTokensOverride: {
          HueNeutralWhite: "#f0f1f2",
          PaletteNeutralSurface: "#fafafa",
        },
      }),
    ).toStrictEqual({
      ...lightModeDesignTokens,
      HueNeutralWhite: "#f0f1f2",
      PaletteNeutralSurface: "#fafafa",
    });
  });

  test("keyed HueNeutralWhite override in dark mode", () => {
    expect(
      resolveColorSchemeDesignTokens({
        colorScheme: "dark",
        designTokensOverride: { dark: { HueNeutralWhite: "#010203" } },
      }),
    ).toStrictEqual({
      ...darkModeDesignTokens,
      HueNeutralWhite: "#010203",
      PaletteNeutralSurface: "#010203",
    });
  });

  test("flat HueNeutralWhite override in dark mode", () => {
    expect(
      resolveColorSchemeDesignTokens({
        colorScheme: "dark",
        designTokensOverride: { HueNeutralWhite: "#f0f1f2" },
      }),
    ).toStrictEqual({ ...darkModeDesignTokens });
  });
});
