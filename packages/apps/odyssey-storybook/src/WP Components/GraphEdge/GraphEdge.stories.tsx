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
import type { ComponentProps } from "react";

import {
  GraphCanvasStateProvider,
  GraphEdge,
} from "@okta/odyssey-contributions-wp-components";
import { userEvent, within } from "storybook/test";

import {
  staticBoardParameters,
  StoryCell,
  StoryGrid,
  StorySection,
} from "../../tools/boardStoryHelpers.js";
import { OdysseyStorybookThemeDecorator } from "../../tools/OdysseyStorybookThemeDecorator.js";
import { WpComponentsStorybookThemeDecorator } from "../../tools/WpComponentsStorybookThemeDecorator.js";

// Generous enough that the line's own handles, the widest focus ring, and the label chip never
// sit flush against the canvas edge, regardless of which sourceX/sourceY/targetX/targetY combination
// a story (or the Playground controls) uses.
const STORY_CANVAS_PADDING = 60;

/**
 * The `<svg>` box a GraphEdge story needs so `sourceX`/`sourceY`/`targetX`/`targetY` are always
 * inside it — sized and positioned (via `viewBox`) around whatever those four points are, rather
 * than a fixed guess that clips a story using a larger or differently placed edge.
 */
const getStoryCanvasBounds = ({
  sourceX,
  sourceY,
  targetX,
  targetY,
}: Pick<
  ComponentProps<typeof GraphEdge>,
  "sourceX" | "sourceY" | "targetX" | "targetY"
>) => ({
  height: Math.abs(targetY - sourceY) + STORY_CANVAS_PADDING * 2,
  minX: Math.min(sourceX, targetX) - STORY_CANVAS_PADDING,
  minY: Math.min(sourceY, targetY) - STORY_CANVAS_PADDING,
  width: Math.abs(targetX - sourceX) + STORY_CANVAS_PADDING * 2,
});

const renderGraphEdgeCanvas = (edgeProps: ComponentProps<typeof GraphEdge>) => {
  const bounds = getStoryCanvasBounds(edgeProps);

  return (
    <GraphCanvasStateProvider>
      <svg
        height={bounds.height}
        viewBox={`${bounds.minX} ${bounds.minY} ${bounds.width} ${bounds.height}`}
        width={bounds.width}
      >
        <GraphEdge {...edgeProps} />
      </svg>
    </GraphCanvasStateProvider>
  );
};

const meta = {
  component: GraphEdge,
  decorators: [
    OdysseyStorybookThemeDecorator,
    WpComponentsStorybookThemeDecorator,
  ],
  tags: ["autodocs"],
  args: {
    edgeId: "edge-1",
    isActive: true,
    label: "Grants access",
    sourceX: 40,
    sourceY: 100,
    targetX: 360,
    targetY: 100,
  },
} satisfies Meta<typeof GraphEdge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: function C(args) {
    return renderGraphEdgeCanvas(args);
  },
};

export const AllVariants: Story = {
  parameters: staticBoardParameters,
  render: function C(args) {
    return (
      <StorySection title="Every GraphEdge shape and content combination.">
        <StoryGrid columns={2}>
          <StoryCell label="Labeled">{renderGraphEdgeCanvas(args)}</StoryCell>
          <StoryCell label="Unlabeled">
            {renderGraphEdgeCanvas({ ...args, label: undefined })}
          </StoryCell>
          <StoryCell label="Inactive, labeled">
            {renderGraphEdgeCanvas({ ...args, isActive: false })}
          </StoryCell>
          <StoryCell label="Inactive, unlabeled">
            {renderGraphEdgeCanvas({
              ...args,
              isActive: false,
              label: undefined,
            })}
          </StoryCell>
          {/* sourceY/targetY are equal in the base args, which collapses getBezierPath's curve
              into a visually straight line — these show its actual S-curve, in every vertical
              direction and both left-to-right and right-to-left (the latter also exercising the
              arrowhead's own flip at the target end). Each is paired with an unlabeled version,
              since the tooltip anchors to the label chip when one is present but to the curve's
              own midpoint otherwise. */}
          <StoryCell label="Curved down">
            {renderGraphEdgeCanvas({
              ...args,
              sourceX: 40,
              sourceY: 40,
              targetX: 360,
              targetY: 240,
            })}
          </StoryCell>
          <StoryCell label="Curved down, unlabeled">
            {renderGraphEdgeCanvas({
              ...args,
              label: undefined,
              sourceX: 40,
              sourceY: 40,
              targetX: 360,
              targetY: 240,
            })}
          </StoryCell>
          <StoryCell label="Curved up">
            {renderGraphEdgeCanvas({
              ...args,
              sourceX: 40,
              sourceY: 240,
              targetX: 360,
              targetY: 40,
            })}
          </StoryCell>
          <StoryCell label="Curved up, unlabeled">
            {renderGraphEdgeCanvas({
              ...args,
              label: undefined,
              sourceX: 40,
              sourceY: 240,
              targetX: 360,
              targetY: 40,
            })}
          </StoryCell>
          <StoryCell label="Curved down, reversed">
            {renderGraphEdgeCanvas({
              ...args,
              sourceX: 360,
              sourceY: 40,
              targetX: 40,
              targetY: 240,
            })}
          </StoryCell>
          <StoryCell label="Curved down, reversed, unlabeled">
            {renderGraphEdgeCanvas({
              ...args,
              label: undefined,
              sourceX: 360,
              sourceY: 40,
              targetX: 40,
              targetY: 240,
            })}
          </StoryCell>
          <StoryCell label="Curved up, reversed">
            {renderGraphEdgeCanvas({
              ...args,
              sourceX: 360,
              sourceY: 240,
              targetX: 40,
              targetY: 40,
            })}
          </StoryCell>
          <StoryCell label="Curved up, reversed, unlabeled">
            {renderGraphEdgeCanvas({
              ...args,
              label: undefined,
              sourceX: 360,
              sourceY: 240,
              targetX: 40,
              targetY: 40,
            })}
          </StoryCell>
        </StoryGrid>
      </StorySection>
    );
  },
};

// Hover, select, and focus have no controlling prop, so a real interaction is the only
// deterministic way to reach each one for VRT to capture its line/handle/chip styling — the
// board convention above doesn't apply here since a board can't carry a play function. These
// keep the meta's default label (rather than overriding it to undefined, like AllVariants' own
// unlabeled cells do) so the chip's own hover/select/focus styling — its border and focus ring —
// is actually captured here too, not just the line and handles.
export const Hover: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.hover(
      canvas.getByRole("button", { name: "View connection details" }),
    );
  },
  render: Playground.render,
};

export const Select: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(
      canvas.getByRole("button", { name: "View connection details" }),
    );
  },
  render: Playground.render,
};

export const Focus: Story = {
  play: async () => {
    await userEvent.tab();
  },
  render: Playground.render,
};
