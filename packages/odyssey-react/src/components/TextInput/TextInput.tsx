/*!
 * Copyright (c) 2021-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import React, { forwardRef, useCallback } from "react";
import type {
  FocusEventHandler,
  ComponentPropsWithRef,
  ChangeEvent,
} from "react";
import { withTheme } from "@okta/odyssey-react-theme";
import { useOid, useOmit, useCx } from "../../utils";
import { SearchIcon } from "../Icon";
import { Field } from "../Field";
import type { CommonFieldProps } from "../Field/types";
import { theme } from "./TextInput.theme";
import styles from "./TextInput.module.scss";

export interface TextInputProps
  extends CommonFieldProps,
    Omit<
      ComponentPropsWithRef<"input">,
      "style" | "className" | "color" | "onChange"
    > {
  /**
   * The underlying input element id attribute. Automatically generated if not provided
   */
  id?: string;

  /**
   * The underlying input element type
   * @default text
   */
  type?: "text" | "email" | "url" | "tel" | "search" | "password";

  /**
   * The underlying input element name attribute
   */
  name?: string;

  /**
   * The underlying input element disabled attribute
   * @default false
   */
  disabled?: boolean;

  /**
   * The underlying input element readonly attribute
   * @default false
   */
  readonly?: boolean;

  /**
   * The underlying input element placeholder attribute
   */
  placeholder?: string;

  /**
   * The input element value for controlled components
   */
  value?: string;

  /**
   * The initial input element value for uncontrolled components
   */
  defaultValue?: string;

  /**
   * Callback executed when the input fires a blur event
   * @param {Object} event the event object
   */
  onBlur?: FocusEventHandler<HTMLInputElement>;

  /**
   * Callback executed when the input fires a change event
   * @param {Object} event the event object
   * @param {string} value the string value of the input
   */
  onChange?: (event: ChangeEvent<HTMLInputElement>, value: string) => void;

  /**
   * Callback executed when the input fires a focus event
   * @param {Object} event the event object
   */
  onFocus?: FocusEventHandler<HTMLInputElement>;
}

/**
 * Text inputs allow users to edit and input data.
 */
export const TextInput = withTheme(
  theme,
  styles
)(
  forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
    const {
      defaultValue,
      disabled = false,
      id,
      name,
      onBlur,
      onChange,
      onFocus,
      placeholder,
      readonly = false,
      required,
      type = "text",
      value,
      error,
      hint,
      label,
      optionalLabel,
      ...rest
    } = props;

    const oid = useOid(id);
    const omitProps = useOmit(rest);

    const handleChange = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        onChange?.(event, event.target.value);
      },
      [onChange]
    );

    const ariaDescribedBy = useCx(
      hint && `${oid}-hint`,
      !!error && `${oid}-error`
    );

    const ariaProps =
      hint || error
        ? {
            "aria-describedby": ariaDescribedBy,
          }
        : {};

    const input = (
      <input
        {...omitProps}
        {...ariaProps}
        className={styles.root}
        disabled={disabled}
        id={oid}
        name={name}
        onChange={handleChange}
        onBlur={onBlur}
        onFocus={onFocus}
        placeholder={placeholder}
        readOnly={readonly}
        ref={ref}
        required={required}
        type={type}
        defaultValue={defaultValue}
        value={value}
      />
    );

    const search = (
      <span className={styles.outer}>
        {input}
        <span className={styles.indicator} role="presentation">
          <SearchIcon />
        </span>
      </span>
    );

    return (
      <Field
        error={error}
        hint={hint}
        inputId={oid}
        label={label}
        labelHidden={type === "search"}
        optionalLabel={optionalLabel}
        required={required}
      >
        {type === "search" ? search : input}
      </Field>
    );
  })
);

TextInput.displayName = "TextInput";
