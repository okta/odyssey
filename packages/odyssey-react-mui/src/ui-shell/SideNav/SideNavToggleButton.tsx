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
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";

import {
  ContrastColors,
  generateContrastColors,
} from "../../createContrastColors";
import { FocusHandle } from "../../inputUtils";
import { MuiPropsContext, MuiPropsContextType } from "../../MuiPropsContext";
import {
  DesignTokens,
  useOdysseyDesignTokens,
} from "../../OdysseyDesignTokensContext";
import { Tooltip } from "../../Tooltip";
import { useUiShellContrastColorContext } from "../../ui-shell/UiShellColorsProvider";

const StyledToggleButton = styled(MuiButton, {
  shouldForwardProp: (prop) =>
    prop !== "odysseyDesignTokens" &&
    prop !== "isSideNavCollapsed" &&
    prop !== "toggleContrastColors",
})<{
  isSideNavCollapsed: boolean;
  odysseyDesignTokens: DesignTokens;
  toggleContrastColors?: ContrastColors;
}>(({ isSideNavCollapsed, odysseyDesignTokens, toggleContrastColors }) => ({
  backgroundColor: "transparent",
  position: "relative",
  width: odysseyDesignTokens.Spacing6,
  height: odysseyDesignTokens.Spacing6,
  border: 0,
  zIndex: 2,

  "&:focus-visible": {
    boxShadow: `inset 0 0 0 2px ${odysseyDesignTokens.PalettePrimaryMain}`,
    outline: "none",
  },

  "&:hover, &:focus-visible": {
    backgroundColor: "transparent",

    "#lineOne": {
      animation: `lineOne-animate-to-collapse ${odysseyDesignTokens.TransitionDurationMain} cubic-bezier(0, 0, 0.2, 1)`,
      animationFillMode: "forwards",
      "@keyframes lineOne-animate-to-collapse": {
        "0%": {
          transform: "translate3d(-50%, -50%, 0)",
        },
        "50%": {
          transform: "translate3d(-50%, -50%, 0) rotate(-90deg) scaleY(.75)",
        },
        "100%": {
          transform: "translate3d(-50%, -27%, 0) rotate(-45deg) scaleY(.75)",
        },
      },
    },

    "#lineTwo": {
      animation: `lineTwo-animate-to-collapse ${odysseyDesignTokens.TransitionDurationMain} cubic-bezier(0, 0, 0.2, 1)`,
      animationFillMode: "forwards",
      "@keyframes lineTwo-animate-to-collapse": {
        "0%": {
          transform: "translate3d(-50%, -50%, 0)",
        },
        "50%": {
          transform: "translate3d(-50%, -50%, 0) rotate(-90deg) scaleY(.75)",
        },
        "100%": {
          transform: "translate3d(-50%, -73%, 0) rotate(-135deg) scaleY(.75)",
        },
      },
    },

    ...(isSideNavCollapsed && {
      "#lineOne": {
        animation: `lineOne-animate-to-expand ${odysseyDesignTokens.TransitionDurationMain} cubic-bezier(0, 0, 0.2, 1)`,
        animationFillMode: "forwards",
        "@keyframes lineOne-animate-to-expand": {
          "0%": {
            transform: "translate3d(-50%, -50%, 0)",
          },
          "50%": {
            transform: "translate3d(-50%, -50%, 0) rotate(90deg) scaleY(.75)",
          },
          "100%": {
            transform: "translate3d(-50%, -73%, 0) rotate(135deg) scaleY(.75)",
          },
        },
      },

      "#lineTwo": {
        animation: `lineTwo-animate-to-expand ${odysseyDesignTokens.TransitionDurationMain} cubic-bezier(0, 0, 0.2, 1)`,
        animationFillMode: "forwards",
        "@keyframes lineTwo-animate-to-expand": {
          "0%": {
            transform: "translate3d(-50%, -50%, 0)",
          },
          "50%": {
            transform: "translate3d(-50%, -50%, 0) rotate(90deg) scaleY(.75)",
          },
          "100%": {
            transform: "translate3d(-50%, -27%, 0) rotate(45deg) scaleY(.75)",
          },
        },
      },
    }),
  },

  span: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "2px",
    height: odysseyDesignTokens.Spacing4,
    backgroundColor: odysseyDesignTokens.HueNeutral600,
    transform: "translate3d(-50%, -50%, 0)",
    transition: `transform ${odysseyDesignTokens.TransitionDurationMain}`,

    ...(toggleContrastColors?.fontColor && {
      backgroundColor: toggleContrastColors.fontColor,
    }),
  },
}));

export type SideNavToggleButtonProps = {
  /**
   * The ref forwarded to the Button
   */
  buttonRef?: React.RefObject<FocusHandle>;
  /**
   * The `id` of the item this button controls
   */
  ariaControls: string;
  /**
   * The ID of the Button
   */
  id?: string;
  isSideNavCollapsed: boolean;
  tabIndex?: HTMLAttributes<HTMLElement>["tabIndex"];
  /**
   * The click event handler for the Button
   */
  onClick?: MuiButtonProps["onClick"];
  onKeyDown?: MuiButtonProps["onKeyDown"];
};

const SideNavToggleButton = ({
  ariaControls,
  buttonRef,
  id,
  isSideNavCollapsed,
  onClick,
  tabIndex,
}: SideNavToggleButtonProps) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();
  const { t } = useTranslation();
  const shellColors = useUiShellContrastColorContext();

  const localButtonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);

  const toggleContrastColors = useMemo(() => {
    const hasNonStandardAppBackgroundColor =
      shellColors?.appBackgroundColor &&
      shellColors?.appBackgroundColor !== odysseyDesignTokens.HueNeutralWhite &&
      shellColors?.appBackgroundColor !== odysseyDesignTokens.HueNeutral50;

    if (hasNonStandardAppBackgroundColor) {
      return generateContrastColors(
        shellColors.appBackgroundColor,
        odysseyDesignTokens,
      );
    }

    return undefined;
  }, [odysseyDesignTokens, shellColors]);

  useImperativeHandle(
    buttonRef,
    () => ({
      focus: () => {
        localButtonRef.current?.focus();
      },
    }),
    [],
  );

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
          data-se="sidenav-toggle-button"
          data-sidenav-toggle={true}
          id={id}
          isSideNavCollapsed={isSideNavCollapsed}
          odysseyDesignTokens={odysseyDesignTokens}
          onClick={onClick}
          ref={(element) => {
            if (element) {
              (
                localButtonRef as React.MutableRefObject<HTMLButtonElement>
              ).current = element;
              //@ts-expect-error ref is not an optional prop on the props context type
              muiProps?.ref?.(element);
            }
          }}
          tabIndex={tabIndex}
          toggleContrastColors={toggleContrastColors}
          variant="floating"
        >
          <span id="lineOne" />
          <span id="lineTwo" />
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
      toggleContrastColors,
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
