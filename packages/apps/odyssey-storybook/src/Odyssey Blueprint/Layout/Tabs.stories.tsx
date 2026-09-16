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
      from: "odyssey-blueprint/tabs@1",
      instanceId: "playground.tabs",
      inputs: {
        ariaLabel: "Directory sections",
        tabs: [
          {
            content: {
              from: "odyssey-blueprint/text-field@1",
              instanceId: "playground.tabs.users.field",
              inputs: {
                hint: "Search the whole directory",
                label: "Find a user",
              },
            },
            label: "Users",
            value: "users",
          },
          {
            content: {
              from: "odyssey-blueprint/text-field@1",
              instanceId: "playground.tabs.groups.field",
              inputs: { label: "Find a group" },
            },
            label: "Groups",
            value: "groups",
          },
        ],
      },
    },
  },
};

export default storybookMeta;

type Story = StoryObj<OdysseyBlueprintRendererProps>;

export const Playground: Story = {};

// One renderer per cell rather than one blueprint holding every board:
// `OdysseyBlueprintRenderer` takes a single root entry, and each entry needs its
// own `instanceId` because instance registration is keyed by it.
export const AllVariants: Story = {
  parameters: staticBoardParameters,
  render: function C() {
    return (
      <StorySection title="Every shape of tab list, each panel holding a nested blueprint entry.">
        <StoryGrid columns={1}>
          <StoryCell label="two tabs">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/tabs@1",
                instanceId: "variants.tabs.two",
                inputs: {
                  ariaLabel: "Two sections",
                  tabs: [
                    {
                      content: {
                        from: "odyssey-blueprint/text-field@1",
                        instanceId: "variants.tabs.two.general.field",
                        inputs: { label: "Display name" },
                      },
                      label: "General",
                      value: "general",
                    },
                    {
                      content: {
                        from: "odyssey-blueprint/text-field@1",
                        instanceId: "variants.tabs.two.advanced.field",
                        inputs: { label: "Custom attribute" },
                      },
                      label: "Advanced",
                      value: "advanced",
                    },
                  ],
                },
              }}
            />
          </StoryCell>

          <StoryCell label="many tabs, scrollable">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/tabs@1",
                instanceId: "variants.tabs.many",
                inputs: {
                  ariaLabel: "Every directory section",
                  tabs: [
                    "Users",
                    "Groups",
                    "Applications",
                    "Devices",
                    "Reports",
                    "Security",
                    "Policies",
                    "Audit log",
                  ].map((sectionLabel) => {
                    const sectionValue = sectionLabel
                      .toLowerCase()
                      .replaceAll(" ", "-");
                    return {
                      content: {
                        from: "odyssey-blueprint/text-field@1",
                        instanceId: `variants.tabs.many.${sectionValue}.field`,
                        inputs: { label: `Search ${sectionLabel}` },
                      },
                      label: sectionLabel,
                      value: sectionValue,
                    };
                  }),
                },
              }}
            />
          </StoryCell>

          <StoryCell label="notification counts">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/tabs@1",
                instanceId: "variants.tabs.counts",
                inputs: {
                  ariaLabel: "Task sections",
                  tabs: [
                    {
                      content: {
                        from: "odyssey-blueprint/text-field@1",
                        instanceId: "variants.tabs.counts.open.field",
                        inputs: { label: "Filter open tasks" },
                      },
                      label: "Open",
                      notificationCount: 7,
                      value: "open",
                    },
                    {
                      content: {
                        from: "odyssey-blueprint/text-field@1",
                        instanceId: "variants.tabs.counts.overflow.field",
                        inputs: { label: "Filter archived tasks" },
                      },
                      label: "Archived",
                      notificationCount: 240,
                      notificationCountMax: 100,
                      value: "archived",
                    },
                  ],
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
      <StorySection title="Every prop-driven state of the tab list and its items.">
        <StoryGrid columns={1}>
          <StoryCell label="selection seeded past the first tab">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/tabs@1",
                instanceId: "states.tabs.seeded",
                inputs: {
                  ariaLabel: "Two sections",
                  defaultValue: "advanced",
                  tabs: [
                    {
                      content: {
                        from: "odyssey-blueprint/text-field@1",
                        instanceId: "states.tabs.seeded.general.field",
                        inputs: { label: "Display name" },
                      },
                      label: "General",
                      value: "general",
                    },
                    {
                      content: {
                        from: "odyssey-blueprint/text-field@1",
                        instanceId: "states.tabs.seeded.advanced.field",
                        inputs: { label: "Custom attribute" },
                      },
                      label: "Advanced",
                      value: "advanced",
                    },
                  ],
                },
              }}
            />
          </StoryCell>

          <StoryCell label="disabled tab">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/tabs@1",
                instanceId: "states.tabs.disabled",
                inputs: {
                  ariaLabel: "Two sections",
                  tabs: [
                    {
                      content: {
                        from: "odyssey-blueprint/text-field@1",
                        instanceId: "states.tabs.disabled.general.field",
                        inputs: { label: "Display name" },
                      },
                      label: "General",
                      value: "general",
                    },
                    {
                      content: {
                        from: "odyssey-blueprint/text-field@1",
                        instanceId: "states.tabs.disabled.locked.field",
                        inputs: { label: "Unreachable" },
                      },
                      isDisabled: true,
                      label: "Requires an upgrade",
                      value: "locked",
                    },
                  ],
                },
              }}
            />
          </StoryCell>

          <StoryCell label="panel holding a whole form">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/tabs@1",
                instanceId: "states.tabs.nestedForm",
                inputs: {
                  ariaLabel: "Profile sections",
                  tabs: [
                    {
                      content: {
                        from: "odyssey-blueprint/form@1",
                        instanceId: "states.tabs.nestedForm.profile",
                        inputs: {
                          content: [
                            {
                              from: "odyssey-blueprint/text-field@1",
                              instanceId: "states.tabs.nestedForm.first",
                              inputs: { label: "First name" },
                            },
                            {
                              from: "odyssey-blueprint/email-field@1",
                              instanceId: "states.tabs.nestedForm.email",
                              inputs: { label: "Email address" },
                            },
                          ],
                          name: "profile",
                          title: "Profile",
                        },
                      },
                      label: "Profile",
                      value: "profile",
                    },
                    {
                      content: {
                        from: "odyssey-blueprint/text-field@1",
                        instanceId: "states.tabs.nestedForm.notes.field",
                        inputs: { isMultiline: true, label: "Notes" },
                      },
                      label: "Notes",
                      value: "notes",
                    },
                  ],
                },
              }}
            />
          </StoryCell>
        </StoryGrid>
      </StorySection>
    );
  },
};
