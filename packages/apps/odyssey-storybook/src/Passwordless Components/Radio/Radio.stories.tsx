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

import { Radio } from "@okta/odyssey-contributions-passwordless-components";
import { Meta, StoryObj } from "@storybook/react-vite";

import { fieldComponentPropsMetaData } from "../../Odyssey Core/Fields/fieldComponentPropsMetaData.js";
import { PasswordlessComponentsOdysseyStorybookThemeDecorator } from "../../tools/PasswordlessComponentsOdysseyStorybookThemeDecorator.js";

const meta = {
  component: Radio,
  decorators: [PasswordlessComponentsOdysseyStorybookThemeDecorator],
  tags: ["autodocs"],
  argTypes: {
    hint: {
      control: "text",
      description: "The helper text content",
      table: {
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
        type: {
          summary: "boolean",
        },
      },
    },
    isReadOnly: {
      control: "boolean",
      description: "If `true`, the radio button is read-only",
      table: {
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
        type: {
          summary: "string",
        },
      },
      type: {
        required: true,
        name: "string",
      },
    },
    secureLevel: {
      control: { type: "select" },
      options: [undefined, "more", "most"],
      description:
        "Security level indicator. Use 'more' for text-only badge or 'most' for badge with icon",
      table: {
        type: {
          summary: '"more" | "most"',
        },
      },
    },
    value: {
      control: "text",
      description: "The value attribute of the radio button",
      table: {
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
    label: "Passkeys",
    value: "passkeys",
  },
} satisfies Meta<typeof Radio>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithHint: Story = {
  args: {
    hint: "Hardware-backed authentication for maximum security",
  },
};

export const SecureLevelMore: Story = {
  args: {
    secureLevel: "more",
  },
};

export const SecureLevelMost: Story = {
  args: {
    secureLevel: "most",
  },
};

export const SecureLevelWithHint: Story = {
  args: {
    secureLevel: "most",
    hint: "Hardware-backed authentication for maximum security",
  },
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
    secureLevel: "most",
  },
};

export const ReadOnly: Story = {
  args: {
    isReadOnly: true,
    secureLevel: "most",
  },
};
