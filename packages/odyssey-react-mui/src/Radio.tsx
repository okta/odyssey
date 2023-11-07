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

import { Radio as MuiRadio } from "@mui/material";
import { memo } from "react";

import { FormControlLabel } from "@mui/material";

import { FieldComponentProps } from "./FieldComponentProps";
import type { SeleniumProps } from "./SeleniumProps";

type FieldComponentPropsUsedByRadio = Pick<
  FieldComponentProps,
  "isDisabled" | "name"
>;

export type RadioProps = {
  /**
   * If `true`, the Radio is selected
   */
  isChecked?: boolean;
  /**
   * If `true`, the Radio has an invalid value
   */
  isInvalid?: boolean;
  /**
   * The label text for the Radio
   */
  label: string;
  /**
   * The value attribute of the Radio
   */
  value: string;
} & SeleniumProps &
  FieldComponentPropsUsedByRadio;

const Radio = ({
  isChecked,
  isDisabled,
  isInvalid,
  label,
  name,
  testId,
  value,
}: RadioProps) => (
  <FormControlLabel
    checked={isChecked}
    className={isInvalid ? "Mui-error" : ""}
    control={<MuiRadio />}
    data-se={testId}
    disabled={isDisabled}
    label={label}
    name={name}
    value={value}
  />
);

const MemoizedRadio = memo(Radio);
MemoizedRadio.displayName = "Radio";

export { MemoizedRadio as Radio };
