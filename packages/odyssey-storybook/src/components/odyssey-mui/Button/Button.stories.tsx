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
  OdysseyThemeProvider,
  Box,
  Button,
  buttonSizeValues,
  buttonTypeValues,
  buttonVariantValues,
  type ButtonProps,
} from "@okta/odyssey-react-mui";
import { AddIcon } from "@okta/odyssey-react-mui/icons";

import { expect } from "@storybook/jest";
import { userEvent, waitFor, within } from "@storybook/testing-library";
import type { Meta, StoryObj, StoryFn, StoryContext } from "@storybook/react";

import { MuiThemeDecorator } from "../../../../.storybook/components";
import icons from "../../../../.storybook/components/iconUtils";
import { axeRun } from "../../../axe-util";
import type { PlaywrightProps } from "../storybookTypes";

type playType = {
  args: ButtonProps;
  canvasElement: HTMLElement;
  step: PlaywrightProps<ButtonProps>["step"];
};

const storybookMeta: Meta<ButtonProps> = {
  title: "MUI Components/Button",
  component: Button,
  argTypes: {
    endIcon: {
      control: { type: "select" },
      options: Object.keys(icons),
      mapping: icons,
      description: "An optional icon to display at the end of the button",
      table: { type: { summary: "<Icon />" } },
    },
    href: {
      control: "text",
      description: "Optional href to render the button as a link",
      table: { type: { summary: "string" } },
    },
    id: {
      control: null,
      description: "An optional ID for the button",
      table: { type: { summary: "string" } },
    },
    isDisabled: {
      control: "boolean",
      description: "If `true`, the button is disabled",
      table: { type: { summary: "boolean" } },
    },
    isFullWidth: {
      control: "boolean",
      description:
        "If `true`, the button will take up the full width available",
      table: { type: { summary: "boolean" } },
    },
    label: {
      control: "text",
      description:
        "The button text. If blank, the button must include an icon.",
      table: { type: { summary: "string" } },
    },
    onClick: {
      action: true,
      description: "Callback fired when the button is clicked",
      table: { type: { summary: "(() => void)" } },
    },
    size: {
      options: buttonSizeValues,
      control: { type: "radio" },
      description: "The size of the button",
      table: {
        type: { summary: buttonSizeValues.join(" | ") },
        defaultValue: { summary: "medium" },
      },
    },
    startIcon: {
      control: { type: "select" },
      options: Object.keys(icons),
      mapping: icons,
      description: "An optional icon to display at the start of the button",
      table: { type: { summary: "<Icon />" } },
    },
    tooltipText: {
      control: "text",
      description:
        "If defined, the button will include a tooltip that contains the string.",
      table: { type: { summary: "string" } },
    },
    type: {
      options: buttonTypeValues,
      control: { type: "radio" },
      description: "The type of the HTML button element.",
      table: {
        type: { summary: buttonTypeValues.join(" | ") },
        defaultValue: { summary: "button" },
      },
    },
    variant: {
      options: buttonVariantValues,
      control: { type: "radio" },
      description: "The color and style of the button",
      table: {
        type: { summary: buttonVariantValues.join(" | ") },
        defaultValue: { summary: "secondary" },
      },
      type: { required: true, name: "other", value: "radio" },
    },
  },
  args: {
    label: "Add crew",
    variant: "primary",
  },
  decorators: [
    MuiThemeDecorator,
    (Story: StoryFn<ButtonProps>, context: StoryContext<ButtonProps>) => (
      <OdysseyThemeProvider contrastMode="lowContrast">
        <Story {...context.args} />
      </OdysseyThemeProvider>
    ),
  ],
  tags: ["autodocs"],
};

export default storybookMeta;

const interactWithButton =
  ({ canvasElement, step }: PlaywrightProps<ButtonProps>) =>
  async ({
    args,
    actionName,
    hoverState,
  }: {
    args: ButtonProps;
    actionName: string;
    hoverState: boolean;
  }) => {
    if (args.label) {
      await step("hover and click", async () => {
        const canvas = within(canvasElement);
        const button = canvas.getByRole("button", { name: args.label });
        userEvent.tab();
        await userEvent.click(button);
        expect(args.onClick).toHaveBeenCalledTimes(1);
        axeRun(actionName);
        if (!hoverState) {
          waitFor(() => userEvent.tab());
        }
      });
    }
  };

export const ButtonPrimary: StoryObj<ButtonProps> = {
  name: "Primary",
  play: async ({ args, canvasElement, step }: playType) => {
    await interactWithButton({ canvasElement, step })({
      args,
      actionName: "Button Primary",
      hoverState: false,
    });
  },
};

export const ButtonPrimaryDisabled: StoryObj<ButtonProps> = {
  name: "Primary, Disabled",
  args: {
    isDisabled: true,
    label: "Add crew",
    variant: "primary",
  },
};

export const ButtonSecondary: StoryObj<ButtonProps> = {
  name: "Secondary",
  args: {
    label: "Add crew",
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

export const ButtonSecondaryDisabled: StoryObj<ButtonProps> = {
  name: "Secondary, Disabled",
  args: {
    isDisabled: true,
    label: "Add crew",
    variant: "secondary",
  },
};

export const ButtonDanger: StoryObj<ButtonProps> = {
  name: "Danger",
  args: {
    label: "Add crew",
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

export const ButtonDangerSecondary: StoryObj<ButtonProps> = {
  name: "Danger Secondary",
  args: {
    label: "Add crew",
    variant: "dangerSecondary",
  },
};

export const ButtonDangerDisabled: StoryObj<ButtonProps> = {
  name: "Danger, Disabled",
  args: {
    label: "Add crew",
    isDisabled: true,
    variant: "danger",
  },
};

export const ButtonFloating: StoryObj<ButtonProps> = {
  name: "Floating",
  args: {
    label: "Add crew",
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

export const ButtonFloatingAction: StoryObj<ButtonProps> = {
  name: "Floating Action",
  args: {
    label: "Add crew",
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

export const ButtonFloatingDisabled: StoryObj<ButtonProps> = {
  name: "Floating, Disabled",
  args: {
    label: "Add crew",
    isDisabled: true,
    variant: "floating",
  },
};

export const ButtonSecondaryAsLink: StoryObj<ButtonProps> = {
  name: "Button as a link",
  args: {
    label: "Visit okta.com",
    variant: "floatingAction",
    href: "https://okta.com",
    onClick: undefined,
  },
};

export const ButtonSmall: StoryObj<ButtonProps> = {
  name: "Small",
  args: {
    label: "Add crew",
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

export const ButtonMedium: StoryObj<ButtonProps> = {
  name: "Medium",
  args: {
    label: "Add crew",
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

export const ButtonLarge: StoryObj<ButtonProps> = {
  name: "Large",
  args: {
    label: "Add crew",
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

export const ButtonFullWidth: StoryObj<ButtonProps> = {
  name: "Full-width",
  args: {
    label: "Add crew",
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

export const ButtonWithIcon: StoryObj<ButtonProps> = {
  name: "Icon",
  args: {
    label: "Add crew",
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

export const IconOnly: StoryObj<ButtonProps> = {
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
    ariaLabel: "Add crew",
    label: undefined,
    tooltipText: "Add crew",
  },
};

export const KitchenSink: StoryObj<ButtonProps> = {
  name: "Kitchen sink",
  render: ({}) => (
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
