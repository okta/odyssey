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
import {
  BackgroundProvider,
  Box,
  Tag,
  TagList,
  TagProps,
} from "@okta/odyssey-react-mui";
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
  },
  args: {
    label: "Starship",
    colorVariant: "default",
  },
  decorators: [MuiThemeDecorator],
  tags: ["autodocs"],
};

export default storybookMeta;

const checkTagStyles = async (
  canvas: ReturnType<typeof within>,
  tagLabel: string,
  expectedBackgroundColor: string,
  expectedColor: string,
) => {
  const tag = canvas.getByText(tagLabel);
  await expect(tag).toHaveStyle(`background-color: ${expectedBackgroundColor}`);
  await expect(tag).toHaveStyle(`color: ${expectedColor}`);
};

export const Default: StoryObj<TagProps> = {
  args: {
    label: "Starship",
  },
};

export const Info: StoryObj<TagProps> = {
  args: {
    label: "Starship",
    colorVariant: "info",
  },
};

export const AccentOne: StoryObj<TagProps> = {
  args: {
    label: "Starship",
    colorVariant: "accentOne",
  },
};

export const AccentTwo: StoryObj<TagProps> = {
  args: {
    label: "Starship",
    colorVariant: "accentTwo",
  },
};

export const AccentThree: StoryObj<TagProps> = {
  args: {
    label: "Starship",
    colorVariant: "accentThree",
  },
};

export const AccentFour: StoryObj<TagProps> = {
  args: {
    label: "Starship",
    colorVariant: "accentFour",
  },
};

export const List: StoryObj<TagProps> = {
  render: function C(args) {
    return (
      <TagList>
        <Tag label={args.label} />
        <Tag label="Info tag" colorVariant="info" />
        <Tag label="AccentOne tag" colorVariant="accentOne" />
        <Tag label="AccentTwo tag" colorVariant="accentTwo" />
        <Tag label="AccentThree tag" colorVariant="accentThree" />
        <Tag label="AccentFour tag" colorVariant="accentFour" />
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

export const TagsOnWhiteBackground: StoryObj<TagProps> = {
  name: "Tags on White Background",
  render: () => (
    <BackgroundProvider value="white">
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        <Tag label="Default" />
        <Tag label="Info" colorVariant="info" />
        <Tag label="AccentOne" colorVariant="accentOne" />
        <Tag label="AccentTwo" colorVariant="accentTwo" />
        <Tag label="AccentThree" colorVariant="accentThree" />
        <Tag label="AccentFour" colorVariant="accentFour" />
      </Box>
    </BackgroundProvider>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await checkTagStyles(
      canvas,
      "Default",
      "rgb(243, 244, 246)",
      "rgb(23, 27, 37)",
    );
    await checkTagStyles(
      canvas,
      "Info",
      "rgb(236, 242, 255)",
      "rgb(2, 48, 135)",
    );
    // Add checks for other color variants
    await axeRun("Tags on White Background");
  },
  parameters: {
    docs: {
      source: {
        code: `<BackgroundProvider>
  <Tag label="Default" />
  <Tag label="Info" colorVariant="info" />
  <Tag label="AccentOne" colorVariant="accentOne" />
  <Tag label="AccentTwo" colorVariant="accentTwo" />
  <Tag label="AccentThree" colorVariant="accentThree" />
  <Tag label="AccentFour" colorVariant="accentFour" />
</BackgroundProvider>`,
      },
      description: {
        story:
          "Demonstrates how the `Tag` component behaves on a white background using `BackgroundProvider`.",
      },
    },
  },
};

export const TagsOnGrayBackground: StoryObj<TagProps> = {
  name: "Tags on Gray Background",
  render: () => (
    <BackgroundProvider value="gray">
      <Box
        sx={{
          backgroundColor: "#F4F4F4",
          padding: "24px",
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Tag label="Default" />
        <Tag label="Info" colorVariant="info" />
        <Tag label="AccentOne" colorVariant="accentOne" />
        <Tag label="AccentTwo" colorVariant="accentTwo" />
        <Tag label="AccentThree" colorVariant="accentThree" />
        <Tag label="AccentFour" colorVariant="accentFour" />
      </Box>
    </BackgroundProvider>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await checkTagStyles(
      canvas,
      "Default",
      "rgb(229, 231, 235)",
      "rgb(23, 27, 37)",
    );
    await checkTagStyles(
      canvas,
      "Info",
      "rgb(225, 235, 255)",
      "rgb(2, 48, 135)",
    );
    // Add checks for other color variants
    await axeRun("Tags on Gray Background");
  },
  parameters: {
    docs: {
      source: {
        code: `<BackgroundProvider value="gray">
  <Tag label="Default" />
  <Tag label="Info" colorVariant="info" />
  <Tag label="AccentOne" colorVariant="accentOne" />
  <Tag label="AccentTwo" colorVariant="accentTwo" />
  <Tag label="AccentThree" colorVariant="accentThree" />
  <Tag label="AccentFour" colorVariant="accentFour" />
</BackgroundProvider>`,
      },
      description: {
        story:
          "Demonstrates how the `Tag` component behaves on a gray background using `BackgroundProvider`.",
      },
    },
  },
};
