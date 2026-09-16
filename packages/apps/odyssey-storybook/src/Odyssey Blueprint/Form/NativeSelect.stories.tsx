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
      from: "odyssey-blueprint/native-select-field@1",
      instanceId: "playground.nativeSelect",
      inputs: {
        hint: "Where the org is billed",
        label: "Country",
        options: ["Canada", "Japan", "Portugal"],
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
// Single and multiple selection are the two rendered forms, and both come from
// `hasMultipleChoices` rather than from separate blocks, so they sit in this board
// with the rest of the prop-driven states. `NativeSelect` has no size prop and no
// `isReadOnly`.
export const AllStates: Story = {
  parameters: staticBoardParameters,
  render: function C() {
    return (
      <StorySection title="Every prop-driven state native-select-field@1 supports.">
        <StoryGrid columns={3}>
          <StoryCell label="optional">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/native-select-field@1",
                instanceId: "states.nativeSelect.optional",
                inputs: {
                  isOptional: true,
                  label: "Country",
                  options: ["Canada", "Japan", "Portugal"],
                },
              }}
            />
          </StoryCell>

          <StoryCell label="seeded selection">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/native-select-field@1",
                instanceId: "states.nativeSelect.seeded",
                inputs: {
                  defaultValue: "Japan",
                  label: "Country",
                  options: ["Canada", "Japan", "Portugal"],
                },
              }}
            />
          </StoryCell>

          <StoryCell label="disabled">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/native-select-field@1",
                instanceId: "states.nativeSelect.disabled",
                inputs: {
                  defaultValue: "Japan",
                  isDisabled: true,
                  label: "Country",
                  options: ["Canada", "Japan", "Portugal"],
                },
              }}
            />
          </StoryCell>

          <StoryCell label="error">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/native-select-field@1",
                instanceId: "states.nativeSelect.error",
                inputs: {
                  errorMessage: "Choose a country",
                  label: "Country",
                  options: ["Canada", "Japan", "Portugal"],
                },
              }}
            />
          </StoryCell>

          <StoryCell label="grouped options">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/native-select-field@1",
                instanceId: "states.nativeSelect.grouped",
                inputs: {
                  defaultValue: "Canada",
                  label: "Country",
                  options: [
                    { text: "Americas", type: "heading" },
                    "Canada",
                    { text: "Asia", type: "heading" },
                    "Japan",
                  ],
                },
              }}
            />
          </StoryCell>

          <StoryCell label="multiple selection">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/native-select-field@1",
                instanceId: "states.nativeSelect.multiple",
                inputs: {
                  defaultValue: ["Canada", "Japan"],
                  hasMultipleChoices: true,
                  label: "Country",
                  options: ["Canada", "Japan", "Portugal"],
                },
              }}
            />
          </StoryCell>
        </StoryGrid>
      </StorySection>
    );
  },
};
