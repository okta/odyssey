/*!
 * Copyright (c) 2025-present, Okta, Inc. and/or its affiliates. All rights reserved.
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
  DateTimeRangePicker,
  type DateTimeRangePickerProps,
  type DateTimeRangePickerValue,
} from "@okta/odyssey-contributions-orpheus-components";
import { useState } from "react";
import { userEvent, within } from "storybook/test";

import { OdysseyStorybookThemeDecorator } from "../../tools/OdysseyStorybookThemeDecorator.js";
import { OrpheusComponentsStorybookThemeDecorator } from "../../tools/OrpheusComponentsStorybookThemeDecorator.js";

const meta = {
  component: DateTimeRangePicker,
  decorators: [
    OdysseyStorybookThemeDecorator,
    OrpheusComponentsStorybookThemeDecorator,
  ],
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A date and time range picker. The read-only input opens a popover that walks the user through two steps: pick the start date and time, choose Next, then pick the end and choose Done to commit. The end step cannot select a moment before the start. The displayed value and every label are localized.",
      },
    },
  },
  argTypes: {
    errorMessage: {
      control: "text",
      description:
        "If `errorMessage` is not undefined, the input will indicate an error.",
      table: { type: { summary: "string" } },
    },
    hint: {
      control: "text",
      description: "The helper text content.",
      table: { type: { summary: "string" } },
    },
    id: {
      control: "text",
      description:
        "The id of the `input` element. Auto-generated when not provided.",
      table: { type: { summary: "string" } },
    },
    isDateEnabled: {
      description:
        "Disable specific date(s). This function can be called many times while the calendar renders, so keep it cheap.",
      table: { type: { summary: "(date: Date) => boolean" } },
    },
    isDisabled: {
      control: "boolean",
      description: "If `true`, the component is disabled.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    isMonthEnabled: {
      description: "Disable specific month(s).",
      table: { type: { summary: "(date: Date) => boolean" } },
    },
    isOptional: {
      control: "boolean",
      description: "If `true`, the `input` element is not required.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    isYearEnabled: {
      description: "Disable specific year(s).",
      table: { type: { summary: "(date: Date) => boolean" } },
    },
    label: {
      control: "text",
      description:
        'The label for the `input` element. Falls back to a localized "Date range".',
      table: { type: { summary: "string" } },
    },
    maxDate: {
      control: "text",
      description:
        "Maximum date allowed. Ignored if it is not a valid date string in ISO format.",
      table: { type: { summary: "string (ISO 8601)" } },
    },
    minDate: {
      control: "text",
      description:
        "Minimum date allowed. Ignored if it is not a valid date string in ISO format.",
      table: { type: { summary: "string (ISO 8601)" } },
    },
    onChange: {
      description:
        "Called with the committed range when the user confirms the end step.",
      table: { type: { summary: "(value: DateTimeRangePickerValue) => void" } },
    },
    value: {
      description:
        "The selected range when controlled. `start` and `end` must be date strings in ISO format or they will not be applied. These stories use it to seed their initial range.",
      table: {
        type: { summary: "{ start: string | null; end: string | null }" },
      },
    },
  },
  render: function C({
    value: initialRange,
    ...props
  }: DateTimeRangePickerProps) {
    const [range, setRange] = useState<DateTimeRangePickerValue>(
      initialRange ?? { end: null, start: null },
    );

    return <DateTimeRangePicker {...props} onChange={setRange} value={range} />;
  },
} satisfies Meta<typeof DateTimeRangePicker>;

export default meta;

export const Default: StoryObj<DateTimeRangePickerProps> = {};

export const WithInitialRange: StoryObj<DateTimeRangePickerProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "Starts with a committed range. Reopening the popover restores both selections as drafts.",
      },
    },
  },
  args: {
    value: {
      end: "2024-07-15T14:30:00",
      start: "2024-07-01T09:00:00",
    },
  },
};

export const WithHint: StoryObj<DateTimeRangePickerProps> = {
  args: {
    hint: "Select the backup window for this recovery point.",
    label: "Recovery window",
  },
};

export const WithError: StoryObj<DateTimeRangePickerProps> = {
  args: {
    errorMessage: "End date must be within 30 days of start.",
    value: {
      end: "2024-08-15T00:00:00",
      start: "2024-07-01T00:00:00",
    },
  },
};

export const Disabled: StoryObj<DateTimeRangePickerProps> = {
  args: {
    isDisabled: true,
    value: {
      end: "2024-07-15T14:30:00",
      start: "2024-07-01T09:00:00",
    },
  },
};

export const WithMinMax: StoryObj<DateTimeRangePickerProps> = {
  parameters: {
    docs: {
      description: {
        story: "Restricts selection to July 2024. Dates outside are disabled.",
      },
    },
  },
  args: {
    maxDate: "2024-07-31T23:59:59",
    minDate: "2024-07-01T00:00:00",
  },
};

export const StartStep: StoryObj<DateTimeRangePickerProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "The first step of the wizard, where the start moment is chosen.",
      },
    },
  },
  args: {
    value: {
      end: "2024-07-15T14:30:00",
      start: "2024-07-01T09:00:00",
    },
  },
  play: async ({ canvasElement, step }) => {
    await step("Open the range popover", async () => {
      const canvas = within(canvasElement);
      await userEvent.click(
        canvas.getByRole("button", { name: "Open date range picker" }),
      );
    });
  },
};

export const EndStep: StoryObj<DateTimeRangePickerProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "The second step, which highlights the selected range across the calendar and disables anything before the start.",
      },
    },
  },
  args: {
    value: {
      end: "2024-07-15T14:30:00",
      start: "2024-07-01T09:00:00",
    },
  },
  play: async ({ canvasElement, step }) => {
    await step("Open the range popover", async () => {
      const canvas = within(canvasElement);
      await userEvent.click(
        canvas.getByRole("button", { name: "Open date range picker" }),
      );
    });

    await step("Advance to the end step", async () => {
      // The popover portals to the body, so it is outside the story canvas.
      await userEvent.click(
        within(document.body).getByRole("button", { name: "Next" }),
      );
    });
  },
};
