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

import { useTranslation } from "react-i18next";
import { memo, useCallback, useMemo, useRef, useImperativeHandle } from "react";
import {
  Checkbox as MuiCheckbox,
  CheckboxProps as MuiCheckboxProps,
  FormControlLabel,
  FormControlLabelProps as MuiFormControlLabelProps,
  FormHelperText,
} from "@mui/material";
import styled from "@emotion/styled";

import { CheckedFieldProps } from "./FormCheckedProps";
import type { HtmlProps } from "./HtmlProps";
import {
  ComponentControlledState,
  FocusHandle,
  getControlState,
} from "./inputUtils";
import { FieldComponentProps } from "./FieldComponentProps";
import {
  useOdysseyDesignTokens,
  DesignTokens,
} from "./OdysseyDesignTokensContext";
import { Typography } from "./Typography";
import { useUniqueId } from "./useUniqueId";

export const checkboxValidityValues = ["valid", "invalid", "inherit"] as const;

const HintContainerWithInlineStartSpacing = styled.div<{
  odysseyDesignTokens: DesignTokens;
}>(({ odysseyDesignTokens }) => ({
  paddingInlineStart: `calc(${odysseyDesignTokens.TypographyLineHeightUi}em + ${odysseyDesignTokens.Spacing2})`,
  marginBlockEnd: odysseyDesignTokens.Spacing2,
}));

export type CheckboxProps = {
  /**
   * The ref forwarded to the Checkbox
   */
  inputRef?: React.RefObject<FocusHandle>;
  /**
   * Determines whether the Checkbox is in an indeterminate state
   */
  isIndeterminate?: boolean;
  /**
   * Determines whether the Checkbox is required
   */
  isRequired?: boolean;
  /**
   * The label text for the Checkbox
   */
  label?: string;
  /**
   * The checkbox validity, if different from its enclosing group. Defaults to "inherit".
   */
  validity?: (typeof checkboxValidityValues)[number];
  /**
   * The value attribute of the Checkbox
   */
  value?: string;
  /**
   * Callback fired when the blur event happens. Provides event value.
   */
  onBlur?: MuiFormControlLabelProps["onBlur"];
} & Pick<
  FieldComponentProps,
  "hint" | "id" | "isDisabled" | "isReadOnly" | "name"
> &
  CheckedFieldProps<MuiCheckboxProps> &
  Pick<HtmlProps, "ariaLabel" | "ariaLabelledBy" | "testId" | "translate">;

const Checkbox = ({
  ariaLabel,
  ariaLabelledBy,
  id: idOverride,
  inputRef,
  isChecked,
  isDefaultChecked,
  isDisabled,
  isIndeterminate,
  isReadOnly = false,
  isRequired,
  label: labelProp,
  hint,
  name: nameOverride,
  onChange: onChangeProp,
  onBlur: onBlurProp,
  testId,
  translate,
  validity = "inherit",
  value,
}: CheckboxProps) => {
  const { t } = useTranslation();
  const odysseyDesignTokens = useOdysseyDesignTokens();
  const id = useUniqueId(idOverride);
  const hintId = hint ? `${id}-hint` : undefined;

  const controlledStateRef = useRef(
    getControlState({
      controlledValue: isChecked,
      uncontrolledValue: isDefaultChecked,
    }),
  );
  const inputValues = useMemo(() => {
    if (controlledStateRef.current === ComponentControlledState.CONTROLLED) {
      return { checked: isChecked };
    }
    return { defaultChecked: isDefaultChecked };
  }, [isDefaultChecked, isChecked]);

  const localInputRef = useRef<HTMLInputElement>(null);
  useImperativeHandle(
    inputRef,
    () => ({
      focus: () => {
        localInputRef.current?.focus();
      },
    }),
    [],
  );

  const label = useMemo(() => {
    return (
      <>
        <Typography component="span">{labelProp}</Typography>
        {isRequired && (
          <>
            {" "}
            <Typography component="span" color="textSecondary">
              ({t("fieldlabel.required.text")})
            </Typography>
          </>
        )}
      </>
    );
  }, [isRequired, labelProp, t, translate]);

  const onChange = useCallback<NonNullable<MuiCheckboxProps["onChange"]>>(
    (event, checked) => {
      onChangeProp?.(event, checked);
    },
    [onChangeProp],
  );

  const onClick = useCallback<NonNullable<MuiCheckboxProps["onClick"]>>(
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

  const checkboxStyles = useMemo(
    () => ({
      alignItems: "flex-start",

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
    }),
    [hint, isReadOnly],
  );

  return (
    <>
      <FormControlLabel
        sx={checkboxStyles}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        className={
          validity === "invalid"
            ? "Mui-error"
            : validity === "valid"
              ? "Mui-valid"
              : ""
        }
        control={
          <MuiCheckbox
            {...inputValues}
            indeterminate={isIndeterminate}
            onChange={onChange}
            onClick={
              onClick as unknown as React.MouseEventHandler<HTMLButtonElement>
            }
            required={isRequired}
            inputProps={{
              "aria-describedby": hintId,
              "aria-readonly": isReadOnly,
              "data-se": testId,
              readOnly: isReadOnly,
            }}
            disabled={isDisabled}
            inputRef={localInputRef}
            sx={{
              marginBlockStart: "2px",
            }}
          />
        }
        disabled={isDisabled}
        id={idOverride}
        label={label}
        name={nameOverride ?? idOverride}
        value={value}
        required={isRequired}
        onBlur={onBlur}
        translate={translate}
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

const MemoizedCheckbox = memo(Checkbox);
MemoizedCheckbox.displayName = "Checkbox";

export { MemoizedCheckbox as Checkbox };
