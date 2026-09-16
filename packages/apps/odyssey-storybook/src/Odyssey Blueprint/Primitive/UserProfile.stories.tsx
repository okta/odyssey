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
      from: "odyssey-blueprint/user-profile-menu-button@1",
      instanceId: "playground.account",
      inputs: {
        ariaLabel: "Account menu",
        menuItems: [
          {
            from: "odyssey-blueprint/text-field@1",
            instanceId: "playground.account.filter",
            inputs: { isOptional: true, label: "Filter apps" },
          },
        ],
        orgName: "Okta",
        userName: "Jane Doe",
      },
    },
  },
};

export default storybookMeta;

type Story = StoryObj<OdysseyBlueprintRendererProps>;

export const Playground: Story = {};

// One renderer per cell rather than one blueprint holding both blocks:
// `OdysseyBlueprintRenderer` takes a single root entry, and each entry needs its
// own `instanceId` because instance registration is keyed by it.
export const AllVariants: Story = {
  parameters: staticBoardParameters,
  render: function C() {
    return (
      <StorySection title="The static profile display and the menu trigger built from it.">
        <StoryGrid columns={2}>
          <StoryCell label="user-profile@1">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/user-profile@1",
                instanceId: "variants.profile",
                inputs: { orgName: "Okta", userName: "Jane Doe" },
              }}
            />
          </StoryCell>

          <StoryCell label="user-profile-menu-button@1">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/user-profile-menu-button@1",
                instanceId: "variants.account",
                inputs: {
                  ariaLabel: "Account menu",
                  menuItems: [
                    {
                      from: "odyssey-blueprint/text-field@1",
                      instanceId: "variants.account.filter",
                      inputs: { isOptional: true, label: "Filter apps" },
                    },
                  ],
                  orgName: "Okta",
                  userName: "Jane Doe",
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
          <StoryCell label="user-profile, long names">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/user-profile@1",
                instanceId: "states.profile.long",
                inputs: {
                  orgName: "Okta Identity Cloud Production",
                  userName: "Jane Alexandra Doe-Fitzgerald",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="menu-button, disabled">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/user-profile-menu-button@1",
                instanceId: "states.account.disabled",
                inputs: {
                  ariaLabel: "Account menu",
                  isDisabled: true,
                  orgName: "Okta",
                  userName: "Jane Doe",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="menu-button, vertical divider">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/user-profile-menu-button@1",
                instanceId: "states.account.divider",
                inputs: {
                  ariaLabel: "Account menu",
                  hasVerticalDivider: true,
                  orgName: "Okta",
                  userName: "Jane Doe",
                  verticalDividerAlignment: "start",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="menu-button, small">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/user-profile-menu-button@1",
                instanceId: "states.account.small",
                inputs: {
                  ariaLabel: "Account menu",
                  orgName: "Okta",
                  size: "small",
                  userName: "Jane Doe",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="menu-button, right aligned menu">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/user-profile-menu-button@1",
                instanceId: "states.account.right",
                inputs: {
                  ariaLabel: "Account menu",
                  menuAlignment: "right",
                  menuItems: [
                    {
                      from: "odyssey-blueprint/text-field@1",
                      instanceId: "states.account.right.filter",
                      inputs: { isOptional: true, label: "Filter apps" },
                    },
                  ],
                  orgName: "Okta",
                  userName: "Jane Doe",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="menu-button, tooltip text">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/user-profile-menu-button@1",
                instanceId: "states.account.tooltip",
                inputs: {
                  ariaLabel: "Account menu",
                  orgName: "Okta",
                  tooltipText: "Open your account menu",
                  userName: "Jane Doe",
                },
              }}
            />
          </StoryCell>
        </StoryGrid>
      </StorySection>
    );
  },
};
