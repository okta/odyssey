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

import { Story } from "@storybook/react";
import { Radio } from "@okta/odyssey-react-mui";
import { MuiThemeDecorator } from "../../../../.storybook/components";

import RadioMdx from "./Radio.mdx";

export default {
  title: `MUI Components/Forms/Radio`,
  component: Radio,
  parameters: {
    docs: {
      page: RadioMdx,
    },
  },
  argTypes: {
    value: {
      control: "text",
      defaultValue: "Value",
    },
    label: {
      control: "text",
      defaultValue: "Label",
    },
  },
  decorators: [MuiThemeDecorator],
};

const DefaultTemplate: Story = (args) => {
  return <Radio value={args.value} label={args.label} />;
};

export const Default = DefaultTemplate.bind({});
Default.args = {};
