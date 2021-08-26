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

import { forwardRef } from 'react';
import type {
  RefCallback,
} from "react";
import styles from "./TextInput.module.scss";
import { useOid } from "../../utils";
import SearchIcon from "../Icon/Search";

import { useField } from '../Field/context';

import styles from './TextInput.module.scss';
import { useOid } from '../../utils';
import { Search } from '../Icon';

export interface Props extends Omit<
  ComponentPropsWithRef<'input'>,
  'style' | 'className'
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
  defaultValue?: string,
}

/**
 * Text inputs allow users to edit and input data.
 */
const TextInput = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const {
    defaultValue,
    onBlur,
    onFocus,
    placeholder,
    type = 'text',
    ...rest
  } = props;

  const {
    id,
    onChange,
    disabled = false,
    required = true,
    readonly = false,
    value,
    name
  } = useField();

  const oid = useOid(id);

  const omitProps = useOmit(rest);

  const input = (
    <input
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

  return (
    <fieldset className={styles.fieldset}>
      <div className={styles.fieldsetFlex}>
        <label children={labelChildren} className={labelClass} htmlFor={oid} />
        {type === "search" ? (
          <span className={styles.outer}>
            <span className={styles.indicator} role="presentation">
              <SearchIcon />
            </span>
            {input}
          </span>
        ) : (
          <>{input}</>
        )}
      </div>
    </fieldset>
  );
});

export default TextInput;
