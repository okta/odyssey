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
import {
  memo,
  ReactElement,
  useCallback,
  useImperativeHandle,
  useRef,
} from "react";

import { MuiPropsContext, useMuiProps } from "./MuiPropsContext";
import { Tooltip } from "./Tooltip";
import type { AllowedProps } from "./AllowedProps";
import { FocusHandle } from "./inputUtils";

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
   * The ref forwarded to the Button
   */
  buttonRef?: React.RefObject<FocusHandle>;
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
   * The text content of the Button
   */
  label?: string;
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
      endIcon?: ReactElement;
      label: string;
      startIcon?: ReactElement;
    }
  | {
      endIcon?: ReactElement;
      label?: "" | undefined;
      startIcon: ReactElement;
    }
  | {
      endIcon: ReactElement;
      label?: "" | undefined;
      startIcon?: ReactElement;
    }
) &
  AllowedProps;

const Button = ({
  ariaDescribedBy,
  ariaLabel,
  ariaLabelledBy,
  buttonRef,
  endIcon,
  id,
  isDisabled,
  isFullWidth,
  label = "",
  onClick,
  size = "medium",
  startIcon,
  testId,
  tooltipText,
  translate,
  type = "button",
  variant,
}: ButtonProps) => {
  const muiProps = useMuiProps();

  const localButtonRef = useRef<HTMLButtonElement>(null);
  useImperativeHandle(
    buttonRef,
    () => {
      return {
        focus: () => {
          localButtonRef.current?.focus();
        },
      };
    },
    []
  );

  const renderButton = useCallback(
    (muiProps) => (
      <MuiButton
        {...muiProps}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        data-se={testId}
        disabled={isDisabled}
        endIcon={endIcon}
        fullWidth={isFullWidth}
        id={id}
        onClick={onClick}
        ref={localButtonRef}
        size={size}
        startIcon={startIcon}
        translate={translate}
        type={type}
        variant={variant}
      >
        {label}
      </MuiButton>
    ),
    [
      ariaDescribedBy,
      ariaLabel,
      ariaLabelledBy,
      endIcon,
      id,
      isDisabled,
      isFullWidth,
      label,
      onClick,
      size,
      startIcon,
      testId,
      translate,
      type,
      variant,
    ]
  );

  return (
    <>
      {tooltipText && !isDisabled && (
        <Tooltip ariaType="description" placement="top" text={tooltipText}>
          <MuiPropsContext.Consumer>{renderButton}</MuiPropsContext.Consumer>
        </Tooltip>
      )}

      {(isDisabled || !tooltipText) && renderButton(muiProps)}
    </>
  );
};

const MemoizedButton = memo(Button);
MemoizedButton.displayName = "Button";

export { MemoizedButton as Button };
