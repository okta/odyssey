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
  memo,
  useCallback,
  KeyboardEventHandler,
  MouseEventHandler,
} from "react";

import { Link } from "../../Link";
import {
  DesignTokens,
  useOdysseyDesignTokens,
} from "../../OdysseyDesignTokensContext";

const TopNavItemLabelContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{
  odysseyDesignTokens: DesignTokens;
}>(({ odysseyDesignTokens }) => ({
  alignItems: "center",
  display: "flex",
  flexWrap: "wrap",
  fontSize: odysseyDesignTokens.TypographyScale0,
  fontWeight: odysseyDesignTokens.TypographyWeightHeading,
}));

const TopNavListItemContainer = styled("li", {
  shouldForwardProp: (prop) =>
    prop !== "odysseyDesignTokens" && prop !== "isDisabled",
})<{
  odysseyDesignTokens: DesignTokens;
  isDisabled?: boolean;
}>(({ odysseyDesignTokens, isDisabled }) => ({
  alignItems: "center",
  color: `${isDisabled ? odysseyDesignTokens.TypographyColorDisabled : odysseyDesignTokens.TypographyColorHeading} !important`,
  cursor: isDisabled ? "default" : "pointer",
  display: "flex",
  pointerEvents: isDisabled ? "none" : "auto",

  "& a": {
    alignItems: "center",
    color: `${odysseyDesignTokens.TypographyColorHeading} !important`,
    display: "flex",
    paddingBlock: odysseyDesignTokens.Spacing2,
    paddingInline: odysseyDesignTokens.Spacing4,
  },

  "& a:hover": {
    backgroundColor: !isDisabled ? odysseyDesignTokens.HueNeutral50 : "inherit",
    textDecoration: "none",
  },

  "& div[role='button']:hover": {
    backgroundColor: !isDisabled ? odysseyDesignTokens.HueNeutral50 : "inherit",
  },

  "& a:focus-visible": {
    backgroundColor: !isDisabled ? odysseyDesignTokens.HueNeutral50 : "inherit",
    borderRadius: 0,
    outlineOffset: 0,
    outlineWidth: odysseyDesignTokens.FocusOutlineWidthMain,
  },
}));

const NavItemContentClickContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{
  odysseyDesignTokens: DesignTokens;
}>(({ odysseyDesignTokens }) => ({
  alignItems: "center",
  display: "flex",
  paddingBlock: odysseyDesignTokens.Spacing2,
  paddingInline: odysseyDesignTokens.Spacing4,

  "&:focus-visible": {
    backgroundColor: odysseyDesignTokens.HueNeutral50,
    borderRadius: 0,
    outlineColor: odysseyDesignTokens.FocusOutlineColorPrimary,
    outlineStyle: odysseyDesignTokens.FocusOutlineStyle,
    outlineWidth: odysseyDesignTokens.FocusOutlineWidthMain,
    textDecoration: "none",
  },
  width: "100%",
}));

export type TopNavLinkProps = {
  /**
   * Without a hyperlink reference, `onClick` functionality will not function.
   * If `undefined`, static text will be displayed.
   */
  href?: string;
  /**
   * HTML `id` attribute.
   */
  id: string;
  /**
   * Determines whether the link item is disabled.
   */
  isDisabled?: boolean;
  /**
   * Display text for the link.
   */
  label: string;
  /**
   * Handles both mouse and keyboard interactions.
   */
  onClick?: MouseEventHandler<HTMLAnchorElement> &
    MouseEventHandler<HTMLDivElement> &
    KeyboardEventHandler<HTMLDivElement>;
  /**
   * Where to display the linked URL.
   */
  target?: string;
};

const TopNavLink = ({
  href,
  id,
  isDisabled,
  label,
  onClick,
  target,
}: TopNavLinkProps) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();

  const topNavItemContentKeyHandler = useCallback<
    KeyboardEventHandler<HTMLDivElement>
  >(
    (event) => {
      if (event?.key === "Enter") {
        event.preventDefault();
        event.stopPropagation();
        onClick?.(event);
      }
    },
    [onClick],
  );

  return (
    <TopNavListItemContainer
      aria-disabled={isDisabled}
      id={id}
      isDisabled={isDisabled}
      key={id}
      odysseyDesignTokens={odysseyDesignTokens}
    >
      {
        // Use Link for nav items with links and div for disabled or non-link items
        isDisabled ? (
          <NavItemContentClickContainer
            odysseyDesignTokens={odysseyDesignTokens}
          >
            <TopNavItemLabelContainer odysseyDesignTokens={odysseyDesignTokens}>
              {label}
            </TopNavItemLabelContainer>
          </NavItemContentClickContainer>
        ) : !href ? (
          <NavItemContentClickContainer
            odysseyDesignTokens={odysseyDesignTokens}
            onClick={onClick}
            onKeyDown={topNavItemContentKeyHandler}
            role="button"
            tabIndex={0}
          >
            <TopNavItemLabelContainer odysseyDesignTokens={odysseyDesignTokens}>
              {label}
            </TopNavItemLabelContainer>
          </NavItemContentClickContainer>
        ) : (
          <Link href={href} onClick={onClick} target={target}>
            <TopNavItemLabelContainer odysseyDesignTokens={odysseyDesignTokens}>
              {label}
            </TopNavItemLabelContainer>
          </Link>
        )
      }
    </TopNavListItemContainer>
  );
};

const MemoizedTopNavLink = memo(TopNavLink);
MemoizedTopNavLink.displayName = "TopNavLink";

export { MemoizedTopNavLink as TopNavLink };
