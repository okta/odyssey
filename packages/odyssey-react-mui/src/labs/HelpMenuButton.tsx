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

import { memo, ReactNode } from "react";
// import { UserProfile, UserProfileProps } from "./UserProfile";
import { QuestionCircleIcon } from "../icons.generated";
import {
  BaseMenuButton,
  BaseMenuButtonWithPopoverContentProps,
} from "../Buttons/BaseMenuButton";

export type HelpMenuButtonProps = {
  HelpMenuComponent: ReactNode;
} & BaseMenuButtonWithPopoverContentProps;

const HelpMenuButton = (props: HelpMenuButtonProps) => {
  const {
    HelpMenuComponent,
    buttonVariant = "floating",
    ...menuButtonProps
  } = props;
  return (
    <BaseMenuButton
      {...menuButtonProps}
      buttonVariant={buttonVariant}
      endIcon={<QuestionCircleIcon />}
      omitEndIcon={false}
      popoverContent={HelpMenuComponent}
    />
  );
};

const MemoizedHelpMenuButton = memo(HelpMenuButton);
MemoizedHelpMenuButton.displayName = "HelpMenuButton";

export { MemoizedHelpMenuButton as HelpMenuButton };
