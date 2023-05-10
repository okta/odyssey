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

import { FormControlLabel } from ".";

export type CheckboxProps = {
  ariaLabel?: string;
  ariaLabelledBy?: string;
  hasError?: boolean;
  isChecked?: boolean;
  isDefaultChecked?: boolean;
  isDisabled?: boolean;
  isIndeterminate?: boolean;
  isRequired?: boolean;
  label?: string;
  name?: string;
  onChange?: ChangeEventHandler<EventTarget>;
  requiredLabel?: string;
  value?: string;
};

const Checkbox = ({
  ariaLabel,
  ariaLabelledBy,
  hasError,
  isChecked,
  isDefaultChecked,
  isDisabled,
  isIndeterminate,
  isRequired,
  label: labelProp,
  name,
  onChange,
  requiredLabel = "Required",
  value,
}: CheckboxProps) => {
  const label = useMemo(() => {
    if (isRequired) {
      return (
        <>
          {labelProp}{" "}
          <Typography component="span" color="textSecondary">
            ({requiredLabel})
          </Typography>
        </>
      );
    } else {
      return <>{labelProp}</>;
    }
  }, [isRequired, labelProp, requiredLabel]);

  return (
    <FormControlLabel
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      aria-required={isRequired}
      checked={isChecked}
      className={hasError ? "Mui-error" : ""}
      control={
        <MuiCheckbox indeterminate={isIndeterminate} required={isRequired} />
      }
      defaultChecked={isDefaultChecked}
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
