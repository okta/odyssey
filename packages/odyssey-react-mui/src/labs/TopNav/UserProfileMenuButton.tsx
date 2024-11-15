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
import { UserProfile, UserProfileProps } from "./UserProfile";
import { ChevronDownIcon } from "../../icons.generated";
import {
  BaseMenuButton,
  BaseMenuButtonWithChildrenProps,
  BaseMenuButtonWithPopoverContentProps,
} from "../../Buttons/BaseMenuButton";

export type UserProfileMenuButtonProps = (
  | BaseMenuButtonWithChildrenProps
  | BaseMenuButtonWithPopoverContentProps
) &
  UserProfileProps & { buttonVariant?: never, endIcon?: never };

const UserProfileMenuButton = ({
  profileIcon,
  userName,
  orgName,
  userNameEndIcon,
  ...menuButtonProps
}: UserProfileMenuButtonProps) => {

  return (
    <BaseMenuButton
      {...menuButtonProps}
      buttonVariant="floating"
      omitEndIcon={true}
      buttonChildren={
        <UserProfile
          profileIcon={profileIcon}
          userName={userName}
          orgName={orgName}
          userNameEndIcon={userNameEndIcon ?? <ChevronDownIcon />}
        />
      }
    />
  );
};

const MemoizedUserProfileMenuButton = memo(UserProfileMenuButton);
MemoizedUserProfileMenuButton.displayName = "UserProfileMenuButton";

export { MemoizedUserProfileMenuButton as UserProfileMenuButton };
