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
      from: "odyssey-blueprint/date-range-field@1",
      instanceId: "playground.dateRange",
      inputs: {
        endDateLabel: "Access end",
        hint: "The window the user keeps access for.",
        startDateLabel: "Access start",
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
// No `AllVariants` or `AllSizes` board: The block renders two `DatePicker`s as one field, which is its only form.
export const AllStates: Story = {
  parameters: staticBoardParameters,
  render: function C() {
    return (
      <StorySection title="Every prop-driven state date-range-field@1 supports.">
        <StoryGrid columns={2}>
          <StoryCell label="seeded">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/date-range-field@1",
                instanceId: "states.dateRange.seeded",
                inputs: {
                  defaultValue: {
                    endDate: "2026-04-30",
                    startDate: "2026-04-01",
                  },
                  endDateLabel: "Access end",
                  startDateLabel: "Access start",
                  timeZone: "UTC",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="error">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/date-range-field@1",
                instanceId: "states.dateRange.error",
                inputs: {
                  endDateLabel: "Access end",
                  errorMessage: "The start date must fall before the end date.",
                  startDateLabel: "Access start",
                  timeZone: "UTC",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="disabled">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/date-range-field@1",
                instanceId: "states.dateRange.disabled",
                inputs: {
                  defaultValue: {
                    endDate: "2026-04-30",
                    startDate: "2026-04-01",
                  },
                  endDateLabel: "Access end",
                  isDisabled: true,
                  startDateLabel: "Access start",
                  timeZone: "UTC",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="min and max">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/date-range-field@1",
                instanceId: "states.dateRange.minMax",
                inputs: {
                  endDateLabel: "Report end",
                  hint: "Reports are available for the last 90 days.",
                  maxDate: "2026-05-07",
                  minDate: "2026-02-05",
                  startDateLabel: "Report start",
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
