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
import { expect, userEvent, waitFor, within } from "@storybook/test";

import { odysseyTranslate } from "@okta/odyssey-react-mui";
import {
  DateTimePicker,
  DateTimePickerProps,
} from "@okta/odyssey-react-mui/labs";
import { axeRun } from "../../../axe-util.js";
import { fieldComponentPropsMetaData } from "../../../fieldComponentPropsMetaData.js";
import { MuiThemeDecorator } from "../../../../.storybook/components/index.js";

const storybookMeta: Meta<DateTimePickerProps> = {
  title: "Labs Components/DateTimePicker",
  component: DateTimePicker,
  argTypes: {
    label: {
      control: "text",
      defaultValue: "DateTimePicker label",
    },
    onCalendarDateChange: {},
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
    hint: fieldComponentPropsMetaData.hint,
    HintLinkComponent: fieldComponentPropsMetaData.HintLinkComponent,
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
    timeZone: {
      description: "an IANA time zone applied to the DatePicker",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    timeZonePickerLabel: {
      description:
        "label applied to the `TimeZonePicker` field if `TimeZonePicker` field is rendered",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    timeZoneOptions: {
      description: "an array of options for the TimeZonePicker",
      table: {
        type: {
          summary: "[{label: string, value: string(valid IANA time zone)}]",
        },
      },
    },
  },
  args: {
    label: "DateTime picker label",
    hint: "Select a date.",
  },
  decorators: [MuiThemeDecorator],
  tags: ["autodocs"],
};

export default storybookMeta;

export const Default: StoryObj<DateTimePickerProps> = {};

export const Disabled: StoryObj<DateTimePickerProps> = {
  args: {
    isDisabled: true,
  },
};

export const ReadOnly: StoryObj<DateTimePickerProps> = {
  args: {
    isReadOnly: true,
    value: "2024-07-11T03:00:00.000Z",
  },
};

export const Error: StoryObj<DateTimePickerProps> = {
  args: {
    errorMessage: "Select a date",
  },
};

export const MinDate: StoryObj<DateTimePickerProps> = {
  args: {
    hint: "Select a date after July 16, 2024",
    minDate: "2024-07-16",
  },
};

export const MinDateWithError: StoryObj<DateTimePickerProps> = {
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

export const MaxDate: StoryObj<DateTimePickerProps> = {
  args: {
    hint: "Select a date before July 19, 2024",
    maxDate: "2024-07-18",
  },
};

export const MaxDateWithError: StoryObj<DateTimePickerProps> = {
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

export const WithTimeZonePicker: StoryObj<DateTimePickerProps> = {
  args: {
    timeZonePickerLabel: "Time zone picker label",
    timeZoneOptions: [
      { label: "New York", value: "America/New_York" },
      { label: "Johannesburg", value: "Africa/Johannesburg" },
      { label: "Hong Kong", value: "Asia/Hong_Kong" },
    ],
  },
};

export const Controlled: StoryObj<DateTimePickerProps> = {
  args: {
    timeZonePickerLabel: "Time zone picker label",
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

    const dateTimePickerProps: DateTimePickerProps = useMemo(
      () => ({
        ...props,
        onCalendarDateChange: ({ value }) => {
          if (typeof value === "string") {
            setValue(value);
          }
        },
        onInputChange: (value) => {
          if (typeof value === "string") {
            setValue(value);
          }
        },
        value,
      }),
      [props, value],
    );

    return <DateTimePicker {...dateTimePickerProps} />;
  },
  play: async ({ canvasElement, step }) => {
    await step("select date", async () => {
      const canvas = within(canvasElement);

      // Hack because of MUI `DateTimePicker` issues.
      await new Promise((resolve) => {
        setTimeout(resolve, 250);
      });

      const datepickerCalendarOpenButton = await canvas.findByLabelText(
        odysseyTranslate("picker.labels.date.choose"),
      );

      await userEvent.click(datepickerCalendarOpenButton);

      const dialog = await within(canvasElement.ownerDocument.body).findByRole(
        "dialog",
      );

      const dialogCanvas = within(dialog);
      const dateButton = dialogCanvas.getByText("26");
      await userEvent.click(dateButton);

      const input = canvas.getByRole<HTMLInputElement>("textbox");
      expect(input.value).toBe("07/26/2024 11:00 PM");
    });

    await step("Check for a11y errors", async () => {
      await waitFor(() => axeRun("Selecting a date"));
    });
  },
};
