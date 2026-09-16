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
      from: "odyssey-blueprint/form@1",
      instanceId: "playground.form",
      inputs: {
        content: [
          {
            from: "odyssey-blueprint/text-field@1",
            instanceId: "playground.form.first",
            inputs: { label: "First name" },
          },
          {
            from: "odyssey-blueprint/email-field@1",
            instanceId: "playground.form.email",
            inputs: {
              hint: "We only use this to send sign-in alerts",
              label: "Email address",
            },
          },
        ],
        description: "Everything here is visible to your admin.",
        name: "playground-profile",
        title: "Your profile",
      },
    },
  },
};

export default storybookMeta;

type Story = StoryObj<OdysseyBlueprintRendererProps>;

export const Playground: Story = {};

// `form@1` is the container block: it is the only way a blueprint holds more than
// one entry, because the renderer takes a single root entry and rejects an array.
// Each board cell still needs its own renderer and its own `instanceId`s.
export const AllVariants: Story = {
  parameters: staticBoardParameters,
  render: function C() {
    return (
      <StorySection title="Every way a form can be composed from nested blueprint entries.">
        <StoryGrid columns={2}>
          <StoryCell label="fields only">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/form@1",
                instanceId: "variants.form.bare",
                inputs: {
                  content: [
                    {
                      from: "odyssey-blueprint/text-field@1",
                      instanceId: "variants.form.bare.first",
                      inputs: { label: "First name" },
                    },
                    {
                      from: "odyssey-blueprint/text-field@1",
                      instanceId: "variants.form.bare.last",
                      inputs: { label: "Last name" },
                    },
                  ],
                  name: "variants-bare",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="title and description">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/form@1",
                instanceId: "variants.form.titled",
                inputs: {
                  content: [
                    {
                      from: "odyssey-blueprint/text-field@1",
                      instanceId: "variants.form.titled.first",
                      inputs: { label: "First name" },
                    },
                  ],
                  description: "Everything here is visible to your admin.",
                  name: "variants-titled",
                  title: "Your profile",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="hint link in formActions">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/form@1",
                instanceId: "variants.form.actions",
                inputs: {
                  content: [
                    {
                      from: "odyssey-blueprint/password-field@1",
                      instanceId: "variants.form.actions.password",
                      inputs: { label: "New password" },
                    },
                  ],
                  formActions: [
                    {
                      from: "odyssey-blueprint/hint-link@1",
                      instanceId: "variants.form.actions.help",
                      inputs: {
                        href: "https://www.okta.com",
                        text: "Read the password requirements",
                      },
                    },
                  ],
                  name: "variants-actions",
                  title: "Change your password",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="mixed field types">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/form@1",
                instanceId: "variants.form.mixed",
                inputs: {
                  content: [
                    {
                      from: "odyssey-blueprint/text-field@1",
                      instanceId: "variants.form.mixed.name",
                      inputs: { label: "Full name" },
                    },
                    {
                      from: "odyssey-blueprint/tel-field@1",
                      instanceId: "variants.form.mixed.tel",
                      inputs: { label: "Phone number" },
                    },
                    {
                      from: "odyssey-blueprint/number-field@1",
                      instanceId: "variants.form.mixed.seats",
                      inputs: { defaultValue: 5, label: "Seats" },
                    },
                  ],
                  name: "variants-mixed",
                },
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
      <StorySection title="Every prop-driven state of the form container.">
        <StoryGrid columns={2}>
          <StoryCell label="full width">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/form@1",
                instanceId: "states.form.fullWidth",
                inputs: {
                  content: [
                    {
                      from: "odyssey-blueprint/text-field@1",
                      instanceId: "states.form.fullWidth.first",
                      inputs: { isFullWidth: true, label: "First name" },
                    },
                  ],
                  isFullWidth: true,
                  name: "states-full-width",
                  title: "Full width",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="fields in error">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/form@1",
                instanceId: "states.form.errors",
                inputs: {
                  content: [
                    {
                      from: "odyssey-blueprint/email-field@1",
                      instanceId: "states.form.errors.email",
                      inputs: {
                        defaultValue: "not-an-email",
                        errorMessage: "Enter a valid email address",
                        label: "Email address",
                      },
                    },
                    {
                      from: "odyssey-blueprint/password-field@1",
                      instanceId: "states.form.errors.password",
                      inputs: {
                        defaultValue: "abc",
                        errorMessage: "Fix the following",
                        errorMessageList: [
                          "Too short",
                          "Must contain a number",
                        ],
                        label: "New password",
                      },
                    },
                  ],
                  name: "states-errors",
                  title: "Fix these fields",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="disabled fields">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/form@1",
                instanceId: "states.form.disabled",
                inputs: {
                  content: [
                    {
                      from: "odyssey-blueprint/text-field@1",
                      instanceId: "states.form.disabled.first",
                      inputs: {
                        defaultValue: "Jane",
                        isDisabled: true,
                        label: "First name",
                      },
                    },
                  ],
                  name: "states-disabled",
                  title: "Managed by your admin",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="one field driving another">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/form@1",
                instanceId: "states.form.subscribed",
                inputs: {
                  content: [
                    {
                      from: "odyssey-blueprint/text-field@1",
                      instanceId: "states.form.subscribed.legal",
                      inputs: {
                        hint: "Type here to fill the display name below",
                        label: "Legal name",
                      },
                    },
                    {
                      from: "odyssey-blueprint/text-field@1",
                      instanceId: "states.form.subscribed.display",
                      inputs: { label: "Display name" },
                      subscriptions: {
                        setValue: {
                          instance: {
                            id: "states.form.subscribed.legal",
                            name: "change",
                            port: "events",
                          },
                        },
                      },
                    },
                  ],
                  name: "states-subscribed",
                  title: "Sibling fields wired together",
                },
              }}
            />
          </StoryCell>
        </StoryGrid>
      </StorySection>
    );
  },
};
