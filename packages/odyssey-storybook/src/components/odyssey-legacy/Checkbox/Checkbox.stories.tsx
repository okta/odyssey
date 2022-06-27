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

import { useEffect } from "react";
import type { Story } from "@storybook/react";
import {
  Checkbox,
  CheckboxProps,
  ScreenReaderText,
} from "../../../../../odyssey-react/src";

import CheckboxMdx from "./Checkbox.mdx";

export default {
  title: `Legacy Components/Checkbox`,
  component: Checkbox,
  parameters: {
    docs: {
      page: CheckboxMdx,
    },
  },
  args: {
    required: false,
    label: "Checkbox label",
    value: "checkbox_value",
  },
  argTypes: {
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
    id: { control: "text" },
    indeterminate: { control: "boolean" },
    name: { control: "text" },
    onChange: { control: false },
    required: { control: "boolean" },
    value: { control: "text" },
    error: { control: "text" },
  },
};

const Template: Story<CheckboxProps> = (args) => <Checkbox {...args} />;

export const Default = Template.bind({});

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};

export const Indeterminate = Template.bind({});
Indeterminate.args = {
  indeterminate: true,
};

export const Invalid = Template.bind({});
Invalid.decorators = [
  (Story) => {
    useEffect(() =>
      window.document.querySelector("input")?.setCustomValidity("oops")
    );
    return <Story />;
  },
];
Invalid.args = {
  required: true,
  error: (
    <>
      <ScreenReaderText>Error:</ScreenReaderText> Descriptive error text.
    </>
  ),
};
