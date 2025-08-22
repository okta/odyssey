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

export const defaultSupportedLanguages = [
  "cs", // Czech
  "da", // Danish
  "de", // German
  "el", // Greek
  "en", // English
  "es", // Spanish
  "fi", // Finnish
  "fr", // French
  "ht", // Haitian Creole
  "hu", // Hungarian
  "id", // Indonesian
  "it", // Italian
  "ja", // Japanese
  "ko", // Korean
  "ms", // Malaysian
  "nb", // Norwegian
  "nl_NL", // Dutch
  "ok_PL", // (Test Language) Pseudo-loc
  "ok_SK", // (Test Language) Show Keys
  "pl", // Polish
  "pt_BR", // Portuguese (Brazil)
  "ro", // Romanian
  "ru", // Russian
  "sv", // Swedish
  "th", // Thai
  "tr", // Turkish
  "uk", // Ukrainian
  "vi", // Vietnamese
  "zh_CN", // Chinese (PRC)
  "zh_TW", // Chinese
] as const;

export type DefaultSupportedLanguages =
  (typeof defaultSupportedLanguages)[number];
