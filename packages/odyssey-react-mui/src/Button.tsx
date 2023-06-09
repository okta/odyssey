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
import { memo, ReactElement, useContext, useMemo } from "react";

import { Icon } from "./Icon";
import { MuiPropsContext } from "./MuiPropsContext";
import { Tooltip } from "./Tooltip";

export type ButtonProps = {
  endIcon?: ReactElement<typeof Icon>;
  id?: string;
  isDisabled?: boolean;
  isFullWidth?: boolean;
  onClick?: MuiButtonProps["onClick"];
  size?: MuiButtonProps["size"];
  startIcon?: ReactElement<typeof Icon>;
  text?: string;
  /**
   * `tooltipText` determines the text of the tooltip that wraps the button if it's icon-only.
   */
  tooltipText?: string;
  variant?: "primary" | "secondary" | "danger" | "floating";
  ariaLabel?: string;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
};

const Button = ({
  endIcon,
  id,
  isDisabled,
  isFullWidth,
  onClick,
  size = "medium",
  startIcon,
  text,
  tooltipText,
  variant,
  ariaLabel,
  ariaLabelledBy,
  ariaDescribedBy,
}: ButtonProps) => {
  const muiProps = useContext(MuiPropsContext);

  const button = useMemo(
    () => (
      <MuiButton
        {...muiProps}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        disabled={isDisabled}
        endIcon={endIcon}
        fullWidth={isFullWidth}
        id={id}
        onClick={onClick}
        size={size}
        startIcon={startIcon}
        variant={variant}
      >
        {text}
      </MuiButton>
    ),
    [
      endIcon,
      id,
      isDisabled,
      isFullWidth,
      muiProps,
      onClick,
      size,
      startIcon,
      text,
      variant,
      ariaLabel,
      ariaLabelledBy,
      ariaDescribedBy,
    ]
  );

  return (
    <>
      {tooltipText && (
        <Tooltip ariaType="description" placement="top" text={tooltipText}>
          {button}
        </Tooltip>
      )}
      {!tooltipText && button}
    </>
  );
};

const MemoizedButton = memo(Button);

export { MemoizedButton as Button };
