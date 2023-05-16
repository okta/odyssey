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

import { Radio, RadioGroup, RadioGroupProps } from "@okta/odyssey-react-mui";
import { Meta, StoryObj } from "@storybook/react";

import { MuiThemeDecorator } from "../../../../.storybook/components";

const storybookMeta: Meta<typeof RadioGroup> = {
  title: "MUI Components/Forms/RadioGroup",
  component: RadioGroup,
  argTypes: {
    children: {
      control: "text",
    },
    defaultValue: {
      control: "text",
    },
    errorMessage: {
      control: "text",
    },
    hint: {
      control: "text",
    },
    isDisabled: {
      control: "boolean",
    },
    label: {
      control: "text",
    },
    name: {
      control: "text",
    },
    onChange: {
      control: "function",
    },
    value: {
      control: "text",
    },
  },
  decorators: [MuiThemeDecorator],
};

export default storybookMeta;

const Template: StoryObj<RadioGroupProps> = {
  render: function C(props) {
    return (
      <RadioGroup {...props}>
        <Radio label="Light Speed" value="Light Speed" />
        <Radio label="Warp Speed" value="Warp Speed" />
        <Radio label="Ludicrous Speed" value="Ludicrous Speed" />
      </RadioGroup>
    );
  },
};

export const Default: StoryObj<RadioGroupProps> = {
  ...Template,
  args: {
    label: "Speed",
    name: "storybook-radio",
    value: "Value",
  },
};

export const Hint: StoryObj<RadioGroupProps> = {
  ...Template,
  args: {
    hint: "Select the speed at which you wish to travel.",
  },
};

export const Disabled: StoryObj<RadioGroupProps> = {
  ...Template,
  args: {
    isDisabled: true,
  },
};

export const Error: StoryObj<RadioGroupProps> = {
  ...Template,
  args: {
    errorMessage: "This field is required.",
  },
};
