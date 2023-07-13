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

import { InputAdornment, InputBase } from "@mui/material";
import {
  ChangeEventHandler,
  FocusEventHandler,
  forwardRef,
  memo,
  useCallback,
  useState,
} from "react";

import { ShowIcon, HideIcon } from "./iconDictionary";
import { Button } from "./Button";
import { Field } from "./Field";

export type PasswordFieldProps = {
  /**
   * This prop helps users to fill forms faster, especially on mobile devices.
   * The name can be confusing, as it's more like an autofill.
   * You can learn more about it [following the specification](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill).
   */
  autoCompleteType?: "current-password" | "new-password";
  /**
   * If `error` is not undefined, the `input` will indicate an error.
   */
  errorMessage?: string;
  /**
   * If `true`, the component will receive focus automatically.
   */
  hasInitialFocus?: boolean;
  /**
   * The helper text content.
   */
  hint?: string;
  /**
   * The id of the `input` element.
   */
  id?: string;
  /**
   * If `true`, the component is disabled.
   */
  isDisabled?: boolean;
  /**
   * If `true`, the `input` element is not required.
   */
  isOptional?: boolean;
  /**
   * It prevents the user from changing the value of the field
   */
  isReadOnly?: boolean;
  /**
   * The label for the `input` element.
   */
  label: string;
  /**
   * Callback fired when the `input` element loses focus.
   */
  onBlur?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  /**
   * Callback fired when the value is changed.
   */
  onChange?: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  /**
   * Callback fired when the `input` element get focus.
   */
  onFocus?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  /**
   * The short hint displayed in the `input` before the user enters a value.
   */
  placeholder?: string;
  /**
   * The value of the `input` element, required for a controlled component.
   */
  value?: string;
};

const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
  (
    {
      autoCompleteType,
      errorMessage,
      hasInitialFocus,
      hint,
      id: idOverride,
      isDisabled = false,
      isOptional = false,
      isReadOnly,
      label,
      onChange,
      onFocus,
      onBlur,
      placeholder,
      value,
    },
    ref
  ) => {
    const [inputType, setInputType] = useState("password");

    const togglePasswordVisibility = useCallback(() => {
      setInputType((inputType) =>
        inputType === "password" ? "text" : "password"
      );
    }, []);

    const renderFieldComponent = useCallback(
      ({ ariaDescribedBy, id }) => (
        <InputBase
          aria-describedby={ariaDescribedBy}
          autoComplete={autoCompleteType}
          /* eslint-disable-next-line jsx-a11y/no-autofocus */
          autoFocus={hasInitialFocus}
          endAdornment={
            <InputAdornment position="end">
              <Button
                ariaLabel="toggle password visibility"
                endIcon={inputType === "password" ? <ShowIcon /> : <HideIcon />}
                onClick={togglePasswordVisibility}
                size="small"
                variant="floating"
              />
            </InputAdornment>
          }
          id={id}
          name={id}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholder}
          readOnly={isReadOnly}
          ref={ref}
          required={!isOptional}
          type={inputType}
          value={value}
        />
      ),
      [
        autoCompleteType,
        hasInitialFocus,
        togglePasswordVisibility,
        inputType,
        onChange,
        onFocus,
        onBlur,
        placeholder,
        isOptional,
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

const MemoizedPasswordField = memo(PasswordField);
MemoizedPasswordField.displayName = "PasswordField";

export { MemoizedPasswordField as PasswordField };
