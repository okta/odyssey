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
import { action } from "@storybook/addon-actions";
import { Tag, TagList, TagProps } from "@okta/odyssey-react-mui";
import { MuiThemeDecorator } from "../../../../.storybook/components";

import TagMdx from "./Tag.mdx";

const storybookMeta: Meta<TagProps> = {
  title: "MUI Components/Tag",
  component: Tag,
  parameters: {
    actions: { argTypesRegex: null },
    docs: {
      page: TagMdx,
    },
  },
  argTypes: {
    label: {
      control: "text",
      defaultValue: "Starship",
    },
    isDisabled: {
      control: "boolean",
      defaultValue: false,
    },
    onClick: {
      control: "function",
    },
    onRemove: {
      control: "function",
    },
  },
  decorators: [MuiThemeDecorator],
};

export default storybookMeta;

const DefaultTemplate: Story<TagProps> = (args) => {
  return <Tag {...args} />;
};

const ListTemplate: Story<TagProps> = (args) => {
  return (
    <TagList>
      <Tag {...args} />
      <Tag label="Another tag" />
      <Tag label="A third tag" />
    </TagList>
  );
};

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const List = ListTemplate.bind({});
List.args = {};

export const Clickable = DefaultTemplate.bind({});
Clickable.args = {
  onClick: action("clicked"),
};

export const Removable = DefaultTemplate.bind({});
Removable.args = {
  onRemove: action("removed"),
};

export const Disabled = DefaultTemplate.bind({});
Disabled.args = {
  isDisabled: true,
};
