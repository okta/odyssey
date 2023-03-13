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
import { ChangeEventHandler, memo, ReactElement, useMemo } from "react";

import {
  FormControl,
  FormLabel,
  FormHelperText,
  visuallyHidden,
  Radio,
  useUniqueId,
  RadioProps,
} from ".";

export interface RadioGroupProps {
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
   * Disables the whole radio group
   */
  isDisabled?: boolean;
  /**
   * The text label for the radio group
   */
  label: string;
  /**
   * The name of the radio group, which only needs to be changed if there are multiple radio groups on the same screen
   */
  name?: string;
  /**
   * Listen for changes in the browser that change `value`.
   */
  onChange?: ChangeEventHandler<EventTarget>;
  /**
   * The `value` on the selected radio button.
   */
  value?: RadioProps["value"];
}

const RadioGroup = ({
  children,
  defaultValue,
  errorMessage,
  hint,
  isDisabled,
  label,
  name,
  onChange,
}: RadioGroupProps) => {
  const ariaDescribedBy = useMemo(
    () =>
      errorMessage || hint
        ? [hint && `${name}-hint`, errorMessage && `${name}-error`]
            .filter(Boolean)
            .join(" ")
        : undefined,
    [errorMessage, hint, name]
  );

  const uniqueName = useUniqueId(name);

  return (
    <FormControl
      component="fieldset"
      disabled={isDisabled}
      error={Boolean(errorMessage)}
    >
      <FormLabel component="legend">{label}</FormLabel>
      {hint && (
        <FormHelperText id={`${uniqueName}-hint`}>{hint}</FormHelperText>
      )}
      <MuiRadioGroup
        aria-describedby={ariaDescribedBy}
        defaultValue={defaultValue}
        name={uniqueName}
        onChange={onChange}
      >
        {children}
      </MuiRadioGroup>
      {errorMessage && (
        <FormHelperText id={`${uniqueName}-error`} error>
          <span style={visuallyHidden}>Error:</span> {errorMessage}
        </FormHelperText>
      )}
    </FormControl>
  );
};

const MemoizedRadioGroup = memo(RadioGroup);

export { MemoizedRadioGroup as RadioGroup };
