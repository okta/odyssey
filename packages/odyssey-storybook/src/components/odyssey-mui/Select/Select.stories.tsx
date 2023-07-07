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
    errorMessage: {
      control: "text",
      description: "The error message for the select component",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    hint: {
      control: "text",
      description: "The hint text for the select component",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    id: {
      control: "text",
      description: "The id attribute of the select component",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    isDisabled: {
      control: "boolean",
      description: "If `true`, the select component is disabled",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    isMultiSelect: {
      control: "boolean",
      description: "If `true`, the select component allows multiple selections",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    isOptional: {
      control: "boolean",
      description: "If `true`, the select component is optional",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    label: {
      control: "text",
      description: "The label text for the select component",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    onBlur: {
      control: null,
      description: "Callback fired when the select component loses focus",
      table: {
        type: {
          summary: "func",
        },
        defaultValue: "",
      },
    },
    onChange: {
      control: null,
      description:
        "Callback fired when the value of the select component changes",
      table: {
        type: {
          summary: "func",
        },
        defaultValue: "",
      },
    },
    onFocus: {
      control: null,
      description: "Callback fired when the select component gains focus",
      table: {
        type: {
          summary: "func",
        },
        defaultValue: "",
      },
    },
    options: {
      control: "object",
      description: "The options for the select component",
      table: {
        type: {
          summary: "(string | SelectOption)[]",
        },
      },
    },
    value: {
      control: "text",
      description: "The value or values selected in the select component",
      table: {
        type: {
          summary: "string | string[]",
        },
      },
    },
  },
  args: {
    hint: "Select your destination in the Sol system.",
    label: "Destination",
  },
  decorators: [MuiThemeDecorator],
  tags: ["autodocs"],
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

export const Disabled: StoryObj<SelectProps> = {
  ...Template,
  args: {
    isDisabled: true,
  },
};

export const Error: StoryObj<SelectProps> = {
  ...Template,
  args: {
    errorMessage: "Select your destination.",
  },
};

export const OptionsObject: StoryObj<SelectProps> = {
  ...ObjectTemplate,
  parameters: {
    docs: {
      description: {
        story:
          "Select can accept `options` as a flat array, an array of objects, or both. This demonstrates an array of objects with `value` and `name`.",
      },
    },
  },
};

export const OptionsGrouped: StoryObj<SelectProps> = {
  ...GroupTemplate,
  parameters: {
    docs: {
      description: {
        story:
          'Objects with `type: "heading"` will have their `text` displayed as a heading.',
      },
    },
  },
};

export const MultiSelect: StoryObj<SelectProps> = {
  ...Template,
  args: {
    isMultiSelect: true,
  },
};
