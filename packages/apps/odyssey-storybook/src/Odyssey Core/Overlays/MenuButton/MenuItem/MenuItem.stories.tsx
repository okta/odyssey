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

import { MenuItem, MenuItemProps, MenuList } from "@okta/odyssey-react-mui";
import { DeleteIcon, SettingsIcon } from "@okta/odyssey-react-mui/icons";
import { Meta, StoryObj } from "@storybook/react-vite";

import { staticBoardParameters } from "../../../../tools/boardStoryHelpers.js";
import { OdysseyStorybookThemeDecorator } from "../../../../tools/OdysseyStorybookThemeDecorator.js";
import { fieldComponentPropsMetaData } from "../../../Fields/fieldComponentPropsMetaData.js";

const storybookMeta: Meta<typeof MenuItem> = {
  component: MenuItem,
  decorators: [OdysseyStorybookThemeDecorator],
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "`MenuItem` composes `MenuButton` menus. It is not supported as a standalone Odyssey component.",
      },
    },
  },
  argTypes: {
    children: {
      control: "text",
      description: "The content for the `MenuItem` components within the Menu",
      table: {
        category: "Visual",
        type: {
          summary: "ReactNode",
        },
      },
      type: {
        required: true,
        name: "other",
        value: "ReactNode",
      },
    },
    hasInitialFocus: {
      control: false,
      description: "If `true`, focuses the item when the parent menu opens",
      table: {
        category: "Functional",
        type: {
          summary: "boolean",
        },
      },
    },
    isDisabled: fieldComponentPropsMetaData.isDisabled,
    isSelected: {
      control: "boolean",
      description:
        "If `true`, the menu item will be visually marked as selected.",
      table: {
        category: "Visual",
        type: {
          summary: "boolean",
        },
      },
    },
    variant: {
      options: ["default", "destructive"],
      control: { type: "radio" },
      description: "The variant of the triggering Button",
      table: {
        category: "Visual",
        type: {
          summary: ["default", "destructive"].join(" | "),
        },
        defaultValue: {
          summary: "default",
        },
      },
    },
  },
  args: {
    children: "MenuItem content",
    variant: "default",
    isDisabled: false,
  },
};

export default storybookMeta;

const BaseStory = (props: MenuItemProps) => {
  return (
    <div role="menu">
      <MenuItem {...props}>{props.children}</MenuItem>
    </div>
  );
};

export const Playground: StoryObj<MenuItemProps> = {
  render: BaseStory,
};

export const AllStates: StoryObj<MenuItemProps> = {
  parameters: staticBoardParameters,
  render: function C() {
    return (
      <MenuList>
        <MenuItem>Default</MenuItem>
        <MenuItem>
          <SettingsIcon /> Default with icon
        </MenuItem>
        <MenuItem variant="destructive">Destructive</MenuItem>
        {/* MenuItem never renders an icon of its own. The destructive variant
            only recolors, so a consumer-supplied icon has to inherit the danger
            color for the variant to read as destructive. */}
        <MenuItem variant="destructive">
          <DeleteIcon /> Destructive with icon
        </MenuItem>
        <MenuItem isDisabled>Disabled</MenuItem>
        <MenuItem isSelected>Selected</MenuItem>
      </MenuList>
    );
  },
};
