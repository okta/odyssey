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

import { memo, ReactNode, useMemo } from "react";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import { ThemeOptions } from "@mui/material";
import { deepmerge } from "@mui/utils";
import styled from "@emotion/styled";
import { createOdysseyMuiTheme, DesignTokensOverride } from "./theme";
import * as Tokens from "@okta/odyssey-design-tokens";

import {
  ContrastMode,
  ContrastModeContext,
  useContrastMode,
} from "./useContrastMode";
import { OdysseyDesignTokensContext } from "./OdysseyDesignTokensContext";

export type OdysseyThemeProviderProps = {
  children: ReactNode;
  contrastMode?: ContrastMode;
  designTokensOverride?: DesignTokensOverride;
  /** @deprecated Use shadowRootElement instead */
  shadowDomElement?: HTMLDivElement | HTMLElement;
  shadowRootElement?: HTMLDivElement | HTMLElement;
  themeOverride?: ThemeOptions;
};

const StyledContrastContainerStyles = styled("div")(() => ({
  height: "inherit",
}));

/**
 * This function doesn't include the Emotion Cache or Translations. You should probably be using `OdysseyProvider`.
 *
 * Some teams have a need to wrap separately (SIW), but most teams will never need to use this explicitly.
 */
const OdysseyThemeProvider = ({
  children,
  contrastMode: explicitContrastMode,
  designTokensOverride,
  shadowDomElement,
  shadowRootElement,
  themeOverride,
}: OdysseyThemeProviderProps) => {
  const { contrastMode, contrastContainerRef } = useContrastMode({
    contrastMode: explicitContrastMode,
  });

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

  const contrastModeProviderValue = useMemo(
    () => ({
      contrastMode,
    }),
    [contrastMode],
  );

  return (
    <StyledContrastContainerStyles ref={contrastContainerRef}>
      <ContrastModeContext.Provider value={contrastModeProviderValue}>
        <MuiThemeProvider theme={customOdysseyTheme}>
          <OdysseyDesignTokensContext.Provider value={odysseyTokens}>
            {children}
          </OdysseyDesignTokensContext.Provider>
        </MuiThemeProvider>
      </ContrastModeContext.Provider>
    </StyledContrastContainerStyles>
  );
};

const MemoizedOdysseyThemeProvider = memo(
  OdysseyThemeProvider,
) as typeof OdysseyThemeProvider;

export { MemoizedOdysseyThemeProvider as OdysseyThemeProvider };
