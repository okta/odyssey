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

import React, { createContext, ReactNode, useMemo } from "react";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import { ThemeOptions } from "@mui/material";
import { deepmerge } from "@mui/utils";
import { createOdysseyMuiTheme, DesignTokensOverride } from "./theme";
import * as Tokens from "@okta/odyssey-design-tokens";
import { OdysseyDesignTokensContext } from "./OdysseyDesignTokensContext";
import {
  useContrastModeContext,
  ContrastModeProvider,
} from "./ContrastModeProvider";

export type OdysseyThemeProviderProps = {
  children: ReactNode;
  designTokensOverride?: DesignTokensOverride;
  shadowRootElement?: HTMLDivElement | HTMLElement;
  /** @deprecated Use shadowRootElement instead */
  shadowDomElement?: HTMLDivElement | HTMLElement;
  themeOverride?: ThemeOptions;
  contrastMode?: "lowContrast" | "highContrast";
};

type OdysseyThemeProviderContextProps = Omit<
  OdysseyThemeProviderProps,
  "children" | "contrastMode"
>;

const OdysseyThemeProviderPropsContext =
  createContext<OdysseyThemeProviderContextProps>({});

const InnerOdysseyThemeProvider: React.FC<OdysseyThemeProviderProps> = ({
  children,
  designTokensOverride,
  shadowRootElement,
  shadowDomElement,
  themeOverride,
}) => {
  const { contrastMode } = useContrastModeContext();

  const odysseyTokens = useMemo(
    () => ({ ...Tokens, ...designTokensOverride }),
    [designTokensOverride],
  );

  const effectiveShadowRootElement = shadowRootElement || shadowDomElement;

  const odysseyTheme = useMemo(
    () =>
      createOdysseyMuiTheme({
        contrastMode,
        odysseyTokens,
        shadowRootElement: effectiveShadowRootElement,
      }),
    [contrastMode, odysseyTokens, effectiveShadowRootElement],
  );

  const customOdysseyTheme = useMemo(
    () => createTheme(deepmerge(odysseyTheme, themeOverride || {})),
    [odysseyTheme, themeOverride],
  );

  const contextValue = useMemo(
    () => ({
      designTokensOverride,
      shadowRootElement,
      shadowDomElement,
      themeOverride,
    }),
    [designTokensOverride, shadowRootElement, shadowDomElement, themeOverride],
  );

  return (
    <MuiThemeProvider theme={customOdysseyTheme}>
      <OdysseyDesignTokensContext.Provider value={odysseyTokens}>
        <OdysseyThemeProviderPropsContext.Provider value={contextValue}>
          {children}
        </OdysseyThemeProviderPropsContext.Provider>
      </OdysseyDesignTokensContext.Provider>
    </MuiThemeProvider>
  );
};

export const OdysseyThemeProvider: React.FC<OdysseyThemeProviderProps> = (
  props,
) => (
  <ContrastModeProvider contrastMode={props.contrastMode}>
    <InnerOdysseyThemeProvider {...props} />
  </ContrastModeProvider>
);
