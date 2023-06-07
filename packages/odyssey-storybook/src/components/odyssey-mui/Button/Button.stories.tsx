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

import { Button, Icon, iconDictionary } from "@okta/odyssey-react-mui";
import type { ButtonProps } from "@okta/odyssey-react-mui";
import { MuiThemeDecorator } from "../../../../.storybook/components/MuiThemeDecorator";

import { userEvent, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

const iconOptions = ["None", ...Object.keys(iconDictionary)];
const iconMapping = Object.fromEntries(
  iconOptions.map((value) => [
    value,
    value !== "None" ? (
      <Icon
        name={value as keyof typeof iconDictionary}
        label={value}
        size="medium"
      />
    ) : null,
  ])
);

type ButtonStoryProps = Omit<ButtonProps, "startIcon" | "endIcon"> & {
  startIcon: keyof typeof iconDictionary;
  endIcon: keyof typeof iconDictionary;
};

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
      control: { type: "select" },
      options: iconOptions,
      mapping: iconMapping,
      description: "An optional icon to display at the start of the button",
      table: {
        type: {
          summary: "<Icon />",
        },
        defaultValue: "",
      },
    },
    endIcon: {
      control: { type: "select" },
      options: iconOptions,
      mapping: iconMapping,
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

export const ButtonPrimary: StoryObj<ButtonStoryProps> = {
  name: "Primary",
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByText("Add crew");
    await step("hover and click", async (ctx) => {
      console.log(ctx);
      await userEvent.hover(button);
      await userEvent.click(button);
      await expect(args.onClick).toHaveBeenCalledTimes(1);
    });
  },
};

export const ButtonSecondary: StoryObj<ButtonStoryProps> = {
  name: "Secondary",
  args: {
    text: "Add crew",
    variant: "secondary",
  },
};

export const ButtonDanger: StoryObj<ButtonStoryProps> = {
  name: "Danger",
  args: {
    text: "Add crew",
    variant: "danger",
  },
};

export const ButtonFloating: StoryObj<ButtonStoryProps> = {
  name: "Floating",
  args: {
    text: "Add crew",
    variant: "floating",
  },
};

export const ButtonSmall: StoryObj<ButtonStoryProps> = {
  name: "Small",
  args: {
    text: "Add crew",
    size: "small",
  },
};

export const ButtonMedium: StoryObj<ButtonStoryProps> = {
  name: "Medium",
  args: {
    text: "Add crew",
    size: "medium",
  },
};

export const ButtonLarge: StoryObj<ButtonStoryProps> = {
  name: "Large",
  args: {
    text: "Add crew",
    size: "large",
  },
};

export const ButtonFullWidth: StoryObj<ButtonStoryProps> = {
  name: "Full-width",
  args: {
    text: "Add crew",
    isFullWidth: true,
  },
};

export const ButtonPrimaryDisabled: StoryObj<ButtonStoryProps> = {
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

export const ButtonWithIcon: StoryObj<ButtonStoryProps> = {
  name: "Icon",
  args: {
    text: "Add crew",
    startIcon: "add",
  },
};

export const IconOnly: StoryObj<ButtonStoryProps> = {
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
    startIcon: "add",
    text: undefined, // FIXME
    tooltipText: "Add crew", // FIXME
  },
};
