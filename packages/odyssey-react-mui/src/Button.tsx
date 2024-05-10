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
  HTMLAttributes,
  memo,
  ReactElement,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";

import { useButton } from "./ButtonContext";
import type { HtmlProps } from "./HtmlProps";
import { FocusHandle } from "./inputUtils";
import {
  MuiPropsContext,
  MuiPropsContextType,
  useMuiProps,
} from "./MuiPropsContext";
import { Tooltip } from "./Tooltip";

export const buttonSizeValues = ["small", "medium", "large"] as const;
export const buttonTypeValues = ["button", "submit", "reset"] as const;
export const buttonVariantValues = [
  "primary",
  "secondary",
  "danger",
  "floating",
] as const;

export type ButtonProps = {
  /**
   * The ref forwarded to the Button
   */
  buttonRef?: React.RefObject<FocusHandle>;
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
  tabIndex?: HTMLAttributes<HTMLElement>["tabIndex"];
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
  variant: (typeof buttonVariantValues)[number] | "tertiary";
} & (
  | {
      /**
       * The icon element to display at the end of the Button
       */
      endIcon?: ReactElement;
      /**
       * The text content of the Button
       */
      label: string;
      /**
       * The icon element to display at the start of the Button
       */
      startIcon?: ReactElement;
    }
  | {
      /**
       * The icon element to display at the end of the Button
       */
      endIcon?: ReactElement;
      /**
       * The text content of the Button
       */
      label?: string | "" | undefined;
      /**
       * The icon element to display at the start of the Button
       */
      startIcon: ReactElement;
    }
  | {
      /**
       * The icon element to display at the end of the Button
       */
      endIcon: ReactElement;
      /**
       * The text content of the Button
       */
      label?: never;
      /**
       * The icon element to display at the start of the Button
       */
      startIcon?: ReactElement;
    }
) &
  Pick<
    HtmlProps,
    | "ariaControls"
    | "ariaDescribedBy"
    | "ariaExpanded"
    | "ariaHasPopup"
    | "ariaLabel"
    | "ariaLabelledBy"
    | "tabIndex"
    | "testId"
    | "translate"
  >;

const Button = ({
  ariaControls,
  ariaDescribedBy,
  ariaExpanded,
  ariaHasPopup,
  ariaLabel,
  ariaLabelledBy,
  buttonRef,
  endIcon,
  id,
  isDisabled,
  isFullWidth: isFullWidthProp,
  label = "",
  onClick,
  size = "medium",
  startIcon,
  tabIndex,
  testId,
  tooltipText,
  translate,
  type = "button",
  variant: variantProp,
}: ButtonProps) => {
  const muiProps = useMuiProps();

  // We're deprecating the "tertiary" variant, so map it to
  // "secondary" in lieu of making a breaking change
  const variant = variantProp === "tertiary" ? "secondary" : variantProp;
  const localButtonRef = useRef<HTMLButtonElement>();
  const buttonContext = useButton();
  const isFullWidth = useMemo(
    () =>
      buttonContext.isFullWidth ? buttonContext.isFullWidth : isFullWidthProp,
    [buttonContext, isFullWidthProp],
  );

  useImperativeHandle(
    buttonRef,
    () => {
      return {
        focus: () => {
          localButtonRef.current?.focus();
        },
      };
    },
    [],
  );

  const renderButton = useCallback(
    (muiProps: MuiPropsContextType) => {
      return (
        <MuiButton
          {...muiProps}
          aria-controls={ariaControls}
          aria-describedby={ariaDescribedBy}
          aria-expanded={ariaExpanded}
          aria-haspopup={ariaHasPopup}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          data-se={testId}
          disabled={isDisabled}
          endIcon={endIcon}
          fullWidth={isFullWidth}
          id={id}
          onClick={onClick}
          ref={(element) => {
            if (element) {
              localButtonRef.current = element;
              //@ts-expect-error ref is not an optional prop on the props context type
              muiProps?.ref?.(element);
            }
          }}
          size={size}
          startIcon={startIcon}
          tabIndex={tabIndex}
          translate={translate}
          type={type}
          variant={variant}
        >
          {label}
        </MuiButton>
      );
    },
    [
      ariaControls,
      ariaDescribedBy,
      ariaExpanded,
      ariaHasPopup,
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
      tabIndex,
      testId,
      translate,
      type,
      variant,
    ],
  );

  if (tooltipText) {
    return (
      <Tooltip ariaType="description" placement="top" text={tooltipText}>
        <MuiPropsContext.Consumer>{renderButton}</MuiPropsContext.Consumer>
      </Tooltip>
    );
  }

  return renderButton(muiProps);
};

const MemoizedButton = memo(Button);
MemoizedButton.displayName = "Button";

export { MemoizedButton as Button };
