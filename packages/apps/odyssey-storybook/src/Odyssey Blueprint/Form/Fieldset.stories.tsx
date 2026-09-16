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
      from: "odyssey-blueprint/fieldset@1",
      instanceId: "playground.fieldset",
      inputs: {
        content: [
          {
            from: "odyssey-blueprint/switch-field@1",
            instanceId: "playground.fieldset.mfa",
            inputs: {
              defaultValue: true,
              label: "Require MFA",
              value: "requireMfa",
            },
          },
          {
            from: "odyssey-blueprint/switch-field@1",
            instanceId: "playground.fieldset.sso",
            inputs: { label: "Require SSO", value: "requireSso" },
          },
        ],
        description: "Applies to every member of this org",
        legend: "Sign-in policy",
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
// No `AllVariants` board: `fieldset@1` has one rendered form, which
// `Playground` already shows. `Fieldset` nests other entries, so each cell renders a whole group.
export const AllStates: Story = {
  parameters: staticBoardParameters,
  render: function C() {
    return (
      <StorySection title="Every prop-driven state fieldset@1 supports.">
        <StoryGrid columns={2}>
          <StoryCell label="description">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/fieldset@1",
                instanceId: "states.fieldset.description",
                inputs: {
                  content: [
                    {
                      from: "odyssey-blueprint/switch-field@1",
                      instanceId: "states.fieldset.description.mfa",
                      inputs: {
                        defaultValue: true,
                        label: "Require MFA",
                        value: "requireMfa",
                      },
                    },
                    {
                      from: "odyssey-blueprint/switch-field@1",
                      instanceId: "states.fieldset.description.sso",
                      inputs: { label: "Require SSO", value: "requireSso" },
                    },
                  ],
                  description: "Applies to every member of this org",
                  legend: "Sign-in policy",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="disabled">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/fieldset@1",
                instanceId: "states.fieldset.disabled",
                inputs: {
                  content: [
                    {
                      from: "odyssey-blueprint/switch-field@1",
                      instanceId: "states.fieldset.disabled.mfa",
                      inputs: {
                        defaultValue: true,
                        label: "Require MFA",
                        value: "requireMfa",
                      },
                    },
                  ],
                  isDisabled: true,
                  legend: "Sign-in policy",
                },
              }}
            />
          </StoryCell>
        </StoryGrid>
      </StorySection>
    );
  },
};
