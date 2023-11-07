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
import { FormCheckedProps } from "./FormCheckedProps";

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
   * The checkbox validity, if different from its enclosing group. Defaults to "inherit".
   */
  validity?: (typeof checkboxValidityValues)[number];
  /**
   * The value attribute of the Checkbox
   */
  value?: string;
} & Pick<FieldComponentProps, "id" | "isDisabled" | "name"> &
  FormCheckedProps<MuiCheckboxProps> &
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
  name: nameOverride,
  onChange: onChangeProp,
  testId,
  validity = "inherit",
  value,
}: CheckboxProps) => {
  const { t } = useTranslation();
  const [isLocalChecked, setIsLocalChecked] = useControlledState({
    controlledValue: isChecked,
    uncontrolledValue: isDefaultChecked,
  });

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

  const onChange = useCallback<NonNullable<MuiCheckboxProps["onChange"]>>(
    (event, checked) => {
      setIsLocalChecked(checked);
      onChangeProp?.(event, checked);
    },
    [onChangeProp, setIsLocalChecked]
  );

  return (
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
          checked={isLocalChecked}
          indeterminate={isIndeterminate}
          onChange={onChange}
          required={isRequired}
        />
      }
      data-se={testId}
      disabled={isDisabled}
      id={idOverride}
      label={label}
      name={nameOverride ?? idOverride}
      value={value}
      required={isRequired}
    />
  );
};

const MemoizedCheckbox = memo(Checkbox);
MemoizedCheckbox.displayName = "Checkbox";

export { MemoizedCheckbox as Checkbox };
