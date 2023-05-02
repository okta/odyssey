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

import { Radio, RadioGroup } from "@okta/odyssey-react-mui";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { MuiThemeDecorator } from "../../../../.storybook/components";
import RadioGroupMdx from "./RadioGroup.mdx";

const storybookMeta: ComponentMeta<typeof RadioGroup> = {
  title: "MUI Components/Forms/RadioGroup",
  component: RadioGroup,
  parameters: {
    docs: {
      page: RadioGroupMdx,
    },
  },
  argTypes: {
    errorMessage: {
      control: "text",
      defaultValue: null,
    },
    hint: {
      control: "text",
      defaultValue: null,
    },
    isDisabled: {
      control: "boolean",
      defaultValue: false,
    },
    label: {
      control: "text",
      defaultValue: "Speed",
    },
    name: {
      control: "text",
      defaultValue: "storybook-radio",
    },
    onChange: {
      control: "function",
    },
    value: {
      control: "text",
      defaultValue: "Value",
    },
  },
  decorators: [MuiThemeDecorator],
};

export default storybookMeta;

const Template: ComponentStory<typeof RadioGroup> = (args) => {
  return (
    <RadioGroup {...args}>
      <Radio label="Light Speed" value="Light Speed" />
      <Radio label="Warp Speed" value="Warp Speed" />
      <Radio label="Ludicrous Speed" value="Ludicrous Speed" />
    </RadioGroup>
  );
};

export const Default = Template.bind({});

export const Hint = Template.bind({});
Hint.args = {
  hint: "Select the speed at which you wish to travel.",
};

export const Disabled = Template.bind({});
Disabled.args = {
  isDisabled: true,
};

export const Error = Template.bind({});
Error.args = {
  errorMessage: "This field is required.",
};
