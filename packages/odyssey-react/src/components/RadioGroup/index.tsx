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

import React, { cloneElement, Children, useCallback } from 'react';
import type {
  FunctionComponent,
  FocusEventHandler,
  ChangeEvent,
  ReactNode,
  ReactElement,
  ComponentProps
} from 'react';
import Radio from '../Radio';
//import { useCx } from '../../utils';

type RadioType = ReactElement<ComponentProps<typeof Radio>>;

function isRadio(node: ReactNode | RadioType): node is RadioType {
  return (node as RadioType)?.type === Radio;
}

export type Props = {
  /**
   * One or more RadioInput to be used together as a group
   */
  children: JSX.Element | JSX.Element[],

  /**
   * The form field aside
   */
  aside?: string,

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
   * The checked Radio value attribute for the group.
   */
  value?: string,

  /**
   * Callback executed when the input group fires a blur event
   * @param {Object} event the event object
   */
  onBlur?: FocusEventHandler<HTMLInputElement>,

  /**
   * Callback executed when the input group fires a change event
   * @param {Object} event the event object
   * @param {string} value the string value of the input
   */
  onChange?: (event: ChangeEvent<HTMLInputElement>, value: string) => void,

  /**
  * Callback executed when the input group fires a focus event
  * @param {Object} event the event object
  */
  onFocus?: FocusEventHandler<HTMLInputElement>,
};


/**
 * Text inputs allow users to edit and input data.
 */
const RadioGroup: FunctionComponent<Props> = (props) => {
  const {
    aside,
    children,
    disabled = false,
    legend,
    name,
    onBlur,
    onChange,
    onFocus,
    required = true,
    value,
  } = props;

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onChange?.(event, event.target.value);
    },
    [onChange]
  );

  const legendElement = (
    <legend
      className="ods-input-legend"
      children={ legend }
    />
  );

  const inputElements = (
    <div className="ods-fieldset-flex"
      onFocus={ onFocus }
      onBlur={ onBlur }
      onChange={ handleChange }
      children={
        Children.map(children, (child) => {
          if (!isRadio(child)) { return child; }

          const isChecked = value === child.props.value;
          return cloneElement(
            child,
            {
              name,
              disabled: disabled || child.props.disabled,
              checked: isChecked,
              onChange: handleChange,
              required
            }
          );
        })
      }
    />
  );

  const asideElement = (
    <aside
      className="ods-field--hint"
      children={ aside }
    />
  );

  return (
    <fieldset className="ods-fieldset">
      { legendElement }
      { inputElements }
      { asideElement }
    </fieldset>
  );
};

export default RadioGroup;
