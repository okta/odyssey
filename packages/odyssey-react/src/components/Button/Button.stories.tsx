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
import React from "react";
import Button from ".";
import type { Props } from ".";

export default {
  title: `Components/Button`,
  component: Button,
  argTypes: {
    children: {
      control: { type: null }
    },
    disabled: {
      control: { type: "boolean" }
    },
    onClick: {
      control: { type: null }
    },
    wide: {
      control: { type: "boolean" }
    },
  },
};

const Template: Story<Props> = ({ variant, disabled, onClick, size, wide }) => (
  <Button variant={variant} onClick={onClick} disabled={disabled} size={size} wide={wide}>Button label</Button>
);

export const Primary = Template.bind({});
Primary.args = {
  variant: "primary"
};
Primary.argTypes = {
  onClick: { action: 'clicked button/primary (default)' },
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: "secondary"
};
Secondary.argTypes = {
  onClick: { action: 'clicked button/secondary' },
};

export const Danger = Template.bind({});
Danger.args = {
  variant: "danger"
};
Danger.argTypes = {
  onClick: { action: 'clicked button/danger' },
};

export const Clear = Template.bind({});
Clear.args = {
  variant: "clear"
};
Clear.argTypes = {
  onClick: { action: 'clicked button/clear' },
};

export const Dismiss = Template.bind({});
Dismiss.args = {
  variant: "dismiss"
};
Dismiss.argTypes = {
  onClick: { action: 'clicked button/dismiss' },
};

export const Small = Template.bind({});
Small.args = {
  size: "s"
};
Small.argTypes = {
  onClick: { action: 'clicked button/small' },
};

export const Medium = Template.bind({});
Medium.args = {
  size: "m"
};
Medium.argTypes = {
  onClick: { action: 'clicked button/medium' },
};

export const Large = Template.bind({});
Large.args = {
  size: "l"
};
Large.argTypes = {
  onClick: { action: 'clicked button/large' },
};

export const Wide = Template.bind({});
Wide.args = {
  wide: true
};
Wide.argTypes = {
  onClick: { action: 'clicked button/wide' },
};
