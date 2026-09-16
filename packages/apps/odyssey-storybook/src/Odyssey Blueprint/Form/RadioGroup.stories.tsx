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
      from: "odyssey-blueprint/radio-group-field@1",
      instanceId: "playground.radioGroup",
      inputs: {
        hint: "Drives the default app assignment",
        label: "User type",
        name: "userType",
        options: [
          { label: "Employee", value: "employee" },
          { label: "Contractor", value: "contractor" },
        ],
      },
    },
  },
};

export default storybookMeta;

type Story = StoryObj<OdysseyBlueprintRendererProps>;

export const Playground: Story = {};

// One renderer per cell rather than one blueprint holding every state:
// `OdysseyBlueprintRenderer` takes a single root entry, so a board cannot be one
// tree. Each entry needs its own `instanceId` because instance registration is keyed
// by it.
//
// No `AllVariants` board: `radio-group-field@1` has one rendered form, which
// `Playground` already shows. `RadioGroup` has no size prop, so there is no `AllSizes` board.
export const AllStates: Story = {
  parameters: staticBoardParameters,
  render: function C() {
    return (
      <StorySection title="Every prop-driven state radio-group-field@1 supports.">
        <StoryGrid columns={2}>
          <StoryCell label="preselected">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/radio-group-field@1",
                instanceId: "states.radioGroup.preselected",
                inputs: {
                  defaultValue: "employee",
                  hint: "Drives the default app assignment",
                  label: "User type",
                  name: "userType",
                  options: [
                    { label: "Employee", value: "employee" },
                    {
                      hint: "Time-limited access",
                      label: "Contractor",
                      value: "contractor",
                    },
                  ],
                },
              }}
            />
          </StoryCell>

          <StoryCell label="error">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/radio-group-field@1",
                instanceId: "states.radioGroup.error",
                inputs: {
                  errorMessage: "Choose a user type",
                  label: "User type",
                  options: [
                    { label: "Employee", value: "employee" },
                    { label: "Contractor", value: "contractor" },
                  ],
                },
              }}
            />
          </StoryCell>

          <StoryCell label="per-option states">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/radio-group-field@1",
                instanceId: "states.radioGroup.perOption",
                inputs: {
                  label: "User type",
                  options: [
                    { label: "Employee", value: "employee" },
                    {
                      isDisabled: true,
                      label: "Contractor",
                      value: "contractor",
                    },
                    {
                      isInvalid: true,
                      label: "Service account",
                      value: "service",
                    },
                  ],
                },
              }}
            />
          </StoryCell>

          <StoryCell label="disabled">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/radio-group-field@1",
                instanceId: "states.radioGroup.disabled",
                inputs: {
                  defaultValue: "employee",
                  isDisabled: true,
                  label: "User type",
                  options: [
                    { label: "Employee", value: "employee" },
                    { label: "Contractor", value: "contractor" },
                  ],
                },
              }}
            />
          </StoryCell>

          <StoryCell label="read-only">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/radio-group-field@1",
                instanceId: "states.radioGroup.readOnly",
                inputs: {
                  defaultValue: "employee",
                  isReadOnly: true,
                  label: "User type",
                  options: [
                    { label: "Employee", value: "employee" },
                    { label: "Contractor", value: "contractor" },
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
