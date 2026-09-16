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
      from: "odyssey-blueprint/page-template@1",
      instanceId: "playground.page",
      inputs: {
        content: [
          {
            from: "odyssey-blueprint/text-field@1",
            instanceId: "playground.page.search",
            inputs: { isOptional: true, label: "Filter directory" },
          },
        ],
        description: "Everyone in your org",
        title: "Directory",
      },
    },
  },
};

export default storybookMeta;

type Story = StoryObj<OdysseyBlueprintRendererProps>;

export const Playground: Story = {};

// One renderer per cell rather than one blueprint holding every layout:
// `OdysseyBlueprintRenderer` takes a single root entry, and each entry needs its
// own `instanceId` because instance registration is keyed by it.
export const AllVariants: Story = {
  parameters: staticBoardParameters,
  render: function C() {
    return (
      <StorySection title="The page shell and the region grid, each holding nested blueprint entries.">
        <StoryGrid columns={1}>
          <StoryCell label="page-template@1">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/page-template@1",
                instanceId: "variants.page",
                inputs: {
                  content: [
                    {
                      from: "odyssey-blueprint/text-field@1",
                      instanceId: "variants.page.search",
                      inputs: { isOptional: true, label: "Filter directory" },
                    },
                  ],
                  description: "Everyone in your org",
                  documentationLink: "https://developer.okta.com",
                  documentationText: "Read the docs",
                  title: "Directory",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="layout@1, regions [2, 1]">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/layout@1",
                instanceId: "variants.grid",
                inputs: {
                  content: [
                    {
                      from: "odyssey-blueprint/text-field@1",
                      instanceId: "variants.grid.main",
                      inputs: { isOptional: true, label: "Main region" },
                    },
                    {
                      from: "odyssey-blueprint/text-field@1",
                      instanceId: "variants.grid.side",
                      inputs: { isOptional: true, label: "Side region" },
                    },
                  ],
                  regions: [2, 1],
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
      <StorySection title="Header slots and region ratios, which are the states these two containers express.">
        <StoryGrid columns={1}>
          <StoryCell label="page-template, call-to-action slots">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/page-template@1",
                instanceId: "states.page.actions",
                inputs: {
                  primaryCallToActionComponent: {
                    from: "odyssey-blueprint/text-field@1",
                    instanceId: "states.page.actions.primary",
                    inputs: { isOptional: true, label: "Primary slot" },
                  },
                  secondaryCallToActionComponent: {
                    from: "odyssey-blueprint/text-field@1",
                    instanceId: "states.page.actions.secondary",
                    inputs: { isOptional: true, label: "Secondary slot" },
                  },
                  title: "Directory",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="page-template, full width">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/page-template@1",
                instanceId: "states.page.fullWidth",
                inputs: {
                  description: "Spans the whole available width",
                  isFullWidth: true,
                  title: "Directory",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="layout, regions [1, 1, 1]">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/layout@1",
                instanceId: "states.grid.thirds",
                inputs: {
                  content: [
                    {
                      from: "odyssey-blueprint/text-field@1",
                      instanceId: "states.grid.thirds.first",
                      inputs: { isOptional: true, label: "First" },
                    },
                    {
                      from: "odyssey-blueprint/text-field@1",
                      instanceId: "states.grid.thirds.second",
                      inputs: { isOptional: true, label: "Second" },
                    },
                    {
                      from: "odyssey-blueprint/text-field@1",
                      instanceId: "states.grid.thirds.third",
                      inputs: { isOptional: true, label: "Third" },
                    },
                  ],
                  regions: [1, 1, 1],
                },
              }}
            />
          </StoryCell>

          <StoryCell label="layout, nested layout in one region">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/layout@1",
                instanceId: "states.grid.nested",
                inputs: {
                  content: [
                    {
                      from: "odyssey-blueprint/layout@1",
                      instanceId: "states.grid.nested.inner",
                      inputs: {
                        content: [
                          {
                            from: "odyssey-blueprint/text-field@1",
                            instanceId: "states.grid.nested.inner.left",
                            inputs: { isOptional: true, label: "Inner left" },
                          },
                          {
                            from: "odyssey-blueprint/text-field@1",
                            instanceId: "states.grid.nested.inner.right",
                            inputs: { isOptional: true, label: "Inner right" },
                          },
                        ],
                        regions: [1, 1],
                      },
                    },
                  ],
                  regions: [1],
                },
              }}
            />
          </StoryCell>
        </StoryGrid>
      </StorySection>
    );
  },
};
