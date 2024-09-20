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
import * as Tokens from "@okta/odyssey-design-tokens";
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
    testId: "tag-default",
  },
  decorators: [MuiThemeDecorator],
  tags: ["autodocs"],
};

export default storybookMeta;

const checkTagStyles = async (
  canvas: ReturnType<typeof within>,
  testId: string,
  expectedBackgroundColor: string,
  expectedColor: string,
) => {
  const tag = canvas.getByTestId(testId);
  await expect(tag).toHaveStyle(`background-color: ${expectedBackgroundColor}`);
  await expect(tag).toHaveStyle(`color: ${expectedColor}`);
};

export const Default: StoryObj<TagProps> = {
  args: {
    label: "Starship",
    testId: "tag-default",
  },
};

export const Info: StoryObj<TagProps> = {
  args: {
    label: "Starship",
    colorVariant: "info",
    testId: "tag-info",
  },
};

export const AccentOne: StoryObj<TagProps> = {
  args: {
    label: "Starship",
    colorVariant: "accentOne",
    testId: "tag-accent-one",
  },
};

export const AccentTwo: StoryObj<TagProps> = {
  args: {
    label: "Starship",
    colorVariant: "accentTwo",
    testId: "tag-accent-two",
  },
};

export const AccentThree: StoryObj<TagProps> = {
  args: {
    label: "Starship",
    colorVariant: "accentThree",
    testId: "tag-accent-three",
  },
};

export const AccentFour: StoryObj<TagProps> = {
  args: {
    label: "Starship",
    colorVariant: "accentFour",
    testId: "tag-accent-four",
  },
};

export const List: StoryObj<TagProps> = {
  render: function C(args) {
    return (
      <TagList>
        <Tag label={args.label} data-se="tag-default" />
        <Tag label="Info tag" colorVariant="info" data-se="tag-info" />
        <Tag
          label="AccentOne tag"
          colorVariant="accentOne"
          data-se="tag-accent-one"
        />
        <Tag
          label="AccentTwo tag"
          colorVariant="accentTwo"
          data-se="tag-accent-two"
        />
        <Tag
          label="AccentThree tag"
          colorVariant="accentThree"
          data-se="tag-accent-three"
        />
        <Tag
          label="AccentFour tag"
          colorVariant="accentFour"
          data-se="tag-accent-four"
        />
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
    testId: "tag-icon",
  },
};

export const Clickable: StoryObj<TagProps> = {
  args: {
    label: "Starship",
    testId: "tag-clickable",
  },
  play: async ({ args, canvasElement, step }) => {
    await step("remove the tag on click", async () => {
      const tag = canvasElement.querySelector(`[data-se="${args.testId}"]`);
      if (tag) {
        await userEvent.click(tag);
        expect(args.onClick).toHaveBeenCalledTimes(1);
        await axeRun("Clickable Tag");
      } else {
        throw new Error(`Element with data-se="${args.testId}" not found`);
      }
    });
  },
};

export const Removable: StoryObj<TagProps> = {
  args: {
    label: "Starship",
    testId: "tag-removable",
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
    testId: "tag-disabled",
  },
};

export const TagsOnWhiteBackground: StoryObj<TagProps> = {
  name: "Tags on White Background",
  render: () => (
    <BackgroundProvider value="highContrast">
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        <Tag label="Default" data-se="tag-default" />
        <Tag label="Info" colorVariant="info" data-se="tag-info" />
        <Tag
          label="AccentOne"
          colorVariant="accentOne"
          data-se="tag-accent-one"
        />
        <Tag
          label="AccentTwo"
          colorVariant="accentTwo"
          data-se="tag-accent-two"
        />
        <Tag
          label="AccentThree"
          colorVariant="accentThree"
          data-se="tag-accent-three"
        />
        <Tag
          label="AccentFour"
          colorVariant="accentFour"
          data-se="tag-accent-four"
        />
      </Box>
    </BackgroundProvider>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await checkTagStyles(
      canvas,
      "tag-default",
      Tokens.HueNeutral100,
      Tokens.TypographyColorBody,
    );
    await checkTagStyles(
      canvas,
      "tag-info",
      Tokens.HueBlue100,
      Tokens.HueBlue700,
    );
    await checkTagStyles(
      canvas,
      "tag-accent-one",
      Tokens.HueAccentOne100,
      Tokens.HueAccentOne700,
    );
    await checkTagStyles(
      canvas,
      "tag-accent-two",
      Tokens.HueAccentTwo100,
      Tokens.HueAccentTwo700,
    );
    await checkTagStyles(
      canvas,
      "tag-accent-three",
      Tokens.HueAccentThree100,
      Tokens.HueAccentThree700,
    );
    await checkTagStyles(
      canvas,
      "tag-accent-four",
      Tokens.HueAccentFour100,
      Tokens.HueAccentFour700,
    );

    await axeRun("Tags on white (`highContrast`) background");
  },
  parameters: {
    docs: {
      source: {
        code: `<BackgroundProvider value="highContrast">
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
          "Demonstrates how the `Tag` component behaves on a white (`highContrast`) background using `BackgroundProvider`.",
      },
    },
  },
};

export const TagsOnGrayBackground: StoryObj<TagProps> = {
  name: "Tags on Gray Background",
  render: () => (
    <BackgroundProvider value="lowContrast">
      <Box
        sx={{
          backgroundColor: Tokens.HueNeutral50,
          padding: "24px",
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Tag label="Default" data-se="tag-default" />
        <Tag label="Info" colorVariant="info" data-se="tag-info" />
        <Tag
          label="AccentOne"
          colorVariant="accentOne"
          data-se="tag-accent-one"
        />
        <Tag
          label="AccentTwo"
          colorVariant="accentTwo"
          data-se="tag-accent-two"
        />
        <Tag
          label="AccentThree"
          colorVariant="accentThree"
          data-se="tag-accent-three"
        />
        <Tag
          label="AccentFour"
          colorVariant="accentFour"
          data-se="tag-accent-four"
        />
      </Box>
    </BackgroundProvider>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await checkTagStyles(
      canvas,
      "tag-default",
      Tokens.HueNeutral200,
      Tokens.TypographyColorBody,
    );
    await checkTagStyles(
      canvas,
      "tag-info",
      Tokens.HueBlue200,
      Tokens.HueBlue700,
    );

    await checkTagStyles(
      canvas,
      "tag-accent-one",
      Tokens.HueAccentOne200,
      Tokens.HueAccentOne700,
    );
    await checkTagStyles(
      canvas,
      "tag-accent-two",
      Tokens.HueAccentTwo200,
      Tokens.HueAccentTwo700,
    );
    await checkTagStyles(
      canvas,
      "tag-accent-three",
      Tokens.HueAccentThree200,
      Tokens.HueAccentThree700,
    );
    await checkTagStyles(
      canvas,
      "tag-accent-four",
      Tokens.HueAccentFour200,
      Tokens.HueAccentFour700,
    );

    await axeRun("Tags on gray (`lowContrast`) background");
  },
  parameters: {
    docs: {
      source: {
        code: `<BackgroundProvider value="lowContrast">
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
          "Demonstrates how the `Tag` component behaves on a gray (`lowContrast`) background using `BackgroundProvider`.",
      },
    },
  },
};
