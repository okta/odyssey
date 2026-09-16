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
  GraphActionDrawer,
  GraphCanvasStateProvider,
  useGraphCanvasActions,
} from "@okta/odyssey-contributions-wp-components";
import { Button } from "@okta/odyssey-react-mui";
import { userEvent, within } from "storybook/test";

import { OdysseyStorybookThemeDecorator } from "../../tools/OdysseyStorybookThemeDecorator.js";
import { WpComponentsStorybookThemeDecorator } from "../../tools/WpComponentsStorybookThemeDecorator.js";

const meta = {
  component: GraphActionDrawer,
  decorators: [
    OdysseyStorybookThemeDecorator,
    WpComponentsStorybookThemeDecorator,
  ],
  tags: ["autodocs"],
  args: {
    children: "Node detail content goes here.",
    title: "Node details",
  },
  render: function C(args) {
    // GraphActionDrawer has no trigger of its own — it only reacts to GraphCanvasStateProvider's
    // shared graph-action state — so every story needs something in the canvas that can set that
    // state, the same way a real consumer's own node/edge UI would. Defined here, nested inside
    // render, rather than at module scope, so it stays visible in Storybook's Code tab.
    const TriggerViewNodeDetailsButton = () => {
      const { triggerViewGraphNodeAction } = useGraphCanvasActions();
      return (
        <Button
          label="View node details"
          onClick={() => triggerViewGraphNodeAction("node-1")}
          variant="secondary"
        />
      );
    };

    return (
      <GraphCanvasStateProvider>
        <TriggerViewNodeDetailsButton />
        <GraphActionDrawer {...args} />
      </GraphCanvasStateProvider>
    );
  },
} satisfies Meta<typeof GraphActionDrawer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

// The drawer's open state has no controlling prop — it's fully driven by shared graph-action
// state — so a click on the trigger is the only deterministic way to reach it for VRT to capture.
export const Open: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(
      canvas.getByRole("button", { name: "View node details" }),
    );
  },
};
