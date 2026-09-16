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

import type { ButtonProps as MuiButtonProps } from "@mui/material";

import {
  Button as MuiButton,
  CircularProgress as MuiCircularProgress,
} from "@mui/material";
import {
  HTMLAttributes,
  memo,
  ReactElement,
  ReactNode,
  RefObject,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";

import type { HtmlProps } from "../HtmlProps.js";

import { FocusHandle } from "../inputUtils.js";
import {
  MuiPropsContext,
  MuiPropsContextType,
  useMuiProps,
} from "../MuiPropsContext.js";
import { useOdysseyDesignTokens } from "../OdysseyDesignTokensContext.js";
import { Tooltip } from "../Tooltip.js";
import { useButton } from "./ButtonContext.js";

export const buttonSizeValues = ["small", "medium", "large"] as const;
export const buttonTypeValues = ["button", "submit", "reset"] as const;
export const buttonVariantValues = [
  "primary",
  "secondary",
  "danger",
  "dangerSecondary",
  "floating",
  "floatingAction",
] as const;

export type BaseButtonProps = {
  /**
   * Ref attached to the underlying button element, exposing a `focus()` handle.
   */
  buttonRef?: RefObject<FocusHandle>;
  /**
   * The contents of the button. Only available internal to Odyssey here in BaseButton. If set,
   * label is ignored.
   */
  children?: ReactNode;
  /**
   * The icon element to display at the end of the Button
   */
  endIcon?: ReactElement;
  /**
   * Optional href to render the button as a link
   */
  href?: string;
  /**
   * The ID of the Button
   */
  id?: string;
  /**
   * If `true`, the button is disabled and cannot be activated.
   */
  isDisabled?: boolean;
  /**
   * If `true`, the button expands to fill its container's full width.
   */
  isFullWidth?: boolean;
  /**
   * If `true`, the button shows a progress spinner in place of its start icon
   * and stops responding to clicks, while keeping the background and border of
   * its default state. To reword the button while it works (for example
   * `"Saving…"`), swap `label` alongside this.
   */
  isLoading?: boolean;
  /**
   * The text content of the Button.
   * @default ""
   */
  label?: string;
  /**
   * Called when the button is clicked.
   */
  onClick?: MuiButtonProps["onClick"];
  /**
   * The size of the button.
   * @default "medium"
   */
  size?: (typeof buttonSizeValues)[number];
  /**
   * The icon element to display at the start of the Button
   */
  startIcon?: ReactElement;
  /** The tab order of the Button relative to other focusable elements. */
  tabIndex?: HTMLAttributes<HTMLElement>["tabIndex"];
  /**
   * The tooltip text for the Button if it's icon-only
   */
  tooltipText?: string;
  /**
   * The HTML button type attribute.
   * - If `'button'`, no default form behavior.
   * - If `'submit'`, submits the nearest form.
   * - If `'reset'`, resets the nearest form to its initial values.
   * @default "button"
   */
  type?: (typeof buttonTypeValues)[number];
  /**
   * Controls the visual hierarchy and intent of the button.
   * - If `'primary'`, high-emphasis action; use for the single most important action on a page.
   * - If `'secondary'`, medium-emphasis action; use for secondary actions alongside a primary.
   * - If `'danger'`, high-emphasis destructive action.
   * - If `'dangerSecondary'`, medium-emphasis destructive action.
   * - If `'floating'`, low-emphasis action without a border or background.
   * - If `'floatingAction'`, icon-only floating action, typically fixed-positioned.
   * - If `'tertiary'`, deprecated low-emphasis style; use `'floating'` instead.
   */
  variant: (typeof buttonVariantValues)[number] | "tertiary";
};

// These are split and exported separately from the above because wrappers of this (e.g. Button) will
// want to omit children, which they cannot do from the combined union type. Instead, they should
// omit from BaseButtonProps, then union with the AdditionalBaseButtonProps (as seen in Button)
export type AdditionalBaseButtonProps = Pick<
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

/**
 * The internal base button primitive used by all Odyssey button variants. Handles icon placement,
 * full-width layout, tooltip wrapping, focus handle forwarding, and MUI prop context integration.
 */
const BaseButton = ({
  ariaControls,
  ariaDescribedBy,
  ariaExpanded,
  ariaHasPopup,
  ariaLabel,
  ariaLabelledBy,
  buttonRef,
  children,
  endIcon,
  href,
  id,
  isDisabled,
  isFullWidth: isFullWidthProp,
  isLoading,
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
}: BaseButtonProps & AdditionalBaseButtonProps) => {
  const muiProps = useMuiProps();

  // We're deprecating the "tertiary" variant, so map it to
  // "secondary" in lieu of making a breaking change
  const variant = variantProp === "tertiary" ? "secondary" : variantProp;
  const localButtonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const buttonContext = useButton();
  const odysseyDesignTokens = useOdysseyDesignTokens();
  const isFullWidth = useMemo(
    () =>
      buttonContext.isFullWidth ? buttonContext.isFullWidth : isFullWidthProp,
    [buttonContext, isFullWidthProp],
  );

  const buttonContent = children ?? label;

  const loadingIndicator = useMemo(
    () => (
      // Design specifies each variant's spinner color as that variant's own
      // label color, so `color="inherit"` keeps the two in step instead of
      // restating the palette per variant. MUI's CircularProgress is used
      // directly because Odyssey's wrapper deliberately exposes neither a size
      // nor a color prop, and design asked for the 16px sizing to stay internal
      // to Button. Stroke weight comes from the shared theme default, which
      // holds a 1:12 stroke-to-diameter ratio at any size.
      <MuiCircularProgress
        aria-hidden
        color="inherit"
        size={odysseyDesignTokens.Spacing4}
      />
    ),
    [odysseyDesignTokens],
  );

  // An inert button keeps its `href` so it stays focusable and keeps its link
  // role, which leaves the browser's own activation as the thing to stop:
  // `pointer-events: none` from the theme only blocks the mouse, and because
  // `aria-disabled` is advisory, Enter still dispatches a click that would
  // follow the link or submit the form. Preventing the default on that click
  // covers every input method without swapping the element out.
  const handleClick = useCallback<NonNullable<MuiButtonProps["onClick"]>>(
    (event) => {
      if (isLoading || isDisabled) {
        event.preventDefault();
        return;
      }

      onClick?.(event);
    },
    [isDisabled, isLoading, onClick],
  );

  useImperativeHandle(
    buttonRef,
    () => ({
      focus: () => {
        localButtonRef.current?.focus();
      },
    }),
    [],
  );

  const renderButton = useCallback(
    (muiProps: MuiPropsContextType) => {
      return (
        <MuiButton
          {...muiProps}
          aria-busy={isLoading}
          aria-controls={ariaControls}
          aria-describedby={ariaDescribedBy}
          aria-disabled={isLoading || isDisabled}
          aria-expanded={ariaExpanded}
          aria-haspopup={ariaHasPopup}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          data-se={testId}
          endIcon={endIcon}
          fullWidth={isFullWidth}
          href={href}
          id={id}
          onClick={handleClick}
          ref={(element) => {
            if (element) {
              (
                localButtonRef as React.MutableRefObject<
                  HTMLButtonElement | HTMLAnchorElement
                >
              ).current = element;
              //@ts-expect-error ref is not an optional prop on the props context type
              muiProps?.ref?.(element);
            }
          }}
          size={size}
          startIcon={isLoading ? loadingIndicator : startIcon}
          tabIndex={tabIndex}
          translate={translate}
          type={type}
          variant={variant}
        >
          {buttonContent}
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
      buttonContent,
      endIcon,
      handleClick,
      href,
      id,
      isDisabled,
      isFullWidth,
      isLoading,
      loadingIndicator,
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

const MemoizedBaseButton = memo(BaseButton);
MemoizedBaseButton.displayName = "BaseButton";

export { MemoizedBaseButton as BaseButton };
