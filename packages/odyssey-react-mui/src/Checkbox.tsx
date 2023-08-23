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
  Checkbox as MuiCheckbox,
  CheckboxProps as MuiCheckboxProps,
  FormControlLabel,
} from "@mui/material";
import { Typography } from "./Typography";
import { memo, useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

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
   * Determines whether the Checkbox is checked
   */
  isDefaultChecked?: boolean;
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
   * The name of the `input` element. Defaults to the `id` if not set.
   */
  name?: string;
  /**
   * The change event handler for the Checkbox
   */
  onChange?: MuiCheckboxProps["onChange"];
  /**
   * The checkbox validity, if different from its enclosing group. Defaults to "inherit".
   */
  validity?: (typeof checkboxValidityValues)[number];
  /**
   * The value attribute of the Checkbox
   */
  value?: string;
};

const Checkbox = ({
  ariaLabel,
  ariaLabelledBy,
  id: idOverride,
  isDefaultChecked = false,
  isDisabled,
  isIndeterminate,
  isRequired,
  label: labelProp,
  name: nameOverride,
  onChange: onChangeProp,
  validity = "inherit",
  value,
}: CheckboxProps) => {
  const { t } = useTranslation();
  const [isCheckedValue, setIsCheckedValue] = useState(isDefaultChecked);

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
    [onChangeProp]
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
      disabled={isDisabled}
      id={idOverride}
      label={label}
      name={nameOverride ? nameOverride : idOverride}
      onChange={onChange}
      value={value}
      required={isRequired}
    />
  );
};

const MemoizedCheckbox = memo(Checkbox);
MemoizedCheckbox.displayName = "Checkbox";

export { MemoizedCheckbox as Checkbox };
