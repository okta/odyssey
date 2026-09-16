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
      from: "odyssey-blueprint/tooltip@1",
      instanceId: "playground.tooltip",
      inputs: {
        ariaType: "description",
        content: {
          from: "odyssey-blueprint/link@1",
          instanceId: "playground.tooltip.link",
          inputs: {
            href: "https://okta.com",
            text: "Group rules",
          },
        },
        text: "Rules run once every 24 hours",
      },
    },
  },
};

export default storybookMeta;

type Story = StoryObj<OdysseyBlueprintRendererProps>;

export const Playground: Story = {};

// The tooltip bubble appears on hover or focus, and neither Odyssey's `Tooltip`
// nor `tooltip@1` exposes an open input, so these boards capture the triggers
// rather than the open bubbles. One renderer per cell, since
// `OdysseyBlueprintRenderer` takes a single root entry and each entry needs its
// own `instanceId`.
export const AllVariants: Story = {
  parameters: staticBoardParameters,
  render: function C() {
    return (
      <StorySection title="Both aria types, several nested trigger blocks, and the icon trigger.">
        <StoryGrid columns={2}>
          <StoryCell label="tooltip@1, ariaType description, link trigger">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/tooltip@1",
                instanceId: "variants.tooltip.description",
                inputs: {
                  ariaType: "description",
                  content: {
                    from: "odyssey-blueprint/link@1",
                    instanceId: "variants.tooltip.description.link",
                    inputs: {
                      href: "https://okta.com",
                      text: "Group rules",
                    },
                  },
                  text: "Rules run once every 24 hours",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="tooltip@1, ariaType label, link trigger">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/tooltip@1",
                instanceId: "variants.tooltip.label",
                inputs: {
                  ariaType: "label",
                  content: {
                    from: "odyssey-blueprint/link@1",
                    instanceId: "variants.tooltip.label.link",
                    inputs: {
                      href: "https://okta.com",
                      text: "Policies",
                    },
                  },
                  text: "Sign-on policies",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="tooltip@1, tag trigger">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/tooltip@1",
                instanceId: "variants.tooltip.tag",
                inputs: {
                  ariaType: "description",
                  content: {
                    from: "odyssey-blueprint/tag@1",
                    instanceId: "variants.tooltip.tag.tag",
                    inputs: { colorVariant: "info", label: "Engineering" },
                  },
                  text: "128 members inherit app access from this group",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="tooltip@1, paragraph trigger">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/tooltip@1",
                instanceId: "variants.tooltip.paragraph",
                inputs: {
                  ariaType: "description",
                  content: {
                    from: "odyssey-blueprint/paragraph@1",
                    instanceId: "variants.tooltip.paragraph.paragraph",
                    inputs: { text: "Last sign-on 4 minutes ago" },
                  },
                  text: "Recorded in the org time zone",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="icon-with-tooltip@1">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/icon-with-tooltip@1",
                instanceId: "variants.iconWithTooltip",
                inputs: {
                  tooltipText:
                    "Users are asked for this factor on every sign-on attempt",
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
      <StorySection title="Every placement, for both tooltip blocks, plus a long description.">
        <StoryGrid columns={4}>
          <StoryCell label="tooltip, top">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/tooltip@1",
                instanceId: "states.tooltip.top",
                inputs: {
                  ariaType: "description",
                  content: {
                    from: "odyssey-blueprint/link@1",
                    instanceId: "states.tooltip.top.link",
                    inputs: { href: "https://okta.com", text: "Applications" },
                  },
                  placement: "top",
                  text: "Apps assigned to this group",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="tooltip, top-start">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/tooltip@1",
                instanceId: "states.tooltip.topStart",
                inputs: {
                  ariaType: "description",
                  content: {
                    from: "odyssey-blueprint/link@1",
                    instanceId: "states.tooltip.topStart.link",
                    inputs: { href: "https://okta.com", text: "Applications" },
                  },
                  placement: "top-start",
                  text: "Apps assigned to this group",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="tooltip, top-end">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/tooltip@1",
                instanceId: "states.tooltip.topEnd",
                inputs: {
                  ariaType: "description",
                  content: {
                    from: "odyssey-blueprint/link@1",
                    instanceId: "states.tooltip.topEnd.link",
                    inputs: { href: "https://okta.com", text: "Applications" },
                  },
                  placement: "top-end",
                  text: "Apps assigned to this group",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="tooltip, bottom">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/tooltip@1",
                instanceId: "states.tooltip.bottom",
                inputs: {
                  ariaType: "description",
                  content: {
                    from: "odyssey-blueprint/link@1",
                    instanceId: "states.tooltip.bottom.link",
                    inputs: { href: "https://okta.com", text: "Groups" },
                  },
                  placement: "bottom",
                  text: "Groups assigned to this app",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="tooltip, bottom-start">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/tooltip@1",
                instanceId: "states.tooltip.bottomStart",
                inputs: {
                  ariaType: "description",
                  content: {
                    from: "odyssey-blueprint/link@1",
                    instanceId: "states.tooltip.bottomStart.link",
                    inputs: { href: "https://okta.com", text: "Groups" },
                  },
                  placement: "bottom-start",
                  text: "Groups assigned to this app",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="tooltip, bottom-end">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/tooltip@1",
                instanceId: "states.tooltip.bottomEnd",
                inputs: {
                  ariaType: "description",
                  content: {
                    from: "odyssey-blueprint/link@1",
                    instanceId: "states.tooltip.bottomEnd.link",
                    inputs: { href: "https://okta.com", text: "Groups" },
                  },
                  placement: "bottom-end",
                  text: "Groups assigned to this app",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="tooltip, left">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/tooltip@1",
                instanceId: "states.tooltip.left",
                inputs: {
                  ariaType: "description",
                  content: {
                    from: "odyssey-blueprint/link@1",
                    instanceId: "states.tooltip.left.link",
                    inputs: {
                      href: "https://okta.com",
                      text: "Authenticators",
                    },
                  },
                  placement: "left",
                  text: "Factors a user can enroll",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="tooltip, left-start">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/tooltip@1",
                instanceId: "states.tooltip.leftStart",
                inputs: {
                  ariaType: "description",
                  content: {
                    from: "odyssey-blueprint/link@1",
                    instanceId: "states.tooltip.leftStart.link",
                    inputs: {
                      href: "https://okta.com",
                      text: "Authenticators",
                    },
                  },
                  placement: "left-start",
                  text: "Factors a user can enroll",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="tooltip, left-end">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/tooltip@1",
                instanceId: "states.tooltip.leftEnd",
                inputs: {
                  ariaType: "description",
                  content: {
                    from: "odyssey-blueprint/link@1",
                    instanceId: "states.tooltip.leftEnd.link",
                    inputs: {
                      href: "https://okta.com",
                      text: "Authenticators",
                    },
                  },
                  placement: "left-end",
                  text: "Factors a user can enroll",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="tooltip, right">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/tooltip@1",
                instanceId: "states.tooltip.right",
                inputs: {
                  ariaType: "description",
                  content: {
                    from: "odyssey-blueprint/link@1",
                    instanceId: "states.tooltip.right.link",
                    inputs: { href: "https://okta.com", text: "Sign-on" },
                  },
                  placement: "right",
                  text: "Rules evaluated at sign-on",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="tooltip, right-start">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/tooltip@1",
                instanceId: "states.tooltip.rightStart",
                inputs: {
                  ariaType: "description",
                  content: {
                    from: "odyssey-blueprint/link@1",
                    instanceId: "states.tooltip.rightStart.link",
                    inputs: { href: "https://okta.com", text: "Sign-on" },
                  },
                  placement: "right-start",
                  text: "Rules evaluated at sign-on",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="tooltip, right-end">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/tooltip@1",
                instanceId: "states.tooltip.rightEnd",
                inputs: {
                  ariaType: "description",
                  content: {
                    from: "odyssey-blueprint/link@1",
                    instanceId: "states.tooltip.rightEnd.link",
                    inputs: { href: "https://okta.com", text: "Sign-on" },
                  },
                  placement: "right-end",
                  text: "Rules evaluated at sign-on",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="icon-with-tooltip, top">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/icon-with-tooltip@1",
                instanceId: "states.iconWithTooltip.top",
                inputs: {
                  placement: "top",
                  tooltipText: "Asked for on every sign-on attempt",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="icon-with-tooltip, bottom">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/icon-with-tooltip@1",
                instanceId: "states.iconWithTooltip.bottom",
                inputs: {
                  placement: "bottom",
                  tooltipText: "Asked for on every sign-on attempt",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="icon-with-tooltip, left">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/icon-with-tooltip@1",
                instanceId: "states.iconWithTooltip.left",
                inputs: {
                  placement: "left",
                  tooltipText: "Asked for on every sign-on attempt",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="icon-with-tooltip, right">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/icon-with-tooltip@1",
                instanceId: "states.iconWithTooltip.right",
                inputs: {
                  placement: "right",
                  tooltipText: "Asked for on every sign-on attempt",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="icon-with-tooltip, long description">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/icon-with-tooltip@1",
                instanceId: "states.iconWithTooltip.long",
                inputs: {
                  tooltipText:
                    "Members of this group keep app access until the next provisioning sync completes, which can take up to 24 hours.",
                },
              }}
            />
          </StoryCell>
        </StoryGrid>
      </StorySection>
    );
  },
};
