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
  play: async ({ args, canvasElement, step }) => {
    interactWithButton({ canvasElement, step })({
      args,
      actionName: "Button Primary",
      hoverState: false,
    });
  },
};

export const ButtonSecondary: StoryObj<ButtonProps> = {
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

export const ButtonDanger: StoryObj<ButtonProps> = {
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

export const ButtonFloating: StoryObj<ButtonProps> = {
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

export const ButtonSmall: StoryObj<ButtonProps> = {
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
  args: {
    text: "Add crew",
    isFullWidth: true,
    variant: "floating",
  },
  play: async ({ args, canvasElement, step }) => {
    interactWithButton({ canvasElement, step })({
      args,
      actionName: "Button Fullwidth",
      hoverState: true,
    });
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
    interactWithButton({ canvasElement, step })({
      args,
      actionName: "Button with Icon",
      hoverState: false,
    });
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
