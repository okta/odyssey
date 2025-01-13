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

import { hexToRgb, isValidHexString, rgbComponentsToString } from "./hexToRgb";
import { DesignTokens } from "./OdysseyDesignTokensContext";

export type ContrastColors = {
  focusRingColor: string | undefined;
  fontColor: string | undefined;
  itemDisabledFontColor: string | undefined;
  itemHoverBackgroundColor: string | undefined;
  itemSelectedBackgroundColor: string | undefined;
};

// 128 is a magic number. This feels like roughly where we should switch from dark to light.
const LUMINANCE_THRESHOLD = 128;
const LUMINANCE_EDGE_MIN = 108;
const LUMINANCE_EDGE_MAX = 142;

export const generateContrastColors = (
  backgroundColor: string,
  odysseyDesignTokens: DesignTokens,
) => {
  // Convert hex to RGB
  const rgbFromHex = isValidHexString(backgroundColor)
    ? hexToRgb(backgroundColor)
    : hexToRgb(odysseyDesignTokens.HueNeutralWhite);

  const { red, green, blue } = rgbFromHex;

  // Calculate relative luminance
  // @see https://contrastchecker.online/color-relative-luminance-calculator#:~:text=For%20the%20sRGB%20colorspace%2C%20the,%2B0.055)%2F1.055)%20%5E%202.4
  // returns a number between 0(black) and 255(white)
  const luminance = 0.2126 * red + 0.7152 * green + 0.0722 * blue;

  // Luminance values between LUMINANCE_EDGE_MIN-LUMINANCE_EDGE_MAX can cause contrast ration issues
  // Using #000000 helps in these cases
  const luminanceValueInEdgeRange =
    luminance > LUMINANCE_EDGE_MIN && luminance < LUMINANCE_EDGE_MAX;

  // Determine if the color is light or dark.
  const isLight = luminance > LUMINANCE_THRESHOLD;

  const fontColor = luminanceValueInEdgeRange
    ? "#000000"
    : isLight
      ? odysseyDesignTokens.TypographyColorBody
      : odysseyDesignTokens.HueNeutralWhite;

  const calculatedFontColorInRgb = hexToRgb(fontColor);
  const lightFontColorInRgb = hexToRgb(odysseyDesignTokens.HueNeutralWhite);
  const darkFontColorInRgb = hexToRgb(odysseyDesignTokens.TypographyColorBody);

  const calculatedFontRgbString = rgbComponentsToString({
    red: calculatedFontColorInRgb?.red,
    green: calculatedFontColorInRgb?.green,
    blue: calculatedFontColorInRgb?.blue,
  });

  const lightFontRgbString = rgbComponentsToString({
    red: lightFontColorInRgb?.red,
    green: lightFontColorInRgb?.green,
    blue: lightFontColorInRgb?.blue,
  });

  const darkFontRgbString = rgbComponentsToString({
    red: darkFontColorInRgb?.red,
    green: darkFontColorInRgb?.green,
    blue: darkFontColorInRgb?.blue,
  });

  const getHighlightColor: (
    luminanceValueInEdgeRange: boolean,
    isLight: boolean,
  ) => string = (luminanceValueInEdgeRange, isLight) => {
    if (luminanceValueInEdgeRange) {
      return isLight ? darkFontRgbString : lightFontRgbString;
    }

    return calculatedFontRgbString;
  };

  return {
    fontColor,
    focusRingColor: `rgba(${calculatedFontRgbString}, .8)`,
    itemDisabledFontColor: `rgba(${calculatedFontRgbString}, .4)`,
    itemHoverBackgroundColor: `rgba(${getHighlightColor(luminanceValueInEdgeRange, isLight)}, .1)`,
    itemSelectedBackgroundColor: `rgba(${getHighlightColor(luminanceValueInEdgeRange, isLight)}, .15)`,
  };
};
