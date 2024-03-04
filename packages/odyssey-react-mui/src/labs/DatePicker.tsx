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

import { forwardRef, memo, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  DatePicker as MuiDatePicker,
  DatePickerProps as MuiDatePickerProps,
  LocalizationProvider,
  DateValidationError,
  PickerChangeHandlerContext,
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

export type DatePickerProps<DateTime> = {
  label: string;
  onChange: (
    date: Date,
    validationError: PickerChangeHandlerContext<DateValidationError>
  ) => void;
  defaultValue: MuiDatePickerProps<DateTime>["value"];
  hint?: DateFieldProps["hint"];
};

const DatePicker = forwardRef<HTMLInputElement, DatePickerProps<DateTime>>(
  ({ label, onChange, defaultValue = null, hint }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const { i18n } = useTranslation();
    const { language } = i18n;

    const invalidLocales = ["ok_PL", "ok_SK"];
    const isInvalidLocale = invalidLocales.includes(language);

    const handleChange = useCallback(
      // value will be luxon DateTime
      (
        value: DateTime | null,
        validationError: PickerChangeHandlerContext<DateValidationError>
      ) => {
        // console.log({ value }, { context });
        if (value) {
          const jsDateFromDateTime: Date = value?.toJSDate();
          console.log({ jsDateFromDateTime });
          onChange?.(jsDateFromDateTime, validationError);
        }
      },
      [onChange]
    );

    const renderFieldComponent = useCallback(
      (props: any) => {
        // const containerRef = rest?.InputProps?.ref;
        const containerRef = undefined;
        console.log({ ...props });
        return (
          <DateField
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
            ref={containerRef}
            value={defaultValue}
          />
        );
      },
      [label, onChange, defaultValue],
    );

    if (isInvalidLocale) {
      return null;
    }
    console.log({ language });
    return (
      <OdysseyThemeProvider themeOverride={datePickerTheme}>
        <LocalizationProvider
          dateAdapter={AdapterLuxon}
          adapterLocale={language}
        >
          <MuiDatePicker
            dayOfWeekFormatter={(_, date: DateTime) => {
              return date.toFormat("EEE");
            }}
            label={label}
            onChange={handleChange}
            onClose={() => setIsOpen(false)}
            open={isOpen}
            value={defaultValue}
            ref={ref}
            slots={{
              field: renderFieldComponent,
              leftArrowIcon: () => <ArrowLeftIcon />,
              rightArrowIcon: () => <ArrowRightIcon />,
              switchViewIcon: () => <ChevronDownIcon />,
            }}
          />
        </LocalizationProvider>
      </OdysseyThemeProvider>
    );
  }
);

const MemoizedDatePicker = memo(DatePicker);
MemoizedDatePicker.displayName = "DatePicker";

export { MemoizedDatePicker as DatePicker };
