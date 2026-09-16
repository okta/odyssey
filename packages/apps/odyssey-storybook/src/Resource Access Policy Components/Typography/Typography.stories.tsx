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

import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  Heading2,
  Paragraph,
  Typography,
} from "@okta/odyssey-contributions-resource-access-policy-components";

import {
  staticBoardParameters,
  StoryCell,
  StoryConstrainedWidth,
  StoryGrid,
  StorySection,
} from "../../tools/boardStoryHelpers.js";
import { OdysseyStorybookThemeDecorator } from "../../tools/OdysseyStorybookThemeDecorator.js";
import { ResourceAccessPolicyComponentsStorybookThemeDecorator } from "../../tools/ResourceAccessPolicyComponentsStorybookThemeDecorator.js";

const meta = {
  component: Typography,
  decorators: [
    OdysseyStorybookThemeDecorator,
    ResourceAccessPolicyComponentsStorybookThemeDecorator,
  ],
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

export const Playground: Story = {
  render: function C(args) {
    return <Typography {...args} />;
  },
};

export const AllOverflowBehaviors: Story = {
  name: "All overflow behaviors",
  parameters: staticBoardParameters,
  render: function C() {
    return (
      <StorySection title="Every combination of wordBreak and clampLines, in a bounded container.">
        <StoryGrid columns={2}>
          <StoryCell label='wordBreak="break-all"'>
            <StoryConstrainedWidth width="400px">
              <Typography wordBreak="break-all">
                ThisIsAVeryLongWordWithoutSpacesThatNeedsToBeHandledProperly_AnExampleOfURLOrIdentifier
              </Typography>
            </StoryConstrainedWidth>
          </StoryCell>

          <StoryCell label="clampLines={3}">
            <StoryConstrainedWidth width="400px">
              <Typography clampLines={3}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </Typography>
            </StoryConstrainedWidth>
          </StoryCell>

          <StoryCell label='clampLines={2} + wordBreak="break-word"'>
            <StoryConstrainedWidth width="400px">
              <Typography clampLines={2} wordBreak="break-word">
                ThisIsAVeryLongWordWithoutSpaces_FollowedByMoreText_AndEvenMoreText_ThatWillDemonstrateHowBothPropsWorkTogether.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </Typography>
            </StoryConstrainedWidth>
          </StoryCell>

          <StoryCell label="Heading2 clampLines={2}">
            <StoryConstrainedWidth width="400px">
              <Heading2 clampLines={2}>
                This Is A Very Long Heading That Should Be Clamped To Two Lines
                And Show Ellipsis When It Overflows The Container
              </Heading2>
            </StoryConstrainedWidth>
          </StoryCell>

          <StoryCell label='Paragraph wordBreak="break-all"'>
            <StoryConstrainedWidth width="400px">
              <Paragraph wordBreak="break-all">
                https://example.com/very-long-url-path/that-would-normally-overflow/the-container/without-proper-word-breaking
              </Paragraph>
            </StoryConstrainedWidth>
          </StoryCell>
        </StoryGrid>
      </StorySection>
    );
  },
};
