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

import { useCallback } from 'react';
import type {
  ChangeEvent,
  ReactElement,
  ComponentPropsWithRef
} from 'react';
import SelectOption from '../SelectOption';
import SelectOptionGroup from '../SelectOptionGroup';
import useChoices from './useChoices';
import { forwardRefWithStatics, useOid, useOmit } from '../../../utils';

export interface Props extends Omit<
  ComponentPropsWithRef<'select'>,
  'onChange' | 'style' | 'className'
> {
  /**
   * One or more options or option groups to be used together as a group
   */
  children: ReactElement | ReactElement[];

  /**
   * The form field hint
   */
  hint?: string,

  /**
   * The form field label
   */
  label: string,

  /**
   * The underlying select element id attribute. Automatically generated if not provided
   */
  id?: string,

  /**
   * Text to display when the select is optional, i.e. required prop is false
   */
  optionalLabel?: string,

  /**
   * The underlying select element name attribute for the group
   */
  name: string,

  /**
   * The underlying select element required attribute for the group
   * @default true
   */
  required?: boolean,

  /**
   * The underlying select element disabled attribute for the group
   * @default false
   */
  disabled?: boolean,

  /**
   * The selected option value attribute for a controlled group.
   */
  value?: string,

  /**
   * Callback executed when the select fires a change event
   * @param {Object} event the event object
   * @param {string} value the string value of the select
   */
  onChange?: (event?: ChangeEvent<HTMLSelectElement>, value?: string) => void,
}

/**
 * Often referred to as a "dropdown menu" this input triggers a menu of
 * options a user can select.
 */
const Select = forwardRefWithStatics<
  HTMLSelectElement,
  Props,
  Statics
>((props, ref) => {
  const {
    id,
    hint,
    children,
    disabled = false,
    label,
    optionalLabel,
    name,
    onChange,
    required = true,
    value,
    ...rest
  } = props;

  const omitProps = useOmit(rest);

  const oid = useOid(id);

  useChoices(oid, value);

  const isOptional = (!required && optionalLabel) ? true : null;

  const labelElement = (
    <label
      className="ods-label"
      htmlFor={oid}
    >
      {label}
      { isOptional && <span
        className="ods-label--optional"
        children={optionalLabel}
      />}
    </label>
  );

  const handleChange = useCallback((
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    onChange?.(event, event.target.value);
  },
    [onChange]
  );


  const selectElement = (
    // eslint-disable-next-line jsx-a11y/no-onchange
    <select
      {...omitProps}
      id={oid}
      name={name}
      disabled={disabled}
      required={required}
      onChange={handleChange}
      value={value}
      ref={ref}
    >
      {children}
    </select>
  );

  const hintElement = hint && (
    <aside
      className="ods-field--hint"
      children={hint}
    />
  );

  return (
    <fieldset data-optional={isOptional} className="ods-fieldset">
      <div className="ods-fieldset-flex">
        {selectElement}
        {labelElement}
        {hintElement}
      </div>
    </fieldset>
  );
});

interface Statics {
  Option: typeof SelectOption;
  OptionGroup: typeof SelectOptionGroup;
}

Select.Option = SelectOption;
Select.OptionGroup = SelectOptionGroup;

export default Select;
