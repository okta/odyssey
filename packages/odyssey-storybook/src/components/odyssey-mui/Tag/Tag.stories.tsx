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

import { Meta, StoryObj } from "@storybook/react";
import { Tag, TagList, TagProps } from "@okta/odyssey-react-mui";
import { MuiThemeDecorator } from "../../../../.storybook/components";
import { GroupIcon } from "@okta/odyssey-react-mui";

const storybookMeta: Meta<TagProps> = {
  title: "MUI Components/Tag",
  component: Tag,
  parameters: {
    actions: { argTypesRegex: null },
  },
  argTypes: {
    label: {
      control: "text",
    },
    icon: {
      control: "text",
    },
    isDisabled: {
      control: "boolean",
    },
    onClick: {
      action: true,
    },
    onRemove: {
      action: true,
    },
  },
  args: {
    label: "Starship",
    onRemove: undefined,
    onClick: undefined,
  },
  decorators: [MuiThemeDecorator],
};

export default storybookMeta;

export const Default: StoryObj<TagProps> = {
  args: {
    label: "Starship",
  },
};

export const List: StoryObj<TagProps> = {
  render: function C(args) {
    return (
      <TagList>
        <Tag {...args} />
        <Tag label="Another tag" />
        <Tag label="A third tag" />
      </TagList>
    );
  },
  args: {
    label: "Starship",
  },
};

export const Icon: StoryObj<TagProps> = {
  args: {
    label: "Crew",
    icon: <GroupIcon />,
  },
};

export const Clickable: StoryObj<TagProps> = {
  args: {
    label: "Starship",
    onClick: function noRefCheck(event) {
      event;
    },
  },
};

export const Removable: StoryObj<TagProps> = {
  args: {
    label: "Starship",
    onRemove: function noRefCheck(event) {
      event;
    },
  },
};

export const Disabled: StoryObj<TagProps> = {
  args: {
    label: "Starship",
    isDisabled: true,
  },
};
