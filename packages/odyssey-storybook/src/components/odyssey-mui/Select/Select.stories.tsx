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
import { Select, SelectProps } from "@okta/odyssey-react-mui";
import { MuiThemeDecorator } from "../../../../.storybook/components";

const storybookMeta: Meta<SelectProps> = {
  title: "MUI Components/Forms/Select",
  component: Select,
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
  },
  decorators: [MuiThemeDecorator],
};

export default storybookMeta;

const optionsArray: SelectProps["options"] = [
  "Earth",
  "Mars",
  "Ceres",
  "Eros",
  "Tycho Station",
  "Phoebe",
  "Ganymede",
];

const optionsObject: SelectProps["options"] = [
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

const optionsGrouped: SelectProps["options"] = [
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

const Template: StoryObj<SelectProps> = {
  render: function C(args) {
    return (
      <Select
        label={args.label}
        hint={args.hint}
        errorMessage={args.errorMessage}
        isDisabled={args.isDisabled}
        isMultiSelect={args.isMultiSelect}
        isOptional={args.isOptional}
        options={optionsArray}
      />
    );
  },
};

const ObjectTemplate: StoryObj<SelectProps> = {
  render: function C(args) {
    return (
      <Select
        label={args.label}
        hint={args.hint}
        errorMessage={args.errorMessage}
        isDisabled={args.isDisabled}
        isMultiSelect={args.isMultiSelect}
        isOptional={args.isOptional}
        options={optionsObject}
      />
    );
  },
  args: {
    hint: "Select your destination in the Sol system.",
  },
};

const GroupTemplate: StoryObj<SelectProps> = {
  render: function C(args) {
    return (
      <Select
        label={args.label}
        hint={args.hint}
        errorMessage={args.errorMessage}
        isDisabled={args.isDisabled}
        isMultiSelect={args.isMultiSelect}
        isOptional={args.isOptional}
        options={optionsGrouped}
      />
    );
  },
};

export const Default: StoryObj<SelectProps> = {
  ...Template,
};
Default.args = {};

export const DefaultDisabled: StoryObj<SelectProps> = {
  ...Template,
  args: {
    isDisabled: true,
  },
};

export const DefaultError: StoryObj<SelectProps> = {
  ...Template,
  args: {
    errorMessage: "Select your destination.",
  },
};

export const DefaultObject: StoryObj<SelectProps> = {
  ...ObjectTemplate,
};

export const DefaultGrouped: StoryObj<SelectProps> = {
  ...GroupTemplate,
};

export const Multi: StoryObj<SelectProps> = {
  ...Template,
  args: {
    isMultiSelect: true,
  },
};
