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

import { useCallback } from "react";

import { useTranslation } from "../i18n.generated/i18n.js";
import {
  formatChartValue,
  type FormatChartValueProps,
} from "./formatChartValue.js";

/**
 * The formatter functions from {@link useChartValueFormatter} accept these
 * props. The props match {@link FormatChartValueProps}, but without
 * `languageCode`. The hook binds the `languageCode` field from context.
 */
export type ChartValueFormatterProps = Omit<
  FormatChartValueProps,
  "languageCode"
>;

/**
 * Formats a chart value with the active locale.
 */
export type ChartValueFormatter = (props: ChartValueFormatterProps) => string;

/**
 * The hook reads the active language code from the Odyssey translation
 * context. The hook returns a version of {@link formatChartValue} that uses
 * that locale. A consumer only needs to supply `value` and an optional
 * `format`.
 *
 * The returned function stays referentially stable while the active
 * language stays the same. This makes it safe to add as a dependency of a
 * consumer's `useMemo`.
 */
export const useChartValueFormatter = (): ChartValueFormatter => {
  const { i18n } = useTranslation();
  const languageCode = i18n.language;

  return useCallback<ChartValueFormatter>(
    ({ format, value }) => formatChartValue({ format, languageCode, value }),
    [languageCode],
  );
};
