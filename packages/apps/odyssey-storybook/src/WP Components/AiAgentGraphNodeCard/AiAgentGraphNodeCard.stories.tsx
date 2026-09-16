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
  AiAgentGraphNodeCard,
  GraphCanvasStateProvider,
} from "@okta/odyssey-contributions-wp-components";

import { OdysseyStorybookThemeDecorator } from "../../tools/OdysseyStorybookThemeDecorator.js";
import { WpComponentsStorybookThemeDecorator } from "../../tools/WpComponentsStorybookThemeDecorator.js";

const meta = {
  component: AiAgentGraphNodeCard,
  decorators: [
    OdysseyStorybookThemeDecorator,
    WpComponentsStorybookThemeDecorator,
  ],
  tags: ["autodocs"],
  argTypes: {
    attributes: {
      control: false,
      table: {
        disable: true,
      },
    },
    isFocal: {
      control: "boolean",
      description:
        "Switches between the focal AI agent's dark swatch and the default light one.",
    },
    nodeId: {
      control: false,
    },
  },
  args: {
    nodeId: "node-1",
    title: "Support agent",
  },
  render: function C(args) {
    return (
      <GraphCanvasStateProvider>
        <AiAgentGraphNodeCard {...args} />
      </GraphCanvasStateProvider>
    );
  },
} satisfies Meta<typeof AiAgentGraphNodeCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Focal: Story = {
  args: {
    isFocal: true,
    title: "Escalation agent",
  },
};
