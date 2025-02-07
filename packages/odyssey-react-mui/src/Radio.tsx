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

import { memo, useCallback, useMemo, useRef, useImperativeHandle } from "react";
import {
  FormControlLabel,
  FormControlLabelProps as MuiFormControlLabelProps,
  FormHelperText,
  Radio as MuiRadio,
  RadioProps as MuiRadioProps,
} from "@mui/material";
import styled from "@emotion/styled";

import { FieldComponentProps } from "./FieldComponentProps.js";
import type { HtmlProps } from "./HtmlProps.js";
import { FocusHandle } from "./inputUtils.js";
import {
  useOdysseyDesignTokens,
  DesignTokens,
} from "./OdysseyDesignTokensContext.js";
import { Typography } from "./Typography.js";
import { useUniqueId } from "./useUniqueId.js";

const HintContainerWithInlineStartSpacing = styled.div<{
  odysseyDesignTokens: DesignTokens;
}>(({ odysseyDesignTokens }) => ({
  paddingInlineStart: `calc(${odysseyDesignTokens.TypographyLineHeightUi}em + ${odysseyDesignTokens.Spacing2})`,
  marginBlockEnd: odysseyDesignTokens.Spacing2,

  // MUI applies the '.Mui-error' class to this hint text when the checkbox is invalid which turns the copy red
  // We want to keep the hint text gray in the error state
  ".Mui-error": {
    color: odysseyDesignTokens.TypographyColorSubordinate,
  },
}));

export type RadioProps = {
  /**
   * The ref forwarded to the Radio
   */
  inputRef?: React.RefObject<FocusHandle>;
  /**
   * Determines whether the Radio button is checked
   */
  isChecked?: boolean;
  /**
   * If `true`, the radio button has an invalid value
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
   * Callback fired when the blur event happens. Provides event value.
   */
  onChange?: MuiRadioProps["onChange"];
  onBlur?: MuiFormControlLabelProps["onBlur"];
  onClick?: React.MouseEventHandler<HTMLSpanElement>;
} & Pick<
  FieldComponentProps,
  "hint" | "id" | "isDisabled" | "isReadOnly" | "name"
> &
  Pick<HtmlProps, "testId" | "translate">;

const Radio = ({
  hint,
  id: idOverride,
  inputRef,
  isChecked,
  isDisabled,
  isInvalid,
  label: labelProp,
  name,
  testId,
  translate,
  value,
  isReadOnly,
  onChange: onChangeProp,
  onBlur: onBlurProp,
  onClick,
}: RadioProps) => {
  const localInputRef = useRef<HTMLInputElement>(null);
  const odysseyDesignTokens = useOdysseyDesignTokens();
  const id = useUniqueId(idOverride);
  const hintId = hint ? `${id}-hint` : undefined;

  useImperativeHandle(inputRef, () => {
    return {
      focus: () => {
        localInputRef.current?.focus();
      },
    };
  }, []);

  const label = useMemo(
    () => <Typography component="span">{labelProp}</Typography>,
    [labelProp],
  );

  const onChange = useCallback<NonNullable<MuiRadioProps["onChange"]>>(
    (event, checked) => {
      if (isReadOnly) {
        event.preventDefault();
      } else {
        onChangeProp?.(event, checked);
      }
    },
    [onChangeProp, isReadOnly],
  );

  const handleClick = useCallback<React.MouseEventHandler<HTMLSpanElement>>(
    (event) => {
      if (isReadOnly) {
        event.stopPropagation();
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
    <>
      <FormControlLabel
        checked={isChecked}
        className={isInvalid ? "Mui-error" : ""}
        control={
          <MuiRadio
            inputProps={{
              "aria-describedby": hintId,
              "aria-disabled": isDisabled || isReadOnly,
              "data-se": testId,
              readOnly: isReadOnly,
              tabIndex: isReadOnly ? 0 : undefined,
            }}
            inputRef={localInputRef}
            onChange={onChange}
            onClick={onClick || handleClick}
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

          ...(hint && {
            // needed to override specific :not(:last-child) selector
            ":not(:last-child)": {
              marginBlockEnd: 0,
            },
          }),
        }}
      />
      {hint && (
        <HintContainerWithInlineStartSpacing
          odysseyDesignTokens={odysseyDesignTokens}
        >
          <FormHelperText id={hintId} translate={translate}>
            {hint}
          </FormHelperText>
        </HintContainerWithInlineStartSpacing>
      )}
    </>
  );
};

const MemoizedRadio = memo(Radio);
MemoizedRadio.displayName = "Radio";

export { MemoizedRadio as Radio };
