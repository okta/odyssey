/*!
 * Copyright (c) 2023-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { createTheme } from "@mui/material/styles";
import * as Tokens from "@okta/odyssey-design-tokens";

import { components } from "./components";
import { mixins } from "./mixins";
import { palette } from "./palette";
import { shape } from "./shape";
import { spacing } from "./spacing";
import { typography } from "./typography";
import "./components.types";
import "./mixins.types";
import "./palette.types";
import "./typography.types";
import { type ContrastMode } from "../ContrastModeProvider";

export type DesignTokens = typeof Tokens;
export type DesignTokensOverride = Partial<typeof Tokens>;

export const createOdysseyMuiTheme = ({
  contrastMode = "lowContrast",
  odysseyTokens,
  shadowDomElement,
  shadowRootElement,
}: {
  contrastMode?: ContrastMode;
  odysseyTokens: DesignTokens;
  /** @deprecated Use `shadowRootElement` */
  shadowDomElement?: HTMLElement;
  shadowRootElement?: HTMLElement;
}) =>
  createTheme({
    components: components({
      contrastMode,
      odysseyTokens,
      shadowRootElement: shadowRootElement || shadowDomElement,
    }),
    mixins: mixins({ odysseyTokens }),
    palette: palette({ odysseyTokens }),
    shape: shape({ odysseyTokens }),
    spacing: spacing({ odysseyTokens }),
    typography: typography({ odysseyTokens }),
  });
