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

import type { HtmlProps } from "../../HtmlProps";
import { TopNavListItem, TopNavListItemProps } from "./TopNavListItem";
import { UserProfileProps } from "../../labs/UserProfile";

export type TopNavLinksListProps = {
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
  userProfile?: UserProfileProps;
} & Pick<HtmlProps, "testId">;

const StyledTopNavList = styled("ul")(() => ({
  alignItems: "center",
  display: "flex",
  listStyle: "none",
  listStyleType: "none",
  padding: 0,
}));

const TopNavLinksList = ({ topNavLinkItems }: TopNavLinksListProps) => (
  <nav>
    <StyledTopNavList>
      {topNavLinkItems.map((item) => (
        <TopNavListItem {...item} key={item.id} />
      ))}
    </StyledTopNavList>
  </nav>
);

const MemoizedTopNavLinksList = memo(TopNavLinksList);
MemoizedTopNavLinksList.displayName = "TopNavLinksList";

export { MemoizedTopNavLinksList as TopNavLinksList };
