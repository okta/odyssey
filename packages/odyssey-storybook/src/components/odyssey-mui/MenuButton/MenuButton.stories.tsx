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

import { Meta, Story } from "@storybook/react";
import {
  CalendarIcon,
  Divider,
  GlobeIcon,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  MenuButton,
  MenuButtonProps,
  MenuItem,
  OverflowVerticalIcon,
  UserGroupIcon,
} from "@okta/odyssey-react-mui";
import { MuiThemeDecorator } from "../../../../.storybook/components";

import MenuButtonMdx from "./MenuButton.mdx";

const storybookMeta: Meta<MenuButtonProps> = {
  title: `MUI Components/Menu Button`,
  component: MenuButton,
  parameters: {
    docs: {
      page: MenuButtonMdx,
    },
  },
  argTypes: {
    children: {
      control: "text",
      defaultValue: undefined,
    },
    buttonLabel: {
      control: "text",
      defaultValue: "More actions",
    },
    buttonEndIcon: {
      control: "text",
      defaultValue: undefined,
    },
    buttonVariant: {
      control: "text",
      defaultValue: undefined,
    },
    tooltipTitle: {
      control: "text",
      defaultValue: undefined,
    },
  },
  decorators: [MuiThemeDecorator],
};

export default storybookMeta;

const DefaultTemplate: Story<MenuButtonProps> = (args) => {
  return <MenuButton {...args}>{args.children}</MenuButton>;
};

export const Simple = DefaultTemplate.bind({});
Simple.args = {
  children: [
    <MenuItem>View details</MenuItem>,
    <MenuItem>Edit configuration</MenuItem>,
    <MenuItem>Launch</MenuItem>,
  ],
};

export const ActionIcons = DefaultTemplate.bind({});
ActionIcons.args = {
  children: [
    <MenuItem>
      <ListItemIcon>
        <UserGroupIcon />
      </ListItemIcon>
      <ListItemText>Assign crew</ListItemText>
    </MenuItem>,
    <MenuItem>
      <ListItemIcon>
        <GlobeIcon />
      </ListItemIcon>
      <ListItemText>View destination</ListItemText>
    </MenuItem>,
    <MenuItem>
      <ListItemIcon>
        <CalendarIcon />
      </ListItemIcon>
      <ListItemText>Schedule launch</ListItemText>
    </MenuItem>,
  ],
};

export const ButtonVariant = DefaultTemplate.bind({});
ButtonVariant.args = {
  buttonVariant: "floating",
  children: [
    <MenuItem>View details</MenuItem>,
    <MenuItem>Edit configuration</MenuItem>,
    <MenuItem>Launch</MenuItem>,
  ],
};

export const Groupings = DefaultTemplate.bind({});
Groupings.args = {
  children: [
    <ListSubheader>Crew</ListSubheader>,
    <MenuItem>Assign captain</MenuItem>,
    <MenuItem>View roster</MenuItem>,
    <ListSubheader>Ship</ListSubheader>,
    <MenuItem>Configure thrusters</MenuItem>,
    <MenuItem>View cargo</MenuItem>,
    <Divider />,
    <MenuItem>Log out</MenuItem>,
  ],
};

export const WithDestructive = DefaultTemplate.bind({});
WithDestructive.args = {
  buttonLabel: "Cargo options",
  children: [
    <MenuItem>View details</MenuItem>,
    <MenuItem>Edit inventory</MenuItem>,
    <MenuItem isDestructive>Jettison cargo</MenuItem>,
  ],
};

export const IconButton = DefaultTemplate.bind({});
IconButton.args = {
  children: [
    <MenuItem>View details</MenuItem>,
    <MenuItem>Edit configuration</MenuItem>,
    <MenuItem>Launch</MenuItem>,
  ],
  buttonLabel: undefined,
  buttonEndIcon: <OverflowVerticalIcon />,
  tooltipTitle: "More actions",
};
