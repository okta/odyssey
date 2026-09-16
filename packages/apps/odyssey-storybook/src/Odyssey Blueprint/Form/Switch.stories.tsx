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
      from: "odyssey-blueprint/switch-field@1",
      instanceId: "playground.switch",
      inputs: {
        hint: "Applies to every sign-in",
        label: "Require MFA",
        value: "requireMfa",
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
// No `AllVariants` board: `switch-field@1` has one rendered form, which
// `Playground` already shows. `Switch` has no size prop, so there is no `AllSizes` board.
export const AllStates: Story = {
  parameters: staticBoardParameters,
  render: function C() {
    return (
      <StorySection title="Every prop-driven state switch-field@1 supports.">
        <StoryGrid columns={3}>
          <StoryCell label="on">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/switch-field@1",
                instanceId: "states.switch.on",
                inputs: {
                  defaultValue: true,
                  label: "Require MFA",
                  value: "requireMfa",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="hint">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/switch-field@1",
                instanceId: "states.switch.hint",
                inputs: {
                  hint: "Applies to every sign-in",
                  label: "Require MFA",
                  value: "requireMfa",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="disabled">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/switch-field@1",
                instanceId: "states.switch.disabled",
                inputs: {
                  defaultValue: true,
                  isDisabled: true,
                  label: "Require MFA",
                  value: "requireMfa",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="read-only">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/switch-field@1",
                instanceId: "states.switch.readOnly",
                inputs: {
                  defaultValue: true,
                  isReadOnly: true,
                  label: "Require MFA",
                  value: "requireMfa",
                },
              }}
            />
          </StoryCell>
        </StoryGrid>
      </StorySection>
    );
  },
};
