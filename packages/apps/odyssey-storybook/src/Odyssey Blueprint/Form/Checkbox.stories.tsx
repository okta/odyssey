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
      from: "odyssey-blueprint/checkbox-field@1",
      instanceId: "playground.checkbox",
      inputs: {
        hint: "Required before your account is created",
        label: "Accept the terms",
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
// No `AllVariants` board: `checkbox-field@1` has one rendered form, which
// `Playground` already shows. `Checkbox` has no size prop, so there is no `AllSizes` board.
export const AllStates: Story = {
  parameters: staticBoardParameters,
  render: function C() {
    return (
      <StorySection title="Every prop-driven state checkbox-field@1 supports.">
        <StoryGrid columns={3}>
          <StoryCell label="unchecked">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/checkbox-field@1",
                instanceId: "states.checkbox.unchecked",
                inputs: { label: "Accept the terms" },
              }}
            />
          </StoryCell>

          <StoryCell label="checked">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/checkbox-field@1",
                instanceId: "states.checkbox.checked",
                inputs: { defaultValue: true, label: "Accept the terms" },
              }}
            />
          </StoryCell>

          <StoryCell label="indeterminate">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/checkbox-field@1",
                instanceId: "states.checkbox.indeterminate",
                inputs: { isIndeterminate: true, label: "Accept the terms" },
              }}
            />
          </StoryCell>

          <StoryCell label="hint">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/checkbox-field@1",
                instanceId: "states.checkbox.hint",
                inputs: {
                  hint: "Required before your account is created",
                  label: "Accept the terms",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="required">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/checkbox-field@1",
                instanceId: "states.checkbox.required",
                inputs: { isRequired: true, label: "Accept the terms" },
              }}
            />
          </StoryCell>

          <StoryCell label="invalid">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/checkbox-field@1",
                instanceId: "states.checkbox.invalid",
                inputs: { label: "Accept the terms", validity: "invalid" },
              }}
            />
          </StoryCell>

          <StoryCell label="disabled">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/checkbox-field@1",
                instanceId: "states.checkbox.disabled",
                inputs: {
                  defaultValue: true,
                  isDisabled: true,
                  label: "Accept the terms",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="read-only">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/checkbox-field@1",
                instanceId: "states.checkbox.readOnly",
                inputs: {
                  defaultValue: true,
                  isReadOnly: true,
                  label: "Accept the terms",
                },
              }}
            />
          </StoryCell>
        </StoryGrid>
      </StorySection>
    );
  },
};
