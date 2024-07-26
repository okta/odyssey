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
  FocusEventHandler,
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
  // DateTimeValidationError,
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
import { TimeZonePicker, TimeZonePickerProps } from "./TimeZonePicker";

import {
  useOdysseyDateFields,
  OdysseyDateFieldProps,
  TimeZoneOption,
} from "./useOdysseyDateFields";

const DatePickerContainer = styled.div({
  ".MuiFormControl-root": {
    marginBlockEnd: 0,
  },
});

const DatePickerWidthContainer = styled.div<{
  odysseyDesignTokens: DesignTokens;
}>(({ odysseyDesignTokens }) => ({
  ".MuiInput-root": {
    width: "100%",
    maxWidth: odysseyDesignTokens.TypographyLineLengthMax,
  },
}));

const TimeZonePickerContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})(({ odysseyDesignTokens }: { odysseyDesignTokens: DesignTokens }) => ({
  marginBlockStart: odysseyDesignTokens.Spacing3,
}));

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

const formatDayOfWeek = (date: DateTime) => date.toFormat("EEE");

type RenderDateFieldProps = {
  defaultValue: DateFieldProps["defaultValue"];
  value: DateFieldProps["value"];
} & MuiDatePickerProps<DateTime>;

export type DatePickerProps = {
  /**
   * The label for the `input` element.
   */
  label: string;
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
    value: string | undefined;
    timeZone: string;
  }) => void;
  /**
   * Callback fired when the date/text input changes.
   */
  onInputChange?: (value: string) => void;
  /**
   * If provided, a `TimeZonePicker` will be rendered below the DatePicker. These options will populate as the Autocomplete options
   */
  timeZoneOptions?: TimeZoneOption[];
  /**
   * label for `TimeZonePicker`
   */
  timeZonePickerLabel?: TimeZonePickerProps["label"];
} & OdysseyDateFieldProps &
  Pick<
    FieldComponentProps,
    "errorMessage" | "hint" | "isDisabled" | "isReadOnly"
  >;

const DatePicker = ({
  defaultValue: defaultValueProp,
  errorMessage,
  hint,
  isDateEnabled = () => true,
  isDisabled,
  isReadOnly,
  isMonthEnabled = () => true,
  isYearEnabled = () => true,
  label,
  minDate: minDateProp,
  maxDate: maxDateProp,
  onBlur,
  onCalendarDateChange,
  onInputChange: onInputChangeProp,
  timeZone,
  timeZonePickerLabel,
  timeZoneOptions,
  value: valueProp,
}: DatePickerProps) => {
  const { i18n, t } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);
  const odysseyDesignTokens = useOdysseyDesignTokens();

  const {
    defaultedLanguageCode,
    // displayedErrorMessage,
    formatDateTimeToUtcIsoDateString,
    inputValues,
    internalTimeZone,
    isValidTimeZone,
    localeText,
    minDate,
    maxDate,
    setInternalTimeZone,
    shouldDisableDate,
    shouldDisableMonth,
    shouldDisableYear,
  } = useOdysseyDateFields({
    defaultValue: defaultValueProp,
    errorMessage,
    isDateEnabled,
    isMonthEnabled,
    isYearEnabled,
    minDate: minDateProp,
    maxDate: maxDateProp,
    timeZone,
    value: valueProp,
  });
  const [isOpen, setIsOpen] = useState(false);
  const [popperElement, setPopperElement] = useState<HTMLInputElement | null>();

  const { language } = i18n;
  const containerRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setPopperElement(containerRef.current);
  }, []);

  const formatDateTimeToJsDateStringOnCalendarSelection = useCallback<
    NonNullable<MuiDatePickerProps<DateTime>["onChange"]>
  >(
    (value) => {
      if (value) {
        const dateStringFromDateTime = formatDateTimeToUtcIsoDateString(value);

        if (dateStringFromDateTime) {
          onCalendarDateChange?.({
            value: dateStringFromDateTime,
            timeZone: internalTimeZone,
          });
        }
      }
    },
    [formatDateTimeToUtcIsoDateString, internalTimeZone, onCalendarDateChange],
  );

  const onInputChange = useCallback<(value: string) => void>(
    (value) => {
      onInputChangeProp?.(value);
    },
    [onInputChangeProp],
  );

  const toggleCalendarVisibility = useCallback(
    () => setIsOpen(!isOpen),
    [isOpen],
  );

  const resetIsOpen = useCallback(() => {
    setIsOpen(false);
  }, []);

  const renderDateField = useCallback(
    ({ defaultValue, inputRef, value }: RenderDateFieldProps) => {
      const hasVisibleAdornment = !isReadOnly && !isDisabled;

      return (
        <DateField
          defaultValue={defaultValue}
          endAdornment={
            <>
              {hasVisibleAdornment && (
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
              )}
            </>
          }
          errorMessage={errorMessage}
          hint={hint}
          inputRef={inputRef}
          isDisabled={isDisabled}
          isReadOnly={isReadOnly}
          label={label}
          onBlur={onBlur}
          minDate={minDate}
          maxDate={maxDate}
          onChange={onInputChange}
          timezone={internalTimeZone}
          value={value}
        />
      );
    },
    [
      // displayedErrorMessage,
      errorMessage,
      hint,
      internalTimeZone,
      isDisabled,
      isReadOnly,
      label,
      onBlur,
      onInputChange,
      minDate,
      maxDate,
      t,
      toggleCalendarVisibility,
    ],
  );

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

  const onTimeZoneChange = useCallback(
    (timeZone: string | undefined) => {
      if (timeZone && isValidTimeZone(timeZone)) {
        setInternalTimeZone(timeZone);
      }
    },
    [isValidTimeZone, setInternalTimeZone],
  );

  return (
    <OdysseyThemeProvider themeOverride={datePickerTheme}>
      <LocalizationProvider
        dateAdapter={AdapterLuxon}
        adapterLocale={defaultedLanguageCode}
        localeText={localeText}
      >
        <DatePickerContainer>
          <DatePickerWidthContainer
            odysseyDesignTokens={odysseyDesignTokens}
            ref={containerRef}
          >
            <MuiDatePicker
              dayOfWeekFormatter={formatDayOfWeek}
              defaultValue={inputValues?.defaultValue}
              disabled={isDisabled}
              fixedWeekNumber={6}
              inputRef={inputRef}
              key={language}
              label={label}
              minDate={minDate}
              maxDate={maxDate}
              onChange={formatDateTimeToJsDateStringOnCalendarSelection}
              onClose={resetIsOpen}
              open={isOpen}
              readOnly={isReadOnly}
              shouldDisableDate={shouldDisableDate}
              shouldDisableMonth={shouldDisableMonth}
              shouldDisableYear={shouldDisableYear}
              slots={slots}
              slotProps={slotProps}
              timezone={internalTimeZone}
              value={inputValues?.value}
            />
          </DatePickerWidthContainer>
        </DatePickerContainer>
        {timeZoneOptions && timeZonePickerLabel && (
          <TimeZonePickerContainer odysseyDesignTokens={odysseyDesignTokens}>
            <TimeZonePicker
              label={timeZonePickerLabel}
              onTimeZoneChange={onTimeZoneChange}
              isReadOnly={isReadOnly}
              timeZoneOptions={timeZoneOptions}
              value={internalTimeZone}
            />
          </TimeZonePickerContainer>
        )}
      </LocalizationProvider>
    </OdysseyThemeProvider>
  );
};

const MemoizedDatePicker = memo(DatePicker);
MemoizedDatePicker.displayName = "DatePicker";

export { MemoizedDatePicker as DatePicker };
