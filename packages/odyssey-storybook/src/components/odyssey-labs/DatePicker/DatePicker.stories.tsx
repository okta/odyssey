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

import React, { useEffect, useRef, useState } from "react";
import type { Story } from "@storybook/react";
import {
  InputBase,
  InputBaseProps,
  OdysseyThemeProvider,
} from "@okta/odyssey-react-mui";
import {
  AdapterDateFns,
  DatePicker,
  DatePickerProps,
  datePickerTheme,
  LocalizationProvider,
} from "@okta/odyssey-react-labs";

import DatePickerMdx from "./DatePicker.mdx";

export default {
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
      defaultValue: () => "",
    },
    renderInput: {
      control: "function",
      defaultValue: ({
        InputProps,
        ...props
      }: {
        InputProps: InputBaseProps;
      }) => {
        const combinedProps = {
          ...InputProps,
          ...props,
        };

        return <InputBase {...combinedProps} />;
      },
    },
    value: {
      control: "text",
      defaultValue: null,
    },
  },
};

const Template: Story<DatePickerProps<unknown, unknown>> = (props) => {
  const [value, setValue] = useState<unknown>(Date.now());
  const datePickerProps = {
    ...props,
    value,
    onChange: (newValue: unknown) => setValue(newValue),
  };

  // TEMP: REMOVE THIS
  useEffect(() => {
    // ts-expect-error
    document.querySelector(".MuiIconButton-root").click();
  }, []);

  return (
    <OdysseyThemeProvider customTheme={datePickerTheme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker {...datePickerProps} />
      </LocalizationProvider>
    </OdysseyThemeProvider>
  );
};

export const DatePickerPrimary = Template.bind({});
