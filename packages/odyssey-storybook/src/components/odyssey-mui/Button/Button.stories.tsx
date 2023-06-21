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

import type { Meta, ReactRenderer, StoryObj } from "@storybook/react";

import { Button, AddIcon } from "@okta/odyssey-react-mui";
import type { ButtonProps } from "@okta/odyssey-react-mui";
import { MuiThemeDecorator } from "../../../../.storybook/components/MuiThemeDecorator";
import { icons } from "../../../../.storybook/components/iconUtils";

import { userEvent, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { axeRun } from "../../../axe-util";
// eslint-disable-next-line import/no-extraneous-dependencies
import { StepFunction } from "@storybook/types";

const storybookMeta: Meta<ButtonProps> = {
  title: "MUI Components/Button",
  component: Button,
  argTypes: {
    isDisabled: {
      control: "boolean",
      description: "If `true`, the button is disabled",
      table: {
        type: {
          summary: "boolean",
        },
        defaultValue: "",
      },
    },
    isFullWidth: {
      control: "boolean",
      description:
        "If `true`, the button will take up the full width available",
      table: {
        type: {
          summary: "boolean",
        },
        defaultValue: "",
      },
    },
    size: {
      options: ["small", "medium", "large"],
      control: { type: "radio" },
      description: "The size of the button",
      table: {
        type: {
          summary: "small | medium | large",
        },
        defaultValue: {
          summary: "medium",
        },
      },
    },
    startIcon: {
      control: {
        type: "select",
      },
      options: Object.keys(icons),
      mapping: icons,
      description: "An optional icon to display at the start of the button",
      table: {
        type: {
          summary: "<Icon />",
        },
        defaultValue: "",
      },
    },
    endIcon: {
      control: {
        type: "select",
      },
      options: Object.keys(icons),
      mapping: icons,
      description: "An optional icon to display at the end of the button",
      table: {
        type: {
          summary: "<Icon />",
        },
        defaultValue: "",
      },
    },
    id: {
      control: null,
      description: "An optional ID for the button",
      table: {
        type: {
          summary: "string",
        },
        defaultValue: "",
      },
    },
    text: {
      control: "text",
      description:
        "The button text. If blank, the button must include an icon.",
      table: {
        type: {
          summary: "string",
        },
        defaultValue: "",
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
        defaultValue: "",
      },
    },
    variant: {
      options: ["primary", "secondary", "danger", "floating"],
      control: { type: "radio" },
      description: "The color and style of the button",
      defaultValue: "secondary",
      table: {
        type: {
          summary: "primary | secondary | danger | floating",
        },
        defaultValue: {
          summary: "secondary",
        },
      },
    },
    onClick: {
      action: true,
      description: "Callback fired when the button is clicked",
      table: {
        type: {
          summary: "(() => void)",
        },
        defaultValue: "",
      },
    },
  },
  args: {
    text: "Add crew",
    variant: "primary",
  },
  decorators: [MuiThemeDecorator],
  tags: ["autodocs"],
};

export default storybookMeta;

const interactWithButton = async (
  args: ButtonProps,
  canvasElement: HTMLElement,
  step: StepFunction<ReactRenderer, ButtonProps>,
  action: string
) => {
  try {
    if (args.text) {
      await step("hover and click", async () => {
        const canvas = within(canvasElement);
        const button = canvas.getByText(args.text ?? "");
        await userEvent.tab();
        await userEvent.click(button);
        await expect(args.onClick).toHaveBeenCalledTimes(1);
        await axeRun(action);
      });
    }
  } catch (e) {
    console.log(e instanceof Error && e.message);
    throw new Error(
      e instanceof Error ? e.message : "Unknown Error in play-test"
    );
  }
};

export const ButtonPrimary: StoryObj<ButtonProps> = {
  name: "Primary",
  play: async ({ args, canvasElement, step }) => {
    interactWithButton(args, canvasElement, step, "Button Primary: Hover");
  },
};

export const ButtonSecondary: StoryObj<ButtonProps> = {
  name: "Secondary",
  args: {
    text: "Add crew",
    variant: "secondary",
  },
  play: async ({ args, canvasElement, step }) => {
    interactWithButton(args, canvasElement, step, "Button Secondary: Hover");
  },
};

export const ButtonDanger: StoryObj<ButtonProps> = {
  name: "Danger",
  args: {
    text: "Add crew",
    variant: "danger",
  },
  play: async ({ args, canvasElement, step }) => {
    interactWithButton(args, canvasElement, step, "Button Danger: Hover");
  },
};

export const ButtonFloating: StoryObj<ButtonProps> = {
  name: "Floating",
  args: {
    text: "Add crew",
    variant: "floating",
  },
  play: async ({ args, canvasElement, step }) => {
    interactWithButton(args, canvasElement, step, "Button Floating: Hover");
  },
};

export const ButtonSmall: StoryObj<ButtonProps> = {
  name: "Small",
  args: {
    text: "Add crew",
    size: "small",
  },
  play: async ({ args, canvasElement, step }) => {
    interactWithButton(args, canvasElement, step, "Button Small: Hover");
  },
};

export const ButtonMedium: StoryObj<ButtonProps> = {
  name: "Medium",
  args: {
    text: "Add crew",
    size: "medium",
  },
  play: async ({ args, canvasElement, step }) => {
    interactWithButton(args, canvasElement, step, "Button Medium: Hover");
  },
};

export const ButtonLarge: StoryObj<ButtonProps> = {
  name: "Large",
  args: {
    text: "Add crew",
    size: "large",
  },
  play: async ({ args, canvasElement, step }) => {
    interactWithButton(args, canvasElement, step, "Button Large: Hover");
  },
};

export const ButtonFullWidth: StoryObj<ButtonProps> = {
  name: "Full-width",
  args: {
    text: "Add crew",
    isFullWidth: true,
  },
  play: async ({ args, canvasElement, step }) => {
    interactWithButton(args, canvasElement, step, "Button FullWidth: Hover");
  },
};

export const ButtonPrimaryDisabled: StoryObj<ButtonProps> = {
  name: "Disabled",
  parameters: {
    docs: {
      description: {
        story:
          "Disabled buttons should be paired with a Tooltip to provide additional context. A tooltip can be added by setting the `tooltipText` prop on the button to a string.",
      },
    },
  },
  args: {
    text: "Add crew",
    isDisabled: true,
  },
};

export const ButtonWithIcon: StoryObj<ButtonProps> = {
  name: "Icon",
  args: {
    text: "Add crew",
    startIcon: <AddIcon />,
  },
  play: async ({ args, canvasElement, step }) => {
    interactWithButton(args, canvasElement, step, "Button With Icon: Hover");
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
    ariaLabel: "Add",
    startIcon: <AddIcon />,
    ariaLabel: "Add crew",
    text: "",
    tooltipText: "Add crew",
  },
};
