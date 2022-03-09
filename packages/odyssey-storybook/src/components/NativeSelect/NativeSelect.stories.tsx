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

import React from "react";
import type { Story } from "@storybook/react";
import { NativeSelect, NativeSelectProps } from "@okta/odyssey-react";
import { NativeSelect as Source } from "../../../../odyssey-react/src";

export default {
  title: `Components/NativeSelect`,
  component: Source,
  args: {
    label: "Select",
  },
  argTypes: {
    hint: { control: "text" },
    error: { control: "text" },
    label: { control: "text" },
    required: { control: "boolean" },
    disabled: { control: "boolean" },
  },
};

const Template: Story<NativeSelectProps> = (args) => (
  <NativeSelect {...args}>
    <NativeSelect.Option>
      This is an extremely long option for testing what happens to text when it
      tries to overflow
    </NativeSelect.Option>
    <NativeSelect.Option>Option 2</NativeSelect.Option>
    <NativeSelect.Option>Option 3</NativeSelect.Option>
    <NativeSelect.Option>Option 4</NativeSelect.Option>
    <NativeSelect.Option>Option 5</NativeSelect.Option>
  </NativeSelect>
);

export const Default = Template.bind({});

export const Multiselect = Template.bind({});
Multiselect.args = {
  label: "Select Multiple",
  multiple: true,
};

export const OptionGroups = (): JSX.Element => (
  <NativeSelect label="Select Option Groups">
    <NativeSelect.OptionGroup label="Group 1">
      <NativeSelect.Option>Option 1</NativeSelect.Option>
      <NativeSelect.Option>Option 2</NativeSelect.Option>
    </NativeSelect.OptionGroup>
    <NativeSelect.OptionGroup label="Group 2">
      <NativeSelect.Option>Option 3</NativeSelect.Option>
      <NativeSelect.Option>Option 4</NativeSelect.Option>
      <NativeSelect.Option>Option 5</NativeSelect.Option>
    </NativeSelect.OptionGroup>
  </NativeSelect>
);
