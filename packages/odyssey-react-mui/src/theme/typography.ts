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

import type { ThemeOptions } from "@mui/material";
import { DesignTokensOverride } from ".";

export const typography = (
  odysseyTokens: DesignTokensOverride
): ThemeOptions["typography"] => {
  return {
    htmlFontSize: 16,
    fontFamily: odysseyTokens.FontFamilyBase,
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: Number(odysseyTokens.FontWeightNormal),
    fontWeightMedium: 500,
    fontWeightBold: Number(odysseyTokens.FontWeightBold),
    allVariants: {
      fontFamily: odysseyTokens.FontFamilyBase,
      fontFeatureSettings: "'lnum', 'pnum'",
      fontVariant: "normal",
      letterSpacing: 0,
    },
    h1: {
      fontWeight: Number(odysseyTokens.FontWeightBold),
      fontSize: odysseyTokens.FontSizeHeading1,
      lineHeight: odysseyTokens.FontLineHeightHeading1,
      marginBottom: odysseyTokens.SpaceScale1,
    },
    h2: {
      fontWeight: Number(odysseyTokens.FontWeightBold),
      fontSize: odysseyTokens.FontSizeHeading2,
      lineHeight: odysseyTokens.FontLineHeightHeading2,
      marginBottom: odysseyTokens.SpaceScale1,
    },
    h3: {
      fontWeight: Number(odysseyTokens.FontWeightBold),
      fontSize: odysseyTokens.FontSizeHeading3,
      lineHeight: odysseyTokens.FontLineHeightHeading3,
      marginBottom: odysseyTokens.SpaceScale1,
    },
    h4: {
      fontWeight: Number(odysseyTokens.FontWeightBold),
      fontSize: odysseyTokens.FontSizeHeading4,
      lineHeight: odysseyTokens.FontLineHeightHeading4,
      marginBottom: odysseyTokens.SpaceScale1,
    },
    h5: {
      fontWeight: Number(odysseyTokens.FontWeightBold),
      fontSize: odysseyTokens.FontSizeHeading5,
      lineHeight: odysseyTokens.FontLineHeightHeading5,
      marginBottom: odysseyTokens.SpaceScale1,
    },
    h6: {
      fontWeight: Number(odysseyTokens.FontWeightBold),
      fontSize: odysseyTokens.FontScale2,
      lineHeight: odysseyTokens.FontLineHeightHeading6,
      marginBottom: odysseyTokens.SpaceScale1,
    },
    subtitle1: {
      color: odysseyTokens.ColorPaletteNeutral600,
      fontWeight: odysseyTokens.FontWeightNormal,
      fontSize: odysseyTokens.FontScale0,
      lineHeight: odysseyTokens.FontLineHeightBody,
    },
    subtitle2: undefined,
    body1: {
      fontFamily: odysseyTokens.FontFamilyBase,
      fontWeight: Number(odysseyTokens.FontWeightNormal),
      fontSize: odysseyTokens.FontScale1,
      fontFeatureSettings: "'lnum', 'pnum'",
      fontVariant: "normal",
      lineHeight: odysseyTokens.FontLineHeightBody,
      letterSpacing: "initial",
    },
    body2: undefined,
    button: undefined,
    overline: undefined,
    legend: {
      padding: 0,
      fontWeight: Number(odysseyTokens.FontWeightBold),
      fontSize: odysseyTokens.FontScale2,
      lineHeight: odysseyTokens.FontLineHeightHeading6,
      marginBottom: odysseyTokens.SpaceScale1,
    },
    ui: {
      fontWeight: Number(odysseyTokens.FontWeightNormal),
      fontSize: odysseyTokens.FontScale1,
      lineHeight: odysseyTokens.FontLineHeightUi,
      letterSpacing: "initial",
    },
  };
};
