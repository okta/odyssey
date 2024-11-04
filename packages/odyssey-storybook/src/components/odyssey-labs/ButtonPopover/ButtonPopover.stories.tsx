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
  buttonVariantValues,
  Heading5,
  Paragraph,
} from "@okta/odyssey-react-mui";
import {
  ButtonPopover,
  ButtonPopoverProps,
  popoverAlignmentValues,
} from "@okta/odyssey-react-mui/labs";
import { GroupIcon, QuestionCircleIcon } from "@okta/odyssey-react-mui/icons";

import { fieldComponentPropsMetaData } from "../../../fieldComponentPropsMetaData";
import icons from "../../../../.storybook/components/iconUtils";
import { MuiThemeDecorator } from "../../../../.storybook/components";
import { userEvent, waitFor, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { axeRun } from "../../../axe-util";
import type { PlaywrightProps } from "../../odyssey-mui/storybookTypes";

const storybookMeta: Meta<typeof ButtonPopover> = {
  title: "Labs Components/Button Popover",
  component: ButtonPopover,
  argTypes: {
    ariaDescribedBy: {
      control: "text",
      description:
        "The ID of the element that describes the ButtonPopover, if one exists.",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    ariaLabel: {
      control: "text",
      description:
        "aria-label to describe the ButtonPopover when the button label is empty",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    ariaLabelledBy: {
      control: "text",
      description:
        "The ID of the element that labels the ButtonPopover. Only needed if the button has no text and `ariaLabel` is empty.",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    label: {
      control: "text",
      description: "The label on the triggering Button",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    variant: {
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
      description: "The content within the Popover",
      table: {
        type: {
          summary: "[ReactNode | NullElement]",
        },
      },
      type: {
        required: true,
        name: "other",
        value: "[ReactNode | NullElement]",
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
  },
  args: {
    label: "More actions",
    variant: "secondary",
    popoverAlignment: "left",
  },
  decorators: [MuiThemeDecorator],
  tags: ["autodocs"],
};

export default storybookMeta;

const clickButtonPopover =
  ({ canvasElement, step }: PlaywrightProps<ButtonPopoverProps>) =>
  async (args: ButtonPopoverProps, actionName: string) => {
    const canvas = within(canvasElement);
    await step("open popover button", async () => {
      const buttonElement = canvas.getByRole("button", {
        name: args.label,
      });
      userEvent.click(buttonElement);
      await waitFor(() => {
        axeRun(actionName);
      });
    });
  };

export const Simple: StoryObj<ButtonPopoverProps> = {
  args: {
    label: "More actions",
    children: [
      <Heading5 key="1">Popover Content</Heading5>,
      <Paragraph key="2">Some more popover content.</Paragraph>,
    ],
  },
  play: async ({
    args,
    canvasElement,
    step,
  }: {
    args: ButtonPopoverProps;
    canvasElement: HTMLElement;
    step: PlaywrightProps<ButtonPopoverProps>["step"];
  }) => {
    await clickButtonPopover({ canvasElement, step })(
      args,
      "Button Popover Simple",
    );
  },
};

export const ButtonVariant: StoryObj<ButtonPopoverProps> = {
  args: {
    label: "More actions",
    variant: "primary",
    children: [
      <Heading5 key="1">Popover Content</Heading5>,
      <Paragraph key="2">Some more popover content.</Paragraph>,
    ],
    id: "floating-button",
  },
  play: async ({
    canvasElement,
    step,
  }: PlaywrightProps<ButtonPopoverProps>) => {
    await step("Filter and Select from listbox", async () => {
      const canvas = within(canvasElement);
      const button = canvas.getByRole("button", { name: "More actions" });
      expect(button).toHaveAttribute("id", "floating-button");
    });
  },
};

export const IconButton: StoryObj<ButtonPopoverProps> = {
  args: {
    ariaLabel: "More actions",
    label: "",
    endIcon: <QuestionCircleIcon />,
    children: [
      <Heading5 key="1">Popover Content</Heading5>,
      <Paragraph key="2">Some more popover content.</Paragraph>,
    ],
  },
  play: async ({
    canvasElement,
    step,
  }: PlaywrightProps<ButtonPopoverProps>) => {
    await step("ButtonPopover Aria-Label", async () => {
      const canvas = within(canvasElement);
      const buttonPopover = canvas.queryByRole("button", {
        name: "More actions",
      });
      expect(buttonPopover).not.toBeNull();
    });
  },
};

export const StartIcon: StoryObj<ButtonPopoverProps> = {
  args: {
    ariaLabel: "More actions",
    startIcon: <GroupIcon />,
    children: [
      <Heading5 key="1">Popover Content</Heading5>,
      <Paragraph key="2">Some more popover content.</Paragraph>,
    ],
  },
};

export const EndIcon: StoryObj<ButtonPopoverProps> = {
  args: {
    ariaLabel: "More actions",
    endIcon: <GroupIcon />,
    children: [
      <Heading5 key="1">Popover Content</Heading5>,
      <Paragraph key="2">Some more popover content.</Paragraph>,
    ],
  },
};

export const Disabled: StoryObj<ButtonPopoverProps> = {
  args: {
    label: "Cargo options",
    isDisabled: true,
    children: [
      <Heading5 key="1">Popover Content</Heading5>,
      <Paragraph key="2">Some more popover content.</Paragraph>,
    ],
  },
};

export const Alignment: StoryObj<ButtonPopoverProps> = {
  args: {
    variant: "secondary",
    children: [
      <Heading5 key="1">Popover Content</Heading5>,
      <Paragraph key="2">Some more popover content.</Paragraph>,
    ],
    popoverAlignment: "right",
  },
  render: function C(props: ButtonPopoverProps) {
    return (
      <Box sx={{ ml: "300px" }}>
        <ButtonPopover
          label="More actions"
          variant={props.variant}
          popoverAlignment={props.popoverAlignment}
        >
          {props.children}
        </ButtonPopover>
      </Box>
    );
  },
  play: async ({
    args,
    canvasElement,
    step,
  }: {
    args: ButtonPopoverProps;
    canvasElement: HTMLElement;
    step: PlaywrightProps<ButtonPopoverProps>["step"];
  }) => {
    await clickButtonPopover({ canvasElement, step })(
      args,
      "Button Popover Alignment",
    );
  },
};
