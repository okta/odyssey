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
import { screen, userEvent, waitFor, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

import { DatePicker, DatePickerProps } from "@okta/odyssey-react-mui/labs";

import { fieldComponentPropsMetaData } from "../../../fieldComponentPropsMetaData";
import { MuiThemeDecorator } from "../../../../.storybook/components";
import { axeRun } from "../../../axe-util";
import type { PlaywrightProps } from "../../odyssey-mui/storybookTypes";

const findInputElement = async ({
  canvasElement,
  step,
}: PlaywrightProps<DatePickerProps>) => {
  await step("Find Input", async () => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText("MM/DD/YYYY") as HTMLInputElement;
    await userEvent.click(input);
  });
};

const clickCalendarButton = async ({
  canvasElement,
  step,
}: PlaywrightProps<DatePickerProps>) => {
  await step("Click Calendar Button", async () => {
    const canvas = within(canvasElement);
    const buttonElement = canvas.getByLabelText("Choose date");
    await userEvent.click(buttonElement);
  });
};

const openCalendarAndSelectDate =
  ({ canvasElement, step }: PlaywrightProps<DatePickerProps>) =>
  async (actionName: string) => {
    await step("select date", async ({ args }) => {
      // I don't know why this doesn't work without this step
      await findInputElement({ canvasElement, step });
      await clickCalendarButton({ canvasElement, step });
      await waitFor(() => {
        axeRun(actionName);
      });
      const calendar = await screen.findByRole("dialog");
      const calendarCanvas = within(calendar);
      const date = calendarCanvas.getByText("14");
      await userEvent.click(date);
      await expect(args.onCalendarDateChange).toHaveBeenCalledTimes(1);
    });
  };

const openCalendarAndCheckForDisabledDate =
  ({
    canvasElement,
    step,
    buttonText,
  }: PlaywrightProps<DatePickerProps> & { buttonText: string }) =>
  async (actionName: string) => {
    await step("attempt to select disabled date", async ({ args }) => {
      // I don't know why this doesn't work without this step
      await findInputElement({ canvasElement, step });
      await clickCalendarButton({ canvasElement, step });
      await waitFor(() => {
        axeRun(actionName);
      });
      const calendar = await screen.findByRole("dialog");
      const calendarCanvas = within(calendar);
      const date = calendarCanvas.getByText(buttonText);
      await expect(date).toBeDisabled();
      await expect(args.onCalendarDateChange).toHaveBeenCalledTimes(0);
      // close the calendar
      await userEvent.click(canvasElement);
    });
  };

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

export const Default: StoryObj<DatePickerProps> = {
  play: async ({ canvasElement, step }) => {
    await openCalendarAndSelectDate({ canvasElement, step })(
      "Default calendar select date",
    );
  },
};

export const Error: StoryObj<DatePickerProps> = {
  args: {
    errorMessage: "Select a date.",
  },
};

export const MinDate: StoryObj<DatePickerProps> = {
  args: {
    hint: "Select a date after July 16, 2024",
    minDate: new Date("7-17-2024"),
  },
  play: async ({ canvasElement, step }) => {
    await openCalendarAndCheckForDisabledDate({
      canvasElement,
      step,
      buttonText: "16",
    })("Attempt to select disabled date before min date");
  },
};

export const MaxDate: StoryObj<DatePickerProps> = {
  args: {
    hint: "Select a date before July 18, 2024.",
    maxDate: new Date("7-17-2024"),
    value: new Date("7-17-2024"),
  },
  play: async ({ canvasElement, step }) => {
    await openCalendarAndCheckForDisabledDate({
      canvasElement,
      step,
      buttonText: "18",
    })("Attempt to select disabled date after max date");
  },
};

export const Controlled: StoryObj<DatePickerProps> = {
  args: {
    hint: "The date was provided by {the user/a field}.",
  },
  render: function C({ ...props }) {
    const [value, setValue] = useState<Date>(new Date("7-17-2024"));
    const datePickerProps: DatePickerProps = useMemo(
      () => ({
        ...props,
        onCalendarDateChange: (value) => {
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
};
