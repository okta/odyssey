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

import { formatChartValue } from "./formatChartValue.js";

describe(formatChartValue.name, () => {
  test("no format supplied", () => {
    const formattedValue = formatChartValue({
      value: 1234.5,
      languageCode: "en",
    });

    expect(formattedValue).toBe("1,234.5");
  });

  test("decimal preset", () => {
    const formattedValue = formatChartValue({
      value: 1234.5,
      format: "decimal",
      languageCode: "en",
    });

    expect(formattedValue).toBe("1,234.5");
  });

  test("compact preset abbreviates thousands", () => {
    const formattedValue = formatChartValue({
      value: 1234.5,
      format: "compact",
      languageCode: "en",
    });

    expect(formattedValue).toBe("1.2K");
  });

  test("compact preset abbreviates millions", () => {
    const formattedValue = formatChartValue({
      value: 1250000,
      format: "compact",
      languageCode: "en",
    });

    expect(formattedValue).toBe("1.3M");
  });

  test("percent preset", () => {
    const formattedValue = formatChartValue({
      value: 0.4567,
      format: "percent",
      languageCode: "en",
    });

    expect(formattedValue).toBe("46%");
  });

  test("currency format", () => {
    const formattedValue = formatChartValue({
      value: 1234.5,
      format: { style: "currency", currency: "USD" },
      languageCode: "en",
    });

    expect(formattedValue).toBe("$1,234.50");
  });

  test("currency is independent of the language code", () => {
    const formattedValue = formatChartValue({
      value: 1234.5,
      format: { style: "currency", currency: "USD" },
      languageCode: "de",
    });

    // The test escapes the no-break space before the currency symbol.
    // A no-break space looks like a plain space in an editor.
    expect(formattedValue).toBe("1.234,50\u00A0$");
  });

  test("currency without minor units", () => {
    const formattedValue = formatChartValue({
      value: 1234.5,
      format: { style: "currency", currency: "JPY" },
      languageCode: "ja",
    });

    // The test escapes the fullwidth yen sign.
    // A reader can confuse the fullwidth yen sign with the halfwidth yen sign.
    expect(formattedValue).toBe("\uFFE51,235");
  });

  test("a function format with a language code supplied", () => {
    const formattedValue = formatChartValue({
      value: 42,
      format: (value) => `custom-${value}`,
      languageCode: "ja",
    });

    expect(formattedValue).toBe("custom-42");
  });

  test("same value formats differently across locales", () => {
    const englishFormattedValue = formatChartValue({
      value: 1234.5,
      languageCode: "en",
    });
    const germanFormattedValue = formatChartValue({
      value: 1234.5,
      languageCode: "de",
    });

    expect(englishFormattedValue).toBe("1,234.5");
    expect(germanFormattedValue).toBe("1.234,5");
  });

  test("language code with an underscore region subtag", () => {
    const formattedValue = formatChartValue({
      value: 1234.5,
      languageCode: "pt_BR",
    });

    expect(formattedValue).toBe("1.234,5");
  });

  test("the Applitools environment's language code falls back to en-US", () => {
    const formattedValue = formatChartValue({
      value: 1234.5,
      languageCode: "en-us@posix",
    });

    expect(formattedValue).toBe("1,234.5");
  });

  test("invalid language code", () => {
    const formattedValue = formatChartValue({
      value: 1234.5,
      languageCode: "not a locale",
    });

    expect(formattedValue).toBe("1,234.5");
  });

  test("percent preset with a value already scaled to 100", () => {
    const formattedValue = formatChartValue({
      value: 42,
      format: "percent",
      languageCode: "en",
    });

    expect(formattedValue).toBe("4,200%");
  });

  test("not a number", () => {
    const formattedValue = formatChartValue({
      value: NaN,
      languageCode: "en",
    });

    expect(formattedValue).toBe("NaN");
  });

  test("infinite value", () => {
    const formattedValue = formatChartValue({
      value: Infinity,
      languageCode: "en",
    });

    expect(formattedValue).toBe("∞");
  });

  test("negative zero", () => {
    const formattedValue = formatChartValue({
      value: -0,
      languageCode: "en",
    });

    expect(formattedValue).toBe("-0");
  });
});
