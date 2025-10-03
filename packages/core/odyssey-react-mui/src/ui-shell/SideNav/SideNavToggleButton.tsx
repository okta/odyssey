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

import styled from "@emotion/styled";
import { Button as MuiButton } from "@mui/material";
import {
  HTMLAttributes,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";

import { useTranslation } from "../../i18n.generated/i18n.js";
import { ChevronRightIcon } from "../../icons.generated/ChevronRight.js";
import { MuiPropsContext, MuiPropsContextType } from "../../MuiPropsContext.js";
import {
  DesignTokens,
  useOdysseyDesignTokens,
} from "../../OdysseyDesignTokensContext.js";
import { Tooltip } from "../../Tooltip.js";
import { UI_SHELL_OVERLAY_Z_INDEX } from "../uiShellSharedConstants.js";

export const SIDE_NAV_TOGGLE_ICON_SIZE = 24;
export const SIDE_NAV_TOGGLE_ICON_HALF_SIZE = SIDE_NAV_TOGGLE_ICON_SIZE / 2;

const StyledToggleButton = styled(MuiButton, {
  shouldForwardProp: (prop) =>
    prop !== "clickAreaPadding" && prop !== "odysseyDesignTokens",
})<{
  clickAreaPadding: number;
  odysseyDesignTokens: DesignTokens;
}>(({ clickAreaPadding, odysseyDesignTokens }) => ({
  border: 0,
  height: `${SIDE_NAV_TOGGLE_ICON_SIZE}px`,
  left: `-${clickAreaPadding * 2}px`,
  padding: 0,
  position: "relative",
  width: `calc(${SIDE_NAV_TOGGLE_ICON_SIZE}px + (${clickAreaPadding}px * 2))`,
  zIndex: UI_SHELL_OVERLAY_Z_INDEX,

  // `&&` is a CSS specificity override. Used here to counteract MUI Button styles.
  "&&": {
    backgroundColor: "transparent",
    borderColor: "transparent",
    boxShadow: "none",
    color: odysseyDesignTokens.PalettePrimaryText,
  },

  "&:focus-visible": {
    outline: "none",
  },

  "&:hover, &:focus-visible": {
    color: odysseyDesignTokens.HueNeutralWhite,
  },

  "&::before": {
    backgroundColor: odysseyDesignTokens.HueNeutralWhite,
    borderColor: "transparent",
    borderRadius: "50%",
    boxShadow: odysseyDesignTokens.ShadowScale1,
    color: odysseyDesignTokens.PalettePrimaryText,
    content: "''",
    height: `${SIDE_NAV_TOGGLE_ICON_SIZE}px`,
    left: `${clickAreaPadding * 2}px`,
    position: "absolute",
    top: 0,
    width: `${SIDE_NAV_TOGGLE_ICON_SIZE}px`,
  },

  "&:hover::before, &:focus-visible::before": {
    backgroundColor: odysseyDesignTokens.PalettePrimaryText,
  },
}));

const StyledChevronRightIcon = styled(ChevronRightIcon, {
  shouldForwardProp: (prop) =>
    prop !== "odysseyDesignTokens" && prop !== "isSideNavCollapsed",
})<{
  isSideNavCollapsed: boolean;
  odysseyDesignTokens: DesignTokens;
}>(({ isSideNavCollapsed, odysseyDesignTokens }) => ({
  fontSize: "125%",
  left: isSideNavCollapsed ? undefined : "4px",
  position: "absolute",
  right: isSideNavCollapsed ? "4px" : undefined,
  top: "3px",
  transform: isSideNavCollapsed ? "rotate(0deg)" : "rotate(-180deg)", // Leave this as `-180deg` so it rotates over the top, not the bottom.
  transitionDuration: odysseyDesignTokens.TransitionDurationMain,
  transitionProperty: "transform",
  transitionTimingFunction: "ease-in-out",
}));

export type SideNavToggleButtonProps = {
  /**
   * The `id` of the item this button controls
   */
  ariaControls: string;
  /**
   * Left padding in pixels for the click area of the button.
   *
   * Useful when moving the button around when trying to click it. This ensures the click area doesn't move to the right along with the button.
   */
  clickAreaPadding?: number;
  /**
   * HTML `id` attribute for the `<button>` element.
   */
  id?: string;
  isSideNavCollapsed: boolean;
  /**
   * Click event handler for the `<button>` element.
   */
  onClick?: MuiButtonProps["onClick"];
  /**
   * Provides the hovered or focused state of the `<button>` element.
   */
  onHighlight?: (isHighlighted: boolean) => void;
  onKeyDown?: MuiButtonProps["onKeyDown"];
  tabIndex?: HTMLAttributes<HTMLElement>["tabIndex"];
};

// This allows us to mutate the value with TypeScript. A singleton is fine because it gets overridden on render.
const defaultLocalButton =
  typeof window === "undefined" ? null : document.createElement("button");

const SideNavToggleButton = ({
  ariaControls,
  clickAreaPadding = 0,
  id,
  isSideNavCollapsed,
  onClick,
  onHighlight,
  tabIndex,
}: SideNavToggleButtonProps) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();
  const { t } = useTranslation();

  const buttonRef = useRef(defaultLocalButton);

  useEffect(() => {
    const setHighlighted = () => {
      onHighlight?.(true);
    };

    const setUnhighlighted = () => {
      onHighlight?.(false);
    };

    const setFocusHighlighted = () => {
      onHighlight?.(Boolean(buttonRef.current?.matches(":focus-visible")));
    };

    buttonRef.current?.addEventListener("mouseenter", setHighlighted);

    buttonRef.current?.addEventListener("mouseleave", setUnhighlighted);

    buttonRef.current?.addEventListener("focus", setFocusHighlighted, true);

    buttonRef.current?.addEventListener("blur", setFocusHighlighted, true);

    setUnhighlighted();

    return () => {
      buttonRef.current?.removeEventListener("mouseenter", setHighlighted);

      buttonRef.current?.removeEventListener("mouseleave", setUnhighlighted);

      buttonRef.current?.removeEventListener(
        "focus",
        setFocusHighlighted,
        true,
      );

      buttonRef.current?.removeEventListener("blur", setFocusHighlighted, true);
    };
  }, [onHighlight]);

  const toggleLabel = useMemo(
    () =>
      isSideNavCollapsed
        ? t("sidenav.toggle.expand")
        : t("sidenav.toggle.collapse"),
    [isSideNavCollapsed, t],
  );

  const renderButton = useCallback(
    (muiProps: MuiPropsContextType) => {
      return (
        <StyledToggleButton
          {...muiProps}
          aria-controls={ariaControls}
          aria-expanded={!isSideNavCollapsed}
          aria-label={toggleLabel}
          clickAreaPadding={clickAreaPadding}
          data-se="sidenav-toggle-button"
          data-sidenav-toggle
          id={id}
          odysseyDesignTokens={odysseyDesignTokens}
          onClick={onClick}
          ref={(element: HTMLButtonElement) => {
            if (element) {
              buttonRef.current = element;
              //@ts-expect-error `ref` is an optional prop, but TypeScript doesn't know this.
              muiProps.ref?.(element);
            }
          }}
          tabIndex={tabIndex}
          variant="floating"
        >
          <StyledChevronRightIcon
            isSideNavCollapsed={isSideNavCollapsed}
            odysseyDesignTokens={odysseyDesignTokens}
          />
        </StyledToggleButton>
      );
    },
    [
      ariaControls,
      clickAreaPadding,
      id,
      isSideNavCollapsed,
      odysseyDesignTokens,
      onClick,
      tabIndex,
      toggleLabel,
    ],
  );

  return (
    <Tooltip ariaType="description" placement="right" text={toggleLabel}>
      <MuiPropsContext.Consumer>{renderButton}</MuiPropsContext.Consumer>
    </Tooltip>
  );
};

const MemoizedSideNavToggleButton = memo(SideNavToggleButton);
MemoizedSideNavToggleButton.displayName = "SideNavToggleButton";

export { MemoizedSideNavToggleButton as SideNavToggleButton };
