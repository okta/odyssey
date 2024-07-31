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

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { DateTime } from "luxon";
import { useTranslation } from "react-i18next";

import { FieldComponentProps } from "../FieldComponentProps";
import { ComponentControlledState, getControlState } from "../inputUtils";
import { useDateFieldsTranslations } from "./useDateFieldsTranslations";

const { CONTROLLED } = ComponentControlledState;

const isValidDateTime = (dateTime: DateTime) => dateTime.isValid;

const utcDateTimeFromIsoString = (dateString: string) =>
  DateTime.fromISO(dateString).toUTC();

export type TimeZoneOption = {
  label: string;
  value: string;
};

export type OdysseyDateFieldProps = {
  /**
   * default value when uncontrolled.
   *
   * NOTE: Must be a date string in ISO format
   */
  defaultValue?: string;
  /**
   * Disable specific date(s).
   *
   * Warning: This function can be called multiple times (for example when rendering date calendar, checking if focus can be moved to a certain date, etc.). Expensive computations can impact performance.
   */
  isDateEnabled?: (date: Date) => boolean;
  /**
   * Disable specific month(s).
   */
  isMonthEnabled?: (date: Date) => boolean;
  /**
   * Disable specific year(s).
   */
  isYearEnabled?: (date: Date) => boolean;
  /**
   * Minimum date allowed.
   *
   * NOTE: If not a valid date string in ISO format, `minDate` will not apply
   */
  minDate?: string;
  /**
   * Maximum date allowed.
   *
   * NOTE: If not a valid date string in ISO format, `maxDate` will not apply
   */
  maxDate?: string;
  timeZone?: string;
  /**
   * value when controlled.
   *
   * NOTE: Must be a date string in ISO format or it will not be applied
   */
  value?: string;
};

type FormatDateTimeToUtcIsoDateString = (value: DateTime) => string | undefined;

type ValidationDateRanges = {
  minDate?: DateTime;
  maxDate?: DateTime;
};

export const useOdysseyDateFields = ({
  defaultValue,
  isDateEnabled = () => true,
  isMonthEnabled = () => true,
  isYearEnabled = () => true,
  minDate: minDateProp,
  maxDate: maxDateProp,
  timeZone = "system",
  value,
}: OdysseyDateFieldProps & Pick<FieldComponentProps, "errorMessage">) => {
  const internalValueRef = useRef<DateTime | null>(null);
  const [internalTimeZone, setInternalTimeZone] = useState(timeZone);

  const [validationDateRanges, setValidationDateRanges] =
    useState<ValidationDateRanges>({
      minDate: undefined,
      maxDate: undefined,
    });

  useEffect(() => {
    const minDate = minDateProp ? DateTime.fromISO(minDateProp) : undefined;
    const maxDate = maxDateProp ? DateTime.fromISO(maxDateProp) : undefined;

    setValidationDateRanges({
      minDate:
        minDate && isValidDateTime(minDate)
          ? minDate.startOf("day")
          : undefined,
      maxDate:
        maxDate && isValidDateTime(maxDate)
          ? maxDate.startOf("day")
          : undefined,
    });
  }, [minDateProp, maxDateProp]);

  const { i18n } = useTranslation();
  const { language } = i18n;

  const invalidLocales = ["ok_PL", "ok_SK"];
  // In the Applitools env the language code is `en-us@posix`. Need to check for that
  const isInvalidLocale =
    invalidLocales.includes(language) || language.includes("@");

  const localeText = useDateFieldsTranslations();

  const controlledStateRef = useRef(
    getControlState({
      controlledValue: value,
      uncontrolledValue: defaultValue,
    }),
  );

  const defaultedLanguageCode = isInvalidLocale
    ? "en-US"
    : language.replaceAll("_", "-");

  const isValidTimeZone = (timeZone: string) =>
    DateTime.local().setZone(timeZone).isValid;

  const formatDateTimeToUtcIsoDateString =
    useCallback<FormatDateTimeToUtcIsoDateString>(
      (value) => value.toUTC().toISO() || undefined,
      [],
    );

  const shouldDisableDate = useCallback(
    (date: DateTime) => !isDateEnabled(new Date(date?.toJSDate())) || false,
    [isDateEnabled],
  );

  const shouldDisableMonth = useCallback(
    (date: DateTime) => !isMonthEnabled(new Date(date?.toJSDate())) || false,
    [isMonthEnabled],
  );

  const shouldDisableYear = useCallback(
    (date: DateTime) => !isYearEnabled(new Date(date?.toJSDate())) || false,
    [isYearEnabled],
  );

  const inputValues = useMemo(() => {
    if (value && controlledStateRef.current === CONTROLLED) {
      const valueAsUTCDateTime = utcDateTimeFromIsoString(value);

      if (isValidDateTime(valueAsUTCDateTime)) {
        return {
          value: valueAsUTCDateTime,
        };
      }
    }

    if (defaultValue) {
      const defaultValueAsUTCDateTime = utcDateTimeFromIsoString(defaultValue);

      if (isValidDateTime(defaultValueAsUTCDateTime)) {
        return {
          defaultValue: defaultValueAsUTCDateTime,
        };
      }
    }

    return null;
  }, [defaultValue, validationDateRanges, value]);

  return {
    defaultedLanguageCode,
    formatDateTimeToUtcIsoDateString,
    inputValues,
    internalTimeZone,
    internalValueRef,
    isValidTimeZone,
    localeText,
    maxDate: validationDateRanges.maxDate,
    minDate: validationDateRanges.minDate,
    setInternalTimeZone,
    shouldDisableDate,
    shouldDisableMonth,
    shouldDisableYear,
  };
};
