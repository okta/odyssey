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

// Every date below is a fixed ISO instant rendered as an absolute date, never
// through a relative-time formatter. A relative label computed from a fixed
// fixture drifts as time passes and produces a fresh visual diff every month.
// Every seeded entry also pins `timeZone` to UTC, which is the zone the seeds are
// written in. Left unset, the field renders in the machine's own zone, so the
// captured time would shift with the runner and the hint would be wrong.
const storybookMeta: Meta<OdysseyBlueprintRendererProps> = {
  component: OdysseyBlueprintRenderer,
  decorators: [OdysseyBlueprintStorybookThemeDecorator],
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs", "alpha"],
  args: {
    blueprint: {
      from: "odyssey-blueprint/datetime-picker@1",
      instanceId: "playground.startsAt",
      inputs: {
        defaultValue: "2026-03-04T05:06:00.000Z",
        hint: "Times are shown in UTC",
        label: "Starts at",
        timeZone: "UTC",
      },
    },
  },
};

export default storybookMeta;

type Story = StoryObj<OdysseyBlueprintRendererProps>;

export const Playground: Story = {};

// One renderer per cell rather than one blueprint holding every field:
// `OdysseyBlueprintRenderer` takes a single root entry, and each entry needs its
// own `instanceId` because instance registration is keyed by it.
export const AllVariants: Story = {
  parameters: staticBoardParameters,
  render: function C() {
    return (
      <StorySection title="Seeded and empty, plus the time zone picker the field renders when given options.">
        <StoryGrid columns={2}>
          <StoryCell label="datetime-picker@1, seeded">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/datetime-picker@1",
                instanceId: "variants.seeded",
                inputs: {
                  defaultValue: "2026-03-04T05:06:00.000Z",
                  label: "Starts at",
                  timeZone: "UTC",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="datetime-picker@1, empty">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/datetime-picker@1",
                instanceId: "variants.empty",
                inputs: { label: "Starts at" },
              }}
            />
          </StoryCell>

          <StoryCell label="datetime-picker@1, time zone picker">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/datetime-picker@1",
                instanceId: "variants.timeZone",
                inputs: {
                  defaultValue: "2026-03-04T05:06:00.000Z",
                  label: "Starts at",
                  timeZone: "UTC",
                  timeZoneOptions: [
                    { label: "UTC", value: "UTC" },
                    { label: "America/Denver", value: "America/Denver" },
                    { label: "Europe/Dublin", value: "Europe/Dublin" },
                  ],
                  timeZonePickerLabel: "Time zone",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="datetime-picker@1, bounded range">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/datetime-picker@1",
                instanceId: "variants.bounded",
                inputs: {
                  defaultValue: "2026-03-04T05:06:00.000Z",
                  hint: "Within the first half of 2026",
                  label: "Starts at",
                  maxDate: "2026-06-30T23:59:00.000Z",
                  minDate: "2026-01-01T00:00:00.000Z",
                  timeZone: "UTC",
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
      <StorySection title="Every prop-driven state the field supports.">
        <StoryGrid columns={3}>
          <StoryCell label="datetime-picker, hint">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/datetime-picker@1",
                instanceId: "states.hint",
                inputs: {
                  defaultValue: "2026-03-04T05:06:00.000Z",
                  hint: "Times are shown in UTC",
                  label: "Starts at",
                  timeZone: "UTC",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="datetime-picker, error">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/datetime-picker@1",
                instanceId: "states.error",
                inputs: {
                  defaultValue: "2026-03-04T05:06:00.000Z",
                  errorMessage: "Pick a time after the campaign starts",
                  label: "Starts at",
                  timeZone: "UTC",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="datetime-picker, optional">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/datetime-picker@1",
                instanceId: "states.optional",
                inputs: { isOptional: true, label: "Starts at" },
              }}
            />
          </StoryCell>

          <StoryCell label="datetime-picker, disabled">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/datetime-picker@1",
                instanceId: "states.disabled",
                inputs: {
                  defaultValue: "2026-03-04T05:06:00.000Z",
                  isDisabled: true,
                  label: "Starts at",
                  timeZone: "UTC",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="datetime-picker, read only">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/datetime-picker@1",
                instanceId: "states.readOnly",
                inputs: {
                  defaultValue: "2026-03-04T05:06:00.000Z",
                  isReadOnly: true,
                  label: "Starts at",
                  timeZone: "UTC",
                },
              }}
            />
          </StoryCell>
        </StoryGrid>
      </StorySection>
    );
  },
};
