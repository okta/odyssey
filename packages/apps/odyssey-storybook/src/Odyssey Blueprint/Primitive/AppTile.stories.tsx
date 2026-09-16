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
      from: "odyssey-blueprint/app-tile@1",
      instanceId: "playground.tile",
      inputs: {
        auxiliaryText: "Recently used",
        description: "Manage users, groups and applications",
        title: "Okta Admin",
      },
    },
  },
};

export default storybookMeta;

type Story = StoryObj<OdysseyBlueprintRendererProps>;

export const Playground: Story = {};

// One renderer per cell rather than one blueprint holding every tile:
// `OdysseyBlueprintRenderer` takes a single root entry, and each entry needs its
// own `instanceId` because instance registration is keyed by it.
export const AllVariants: Story = {
  parameters: staticBoardParameters,
  render: function C() {
    return (
      <StorySection title="Both tile densities, with the same content.">
        <StoryGrid columns={2}>
          <StoryCell label="app-tile@1, comfortable">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/app-tile@1",
                instanceId: "variants.comfortable",
                inputs: {
                  description: "Manage users, groups and applications",
                  title: "Okta Admin",
                  variant: "comfortable",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="app-tile@1, compact">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/app-tile@1",
                instanceId: "variants.compact",
                inputs: {
                  description: "Manage users, groups and applications",
                  title: "Okta Admin",
                  variant: "compact",
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
      <StorySection title="Every prop-driven state the tile supports.">
        <StoryGrid columns={3}>
          <StoryCell label="app-tile, title only">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/app-tile@1",
                instanceId: "states.titleOnly",
                inputs: { title: "Okta Admin" },
              }}
            />
          </StoryCell>

          <StoryCell label="app-tile, auxiliary text">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/app-tile@1",
                instanceId: "states.auxiliary",
                inputs: {
                  auxiliaryText: "Recently used",
                  description: "Manage users, groups and applications",
                  title: "Okta Admin",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="app-tile, loading">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/app-tile@1",
                instanceId: "states.loading",
                inputs: { isLoading: true, title: "Okta Admin" },
              }}
            />
          </StoryCell>

          <StoryCell label="app-tile, nested content">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/app-tile@1",
                instanceId: "states.content",
                inputs: {
                  content: [
                    {
                      from: "odyssey-blueprint/text-field@1",
                      instanceId: "states.content.note",
                      inputs: { isOptional: true, label: "Add a note" },
                    },
                  ],
                  title: "Okta Admin",
                },
              }}
            />
          </StoryCell>
        </StoryGrid>
      </StorySection>
    );
  },
};
