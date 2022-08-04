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
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { MuiThemeDecorator } from "../../../../.storybook/components";

import RadioMdx from "./Radio.mdx";

export default {
  title: `MUI Components/Radio`,
  component: Radio,
  parameters: {
    docs: {
      page: RadioMdx,
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
      defaultValue: "Select the speed at which you wish to travel.",
    },
    invalid: {
      control: "boolean",
      defaultValue: false,
    },
    label: {
      control: "text",
      defaultValue: "Speed",
    },
  },
  decorators: [MuiThemeDecorator],
};

const DefaultTemplate: Story = (args) => {
  const {} = args;
  return (
    <FormControl
      component="fieldset"
      disabled={args.disabled}
      error={args.invalid}
    >
      <FormLabel component="legend">{args.label}</FormLabel>
      {args.hint && (
        <FormHelperText id="radio-hint">{args.hint}</FormHelperText>
      )}
      <RadioGroup
        defaultValue="Lightspeed"
        name="radio-buttons-group"
        aria-describedby="radio-hint radio-error"
      >
        <FormControlLabel
          value="Lightspeed"
          control={<Radio />}
          label="Lightspeed"
        />
        <FormControlLabel
          value="Warp speed"
          control={<Radio />}
          label="Warp speed"
        />
        <FormControlLabel
          value="Ludicrous speed"
          control={<Radio />}
          label="Ludicrous speed"
        />
      </RadioGroup>
      {args.error && (
        <FormHelperText id="radio-error" error>
          <span style={visuallyHidden}>Error:</span> {args.error}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Disabled = DefaultTemplate.bind({});
Disabled.args = {
  disabled: true,
};

export const Invalid = DefaultTemplate.bind({});
Invalid.args = {
  invalid: true,
  error: "This field is required.",
};
