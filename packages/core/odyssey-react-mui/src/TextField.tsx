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
  InputHTMLAttributes,
  memo,
  ReactElement,
  useCallback,
  useImperativeHandle,
  useRef,
} from "react";

import { Field } from "./Field.js";
import {
  FieldComponentProps,
  FieldComponentRenderProps,
} from "./FieldComponentProps.js";
import { HtmlProps } from "./HtmlProps.js";
import { FocusHandle, getControlState, useInputValues } from "./inputUtils.js";

export const textFieldTypeValues = [
  "email",
  "number",
  "tel",
  "text",
  "url",
] as const;

export type TextFieldProps = {
  /**
   * This prop helps users to fill forms faster, especially on mobile devices.
   * The name can be confusing, as it's more like an autofill.
   * @see https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill
   */
  autoCompleteType?: InputHTMLAttributes<HTMLInputElement>["autoComplete"];
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue?: string;
  /**
   * End `InputAdornment` for this component.
   */
  endAdornment?: string | ReactElement;
  /**
   * If `true`, the input receives focus automatically on mount.
   */
  hasInitialFocus?: boolean;
  /**
   * Hints at the type of data that might be entered by the user while editing the
   * element or its contents.
   * @see https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-inputmode-attribute
   */
  inputMode?: InputHTMLAttributes<HTMLInputElement>["inputMode"];
  /**
   * Ref attached to the underlying <input> element.
   */
  inputRef?: React.RefObject<FocusHandle>;
  /**
   * If `true`, the input renders as a multiline textarea.
   */
  isMultiline?: boolean;
  /**
   * The label for the `input` element.
   */
  label: string;
  /**
   * The maximum value for a `number` input.
   */
  max?: number;
  /**
   * The minimum value for a `number` input.
   */
  min?: number;
  /**
   * Called when the input loses focus.
   */
  onBlur?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  /**
   * Called when the input value changes.
   */
  onChange?: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  /**
   * Called when the input gains focus.
   */
  onFocus?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  /**
   * The short hint displayed in the `input` before the user enters a value.
   */
  placeholder?: string;
  /**
   * Start `InputAdornment` for this component.
   */
  startAdornment?: string | ReactElement;
  /**
   * The step interval for a `number` input.
   */
  step?: number;
  /**
   * Type of the `input` element. It should be
   * [a valid HTML5 input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types).
   * @default "text"
   */
  type?: (typeof textFieldTypeValues)[number];
  /**
   * The value of the `input` element, required for a controlled component.
   */
  value?: string;
} & FieldComponentProps &
  Pick<HtmlProps, "ariaDescribedBy" | "testId" | "translate">;

type FieldRenderProps = Partial<
  Pick<FieldComponentRenderProps, "ariaDescribedBy" | "errorMessageElementId">
> &
  Pick<FieldComponentRenderProps, "id" | "labelElementId">;

/**
 * A single-line or multiline text input field with label, hint, and error support.
 * Use for collecting free-form text input such as names, emails, URLs, or numbers.
 */
const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      ariaDescribedBy,
      autoCompleteType,
      defaultValue,
      hasInitialFocus,
      endAdornment,
      errorMessage,
      errorMessageList,
      hint,
      HintLinkComponent,
      id: idOverride,
      inputRef,
      inputMode,
      isDisabled = false,
      isFullWidth = false,
      isMultiline = false,
      isOptional = false,
      isReadOnly,
      label,
      max,
      min,
      name: nameOverride,
      onBlur,
      onChange: onChangeProp,
      onFocus,
      placeholder,
      startAdornment,
      step,
      testId,
      translate,
      type = "text",
      value: value,
    },
    ref,
  ) => {
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
      NonNullable<ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>>
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
          autoComplete={autoCompleteType}
          /* eslint-disable-next-line jsx-a11y/no-autofocus */
          autoFocus={hasInitialFocus}
          endAdornment={
            endAdornment && (
              <InputAdornment position="end" translate={translate}>
                {endAdornment}
              </InputAdornment>
            )
          }
          id={id}
          inputProps={{
            "aria-errormessage": errorMessageElementId,
            "aria-labelledby": labelElementId,
            "aria-readonly": isReadOnly,
            "data-se": testId,
            inputMode,
            max,
            min,
            step,
          }}
          inputRef={localInputRef}
          multiline={isMultiline}
          name={nameOverride ?? id}
          onBlur={onBlur}
          onChange={onChange}
          onFocus={onFocus}
          placeholder={placeholder}
          readOnly={isReadOnly}
          ref={ref}
          required={!isOptional}
          startAdornment={
            startAdornment && (
              <InputAdornment position="start" translate={translate}>
                {startAdornment}
              </InputAdornment>
            )
          }
          translate={translate}
          type={type}
        />
      ),
      [
        autoCompleteType,
        inputValues,
        hasInitialFocus,
        endAdornment,
        inputMode,
        max,
        min,
        isMultiline,
        nameOverride,
        onBlur,
        onChange,
        onFocus,
        placeholder,
        isOptional,
        isReadOnly,
        ref,
        startAdornment,
        step,
        testId,
        translate,
        type,
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
        HintLinkComponent={HintLinkComponent}
        id={idOverride}
        isDisabled={isDisabled}
        isFullWidth={isFullWidth}
        isOptional={isOptional}
        isReadOnly={isReadOnly}
        label={label}
        renderFieldComponent={renderFieldComponent}
      />
    );
  },
);

const MemoizedTextField = memo(TextField);
MemoizedTextField.displayName = "TextField";

export { MemoizedTextField as TextField };
