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
} from "@okta/odyssey-react-mui";
import {
  UserProfileMenuButton,
  UserProfileMenuButtonProps,
} from "@okta/odyssey-react-mui/labs";
import { Meta, StoryObj } from "@storybook/react";
import { MuiThemeDecorator } from "../../../../.storybook/components";
import icons from "../../../../.storybook/components/iconUtils";
import { within } from "@storybook/testing-library";
import { UserIcon } from "@okta/odyssey-react-mui/icons";
import { PlaywrightProps } from "../../odyssey-mui/storybookTypes";
import { ReactNode } from "react";

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
  title: "Labs Components/UserProfileMenuButton",
  component: UserProfileMenuButton,
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
      control: "obj",
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
  decorators: [MuiThemeDecorator],
  tags: ["autodocs"],
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
  play: async ({
    canvasElement,
    step,
  }: PlaywrightProps<UserProfileMenuButtonProps>) => {
    await step("With profile icon", async () => {
      const canvas = within(canvasElement);
      const buttonPopover = canvas.queryByRole("button", {
        name: "More actions",
      });
      expect(buttonPopover).not.toBeNull();
    });
  },
};

export const WithoutProfileIcon: StoryObj<UserProfileMenuButtonProps> = {
  args: {
    profileIcon: undefined,
  },
  play: async ({
    canvasElement,
    step,
  }: PlaywrightProps<UserProfileMenuButtonProps>) => {
    await step("With profile icon", async () => {
      const canvas = within(canvasElement);
      const buttonPopover = canvas.queryByRole("button", {
        name: "More actions",
      });
      expect(buttonPopover).not.toBeNull();
    });
  },
};

export const PrimaryVariant: StoryObj<UserProfileMenuButtonProps> = {
  args: {
    buttonVariant: "primary",
  },
};

export const SecondaryVariant: StoryObj<UserProfileMenuButtonProps> = {
  args: {
    buttonVariant: "secondary",
  },
};

export const DangerVariant: StoryObj<UserProfileMenuButtonProps> = {
  args: {
    buttonVariant: "danger",
  },
};

export const DangerSecondaryVariant: StoryObj<UserProfileMenuButtonProps> = {
  args: {
    buttonVariant: "dangerSecondary",
  },
};

export const FloatingActionVariant: StoryObj<UserProfileMenuButtonProps> = {
  args: {
    buttonVariant: "floatingAction",
  },
};
