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
  FormHelperText,
  Radio as MuiRadio,
  RadioProps as MuiRadioProps,
} from "@mui/material";
import { memo, useCallback, useMemo, useRef, useImperativeHandle } from "react";
import { FieldComponentProps } from "./FieldComponentProps";
import type { HtmlProps } from "./HtmlProps";
import { FocusHandle } from "./inputUtils";
import { Typography } from "./Typography";

export type RadioProps = {
  inputRef?: React.RefObject<FocusHandle>;
  isChecked?: boolean;
  isInvalid?: boolean;
  label: string;
  value: string;
  onChange?: MuiRadioProps["onChange"];
  onBlur?: MuiFormControlLabelProps["onBlur"];
  isReadOnly?: boolean;
  onMouseDown?: React.MouseEventHandler<HTMLSpanElement>; // Add this line
} & Pick<FieldComponentProps, "hint" | "id" | "isDisabled" | "name"> &
  Pick<HtmlProps, "testId" | "translate">;

const Radio = ({
  hint,
  inputRef,
  isChecked,
  isDisabled = false,
  isInvalid,
  label: labelProp,
  name,
  testId,
  translate,
  value,
  isReadOnly = false,
  onChange: onChangeProp,
  onBlur: onBlurProp,
  onMouseDown, // Add this line
}: RadioProps) => {
  const localInputRef = useRef<HTMLInputElement>(null);
  useImperativeHandle(
    inputRef,
    () => {
      return {
        focus: () => {
          localInputRef.current?.focus();
        },
      };
    },
    [],
  );

  const label = useMemo(
    () => (
      <>
        <Typography component="span">{labelProp}</Typography>
        {hint && <FormHelperText translate={translate}>{hint}</FormHelperText>}
      </>
    ),
    [labelProp, hint, translate],
  );

  const onChange = useCallback<NonNullable<MuiRadioProps["onChange"]>>(
    (event, checked) => {
      if (isReadOnly) {
        event.preventDefault();
        return;
      }
      onChangeProp?.(event, checked);
    },
    [onChangeProp, isReadOnly],
  );

  const handleMouseDown = useCallback<React.MouseEventHandler<HTMLSpanElement>>(
    (event) => {
      if (isReadOnly) {
        event.preventDefault();
      }
    },
    [isReadOnly],
  );

  const onBlur = useCallback<NonNullable<MuiFormControlLabelProps["onBlur"]>>(
    (event) => {
      onBlurProp?.(event);
    },
    [onBlurProp],
  );

  return (
    <FormControlLabel
      checked={isChecked}
      className={isInvalid ? "Mui-error" : ""}
      control={
        <MuiRadio
          inputProps={{
            "data-se": testId,
            "aria-readonly": isReadOnly,
            readOnly: isReadOnly,
            tabIndex: isReadOnly ? 0 : 0,
          }}
          inputRef={localInputRef}
          onChange={onChange}
          onMouseDown={onMouseDown || handleMouseDown} // Add this line
          disabled={isDisabled}
        />
      }
      label={label}
      name={name}
      translate={translate}
      value={value}
      onBlur={onBlur}
      disabled={isDisabled}
      sx={{
        ...(isReadOnly && {
          cursor: "default",
          "& .MuiTypography-root": {
            cursor: "default",
          },
        }),
      }}
    />
  );
};

const MemoizedRadio = memo(Radio);
MemoizedRadio.displayName = "Radio";

export { MemoizedRadio as Radio };
