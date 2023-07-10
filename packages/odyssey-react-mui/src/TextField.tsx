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
} from "react";

import { Field } from "./Field";

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
   * You can learn more about it [following the specification](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill).
   */
  autoCompleteType?: InputHTMLAttributes<HTMLInputElement>["autoComplete"];
  /**
   * End `InputAdornment` for this component.
   */
  endAdornment?: string | ReactElement<typeof Icon>;
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
   * If `true`, a [TextareaAutosize](/material-ui/react-textarea-autosize/) element is rendered.
   */
  isMultiline?: boolean;
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
};

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      autoCompleteType,
      hasInitialFocus,
      endAdornment,
      errorMessage,
      hint,
      id: idOverride,
      isDisabled = false,
      isMultiline = false,
      isOptional = false,
      isReadOnly,
      label,
      onBlur,
      onChange,
      onFocus,
      placeholder,
      startAdornment,
      type = "text",
      value,
    },
    ref
  ) => {
    const renderFieldComponent = useCallback(
      ({ ariaDescribedBy, id }) => (
        <InputBase
          aria-describedby={ariaDescribedBy}
          autoComplete={autoCompleteType}
          /* eslint-disable-next-line jsx-a11y/no-autofocus */
          autoFocus={hasInitialFocus}
          endAdornment={
            endAdornment && (
              <InputAdornment position="end">{endAdornment}</InputAdornment>
            )
          }
          id={id}
          multiline={isMultiline}
          name={id}
          onBlur={onBlur}
          onChange={onChange}
          onFocus={onFocus}
          placeholder={placeholder}
          readOnly={isReadOnly}
          ref={ref}
          startAdornment={
            startAdornment && (
              <InputAdornment position="start">{startAdornment}</InputAdornment>
            )
          }
          type={type}
          value={value}
        />
      ),
      [
        autoCompleteType,
        hasInitialFocus,
        endAdornment,
        isMultiline,
        onChange,
        onFocus,
        onBlur,
        placeholder,
        isReadOnly,
        ref,
        startAdornment,
        type,
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

const MemoizedTextField = memo(TextField);
MemoizedTextField.displayName = "TextField";

export { MemoizedTextField as TextField };
