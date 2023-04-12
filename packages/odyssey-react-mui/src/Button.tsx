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

import { Button as MuiButton } from "@mui/material";
import type { ButtonProps as MuiButtonProps } from "@mui/material";
import { Tooltip } from "./";
import { memo } from "react";

export type ButtonProps = {
  children?: React.ReactNode;
  disabled?: boolean;
  endIcon?: React.ReactNode;
  fullWidth?: boolean;
  id?: string;
  onClick?: MuiButtonProps["onClick"];
  size?: "small" | "medium" | "large";
  startIcon?: React.ReactNode;
  tooltipText?: string;
  variant?: "primary" | "secondary" | "danger" | "floating";
};

const Button = ({ children, tooltipText }: ButtonProps) => (
  <>
    {tooltipText && (
      <Tooltip describeChild placement="top" title={tooltipText}>
        <MuiButton>{children}</MuiButton>
      </Tooltip>
    )}
    {!tooltipText && <MuiButton>{children}</MuiButton>}
  </>
);

const MemoizedButton = memo(Button);

export { MemoizedButton as Button };
