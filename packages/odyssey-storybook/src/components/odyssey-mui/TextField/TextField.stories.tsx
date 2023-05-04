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

import { Meta, Story } from "@storybook/react";
import { TextField, TextFieldProps } from "@okta/odyssey-react-mui";

import { MuiThemeDecorator } from "../../../../.storybook/components";
import TextFieldMdx from "./TextField.mdx";

const storybookMeta: Meta<TextFieldProps> = {
  title: `MUI Components/Forms/TextField`,
  component: TextField,
  parameters: {
    docs: {
      page: TextFieldMdx,
    },
  },
  argTypes: {
    autoCompleteType: {
      control: "text",
      defaultValue: "name",
    },
    hasInitialFocus: {
      control: "boolean",
    },
    isDisabled: {
      control: "boolean",
    },
    endAdornment: {
      control: "text",
    },
    errorMessage: {
      control: "text",
    },
    hint: {
      control: "text",
    },
    id: {
      control: "text",
    },
    label: {
      control: "text",
      defaultValue: "Destination",
    },
    isMultiline: {
      control: "boolean",
    },
    onBlur: {
      control: "function",
    },
    onChange: {
      control: "function",
    },
    onFocus: {
      control: "function",
    },
    isOptional: {
      control: "boolean",
      defaultValue: false,
    },
    optionalLabel: {
      control: "text",
      defaultValue: "Optional",
    },
    placeholder: {
      control: "text",
    },
    isReadOnly: {
      control: "boolean",
    },
    startAdornment: {
      control: "text",
    },
    type: {
      control: "select",
      options: ["email", "number", "tel", "text", "url"],
      defaultValue: "text",
    },
    value: {
      control: "text",
    },
  },
  decorators: [MuiThemeDecorator],
};

export default storybookMeta;

const Template: Story<TextFieldProps> = (args) => {
  return <TextField {...args} />;
};

// States

export const Default = Template.bind({});
Default.args = {};

export const Disabled = Template.bind({});
Disabled.args = {
  isDisabled: true,
  value: "Earth",
};

export const Optional = Template.bind({});
Optional.args = {
  isOptional: true,
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
  isReadOnly: true,
  value: "Earth",
};

export const Error = Template.bind({});
Error.args = {
  errorMessage: "This field is required.",
};

export const Hint = Template.bind({});
Hint.args = {
  hint: "Specify your destination within the Sol system.",
};

export const Adornment = Template.bind({});
Adornment.args = {
  label: "Cargo weight",
  endAdornment: "kg",
};

// Types
export const Email = Template.bind({});
Email.args = {
  autoCompleteType: "work email",
  label: "Company email",
  type: "email",
};

export const Multiline = Template.bind({});
Multiline.args = {
  autoCompleteType: "shipping street-address",
  label: "Permanent residence",
  isMultiline: true,
};

export const Tel = Template.bind({});
Tel.args = {
  autoCompleteType: "mobile tel",
  label: "Phone number",
  startAdornment: "+1",
  type: "tel",
};
