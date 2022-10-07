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

import type { Story } from "@storybook/react";
import { PasswordInput, PasswordInputProps } from "@okta/odyssey-react-mui";
import { MuiThemeDecorator } from "../../../../.storybook/components";

import PasswordInputMdx from "./PasswordInput.mdx";

export default {
  title: `MUI Components/Forms/PasswordInput`,
  component: PasswordInput,
  parameters: {
    docs: {
      page: PasswordInputMdx,
    },
  },
  args: {
    label: "Destination",
    required: true,
    tooltipLabel: (isHidden: boolean): string =>
      isHidden ? "Show password" : "Hide password",
  },
  argTypes: {
    defaultValue: { control: "text" },
    disabled: { control: "boolean" },
    id: { control: "text" },
    name: { control: "text" },
    placeholder: { control: "text" },
    readonly: { control: "boolean" },
    required: { control: "boolean" },
    value: { control: "text" },
  },
  decorators: [MuiThemeDecorator],
};

const Template: Story<PasswordInputProps> = (props) => (
  <PasswordInput {...props} />
);

export const Password = Template.bind({});
Password.args = {};

export const Styled = Template.bind({});
Styled.args = {
  sx: {
    "& .MuiButtonBase-root": { backgroundColor: "lightcoral" },
  },
};

export const CustomAttributes = Template.bind({});
CustomAttributes.args = {
  inputProps: {
    "data-test": "my-test-query-hook",
  },
};
