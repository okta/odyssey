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

import { memo, ReactNode } from "react";
import { ScopedCssBaseline } from "@mui/material";

import {
  OdysseyCacheProvider,
  OdysseyCacheProviderProps,
} from "./OdysseyCacheProvider";
import {
  OdysseyThemeProvider,
  OdysseyThemeProviderProps,
} from "./OdysseyThemeProvider";
import {
  OdysseyTranslationProvider,
  OdysseyTranslationProviderProps,
} from "./OdysseyTranslationProvider";
import { DefaultSupportedLanguages } from "./OdysseyTranslationProvider.types";
import { ContrastModeProvider } from "./ContrastModeProvider";

const scopedCssBaselineStyles = {
  height: "inherit",
};

export type OdysseyProviderProps<
  SupportedLanguages extends string = DefaultSupportedLanguages,
> = OdysseyCacheProviderProps &
  OdysseyThemeProviderProps &
  OdysseyTranslationProviderProps<SupportedLanguages> & {
    children: ReactNode;
  };

const OdysseyProvider = <SupportedLanguages extends string>({
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
}: OdysseyProviderProps<SupportedLanguages>) => (
  <ContrastModeProvider>
    <OdysseyCacheProvider
      emotionRoot={emotionRoot}
      emotionRootElement={emotionRootElement}
      hasShadowDom={Boolean(shadowRootElement || shadowDomElement)}
      nonce={nonce}
      stylisPlugins={stylisPlugins}
    >
      <OdysseyThemeProvider
        designTokensOverride={designTokensOverride}
        shadowDomElement={shadowDomElement}
        shadowRootElement={shadowRootElement}
        themeOverride={themeOverride}
      >
        <ScopedCssBaseline sx={scopedCssBaselineStyles}>
          <OdysseyTranslationProvider<SupportedLanguages>
            languageCode={languageCode}
            translationOverrides={translationOverrides}
          >
            {children}
          </OdysseyTranslationProvider>
        </ScopedCssBaseline>
      </OdysseyThemeProvider>
    </OdysseyCacheProvider>
  </ContrastModeProvider>
);

const MemoizedOdysseyProvider = memo(OdysseyProvider) as typeof OdysseyProvider;

export { MemoizedOdysseyProvider as OdysseyProvider };
