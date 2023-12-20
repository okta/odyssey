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
  FormControlLabel,
  FormControlLabelProps as MuiFormControlLabelProps,
  Radio as MuiRadio,
  RadioProps as MuiRadioProps,
} from "@mui/material";
import { memo, useCallback, useRef, useImperativeHandle } from "react";

import { FieldComponentProps } from "./FieldComponentProps";
import type { SeleniumProps } from "./SeleniumProps";
import { FocusHandle } from "./@types/react-augment";

export type RadioProps = {
  /**
   * The ref forwarded to the Radio to expose focus()
   */
  inputFocusRef?: React.RefObject<FocusHandle>;
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
  /**
   * Callback fired when the state is changed. Provides event and checked value.
   */
  onChange?: MuiRadioProps["onChange"];
  /**
   * Callback fired when the blur event happens. Provides event value.
   */
  onBlur?: MuiFormControlLabelProps["onBlur"];
} & Pick<FieldComponentProps, "isDisabled" | "name"> &
  SeleniumProps;

const Radio = ({
  inputFocusRef,
  isChecked,
  isDisabled,
  isInvalid,
  label,
  name,
  testId,
  value,
  onChange: onChangeProp,
  onBlur: onBlurProp,
}: RadioProps) => {
  const ref = useRef<HTMLInputElement>(null);
  useImperativeHandle(
    inputFocusRef,
    () => {
      const element = ref.current;
      return {
        focus: () => {
          element && element.focus();
        },
      };
    },
    []
  );

  const onChange = useCallback<NonNullable<MuiRadioProps["onChange"]>>(
    (event, checked) => {
      onChangeProp?.(event, checked);
    },
    [onChangeProp]
  );

  const onBlur = useCallback<NonNullable<MuiFormControlLabelProps["onBlur"]>>(
    (event) => {
      onBlurProp?.(event);
    },
    [onBlurProp]
  );

  return (
    <FormControlLabel
      checked={isChecked}
      className={isInvalid ? "Mui-error" : ""}
      control={<MuiRadio inputRef={ref} onChange={onChange} />}
      data-se={testId}
      disabled={isDisabled}
      label={label}
      name={name}
      value={value}
      onBlur={onBlur}
    />
  );
};

const MemoizedRadio = memo(Radio);
MemoizedRadio.displayName = "Radio";

export { MemoizedRadio as Radio };
