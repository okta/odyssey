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

export const palette: ThemeOptions["palette"] = {
  mode: "light",
  common: {
    black: Tokens.ColorNeutralDark,
    white: Tokens.ColorPaletteNeutralWhite,
  },
  primary: {
    light: Tokens.ColorPrimaryLight,
    main: Tokens.ColorPrimaryBase,
    dark: Tokens.ColorPrimaryDark,
    contrastText: Tokens.ColorTextBodyInverse,
  },
  secondary: {
    light: "#80C7CA",
    main: Tokens.ColorPaletteTurquoise500,
    dark: "#004650",
    contrastText: Tokens.ColorTextBodyInverse,
  },
  error: {
    light: Tokens.ColorBackgroundDangerBase,
    main: Tokens.ColorDangerBase,
    dark: Tokens.ColorDangerDark,
    contrastText: Tokens.ColorTextBodyInverse,
  },
  warning: {
    light: Tokens.ColorCautionLight,
    main: Tokens.ColorCautionBase,
    dark: Tokens.ColorCautionDark,
    contrastText: Tokens.ColorTextBody,
  },
  info: {
    light: Tokens.ColorPrimaryLight,
    main: Tokens.ColorPrimaryBase,
    dark: Tokens.ColorPrimaryDark,
    contrastText: Tokens.ColorTextBodyInverse,
  },
  success: {
    light: "#84d2b1",
    main: "#00b478",
    dark: "#00503c",
    contrastText: Tokens.ColorTextBodyInverse,
  },
  grey: {
    50: "#f5f5f6",
    100: "#ebebed",
    200: "#d7d7dc",
    300: "#c1c1c8",
    400: "#aaaab4",
    500: "#8c8c96",
    600: "#6e6e78",
    700: "#585862",
    800: "#41414b",
    900: "#1d1d21",
    // These are "Accent" colors. MUI's palette matches them to the standard greys.
    A100: "#ebebed",
    A200: "#d7d7dc",
    A400: "#aaaab4",
    A700: "#585862",
  },
  text: {
    primary: Tokens.ColorNeutralDark,
    secondary: Tokens.ColorNeutralBase,
    disabled: Tokens.ColorNeutralBase, // We do not currently have a unique disabled color.
  },
  divider: Tokens.ColorBorderDisplay,
  background: {
    paper: Tokens.ColorBackgroundBase,
    default: Tokens.ColorBackgroundBase,
  },
  action: {
    // We have no equivalents here. It's likely we will update these as their uses are discovered.
    active: "rgba(0, 0, 0, 0.54)",
    hover: "rgba(0, 0, 0, 0.04)",
    hoverOpacity: 0.04,
    selected: "rgba(0, 0, 0, 0.08)",
    selectedOpacity: 0.08,
    disabled: "rgba(0, 0, 0, 0.26)",
    disabledBackground: "rgba(0, 0, 0, 0.12)",
    disabledOpacity: 0.38,
    focus: "rgba(0, 0, 0, 0.12)",
    focusOpacity: 0.12,
    activatedOpacity: 0.12,
  },
};
