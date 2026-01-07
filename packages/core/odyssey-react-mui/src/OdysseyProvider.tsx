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

import { ScopedCssBaseline } from "@mui/material";
import { memo, ReactNode, useMemo } from "react";

import {
  ConditionalWrapper,
  ConditionalWrapperProps,
} from "./ConditionalWrapper.js";
import { CssBaseline } from "./CssBaseline.js";
import {
  FullScreenOverlayProvider,
  FullScreenOverlayProviderProps,
} from "./FullScreenOverlayContext.js";
import {
  type DefaultSupportedLanguages,
  TranslationProvider as OdysseyTranslationProvider,
  type TranslationProviderProps as OdysseyTranslationProviderProps,
} from "./i18n.generated/i18n.js";
import {
  OdysseyCacheProvider,
  OdysseyCacheProviderProps,
} from "./OdysseyCacheProvider.js";
import {
  OdysseyThemeProvider,
  OdysseyThemeProviderProps,
} from "./OdysseyThemeProvider.js";

const scopedCssBaselineStyles = {
  height: "inherit",
};

export type OdysseyProviderProps<
  SupportedLanguages extends string = DefaultSupportedLanguages,
> = Omit<OdysseyCacheProviderProps, "hasShadowDom"> &
  FullScreenOverlayProviderProps &
  OdysseyThemeProviderProps &
  OdysseyTranslationProviderProps<SupportedLanguages> & {
    children: ReactNode;
    /**
     * Whether to emit the ScopedCssBaseline. Defaults to true.
     */
    hasCssBaseline?: boolean;
    /**
     * Adds the `ScopedCssBaseline` wrapper. This also adds a `div`, so it might not be what you want.
     */
    hasScopedCssBaseline?: boolean;
    /**
     * If `true`, the `OdysseyTranslationProvider` wrapper will be added. Defaults to `true`.
     * This should only be set to `false` if there exists an OdysseyTranslationProvider higher up in the tree.
     * @default true
     */
    hasTranslationProvider?: boolean;
  };

const OdysseyProvider = <SupportedLanguages extends string>({
  children,
  contrastMode,
  designTokensOverride,
  emotionRoot,
  emotionRootElement,
  hasCssBaseline: hasGlobalCss,
  hasScopedCssBaseline = true,
  hasTranslationProvider = true,
  hasWrapperElement,
  languageCode,
  nonce,
  overlayParentElement,
  overlayType,
  shadowDomElement,
  shadowRootElement,
  stylisPlugins,
  themeOverride,
  translationOverrides,
}: OdysseyProviderProps<SupportedLanguages>) => {
  const TranslationWrapper = useMemo<ConditionalWrapperProps["Wrapper"]>(
    () => (children) => (
      <OdysseyTranslationProvider<SupportedLanguages>
        languageCode={languageCode}
        translationOverrides={translationOverrides}
      >
        {children}
      </OdysseyTranslationProvider>
    ),
    [languageCode, translationOverrides],
  );

  return (
    <OdysseyCacheProvider
      emotionRootElement={emotionRootElement || emotionRoot}
      nonce={nonce}
      stylisPlugins={stylisPlugins}
    >
      <OdysseyThemeProvider
        contrastMode={contrastMode}
        designTokensOverride={designTokensOverride}
        hasWrapperElement={hasWrapperElement}
        shadowRootElement={shadowRootElement ?? shadowDomElement}
        themeOverride={themeOverride}
      >
        <ConditionalWrapper
          isWrapped={hasTranslationProvider}
          Wrapper={TranslationWrapper}
        >
          <FullScreenOverlayProvider
            hasShadowDom={Boolean(shadowRootElement || shadowDomElement)}
            overlayParentElement={overlayParentElement}
            overlayType={overlayType}
          >
            {hasGlobalCss && <CssBaseline />}

            {hasScopedCssBaseline ? (
              <ScopedCssBaseline sx={scopedCssBaselineStyles}>
                {children}
              </ScopedCssBaseline>
            ) : (
              children
            )}
          </FullScreenOverlayProvider>
        </ConditionalWrapper>
      </OdysseyThemeProvider>
    </OdysseyCacheProvider>
  );
};

const MemoizedOdysseyProvider = memo(OdysseyProvider);
MemoizedOdysseyProvider.displayName = "OdysseyProvider";

export { MemoizedOdysseyProvider as OdysseyProvider };
