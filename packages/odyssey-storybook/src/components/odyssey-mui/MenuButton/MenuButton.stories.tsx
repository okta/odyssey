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
  Divider,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  MenuButton,
  MenuButtonProps,
  buttonVariantValues,
  MenuItem,
} from "@okta/odyssey-react-mui";
import {
  GroupIcon,
  GlobeIcon,
  CalendarIcon,
} from "@okta/odyssey-react-mui/icons";
import icons from "../../../../.storybook/components/iconUtils";
import { MuiThemeDecorator } from "../../../../.storybook/components";
import { userEvent, waitFor, within } from "@storybook/testing-library";
import { axeRun } from "../../../axe-util";
import type { PlaywrightProps } from "../storybookTypes";

const storybookMeta: Meta<MenuButtonProps> = {
  title: "MUI Components/Menu Button",
  component: MenuButton,
  argTypes: {
    ariaDescribedBy: {
      control: "text",
      description:
        "The ID of the element that describes the MenuButton, if one exists.",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    ariaLabel: {
      control: "text",
      description:
        "aria-label to describe the MenuButton when the button label is empty",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    ariaLabelledBy: {
      control: "text",
      description:
        "The ID of the element that labels the MenuButton. Only needed if the button has no text and `ariaLabel` is empty.",
      table: {
        type: {
          summary: "string",
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
        defaultValue: {
          summary: "secondary",
        },
      },
    },
    children: {
      control: "obj",
      description: "The <MenuItem> components within the Menu",
      table: {
        type: {
          summary: "[MenuItem | Divider | ListSubheader | NullElement]",
        },
      },
      type: {
        required: true,
        name: "other",
        value: "[MenuItem | Divider | ListSubheader]",
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
      },
    },
    isOverflow: {
      control: "boolean",
      description: "If the MenuButton is an overflow menu or standard menu.",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    tooltipText: {
      control: "text",
      description:
        "If defined, the button will include a tooltip that contains the string.",
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
  },
  decorators: [MuiThemeDecorator],
  tags: ["autodocs"],
};

export default storybookMeta;

const clickMenuButton =
  ({ canvasElement, step }: PlaywrightProps<MenuButtonProps>) =>
  async (args: MenuButtonProps, actionName: string) => {
    const canvas = within(canvasElement);
    await step("open menu button", async () => {
      const buttonElement = canvas.getByText(args.buttonLabel || "");
      userEvent.click(buttonElement);
      await waitFor(() => {
        axeRun(actionName);
      });
    });
  };

export const Simple: StoryObj<MenuButtonProps> = {
  args: {
    buttonLabel: "More actions",
    children: [
      <MenuItem key="1">View details</MenuItem>,
      <MenuItem key="2">Edit configuration</MenuItem>,
      <MenuItem key="3">Launch</MenuItem>,
    ],
  },
  play: async ({
    args,
    canvasElement,
    step,
  }: {
    args: MenuButtonProps;
    canvasElement: HTMLElement;
    step: PlaywrightProps<MenuButtonProps>["step"];
  }) => {
    clickMenuButton({ canvasElement, step })(args, "Menu Button Simple");
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
  play: async ({
    args,
    canvasElement,
    step,
  }: {
    args: MenuButtonProps;
    canvasElement: HTMLElement;
    step: PlaywrightProps<MenuButtonProps>["step"];
  }) => {
    clickMenuButton({ canvasElement, step })(args, "Menu Button Action Icons");
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
      <ListSubheader key="sh1">Crew</ListSubheader>,
      <MenuItem key="1">Assign captain</MenuItem>,
      <MenuItem key="2">View roster</MenuItem>,
      <ListSubheader key="sh2">Ship</ListSubheader>,
      <MenuItem key="3">Configure thrusters</MenuItem>,
      <MenuItem key="4">View cargo</MenuItem>,
      <Divider key="div2" />,
      <MenuItem key="5">Log out</MenuItem>,
    ],
  },
};

export const WithDestructive: StoryObj<MenuButtonProps> = {
  args: {
    buttonLabel: "Cargo options",
    children: [
      <MenuItem key="1">View details</MenuItem>,
      <MenuItem key="2">Edit inventory</MenuItem>,
      <MenuItem variant="destructive" key="3">
        Jettison cargo
      </MenuItem>,
    ],
  },
  play: async ({
    args,
    canvasElement,
    step,
  }: {
    args: MenuButtonProps;
    canvasElement: HTMLElement;
    step: PlaywrightProps<MenuButtonProps>["step"];
  }) => {
    clickMenuButton({ canvasElement, step })(args, "Menu Button Destructive");
  },
};

export const IconButton: StoryObj<MenuButtonProps> = {
  args: {
    ariaLabel: "More actions",
    buttonLabel: "",
    children: [
      <MenuItem key="1">View details</MenuItem>,
      <MenuItem key="2">Edit configuration</MenuItem>,
      <MenuItem key="3">Launch</MenuItem>,
    ],
    tooltipText: "More actions",
  },
};
