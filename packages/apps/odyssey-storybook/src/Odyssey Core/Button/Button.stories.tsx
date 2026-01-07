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

import type { Meta, StoryObj } from "@storybook/react";

import {
  Box,
  Button,
  type ButtonProps,
  buttonSizeValues,
  buttonTypeValues,
  buttonVariantValues,
} from "@okta/odyssey-react-mui";
import { AddIcon } from "@okta/odyssey-react-mui/icons";
import { expect, fn, userEvent, waitFor, within } from "@storybook/test";

import type { PlaywrightProps } from "../../tools/storybookTypes.js";

import { axeRun } from "../../axeRun.js";
import icons from "../../tools/iconUtils.js";
import { OdysseyStorybookThemeDecorator } from "../../tools/OdysseyStorybookThemeDecorator.js";

type playType = {
  args: ButtonProps;
  canvasElement: HTMLElement;
  step: PlaywrightProps<ButtonProps>["step"];
};

const meta = {
  component: Button,
  decorators: [OdysseyStorybookThemeDecorator],
  tags: ["autodocs"],
  argTypes: {
    endIcon: {
      control: { type: "select" },
      options: Object.keys(icons),
      mapping: icons,
      description: "An optional icon to display at the end of the button",
      table: { category: "Visual", type: { summary: "<Icon />" } },
    },
    href: {
      control: "text",
      description: "Optional href to render the button as a link",
      table: { category: "Functional", type: { summary: "string" } },
    },
    id: {
      control: "text",
      description: "An optional ID for the button",
      table: { category: "Functional", type: { summary: "string" } },
    },
    isDisabled: {
      control: "boolean",
      description: "If `true`, the button is disabled",
      table: { category: "Visual", type: { summary: "boolean" } },
    },
    isFullWidth: {
      control: "boolean",
      description:
        "If `true`, the button will take up the full width available",
      table: { category: "Visual", type: { summary: "boolean" } },
    },
    label: {
      control: "text",
      description:
        "The button text. If blank, the button must include an icon.",
      table: { category: "Visual", type: { summary: "string" } },
    },
    onClick: {
      action: true,
      description: "Callback fired when the button is clicked",
      table: { category: "Functional", type: { summary: "(() => void)" } },
    },
    size: {
      options: buttonSizeValues,
      control: { type: "radio" },
      description: "The size of the button",
      table: {
        category: "Visual",
        type: { summary: buttonSizeValues.join(" | ") },
        defaultValue: { summary: "medium" },
      },
    },
    startIcon: {
      control: { type: "select" },
      options: Object.keys(icons),
      mapping: icons,
      description: "An optional icon to display at the start of the button",
      table: { category: "Visual", type: { summary: "<Icon />" } },
    },
    tooltipText: {
      control: "text",
      description:
        "If defined, the button will include a tooltip that contains the string.",
      table: { category: "Visual", type: { summary: "string" } },
    },
    type: {
      options: buttonTypeValues,
      control: { type: "radio" },
      description: "The type of the HTML button element.",
      table: {
        category: "Functional",
        type: { summary: buttonTypeValues.join(" | ") },
        defaultValue: { summary: "button" },
      },
    },
    variant: {
      options: buttonVariantValues,
      control: { type: "radio" },
      description: "The color and style of the button",
      table: {
        category: "Visual",
        type: { summary: buttonVariantValues.join(" | ") },
        defaultValue: { summary: "secondary" },
      },
      type: {
        required: true,
        name: "other",
        value: "radio",
      },
    },
  },
  args: {
    label: "Button label",
    onClick: fn(),
    variant: "primary",
  },
} satisfies Meta<ButtonProps>;

export default meta;

type Story = StoryObj<typeof meta>;

const interactWithButton =
  ({ canvasElement, step }: PlaywrightProps<ButtonProps>) =>
  async ({
    args,
    actionName,
    hoverState,
  }: {
    actionName: string;
    args: ButtonProps;
    hoverState: boolean;
  }) => {
    if (args.label) {
      await step("hover and click", async () => {
        const canvas = within(canvasElement);
        const button = canvas.getByRole("button", { name: args.label });
        await userEvent.tab();
        await userEvent.click(button);
        expect(args.onClick).toHaveBeenCalledTimes(1);
        await axeRun(actionName);
        if (!hoverState) {
          await waitFor(() => userEvent.tab());
        }
      });
    }
  };

export const ButtonPrimary: Story = {
  name: "Primary",
  play: async ({ args, canvasElement, step }: playType) => {
    await interactWithButton({ canvasElement, step })({
      args,
      actionName: "Button Primary",
      hoverState: false,
    });
  },
};

export const ButtonPrimaryDisabled: Story = {
  name: "Primary, Disabled",
  args: {
    isDisabled: true,
    label: "Button label",
    variant: "primary",
  },
};

export const ButtonSecondary: Story = {
  name: "Secondary",
  args: {
    label: "Button label",
    variant: "secondary",
  },
  play: async ({ args, canvasElement, step }: playType) => {
    await interactWithButton({ canvasElement, step })({
      args,
      actionName: "Button Secondary",
      hoverState: false,
    });
  },
};

export const ButtonSecondaryDisabled: Story = {
  name: "Secondary, Disabled",
  args: {
    isDisabled: true,
    label: "Button label",
    variant: "secondary",
  },
};

export const ButtonDanger: Story = {
  name: "Danger",
  args: {
    label: "Button label",
    variant: "danger",
  },
  play: async ({ args, canvasElement, step }: playType) => {
    await interactWithButton({ canvasElement, step })({
      args,
      actionName: "Button Danger",
      hoverState: false,
    });
  },
};

export const ButtonDangerSecondary: Story = {
  name: "Danger Secondary",
  args: {
    label: "Button label",
    variant: "dangerSecondary",
  },
};

export const ButtonDangerDisabled: Story = {
  name: "Danger, Disabled",
  args: {
    label: "Button label",
    isDisabled: true,
    variant: "danger",
  },
};

export const ButtonFloating: Story = {
  name: "Floating",
  args: {
    label: "Button label",
    variant: "floating",
  },
  play: async ({ args, canvasElement, step }: playType) => {
    await interactWithButton({ canvasElement, step })({
      args,
      actionName: "Button Floating",
      hoverState: false,
    });
  },
};

export const ButtonFloatingAction: Story = {
  name: "Floating Action",
  args: {
    label: "Button label",
    variant: "floatingAction",
  },
  play: async ({ args, canvasElement, step }: playType) => {
    await interactWithButton({ canvasElement, step })({
      args,
      actionName: "Button Floating Action",
      hoverState: false,
    });
  },
};

export const ButtonFloatingDisabled: Story = {
  name: "Floating, Disabled",
  args: {
    label: "Button label",
    isDisabled: true,
    variant: "floating",
  },
};

export const ButtonSecondaryAsLink: Story = {
  name: "Button as a link",
  args: {
    label: "Visit okta.com",
    variant: "floatingAction",
    href: "https://okta.com",
    onClick: undefined,
  },
};

export const ButtonSmall: Story = {
  name: "Small",
  args: {
    label: "Button label",
    size: "small",
  },
  play: async ({ args, canvasElement, step }: playType) => {
    await interactWithButton({ canvasElement, step })({
      args,
      actionName: "Button Small",
      hoverState: true,
    });
  },
};

export const ButtonMedium: Story = {
  name: "Medium",
  args: {
    label: "Button label",
    size: "medium",
    variant: "secondary",
  },
  play: async ({ args, canvasElement, step }: playType) => {
    await interactWithButton({ canvasElement, step })({
      args,
      actionName: "Button Medium",
      hoverState: true,
    });
  },
};

export const ButtonLarge: Story = {
  name: "Large",
  args: {
    label: "Button label",
    size: "large",
    variant: "danger",
  },
  play: async ({ args, canvasElement, step }: playType) => {
    await interactWithButton({ canvasElement, step })({
      args,
      actionName: "Button Large",
      hoverState: true,
    });
  },
};

export const ButtonFullWidth: Story = {
  name: "Full-width",
  args: {
    label: "Button label",
    isFullWidth: true,
  },
  play: async ({ args, canvasElement, step }: playType) => {
    await interactWithButton({ canvasElement, step })({
      args,
      actionName: "Button Fullwidth",
      hoverState: true,
    });
  },
};

export const ButtonWithIcon: Story = {
  name: "Icon",
  args: {
    label: "Button label",
    startIcon: <AddIcon />,
  },
  play: async ({ args, canvasElement, step }: playType) => {
    await interactWithButton({ canvasElement, step })({
      args,
      actionName: "Button with Icon",
      hoverState: false,
    });
  },
};

export const IconOnly: Story = {
  name: "Icon-only",
  parameters: {
    docs: {
      description: {
        story:
          "Icon-only buttons should be paired with a Tooltip to provide additional context. A tooltip can be added by setting the `tooltipText` prop on the button to a string.",
      },
    },
  },
  args: {
    startIcon: <AddIcon />,
    ariaLabel: "Button label",
    label: undefined,
    tooltipText: "Button label",
  },
};

export const KitchenSink: Story = {
  name: "Kitchen sink",
  render: () => (
    <Box sx={{ display: "flex", flexWrap: "wrap", rowGap: 2 }}>
      <Button label="Primary" variant="primary" />
      <Button label="Secondary" variant="secondary" />
      <Button label="Danger Secondary" variant="dangerSecondary" />
      <Button label="Danger" variant="danger" />
      <Button label="Floating" variant="floating" />
      <Button label="Floating Action" variant="floatingAction" />
      <Button ariaLabel="Add" startIcon={<AddIcon />} variant="primary" />
    </Box>
  ),
};
