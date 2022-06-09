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

export const palette: ThemeOptions["palette"] = {
  mode: "light",
  common: {
    black: "#1d1d21",
    white: "#ffffff",
  },
  primary: {
    light: "#a7b5ec",
    main: "#1662dd",
    dark: "#00297a",
    contrastText: "#ffffff",
  },
  secondary: {
    light: "#80C7CA",
    main: "#2D8C9E",
    dark: "#004650",
    contrastText: "#ffffff",
  },
  error: {
    light: "#f88c90",
    main: "#da372c",
    dark: "#640019",
    contrastText: "#ffffff",
  },
  warning: {
    light: "#f9dc77",
    main: "#ffc61c",
    dark: "#663800",
    contrastText: "#1d1d21",
  },
  info: {
    light: "#a7b5ec",
    main: "#1662dd",
    dark: "#00297a",
    contrastText: "#ffffff",
  },
  success: {
    light: "#84d2b1",
    main: "#00b478",
    dark: "#00503c",
    contrastText: "#ffffff",
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
    primary: "#1d1d21",
    secondary: "#6e6e78",
    // We do not currently have a unique disabled color.
    disabled: "#6e6e78",
  },
  // Currently mapping this to ColorBorderDisplay.
  divider: "#d7d7dc",
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
    disabled: "rgba(0, 0, 0, 0.26)",
    disabledBackground: "rgba(0, 0, 0, 0.12)",
    disabledOpacity: 0.38,
    focus: "rgba(0, 0, 0, 0.12)",
    focusOpacity: 0.12,
    activatedOpacity: 0.12,
  },
};
