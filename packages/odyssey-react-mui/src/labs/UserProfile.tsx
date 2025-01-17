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

import { Box } from "../Box";
import { HtmlProps } from "../HtmlProps";
import {
  DesignTokens,
  useOdysseyDesignTokens,
} from "../OdysseyDesignTokensContext";
import { Subordinate } from "../Typography";

const UserProfileContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{ odysseyDesignTokens: DesignTokens }>({
  display: "flex",
  alignItems: "center",
});

const UserProfileIconContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{ odysseyDesignTokens: DesignTokens }>(({ odysseyDesignTokens }) => ({
  display: "flex",
  paddingInlineEnd: odysseyDesignTokens.Spacing2,
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
  /**
   * The icon element to display after the username
   */
  userNameEndIcon?: ReactElement;
} & Pick<HtmlProps, "translate">;

const UserProfile = ({
  profileIcon,
  userName,
  orgName,
  translate,
  userNameEndIcon,
}: UserProfileProps) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();

  return (
    <UserProfileContainer odysseyDesignTokens={odysseyDesignTokens}>
      {profileIcon && (
        <UserProfileIconContainer odysseyDesignTokens={odysseyDesignTokens}>
          {profileIcon}
        </UserProfileIconContainer>
      )}

      <div>
        {userNameEndIcon ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: odysseyDesignTokens.Spacing2,
            }}
          >
            <Subordinate color="textPrimary" translate={translate}>
              {userName}
            </Subordinate>
            {userNameEndIcon}
          </Box>
        ) : (
          <Subordinate color="textPrimary" translate={translate}>
            {userName}
          </Subordinate>
        )}
        <Subordinate color="textSecondary" translate={translate}>{orgName}</Subordinate>
      </div>
    </UserProfileContainer>
  );
};

const MemoizedUserProfile = memo(UserProfile);
MemoizedUserProfile.displayName = "UserProfile";

export { MemoizedUserProfile as UserProfile };
