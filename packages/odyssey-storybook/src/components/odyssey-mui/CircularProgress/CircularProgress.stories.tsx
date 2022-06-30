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
import { CircularProgress, CircularProgressProps } from "@mui/material";
import { MuiThemeDecorator } from "../../../../.storybook/components";

import CircularProgressMdx from "./CircularProgress.mdx";

export default {
  title: `MUI Components/Circular Progress`,
  component: CircularProgress,
  parameters: {
    docs: {
      page: CircularProgressMdx,
    },
  },
  argTypes: {
    variant: {
      options: ["indeterminate", "determinate"],
      control: { type: "radio" },
    },
    value: {
      control: { type: "number" },
    },
  },
  decorators: [MuiThemeDecorator],
};

const Template: Story<CircularProgressProps> = (props) => (
  <CircularProgress {...props} />
);

export const Indeterminate = Template.bind({});
Indeterminate.args = {};

export const Determinate = Template.bind({});
Determinate.args = {
  variant: "determinate",
  value: 70,
};
