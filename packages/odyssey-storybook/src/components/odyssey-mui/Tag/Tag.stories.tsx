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
    label2: {
      control: "text",
      defaultValue: null,
    },
    label3: {
      control: "text",
      defaultValue: null,
    },
    interactive: {
      control: "boolean",
      defaultValue: false,
    },
    disabled: {
      control: "boolean",
      defaultValue: false,
    },
    deletable: {
      control: "boolean",
      defaultValue: false,
    },
  },
  decorators: [MuiThemeDecorator],
};

const handleDelete = () => {
  console.info("You clicked the delete icon.");
};

const DefaultTemplate: Story = (args) => {
  return (
    <TagList>
      <Tag
        label={args.label}
        isInteractive={args.interactive}
        isDisabled={args.disabled}
        onDelete={args.deletable && handleDelete}
      />
      {args.label2 && (
        <Tag
          label={args.label2}
          isInteractive={args.interactive}
          isDisabled={args.disabled}
          onDelete={args.deletable && handleDelete}
        />
      )}
      {args.label3 && (
        <Tag
          label={args.label3}
          isInteractive={args.interactive}
          isDisabled={args.disabled}
          onDelete={args.deletable && handleDelete}
        />
      )}
    </TagList>
  );
};

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const List = DefaultTemplate.bind({});
List.args = {
  label2: "Warp-capable",
  label3: "Unmanned",
};

export const Clickable = DefaultTemplate.bind({});
Clickable.args = {
  clickable: true,
};

export const Deletable = DefaultTemplate.bind({});
Deletable.args = {
  deletable: true,
};

export const Disabled = DefaultTemplate.bind({});
Disabled.args = {
  disabled: true,
};
