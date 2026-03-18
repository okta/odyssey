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

import { IconButton, InputAdornment, InputBase } from "@mui/material";
import {
  ChangeEventHandler,
  FocusEventHandler,
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import type { HtmlProps } from "./HtmlProps.js";

import { Field } from "./Field.js";
import {
  FieldComponentProps,
  FieldComponentRenderProps,
} from "./FieldComponentProps.js";
import { useTranslation } from "./i18n.generated/i18n.js";
import { HideIcon, ShowIcon } from "./icons.generated/index.js";
import { FocusHandle, getControlState, useInputValues } from "./inputUtils.js";

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
    useImperativeHandle(inputRef, () => {
      return {
        focus: () => {
          localInputRef.current?.focus();
        },
      };
    }, []);

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
                  aria-label={t("passwordfield.icon.label.show")}
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
          onBlur={onBlur}
          onChange={onChange}
          onFocus={onFocus}
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
