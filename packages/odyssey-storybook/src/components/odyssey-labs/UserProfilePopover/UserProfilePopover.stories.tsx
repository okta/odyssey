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
  popoverAlignmentValues,
  UserProfilePopover,
  UserProfilePopoverProps,
} from "@okta/odyssey-react-mui/labs";
import { Meta, StoryObj } from "@storybook/react";
import { MuiThemeDecorator } from "../../../../.storybook/components";
import icons from "../../../../.storybook/components/iconUtils";
import { within } from "@storybook/testing-library";
import { UserIcon } from "@okta/odyssey-react-mui/icons";
import { PlaywrightProps } from "../../odyssey-mui/storybookTypes";
import { Heading5, Paragraph } from "@okta/odyssey-react-mui";

const storybookMeta: Meta<UserProfilePopoverProps> = {
  title: "Labs Components/UserProfilePopover",
  component: UserProfilePopover,
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
    popoverAlignment: {
      options: popoverAlignmentValues,
      control: { type: "radio" },
      description: "The horizontal alignment of the popover.",
      table: {
        type: {
          summary: popoverAlignmentValues.join(" | "),
        },
        defaultValue: {
          summary: "left",
        },
      },
    },
    children: {
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
    popoverAlignment: "right",
    children: (
      <>
        <Heading5 key="1">Popover Content</Heading5>
        <Paragraph key="2">Some more popover content.</Paragraph>
      </>
    ),
  },
  decorators: [MuiThemeDecorator],
  tags: ["autodocs"],
};

export default storybookMeta;

export const Default: StoryObj<UserProfilePopoverProps> = {};

export const WithLeftPopoverAlignment: StoryObj<UserProfilePopoverProps> = {
  args: {
    popoverAlignment: "left",
  },
  play: async ({
    canvasElement,
    step,
  }: PlaywrightProps<UserProfilePopoverProps>) => {
    await step("With profile icon", async () => {
      const canvas = within(canvasElement);
      const buttonPopover = canvas.queryByRole("button", {
        name: "More actions",
      });
      expect(buttonPopover).not.toBeNull();
    });
  },
};

export const WithoutProfileIcon: StoryObj<UserProfilePopoverProps> = {
  args: {
    profileIcon: undefined,
  },
  play: async ({
    canvasElement,
    step,
  }: PlaywrightProps<UserProfilePopoverProps>) => {
    await step("With profile icon", async () => {
      const canvas = within(canvasElement);
      const buttonPopover = canvas.queryByRole("button", {
        name: "More actions",
      });
      expect(buttonPopover).not.toBeNull();
    });
  },
};
