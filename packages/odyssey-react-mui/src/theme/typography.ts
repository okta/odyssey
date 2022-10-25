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
  fontFamily: Tokens.FontFamilyBase,
  fontSize: 14,
  fontWeightLight: 300,
  fontWeightRegular: Number(Tokens.FontWeightNormal),
  fontWeightMedium: 500,
  fontWeightBold: Number(Tokens.FontWeightBold),
  allVariants: {
    fontFamily: Tokens.FontFamilyBase,
    fontFeatureSettings: "'lnum', 'pnum'",
    fontVariant: "normal",
    letterSpacing: 0,
  },
  h1: {
    fontWeight: Number(Tokens.FontWeightBold),
    fontSize: Tokens.FontSizeHeading1,
    lineHeight: Tokens.FontLineHeightHeading1,
    marginBottom: Tokens.SpaceScale1,
  },
  h2: {
    fontWeight: Number(Tokens.FontWeightBold),
    fontSize: Tokens.FontSizeHeading2,
    lineHeight: Tokens.FontLineHeightHeading2,
    marginBottom: Tokens.SpaceScale1,
  },
  h3: {
    fontWeight: Number(Tokens.FontWeightBold),
    fontSize: Tokens.FontSizeHeading3,
    lineHeight: Tokens.FontLineHeightHeading3,
    marginBottom: Tokens.SpaceScale1,
  },
  h4: {
    fontWeight: Number(Tokens.FontWeightBold),
    fontSize: Tokens.FontSizeHeading4,
    lineHeight: Tokens.FontLineHeightHeading4,
    marginBottom: Tokens.SpaceScale1,
  },
  h5: {
    fontWeight: Number(Tokens.FontWeightBold),
    fontSize: Tokens.FontSizeHeading5,
    lineHeight: Tokens.FontLineHeightHeading5,
    marginBottom: Tokens.SpaceScale1,
  },
  h6: {
    fontWeight: Number(Tokens.FontWeightBold),
    fontSize: Tokens.FontScale2,
    lineHeight: Tokens.FontLineHeightHeading6,
    marginBottom: Tokens.SpaceScale1,
  },
  subtitle1: {
    color: Tokens.ColorPaletteNeutral600,
    fontWeight: Tokens.FontWeightNormal,
    fontSize: Tokens.FontScale0,
    lineHeight: Tokens.FontLineHeightBody,
  },
  subtitle2: undefined,
  body1: {
    fontFamily: Tokens.FontFamilyBase,
    fontWeight: Number(Tokens.FontWeightNormal),
    fontSize: Tokens.FontScale1,
    fontFeatureSettings: "'lnum', 'pnum'",
    fontVariant: "normal",
    lineHeight: Tokens.FontLineHeightBody,
    letterSpacing: "initial",
  },
  body2: undefined,
  button: undefined,
  overline: undefined,
  legend: {
    padding: 0,
    fontWeight: Number(Tokens.FontWeightBold),
    fontSize: Tokens.FontScale2,
    lineHeight: Tokens.FontLineHeightHeading6,
    marginBottom: Tokens.SpaceScale1,
  },
};
