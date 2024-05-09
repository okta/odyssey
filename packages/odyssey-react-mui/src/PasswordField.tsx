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
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import { ShowIcon, HideIcon } from "./icons.generated";
import { Field } from "./Field";
import {
  FieldComponentProps,
  FieldComponentRenderProps,
} from "./FieldComponentProps";
import type { HtmlProps } from "./HtmlProps";
import { useTranslation } from "react-i18next";
import { FocusHandle, getControlState, useInputValues } from "./inputUtils";

export type PasswordFieldProps = {
  /**
   * This prop helps users to fill forms faster, especially on mobile devices.
   * The name can be confusing, as it's more like an autofill.
   * You can learn more about it [following the specification](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill).
   */
  autoCompleteType?: "current-password" | "new-password";
  /**
   * initial value for input. Use when component in uncontrolled.
   */
  defaultValue?: string;
  /**
   * If `true`, the component will receive focus automatically.
   */
  hasInitialFocus?: boolean;
  /**
   * If `true`, the show/hide icon is not shown to the user
   */
  hasShowPassword?: boolean;
  /**
   * The ref forwarded to the TextField
   */
  inputRef?: React.RefObject<FocusHandle>;
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
   * The value of the `input` element. Use when component is controlled.
   */
  value?: string;
} & FieldComponentProps &
  Pick<HtmlProps, "ariaDescribedBy" | "testId" | "translate">;

type FieldRenderProps = Partial<
  Pick<FieldComponentRenderProps, "ariaDescribedBy" | "errorMessageElementId">
> &
  Pick<FieldComponentRenderProps, "id" | "labelElementId">;

export const PASSWORD_VISIBILITY_TIMEOUT = 30_000;

const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
  (
    {
      ariaDescribedBy,
      autoCompleteType,
      defaultValue,
      errorMessage,
      errorMessageList,
      hasInitialFocus,
      hint,
      id: idOverride,
      inputRef,
      isDisabled = false,
      isFullWidth = false,
      isOptional = false,
      hasShowPassword = true,
      isReadOnly,
      label,
      name: nameOverride,
      onChange: onChangeProp,
      onFocus,
      onBlur,
      placeholder,
      testId,
      translate,
      value,
    },
    ref,
  ) => {
    const { t } = useTranslation();
    const [inputType, setInputType] = useState("password");

    useEffect(() => {
      let timeoutId: NodeJS.Timeout;

      // If current inputType is text (cleartext password),
      // for security set a 30-second timeout to toggle back to password
      if (inputType === "text") {
        timeoutId = setTimeout(() => {
          setInputType("password");
        }, PASSWORD_VISIBILITY_TIMEOUT);
      }

      return () => clearTimeout(timeoutId);
    }, [inputType]);

    const togglePasswordVisibility = useCallback(() => {
      setInputType((inputType) =>
        inputType === "password" ? "text" : "password",
      );
    }, []);

    const controlledStateRef = useRef(
      getControlState({
        controlledValue: value,
        uncontrolledValue: defaultValue,
      }),
    );
    const inputValues = useInputValues({
      defaultValue,
      value,
      controlState: controlledStateRef.current,
    });

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

    const onChange = useCallback<
      ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>
    >(
      (event) => {
        onChangeProp?.(event);
      },
      [onChangeProp],
    );

    const renderFieldComponent = useCallback(
      ({
        ariaDescribedBy,
        errorMessageElementId,
        id,
        labelElementId,
      }: FieldRenderProps) => (
        <InputBase
          {...inputValues}
          aria-describedby={ariaDescribedBy}
          autoComplete={inputType === "password" ? autoCompleteType : "off"}
          /* eslint-disable-next-line jsx-a11y/no-autofocus */
          autoFocus={hasInitialFocus}
          endAdornment={
            hasShowPassword && (
              <InputAdornment position="end">
                <IconButton
                  aria-controls={id}
                  aria-label={
                    inputType === "password"
                      ? t("passwordfield.icon.label.show")
                      : t("passwordfield.icon.label.hide")
                  }
                  aria-pressed={inputType === "text"}
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
            "data-se": testId,
            // role: "textbox" Added because password inputs don't have an implicit role assigned. This causes problems with element selection.
            role: "textbox",
          }}
          inputRef={localInputRef}
          name={nameOverride ?? id}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholder}
          readOnly={isReadOnly}
          ref={ref}
          required={!isOptional}
          translate={translate}
          type={inputType}
        />
      ),
      [
        autoCompleteType,
        hasInitialFocus,
        inputValues,
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
        translate,
      ],
    );

    return (
      <Field
        ariaDescribedBy={ariaDescribedBy}
        errorMessage={errorMessage}
        errorMessageList={errorMessageList}
        fieldType="single"
        hasVisibleLabel
        hint={hint}
        id={idOverride}
        isDisabled={isDisabled}
        isFullWidth={isFullWidth}
        isOptional={isOptional}
        label={label}
        renderFieldComponent={renderFieldComponent}
      />
    );
  },
);

const MemoizedPasswordField = memo(PasswordField);
MemoizedPasswordField.displayName = "PasswordField";

export { MemoizedPasswordField as PasswordField };
