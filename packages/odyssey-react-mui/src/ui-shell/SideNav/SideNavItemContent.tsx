/*!
 * Copyright (c) 2024-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import styled from "@emotion/styled";
import {
  KeyboardEventHandler,
  memo,
  MouseEventHandler,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { Link as NavItemLink } from "@mui/material";
import {
  type DesignTokens,
  useOdysseyDesignTokens,
} from "../../OdysseyDesignTokensContext.js";
import { SideNavItemLinkContent } from "./SideNavItemLinkContent.js";
import type { SideNavItem } from "./types.js";
import {
  SideNavItemContentContextValue,
  useSideNavItemContent,
} from "./SideNavItemContentContext.js";
import { ExternalLinkIcon } from "../../icons.generated/index.js";
import {
  UiShellColors,
  useUiShellContext,
} from "../../ui-shell/UiShellProvider.js";

export const StyledSideNavListItem = styled("li", {
  shouldForwardProp: (prop) =>
    prop !== "isSelected" &&
    prop !== "odysseyDesignTokens" &&
    prop !== "sideNavContrastColors",
})<{
  sideNavContrastColors?: UiShellColors["sideNavContrastColors"];
  odysseyDesignTokens: DesignTokens;
  isSelected?: boolean;
  itemSelectedBackgroundColor?: string;
  disabled?: boolean;
}>(({ isSelected, odysseyDesignTokens, sideNavContrastColors }) => ({
  display: "flex",
  alignItems: "center",
  backgroundColor: "unset",
  borderRadius: odysseyDesignTokens.BorderRadiusMain,
  transition: `backgroundColor ${odysseyDesignTokens.TransitionDurationMain}, color ${odysseyDesignTokens.TransitionDurationMain}`,

  ...(isSelected && {
    color: sideNavContrastColors?.fontColor
      ? `${sideNavContrastColors.fontColor}`
      : `${odysseyDesignTokens.TypographyColorAction}`,
    backgroundColor:
      sideNavContrastColors?.itemSelectedBackgroundColor ||
      odysseyDesignTokens.HueBlue50,
  }),
}));

const scrollToNode = (node: HTMLElement | null) => {
  if (node) {
    node?.scrollIntoView({
      behavior: "instant",
      block: "center",
      inline: "nearest",
    });
  }
};

type ScrollIntoViewHandle = {
  scrollIntoView: () => void;
};

export const getBaseNavItemContentStyles = ({
  isDisabled,
  isSelected,
  odysseyDesignTokens,
  sideNavContrastColors,
  isActiveDropTarget,
}: {
  isSelected?: boolean;
  isDisabled?: boolean;
  odysseyDesignTokens: DesignTokens;
  sideNavContrastColors: UiShellColors["sideNavContrastColors"];
  isActiveDropTarget: boolean;
}) => ({
  display: "flex",
  alignItems: "center",
  width: "100%",
  textDecoration: "none",
  // !important needed here to override more specific base link styling
  color: sideNavContrastColors?.fontColor
    ? `${sideNavContrastColors?.fontColor} !important`
    : `${odysseyDesignTokens.TypographyColorHeading} !important`,
  minHeight: "unset",
  paddingBlock: odysseyDesignTokens.Spacing3,
  paddingInlineEnd: odysseyDesignTokens.Spacing4,
  borderRadius: odysseyDesignTokens.BorderRadiusMain,
  transition: `backgroundColor ${odysseyDesignTokens.TransitionDurationMain}, color ${odysseyDesignTokens.TransitionDurationMain}`,
  cursor: "pointer",
  ...(isActiveDropTarget && {
    backgroundColor:
      sideNavContrastColors?.itemHoverBackgroundColor ||
      odysseyDesignTokens.HueNeutral50,
  }),

  // When hover or focus of the drag handle, apply general hover styles
  "&:hover, li:has(> button:hover, > button:focus, > button:focus-visible) &": {
    textDecoration: "none",
    backgroundColor:
      sideNavContrastColors?.itemHoverBackgroundColor ||
      odysseyDesignTokens.HueNeutral50,

    ...(isSelected && {
      backgroundColor:
        sideNavContrastColors?.itemSelectedBackgroundColor ||
        odysseyDesignTokens.HueBlue50,
      color:
        sideNavContrastColors?.fontColor ||
        odysseyDesignTokens.TypographyColorAction,
    }),

    ...(isDisabled && {
      backgroundColor: "unset",
    }),
  },

  ...(isSelected && {
    color: sideNavContrastColors?.fontColor
      ? `${sideNavContrastColors?.fontColor} !important`
      : `${odysseyDesignTokens.TypographyColorAction} !important`,
    fontWeight: odysseyDesignTokens.TypographyWeightBodyBold,
  }),

  ...(isDisabled && {
    cursor: "default",
    color: `${odysseyDesignTokens.TypographyColorDisabled} !important`,

    ...(sideNavContrastColors?.itemDisabledFontColor && {
      color: `${sideNavContrastColors?.itemDisabledFontColor} !important`,
    }),
  }),

  "&:focus-visible": {
    outline: "none",
    boxShadow: `inset 0 0 0 2px ${sideNavContrastColors?.focusRingColor || odysseyDesignTokens.PalettePrimaryMain}`,
  },
});

export const getNavItemContentStyles = ({
  odysseyDesignTokens,
  contextValue,
}: {
  odysseyDesignTokens: DesignTokens;
  contextValue: SideNavItemContentContextValue;
}) => ({
  paddingInlineStart: `calc(${odysseyDesignTokens.Spacing4} * ${contextValue.depth} + ${odysseyDesignTokens.Spacing6})`,

  ...(contextValue.depth === 1 && {
    paddingInlineStart: odysseyDesignTokens.Spacing4,
  }),

  ...(contextValue.isCompact && {
    paddingBlock: odysseyDesignTokens.Spacing1,
  }),
});

const NavItemContentContainer = styled("div", {
  shouldForwardProp: (prop) =>
    prop !== "odysseyDesignTokens" &&
    prop != "contextValue" &&
    prop !== "isDisabled" &&
    prop !== "sideNavContrastColors" &&
    prop !== "isSelected" &&
    prop !== "isActiveDropTarget",
})<{
  contextValue: SideNavItemContentContextValue;
  odysseyDesignTokens: DesignTokens;
  sideNavContrastColors: UiShellColors["sideNavContrastColors"];
  isSelected?: boolean;
  isDisabled?: boolean;
  isActiveDropTarget: boolean;
}>(
  ({
    isDisabled,
    isSelected,
    contextValue,
    odysseyDesignTokens,
    sideNavContrastColors,
    isActiveDropTarget,
  }) => ({
    ...getBaseNavItemContentStyles({
      isDisabled,
      isSelected,
      odysseyDesignTokens,
      sideNavContrastColors,
      isActiveDropTarget,
    }),

    ...getNavItemContentStyles({
      odysseyDesignTokens,
      contextValue,
    }),
  }),
);

const StyledNavItemLink = styled(NavItemLink, {
  shouldForwardProp: (prop) =>
    prop != "contextValue" &&
    prop !== "isDisabled" &&
    prop !== "isSelected" &&
    prop !== "odysseyDesignTokens" &&
    prop !== "sideNavContrastColors" &&
    prop !== "isActiveDropTarget",
})<{
  contextValue: SideNavItemContentContextValue;
  odysseyDesignTokens: DesignTokens;
  sideNavContrastColors: UiShellColors["sideNavContrastColors"];
  isSelected?: boolean;
  isDisabled?: boolean;
  isActiveDropTarget: boolean;
}>(
  ({
    isDisabled,
    isSelected,
    contextValue,
    odysseyDesignTokens,
    sideNavContrastColors,
    isActiveDropTarget,
  }) => ({
    ...getBaseNavItemContentStyles({
      isDisabled,
      isSelected,
      odysseyDesignTokens,
      sideNavContrastColors,
      isActiveDropTarget,
    }),

    ...getNavItemContentStyles({
      odysseyDesignTokens,
      contextValue,
    }),
  }),
);

const SideNavItemContent = ({
  count,
  id,
  label,
  href,
  target,
  startIcon,
  severity,
  statusLabel,
  endIcon,
  onClick,
  isDisabled,
  isSelected,
  scrollRef,
  onItemSelected,
  translate,
}: Pick<
  SideNavItem,
  | "count"
  | "id"
  | "label"
  | "href"
  | "target"
  | "startIcon"
  | "severity"
  | "statusLabel"
  | "endIcon"
  | "onClick"
  | "isDisabled"
  | "isSelected"
  | "translate"
> & {
  /**
   * The ref used to scroll to this item
   */
  scrollRef?: React.RefObject<ScrollIntoViewHandle>;
  onItemSelected?: (selectedItemId: string) => void;
}) => {
  const uiShellContext = useUiShellContext();
  const sidenavItemContentContext = useSideNavItemContent();
  const contextValue = useMemo(
    () => sidenavItemContentContext,
    [sidenavItemContentContext],
  );

  const odysseyDesignTokens = useOdysseyDesignTokens();
  const [isActiveDropTarget, setIsActiveDropTarget] = useState(false);

  const localScrollRef = useRef<HTMLLIElement>(null);
  useImperativeHandle(scrollRef, () => {
    return {
      scrollIntoView: () => {
        scrollToNode(localScrollRef.current);
      },
    };
  }, []);

  const itemClickHandler = useCallback<
    MouseEventHandler<HTMLDivElement | HTMLAnchorElement>
  >(
    (event) => {
      onItemSelected?.(id);
      onClick?.(event);
    },
    [id, onClick, onItemSelected],
  );

  const sideNavItemContentKeyHandler = useCallback<
    KeyboardEventHandler<HTMLDivElement>
  >(
    (event) => {
      if (event?.key === "Enter") {
        event.preventDefault();
        onItemSelected?.(id);
        onClick?.(event);
      }
    },
    [id, onClick, onItemSelected],
  );

  return (
    <StyledSideNavListItem
      aria-disabled={isDisabled}
      aria-current={isSelected ? "page" : undefined}
      disabled={isDisabled}
      id={id}
      isSelected={isSelected}
      key={id}
      odysseyDesignTokens={odysseyDesignTokens}
      ref={localScrollRef}
      sideNavContrastColors={uiShellContext?.sideNavContrastColors}
      onDragOver={() => {
        setIsActiveDropTarget(true);
      }}
      onDragLeave={() => {
        setIsActiveDropTarget(false);
      }}
      onDrop={() => {
        setIsActiveDropTarget(false);
      }}
    >
      {
        // Use Link for nav items with links and div for disabled or non-link items
        isDisabled ? (
          <NavItemContentContainer
            contextValue={contextValue}
            isDisabled={isDisabled}
            isSelected={isSelected}
            odysseyDesignTokens={odysseyDesignTokens}
            sideNavContrastColors={uiShellContext?.sideNavContrastColors}
            isActiveDropTarget={false}
          >
            <SideNavItemLinkContent
              count={count}
              label={label}
              startIcon={startIcon}
              endIcon={endIcon}
              statusLabel={statusLabel}
              severity={severity}
              translate={translate}
            />
          </NavItemContentContainer>
        ) : !href ? (
          <NavItemContentContainer
            contextValue={contextValue}
            isDisabled={isDisabled}
            isSelected={isSelected}
            onClick={itemClickHandler}
            onKeyDown={sideNavItemContentKeyHandler}
            odysseyDesignTokens={odysseyDesignTokens}
            role="button"
            sideNavContrastColors={uiShellContext?.sideNavContrastColors}
            tabIndex={0}
            isActiveDropTarget={isActiveDropTarget}
          >
            <SideNavItemLinkContent
              count={count}
              label={label}
              startIcon={startIcon}
              endIcon={endIcon}
              statusLabel={statusLabel}
              severity={severity}
              translate={translate}
            />
          </NavItemContentContainer>
        ) : (
          <StyledNavItemLink
            contextValue={contextValue}
            href={href}
            isDisabled={isDisabled}
            isSelected={isSelected}
            odysseyDesignTokens={odysseyDesignTokens}
            onClick={itemClickHandler}
            sideNavContrastColors={uiShellContext?.sideNavContrastColors}
            target={target}
            isActiveDropTarget={isActiveDropTarget}
          >
            <SideNavItemLinkContent
              count={count}
              label={label}
              startIcon={startIcon}
              endIcon={endIcon}
              statusLabel={statusLabel}
              severity={severity}
              translate={translate}
            />
            {target === "_blank" && (
              <span className="Link-indicator" role="presentation">
                <ExternalLinkIcon />
              </span>
            )}
          </StyledNavItemLink>
        )
      }
    </StyledSideNavListItem>
  );
};

const MemoizedSideNavItemContent = memo(SideNavItemContent);
MemoizedSideNavItemContent.displayName = "SideNavItemContent";

export { MemoizedSideNavItemContent as SideNavItemContent };
