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
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import {
  DatePicker as MuiDatePicker,
  DatePickerProps as MuiDatePickerProps,
  LocalizationProvider,
  PickersActionBarProps,
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

const DatePickerWidthContainer = styled.div<{
  odysseyDesignTokens: DesignTokens;
}>(({ odysseyDesignTokens }) => ({
  ".MuiInput-root": {
    // 176px
    width: `calc(${odysseyDesignTokens.Spacing4} * 11)`,
  },
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
          label={t("picker.labels.action.accept")}
          onClick={onAccept}
          variant="primary"
        />
      </ActionContainer>
    );
  }

  return null;
};

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
   * Callback fired when the a date is selected with the calendar.
   */
  onCalendarDateChange?: (value: Date) => void;
  /**
   * Callback fired when the date/text input changes.
   */
  onInputChange?: ChangeEventHandler<HTMLInputElement>;
  value?: Date;
} & Pick<FieldComponentProps, "errorMessage" | "hint" | "isDisabled"> &
  Pick<
    MuiDatePickerProps<Date>,
    | "defaultValue"
    | "disableFuture"
    | "disablePast"
    | "minDate"
    | "maxDate"
    | "shouldDisableDate"
    | "shouldDisableMonth"
    | "shouldDisableYear"
  >;

const DatePicker = ({
  defaultValue: defaultValueProp,
  disableFuture,
  disablePast,
  errorMessage,
  hint,
  isDisabled,
  label,
  minDate,
  maxDate,
  onCalendarDateChange,
  shouldDisableDate,
  shouldDisableMonth,
  shouldDisableYear,
  onInputChange: onInputChangeProp,
  value: valueProp,
}: DatePickerProps) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();
  const [isOpen, setIsOpen] = useState(false);

  const { i18n, t } = useTranslation();
  const { language } = i18n;

  const invalidLocales = ["ok_PL", "ok_SK"];
  const isInvalidLocale = invalidLocales.includes(language);

  const containerRef = useRef<HTMLInputElement>(null);

  const localeText = useDatePickerTranslations(t);

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

  const formatDateToDateTime = (date: Date) => DateTime.fromJSDate(date);

  const formatDayOfWeek = (date: DateTime) => date.toFormat("EEE");

  const toggleCalendarVisibility = useCallback(
    () => setIsOpen(!isOpen),
    [isOpen],
  );

  const shouldDisableDateAsDateTime = useCallback(
    (date: DateTime) =>
      shouldDisableDate?.(new Date(date?.toJSDate())) || false,
    [shouldDisableDate],
  );

  const shouldDisableMonthAsDateTime = useCallback(
    (date: DateTime) =>
      shouldDisableMonth?.(new Date(date?.toJSDate())) || false,
    [shouldDisableMonth],
  );

  const shouldDisableYearAsDateTime = useCallback(
    (date: DateTime) =>
      shouldDisableYear?.(new Date(date?.toJSDate())) || false,
    [shouldDisableYear],
  );

  const renderDateField = useCallback(
    ({ defaultValue, value }: RenderDateFieldProps) => {
      // const { disableFuture, disablePast, minDate, maxDate, shouldDisableDate, shouldDisableMonth, shouldDisableYear } = muiProps
      // these props do nothing here currently.
      // MUI's DateFiled onChange provides a value and a validationContext object. But, we are not using that at the moment.
      // If we decide to provide MUI's validation context to the consumer, these will provide constraints for that
      // disableFuture={disableFuture}
      // disablePast={disablePast}
      // minDate={minDate}
      // maxDate={maxDate}
      // shouldDisableDate={shouldDisableDate}
      // shouldDisableMonth={shouldDisableMonth}
      // shouldDisableYear={shouldDisableYear}

      return (
        <DateField
          defaultValue={defaultValue}
          endAdornment={
            <InputAdornment position="end">
              <Button
                ariaLabel={t("datepicker.calendar.icon.label")}
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
      );
    },
    [
      errorMessage,
      hint,
      isDisabled,
      label,
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
        adapterLocale={language.replaceAll("_", "-")}
        localeText={localeText}
      >
        <DatePickerContainer>
          <DatePickerWidthContainer
            odysseyDesignTokens={odysseyDesignTokens}
            ref={containerRef}
          >
            <MuiDatePicker
              dayOfWeekFormatter={(date) => formatDayOfWeek(date)}
              defaultValue={
                defaultValueProp
                  ? formatDateToDateTime(defaultValueProp)
                  : undefined
              }
              disabled={isDisabled}
              disableFuture={disableFuture}
              disablePast={disablePast}
              fixedWeekNumber={6}
              key={language}
              label={label}
              minDate={minDate ? formatDateToDateTime(minDate) : undefined}
              maxDate={maxDate ? formatDateToDateTime(maxDate) : undefined}
              onChange={formatDateTimeToJsDateOnCalendarSelection}
              onClose={() => setIsOpen(false)}
              open={isOpen}
              shouldDisableDate={shouldDisableDateAsDateTime}
              shouldDisableMonth={shouldDisableMonthAsDateTime}
              shouldDisableYear={shouldDisableYearAsDateTime}
              slots={{
                actionBar: ActionBar,
                field: (muiProps) =>
                  renderDateField(muiProps as RenderDateFieldProps),
                leftArrowIcon: () => <ArrowLeftIcon />,
                rightArrowIcon: () => <ArrowRightIcon />,
                switchViewIcon: () => <ChevronDownIcon />,
              }}
              slotProps={{
                actionBar: ({ wrapperVariant, onAccept, onCancel }) => ({
                  actions:
                    // This is the default behavior but felt more clear to pass them in explicitly
                    wrapperVariant === "desktop" ? [] : ["accept", "cancel"],
                  onAccept,
                  onCancel,
                }),
                popper: {
                  anchorEl: containerRef.current,
                },

                toolbar: {
                  toolbarPlaceholder: "",
                },
              }}
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
