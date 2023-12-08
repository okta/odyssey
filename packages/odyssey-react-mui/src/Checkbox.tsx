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
import { memo, useCallback, useMemo, useRef } from "react";
import {
  Checkbox as MuiCheckbox,
  CheckboxProps as MuiCheckboxProps,
  FormControlLabel,
  FormControlLabelProps as MuiFormControlLabelProps,
  FormHelperText,
} from "@mui/material";

import { FieldComponentProps } from "./FieldComponentProps";
import { Typography } from "./Typography";
import type { SeleniumProps } from "./SeleniumProps";
import { ComponentControlledState, getControlState } from "./inputUtils";
import { CheckedFieldProps } from "./FormCheckedProps";

export const checkboxValidityValues = ["valid", "invalid", "inherit"] as const;

export type CheckboxProps = {
  /**
   * The ARIA label for the Checkbox
   */
  ariaLabel?: string;
  /**
   * The ID of the element that labels the Checkbox
   */
  ariaLabelledBy?: string;
  /**
   * The id of the `input` element.
   */
  id?: string;
  /**
   * Determines whether the Checkbox is disabled
   */
  isDisabled?: boolean;
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
   * The helper text content
   */
  hint?: string;
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
} & Pick<FieldComponentProps, "id" | "isDisabled" | "name"> &
  CheckedFieldProps<MuiCheckboxProps> &
  SeleniumProps;

const Checkbox = ({
  ariaLabel,
  ariaLabelledBy,
  id: idOverride,
  isChecked,
  isDefaultChecked,
  isDisabled,
  isIndeterminate,
  isRequired,
  label: labelProp,
  hint,
  name: nameOverride,
  onChange: onChangeProp,
  onBlur: onBlurProp,
  testId,
  validity = "inherit",
  value,
}: CheckboxProps) => {
  const { t } = useTranslation();
  const controlledStateRef = useRef(
    getControlState({
      controlledValue: isChecked,
      uncontrolledValue: isDefaultChecked,
    })
  );
  const inputValues = useMemo(() => {
    if (controlledStateRef.current === ComponentControlledState.CONTROLLED) {
      return { checked: isChecked };
    }
    return { defaultChecked: isDefaultChecked };
  }, [isDefaultChecked, isChecked]);

  const label = useMemo(() => {
    return (
      <>
        {labelProp}
        {isRequired && (
          <>
            {" "}
            <Typography component="span" color="textSecondary">
              ({t("fieldlabel.required.text")})
            </Typography>
          </>
        )}
        {hint && <FormHelperText>{hint}</FormHelperText>}
      </>
    );
  }, [isRequired, labelProp, hint, t]);

  const onChange = useCallback<NonNullable<MuiCheckboxProps["onChange"]>>(
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
      sx={{ alignItems: "flex-start" }}
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
          required={isRequired}
          sx={() => ({
            marginBlockStart: "2px",
          })}
        />
      }
      data-se={testId}
      disabled={isDisabled}
      id={idOverride}
      label={label}
      name={nameOverride ?? idOverride}
      value={value}
      required={isRequired}
      onBlur={onBlur}
    />
  );
};

const MemoizedCheckbox = memo(Checkbox);
MemoizedCheckbox.displayName = "Checkbox";

export { MemoizedCheckbox as Checkbox };
