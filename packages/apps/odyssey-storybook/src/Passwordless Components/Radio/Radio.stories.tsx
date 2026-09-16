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
  type SecureSettingsIndicatorLevel,
} from "@okta/odyssey-contributions-passwordless-components";
import { Meta, StoryObj } from "@storybook/react-vite";

import { fieldComponentPropsMetaData } from "../../Odyssey Core/Fields/fieldComponentPropsMetaData.js";
import {
  staticBoardParameters,
  StoryFieldCell,
  StoryGrid,
  StorySection,
} from "../../tools/boardStoryHelpers.js";
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

export const Playground: Story = {};

export const AllSecureLevels: Story = {
  name: "All secure levels",
  parameters: staticBoardParameters,
  render: function C() {
    const secureLevels: Array<SecureSettingsIndicatorLevel | undefined> = [
      undefined,
      "more",
      "most",
    ];

    return (
      <StorySection title="Every secure level, with and without a hint.">
        <StoryGrid columns={3}>
          {secureLevels.map((secureLevel) => (
            <StoryFieldCell key={secureLevel ?? "none"}>
              <Radio
                label={`secureLevel: ${secureLevel ?? "none"}`}
                secureLevel={secureLevel}
                value={secureLevel ?? "none"}
              />
            </StoryFieldCell>
          ))}

          {secureLevels.map((secureLevel) => (
            <StoryFieldCell key={`${secureLevel ?? "none"}-hint`}>
              <Radio
                hint="Hardware-backed authentication for maximum security"
                label={`secureLevel: ${secureLevel ?? "none"}`}
                secureLevel={secureLevel}
                value={`${secureLevel ?? "none"}-hint`}
              />
            </StoryFieldCell>
          ))}
        </StoryGrid>
      </StorySection>
    );
  },
};

export const AllStates: Story = {
  name: "All states",
  parameters: staticBoardParameters,
  render: function C() {
    return (
      <StorySection title="Every radio state, shown at the highest secure level.">
        <StoryGrid columns={3}>
          <StoryFieldCell>
            <Radio
              isDisabled
              label="Disabled"
              secureLevel="most"
              value="disabled"
            />
          </StoryFieldCell>

          <StoryFieldCell>
            <Radio
              isReadOnly
              label="Read-only"
              secureLevel="most"
              value="read-only"
            />
          </StoryFieldCell>

          <StoryFieldCell>
            <Radio
              isInvalid
              label="Invalid"
              secureLevel="most"
              value="invalid"
            />
          </StoryFieldCell>
        </StoryGrid>
      </StorySection>
    );
  },
};
