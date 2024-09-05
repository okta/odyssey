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
import { GroupIcon } from "@okta/odyssey-react-mui/icons";
import icons from "../../../../.storybook/components/iconUtils";
import { userEvent, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { axeRun } from "../../../axe-util";

const storybookMeta: Meta<TagProps> = {
  title: "MUI Components/Tag",
  component: Tag,
  parameters: {
    actions: { argTypesRegex: null },
  },
  argTypes: {
    icon: {
      control: {
        type: "select",
      },
      options: Object.keys(icons),
      mapping: icons,
      description: "An optional icon to display alongside the label",
      table: {
        type: {
          summary: "<Icon />",
        },
      },
    },
    isDisabled: {
      control: "boolean",
      description: "If `true`, the tag is disabled",
      table: {
        type: {
          summary: "boolean",
        },
        defaultValue: {
          summary: false,
        },
      },
    },
    label: {
      control: "text",
      description: "The label text for the tag",
      table: {
        type: {
          summary: "string",
        },
      },
      type: {
        required: true,
        name: "string",
      },
    },
    onClick: {
      control: "obj",
      action: true,
      description: "Callback fired when the tag is clicked",
      table: {
        type: {
          summary: "func",
        },
      },
    },
    onRemove: {
      control: "obj",
      action: true,
      description:
        "Callback fired when the remove button of the tag is clicked",
      table: {
        type: {
          summary: "func",
        },
      },
    },
    colorVariant: {
      control: {
        type: "select",
      },
      options: ["default", "blue", "accent1", "accent2", "accent3", "accent4"],
      description: "The color of the tag",
      table: {
        type: {
          summary: "string",
        },
        defaultValue: {
          summary: "default",
        },
      },
    },
  },
  args: {
    label: "Starship",
    colorVariant: "default",
  },
  decorators: [MuiThemeDecorator],
  tags: ["autodocs"],
};

export default storybookMeta;

export const Default: StoryObj<TagProps> = {
  args: {
    label: "Starship",
  },
};

export const Blue: StoryObj<TagProps> = {
  args: {
    label: "Starship",
    colorVariant: "blue",
  },
};

export const Accent1: StoryObj<TagProps> = {
  args: {
    label: "Starship",
    colorVariant: "accent1",
  },
};

export const Accent2: StoryObj<TagProps> = {
  args: {
    label: "Starship",
    colorVariant: "accent2",
  },
};

export const Accent3: StoryObj<TagProps> = {
  args: {
    label: "Starship",
    colorVariant: "accent3",
  },
};

export const Accent4: StoryObj<TagProps> = {
  args: {
    label: "Starship",
    colorVariant: "accent4",
  },
};

export const List: StoryObj<TagProps> = {
  render: function C(args) {
    return (
      <TagList>
        <Tag label={args.label} />
        <Tag label="Blue tag" colorVariant="blue" />
        <Tag label="Accent1 tag" colorVariant="accent1" />
        <Tag label="Accent2 tag" colorVariant="accent2" />
        <Tag label="Accent3 tag" colorVariant="accent3" />
        <Tag label="Accent4 tag" colorVariant="accent4" />
      </TagList>
    );
  },
  args: {
    label: "Default tag",
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
  },
  play: async ({ args, canvasElement, step }) => {
    await step("remove the tag on click", async () => {
      const canvas = within(canvasElement);
      const tag = canvas.getByText(args.label);
      await userEvent.click(tag);
      expect(args.onClick).toHaveBeenCalledTimes(1);
      await axeRun("Clickable Tag");
    });
  },
};

export const Removable: StoryObj<TagProps> = {
  args: {
    label: "Starship",
  },
  play: async ({ args, canvasElement, step }) => {
    await step("remove the tag on click", async () => {
      const tagElement = canvasElement.querySelector('[role="button"]');
      const removeIcon = tagElement?.querySelector("svg");
      if (removeIcon) {
        await userEvent.click(removeIcon);
        await userEvent.tab();
        await expect(args.onRemove).toHaveBeenCalled();
      }
      await axeRun("Removable Tag");
    });
  },
};

export const Disabled: StoryObj<TagProps> = {
  args: {
    label: "Starship",
    isDisabled: true,
  },
};
