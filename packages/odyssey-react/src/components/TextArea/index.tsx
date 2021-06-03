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
   * The underlying textarea element id attribute. Automatically generated if not provided
   */
  id?: string,

  /**
   * The form field label
   */
  label: string,

  /**
   * Callback to provide a reference to the underlying textarea element
   * @param {Object} instance the textarea element or null
   */
  textareaRef?: RefCallback<HTMLTextAreaElement>,


  /**
   * The underlying textarea element name attribute
   */
  name?: string,

  /**
   * The underlying textarea element required attribute
   * @default true
   */
  required?: boolean,

  /**
   * The underlying textarea element disabled attribute
   * @default false
   */
  disabled?: boolean,

  /**
   * The underlying textarea element readonly attribute
   * @default false
   */
  readonly?: boolean,

  /**
   * Text to display as a hint
   */
  hint?: string,

  /**
   * The underlying textarea element placeholder attribute
   */
  placeholder?: string,

  /**
   * The textarea element value for controlled components
   */
  value?: string,

  /**
   * The initial textarea element value for uncontrolled components
   */
  defaultValue?: string,

  /**
   * Callback executed when the textarea fires a blur event
   * @param {Object} event the event object
   */
  onBlur?: FocusEventHandler<HTMLTextAreaElement>,

  /**
   * Callback executed when the textarea fires a change event
   * @param {Object} event the event object
   * @param {string} value the string value of the textarea
   */
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>, value: string) => void,

  /**
  * Callback executed when the textarea fires a focus event
  * @param {Object} event the event object
  */
  onFocus?: FocusEventHandler<HTMLTextAreaElement>,
};


/**
 * TextArea allows users to edit and input data.
 */
const TextArea: FunctionComponent<Props> = (props) => {
  const {
    defaultValue,
    disabled = false,
    hint,
    id,
    label,
    name,
    onBlur,
    onChange,
    onFocus,
    placeholder,
    readonly = false,
    required = true,
    textareaRef,
    value,
  } = props;

  const oid = useOid(id);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      onChange?.(event, event.target.value);
    },
    [onChange]
  );

  return (
    <fieldset className="ods-fieldset">
      <div className="ods-fieldset-flex">
        <textarea
          className="ods-text-input ods-text-area"
          disabled={disabled}
          id={oid}
          name={name}
          onChange={handleChange}
          onBlur={onBlur}
          onFocus={onFocus}
          placeholder={placeholder}
          readOnly={readonly}
          ref={textareaRef}
          required={required}
          defaultValue={defaultValue}
          value={value}
        />
        <aside className="ods-field--hint"
          children={hint}
        />
        <label
          children={label}
          className="ods-label"
          htmlFor={oid}
        />
      </div>
    </fieldset>
  );
};

export default TextArea;
