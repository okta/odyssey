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
import { Select, SelectProps } from "@okta/odyssey-react-mui";
import { MuiThemeDecorator } from "../../../../.storybook/components";

import SelectMdx from "./Select.mdx";

const storybookMeta: Meta<SelectProps> = {
  title: `MUI Components/Forms/Select`,
  component: Select,
  parameters: {
    docs: {
      page: SelectMdx,
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
    optionalLabel: {
      control: "text",
      defaultValue: "Optional",
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

const optionsArray = [
  "Earth",
  "Mars",
  "Ceres",
  "Eros",
  "Tycho Station",
  "Phoebe",
  "Ganymede",
];

const optionsObject = [
  {
    text: "Earth",
    value: "earth",
  },
  {
    text: "Mars",
    value: "mars",
  },
  {
    text: "Ceres",
    value: "ceres",
  },
  {
    text: "Eros",
    value: "eros",
  },
  {
    text: "Tycho Station",
    value: "tycho-station",
  },
  {
    text: "Phoebe",
    value: "phoebe",
  },
  {
    text: "Ganymede",
    value: "ganymede",
  },
];

const optionsGrouped = [
  {
    text: "Sol System",
    type: "heading",
  },
  {
    text: "Earth",
    value: "earth",
  },
  {
    text: "Mars",
    value: "mars",
  },
  {
    text: "Ceres",
    value: "ceres",
  },
  {
    text: "Eros",
    value: "eros",
  },
  {
    text: "Tycho Station",
    value: "tycho-station",
  },
  {
    text: "Phoebe",
    value: "phoebe",
  },
  {
    text: "Ganymede",
    value: "ganymede",
  },
  {
    text: "Extrasolar",
    type: "heading",
  },
  "Auberon",
  "Al-Halub",
  "Freehold",
  "Laconia",
  "New Terra",
];

const Template: Story<SelectProps> = (args) => {
  return (
    <Select
      label={args.label}
      hint={args.hint}
      defaultValue={args.defaultValue}
      errorMessage={args.errorMessage}
      isDisabled={args.isDisabled}
      isMultiSelect={args.isMultiSelect}
      isNative={args.isNative}
      isOptional={args.isOptional}
      optionalLabel={args.optionalLabel}
      options={optionsArray}
    />
  );
};

const ObjectTemplate: Story<SelectProps> = (args) => {
  return (
    <Select
      label={args.label}
      hint={args.hint}
      errorMessage={args.errorMessage}
      isDisabled={args.isDisabled}
      isMultiSelect={args.isMultiSelect}
      isNative={args.isNative}
      isOptional={args.isOptional}
      optionalLabel={args.optionalLabel}
      options={optionsObject}
    />
  );
};

const GroupTemplate: Story<SelectProps> = (args) => {
  return (
    <Select
      label={args.label}
      hint={args.hint}
      errorMessage={args.errorMessage}
      isDisabled={args.isDisabled}
      isMultiSelect={args.isMultiSelect}
      isNative={args.isNative}
      isOptional={args.isOptional}
      optionalLabel={args.optionalLabel}
      options={optionsGrouped}
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

export const DefaultObject = ObjectTemplate.bind({});
DefaultObject.args = {};

export const DefaultGrouped = GroupTemplate.bind({});
DefaultGrouped.args = {};

export const Multi = Template.bind({});
Multi.args = {
  isMultiSelect: true,
};

export const NativeDefault = Template.bind({});
NativeDefault.args = {
  isNative: true,
  defaultValue: "Mars",
};

export const NativeMulti = Template.bind({});
NativeMulti.args = {
  isNative: true,
  isMultiSelect: true,
};
