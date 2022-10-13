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

import { forwardRef, useState, useMemo } from "react";
import type { Ref, ChangeEvent, MouseEvent } from "react";
import type { OutlinedInputProps, TooltipProps } from "@mui/material";
import {
  Tooltip,
  IconButton,
  Box,
  InputLabel,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useUniqueId } from "../../utils";

interface State {
  password: string;
  showPassword: boolean;
}

export interface PasswordInputProps
  extends Omit<OutlinedInputProps, "type" | "label" | "defaultValue" | "ref"> {
  ref?: Ref<HTMLInputElement>;
  defaultValue?: string;
  label: string;
  tooltipLabel?:
    | TooltipProps["title"]
    | ((isHidden: boolean) => TooltipProps["title"]);
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (props, ref) => {
    const {
      tooltipLabel,
      id,
      label,
      defaultValue: password = "",
      inputProps,
      ...rest
    } = props;

    const [values, setValues] = useState<State>({
      password,
      showPassword: false,
    });

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, password: event.target.value });
      props.onChange?.(event);
    };

    const handleClickShowPassword = () => {
      setValues({
        ...values,
        showPassword: !values.showPassword,
      });
    };

    const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    };

    const tooltipTitle = useMemo(() => {
      return typeof tooltipLabel === "function"
        ? tooltipLabel(values.showPassword === false)
        : tooltipLabel;
    }, [values, tooltipLabel]);

    const uniqueId = useUniqueId(id);

    return (
      <Box>
        <InputLabel htmlFor={uniqueId}>{label}</InputLabel>
        <OutlinedInput
          {...rest}
          id={uniqueId}
          inputProps={inputProps}
          inputRef={ref}
          onChange={handlePasswordChange}
          type={values.showPassword ? "text" : "password"}
          value={values.password}
          endAdornment={
            <InputAdornment position="end">
              <Tooltip title={tooltipTitle}>
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </Tooltip>
            </InputAdornment>
          }
        />
      </Box>
    );
  }
);
