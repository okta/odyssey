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

import React, { useCallback } from "react";
import type {
  FunctionComponent,
  FocusEventHandler,
  ChangeEvent,
  RefCallback,
} from "react";
import { withTheme } from "@okta/odyssey-react-theme";
import { useOid, useCx } from "../../utils";
import { SearchIcon } from "../Icon/Search";
import styles from "./TextInput.module.scss";
import { Field } from "../Field";
import type { SharedFieldTypes } from "../Field/types";

export interface TextInputProps extends SharedFieldTypes {
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
   * Callback to provide a reference to the underlying input element
   * @param {Object} instance the input element or null
   */
  inputRef?: RefCallback<HTMLInputElement>;

  /**
   * The underlying input element name attribute
   */
  name?: string;

  /**
   * The underlying input element required attribute
   * @default true
   */
  required?: boolean;

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
export const TextInput: FunctionComponent<TextInputProps> = withTheme(
  () => ({}),
  styles
)((props) => {
  const {
    defaultValue,
    disabled = false,
    id,
    inputRef,
    name,
    onBlur,
    onChange,
    onFocus,
    placeholder,
    readonly = false,
    required = true,
    type = "text",
    value,
    error,
    hint,
    label,
    optionalLabel,
  } = props;

  const oid = useOid(id);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onChange?.(event, event.target.value);
    },
    [onChange]
  );

  const ariaDescribedBy = useCx(
    hint && `${oid}-hint`,
    typeof error !== "undefined" && `${oid}-error`
  );

  const input = (
    <input
      aria-describedby={ariaDescribedBy}
      className={styles.root}
      disabled={disabled}
      id={oid}
      name={name}
      onChange={handleChange}
      onBlur={onBlur}
      onFocus={onFocus}
      placeholder={placeholder}
      readOnly={readonly}
      ref={inputRef}
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
});

TextInput.displayName = "TextInput";
