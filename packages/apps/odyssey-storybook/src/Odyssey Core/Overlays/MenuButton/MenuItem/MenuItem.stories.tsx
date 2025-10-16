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

import { Menu as MuiMenu } from "@mui/material";
import { MenuItem, MenuItemProps } from "@okta/odyssey-react-mui";
import { Meta, StoryObj } from "@storybook/react";
import { useRef } from "react";

import { OdysseyStorybookThemeDecorator } from "../../../../tools/OdysseyStorybookThemeDecorator.js";
import { fieldComponentPropsMetaData } from "../../../Fields/fieldComponentPropsMetaData.js";

const storybookMeta: Meta<typeof MenuItem> = {
  component: MenuItem,
  decorators: [OdysseyStorybookThemeDecorator],
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: "object",
      description: "The content for the `MenuItem` components within the Menu",
      table: {
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
      control: "boolean",
      description: "If `true`, focuses the item when the parent menu opens",
      table: {
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
  },
};

export default storybookMeta;

const BaseStory = (props: MenuItemProps) => {
  const anchorRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={anchorRef}>
      <MuiMenu anchorEl={anchorRef.current} open>
        <MenuItem {...props}>{props.children}</MenuItem>
      </MuiMenu>
    </div>
  );
};

export const Simple: StoryObj<MenuItemProps> = {
  render: function C(props: MenuItemProps) {
    return <BaseStory {...props} />;
  },
};

export const Destructive: StoryObj<MenuItemProps> = {
  args: {
    variant: "destructive",
    children: "Destructive MenuItem",
  },
  render: function C(props: MenuItemProps) {
    return <BaseStory {...props} />;
  },
};

export const Disabled: StoryObj<MenuItemProps> = {
  args: {
    isDisabled: true,
    children: "Disabled MenuItem",
  },
  render: function C(props: MenuItemProps) {
    return <BaseStory {...props} />;
  },
};

export const Selected: StoryObj<MenuItemProps> = {
  args: {
    isSelected: true,
    children: "Selected MenuItem",
  },
  render: function C(props: MenuItemProps) {
    return <BaseStory {...props} />;
  },
};
