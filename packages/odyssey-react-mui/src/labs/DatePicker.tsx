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
  DateFieldProps as MuiDateFieldProps,
  LocalizationProvider,
  DateValidationError,
  PickerChangeHandlerContext,
} from "@mui/x-date-pickers";
import { DateTime } from "luxon";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { InputAdornment, Popper, TextField } from "@mui/material";

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
import {
  // ComponentControlledState,
  getControlState,
  useInputValues,
} from "../inputUtils";

export type DatePickerProps<Date> = {
  defaultValue?: MuiDatePickerProps<Date>["value"];
  hint?: DateFieldProps["hint"];
  label: string;
  onChange: (
    date: Date,
    validationError: PickerChangeHandlerContext<DateValidationError>,
  ) => void;
  value?: MuiDatePickerProps<Date>["value"];
};

// const DateFieldComponent = (props: any) => <DateField {...props} />

const Field = ({hint, label, onChange, onAdornmentClick, ...muiProps}: DateFieldProps & { onAdornmentClick?: () => void }) => {
  return (
    <DateField
      {...muiProps}
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
    />
  )
}
const DatePicker = forwardRef<HTMLInputElement, DatePickerProps<Date>>(
  ({ defaultValue, hint, label, onChange, value }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const { i18n } = useTranslation();
    const { language } = i18n;

    const invalidLocales = ["ok_PL", "ok_SK"];
    const isInvalidLocale = invalidLocales.includes(language);

    const containerRef = useRef<HTMLInputElement>(null);

    const controlledStateRef = useRef(
      getControlState({
        controlledValue: value,
        uncontrolledValue: defaultValue,
      }),
    );
    const inputValues = useInputValues({
      defaultValue: defaultValue || undefined,
      value: value || undefined,
      controlState: controlledStateRef.current,
    });

    const getInputValueAsDateTime = useCallback(() => {
      const { value, defaultValue } = inputValues;

      if (value) {
        return {
          value: DateTime.fromJSDate(value),
        };
      }

      if (defaultValue) {
        return {
          defaultValue: DateTime.fromJSDate(defaultValue)
        };
      }

      return null
    }, [controlledStateRef, inputValues]);

    const inputValueAsDateTime = getInputValueAsDateTime();

    const handleChange = useCallback(
      // value will be luxon DateTime
      (
        value: DateTime | null,
        validationError: PickerChangeHandlerContext<DateValidationError>,
      ) => {
        if (value) {
          console.log({validationError})
          const jsDateFromDateTime: Date = new Date(value?.toJSDate());

          if (jsDateFromDateTime) {
            onChange?.(jsDateFromDateTime, validationError);

          }
        }
      },
      [onChange],
    );

    const renderFieldComponent = useCallback(
      (
        muiProps: MuiDateFieldProps<DateTime>
      ) => {
        // const { inputRef } = muiProps;
        // console.log({inputRef})
        // if (
        //   typeof muiProps?.inputRef === "function"
        // ) {
        //   // console.log("ref assignment");
        //   console.log(containerRef.current);
        //   muiProps?.inputRef?.(containerRef.current);
        // }
        return (
          <DateField
            {...muiProps}
            endAdornment={
              <InputAdornment position="end">
                <Button
                  ariaLabel="Calendar"
                  label=""
                  size="small"
                  startIcon={<CalendarIcon />}
                  variant="floating"
                  onClick={() => setIsOpen(true)}
                />
              </InputAdornment>
            }
            hint={hint}
            label={label}
            onChange={handleChange}
            // ref={muiProps.InputProps.ref}
            // ref={(element: HTMLInputElement) => {
            //   containerRef.current = element;
            // }}
          />
        );
      },
      [inputValueAsDateTime, label, onChange],
    );

    if (isInvalidLocale) {
      return null;
    }

    return (
      <OdysseyThemeProvider themeOverride={datePickerTheme}>
        <LocalizationProvider
          dateAdapter={AdapterLuxon}
          adapterLocale={language}
        >
          <div ref={containerRef}>
            <MuiDatePicker
              {...inputValueAsDateTime}
              dayOfWeekFormatter={(_, date: DateTime) => {
                return date.toFormat("EEE");
              }}
              label={label}
              onChange={handleChange}
              onClose={() => setIsOpen(false)}
              open={isOpen}
              ref={ref}
              slots={{
                field: (muiProps) => <Field hint={hint} label={label} onChange={handleChange} onAdornmentClick={() => setIsOpen(true)}{...muiProps} />,
                leftArrowIcon: () => <ArrowLeftIcon />,
                rightArrowIcon: () => <ArrowRightIcon />,
                switchViewIcon: () => <ChevronDownIcon />,
              }}
              slotProps={{
                popper: {
                  anchorEl: containerRef.current
                }
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
