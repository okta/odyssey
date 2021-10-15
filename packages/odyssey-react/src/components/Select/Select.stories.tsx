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
import type { ReactElement } from "react";
import Select from ".";
import type { Props } from ".";

const options = [
  "Proxima Centauri",
  "Barnard's Star",
  "WISE 1049-5319",
  "Wolf 359",
  "Lalande 21185",
  "Sirius A",
  "Sirius B",
];

export default {
  title: `Components/Select`,
  component: Select,
  args: {
    label: "Destination Star",
    name: "star",
  },
  argTypes: {
    hint: { control: "text" },
    label: { control: "text" },
    optionalLabel: { control: "text" },
    required: { control: "boolean" },
    disabled: { control: "boolean" },
    name: { control: "text" },
    onChange: { control: false },
    value: {
      options: options,
      control: "select",
    },
  },
};

const Template: Story<Props> = (args) => (
  <Select {...args}>
    {options.map((option) => (
      <Select.Option key={option} children={option} value={option} />
    ))}
  </Select>
);

export const Default = Template.bind({});
Default.args = {};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};

export const Optional = Template.bind({});
Optional.args = {
  required: false,
  optionalLabel: "Optional",
};

export const Controlled = Template.bind({});
Controlled.args = {
  value: options[3],
};

export const Multiple = Template.bind({});
Multiple.args = {
  multiple: true,
};

export const Group = (args: Props): ReactElement => (
  <Select {...args}>
    <Select.OptionGroup label="Group A">
      <Select.Option children="Option 1" />
      <Select.Option children="Option 2" />
      <Select.Option children="Option 3" />
    </Select.OptionGroup>
    <Select.OptionGroup label="Group B">
      <Select.Option children="Option 1" />
      <Select.Option children="Option 2" />
    </Select.OptionGroup>
  </Select>
);
