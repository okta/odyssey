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

import { useCallback } from "react";
import type {
  ComponentProps,
  ChangeEvent,
  ReactElement,
  ComponentPropsWithoutRef,
} from "react";
import SelectOption from "../SelectOption";
import SelectOptionGroup from "../SelectOptionGroup";
import useChoices from "./useChoices";
import {
  forwardRefWithStatics,
  useOid,
  useOmit,
  withStyles,
} from "../../../utils";
import Field from "../../Field";
import type { SharedFieldTypes } from "../../Field";

import styles from "../Select.module.scss";
import CaretDownIcon from "../../Icon/CaretDown";

interface Props
  extends SharedFieldTypes,
    Omit<
      ComponentPropsWithoutRef<"select">,
      "onChange" | "style" | "className"
    > {
  /**
   * One or more options or option groups to be used together as a group
   */
  children: ReactElement | ReactElement[];

  /**
   * The underlying select element id attribute. Automatically generated if not provided
   */
  id?: string;
  /**
   * The underlying select element name attribute for the group
   */
  name: string;

  /**
   * The underlying select element required attribute for the group
   * @default true
   */
  required?: boolean;

  /**
   * The underlying select element disabled attribute for the group
   * @default false
   */
  disabled?: boolean;

  /**
   * The selected option value attribute for a controlled group.
   */
  value?: string;

  /**
   * Callback executed when the select fires a change event
   * @param {Object} event the event object
   * @param {string} value the string value of the select
   */
  onChange?: (event?: ChangeEvent<HTMLSelectElement>, value?: string) => void;
}

/**
 * Often referred to as a "dropdown menu" this input triggers a menu of
 * options a user can select.
 */
let Select = forwardRefWithStatics<HTMLSelectElement, Props, Statics>(
  (props, ref) => {
    const {
      id,
      children,
      disabled = false,
      name,
      onChange,
      required = true,
      value,
      error,
      hint,
      label,
      optionalLabel,
      ...rest
    } = props;

    const omitProps = useOmit(rest);

    const oid = useOid(id);

    useChoices(oid, value);

    const handleChange = useCallback(
      (event: ChangeEvent<HTMLSelectElement>) => {
        onChange?.(event, event.target.value);
      },
      [onChange]
    );

    return (
      <Field
        error={error}
        hint={hint}
        inputId={oid}
        label={label}
        optionalLabel={optionalLabel}
        required={required}
      >
        <div className={styles.outer}>
          {/* eslint-disable-next-line jsx-a11y/no-onchange */}
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
          <span className={styles.indicator} role="presentation">
            <CaretDownIcon />
          </span>
        </div>
      </Field>
    );
  }
);

export interface Statics {
  Option: typeof SelectOption;
  OptionGroup: typeof SelectOptionGroup;
}

Select.Option = SelectOption;
Select.OptionGroup = SelectOptionGroup;

type SelectProps = ComponentProps<typeof Select>;
export type { SelectProps as Props };

Select = withStyles(styles)(Select);

export default Select;
