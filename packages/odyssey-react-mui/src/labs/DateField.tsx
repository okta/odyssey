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
  FocusEventHandler,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { InputAdornment } from "@mui/material";
import {
  DateField as MuiDateField,
  DateFieldProps as MuiDateFieldProps,
  DateValidationError,
} from "@mui/x-date-pickers";
import { DateTime } from "luxon";
import { useTranslation } from "react-i18next";

import { Field, RenderFieldComponentProps } from "../Field";
import { TextFieldProps } from "../TextField";

export type DateFieldProps = {
  onChange?: (value: string) => void;
} & Pick<
  MuiDateFieldProps<DateTime>,
  "defaultValue" | "inputRef" | "minDate" | "maxDate" | "timezone" | "value"
> &
  Pick<
    TextFieldProps,
    | "endAdornment"
    | "errorMessage"
    | "hasInitialFocus"
    | "hint"
    | "HintLinkComponent"
    | "id"
    | "isDisabled"
    | "isOptional"
    | "isReadOnly"
    | "label"
    | "onBlur"
    | "onFocus"
  >;

const useOdysseyDateError = () => {
  const { t } = useTranslation();

  return new Map<DateValidationError, string>([
    ["invalidDate", t("picker.error.invalid")],
    ["maxDate", t("picker.error.maxdate")],
    ["minDate", t("picker.error.mindate")],
  ]);
};

const formatDateTimeToUtcIsoDateString = (value: DateTime) =>
  value.toUTC().toISO();

const DateField = ({
  defaultValue,
  endAdornment,
  errorMessage,
  hasInitialFocus,
  hint,
  HintLinkComponent,
  id: idOverride,
  inputRef,
  isDisabled = false,
  isOptional = false,
  isReadOnly,
  label,
  minDate,
  maxDate,
  onBlur,
  onChange,
  onFocus,
  timezone,
  value,
}: DateFieldProps) => {
  const errorMap = useOdysseyDateError();
  const [displayedErrorMessage, setDisplayedErrorMessage] =
    useState(errorMessage);

  const internalValidationError = useRef<string | undefined>();
  const localInputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(
    inputRef,
    () => {
      return {
        focus: () => {
          localInputRef.current?.focus();
        },
      };
    },
    [],
  );

  const checkMinMaxValidity = useCallback(
    (value: DateTime) => {
      const hasMinError = minDate && value.toUTC() < minDate.toUTC();
      const hasMaxError = maxDate && value.toUTC() > maxDate.toUTC();

      if (hasMinError || hasMaxError) {
        if (hasMinError) {
          setDisplayedErrorMessage(errorMap.get("minDate"));
        }

        if (hasMaxError) {
          setDisplayedErrorMessage(errorMap.get("maxDate"));
        }

        return false;
      }

      return true;
    },
    [errorMap, minDate, maxDate],
  );

  useEffect(() => {
    if (value) {
      checkMinMaxValidity(value);
    }

    if (defaultValue) {
      checkMinMaxValidity(defaultValue);
    }
  }, [checkMinMaxValidity, defaultValue, minDate, maxDate, value]);

  const clearErrorMessages = useCallback(() => {
    setDisplayedErrorMessage(undefined);
    internalValidationError.current = undefined;
  }, [internalValidationError, setDisplayedErrorMessage]);

  const validateAndCallOnChange = useCallback<
    NonNullable<MuiDateFieldProps<DateTime>["onChange"]>
  >(
    (value, validationContext) => {
      clearErrorMessages();
      const { validationError } = validationContext;
      const hasEnteredFullYear = value?.year.toString().length === 4;

      if (validationError) {
        const odysseyValidationError = errorMap.get(validationError);

        if (odysseyValidationError) {
          internalValidationError.current = odysseyValidationError;

          if (value?.isValid && hasEnteredFullYear) {
            setDisplayedErrorMessage(odysseyValidationError);
          }
        }
      }

      if (value?.isValid && !validationError) {
        const dateStringFromDateTime = formatDateTimeToUtcIsoDateString(value);

        if (dateStringFromDateTime && checkMinMaxValidity(value)) {
          onChange?.(dateStringFromDateTime);
        }
      }
    },
    [checkMinMaxValidity, clearErrorMessages, errorMap, onChange],
  );

  const checkFieldValidityAndSetError = useCallback<
    FocusEventHandler<HTMLInputElement>
  >(
    (event) => {
      if (internalValidationError?.current && !displayedErrorMessage) {
        setDisplayedErrorMessage(internalValidationError.current);
      }
      onBlur?.(event);
    },
    [displayedErrorMessage, internalValidationError, onBlur],
  );

  const hasVisibleAdornment = !isReadOnly && !isDisabled;

  const renderFieldComponent = useCallback(
    ({
      ariaDescribedBy,
      errorMessageElementId,
      id,
      labelElementId,
    }: RenderFieldComponentProps) => (
      <MuiDateField
        /* eslint-disable-next-line jsx-a11y/no-autofocus */
        autoFocus={hasInitialFocus}
        defaultValue={defaultValue}
        disabled={isDisabled}
        id={id}
        inputProps={{
          "aria-describedby": ariaDescribedBy,
          "aria-errormessage": errorMessageElementId,
          "aria-labelledby": labelElementId,
        }}
        InputProps={{
          error: Boolean(displayedErrorMessage || errorMessage),
          endAdornment: (
            <>
              {hasVisibleAdornment && (
                <InputAdornment position="end">{endAdornment}</InputAdornment>
              )}
            </>
          ),
        }}
        inputRef={localInputRef}
        minDate={minDate}
        maxDate={maxDate}
        name={id}
        onBlur={checkFieldValidityAndSetError}
        onChange={validateAndCallOnChange}
        onFocus={onFocus}
        readOnly={isReadOnly}
        timezone={timezone}
        value={value}
        variant="standard"
      />
    ),
    [
      checkFieldValidityAndSetError,
      defaultValue,
      displayedErrorMessage,
      endAdornment,
      errorMessage,
      hasInitialFocus,
      hasVisibleAdornment,
      isDisabled,
      localInputRef,
      minDate,
      maxDate,
      onFocus,
      isReadOnly,
      timezone,
      validateAndCallOnChange,
      value,
    ],
  );

  return (
    <Field
      errorMessage={displayedErrorMessage || errorMessage}
      fieldType="single"
      hasVisibleLabel
      hint={hint}
      HintLinkComponent={HintLinkComponent}
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
