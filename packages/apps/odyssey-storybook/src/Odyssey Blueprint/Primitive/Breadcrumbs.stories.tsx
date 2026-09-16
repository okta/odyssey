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
      from: "odyssey-blueprint/breadcrumbs@1",
      instanceId: "playground.breadcrumbs",
      inputs: {
        items: [
          { href: "https://okta.com", label: "Directory" },
          { href: "https://okta.com", label: "Groups" },
          { label: "Engineering" },
        ],
      },
    },
  },
};

export default storybookMeta;

type Story = StoryObj<OdysseyBlueprintRendererProps>;

export const Playground: Story = {};

// `breadcrumbs@1` builds its trail from `inputs.items` rather than from nested
// entries, so each cell is one renderer with its own `instanceId` and its own item
// array.
export const AllVariants: Story = {
  parameters: staticBoardParameters,
  render: function C() {
    return (
      <StorySection title="Every item shape the trail can be built from.">
        <StoryGrid columns={1}>
          <StoryCell label="breadcrumbs@1, linked trail">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/breadcrumbs@1",
                instanceId: "variants.breadcrumbs.linked",
                inputs: {
                  items: [
                    { href: "https://okta.com", label: "Directory" },
                    { href: "https://okta.com", label: "Groups" },
                    { label: "Engineering" },
                  ],
                },
              }}
            />
          </StoryCell>

          <StoryCell label="breadcrumbs@1, home href">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/breadcrumbs@1",
                instanceId: "variants.breadcrumbs.home",
                inputs: {
                  homeHref: "https://okta.com",
                  items: [
                    { href: "https://okta.com", label: "Applications" },
                    { label: "Salesforce" },
                  ],
                },
              }}
            />
          </StoryCell>

          <StoryCell label="breadcrumbs@1, group icon">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/breadcrumbs@1",
                instanceId: "variants.breadcrumbs.groupIcon",
                inputs: {
                  items: [
                    { href: "https://okta.com", label: "Directory" },
                    {
                      href: "https://okta.com",
                      iconName: "group",
                      label: "Groups",
                    },
                    { label: "Engineering" },
                  ],
                },
              }}
            />
          </StoryCell>

          <StoryCell label="breadcrumbs@1, user icon">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/breadcrumbs@1",
                instanceId: "variants.breadcrumbs.userIcon",
                inputs: {
                  items: [
                    { href: "https://okta.com", label: "Directory" },
                    {
                      href: "https://okta.com",
                      iconName: "user",
                      label: "People",
                    },
                    { iconName: "user", label: "Jane Ito" },
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
      <StorySection title="Trail lengths, including more items than the visible maximum.">
        <StoryGrid columns={1}>
          <StoryCell label="breadcrumbs, two items">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/breadcrumbs@1",
                instanceId: "states.breadcrumbs.short",
                inputs: {
                  items: [
                    { href: "https://okta.com", label: "Directory" },
                    { label: "Groups" },
                  ],
                },
              }}
            />
          </StoryCell>

          <StoryCell label="breadcrumbs, single item">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/breadcrumbs@1",
                instanceId: "states.breadcrumbs.single",
                inputs: {
                  items: [{ label: "Applications" }],
                },
              }}
            />
          </StoryCell>

          {/* `BreadcrumbList` collapses everything past `maxVisibleItems` into an
              overflow menu, so this cell has more items than the maximum in order
              to show the collapsed form. */}
          <StoryCell label="breadcrumbs, more items than maxVisibleItems">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/breadcrumbs@1",
                instanceId: "states.breadcrumbs.overflow",
                inputs: {
                  items: [
                    { href: "https://okta.com", label: "Directory" },
                    { href: "https://okta.com", label: "Groups" },
                    { href: "https://okta.com", label: "Engineering" },
                    { href: "https://okta.com", label: "Applications" },
                    { href: "https://okta.com", label: "Salesforce" },
                    { href: "https://okta.com", label: "Sign-on policy" },
                    { label: "Rule 1" },
                  ],
                  maxVisibleItems: 4,
                },
              }}
            />
          </StoryCell>

          <StoryCell label="breadcrumbs, home href with overflow">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/breadcrumbs@1",
                instanceId: "states.breadcrumbs.homeOverflow",
                inputs: {
                  homeHref: "https://okta.com",
                  items: [
                    { href: "https://okta.com", label: "Security" },
                    { href: "https://okta.com", label: "Authenticators" },
                    { href: "https://okta.com", label: "Okta Verify" },
                    { href: "https://okta.com", label: "Enrollment" },
                    { label: "Policy" },
                  ],
                  maxVisibleItems: 3,
                },
              }}
            />
          </StoryCell>

          <StoryCell label="breadcrumbs, untranslated labels">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/breadcrumbs@1",
                instanceId: "states.breadcrumbs.untranslated",
                inputs: {
                  items: [
                    { href: "https://okta.com", label: "Okta Verify" },
                    { label: "Okta FastPass" },
                  ],
                  translate: "no",
                },
              }}
            />
          </StoryCell>
        </StoryGrid>
      </StorySection>
    );
  },
};
