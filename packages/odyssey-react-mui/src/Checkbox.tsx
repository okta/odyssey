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
import { memo, useCallback, useMemo } from "react";
import {
  Checkbox as MuiCheckbox,
  CheckboxProps as MuiCheckboxProps,
  FormControlLabel,
} from "@mui/material";

import { FieldComponentProps } from "./FieldComponentProps";
import { Typography } from "./Typography";
import type { SeleniumProps } from "./SeleniumProps";
import { useControlledState } from "./useControlledState";

export const checkboxValidityValues = ["valid", "invalid", "inherit"] as const;

type BaseCheckboxProps = {
  /**
   * The ARIA label for the Checkbox
   */
  ariaLabel?: string;
  /**
   * The ID of the element that labels the Checkbox
   */
  ariaLabelledBy?: string;
  /**
   * Sets the checked state of the Checkbox
   */
  isChecked?: boolean;
  /**
   * Determines whether the Checkbox is checked
   */
  isDefaultChecked?: boolean;
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
} & Pick<FieldComponentProps, "id" | "isDisabled" | "name"> &
  SeleniumProps;

export type CheckboxProps = (
BaseCheckboxProps & {
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
  onChange: MuiCheckboxProps["onChange"];
} |
BaseCheckboxProps & {
  /**
   * Sets the checked state of the Checkbox
   * Should not be used if `isDefaultChecked` is used
   */
  isChecked?: never;
  /**
   * Determines whether the Checkbox is checked
   */
  isDefaultChecked?: boolean;
  /**
   * The change event handler for the Checkbox
   */
  onChange?: MuiCheckboxProps["onChange"];
});

const Checkbox = ({
  ariaLabel,
  ariaLabelledBy,
  id: idOverride,
  isChecked,
  isDefaultChecked = false,
  isDisabled,
  isIndeterminate,
  isRequired,
  label: labelProp,
  name: nameOverride,
  onChange: onChangeProp,
  testId,
  validity = "inherit",
  value,
}: CheckboxProps) => {
  const { t } = useTranslation();
  const [isCheckedValue, setIsCheckedValue] = useControlledState(isChecked || isDefaultChecked);

  const label = useMemo(() => {
    if (isRequired) {
      return (
        <>
          {labelProp}{" "}
          <Typography component="span" color="textSecondary">
            ({t("fieldlabel.required.text")})
          </Typography>
        </>
      );
    } else {
      return <>{labelProp}</>;
    }
  }, [isRequired, labelProp, t]);

  const onChange = useCallback(
    (event, checked) => {
      setIsCheckedValue(event.target.checked);
      onChangeProp?.(event, checked);
    },
    [onChangeProp, setIsCheckedValue]
  );

  return (
    <FormControlLabel
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      checked={isCheckedValue}
      className={
        validity === "invalid"
          ? "Mui-error"
          : validity === "valid"
          ? "Mui-valid"
          : ""
      }
      control={
        <MuiCheckbox indeterminate={isIndeterminate} required={isRequired} />
      }
      data-se={testId}
      disabled={isDisabled}
      id={idOverride}
      label={label}
      name={nameOverride ?? idOverride}
      onChange={onChange}
      value={value}
      required={isRequired}
    />
  );
};

const MemoizedCheckbox = memo(Checkbox);
MemoizedCheckbox.displayName = "Checkbox";

export { MemoizedCheckbox as Checkbox };
