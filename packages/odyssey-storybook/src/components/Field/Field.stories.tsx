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
import { Source } from "./Field.docgen";
import { Field, FieldProps, ScreenReaderText } from "@okta/odyssey-react";

import FieldMdx from "./Field.mdx";

export default {
  title: `Components/Field`,
  component: Source,
  parameters: {
    docs: {
      page: FieldMdx,
    },
  },
  args: {
    label: "Destination",
    optionalLabel: "Optional",
    hint: "Your planetary destination.",
    error: (
      <>
        <ScreenReaderText>Error:</ScreenReaderText> This field may not be left
        blank.
      </>
    ),
    required: true,
  },
  argTypes: {
    error: { control: "text" },
    hint: { control: "text" },
    required: { control: "boolean" },
    children: { control: false },
    inputId: { control: false },
    as: { control: "radio" },
  },
};

const Template: Story<FieldProps> = (props) => <Field {...props} />;

export const KitchenSink = Template.bind({});
KitchenSink.args = {
  required: false,
};

export const FieldLabel = Template.bind({});
FieldLabel.args = {
  error: undefined,
  hint: undefined,
};

export const FieldOptional = Template.bind({});
FieldOptional.args = {
  error: undefined,
  hint: undefined,
  required: false,
};

export const FieldHint = Template.bind({});
FieldHint.args = {
  label: undefined,
  error: undefined,
};

export const FieldError = Template.bind({});
FieldError.args = {
  label: undefined,
  hint: undefined,
};
