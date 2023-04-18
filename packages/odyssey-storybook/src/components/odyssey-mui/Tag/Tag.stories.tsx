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
import { Tag, TagList } from "@okta/odyssey-react-mui";
import { MuiThemeDecorator } from "../../../../.storybook/components";

import TagMdx from "./Tag.mdx";

export default {
  title: `MUI Components/Tag`,
  component: Tag,
  parameters: {
    docs: {
      page: TagMdx,
    },
  },
  argTypes: {
    label: {
      control: "text",
      defaultValue: "Starship",
    },
    isInteractive: {
      control: "boolean",
      defaultValue: false,
    },
    isDisabled: {
      control: "boolean",
      defaultValue: false,
    },
    onDelete: {
      control: "text",
      defaultValue: null,
    },
  },
  decorators: [MuiThemeDecorator],
};

const DefaultTemplate: Story = (args) => {
  return (
    <Tag
      label={args.label}
      isInteractive={args.isInteractive}
      isDisabled={args.isDisabled}
      onDelete={args.onDelete}
    />
  );
};

const ListTemplate: Story = (args) => {
  return (
    <TagList>
      <Tag
        label={args.label}
        isInteractive={args.isInteractive}
        isDisabled={args.isDisabled}
        onDelete={args.onDelete}
      />
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
  isClickable: true,
};

export const Deletable = DefaultTemplate.bind({});
Deletable.args = {
  onDelete: () => {
    return true;
  },
};

export const Disabled = DefaultTemplate.bind({});
Disabled.args = {
  isDisabled: true,
};
