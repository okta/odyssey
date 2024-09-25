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
import { ScopedCssBaseline } from "@mui/material";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import { ThemeOptions } from "@mui/material";
import { deepmerge } from "@mui/utils";
import {
  OdysseyCacheProvider,
  OdysseyCacheProviderProps,
} from "./OdysseyCacheProvider";
import {
  OdysseyTranslationProvider,
  OdysseyTranslationProviderProps,
} from "./OdysseyTranslationProvider";
import { DefaultSupportedLanguages } from "./OdysseyTranslationProvider.types";
import { createOdysseyMuiTheme, DesignTokensOverride } from "./theme";
import * as Tokens from "@okta/odyssey-design-tokens";
import { OdysseyDesignTokensContext } from "./OdysseyDesignTokensContext";
import { BackgroundProvider, useBackground } from "./BackgroundContext";

const scopedCssBaselineStyles = {
  height: "inherit",
};

export type OdysseyProviderProps<
  SupportedLanguages extends string = DefaultSupportedLanguages,
> = OdysseyCacheProviderProps &
  OdysseyTranslationProviderProps<SupportedLanguages> & {
    children: ReactNode;
    designTokensOverride?: DesignTokensOverride;
    shadowDomElement?: HTMLDivElement | HTMLElement;
    shadowRootElement?: HTMLDivElement | HTMLElement;
    themeOverride?: ThemeOptions;
  };

const OdysseyProviderInner = <SupportedLanguages extends string>({
  children,
  designTokensOverride,
  emotionRoot,
  emotionRootElement,
  shadowDomElement,
  shadowRootElement,
  languageCode,
  nonce,
  stylisPlugins,
  themeOverride,
  translationOverrides,
}: OdysseyProviderProps<SupportedLanguages>) => {
  const { contrastMode } = useBackground();

  const odysseyTokens = useMemo(
    () => ({ ...Tokens, ...designTokensOverride }),
    [designTokensOverride],
  );

  const odysseyTheme = useMemo(
    () =>
      createOdysseyMuiTheme({
        odysseyTokens,
        shadowRootElement: shadowRootElement || shadowDomElement,
      }),
    [odysseyTokens, shadowDomElement, shadowRootElement],
  );

  const odysseyThemeWithBackground = useMemo(
    () =>
      createTheme({
        ...odysseyTheme,
        custom: {
          ...odysseyTheme.custom,
          isLowContrast: contrastMode === "lowContrast",
        },
        odysseyContrastMode: contrastMode,
      }),
    [odysseyTheme, contrastMode],
  );

  const customOdysseyTheme = useMemo(
    () =>
      themeOverride
        ? createTheme(deepmerge(odysseyThemeWithBackground, themeOverride))
        : odysseyThemeWithBackground,
    [odysseyThemeWithBackground, themeOverride],
  );

  return (
    <OdysseyCacheProvider
      emotionRoot={emotionRoot}
      emotionRootElement={emotionRootElement}
      hasShadowDom={Boolean(shadowRootElement || shadowDomElement)}
      nonce={nonce}
      stylisPlugins={stylisPlugins}
    >
      <MuiThemeProvider theme={customOdysseyTheme}>
        <OdysseyDesignTokensContext.Provider value={odysseyTokens}>
          {/* This component creates a div; for flexibility of layout of children, make it inherit its parent's height */}
          <ScopedCssBaseline sx={scopedCssBaselineStyles}>
            <OdysseyTranslationProvider<SupportedLanguages>
              languageCode={languageCode}
              translationOverrides={translationOverrides}
            >
              {children}
            </OdysseyTranslationProvider>
          </ScopedCssBaseline>
        </OdysseyDesignTokensContext.Provider>
      </MuiThemeProvider>
    </OdysseyCacheProvider>
  );
};

const OdysseyProvider = <SupportedLanguages extends string>(
  props: OdysseyProviderProps<SupportedLanguages>,
) => (
  <BackgroundProvider>
    <OdysseyProviderInner {...props} />
  </BackgroundProvider>
);

const MemoizedOdysseyProvider = memo(OdysseyProvider) as typeof OdysseyProvider;

export { MemoizedOdysseyProvider as OdysseyProvider };
