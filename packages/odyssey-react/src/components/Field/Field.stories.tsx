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

import type { Props } from ".";

export const sharedFieldArgs = {
  label: "Destination",
  optionalLabel: "Optional",
  errorPrefix: "Error:",
};

export const sharedFieldArgTypes = {
  error: { control: "text" },
  hint: { control: "text" },
  required: { control: "boolean" },
  children: { control: false },
  inputId: { control: false },
  as: { control: "radio" },
};

export default {
  title: `Components/Field`,
  component: Field,
  args: sharedFieldArgs,
  argTypes: sharedFieldArgTypes,
};

const Template: Story<Props> = (props) => <Field {...props} />;

export const FieldSolo = Template.bind({});
FieldSolo.args = {};
