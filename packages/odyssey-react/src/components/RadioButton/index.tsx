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
import { useOid } from '../../utils';

export type Props = {
  /**
   * The underlying input element id attribute. Automatically generated if not provided
   */
  id?: string,

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
   * The underlying input element value attribute
   */
  value: string,

  /**
   * The input element checked state for controlled components
   * @default false
   */
  checked?: boolean,

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
 * RadioButton appears as a ring-shaped UI accompanied by a label.
 */
const RadioButton: FunctionComponent<Props> = (props) => {
  const {
    disabled = false,
    id,
    inputRef,
    label,
    checked = false,
    name,
    onBlur,
    onChange,
    onFocus,
    required = true,
    value,
  } = props;

  const oid = useOid(id);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onChange?.(event, event.target.value);
    },
    [onChange]
  );

  return (
    <>
      <input
        className="ods-radio"
        checked={ checked }
        disabled={ disabled }
        id={ oid }
        name={ name }
        onChange={ handleChange }
        onBlur={ onBlur }
        onFocus={ onFocus }
        ref={ inputRef }
        required={ required }
        type="radio"
        value={ value }
      />
      <label
        children={ label }
        className="ods-radio--label"
        htmlFor={ oid }
      />
    </>
  );
};

export default RadioButton;
