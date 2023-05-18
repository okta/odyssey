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

import { Button, AddIcon } from "@okta/odyssey-react-mui";
import type { ButtonProps } from "@okta/odyssey-react-mui";
import { MuiThemeDecorator } from "../../../../.storybook/components/MuiThemeDecorator";

import { userEvent, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

const storybookMeta: Meta<ButtonProps> = {
  title: "MUI Components/Button",
  component: Button,
  argTypes: {
    isDisabled: {
      control: "boolean",
    },
    isFullWidth: {
      control: "boolean",
    },
    size: {
      options: ["small", "medium", "large"],
      control: { type: "radio" },
    },
    startIcon: {
      control: "object",
    },
    text: {
      control: "text",
      defaultValue: "Add crew",
    },
    tooltipText: {
      control: "text",
    },
    variant: {
      options: ["primary", "secondary", "danger", "floating"],
      control: { type: "radio" },
      defaultValue: "primary",
    },
    onClick: {
      action: true,
    },
  },
  decorators: [MuiThemeDecorator],
};

export default storybookMeta;

export const ButtonPrimary: StoryObj<ButtonProps> = {
  args: {
    text: "Add crew",
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByText(args.text!);
    await step("hover and click", async (ctx) => {
      console.log(ctx);
      await userEvent.hover(button);
      await userEvent.click(button);
      await expect(args.onClick).toHaveBeenCalledTimes(1);
    });
  },
};

export const ButtonSecondary: StoryObj<ButtonProps> = {
  args: {
    text: "Add crew",
    variant: "secondary",
  },
};

export const ButtonDanger: StoryObj<ButtonProps> = {
  args: {
    text: "Add crew",
    variant: "danger",
  },
};

export const ButtonFloating: StoryObj<ButtonProps> = {
  args: {
    text: "Add crew",
    variant: "floating",
  },
};

export const ButtonSmall: StoryObj<ButtonProps> = {
  args: {
    text: "Add crew",
    size: "small",
  },
};

export const ButtonMedium: StoryObj<ButtonProps> = {
  args: {
    text: "Add crew",
    size: "medium",
  },
};

export const ButtonLarge: StoryObj<ButtonProps> = {
  args: {
    text: "Add crew",
    size: "large",
  },
};

export const ButtonFullWidth: StoryObj<ButtonProps> = {
  args: {
    text: "Add crew",
    isFullWidth: true,
  },
};

export const ButtonPrimaryDisabled: StoryObj<ButtonProps> = {
  args: {
    text: "Add crew",
    isDisabled: true,
  },
};

export const ButtonWithIcon: StoryObj<ButtonProps> = {
  args: {
    text: "Add crew",
    startIcon: <AddIcon />,
  },
};

export const IconOnly: StoryObj<ButtonProps> = {
  args: {
    startIcon: <AddIcon />,
    text: undefined, // FIXME
    tooltipText: "Add crew", // FIXME
  },
};
