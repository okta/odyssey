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

import React from "react";
import { Story } from "@storybook/react";
import { Typography, TypographyProps } from "@mui/material";
import { MuiThemeDecorator } from "../../../.storybook/components/MuiThemeDecorator";

import TypographyMdx from "./Typography.mdx";

export default {
  title: `MUI Components/Typography`,
  component: Typography,
  parameters: {
    docs: {
      page: TypographyMdx,
    },
  },
  argTypes: {
    children: {
      control: "text",
      defaultValue: "Spice is vital for space travel.",
    },
    variant: {
      options: ["h1", "h2", "h3", "h4", "h5", "h6", "body", "caption"],
      control: { type: "select" },
    },
  },
  decorators: [MuiThemeDecorator],
};

const Template: Story<TypographyProps> = (props) => <Typography {...props} />;

export const Heading1 = Template.bind({});
Heading1.args = {
  children: "Heading 1",
  variant: "h1",
};

export const Heading2 = Template.bind({});
Heading2.args = {
  children: "Heading 2",
  variant: "h2",
};

export const Heading3 = Template.bind({});
Heading3.args = {
  children: "Heading 3",
  variant: "h3",
};

export const Heading4 = Template.bind({});
Heading4.args = {
  children: "Heading 4",
  variant: "h4",
};

export const Heading5 = Template.bind({});
Heading5.args = {
  children: "Heading 5",
  variant: "h5",
};

export const Heading6 = Template.bind({});
Heading6.args = {
  children: "Heading 6",
  variant: "h6",
};

export const Body = Template.bind({});
Body.args = {
  children: "This is body copy.",
  variant: "body",
};

export const Caption = Template.bind({});
Caption.args = {
  children: "This is a caption.",
  variant: "caption",
};
