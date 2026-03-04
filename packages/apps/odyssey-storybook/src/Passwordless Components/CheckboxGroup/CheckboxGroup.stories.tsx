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
} from "@okta/odyssey-contributions-passwordless-components";
import { Link } from "@okta/odyssey-react-mui";
import { Meta, StoryObj } from "@storybook/react-vite";

import { fieldComponentPropsMetaData } from "../../Odyssey Core/Fields/fieldComponentPropsMetaData.js";
import { PasswordlessComponentsOdysseyStorybookThemeDecorator } from "../../tools/PasswordlessComponentsOdysseyStorybookThemeDecorator.js";

const meta = {
  component: CheckboxGroup,
  decorators: [PasswordlessComponentsOdysseyStorybookThemeDecorator],
  tags: ["autodocs"],
  argTypes: {
    children: {
      description: "An array of Checkbox components within the group",
      table: {
        type: {
          summary: "Array<ReactElement<typeof Checkbox>>",
        },
      },
      type: {
        required: true,
        name: "other",
        value: "Array<ReactElement<typeof Checkbox>>",
      },
    },
    errorMessage: fieldComponentPropsMetaData.errorMessage,
    hint: fieldComponentPropsMetaData.hint,
    HintLinkComponent: fieldComponentPropsMetaData.HintLinkComponent,
    isDisabled: fieldComponentPropsMetaData.isDisabled,
    isReadOnly: fieldComponentPropsMetaData.isReadOnly,
    label: {
      control: "text",
      description: "The text label for the checkbox group",
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
        "Security level indicator shown above the group label. Use 'more' for text-only badge or 'most' for badge with icon",
      table: {
        type: {
          summary: '"more" | "most"',
        },
      },
    },
  },
  args: {
    label: "Security Options",
  },
} satisfies Meta<typeof CheckboxGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

const Template: Story = {
  args: {} as Story["args"],
  render: function C(props) {
    return (
      <CheckboxGroup {...props}>
        <Checkbox label="Require passkey for admin actions" value="passkey" />
        <Checkbox label="Enable magic link fallback" value="magiclink" />
        <Checkbox label="Allow SMS verification" value="sms" />
      </CheckboxGroup>
    );
  },
};

export const Default: Story = {
  ...Template,
};

export const WithHint: Story = {
  ...Template,
  args: {
    hint: "Select all security features you want to enable",
  } as Story["args"],
};

export const WithHintLink: Story = {
  ...Template,
  args: {
    hint: "Select all security features you want to enable",
    HintLinkComponent: (
      <Link href="#link">Learn more about security options</Link>
    ),
  } as Story["args"],
};

export const GroupSecureLevelMore: Story = {
  ...Template,
  args: {
    secureLevel: "more",
  } as Story["args"],
};

export const GroupSecureLevelMost: Story = {
  ...Template,
  args: {
    secureLevel: "most",
  } as Story["args"],
};

export const IndividualSecureLevels: Story = {
  args: {
    label: "Security Options",
  } as Story["args"],
  render: function C(props) {
    return (
      <CheckboxGroup {...props}>
        <Checkbox
          hint="Hardware-backed authentication"
          label="Require passkey for admin actions"
          secureLevel="most"
          value="passkey"
        />
        <Checkbox
          hint="Passwordless email verification"
          label="Enable magic link fallback"
          secureLevel="more"
          value="magiclink"
        />
        <Checkbox
          hint="Text message verification"
          label="Allow SMS verification"
          value="sms"
        />
      </CheckboxGroup>
    );
  },
};

export const CombinedSecureLevels: Story = {
  args: {
    label: "Security Options",
    secureLevel: "most",
  } as Story["args"],
  render: function C(props) {
    return (
      <CheckboxGroup {...props}>
        <Checkbox
          hint="Hardware-backed authentication"
          label="Require passkey for admin actions"
          secureLevel="most"
          value="passkey"
        />
        <Checkbox
          hint="Passwordless email verification"
          label="Enable magic link fallback"
          secureLevel="more"
          value="magiclink"
        />
        <Checkbox
          hint="Text message verification"
          label="Allow SMS verification"
          value="sms"
        />
      </CheckboxGroup>
    );
  },
};

export const Disabled: Story = {
  ...Template,
  args: {
    isDisabled: true,
    secureLevel: "most",
  } as Story["args"],
};

export const ReadOnly: Story = {
  ...Template,
  args: {
    isReadOnly: true,
    secureLevel: "most",
  } as Story["args"],
};

export const WithError: Story = {
  ...Template,
  args: {
    errorMessage: "Please select at least one security option",
  } as Story["args"],
};
