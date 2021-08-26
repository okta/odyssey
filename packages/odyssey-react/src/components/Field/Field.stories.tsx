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

import { Story } from "@storybook/react";
import Field from ".";
import TextInput from "../TextInput";
import type { Props } from ".";

export default {
  title: `Components/Field`,
  component: Field,
  argTypes: {
    label: {
      defaultValue: "Destination star",
      control: { type: "text" }
    },
    hint: {
      defaultValue: "The stellar object you are traveling to",
      control: { type: "text" }
    },
    error: {
      defaultValue: "This field cannot be left blank.",
      control: { type: "text" }
    },
    name: {
      defaultValue: "destination",
      control: { type: "text" }
    }
  }
};

const Template: Story<Props> = ({label, hint, error, name}) => (
  <Field label={label} hint={hint} error={error} name={name}>
    <TextInput/>
  </Field>
);

export const Default = Template.bind({});

