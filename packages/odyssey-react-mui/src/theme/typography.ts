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
import * as Tokens from "@okta/odyssey-design-tokens";

export const typography: ThemeOptions["typography"] = {
  htmlFontSize: 16,
  fontFamily: Tokens.TypographyFamilyBody,
  fontSize: 14,
  fontWeightLight: 300,
  fontWeightRegular: Number(Tokens.TypographyWeightBody),
  fontWeightMedium: Number(Tokens.TypographyWeightHeading),
  fontWeightBold: Number(Tokens.TypographyWeightHeadingBold),
  allVariants: {
    fontFamily: Tokens.TypographyFamilyBody,
    fontFeatureSettings: "'lnum', 'pnum'",
    fontVariant: "normal",
    letterSpacing: 0,
  },
  h1: {
    fontWeight: Number(Tokens.TypographyWeightHeading),
    fontSize: Tokens.TypographySizeHeading1,
    lineHeight: Tokens.TypographyLineHeightHeading1,
    marginBottom: Tokens.Spacing2,
  },
  h2: {
    fontWeight: Number(Tokens.TypographyWeightHeading),
    fontSize: Tokens.TypographySizeHeading2,
    lineHeight: Tokens.TypographyLineHeightHeading2,
    marginBottom: Tokens.Spacing2,
  },
  h3: {
    fontWeight: Number(Tokens.TypographyWeightHeading),
    fontSize: Tokens.TypographySizeHeading3,
    lineHeight: Tokens.TypographyLineHeightHeading3,
    marginBottom: Tokens.Spacing2,
  },
  h4: {
    fontWeight: Number(Tokens.TypographyWeightHeading),
    fontSize: Tokens.TypographySizeHeading4,
    lineHeight: Tokens.TypographyLineHeightHeading4,
    marginBottom: Tokens.Spacing2,
  },
  h5: {
    fontWeight: Number(Tokens.TypographyWeightHeading),
    fontSize: Tokens.TypographySizeHeading5,
    lineHeight: Tokens.TypographyLineHeightHeading5,
    marginBottom: Tokens.Spacing2,
  },
  h6: {
    fontWeight: Number(Tokens.TypographyWeightHeading),
    fontSize: Tokens.TypographyScale2,
    lineHeight: Tokens.TypographyLineHeightHeading6,
    marginBottom: Tokens.Spacing2,
  },
  subtitle1: {
    color: Tokens.HueNeutral600,
    fontWeight: Number(Tokens.TypographyWeightBody),
    fontSize: Tokens.TypographyScale0,
    lineHeight: Tokens.TypographyLineHeightBody,
  },
  subtitle2: undefined,
  body1: {
    fontFamily: Tokens.TypographyFamilyBody,
    fontWeight: Number(Tokens.TypographyWeightBody),
    fontSize: Tokens.TypographyScale1,
    fontFeatureSettings: "'lnum', 'pnum'",
    fontVariant: "normal",
    lineHeight: Tokens.TypographyLineHeightBody,
    letterSpacing: "initial",
  },
  body2: undefined,
  button: undefined,
  overline: {
    fontWeight: Number(Tokens.TypographyWeightHeadingBold),
    fontFamily: Tokens.TypographyFamilyBody,
    lineHeight: Tokens.TypographyLineHeightOverline,
    letterSpacing: "5%",
    textTransform: "uppercase",
    fontSize: "0.71428571rem",
  },
  legend: {
    padding: 0,
    fontWeight: Number(Tokens.TypographyWeightHeading),
    fontSize: Tokens.TypographyScale2,
    lineHeight: Tokens.TypographyLineHeightHeading6,
    marginBottom: Tokens.Spacing2,
  },
  ui: {
    fontWeight: Number(Tokens.TypographyWeightBody),
    fontSize: Tokens.TypographyScale1,
    lineHeight: Tokens.TypographyLineHeightUi,
    letterSpacing: "initial",
  },
};
