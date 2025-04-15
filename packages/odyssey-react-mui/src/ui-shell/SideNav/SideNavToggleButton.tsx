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
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";

// import {
//   generateContrastColors,
// } from "../../createContrastColors.js";
import { MuiPropsContext, MuiPropsContextType } from "../../MuiPropsContext.js";
import {
  DesignTokens,
  useOdysseyDesignTokens,
} from "../../OdysseyDesignTokensContext.js";
import { Tooltip } from "../../Tooltip.js";
// import { useUiShellContext } from "../../ui-shell/UiShellProvider.js";
import { UI_SHELL_OVERLAY_Z_INDEX } from "../uiShellSharedConstants.js";
import { ChevronRightIcon } from "../../icons.generated/ChevronRight.js";

export const SIDE_NAV_TOGGLE_ICON_SIZE = 24;
export const SIDE_NAV_TOGGLE_ICON_HALF_SIZE = SIDE_NAV_TOGGLE_ICON_SIZE / 2;

const StyledToggleButton = styled(MuiButton, {
  shouldForwardProp: (prop) =>
    prop !== "clickAreaPadding" && prop !== "odysseyDesignTokens",
})<{
  clickAreaPadding?: number;
  odysseyDesignTokens: DesignTokens;
}>(({ clickAreaPadding = 0, odysseyDesignTokens }) => ({
  border: 0,
  height: `${SIDE_NAV_TOGGLE_ICON_SIZE}px`,
  left: `-${clickAreaPadding}px`,
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
    left: `${clickAreaPadding}px`,
    position: "absolute",
    top: 0,
    width: `${SIDE_NAV_TOGGLE_ICON_SIZE}px`,
  },

  "&:hover::before, &:focus-visible::before": {
    backgroundColor: odysseyDesignTokens.PalettePrimaryText,
  },

  // "&:hover, &:focus-visible": {
  // backgroundColor: "transparent",

  // "#lineOne": {
  //   animation: `lineOne-animate-to-collapse ${odysseyDesignTokens.TransitionDurationMain} cubic-bezier(0, 0, 0.2, 1)`,
  //   animationFillMode: "forwards",
  //   "@keyframes lineOne-animate-to-collapse": {
  //     "0%": {
  //       transform: "translate3d(-50%, -50%, 0)",
  //     },
  //     "50%": {
  //       transform: "translate3d(-50%, -50%, 0) rotate(-90deg) scaleY(.75)",
  //     },
  //     "100%": {
  //       transform: "translate3d(-50%, -27%, 0) rotate(-45deg) scaleY(.75)",
  //     },
  //   },
  // },

  // "#lineTwo": {
  //   animation: `lineTwo-animate-to-collapse ${odysseyDesignTokens.TransitionDurationMain} cubic-bezier(0, 0, 0.2, 1)`,
  //   animationFillMode: "forwards",
  //   "@keyframes lineTwo-animate-to-collapse": {
  //     "0%": {
  //       transform: "translate3d(-50%, -50%, 0)",
  //     },
  //     "50%": {
  //       transform: "translate3d(-50%, -50%, 0) rotate(-90deg) scaleY(.75)",
  //     },
  //     "100%": {
  //       transform: "translate3d(-50%, -73%, 0) rotate(-135deg) scaleY(.75)",
  //     },
  //   },
  // },

  // ...(isSideNavCollapsed && {
  //   "#lineOne": {
  //     animation: `lineOne-animate-to-expand ${odysseyDesignTokens.TransitionDurationMain} cubic-bezier(0, 0, 0.2, 1)`,
  //     animationFillMode: "forwards",
  //     "@keyframes lineOne-animate-to-expand": {
  //       "0%": {
  //         transform: "translate3d(-50%, -50%, 0)",
  //       },
  //       "50%": {
  //         transform: "translate3d(-50%, -50%, 0) rotate(90deg) scaleY(.75)",
  //       },
  //       "100%": {
  //         transform: "translate3d(-50%, -73%, 0) rotate(135deg) scaleY(.75)",
  //       },
  //     },
  //   },

  //   "#lineTwo": {
  //     animation: `lineTwo-animate-to-expand ${odysseyDesignTokens.TransitionDurationMain} cubic-bezier(0, 0, 0.2, 1)`,
  //     animationFillMode: "forwards",
  //     "@keyframes lineTwo-animate-to-expand": {
  //       "0%": {
  //         transform: "translate3d(-50%, -50%, 0)",
  //       },
  //       "50%": {
  //         transform: "translate3d(-50%, -50%, 0) rotate(90deg) scaleY(.75)",
  //       },
  //       "100%": {
  //         transform: "translate3d(-50%, -27%, 0) rotate(45deg) scaleY(.75)",
  //       },
  //     },
  //   },
  // }),
  // }

  // span: {
  //   position: "absolute",
  //   top: "50%",
  //   left: "50%",
  //   width: "2px",
  //   height: odysseyDesignTokens.Spacing4,
  //   backgroundColor: odysseyDesignTokens.HueNeutral600,
  //   transform: "translate3d(-50%, -50%, 0)",
  //   transition: `transform ${odysseyDesignTokens.TransitionDurationMain}`,

  //   ...(toggleContrastColors?.fontColor && {
  //     backgroundColor: toggleContrastColors.fontColor,
  //   }),
  // },

  // "&::before": {
  //   border: "1px solid #CBCBCB",
  //   borderRadius: "50%",
  //   boxShadow: "0px 8px 30px 0px #1D1D211A, 0px 4px 10px 0px #1D1D2114, 0px 1px 4px 0px #1D1D2114",
  //   content: "''",
  //   height: "24px",
  //   position: "absolute",
  //   width: "24px",

  //   backgroundColor: "white",
  // },
}));

const StyledChevronRightIcon = styled(ChevronRightIcon, {
  shouldForwardProp: (prop) =>
    prop !== "odysseyDesignTokens" && prop !== "isSideNavCollapsed",
})<{
  isSideNavCollapsed: boolean;
  odysseyDesignTokens: DesignTokens;
}>(({ isSideNavCollapsed, odysseyDesignTokens }) => ({
  fontSize: "1.3rem", // TODO: Make this the correct `font-size`.
  position: "absolute",
  transform: isSideNavCollapsed ? "rotate(0deg)" : "rotate(-180deg)", // Leave this as `-180deg` so it rotates over the top, not the bottom.
  transitionDuration: `${odysseyDesignTokens.TransitionDurationMain}`,
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
  clickAreaPadding: number;
  /**
   * HTML `id` attribute for the `<button>` element.
   */
  id?: string;
  isSideNavCollapsed: boolean;
  tabIndex?: HTMLAttributes<HTMLElement>["tabIndex"];
  /**
   * Click event handler for the `<button>` element.
   */
  onClick?: MuiButtonProps["onClick"];
  /**
   * Provides the hovered or focused state of the `<button>` element.
   */
  onHighlight?: (isHighlighted: boolean) => void;
  onKeyDown?: MuiButtonProps["onKeyDown"];
};

// This allows us to mutate the value with TypeScript. A singleton is fine because it gets overridden on render.
const defaultLocalButton = document.createElement("button");

const SideNavToggleButton = ({
  ariaControls,
  clickAreaPadding,
  id,
  isSideNavCollapsed,
  onClick,
  onHighlight,
  tabIndex,
}: SideNavToggleButtonProps) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();
  const { t } = useTranslation();
  // const uiShellContext = useUiShellContext();

  const buttonRef = useRef(defaultLocalButton);

  // const toggleContrastColors = useMemo(() => {
  //   const hasNonStandardAppBackgroundColor =
  //     uiShellContext?.appBackgroundColor &&
  //     uiShellContext?.appBackgroundColor !==
  //       odysseyDesignTokens.HueNeutralWhite &&
  //     uiShellContext?.appBackgroundColor !== odysseyDesignTokens.HueNeutral50;

  //   if (hasNonStandardAppBackgroundColor) {
  //     return generateContrastColors(
  //       uiShellContext.appBackgroundColor,
  //       odysseyDesignTokens,
  //     );
  //   }

  //   return undefined;
  // }, [odysseyDesignTokens, uiShellContext]);

  useEffect(() => {
    const setHighlighted = () => {
      onHighlight?.(true);
    };

    const setUnhighlighted = () => {
      onHighlight?.(false);
    };

    const setFocusHighlighted = () => {
      onHighlight?.(buttonRef.current.matches(":focus-visible"));
    };

    buttonRef.current.addEventListener("mouseenter", setHighlighted);

    buttonRef.current.addEventListener("mouseleave", setUnhighlighted);

    buttonRef.current.addEventListener("focus", setFocusHighlighted, true);

    buttonRef.current.addEventListener("blur", setFocusHighlighted, true);

    setUnhighlighted();

    return () => {
      buttonRef.current.removeEventListener("mouseenter", setHighlighted);

      buttonRef.current.removeEventListener("mouseleave", setUnhighlighted);

      buttonRef.current.removeEventListener("focus", setFocusHighlighted, true);

      buttonRef.current.removeEventListener("blur", setFocusHighlighted, true);
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
          // isSideNavCollapsed={isSideNavCollapsed}
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
          // toggleContrastColors={toggleContrastColors}
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
