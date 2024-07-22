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
import { memo, useMemo, ReactElement, useCallback, KeyboardEvent } from "react";

import { Box } from "../Box";
import type { HtmlProps } from "../HtmlProps";
import {
  AuraIcon,
  AuraWordmarkIcon,
  QuestionCircleIcon,
  SettingsIcon,
} from "../icons.generated";
import { Link } from "../Link";
import {
  DesignTokens,
  useOdysseyDesignTokens,
} from "../OdysseyDesignTokensContext";

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
  onClick?(): void;
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
   *  Determines whether the search box is displayed
   */
  search?: ReactElement;
  /**
   * Nav links in the top nav
   */
  topNavLinkItems: TopNavLinkItem[];
  /**
   * Displays an additional button after the link items if it is passed
   */
  additionalNavItem?: ReactElement;
  /**
   * link to settings page
   */
  settingsLink?: string;
  /**
   * help link
   */
  helpLink?: string;
  /**
   * determines whether the divider is displayed before the user profile / account info
   */
  hasDivider?: boolean;

  /**
   * help link
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

const UserProfile = ({ profileIcon, userName, orgName }: UserProfileProps) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();

  const userProfileIconStyles = useMemo(
    () => ({
      paddingRight: odysseyDesignTokens.Spacing2,
    }),
    [odysseyDesignTokens],
  );

  const userProfileInfoContainerStyles = useMemo(
    () => ({
      display: "flex",
      flexDirection: "column",
    }),
    [],
  );

  const userProfileEmailInfoStyles = useMemo(
    () => ({
      color: odysseyDesignTokens.TypographyColorHeading,
      fontSize: odysseyDesignTokens.TypographySizeSubordinate,
    }),
    [odysseyDesignTokens],
  );

  const userProfileOrgInfoStyles = useMemo(
    () => ({
      color: odysseyDesignTokens.TypographyColorSubordinate,
      fontSize: odysseyDesignTokens.TypographySizeSubordinate,
    }),
    [odysseyDesignTokens],
  );

  return (
    <UserProfileContainer odysseyDesignTokens={odysseyDesignTokens}>
      {profileIcon && <Box sx={userProfileIconStyles}>{profileIcon}</Box>}
      <Box sx={userProfileInfoContainerStyles}>
        <Box sx={userProfileEmailInfoStyles}>{userName}</Box>
        <Box sx={userProfileOrgInfoStyles}>{orgName}</Box>
      </Box>
    </UserProfileContainer>
  );
};

const TopNavListContainer = styled.ul({
  padding: 0,
  listStyle: "none",
  listStyleType: "none",
  display: "flex",
  alignItems: "center",
});

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
  disabled?: boolean;
  isDisabled?: boolean;
}>(({ odysseyDesignTokens, isDisabled }) => ({
  display: "flex",
  alignItems: "center",
  cursor: isDisabled ? "default" : "pointer",
  pointerEvents: isDisabled ? "none" : "auto",
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

const TopNavItemContent = ({
  id,
  label,
  href,
  target,
  onClick,
  isDisabled,
}: TopNavLinkItem) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();

  const NavItemContentClickContainer = styled("div", {
    shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
  })(() => ({
    display: "flex",
    alignItems: "center",
    width: "100%",
    padding: `${odysseyDesignTokens.Spacing2} ${odysseyDesignTokens.Spacing4}`,
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

  const TopNavItemContentKeyHandler = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event?.key === "Enter") {
        event.preventDefault();
        event.stopPropagation();
        onClick?.();
      }
    },
    [onClick],
  );

  const TopNavItemContent = useMemo(() => {
    return (
      <TopNavListItemContainer
        id={id}
        key={id}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        isDisabled={isDisabled}
        odysseyDesignTokens={odysseyDesignTokens}
      >
        {
          // Use Link for nav items with links and div for disabled or non-link items
          isDisabled ? (
            <NavItemContentClickContainer>
              <TopNavItemLabelContainer
                odysseyDesignTokens={odysseyDesignTokens}
              >
                {label}
              </TopNavItemLabelContainer>
            </NavItemContentClickContainer>
          ) : !href ? (
            <NavItemContentClickContainer
              role="button"
              tabIndex={0}
              onClick={onClick}
              onKeyDown={TopNavItemContentKeyHandler}
            >
              <TopNavItemLabelContainer
                odysseyDesignTokens={odysseyDesignTokens}
              >
                {label}
              </TopNavItemLabelContainer>
            </NavItemContentClickContainer>
          ) : (
            <Link href={href} target={target} onClick={onClick}>
              <TopNavItemLabelContainer
                odysseyDesignTokens={odysseyDesignTokens}
              >
                {label}
              </TopNavItemLabelContainer>
            </Link>
          )
        }
      </TopNavListItemContainer>
    );
  }, [
    id,
    label,
    href,
    target,
    onClick,
    isDisabled,
    NavItemContentClickContainer,
    TopNavItemContentKeyHandler,
    odysseyDesignTokens,
  ]);

  return TopNavItemContent;
};

const TopNav = ({
  hasLogo,
  search,
  topNavLinkItems,
  additionalNavItem,
  settingsLink,
  helpLink,
  hasDivider,
  userProfile,
}: TopNavProps) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();

  const TopNavStyles = useMemo(
    () => ({
      display: "flex",
      alignItems: "center",
      backgroundColor: odysseyDesignTokens.HueNeutralWhite,
      height: odysseyDesignTokens.Spacing9,
    }),
    [odysseyDesignTokens],
  );

  const LogoContainerStyles = useMemo(
    () => ({
      display: "flex",
      alignItems: "center",
      padding: `0 ${odysseyDesignTokens.Spacing9} 0 ${odysseyDesignTokens.Spacing5}`,
    }),
    [odysseyDesignTokens],
  );

  const LogoStyles = useMemo(
    () => ({
      fontSize: odysseyDesignTokens.TypographyScale6,
    }),
    [odysseyDesignTokens],
  );

  const LogoWordmarkStyles = useMemo(
    () => ({
      width: "55px",
      height: "20px",
      paddingLeft: odysseyDesignTokens.Spacing2,
    }),
    [odysseyDesignTokens],
  );

  const searchContainerStyles = useMemo(
    () => ({
      width: "350px",
      padding: `${odysseyDesignTokens.Spacing2} ${odysseyDesignTokens.Spacing3}`,
    }),
    [odysseyDesignTokens],
  );

  const additionalNavItemContainerStyles = useMemo(
    () => ({
      marginLeft: "auto",
      padding: `0 ${odysseyDesignTokens.Spacing3}`,
    }),
    [odysseyDesignTokens],
  );

  const linkContainerStyles = useMemo(
    () => ({
      paddingRight: odysseyDesignTokens.Spacing3,
      "& a": {
        color: `${odysseyDesignTokens.TypographyColorHeading} !important`,
      },
    }),
    [odysseyDesignTokens],
  );

  const dividerContainerStyles = useMemo(
    () => ({
      margin: `0 ${odysseyDesignTokens.Spacing3} 0 0`,
      padding: `${odysseyDesignTokens.Spacing4} 0`,
      borderLeft: `${odysseyDesignTokens.BorderWidthMain} solid ${odysseyDesignTokens.HueNeutral200}`,
    }),
    [odysseyDesignTokens],
  );

  return (
    <Box sx={TopNavStyles}>
      {hasLogo && (
        <Box sx={LogoContainerStyles}>
          <AuraIcon sx={LogoStyles} />
          <AuraWordmarkIcon sx={LogoWordmarkStyles} />
        </Box>
      )}
      {search && <Box sx={searchContainerStyles}>{search}</Box>}
      <TopNavListContainer>
        {topNavLinkItems?.map((item) => {
          return <TopNavItemContent key={item.id} {...item} />;
        })}
      </TopNavListContainer>
      {additionalNavItem && (
        <Box sx={additionalNavItemContainerStyles}>{additionalNavItem}</Box>
      )}
      {settingsLink && (
        <Box sx={linkContainerStyles}>
          <Link href={settingsLink}>
            <SettingsIcon />
          </Link>
        </Box>
      )}
      {helpLink && (
        <Box sx={linkContainerStyles}>
          <Link href={helpLink}>
            <QuestionCircleIcon />
          </Link>
        </Box>
      )}
      {hasDivider && <Box sx={dividerContainerStyles}></Box>}
      {userProfile && UserProfile(userProfile)}
    </Box>
  );
};

const MemoizedTopNav = memo(TopNav);
MemoizedTopNav.displayName = "TopNav";

export { MemoizedTopNav as TopNav };
