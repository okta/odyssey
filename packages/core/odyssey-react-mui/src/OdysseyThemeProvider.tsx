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

import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import { deepmerge } from "@mui/utils";
import { memo, ReactNode, useMemo } from "react";

import { createOdysseyStyledComponent } from "./createOdysseyStyledComponent.js";
import {
  OdysseyDesignTokensContext,
  useOdysseyDesignTokens,
} from "./OdysseyDesignTokensContext.js";
import {
  type OdysseyThemeProviderContextProps,
  OdysseyThemeProviderPropsProvider,
  useOdysseyThemeProviderPropsContext,
} from "./OdysseyThemeProviderPropsContext.js";
import { resolveColorSchemeDesignTokens } from "./resolveColorSchemeDesignTokens.js";
import { type DesignTokens } from "./theme/theme.js";
import {
  type ColorScheme,
  ColorSchemeContext,
  type ResolvedColorScheme,
  useResolvedColorScheme,
} from "./useColorScheme.js";
import {
  ContrastMode,
  ContrastModeContext,
  useContrastMode,
} from "./useContrastMode.js";
import { ThemeCacheContext, useThemeCache } from "./useThemeCache.js";

const StyledContrastContainerStyles = createOdysseyStyledComponent({
  tag: "div",
})({
  height: "inherit",
});

export type OdysseyThemeProviderProps = OdysseyThemeProviderContextProps & {
  /** The content to render inside the Odyssey theme context. */
  children: ReactNode;
  /**
   * The color scheme to render. `system` follows the operating system's light or dark setting and switches live when it changes. Left unset, a nested provider inherits its parent's scheme and a root provider renders `light`.
   *
   * Switching schemes rebuilds the Emotion style cache so styles keep their first-render order, and only `OdysseyProvider` owns that cache. For a subtree that switches schemes on its own, render an `OdysseyProvider` there rather than an `OdysseyThemeProvider`.
   * @default "light"
   */
  colorScheme?: ColorScheme;
  /**
   * Overrides the contrast mode for child components, enabling high-contrast or low-contrast rendering within this subtree.
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
 * This function doesn't include the Emotion Cache or Translations. You should probably be using `OdysseyProvider`.
 *
 * Some teams have a need to wrap separately (SIW), but most teams will never need to use this explicitly.
 */
const OdysseyThemeProvider = ({
  children,
  colorScheme: colorSchemeProp,
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

  const colorScheme = useResolvedColorScheme({ colorScheme: colorSchemeProp });

  const parentOdysseyTokens = useOdysseyDesignTokens();

  // A provider with none of these props is nested inside another Odyssey
  // provider, such as the one `Surface` renders, and must keep its parent's
  // tokens rather than rebuild them.
  const hasOwnDesignTokens = Boolean(
    colorSchemeProp || designTokensOverrideProp,
  );

  // Only an inherited provider reads its parent's tokens. Leaving them out of a provider with its own tokens keeps both token objects, and so both schemes' themes, stable when the parent switches.
  const inheritedOdysseyTokens = hasOwnDesignTokens
    ? undefined
    : parentOdysseyTokens;

  // Keep both token objects stable across switches so each scheme retains its themes.
  const lightModeTokens = useMemo(
    () =>
      inheritedOdysseyTokens ??
      resolveColorSchemeDesignTokens({
        colorScheme: "light",
        designTokensOverride,
      }),
    [designTokensOverride, inheritedOdysseyTokens],
  );
  const darkModeTokens = useMemo(
    () =>
      inheritedOdysseyTokens ??
      resolveColorSchemeDesignTokens({
        colorScheme: "dark",
        designTokensOverride,
      }),
    [designTokensOverride, inheritedOdysseyTokens],
  );
  // Keyed by `ResolvedColorScheme`, so a new scheme fails to compile here until this provider builds its tokens and theme cache.
  const odysseyTokensByColorScheme: Record<ResolvedColorScheme, DesignTokens> =
    { dark: darkModeTokens, light: lightModeTokens };
  const odysseyTokens = odysseyTokensByColorScheme[colorScheme];

  const { contrastMode, contrastContainerRef } = useContrastMode({
    contrastMode: contrastModeProp,
    highContrastBackgroundColor: odysseyTokens.HueNeutral50,
  });

  // A provider with its own tokens keeps themes for every scheme, so switching back reuses them. An inherited provider only ever renders its parent's scheme, and it rebuilds when the parent switches, so it builds that scheme alone.
  const lightModeThemeCache = useThemeCache({
    colorScheme: "light",
    isEnabled: hasOwnDesignTokens || colorScheme === "light",
    odysseyTokens: lightModeTokens,
    shadowRootElement,
  });
  const darkModeThemeCache = useThemeCache({
    colorScheme: "dark",
    isEnabled: hasOwnDesignTokens || colorScheme === "dark",
    odysseyTokens: darkModeTokens,
    shadowRootElement,
  });
  const themeCacheByColorScheme: Record<
    ResolvedColorScheme,
    typeof lightModeThemeCache
  > = { dark: darkModeThemeCache, light: lightModeThemeCache };
  const { getOrCreateTheme, themeCache } = themeCacheByColorScheme[colorScheme];

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
      contrastContainerRef,
      contrastMode,
    }),
    [contrastContainerRef, contrastMode],
  );

  const providerComponents = useMemo(
    () => (
      <ThemeCacheContext.Provider value={themeCache}>
        <ColorSchemeContext.Provider value={colorScheme}>
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
        </ColorSchemeContext.Provider>
      </ThemeCacheContext.Provider>
    ),
    [
      children,
      colorScheme,
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
