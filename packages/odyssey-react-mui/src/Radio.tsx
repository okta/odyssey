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

import { Radio as MuiRadio, RadioProps as MuiRadioProps } from "@mui/material";
import { memo, useCallback } from "react";

import { FormControlLabel } from "@mui/material";

import { FieldComponentProps } from "./FieldComponentProps";
import type { SeleniumProps } from "./SeleniumProps";
import { FormCheckedProps } from "./FormCheckedProps";
import { useControlledState } from "./useControlledState";

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
} & Pick<FieldComponentProps, "isDisabled" | "name"> &
  FormCheckedProps<MuiRadioProps> &
  SeleniumProps;

const Radio = ({
  isChecked,
  isDefaultChecked,
  isDisabled,
  isInvalid,
  label,
  name,
  onChange: onChangeProp,
  testId,
  value,
}: RadioProps) => {
  const [isLocalChecked, setIsLocalChecked] = useControlledState({
    controlledValue: isChecked,
    uncontrolledValue: isDefaultChecked,
  });

  const onChange = useCallback<NonNullable<MuiRadioProps["onChange"]>>(
    (event, checked) => {
      setIsLocalChecked(checked);
      onChangeProp?.(event, checked);
    },
    [onChangeProp, setIsLocalChecked]
  );

  return (
    <FormControlLabel
      className={isInvalid ? "Mui-error" : ""}
      control={<MuiRadio checked={isLocalChecked} onChange={onChange} />}
      data-se={testId}
      disabled={isDisabled}
      label={label}
      name={name}
      value={value}
    />
  );
};

const MemoizedRadio = memo(Radio);
MemoizedRadio.displayName = "Radio";

export { MemoizedRadio as Radio };
