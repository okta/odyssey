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
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { MuiThemeDecorator } from "../../../../.storybook/components";

import CheckboxMdx from "./Checkbox.mdx";

export default {
  title: `MUI Components/Checkbox`,
  component: Checkbox,
  parameters: {
    docs: {
      page: CheckboxMdx,
    },
  },
  argTypes: {
    defaultChecked: {
      control: "boolean",
      defaultValue: false,
    },
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
      defaultValue:
        "Ensure these systems are operating before initiating warp.",
    },
    indeterminate: {
      control: "boolean",
      defaultValue: false,
    },
    invalid: {
      control: "boolean",
      defaultValue: false,
    },
    label: {
      control: "text",
      defaultValue: "Systems check",
    },
  },
  decorators: [MuiThemeDecorator],
};

const SingleTemplate: Story = (args) => {
  const {} = args;
  return (
    <FormControl disabled={args.disabled} error={args.invalid}>
      <FormControlLabel
        control={
          <Checkbox
            name="life-support"
            defaultChecked={args.defaultChecked}
            indeterminate={args.indeterminate}
          />
        }
        label="Pre-flight systems check complete"
        aria-describedby="checkbox-error"
      />
      {args.error && (
        <FormHelperText error id="checkbox-error">
          <span style={visuallyHidden}>Error:</span> {args.error}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export const Single = SingleTemplate.bind({});
Single.parameters = { controls: { exclude: ["hint", "label"] } };
Single.args = {};

export const Checked = SingleTemplate.bind({});
Checked.parameters = { controls: { exclude: ["hint", "label"] } };
Checked.args = {
  defaultChecked: true,
};

export const Indeterminate = SingleTemplate.bind({});
Indeterminate.parameters = { controls: { exclude: ["hint", "label"] } };
Indeterminate.args = {
  indeterminate: true,
};

const GroupTemplate: Story = (args) => {
  const {} = args;
  return (
    <FormControl
      component="fieldset"
      disabled={args.disabled}
      error={args.invalid}
    >
      <FormLabel component="legend">Systems check</FormLabel>
      {args.hint && (
        <FormHelperText id="checkbox-hint">{args.hint}</FormHelperText>
      )}
      <FormGroup aria-describedby="checkbox-hint checkbox-error">
        <FormControlLabel
          control={<Checkbox name="life-support" />}
          label="Life support"
        />
        <FormControlLabel
          control={<Checkbox name="warp-core" />}
          label="Warp core containment"
        />
        <FormControlLabel
          control={<Checkbox name="cetacean-ops" />}
          label="Cetacean ops"
        />
      </FormGroup>
      {args.error && (
        <FormHelperText id="checkbox-error" error>
          <span style={visuallyHidden}>Error:</span> {args.error}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export const Group = GroupTemplate.bind({});
Group.parameters = {
  controls: { exclude: ["defaultChecked", "indeterminate"] },
};
Group.args = {};

export const Disabled = GroupTemplate.bind({});
Disabled.parameters = {
  controls: { exclude: ["defaultChecked", "indeterminate"] },
};
Disabled.args = {
  disabled: true,
};

export const Error = GroupTemplate.bind({});
Error.parameters = {
  controls: { exclude: ["defaultChecked", "indeterminate"] },
};
Error.args = {
  invalid: true,
  error: "Systems must be checked prior to launch.",
};
