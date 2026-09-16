/*!
 * Copyright (c) 2026-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import type { Meta, StoryObj } from "@storybook/react-vite";

import { GraphIcon } from "@okta/odyssey-contributions-wp-components";
import * as odysseyDesignTokens from "@okta/odyssey-design-tokens";
import { AddIcon } from "@okta/odyssey-react-mui/icons";

import {
  staticBoardParameters,
  StoryCell,
  StoryGrid,
  StorySection,
} from "../../tools/boardStoryHelpers.js";
import icons from "../../tools/iconUtils.js";
import { OdysseyStorybookThemeDecorator } from "../../tools/OdysseyStorybookThemeDecorator.js";
import { WpComponentsStorybookThemeDecorator } from "../../tools/WpComponentsStorybookThemeDecorator.js";

const hueTokensByName: Record<string, string> = Object.fromEntries(
  Object.entries(odysseyDesignTokens).filter(([name]) =>
    name.startsWith("Hue"),
  ),
) as Record<string, string>;

const meta = {
  component: GraphIcon,
  decorators: [
    OdysseyStorybookThemeDecorator,
    WpComponentsStorybookThemeDecorator,
  ],
  tags: ["autodocs"],
  argTypes: {
    borderRadius: {
      control: "text",
      description:
        "The tile's corner rounding. Defaults to odysseyDesignTokens.BorderRadiusTight.",
    },
    icon: {
      control: { type: "select" },
      description: "The icon rendered centered inside the tile.",
      mapping: icons,
      options: Object.keys(icons),
    },
    iconBackgroundColor: {
      control: { type: "select" },
      description: "The tile's background color.",
      mapping: hueTokensByName,
      options: Object.keys(hueTokensByName),
    },
    iconColor: {
      control: { type: "select" },
      description: "The icon's color.",
      mapping: hueTokensByName,
      options: Object.keys(hueTokensByName),
    },
    size: {
      control: "text",
      description:
        "The tile's width and height (always square). Defaults to odysseyDesignTokens.Spacing6.",
    },
  },
  args: {
    icon: <AddIcon />,
    iconBackgroundColor: odysseyDesignTokens.HueBlue100,
    iconColor: odysseyDesignTokens.HueNeutral800,
  },
} satisfies Meta<typeof GraphIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const NodeIconVariants: Story = {
  name: "Node icon variants",
  parameters: staticBoardParameters,
  render: function C() {
    return (
      <StorySection title="The node-type color combinations from the O4AA Configuration Designer Figma file's 'Node Icons' set.">
        <StoryGrid columns={5}>
          <StoryCell label="Focal AI agent">
            <GraphIcon
              icon={<AddIcon />}
              iconBackgroundColor={odysseyDesignTokens.HueNeutral900}
              iconColor={odysseyDesignTokens.HueNeutralWhite}
            />
          </StoryCell>

          <StoryCell label="Other AI agent">
            <GraphIcon
              icon={<AddIcon />}
              iconBackgroundColor={odysseyDesignTokens.HueNeutral200}
              iconColor={odysseyDesignTokens.HueNeutral700}
            />
          </StoryCell>

          <StoryCell label="Agent gateway">
            <GraphIcon
              icon={<AddIcon />}
              iconBackgroundColor={odysseyDesignTokens.HueBlue600}
              iconColor={odysseyDesignTokens.HueNeutralWhite}
            />
          </StoryCell>

          <StoryCell label="Application / MCP server / Server">
            <GraphIcon
              icon={<AddIcon />}
              iconBackgroundColor={odysseyDesignTokens.HueBlue100}
              iconColor={odysseyDesignTokens.HueBlue600}
            />
          </StoryCell>

          <StoryCell label="User / Group">
            <GraphIcon
              icon={<AddIcon />}
              iconBackgroundColor={odysseyDesignTokens.HueAccentTwo100}
              iconColor={odysseyDesignTokens.HueAccentTwo700}
            />
          </StoryCell>
        </StoryGrid>
      </StorySection>
    );
  },
};
