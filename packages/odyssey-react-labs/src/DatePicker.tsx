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

import { InputBase } from "@mui/material";
import {
  DatePicker as MuiDatePicker,
  DatePickerProps as MuiDatePickerProps,
} from "@mui/x-date-pickers";
import { useCallback } from "react";

export type DatePickerProps<TInputDate, TDate> = {
  label: MuiDatePickerProps<TInputDate, TDate>["label"];
  onChange: MuiDatePickerProps<TInputDate, TDate>["onChange"];
  value: MuiDatePickerProps<TInputDate, TDate>["value"];
};

export const DatePicker = <TInputDate, TDate>({
  label,
  onChange,
  value = null,
}: DatePickerProps<TInputDate, TDate>) => {
  const renderInput = useCallback(({ InputProps, ...props }) => {
    const combinedProps = {
      ...InputProps,
      ...props,
    };

    return <InputBase {...combinedProps} />;
  }, []);

  return (
    <MuiDatePicker
      label={label}
      onChange={onChange}
      renderInput={renderInput}
      value={value}
    />
  );
};
