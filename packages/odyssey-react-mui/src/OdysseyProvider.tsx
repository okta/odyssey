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

import { memo, ReactElement } from "react";

import { ThemeOptions, TokenOverrideOptions } from ".";
import { OdysseyCacheProvider } from "./OdysseyCacheProvider";
import { OdysseyThemeProvider } from "./OdysseyThemeProvider";
import {
  OdysseyTranslationProvider,
  TranslationOverrides,
} from "./OdysseyTranslationProvider";
import { SupportedLanguages } from "./OdysseyTranslationProvider.types";

type OdysseyProviderProps = {
  children: ReactElement;
  nonce?: string;
  themeOverride?: ThemeOptions;
  tokenOverride?: TokenOverrideOptions;
  languageCode?: SupportedLanguages;
  translationOverrides?: TranslationOverrides;
};

const OdysseyProvider = ({
  children,
  nonce,
  themeOverride,
  tokenOverride,
  languageCode,
  translationOverrides,
}: OdysseyProviderProps) => (
  <OdysseyCacheProvider nonce={nonce}>
    <OdysseyThemeProvider
      themeOverride={themeOverride}
      tokenOverride={tokenOverride}
    >
      <OdysseyTranslationProvider
        languageCode={languageCode}
        translationOverrides={translationOverrides}
      >
        {children}
      </OdysseyTranslationProvider>
    </OdysseyThemeProvider>
  </OdysseyCacheProvider>
);

const MemoizedThemeProvider = memo(OdysseyProvider);

export { MemoizedThemeProvider as OdysseyProvider };
