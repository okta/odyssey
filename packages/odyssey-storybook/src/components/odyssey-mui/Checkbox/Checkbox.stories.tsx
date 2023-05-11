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

import { Checkbox, CheckboxProps } from "@okta/odyssey-react-mui";
import { Meta, StoryObj } from "@storybook/react";

import { MuiThemeDecorator } from "../../../../.storybook/components";
import CheckboxMdx from "./Checkbox.mdx";
import { userEvent, within } from "@storybook/testing-library";

const storybookMeta: Meta<CheckboxProps> = {
  title: "MUI Components/Forms/Checkbox",
  component: Checkbox,
  parameters: {
    docs: {
      page: CheckboxMdx,
    },
  },
  argTypes: {
    label: {
      control: "text",
      defaultValue: "Label",
    },
    name: {
      control: "text",
      defaultValue: "checkbox",
    },
    onChange: {
      control: "function",
    },
    value: {
      control: "text",
      defaultValue: "Value",
    },
  },
  decorators: [MuiThemeDecorator],
};

export default storybookMeta;

export const Default: StoryObj<typeof Checkbox> = {
  args: {
    label: "I agree to the terms and conditions",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkboxElement = await canvas.findByLabelText(
      "I agree to the terms and conditions"
    );
    await userEvent.click(checkboxElement);
  },
};
