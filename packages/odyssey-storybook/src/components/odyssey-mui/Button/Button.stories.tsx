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
  Button,
  buttonSizeValues,
  buttonVariantValues,
  AddIcon,
} from "@okta/odyssey-react-mui";
import type { ButtonProps } from "@okta/odyssey-react-mui";
import { MuiThemeDecorator } from "../../../../.storybook/components/MuiThemeDecorator";
import { icons } from "../../../../.storybook/components/iconUtils";

import { userEvent, waitFor, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { axeRun } from "../../../axe-util";
import type { PlaywrightProps } from "../storybookTypes";

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
      },
    },
    size: {
      options: buttonSizeValues,
      control: { type: "radio" },
      description: "The size of the button",
      table: {
        type: {
          summary: buttonSizeValues.join(" | "),
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
        "The button text. If blank, the button must include an icon and either `ariaLabel` or `ariaLabelledBy`.",
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
      options: buttonVariantValues,
      control: { type: "radio" },
      description: "The color and style of the button",
      defaultValue: "secondary",
      table: {
        type: {
          summary: buttonVariantValues.join(" | "),
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
    if (args.text) {
      await step("hover and click", async () => {
        const canvas = within(canvasElement);
        const button = canvas.getByText(args.text ?? "");
        userEvent.tab();
        userEvent.click(button);
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
  play: async ({ args, canvasElement, step }) => {
    interactWithButton({ canvasElement, step })({
      args,
      actionName: "Button Primary",
      hoverState: false,
    });
  },
};

export const ButtonPrimaryDisabled: StoryObj<ButtonProps> = {
  name: "Primary, Disabled",
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
    variant: "primary",
  },
};

export const ButtonSecondary: StoryObj<ButtonProps> = {
  name: "Secondary",
  args: {
    text: "Add crew",
    variant: "secondary",
  },
  play: async ({ args, canvasElement, step }) => {
    interactWithButton({ canvasElement, step })({
      args,
      actionName: "Button Secondary",
      hoverState: false,
    });
  },
};

export const ButtonSecondaryDisabled: StoryObj<ButtonProps> = {
  name: "Secondary, Disabled",
  args: {
    text: "Add crew",
    isDisabled: true,
    variant: "secondary",
  },
};

export const ButtonTertiary: StoryObj<ButtonProps> = {
  name: "Tertiary",
  args: {
    text: "Add crew",
    variant: "tertiary",
  },
  play: async ({ args, canvasElement, step }) => {
    interactWithButton({ canvasElement, step })({
      args,
      actionName: "Button Tertiary",
      hoverState: false,
    });
  },
};

export const ButtonTertiaryDisabled: StoryObj<ButtonProps> = {
  name: "Tertiary, Disabled",
  args: {
    text: "Add crew",
    isDisabled: true,
    variant: "tertiary",
  },
};

export const ButtonDanger: StoryObj<ButtonProps> = {
  name: "Danger",
  args: {
    text: "Add crew",
    variant: "danger",
  },
  play: async ({ args, canvasElement, step }) => {
    interactWithButton({ canvasElement, step })({
      args,
      actionName: "Button Danger",
      hoverState: false,
    });
  },
};

export const ButtonDangerDisabled: StoryObj<ButtonProps> = {
  name: "Danger, Disabled",
  args: {
    text: "Add crew",
    isDisabled: true,
    variant: "danger",
  },
};

export const ButtonFloating: StoryObj<ButtonProps> = {
  name: "Floating",
  args: {
    text: "Add crew",
    variant: "floating",
  },
  play: async ({ args, canvasElement, step }) => {
    interactWithButton({ canvasElement, step })({
      args,
      actionName: "Button Floating",
      hoverState: false,
    });
  },
};

export const ButtonFloatingDisabled: StoryObj<ButtonProps> = {
  name: "Floating, Disabled",
  args: {
    text: "Add crew",
    isDisabled: true,
    variant: "floating",
  },
};

export const ButtonSmall: StoryObj<ButtonProps> = {
  name: "Small",
  args: {
    text: "Add crew",
    size: "small",
  },
  play: async ({ args, canvasElement, step }) => {
    interactWithButton({ canvasElement, step })({
      args,
      actionName: "Button Small",
      hoverState: true,
    });
  },
};

export const ButtonMedium: StoryObj<ButtonProps> = {
  name: "Medium",
  args: {
    text: "Add crew",
    size: "medium",
    variant: "secondary",
  },
  play: async ({ args, canvasElement, step }) => {
    interactWithButton({ canvasElement, step })({
      args,
      actionName: "Button Medium",
      hoverState: true,
    });
  },
};

export const ButtonLarge: StoryObj<ButtonProps> = {
  name: "Large",
  args: {
    text: "Add crew",
    size: "large",
    variant: "danger",
  },
  play: async ({ args, canvasElement, step }) => {
    interactWithButton({ canvasElement, step })({
      args,
      actionName: "Button Large",
      hoverState: true,
    });
  },
};

export const ButtonFullWidth: StoryObj<ButtonProps> = {
  name: "Full-width",
  args: {
    text: "Add crew",
    isFullWidth: true,
  },
  play: async ({ args, canvasElement, step }) => {
    interactWithButton({ canvasElement, step })({
      args,
      actionName: "Button Fullwidth",
      hoverState: true,
    });
  },
};

export const ButtonWithIcon: StoryObj<ButtonProps> = {
  name: "Icon",
  args: {
    text: "Add crew",
    startIcon: <AddIcon />,
  },
  play: async ({ args, canvasElement, step }) => {
    interactWithButton({ canvasElement, step })({
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
    text: "",
    tooltipText: "Add crew",
  },
};
