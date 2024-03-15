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

import { forwardRef, memo, useCallback,useEffect,  useRef, useState } from "react";
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
  /**
   * Callback fired when the a date is selected with the calendar.
   */
  onDateChange?: (date: Date | null) => void;
  /**
   * Callback fired when the textbox receives typed characters.
   */
  onInputChange?: (value: string) => void;
  onChange: (date: Date | null, validationError: string | null) => void;
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

type FormattedInputValues = {
  value?: DateTime;
  defaultValue?: DateTime;
}

const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  (
    {
      defaultValue: defaultValueProp,
      hint,
      label,
      minDate = new Date(),
      onDateChange,
      // onInputChange,
      value: valueProp,
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [formattedInputValues, setFormattedInputValues] =
      useState<FormattedInputValues>({
        defaultValue: undefined,
        value: undefined,
      });

    const { i18n } = useTranslation();
    const { language } = i18n;

    const invalidLocales = ["ok_PL", "ok_SK"];
    const isInvalidLocale = invalidLocales.includes(language);

    const containerRef = useRef<HTMLInputElement>(null);

    const controlledStateRef = useRef(
      getControlState({
        controlledValue: valueProp,
        uncontrolledValue: defaultValueProp,
      }),
    );

    // const getInputValues = useCallback(() => {
    //   return useInputValues({
    //     defaultValue: defaultValueProp || undefined,
    //     value: valueProp || undefined,
    //     controlState: controlledStateRef.current,
    //   });
    // }, [controlledStateRef, defaultValueProp, valueProp]);

    useEffect(() => {
      // const { value, defaultValue } = getInputValues();

      const isValidDate = (date: Date) => !isNaN(date.getTime());

      if (value) {
        console.log({ value });
        const valueAsDate = new Date(value);

        setFormattedInputValues({
          value: isValidDate(valueAsDate)
            ? DateTime.fromJSDate(valueAsDate)
            : undefined,
        });
      }

      if (defaultValue) {
        const defaultValueAsDate = new Date(defaultValue);

        setFormattedInputValues({
          defaultValue: isValidDate(defaultValueAsDate)
            ? DateTime.fromJSDate(defaultValueAsDate)
            : undefined,
        });
      }
    }, [controlledStateRef, defaultValueProp, valueProp]);

    // const getInputValueAsDateTime = useCallback(() => {
    //   const { value, defaultValue } = inputValues;

    //   const isValidDate = (date: Date) => !isNaN(date.getTime());

    //   if (value) {
    //     const valueAsDate = new Date(value);

    //     return {
    //       value: isValidDate(valueAsDate)
    //         ? DateTime.fromJSDate(valueAsDate)
    //         : null,
    //     };
    //   }

    //   if (defaultValue) {
    //     const defaultValueAsDate = new Date(defaultValue);

    //     return {
    //       defaultValue: isValidDate(defaultValueAsDate)
    //         ? DateTime.fromJSDate(defaultValueAsDate)
    //         : null,
    //     };
    //   }

    //   return null;
    // }, [controlledStateRef, inputValues]);

    // useEffect(() => {
    //   console.log({value}, 'in useEffect')
    // }, [value])

    // const inputValueAsDateTime = getInputValueAsDateTime();

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
          onDateChange?.(jsDateFromDateTime);
        }
      },
      [onDateChange],
    );

    const formattedMinDate = useCallback<
      (minDate: Date | undefined) => DateTime | undefined
    >(
      (minDate) => (minDate ? DateTime.fromJSDate(minDate) : undefined),
      [minDate],
    );

    const formatDayOfWeek = (date: DateTime) => {
      // console.log('date in format',{date})
      return date.toFormat("EEE");
    };

    const toggleCalendarVisibility = useCallback(() => {
      setIsOpen(!isOpen);
    }, [isOpen]);

    if (isInvalidLocale) {
      return null;
    }
    console.log({ formattedInputValues });
    return (
      <OdysseyThemeProvider themeOverride={datePickerTheme}>
        <LocalizationProvider
          dateAdapter={AdapterLuxon}
          adapterLocale={language}
        >
          <div ref={containerRef}>
            <MuiDatePicker<DateTime>
              {...formattedInputValues}
              dayOfWeekFormatter={(_, date) => formatDayOfWeek(date)}
              label={label}
              minDate={formattedMinDate(minDate)}
              onChange={formatDateTimeToJsDateOnCalendarSelection}
              onClose={toggleCalendarVisibility}
              open={isOpen}
              ref={ref}
              slots={{
                field: (muiProps) => (
                  <Field
                    {...muiProps}
                    hint={hint}
                    label={label}
                    onChange={formatDateTimeToJsDateOnCalendarSelection}
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
