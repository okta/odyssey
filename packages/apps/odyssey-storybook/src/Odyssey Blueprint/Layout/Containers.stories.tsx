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
      from: "odyssey-blueprint/stack@1",
      instanceId: "playground.stack",
      inputs: {
        children: [
          {
            from: "odyssey-blueprint/status@1",
            instanceId: "playground.stack.status",
            inputs: { label: "Active", severity: "success" },
          },
          {
            from: "odyssey-blueprint/paragraph@1",
            instanceId: "playground.stack.paragraph",
            inputs: { text: "Salesforce is assigned to 4 groups." },
          },
          {
            from: "odyssey-blueprint/link@1",
            instanceId: "playground.stack.link",
            inputs: { href: "https://okta.com", text: "Manage assignments" },
          },
        ],
        direction: "column",
        spacing: 3,
      },
    },
  },
};

export default storybookMeta;

type Story = StoryObj<OdysseyBlueprintRendererProps>;

export const Playground: Story = {};

// The layout blocks are the one place a single blueprint holds several siblings:
// their `children` input takes nested entries, so each cell is still one renderer
// with one root entry, and every nested entry carries its own `instanceId`.
export const AllVariants: Story = {
  parameters: staticBoardParameters,
  render: function C() {
    return (
      <StorySection title="Every stack direction, plus the surface and box containers holding several children.">
        <StoryGrid columns={2}>
          <StoryCell label="stack@1, row">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/stack@1",
                instanceId: "variants.stack.row",
                inputs: {
                  children: [
                    {
                      from: "odyssey-blueprint/tag@1",
                      instanceId: "variants.stack.row.engineering",
                      inputs: { label: "Engineering" },
                    },
                    {
                      from: "odyssey-blueprint/tag@1",
                      instanceId: "variants.stack.row.sales",
                      inputs: { colorVariant: "info", label: "Sales" },
                    },
                    {
                      from: "odyssey-blueprint/tag@1",
                      instanceId: "variants.stack.row.support",
                      inputs: { colorVariant: "accentOne", label: "Support" },
                    },
                  ],
                  direction: "row",
                  spacing: 2,
                },
              }}
            />
          </StoryCell>

          <StoryCell label="stack@1, row-reverse">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/stack@1",
                instanceId: "variants.stack.rowReverse",
                inputs: {
                  children: [
                    {
                      from: "odyssey-blueprint/tag@1",
                      instanceId: "variants.stack.rowReverse.engineering",
                      inputs: { label: "Engineering" },
                    },
                    {
                      from: "odyssey-blueprint/tag@1",
                      instanceId: "variants.stack.rowReverse.sales",
                      inputs: { colorVariant: "info", label: "Sales" },
                    },
                    {
                      from: "odyssey-blueprint/tag@1",
                      instanceId: "variants.stack.rowReverse.support",
                      inputs: { colorVariant: "accentOne", label: "Support" },
                    },
                  ],
                  direction: "row-reverse",
                  spacing: 2,
                },
              }}
            />
          </StoryCell>

          <StoryCell label="stack@1, column">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/stack@1",
                instanceId: "variants.stack.column",
                inputs: {
                  children: [
                    {
                      from: "odyssey-blueprint/status@1",
                      instanceId: "variants.stack.column.active",
                      inputs: { label: "Active", severity: "success" },
                    },
                    {
                      from: "odyssey-blueprint/status@1",
                      instanceId: "variants.stack.column.pending",
                      inputs: { label: "Pending review", severity: "warning" },
                    },
                    {
                      from: "odyssey-blueprint/status@1",
                      instanceId: "variants.stack.column.suspended",
                      inputs: { label: "Suspended", severity: "error" },
                    },
                  ],
                  direction: "column",
                  spacing: 2,
                },
              }}
            />
          </StoryCell>

          <StoryCell label="stack@1, column-reverse">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/stack@1",
                instanceId: "variants.stack.columnReverse",
                inputs: {
                  children: [
                    {
                      from: "odyssey-blueprint/status@1",
                      instanceId: "variants.stack.columnReverse.active",
                      inputs: { label: "Active", severity: "success" },
                    },
                    {
                      from: "odyssey-blueprint/status@1",
                      instanceId: "variants.stack.columnReverse.pending",
                      inputs: { label: "Pending review", severity: "warning" },
                    },
                    {
                      from: "odyssey-blueprint/status@1",
                      instanceId: "variants.stack.columnReverse.suspended",
                      inputs: { label: "Suspended", severity: "error" },
                    },
                  ],
                  direction: "column-reverse",
                  spacing: 2,
                },
              }}
            />
          </StoryCell>

          <StoryCell label="surface@1, several children">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/surface@1",
                instanceId: "variants.surface",
                inputs: {
                  children: [
                    {
                      from: "odyssey-blueprint/heading@1",
                      instanceId: "variants.surface.heading",
                      inputs: {
                        component: "div",
                        level: 5,
                        text: "Salesforce",
                      },
                    },
                    {
                      from: "odyssey-blueprint/paragraph@1",
                      instanceId: "variants.surface.paragraph",
                      inputs: {
                        text: "Single sign-on for the sales org, assigned to 4 groups.",
                      },
                    },
                    {
                      from: "odyssey-blueprint/link@1",
                      instanceId: "variants.surface.link",
                      inputs: {
                        href: "https://okta.com",
                        text: "Manage assignments",
                      },
                    },
                  ],
                },
              }}
            />
          </StoryCell>

          <StoryCell label="box@1, several children">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/box@1",
                instanceId: "variants.box",
                inputs: {
                  children: [
                    {
                      from: "odyssey-blueprint/heading@1",
                      instanceId: "variants.box.heading",
                      inputs: {
                        component: "div",
                        level: 5,
                        text: "Group rules",
                      },
                    },
                    {
                      from: "odyssey-blueprint/paragraph@1",
                      instanceId: "variants.box.paragraph",
                      inputs: {
                        text: "Rules place users in groups automatically, once every 24 hours.",
                      },
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
      <StorySection title="Every prop-driven state, across the blocks that support it.">
        <StoryGrid columns={2}>
          <StoryCell label="stack, spacing 0">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/stack@1",
                instanceId: "states.stack.spacingZero",
                inputs: {
                  children: [
                    {
                      from: "odyssey-blueprint/tag@1",
                      instanceId: "states.stack.spacingZero.password",
                      inputs: { label: "Password" },
                    },
                    {
                      from: "odyssey-blueprint/tag@1",
                      instanceId: "states.stack.spacingZero.verify",
                      inputs: { label: "Okta Verify" },
                    },
                  ],
                  direction: "row",
                  spacing: 0,
                },
              }}
            />
          </StoryCell>

          <StoryCell label="stack, spacing 5">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/stack@1",
                instanceId: "states.stack.spacingFive",
                inputs: {
                  children: [
                    {
                      from: "odyssey-blueprint/tag@1",
                      instanceId: "states.stack.spacingFive.password",
                      inputs: { label: "Password" },
                    },
                    {
                      from: "odyssey-blueprint/tag@1",
                      instanceId: "states.stack.spacingFive.verify",
                      inputs: { label: "Okta Verify" },
                    },
                  ],
                  direction: "row",
                  spacing: 5,
                },
              }}
            />
          </StoryCell>

          <StoryCell label="stack, spacing 9">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/stack@1",
                instanceId: "states.stack.spacingNine",
                inputs: {
                  children: [
                    {
                      from: "odyssey-blueprint/tag@1",
                      instanceId: "states.stack.spacingNine.password",
                      inputs: { label: "Password" },
                    },
                    {
                      from: "odyssey-blueprint/tag@1",
                      instanceId: "states.stack.spacingNine.verify",
                      inputs: { label: "Okta Verify" },
                    },
                  ],
                  direction: "row",
                  spacing: 9,
                },
              }}
            />
          </StoryCell>

          <StoryCell label="stack, nested stack">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/stack@1",
                instanceId: "states.stack.nested",
                inputs: {
                  children: [
                    {
                      from: "odyssey-blueprint/paragraph@1",
                      instanceId: "states.stack.nested.paragraph",
                      inputs: { text: "Required authenticators" },
                    },
                    {
                      from: "odyssey-blueprint/stack@1",
                      instanceId: "states.stack.nested.inner",
                      inputs: {
                        children: [
                          {
                            from: "odyssey-blueprint/tag@1",
                            instanceId: "states.stack.nested.inner.password",
                            inputs: { label: "Password" },
                          },
                          {
                            from: "odyssey-blueprint/tag@1",
                            instanceId: "states.stack.nested.inner.verify",
                            inputs: { label: "Okta Verify" },
                          },
                        ],
                        direction: "row",
                        spacing: 2,
                      },
                    },
                  ],
                  direction: "column",
                  spacing: 2,
                },
              }}
            />
          </StoryCell>

          <StoryCell label="surface, holding a nested stack">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/surface@1",
                instanceId: "states.surface.nestedStack",
                inputs: {
                  children: [
                    {
                      from: "odyssey-blueprint/stack@1",
                      instanceId: "states.surface.nestedStack.stack",
                      inputs: {
                        children: [
                          {
                            from: "odyssey-blueprint/status@1",
                            instanceId:
                              "states.surface.nestedStack.stack.status",
                            inputs: { label: "Active", severity: "success" },
                          },
                          {
                            from: "odyssey-blueprint/paragraph@1",
                            instanceId:
                              "states.surface.nestedStack.stack.paragraph",
                            inputs: { text: "Provisioning is up to date." },
                          },
                        ],
                        direction: "row",
                        spacing: 3,
                      },
                    },
                  ],
                },
              }}
            />
          </StoryCell>

          <StoryCell label="box, as section with a role">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/box@1",
                instanceId: "states.box.section",
                inputs: {
                  children: [
                    {
                      from: "odyssey-blueprint/paragraph@1",
                      instanceId: "states.box.section.paragraph",
                      inputs: { text: "12 apps assigned to Engineering." },
                    },
                  ],
                  component: "section",
                  role: "region",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="box, as nav">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/box@1",
                instanceId: "states.box.nav",
                inputs: {
                  children: [
                    {
                      from: "odyssey-blueprint/link@1",
                      instanceId: "states.box.nav.applications",
                      inputs: {
                        href: "https://okta.com",
                        text: "Applications",
                      },
                    },
                    {
                      from: "odyssey-blueprint/link@1",
                      instanceId: "states.box.nav.groups",
                      inputs: { href: "https://okta.com", text: "Groups" },
                    },
                  ],
                  component: "nav",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="box, explicit id">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/box@1",
                instanceId: "states.box.explicitId",
                inputs: {
                  children: [
                    {
                      from: "odyssey-blueprint/paragraph@1",
                      instanceId: "states.box.explicitId.paragraph",
                      inputs: {
                        text: "Anchored so an external label can point at it.",
                      },
                    },
                  ],
                  component: "article",
                  id: "states-box-anchor",
                },
              }}
            />
          </StoryCell>
        </StoryGrid>
      </StorySection>
    );
  },
};
