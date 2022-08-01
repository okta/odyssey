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
import { FormControl, FormHelperText, InputLabel, Select } from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { MuiThemeDecorator } from "../../../../.storybook/components";

import SelectMdx from "./Select.mdx";

export default {
  title: `MUI Components/Select`,
  component: Select,
  parameters: {
    docs: {
      page: SelectMdx,
    },
  },
  argTypes: {
    disabled: {
      control: "boolean",
      defaultValue: false,
    },
    error: {
      control: "text",
      defaultValue: null,
    },
    hint: {
      control: "text",
      defaultValue: "Select your destination within the Sol system.",
    },
    invalid: {
      control: "boolean",
      defaultValue: false,
    },
    label: {
      control: "text",
      defaultValue: "Destination",
    },
  },
  decorators: [MuiThemeDecorator],
};

const NativeTemplate: Story = (args) => {
  const {} = args;
  return (
    <FormControl disabled={args.disabled} error={args.invalid}>
      <InputLabel id="demo-simple-select-label">{args.label}</InputLabel>
      {args.hint && (
        <FormHelperText id="select-hint">{args.hint}</FormHelperText>
      )}
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label={args.label}
        native
        aria-describedby="select-hint select-error"
      >
        <option value="earth">Earth</option>
        <option value="mars">Mars</option>
        <option value="ceres">Ceres</option>
        <option value="eros">Eros</option>
        <option value="tycho">Tycho Station</option>
        <option value="phoebe">Phoebe</option>
        <option value="ganymede">Ganymede</option>
      </Select>
      {args.error && (
        <FormHelperText id="select-error" error>
          <span style={visuallyHidden}>Error:</span> {args.error}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export const NativeDefault = NativeTemplate.bind({});
NativeDefault.args = {};

export const NativeDisabled = NativeTemplate.bind({});
NativeDisabled.args = {
  disabled: true,
};

export const NativeInvalid = NativeTemplate.bind({});
NativeInvalid.args = {
  invalid: true,
  error: "This field is required.",
};
