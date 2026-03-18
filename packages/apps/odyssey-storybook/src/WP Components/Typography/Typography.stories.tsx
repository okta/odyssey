/*!
 * Copyright (c) 2024-present, Okta, Inc. and/or its affiliates. All rights reserved.
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
  Heading2,
  Paragraph,
  Typography,
} from "@okta/odyssey-contributions-wp-components";
import { Meta, StoryObj } from "@storybook/react-vite";

import { OdysseyStorybookThemeDecorator } from "../../tools/OdysseyStorybookThemeDecorator.js";
import { WpComponentsStorybookThemeDecorator } from "../../tools/WpComponentsStorybookThemeDecorator.js";

const containerStyle: React.CSSProperties = {
  maxWidth: "400px",
  border: "1px dashed #ccc",
  padding: "16px",
};

const meta = {
  component: Typography,
  decorators: [
    OdysseyStorybookThemeDecorator,
    WpComponentsStorybookThemeDecorator,
  ],
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: "text",
      description: "The text content of the component.",
    },
    clampLines: {
      control: "number",
      description:
        "Limits the text to a specified number of lines, adding ellipsis when content overflows.",
      table: {
        type: { summary: "number" },
      },
    },
    wordBreak: {
      control: "select",
      options: ["normal", "break-all", "keep-all", "break-word"],
      description: "Controls how text should break within the element.",
      table: {
        type: { summary: "string" },
      },
    },
  },
  args: {
    children:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  parameters: {
    docs: {
      description: {
        component:
          "Demonstrates the `wordBreak` and `clampLines` props for controlling text overflow behavior in Typography components.",
      },
    },
  },
} satisfies Meta<typeof Typography>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WordBreak: Story = {
  render: () => (
    <div style={containerStyle}>
      <Typography wordBreak="break-all">
        ThisIsAVeryLongWordWithoutSpacesThatNeedsToBeHandledProperly_AnExampleOfURLOrIdentifier
      </Typography>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Use `wordBreak` to control how long words or URLs should break within the container. Useful for preventing overflow from long unbroken strings.",
      },
    },
  },
};

export const LineClamp: Story = {
  render: () => (
    <div style={containerStyle}>
      <Typography clampLines={3}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur.
      </Typography>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Use `clampLines` to limit the number of visible lines and add ellipsis when content overflows. Great for truncating long text in cards or lists.",
      },
    },
  },
};

export const CombinedWordBreakAndClamp: Story = {
  render: () => (
    <div style={containerStyle}>
      <Typography clampLines={2} wordBreak="break-word">
        ThisIsAVeryLongWordWithoutSpaces_FollowedByMoreText_AndEvenMoreText_ThatWillDemonstrateHowBothPropsWorkTogether.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </Typography>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Combine `wordBreak` and `clampLines` to handle long words while limiting the number of visible lines. This ensures content fits within the container both horizontally and vertically.",
      },
    },
  },
};

export const HeadingWithClamp: Story = {
  render: () => (
    <div style={containerStyle}>
      <Heading2 clampLines={2}>
        This Is A Very Long Heading That Should Be Clamped To Two Lines And Show
        Ellipsis When It Overflows The Container
      </Heading2>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Example of using `clampLines` with a heading component to prevent long titles from taking up too much space.",
      },
    },
  },
};

export const ParagraphWithWordBreak: Story = {
  render: () => (
    <div style={containerStyle}>
      <Paragraph wordBreak="break-all">
        https://example.com/very-long-url-path/that-would-normally-overflow/the-container/without-proper-word-breaking
      </Paragraph>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Example of using `wordBreak` with a paragraph to handle long URLs that would otherwise overflow the container.",
      },
    },
  },
};
