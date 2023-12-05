/*!
 * Copyright (c) 2023-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { ReactNode, useEffect } from "react";

import { DefaultSupportedLanguages } from "./OdysseyTranslationProvider.types";

import { i18n, defaultNS, resources } from "./i18n";
import { I18nextProvider } from "react-i18next";

export type TranslationOverrides = Record<
  string,
  Partial<(typeof resources)["en"]>
>;

const mergeBundleOverrides = (
  languageCode: string,
  translationOverrides: TranslationOverrides
) => {
  const bundle = resources[languageCode] || {};
  const overrides = translationOverrides[languageCode];
  return {
    ...bundle,
    ...overrides,
  };
};

export type OdysseyTranslationProviderProps<
  SupportedLanguages extends string = DefaultSupportedLanguages
> = {
  children: ReactNode;
  languageCode?: SupportedLanguages | DefaultSupportedLanguages;
  translationOverrides?: TranslationOverrides;
};

export const OdysseyTranslationProvider = <SupportedLanguages extends string>({
  children,
  languageCode,
  translationOverrides,
}: OdysseyTranslationProviderProps<SupportedLanguages>) => {
  useEffect(() => {
    // Defaults to the browser's language if available otherwise `en` will be used
    i18n.changeLanguage(languageCode || window.navigator.language);
  }, [languageCode]);

  useEffect(() => {
    if (translationOverrides) {
      Object.keys(translationOverrides).forEach((language) => {
        const bundle = mergeBundleOverrides(language, translationOverrides);
        i18n.addResourceBundle(language, defaultNS, bundle);
      });
    }
  }, [translationOverrides]);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};
