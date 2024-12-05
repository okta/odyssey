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
  useRef,
  useImperativeHandle,
  useCallback,
  memo,
  KeyboardEvent,
  useMemo,
} from "react";
import { Link as NavItemLink } from "@mui/material";
import {
  type DesignTokens,
  useOdysseyDesignTokens,
} from "../../OdysseyDesignTokensContext";
import { ContrastMode } from "../../useContrastMode";
import { SideNavItemLinkContent } from "./SideNavItemLinkContent";
import type { SideNavItem } from "./types";
import {
  SideNavItemContentContextValue,
  useSideNavItemContent,
} from "./SideNavItemContentContext";
import { ExternalLinkIcon } from "../../icons.generated";

export const StyledSideNavListItem = styled("li", {
  shouldForwardProp: (prop) =>
    prop !== "odysseyDesignTokens" &&
    prop !== "isSelected" &&
    prop !== "contrastMode",
})<{
  odysseyDesignTokens: DesignTokens;
  isSelected?: boolean;
  disabled?: boolean;
  contrastMode: ContrastMode;
}>(({ odysseyDesignTokens, isSelected, contrastMode }) => ({
  display: "flex",
  alignItems: "center",
  backgroundColor: "unset",
  borderRadius: odysseyDesignTokens.BorderRadiusMain,
  transition: `backgroundColor ${odysseyDesignTokens.TransitionDurationMain}, color ${odysseyDesignTokens.TransitionDurationMain}`,

  ...(isSelected && {
    color:
      contrastMode === "highContrast"
        ? "#ffffff"
        : `${odysseyDesignTokens.TypographyColorAction}`,
    backgroundColor:
      contrastMode === "highContrast"
        ? "#2d2d2d"
        : odysseyDesignTokens.HueBlue50,
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
  odysseyDesignTokens,
  isDisabled,
  isSelected,
  contrastMode,
}: {
  odysseyDesignTokens: DesignTokens;
  isDisabled?: boolean;
  isSelected?: boolean;
  contrastMode: ContrastMode;
}) => ({
  display: "flex",
  alignItems: "center",
  width: "100%",
  textDecoration: "none",
  color:
    contrastMode === "highContrast"
      ? "#ffffff !important"
      : `${odysseyDesignTokens.TypographyColorHeading} !important`,

  minHeight: "unset",
  paddingBlock: odysseyDesignTokens.Spacing3,
  paddingInlineEnd: odysseyDesignTokens.Spacing4,
  borderRadius: odysseyDesignTokens.BorderRadiusMain,
  transition: `backgroundColor ${odysseyDesignTokens.TransitionDurationMain}, color ${odysseyDesignTokens.TransitionDurationMain}`,
  cursor: "pointer",

  // `[data-sortable-container='true']:has(button:hover) &` - when the sortable item's drag handle is hovered we want to trigger the same hover behavior as if you were hovering the actual item
  "&:hover, [data-sortable-container='true']:has(button:hover, button:focus, button:focus-visible) &":
    {
      textDecoration: "none",
      backgroundColor:
        contrastMode === "highContrast"
          ? "#2d2d2d"
          : odysseyDesignTokens.HueNeutral50,

      ...(isSelected && {
        backgroundColor: odysseyDesignTokens.HueBlue50,
        color: odysseyDesignTokens.TypographyColorAction,
      }),

      ...(isDisabled && {
        backgroundColor: "unset",
      }),
    },

  ...(isSelected && {
    color:
      contrastMode === "highContrast"
        ? "#ffffff"
        : odysseyDesignTokens.TypographyColorAction,
    fontWeight: odysseyDesignTokens.TypographyWeightBodyBold,
  }),

  ...(isDisabled && {
    cursor: "default",
    color: `${odysseyDesignTokens.TypographyColorDisabled} !important`,
  }),

  "&:focus-visible, &:focus": {
    outline: "none",
    boxShadow: `inset 0 0 0 2px ${odysseyDesignTokens.PalettePrimaryMain}`,
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
    prop !== "isSelected",
})<{
  contextValue: SideNavItemContentContextValue;
  odysseyDesignTokens: DesignTokens;
  isSelected?: boolean;
  isDisabled?: boolean;
  contrastMode: ContrastMode;
}>(
  ({
    contextValue,
    odysseyDesignTokens,
    isDisabled,
    isSelected,
    contrastMode,
  }) => ({
    ...getBaseNavItemContentStyles({
      odysseyDesignTokens,
      isDisabled,
      isSelected,
      contrastMode,
    }),

    ...getNavItemContentStyles({
      odysseyDesignTokens,
      contextValue,
    }),
  }),
);

const StyledNavItemLink = styled(NavItemLink, {
  shouldForwardProp: (prop) =>
    prop !== "odysseyDesignTokens" &&
    prop != "contextValue" &&
    prop !== "isDisabled" &&
    prop !== "isSelected",
})<{
  contextValue: SideNavItemContentContextValue;
  odysseyDesignTokens: DesignTokens;
  isSelected?: boolean;
  isDisabled?: boolean;
  contrastMode: ContrastMode;
}>(
  ({
    contextValue,
    odysseyDesignTokens,
    isDisabled,
    isSelected,
    contrastMode,
  }) => ({
    ...getBaseNavItemContentStyles({
      odysseyDesignTokens,
      isDisabled,
      isSelected,
      contrastMode,
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
  contrastMode,
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
> & {
  /**
   * The ref used to scroll to this item
   */
  scrollRef?: React.RefObject<ScrollIntoViewHandle>;
  onItemSelected?(selectedItemId: string): void;
  contrastMode: ContrastMode;
}) => {
  const sidenavItemContentContext = useSideNavItemContent();
  const contextValue = useMemo(
    () => sidenavItemContentContext,
    [sidenavItemContentContext],
  );
  const odysseyDesignTokens = useOdysseyDesignTokens();
  console.log("Current contrast mode:", contrastMode);
  const localScrollRef = useRef<HTMLLIElement>(null);
  useImperativeHandle(
    scrollRef,
    () => {
      return {
        scrollIntoView: () => {
          scrollToNode(localScrollRef.current);
        },
      };
    },
    [],
  );

  const itemClickHandler = useCallback(
    (id: string) => {
      return () => {
        onItemSelected?.(id);
        onClick?.();
      };
    },
    [onClick, onItemSelected],
  );

  const sideNavItemContentKeyHandler = useCallback(
    (id: string, event: KeyboardEvent<HTMLDivElement>) => {
      if (event?.key === "Enter") {
        event.preventDefault();
        onItemSelected?.(id);
        onClick?.();
      }
    },
    [onClick, onItemSelected],
  );

  return (
    <StyledSideNavListItem
      contrastMode={contrastMode}
      ref={localScrollRef}
      id={id}
      key={id}
      isSelected={isSelected}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      aria-current={isSelected ? "page" : undefined}
      odysseyDesignTokens={odysseyDesignTokens}
    >
      {
        // Use Link for nav items with links and div for disabled or non-link items
        isDisabled ? (
          <NavItemContentContainer
            odysseyDesignTokens={odysseyDesignTokens}
            contrastMode={contrastMode}
            contextValue={contextValue}
            isDisabled={isDisabled}
            isSelected={isSelected}
          >
            <SideNavItemLinkContent
              count={count}
              label={label}
              startIcon={startIcon}
              endIcon={endIcon}
              statusLabel={statusLabel}
              severity={severity}
            />
          </NavItemContentContainer>
        ) : !href ? (
          <NavItemContentContainer
            odysseyDesignTokens={odysseyDesignTokens}
            contrastMode={contrastMode}
            contextValue={contextValue}
            isDisabled={isDisabled}
            tabIndex={0}
            role="button"
            onClick={itemClickHandler(id)}
            onKeyDown={(event: KeyboardEvent<HTMLDivElement>) =>
              sideNavItemContentKeyHandler(id, event)
            }
            isSelected={isSelected}
          >
            <SideNavItemLinkContent
              count={count}
              label={label}
              startIcon={startIcon}
              endIcon={endIcon}
              statusLabel={statusLabel}
              severity={severity}
            />
          </NavItemContentContainer>
        ) : (
          <StyledNavItemLink
            odysseyDesignTokens={odysseyDesignTokens}
            contrastMode={contrastMode}
            contextValue={contextValue}
            isDisabled={isDisabled}
            isSelected={isSelected}
            href={href}
            target={target}
            onClick={itemClickHandler(id)}
          >
            <SideNavItemLinkContent
              count={count}
              label={label}
              startIcon={startIcon}
              endIcon={endIcon}
              statusLabel={statusLabel}
              severity={severity}
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
