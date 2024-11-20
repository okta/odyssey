/*!
 * Copyright (c) 2021-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { UserProfile, UserProfileProps } from "@okta/odyssey-react-mui/labs";
import { Meta, StoryObj } from "@storybook/react";
import { MuiThemeDecorator } from "../../../../.storybook/components";
import icons from "../../../../.storybook/components/iconUtils";
import { ChevronDownIcon, UserIcon } from "@okta/odyssey-react-mui/icons";

const storybookMeta: Meta<UserProfileProps> = {
  title: "Labs Components/UserProfile",
  component: UserProfile,
  argTypes: {
    profileIcon: {
      control: { type: "select" },
      options: Object.keys(icons),
      mapping: icons,
      description: "An optional icon to display ahead of the user profile",
      table: { type: { summary: "<Icon />" } },
    },
    userName: {
      control: "text",
      description: "Org name of the logged in user",
      table: { type: { summary: "string" } },
    },
    orgName: {
      control: "text",
      description: "Org name of the logged in user",
      table: { type: { summary: "string" } },
    },
    userNameEndIcon: {
      control: { type: "select" },
      options: Object.keys(icons),
      mapping: icons,
      description: "An optional icon to display at the end of the user profile",
      table: { type: { summary: "<Icon />" } },
    },
  },
  args: {
    userName: "test.user@test.com",
    orgName: "ORG123",
  },
  decorators: [MuiThemeDecorator],
  tags: ["autodocs"],
};

export default storybookMeta;

export const Default: StoryObj<UserProfileProps> = {};

export const WithProfileIcon: StoryObj<UserProfileProps> = {
  args: {
    profileIcon: <UserIcon />,
  },
};

export const WithUserEndIcon: StoryObj<UserProfileProps> = {
  args: {
    userNameEndIcon: <ChevronDownIcon />,
  },
};

export const WithProfileAndUserEndIcon: StoryObj<UserProfileProps> = {
  args: {
    profileIcon: <UserIcon />,
    userNameEndIcon: <ChevronDownIcon />,
  },
};
