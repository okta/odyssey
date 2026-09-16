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
      from: "odyssey-blueprint/tag@1",
      instanceId: "playground.tag",
      inputs: {
        label: "Engineering",
      },
    },
  },
};

export default storybookMeta;

type Story = StoryObj<OdysseyBlueprintRendererProps>;

export const Playground: Story = {};

// One renderer per cell rather than one blueprint holding every indicator:
// `OdysseyBlueprintRenderer` takes a single root entry, and each entry needs its
// own `instanceId` because instance registration is keyed by it. `tag-list@1` is
// the exception: its `tags` input nests the tag entries.
export const AllVariants: Story = {
  parameters: staticBoardParameters,
  render: function C() {
    return (
      <StorySection title="Every color, severity and type across the indicator blocks.">
        <StoryGrid columns={6}>
          <StoryCell label="tag, default">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/tag@1",
                instanceId: "variants.tag.default",
                inputs: { colorVariant: "default", label: "Engineering" },
              }}
            />
          </StoryCell>

          <StoryCell label="tag, info">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/tag@1",
                instanceId: "variants.tag.info",
                inputs: { colorVariant: "info", label: "Sales" },
              }}
            />
          </StoryCell>

          <StoryCell label="tag, accentOne">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/tag@1",
                instanceId: "variants.tag.accentOne",
                inputs: { colorVariant: "accentOne", label: "Support" },
              }}
            />
          </StoryCell>

          <StoryCell label="tag, accentTwo">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/tag@1",
                instanceId: "variants.tag.accentTwo",
                inputs: { colorVariant: "accentTwo", label: "Contractors" },
              }}
            />
          </StoryCell>

          <StoryCell label="tag, accentThree">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/tag@1",
                instanceId: "variants.tag.accentThree",
                inputs: { colorVariant: "accentThree", label: "Interns" },
              }}
            />
          </StoryCell>

          <StoryCell label="tag, accentFour">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/tag@1",
                instanceId: "variants.tag.accentFour",
                inputs: { colorVariant: "accentFour", label: "Partners" },
              }}
            />
          </StoryCell>
        </StoryGrid>

        <StoryGrid columns={5}>
          <StoryCell label="status, lamp default">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/status@1",
                instanceId: "variants.status.lamp.default",
                inputs: {
                  label: "Not started",
                  severity: "default",
                  variant: "lamp",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="status, lamp info">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/status@1",
                instanceId: "variants.status.lamp.info",
                inputs: {
                  label: "Provisioning",
                  severity: "info",
                  variant: "lamp",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="status, lamp success">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/status@1",
                instanceId: "variants.status.lamp.success",
                inputs: {
                  label: "Active",
                  severity: "success",
                  variant: "lamp",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="status, lamp warning">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/status@1",
                instanceId: "variants.status.lamp.warning",
                inputs: {
                  label: "Pending review",
                  severity: "warning",
                  variant: "lamp",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="status, lamp error">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/status@1",
                instanceId: "variants.status.lamp.error",
                inputs: {
                  label: "Suspended",
                  severity: "error",
                  variant: "lamp",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="status, pill default">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/status@1",
                instanceId: "variants.status.pill.default",
                inputs: {
                  label: "Not started",
                  severity: "default",
                  variant: "pill",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="status, pill info">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/status@1",
                instanceId: "variants.status.pill.info",
                inputs: {
                  label: "Provisioning",
                  severity: "info",
                  variant: "pill",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="status, pill success">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/status@1",
                instanceId: "variants.status.pill.success",
                inputs: {
                  label: "Active",
                  severity: "success",
                  variant: "pill",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="status, pill warning">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/status@1",
                instanceId: "variants.status.pill.warning",
                inputs: {
                  label: "Pending review",
                  severity: "warning",
                  variant: "pill",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="status, pill error">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/status@1",
                instanceId: "variants.status.pill.error",
                inputs: {
                  label: "Suspended",
                  severity: "error",
                  variant: "pill",
                },
              }}
            />
          </StoryCell>
        </StoryGrid>

        <StoryGrid columns={3}>
          <StoryCell label="badge, default">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/badge@1",
                instanceId: "variants.badge.default",
                inputs: { badgeContent: 8, type: "default" },
              }}
            />
          </StoryCell>

          <StoryCell label="badge, attention">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/badge@1",
                instanceId: "variants.badge.attention",
                inputs: { badgeContent: 12, type: "attention" },
              }}
            />
          </StoryCell>

          <StoryCell label="badge, danger">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/badge@1",
                instanceId: "variants.badge.danger",
                inputs: { badgeContent: 3, type: "danger" },
              }}
            />
          </StoryCell>
        </StoryGrid>

        <StoryGrid columns={2}>
          <StoryCell label="tag-list@1, nested tag@1 entries">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/tag-list@1",
                instanceId: "variants.tagList",
                inputs: {
                  ariaLabel: "Assigned groups",
                  tags: [
                    {
                      from: "odyssey-blueprint/tag@1",
                      instanceId: "variants.tagList.engineering",
                      inputs: { label: "Engineering" },
                    },
                    {
                      from: "odyssey-blueprint/tag@1",
                      instanceId: "variants.tagList.sales",
                      inputs: { colorVariant: "info", label: "Sales" },
                    },
                    {
                      from: "odyssey-blueprint/tag@1",
                      instanceId: "variants.tagList.everyone",
                      inputs: { colorVariant: "accentTwo", label: "Everyone" },
                    },
                  ],
                },
              }}
            />
          </StoryCell>

          <StoryCell label="circular-progress@1, indeterminate">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/circular-progress@1",
                instanceId: "variants.circularProgress",
                inputs: { ariaLabel: "Loading assigned apps" },
              }}
            />
          </StoryCell>
        </StoryGrid>
      </StorySection>
    );
  },
};

// `tag@1` is the only block in this family with a `size` input, so this is the
// only size board.
export const AllSizes: Story = {
  parameters: staticBoardParameters,
  render: function C() {
    return (
      <StorySection title="Every tag size, paired with a color variant.">
        <StoryGrid columns={4}>
          <StoryCell label="tag, medium default">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/tag@1",
                instanceId: "sizes.tag.mediumDefault",
                inputs: {
                  colorVariant: "default",
                  label: "Engineering",
                  size: "medium",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="tag, small default">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/tag@1",
                instanceId: "sizes.tag.smallDefault",
                inputs: {
                  colorVariant: "default",
                  label: "Engineering",
                  size: "small",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="tag, medium info, removable">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/tag@1",
                instanceId: "sizes.tag.mediumInfo",
                inputs: {
                  colorVariant: "info",
                  isRemovable: true,
                  label: "Sales",
                  size: "medium",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="tag, small info, removable">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/tag@1",
                instanceId: "sizes.tag.smallInfo",
                inputs: {
                  colorVariant: "info",
                  isRemovable: true,
                  label: "Sales",
                  size: "small",
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
        <StoryGrid columns={4}>
          <StoryCell label="tag, disabled">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/tag@1",
                instanceId: "states.tag.disabled",
                inputs: { isDisabled: true, label: "Engineering" },
              }}
            />
          </StoryCell>

          {/* `isRemovable` and `isClickable` are inputs rather than something the
              declared events imply, because Odyssey grows the affordance only
              when it receives the matching handler. */}
          <StoryCell label="tag, removable">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/tag@1",
                instanceId: "states.tag.removable",
                inputs: { isRemovable: true, label: "Contractors" },
              }}
            />
          </StoryCell>

          <StoryCell label="tag, clickable">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/tag@1",
                instanceId: "states.tag.clickable",
                inputs: { isClickable: true, label: "Okta Verify" },
              }}
            />
          </StoryCell>

          <StoryCell label="tag, clickable and removable">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/tag@1",
                instanceId: "states.tag.clickableRemovable",
                inputs: {
                  isClickable: true,
                  isRemovable: true,
                  label: "Password",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="tag, clickable and disabled">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/tag@1",
                instanceId: "states.tag.clickableDisabled",
                inputs: {
                  isClickable: true,
                  isDisabled: true,
                  label: "Security question",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="tag, removable and disabled">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/tag@1",
                instanceId: "states.tag.removableDisabled",
                inputs: {
                  isDisabled: true,
                  isRemovable: true,
                  label: "Phone",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="tag-list, removable tags">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/tag-list@1",
                instanceId: "states.tagList.removable",
                inputs: {
                  ariaLabel: "Required authenticators",
                  tags: [
                    {
                      from: "odyssey-blueprint/tag@1",
                      instanceId: "states.tagList.removable.password",
                      inputs: { isRemovable: true, label: "Password" },
                    },
                    {
                      from: "odyssey-blueprint/tag@1",
                      instanceId: "states.tagList.removable.verify",
                      inputs: { isRemovable: true, label: "Okta Verify" },
                    },
                  ],
                },
              }}
            />
          </StoryCell>

          <StoryCell label="badge, count over max">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/badge@1",
                instanceId: "states.badge.overMax",
                inputs: {
                  badgeContent: 250,
                  badgeContentMax: 20,
                  type: "attention",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="badge, zero count">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/badge@1",
                instanceId: "states.badge.zero",
                inputs: { badgeContent: 0 },
              }}
            />
          </StoryCell>

          {/* Omitting `value` is what leaves the spinner indeterminate, so `0` has
              to read as a determinate spinner with nothing filled in yet. */}
          <StoryCell label="circular-progress, determinate 0">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/circular-progress@1",
                instanceId: "states.circularProgress.zero",
                inputs: { ariaLabel: "Sync progress", value: 0 },
              }}
            />
          </StoryCell>

          <StoryCell label="circular-progress, determinate 65">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/circular-progress@1",
                instanceId: "states.circularProgress.sixtyFive",
                inputs: { ariaLabel: "Sync progress", value: 65 },
              }}
            />
          </StoryCell>

          <StoryCell label="circular-progress, indeterminate">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/circular-progress@1",
                instanceId: "states.circularProgress.indeterminate",
                inputs: { ariaLabel: "Loading assigned apps" },
              }}
            />
          </StoryCell>
        </StoryGrid>
      </StorySection>
    );
  },
};
