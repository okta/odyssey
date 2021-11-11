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
import { Heading, HeadingProps } from "@okta/odyssey-react";
import { Heading as Source } from "../../../../odyssey-react/src";

export default {
  title: `Components/Heading`,
  component: Source,
  argTypes: {
    children: {
      control: { type: "string" },
    },
  },
};

const Template: Story<HeadingProps> = ({ ...args }) => <Heading {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  level: "1",
  children: "Section heading",
};

const AllHeadingsTemplate: Story<HeadingProps> = ({ children }) => (
  <>
    <Heading level="1">h1. {children}</Heading>
    <Heading level="2">h2. {children}</Heading>
    <Heading level="3">h3. {children}</Heading>
    <Heading level="4">h4. {children}</Heading>
    <Heading level="5">h5. {children}</Heading>
    <Heading level="6">h6. {children}</Heading>
  </>
);

export const AllHeadings = AllHeadingsTemplate.bind({});
AllHeadings.args = {
  children: "Section heading",
};
