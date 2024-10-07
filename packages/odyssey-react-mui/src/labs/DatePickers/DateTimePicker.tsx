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
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { useTranslation } from "react-i18next";
import {
  type DateTimePickerSlots,
  MobileDateTimePicker as MuiDateTimePicker,
  DateTimePickerProps as MuiDateTimePickerProps,
  PickersActionBarProps,
  DateTimePickerSlotProps,
} from "@mui/x-date-pickers";
import { DateTime } from "luxon";
import styled from "@emotion/styled";

import { Button } from "../../Button";
import { DateFieldLocalizationProvider } from "./DateFieldLocalizationProvider";
import { DateTimeField, DateTimeFieldProps } from "./DateTimeField";
import { dateTimePickerTheme } from "./dateTimePickerTheme";
import { FieldComponentProps } from "../../FieldComponentProps";
import {
  useOdysseyDesignTokens,
  DesignTokens,
} from "../../OdysseyDesignTokensContext";
import { OdysseyThemeProvider } from "../../OdysseyThemeProvider";
import { TimeZonePicker } from "../TimeZonePicker";

import {
  useOdysseyDateFields,
  OdysseyDateFieldProps,
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

type RenderDateTimeFieldProps = {
  defaultValue: DateTimeFieldProps["defaultValue"];
  value: DateTimeFieldProps["value"];
} & MuiDateTimePickerProps<DateTime>;

export type DateTimePickerProps = OdysseyDateFieldProps &
  Pick<
    FieldComponentProps,
    | "errorMessage"
    | "hint"
    | "HintLinkComponent"
    | "isDisabled"
    | "isReadOnly"
    | "isOptional"
  >;

const DateTimePicker = ({
  defaultValue: defaultValueProp,
  errorMessage,
  hint,
  HintLinkComponent,
  isDateEnabled = () => true,
  isDisabled,
  isOptional,
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
}: DateTimePickerProps) => {
  const { i18n, t } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);
  const odysseyDesignTokens = useOdysseyDesignTokens();

  const {
    closeCalendar,
    commonIcons,
    defaultedLanguageCode,
    formatDateTimeToUtcIsoDateString,
    inputValues,
    internalTimeZone,
    isOpen,
    localeText,
    minDate,
    maxDate,
    popperElement,
    onTimeZoneChange,
    setPopperElement,
    shouldDisableDate,
    shouldDisableMonth,
    shouldDisableYear,
    toggleCalendarVisibility,
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
  // const [isOpen, setIsOpen] = useState(false);
  // const [popperElement, setPopperElement] = useState<HTMLInputElement | null>();

  const { language } = i18n;
  const containerRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setPopperElement(containerRef.current);
  }, []);

  const formatDateTimeToJsDateStringOnCalendarSelection = useCallback<
    NonNullable<MuiDateTimePickerProps<DateTime>["onChange"]>
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

  const renderDateTimeField = useCallback(
    ({ defaultValue, inputRef, value }: RenderDateTimeFieldProps) => {
      return (
        <DateTimeField
          defaultValue={defaultValue}
          endAdornment={
            <Button
              ariaLabel={t("picker.labels.date.choose")}
              label=""
              onClick={toggleCalendarVisibility}
              size="small"
              startIcon={<commonIcons.CalendarIcon />}
              variant="floating"
            />
          }
          errorMessage={errorMessage}
          hint={hint}
          HintLinkComponent={HintLinkComponent}
          inputRef={inputRef}
          isDisabled={isDisabled}
          isOptional={isOptional}
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
      commonIcons,
      errorMessage,
      hint,
      HintLinkComponent,
      internalTimeZone,
      isDisabled,
      isOptional,
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

  const slots = useMemo<DateTimePickerSlots<DateTime>>(
    () => ({
      actionBar: MemoizedActionBar,
      field: (muiProps) => renderDateTimeField(muiProps),
      leftArrowIcon: () => <commonIcons.ArrowLeftIcon />,
      rightArrowIcon: () => <commonIcons.ArrowRightIcon />,
      switchViewIcon: () => <commonIcons.ChevronDownIcon />,
    }),
    [commonIcons, renderDateTimeField],
  );

  const slotProps = useMemo<DateTimePickerSlotProps<DateTime, false>>(
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

  return (
    <OdysseyThemeProvider themeOverride={dateTimePickerTheme}>
      <DateFieldLocalizationProvider
        defaultedLanguageCode={defaultedLanguageCode}
        localeText={localeText}
      >
        <DatePickerContainer>
          <DatePickerWidthContainer
            odysseyDesignTokens={odysseyDesignTokens}
            ref={containerRef}
          >
            <MuiDateTimePicker
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
              onClose={closeCalendar}
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
      </DateFieldLocalizationProvider>
    </OdysseyThemeProvider>
  );
};

const MemoizedDateTimePicker = memo(DateTimePicker);
MemoizedDateTimePicker.displayName = "DateTimePicker";

export { MemoizedDateTimePicker as DateTimePicker };
