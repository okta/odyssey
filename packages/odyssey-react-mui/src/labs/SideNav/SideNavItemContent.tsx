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
} from "react";
import { Link } from "../../Link";
import {
  type DesignTokens,
  useOdysseyDesignTokens,
} from "../../OdysseyDesignTokensContext";
import { SideNavItemLinkContent } from "./SideNavItemLinkContent";
import type { SideNavItem } from "./types";

export const SideNavListItemContainer = styled("li", {
  shouldForwardProp: (prop) =>
    prop !== "odysseyDesignTokens" &&
    prop !== "__isCompact" &&
    prop !== "isSelected" &&
    prop !== "isDisabled",
})<{
  odysseyDesignTokens: DesignTokens;
  __isCompact?: boolean;
  isSelected?: boolean;
  disabled?: boolean;
  isDisabled?: boolean;
}>(({ odysseyDesignTokens, __isCompact, isSelected, isDisabled }) => ({
  display: "flex",
  alignItems: "center",
  cursor: isDisabled ? "default" : "pointer",
  pointerEvents: isDisabled ? "none" : "auto",
  backgroundColor: isSelected ? odysseyDesignTokens.HueNeutral50 : "unset",
  margin: `${odysseyDesignTokens.Spacing1} 0`,
  "&:last-child": {
    marginBottom: odysseyDesignTokens.Spacing2,
  },
  "& a, & div[role='button']": {
    display: "flex",
    alignItems: "center",
    width: "100%",
    minHeight: __isCompact ? "37px" : "48px",
    padding: __isCompact
      ? `${odysseyDesignTokens.Spacing0} ${odysseyDesignTokens.Spacing4}`
      : `${odysseyDesignTokens.Spacing3} ${odysseyDesignTokens.Spacing4}`,
    color: `${odysseyDesignTokens.TypographyColorHeading} !important`,
  },
  "& a:hover, & div[role='button']:hover": {
    textDecoration: "none",
    color: `${odysseyDesignTokens.TypographyColorAction} !important`,
    cursor: isDisabled ? "default" : "pointer",
    backgroundColor: !isDisabled ? odysseyDesignTokens.HueNeutral50 : "inherit",
  },
  "& a:focus-visible, & div[role='button']:focus-visible": {
    outlineOffset: 0,
    color: `${odysseyDesignTokens.TypographyColorAction} !important`,
    outlineWidth: odysseyDesignTokens.FocusOutlineWidthMain,
    backgroundColor: !isDisabled ? odysseyDesignTokens.HueNeutral50 : "inherit",
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

const SideNavItemContent = ({
  __hasParent,
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
  __isCompact,
}: Pick<
  SideNavItem,
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
  | "__hasParent"
  | "__isCompact"
> & {
  /**
   * The ref used to scroll to this item
   */
  scrollRef?: React.RefObject<ScrollIntoViewHandle>;
}) => {
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
  const odysseyDesignTokens = useOdysseyDesignTokens();

  const NavItemContentClickContainer = styled("div", {
    shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
  })(() => ({
    display: "flex",
    alignItems: "center",
    width: "100%",
    minHeight: __isCompact ? "37px" : "48px",
    padding: __isCompact
      ? `${odysseyDesignTokens.Spacing0} ${odysseyDesignTokens.Spacing4}`
      : `${odysseyDesignTokens.Spacing3} ${odysseyDesignTokens.Spacing4}`,
    color: `${isDisabled ? odysseyDesignTokens.TypographyColorDisabled : odysseyDesignTokens.TypographyColorHeading} !important`,
    "&:focus-visible": {
      borderRadius: 0,
      outlineColor: odysseyDesignTokens.FocusOutlineColorPrimary,
      outlineStyle: odysseyDesignTokens.FocusOutlineStyle,
      outlineWidth: odysseyDesignTokens.FocusOutlineWidthMain,
      backgroundColor: odysseyDesignTokens.HueNeutral50,
      textDecoration: "none",
    },
  }));

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
    <SideNavListItemContainer
      ref={localScrollRef}
      id={id}
      key={id}
      __isCompact={__isCompact}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      isDisabled={isDisabled}
      isSelected={isSelected}
      odysseyDesignTokens={odysseyDesignTokens}
    >
      {
        // Use Link for nav items with links and div for disabled or non-link items
        isDisabled ? (
          <NavItemContentClickContainer>
            <SideNavItemLinkContent
              label={label}
              startIcon={startIcon}
              endIcon={endIcon}
              statusLabel={statusLabel}
              severity={severity}
              __hasParent={__hasParent}
            />
          </NavItemContentClickContainer>
        ) : !href ? (
          <NavItemContentClickContainer
            role="button"
            tabIndex={0}
            onClick={onClick}
            onKeyDown={sideNavItemContentKeyHandler}
          >
            <SideNavItemLinkContent
              label={label}
              startIcon={startIcon}
              endIcon={endIcon}
              statusLabel={statusLabel}
              severity={severity}
              __hasParent={__hasParent}
            />
          </NavItemContentClickContainer>
        ) : (
          <Link href={href} target={target} onClick={onClick}>
            <SideNavItemLinkContent
              label={label}
              startIcon={startIcon}
              endIcon={endIcon}
              statusLabel={statusLabel}
              severity={severity}
              __hasParent={__hasParent}
            />
          </Link>
        )
      }
    </SideNavListItemContainer>
  );
};
const MemoizedSideNavItemContent = memo(SideNavItemContent);
MemoizedSideNavItemContent.displayName = "SideNavItemContent";

export { MemoizedSideNavItemContent as SideNavItemContent };
