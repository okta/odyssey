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

import {
  ChangeEvent,
  ChangeEventHandler,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import {
  type DatePickerSlots,
  DatePicker as MuiDatePicker,
  DatePickerProps as MuiDatePickerProps,
  LocalizationProvider,
  PickersActionBarProps,
  DatePickerSlotProps,
} from "@mui/x-date-pickers";
import { DateTime } from "luxon";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { InputAdornment } from "@mui/material";
import styled from "@emotion/styled";

import { Button } from "../Button";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CalendarIcon,
  ChevronDownIcon,
} from "../icons.generated";
import { DateField, DateFieldProps } from "./DateField";
import { datePickerTheme } from "./datePickerTheme";
import { FieldComponentProps } from "../FieldComponentProps";
import {
  useOdysseyDesignTokens,
  DesignTokens,
} from "../OdysseyDesignTokensContext";
import { OdysseyThemeProvider } from "../OdysseyThemeProvider";
import { useDatePickerTranslations } from "./useDatePickerTranslations";

const DatePickerContainer = styled.div({
  display: "flex",

  ".MuiFormControl-root": {
    marginBlockEnd: 0,
  },
});

const DatePickerWidthContainer = styled.div({
  ".MuiInput-root": {
    width: `${176 / 14}rem`,
  },
});

const ActionContainer = styled.div<{ odysseyDesignTokens: DesignTokens }>(
  ({ odysseyDesignTokens }) => ({
    display: "flex",
    justifyContent: "flex-end",
    paddingInline: odysseyDesignTokens.Spacing4,
    paddingBlockEnd: odysseyDesignTokens.Spacing4,
  }),
);

const ActionBar = ({ actions, onAccept, onCancel }: PickersActionBarProps) => {
  const { t } = useTranslation();
  const odysseyDesignTokens = useOdysseyDesignTokens();

  // actions will be [] or ["accept", "cancel"]
  if (actions && actions.length > 0) {
    return (
      <ActionContainer odysseyDesignTokens={odysseyDesignTokens}>
        <Button
          label={t("picker.labels.action.cancel")}
          onClick={onCancel}
          variant="floating"
        />
        <Button
          label={t("picker.labels.action.apply")}
          onClick={onAccept}
          variant="primary"
        />
      </ActionContainer>
    );
  }

  return null;
};

const MemoizedActionBar = memo(ActionBar);
MemoizedActionBar.displayName = "ActionBar";

const formatDateToDateTime = (date: Date) => DateTime.fromJSDate(date);

const formatDayOfWeek = (date: DateTime) => date.toFormat("EEE");

type RenderDateFieldProps = {
  defaultValue: DateFieldProps["defaultValue"];
  value: DateFieldProps["value"];
} & MuiDatePickerProps<DateTime>;

export type DatePickerProps = {
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
   * Callback fired when the a date is selected with the calendar.
   */
  onCalendarDateChange?: (value: Date) => void;
  /**
   * Callback fired when the date/text input changes.
   */
  onInputChange?: ChangeEventHandler<HTMLInputElement>;
  value?: Date;
} & Pick<FieldComponentProps, "errorMessage" | "hint" | "isDisabled"> &
  Pick<MuiDatePickerProps<Date>, "defaultValue" | "minDate" | "maxDate">;

const DatePicker = ({
  defaultValue: defaultValueProp,
  errorMessage,
  hint,
  isDateEnabled = () => true,
  isDisabled,
  isMonthEnabled = () => true,
  isYearEnabled = () => true,
  label,
  minDate,
  maxDate,
  onCalendarDateChange,
  onInputChange: onInputChangeProp,
  value: valueProp,
}: DatePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [popperElement, setPopperElement] = useState<HTMLInputElement | null>();

  const { i18n, t } = useTranslation();
  const { language } = i18n;

  const invalidLocales = ["ok_PL", "ok_SK"];
  // In the Applitools env the language code is `en-us@posix`. Need to check for that
  const isInvalidLocale =
    invalidLocales.includes(language) || language.includes("@");

  const containerRef = useRef<HTMLInputElement>(null);

  const localeText = useDatePickerTranslations();

  useEffect(() => {
    setPopperElement(containerRef.current);
  }, []);

  const formatDateTimeToJsDateOnCalendarSelection = useCallback<
    NonNullable<MuiDatePickerProps<DateTime>["onChange"]>
  >(
    (value) => {
      if (value) {
        const jsDateFromDateTime = new Date(value?.toJSDate());
        onCalendarDateChange?.(jsDateFromDateTime);
      }
    },
    [onCalendarDateChange],
  );

  const onInputChange = useCallback<
    (event: ChangeEvent<HTMLInputElement>) => void
  >((event) => onInputChangeProp?.(event), [onInputChangeProp]);

  const toggleCalendarVisibility = useCallback(
    () => setIsOpen(!isOpen),
    [isOpen],
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

  const renderDateField = useCallback(
    ({ defaultValue, value }: RenderDateFieldProps) => (
      <DateField
        defaultValue={defaultValue}
        endAdornment={
          <InputAdornment position="end">
            <Button
              ariaLabel={t("picker.labels.date.choose")}
              label=""
              size="small"
              startIcon={<CalendarIcon />}
              variant="floating"
              onClick={toggleCalendarVisibility}
            />
          </InputAdornment>
        }
        errorMessage={errorMessage}
        hint={hint}
        isDisabled={isDisabled}
        label={label}
        onChange={onInputChange}
        value={value}
      />
    ),
    [
      errorMessage,
      hint,
      isDisabled,
      label,
      onInputChange,
      t,
      toggleCalendarVisibility,
    ],
  );

  const resetIsOpen = useCallback(() => {
    setIsOpen(false);
  }, []);

  const slots = useMemo<DatePickerSlots<DateTime>>(
    () => ({
      actionBar: MemoizedActionBar,
      field: (muiProps) => renderDateField(muiProps),
      leftArrowIcon: () => <ArrowLeftIcon />,
      rightArrowIcon: () => <ArrowRightIcon />,
      switchViewIcon: () => <ChevronDownIcon />,
    }),
    [renderDateField],
  );

  const slotProps = useMemo<DatePickerSlotProps<DateTime, false>>(
    () => ({
      actionBar: ({ wrapperVariant, onAccept, onCancel }) => ({
        actions:
          // This is the default behavior but felt more clear to pass them in explicitly
          wrapperVariant === "desktop" ? [] : ["accept", "cancel"],
        onAccept,
        onCancel,
      }),
      popper: {
        anchorEl: popperElement,
      },

      toolbar: {
        toolbarPlaceholder: "",
      },
    }),
    [popperElement],
  );

  const defaultedLanguageCode = isInvalidLocale
    ? "en-US"
    : language.replaceAll("_", "-");

  return (
    <OdysseyThemeProvider themeOverride={datePickerTheme}>
      <LocalizationProvider
        dateAdapter={AdapterLuxon}
        adapterLocale={defaultedLanguageCode}
        localeText={localeText}
      >
        <DatePickerContainer>
          <DatePickerWidthContainer ref={containerRef}>
            <MuiDatePicker
              dayOfWeekFormatter={formatDayOfWeek}
              defaultValue={
                defaultValueProp
                  ? formatDateToDateTime(defaultValueProp)
                  : undefined
              }
              disabled={isDisabled}
              fixedWeekNumber={6}
              key={language}
              label={label}
              minDate={minDate ? formatDateToDateTime(minDate) : undefined}
              maxDate={maxDate ? formatDateToDateTime(maxDate) : undefined}
              onChange={formatDateTimeToJsDateOnCalendarSelection}
              onClose={resetIsOpen}
              open={isOpen}
              shouldDisableDate={shouldDisableDate}
              shouldDisableMonth={shouldDisableMonth}
              shouldDisableYear={shouldDisableYear}
              slots={slots}
              slotProps={slotProps}
              value={valueProp ? formatDateToDateTime(valueProp) : undefined}
            />
          </DatePickerWidthContainer>
        </DatePickerContainer>
      </LocalizationProvider>
    </OdysseyThemeProvider>
  );
};

const MemoizedDatePicker = memo(DatePicker);
MemoizedDatePicker.displayName = "DatePicker";

export { MemoizedDatePicker as DatePicker };
