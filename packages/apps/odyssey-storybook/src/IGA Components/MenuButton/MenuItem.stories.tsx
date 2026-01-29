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
  MenuButton,
  MenuItem,
  type MenuItemProps,
  Tooltip,
} from "@okta/odyssey-contributions-iga-components";
import { Meta, StoryObj } from "@storybook/react-vite";

import { IgaComponentsOdysseyStorybookThemeDecorator } from "../../tools/IgaComponentsOdysseyStorybookThemeDecorator.js";

const meta = {
  component: MenuItem,
  decorators: [IgaComponentsOdysseyStorybookThemeDecorator],
  tags: ["autodocs"],
  argTypes: {
    ariaDisabled: {
      control: "boolean",
      description:
        "If `true`, the menu item appears disabled but remains focusable and can show tooltips. Use this instead of `isDisabled` when you need to display a tooltip on a disabled menu item.",
      table: { category: "Visual", type: { summary: "boolean" } },
    },
    children: {
      control: "text",
      description: "The content of the menu item.",
      table: { category: "Visual", type: { summary: "ReactNode" } },
    },
    isDisabled: {
      control: "boolean",
      description:
        "If `true`, the menu item will be visually marked as disabled.",
      table: { category: "Visual", type: { summary: "boolean" } },
    },
    isSelected: {
      control: "boolean",
      description:
        "If `true`, the menu item will be visually marked as selected.",
      table: { category: "Visual", type: { summary: "boolean" } },
    },
    onClick: {
      action: true,
      description: "Callback fired when the menu item is clicked.",
      table: { category: "Functional", type: { summary: "(() => void)" } },
    },
    variant: {
      options: ["default", "destructive"],
      control: { type: "radio" },
      description: "The variant of the menu item.",
      table: {
        category: "Visual",
        type: { summary: '"default" | "destructive"' },
        defaultValue: { summary: "default" },
      },
    },
  },
  args: {
    children: "Menu item label",
  },
} satisfies Meta<MenuItemProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DisabledWithTooltip: Story = {
  name: "Disabled with Tooltip",
  parameters: {
    docs: {
      description: {
        story:
          "Menu items can display tooltips when disabled by using `ariaDisabled` instead of `isDisabled`. Wrap the MenuItem with a Tooltip component to show the tooltip on hover. This example shows both default and destructive variants.",
      },
    },
  },
  render: () => (
    <MenuButton buttonLabel="Open Menu">
      <MenuItem>Enabled action</MenuItem>
      <Tooltip placement="right" text="This action is currently unavailable">
        <MenuItem ariaDisabled>Disabled default with tooltip</MenuItem>
      </Tooltip>
      <Tooltip placement="right" text="You do not have permission to delete">
        <MenuItem ariaDisabled variant="destructive">
          Disabled destructive with tooltip
        </MenuItem>
      </Tooltip>
      <MenuItem>Another enabled action</MenuItem>
    </MenuButton>
  ),
};
