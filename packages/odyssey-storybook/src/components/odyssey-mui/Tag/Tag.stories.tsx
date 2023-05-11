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

import { Meta, StoryFn } from "@storybook/react";
import { Tag, TagList, TagProps } from "@okta/odyssey-react-mui";
import { MuiThemeDecorator } from "../../../../.storybook/components";

import TagMdx from "./Tag.mdx";
import { getByRole, userEvent, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

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
      action: true,
    },
    onRemove: {
      action: true,
    },
  },
  decorators: [MuiThemeDecorator],
};

export default storybookMeta;

const DefaultTemplate: StoryFn<TagProps> = (args) => {
  return <Tag {...args} />;
};

const ListTemplate: StoryFn<TagProps> = (args) => {
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
  label: "Starship",
};
Clickable.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const tag = canvas.getByText("Starship");
  const button = await getByRole(tag, "button");
  await userEvent.click(button);
  await expect(tag).not.toBeVisible();
};

export const Removable = DefaultTemplate.bind({});
Removable.args = {};

export const Disabled = DefaultTemplate.bind({});
Disabled.args = {
  isDisabled: true,
};
