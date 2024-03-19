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
  LocalizationProvider,
  // DateValidationError,
} from "@mui/x-date-pickers";
import { DateTime } from "luxon";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { InputAdornment } from "@mui/material";

import { Button } from "../Button";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CalendarIcon,
  ChevronDownIcon,
} from "../icons.generated";
import { DateField, DateFieldProps } from "./DateField";
import { datePickerTheme } from "./datePickerTheme";
// import { RenderFieldProps } from "../Field";
import { OdysseyThemeProvider } from "../OdysseyThemeProvider";
import { formatLanguageCodeToHyphenated } from "../OdysseyTranslationProvider";
// import {
//   ComponentControlledState,
//   getControlState,
//   // useInputValues,
// } from "../inputUtils";

export type DatePickerProps = {
  defaultValue?: Date;
  hint?: DateFieldProps["hint"];
  label: string;
  minDate: MuiDatePickerProps<Date>["minDate"];
  /**
   * Callback fired when the a date is selected with the calendar.
   */
  onCalendarDateChange?: (date: Date | null) => void;
  /**
   * Callback fired when the textbox receives typed characters.
   */
  onInputChange?: (value: string) => void;
  onChange: (date: Date | null, validationError: string | null) => void;
  value?: Date;
};

const Field = ({ defaultValue, hint, label, onChange, onAdornmentClick, value}: DateFieldProps & { onAdornmentClick?: () => void }) => {
  return (
    <DateField
      // {...muiProps}
      defaultValue={defaultValue}
      endAdornment={
        <InputAdornment position="end">
          <Button
            ariaLabel="Calendar"
            label=""
            size="small"
            startIcon={<CalendarIcon />}
            variant="floating"
            onClick={onAdornmentClick}
          />
        </InputAdornment>
      }
      hint={hint}
      label={label}
      onChange={onChange}
      value={value}
    />
  );
}

const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  (
    {
      defaultValue: defaultValueProp,
      hint,
      label,
      minDate,
      onCalendarDateChange,
      onInputChange: onInputChangeProp,
      value: valueProp,
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    
    const { i18n } = useTranslation();
    const { language } = i18n;

    const invalidLocales = ["ok_PL", "ok_SK"];
    const isInvalidLocale = invalidLocales.includes(language);

    const containerRef = useRef<HTMLInputElement>(null);

    // const controlledStateRef = useRef(
    //   getControlState({
    //     controlledValue: valueProp,
    //     uncontrolledValue: defaultValueProp,
    //   }),
    // );

    // useEffect(() => {
    //   const isValidDate = (date: Date) => !isNaN(date.getTime());
    //   console.log(controlledStateRef);
    //   if (
    //     valueProp &&
    //     controlledStateRef.current === ComponentControlledState.CONTROLLED) {
    //     console.log("hey", valueProp);

    //     const valueAsDate = new Date(valueProp);

    //     setFormattedInputValues({
    //       value: isValidDate(valueAsDate)
    //         ? DateTime.fromJSDate(valueAsDate)
    //         : undefined,
    //     });
    //   } else {
    //     if (defaultValueProp) {
    //       const defaultValueAsDate = new Date(defaultValueProp);

    //       setFormattedInputValues({
    //         defaultValue: isValidDate(defaultValueAsDate)
    //           ? DateTime.fromJSDate(defaultValueAsDate)
    //           : undefined,
    //       });
    //     }
    //   }
    // }, [controlledStateRef, defaultValueProp, valueProp]);

    const formatDateTimeToJsDateOnCalendarSelection = useCallback<
      NonNullable<MuiDatePickerProps<DateTime>["onChange"]>
    >(
      (value, _) => {
        // const { validationError } = errorContext;
        // console.log({ value });
        if (value) {
          const jsDateFromDateTime = new Date(value?.toJSDate());
          // console.log({ jsDateFromDateTime });
          // if (isValidDate(jsDateFromDateTime)) {

          // }
          onCalendarDateChange?.(jsDateFromDateTime);
        }
      },
      [onCalendarDateChange],
    );

    const onInputChange = useCallback((args) => {
      console.log({args})
    }, [onInputChangeProp]);

    const formattedMinDate = useCallback<
      (minDate: Date | undefined) => DateTime | undefined
    >(
      (minDate) => (minDate ? DateTime.fromJSDate(minDate) : undefined),
      [minDate],
    );

    const formatDayOfWeek = (date: DateTime) =>  date.toFormat("EEE")

    const toggleCalendarVisibility = useCallback(() => setIsOpen(!isOpen), [isOpen]);

    if (isInvalidLocale) {
      return null;
    }

    return (
      <OdysseyThemeProvider themeOverride={datePickerTheme}>
        <LocalizationProvider
          dateAdapter={AdapterLuxon}
          adapterLocale={formatLanguageCodeToHyphenated(language)}
        >
          <div ref={containerRef}>
            <MuiDatePicker<DateTime>
              defaultValue={
                defaultValueProp
                  ? DateTime.fromJSDate(defaultValueProp)
                  : undefined
              }
              value={valueProp ? DateTime.fromJSDate(valueProp) : undefined}
              dayOfWeekFormatter={(_, date) => formatDayOfWeek(date)}
              key={language}
              label={label}
              minDate={formattedMinDate(minDate)}
              onChange={formatDateTimeToJsDateOnCalendarSelection}
              onClose={() => setIsOpen(false)}
              open={isOpen}
              ref={ref}
              slots={{
                field: ({ defaultValue, value }) => (
                  <Field
                    defaultValue={defaultValue}
                    hint={hint}
                    label={label}
                    onChange={onInputChange}
                    onAdornmentClick={toggleCalendarVisibility}
                    value={value}
                  />
                ),
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
          </div>
        </LocalizationProvider>
      </OdysseyThemeProvider>
    );
  },
);

const MemoizedDatePicker = memo(DatePicker);
MemoizedDatePicker.displayName = "DatePicker";

export { MemoizedDatePicker as DatePicker };
