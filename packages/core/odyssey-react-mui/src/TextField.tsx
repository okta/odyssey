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
   * If `true`, the component will receive focus automatically.
   */
  hasInitialFocus?: boolean;
  /**
   * Hints at the type of data that might be entered by the user while editing the element or its contents
   * @see https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-inputmode-attribute
   */
  inputMode?: InputHTMLAttributes<HTMLInputElement>["inputMode"];
  /**
   * The ref forwarded to the TextField
   */
  inputRef?: React.RefObject<FocusHandle>;
  /**
   * If `true`, a [TextareaAutosize](/material-ui/react-textarea-autosize/) element is rendered.
   */
  isMultiline?: boolean;
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
   * Start `InputAdornment` for this component.
   */
  startAdornment?: string | ReactElement;
  /**
   * Type of the `input` element. It should be [a valid HTML5 input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types).
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
      name: nameOverride,
      onBlur,
      onChange: onChangeProp,
      onFocus,
      placeholder,
      startAdornment,
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
            "data-se": testId,
            inputMode,
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
        label={label}
        renderFieldComponent={renderFieldComponent}
      />
    );
  },
);

const MemoizedTextField = memo(TextField);
MemoizedTextField.displayName = "TextField";

export { MemoizedTextField as TextField };
