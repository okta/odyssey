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
) => {
  // Convert hex to RGB
  const rgbFromHex = hexToRgb(backgroundColor);

  if (rgbFromHex) {
    const { red, green, blue } = rgbFromHex;

    // Calculate relative luminance
    const luminance = 0.2126 * red + 0.7152 * green + 0.0722 * blue;

    // 128 is a magic number. This feels like roughly where we should switch from dark to light.
    const LUMINANCE_THRESHOLD = 128;
    const LUMINANCE_EDGE_MIN = 108;
    const LUMINANCE_EDGE_MAX = 142;

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
    const darkFontColorInRgb = hexToRgb(
      odysseyDesignTokens.TypographyColorBody,
    );

    const calculatedFontRgbString = `${calculatedFontColorInRgb?.red}, ${calculatedFontColorInRgb?.green}, ${calculatedFontColorInRgb?.blue}`;
    const lightFontRgbString = `${lightFontColorInRgb?.red}, ${lightFontColorInRgb?.green}, ${lightFontColorInRgb?.blue}`;
    const darkFontRgbString = `${darkFontColorInRgb?.red}, ${darkFontColorInRgb?.green}, ${darkFontColorInRgb?.blue}`;

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
  }

  return undefined;
};
