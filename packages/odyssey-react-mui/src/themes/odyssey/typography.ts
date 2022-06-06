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

export const paletteTheme: ThemeOptions["typography"] = {
  htmlFontSize: 16,
  fontFamily:
    "'Public Sans', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen-Sans', 'Ubuntu', 'Cantarell', 'Helvetica Neue', 'Noto Sans Arabic', sans-serif",
  fontSize: 14,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 600,
  h1: {
    fontFamily:
      "'Public Sans', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen-Sans', 'Ubuntu', 'Cantarell', 'Helvetica Neue', 'Noto Sans Arabic', sans-serif",
    fontWeight: "600",
    fontSize: "2.571rem",
    lineHeight: "1.25",
    letterSpacing: "initial",
  },
  h2: {
    fontFamily:
      "'Public Sans', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen-Sans', 'Ubuntu', 'Cantarell', 'Helvetica Neue', 'Noto Sans Arabic', sans-serif",
    fontWeight: "600",
    fontSize: "2.286rem",
    lineHeight: "1.28571429",
    letterSpacing: "initial",
  },
  h3: {
    fontFamily:
      "'Public Sans', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen-Sans', 'Ubuntu', 'Cantarell', 'Helvetica Neue', 'Noto Sans Arabic', sans-serif",
    fontWeight: "600",
    fontSize: "2rem",
    lineHeight: "1.28",
    letterSpacing: "initial",
  },
  h4: {
    fontFamily:
      "'Public Sans', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen-Sans', 'Ubuntu', 'Cantarell', 'Helvetica Neue', 'Noto Sans Arabic', sans-serif",
    fontWeight: "600",
    fontSize: "1.571rem",
    lineHeight: "1.27272727",
    letterSpacing: "initial",
  },
  h5: {
    fontFamily:
      "'Public Sans', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen-Sans', 'Ubuntu', 'Cantarell', 'Helvetica Neue', 'Noto Sans Arabic', sans-serif",
    fontWeight: "600",
    fontSize: "1.286rem",
    lineHeight: "1.333333333",
    letterSpacing: "initial",
  },
  h6: {
    fontFamily:
      "'Public Sans', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen-Sans', 'Ubuntu', 'Cantarell', 'Helvetica Neue', 'Noto Sans Arabic', sans-serif",
    fontWeight: "600",
    fontSize: "1.143rem",
    lineHeight: "1.25",
    letterSpacing: "initial",
  },
  //subtitle1: undefined,
  //subtitle2: undefined,
  body1: {
    fontFamily:
      "'Public Sans', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen-Sans', 'Ubuntu', 'Cantarell', 'Helvetica Neue', 'Noto Sans Arabic', sans-serif",
    fontWeight: "400",
    fontSize: "1rem",
    lineHeight: "1.42857143",
    letterSpacing: "initial",
  },
  //body2: undefined,
  //button: undefined,
  caption: {
    fontFamily:
      "'Public Sans', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen-Sans', 'Ubuntu', 'Cantarell', 'Helvetica Neue', 'Noto Sans Arabic', sans-serif",
    fontWeight: "400",
    fontSize: "0.875rem",
    lineHeight: "1.42857143",
    letterSpacing: "initial",
  },
  //overline: undefined,
};

// Update the Typography's variant prop options
// Unsure where we want to store this
//declare module "@mui/material/Typography" {
//interface TypographyPropsVariantOverrides {
//subtitle1: false;
//subtitle2: false;
//body2: false;
//button: false;
//overline: false;
//}
//}
