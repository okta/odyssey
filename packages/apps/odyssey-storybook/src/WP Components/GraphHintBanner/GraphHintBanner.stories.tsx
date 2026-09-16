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

import { GraphHintBanner } from "@okta/odyssey-contributions-wp-components";

import {
  staticBoardParameters,
  StoryCell,
  StoryGrid,
  StorySection,
} from "../../tools/boardStoryHelpers.js";
import { OdysseyStorybookThemeDecorator } from "../../tools/OdysseyStorybookThemeDecorator.js";
import { WpComponentsStorybookThemeDecorator } from "../../tools/WpComponentsStorybookThemeDecorator.js";

const meta = {
  component: GraphHintBanner,
  decorators: [
    OdysseyStorybookThemeDecorator,
    WpComponentsStorybookThemeDecorator,
  ],
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: false,
    },
  },
  args: {
    children: <span>No connections configured yet.</span>,
  },
} satisfies Meta<typeof GraphHintBanner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const AllContentPatterns: Story = {
  name: "All content patterns",
  parameters: staticBoardParameters,
  render: function C() {
    return (
      <StorySection title="All content patterns">
        <StoryGrid columns={2}>
          <StoryCell label="Single line">
            <GraphHintBanner>
              <span>No connections configured yet.</span>
            </GraphHintBanner>
          </StoryCell>
          <StoryCell label="Multiple lines with an inline bold segment">
            <GraphHintBanner>
              <span>No connections configured yet.</span>
              <span>
                Hover over the <strong>Nightly Batch Service</strong> node and
                click + to add a connection.
              </span>
            </GraphHintBanner>
          </StoryCell>
        </StoryGrid>
      </StorySection>
    );
  },
};
