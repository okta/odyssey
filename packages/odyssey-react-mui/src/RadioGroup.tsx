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

import {
  FormControl,
  FormLabel,
  FormHelperText,
  visuallyHidden,
  Radio,
  useUniqueId,
} from "./";
import { RadioGroup as MuiRadioGroup } from "@mui/material";
import { ReactElement, useMemo } from "react";

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
  error?: string;
  /**
   * Optional hint text
   */
  hint?: string;
  /**
   * Disables the whole radio group
   */
  isDisabled?: boolean;
  /**
   * Declares the group invalid
   */
  isInvalid?: boolean;
  /**
   * The text label for the radio group
   */
  label: string;
  /**
   * The name of the radio group, which only needs to be changed
   * if there are multiple radio groups on the same screen
   */
  name?: string;
}

export const RadioGroup = ({
  children,
  defaultValue,
  error,
  hint,
  isDisabled,
  isInvalid,
  label,
  name,
}: RadioGroupProps) => {
  const ariaDescribedBy = useMemo(
    () =>
      error || hint
        ? [hint && `${name}-hint`, error && `${name}-error`]
            .filter(Boolean)
            .join(" ")
        : undefined,
    [error, hint, name]
  );

  const uniqueName = useUniqueId(name);

  return (
    <FormControl component="fieldset" disabled={isDisabled} error={isInvalid}>
      <FormLabel component="legend">{label}</FormLabel>
      {hint && (
        <FormHelperText id={`${uniqueName}-hint`}>{hint}</FormHelperText>
      )}
      <MuiRadioGroup
        aria-describedby={ariaDescribedBy}
        defaultValue={defaultValue}
        name={`${uniqueName}-group`}
      >
        {children}
      </MuiRadioGroup>
      {error && (
        <FormHelperText id={`${uniqueName}-error`} error>
          <span style={visuallyHidden}>Error:</span> {error}
        </FormHelperText>
      )}
    </FormControl>
  );
};
