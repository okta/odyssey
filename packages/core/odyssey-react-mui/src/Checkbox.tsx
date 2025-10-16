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

import styled from "@emotion/styled";
import {
  FormControlLabel,
  FormHelperText,
  Checkbox as MuiCheckbox,
  CheckboxProps as MuiCheckboxProps,
  FormControlLabelProps as MuiFormControlLabelProps,
} from "@mui/material";
import {
  InputHTMLAttributes,
  memo,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";

import type { HtmlProps } from "./HtmlProps.js";

import { FieldComponentProps } from "./FieldComponentProps.js";
import { CheckedFieldProps } from "./FormCheckedProps.js";
import { useTranslation } from "./i18n.generated/i18n.js";
import {
  ComponentControlledState,
  FocusHandle,
  getControlState,
} from "./inputUtils.js";
import {
  DesignTokens,
  useOdysseyDesignTokens,
} from "./OdysseyDesignTokensContext.js";
import { Typography } from "./Typography.js";
import { useUniqueId } from "./useUniqueId.js";

export const checkboxValidityValues = ["valid", "invalid", "inherit"] as const;

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
   * Callback fired when the blur event happens. Provides event value.
   */
  onBlur?: MuiFormControlLabelProps["onBlur"];
  /**
   * The checkbox validity, if different from its enclosing group. Defaults to "inherit".
   */
  validity?: (typeof checkboxValidityValues)[number];
  /**
   * The value attribute of the Checkbox
   */
  value?: string;
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
            <Typography color="textSecondary" component="span">
              ({t("fieldlabel.required.text")})
            </Typography>
          </>
        )}
      </>
    );
  }, [isRequired, labelProp, t]);

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
        } as CSSStyleDeclaration,
      }),

      ...(hint && {
        // needed to override specific :not(:last-child) selector
        ":not(:last-child)": {
          marginBlockEnd: "0",
        } as CSSStyleDeclaration,
      }),
    }),
    [hint, isReadOnly],
  );

  // TODO: Is there a better way to handle these styles? Why pixels? Isn't this tying Checkbox to the label's font size? -Kevin
  const checkboxInputStyles = useMemo(
    () => ({
      marginBlockStart: "2px",
    }),
    [],
  );

  const inputProps = useMemo<InputHTMLAttributes<HTMLInputElement>>(
    () => ({
      "aria-describedby": hintId,
      "aria-readonly": isReadOnly,
      "data-se": testId,
      readOnly: isReadOnly,
    }),
    [hintId, isReadOnly, testId],
  );

  return (
    <>
      <FormControlLabel
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
            disabled={isDisabled}
            indeterminate={isIndeterminate}
            inputProps={inputProps}
            inputRef={localInputRef}
            onChange={onChange}
            onClick={onClick}
            required={isRequired}
            sx={checkboxInputStyles}
          />
        }
        disabled={isDisabled}
        id={idOverride}
        label={label}
        name={nameOverride ?? idOverride}
        onBlur={onBlur}
        required={isRequired}
        sx={checkboxStyles}
        translate={translate}
        value={value}
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
