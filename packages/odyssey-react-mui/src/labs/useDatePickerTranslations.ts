/*!
 * Copyright (c) 2024-present, Okta, Inc. and/or its affiliates. All rights reserved.
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
  csCZ,
  daDK,
  deDE,
  elGR,
  enUS,
  esES,
  fiFI,
  frFR,
  huHU,
  itIT,
  jaJP,
  koKR,
  nbNO,
  nlNL,
  plPL,
  ptBR,
  roRO,
  ruRU,
  svSE,
  trTR,
  ukUA,
  viVN,
  zhCN,
} from "@mui/x-date-pickers/locales";

import { DefaultSupportedLanguages } from "../OdysseyTranslationProvider.types";

const localeKeyMap = new Map<string, any>([
  ["cs", csCZ],
  ["da", daDK],
  ["de", deDE],
  ["el", elGR],
  ["en", enUS],
  ["es", esES],
  ["fi", fiFI],
  ["fr", frFR],
  ["hu", huHU],
  ["it", itIT],
  ["ja", jaJP],
  ["ko", koKR],
  ["nb", nbNO],
  ["nl_NL", nlNL],
  ["pl", plPL],
  ["pt_BR", ptBR],
  ["ro", roRO],
  ["ru", ruRU],
  ["sv", svSE],
  ["tr", trTR],
  ["uk", ukUA],
  ["vi", viVN],
  ["zh_CN", zhCN],
]);

export const unsupportedLanguages = ["id", "ms", "th", "zh_TW"]; // Indonesian, Malay, Thai, Chinese (traditional)

export const useDatePickerTranslations = (
  languageCode: DefaultSupportedLanguages,
) => {
  const langFromMap = localeKeyMap.get(languageCode);

  return langFromMap
    ? langFromMap.components.MuiLocalizationProvider.defaultProps.localeText
    : undefined;
};
