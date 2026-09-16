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

import { DateTime } from "luxon";
import {
  FocusEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { FieldComponentProps } from "../FieldComponentProps.js";
import { useTranslation } from "../i18n.generated/i18n.js";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CalendarIcon,
  ChevronDownIcon,
} from "../icons.generated/index.js";
import { TimeZoneOption, TimeZonePickerProps } from "./TimeZonePicker.js";
import { useDateFieldsTranslations } from "./useDateFieldsTranslations.js";

const isValidDateTime = (dateTime: DateTime) => dateTime.isValid;

const utcDateTimeFromIsoString = (dateString: string) =>
  DateTime.fromISO(dateString).toUTC();

const utcDateTimeFromParsableIsoString = (dateString?: string) => {
  if (!dateString) {
    return null;
  }

  const dateTimeFromIsoString = utcDateTimeFromIsoString(dateString);

  return isValidDateTime(dateTimeFromIsoString) ? dateTimeFromIsoString : null;
};

export type UncontrolledDateFieldProps = {
  /**
   * Value the field is seeded with while it mounts. Read only on that first
   * render, so a later change is ignored.
   *
   * NOTE: Must be a date string in ISO format
   */
  defaultValue?: string;
  /**
   * Value the field displays for its whole life.
   * Should not be used if `defaultValue` is used
   */
  value?: never;
};

export type ControlledDateFieldProps = {
  /**
   * Value the field is seeded with while it mounts.
   * Should not be used if `value` is used
   */
  defaultValue?: never;
  /**
   * Value the field displays for its whole life, so passing an empty value
   * clears it.
   *
   * NOTE: Must be a date string in ISO format. Anything that cannot be parsed
   * leaves the field empty
   */
  value?: string;
};

export type OdysseyDateFieldBaseProps = {
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
   * The label for the `input` element.
   */
  label: string;
  /**
   * Maximum date allowed.
   *
   * NOTE: If not a valid date string in ISO format, `maxDate` will not apply
   */
  maxDate?: string;
  /**
   * Minimum date allowed.
   *
   * NOTE: If not a valid date string in ISO format, `minDate` will not apply
   */
  minDate?: string;
  /**
   * Callback fired when the a date field loses focus
   */
  onBlur?: FocusEventHandler<HTMLInputElement>;
  /**
   * Callback fired when the a date is selected with the calendar.
   */
  onCalendarDateChange?: ({
    value,
    timeZone,
  }: {
    timeZone: string;
    value: string | undefined;
  }) => void;
  /**
   * Callback fired when the date/text input changes.
   */
  onInputChange?: (value: string) => void;
  /**
   * a default timezone for the picker
   */
  timeZone?: string;
  /**
   * If provided, a `TimeZonePicker` will be rendered below the DatePicker. These options will populate as the Autocomplete options
   */
  timeZoneOptions?: TimeZoneOption[];
  /**
   * label for `TimeZonePicker`
   */
  timeZonePickerLabel?: TimeZonePickerProps["label"];
};

export type OdysseyDateFieldProps = OdysseyDateFieldBaseProps &
  (ControlledDateFieldProps | UncontrolledDateFieldProps);

type FormatDateTimeToUtcIsoDateString = (value: DateTime) => string | undefined;

type ValidationDateRanges = {
  maxDate?: DateTime;
  minDate?: DateTime;
};

export const useOdysseyDateFields = ({
  defaultValue,
  isDateEnabled = () => true,
  isMonthEnabled = () => true,
  isYearEnabled = () => true,
  minDate: minDateProp,
  maxDate: maxDateProp,
  onInputChange: onInputChangeProp,
  timeZone = "system",
  value,
}: Pick<
  OdysseyDateFieldProps,
  | "defaultValue"
  | "isDateEnabled"
  | "isMonthEnabled"
  | "isYearEnabled"
  | "minDate"
  | "maxDate"
  | "onInputChange"
  | "timeZone"
  | "value"
> &
  Pick<FieldComponentProps, "errorMessage">) => {
  const [isOpen, setIsOpen] = useState(false);
  const [popperElement, setPopperElement] = useState<HTMLInputElement | null>();
  const [internalTimeZone, setInternalTimeZone] = useState(timeZone);

  const internalValueRef = useRef<DateTime | null>(null);

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

  const defaultedLanguageCode = isInvalidLocale
    ? "en-US"
    : language.replaceAll("_", "-");

  const isValidTimeZone = useCallback(
    (timeZone: string) => DateTime.local().setZone(timeZone).isValid,
    [],
  );

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

  // MUI's picker captures `defaultValue` while it mounts and never reads it
  // again, so `defaultValue` can only ever seed the first render. Freezing the
  // seed here keeps that contract explicit instead of letting a later
  // `defaultValue` overwrite whatever the reader has since typed.
  const [seedValueFromDefaultValue] = useState(() =>
    utcDateTimeFromParsableIsoString(defaultValue),
  );

  // Both props resolve to the one `value` the picker is handed on every render,
  // which keeps it controlled for its whole life. Handing MUI `defaultValue` for
  // an uncontrolled field instead would make the picker stop following `value`
  // after mount, so a date arriving later (or a field being cleared) would never
  // reach the input.
  const pickerValue = useMemo(
    () =>
      value === undefined
        ? seedValueFromDefaultValue
        : utcDateTimeFromParsableIsoString(value),
    [seedValueFromDefaultValue, value],
  );

  const onTimeZoneChange = useCallback(
    (timeZone: string | undefined) => {
      if (timeZone && isValidTimeZone(timeZone)) {
        setInternalTimeZone(timeZone);
      }
    },
    [isValidTimeZone, setInternalTimeZone],
  );

  const toggleCalendarVisibility = useCallback(
    () => setIsOpen(!isOpen),
    [isOpen, setIsOpen],
  );

  const closeCalendar = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const formatDayOfWeek = (date: DateTime) => date.toFormat("EEE");

  const onInputChange = useCallback<(value: string) => void>(
    (value) => {
      onInputChangeProp?.(value);
    },
    [onInputChangeProp],
  );

  const commonIcons = {
    ArrowLeftIcon: ArrowLeftIcon,
    ArrowRightIcon: ArrowRightIcon,
    CalendarIcon: CalendarIcon,
    ChevronDownIcon: ChevronDownIcon,
  };

  return {
    closeCalendar,
    commonIcons,
    defaultedLanguageCode,
    formatDateTimeToUtcIsoDateString,
    formatDayOfWeek,
    internalTimeZone,
    internalValueRef,
    isOpen,
    isValidTimeZone,
    localeText,
    maxDate: validationDateRanges.maxDate,
    minDate: validationDateRanges.minDate,
    popperElement,
    onInputChange,
    onTimeZoneChange,
    pickerValue,
    setInternalTimeZone,
    setIsOpen,
    setPopperElement,
    shouldDisableDate,
    shouldDisableMonth,
    shouldDisableYear,
    toggleCalendarVisibility,
  };
};
