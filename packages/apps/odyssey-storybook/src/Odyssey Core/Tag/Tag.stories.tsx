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

import { Tag, TagList } from "@okta/odyssey-react-mui";
import { GroupIcon } from "@okta/odyssey-react-mui/icons";
import { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within } from "@storybook/test";

import { axeRun } from "../../axeRun.js";
import icons from "../../tools/iconUtils.js";

const meta = {
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
          summary: "false",
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
      control: "object",
      action: true,
      description: "Callback fired when the tag is clicked",
      table: {
        type: {
          summary: "func",
        },
      },
    },
    onRemove: {
      control: "object",
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
      options: [
        "default",
        "info",
        "accentOne",
        "accentTwo",
        "accentThree",
        "accentFour",
      ],
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
    size: {
      control: {
        type: "select",
      },
      options: ["default", "small"],
      description: "The size of the tag",
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
    onClick: fn(),
    size: "medium",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Tag>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Starship",
  },
};

export const Info: Story = {
  args: {
    label: "Starship",
    colorVariant: "info",
  },
};

export const AccentOne: Story = {
  args: {
    label: "Starship",
    colorVariant: "accentOne",
  },
};

export const AccentTwo: Story = {
  args: {
    label: "Starship",
    colorVariant: "accentTwo",
  },
};

export const AccentThree: Story = {
  args: {
    label: "Starship",
    colorVariant: "accentThree",
  },
};

export const AccentFour: Story = {
  args: {
    label: "Starship",
    colorVariant: "accentFour",
  },
};

export const List: Story = {
  render: function C(args) {
    return (
      <TagList>
        <Tag label={args.label} />
        <Tag colorVariant="info" label="Info tag" />
        <Tag colorVariant="accentOne" label="AccentOne tag" />
        <Tag colorVariant="accentTwo" label="AccentTwo tag" />
        <Tag colorVariant="accentThree" label="AccentThree tag" />
        <Tag colorVariant="accentFour" label="AccentFour tag" />
      </TagList>
    );
  },
  args: {
    label: "Default tag",
  },
};

export const Small: Story = {
  args: {
    label: "Starship",
    size: "small",
  },
};

export const Icon: Story = {
  args: {
    label: "Crew",
    icon: <GroupIcon />,
  },
};

export const Clickable: Story = {
  args: {
    label: "Starship",
  },
  play: async ({ args, canvasElement, step }) => {
    await step("click the tag", async () => {
      const canvas = within(canvasElement);
      const tag = canvas.getByText(args.label);
      await userEvent.click(tag);
      expect(args.onClick).toHaveBeenCalledTimes(1);
      await axeRun("Clickable Tag");
    });
  },
};

export const Removable: Story = {
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

export const Disabled: Story = {
  args: {
    label: "Starship",
    isDisabled: true,
  },
};
