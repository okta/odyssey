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

import { FormControl, FormLabel, FormHelperText, visuallyHidden } from "./";
import { RadioGroup as MuiRadioGroup } from "@mui/material";

export interface RadioGroupProps {
  label: string;
  hint?: string | undefined;
  disabled?: boolean | undefined;
  invalid?: boolean | undefined;
  error?: any | undefined;
  children: any;
}

export const RadioGroup = ({
  label,
  hint,
  disabled,
  invalid,
  error,
  children,
}: RadioGroupProps) => (
  <FormControl component="fieldset" disabled={disabled} error={invalid}>
    <FormLabel component="legend">{label}</FormLabel>
    {hint && <FormHelperText id="radio-hint">{hint}</FormHelperText>}
    <MuiRadioGroup
      defaultValue="Lightspeed"
      name="radio-buttons-group"
      aria-describedby="radio-hint radio-error"
    >
      {children}
    </MuiRadioGroup>
    {error && (
      <FormHelperText id="radio-error" error>
        <span style={visuallyHidden}>Error:</span> {error}
      </FormHelperText>
    )}
  </FormControl>
);
