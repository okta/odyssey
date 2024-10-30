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
import { memo, type ReactElement } from "react";

import {
  DesignTokens,
  useOdysseyDesignTokens,
} from "../../OdysseyDesignTokensContext";
import { Subordinate } from "../../Typography";

const UserProfileContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})(({ odysseyDesignTokens }: { odysseyDesignTokens: DesignTokens }) => ({
  display: "flex",
  alignItems: "center",
  paddingInlineEnd: odysseyDesignTokens.Spacing4,
}));

const UserProfileIconContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})(({ odysseyDesignTokens }: { odysseyDesignTokens: DesignTokens }) => ({
  display: "flex",
  paddingInlineEnd: odysseyDesignTokens.Spacing2,
}));

const UserProfileInfoContainer = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
}));

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

const MemoizedUserProfile = memo(UserProfile);
MemoizedUserProfile.displayName = "UserProfile";

export { MemoizedUserProfile as UserProfile };
