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
import { NativeSelect, NativeSelectProps } from "@okta/odyssey-react-mui";
import { MuiThemeDecorator } from "../../../../.storybook/components";

import NativeSelectMdx from "./NativeSelect.mdx";

const storybookMeta: Meta<NativeSelectProps> = {
  title: `MUI Components/Forms/NativeSelect`,
  component: NativeSelect,
  parameters: {
    docs: {
      page: NativeSelectMdx,
    },
  },
  argTypes: {
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
      defaultValue: "Select your destination in the Sol system.",
    },
    isOptional: {
      control: "boolean",
      defaultValue: false,
    },
    label: {
      control: "text",
      defaultValue: "Destination",
    },
    defaultValue: {
      control: "text",
      description: "The default value, if the control is native.",
    },
  },
  decorators: [MuiThemeDecorator],
};

export default storybookMeta;

const Template: Story<NativeSelectProps> = (args) => {
  return (
    <NativeSelect
      label={args.label}
      hint={args.hint}
      defaultValue={args.defaultValue}
      errorMessage={args.errorMessage}
      isDisabled={args.isDisabled}
      isMultiSelect={args.isMultiSelect}
      isOptional={args.isOptional}
      children={
        <>
          <option value="earth">Earth</option>
          <option value="mars">Mars</option>
          <option value="ceres">Ceres</option>
          <option value="eros">Eros</option>
          <option value="tycho-station">Tycho Station</option>
          <option value="phoebe">Phoebe</option>
          <option value="ganymede">Ganymede</option>
        </>
      }
    />
  );
};

const GroupTemplate: Story<NativeSelectProps> = (args) => {
  return (
    <NativeSelect
      label={args.label}
      hint={args.hint}
      errorMessage={args.errorMessage}
      isDisabled={args.isDisabled}
      isMultiSelect={args.isMultiSelect}
      isOptional={args.isOptional}
      children={
        <>
          <optgroup label="Sol System">
            <option value="earth">Earth</option>
            <option value="mars">Mars</option>
            <option value="ceres">Ceres</option>
            <option value="eros">Eros</option>
            <option value="tycho-station">Tycho Station</option>
            <option value="phoebe">Phoebe</option>
            <option value="ganymede">Ganymede</option>
          </optgroup>
          <optgroup label="Extrasolar">
            <option value="auberon">Auberon</option>
            <option value="al-halub">Al-Halub</option>
            <option value="freehold">Freehold</option>
            <option value="laconia">Laconia</option>
            <option value="new-terra">New Terra</option>
          </optgroup>
        </>
      }
    />
  );
};

export const Default = Template.bind({});
Default.args = {};

export const DefaultDisabled = Template.bind({});
DefaultDisabled.args = {
  isDisabled: true,
};

export const DefaultError = Template.bind({});
DefaultError.args = {
  errorMessage: "Select your destination.",
};

export const DefaultGrouped = GroupTemplate.bind({});
DefaultGrouped.args = {};

export const Multi = Template.bind({});
Multi.args = {
  isMultiSelect: true,
};
