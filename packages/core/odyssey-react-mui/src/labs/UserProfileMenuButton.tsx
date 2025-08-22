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

import { memo } from "react";
import styled from "@emotion/styled";

import { ChevronDownIcon } from "../icons.generated/index.js";
import {
  AdditionalBaseMenuButtonProps,
  BaseMenuButton,
  BaseMenuButtonProps,
} from "../Buttons/BaseMenuButton.js";
import {
  DesignTokens,
  useOdysseyDesignTokens,
} from "../OdysseyDesignTokensContext.js";
import { UserProfile, UserProfileProps } from "./UserProfile.js";

const StyledUnsetButtonHeightContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{
  odysseyDesignTokens: DesignTokens;
}>(({ odysseyDesignTokens }) => ({
  button: {
    height: "unset",
    paddingBlock: odysseyDesignTokens.Spacing2,
    textAlign: "unset",
  },
}));

export type UserProfileMenuButtonProps = Omit<
  BaseMenuButtonProps,
  "endIcon" | "variant"
> &
  AdditionalBaseMenuButtonProps &
  UserProfileProps & {
    /**
     *
     * NOTE: In this case, attribute only applies to user name and org name
     */
    translate?: string;
  };

const UserProfileMenuButton = ({
  profileIcon,
  orgName,
  translate,
  userNameEndIcon,
  userName,
  ...menuButtonProps
}: UserProfileMenuButtonProps) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();

  return (
    <StyledUnsetButtonHeightContainer odysseyDesignTokens={odysseyDesignTokens}>
      <BaseMenuButton
        {...menuButtonProps}
        buttonVariant="floating"
        omitEndIcon={true}
        buttonChildren={
          <UserProfile
            profileIcon={profileIcon}
            userName={userName}
            orgName={orgName}
            translate={translate}
            userNameEndIcon={userNameEndIcon ?? <ChevronDownIcon />}
          />
        }
      />
    </StyledUnsetButtonHeightContainer>
  );
};

const MemoizedUserProfileMenuButton = memo(UserProfileMenuButton);
MemoizedUserProfileMenuButton.displayName = "UserProfileMenuButton";

export { MemoizedUserProfileMenuButton as UserProfileMenuButton };
