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
import { memo, ReactElement, useCallback, useContext } from "react";

import { MuiPropsContext } from "./MuiPropsContext";
import { Tooltip } from "./Tooltip";

export const buttonSizeValues = ["small", "medium", "large"] as const;
export const buttonTypeValues = ["button", "submit", "reset"] as const;
export const buttonVariantValues = [
  "primary",
  "secondary",
  "tertiary",
  "danger",
  "floating",
] as const;

export type ButtonProps = {
  /**
   * The ARIA label for the Button
   */
  ariaLabel?: string;
  /**
   * The ID of the element that labels the Button
   */
  ariaLabelledBy?: string;
  /**
   * The ID of the element that describes the Button
   */
  ariaDescribedBy?: string;
  /**
   * The icon element to display at the end of the Button
   */
  endIcon?: ReactElement;
  /**
   * The ID of the Button
   */
  id?: string;
  /**
   * Determines whether the Button is disabled
   */
  isDisabled?: boolean;
  /**
   * Determines whether the Button should take up the full available width
   */
  isFullWidth?: boolean;
  /**
   * The click event handler for the Button
   */
  onClick?: MuiButtonProps["onClick"];
  /**
   * The size of the button
   */
  size?: (typeof buttonSizeValues)[number];
  /**
   * The icon element to display at the start of the Button
   */
  startIcon?: ReactElement;
  /**
   * The text content of the Button
   */
  text?: string;
  /**
   * The tooltip text for the Button if it's icon-only
   */
  tooltipText?: string;
  /**
   * The type of the HTML button element
   */
  type?: (typeof buttonTypeValues)[number];
  /**
   * The variant of the Button
   */
  variant: (typeof buttonVariantValues)[number];
} & (
  | {
      text: string;
      startIcon?: ReactElement;
      endIcon?: ReactElement;
    }
  | {
      text?: undefined | "";
      startIcon: ReactElement;
      endIcon?: ReactElement;
    }
  | {
      text?: undefined | "";
      startIcon?: ReactElement;
      endIcon: ReactElement;
    }
);

const Button = ({
  ariaDescribedBy,
  ariaLabel,
  ariaLabelledBy,
  endIcon,
  id,
  isDisabled,
  isFullWidth,
  onClick,
  size = "medium",
  startIcon,
  text = "",
  tooltipText,
  type = "button",
  variant,
}: ButtonProps) => {
  const muiProps = useContext(MuiPropsContext);

  const renderButton = useCallback(
    (muiProps) => (
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
        type={type}
        variant={variant}
      >
        {text}
      </MuiButton>
    ),
    [
      ariaLabel,
      ariaLabelledBy,
      ariaDescribedBy,
      endIcon,
      id,
      isDisabled,
      isFullWidth,
      onClick,
      size,
      startIcon,
      text,
      type,
      variant,
    ]
  );

  return (
    <>
      {tooltipText && (
        <Tooltip ariaType="description" placement="top" text={tooltipText}>
          <MuiPropsContext.Consumer>{renderButton}</MuiPropsContext.Consumer>
        </Tooltip>
      )}

      {!tooltipText && renderButton(muiProps)}
    </>
  );
};

const MemoizedButton = memo(Button);
MemoizedButton.displayName = "Button";

export { MemoizedButton as Button };
