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

import { KeyboardEventHandler, memo, useCallback } from "react";
import { InputAdornment } from "@mui/material";
import {
  DateValidationError,
  DateField as MuiDateField,
  DateFieldProps as MuiDateFieldProps,
  PickerChangeHandlerContext,
} from "@mui/x-date-pickers";
import { DateTime } from "luxon";

import { Field, RenderFieldProps } from "../Field";
import { TextFieldProps } from "../TextField";

export const textFieldTypeValues = [
  "email",
  "number",
  "tel",
  "text",
  "url",
] as const;

export type DateFieldProps = MuiDateFieldProps<DateTime> & {
  onChange: (
    value: DateTime | string,
    validationContext?: PickerChangeHandlerContext<DateValidationError>,
  ) => void;
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
    | "placeholder"
  >;

const DateField =
  (
    {
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
      minDate,
      onBlur,
      onChange,
      onFocus,
      placeholder,
      value,
    }: DateFieldProps
  ) => {
    // const [inputValueString, setInputValueString] = useState("");

    const handleChange = useCallback<
      NonNullable<MuiDateFieldProps<DateTime>["onChange"]>
    >(
      (
        // value will be luxon DateTime
        value,
        validationContext,
      ) => {
        console.log("changing", { value }, validationContext.validationError);
        // console.log("change called");
        // console.log({value})
        if (value?.isValid && !validationContext.validationError) {
          // onChange?.(value, validationContext);
        } else {
          // console.log("change without DT", { inputValueString });
          // onChange?.(inputValueString, validationContext);
        }
      },
      [onChange],
    );

    const onKeyUp: KeyboardEventHandler<HTMLInputElement> = (
      event,
    ) => {
      const { key } = event;
      console.log({key})
      if (key !== "TAB") {
        const value = (event.target as HTMLInputElement).value;
        onChange?.(value);
      }
    };

    const renderFieldComponent = useCallback(
      ({ ariaDescribedBy, id, labelElementId }: RenderFieldProps) => {

        return (
          <MuiDateField
            /* eslint-disable-next-line jsx-a11y/no-autofocus */
            autoFocus={hasInitialFocus}
            defaultValue={defaultValue}
            disabled={isDisabled}
            id={id}
            inputProps={{
              "aria-describedby": ariaDescribedBy,
              "aria-labelledby": labelElementId,
            }}
            InputProps={{
              error: Boolean(errorMessage),
              endAdornment: (
                <InputAdornment position="end">{endAdornment}</InputAdornment>
              ),
            }}
            minDate={minDate}
            name={id}
            onBlur={onBlur}
            onChange={handleChange}
            onFocus={onFocus}
            onKeyUp={onKeyUp}
            readOnly={isReadOnly}
            value={value}
            variant="standard"
          />
        );
      },
      [
        defaultValue,
        endAdornment,
        errorMessage,
        hasInitialFocus,
        onChange,
        onFocus,
        onBlur,
        placeholder,
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
