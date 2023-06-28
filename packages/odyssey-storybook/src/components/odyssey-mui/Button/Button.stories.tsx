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
    },
    tooltipText: {
      control: "text",
    },
    variant: {
      options: ["primary", "secondary", "danger", "floating"],
      control: { type: "radio" },
    },
    onClick: {
      action: true,
    },
  },
  args: {
    text: "Add crew",
    variant: "primary",
  },
  decorators: [MuiThemeDecorator],
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
        userEvent.tab();
        userEvent.click(button);
        expect(args.onClick).toHaveBeenCalledTimes(1);
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
  play: async ({ args, canvasElement, step }) => {
    interactWithButton(args, canvasElement, step, "Button Primary: Hover");
  },
};

export const ButtonSecondary: StoryObj<ButtonProps> = {
  args: {
    text: "Add crew",
    variant: "secondary",
  },
  play: async ({ args, canvasElement, step }) => {
    interactWithButton(args, canvasElement, step, "Button Secondary: Hover");
  },
};

export const ButtonDanger: StoryObj<ButtonProps> = {
  args: {
    text: "Add crew",
    variant: "danger",
  },
  play: async ({ args, canvasElement, step }) => {
    interactWithButton(args, canvasElement, step, "Button Danger: Hover");
  },
};

export const ButtonFloating: StoryObj<ButtonProps> = {
  args: {
    text: "Add crew",
    variant: "floating",
  },
  play: async ({ args, canvasElement, step }) => {
    interactWithButton(args, canvasElement, step, "Button Floating: Hover");
  },
};

export const ButtonSmall: StoryObj<ButtonProps> = {
  args: {
    text: "Add crew",
    size: "small",
  },
  play: async ({ args, canvasElement, step }) => {
    interactWithButton(args, canvasElement, step, "Button Small: Hover");
  },
};

export const ButtonMedium: StoryObj<ButtonProps> = {
  args: {
    text: "Add crew",
    size: "medium",
  },
  play: async ({ args, canvasElement, step }) => {
    interactWithButton(args, canvasElement, step, "Button Medium: Hover");
  },
};

export const ButtonLarge: StoryObj<ButtonProps> = {
  args: {
    text: "Add crew",
    size: "large",
  },
  play: async ({ args, canvasElement, step }) => {
    interactWithButton(args, canvasElement, step, "Button Large: Hover");
  },
};

export const ButtonFullWidth: StoryObj<ButtonProps> = {
  args: {
    text: "Add crew",
    isFullWidth: true,
  },
  play: async ({ args, canvasElement, step }) => {
    interactWithButton(args, canvasElement, step, "Button FullWidth: Hover");
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
  play: async ({ args, canvasElement, step }) => {
    interactWithButton(args, canvasElement, step, "Button With Icon: Hover");
  },
};

export const IconOnly: StoryObj<ButtonProps> = {
  args: {
    startIcon: <AddIcon />,
    ariaLabel: "Add crew",
    text: "",
    tooltipText: "Add crew",
  },
};
