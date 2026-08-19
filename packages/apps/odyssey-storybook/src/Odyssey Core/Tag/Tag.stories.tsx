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

import {
  Tag,
  tagColorVariants,
  TagList,
  tagSizeValues,
} from "@okta/odyssey-react-mui";
import { GroupIcon } from "@okta/odyssey-react-mui/icons";
import { Meta, StoryObj } from "@storybook/react-vite";
import { action } from "storybook/actions";

import {
  staticBoardParameters,
  StoryCell,
  StoryContrastBoard,
  StoryGrid,
  StoryRow,
  StorySection,
} from "../../tools/boardStoryHelpers.js";
import icons from "../../tools/iconUtils.js";
import { OdysseyStorybookThemeDecorator } from "../../tools/OdysseyStorybookThemeDecorator.js";

const meta = {
  component: Tag,
  decorators: [OdysseyStorybookThemeDecorator],
  parameters: {
    actions: { argTypesRegex: null },
  },
  tags: ["autodocs"],
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
      description: "Callback fired when the tag is clicked",
      table: {
        type: {
          summary: "func",
        },
      },
    },
    onRemove: {
      control: "object",
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
      options: tagColorVariants,
      description: "The color of the tag",
      table: {
        type: {
          summary: tagColorVariants.join(" | "),
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
      options: tagSizeValues,
      description: "The size of the tag",
      table: {
        type: {
          summary: tagSizeValues.join(" | "),
        },
        defaultValue: {
          summary: "medium",
        },
      },
    },
  },
  args: {
    label: "Starship",
    colorVariant: "default",
  },
} satisfies Meta<typeof Tag>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    label: "Starship",
  },
};

export const AllVariants: Story = {
  parameters: staticBoardParameters,
  render: function C() {
    return (
      <StorySection title="Every color variant at both sizes.">
        <StoryGrid columns={tagSizeValues.length}>
          {tagColorVariants.flatMap((colorVariant) =>
            tagSizeValues.map((size) => (
              <StoryCell
                key={`${colorVariant}-${size}`}
                label={`${colorVariant} · ${size}`}
              >
                <Tag
                  colorVariant={colorVariant}
                  label={colorVariant}
                  size={size}
                />
              </StoryCell>
            )),
          )}
        </StoryGrid>
      </StorySection>
    );
  },
};

export const AllStates: Story = {
  parameters: staticBoardParameters,
  render: function C() {
    return (
      <StorySection title="Interactive and non-default states.">
        <StoryRow>
          <StoryCell label="with icon">
            <Tag icon={<GroupIcon />} label="Crew" />
          </StoryCell>

          <StoryCell label="clickable">
            <Tag label="Starship" onClick={action("onClick")} />
          </StoryCell>

          <StoryCell label="removable">
            <Tag label="Starship" onRemove={action("onRemove")} />
          </StoryCell>

          <StoryCell label="disabled">
            <Tag isDisabled label="Starship" />
          </StoryCell>
        </StoryRow>
      </StorySection>
    );
  },
};

export const Contrast: Story = {
  parameters: staticBoardParameters,
  render: function C() {
    return (
      <StorySection title="Tag shifts its background shade with the surface contrast (white vs gray).">
        <StoryContrastBoard>
          <TagList>
            <Tag label="Default" />
            <Tag colorVariant="info" label="Info" />
            <Tag colorVariant="accentOne" label="Accent" />
          </TagList>
        </StoryContrastBoard>
      </StorySection>
    );
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
