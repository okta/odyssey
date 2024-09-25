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
  Box,
  Divider,
  ListSubheader,
  MenuButton,
  MenuButtonProps,
  buttonVariantValues,
  MenuItem,
  menuAlignmentValues,
} from "@okta/odyssey-react-mui";
import {
  GroupIcon,
  GlobeIcon,
  CalendarIcon,
} from "@okta/odyssey-react-mui/icons";

import { fieldComponentPropsMetaData } from "../../../fieldComponentPropsMetaData";
import icons from "../../../../.storybook/components/iconUtils";
import { MuiThemeDecorator } from "../../../../.storybook/components";
import { userEvent, waitFor, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
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
    isDisabled: fieldComponentPropsMetaData.isDisabled,
    isOverflow: {
      control: "boolean",
      description: "If the MenuButton is an overflow menu or standard menu.",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    menuAlignment: {
      options: menuAlignmentValues,
      control: { type: "radio" },
      description: "The horizontal alignment of the menu.",
      table: {
        type: {
          summary: menuAlignmentValues.join(" | "),
        },
        defaultValue: {
          summary: "left",
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
    menuAlignment: "left",
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
      const buttonElement = canvas.getByRole("button", {
        name: args.buttonLabel,
      });
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
    await clickMenuButton({ canvasElement, step })(args, "Menu Button Simple");
  },
};

export const ActionIcons: StoryObj<MenuButtonProps> = {
  args: {
    children: [
      <MenuItem key="1" isDisabled>
        <GroupIcon />
        Assign crew
      </MenuItem>,
      <MenuItem key="2">
        <GlobeIcon />
        View destination
      </MenuItem>,
      <MenuItem key="3">
        <CalendarIcon />
        Schedule launch
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
    await clickMenuButton({ canvasElement, step })(
      args,
      "Menu Button Action Icons",
    );
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
    id: "floating",
  },
  play: async ({ canvasElement, step }: PlaywrightProps<MenuButtonProps>) => {
    await step("Filter and Select from listbox", async () => {
      const canvas = within(canvasElement);
      const button = canvas.getByRole("button", { name: "More actions" });
      expect(button).toHaveAttribute("id", "floating-button");
    });
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
  play: async ({
    args,
    canvasElement,
    step,
  }: {
    args: MenuButtonProps;
    canvasElement: HTMLElement;
    step: PlaywrightProps<MenuButtonProps>["step"];
  }) => {
    await clickMenuButton({ canvasElement, step })(
      args,
      "Menu Button Groupings",
    );
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
    await clickMenuButton({ canvasElement, step })(
      args,
      "Menu Button Destructive",
    );
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
  play: async ({ canvasElement, step }: PlaywrightProps<MenuButtonProps>) => {
    await step("MenuButton Aria-Label", async () => {
      const canvas = within(canvasElement);
      const menuButton = canvas.queryByRole("button", { name: "More actions" });
      expect(menuButton).not.toBeNull();
    });
  },
};

export const EndIcon: StoryObj<MenuButtonProps> = {
  args: {
    ariaLabel: "More actions",
    endIcon: <GroupIcon />,
    children: [
      <MenuItem key="1">View details</MenuItem>,
      <MenuItem key="2">Edit configuration</MenuItem>,
      <MenuItem key="3">Launch</MenuItem>,
    ],
    tooltipText: "Learn more",
  },
};

export const Overflow: StoryObj<MenuButtonProps> = {
  args: {
    buttonLabel: "Cargo options",
    children: [
      <MenuItem key="1">View details</MenuItem>,
      <MenuItem key="2">Edit configuration</MenuItem>,
      <MenuItem key="3">Launch</MenuItem>,
    ],
    isOverflow: true,
  },
};

export const Disabled: StoryObj<MenuButtonProps> = {
  args: {
    buttonLabel: "Cargo options",
    isDisabled: true,
    children: [
      <MenuItem key="1">View details</MenuItem>,
      <MenuItem key="2">Edit configuration</MenuItem>,
      <MenuItem key="3">Launch</MenuItem>,
    ],
    tooltipText: "More actions",
  },
};

export const Alignment: StoryObj<MenuButtonProps> = {
  args: {
    buttonVariant: "secondary",
    children: [
      <MenuItem key="1">View details</MenuItem>,
      <MenuItem key="2">Edit configuration</MenuItem>,
      <MenuItem key="3">Launch</MenuItem>,
    ],
    menuAlignment: "right",
  },
  render: function C(props: MenuButtonProps) {
    return (
      <Box sx={{ ml: "50px" }}>
        <MenuButton
          buttonLabel="More actions"
          buttonVariant={props.buttonVariant}
          menuAlignment={props.menuAlignment}
        >
          {props.children}
        </MenuButton>
      </Box>
    );
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
    await clickMenuButton({ canvasElement, step })(
      args,
      "Menu Button Alignment",
    );
  },
};
