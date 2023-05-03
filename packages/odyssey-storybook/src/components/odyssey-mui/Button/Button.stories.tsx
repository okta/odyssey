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

import type { Meta, StoryFn } from "@storybook/react";

import { Button, AddIcon } from "@okta/odyssey-react-mui";
import type { ButtonProps } from "@okta/odyssey-react-mui";
import { MuiThemeDecorator } from "../../../../.storybook/components/MuiThemeDecorator";

import ButtonMdx from "./Button.mdx";

const storybookMeta: Meta<ButtonProps> = {
  title: "MUI Components/Button",
  component: Button,
  parameters: {
    docs: {
      page: ButtonMdx,
    },
  },
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

const Template: StoryFn<ButtonProps> = (props) => <Button {...props} />;

export const ButtonPrimary = Template.bind({});
ButtonPrimary.args = {
  text: "Add crew",
};

export const ButtonSecondary = Template.bind({});
ButtonSecondary.args = {
  text: "Add crew",
  variant: "secondary",
};

export const ButtonDanger = Template.bind({});
ButtonDanger.args = {
  text: "Add crew",
  variant: "danger",
};

export const ButtonFloating = Template.bind({});
ButtonFloating.args = {
  text: "Add crew",
  variant: "floating",
};

export const ButtonSmall = Template.bind({});
ButtonSmall.args = {
  text: "Add crew",
  size: "small",
};

export const ButtonMedium = Template.bind({});
ButtonMedium.args = {
  text: "Add crew",
  size: "medium",
};

export const ButtonLarge = Template.bind({});
ButtonLarge.args = {
  text: "Add crew",
  size: "large",
};

export const ButtonFullWidth = Template.bind({});
ButtonFullWidth.args = {
  text: "Add crew",
  isFullWidth: true,
};

export const ButtonPrimaryDisabled = Template.bind({});
ButtonPrimaryDisabled.args = {
  text: "Add crew",
  isDisabled: true,
};

export const ButtonWithIcon = Template.bind({});
ButtonWithIcon.args = {
  text: "Add crew",
  startIcon: <AddIcon />,
};

export const IconOnly = Template.bind({});
IconOnly.args = {
  startIcon: <AddIcon />,
  text: undefined,
  tooltipText: "Add crew",
};
