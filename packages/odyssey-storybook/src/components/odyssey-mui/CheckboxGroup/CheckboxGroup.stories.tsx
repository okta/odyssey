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

import {
  Checkbox,
  CheckboxGroup,
  CheckboxGroupProps,
  CheckboxProps,
} from "@okta/odyssey-react-mui";
import { Story, Meta } from "@storybook/react";

import { MuiThemeDecorator } from "../../../../.storybook/components";
import CheckboxGroupMdx from "./CheckboxGroup.mdx";

const storybookMeta: Meta<
  CheckboxGroupProps & {
    isDefaultChecked: Parameters<typeof Checkbox>[0]["isDefaultChecked"];
    isIndeterminate: Parameters<typeof Checkbox>[0]["isIndeterminate"];
  }
> = {
  title: `MUI Components/Forms/CheckboxGroup`,
  component: CheckboxGroup,
  parameters: {
    docs: {
      page: CheckboxGroupMdx,
    },
  },
  argTypes: {
    isDefaultChecked: {
      control: "boolean",
      defaultValue: false,
    },
    isDisabled: {
      control: "boolean",
      defaultValue: false,
    },
    errorMessage: {
      control: "text",
      defaultValue: null,
    },
    hint: {
      control: "text",
      defaultValue:
        "Ensure these systems are operating before initiating warp.",
    },
    isIndeterminate: {
      control: "boolean",
      defaultValue: false,
    },
    isRequired: {
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

export default storybookMeta;

const SingleTemplate: Story<
  CheckboxGroupProps & {
    isDefaultChecked: CheckboxProps["isDefaultChecked"];
    isIndeterminate: CheckboxProps["isIndeterminate"];
  }
> = (args) => (
  <CheckboxGroup
    errorMessage={args.errorMessage}
    hint={args.hint}
    isDisabled={args.isDisabled}
    label={args.label}
    isRequired={args.isRequired}
  >
    <Checkbox
      isDefaultChecked={args.isDefaultChecked}
      isIndeterminate={args.isIndeterminate}
      label="Pre-flight systems check complete"
      name="life-support"
      value="life-support"
    />
  </CheckboxGroup>
);

export const Single = SingleTemplate.bind({});
Single.parameters = { controls: { exclude: ["hint", "label"] } };
Single.args = {};

export const Checked = SingleTemplate.bind({});
Checked.parameters = { controls: { exclude: ["hint", "label"] } };
Checked.args = {
  isDefaultChecked: true,
};

export const Indeterminate = SingleTemplate.bind({});
Indeterminate.parameters = { controls: { exclude: ["hint", "label"] } };
Indeterminate.args = {
  isIndeterminate: true,
};

const GroupTemplate: Story<CheckboxGroupProps> = (args) => {
  return (
    <CheckboxGroup
      errorMessage={args.errorMessage}
      hint={args.hint}
      isDisabled={args.isDisabled}
      label="Systems check"
      isRequired={args.isRequired}
    >
      <Checkbox label="Life support" name="life-support" value="life-support" />
      <Checkbox
        label="Warp core containment"
        name="warp-core"
        value="warp-core"
      />
      <Checkbox label="Cetacean ops" name="cetacean-ops" value="cetacean-ops" />
    </CheckboxGroup>
  );
};

export const Group = GroupTemplate.bind({});
Group.parameters = {
  controls: { exclude: ["defaultChecked", "isIndeterminate"] },
};
Group.args = {};

export const Disabled = GroupTemplate.bind({});
Disabled.parameters = {
  controls: { exclude: ["defaultChecked", "isIndeterminate"] },
};
Disabled.args = {
  isDisabled: true,
};

export const Error = GroupTemplate.bind({});
Error.parameters = {
  controls: { exclude: ["defaultChecked", "isIndeterminate"] },
};
Error.args = {
  errorMessage: "Select 1 or more systems to check before initiating warp.",
};

const MixedErrorTemplate: Story<CheckboxGroupProps> = (args) => {
  return (
    <CheckboxGroup
      isDisabled={args.isDisabled}
      errorMessage={args.errorMessage}
      hint={args.hint}
      label="Who will you invite to your birthday?"
      isRequired={args.isRequired}
    >
      <Checkbox label="Alfred" name="alfred" value="alfred" />
      <Checkbox
        isDefaultChecked
        label="Barbara Gordon"
        name="barbara-gordon"
        value="barbara-gordon"
      />
      <Checkbox label="Hal Jordan" name="hal-jordan" value="hal-jordan" />
      <Checkbox
        isDefaultChecked
        label="The Joker"
        name="the-joker"
        value="the-joker"
      />
    </CheckboxGroup>
  );
};

export const MixedError = MixedErrorTemplate.bind({});
MixedError.parameters = {
  controls: { exclude: ["defaultChecked", "isIndeterminate"] },
};
MixedError.args = {
  errorMessage: "These choices are incompatible.",
};
