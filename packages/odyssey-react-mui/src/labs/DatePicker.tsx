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
  DatePicker as MuiDatePicker,
  DatePickerProps as MuiDatePickerProps,
} from "@mui/x-date-pickers";
import { InputAdornment } from "@mui/material";
import { Button } from "../Button";
import { ArrowLeftIcon, ArrowRightIcon, CalendarIcon, ChevronDownIcon } from "../icons.generated";
import { TextField } from "../TextField";
import { forwardRef, memo, useCallback, useState } from "react";

export type DatePickerProps<Date> = {
  label: string;
  onChange: MuiDatePickerProps<Date>["onChange"];
  value: MuiDatePickerProps<Date>["value"];
};
const DatePicker = forwardRef<HTMLInputElement, DatePickerProps<Date>>(
  (
    {
      label,
      onChange,
      value = null,
    }, ref) => {
    const [isOpen, setIsOpen] = useState(false);

    const renderFieldComponent = useCallback(({ label, onChange, value }) => {
      return (
        <TextField
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
          hint="MM/DD/YYYY"
          label={label}
          onChange={onChange}
          ref={ref}
          value={value}
        />
      );
    }, [label, onChange, value]);

    return (
      <MuiDatePicker
        label={label}
        onChange={onChange}
        onClose={() => setIsOpen(false)}
        open={isOpen}
        value={value}
        slots={{
          field: renderFieldComponent,
          leftArrowIcon: () => <ArrowLeftIcon />,
          rightArrowIcon: () => <ArrowRightIcon />,
          switchViewIcon: () => <ChevronDownIcon />,
        }}
      />
    );
  });

const MemoizedDatePicker = memo(DatePicker);
MemoizedDatePicker.displayName = "DatePicker";

export { MemoizedDatePicker as DatePicker };
