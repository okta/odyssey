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
  StoryFilledWidth,
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
      from: "odyssey-blueprint/autocomplete-field@1",
      instanceId: "playground.autocomplete",
      inputs: {
        hint: "Start typing to filter the list",
        label: "City",
        options: ["Amsterdam", "Berlin", "Copenhagen"],
      },
    },
  },
};

export default storybookMeta;

type Story = StoryObj<OdysseyBlueprintRendererProps>;

export const Playground: Story = {};

// One renderer per cell rather than one blueprint holding every field:
// `OdysseyBlueprintRenderer` takes a single root entry, and there is no container
// block yet to nest siblings under. Each entry needs its own `instanceId` because
// instance registration is keyed by it.
//
// `StoryFilledWidth` around each cell because `Autocomplete` renders at its own
// intrinsic width, which is wider than a grid cell. `Autocomplete` has no size prop,
// so there is no `AllSizes` board.
export const AllStates: Story = {
  parameters: staticBoardParameters,
  render: function C() {
    return (
      <StorySection title="Every prop-driven state autocomplete-field@1 supports.">
        <StoryGrid columns={2}>
          <StoryCell label="optional">
            <StoryFilledWidth>
              <OdysseyBlueprintRenderer
                blueprint={{
                  from: "odyssey-blueprint/autocomplete-field@1",
                  instanceId: "states.autocomplete.optional",
                  inputs: {
                    isOptional: true,
                    label: "City",
                    options: ["Amsterdam", "Berlin", "Copenhagen"],
                  },
                }}
              />
            </StoryFilledWidth>
          </StoryCell>

          <StoryCell label="seeded selection">
            <StoryFilledWidth>
              <OdysseyBlueprintRenderer
                blueprint={{
                  from: "odyssey-blueprint/autocomplete-field@1",
                  instanceId: "states.autocomplete.seeded",
                  inputs: {
                    defaultValue: "Berlin",
                    label: "City",
                    options: ["Amsterdam", "Berlin", "Copenhagen"],
                  },
                }}
              />
            </StoryFilledWidth>
          </StoryCell>

          <StoryCell label="disabled">
            <StoryFilledWidth>
              <OdysseyBlueprintRenderer
                blueprint={{
                  from: "odyssey-blueprint/autocomplete-field@1",
                  instanceId: "states.autocomplete.disabled",
                  inputs: {
                    defaultValue: "Berlin",
                    isDisabled: true,
                    label: "City",
                    options: ["Amsterdam", "Berlin", "Copenhagen"],
                  },
                }}
              />
            </StoryFilledWidth>
          </StoryCell>

          <StoryCell label="read-only">
            <StoryFilledWidth>
              <OdysseyBlueprintRenderer
                blueprint={{
                  from: "odyssey-blueprint/autocomplete-field@1",
                  instanceId: "states.autocomplete.readOnly",
                  inputs: {
                    defaultValue: "Berlin",
                    isReadOnly: true,
                    label: "City",
                    options: ["Amsterdam", "Berlin", "Copenhagen"],
                  },
                }}
              />
            </StoryFilledWidth>
          </StoryCell>

          <StoryCell label="error">
            <StoryFilledWidth>
              <OdysseyBlueprintRenderer
                blueprint={{
                  from: "odyssey-blueprint/autocomplete-field@1",
                  instanceId: "states.autocomplete.error",
                  inputs: {
                    errorMessage: "Choose a city",
                    label: "City",
                    options: ["Amsterdam", "Berlin", "Copenhagen"],
                  },
                }}
              />
            </StoryFilledWidth>
          </StoryCell>

          <StoryCell label="multiple selection">
            <StoryFilledWidth>
              <OdysseyBlueprintRenderer
                blueprint={{
                  from: "odyssey-blueprint/autocomplete-field@1",
                  instanceId: "states.autocomplete.multiple",
                  inputs: {
                    defaultValue: ["Berlin", "Copenhagen"],
                    hasMultipleChoices: true,
                    label: "City",
                    options: ["Amsterdam", "Berlin", "Copenhagen"],
                  },
                }}
              />
            </StoryFilledWidth>
          </StoryCell>

          <StoryCell label="loading">
            <StoryFilledWidth>
              <OdysseyBlueprintRenderer
                blueprint={{
                  from: "odyssey-blueprint/autocomplete-field@1",
                  instanceId: "states.autocomplete.loading",
                  inputs: {
                    isLoading: true,
                    label: "City",
                    options: [],
                  },
                }}
              />
            </StoryFilledWidth>
          </StoryCell>

          <StoryCell label="custom values">
            <StoryFilledWidth>
              <OdysseyBlueprintRenderer
                blueprint={{
                  from: "odyssey-blueprint/autocomplete-field@1",
                  instanceId: "states.autocomplete.customValues",
                  inputs: {
                    hint: "Type any city, not only the suggested ones",
                    isCustomValueAllowed: true,
                    label: "City",
                    options: ["Amsterdam", "Berlin", "Copenhagen"],
                  },
                }}
              />
            </StoryFilledWidth>
          </StoryCell>
        </StoryGrid>
      </StorySection>
    );
  },
};
