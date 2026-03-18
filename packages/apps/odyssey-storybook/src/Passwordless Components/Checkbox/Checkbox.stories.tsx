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

import { Checkbox } from "@okta/odyssey-contributions-passwordless-components";
import { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { fieldComponentPropsMetaData } from "../../Odyssey Core/Fields/fieldComponentPropsMetaData.js";
import { PasswordlessComponentsOdysseyStorybookThemeDecorator } from "../../tools/PasswordlessComponentsOdysseyStorybookThemeDecorator.js";

const meta = {
  component: Checkbox,
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
    isIndeterminate: {
      control: "boolean",
      description: "If `true`, the checkbox is in an indeterminate state",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    isReadOnly: {
      control: "boolean",
      description: "If `true`, the checkbox is read-only",
      table: {
        type: {
          summary: "boolean",
        },
        defaultValue: {
          summary: "false",
        },
      },
    },
    isRequired: {
      control: "boolean",
      description: "If `true`, the checkbox shows a required indicator",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    label: {
      control: "text",
      description: "The label text for the checkbox",
      table: {
        type: {
          summary: "string",
        },
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
    validity: {
      control: { type: "select" },
      options: ["valid", "invalid", "inherit"],
      description: "The checkbox validity state",
      table: {
        type: {
          summary: '"valid" | "invalid" | "inherit"',
        },
        defaultValue: {
          summary: "inherit",
        },
      },
    },
  },
  args: {
    label: "Require passkey for admin actions",
  },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithHint: Story = {
  args: {
    hint: "Adds an extra layer of security for sensitive operations",
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
    hint: "Adds an extra layer of security for sensitive operations",
  },
};

export const Required: Story = {
  args: {
    isRequired: true,
    secureLevel: "most",
  },
};

export const Indeterminate: Story = {
  args: {
    isIndeterminate: true,
    secureLevel: "more",
  },
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
    secureLevel: "most",
  },
};

export const ReadOnly: Story = {
  render: function C() {
    const [isChecked, setIsChecked] = useState(true);
    return (
      <Checkbox
        isChecked={isChecked}
        isReadOnly={true}
        label="Require passkey for admin actions"
        onChange={(_, checked) => setIsChecked(checked)}
        secureLevel="most"
      />
    );
  },
};

export const Invalid: Story = {
  args: {
    validity: "invalid",
    secureLevel: "most",
  },
};
