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
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
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
  display: "flex",
  alignItems: "center",
  cursor: isDisabled ? "default" : "pointer",
  pointerEvents: isDisabled ? "none" : "auto",
  color: `${isDisabled ? odysseyDesignTokens.TypographyColorDisabled : odysseyDesignTokens.TypographyColorHeading} !important`,
  "& a": {
    display: "flex",
    alignItems: "center",
    padding: `${odysseyDesignTokens.Spacing2} ${odysseyDesignTokens.Spacing4}`,
    color: `${odysseyDesignTokens.TypographyColorHeading} !important`,
  },
  "& a:hover": {
    textDecoration: "none",
    backgroundColor: !isDisabled ? odysseyDesignTokens.HueNeutral50 : "inherit",
  },
  "& div[role='button']:hover": {
    backgroundColor: !isDisabled ? odysseyDesignTokens.HueNeutral50 : "inherit",
  },
  "& a:focus-visible": {
    outlineOffset: 0,
    borderRadius: 0,
    outlineWidth: odysseyDesignTokens.FocusOutlineWidthMain,
    backgroundColor: !isDisabled ? odysseyDesignTokens.HueNeutral50 : "inherit",
  },
}));

const NavItemContentClickContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{
  odysseyDesignTokens: DesignTokens;
}>(({ odysseyDesignTokens }) => ({
  display: "flex",
  alignItems: "center",
  width: "100%",
  padding: `${odysseyDesignTokens.Spacing2} ${odysseyDesignTokens.Spacing4}`,
  "&:focus-visible": {
    borderRadius: 0,
    outlineColor: odysseyDesignTokens.FocusOutlineColorPrimary,
    outlineStyle: odysseyDesignTokens.FocusOutlineStyle,
    outlineWidth: odysseyDesignTokens.FocusOutlineWidthMain,
    backgroundColor: odysseyDesignTokens.HueNeutral50,
    textDecoration: "none",
  },
}));

export type TopNavItemContentProps = {
  id: string;
  label: string;
  /**
   * link added to the nav item. if it is undefined, static text will be displayed.
   * fires onClick event when it is passed
   */
  href?: string;
  /**
   * determines whether the link item is diabled
   */
  isDisabled?: boolean;
  /**
   * Event fired when the nav item is clicked
   */
  onClick?: MouseEventHandler<HTMLAnchorElement> &
    MouseEventHandler<HTMLDivElement> &
    KeyboardEventHandler<HTMLDivElement>;
  /**
   * The link target prop. e.g., "_blank"
   */
  target?: string;
};

const TopNavItemContent = ({
  id,
  label,
  href,
  target,
  onClick,
  isDisabled,
}: TopNavItemContentProps) => {
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
      id={id}
      key={id}
      aria-disabled={isDisabled}
      isDisabled={isDisabled}
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
            role="button"
            tabIndex={0}
            onClick={onClick}
            onKeyDown={topNavItemContentKeyHandler}
          >
            <TopNavItemLabelContainer odysseyDesignTokens={odysseyDesignTokens}>
              {label}
            </TopNavItemLabelContainer>
          </NavItemContentClickContainer>
        ) : (
          <Link href={href} target={target} onClick={onClick}>
            <TopNavItemLabelContainer odysseyDesignTokens={odysseyDesignTokens}>
              {label}
            </TopNavItemLabelContainer>
          </Link>
        )
      }
    </TopNavListItemContainer>
  );
};

const MemoizedTopNavItemContent = memo(TopNavItemContent);
MemoizedTopNavItemContent.displayName = "TopNavItemContent";

export { MemoizedTopNavItemContent as TopNavItemContent };
