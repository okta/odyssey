/*!
 * Copyright (c) 2021-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { useMemo, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "@storybook/jest";
import { userEvent, within, screen, waitFor } from "@storybook/testing-library";

import { odysseyTranslate } from "@okta/odyssey-react-mui";
import { DatePicker, DatePickerProps } from "@okta/odyssey-react-mui/labs";
import { axeRun } from "../../../axe-util";
import { fieldComponentPropsMetaData } from "../../../fieldComponentPropsMetaData";
import { MuiThemeDecorator } from "../../../../.storybook/components";

const storybookMeta: Meta<DatePickerProps> = {
  title: "Labs Components/DatePicker",
  component: DatePicker,
  argTypes: {
    label: {
      control: "text",
      defaultValue: "DatePicker label",
    },
    onCalendarDateChange: {
      control: "function",
    },
    defaultValue: {
      description:
        "A date object passed into the component to pre-fill the input",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    errorMessage: fieldComponentPropsMetaData.errorMessage,
    hint: {
      control: "text",
      description: "The hint text for the autocomplete input",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    isDisabled: fieldComponentPropsMetaData.isDisabled,
    isOptional: fieldComponentPropsMetaData.isOptional,
    isReadOnly: fieldComponentPropsMetaData.isReadOnly,
    minDate: {
      description: "the minimum selectable date enabled in the calendar",
      table: {
        type: {
          summary: "Date",
        },
      },
    },
    maxDate: {
      description: "the maximum selectable date enabled in the calendar",
      table: {
        type: {
          summary: "Date",
        },
      },
    },
  },
  args: {
    label: "Date picker label",
    hint: "Select a date.",
  },
  decorators: [MuiThemeDecorator],
  tags: ["autodocs"],
};

export default storybookMeta;

export const Default: StoryObj<DatePickerProps> = {};

export const Disabled: StoryObj<DatePickerProps> = {
  args: {
    isDisabled: true,
  },
};

export const ReadOnly: StoryObj<DatePickerProps> = {
  args: {
    isReadOnly: true,
  },
};

export const Error: StoryObj<DatePickerProps> = {
  args: {
    errorMessage: "Select a date",
  },
};

export const MinDate: StoryObj<DatePickerProps> = {
  args: {
    hint: "Select a date after July 16, 2024",
    minDate: "2024-07-16",
  },
};

export const MinDateWithError: StoryObj<DatePickerProps> = {
  args: {
    hint: "Select a date after July 16, 2024",
    minDate: "2024-07-16T03:00:00.000Z",
    value: "2024-07-11T03:00:00.000Z",
  },
  play: async ({ canvasElement, step }) => {
    await step(
      "expect min date error when value is less than minDate",
      async () => {
        const canvas = within(canvasElement);

        await waitFor(() => {
          expect(
            canvas.getByText(odysseyTranslate("picker.error.mindate")),
          ).toBeInTheDocument();
        });
      },
    );
  },
};

export const MaxDate: StoryObj<DatePickerProps> = {
  args: {
    hint: "Select a date before July 19, 2024",
    maxDate: "2024-07-18",
  },
};

export const MaxDateWithError: StoryObj<DatePickerProps> = {
  args: {
    hint: "Select a date before July 18, 2024",
    maxDate: "2024-07-18T03:00:00.000Z",
    value: "2024-07-21T03:00:00.000Z",
  },
  play: async ({ canvasElement, step }) => {
    await step(
      "expect max date error when value is less than minDate",
      async () => {
        const canvas = within(canvasElement);

        await waitFor(() => {
          expect(
            canvas.getByText(odysseyTranslate("picker.error.maxdate")),
          ).toBeInTheDocument();
        });
      },
    );
  },
};

export const WithTimeZonePicker: StoryObj<DatePickerProps> = {
  args: {
    timeZonePickerLabel: "Timezone picker label",
    timeZoneOptions: [
      { label: "New York", value: "America/New_York" },
      { label: "Johannesburg", value: "Africa/Johannesburg" },
      { label: "Hong Kong", value: "Asia/Hong_Kong" },
    ],
  },
};

export const Controlled: StoryObj<DatePickerProps> = {
  args: {
    timeZonePickerLabel: "Timezone picker label",
    timeZone: "America/New_York",
    timeZoneOptions: [
      { label: "LA", value: "America/Los_Angeles" },
      { label: "New York", value: "America/New_York" },
      { label: "Johannesburg", value: "Africa/Johannesburg" },
      { label: "Hong Kong", value: "Asia/Hong_Kong" },
    ],
  },
  render: function C({ ...props }) {
    const [value, setValue] = useState<string>("2024-07-11T03:00:00.000Z");

    const datePickerProps: DatePickerProps = useMemo(
      () => ({
        ...props,
        onCalendarDateChange: ({ value }) => {
          if (value) {
            setValue(value);
          }
        },
        onInputChange: (value) => {
          if (value) {
            setValue(value);
          }
        },
        value,
      }),
      [props, value],
    );

    return <DatePicker {...datePickerProps} />;
  },
  play: async ({ canvasElement, step }) => {
    await step("select date", async () => {
      const canvas = within(canvasElement);
      await waitFor(async () => {
        const datepickerCalendarOpenButton = canvas.getByLabelText(
          odysseyTranslate("picker.labels.date.choose"),
        );
        await userEvent.click(datepickerCalendarOpenButton);

        const dialog = screen.getByRole("dialog");
        const dialogCanvas = within(dialog);
        const dateButton = dialogCanvas.getByText("26");
        await userEvent.click(dateButton);
      });

      const input = canvas.getByRole("textbox") as HTMLInputElement;
      expect(input.value).toBe("07/26/2024");

      await step("Check for a11y errors", async () => {
        await waitFor(() => axeRun("Selecting a date"));
      });
    });
  },
};
