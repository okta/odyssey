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

import { Checkbox as MuiCheckbox, FormControlLabel } from "@mui/material";
import { Typography } from "./Typography";
import { ChangeEventHandler, memo, useMemo } from "react";
import { useTranslation } from "react-i18next";

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
   * Determines whether the Checkbox is checked
   */
  isChecked?: boolean;
  /**
   * Determines whether the Checkbox is disabled
   */
  isDisabled?: boolean;
  /**
   * Determines whether the Checkbox is in an indeterminate state
   */
  isIndeterminate?: boolean;
  /**
   * Determines whether the Checkbox has an invalid value
   */
  isInvalid?: boolean;
  /**
   * Determines whether the Checkbox is required
   */
  isRequired?: boolean;
  /**
   * Determines whether the Checkbox has a valid value
   */
  isValid?: boolean;
  /**
   * The label text for the Checkbox
   */
  label?: string;
  /**
   * The name attribute of the Checkbox
   */
  name?: string;
  /**
   * The change event handler for the Checkbox
   */
  onChange?: ChangeEventHandler<EventTarget>;
  /**
   * The value attribute of the Checkbox
   */
  value?: string;
};

const Checkbox = ({
  ariaLabel,
  ariaLabelledBy,
  isChecked,
  isDisabled,
  isIndeterminate,
  isInvalid,
  isRequired,
  isValid,
  label: labelProp,
  name,
  onChange,
  value,
}: CheckboxProps) => {
  const { t } = useTranslation();

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

  return (
    <FormControlLabel
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      checked={isChecked}
      className={isInvalid ? "Mui-error" : isValid ? "Mui-valid" : ""}
      control={
        <MuiCheckbox indeterminate={isIndeterminate} required={isRequired} />
      }
      disabled={isDisabled}
      label={label}
      name={name}
      onChange={onChange}
      value={value}
      required={isRequired}
    />
  );
};

const MemoizedCheckbox = memo(Checkbox);
MemoizedCheckbox.displayName = "Checkbox";

export { MemoizedCheckbox as Checkbox };
