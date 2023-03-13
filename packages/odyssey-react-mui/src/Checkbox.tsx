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

import { Checkbox as MuiCheckbox } from "@mui/material";
import { ChangeEventHandler, memo } from "react";

import { FormControlLabel } from ".";

export type CheckboxProps = {
  ariaLabel?: string;
  ariaLabelledBy?: string;
  isChecked?: boolean;
  isDefaultChecked?: boolean;
  isDisabled?: boolean;
  hasError?: boolean;
  isIndeterminate?: boolean;
  label?: string;
  name?: string;
  onChange?: ChangeEventHandler<EventTarget>;
  value?: string;
};

const Checkbox = ({
  ariaLabel,
  ariaLabelledBy,
  isChecked,
  isDefaultChecked,
  isDisabled,
  isIndeterminate,
  hasError,
  label,
  name,
  onChange,
  value,
}: CheckboxProps) => (
  <FormControlLabel
    aria-label={ariaLabel}
    aria-labelledby={ariaLabelledBy}
    checked={isChecked}
    className={hasError ? "Mui-error" : ""}
    control={<MuiCheckbox indeterminate={isIndeterminate} />}
    defaultChecked={isDefaultChecked}
    disabled={isDisabled}
    label={label}
    name={name}
    onChange={onChange}
    value={value}
  />
);

const MemoizedCheckbox = memo(Checkbox);

export { MemoizedCheckbox as Checkbox };
