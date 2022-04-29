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
import { NativeSelect, NativeSelectProps } from "../../../../odyssey-react/src";
import NativeSelectMdx from "./NativeSelect.mdx";

const options = [
  "Lalande21185LagrangeAlpha1978Lalande21185LagrangeAlpha1978",
  "Centauri",
  "Barnard's Star",
  "WISE 1049-5319",
  "Wolf 359",
  "Sirius A",
  "Sirius B",
];

export default {
  title: `Components/NativeSelect`,
  component: NativeSelect,
  parameters: {
    docs: {
      page: NativeSelectMdx,
    },
  },
  args: {
    label: "Select",
  },
  argTypes: {
    hint: { control: "text" },
    error: { control: "text" },
    label: { control: "text" },
    required: { control: "boolean" },
    disabled: { control: "boolean" },
    value: {
      options: options,
      control: "select",
    },
  },
};

const Template: Story<NativeSelectProps> = (args) => (
  <NativeSelect {...args} name="my-select">
    {options.map((option) => (
      <NativeSelect.Option key={option} children={option} value={option} />
    ))}
  </NativeSelect>
);

export const Default = Template.bind({});

export const OptionGroups = (): JSX.Element => (
  <NativeSelect label="Select Option Groups" name="grouped">
    <NativeSelect.OptionGroup label="Planets">
      <NativeSelect.Option children="Mars" />
      <NativeSelect.Option children="Mercury" />
      <NativeSelect.Option children="Venus" />
    </NativeSelect.OptionGroup>
    <NativeSelect.OptionGroup label="Group B">
      <NativeSelect.Option children="Option 1" />
      <NativeSelect.Option children="Option 2" />
    </NativeSelect.OptionGroup>
  </NativeSelect>
);

export const Controlled = Template.bind({});
Controlled.args = {
  value: options[3],
};
