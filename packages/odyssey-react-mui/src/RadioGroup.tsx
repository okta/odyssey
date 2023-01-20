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
} from "./";
import { RadioGroup as MuiRadioGroup } from "@mui/material";

export interface RadioGroupProps {
  /**
   * The name of the radio group, which only needs to be changed
   * if there are multiple radio groups on the same screen
   */
  name?: string;
  /**
   * The text label for the radio group
   */
  label: string;
  /**
   * Optional hint text
   */
  hint?: string | undefined;
  /**
   * Disables the whole radio group
   */
  disabled?: boolean | undefined;
  /**
   * Declares the group invalid
   */
  invalid?: boolean | undefined;
  /**
   * The error text for an invalid group
   */
  error?: string | undefined;
  /**
   * The text value of the radio that should be selected by default
   */
  defaultValue?: string;
  /**
   * The <Radio> components within the group. Must include two or more.
   */
  children: Array<React.ReactElement<typeof Radio>>;
}

export const RadioGroup = ({
  name = "radio",
  label,
  hint,
  disabled,
  invalid,
  error,
  children,
  defaultValue,
}: RadioGroupProps) => {
  // Setting ariaDescribedBy this way to avoid linter's prefer-const error
  const ariaDescribedBy = [
    hint && `${name}-hint`,
    error && `${name}-error`,
  ].filter(Boolean);

  return (
    <FormControl component="fieldset" disabled={disabled} error={invalid}>
      <FormLabel component="legend">{label}</FormLabel>
      {hint && <FormHelperText id={`${name}-hint`}>{hint}</FormHelperText>}
      <MuiRadioGroup
        defaultValue={defaultValue}
        name={`${name}-group`}
        aria-describedby={ariaDescribedBy.join(" ")}
      >
        {children}
      </MuiRadioGroup>
      {error && (
        <FormHelperText id={`${name}-error`} error>
          <span style={visuallyHidden}>Error:</span> {error}
        </FormHelperText>
      )}
    </FormControl>
  );
};
