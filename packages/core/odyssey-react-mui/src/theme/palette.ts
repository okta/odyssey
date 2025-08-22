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

export const palette = ({
  odysseyTokens,
}: {
  odysseyTokens: DesignTokens;
}): ThemeOptions["palette"] => {
  return {
    mode: "light",
    common: {
      black: odysseyTokens.HueNeutral900,
      white: odysseyTokens.HueNeutralWhite,
    },
    primary: {
      lighter: odysseyTokens.HueBlue50,
      light: odysseyTokens.HueBlue300,
      main: odysseyTokens.HueBlue500,
      dark: odysseyTokens.HueBlue700,
      darker: odysseyTokens.HueBlue800,
      contrastText: odysseyTokens.TypographyColorInverse,
    },
    secondary: {
      light: "#80c7ca",
      main: "#096256",
      dark: "#004650",
      contrastText: odysseyTokens.TypographyColorInverse,
    },
    error: {
      lighter: odysseyTokens.HueRed50,
      light: odysseyTokens.HueRed300,
      main: odysseyTokens.HueRed500,
      dark: odysseyTokens.HueRed900,
      contrastText: odysseyTokens.TypographyColorInverse,
    },
    warning: {
      lighter: odysseyTokens.HueYellow50,
      light: odysseyTokens.HueYellow300,
      main: odysseyTokens.HueYellow500,
      dark: odysseyTokens.HueYellow900,
      contrastText: odysseyTokens.TypographyColorBody,
    },
    info: {
      lighter: odysseyTokens.HueBlue50,
      light: odysseyTokens.HueBlue300,
      main: odysseyTokens.HueBlue500,
      dark: odysseyTokens.HueBlue900,
      contrastText: odysseyTokens.TypographyColorInverse,
    },
    success: {
      lighter: odysseyTokens.HueGreen50,
      light: odysseyTokens.HueGreen300,
      main: odysseyTokens.HueGreen500,
      dark: odysseyTokens.HueGreen900,
      contrastText: odysseyTokens.TypographyColorInverse,
    },
    grey: {
      50: odysseyTokens.HueNeutral50,
      100: odysseyTokens.HueNeutral100,
      200: odysseyTokens.HueNeutral200,
      300: odysseyTokens.HueNeutral300,
      400: odysseyTokens.HueNeutral400,
      500: odysseyTokens.HueNeutral500,
      600: odysseyTokens.HueNeutral600,
      700: odysseyTokens.HueNeutral700,
      800: odysseyTokens.HueNeutral800,
      900: odysseyTokens.HueNeutral900,
      // These are "Accent" colors. MUI's palette matches them to the standard greys.
      A100: odysseyTokens.HueNeutral100,
      A200: odysseyTokens.HueNeutral200,
      A400: odysseyTokens.HueNeutral400,
      A700: odysseyTokens.HueNeutral700,
    },
    text: {
      primary: odysseyTokens.HueNeutral900,
      secondary: odysseyTokens.HueNeutral600,
      disabled: odysseyTokens.HueNeutral300,
    },
    divider: odysseyTokens.BorderColorDisplay,
    background: {
      paper: odysseyTokens.HueNeutralWhite,
      default: odysseyTokens.HueNeutralWhite,
    },
    action: {
      // We have no equivalents here. It's likely we will update these as their uses are discovered.
      active: "rgba(0, 0, 0, 0.54)",
      hover: "rgba(0, 0, 0, 0.04)",
      hoverOpacity: 0.04,
      selected: "rgba(0, 0, 0, 0.08)",
      selectedOpacity: 0.08,
      disabled: odysseyTokens.HueNeutral200,
      disabledBackground: "rgba(0, 0, 0, 0.12)",
      disabledOpacity: 0.38,
      focus: "rgba(0, 0, 0, 0.12)",
      focusOpacity: 0.12,
      activatedOpacity: 0.12,
    },
  };
};
