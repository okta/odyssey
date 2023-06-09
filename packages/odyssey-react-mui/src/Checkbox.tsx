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

import { Checkbox as MuiCheckbox, Typography } from "@mui/material";
import { ChangeEventHandler, memo, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { FormControlLabel } from ".";

export type CheckboxProps = {
  ariaLabel?: string;
  ariaLabelledBy?: string;
  isInvalid?: boolean;
  isValid?: boolean;
  isChecked?: boolean;
  isDisabled?: boolean;
  isIndeterminate?: boolean;
  isRequired?: boolean;
  label?: string;
  name?: string;
  onChange?: ChangeEventHandler<EventTarget>;
  value?: string;
};

const Checkbox = ({
  ariaLabel,
  ariaLabelledBy,
  isInvalid,
  isValid,
  isChecked,
  isDisabled,
  isIndeterminate,
  isRequired,
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

export { MemoizedCheckbox as Checkbox };
