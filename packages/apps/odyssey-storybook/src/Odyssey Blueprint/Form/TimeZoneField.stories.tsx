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
      from: "odyssey-blueprint/time-zone-field@1",
      instanceId: "playground.timeZone",
      inputs: {
        label: "Time zone",
        // Spelled out rather than left to the runtime's own IANA list, which
        // differs by browser version and would drift the capture.
        timeZoneOptions: [
          { label: "Eastern Time, New York", value: "America/New_York" },
          { label: "Central Time, Chicago", value: "America/Chicago" },
          { label: "Mountain Time, Denver", value: "America/Denver" },
          { label: "Pacific Time, Los Angeles", value: "America/Los_Angeles" },
          { label: "UTC", value: "UTC" },
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
// No `AllVariants` or `AllSizes` board: `TimeZonePicker` accepts five props, so the state list is short by design.
export const AllStates: Story = {
  parameters: staticBoardParameters,
  render: function C() {
    return (
      <StorySection title="Every prop-driven state time-zone-field@1 supports.">
        <StoryGrid columns={2}>
          <StoryCell label="seeded">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/time-zone-field@1",
                instanceId: "states.timeZone.seeded",
                inputs: {
                  defaultValue: "America/New_York",
                  label: "Time zone",
                  timeZoneOptions: [
                    {
                      label: "Eastern Time, New York",
                      value: "America/New_York",
                    },
                    { label: "UTC", value: "UTC" },
                  ],
                },
              }}
            />
          </StoryCell>

          <StoryCell label="read-only">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/time-zone-field@1",
                instanceId: "states.timeZone.readOnly",
                inputs: {
                  defaultValue: "America/Los_Angeles",
                  isReadOnly: true,
                  label: "Time zone",
                  timeZoneOptions: [
                    {
                      label: "Pacific Time, Los Angeles",
                      value: "America/Los_Angeles",
                    },
                    { label: "UTC", value: "UTC" },
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
