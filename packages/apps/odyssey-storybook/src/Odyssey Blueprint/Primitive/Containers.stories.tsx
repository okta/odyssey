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
      from: "odyssey-blueprint/card@1",
      instanceId: "playground.card",
      inputs: {
        content: {
          from: "odyssey-blueprint/paragraph@1",
          instanceId: "playground.card.paragraph",
          inputs: {
            text: "Assigned to 4 groups and 128 users.",
          },
        },
        description: "Single sign-on for the sales org",
        title: "Salesforce",
      },
    },
  },
};

export default storybookMeta;

type Story = StoryObj<OdysseyBlueprintRendererProps>;

export const Playground: Story = {};

// One renderer per cell rather than one blueprint holding every container:
// `OdysseyBlueprintRenderer` takes a single root entry, and each entry needs its
// own `instanceId` because instance registration is keyed by it. The nested
// bodies below go through the `content` and call-to-action inputs, which is how a
// block whose Odyssey component takes `children` receives them.
export const AllVariants: Story = {
  parameters: staticBoardParameters,
  render: function C() {
    return (
      <StorySection title="Every accordion and card variant, plus an empty state with both calls to action.">
        {/* Accordions render expanded so the nested body is part of the captured
            state rather than something only a click reveals. */}
        <StoryGrid columns={2}>
          <StoryCell label="accordion@1, default">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/accordion@1",
                instanceId: "variants.accordion.default",
                inputs: {
                  content: {
                    from: "odyssey-blueprint/paragraph@1",
                    instanceId: "variants.accordion.default.paragraph",
                    inputs: {
                      text: "Password and Okta Verify are required for every sign-on attempt.",
                    },
                  },
                  isDefaultExpanded: true,
                  label: "Authenticator requirements",
                  variant: "default",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="accordion@1, borderless">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/accordion@1",
                instanceId: "variants.accordion.borderless",
                inputs: {
                  content: {
                    from: "odyssey-blueprint/paragraph@1",
                    instanceId: "variants.accordion.borderless.paragraph",
                    inputs: {
                      text: "Sessions end after 12 hours of inactivity.",
                    },
                  },
                  isDefaultExpanded: true,
                  label: "Session lifetime",
                  variant: "borderless",
                },
              }}
            />
          </StoryCell>
        </StoryGrid>

        <StoryGrid columns={3}>
          <StoryCell label="card@1, tile">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/card@1",
                instanceId: "variants.card.tile",
                inputs: {
                  content: {
                    from: "odyssey-blueprint/paragraph@1",
                    instanceId: "variants.card.tile.paragraph",
                    inputs: { text: "Assigned to 4 groups." },
                  },
                  description: "Single sign-on for the sales org",
                  title: "Salesforce",
                  variant: "tile",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="card@1, stack">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/card@1",
                instanceId: "variants.card.stack",
                inputs: {
                  content: {
                    from: "odyssey-blueprint/paragraph@1",
                    instanceId: "variants.card.stack.paragraph",
                    inputs: { text: "Assigned to 12 groups." },
                  },
                  description: "Collaboration for every department",
                  title: "Slack",
                  variant: "stack",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="card@1, compact">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/card@1",
                instanceId: "variants.card.compact",
                inputs: {
                  content: {
                    from: "odyssey-blueprint/paragraph@1",
                    instanceId: "variants.card.compact.paragraph",
                    inputs: { text: "Assigned to 2 groups." },
                  },
                  description: "Source of record for HR profiles",
                  title: "Workday",
                  variant: "compact",
                },
              }}
            />
          </StoryCell>
        </StoryGrid>

        <StoryGrid columns={1}>
          <StoryCell label="empty-state@1, nested link@1 calls to action">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/empty-state@1",
                instanceId: "variants.emptyState",
                inputs: {
                  description:
                    "Assign an app to this group to give every member access to it.",
                  heading: "No apps assigned",
                  primaryCallToAction: {
                    from: "odyssey-blueprint/link@1",
                    instanceId: "variants.emptyState.primary",
                    inputs: {
                      href: "https://okta.com",
                      text: "Assign an app",
                    },
                  },
                  secondaryCallToAction: {
                    from: "odyssey-blueprint/link@1",
                    instanceId: "variants.emptyState.secondary",
                    inputs: {
                      href: "https://okta.com",
                      text: "Browse the app catalog",
                      variant: "monochrome",
                    },
                  },
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
          <StoryCell label="accordion, expanded">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/accordion@1",
                instanceId: "states.accordion.expanded",
                inputs: {
                  content: {
                    from: "odyssey-blueprint/paragraph@1",
                    instanceId: "states.accordion.expanded.paragraph",
                    inputs: {
                      text: "Members of Engineering inherit access to 18 apps.",
                    },
                  },
                  isDefaultExpanded: true,
                  label: "Group assignments",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="accordion, collapsed">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/accordion@1",
                instanceId: "states.accordion.collapsed",
                inputs: {
                  content: {
                    from: "odyssey-blueprint/paragraph@1",
                    instanceId: "states.accordion.collapsed.paragraph",
                    inputs: {
                      text: "Members of Engineering inherit access to 18 apps.",
                    },
                  },
                  label: "Group assignments",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="accordion, disabled">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/accordion@1",
                instanceId: "states.accordion.disabled",
                inputs: {
                  content: {
                    from: "odyssey-blueprint/paragraph@1",
                    instanceId: "states.accordion.disabled.paragraph",
                    inputs: { text: "Read-only while the sync runs." },
                  },
                  isDisabled: true,
                  label: "Profile mappings",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="accordion, borderless disabled">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/accordion@1",
                instanceId: "states.accordion.borderlessDisabled",
                inputs: {
                  content: {
                    from: "odyssey-blueprint/paragraph@1",
                    instanceId: "states.accordion.borderlessDisabled.paragraph",
                    inputs: { text: "Read-only while the sync runs." },
                  },
                  isDisabled: true,
                  label: "Profile mappings",
                  variant: "borderless",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="card, loading">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/card@1",
                instanceId: "states.card.loading",
                inputs: {
                  description: "Single sign-on for the sales org",
                  isLoading: true,
                  title: "Salesforce",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="card, clickable">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/card@1",
                instanceId: "states.card.clickable",
                inputs: {
                  description: "Opens the app details page",
                  isClickable: true,
                  title: "Slack",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="card, overline">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/card@1",
                instanceId: "states.card.overline",
                inputs: {
                  description: "Source of record for HR profiles",
                  overline: "SAML 2.0",
                  title: "Workday",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="card, title only">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/card@1",
                instanceId: "states.card.titleOnly",
                inputs: { title: "Okta Verify" },
              }}
            />
          </StoryCell>

          <StoryCell label="empty-state, primary call to action only">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/empty-state@1",
                instanceId: "states.emptyState.primaryOnly",
                inputs: {
                  description:
                    "Add a rule to place users in this group automatically.",
                  heading: "No group rules",
                  primaryCallToAction: {
                    from: "odyssey-blueprint/link@1",
                    instanceId: "states.emptyState.primaryOnly.link",
                    inputs: { href: "https://okta.com", text: "Add a rule" },
                  },
                },
              }}
            />
          </StoryCell>

          <StoryCell label="empty-state, no calls to action">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/empty-state@1",
                instanceId: "states.emptyState.bare",
                inputs: {
                  description:
                    "No sign-on attempts were recorded in the last 24 hours.",
                  heading: "Nothing to report",
                },
              }}
            />
          </StoryCell>
        </StoryGrid>
      </StorySection>
    );
  },
};
