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

import { forwardRef, memo, useCallback, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  DatePicker as MuiDatePicker,
  DatePickerProps as MuiDatePickerProps,
  DateValidationError,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { DateTime } from "luxon";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { InputAdornment } from "@mui/material";
import styled from "@emotion/styled";
import * as locales from "@mui/x-date-pickers/locales";

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
import { formatLanguageCodeToHyphenated } from "../OdysseyTranslationProvider";

const DatePickerContainer = styled.div({
  display: "flex",

  ".MuiFormControl-root": {
    marginBlockEnd: 0
  }
});

const DatePickerWidthContainer = styled.div<{
  odysseyDesignTokens: DesignTokens;
}>(({ odysseyDesignTokens }) => ({
  width: "100%",
  maxWidth: odysseyDesignTokens.TypographyLineLengthMax,

  ".MuiInput-root": {
    width: "170px",
  },
}));

export type DatePickerProps = {
  /**
   * The label for the `input` element.
   */
  label: string;
  /**
   * Callback fired when the a date is selected with the calendar.
   */
  onCalendarDateChange?: ({
    value,
    error,
  }: {
    value: Date;
    error?: DateValidationError;
  }) => void;
  /**
   * Callback fired when the text input receives typed characters.
   */
  onInputChange?: (value: string) => void;
  value?: Date;
} & Pick<FieldComponentProps, "errorMessage" | "hint"> &
  Pick<
    MuiDatePickerProps<Date>,
    "defaultValue" | "disableFuture" | "disablePast" | "minDate" | "maxDate"
  >;

const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  (
    {
      defaultValue: defaultValueProp,
      disableFuture,
      disablePast,
      errorMessage,
      hint,
      label,
      minDate,
      maxDate,
      onCalendarDateChange,
      onInputChange: onInputChangeProp,
      value: valueProp,
    },
    ref,
  ) => {
    console.log({locales})
    const odysseyDesignTokens = useOdysseyDesignTokens();
    const [isOpen, setIsOpen] = useState(false);

    const { i18n } = useTranslation();
    const { language } = i18n;
    console.log({language})

    const invalidLocales = ["ok_PL", "ok_SK"];
    const isInvalidLocale = invalidLocales.includes(language);

    const containerRef = useRef<HTMLInputElement>(null);

    const formatDateTimeToJsDateOnCalendarSelection = useCallback<
      NonNullable<MuiDatePickerProps<DateTime>["onChange"]>
    >(
      (value, errorContext) => {
        const { validationError } = errorContext;
        // console.log({ value });
        if (value) {
          const jsDateFromDateTime = new Date(value?.toJSDate());
          // console.log({ jsDateFromDateTime });
          // if (isValidDate(jsDateFromDateTime)) {

          // }
          onCalendarDateChange?.({ value: jsDateFromDateTime, error: validationError });
        }
      },
      [onCalendarDateChange],
    );

    const onInputChange = useCallback(
      (args: any) => {
        console.log({ args });
      },
      [onInputChangeProp],
    );

    const formatDateToDateTime = (date: Date) => DateTime.fromJSDate(date);

    const formatDayOfWeek = (date: DateTime) => date.toFormat("EEE");

    const toggleCalendarVisibility = useCallback(
      () => setIsOpen(!isOpen),
      [isOpen],
    );

    const renderDateField = useCallback(
      (
        defaultValue: DateFieldProps["defaultValue"],
        value: DateFieldProps["value"],
      ) => (
        <DateField
          defaultValue={defaultValue}
          disableFuture={disableFuture}
          disablePast={disablePast}
          endAdornment={
            <InputAdornment position="end">
              <Button
                ariaLabel="Calendar"
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
          label={label}
          minDate={minDate ? formatDateToDateTime(minDate) : undefined}
          maxDate={maxDate ? formatDateToDateTime(maxDate) : undefined}
          onChange={onInputChange}
          value={value}
        />
      ),
      [
        errorMessage,
        hint,
        label,
        minDate,
        maxDate,
        onInputChange,
        toggleCalendarVisibility,
      ],
    );

    if (isInvalidLocale) {
      return null;
    }

    return (
      <OdysseyThemeProvider themeOverride={datePickerTheme}>
        <LocalizationProvider
          dateAdapter={AdapterLuxon}
          adapterLocale={formatLanguageCodeToHyphenated(language)}
        >
          <DatePickerContainer>
            <DatePickerWidthContainer
              odysseyDesignTokens={odysseyDesignTokens}
              ref={containerRef}
            >
              <MuiDatePicker<DateTime>
                defaultValue={
                  defaultValueProp
                    ? formatDateToDateTime(defaultValueProp)
                    : undefined
                }
                value={valueProp ? formatDateToDateTime(valueProp) : undefined}
                dayOfWeekFormatter={(_, date) => formatDayOfWeek(date)}
                key={language}
                label={label}
                minDate={minDate ? formatDateToDateTime(minDate) : undefined}
                maxDate={maxDate ? formatDateToDateTime(maxDate) : undefined}
                onAccept={(arg) => {
                  console.log("accept picker", arg);
                }}
                onChange={formatDateTimeToJsDateOnCalendarSelection}
                onClose={() => setIsOpen(false)}
                open={isOpen}
                ref={ref}
                slots={{
                  field: ({ defaultValue, value }) =>
                    renderDateField(defaultValue, value),
                  leftArrowIcon: () => <ArrowLeftIcon />,
                  rightArrowIcon: () => <ArrowRightIcon />,
                  switchViewIcon: () => <ChevronDownIcon />,
                }}
                slotProps={{
                  popper: {
                    anchorEl: containerRef.current,
                  },
                }}
              />
            </DatePickerWidthContainer>
          </DatePickerContainer>
        </LocalizationProvider>
      </OdysseyThemeProvider>
    );
  },
);

const MemoizedDatePicker = memo(DatePicker);
MemoizedDatePicker.displayName = "DatePicker";

export { MemoizedDatePicker as DatePicker };
