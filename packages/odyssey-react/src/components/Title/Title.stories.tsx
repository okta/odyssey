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
import Title from ".";
import type { Props } from ".";

export default {
  title: `Components/Title`,
  component: Title,
  argTypes: {
    children: {
      control: { type: "string" },
    },
  },
};

const Template: Story<Props> = ({ level, visualLevel, children }) => (
  <Title level={level} visualLevel={visualLevel} children={children} />
);

export const Primary = Template.bind({});
Primary.args = {
  level: "1",
  children: "Section title",
};
