/*!
 * Copyright (c) 2023-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { SwitchBaseProps } from "@mui/material/internal/SwitchBase.js";

type SwitchOnChangeProp = Pick<SwitchBaseProps, "onChange">;

export type ControlledCheckedFieldProps<
  TogglableInputElement extends SwitchOnChangeProp,
> = {
  /**
   * Sets the checked state of the Checkbox
   */
  isChecked: boolean;
  /**
   * Determines whether the Checkbox is checked
   * Should not be used if `isChecked` is used
   */
  isDefaultChecked?: never;
  /**
   * The change event handler for the Checkbox
   * Must be used if `isChecked` is used
   */
  onChange: TogglableInputElement["onChange"];
};

export type UncontrolledCheckedFieldProps<
  TogglableInputElement extends SwitchOnChangeProp,
> = {
  /**
   * Sets the checked state of the Checkbox
   */
  isChecked?: never;
  /**
   * Determines whether the Checkbox is checked
   * Should not be used if `isChecked` is used
   */
  isDefaultChecked?: boolean;
  /**
   * The change event handler for the Checkbox
   * Must be used if `isChecked` is used
   */
  onChange?: TogglableInputElement["onChange"];
};

export type CheckedFieldProps<
  TogglableInputElement extends SwitchOnChangeProp,
> =
  | ControlledCheckedFieldProps<TogglableInputElement>
  | UncontrolledCheckedFieldProps<TogglableInputElement>;
