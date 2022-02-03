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

import React, { useCallback } from "react";
import type { ChangeEvent, ReactElement, ComponentPropsWithRef } from "react";
import { withTheme } from "@okta/odyssey-react-theme";
import { SelectOption } from "./SelectOption";
import { SelectOptionGroup } from "./SelectOptionGroup";
import { useChoices } from "./useChoices";
import type { ChoicesHTMLSelectElement } from "./useChoices";
import { forwardRefWithStatics, useOid, useOmit } from "../../utils";
import { Field } from "../Field";
import type { CommonFieldProps } from "../Field/types";
import { CaretDownIcon } from "../Icon";
import { theme } from "./Select.theme";
import styles from "./Select.module.scss";

interface CommonProps
  extends CommonFieldProps,
    Omit<ComponentPropsWithRef<"select">, "onChange" | "style" | "className"> {
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

  /**
   * The text that is shown while choices are being populated.
   */
  loadingText?: string;

  /**
   * The text that is shown when a user's search has returned no results.
   */
  noResultsText?: string;
}

interface MultipleProps extends CommonProps {
  multiple: true;

  /**
   * The text that is shown when a user has selected all possible choices.
   */
  noChoicesText?: string;
}

interface SingleProps extends CommonProps {
  multiple?: false;
  noChoicesText?: never;
}

export type SelectProps = MultipleProps | SingleProps;

/**
 * Often referred to as a "dropdown menu" this input triggers a menu of
 * options a user can select.
 */
export const Select = withTheme(
  theme,
  styles
)(
  forwardRefWithStatics<ChoicesHTMLSelectElement, SelectProps, Statics>(
    (props, ref) => {
      const {
        id,
        children,
        disabled = false,
        name,
        onChange,
        required,
        value,
        error,
        hint,
        label,
        optionalLabel,
        loadingText = "",
        noResultsText = "",
        noChoicesText = "",
        ...rest
      } = props;

      const omitProps = useOmit(rest);

      const oid = useOid(id);

      useChoices({ id: oid, value, loadingText, noResultsText, noChoicesText });

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
  )
);

Select.displayName = "Select";

interface Statics {
  Option: typeof SelectOption;
  OptionGroup: typeof SelectOptionGroup;
}

Select.Option = SelectOption;
Select.OptionGroup = SelectOptionGroup;
