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
import type { Meta, Story } from "@storybook/react";
import { OdysseyThemeProvider } from "@okta/odyssey-react-mui";
import {
  AdapterDateFns,
  DatePicker,
  DatePickerProps,
  datePickerTheme,
  LocalizationProvider,
} from "@okta/odyssey-react-labs";

import DatePickerMdx from "./DatePicker.mdx";
import { MuiThemeDecorator } from "../../../../.storybook/components/MuiThemeDecorator";

const storybookMeta: Meta<DatePickerProps<unknown, unknown>> = {
  title: `Labs Components/DatePicker`,
  component: DatePicker,
  parameters: {
    docs: {
      page: DatePickerMdx,
    },
  },
  argTypes: {
    label: {
      control: "text",
      defaultValue: "DatePicker label",
    },
    onChange: {
      control: "function",
    },
    value: {
      control: "text",
      defaultValue: null,
    },
  },
  decorators: [MuiThemeDecorator],
};

export default storybookMeta;

const Template: Story<DatePickerProps<unknown, unknown>> = (props) => {
  const [value, setValue] = useState<unknown>(Date.now());
  const datePickerProps = useMemo(
    () => ({
      ...props,
      onChange: (newValue: unknown) => setValue(newValue),
      value,
    }),
    [props, value]
  );

  return (
    <OdysseyThemeProvider themeOverride={datePickerTheme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker {...datePickerProps} />
      </LocalizationProvider>
    </OdysseyThemeProvider>
  );
};

export const DatePickerStandard = Template.bind({});
