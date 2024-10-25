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
import { Link } from "../../Link";
import {
  DesignTokens,
  useOdysseyDesignTokens,
} from "../../OdysseyDesignTokensContext";
import { UserProfile, UserProfileProps } from "./UserProfile";
import { TopNavLinkProps } from "./TopNavLink";
import { TopNavLinksList } from "./TopNavLinksList";

export const TOP_NAV_HEIGHT_TOKEN = "Spacing9";

export type TopNavProps = {
  /**
   *  Pass in a SearchField component with the variant="filled" prop set
   */
  SearchFieldComponent?: ReactElement;
  /**
   * Nav links in the top nav
   */
  topNavLinkItems: TopNavLinkProps[];
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
  alignItems: "center",
  backgroundColor: odysseyDesignTokens.HueNeutral50,
  display: "flex",
  height: odysseyDesignTokens[TOP_NAV_HEIGHT_TOKEN],
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
  SearchFieldComponent,
  topNavLinkItems,
  AdditionalNavItemComponent,
  settingsPageHref,
  helpPageHref,
  userProfile,
}: TopNavProps) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();
  const { t } = useTranslation();

  return (
    <TopNavContainer odysseyDesignTokens={odysseyDesignTokens}>
      {SearchFieldComponent && (
        <SearchFieldContainer odysseyDesignTokens={odysseyDesignTokens}>
          {SearchFieldComponent}
        </SearchFieldContainer>
      )}

      {topNavLinkItems && <TopNavLinksList topNavLinkItems={topNavLinkItems} />}

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
                <Link
                  href={settingsPageHref}
                  ariaLabel={t("topnav.settingsicon")}
                >
                  <SettingsIcon />
                </Link>
              </LinkContainer>
            )}

            {helpPageHref && (
              <LinkContainer odysseyDesignTokens={odysseyDesignTokens}>
                <Link href={helpPageHref} ariaLabel={t("topnav.helpicon")}>
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
