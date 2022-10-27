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
import {
  EyeIcon,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputBase,
  InputLabel,
  SearchIcon,
  Tooltip,
  Typography,
  visuallyHidden,
} from "@okta/odyssey-react-mui";
import { MuiThemeDecorator } from "../../../../.storybook/components";

import TextFieldMdx from "./TextField.mdx";

export default {
  title: `MUI Components/Forms/Text Field`,
  component: InputBase,
  parameters: {
    docs: {
      page: TextFieldMdx,
    },
  },
  argTypes: {
    autoComplete: {
      control: "text",
      defaultValue: "name",
    },
    disabled: {
      control: "boolean",
      defaultValue: false,
    },
    endAdornment: {
      control: "text",
      defaultValue: null,
    },
    error: {
      control: "text",
      defaultValue: null,
    },
    hint: {
      control: "text",
      defaultValue: null,
    },
    invalid: {
      control: "boolean",
      defaultValue: false,
    },
    label: {
      control: "text",
      defaultValue: "Destination",
    },
    multiline: {
      control: "boolean",
      defaultValue: false,
    },
    optionalLabel: {
      control: "text",
      defaultValue: "Optional",
    },
    placeholder: {
      control: "text",
      defaultValue: null,
    },
    readOnly: {
      control: "boolean",
      defaultValue: false,
    },
    required: {
      control: "boolean",
      defaultValue: true,
    },
    startAdornment: {
      control: "text",
      defaultValue: null,
    },
    type: {
      control: "select",
      options: ["text", "email", "search", "tel", "password"],
      defaultValue: "text",
    },
    value: {
      control: "text",
      defaultValue: null,
    },
  },
  decorators: [MuiThemeDecorator],
};

const Template: Story = (args) => {
  return (
    <FormControl disabled={args.disabled} error={args.invalid}>
      <InputLabel id="demo-text-field-label">
        {args.label}
        {!args.required && (
          <Typography variant="subtitle1">{args.optionalLabel}</Typography>
        )}
      </InputLabel>
      {args.hint && (
        <FormHelperText id="textfield-hint">{args.hint}</FormHelperText>
      )}
      <InputBase
        inputProps={{ "aria-describedby": "textfield-hint textfield-error" }}
        autoComplete={args.autoComplete}
        endAdornment={
          args.type === "password" ? (
            <InputAdornment position="end">
              <Tooltip title="Toggle password visibility">
                <IconButton aria-label="toggle password visibility" edge="end">
                  <EyeIcon />
                </IconButton>
              </Tooltip>
            </InputAdornment>
          ) : (
            args.endAdornment
          )
        }
        id="demo-text-field"
        multiline={args.multiline}
        placeholder={args.type === "search" ? args.placeholder : null}
        readOnly={args.readOnly}
        startAdornment={
          args.type === "search" ? (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ) : (
            args.startAdornment
          )
        }
        type={args.type}
        value={args.value}
      />
      {args.error && (
        <FormHelperText id="textfield-error" error>
          <span style={visuallyHidden}>Error:</span> {args.error}
        </FormHelperText>
      )}
    </FormControl>
  );
};

// States

export const Default = Template.bind({});
Default.args = {};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};

export const Optional = Template.bind({});
Optional.args = {
  required: false,
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
  readOnly: true,
  value: "Earth",
};

export const Invalid = Template.bind({});
Invalid.args = {
  invalid: true,
  error: "This field is required.",
};

export const Hint = Template.bind({});
Hint.args = {
  hint: "Specify your destination within the Sol system.",
};

export const Adornment = Template.bind({});
Adornment.args = {
  label: "Cargo weight",
  endAdornment: <InputAdornment position="end">kg</InputAdornment>,
};

// Types

export const Email = Template.bind({});
Email.args = {
  autoComplete: "work email",
  label: "Company email",
  type: "email",
};

export const Multiline = Template.bind({});
Multiline.args = {
  autoComplete: "shipping street-address",
  label: "Permanent residence",
  multiline: true,
};

export const Password = Template.bind({});
Password.args = {
  autoComplete: "current-password",
  label: "Password",
  type: "password",
};

export const Search = Template.bind({});
Search.args = {
  label: "Search",
  placeholder: "Search planets",
  type: "search",
};

export const Tel = Template.bind({});
Tel.args = {
  autoComplete: "mobile tel",
  label: "Phone number",
  startAdornment: <InputAdornment position="start">+1</InputAdornment>,
  type: "tel",
};
