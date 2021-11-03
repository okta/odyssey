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

import { Story } from "@storybook/react";
import { Button as Source } from "../../../../odyssey-react/src";
import {
  Button,
  ButtonProps,
  CloseIcon,
  SettingsIcon,
} from "@okta/odyssey-react";

import ButtonMdx from "./Button.mdx";

export default {
  title: `Components/Button`,
  component: Source,
  parameters: {
    docs: {
      page: ButtonMdx,
    },
  },
  argTypes: {
    children: {
      control: "text",
      defaultValue: "Button label",
    },
    disabled: {
      control: "boolean",
    },
    wide: {
      control: "boolean",
    },
  },
};

const Template: Story<ButtonProps> = (props) => <Button {...props} />;

export const Primary = Template.bind({});
Primary.args = {
  variant: "primary",
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: "secondary",
};

export const Danger = Template.bind({});
Danger.args = {
  variant: "danger",
};

export const Clear = Template.bind({});
Clear.args = {
  variant: "clear",
};

export const Dismiss = Template.bind({});
Dismiss.args = {
  variant: "dismiss",
  icon: <CloseIcon />,
  children: undefined,
};

export const Small = Template.bind({});
Small.args = {
  size: "s",
};

export const Medium = Template.bind({});
Medium.args = {
  size: "m",
};

export const Large = Template.bind({});
Large.args = {
  size: "l",
};

export const Wide = Template.bind({});
Wide.args = {
  wide: true,
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  icon: <SettingsIcon />,
};

export const IconOnly = Template.bind({});
IconOnly.args = {
  icon: <SettingsIcon />,
  children: undefined,
};
