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
import { TextInput, TextInputProps } from "@okta/odyssey-react";
import { TextInput as Source } from "../../../../odyssey-react/src";

import TextInputMdx from "./TextInput.mdx";

export default {
  title: `Components/TextInput`,
  component: Source,
  parameters: {
    docs: {
      page: TextInputMdx,
    },
  },
  args: {
    label: "Destination",
    optionalLabel: "Optional",
  },
  argTypes: {
    required: { control: "boolean" },
    disabled: { control: "boolean" },
    readonly: { control: "boolean" },
    defaultValue: { control: "text" },
    hint: { control: "text" },
    optionalLabel: { control: "text" },
    placeholder: { control: "text" },
    value: { control: "text" },
    id: { control: "text" },
    name: { control: "text" },
    error: { control: "text" },
    onChange: { control: false },
    onBlur: { control: false },
    onFocus: { control: false },
  },
};

const Template: Story<TextInputProps> = (props) => <TextInput {...props} />;

export const Text = Template.bind({});
Text.args = {
  defaultValue: "Jupiter",
};

export const Search = Template.bind({});
Search.args = {
  defaultValue: "Search Planets",
  type: "search",
};
