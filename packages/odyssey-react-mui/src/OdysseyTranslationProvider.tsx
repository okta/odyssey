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

import { ReactElement, useEffect } from "react";

import { SupportedLanguages } from "./OdysseyTranslationProvider.types";

import i18n from "./OdysseyI18n";
import { I18nextProvider } from "react-i18next";

export function OdysseyTranslationProvider({
  children,
  languageCode,
}: {
  children: ReactElement;
  languageCode?: SupportedLanguages;
}) {
  useEffect(() => {
    // Defaults to the browser's language if available otherwise `en` will be used
    i18n.changeLanguage(languageCode || window.navigator.language);
  }, [languageCode]);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
