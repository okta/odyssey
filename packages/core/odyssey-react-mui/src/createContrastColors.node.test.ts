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

import * as odysseyDesignTokens from "@okta/odyssey-design-tokens";
import { describe, expect, test } from "vitest";

import { generateContrastColors } from "./createContrastColors.js";
import { hexToRgb } from "./hexToRgb.js";

const bodyRgb = hexToRgb(odysseyDesignTokens.TypographyColorBody);
const bodyRgbString = `${bodyRgb.red}, ${bodyRgb.green}, ${bodyRgb.blue}`;

describe(generateContrastColors.name, () => {
  test("dark background", () => {
    expect(
      generateContrastColors({
        backgroundColor: "#000000",
        odysseyDesignTokens,
      }),
    ).toStrictEqual({
      fontColor: "#FFFFFF",
      focusRingColor: "rgba(255, 255, 255, .8)",
      itemDisabledFontColor: "rgba(255, 255, 255, .4)",
      itemHoverBackgroundColor: "rgba(255, 255, 255, .1)",
      itemSelectedBackgroundColor: "rgba(255, 255, 255, .15)",
    });
  });

  test("light background", () => {
    expect(
      generateContrastColors({
        backgroundColor: "#ffffff",
        odysseyDesignTokens,
      }),
    ).toStrictEqual({
      fontColor: odysseyDesignTokens.TypographyColorBody,
      focusRingColor: `rgba(${bodyRgbString}, .8)`,
      itemDisabledFontColor: `rgba(${bodyRgbString}, .4)`,
      itemHoverBackgroundColor: `rgba(${bodyRgbString}, .1)`,
      itemSelectedBackgroundColor: `rgba(${bodyRgbString}, .15)`,
    });
  });

  test("mid-tone background below the light threshold", () => {
    expect(
      generateContrastColors({
        backgroundColor: "#777777",
        odysseyDesignTokens,
      }),
    ).toStrictEqual({
      fontColor: "#000000",
      focusRingColor: "rgba(0, 0, 0, .8)",
      itemDisabledFontColor: "rgba(0, 0, 0, .4)",
      itemHoverBackgroundColor: "rgba(255, 255, 255, .1)",
      itemSelectedBackgroundColor: "rgba(255, 255, 255, .15)",
    });
  });

  test("mid-tone background above the light threshold", () => {
    expect(
      generateContrastColors({
        backgroundColor: "#888888",
        odysseyDesignTokens,
      }),
    ).toStrictEqual({
      fontColor: "#000000",
      focusRingColor: "rgba(0, 0, 0, .8)",
      itemDisabledFontColor: "rgba(0, 0, 0, .4)",
      itemHoverBackgroundColor: "rgba(0, 0, 0, .1)",
      itemSelectedBackgroundColor: "rgba(0, 0, 0, .15)",
    });
  });

  test("explicit contrast color", () => {
    expect(
      generateContrastColors({
        backgroundColor: "#ffffff",
        backgroundContrastColor: "#ff0000",
        odysseyDesignTokens,
      }),
    ).toStrictEqual({
      fontColor: "#ff0000",
      focusRingColor: "rgba(255, 0, 0, .8)",
      itemDisabledFontColor: "rgba(255, 0, 0, .4)",
      itemHoverBackgroundColor: "rgba(255, 0, 0, .1)",
      itemSelectedBackgroundColor: "rgba(255, 0, 0, .15)",
    });
  });

  test("invalid background falls back to the white token", () => {
    expect(
      generateContrastColors({
        backgroundColor: "red",
        odysseyDesignTokens,
      }),
    ).toStrictEqual({
      fontColor: odysseyDesignTokens.TypographyColorBody,
      focusRingColor: `rgba(${bodyRgbString}, .8)`,
      itemDisabledFontColor: `rgba(${bodyRgbString}, .4)`,
      itemHoverBackgroundColor: `rgba(${bodyRgbString}, .1)`,
      itemSelectedBackgroundColor: `rgba(${bodyRgbString}, .15)`,
    });
  });
});
