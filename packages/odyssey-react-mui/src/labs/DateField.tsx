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

import {
  ChangeEventHandler,
  ChangeEvent,
  // FocusEventHandler,
  // KeyboardEventHandler,
  memo,
  useCallback,
  // useEffect,
  // useRef,
  // useState,
} from "react";
import { InputAdornment } from "@mui/material";
import {
  // DateValidationError,
  DateField as MuiDateField,
  DateFieldProps as MuiDateFieldProps,
  // PickerChangeHandlerContext,
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

export type DateFieldProps = Omit<MuiDateFieldProps<DateTime>, "onChange"> & {
  onChange: ChangeEventHandler<HTMLInputElement>;
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

// type ErrorMap = {
//   [key: string]: string;
// };

// const errorMap: ErrorMap = {
//   disablePast: "Please pick a date in the future",
//   disableFuture: "Please pick a date in the past",
//   invalidDate: "Yo, that ain't right!",
//   minDate: "Date does not meet minimum date requirements",
//   maxDate: "Date does not meet maximum date requirements",
// };

const DateField =
  (
    {
      defaultValue,
      disableFuture,
      disablePast,
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
    // const [internalErrorMessage, setInternalErrorMessage] = useState<DateValidationError | null>(null);
    // const [internalDisplayedError, setInternalDisplayedError] = useState<
    //   string | null
    // >(null);

    // const debounceTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

    // useEffect(() => {
    //   return () => {
    //     if (!debounceTimeoutRef.current) return;
    //     clearTimeout(debounceTimeoutRef.current);
    //   };
    // }, []);

    // useEffect(() => {
    //   console.log(internalErrorMessage);
    //   // setInternalDisplayedError(internalErrorMessage ? errorMap[internalErrorMessage] : "");
    // }, [internalErrorMessage]);

    // const debounceErrorHandling: (validationError: DateValidationError, delay: number) => void = (validationError, delay) => {
    //   const newTimer = setTimeout(() => {
    //     setInternalErrorMessage(validationError);
    //   }, delay);
    //   clearTimeout(debounceTimeoutRef.current);
    //   debounceTimeoutRef.current = newTimer;
    // };

    // const onInputChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    //   (event) => {
    //     onChange?.(event)
    //     // const { validationError } = validationContext;
    //     // setInternalErrorMessage(null);
    //     // Delay showing the error message for UX purposes
    //     // console.log("error in change", { validationError });

    //     // Reset displayed error message
    //     // setInternalDisplayedError(null);
    //     // Set error state so we can show it on blur, if an error is present
    //     // setInternalErrorMessage(validationError);

    //     // if (value?.isValid) {
    //       // setInternalErrorMessage(validationError);
    //       // onChange?.(value);
    //       // console.log({ value }, { hasFullYear }, {validationError});
    //       // if (hasFullYear && validationError) {
    //       //   setInternalErrorMessage(validationError);
    //       // };
    //     // }
    //   },
    //   [onChange],
    // );

    // const onKeyUp: KeyboardEventHandler<HTMLInputElement> = (
    //   event,
    // ) => {
    //   const { key } = event;
    //   // console.log({key})
    //   if (key !== "TAB") {
    //     const value = (event.target as HTMLInputElement).value;
    //     // onChange?.(value);
    //   }
    // };

    // const onError = (args) => {
    //   console.log(...args)
    // }

    // const checkForValidationError = useCallback<
    //   FocusEventHandler<HTMLInputElement>
    // >(
    //   (event) => {
    //     if (internalErrorMessage) {
    //       setInternalDisplayedError(errorMap[internalErrorMessage]);
    //     }
    //     onBlur?.(event);
    //   },
    //   [internalErrorMessage],
    // );

    const renderFieldComponent = useCallback(
      ({ ariaDescribedBy, id, labelElementId }: RenderFieldProps) => {
        return (
          <MuiDateField
            /* eslint-disable-next-line jsx-a11y/no-autofocus */
            autoFocus={hasInitialFocus}
            defaultValue={defaultValue}
            disabled={isDisabled}
            disableFuture={disableFuture}
            disablePast={disablePast}
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
            minDate={minDate}
            name={id}
            onBlur={onBlur}
            // onChange={onInputChange}
            // onError={onError}
            onFocus={onFocus}
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
        hasErrorAsAlert
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
