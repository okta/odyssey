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
import { ContrastMode } from "../../useContrastMode";
import { Subordinate } from "../../Typography";
import { Box } from "../../Box";

const UserProfileContainer = styled("div", {
  shouldForwardProp: (prop) =>
    prop !== "odysseyDesignTokens" && prop !== "contrastMode",
})<{
  odysseyDesignTokens: DesignTokens;
  contrastMode: ContrastMode;
}>(({ odysseyDesignTokens, contrastMode }) => ({
  display: "flex",
  alignItems: "center",
  paddingInlineEnd: odysseyDesignTokens.Spacing4,
  color: contrastMode === "highContrast" ? "#ffffff" : "inherit",
}));

const UserProfileIconContainer = styled("div", {
  shouldForwardProp: (prop) =>
    prop !== "odysseyDesignTokens" && prop !== "contrastMode",
})<{
  odysseyDesignTokens: DesignTokens;
  contrastMode: ContrastMode;
}>(({ odysseyDesignTokens, contrastMode }) => ({
  display: "flex",
  paddingInlineEnd: odysseyDesignTokens.Spacing2,
  color: contrastMode === "highContrast" ? "#ffffff" : "inherit",
}));

const UserProfileInfoContainer = styled("div", {
  shouldForwardProp: (prop) =>
    prop !== "odysseyDesignTokens" && prop !== "contrastMode",
})<{
  odysseyDesignTokens: DesignTokens;
  contrastMode: ContrastMode;
}>(({ odysseyDesignTokens, contrastMode }) => ({
  display: "flex",
  flexDirection: "column",
  textAlign: "left",
  color:
    contrastMode === "highContrast"
      ? odysseyDesignTokens.HueNeutralWhite
      : "inherit",
}));

// Update props type
export type UserProfileProps = {
  contrastMode: ContrastMode; // Add this
  profileIcon?: ReactElement;
  userName: string;
  orgName: string;
  userNameEndIcon?: ReactElement;
};

const UserProfile = ({
  profileIcon,
  userName,
  orgName,
  userNameEndIcon,
  contrastMode, // Add this
}: UserProfileProps) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();

  return (
    <UserProfileContainer
      odysseyDesignTokens={odysseyDesignTokens}
      contrastMode={contrastMode}
    >
      {profileIcon && (
        <UserProfileIconContainer
          odysseyDesignTokens={odysseyDesignTokens}
          contrastMode={contrastMode}
        >
          {profileIcon}
        </UserProfileIconContainer>
      )}

      <UserProfileInfoContainer
        odysseyDesignTokens={odysseyDesignTokens}
        contrastMode={contrastMode}
      >
        {userNameEndIcon ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: odysseyDesignTokens.Spacing2,
            }}
          >
            <Subordinate
              color={contrastMode === "highContrast" ? "white" : "textPrimary"}
            >
              {userName}
            </Subordinate>
            {userNameEndIcon}
          </Box>
        ) : (
          <Subordinate
            color={contrastMode === "highContrast" ? "white" : "textPrimary"}
          >
            {userName}
          </Subordinate>
        )}
        <Subordinate
          color={contrastMode === "highContrast" ? "#a0a0a0" : "textSecondary"}
        >
          {orgName}
        </Subordinate>
      </UserProfileInfoContainer>
    </UserProfileContainer>
  );
};

const MemoizedUserProfile = memo(UserProfile);
MemoizedUserProfile.displayName = "UserProfile";

export { MemoizedUserProfile as UserProfile };
