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

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { translation as cs } from "./properties/ts/odyssey-react-mui_cs";
import { translation as da } from "./properties/ts/odyssey-react-mui_da";
import { translation as de } from "./properties/ts/odyssey-react-mui_de";
import { translation as el } from "./properties/ts/odyssey-react-mui_el";
import { translation as en } from "./properties/ts/odyssey-react-mui";
import { translation as es } from "./properties/ts/odyssey-react-mui_es";
import { translation as fi } from "./properties/ts/odyssey-react-mui_fi";
import { translation as fr } from "./properties/ts/odyssey-react-mui_fr";
import { translation as hu } from "./properties/ts/odyssey-react-mui_hu";
import { translation as id } from "./properties/ts/odyssey-react-mui_id";
import { translation as it } from "./properties/ts/odyssey-react-mui_it";
import { translation as ja } from "./properties/ts/odyssey-react-mui_ja";
import { translation as ko } from "./properties/ts/odyssey-react-mui_ko";
import { translation as ms } from "./properties/ts/odyssey-react-mui_ms";
import { translation as nb } from "./properties/ts/odyssey-react-mui_nb";
import { translation as nlNL } from "./properties/ts/odyssey-react-mui_nl-NL";
import { translation as pl } from "./properties/ts/odyssey-react-mui_pl";
import { translation as ptBR } from "./properties/ts/odyssey-react-mui_pt-BR";
import { translation as ro } from "./properties/ts/odyssey-react-mui_ro";
import { translation as ru } from "./properties/ts/odyssey-react-mui_ru";
import { translation as sv } from "./properties/ts/odyssey-react-mui_sv";
import { translation as th } from "./properties/ts/odyssey-react-mui_th";
import { translation as tr } from "./properties/ts/odyssey-react-mui_tr";
import { translation as uk } from "./properties/ts/odyssey-react-mui_uk";
import { translation as zhCN } from "./properties/ts/odyssey-react-mui_zh_CN";
import { translation as znTW } from "./properties/ts/odyssey-react-mui_zh_TW";

import {
  SupportedLanguages,
  supportedLanguages,
} from "./OdysseyTranslationProvider.types";

export const defaultLNG: SupportedLanguages = "en";
export const defaultNS = "translations";
export const resources = {
  cs,
  da,
  de,
  el,
  en,
  es,
  fi,
  fr,
  hu,
  id,
  it,
  ja,
  ko,
  ms,
  nb,
  "nl-NL": nlNL,
  pl,
  "pt-BR": ptBR,
  ro,
  ru,
  sv,
  th,
  tr,
  uk,
  "zh-CN": zhCN,
  "zh-TW": znTW,
};

i18n.use(initReactI18next).init({
  defaultNS,
  ns: [defaultNS],
  fallbackLng: defaultLNG,
  supportedLngs: supportedLanguages,
  load: "currentOnly",
  keySeparator: false,
  interpolation: {
    escapeValue: false, // react already safe from xss
    skipOnVariables: false, // to handle translations that use nesting
  },
  react: {
    useSuspense: false,
    bindI18nStore: "added",
  },
});

Object.entries(resources).forEach(([locale, property]) => {
  i18n.addResourceBundle(locale, defaultNS, property);
});

// eslint-disable-next-line import/no-default-export
export default i18n;
