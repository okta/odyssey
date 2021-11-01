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
import { Tag, TagProps } from "@okta/odyssey-react";
import { Tag as Source } from "../../../../odyssey-react/src";

import TagMdx from "./Tag.mdx";

export default {
  title: `Components/Tag`,
  component: Source,
  parameters: {
    layout: "fullscreen",
    docs: {
      page: TagMdx,
    },
  },
};

const Template: Story<TagProps> = ({ tags }) => <Tag tags={tags} />;

export const Default = Template.bind({});
Default.args = {
  tags: ["Item one", "Item two", "Item three"],
};
