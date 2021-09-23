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
import { Story } from "@storybook/react";
import Field from ".";
import TextInput from "../TextInput";
import Radio from "../Radio";
import TextArea from "../TextArea";
import Select from "../Select";
import Checkbox from "../Checkbox";

import type { Props } from ".";

export default {
  title: `Components/Field`,
  component: Field,
  argTypes: {
    label: {
      defaultValue: "Destination star",
      control: { type: "text" },
    },
    hint: {
      defaultValue: "The stellar object you are traveling to",
      control: { type: "text" },
    },
    error: {
      defaultValue: "This field cannot be left blank.",
      control: { type: "text" },
    },
    name: {
      defaultValue: "destination",
      control: { type: "text" },
    },
  },
};

const Template: Story<Props> = ({ label, hint, error, name, as, children }) =>
  React.cloneElement(children, { label, hint, error, name, as });

export const WithTextInput = Template.bind({});
WithTextInput.storyName = "with TextInput";
WithTextInput.args = {
  children: <TextInput />,
};

export const withRadioGroup = Template.bind({});
withRadioGroup.storyName = "with RadioGroup";
withRadioGroup.args = {
  label: "Select speed",
  hint: "A hint.",
  error: "An error has occured my guy",
  children: (
    <Radio.Group>
      <Radio.Button label="Lightspeed" value="light" />
      <Radio.Button label="Warp speed" value="warp" />
      <Radio.Button label="Ludicrous speed" value="ludicrous" />
    </Radio.Group>
  ),
};

export const withTextArea = Template.bind({});
withTextArea.storyName = "with TextArea";
withTextArea.args = {
  children: <TextArea label="foo" />,
};

export const withCheckbox = Template.bind({});
withCheckbox.storyName = "with Checkbox";
withCheckbox.args = {
  children: <Checkbox label="foo" name="name" value="value" />,
};

export const withSelect = Template.bind({});
withSelect.storyName = "with Select";
withSelect.args = {
  children: <Select label="foo" />,
};
