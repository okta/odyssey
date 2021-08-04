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

import React, { useCallback } from 'react';
import type {
  FunctionComponent,
  FocusEventHandler,
  ChangeEvent,
  RefCallback,
} from 'react';
import styles from './TextInput.module.scss';
import { useOid } from '../../utils';

export type Props = {
  /**
   * The underlying input element id attribute. Automatically generated if not provided
   */
  id?: string,

  /**
   * The underlying input element type
   * @default text
   */
  type?: 'text' | 'email' | 'url' | 'tel' | 'search' | 'password',

  /**
   * The form field label
   */
  label: string,

  /**
   * Callback to provide a reference to the underlying input element
   * @param {Object} instance the input element or null
   */
  inputRef?: RefCallback<HTMLInputElement>,


  /**
   * The underlying input element name attribute
   */
  name?: string,

  /**
   * The underlying input element required attribute
   * @default true
   */
  required?: boolean,

  /**
   * The underlying input element disabled attribute
   * @default false
   */
  disabled?: boolean,

  /**
   * The underlying input element readonly attribute
   * @default false
   */
  readonly?: boolean,

  /**
   * Text to display when the form is optional, i.e. required prop is false
   */
  optionalLabel?: string,

  /**
   * The underlying input element placeholder attribute
   */
  placeholder?: string,

  /**
   * The input element value for controlled components
   */
  value?: string,

  /**
   * The initial input element value for uncontrolled components
   */
  defaultValue?: string,

  /**
   * Callback executed when the input fires a blur event
   * @param {Object} event the event object
   */
  onBlur?: FocusEventHandler<HTMLInputElement>,

  /**
   * Callback executed when the input fires a change event
   * @param {Object} event the event object
   * @param {string} value the string value of the input
   */
  onChange?: (event: ChangeEvent<HTMLInputElement>, value: string) => void,

  /**
  * Callback executed when the input fires a focus event
  * @param {Object} event the event object
  */
  onFocus?: FocusEventHandler<HTMLInputElement>,
};


/**
 * Text inputs allow users to edit and input data.
 */
const TextInput: FunctionComponent<Props> = (props) => {
  const {
    defaultValue,
    disabled = false,
    id,
    inputRef,
    label,
    name,
    onBlur,
    onChange,
    onFocus,
    optionalLabel,
    placeholder,
    readonly = false,
    required = true,
    type = 'text',
    value,
  } = props;

  const oid = useOid(id);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onChange?.(event, event.target.value);
    },
    [onChange]
  );

  const labelChildren = <>
    {label}
    { !required && optionalLabel &&
      <span
        className={styles.optionalLabel}
        children={optionalLabel}
      />
    }
  </>;

  const labelClass = (() => {
    if (type === 'search') return styles.labelSearch;
    if (disabled || readonly) return styles.labelDisabled;
    return styles.label;
  })();

  return (
    <fieldset className={styles.fieldset}>
      <div className={styles.fieldsetFlex}>
        <label
          children={labelChildren}
          className={labelClass}
          htmlFor={oid}
        />
        <input
          className={styles.textInput}
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
      </div >
    </fieldset >
  );
};

export default TextInput;
