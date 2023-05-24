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

const storybookMeta: Meta<CheckboxProps> = {
  title: "MUI Components/Forms/Checkbox",
  component: Checkbox,
  argTypes: {
    label: {
      control: "text",
    },
    name: {
      control: "text",
    },
    isIndeterminate: {
      control: "boolean",
    },
    isRequired: {
      control: "boolean",
      defaultValue: false,
    },
    onChange: {
      control: "function",
    },
    value: {
      control: "text",
    },
  },
  decorators: [MuiThemeDecorator],
};

export default storybookMeta;

export const Default: StoryObj<CheckboxProps> = {
  args: {
    label: "Enable warp drive recalibration",
  },
};

export const Required: StoryObj<CheckboxProps> = {
  args: {
    label: "I agree to the terms and conditions",
    isRequired: true,
  },
};
