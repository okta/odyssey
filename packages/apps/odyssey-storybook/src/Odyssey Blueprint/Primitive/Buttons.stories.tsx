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
  StoryRow,
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
      from: "odyssey-blueprint/button@1",
      instanceId: "playground.button",
      inputs: {
        label: "Save",
        variant: "primary",
      },
    },
  },
};

export default storybookMeta;

type Story = StoryObj<OdysseyBlueprintRendererProps>;

export const Playground: Story = {};

// One renderer per cell rather than one blueprint holding every button:
// `OdysseyBlueprintRenderer` takes a single root entry, and there is no container
// block yet to nest siblings under. Each entry needs its own `instanceId` because
// instance registration is keyed by it.
//
// `menu-item@1` has no cell of its own here. It renders only inside an open menu,
// Odyssey exposes no prop that opens one, and a bare menu item outside a menu is
// an `aria-required-parent` violation, so its variants are covered by the browser
// tests instead.
export const AllVariants: Story = {
  parameters: staticBoardParameters,
  render: function C() {
    return (
      <StorySection title="Every button variant, plus the menu-button forms.">
        <StoryGrid columns={3}>
          <StoryCell label="button@1, primary">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/button@1",
                instanceId: "variants.primary",
                inputs: { label: "Save", variant: "primary" },
              }}
            />
          </StoryCell>

          <StoryCell label="button@1, secondary">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/button@1",
                instanceId: "variants.secondary",
                inputs: { label: "Cancel", variant: "secondary" },
              }}
            />
          </StoryCell>

          <StoryCell label="button@1, danger">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/button@1",
                instanceId: "variants.danger",
                inputs: { label: "Delete", variant: "danger" },
              }}
            />
          </StoryCell>

          <StoryCell label="button@1, dangerSecondary">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/button@1",
                instanceId: "variants.dangerSecondary",
                inputs: { label: "Delete", variant: "dangerSecondary" },
              }}
            />
          </StoryCell>

          <StoryCell label="button@1, floating">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/button@1",
                instanceId: "variants.floating",
                inputs: { label: "Dismiss", variant: "floating" },
              }}
            />
          </StoryCell>

          <StoryCell label="button@1, floatingAction">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/button@1",
                instanceId: "variants.floatingAction",
                inputs: { label: "Add", variant: "floatingAction" },
              }}
            />
          </StoryCell>

          <StoryCell label="menu-button@1">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/menu-button@1",
                instanceId: "variants.menu",
                inputs: {
                  buttonLabel: "Actions",
                  menuItems: [
                    {
                      from: "odyssey-blueprint/menu-item@1",
                      instanceId: "variants.menu.edit",
                      inputs: { content: "Edit", value: "edit" },
                    },
                    {
                      from: "odyssey-blueprint/menu-item@1",
                      instanceId: "variants.menu.delete",
                      inputs: {
                        content: "Delete",
                        value: "delete",
                        variant: "destructive",
                      },
                    },
                  ],
                },
              }}
            />
          </StoryCell>

          <StoryCell label="menu-button@1, overflow">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/menu-button@1",
                instanceId: "variants.overflow",
                inputs: {
                  ariaLabel: "More actions",
                  isOverflow: true,
                  menuItems: [
                    {
                      from: "odyssey-blueprint/menu-item@1",
                      instanceId: "variants.overflow.edit",
                      inputs: { content: "Edit", value: "edit" },
                    },
                  ],
                },
              }}
            />
          </StoryCell>

          <StoryCell label="menu-button@1, popoverContent">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/menu-button@1",
                instanceId: "variants.popover",
                inputs: {
                  buttonLabel: "Filters",
                  popoverContent: [
                    {
                      from: "odyssey-blueprint/text-field@1",
                      instanceId: "variants.popover.query",
                      inputs: { isOptional: true, label: "Query" },
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

export const AllSizes: Story = {
  parameters: staticBoardParameters,
  render: function C() {
    return (
      <StorySection title="Every size, on the blocks that take one.">
        <StoryGrid columns={3}>
          <StoryCell label="button@1, small">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/button@1",
                instanceId: "sizes.button.small",
                inputs: { label: "Save", size: "small", variant: "primary" },
              }}
            />
          </StoryCell>

          <StoryCell label="button@1, medium">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/button@1",
                instanceId: "sizes.button.medium",
                inputs: { label: "Save", size: "medium", variant: "primary" },
              }}
            />
          </StoryCell>

          <StoryCell label="button@1, large">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/button@1",
                instanceId: "sizes.button.large",
                inputs: { label: "Save", size: "large", variant: "primary" },
              }}
            />
          </StoryCell>

          <StoryCell label="menu-button@1, small">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/menu-button@1",
                instanceId: "sizes.menu.small",
                inputs: {
                  buttonLabel: "Actions",
                  menuItems: [
                    {
                      from: "odyssey-blueprint/menu-item@1",
                      instanceId: "sizes.menu.small.edit",
                      inputs: { content: "Edit" },
                    },
                  ],
                  size: "small",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="menu-button@1, medium">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/menu-button@1",
                instanceId: "sizes.menu.medium",
                inputs: {
                  buttonLabel: "Actions",
                  menuItems: [
                    {
                      from: "odyssey-blueprint/menu-item@1",
                      instanceId: "sizes.menu.medium.edit",
                      inputs: { content: "Edit" },
                    },
                  ],
                  size: "medium",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="menu-button@1, large">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/menu-button@1",
                instanceId: "sizes.menu.large",
                inputs: {
                  buttonLabel: "Actions",
                  menuItems: [
                    {
                      from: "odyssey-blueprint/menu-item@1",
                      instanceId: "sizes.menu.large.edit",
                      inputs: { content: "Edit" },
                    },
                  ],
                  size: "large",
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
        <StoryGrid columns={3}>
          <StoryCell label="button@1, disabled">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/button@1",
                instanceId: "states.button.disabled",
                inputs: { isDisabled: true, label: "Save", variant: "primary" },
              }}
            />
          </StoryCell>

          <StoryCell label="button@1, link">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/button@1",
                instanceId: "states.button.link",
                inputs: {
                  href: "https://www.okta.com",
                  label: "Read the docs",
                  variant: "secondary",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="button@1, submit">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/button@1",
                instanceId: "states.button.submit",
                inputs: {
                  label: "Submit",
                  type: "submit",
                  variant: "primary",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="button@1, disclosure">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/button@1",
                instanceId: "states.button.disclosure",
                inputs: {
                  ariaControls: "states.button.disclosure",
                  ariaExpanded: false,
                  ariaHasPopup: "dialog",
                  label: "Show details",
                  variant: "secondary",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="menu-button@1, disabled">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/menu-button@1",
                instanceId: "states.menu.disabled",
                inputs: {
                  buttonLabel: "Actions",
                  isDisabled: true,
                  menuItems: [
                    {
                      from: "odyssey-blueprint/menu-item@1",
                      instanceId: "states.menu.disabled.edit",
                      inputs: { content: "Edit" },
                    },
                  ],
                },
              }}
            />
          </StoryCell>

          <StoryCell label="menu-button@1, vertical divider">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/menu-button@1",
                instanceId: "states.menu.divider",
                inputs: {
                  buttonLabel: "Actions",
                  hasVerticalDivider: true,
                  menuItems: [
                    {
                      from: "odyssey-blueprint/menu-item@1",
                      instanceId: "states.menu.divider.edit",
                      inputs: { content: "Edit" },
                    },
                  ],
                  verticalDividerAlignment: "end",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="menu-button@1, right aligned menu">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/menu-button@1",
                instanceId: "states.menu.rightAligned",
                inputs: {
                  buttonLabel: "Actions",
                  menuAlignment: "right",
                  menuItems: [
                    {
                      from: "odyssey-blueprint/menu-item@1",
                      instanceId: "states.menu.rightAligned.edit",
                      inputs: { content: "Edit" },
                    },
                  ],
                  shouldCloseOnSelect: false,
                },
              }}
            />
          </StoryCell>

          <StoryCell label="menu-button@1, items from a source">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/menu-button@1",
                instanceId: "states.menu.iterated",
                inputs: {
                  buttonLabel: "Actions",
                  menuItems: [
                    {
                      as: "rowAction",
                      each: [
                        { id: "edit", label: "Edit" },
                        { id: "duplicate", label: "Duplicate" },
                        { id: "delete", label: "Delete" },
                      ],
                      entry: {
                        from: "odyssey-blueprint/menu-item@1",
                        instanceId: {
                          iterator: { name: "rowAction", path: ["id"] },
                        },
                        inputs: {
                          content: {
                            iterator: { name: "rowAction", path: ["label"] },
                          },
                          value: {
                            iterator: { name: "rowAction", path: ["id"] },
                          },
                        },
                      },
                    },
                  ],
                },
              }}
            />
          </StoryCell>
        </StoryGrid>

        <StoryRow>
          <OdysseyBlueprintRenderer
            blueprint={{
              from: "odyssey-blueprint/button@1",
              instanceId: "states.button.fullWidth",
              inputs: {
                isFullWidth: true,
                label: "Continue",
                variant: "primary",
              },
            }}
          />
        </StoryRow>
      </StorySection>
    );
  },
};
