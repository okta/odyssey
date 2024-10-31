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
import { SideNavItemLinkContent } from "./SideNavItemLinkContent";
import type { SideNavItem } from "./types";
import {
  SideNavItemContentContextValue,
  useSideNavItemContent,
} from "./SideNavItemContentContext";
import { ExternalLinkIcon } from "../../icons.generated";

export const StyledSideNavListItem = styled("li", {
  shouldForwardProp: (prop) =>
    prop !== "odysseyDesignTokens" && prop !== "isSelected",
})<{
  odysseyDesignTokens: DesignTokens;
  isSelected?: boolean;
  disabled?: boolean;
}>(({ odysseyDesignTokens, isSelected }) => ({
  alignItems: "center",
  backgroundColor: isSelected ? odysseyDesignTokens.HueNeutral50 : "unset",
  display: "flex",

  "&:last-child": {
    marginBottom: odysseyDesignTokens.Spacing2,
  },
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

const GetNavItemContentStyles = ({
  odysseyDesignTokens,
  contextValue,
  isDisabled,
}: {
  odysseyDesignTokens: DesignTokens;
  contextValue: SideNavItemContentContextValue;
  isDisabled?: boolean;
}) => {
  return {
    display: "flex",
    alignItems: "center",
    width: "100%",
    textDecoration: "none",
    color: `${isDisabled ? odysseyDesignTokens.TypographyColorDisabled : odysseyDesignTokens.TypographyColorHeading} !important`,
    minHeight: contextValue.isCompact
      ? odysseyDesignTokens.Spacing6
      : odysseyDesignTokens.Spacing7,
    paddingBlock: odysseyDesignTokens.Spacing2,
    paddingInline: odysseyDesignTokens.Spacing5,

    ...(contextValue.isCompact && {
      paddingBlock: odysseyDesignTokens.Spacing1,
    }),

    "&:focus-visible": {
      borderRadius: 0,
      outlineColor: odysseyDesignTokens.FocusOutlineColorPrimary,
      outlineStyle: odysseyDesignTokens.FocusOutlineStyle,
      outlineWidth: odysseyDesignTokens.FocusOutlineWidthMain,
      textDecoration: "none",
      outlineOffset: 0,
      color: isDisabled
        ? "default"
        : `${odysseyDesignTokens.TypographyColorAction} !important`,
      backgroundColor: !isDisabled
        ? odysseyDesignTokens.HueNeutral50
        : "inherit",
    },
    "&:hover": {
      textDecoration: "none",
      cursor: isDisabled ? "default" : "pointer",
      color: isDisabled
        ? "default"
        : `${odysseyDesignTokens.TypographyColorAction} !important`,
      backgroundColor: !isDisabled ? odysseyDesignTokens.HueBlue50 : "inherit",
    },
  };
};

const NavItemContentContainer = styled("div", {
  shouldForwardProp: (prop) =>
    prop !== "odysseyDesignTokens" &&
    prop != "contextValue" &&
    prop !== "isDisabled",
})(GetNavItemContentStyles);

const NavItemLinkContainer = styled(NavItemLink, {
  shouldForwardProp: (prop) =>
    prop !== "odysseyDesignTokens" &&
    prop != "contextValue" &&
    prop !== "isDisabled",
})(GetNavItemContentStyles);

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
  isSelected,
  isDisabled,
  scrollRef,
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
  | "isSelected"
  | "isDisabled"
> & {
  /**
   * The ref used to scroll to this item
   */
  scrollRef?: React.RefObject<ScrollIntoViewHandle>;
}) => {
  const sidenavItemContentContext = useSideNavItemContent();
  const contextValue = useMemo(
    () => sidenavItemContentContext,
    [sidenavItemContentContext],
  );
  const odysseyDesignTokens = useOdysseyDesignTokens();

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

  const sideNavItemContentKeyHandler = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event?.key === "Enter") {
        event.preventDefault();
        onClick?.();
      }
    },
    [onClick],
  );

  return (
    <StyledSideNavListItem
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
            contextValue={contextValue}
            isDisabled={isDisabled}
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
            contextValue={contextValue}
            isDisabled={isDisabled}
            tabIndex={0}
            onClick={onClick}
            onKeyDown={sideNavItemContentKeyHandler}
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
          <NavItemLinkContainer
            odysseyDesignTokens={odysseyDesignTokens}
            contextValue={contextValue}
            isDisabled={isDisabled}
            href={href}
            target={target}
            onClick={onClick}
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
          </NavItemLinkContainer>
        )
      }
    </StyledSideNavListItem>
  );
};
const MemoizedSideNavItemContent = memo(SideNavItemContent);
MemoizedSideNavItemContent.displayName = "SideNavItemContent";

export { MemoizedSideNavItemContent as SideNavItemContent };
