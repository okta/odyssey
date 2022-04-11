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

import React, { forwardRef, ReactNode, useEffect, useState } from "react";
import type {
  FocusEvent,
  FocusEventHandler,
  ComponentPropsWithRef,
  ChangeEvent,
  RefObject,
} from "react";
import { withTheme } from "@okta/odyssey-react-theme";
import { useOid, useOmit, useCx, useSharedRef } from "../../utils";
import { Field } from "../Field";
import type { CommonFieldProps } from "../Field/types";
import { Affix } from "./Affix";
import { theme } from "./TextInput.theme";
import styles from "./TextInput.module.scss";

function checkInputValidity(inputRef: RefObject<HTMLInputElement>) {
  return inputRef.current ? inputRef.current.checkValidity() : true;
}
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
  type?: "text" | "email" | "url" | "tel";

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
   * An optional prefix button displayed before the input
   * Only one of PrefixButton, PrefixIcon, PrefixText can be set
   */
  PrefixButton?: ReactNode;

  /**
   * An optional prefix icon displayed before the input
   * Only one of PrefixButton, PrefixIcon, PrefixText can be set
   */
  PrefixIcon?: ReactNode;

  /**
   * An optional prefix text displayed before the input
   * Only one of PrefixButton, PrefixIcon, PrefixText can be set
   */
  PrefixText?: string;

  /**
   * An optional suffix button displayed before the input
   * Only one of SuffixButton, SuffixIcon, SuffixText can be set
   */
  SuffixButton?: ReactNode;

  /**
   * An optional suffix icon displayed before the input
   * Only one of SuffixButton, SuffixIcon, SuffixText can be set
   */
  SuffixIcon?: ReactNode;

  /**
   * An optional suffix text displayed before the input
   * Only one of SuffixButton, SuffixIcon, SuffixText can be set
   */
  SuffixText?: string;

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
      SuffixButton,
      SuffixIcon,
      SuffixText,
      PrefixButton,
      PrefixIcon,
      PrefixText,
      value,
      error,
      hint,
      label,
      labelHidden,
      optionalLabel,
      ...rest
    } = props;

    const oid = useOid(id);
    const omitProps = useOmit(rest);
    const internalRef = useSharedRef(ref);
    const [isValid, setIsValid] = useState(true);
    const [hasFocus, setHasFocus] = useState(false);

    useEffect(() => {
      if (internalRef.current) {
        setIsValid(checkInputValidity(internalRef));
      }
    }, [internalRef, required]);

    const internalOnFocus = (event: FocusEvent<HTMLInputElement>) => {
      setHasFocus(true);
      onFocus?.(event);
    };

    const internalOnBlur = (event: FocusEvent<HTMLInputElement>) => {
      setHasFocus(false);
      onBlur?.(event);
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (
        typeof value === "undefined" ||
        value === internalRef.current?.value
      ) {
        // not a controlled value, check validity on change
        setIsValid(checkInputValidity(internalRef));
      }
      onChange?.(event, event.target.value);
    };

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

    const rootStyles = useCx(
      styles.root,
      !isValid && styles.invalid,
      hasFocus && styles.focus
    );

    const prefixStyles = useCx(
      styles.prefix,
      PrefixButton ? styles.affixFull : undefined,
      PrefixIcon ? styles.affixIcon : undefined
    );

    const suffixStyles = useCx(
      styles.suffix,
      SuffixButton ? styles.affixFull : undefined,
      SuffixIcon ? styles.affixIcon : undefined
    );

    return (
      <Field
        error={error}
        hint={hint}
        inputId={oid}
        label={label}
        labelHidden={labelHidden}
        optionalLabel={optionalLabel}
        required={required}
      >
        <div className={rootStyles}>
          <Affix
            sharedRef={internalRef}
            AffixButton={PrefixButton}
            AffixIcon={PrefixIcon}
            AffixText={PrefixText}
            className={prefixStyles}
          />
          <input
            {...omitProps}
            {...ariaProps}
            className={styles.input}
            disabled={disabled}
            id={oid}
            name={name}
            onChange={handleChange}
            onBlur={internalOnBlur}
            onFocus={internalOnFocus}
            placeholder={placeholder}
            readOnly={readonly}
            ref={internalRef}
            required={required}
            type={type}
            defaultValue={defaultValue}
            value={value}
          />
          <Affix
            sharedRef={internalRef}
            AffixButton={SuffixButton}
            AffixIcon={SuffixIcon}
            AffixText={SuffixText}
            className={suffixStyles}
          />
        </div>
      </Field>
    );
  })
);

TextInput.displayName = "TextInput";
