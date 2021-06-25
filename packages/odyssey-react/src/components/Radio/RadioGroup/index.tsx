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

import React, { forwardRef } from 'react';
import type {
  ChangeEvent,
  ReactElement,
  ComponentPropsWithRef
} from 'react';
import { RadioGroupProvider } from '../context';
import { useOmit } from '../../../utils';

export interface Props extends Omit<
  ComponentPropsWithRef<'fieldset'>,
  'onChange' | 'style' | 'className'
> {
  /**
   * One or more Radio.Button to be used together as a group
   */
  children: ReactElement | ReactElement[];

  /**
   * The form field hint
   */
  hint?: string,

  /**
   * The form field legend
   */
  legend: string,

  /**
   * The underlying input element name attribute for the group
   */
  name: string,

  /**
   * The underlying input element required attribute for the group
   * @default true
   */
  required?: boolean,

  /**
   * The underlying input element disabled attribute for the group
   * @default false
   */
  disabled?: boolean,

  /**
   * The checked Radio.Button value attribute for a controlled group.
   */
  value?: string,

  /**
   * Callback executed when the input group fires a change event
   * @param {Object} event the event object
   * @param {string} value the string value of the input
   */
  onChange?: (event?: ChangeEvent<HTMLInputElement>, value?: string) => void,
}

/**
 * Radios appear as a ring shaped UI accompanied by a caption that allows
 * the user to choose only one option at a time.
 */
const RadioGroup = forwardRef<HTMLFieldSetElement, Props>((props, ref) => {
  const {
    hint,
    children,
    disabled = false,
    legend,
    name,
    onChange,
    required = true,
    value,
    ...rest
  } = props;

  const legendElement = (
    <legend
      className="ods-input-legend"
      children={legend}
    />
  );

  const inputElements = (
    <div className="ods-fieldset-flex">
      <RadioGroupProvider
        value={{
          disabled,
          required,
          name,
          onChange,
          value
        }}
        children={children}
      />
    </div>
  );

  const hintElement = (
    <aside
      className="ods-field--hint"
      children={hint}
    />
  );

  const omitProps = useOmit(rest);

  return (
    <fieldset className="ods-fieldset" ref={ref} {...omitProps}>
      { legendElement}
      { inputElements}
      { hint && hintElement}
    </fieldset>
  );
});

export default RadioGroup;
