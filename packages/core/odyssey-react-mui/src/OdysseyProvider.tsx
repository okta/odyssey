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
import { memo, ReactNode } from "react";

import {
  OdysseyCacheProvider,
  OdysseyCacheProviderProps,
} from "./OdysseyCacheProvider.js";
import {
  OdysseyThemeProvider,
  OdysseyThemeProviderProps,
} from "./OdysseyThemeProvider.js";
import {
  OdysseyTranslationProvider,
  OdysseyTranslationProviderProps,
} from "./OdysseyTranslationProvider.js";
import { DefaultSupportedLanguages } from "./OdysseyTranslationProvider.types.js";

const scopedCssBaselineStyles = {
  height: "inherit",
};

export type OdysseyProviderProps<
  SupportedLanguages extends string = DefaultSupportedLanguages,
> = OdysseyCacheProviderProps &
  OdysseyThemeProviderProps &
  OdysseyTranslationProviderProps<SupportedLanguages> & {
    children: ReactNode;
    /**
     * Whether to emit the ScopedCssBaseline. Defaults to true.
     */
    hasScopedCssBaseline?: boolean;
  };

const OdysseyProvider = <SupportedLanguages extends string>({
  children,
  contrastMode,
  designTokensOverride,
  emotionRoot,
  emotionRootElement,
  hasScopedCssBaseline = true,
  languageCode,
  nonce,
  shadowDomElement,
  shadowRootElement,
  stylisPlugins,
  themeOverride,
  translationOverrides,
}: OdysseyProviderProps<SupportedLanguages>) => (
  <OdysseyCacheProvider
    emotionRootElement={emotionRootElement || emotionRoot}
    hasShadowDom={Boolean(shadowRootElement || shadowDomElement)}
    nonce={nonce}
    stylisPlugins={stylisPlugins}
  >
    <OdysseyThemeProvider
      contrastMode={contrastMode}
      designTokensOverride={designTokensOverride}
      shadowDomElement={shadowDomElement}
      shadowRootElement={shadowRootElement}
      themeOverride={themeOverride}
    >
      <OdysseyTranslationProvider<SupportedLanguages>
        languageCode={languageCode}
        translationOverrides={translationOverrides}
      >
        {hasScopedCssBaseline ? (
          <ScopedCssBaseline sx={scopedCssBaselineStyles}>
            {children}
          </ScopedCssBaseline>
        ) : (
          children
        )}
      </OdysseyTranslationProvider>
    </OdysseyThemeProvider>
  </OdysseyCacheProvider>
);
OdysseyProvider.displayName = "OdysseyProvider";

const MemoizedOdysseyProvider = memo(OdysseyProvider) as typeof OdysseyProvider;

export { MemoizedOdysseyProvider as OdysseyProvider };
