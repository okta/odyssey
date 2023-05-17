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

import { deepmerge } from "@mui/utils";
import { TokenOverrideOptions } from ".";

export const palette = (
  tokenOverrides?: TokenOverrideOptions
): ThemeOptions["palette"] => {
  const odysseyTokens = deepmerge(Tokens, tokenOverrides);
  return {
    mode: "light",
    common: {
      black: odysseyTokens.ColorNeutralDark,
      white: odysseyTokens.ColorPaletteNeutralWhite,
    },
    primary: {
      lighter: odysseyTokens.ColorPaletteBlue000,
      light: odysseyTokens.ColorPaletteBlue300,
      main: odysseyTokens.ColorPaletteBlue500,
      dark: odysseyTokens.ColorPaletteBlue900,
      contrastText: odysseyTokens.ColorTextBodyInverse,
    },
    secondary: {
      light: "#80c7ca",
      main: odysseyTokens.ColorPaletteTurquoise500,
      dark: "#004650",
      contrastText: odysseyTokens.ColorTextBodyInverse,
    },
    error: {
      lighter: odysseyTokens.ColorPaletteRed000,
      light: odysseyTokens.ColorPaletteRed300,
      main: odysseyTokens.ColorPaletteRed500,
      dark: odysseyTokens.ColorPaletteRed900,
      contrastText: odysseyTokens.ColorTextBodyInverse,
    },
    warning: {
      lighter: odysseyTokens.ColorPaletteYellow000,
      light: odysseyTokens.ColorPaletteYellow300,
      main: odysseyTokens.ColorPaletteYellow500,
      dark: odysseyTokens.ColorPaletteYellow900,
      contrastText: odysseyTokens.ColorTextBody,
    },
    info: {
      lighter: odysseyTokens.ColorPaletteBlue000,
      light: odysseyTokens.ColorPaletteBlue300,
      main: odysseyTokens.ColorPaletteBlue500,
      dark: odysseyTokens.ColorPaletteBlue900,
      contrastText: odysseyTokens.ColorTextBodyInverse,
    },
    success: {
      lighter: odysseyTokens.ColorPaletteGreen000,
      light: odysseyTokens.ColorPaletteGreen300,
      main: odysseyTokens.ColorPaletteGreen500,
      dark: odysseyTokens.ColorPaletteGreen900,
      contrastText: odysseyTokens.ColorTextBodyInverse,
    },
    grey: {
      50: odysseyTokens.ColorPaletteNeutral000,
      100: odysseyTokens.ColorPaletteNeutral100,
      200: odysseyTokens.ColorPaletteNeutral200,
      300: "#c1c1c8",
      400: "#aaaab4",
      500: odysseyTokens.ColorPaletteNeutral500,
      600: odysseyTokens.ColorPaletteNeutral600,
      700: "#585862",
      800: "#41414b",
      900: odysseyTokens.ColorPaletteNeutral900,
      // These are "Accent" colors. MUI's palette matches them to the standard greys.
      A100: odysseyTokens.ColorPaletteNeutral100,
      A200: odysseyTokens.ColorPaletteNeutral200,
      A400: "#aaaab4",
      A700: "#585862",
    },
    text: {
      primary: odysseyTokens.ColorPaletteNeutral900,
      secondary: odysseyTokens.ColorPaletteNeutral600,
      disabled: odysseyTokens.ColorPaletteNeutral600,
    },
    divider: odysseyTokens.ColorBorderDisplay,
    background: {
      paper: odysseyTokens.ColorBackgroundBase,
      default: odysseyTokens.ColorBackgroundBase,
    },
    action: {
      // We have no equivalents here. It's likely we will update these as their uses are discovered.
      active: "rgba(0, 0, 0, 0.54)",
      hover: "rgba(0, 0, 0, 0.04)",
      hoverOpacity: 0.04,
      selected: "rgba(0, 0, 0, 0.08)",
      selectedOpacity: 0.08,
      disabled: odysseyTokens.ColorPaletteNeutral200,
      disabledBackground: "rgba(0, 0, 0, 0.12)",
      disabledOpacity: 0.38,
      focus: "rgba(0, 0, 0, 0.12)",
      focusOpacity: 0.12,
      activatedOpacity: 0.12,
    },
  };
};
