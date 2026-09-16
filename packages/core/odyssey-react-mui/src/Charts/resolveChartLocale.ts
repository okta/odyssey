/*!
 * Copyright (c) 2026-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

const FALLBACK_LOCALE = "en-US";

/**
 * The function converts a language code from the Odyssey translation
 * context to a BCP 47 locale tag. `Intl` constructors accept this tag.
 *
 * Okta's translation codes use an underscore to separate the region
 * subtag, for example `pt_BR`, `zh_CN`, and `nl_NL`. Every `Intl`
 * constructor rejects these codes with a `RangeError`. The Applitools test
 * environment reports the code `en-us@posix`. This code has no BCP 47
 * equivalent. As a result, six of the codes in `SupportedLanguages` crash
 * an unguarded `Intl` call.
 *
 * If a code has no valid equivalent, the function returns `en-US` instead
 * of raising an error. A chart with the wrong thousands separator is still
 * better than a chart that fails to render.
 */
export const resolveChartLocale = (languageCode: string): string => {
  try {
    return (
      Intl.getCanonicalLocales(languageCode.replaceAll("_", "-"))[0] ??
      FALLBACK_LOCALE
    );
  } catch {
    return FALLBACK_LOCALE;
  }
};
