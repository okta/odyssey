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

import { InputAdornment } from "@mui/material";
import {
  DateValidationError,
  DateField as MuiDateField,
  DateFieldProps as MuiDateFieldProps,
} from "@mui/x-date-pickers";
import { forwardRef, memo, useCallback } from "react";

import { Field } from "../Field";
import { TextFieldProps } from "../TextField";
import { FieldComponentProps } from "../FieldComponentProps";
import { SeleniumProps } from "../SeleniumProps";

export const textFieldTypeValues = [
  "email",
  "number",
  "tel",
  "text",
  "url",
] as const;

export type DateFieldProps = {
} & MuiDateFieldProps<Date> & FieldComponentProps &
  Pick<
    TextFieldProps,
    | "endAdornment"
    | "label"
    | "hasInitialFocus"
    | "isOptional"
    | "isReadOnly"
    | "onBlur"
    | "onFocus"
    | "placeholder"
  > &
  SeleniumProps;

const DateField = forwardRef<HTMLInputElement, DateFieldProps>(
  (
    {
      hasInitialFocus,
      endAdornment,
      errorMessage,
      hint,
      id: idOverride,
      isDisabled = false,
      isOptional = false,
      isReadOnly,
      label,
      onBlur,
      onChange,
      onFocus,
      placeholder,
      value = null,
    },
    ref
  ) => {
    const handleChange = (
      value: Date | null,
      validationError: DateValidationError
    ) => {
      // const value = event.target.value;
      console.log({ value }, { validationError });
      // return value;
      onChange?.(value, { validationError: null });
    };

    const renderFieldComponent = useCallback(
      ({ ariaDescribedBy, id }) => (
        <MuiDateField
          aria-describedby={ariaDescribedBy}
          /* eslint-disable-next-line jsx-a11y/no-autofocus */
          autoFocus={hasInitialFocus}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">{endAdornment}</InputAdornment>
            ),
          }}
          id={id}
          name={id}
          onBlur={onBlur}
          // @ts-ignore
          // Ignoring this for now. I can't type the args correctly due to the FieldChangeHandler type not being available
          onChange={handleChange}
          onFocus={onFocus}
          readOnly={isReadOnly}
          ref={ref}
          value={value}
          variant="standard"
        />
      ),
      [
        hasInitialFocus,
        endAdornment,
        onChange,
        onFocus,
        onBlur,
        placeholder,
        isReadOnly,
        ref,
        value,
      ]
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
  }
);

const MemoizedDateField = memo(DateField);
MemoizedDateField.displayName = "DateField";

export { MemoizedDateField as DateField };
