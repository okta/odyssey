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

import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { memo, ReactElement, useMemo } from "react";

// import { createTheme, deepmerge, ThemeOptions, DesignTokensOverride } from ".";
import { createTheme, ThemeOptions } from "@mui/material";
import { deepmerge } from "@mui/utils";
import { createOdysseyMuiTheme, DesignTokensOverride } from "./theme";
import * as Tokens from "@okta/odyssey-design-tokens";

const OdysseyThemeProvider = ({
  children,
  themeOverride,
  designTokensOverride,
}: {
  children: ReactElement;
  themeOverride?: ThemeOptions;
  designTokensOverride?: DesignTokensOverride;
}) => {
  const odysseyTokens = { ...Tokens, ...designTokensOverride };
  const odysseyTheme = createOdysseyMuiTheme(odysseyTokens);

  const customOdysseyTheme = useMemo(
    () => themeOverride && createTheme(deepmerge(odysseyTheme, themeOverride)),
    [odysseyTheme, themeOverride]
  );

  return (
    <MuiThemeProvider theme={customOdysseyTheme ?? odysseyTheme}>
      {children}
    </MuiThemeProvider>
  );
};

const MemoizedOdysseyThemeProvider = memo(OdysseyThemeProvider);

export { MemoizedOdysseyThemeProvider as OdysseyThemeProvider };
