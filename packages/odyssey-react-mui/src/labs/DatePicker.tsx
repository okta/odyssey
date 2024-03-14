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
  DateValidationError,
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
import {
  // ComponentControlledState,
  getControlState,
  useInputValues,
} from "../inputUtils";

export type DatePickerProps = {
  defaultValue?: string;
  hint?: DateFieldProps["hint"];
  label: string;
  minDate: MuiDatePickerProps<Date>["minDate"];
  onChange: (
    date: Date | null,
    validationError: string | null,
  ) => void;
  value?: string;
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
const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  ({ defaultValue, hint, label, minDate, onChange, value }, ref) => {
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

      const isValidDate = (date: Date) => !isNaN(date);

      if (value) {
        const valueAsDate = new Date(value);

        return {
          value: isValidDate(valueAsDate) ? DateTime.fromJSDate(valueAsDate) : null,
        };
      }
      
      if (defaultValue) {
        const defaultValueAsDate = new Date(defaultValue);

        return {
          defaultValue: isValidDate(defaultValueAsDate)
            ? DateTime.fromJSDate(defaultValueAsDate)
            : null,
        };
      }

      return null
    }, [controlledStateRef, inputValues]);

    const inputValueAsDateTime = getInputValueAsDateTime();

    const formatDateTimeToJsDate = useCallback<NonNullable<MuiDatePickerProps<DateTime>["onChange"]>>(
      (value, errorContext) => {
        const { validationError } = errorContext;

        
        
        if (value) {
          const jsDateFromDateTime = new Date(value?.toJSDate());
          console.log({ jsDateFromDateTime }, { errorContext });
          // if (isValidDate(jsDateFromDateTime)) {

          // }
          onChange?.(jsDateFromDateTime, validationError);
        }
      },
      [onChange],
    );

    const onChangeToPicker = () => {
      console.log('picker change')
    }

    const onChangeToField = () => {
      console.log("field change");
    };

    // const renderFieldComponent = useCallback(
    //   (
    //     muiProps: MuiDateFieldProps<DateTime>
    //   ) => {
    //     // const { inputRef } = muiProps;
    //     // console.log({inputRef})
    //     // if (
    //     //   typeof muiProps?.inputRef === "function"
    //     // ) {
    //     //   // console.log("ref assignment");
    //     //   console.log(containerRef.current);
    //     //   muiProps?.inputRef?.(containerRef.current);
    //     // }
    //     return (
    //       <DateField
    //         {...muiProps}
    //         endAdornment={
    //           <InputAdornment position="end">
    //             <Button
    //               ariaLabel="Calendar"
    //               label=""
    //               size="small"
    //               startIcon={<CalendarIcon />}
    //               variant="floating"
    //               onClick={() => setIsOpen(true)}
    //             />
    //           </InputAdornment>
    //         }
    //         hint={hint}
    //         label={label}
    //         onChange={handleChange}
    //         // ref={muiProps.InputProps.ref}
    //         // ref={(element: HTMLInputElement) => {
    //         //   containerRef.current = element;
    //         // }}
    //       />
    //     );
    //   },
    //   [inputValueAsDateTime, label, onChange],
    // );

    const formattedMinDate = useCallback<(minDate: Date | undefined) => DateTime | undefined>((minDate) => (
      minDate ? DateTime.fromJSDate(minDate) : undefined
    ), [minDate])

    const formatDayOfWeek = (date: DateTime) => {
      // console.log('date in format',{date})
      return date.toFormat("EEE")
    }

    const toggleCalendarVisibility = useCallback(() => {
      setIsOpen(!isOpen)
    }, [isOpen])

    if (isInvalidLocale) {
      return null;
    }

    const blur = () => {
      console.log('blurred')
    }

    return (
      <OdysseyThemeProvider themeOverride={datePickerTheme}>
        <LocalizationProvider
          dateAdapter={AdapterLuxon}
          adapterLocale={language}
        >
          <div ref={containerRef}>
            <MuiDatePicker<DateTime>
              {...inputValueAsDateTime}
              dayOfWeekFormatter={(_, date) => formatDayOfWeek(date)}
              label={label}
              minDate={formattedMinDate(minDate)}
              onChange={onChangeToPicker}
              onClose={toggleCalendarVisibility}
              open={isOpen}
              ref={ref}
              slots={{
                field: (muiProps) => (
                  <Field
                    {...muiProps}
                    hint={hint}
                    label={label}
                    onChange={onChangeToField}
                    onAdornmentClick={toggleCalendarVisibility}
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
