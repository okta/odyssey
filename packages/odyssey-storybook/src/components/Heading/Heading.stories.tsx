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

const Template: Story<HeadingProps> = ({ level, visualLevel, children }) => (
  <Heading level={level} visualLevel={visualLevel} children={children} />
);

export const Primary = Template.bind({});
Primary.args = {
  level: "1",
  children: "Section title",
};
