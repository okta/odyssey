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

import React, { ChangeEvent, useState } from "react";
import type { Story } from "@storybook/react";
import { NativeSelect, NativeSelectProps } from "@okta/odyssey-react";
import { NativeSelect as Source } from "../../../../odyssey-react/src";

import NativeSelectMdx from "./NativeSelect.mdx";
import { action } from "@storybook/addon-actions";

export default {
  title: `Components/NativeSelect`,
  component: Source,
  parameters: {
    docs: {
      page: NativeSelectMdx,
    },
  },
  args: {
    label: "Select",
  },
  argTypes: {
    hint: { control: "text" },
    error: { control: "text" },
    label: { control: "text" },
    required: { control: "boolean" },
    disabled: { control: "boolean" },
  },
};

const Template: Story<NativeSelectProps> = (args) => (
  <NativeSelect {...args} name="my-select">
    <NativeSelect.Option>
      This is an extremely long option for testing what happens to text when it
      tries to overflow
    </NativeSelect.Option>
    <NativeSelect.Option>Option 2</NativeSelect.Option>
    <NativeSelect.Option>Option 3</NativeSelect.Option>
    <NativeSelect.Option>Option 4</NativeSelect.Option>
    <NativeSelect.Option>Option 5</NativeSelect.Option>
  </NativeSelect>
);

export const Default = Template.bind({});

export const OptionGroups = (): JSX.Element => (
  <NativeSelect label="Select Option Groups" name="grouped">
    <NativeSelect.OptionGroup label="Group 1">
      <NativeSelect.Option>Option 1</NativeSelect.Option>
      <NativeSelect.Option>Option 2</NativeSelect.Option>
    </NativeSelect.OptionGroup>
    <NativeSelect.OptionGroup label="Group 2">
      <NativeSelect.Option>Option 3</NativeSelect.Option>
      <NativeSelect.Option>Option 4</NativeSelect.Option>
      <NativeSelect.Option>Option 5</NativeSelect.Option>
    </NativeSelect.OptionGroup>
  </NativeSelect>
);

export const Controlled = (): JSX.Element => {
  const [value, setValue] = useState<string | undefined>();
  const name = "controlled-select";

  function handleChange(
    _event?: ChangeEvent<HTMLSelectElement> | undefined,
    value?: string | undefined
  ) {
    setValue(value);
  }

  return (
    <>
      <NativeSelect
        label="Controlled"
        name={name}
        value={value}
        onChange={handleChange}
        onBlur={action("on-blur")}
        onFocus={action("on-focus")}
      >
        <NativeSelect.Option>Option 1</NativeSelect.Option>
        <NativeSelect.Option>Option 2</NativeSelect.Option>
        <NativeSelect.Option>Option 3</NativeSelect.Option>
        <NativeSelect.Option>Option 4</NativeSelect.Option>
        <NativeSelect.Option>Option 5</NativeSelect.Option>
      </NativeSelect>
      <p
        style={{
          backgroundColor: "whitesmoke",
          fontFamily: "monospace",
          padding: "8px",
        }}
      >
        {name}: {value}
      </p>
    </>
  );
};
