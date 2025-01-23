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

import { DesignTokens } from "./theme.js";

export const typography = ({
  odysseyTokens,
}: {
  odysseyTokens: DesignTokens;
}): ThemeOptions["typography"] => {
  return {
    htmlFontSize: 16,
    fontFamily: odysseyTokens.TypographyFamilyBody,
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: Number(odysseyTokens.TypographyWeightBody),
    fontWeightMedium: Number(odysseyTokens.TypographyWeightHeading),
    fontWeightBold: Number(odysseyTokens.TypographyWeightHeadingBold),
    allVariants: {
      fontFeatureSettings: "'lnum', 'pnum'",
      fontVariant: "normal",
      letterSpacing: 0,
    },
    h1: {
      fontFamily: odysseyTokens.TypographyFamilyHeading,
      color: odysseyTokens.TypographyColorHeading,
      fontWeight: Number(odysseyTokens.TypographyWeightHeading),
      fontSize: odysseyTokens.TypographySizeHeading1,
      lineHeight: odysseyTokens.TypographyLineHeightHeading1,
      marginBottom: odysseyTokens.Spacing2,
    },
    h2: {
      fontFamily: odysseyTokens.TypographyFamilyHeading,
      color: odysseyTokens.TypographyColorHeading,
      fontWeight: Number(odysseyTokens.TypographyWeightHeading),
      fontSize: odysseyTokens.TypographySizeHeading2,
      lineHeight: odysseyTokens.TypographyLineHeightHeading2,
      marginBottom: odysseyTokens.Spacing2,
    },
    h3: {
      fontFamily: odysseyTokens.TypographyFamilyHeading,
      color: odysseyTokens.TypographyColorHeading,
      fontWeight: Number(odysseyTokens.TypographyWeightHeading),
      fontSize: odysseyTokens.TypographySizeHeading3,
      lineHeight: odysseyTokens.TypographyLineHeightHeading3,
      marginBottom: odysseyTokens.Spacing2,
    },
    h4: {
      fontFamily: odysseyTokens.TypographyFamilyHeading,
      color: odysseyTokens.TypographyColorHeading,
      fontWeight: Number(odysseyTokens.TypographyWeightHeading),
      fontSize: odysseyTokens.TypographySizeHeading4,
      lineHeight: odysseyTokens.TypographyLineHeightHeading4,
      marginBottom: odysseyTokens.Spacing2,
    },
    h5: {
      fontFamily: odysseyTokens.TypographyFamilyHeading,
      color: odysseyTokens.TypographyColorHeading,
      fontWeight: Number(odysseyTokens.TypographyWeightHeading),
      fontSize: odysseyTokens.TypographySizeHeading5,
      lineHeight: odysseyTokens.TypographyLineHeightHeading5,
      marginBottom: odysseyTokens.Spacing2,
    },
    h6: {
      fontFamily: odysseyTokens.TypographyFamilyHeading,
      color: odysseyTokens.TypographyColorHeading,
      fontWeight: Number(odysseyTokens.TypographyWeightHeading),
      fontSize: odysseyTokens.TypographySizeHeading6,
      lineHeight: odysseyTokens.TypographyLineHeightHeading6,
      marginBottom: odysseyTokens.Spacing2,
    },
    subtitle1: {
      // "caption"
      color: odysseyTokens.TypographyColorSubordinate,
      fontWeight: Number(odysseyTokens.TypographyWeightBody),
      fontSize: odysseyTokens.TypographySizeSubordinate,
      lineHeight: odysseyTokens.TypographyLineHeightBody,
    },
    subtitle2: {
      // "body.light"
      color: odysseyTokens.TypographyColorSupport,
      fontFamily: odysseyTokens.TypographyFamilyBody,
      fontWeight: Number(odysseyTokens.TypographyWeightBody),
      fontSize: odysseyTokens.TypographySizeBody,
      fontFeatureSettings: "'lnum', 'pnum'",
      fontVariant: "normal",
      lineHeight: odysseyTokens.TypographyLineHeightBody,
      letterSpacing: "initial",
      marginBlockEnd: odysseyTokens.Spacing4,
    },
    body1: {
      color: odysseyTokens.TypographyColorBody,
      fontFamily: odysseyTokens.TypographyFamilyBody,
      fontWeight: Number(odysseyTokens.TypographyWeightBody),
      fontSize: odysseyTokens.TypographySizeBody,
      fontFeatureSettings: "'lnum', 'pnum'",
      fontVariant: "normal",
      lineHeight: odysseyTokens.TypographyLineHeightBody,
      letterSpacing: "initial",
    },
    body2: undefined,
    button: undefined,
    overline: {
      fontWeight: Number(odysseyTokens.TypographyWeightHeadingBold),
      fontFamily: odysseyTokens.TypographyFamilyBody,
      lineHeight: odysseyTokens.TypographyLineHeightOverline,
      letterSpacing: "5%",
      textTransform: "uppercase",
      fontSize: "0.71428571rem",
    },
    legend: {
      padding: 0,
      fontFamily: odysseyTokens.TypographyFamilyHeading,
      fontWeight: Number(odysseyTokens.TypographyWeightHeading),
      fontSize: odysseyTokens.TypographySizeHeading5,
      lineHeight: odysseyTokens.TypographyLineHeightHeading5,
      marginBottom: odysseyTokens.Spacing2,
    },
    ui: {
      fontWeight: Number(odysseyTokens.TypographyWeightBody),
      fontSize: odysseyTokens.TypographySizeBody,
      lineHeight: odysseyTokens.TypographyLineHeightUi,
      letterSpacing: "initial",
    },
  };
};
