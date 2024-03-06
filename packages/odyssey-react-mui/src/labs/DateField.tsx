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

import { forwardRef, memo, useCallback } from "react";
import { InputAdornment } from "@mui/material";
import {
  DateValidationError,
  DateField as MuiDateField,
  DateFieldProps as MuiDateFieldProps,
  PickerChangeHandlerContext,
} from "@mui/x-date-pickers";
import { DateTime } from "luxon";
// import { FieldChangeHandler } from '@mui/material';

import { Field, RenderFieldProps } from "../Field";
import { TextFieldProps } from "../TextField";
// import { HtmlProps } from "../HtmlProps";

export const textFieldTypeValues = [
  "email",
  "number",
  "tel",
  "text",
  "url",
] as const;

export type DateFieldProps = MuiDateFieldProps<DateTime> & {
  defaultValue?: MuiDateFieldProps<DateTime>["value"];
  onChange: (
    value: DateTime | null,
    validationError: PickerChangeHandlerContext<DateValidationError>,
  ) => void;
  value?: MuiDateFieldProps<DateTime>["value"];
} & Pick<
    TextFieldProps,
    | "endAdornment"
    | "label"
    | "hasInitialFocus"
    | "id"
    | "onBlur"
    | "onFocus"
    | "placeholder"
    | "errorMessage"
    | "hint"
    | "isDisabled"
    | "isOptional"
    | "isReadOnly"
  >;

const DateField = forwardRef<HTMLInputElement, DateFieldProps>(
  (
    {
      defaultValue,
      endAdornment,
      errorMessage,
      hasInitialFocus,
      hint,
      id: idOverride,
      inputRef,
      isDisabled = false,
      isOptional = false,
      isReadOnly,
      label,
      onBlur,
      onChange,
      onFocus,
      placeholder,
      value,
      ...rest
    },
    ref
  ) => {
    const handleChange = (
      value: DateTime,
      validationError: PickerChangeHandlerContext<DateValidationError>,
    ) => {
      // const value = event.target.value;
      // console.log({ value }, { validationError });
      // return value;
      onChange?.(value, validationError);
    };

    const renderFieldComponent = useCallback(
      ({ ariaDescribedBy, id, labelElementId }: RenderFieldProps) => {
        return (
          <MuiDateField
            {...rest}
            /* eslint-disable-next-line jsx-a11y/no-autofocus */
            autoFocus={hasInitialFocus}
            defaultValue={defaultValue}
            id={id}
            InputProps={{
              ref: inputRef,
              "aria-describedby": ariaDescribedBy,
              "aria-labelledby": labelElementId,
              endAdornment: (
                <InputAdornment position="end">{endAdornment}</InputAdornment>
              ),
            }}
            name={id}
            onBlur={onBlur}
            // @ts-ignore
            onChange={handleChange}
            onFocus={onFocus}
            readOnly={isReadOnly}
            // ref={ref}
            value={value}
            variant="standard"
          />
        );
      },
      [
        defaultValue,
        endAdornment,
        hasInitialFocus,
        onChange,
        onFocus,
        onBlur,
        placeholder,
        isReadOnly,
        ref,
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
  }
);

const MemoizedDateField = memo(DateField);
MemoizedDateField.displayName = "DateField";

export { MemoizedDateField as DateField };
