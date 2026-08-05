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
import { Link as NavItemLink } from "@mui/material";
import {
  forwardRef,
  type HTMLAttributes,
  KeyboardEventHandler,
  memo,
  MouseEventHandler,
  type Ref,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";

import type { SideNavItem } from "./types.js";

import { useTranslation } from "../../i18n.generated/i18n.js";
import { ExternalLinkIcon } from "../../icons.generated/index.js";
import {
  type DesignTokens,
  useOdysseyDesignTokens,
} from "../../OdysseyDesignTokensContext.js";
import { ScreenReaderText } from "../../ScreenReaderText.js";
import {
  UiShellColors,
  useUiShellContext,
} from "../../ui-shell/UiShellProvider.js";
import {
  SideNavItemContentContextValue,
  useSideNavItemContent,
} from "./SideNavItemContentContext.js";
import { SideNavItemLinkContent } from "./SideNavItemLinkContent.js";
import { useDragOverlayContext } from "./SortableList/SortableOverlay.js";

type SideNavListItemStyleProps = {
  isSelected?: boolean;
  odysseyDesignTokens: DesignTokens;
  sideNavContrastColors?: UiShellColors["sideNavContrastColors"];
};

const sideNavListItemShouldForwardProp = (prop: string) =>
  prop !== "isSelected" &&
  prop !== "odysseyDesignTokens" &&
  prop !== "sideNavContrastColors";

const sideNavListItemStyles = ({
  isSelected,
  odysseyDesignTokens,
  sideNavContrastColors,
}: SideNavListItemStyleProps) => ({
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
});

export const StyledSideNavListItem = styled("li", {
  shouldForwardProp: sideNavListItemShouldForwardProp,
})<SideNavListItemStyleProps>(sideNavListItemStyles);

// Inside a sortable list, `SortableItem` supplies the `<li>`, so the item
// content renders this `<div>` variant instead — nesting a `<li>` (or its own
// one-item `<ul>`) inside each row would break the list's screen-reader
// semantics.
const StyledSideNavListItemAsDiv = styled("div", {
  shouldForwardProp: sideNavListItemShouldForwardProp,
})<SideNavListItemStyleProps>(sideNavListItemStyles);

type SideNavListItemProps = HTMLAttributes<HTMLElement> &
  SideNavListItemStyleProps & {
    // When rendered inside a sortable list, the root element is a `<div>`
    // rather than the default `<li>` (see `StyledSideNavListItemAsDiv`).
    isWithinSortableList?: boolean;
  };

// Selecting the `<li>` or `<div>` root inside JSX and asserting a single styled
// type would mistype the forwarded ref as `HTMLLIElement` even when the DOM
// node is a `<div>`. Wrapping the choice in a `forwardRef<HTMLElement>` keeps
// the ref honestly typed for both variants.
const SideNavListItem = forwardRef<HTMLElement, SideNavListItemProps>(
  ({ isWithinSortableList, ...sideNavListItemProps }, sideNavListItemRef) =>
    isWithinSortableList ? (
      <StyledSideNavListItemAsDiv
        {...sideNavListItemProps}
        ref={sideNavListItemRef as Ref<HTMLDivElement>}
      />
    ) : (
      <StyledSideNavListItem
        {...sideNavListItemProps}
        ref={sideNavListItemRef as Ref<HTMLLIElement>}
      />
    ),
);
SideNavListItem.displayName = "SideNavListItem";

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

// The row's active background: neutral by default, or the selected-item blue +
// action color when selected. Shared by the drag-active and hover/focus states
// so they stay identical.
const getActiveRowBackgroundStyles = ({
  isSelected,
  odysseyDesignTokens,
  sideNavContrastColors,
}: {
  isSelected?: boolean;
  odysseyDesignTokens: DesignTokens;
  sideNavContrastColors: UiShellColors["sideNavContrastColors"];
}) => ({
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
});

export const getBaseNavItemContentStyles = ({
  isDisabled,
  isDragActive,
  isSelected,
  odysseyDesignTokens,
  sideNavContrastColors,
  isActiveDropTarget,
}: {
  isActiveDropTarget: boolean;
  isDisabled?: boolean;
  // True for the copy shown during a drag (the overlay). Applies the row's
  // active background independent of hover/focus, so mouse and keyboard drags
  // look identical. See getBaseNavItemContentStyles usage of isActiveDropTarget.
  isDragActive?: boolean;
  isSelected?: boolean;
  odysseyDesignTokens: DesignTokens;
  sideNavContrastColors: UiShellColors["sideNavContrastColors"];
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

  // The dragged copy (overlay) carries the active row background regardless of
  // hover/focus, so keyboard and mouse drags render identically. The hover
  // selector below only fires for pointer hover / handle focus, which the
  // overlay copy never has.
  ...(isDragActive &&
    getActiveRowBackgroundStyles({
      isSelected,
      odysseyDesignTokens,
      sideNavContrastColors,
    })),

  // When hover or focus of the drag handle, apply general hover styles
  "&:hover, li:has(> button:hover, > button:focus, > button:focus-visible) &": {
    textDecoration: "none",
    ...getActiveRowBackgroundStyles({
      isSelected,
      odysseyDesignTokens,
      sideNavContrastColors,
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
  paddingInlineStart = odysseyDesignTokens.Spacing6,
}: {
  contextValue: SideNavItemContentContextValue;
  odysseyDesignTokens: DesignTokens;
  paddingInlineStart?: string;
}) => ({
  paddingInlineStart: `calc(${odysseyDesignTokens.Spacing4} * ${contextValue.depth} + ${paddingInlineStart})`,

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
    prop !== "isDragActive" &&
    prop !== "sideNavContrastColors" &&
    prop !== "isSelected" &&
    prop !== "isActiveDropTarget",
})<{
  contextValue: SideNavItemContentContextValue;
  isActiveDropTarget: boolean;
  isDisabled?: boolean;
  isDragActive?: boolean;
  isSelected?: boolean;
  odysseyDesignTokens: DesignTokens;
  sideNavContrastColors: UiShellColors["sideNavContrastColors"];
}>(
  ({
    isDisabled,
    isDragActive,
    isSelected,
    contextValue,
    odysseyDesignTokens,
    sideNavContrastColors,
    isActiveDropTarget,
  }) => ({
    ...getBaseNavItemContentStyles({
      isDisabled,
      isDragActive,
      isSelected,
      odysseyDesignTokens,
      sideNavContrastColors,
      isActiveDropTarget,
    }),

    ...getNavItemContentStyles({
      odysseyDesignTokens,
      contextValue,
      paddingInlineStart: contextValue.absolutePaddingStart,
    }),
  }),
);

const StyledNavItemLink = styled(NavItemLink, {
  shouldForwardProp: (prop) =>
    prop != "contextValue" &&
    prop !== "isDisabled" &&
    prop !== "isDragActive" &&
    prop !== "isSelected" &&
    prop !== "odysseyDesignTokens" &&
    prop !== "sideNavContrastColors" &&
    prop !== "isActiveDropTarget",
})<{
  contextValue: SideNavItemContentContextValue;
  isActiveDropTarget: boolean;
  isDisabled?: boolean;
  isDragActive?: boolean;
  isSelected?: boolean;
  odysseyDesignTokens: DesignTokens;
  sideNavContrastColors: UiShellColors["sideNavContrastColors"];
}>(
  ({
    isDisabled,
    isDragActive,
    isSelected,
    contextValue,
    odysseyDesignTokens,
    sideNavContrastColors,
    isActiveDropTarget,
  }) => ({
    ...getBaseNavItemContentStyles({
      isDisabled,
      isDragActive,
      isSelected,
      odysseyDesignTokens,
      sideNavContrastColors,
      isActiveDropTarget,
    }),

    ...getNavItemContentStyles({
      odysseyDesignTokens,
      contextValue,
      paddingInlineStart: contextValue.absolutePaddingStart,
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
  ariaControls,
  isExpanded,
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
  | "ariaControls"
  | "isExpanded"
  | "isSelected"
  | "translate"
> & {
  onItemSelected?: (selectedItemId: string) => void;
  /**
   * The ref used to scroll to this item
   */
  scrollRef?: React.RefObject<ScrollIntoViewHandle>;
}) => {
  const uiShellContext = useUiShellContext();
  const sidenavItemContentContext = useSideNavItemContent();
  const contextValue = useMemo(
    () => sidenavItemContentContext,
    [sidenavItemContentContext],
  );

  const odysseyDesignTokens = useOdysseyDesignTokens();
  const { t } = useTranslation();
  const [isActiveDropTarget, setIsActiveDropTarget] = useState(false);
  // True only for the copy rendered inside the DragOverlay (the visible copy
  // during a drag), so the active row background shows for both mouse and
  // keyboard drags rather than relying on pointer hover / handle focus.
  const { isGrabbed } = useDragOverlayContext();

  const localScrollRef = useRef<HTMLElement>(null);
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
    <SideNavListItem
      id={id}
      isSelected={isSelected}
      isWithinSortableList={contextValue.isWithinSortableList}
      key={id}
      odysseyDesignTokens={odysseyDesignTokens}
      onDragLeave={() => {
        setIsActiveDropTarget(false);
      }}
      onDragOver={() => {
        setIsActiveDropTarget(true);
      }}
      onDrop={() => {
        setIsActiveDropTarget(false);
      }}
      ref={localScrollRef}
      sideNavContrastColors={uiShellContext?.sideNavContrastColors}
    >
      {
        // Use Link for nav items with links and div for disabled or non-link items
        isDisabled ? (
          // `aria-disabled` is only announced on a widget role, so the
          // disabled state lives on this `role="button"` element (mirroring
          // the interactive branch below and the disabled accordion summary)
          // rather than the wrapper, whose `listitem` role (or plain `<div>`
          // in sortable mode) can't carry a disabled state for AT.
          <NavItemContentContainer
            aria-current={isSelected ? "page" : undefined}
            aria-disabled={isDisabled}
            contextValue={contextValue}
            data-se="tb--sidenav-text-container"
            isActiveDropTarget={false}
            isDisabled={isDisabled}
            isSelected={isSelected}
            odysseyDesignTokens={odysseyDesignTokens}
            role="button"
            sideNavContrastColors={uiShellContext?.sideNavContrastColors}
          >
            <SideNavItemLinkContent
              count={count}
              endIcon={endIcon}
              label={label}
              severity={severity}
              startIcon={startIcon}
              statusLabel={statusLabel}
              translate={translate}
            />
          </NavItemContentContainer>
        ) : !href ? (
          <NavItemContentContainer
            aria-controls={ariaControls}
            aria-current={isSelected ? "page" : undefined}
            aria-expanded={isExpanded}
            contextValue={contextValue}
            data-se="tb--sidenav-text-container"
            isActiveDropTarget={isActiveDropTarget}
            isDisabled={isDisabled}
            isDragActive={isGrabbed}
            isSelected={isSelected}
            odysseyDesignTokens={odysseyDesignTokens}
            onClick={itemClickHandler}
            onKeyDown={sideNavItemContentKeyHandler}
            role="button"
            sideNavContrastColors={uiShellContext?.sideNavContrastColors}
            tabIndex={0}
          >
            <SideNavItemLinkContent
              count={count}
              endIcon={endIcon}
              label={label}
              severity={severity}
              startIcon={startIcon}
              statusLabel={statusLabel}
              translate={translate}
            />
          </NavItemContentContainer>
        ) : (
          <StyledNavItemLink
            aria-current={isSelected ? "page" : undefined}
            contextValue={contextValue}
            data-se="tb--sidenav-text-container"
            href={href}
            isActiveDropTarget={isActiveDropTarget}
            isDisabled={isDisabled}
            isDragActive={isGrabbed}
            isSelected={isSelected}
            odysseyDesignTokens={odysseyDesignTokens}
            onClick={itemClickHandler}
            sideNavContrastColors={uiShellContext?.sideNavContrastColors}
            target={target}
          >
            <SideNavItemLinkContent
              count={count}
              endIcon={endIcon}
              label={label}
              severity={severity}
              startIcon={startIcon}
              statusLabel={statusLabel}
              translate={translate}
            />
            {target === "_blank" && (
              <>
                <ScreenReaderText translate={translate}>
                  {t("link.external.newwindow")}
                </ScreenReaderText>
                <span className="Link-indicator" role="presentation">
                  <ExternalLinkIcon />
                </span>
              </>
            )}
          </StyledNavItemLink>
        )
      }
    </SideNavListItem>
  );
};

const MemoizedSideNavItemContent = memo(SideNavItemContent);
MemoizedSideNavItemContent.displayName = "SideNavItemContent";

export { MemoizedSideNavItemContent as SideNavItemContent };
