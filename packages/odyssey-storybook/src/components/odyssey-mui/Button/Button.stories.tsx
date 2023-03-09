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

import type { Story } from "@storybook/react";

import { Button, AddIcon } from "@okta/odyssey-react-mui";
import type { ButtonProps } from "@okta/odyssey-react-mui";
import { MuiThemeDecorator } from "../../../../.storybook/components/MuiThemeDecorator";

import ButtonMdx from "./Button.mdx";

export default {
  title: `MUI Components/Button`,
  component: Button,
  parameters: {
    docs: {
      page: ButtonMdx,
    },
  },
  argTypes: {
    children: {
      control: "text",
      defaultValue: "Add Crew",
    },
    size: {
      options: ["s", "m", "l"],
      control: { type: "radio" },
    },
    // if we choose to apply colors via "variants" then odyssey global theme will not apply
    variant: {
      options: ["primary", "secondary", "danger", "floating"],
      control: { type: "radio" },
      defaultValue: "primary",
    },
    disabled: {
      control: "boolean",
    },
    fullWidth: {
      // called 'wide' in original ods button
      control: "boolean",
    },
    startIcon: {
      // called 'icon' in original ods button
      control: "object",
    },
  },
  decorators: [MuiThemeDecorator],
};

const Template: Story<ButtonProps> = (props) => <Button {...props} />;

export const ButtonPrimary = Template.bind({});
ButtonPrimary.args = {};

export const ButtonSecondary = Template.bind({});
ButtonSecondary.args = {
  variant: "secondary",
};

export const ButtonDanger = Template.bind({});
ButtonDanger.args = {
  variant: "danger",
};

export const ButtonFloating = Template.bind({});
ButtonFloating.args = {
  variant: "floating",
};

export const ButtonSmall = Template.bind({});
ButtonSmall.args = {
  size: "s",
};

export const ButtonMedium = Template.bind({});
ButtonMedium.args = {
  size: "m",
};

export const ButtonLarge = Template.bind({});
ButtonLarge.args = {
  size: "l",
};

export const ButtonFullWidth = Template.bind({});
ButtonFullWidth.args = {
  children: "Add Crew",
  fullWidth: true,
};

export const ButtonPrimaryDisabled = Template.bind({});
ButtonPrimaryDisabled.args = {
  children: "Add Crew",
  disabled: true,
};

export const ButtonWithIcon = Template.bind({});
ButtonWithIcon.args = {
  children: "Add Crew",
  startIcon: <AddIcon />,
};

export const IconOnly = Template.bind({});
IconOnly.args = {
  children: undefined,
  startIcon: <AddIcon />,
};
