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
      from: "odyssey-blueprint/hint-link@1",
      instanceId: "playground.hintLink",
      inputs: {
        href: "https://www.okta.com",
        text: "Read the password requirements",
      },
    },
  },
};

export default storybookMeta;

type Story = StoryObj<OdysseyBlueprintRendererProps>;

export const Playground: Story = {};

export const AllVariants: Story = {
  parameters: staticBoardParameters,
  render: function C() {
    return (
      <StorySection title="Same-tab and new-tab links. A new-tab link carries Odyssey's external indicator and its screen-reader announcement.">
        <StoryGrid columns={2}>
          <StoryCell label="same tab">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/hint-link@1",
                instanceId: "variants.hintLink.sameTab",
                inputs: {
                  href: "https://www.okta.com",
                  text: "Read the password requirements",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="new tab">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/hint-link@1",
                instanceId: "variants.hintLink.newTab",
                inputs: {
                  href: "https://www.okta.com",
                  rel: "noreferrer",
                  target: "_blank",
                  text: "Read the password requirements",
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
      <StorySection title="How the link reads beside the field it belongs to, and with a destination resolved from a sibling entry.">
        <StoryGrid columns={1}>
          <StoryCell label="beside the field it explains">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/form@1",
                instanceId: "states.hintLink.beside",
                inputs: {
                  content: [
                    {
                      from: "odyssey-blueprint/password-field@1",
                      instanceId: "states.hintLink.beside.password",
                      inputs: {
                        hint: "At least 12 characters, with a number",
                        label: "New password",
                      },
                    },
                  ],
                  formActions: [
                    {
                      from: "odyssey-blueprint/hint-link@1",
                      instanceId: "states.hintLink.beside.help",
                      inputs: {
                        href: "https://www.okta.com",
                        text: "Read the password requirements",
                      },
                    },
                  ],
                  name: "states-hint-link-beside",
                  title: "Change your password",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="destination bound to a sibling field's value">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/form@1",
                instanceId: "states.hintLink.bound",
                inputs: {
                  content: [
                    {
                      from: "odyssey-blueprint/url-field@1",
                      instanceId: "states.hintLink.bound.url",
                      inputs: {
                        defaultValue: "https://www.okta.com",
                        hint: "Edit this to change where the link below points",
                        label: "Policy URL",
                      },
                    },
                    {
                      from: "odyssey-blueprint/hint-link@1",
                      instanceId: "states.hintLink.bound.help",
                      inputs: {
                        href: {
                          instance: {
                            id: "states.hintLink.bound.url",
                            name: "value",
                            port: "outputs",
                          },
                        },
                        text: "Open the policy",
                      },
                    },
                  ],
                  name: "states-hint-link-bound",
                },
              }}
            />
          </StoryCell>
        </StoryGrid>
      </StorySection>
    );
  },
};
