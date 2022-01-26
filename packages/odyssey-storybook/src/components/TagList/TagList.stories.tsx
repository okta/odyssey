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
import type { Story } from "@storybook/react";
import { TagList, TagListProps } from "@okta/odyssey-react";
import { TagList as Source } from "@okta/odyssey-react/src";

import TagListMdx from "./TagList.mdx";

export default {
  title: `Components/TagList`,
  component: Source,
  parameters: {
    docs: {
      page: TagListMdx,
    },
  },
};

const Template: Story<TagListProps> = ({ tags }) => <TagList tags={tags} />;

export const Default = Template.bind({});
Default.args = {
  tags: ["Item one", "Item two", "Item three"],
};
