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
import React from "react";
import FieldLabel from ".";
import type { Props } from ".";

export default {
  title: `Components/FieldLabel`,
  component: FieldLabel,
  argTypes: {
    children: { control: 'text' },
    id: { control: 'text' },
  },
  parameters: {
    controls: {
      sort: 'requiredFirst'
    }
  }
};

const Template: Story<Props> = (props) => (
  <FieldLabel {...props} />
);

export const Label = Template.bind({});
Label.args = {
  variant: "label",
  children: "Destination"
};

export const Hint = Template.bind({});
Hint.args = {
  variant: "hint",
  children: "None of these are achievable... yet."
};

export const _Error = Template.bind({});
_Error.args = {
  variant: "error",
  children: "You must acknowledge the dangers before proceeding."
};

export const Optional: Story<Props> = (props) =>  (
  <span data-optional>
    <FieldLabel {...props} />
  </span>
)
Optional.args = {
  variant: "optional",
  children: "Optional"
};
