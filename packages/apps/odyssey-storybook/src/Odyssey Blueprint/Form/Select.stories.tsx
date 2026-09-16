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
      from: "odyssey-blueprint/select-field@1",
      instanceId: "playground.select",
      inputs: {
        hint: "Sets how quickly the ticket is triaged",
        label: "Priority",
        options: ["Low", "Medium", "High"],
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
// No `AllVariants` board: `select-field@1` has one rendered form, which `Playground`
// already shows. `Select` has no size prop either, so there is no `AllSizes` board.
export const AllStates: Story = {
  parameters: staticBoardParameters,
  render: function C() {
    return (
      <StorySection title="Every prop-driven state select-field@1 supports.">
        <StoryGrid columns={3}>
          <StoryCell label="optional">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/select-field@1",
                instanceId: "states.select.optional",
                inputs: {
                  isOptional: true,
                  label: "Priority",
                  options: ["Low", "Medium", "High"],
                },
              }}
            />
          </StoryCell>

          <StoryCell label="hint">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/select-field@1",
                instanceId: "states.select.hint",
                inputs: {
                  hint: "Sets how quickly the ticket is triaged",
                  label: "Priority",
                  options: ["Low", "Medium", "High"],
                },
              }}
            />
          </StoryCell>

          <StoryCell label="seeded selection">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/select-field@1",
                instanceId: "states.select.seeded",
                inputs: {
                  defaultValue: "Medium",
                  label: "Priority",
                  options: ["Low", "Medium", "High"],
                },
              }}
            />
          </StoryCell>

          <StoryCell label="disabled">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/select-field@1",
                instanceId: "states.select.disabled",
                inputs: {
                  defaultValue: "Medium",
                  isDisabled: true,
                  label: "Priority",
                  options: ["Low", "Medium", "High"],
                },
              }}
            />
          </StoryCell>

          <StoryCell label="read-only">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/select-field@1",
                instanceId: "states.select.readOnly",
                inputs: {
                  defaultValue: "Medium",
                  isReadOnly: true,
                  label: "Priority",
                  options: ["Low", "Medium", "High"],
                },
              }}
            />
          </StoryCell>

          <StoryCell label="error">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/select-field@1",
                instanceId: "states.select.error",
                inputs: {
                  errorMessage: "Choose a priority",
                  label: "Priority",
                  options: ["Low", "Medium", "High"],
                },
              }}
            />
          </StoryCell>

          <StoryCell label="errors list">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/select-field@1",
                instanceId: "states.select.errorsList",
                inputs: {
                  errorMessage: "Fix the following",
                  errorMessageList: [
                    "Required for new tickets",
                    "Must match the queue's default",
                  ],
                  label: "Priority",
                  options: ["Low", "Medium", "High"],
                },
              }}
            />
          </StoryCell>

          <StoryCell label="grouped options">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/select-field@1",
                instanceId: "states.select.grouped",
                inputs: {
                  defaultValue: "p1",
                  label: "Priority",
                  options: [
                    { text: "Needs attention now", type: "heading" },
                    { text: "P1, page on call", value: "p1" },
                    { text: "Everything else", type: "heading" },
                    { text: "P3, next sprint", value: "p3" },
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
