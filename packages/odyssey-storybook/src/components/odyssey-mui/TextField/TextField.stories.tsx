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

import { Meta, StoryObj } from "@storybook/react";
import {
  InputAdornment,
  TextField,
  TextFieldProps,
} from "@okta/odyssey-react-mui";

import { MuiThemeDecorator } from "../../../../.storybook/components";

const storybookMeta: Meta<TextFieldProps> = {
  title: "MUI Components/Forms/TextField",
  component: TextField,
  argTypes: {
    autoCompleteType: {
      control: "text",
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
    },
    value: {
      control: "text",
    },
  },
  args: {
    label: "Destination",
  },
  decorators: [MuiThemeDecorator],
};

export default storybookMeta;

// States

export const Default: StoryObj<TextFieldProps> = {
  args: {
    //
  },
};

export const Disabled: StoryObj<TextFieldProps> = {
  args: {
    isDisabled: true,
    value: "Earth",
  },
};

export const Optional: StoryObj<TextFieldProps> = {
  args: {
    isOptional: true,
  },
};

export const ReadOnly: StoryObj<TextFieldProps> = {
  args: {
    isReadOnly: true,
    value: "Earth",
  },
};

export const Error: StoryObj<TextFieldProps> = {
  args: {
    errorMessage: "This field is required.",
  },
};

export const Hint: StoryObj<TextFieldProps> = {
  args: {
    hint: "Specify your destination within the Sol system.",
  },
};

export const Adornment: StoryObj<TextFieldProps> = {
  args: {
    label: "Cargo weight",
    endAdornment: <InputAdornment position="end">kg</InputAdornment>,
  },
};

// Types
export const Email: StoryObj<TextFieldProps> = {
  args: {
    autoCompleteType: "work email",
    label: "Company email",
    type: "email",
  },
};

export const Multiline: StoryObj<TextFieldProps> = {
  args: {
    autoCompleteType: "shipping street-address",
    label: "Permanent residence",
    isMultiline: true,
  },
};

export const Tel: StoryObj<TextFieldProps> = {
  args: {
    autoCompleteType: "mobile tel",
    label: "Phone number",
    startAdornment: <InputAdornment position="start">+1</InputAdornment>,
    type: "tel",
  },
};
