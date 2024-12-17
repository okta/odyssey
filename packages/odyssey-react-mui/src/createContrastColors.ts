/*!
 * Copyright (c) 2022-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { DesignTokens } from "./OdysseyDesignTokensContext";

type RgbColorObject = {
  red: number;
  green: number;
  blue: number;
};

export type ContrastColors = {
  focusRingColor: string | undefined;
  fontColor: string | undefined;
  itemDisabledFontColor: string | undefined;
  itemHoverBackgroundColor: string | undefined;
  itemSelectedBackgroundColor: string | undefined;
};

const hexToRgb = (hexBackgroundColor: string): RgbColorObject | undefined => {
  const formattedHexString = hexBackgroundColor.includes("#")
    ? hexBackgroundColor.split("#")[1]
    : hexBackgroundColor;

  return {
    red: parseInt(formattedHexString.slice(0, 2), 16),
    green: parseInt(formattedHexString.slice(2, 4), 16),
    blue: parseInt(formattedHexString.slice(4, 6), 16),
  };
};

export const generateContrastColors = (
  backgroundColor: string,
  odysseyDesignTokens: DesignTokens,
): ContrastColors => {
  // Convert hex to RGB
  const rgbFromHex = hexToRgb(backgroundColor);

  if (rgbFromHex) {
    const { red, green, blue } = rgbFromHex;

    // Calculate relative luminance
    const luminance = 0.299 * red + 0.587 * green + 0.114 * blue;

    // Determine if the color is light or dark.
    // 128 is a magic number. This feels roughly where we should switch from dark to light.
    const isLight = luminance > 128;

    const fontColor = isLight
      ? odysseyDesignTokens.TypographyColorBody
      : odysseyDesignTokens.HueNeutralWhite;

    const fontColorInRgb = hexToRgb(fontColor);

    const fontColorRgbString = `${fontColorInRgb?.red}, ${fontColorInRgb?.green}, ${fontColorInRgb?.blue}`;

    return {
      fontColor,
      focusRingColor: `rgba(${fontColorRgbString}, .8)`,
      itemDisabledFontColor: `rgba(${fontColorRgbString}, .4)`,
      itemHoverBackgroundColor: `rgba(${fontColorRgbString}, .1)`,
      itemSelectedBackgroundColor: `rgba(${fontColorRgbString}, .15)`,
    };
  }
};
