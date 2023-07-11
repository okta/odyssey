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

import { Meta, StoryObj } from "@storybook/react";
import {
  MenuButton,
  MenuButtonProps,
  buttonVariantValues,
  MenuItem,
  GroupIcon,
  GlobeIcon,
  CalendarIcon,
  MoreIcon,
} from "@okta/odyssey-react-mui";
import {
  Divider,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import { icons } from "../../../../.storybook/components/iconUtils";
import { MuiThemeDecorator } from "../../../../.storybook/components";

const storybookMeta: Meta<MenuButtonProps> = {
  title: "MUI Components/Menu Button",
  component: MenuButton,
  argTypes: {
    children: {
      control: "obj",
      description: "The <MenuItem> components within the Menu",
      table: {
        type: {
          summary: "[MenuItem | Divider | ListSubheader]",
        },
      },
    },
    buttonLabel: {
      control: "text",
      description: "The label on the triggering Button",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    buttonVariant: {
      options: buttonVariantValues,
      control: { type: "radio" },
      description: "The variant of the triggering Button",
      table: {
        type: {
          summary: buttonVariantValues.join(" | "),
        },
      },
    },
    endIcon: {
      control: {
        type: "select",
      },
      options: Object.keys(icons),
      mapping: icons,
      description: "The end Icon on the triggering Button",
      table: {
        type: {
          summary: "<Icon />",
        },
      },
    },
    id: {
      control: "text",
      description: "The id of the Button",
      table: {
        type: {
          summary: "string",
        },
        defaultValue: "",
      },
    },
    ariaLabel: {
      control: "text",
      description:
        "aria-label to describe the button when the button label is empty",
      table: {
        type: {
          summary: "string",
        },
      },
    },
  },
  args: {
    buttonLabel: "More actions",
    buttonVariant: "secondary",
    endIcon: <MoreIcon />,
  },
  decorators: [MuiThemeDecorator],
  tags: ["autodocs"],
};

export default storybookMeta;

export const Simple: StoryObj<MenuButtonProps> = {
  args: {
    buttonLabel: "More actions",
    children: [
      <MenuItem key="1">View details</MenuItem>,
      <MenuItem key="2">Edit configuration</MenuItem>,
      <MenuItem key="3">Launch</MenuItem>,
    ],
  },
};

export const ActionIcons: StoryObj<MenuButtonProps> = {
  args: {
    children: [
      <MenuItem key="1">
        <ListItemIcon>
          <GroupIcon />
        </ListItemIcon>
        <ListItemText>Assign crew</ListItemText>
      </MenuItem>,
      <MenuItem key="2">
        <ListItemIcon>
          <GlobeIcon />
        </ListItemIcon>
        <ListItemText>View destination</ListItemText>
      </MenuItem>,
      <MenuItem key="3">
        <ListItemIcon>
          <CalendarIcon />
        </ListItemIcon>
        <ListItemText>Schedule launch</ListItemText>
      </MenuItem>,
    ],
  },
};

export const ButtonVariant: StoryObj<MenuButtonProps> = {
  args: {
    buttonLabel: "More actions",
    buttonVariant: "floating",
    children: [
      <MenuItem key="1">View details</MenuItem>,
      <MenuItem key="2">Edit configuration</MenuItem>,
      <MenuItem key="3">Launch</MenuItem>,
    ],
  },
};

export const Groupings: StoryObj<MenuButtonProps> = {
  args: {
    buttonLabel: "More actions",
    children: [
      <ListSubheader>Crew</ListSubheader>,
      <MenuItem key="1">Assign captain</MenuItem>,
      <MenuItem key="2">View roster</MenuItem>,
      <ListSubheader>Ship</ListSubheader>,
      <MenuItem key="3">Configure thrusters</MenuItem>,
      <MenuItem key="4">View cargo</MenuItem>,
      <Divider />,
      <MenuItem key="5">Logout</MenuItem>,
    ],
  },
};

export const WithDestructive: StoryObj<MenuButtonProps> = {
  args: {
    buttonLabel: "Cargo options",
    children: [
      <MenuItem key="1">View details</MenuItem>,
      <MenuItem key="2">Edit inventory</MenuItem>,
      <MenuItem isDestructive key="3">
        Jettison cargo
      </MenuItem>,
    ],
  },
};

export const IconButton: StoryObj<MenuButtonProps> = {
  args: {
    ariaLabel: "Add",
    children: [
      <MenuItem key="1">View details</MenuItem>,
      <MenuItem key="2">Edit configuration</MenuItem>,
      <MenuItem key="3">Launch</MenuItem>,
    ],
    buttonLabel: "",
    endIcon: <MoreIcon />,
  },
};
