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

import { InputAdornment, InputBase, IconButton } from "@mui/material";
import {
  ChangeEventHandler,
  FocusEventHandler,
  forwardRef,
  memo,
  useCallback,
  useState,
} from "react";

import { ShowIcon, HideIcon } from "./icons.generated";
import { Field } from "./Field";
import type { SeleniumProps } from "./SeleniumProps";
import { useTranslation } from "react-i18next";

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
   * If `true`, the show/hide icon is not shown to the user
   */
  hasShowPassword?: boolean;
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
   * The name of the `input` element. Defaults to the `id` if not set.
   */
  name?: string;
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
} & SeleniumProps;

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
      hasShowPassword = true,
      isReadOnly,
      label,
      name: nameOverride,
      onChange,
      onFocus,
      onBlur,
      placeholder,
      testId,
      value,
    },
    ref
  ) => {
    const { t } = useTranslation();
    const [inputType, setInputType] = useState("password");

    const togglePasswordVisibility = useCallback(() => {
      setInputType((inputType) =>
        inputType === "password" ? "text" : "password"
      );
    }, []);

    const renderFieldComponent = useCallback(
      ({ ariaDescribedBy, errorMessageElementId, id, labelElementId }) => (
        <InputBase
          aria-describedby={ariaDescribedBy}
          autoComplete={autoCompleteType}
          /* eslint-disable-next-line jsx-a11y/no-autofocus */
          autoFocus={hasInitialFocus}
          data-se={testId}
          endAdornment={
            hasShowPassword && (
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    inputType === "password"
                      ? t("passwordfield.icon.label.show")
                      : t("passwordfield.icon.label.hide")
                  }
                  onClick={togglePasswordVisibility}
                >
                  {inputType === "password" ? <ShowIcon /> : <HideIcon />}
                </IconButton>
              </InputAdornment>
            )
          }
          id={id}
          inputProps={{
            "aria-errormessage": errorMessageElementId,
            "aria-labelledby": labelElementId,
            // role: "textbox" added because password inputs do not have a role assigned
            role: "textbox",
          }}
          name={nameOverride ?? id}
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
        t,
        togglePasswordVisibility,
        inputType,
        nameOverride,
        onChange,
        onFocus,
        onBlur,
        placeholder,
        isOptional,
        isReadOnly,
        hasShowPassword,
        ref,
        testId,
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
