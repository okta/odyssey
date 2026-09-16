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

import {
  type ContrastMode,
  createOdysseyStyledComponent,
  OdysseyThemeProvider,
} from "@okta/odyssey-react-mui";
import { type ReactNode } from "react";

/**
 * Shared layout primitives for "board" stories: a labelled grid for
 * `AllVariants` that takes either a fixed column count or a minimum column
 * width, a wrapping row for `AllSizes`/`AllStates`, a titled section so
 * a reviewer can read what a board is showing, and a white-vs-gray
 * `StoryContrastBoard` for components whose appearance changes with the
 * background contrast. Consolidating the per-variant stories into these boards
 * cuts the number of Applitools captures (one dense snapshot replaces N
 * single-variant snapshots) while surfacing every variant in a single view.
 *
 * Board stories render a fixed matrix and ignore args, so their Controls panel
 * would otherwise show knobs that do nothing. `staticBoardParameters` disables
 * controls and labels them as static showcases; the interactive `Playground`
 * story is where controls apply.
 */

export const staticBoardParameters = {
  controls: { disable: true },
  docs: {
    description: {
      story:
        "Static showcase. The Playground story is the interactive one where controls apply.",
    },
  },
};

const StyledGrid = createOdysseyStyledComponent({
  tag: "div",
  shouldForwardProp: (prop) => prop !== "columns" && prop !== "minColumnWidth",
})<{ columns: number; minColumnWidth?: string }>(
  ({ columns, minColumnWidth, odysseyDesignTokens }) => ({
    alignItems: "start",
    display: "grid",
    gap: odysseyDesignTokens.Spacing4,
    // `minmax` treats its minimum as a floor that a track may not go under, so
    // a bare `minColumnWidth` overflows the canvas once the canvas is narrower
    // than one column. The `min()` lets the single remaining column fall back
    // to the width of the canvas instead.
    gridTemplateColumns: minColumnWidth
      ? `repeat(auto-fit, minmax(min(${minColumnWidth}, 100%), 1fr))`
      : `repeat(${columns}, minmax(0, 1fr))`,
  }),
);

const StyledCell = createOdysseyStyledComponent({
  tag: "div",
  shouldForwardProp: (prop) => prop !== "hasFilledWidth",
})<{ hasFilledWidth: boolean }>(({ hasFilledWidth, odysseyDesignTokens }) => ({
  alignItems: hasFilledWidth ? "stretch" : "start",
  display: "flex",
  flexDirection: "column",
  gap: odysseyDesignTokens.Spacing2,
}));

const StyledCellLabel = createOdysseyStyledComponent({ tag: "span" })(
  ({ odysseyDesignTokens }) => ({
    color: odysseyDesignTokens.TypographyColorSubordinate,
    fontFamily: odysseyDesignTokens.TypographyFamilyMono,
    fontSize: odysseyDesignTokens.TypographySizeOverline,
  }),
);

const StyledRow = createOdysseyStyledComponent({ tag: "div" })(
  ({ odysseyDesignTokens }) => ({
    alignItems: "center",
    display: "flex",
    flexWrap: "wrap",
    gap: odysseyDesignTokens.Spacing4,
  }),
);

const StyledSection = createOdysseyStyledComponent({ tag: "section" })(
  ({ odysseyDesignTokens }) => ({
    display: "flex",
    flexDirection: "column",
    gap: odysseyDesignTokens.Spacing3,
  }),
);

// A styled paragraph rather than a heading element: a lone heading inside the
// story canvas would trip axe's heading-order rule that Applitools enforces.
const StyledSectionTitle = createOdysseyStyledComponent({ tag: "p" })(
  ({ odysseyDesignTokens }) => ({
    color: odysseyDesignTokens.TypographyColorSubordinate,
    fontSize: odysseyDesignTokens.TypographySizeBody,
    fontWeight: odysseyDesignTokens.TypographyWeightBodyBold,
    margin: 0,
  }),
);

export const StoryGrid = ({
  children,
  columns = 4,
  minColumnWidth,
}: {
  children: ReactNode;
  /**
   * The number of columns the grid draws at every canvas width. The grid
   * ignores this count when `minColumnWidth` has a value.
   */
  columns?: number;
  /**
   * The narrowest a column may be, as a CSS length. The grid then fits as many
   * columns of at least this width as the canvas holds, and wraps the rest onto
   * a new row. Use this for a cell whose content is unreadable under a given
   * width, such as a chart.
   */
  minColumnWidth?: string;
}) => (
  <StyledGrid columns={columns} minColumnWidth={minColumnWidth}>
    {children}
  </StyledGrid>
);

export const StoryCell = ({
  children,
  hasFilledWidth = false,
  label,
}: {
  children: ReactNode;
  /**
   * If `true`, the content of the cell fills the width of the cell rather than
   * shrinking to its own content. Use this for content that measures its own
   * container to size itself.
   */
  hasFilledWidth?: boolean;
  label: string;
}) => (
  <StyledCell hasFilledWidth={hasFilledWidth}>
    <StyledCellLabel>{label}</StyledCellLabel>

    {children}
  </StyledCell>
);

export const StoryRow = ({ children }: { children: ReactNode }) => (
  <StyledRow>{children}</StyledRow>
);

// A block-level grid item. Fields like Checkbox and Radio render their control
// and their hint as sibling elements, so placing one directly in a grid drops
// the hint into the next grid column. Wrapping each field keeps its control and
// hint together in a single cell while preserving the field's native spacing.
const StyledFieldCell = createOdysseyStyledComponent({ tag: "div" })(() => ({
  display: "block",
}));

export const StoryFieldCell = ({ children }: { children: ReactNode }) => (
  <StyledFieldCell>{children}</StyledFieldCell>
);

// A StoryCell shrink-wraps to its widest child, which for an intrinsically
// sized field (Autocomplete) is the label or hint rather than the control. That
// leaves controls at different widths across a row and each one narrower than
// its column, so a field that does not size itself needs to be told to fill.
const StyledFilledWidth = createOdysseyStyledComponent({ tag: "div" })({
  width: "100%",
});

export const StoryFilledWidth = ({ children }: { children: ReactNode }) => (
  <StyledFilledWidth>{children}</StyledFilledWidth>
);

// Overflow and truncation only show up when the component is narrower than its
// content, so a board cell demonstrating them needs a bounded width.
const StyledConstrainedWidth = createOdysseyStyledComponent({
  tag: "div",
  shouldForwardProp: (prop) => prop !== "width",
})<{ width: string }>(({ width }) => ({
  width,
}));

export const StoryConstrainedWidth = ({
  children,
  width = "200px",
}: {
  children: ReactNode;
  width?: string;
}) => <StyledConstrainedWidth width={width}>{children}</StyledConstrainedWidth>;

export const StorySection = ({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) => (
  <StyledSection>
    <StyledSectionTitle>{title}</StyledSectionTitle>

    {children}
  </StyledSection>
);

const StyledContrastPanel = createOdysseyStyledComponent({
  tag: "div",
  shouldForwardProp: (prop) => prop !== "contrastMode",
})<{ contrastMode: ContrastMode }>(({ contrastMode, odysseyDesignTokens }) => ({
  backgroundColor:
    contrastMode === "highContrast"
      ? odysseyDesignTokens.HueNeutral50
      : odysseyDesignTokens.HueNeutralWhite,
  borderRadius: odysseyDesignTokens.BorderRadiusTight,
  display: "flex",
  flexDirection: "column",
  gap: odysseyDesignTokens.Spacing2,
  padding: odysseyDesignTokens.Spacing4,
}));

// Contrast-aware components (e.g. Tag) read `contrastMode` from context. Forcing
// the mode explicitly rather than relying on background auto-detection keeps the
// board deterministic regardless of the surrounding page background.
export const StoryContrastBoard = ({ children }: { children: ReactNode }) => (
  <StoryRow>
    {(
      [
        { contrastMode: "lowContrast", label: "white (lowContrast)" },
        { contrastMode: "highContrast", label: "gray (highContrast)" },
      ] as const
    ).map(({ contrastMode, label }) => (
      <StyledContrastPanel contrastMode={contrastMode} key={contrastMode}>
        <StyledCellLabel>{label}</StyledCellLabel>

        <OdysseyThemeProvider
          contrastMode={contrastMode}
          hasWrapperElement={false}
        >
          {children}
        </OdysseyThemeProvider>
      </StyledContrastPanel>
    ))}
  </StoryRow>
);
