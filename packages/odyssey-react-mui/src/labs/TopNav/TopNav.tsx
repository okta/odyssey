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
import { memo, type ReactElement } from "react";
import { useTranslation } from "react-i18next";

import type { HtmlProps } from "../../HtmlProps";
import { QuestionCircleIcon, SettingsIcon } from "../../icons.generated";
import {
  DesignTokens,
  useOdysseyDesignTokens,
} from "../../OdysseyDesignTokensContext";
import { TopNavLinksList } from "./TopNavLinksList";
import { TopNavListItemProps } from "./TopNavListItem";
import { Link } from "../../Link";

export const TOP_NAV_HEIGHT = `${64 / 14}rem`;

export type TopNavProps = {
  /**
   * Pass in an additional component like `Button` that will be displayed after the nav link items
   */
  additionalNavItem?: ReactElement;
  /**
   * URL to the help page.
   */
  helpPageHref?: string;
  /**
   *  Pass in a SearchField component with the variant="filled" prop set
   */
  searchField?: ReactElement;
  /**
   * URL to settings page.
   */
  settingsPageHref?: string;
  /**
   * Nav links in the top nav
   */
  topNavLinkItems: TopNavListItemProps[];
  /**
   * Displays user account info
   */
  userProfile?: ReactElement;
} & Pick<HtmlProps, "testId">;

const StyledAdditionalNavItemContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{
  odysseyDesignTokens: DesignTokens;
}>(({ odysseyDesignTokens }) => ({
  paddingInline: odysseyDesignTokens.Spacing3,
}));

const StyledAdditionalLinkContainerWithBorder = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{
  odysseyDesignTokens: DesignTokens;
}>(({ odysseyDesignTokens }) => ({
  alignItems: "center",
  borderInlineEnd: `${odysseyDesignTokens.BorderWidthMain} solid ${odysseyDesignTokens.HueNeutral200}`,
  display: "flex",
  marginInlineEnd: odysseyDesignTokens.Spacing3,
}));

const StyledLinkAndProfileWrapper = styled("div")(() => ({
  alignItems: "center",
  display: "flex",
  marginInlineStart: "auto",
}));

const StyledLinkContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{
  odysseyDesignTokens: DesignTokens;
}>(({ odysseyDesignTokens }) => ({
  padding: odysseyDesignTokens.Spacing3,

  // "a": {
  //   color: `${odysseyDesignTokens.TypographyColorHeading} !important`,
  // },
}));

const StyledSearchFieldContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{
  odysseyDesignTokens: DesignTokens;
}>(({ odysseyDesignTokens }) => ({
  maxWidth: odysseyDesignTokens.TypographyLineLengthMax,
  width: "100%",
}));

const StyledTopNavContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{
  odysseyDesignTokens: DesignTokens;
}>(({ odysseyDesignTokens }) => ({
  alignItems: "center",
  backgroundColor: odysseyDesignTokens.HueNeutral50,
  display: "flex",
  height: TOP_NAV_HEIGHT,
  paddingBlock: odysseyDesignTokens.Spacing2,
  paddingInline: odysseyDesignTokens.Spacing6,
}));

const TopNav = ({
  additionalNavItem,
  helpPageHref,
  searchField,
  settingsPageHref,
  topNavLinkItems,
  userProfile,
}: TopNavProps) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();
  const { t } = useTranslation();

  return (
    <StyledTopNavContainer odysseyDesignTokens={odysseyDesignTokens}>
      {searchField && (
        <StyledSearchFieldContainer odysseyDesignTokens={odysseyDesignTokens}>
          {searchField}
        </StyledSearchFieldContainer>
      )}

      {topNavLinkItems && <TopNavLinksList topNavLinkItems={topNavLinkItems} />}

      <StyledLinkAndProfileWrapper>
        {(additionalNavItem || settingsPageHref || helpPageHref) && (
          <StyledAdditionalLinkContainerWithBorder
            odysseyDesignTokens={odysseyDesignTokens}
          >
            {additionalNavItem && (
              <StyledAdditionalNavItemContainer
                odysseyDesignTokens={odysseyDesignTokens}
              >
                {additionalNavItem}
              </StyledAdditionalNavItemContainer>
            )}

            {settingsPageHref && (
              <StyledLinkContainer odysseyDesignTokens={odysseyDesignTokens}>
                <Link
                  ariaLabel={t("topnav.settingsicon")}
                  href={settingsPageHref}
                  variant="monochrome"
                >
                  <SettingsIcon />
                </Link>
              </StyledLinkContainer>
            )}

            {helpPageHref && (
              <StyledLinkContainer odysseyDesignTokens={odysseyDesignTokens}>
                <Link ariaLabel={t("topnav.helpicon")} href={helpPageHref}>
                  <QuestionCircleIcon />
                </Link>
              </StyledLinkContainer>
            )}
          </StyledAdditionalLinkContainerWithBorder>
        )}

        {userProfile}
      </StyledLinkAndProfileWrapper>
    </StyledTopNavContainer>
  );
};

const MemoizedTopNav = memo(TopNav);
MemoizedTopNav.displayName = "TopNav";

export { MemoizedTopNav as TopNav };
