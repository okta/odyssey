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

import { DatePicker, DatePickerProps } from "@okta/odyssey-react-mui/labs";

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
    label: "Choose a date",
    hint: "Use MM/DD/YYYY format",
  },
  decorators: [MuiThemeDecorator],
  tags: ["autodocs"],
};

export default storybookMeta;

export const Default: StoryObj<DatePickerProps> = {};

export const Error: StoryObj<DatePickerProps> = {
  args: {
    errorMessage: "Some error message here",
  },
};

export const MinDate: StoryObj<DatePickerProps> = {
  args: {
    hint: "Date must be in the future",
    minDate: new Date(),
  },
};

export const MaxDate: StoryObj<DatePickerProps> = {
  args: {
    hint: "Date must be in the past",
    maxDate: new Date(),
  },
};

export const Controlled: StoryObj<DatePickerProps> = {
  args: {
    label: "Choose a date",
    hint: "Use MM/DD/YYYY format",
  },
  render: function C({ ...props }) {
    const [value, setValue] = useState<Date>(new Date());
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
