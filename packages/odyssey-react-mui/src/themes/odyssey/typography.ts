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
  h1: {
    fontFamily: Tokens.FontFamilyBase,
    fontWeight: Tokens.FontWeightBold,
    fontSize: Tokens.FontSizeHeading1,
    lineHeight: Tokens.FontLineHeightHeading1,
    letterSpacing: "initial",
    marginBottom: Tokens.SpaceScale1,
  },
  h2: {
    fontFamily: Tokens.FontFamilyBase,
    fontWeight: Tokens.FontWeightBold,
    fontSize: Tokens.FontSizeHeading2,
    lineHeight: Tokens.FontLineHeightHeading2,
    letterSpacing: "initial",
    marginBottom: Tokens.SpaceScale1,
  },
  h3: {
    fontFamily: Tokens.FontFamilyBase,
    fontWeight: Tokens.FontWeightBold,
    fontSize: Tokens.FontSizeHeading3,
    lineHeight: Tokens.FontLineHeightHeading3,
    letterSpacing: "initial",
    marginBottom: Tokens.SpaceScale1,
  },
  h4: {
    fontFamily: Tokens.FontFamilyBase,
    fontWeight: Tokens.FontWeightBold,
    fontSize: Tokens.FontSizeHeading4,
    lineHeight: Tokens.FontLineHeightHeading4,
    letterSpacing: "initial",
    marginBottom: Tokens.SpaceScale1,
  },
  h5: {
    fontFamily: Tokens.FontFamilyBase,
    fontWeight: Tokens.FontWeightBold,
    fontSize: Tokens.FontSizeHeading5,
    lineHeight: Tokens.FontLineHeightHeading5,
    letterSpacing: "initial",
    marginBottom: Tokens.SpaceScale1,
  },
  h6: {
    fontFamily: Tokens.FontFamilyBase,
    fontWeight: Tokens.FontWeightBold,
    fontSize: Tokens.FontScale2,
    lineHeight: Tokens.FontLineHeightHeading6,
    letterSpacing: "initial",
    marginBottom: Tokens.SpaceScale1,
  },
  subtitle1: undefined,
  subtitle2: undefined,
  body: {
    fontFamily: Tokens.FontFamilyBase,
    fontWeight: Number(Tokens.FontWeightNormal),
    fontSize: Tokens.FontScale1,
    lineHeight: Tokens.FontLineHeightBody,
    letterSpacing: "initial",
  },
  body1: undefined,
  body2: undefined,
  button: undefined,
  caption: {
    fontFamily: Tokens.FontFamilyBase,
    fontWeight: Tokens.FontWeightNormal,
    fontSize: Tokens.FontScale0,
    lineHeight: Tokens.FontLineHeightBody,
    letterSpacing: "initial",
  },
  overline: undefined,
};

// Update the Typography's variant prop options
// Unsure where we want to store this
declare module "@mui/material/styles" {
  interface TypographyVariants {
    body: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    body?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    body1: false;
    body2: false;
    body: true;
    button: false;
    overline: false;
    subtitle1: false;
    subtitle2: false;
  }
}
