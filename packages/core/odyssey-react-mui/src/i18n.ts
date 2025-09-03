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

import { translation as cs } from "./properties/ts/odyssey-react-mui_cs.js";
import { translation as da } from "./properties/ts/odyssey-react-mui_da.js";
import { translation as de } from "./properties/ts/odyssey-react-mui_de.js";
import { translation as el } from "./properties/ts/odyssey-react-mui_el.js";
import { translation as es } from "./properties/ts/odyssey-react-mui_es.js";
import { translation as fi } from "./properties/ts/odyssey-react-mui_fi.js";
import { translation as fr } from "./properties/ts/odyssey-react-mui_fr.js";
import { translation as ht } from "./properties/ts/odyssey-react-mui_ht.js";
import { translation as hu } from "./properties/ts/odyssey-react-mui_hu.js";
import { translation as id } from "./properties/ts/odyssey-react-mui_id.js";
import { translation as it } from "./properties/ts/odyssey-react-mui_it.js";
import { translation as ja } from "./properties/ts/odyssey-react-mui_ja.js";
import { translation as ko } from "./properties/ts/odyssey-react-mui_ko.js";
import { translation as ms } from "./properties/ts/odyssey-react-mui_ms.js";
import { translation as nb } from "./properties/ts/odyssey-react-mui_nb.js";
import { translation as nlNL } from "./properties/ts/odyssey-react-mui_nl_NL.js";
import { translation as okPL } from "./properties/ts/odyssey-react-mui_ok_PL.js";
import { translation as okSK } from "./properties/ts/odyssey-react-mui_ok_SK.js";
import { translation as pl } from "./properties/ts/odyssey-react-mui_pl.js";
import { translation as ptBR } from "./properties/ts/odyssey-react-mui_pt_BR.js";
import { translation as ro } from "./properties/ts/odyssey-react-mui_ro.js";
import { translation as ru } from "./properties/ts/odyssey-react-mui_ru.js";
import { translation as sv } from "./properties/ts/odyssey-react-mui_sv.js";
import { translation as th } from "./properties/ts/odyssey-react-mui_th.js";
import { translation as tr } from "./properties/ts/odyssey-react-mui_tr.js";
import { translation as uk } from "./properties/ts/odyssey-react-mui_uk.js";
import { translation as vi } from "./properties/ts/odyssey-react-mui_vi.js";
import { translation as zhCN } from "./properties/ts/odyssey-react-mui_zh_CN.js";
import { translation as znTW } from "./properties/ts/odyssey-react-mui_zh_TW.js";
import { translation as en } from "./properties/ts/odyssey-react-mui.js";

export const defaultLNG = "en";
export const defaultNS = "odyssey";
export const keySeparator = false;

// Note: This is type "string" to allow translation overrides from other languages
export type I18nResources = Record<string, Partial<typeof en>>;

export const resources = {
  cs,
  da,
  de,
  el,
  en,
  es,
  fi,
  fr,
  ht,
  hu,
  id,
  it,
  ja,
  ko,
  ms,
  nb,
  nl_NL: nlNL,
  ok_PL: okPL,
  ok_SK: okSK,
  pl,
  pt_BR: ptBR,
  ro,
  ru,
  sv,
  th,
  tr,
  uk,
  vi,
  zh_CN: zhCN,
  zh_TW: znTW,
} as const satisfies Record<string, Partial<typeof en>>;

// eslint-disable-next-line import/no-named-as-default-member
i18n.use(initReactI18next).init({
  defaultNS,
  ns: [defaultNS],
  fallbackLng: defaultLNG,
  load: "currentOnly",
  keySeparator,
  interpolation: {
    escapeValue: false, // react already safe from xss
    skipOnVariables: false, // to handle translations that use nesting
  },
  react: {
    bindI18nStore: "added",
    useSuspense: false,
  },
} as const);

Object.entries(resources).forEach(([locale, property]) => {
  i18n.addResourceBundle(locale, defaultNS, property);
});

// eslint-disable-next-line import/no-named-as-default-member
export const odysseyTranslate = i18n.t.bind(i18n);
export { i18n };
