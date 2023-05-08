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

import { RadioGroup as MuiRadioGroup } from "@mui/material";
import { ChangeEventHandler, memo, ReactElement, useCallback } from "react";

import { Radio, RadioProps } from "./Radio";
import { Field } from "./Field";

export type RadioGroupProps = {
  /**
   * The <Radio> components within the group. Must include two or more.
   */
  children: Array<ReactElement<typeof Radio>>;
  /**
   * The text value of the radio that should be selected by default
   */
  defaultValue?: string;
  /**
   * The error text for an invalid group
   */
  errorMessage?: string;
  /**
   * Optional hint text
   */
  hint?: string;
  /**
   * The id of the `input` element. This will also be the input's `name` field.
   */
  id?: string;
  /**
   * Disables the whole radio group
   */
  isDisabled?: boolean;
  /**
   * The text label for the radio group
   */
  label: string;
  /**
   * Listen for changes in the browser that change `value`.
   */
  onChange?: ChangeEventHandler<EventTarget>;
  /**
   * The `value` on the selected radio button.
   */
  value?: RadioProps["value"];
};

const RadioGroup = ({
  children,
  defaultValue,
  errorMessage,
  hint,
  id: idOverride,
  isDisabled,
  label,
  onChange,
  value,
}: RadioGroupProps) => {
  const renderFieldComponent = useCallback(
    ({ ariaDescribedBy, id }) => (
      <MuiRadioGroup
        aria-describedby={ariaDescribedBy}
        defaultValue={defaultValue}
        id={id}
        name={id}
        onChange={onChange}
        value={value}
      >
        {children}
      </MuiRadioGroup>
    ),
    [children, defaultValue, onChange, value]
  );

  return (
    <Field
      errorMessage={errorMessage}
      fieldType="group"
      hasVisibleLabel={false}
      hint={hint}
      id={idOverride}
      isDisabled={isDisabled}
      label={label}
      renderFieldComponent={renderFieldComponent}
    />
  );
};

const MemoizedRadioGroup = memo(RadioGroup);

export { MemoizedRadioGroup as RadioGroup };
