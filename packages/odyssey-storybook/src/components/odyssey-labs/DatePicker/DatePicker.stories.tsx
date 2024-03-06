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
import { OdysseyProvider } from "@okta/odyssey-react-mui";
import { DateTime } from "luxon";

import {
  AdapterDateFns,
  DatePicker,
  DatePickerProps,
  datePickerTheme,
  LocalizationProvider,
} from "@okta/odyssey-react-mui/labs";

import { MuiThemeDecorator } from "../../../../.storybook/components";

const StorybookDatePicker = (props: DatePickerProps<DateTime>) => {
  const [value, setValue] = useState<Date | null>();

  const datePickerProps = useMemo(
    () => ({
      ...props,
      onChange: (date: Date | null, validationError: {}) => {
        // console.log({ newValue });
        console.log(typeof date === Date)
        setValue(date);
      },
      value,
    }),
    [props, value],
  );

  return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker {...datePickerProps} />
      </LocalizationProvider>
  );
};

const storybookMeta: Meta<DatePickerProps<DateTime>> = {
  title: "Labs Components/DatePicker",
  component: StorybookDatePicker,
  argTypes: {
    label: {
      control: "text",
      defaultValue: "DatePicker label",
    },
    onChange: {
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
    hint: {
      control: "text",
      description: "The hint text for the autocomplete input",
      table: {
        type: {
          summary: "string",
        },
      },
    },
  },
  decorators: [MuiThemeDecorator],
  tags: ["autodocs"],
};

export default storybookMeta;

export const DatePickerStandard: StoryObj<DatePickerProps<Date>> = {
  args: {
    label: "Choose a date",
    hint: "Use MM/DD/YYYY format",
  },
};
