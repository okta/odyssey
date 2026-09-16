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
      from: "odyssey-blueprint/multi-select-field@1",
      instanceId: "playground.multiSelect",
      inputs: {
        defaultValue: ["EMEA"],
        hint: "Every region the app is available in",
        label: "Regions",
        options: ["Americas", "EMEA", "APAC"],
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
// No `AllVariants` board: multiple selection is the block's one rendered form, which
// `Playground` already shows. `Select` has no size prop, so there is no `AllSizes`
// board either.
export const AllStates: Story = {
  parameters: staticBoardParameters,
  render: function C() {
    return (
      <StorySection title="Every prop-driven state multi-select-field@1 supports.">
        <StoryGrid columns={3}>
          <StoryCell label="optional">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/multi-select-field@1",
                instanceId: "states.multiSelect.optional",
                inputs: {
                  isOptional: true,
                  label: "Regions",
                  options: ["Americas", "EMEA", "APAC"],
                },
              }}
            />
          </StoryCell>

          <StoryCell label="seeded selection">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/multi-select-field@1",
                instanceId: "states.multiSelect.seeded",
                inputs: {
                  defaultValue: ["EMEA", "APAC"],
                  label: "Regions",
                  options: ["Americas", "EMEA", "APAC"],
                },
              }}
            />
          </StoryCell>

          <StoryCell label="disabled">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/multi-select-field@1",
                instanceId: "states.multiSelect.disabled",
                inputs: {
                  defaultValue: ["EMEA"],
                  isDisabled: true,
                  label: "Regions",
                  options: ["Americas", "EMEA", "APAC"],
                },
              }}
            />
          </StoryCell>

          <StoryCell label="read-only">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/multi-select-field@1",
                instanceId: "states.multiSelect.readOnly",
                inputs: {
                  defaultValue: ["EMEA"],
                  isReadOnly: true,
                  label: "Regions",
                  options: ["Americas", "EMEA", "APAC"],
                },
              }}
            />
          </StoryCell>

          <StoryCell label="error">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/multi-select-field@1",
                instanceId: "states.multiSelect.error",
                inputs: {
                  errorMessage: "Choose at least one region",
                  label: "Regions",
                  options: ["Americas", "EMEA", "APAC"],
                },
              }}
            />
          </StoryCell>

          <StoryCell label="grouped options">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/multi-select-field@1",
                instanceId: "states.multiSelect.grouped",
                inputs: {
                  defaultValue: ["EMEA"],
                  label: "Regions",
                  options: [
                    { text: "Western hemisphere", type: "heading" },
                    "Americas",
                    { text: "Eastern hemisphere", type: "heading" },
                    "EMEA",
                    "APAC",
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
