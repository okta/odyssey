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
  Radio,
  RadioGroup,
} from "@okta/odyssey-contributions-passwordless-components";
import { Link } from "@okta/odyssey-react-mui";
import { Meta, StoryObj } from "@storybook/react-vite";

import { fieldComponentPropsMetaData } from "../../Odyssey Core/Fields/fieldComponentPropsMetaData.js";
import { PasswordlessComponentsOdysseyStorybookThemeDecorator } from "../../tools/PasswordlessComponentsOdysseyStorybookThemeDecorator.js";

const meta = {
  component: RadioGroup,
  decorators: [PasswordlessComponentsOdysseyStorybookThemeDecorator],
  tags: ["autodocs"],
  argTypes: {
    children: {
      description: "An array of Radio components within the group",
      table: {
        type: {
          summary: "Array<ReactElement<typeof Radio>>",
        },
      },
      type: {
        required: true,
        name: "other",
        value: "Array<ReactElement<typeof Radio>>",
      },
    },
    defaultValue: {
      control: "text",
      description:
        "The text value of the radio that should be selected by default",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    errorMessage: fieldComponentPropsMetaData.errorMessage,
    hint: fieldComponentPropsMetaData.hint,
    HintLinkComponent: fieldComponentPropsMetaData.HintLinkComponent,
    isDisabled: fieldComponentPropsMetaData.isDisabled,
    isReadOnly: fieldComponentPropsMetaData.isReadOnly,
    label: {
      control: "text",
      description: "The text label for the radio group",
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
    label: "Authentication Method",
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

const Template: Story = {
  args: {} as Story["args"],
  render: function C(props) {
    return (
      <RadioGroup {...props}>
        <Radio label="Passkeys" value="passkeys" />
        <Radio label="Email magic link" value="email" />
        <Radio label="SMS OTP" value="sms" />
      </RadioGroup>
    );
  },
};

export const Default: Story = {
  ...Template,
  args: {
    defaultValue: "",
  } as Story["args"],
};

export const WithHint: Story = {
  ...Template,
  args: {
    hint: "Select your preferred authentication method",
    defaultValue: "",
  } as Story["args"],
};

export const WithHintLink: Story = {
  ...Template,
  args: {
    hint: "Select your preferred authentication method",
    HintLinkComponent: (
      <Link href="#link">Learn more about authentication options</Link>
    ),
    defaultValue: "",
  } as Story["args"],
};

export const GroupSecureLevelMore: Story = {
  ...Template,
  args: {
    secureLevel: "more",
    defaultValue: "",
  } as Story["args"],
};

export const GroupSecureLevelMost: Story = {
  ...Template,
  args: {
    secureLevel: "most",
    defaultValue: "",
  } as Story["args"],
};

export const IndividualSecureLevels: Story = {
  args: {
    label: "Authentication Method",
    defaultValue: "",
  } as Story["args"],
  render: function C(props) {
    return (
      <RadioGroup {...props}>
        <Radio
          hint="Hardware-backed authentication"
          label="Passkeys"
          secureLevel="most"
          value="passkeys"
        />
        <Radio
          hint="Passwordless email verification"
          label="Email magic link"
          secureLevel="more"
          value="email"
        />
        <Radio hint="Text message verification" label="SMS OTP" value="sms" />
      </RadioGroup>
    );
  },
};

export const CombinedSecureLevels: Story = {
  args: {
    label: "Authentication Method",
    secureLevel: "most",
    defaultValue: "",
  } as Story["args"],
  render: function C(props) {
    return (
      <RadioGroup {...props}>
        <Radio
          hint="Hardware-backed authentication"
          label="Passkeys"
          secureLevel="most"
          value="passkeys"
        />
        <Radio
          hint="Passwordless email verification"
          label="Email magic link"
          secureLevel="more"
          value="email"
        />
        <Radio hint="Text message verification" label="SMS OTP" value="sms" />
      </RadioGroup>
    );
  },
};

export const Disabled: Story = {
  ...Template,
  args: {
    isDisabled: true,
    secureLevel: "most",
    defaultValue: "",
  } as Story["args"],
};

export const ReadOnly: Story = {
  ...Template,
  args: {
    isReadOnly: true,
    secureLevel: "most",
    defaultValue: "passkeys",
  } as Story["args"],
};

export const WithError: Story = {
  ...Template,
  args: {
    errorMessage: "Please select an authentication method",
    defaultValue: "",
  } as Story["args"],
};
