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

import {
  GraphCanvasHeader,
  GraphCanvasStateProvider,
} from "@okta/odyssey-contributions-wp-components";
import { fn, userEvent, within } from "storybook/test";

import {
  staticBoardParameters,
  StoryCell,
  StoryGrid,
  StorySection,
} from "../../tools/boardStoryHelpers.js";
import { OdysseyStorybookThemeDecorator } from "../../tools/OdysseyStorybookThemeDecorator.js";
import { WpComponentsStorybookThemeDecorator } from "../../tools/WpComponentsStorybookThemeDecorator.js";

const meta = {
  component: GraphCanvasHeader,
  decorators: [
    OdysseyStorybookThemeDecorator,
    WpComponentsStorybookThemeDecorator,
  ],
  tags: ["autodocs"],
  args: {
    onToggleFullscreen: fn(),
  },
  render: function C(args) {
    return (
      <GraphCanvasStateProvider>
        <GraphCanvasHeader {...args} />
      </GraphCanvasStateProvider>
    );
  },
} satisfies Meta<typeof GraphCanvasHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const AllStates: Story = {
  render: function C(args) {
    return (
      <StorySection title="All states">
        <StoryGrid columns={2}>
          <StoryCell label="All nodes expanded">
            <GraphCanvasStateProvider initialAllNodesExpanded={true}>
              <GraphCanvasHeader {...args} />
            </GraphCanvasStateProvider>
          </StoryCell>
          <StoryCell label="All nodes collapsed">
            <GraphCanvasStateProvider initialAllNodesExpanded={false}>
              <GraphCanvasHeader {...args} />
            </GraphCanvasStateProvider>
          </StoryCell>
        </StoryGrid>
      </StorySection>
    );
  },
  parameters: staticBoardParameters,
};

// The fullscreen icon has no controlling prop (it's fully internal state), so a click is the only
// deterministic way to reach it for VRT to capture the MaximizeIcon -> MinimizeIcon swap.
export const Fullscreen: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Fullscreen" }));
  },
};
