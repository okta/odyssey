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

import styled from "@emotion/styled";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import { deepmerge } from "@mui/utils";
import * as Tokens from "@okta/odyssey-design-tokens";
import { memo, ReactNode, useMemo } from "react";

import {
  OdysseyDesignTokensContext,
  useOdysseyDesignTokens,
} from "./OdysseyDesignTokensContext.js";
import {
  type OdysseyThemeProviderContextProps,
  OdysseyThemeProviderPropsProvider,
  useOdysseyThemeProviderPropsContext,
} from "./OdysseyThemeProviderPropsContext.js";
import {
  ContrastMode,
  ContrastModeContext,
  useContrastMode,
} from "./useContrastMode.js";
import { ThemeCacheContext, useThemeCache } from "./useThemeCache.js";

const StyledContrastContainerStyles = styled("div")({
  height: "inherit",
});

export type OdysseyThemeProviderProps = OdysseyThemeProviderContextProps & {
  /** The content to render inside the Odyssey theme context. */
  children: ReactNode;
  /**
   * Overrides the contrast mode for child components, enabling high-contrast or low-contrast
   * rendering within this subtree.
   */
  contrastMode?: ContrastMode;
  /**
   * If `true`, wraps children in a div used for contrast changes and height calculations.
   * Set to `false` when no background color change is needed and full-height rendering is not required.
   * @default true
   */
  hasWrapperElement?: boolean;
  /** @deprecated Use shadowRootElement instead */
  shadowDomElement?: HTMLDivElement | HTMLElement;
};

/**
 * This function doesn't include the Emotion Cache or Translations. You should probably
 * be using `OdysseyProvider`.
 *
 * Some teams have a need to wrap separately (SIW), but most teams will never need to use
 * this explicitly.
 */
const OdysseyThemeProvider = ({
  children,
  contrastMode: contrastModeProp,
  designTokensOverride: designTokensOverrideProp,
  hasWrapperElement = true,
  shadowDomElement,
  shadowRootElement: shadowRootElementProp,
  themeOverride: themeOverrideProp,
}: OdysseyThemeProviderProps) => {
  const odysseyThemeProviderPropsContext =
    useOdysseyThemeProviderPropsContext();

  const designTokensOverride =
    designTokensOverrideProp ??
    odysseyThemeProviderPropsContext.designTokensOverride;

  const shadowRootElement =
    shadowRootElementProp ??
    shadowDomElement ??
    odysseyThemeProviderPropsContext.shadowRootElement; // Adding `odysseyThemeProviderPropsContext.shadowRootElement` fixes popovers not being styled in `Surface`.

  const themeOverride =
    themeOverrideProp ?? odysseyThemeProviderPropsContext.themeOverride;

  const { contrastMode, contrastContainerRef } = useContrastMode({
    contrastMode: contrastModeProp,
  });

  const parentOdysseyTokens = useOdysseyDesignTokens();

  const odysseyTokens = useMemo(
    () =>
      designTokensOverrideProp
        ? { ...Tokens, ...designTokensOverrideProp }
        : parentOdysseyTokens,
    [designTokensOverrideProp, parentOdysseyTokens],
  );

  const { getOrCreateTheme, themeCache } = useThemeCache({
    odysseyTokens,
    shadowRootElement,
  });

  const odysseyTheme = useMemo(
    () => getOrCreateTheme(contrastMode),
    [getOrCreateTheme, contrastMode],
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

  const providerComponents = useMemo(
    () => (
      <ThemeCacheContext.Provider value={themeCache}>
        <ContrastModeContext.Provider value={contrastModeProviderValue}>
          <MuiThemeProvider theme={customOdysseyTheme}>
            <OdysseyThemeProviderPropsProvider
              designTokensOverride={designTokensOverride}
              shadowRootElement={shadowRootElement}
              themeOverride={themeOverride}
            >
              <OdysseyDesignTokensContext.Provider value={odysseyTokens}>
                {children}
              </OdysseyDesignTokensContext.Provider>
            </OdysseyThemeProviderPropsProvider>
          </MuiThemeProvider>
        </ContrastModeContext.Provider>
      </ThemeCacheContext.Provider>
    ),
    [
      children,
      contrastModeProviderValue,
      customOdysseyTheme,
      designTokensOverride,
      odysseyTokens,
      shadowRootElement,
      themeCache,
      themeOverride,
    ],
  );

  return hasWrapperElement ? (
    <StyledContrastContainerStyles ref={contrastContainerRef}>
      {providerComponents}
    </StyledContrastContainerStyles>
  ) : (
    providerComponents
  );
};

const MemoizedOdysseyThemeProvider = memo(OdysseyThemeProvider);
MemoizedOdysseyThemeProvider.displayName = "OdysseyThemeProvider";

export { MemoizedOdysseyThemeProvider as OdysseyThemeProvider };
