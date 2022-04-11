/*!
 * Copyright (c) 2022-present, Okta, Inc. and/or its affiliates. All rights reserved.
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
import { SearchInput, SearchInputProps } from "@okta/odyssey-react";
import { SearchInput as Source } from "@okta/odyssey-react/src";

import SearchInputMdx from "./SearchInput.mdx";

export default {
  title: `Components/SearchInput`,
  component: Source,
  parameters: {
    docs: {
      page: SearchInputMdx,
    },
  },
  args: {
    placeholder: "Search planets",
    required: false,
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

const Template: Story<SearchInputProps> = (props) => <SearchInput {...props} />;

export const Default = Template.bind({});
Default.args = {};

export const Required = Template.bind({});
Required.args = {
  defaultValue: "Pluto",
  required: true,
};

export const KitchenSink = Template.bind({});
KitchenSink.args = {
  labelHidden: false,
  hint: "This is a hint",
  optionalLabel: "Optional",
  error: "This is an error",
  required: false,
};
