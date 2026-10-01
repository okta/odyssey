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

import { resolveChartLocale } from "./resolveChartLocale.js";

/**
 * The `Intl.NumberFormat` options for each preset name. The preset union type
 * {@link ChartValueFormat} takes its members from the keys of this object.
 * This keeps the two lists in agreement. If a name exists in the union but
 * not here, it resolves to `undefined` options. The value then formats as a
 * plain decimal. The code gives no error.
 */
const numberFormatOptionsByPreset = {
  compact: { notation: "compact" },
  decimal: {},
  percent: { style: "percent" },
} as const satisfies Record<string, Intl.NumberFormatOptions>;

/**
 * The named presets accepted by {@link ChartValueFormat}.
 *
 * - `"decimal"` renders the value in full, for example `1,234.5`.
 * - `"compact"` shortens large values, for example `1.2K`.
 * - `"percent"` multiplies the value by 100 and adds a percent sign. For
 *   example, `0.4567` renders as `46%`. Supply the value as a fraction, not
 *   as a percentage that is already scaled to 100. If the value is already
 *   scaled, the preset scales it twice. For example, `42` renders as
 *   `4,200%`.
 */
export type ChartValueFormatPreset = keyof typeof numberFormatOptionsByPreset;

/**
 * A chart renders a value in this currency.
 */
export type ChartValueCurrencyFormat = {
  /**
   * An ISO 4217 currency code such as `"USD"` or `"JPY"`.
   */
  currency: string;
  style: "currency";
};

/**
 * A chart value format is one of three kinds: a named preset, an explicit
 * currency, or a function. A function takes the raw number and returns a
 * string. A function gives the caller full control over the presentation.
 *
 * The presets are a closed set. They do not use the general type
 * `Intl.NumberFormatOptions`. That type allows combinations that fail when
 * the code builds them. For example, `{ style: "currency" }` without a
 * `currency` field passes the type check. However, it raises a `TypeError`
 * at construction. A caller that needs options outside the preset set can
 * pass a function instead.
 */
export type ChartValueFormat =
  | ChartValueFormatPreset
  | ChartValueCurrencyFormat
  | ((value: number) => string);

/**
 * Props for {@link formatChartValue}.
 */
export type FormatChartValueProps = {
  /**
   * How to format the value.
   * @default "decimal"
   */
  format?: ChartValueFormat;
  /**
   * A language code from the Odyssey translation context, such as `"en"` or
   * `"pt_BR"`. The function converts the language code to a BCP 47 tag
   * before the value reaches `Intl`.
   */
  languageCode: string;
  /** The number to format. */
  value: number;
};

/**
 * Formats a single chart value into a locale aware string.
 *
 * When `format` is a function, the code calls it with `value`. The code
 * returns the result directly and ignores `languageCode`. A caller that
 * supplies a function controls the full presentation of the value.
 * Otherwise, the function formats the value with an `Intl.NumberFormat`
 * instance. It builds the instance from the resolved locale and the
 * requested preset or currency.
 */
export const formatChartValue = ({
  format = "decimal",
  languageCode,
  value,
}: FormatChartValueProps): string => {
  if (typeof format === "function") {
    return format(value);
  }

  return new Intl.NumberFormat(
    resolveChartLocale(languageCode),
    typeof format === "string" ? numberFormatOptionsByPreset[format] : format,
  ).format(value);
};
