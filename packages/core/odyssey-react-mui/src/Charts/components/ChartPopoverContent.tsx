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

import { type CSSProperties, Fragment } from "react";

import type { ChartTokens } from "../utils/chartTokens.js";

/**
 * The marker shapes that a chart popover can draw. The names match the
 * Highcharts marker symbols of the same shape.
 */
export type ChartMarkerSymbol =
  | "circle"
  | "diamond"
  | "square"
  | "triangle"
  | "triangleDown";

/**
 * The visual mark that sits before a series label in a chart popover. It
 * carries the color of the series.
 * - If `'swatch'`, the popover draws the color in a rounded square. A chart
 *   whose series fill a shape, such as a bar chart, asks for this.
 * - If `'lineMarker'`, the popover draws the color as a line with the marker
 *   of the series at its center. A line chart asks for this, and it passes the
 *   marker symbols of its series in plotted order.
 */
export type ChartPopoverIndicator =
  | { type: "swatch" }
  | { symbols: readonly ChartMarkerSymbol[]; type: "lineMarker" };

// The CSS that draws each marker shape inside a popover. The chart itself
// draws its markers as SVG through Highcharts, which the popover cannot reuse,
// because Highcharts serializes the popover to HTML. The square needs no rule,
// because a plain box is already a square.
const MARKER_SYMBOL_STYLES = {
  circle: { borderRadius: "50%" },
  diamond: { clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" },
  square: {},
  triangle: { clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)" },
  triangleDown: { clipPath: "polygon(0% 0%, 100% 0%, 50% 100%)" },
} as const satisfies Record<ChartMarkerSymbol, CSSProperties>;

export type ChartPopoverContentProps = {
  /**
   * The Highcharts format-string placeholder for the popover header.
   * Highcharts substitutes the value when it renders the popover. For example
   * `"{point.key}"`.
   */
  categoryPlaceholder: string;
  /**
   * The chart tokens from `useChartTokens`. The caller passes them as a prop
   * because this component cannot read the token context. See the note on
   * {@link ChartPopoverContent}.
   */
  chartTokens: ChartTokens;
  /**
   * If `true`, the series row repeats once for each point in the category
   * under the pointer. The component puts that row inside the Highcharts
   * `{#each points}` block, which repeats it. If `false`, the component
   * renders the one row that a per-point popover needs.
   * @default false
   */
  isShared?: boolean;
  /**
   * The visual mark that sits before the series label. The chart that owns the
   * popover chooses the mark, and it passes the marker symbols that its own
   * series use. See {@link ChartPopoverIndicator}.
   * @default { type: "swatch" }
   */
  seriesIndicator?: ChartPopoverIndicator;
  /**
   * The Highcharts format-string placeholder for the series label line. For
   * example `"{series.name}"`.
   */
  seriesLabelPlaceholder: string;
  /**
   * The Highcharts format-string placeholder for the value that the popover
   * shows. For example `"{point.custom.formattedValue}"`, which holds the
   * value already formatted for the user's locale. The placeholder
   * `"{point.y}"` renders the raw number and ignores the locale format.
   */
  valuePlaceholder: string;
};

/**
 * Renders chart popover contents as JSX that `@highcharts/react` serializes
 * into a Highcharts format string. It is not mounted as a React component.
 *
 * Keep this component plain and serializable:
 * - Pass tokens as props. Do not add hooks, styled wrappers, or memoization.
 * - Keep `{#each points}` and `{/each}` as separate string expressions around
 *   the row. Do not parenthesize `points` or put the row markup in a string;
 *   Highcharts otherwise treats the loop as text or escapes the markup.
 * - Include units in inline style values. Highcharts drops numeric values
 *   instead of adding units to them.
 *
 * The component owns the markup and indicator choice so callers do not have to
 * reproduce these serialization rules. Highcharts escapes values substituted
 * into placeholders, so this component does not escape them again.
 *
 * @see docs/decisions/2026-08-18-chart-tooltip-plain-serializable-component.md
 * @see docs/decisions/2026-08-21-shared-chart-tooltip-each-block.md
 */
export const ChartPopoverContent = ({
  categoryPlaceholder,
  chartTokens,
  isShared,
  seriesIndicator = { type: "swatch" },
  seriesLabelPlaceholder,
  valuePlaceholder,
}: ChartPopoverContentProps) => {
  const indicator =
    seriesIndicator.type === "lineMarker" ? (
      <span
        aria-hidden="true"
        style={{
          display: "inline-block",
          height: chartTokens.popover.content.lineIndicatorSize,
          position: "relative",
          width: chartTokens.popover.content.lineIndicatorSize,
        }}
      >
        <span
          style={{
            backgroundColor: "{point.color}",
            height: chartTokens.popover.content.lineIndicatorThickness,
            insetBlockStart: "50%",
            insetInlineStart: "0px",
            position: "absolute",
            transform: "translateY(-50%)",
            width: "100%",
          }}
        />

        {seriesIndicator.symbols.map((symbol, symbolIndex) => (
          <Fragment key={symbol}>
            {`{#if (eq series.symbolIndex ${symbolIndex})}`}
            <span
              style={{
                backgroundColor: "{point.color}",
                display: "block",
                height: chartTokens.popover.content.lineMarkerSize,
                insetBlockStart: "50%",
                insetInlineStart: "50%",
                position: "absolute",
                transform: "translate(-50%, -50%)",
                width: chartTokens.popover.content.lineMarkerSize,
                ...MARKER_SYMBOL_STYLES[symbol],
              }}
            />
            {"{/if}"}
          </Fragment>
        ))}
      </span>
    ) : (
      <span
        aria-hidden="true"
        style={{
          backgroundColor: "{point.color}",
          borderRadius: chartTokens.popover.content.swatchRadius,
          display: "inline-block",
          height: chartTokens.popover.content.swatchSize,
          width: chartTokens.popover.content.swatchSize,
        }}
      />
    );

  const row = (
    <div
      style={{
        alignItems: "center",
        color: chartTokens.popover.content.textColor,
        display: "flex",
        fontSize: chartTokens.popover.content.fontSize,
        gap: chartTokens.popover.content.rowGap,
        marginBlockStart: chartTokens.popover.content.rowSpacing,
      }}
    >
      {indicator}
      <span>
        {seriesLabelPlaceholder}
        {/*
         * Highcharts removes the `translate="no"` attribute when it
         * serializes this markup. It keeps the `notranslate` class name,
         * which browsers' translation tools also respect.
         */}
        <span className="notranslate">{": "}</span>
        <span
          style={{ fontWeight: chartTokens.popover.content.boldFontWeight }}
        >
          {valuePlaceholder}
        </span>
      </span>
    </div>
  );

  return (
    <div>
      <div
        style={{
          color: chartTokens.popover.content.textColor,
          fontSize: chartTokens.popover.content.fontSize,
          fontWeight: chartTokens.popover.content.boldFontWeight,
        }}
      >
        {categoryPlaceholder}
      </div>
      {isShared ? (
        <>
          {"{#each points}"}
          {row}
          {"{/each}"}
        </>
      ) : (
        row
      )}
    </div>
  );
};

ChartPopoverContent.displayName = "ChartPopoverContent";
