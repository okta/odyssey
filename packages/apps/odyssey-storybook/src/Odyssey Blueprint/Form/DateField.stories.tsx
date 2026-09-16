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

// Every date entry pins `timeZone` to UTC and seeds fixed dates. The default is
// the viewer's own zone, which renders a UTC-midnight seed as the previous day
// west of Greenwich and would make each visual capture depend on where it ran.
const storybookMeta: Meta<OdysseyBlueprintRendererProps> = {
  component: OdysseyBlueprintRenderer,
  decorators: [OdysseyBlueprintStorybookThemeDecorator],
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs", "alpha"],
  args: {
    blueprint: {
      from: "odyssey-blueprint/date-field@1",
      instanceId: "playground.date",
      inputs: {
        hint: "Select the date the user was enrolled.",
        label: "Enrollment date",
        timeZone: "UTC",
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
// No `AllVariants` or `AllSizes` board: The inline time-zone picker is a state of the same block rather than a
// separate variant, since `timeZoneOptions` is what turns it on.
export const AllStates: Story = {
  parameters: staticBoardParameters,
  render: function C() {
    return (
      <StorySection title="Every prop-driven state date-field@1 supports.">
        <StoryGrid columns={3}>
          <StoryCell label="hint">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/date-field@1",
                instanceId: "states.date.hint",
                inputs: {
                  hint: "Select the date the user was enrolled.",
                  label: "Enrollment date",
                  timeZone: "UTC",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="optional">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/date-field@1",
                instanceId: "states.date.optional",
                inputs: {
                  isOptional: true,
                  label: "Enrollment date",
                  timeZone: "UTC",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="error">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/date-field@1",
                instanceId: "states.date.error",
                inputs: {
                  errorMessage:
                    "The selected date is not valid. Choose a real calendar date.",
                  label: "Enrollment date",
                  timeZone: "UTC",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="disabled">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/date-field@1",
                instanceId: "states.date.disabled",
                inputs: {
                  defaultValue: "2026-03-15",
                  hint: "This date is locked and cannot be changed.",
                  isDisabled: true,
                  label: "Enrollment date",
                  timeZone: "UTC",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="read-only">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/date-field@1",
                instanceId: "states.date.readOnly",
                inputs: {
                  defaultValue: "2026-03-15",
                  isReadOnly: true,
                  label: "Enrollment date",
                  timeZone: "UTC",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="min and max">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/date-field@1",
                instanceId: "states.date.minMax",
                inputs: {
                  hint: "Must fall within the current calendar year.",
                  label: "Policy effective date",
                  maxDate: "2026-12-31",
                  minDate: "2026-01-01",
                  timeZone: "UTC",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="seeded">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/date-field@1",
                instanceId: "variants.date",
                inputs: {
                  defaultValue: "2026-03-15",
                  label: "Enrollment date",
                  timeZone: "UTC",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="inline time-zone picker">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/date-field@1",
                instanceId: "variants.dateWithTimeZone",
                inputs: {
                  defaultValue: "2026-03-15",
                  label: "Enrollment date",
                  timeZone: "UTC",
                  timeZoneOptions: [
                    { label: "UTC", value: "UTC" },
                    {
                      label: "Eastern Time, New York",
                      value: "America/New_York",
                    },
                  ],
                  timeZonePickerLabel: "Time zone",
                },
              }}
            />
          </StoryCell>
        </StoryGrid>
      </StorySection>
    );
  },
};
