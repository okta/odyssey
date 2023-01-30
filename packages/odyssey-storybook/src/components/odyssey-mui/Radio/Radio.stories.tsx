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

import { Meta, Story } from "@storybook/react";
import { Radio, RadioProps } from "@okta/odyssey-react-mui";
import { MuiThemeDecorator } from "../../../../.storybook/components";

import RadioMdx from "./Radio.mdx";

const storybookMeta: Meta<RadioProps> = {
  title: `MUI Components/Forms/Radio`,
  component: Radio,
  parameters: {
    docs: {
      page: RadioMdx,
    },
  },
  argTypes: {
    label: {
      control: "text",
      defaultValue: "Label",
    },
    value: {
      control: "text",
      defaultValue: "Value",
    },
  },
  decorators: [MuiThemeDecorator],
};

export default storybookMeta;

const Template: Story<RadioProps> = (args) => {
  return <Radio label={args.label} value={args.value} />;
};

export const Default = Template.bind({});
Default.args = {};
