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

import type { ReactNode } from "react";

import {
  Box,
  buttonVariantValues,
  Divider,
  Heading5,
  Link,
  ListSubheader,
  menuAlignmentValues,
  MenuButton,
  MenuButtonProps,
  MenuItem,
  Paragraph,
  Subordinate,
  useOdysseyDesignTokens,
} from "@okta/odyssey-react-mui";
import {
  CalendarIcon,
  GlobeIcon,
  GroupIcon,
  QuestionCircleIcon,
} from "@okta/odyssey-react-mui/icons";
import { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, waitFor, within } from "@storybook/test";

import type { PlaywrightProps } from "../../../tools/storybookTypes.js";

import { axeRun } from "../../../axeRun.js";
import icons from "../../../tools/iconUtils.js";
import { OdysseyStorybookThemeDecorator } from "../../../tools/OdysseyStorybookThemeDecorator.js";
import { fieldComponentPropsMetaData } from "../../Fields/fieldComponentPropsMetaData.js";

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

const storybookMeta: Meta<typeof MenuButton> = {
  component: MenuButton,
  decorators: [OdysseyStorybookThemeDecorator],
  tags: ["autodocs"],
  argTypes: {
    ariaDescribedBy: {
      control: "text",
      description:
        "The ID of the element that describes the MenuButton, if one exists.",
      table: {
        category: "Functional",
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
        category: "Functional",
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
        category: "Functional",
        type: {
          summary: "string",
        },
      },
    },
    buttonLabel: {
      control: "text",
      description: "The label on the triggering Button",
      table: {
        category: "Visual",
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
        category: "Visual",
        type: {
          summary: buttonVariantValues.join(" | "),
        },
        defaultValue: {
          summary: "secondary",
        },
      },
    },
    children: {
      control: false,
      description:
        "Menu content composed from [MenuItem](../?path=/docs/odyssey-core-overlays-menubutton-menuitem--docs), [Divider](../?path=/docs/odyssey-core-overlays-menubutton-divider--docs), and [ListSubheader](../?path=/docs/odyssey-core-overlays-menubutton-listsubheader--docs)",
      table: {
        category: "Visual",
        type: {
          summary: "[MenuItem | Divider | ListSubheader | NullElement]",
        },
      },
      type: {
        required: false,
        name: "other",
        value: "[MenuItem | Divider | ListSubheader]",
      },
    },
    popoverContent: {
      control: false,
      description:
        "The contents to display in the popover (instead of children)",
      table: {
        category: "Visual",
        type: {
          summary: "[ReactNode | NullElement]",
        },
      },
      type: {
        required: false,
        name: "other",
        value: "ReactNode",
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
        category: "Visual",
        type: {
          summary: "<Icon />",
        },
      },
    },
    id: {
      control: "text",
      description: "The id of the Button",
      table: {
        category: "Functional",
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
        category: "Visual",
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
        category: "Visual",
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
        category: "Visual",
        type: {
          summary: "string",
        },
      },
    },
  },
  args: {
    buttonLabel: "Button label",
    buttonVariant: "secondary",
    menuAlignment: "left",
  },
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
      await waitFor(async () => axeRun(actionName));
    });
  };

export const Simple: StoryObj<MenuButtonProps> = {
  args: {
    buttonLabel: "Button label",
    children: [
      <MenuItem key="1">Menu item label 1</MenuItem>,
      <MenuItem key="2">Menu item label 2</MenuItem>,
      <MenuItem key="3">Menu item label 3</MenuItem>,
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
      <MenuItem isDisabled key="1">
        <GroupIcon />
        Menu item label 1
      </MenuItem>,
      <MenuItem key="2">
        <GlobeIcon />
        Menu item label 2
      </MenuItem>,
      <MenuItem key="3">
        <CalendarIcon />
        Menu item label 3
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
    buttonLabel: "Button label",
    buttonVariant: "floating",
    children: [
      <MenuItem key="1">Menu item label 1</MenuItem>,
      <MenuItem key="2">Menu item label 2</MenuItem>,
      <MenuItem key="3">Menu item label 3</MenuItem>,
    ],
    id: "floating",
  },
  play: async ({ canvasElement, step }: PlaywrightProps<MenuButtonProps>) => {
    await step("Filter and Select from listbox", async () => {
      const canvas = within(canvasElement);
      const button = canvas.getByRole("button", { name: "Button label" });
      await expect(button).toHaveAttribute("id", "floating-button");
    });
  },
};

export const Groupings: StoryObj<MenuButtonProps> = {
  args: {
    buttonLabel: "Button label",
    children: [
      <ListSubheader key="sh1">Menu section label 1</ListSubheader>,
      <MenuItem key="1">Menu item label 1</MenuItem>,
      <MenuItem key="2">Menu item label 2</MenuItem>,
      <ListSubheader key="sh2">Menu section label 2</ListSubheader>,
      <MenuItem key="3">Menu item label 3</MenuItem>,
      <MenuItem key="4">Menu item label 4</MenuItem>,
      <Divider key="div2" />,
      <MenuItem key="5">Menu item label 5</MenuItem>,
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
    buttonLabel: "Button label",
    children: [
      <MenuItem key="1">Menu item label 1</MenuItem>,
      <MenuItem key="2">Menu item label 2</MenuItem>,
      <MenuItem key="3" variant="destructive">
        Menu item label 3
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
    ariaLabel: "Button label",
    buttonLabel: "",
    children: [
      <MenuItem key="1">Menu item label 1</MenuItem>,
      <MenuItem key="2">Menu item label 2</MenuItem>,
      <MenuItem key="3">Menu item label 3</MenuItem>,
    ],
    tooltipText: "Button tooltip text",
  },
  play: async ({ canvasElement, step }: PlaywrightProps<MenuButtonProps>) => {
    await step("MenuButton Aria-Label", async () => {
      const canvas = within(canvasElement);
      const menuButton = canvas.queryByRole("button", { name: "Button label" });
      await expect(menuButton).not.toBeNull();
    });
  },
};

export const EndIcon: StoryObj<MenuButtonProps> = {
  args: {
    ariaLabel: "Button label",
    endIcon: <GroupIcon />,
    children: [
      <MenuItem key="1">Menu item label 1</MenuItem>,
      <MenuItem key="2">Menu item label 2</MenuItem>,
      <MenuItem key="3">Menu item label 3</MenuItem>,
    ],
    tooltipText: "Button tooltip text",
  },
};

export const Overflow: StoryObj<MenuButtonProps> = {
  args: {
    buttonLabel: "Button label",
    children: [
      <MenuItem key="1">Menu item label 1</MenuItem>,
      <MenuItem key="2">Menu item label 2</MenuItem>,
      <MenuItem key="3">Menu item label 3</MenuItem>,
    ],
    isOverflow: true,
  },
};

export const Disabled: StoryObj<MenuButtonProps> = {
  args: {
    buttonLabel: "Button label",
    isDisabled: true,
    children: [
      <MenuItem key="1">Menu item label 1</MenuItem>,
      <MenuItem key="2">Menu item label 2</MenuItem>,
      <MenuItem key="3">Menu item label 3</MenuItem>,
    ],
    tooltipText: "Button tooltip text",
  },
};

export const Alignment: StoryObj<MenuButtonProps> = {
  args: {
    buttonVariant: "secondary",
    children: [
      <MenuItem key="1">Menu item label 1</MenuItem>,
      <MenuItem key="2">Menu item label 2</MenuItem>,
      <MenuItem key="3">Menu item label 3</MenuItem>,
    ],
    menuAlignment: "right",
  },
  render: function C(props: MenuButtonProps) {
    return (
      <Box sx={{ ml: "50px" }}>
        <MenuButton
          buttonLabel="Button label"
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

export const HelpPopover: StoryObj<MenuButtonProps> = {
  args: {
    buttonLabel: "",
    endIcon: <QuestionCircleIcon />,
    buttonVariant: "secondary",
    popoverContent: [
      <Box key="help-popover-content" sx={{ minWidth: "392px" }}>
        <BoxWithBottomMargin>
          <Heading5>Title</Heading5>
          <Subordinate>Caption</Subordinate>
          <Paragraph>Body</Paragraph>
        </BoxWithBottomMargin>
        <BoxWithBottomMargin>
          <Link href="#" target="_blank">
            Link
          </Link>
          <Subordinate>Caption</Subordinate>
        </BoxWithBottomMargin>
        <BoxWithBottomMargin>
          <Link href="#" target="_blank">
            Link
          </Link>
          <Subordinate>Caption</Subordinate>
        </BoxWithBottomMargin>
        <BoxWithBottomMargin>
          <Link href="#" target="_blank">
            Link
          </Link>
          <Subordinate>Caption</Subordinate>
        </BoxWithBottomMargin>
        <BoxWithBottomMargin>
          <Link href="#" target="_blank">
            Link
          </Link>
          <Subordinate>Caption</Subordinate>
        </BoxWithBottomMargin>
        <BoxWithBottomMargin>
          <Link href="#" target="_blank">
            Link
          </Link>
          <Subordinate>Caption</Subordinate>
        </BoxWithBottomMargin>
        <BoxWithBottomMargin>
          <Divider />
        </BoxWithBottomMargin>
        <Box sx={{ fontWeight: "bold" }}>
          <Paragraph>
            Body{" "}
            <Link href="#" target="_blank">
              Link
            </Link>
          </Paragraph>
        </Box>
      </Box>,
    ],
    id: "floating",
    tooltipText: "Tooltip text",
  },
  play: async ({ canvasElement, step }: PlaywrightProps<MenuButtonProps>) => {
    await step("MenuButton Aria-Label", () => {
      const canvas = within(canvasElement);
      const menuButton = canvas.queryByRole("button", { name: "Tooltip text" });
      expect(menuButton).not.toBeNull();
    });
  },
};
