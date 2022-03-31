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
import { useOid, useOmit, useCx, useSharedRef } from "../../utils";
import { SearchIcon } from "../Icon";
import { Field } from "../Field";
import type { CommonFieldProps } from "../Field/types";
import { theme } from "./TextInput.theme";
import styles from "./TextInput.module.scss";

interface CommonProps
  extends CommonFieldProps,
    Omit<
      ComponentPropsWithRef<"input">,
      "style" | "className" | "color" | "onChange" | "prefix"
    > {
  /**
   * The underlying input element id attribute. Automatically generated if not provided
   */
  id?: string;

  /**
   * The underlying input element type
   * @default text
   */
  type?: "text" | "email" | "url" | "tel" | "password";

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
   * An optional string prefix displayed before the input
   */
  prefix?: string;

  /**
   * An optional string suffix displayed after the input
   */
  suffix?: string;

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

interface SearchProps extends Omit<CommonProps, "type" | "prefix" | "suffix"> {
  type: "search";
  prefix?: never;
  suffix?: never;
}

export type TextInputProps = CommonProps | SearchProps;

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
      prefix,
      suffix,
      value,
      error,
      hint,
      label,
      optionalLabel,
      ...rest
    } = props;

    const isSearchTextInput = type === "search";

    const oid = useOid(id);
    const omitProps = useOmit(rest);
    const internalRef = useSharedRef(ref);

    const setFocus = () => {
      requestAnimationFrame(() => {
        internalRef.current?.focus();
      });
    };

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

    const decoratedSuffix = useCx(styles.decoration, suffix && styles.suffix);

    const decoratedPrefix = useCx(styles.decoration, prefix && styles.prefix);

    const ariaProps =
      hint || error
        ? {
            "aria-describedby": ariaDescribedBy,
          }
        : {};

    return (
      <Field
        error={error}
        hint={hint}
        inputId={oid}
        label={label}
        labelHidden={isSearchTextInput}
        optionalLabel={optionalLabel}
        required={required}
      >
        <div className={styles.root}>
          {(prefix || isSearchTextInput) && (
            <span
              className={decoratedPrefix}
              aria-hidden="true"
              onClick={setFocus}
            >
              {isSearchTextInput ? <SearchIcon /> : prefix}
            </span>
          )}
          <input
            {...omitProps}
            {...ariaProps}
            className={styles.input}
            disabled={disabled}
            id={oid}
            name={name}
            onChange={handleChange}
            onBlur={onBlur}
            onFocus={onFocus}
            placeholder={placeholder}
            readOnly={readonly}
            ref={internalRef}
            required={required}
            type={type}
            defaultValue={defaultValue}
            value={value}
          />
          {suffix && !isSearchTextInput && (
            <span
              className={decoratedSuffix}
              aria-hidden="true"
              onClick={setFocus}
            >
              {suffix}
            </span>
          )}
        </div>
      </Field>
    );
  })
);

TextInput.displayName = "TextInput";
