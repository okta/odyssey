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

import { Radio } from "@okta/odyssey-react-mui";
import { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import { OdysseyStorybookThemeDecorator } from "../../../tools/OdysseyStorybookThemeDecorator.js";
import { fieldComponentPropsMetaData } from "../fieldComponentPropsMetaData.js";

const meta = {
  component: Radio,
  decorators: [OdysseyStorybookThemeDecorator],
  tags: ["autodocs"],
  argTypes: {
    isChecked: {
      control: "boolean",
      description: "If `true`, the radio button is checked",
      table: {
        category: "Visual",
        type: {
          summary: "boolean",
        },
      },
    },
    hint: {
      control: "text",
      description: "The helper text content",
      table: {
        category: "Visual",
        type: {
          summary: "string",
        },
      },
    },
    isDisabled: fieldComponentPropsMetaData.isDisabled,
    isInvalid: {
      control: "boolean",
      description: "If `true`, the radio button has an invalid value",
      table: {
        category: "Visual",
        type: {
          summary: "boolean",
        },
      },
    },
    isReadOnly: {
      control: "boolean",
      description: "If `true`, the radio button is read-only",
      table: {
        category: "Visual",
        type: {
          summary: "boolean",
        },
        defaultValue: {
          summary: "false",
        },
      },
    },
    label: {
      control: "text",
      description: "The label text for the radio button",
      table: {
        category: "Visual",
        type: {
          summary: "string",
        },
      },
      type: {
        required: true,
        name: "string",
      },
    },
    onChange: {
      description: "Callback fired when the the radio button value changes",
      table: {
        category: "Functional",
        type: {
          summary: "func",
        },
      },
    },
    onBlur: {
      description: "Callback fired when the blur event happens",
      table: {
        category: "Functional",
        type: {
          summary: "func",
        },
      },
    },
    name: fieldComponentPropsMetaData.name,
    value: {
      control: "text",
      description: "The value attribute of the radio button",
      table: {
        category: "Functional",
        type: {
          summary: "string",
        },
      },
      type: {
        required: true,
        name: "string",
      },
    },
  },
  args: {
    label: "Label",
    onBlur: fn(),
    onChange: fn(),
    value: "Value",
  },
} satisfies Meta<typeof Radio>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Checked: Story = {
  args: {
    label: "Automatically assign Okta Admin Console",
    isChecked: true,
  },
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
  },
};

export const Hint: Story = {
  parameters: {
    docs: {
      description: {
        story: "A `hint` provides helper text to the Radio",
      },
    },
  },
  args: {
    label: "Automatically assign Okta Admin Console",
    hint: "All admin roles get access when the role is assigned.",
  },
};

export const ReadOnly: Story = {
  args: {
    label: "Automatically assign Okta Admin Console",
    isReadOnly: true,
    isChecked: true,
  },
};

export const Invalid: Story = {
  args: {
    isChecked: true,
    isInvalid: true,
  },
};
