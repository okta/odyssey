/*!
 * Copyright (c) 2022-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { ChangeEventHandler, ChangeEvent, memo, useCallback } from "react";
import { InputAdornment } from "@mui/material";
import {
  DateField as MuiDateField,
  DateFieldProps as MuiDateFieldProps,
} from "@mui/x-date-pickers";
import { DateTime } from "luxon";

import { Field, RenderFieldComponentProps } from "../Field";
import { TextFieldProps } from "../TextField";

export type DateFieldProps = {
  defaultValue?: MuiDateFieldProps<DateTime>["defaultValue"];
  onChange: ChangeEventHandler<HTMLInputElement>;
  value?: MuiDateFieldProps<DateTime>["value"];
} & Pick<
  TextFieldProps,
  | "endAdornment"
  | "errorMessage"
  | "hasInitialFocus"
  | "hint"
  | "id"
  | "isDisabled"
  | "isOptional"
  | "isReadOnly"
  | "label"
  | "onBlur"
  | "onFocus"
>;

const DateField = ({
  defaultValue,
  endAdornment,
  errorMessage,
  hasInitialFocus,
  hint,
  id: idOverride,
  isDisabled = false,
  isOptional = false,
  isReadOnly,
  label,
  onBlur,
  onChange,
  onFocus,
  value,
}: DateFieldProps) => {
  const renderFieldComponent = useCallback(
    ({ ariaDescribedBy, id, labelElementId }: RenderFieldComponentProps) => (
      <MuiDateField
        /* eslint-disable-next-line jsx-a11y/no-autofocus */
        autoFocus={hasInitialFocus}
        defaultValue={defaultValue}
        disabled={isDisabled}
        id={id}
        inputProps={{
          "aria-describedby": ariaDescribedBy,
          "aria-labelledby": labelElementId,
          onChange: (event) =>
            onChange?.(event as ChangeEvent<HTMLInputElement>),
        }}
        InputProps={{
          error: Boolean(errorMessage),
          endAdornment: (
            <InputAdornment position="end">{endAdornment}</InputAdornment>
          ),
        }}
        name={id}
        onBlur={onBlur}
        onFocus={onFocus}
        readOnly={isReadOnly}
        value={value}
        variant="standard"
      />
    ),
    [
      defaultValue,
      endAdornment,
      errorMessage,
      hasInitialFocus,
      isDisabled,
      onChange,
      onFocus,
      onBlur,
      isReadOnly,
      value,
    ],
  );

  return (
    <Field
      errorMessage={errorMessage}
      fieldType="single"
      hasVisibleLabel
      hint={hint}
      id={idOverride}
      isDisabled={isDisabled}
      isOptional={isOptional}
      label={label}
      renderFieldComponent={renderFieldComponent}
    />
  );
};

const MemoizedDateField = memo(DateField);
MemoizedDateField.displayName = "DateField";

export { MemoizedDateField as DateField };
