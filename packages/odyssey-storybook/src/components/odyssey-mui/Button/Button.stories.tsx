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
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const button = await canvas.getByText("Add crew");
    await userEvent.hover(button);
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

export const ButtonSecondary: StoryObj<ButtonProps> = {
  args: {
    text: "Add crew",
    variant: "secondary",
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const button = await canvas.getByText("Add crew");
    await userEvent.hover(button);
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

export const ButtonDanger: StoryObj<ButtonProps> = {
  args: {
    text: "Add crew",
    variant: "danger",
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const button = await canvas.getByText("Add crew");
    await userEvent.hover(button);
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

export const ButtonFloating: StoryObj<ButtonProps> = {
  args: {
    text: "Add crew",
    variant: "floating",
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const button = await canvas.getByText("Add crew");
    await userEvent.hover(button);
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

export const ButtonSmall: StoryObj<ButtonProps> = {
  args: {
    text: "Add crew",
    size: "small",
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const button = await canvas.getByText("Add crew");
    await userEvent.hover(button);
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

export const ButtonMedium: StoryObj<ButtonProps> = {
  args: {
    text: "Add crew",
    size: "medium",
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const button = await canvas.getByText("Add crew");
    await userEvent.hover(button);
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

export const ButtonLarge: StoryObj<ButtonProps> = {
  args: {
    text: "Add crew",
    size: "large",
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const button = await canvas.getByText("Add crew");
    await userEvent.hover(button);
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

export const ButtonFullWidth: StoryObj<ButtonProps> = {
  args: {
    text: "Add crew",
    isFullWidth: true,
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const button = await canvas.getByText("Add crew");
    await userEvent.hover(button);
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

export const ButtonPrimaryDisabled: StoryObj<ButtonProps> = {
  args: {
    text: "Add crew",
    isDisabled: true,
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const button = await canvas.getByText("Add crew");
    await userEvent.hover(button);
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledTimes(0);
  },
};

export const ButtonWithIcon: StoryObj<ButtonProps> = {
  args: {
    text: "Add crew",
    startIcon: <AddIcon />,
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const button = await canvas.getByText("Add crew");
    await userEvent.hover(button);
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

export const IconOnly: StoryObj<ButtonProps> = {
  args: {
    startIcon: <AddIcon />,
    text: undefined, // FIXME
    tooltipText: "Add crew", // FIXME
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = await canvas.getByRole("button");
    await expect(button).toHaveAccessibleName();
  },
};
