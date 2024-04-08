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

import {
  AdapterDateFns,
  DatePicker,
  DatePickerProps,
  LocalizationProvider,
} from "@okta/odyssey-react-mui/labs";

import { fieldComponentPropsMetaData } from "../../../fieldComponentPropsMetaData";
import { MuiThemeDecorator } from "../../../../.storybook/components";

const StorybookDatePicker = (props: DatePickerProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker {...props} />
    </LocalizationProvider>
  );
};

const storybookMeta: Meta<DatePickerProps> = {
  title: "Labs Components/DatePicker",
  component: StorybookDatePicker,
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
  },
  decorators: [MuiThemeDecorator],
  tags: ["autodocs"],
};

export default storybookMeta;

export const Default: StoryObj<DatePickerProps> = {
  args: {
    label: "Choose a date",
    hint: "Use MM/DD/YYYY format",
  },
};

export const Error: StoryObj<DatePickerProps> = {
  args: {
    label: "Choose a date",
    hint: "Use MM/DD/YYYY format",
    errorMessage: "Some error message here"
  },
};

export const Controlled: StoryObj<DatePickerProps> = {
  args: {
    label: "Choose a date",
    hint: "Use MM/DD/YYYY format",
  },
  render: (props) => {
    const [value, setValue] = useState<Date>(new Date());
    const datePickerProps: DatePickerProps = useMemo(
      () => ({
        ...props,
        onChange: ({ value }) => {
          console.warn("story on change called")
          if (value) {
            setValue(value);
          }
        },
        // onInputChange: ({ value }) => {
        //   console.log('wtf')
        //   if (value) {
        //     setValue(value);
        //   }
        // },
        value,
      }),
      [props, value],
    );

    return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker {...datePickerProps} />
      </LocalizationProvider>
    );
  }
};