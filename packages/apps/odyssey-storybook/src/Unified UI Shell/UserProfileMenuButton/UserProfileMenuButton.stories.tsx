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

import {
  Box,
  Heading3,
  Link,
  menuAlignmentValues,
  Subordinate,
  useOdysseyDesignTokens,
  verticalDividerAlignmentValues,
} from "@okta/odyssey-react-mui";
import { UserIcon } from "@okta/odyssey-react-mui/icons";
import {
  UserProfileMenuButton,
  UserProfileMenuButtonProps,
} from "@okta/odyssey-react-mui/labs";
import { Meta, StoryObj } from "@storybook/react-vite";
import { ReactNode } from "react";

import icons from "../../tools/iconUtils.js";
import { OdysseyStorybookThemeDecorator } from "../../tools/OdysseyStorybookThemeDecorator.js";

const BoxWithBottomMargin = ({ children }: { children: ReactNode }) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();

  return (
    <Box
      sx={{
        marginBottom: odysseyDesignTokens.Spacing4,
      }}
    >
      {children}
    </Box>
  );
};

const storybookMeta: Meta<UserProfileMenuButtonProps> = {
  component: UserProfileMenuButton,
  decorators: [OdysseyStorybookThemeDecorator],
  tags: ["autodocs"],
  argTypes: {
    hasVerticalDivider: {
      control: { type: "boolean" },
      description:
        "Add a vertical rule to divide the button from surrounding content",
      table: { type: { summary: "boolean" } },
    },
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
    menuAlignment: {
      options: menuAlignmentValues,
      control: { type: "radio" },
      description: "The horizontal alignment of the popover.",
      table: {
        type: {
          summary: menuAlignmentValues.join(" | "),
        },
        defaultValue: {
          summary: "left",
        },
      },
    },
    popoverContent: {
      control: "object",
      description: "The content to appear in the popover",
      table: {
        type: {
          summary: "[ReactNode | NullElement]",
        },
      },
      type: {
        required: true,
        name: "other",
        value: "[ReactNode]",
      },
    },
    verticalDividerAlignment: {
      options: verticalDividerAlignmentValues,
      control: { type: "radio" },
      description: "Show vertical rule before or after the button",
      table: {
        type: {
          summary: verticalDividerAlignmentValues.join(" | "),
        },
        defaultValue: {
          summary: "start",
        },
      },
    },
  },
  args: {
    userName: "test.user@test.com",
    orgName: "ORG123",
    profileIcon: <UserIcon />,
    menuAlignment: "left",
    popoverContent: (
      <Box sx={{ minWidth: "392px" }}>
        <BoxWithBottomMargin>
          <Heading3>Add-Min O'Cloudy Tud</Heading3>
        </BoxWithBottomMargin>
        <BoxWithBottomMargin>
          <Subordinate>administrator1@clouditude.net</Subordinate>
          <Subordinate>rain.okta1.com</Subordinate>
        </BoxWithBottomMargin>
        <BoxWithBottomMargin>
          <Link href="#">My Settings</Link>
        </BoxWithBottomMargin>
        <BoxWithBottomMargin>
          <Link href="#">Sign Out</Link>
        </BoxWithBottomMargin>
      </Box>
    ),
  },
};

export default storybookMeta;

export const Default: StoryObj<UserProfileMenuButtonProps> = {};

export const WithRightPopoverAlignment: StoryObj<UserProfileMenuButtonProps> = {
  args: {
    menuAlignment: "right",
  },
  render: function C(props: UserProfileMenuButtonProps) {
    return (
      <Box sx={{ ml: "500px" }}>
        <UserProfileMenuButton {...props} />
      </Box>
    );
  },
};

export const WithoutProfileIcon: StoryObj<UserProfileMenuButtonProps> = {
  args: {
    profileIcon: undefined,
  },
};

export const WithVerticalDivider: StoryObj<UserProfileMenuButtonProps> = {
  args: {
    hasVerticalDivider: true,
  },
};
