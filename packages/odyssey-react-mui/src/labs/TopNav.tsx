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

import styled from "@emotion/styled";
import {
  memo,
  useMemo,
  ReactElement,
  useCallback,
  MouseEventHandler,
  KeyboardEventHandler,
} from "react";

import type { HtmlProps } from "../HtmlProps";
import {
  AuraIcon,
  QuestionCircleIcon,
  SettingsIcon,
  WordmarkIcon,
} from "../icons.generated";
import { Link } from "../Link";
import {
  DesignTokens,
  useOdysseyDesignTokens,
} from "../OdysseyDesignTokensContext";
import { Subordinate } from "../Typography";

export type TopNavLinkItem = {
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

export type UserProfileProps = {
  /**
   * Logged in user profile icon to be displayed in the top nav
   */
  profileIcon?: ReactElement;
  /**
   * Logged in user info to be displayed in the top nav
   */
  userName: string;
  /**
   * Org name of the logged in user
   */
  orgName: string;
};

export type TopNavProps = {
  /**
   * Determines whether to display the logo (aura & wordmark)
   */
  hasLogo?: boolean;
  /**
   *  Pass in a SearchField component with the variant="filled" prop set
   */
  SearchFieldComponent?: ReactElement;
  /**
   * Nav links in the top nav
   */
  topNavLinkItems: TopNavLinkItem[];
  /**
   * Pass in an additional component like `Button` that will be displayed after the nav link items
   */
  AdditionalNavItemComponent?: ReactElement;
  /**
   * URL to settings page.
   */
  settingsPageHref?: string;
  /**
   * URL to the help page.
   */
  helpPageHref?: string;
  /**
   * Displays user account info
   */
  userProfile?: UserProfileProps;
} & Pick<HtmlProps, "testId">;

const UserProfileContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})(({ odysseyDesignTokens }: { odysseyDesignTokens: DesignTokens }) => ({
  display: "flex",
  alignItems: "center",
  paddingRight: odysseyDesignTokens.Spacing4,
}));

const UserProfileIconContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})(({ odysseyDesignTokens }: { odysseyDesignTokens: DesignTokens }) => ({
  display: "flex",
  paddingRight: odysseyDesignTokens.Spacing2,
}));

const UserProfileInfoContainer = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
}));

const UserProfile = ({ profileIcon, userName, orgName }: UserProfileProps) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();

  return (
    <UserProfileContainer odysseyDesignTokens={odysseyDesignTokens}>
      {profileIcon && (
        <UserProfileIconContainer odysseyDesignTokens={odysseyDesignTokens}>
          {profileIcon}
        </UserProfileIconContainer>
      )}
      <UserProfileInfoContainer>
        <Subordinate color="textPrimary">{userName}</Subordinate>
        <Subordinate color="textSecondary">{orgName}</Subordinate>
      </UserProfileInfoContainer>
    </UserProfileContainer>
  );
};

const TopNavListContainer = styled("ul")(() => ({
  padding: 0,
  listStyle: "none",
  listStyleType: "none",
  display: "flex",
  alignItems: "center",
}));

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

const TopNavItemContent = ({
  id,
  label,
  href,
  target,
  onClick,
  isDisabled,
}: TopNavLinkItem) => {
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

const LinkAndProfileWrapper = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  marginLeft: "auto",
}));

const AdditionalLinkContainerWithBorder = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{
  odysseyDesignTokens: DesignTokens;
}>(({ odysseyDesignTokens }) => ({
  display: "flex",
  alignItems: "center",
  marginRight: odysseyDesignTokens.Spacing3,
  borderRight: `${odysseyDesignTokens.BorderWidthMain} solid ${odysseyDesignTokens.HueNeutral200}`,
}));

const LinkContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{
  odysseyDesignTokens: DesignTokens;
}>(({ odysseyDesignTokens }) => ({
  paddingRight: odysseyDesignTokens.Spacing3,
  "& a": {
    color: `${odysseyDesignTokens.TypographyColorHeading} !important`,
  },
}));

const TopNavContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{
  odysseyDesignTokens: DesignTokens;
}>(({ odysseyDesignTokens }) => ({
  display: "flex",
  alignItems: "center",
  backgroundColor: odysseyDesignTokens.HueNeutralWhite,
  height: odysseyDesignTokens.Spacing9,
}));

const LogoContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{
  odysseyDesignTokens: DesignTokens;
}>(({ odysseyDesignTokens }) => ({
  display: "flex",
  alignItems: "center",
  padding: `0 ${odysseyDesignTokens.Spacing9} 0 ${odysseyDesignTokens.Spacing5}`,
}));

const SearchFieldContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{
  odysseyDesignTokens: DesignTokens;
}>(({ odysseyDesignTokens }) => ({
  width: "350px",
  padding: `${odysseyDesignTokens.Spacing2} ${odysseyDesignTokens.Spacing3}`,
}));

const AdditionalNavItemContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{
  odysseyDesignTokens: DesignTokens;
}>(({ odysseyDesignTokens }) => ({
  padding: `0 ${odysseyDesignTokens.Spacing3}`,
}));

const TopNav = ({
  hasLogo,
  SearchFieldComponent,
  topNavLinkItems,
  AdditionalNavItemComponent,
  settingsPageHref,
  helpPageHref,
  userProfile,
}: TopNavProps) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();

  const processedNavItems = useMemo(
    () =>
      topNavLinkItems.map((item) => (
        <TopNavItemContent {...item} key={item.id} />
      )),
    [topNavLinkItems],
  );

  const LogoStyles = useMemo(
    () => ({
      fontSize: odysseyDesignTokens.TypographyScale6,
    }),
    [odysseyDesignTokens],
  );

  const LogoWordmarkStyles = useMemo(
    () => ({
      width: odysseyDesignTokens.Spacing9,
      paddingLeft: odysseyDesignTokens.Spacing2,
    }),
    [odysseyDesignTokens],
  );

  return (
    <TopNavContainer odysseyDesignTokens={odysseyDesignTokens}>
      {hasLogo && (
        <LogoContainer odysseyDesignTokens={odysseyDesignTokens}>
          <AuraIcon sx={LogoStyles} />
          <WordmarkIcon sx={LogoWordmarkStyles} />
        </LogoContainer>
      )}
      {SearchFieldComponent && (
        <SearchFieldContainer odysseyDesignTokens={odysseyDesignTokens}>
          {SearchFieldComponent}
        </SearchFieldContainer>
      )}
      <TopNavListContainer>
        {processedNavItems?.map((item) => item)}
      </TopNavListContainer>
      <LinkAndProfileWrapper>
        {(AdditionalNavItemComponent || settingsPageHref || helpPageHref) && (
          <AdditionalLinkContainerWithBorder
            odysseyDesignTokens={odysseyDesignTokens}
          >
            {AdditionalNavItemComponent && (
              <AdditionalNavItemContainer
                odysseyDesignTokens={odysseyDesignTokens}
              >
                {AdditionalNavItemComponent}
              </AdditionalNavItemContainer>
            )}
            {settingsPageHref && (
              <LinkContainer odysseyDesignTokens={odysseyDesignTokens}>
                <Link href={settingsPageHref} ariaLabel="settings page">
                  <SettingsIcon />
                </Link>
              </LinkContainer>
            )}
            {helpPageHref && (
              <LinkContainer odysseyDesignTokens={odysseyDesignTokens}>
                <Link href={helpPageHref} ariaLabel="help page">
                  <QuestionCircleIcon />
                </Link>
              </LinkContainer>
            )}
          </AdditionalLinkContainerWithBorder>
        )}
        {userProfile && <UserProfile {...userProfile} />}
      </LinkAndProfileWrapper>
    </TopNavContainer>
  );
};

const MemoizedTopNav = memo(TopNav);
MemoizedTopNav.displayName = "TopNav";

export { MemoizedTopNav as TopNav };
