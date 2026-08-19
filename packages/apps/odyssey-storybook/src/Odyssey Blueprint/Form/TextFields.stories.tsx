/*!
 * Copyright (c) 2026-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  OdysseyBlueprintRenderer,
  type OdysseyBlueprintRendererProps,
} from "@okta/odyssey-blueprint";

import {
  staticBoardParameters,
  StoryCell,
  StoryGrid,
  StorySection,
} from "../../tools/boardStoryHelpers.js";
import { OdysseyBlueprintStorybookThemeDecorator } from "../../tools/OdysseyBlueprintStorybookThemeDecorator.js";

const storybookMeta: Meta<OdysseyBlueprintRendererProps> = {
  component: OdysseyBlueprintRenderer,
  decorators: [OdysseyBlueprintStorybookThemeDecorator],
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs", "alpha"],
  args: {
    blueprint: {
      from: "odyssey-blueprint/text-field@1",
      instanceId: "playground.text",
      inputs: {
        hint: "As it appears on your ID",
        label: "Full name",
      },
    },
  },
};

export default storybookMeta;

type Story = StoryObj<OdysseyBlueprintRendererProps>;

export const Playground: Story = {};

// One renderer per cell rather than one blueprint holding every field:
// `OdysseyBlueprintRenderer` takes a single root entry, and there is no container
// block yet to nest siblings under. Each entry needs its own `instanceId` because
// instance registration is keyed by it.
export const AllVariants: Story = {
  parameters: staticBoardParameters,
  render: function C() {
    return (
      <StorySection title="Every text-family block, seeded with a representative value.">
        <StoryGrid columns={2}>
          <StoryCell label="text-field@1">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/text-field@1",
                instanceId: "variants.text",
                inputs: { defaultValue: "Jane", label: "Full name" },
              }}
            />
          </StoryCell>

          <StoryCell label="email-field@1">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/email-field@1",
                instanceId: "variants.email",
                inputs: {
                  defaultValue: "jane@example.com",
                  label: "Email address",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="password-field@1">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/password-field@1",
                instanceId: "variants.password",
                inputs: { defaultValue: "hunter2", label: "Password" },
              }}
            />
          </StoryCell>

          <StoryCell label="search-field@1">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/search-field@1",
                instanceId: "variants.search",
                inputs: { label: "Search apps", placeholder: "Search" },
              }}
            />
          </StoryCell>

          <StoryCell label="tel-field@1">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/tel-field@1",
                instanceId: "variants.tel",
                inputs: { defaultValue: "555-0100", label: "Phone number" },
              }}
            />
          </StoryCell>

          <StoryCell label="url-field@1">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/url-field@1",
                instanceId: "variants.url",
                inputs: { defaultValue: "https://okta.com", label: "Website" },
              }}
            />
          </StoryCell>

          <StoryCell label="number-field@1">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/number-field@1",
                instanceId: "variants.number",
                inputs: { defaultValue: 5, label: "Seats" },
              }}
            />
          </StoryCell>
        </StoryGrid>
      </StorySection>
    );
  },
};

export const AllStates: Story = {
  parameters: staticBoardParameters,
  render: function C() {
    return (
      <StorySection title="Every prop-driven state, across the blocks that support it.">
        <StoryGrid columns={3}>
          <StoryCell label="text, optional">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/text-field@1",
                instanceId: "states.text.optional",
                inputs: { isOptional: true, label: "Full name" },
              }}
            />
          </StoryCell>

          <StoryCell label="text, hint">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/text-field@1",
                instanceId: "states.text.hint",
                inputs: {
                  hint: "As it appears on your ID",
                  label: "Full name",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="text, disabled">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/text-field@1",
                instanceId: "states.text.disabled",
                inputs: {
                  defaultValue: "Jane",
                  isDisabled: true,
                  label: "Full name",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="text, read-only">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/text-field@1",
                instanceId: "states.text.readOnly",
                inputs: {
                  defaultValue: "Jane",
                  isReadOnly: true,
                  label: "Full name",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="text, multiline">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/text-field@1",
                instanceId: "states.text.multiline",
                inputs: { isMultiline: true, label: "Notes" },
              }}
            />
          </StoryCell>

          <StoryCell label="text, adornments">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/text-field@1",
                instanceId: "states.text.adornments",
                inputs: {
                  endAdornment: "%",
                  label: "Rate",
                  startAdornment: "+",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="text, errors list">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/text-field@1",
                instanceId: "states.text.errorsList",
                inputs: {
                  errorMessage: "Fix the following",
                  errorMessageList: ["Too short", "Must not contain digits"],
                  label: "Full name",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="email, error">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/email-field@1",
                instanceId: "states.email.error",
                inputs: {
                  defaultValue: "not-an-email",
                  errorMessage: "Enter a valid email address",
                  label: "Email address",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="email, disabled">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/email-field@1",
                instanceId: "states.email.disabled",
                inputs: {
                  defaultValue: "jane@example.com",
                  isDisabled: true,
                  label: "Email address",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="email, read-only">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/email-field@1",
                instanceId: "states.email.readOnly",
                inputs: {
                  defaultValue: "jane@example.com",
                  isReadOnly: true,
                  label: "Email address",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="password, error">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/password-field@1",
                instanceId: "states.password.error",
                inputs: {
                  defaultValue: "abc",
                  errorMessage: "Password is too short",
                  label: "Password",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="password, revealed">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/password-field@1",
                instanceId: "states.password.revealed",
                inputs: {
                  defaultValue: "hunter2",
                  hasShowPassword: true,
                  label: "Password",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="search, filled variant">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/search-field@1",
                instanceId: "states.search.filled",
                inputs: {
                  defaultValue: "Okta",
                  label: "Search apps",
                  variant: "filled",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="tel, error">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/tel-field@1",
                instanceId: "states.tel.error",
                inputs: {
                  defaultValue: "abc",
                  errorMessage: "Enter a valid phone number",
                  label: "Phone number",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="url, error">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/url-field@1",
                instanceId: "states.url.error",
                inputs: {
                  defaultValue: "not-a-url",
                  errorMessage: "Enter a valid URL",
                  label: "Website",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="url, disabled">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/url-field@1",
                instanceId: "states.url.disabled",
                inputs: {
                  defaultValue: "https://okta.com",
                  isDisabled: true,
                  label: "Website",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="number, error">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/number-field@1",
                instanceId: "states.number.error",
                inputs: {
                  defaultValue: 99,
                  errorMessage: "Choose 10 or fewer",
                  label: "Seats",
                  max: 10,
                },
              }}
            />
          </StoryCell>

          <StoryCell label="number, disabled">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/number-field@1",
                instanceId: "states.number.disabled",
                inputs: { defaultValue: 5, isDisabled: true, label: "Seats" },
              }}
            />
          </StoryCell>

          <StoryCell label="number, read-only">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/number-field@1",
                instanceId: "states.number.readOnly",
                inputs: { defaultValue: 5, isReadOnly: true, label: "Seats" },
              }}
            />
          </StoryCell>
        </StoryGrid>
      </StorySection>
    );
  },
};
