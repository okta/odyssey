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

import type { ChangeEvent, FunctionComponent, ReactElement } from 'react';
import { useOid } from '../../utils';
import { FieldProvider } from './context';

import styles from './Field.module.scss';

export type Props = {
  /**
   * Input to be rendered within the Field
   */
  children: ReactElement | ReactElement[],

  /**
   * The underlying input element id attribute. Automatically generated if not provided
   */
  id?: string,

  /**
   * the form field label
   */
  label: string,

  /**
   * The underlying input element name attribute for the group
   */
  name: string,

  /**
   * Text to display when the field is optional, i.e. required prop is false
   */
  optionalLabel?: string,

  /**
   * the form field error
   */
  error?: string,

  /**
   * the form field hint
   */
  hint?: string,

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
   * The value of the Field's input
   */
  value?: string,

  /**
   * Callback executed when the input group fires a change event
   */
  onChange?: (event?: ChangeEvent<HTMLInputElement>, value?: string) => void,
};

const Field: FunctionComponent<Props> = (props) => {
  const {
    children,
    disabled = false,
    name,
    value,
    error,
    hint,
    id,
    label,
    optionalLabel,
    required = true,
  } = props;

  const oid = useOid(id);

  const labelElement = (
    <label
      // This should swap to legend for Radio and Checkbox Groups
      // We'll also need the ability to hide or reposition this label for UI like Search
      className={styles.label}
      htmlFor={oid}
    >
      {label}
      { !required && optionalLabel &&
        <span
          className={styles.optionalLabel}
          children={optionalLabel}
        />
      }
    </label>
  );

  const inputElement = (
    <FieldProvider
      value={{
        disabled,
        required,
        name,
        value,
        id
      }}
      children={children}
    />
  );

  const hintElement = (
    <p
      className={styles.hint}
      id={`${oid}-hint`}
      children={hint}
    />
  );

  const errorElement = (
    <p className={styles.error} id={`${oid}-error`}>
      <span className="u-visually-hidden">Error:</span>
      { error }
    </p>
  );

  return (
    <div // This should swap to `fieldset` for grouped inputs like RadioGroup/CheckboxGroup
      className={styles.root}
    >
      { labelElement }
      { hint && hintElement }
      { inputElement }
      { error && errorElement }
    </div>
  );
};

export default Field;

