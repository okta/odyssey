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
    black: Tokens.HueNeutral900,
    white: "#ffffff",
  },
  primary: {
    lighter: Tokens.HueBlue50,
    light: Tokens.HueBlue300,
    main: Tokens.HueBlue500,
    dark: Tokens.HueBlue900,
    contrastText: Tokens.FontColorBodyInverse,
  },
  secondary: {
    light: "#80c7ca",
    main: "#096256",
    dark: "#004650",
    contrastText: Tokens.FontColorBodyInverse,
  },
  error: {
    lighter: Tokens.HueRed50,
    light: Tokens.HueRed300,
    main: Tokens.HueRed500,
    dark: Tokens.HueRed900,
    contrastText: Tokens.FontColorBodyInverse,
  },
  warning: {
    lighter: Tokens.HueYellow50,
    light: Tokens.HueYellow300,
    main: Tokens.HueYellow500,
    dark: Tokens.HueYellow900,
    contrastText: Tokens.FontColorBody,
  },
  info: {
    lighter: Tokens.HueBlue50,
    light: Tokens.HueBlue300,
    main: Tokens.HueBlue500,
    dark: Tokens.HueBlue900,
    contrastText: Tokens.FontColorBodyInverse,
  },
  success: {
    lighter: Tokens.HueGreen50,
    light: Tokens.HueGreen300,
    main: Tokens.HueGreen500,
    dark: Tokens.HueGreen900,
    contrastText: Tokens.FontColorBodyInverse,
  },
  grey: {
    50: Tokens.HueNeutral50,
    100: Tokens.HueNeutral100,
    200: Tokens.HueNeutral200,
    300: Tokens.HueNeutral300,
    400: Tokens.HueNeutral400,
    500: Tokens.HueNeutral500,
    600: Tokens.HueNeutral600,
    700: Tokens.HueNeutral700,
    800: Tokens.HueNeutral800,
    900: Tokens.HueNeutral900,
    // These are "Accent" colors. MUI's palette matches them to the standard greys.
    A100: Tokens.HueNeutral100,
    A200: Tokens.HueNeutral200,
    A400: Tokens.HueNeutral400,
    A700: Tokens.HueNeutral700,
  },
  text: {
    primary: Tokens.HueNeutral900,
    secondary: Tokens.HueNeutral600,
    disabled: Tokens.HueNeutral600,
  },
  divider: Tokens.BorderColorDisplay,
  background: {
    paper: "#ffffff",
    default: "#ffffff",
  },
  action: {
    // We have no equivalents here. It's likely we will update these as their uses are discovered.
    active: "rgba(0, 0, 0, 0.54)",
    hover: "rgba(0, 0, 0, 0.04)",
    hoverOpacity: 0.04,
    selected: "rgba(0, 0, 0, 0.08)",
    selectedOpacity: 0.08,
    disabled: Tokens.HueNeutral200,
    disabledBackground: "rgba(0, 0, 0, 0.12)",
    disabledOpacity: 0.38,
    focus: "rgba(0, 0, 0, 0.12)",
    focusOpacity: 0.12,
    activatedOpacity: 0.12,
  },
};
