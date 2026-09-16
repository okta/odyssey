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
  type SecureSettingsIndicatorLevel,
} from "@okta/odyssey-contributions-passwordless-components";
import { Link } from "@okta/odyssey-react-mui";
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

export const Playground: Story = {
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

export const AllSecureLevels: Story = {
  args: {} as Story["args"],
  name: "All secure levels",
  parameters: staticBoardParameters,
  render: function C() {
    const groupLevels: Array<SecureSettingsIndicatorLevel | undefined> = [
      undefined,
      "more",
      "most",
    ];

    return (
      <StorySection title="Group-level secure levels, per-checkbox levels, and the two combined.">
        <StoryGrid columns={2}>
          {groupLevels.map((secureLevel) => (
            <StoryFieldCell key={secureLevel ?? "none"}>
              <CheckboxGroup
                label={`Group secureLevel: ${secureLevel ?? "none"}`}
                secureLevel={secureLevel}
              >
                <Checkbox
                  label="Require passkey for admin actions"
                  value="passkey"
                />
                <Checkbox
                  label="Enable magic link fallback"
                  value="magiclink"
                />
                <Checkbox label="Allow SMS verification" value="sms" />
              </CheckboxGroup>
            </StoryFieldCell>
          ))}

          <StoryFieldCell>
            <CheckboxGroup label="Individual levels only">
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
          </StoryFieldCell>

          <StoryFieldCell>
            <CheckboxGroup
              label="Group and individual combined"
              secureLevel="most"
            >
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
          </StoryFieldCell>
        </StoryGrid>
      </StorySection>
    );
  },
};

export const AllStates: Story = {
  args: {} as Story["args"],
  name: "All states",
  parameters: staticBoardParameters,
  render: function C() {
    return (
      <StorySection title="Every group state, shown at the highest secure level.">
        <StoryGrid columns={2}>
          <StoryFieldCell>
            <CheckboxGroup
              hint="Select all security features you want to enable"
              label="With hint"
            >
              <Checkbox
                label="Require passkey for admin actions"
                value="passkey"
              />
              <Checkbox label="Enable magic link fallback" value="magiclink" />
            </CheckboxGroup>
          </StoryFieldCell>

          <StoryFieldCell>
            <CheckboxGroup
              hint="Select all security features you want to enable"
              HintLinkComponent={
                <Link href="#link">Learn more about security options</Link>
              }
              label="With hint link"
            >
              <Checkbox
                label="Require passkey for admin actions"
                value="passkey"
              />
              <Checkbox label="Enable magic link fallback" value="magiclink" />
            </CheckboxGroup>
          </StoryFieldCell>

          <StoryFieldCell>
            <CheckboxGroup isDisabled label="Disabled" secureLevel="most">
              <Checkbox
                label="Require passkey for admin actions"
                value="passkey"
              />
              <Checkbox label="Enable magic link fallback" value="magiclink" />
            </CheckboxGroup>
          </StoryFieldCell>

          <StoryFieldCell>
            <CheckboxGroup isReadOnly label="Read-only" secureLevel="most">
              <Checkbox
                label="Require passkey for admin actions"
                value="passkey"
              />
              <Checkbox label="Enable magic link fallback" value="magiclink" />
            </CheckboxGroup>
          </StoryFieldCell>

          <StoryFieldCell>
            <CheckboxGroup
              errorMessage="Please select at least one security option"
              label="With error"
            >
              <Checkbox
                label="Require passkey for admin actions"
                value="passkey"
              />
              <Checkbox label="Enable magic link fallback" value="magiclink" />
            </CheckboxGroup>
          </StoryFieldCell>
        </StoryGrid>
      </StorySection>
    );
  },
};
