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
import { PasswordInput, PasswordInputProps } from "@okta/odyssey-react";
import { PasswordInput as Source } from "@okta/odyssey-react/src";

import PasswordInputMdx from "./PasswordInput.mdx";

export default {
  title: `Components/PasswordInput`,
  component: Source,
  parameters: {
    docs: {
      page: PasswordInputMdx,
    },
  },
  args: {
    required: true,
    label: "Password",
    tooltipLabel: "Password",
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

const Template: Story<PasswordInputProps> = (props) => (
  <PasswordInput {...props} />
);

export const Default = Template.bind({});
Default.args = {};

export const Optional = Template.bind({});
Optional.args = {
  defaultValue: "a really good password",
  required: false,
};
