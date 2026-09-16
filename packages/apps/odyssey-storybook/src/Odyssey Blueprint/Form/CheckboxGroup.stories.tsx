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
      from: "odyssey-blueprint/checkbox-group-field@1",
      instanceId: "playground.checkboxGroup",
      inputs: {
        hint: "Choose how we reach you",
        label: "Notification channels",
        name: "channels",
        options: [
          { label: "Email", value: "email" },
          { label: "SMS", value: "sms" },
          { label: "Push notification", value: "push" },
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
// No `AllVariants` board: `checkbox-group-field@1` has one rendered form, which
// `Playground` already shows. `CheckboxGroup` has no size prop, so there is no `AllSizes` board.
export const AllStates: Story = {
  parameters: staticBoardParameters,
  render: function C() {
    return (
      <StorySection title="Every prop-driven state checkbox-group-field@1 supports.">
        <StoryGrid columns={2}>
          <StoryCell label="preselected">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/checkbox-group-field@1",
                instanceId: "states.checkboxGroup.preselected",
                inputs: {
                  defaultValue: ["email", "sms"],
                  label: "Notification channels",
                  name: "channels",
                  options: [
                    { label: "Email", value: "email" },
                    {
                      hint: "Immediate text alerts",
                      label: "SMS",
                      value: "sms",
                    },
                  ],
                },
              }}
            />
          </StoryCell>

          <StoryCell label="required">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/checkbox-group-field@1",
                instanceId: "states.checkboxGroup.required",
                inputs: {
                  hint: "Choose how we reach you",
                  isRequired: true,
                  label: "Notification channels",
                  options: [
                    { label: "Email", value: "email" },
                    { label: "SMS", value: "sms" },
                  ],
                },
              }}
            />
          </StoryCell>

          <StoryCell label="error">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/checkbox-group-field@1",
                instanceId: "states.checkboxGroup.error",
                inputs: {
                  errorMessage: "Choose at least one channel",
                  label: "Notification channels",
                  options: [
                    { label: "Email", value: "email" },
                    { label: "SMS", value: "sms" },
                  ],
                },
              }}
            />
          </StoryCell>

          <StoryCell label="errors list">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/checkbox-group-field@1",
                instanceId: "states.checkboxGroup.errorsList",
                inputs: {
                  errorMessage: "Fix the following",
                  errorMessageList: [
                    "Choose at least one channel",
                    "SMS needs a verified number",
                  ],
                  label: "Notification channels",
                  options: [
                    { label: "Email", value: "email" },
                    { label: "SMS", value: "sms" },
                  ],
                },
              }}
            />
          </StoryCell>

          <StoryCell label="per-option states">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/checkbox-group-field@1",
                instanceId: "states.checkboxGroup.perOption",
                inputs: {
                  label: "Permissions",
                  options: [
                    { hint: "View records", label: "Read", value: "read" },
                    { isDisabled: true, label: "Write", value: "write" },
                    {
                      label: "Admin",
                      validity: "invalid",
                      value: "admin",
                    },
                  ],
                },
              }}
            />
          </StoryCell>

          <StoryCell label="disabled">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/checkbox-group-field@1",
                instanceId: "states.checkboxGroup.disabled",
                inputs: {
                  defaultValue: ["email"],
                  isDisabled: true,
                  label: "Notification channels",
                  options: [
                    { label: "Email", value: "email" },
                    { label: "SMS", value: "sms" },
                  ],
                },
              }}
            />
          </StoryCell>

          <StoryCell label="read-only">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/checkbox-group-field@1",
                instanceId: "states.checkboxGroup.readOnly",
                inputs: {
                  defaultValue: ["email"],
                  isReadOnly: true,
                  label: "Notification channels",
                  options: [
                    { label: "Email", value: "email" },
                    { label: "SMS", value: "sms" },
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
