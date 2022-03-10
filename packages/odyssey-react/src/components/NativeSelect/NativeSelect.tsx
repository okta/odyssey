/*!
 * Copyright (c) 2022-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import React, { useCallback } from "react";
import { NativeSelectOption } from "./NativeSelectOption";
import { NativeSelectOptionGroup } from "./NativeSelectOptionGroup";
import { Field } from "../Field";
import { ChevronDownIcon } from "../Icon";
import { withTheme } from "@okta/odyssey-react-theme";
import { forwardRefWithStatics, useOmit, useOid } from "../../utils";
import { theme } from "./NativeSelect.theme";
import styles from "./NativeSelect.module.scss";

import type {
  ComponentPropsWithRef,
  ReactNode,
  ChangeEvent,
  FocusEventHandler,
} from "react";
import type { CommonFieldProps } from "../Field/types";

export interface NativeSelectProps
  extends CommonFieldProps,
    Omit<ComponentPropsWithRef<"select">, "style" | "className" | "multiple"> {
  /**
   * Select options
   */
  children: ReactNode;

  /**
   * The underlying select element id attribute. Automatically generated if not provided
   */
  id?: string;
  /**
   * The underlying select element name attribute for the group
   */
  name: string;

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
   * Callback executed when the select fires a blur event
   * @param {Object} event the event object
   */
  onBlur?: FocusEventHandler<HTMLSelectElement>;

  /**
   * Callback executed when the select fires a change event
   * @param {Object} event the event object
   * @param {string} value the string value of the select
   */
  onChange?: (event?: ChangeEvent<HTMLSelectElement>, value?: string) => void;

  /**
   * Callback executed when the select fires a focus event
   * @param {Object} event the event object
   */
  onFocus?: FocusEventHandler<HTMLSelectElement>;
}

type Statics = {
  Option: typeof NativeSelectOption;
  OptionGroup: typeof NativeSelectOptionGroup;
};

/**
 * Native select input to choose one option from a list
 */
export const NativeSelect = withTheme(
  theme,
  styles
)(
  forwardRefWithStatics<HTMLSelectElement, NativeSelectProps, Statics>(
    (props, ref) => {
      const {
        children,
        disabled = false,
        error,
        hint,
        id,
        label,
        name,
        onBlur,
        onChange,
        onFocus,
        optionalLabel,
        required,
        value,
        ...rest
      } = props;
      const omitProps = useOmit(rest);
      const oid = useOid(id);

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
              className={styles.root}
              id={oid}
              name={name}
              disabled={disabled}
              required={required}
              onBlur={onBlur}
              onChange={handleChange}
              onFocus={onFocus}
              value={value}
              ref={ref}
            >
              {children}
            </select>
            <span className={styles.indicator}>
              <ChevronDownIcon />
            </span>
          </div>
        </Field>
      );
    }
  )
);

NativeSelect.displayName = "NativeSelect";

NativeSelect.Option = NativeSelectOption;
NativeSelect.OptionGroup = NativeSelectOptionGroup;
