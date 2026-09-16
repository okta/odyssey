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

import type { DesignTokens } from "../OdysseyDesignTokensContext.js";

export type ChartPopoverContentProps = {
  /**
   * The Highcharts format-string placeholder for the popover header.
   * Highcharts substitutes the value when it renders the popover. For example
   * `"{point.key}"`.
   */
  categoryPlaceholder: string;
  /**
   * If `true`, the series row repeats once for each point in the category
   * under the pointer. The component puts that row inside the Highcharts
   * `{#each points}` block, which repeats it. If `false`, the component
   * renders the one row that a per-point popover needs.
   * @default false
   */
  isShared?: boolean;
  /**
   * The Odyssey design tokens. The caller passes the tokens as a prop because
   * this component cannot read them from the context. See the note on
   * {@link ChartPopoverContent}.
   */
  odysseyDesignTokens: DesignTokens;
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
 * Renders the contents of a chart popover, styled with the Odyssey design
 * tokens. The component renders a category header, then one series row. If
 * `isShared` is `true`, that row repeats once for each point under the
 * pointer. If `isShared` is `false`, the component shows exactly one row.
 * This lets one component serve both a per-point popover and a shared
 * popover.
 *
 * The caller passes this component as the JSX children of the `<Tooltip>`
 * component from `@highcharts/react`. `<Tooltip>` turns those children into
 * an HTML string. It never mounts them through React.
 *
 * That conversion to HTML is why the restrictions below apply. Testing found
 * each restriction. No restriction was guessed from how Highcharts should
 * work.
 * - Do not call hooks in this component.
 * - Do not wrap this component in `styled()`. Do not wrap it in
 *   `createOdysseyStyledComponent` either. This is why the tokens arrive as
 *   a prop, and the styles stay inline.
 * - Do not wrap this component in `React.memo`.
 * - Write the `isShared` each-block without parentheses. Write
 *   `{#each points}`, not `{#each(points)}`. The parenthesized form turns
 *   `points` into the text `[object Object]` for each point, with no error
 *   message. It also leaves the `#each` and `/each` markers as plain text
 *   instead of running the loop.
 * - Keep the each-block markers and the row as separate JSX elements, not as
 *   text inside one string. The serializer escapes HTML tag characters found
 *   inside a plain string child, before Highcharts reads the format string.
 *   So the row itself must stay real JSX elements, such as `<div>`, and not
 *   a string that contains tag text. The `{#each points}` and `{/each}`
 *   markers are separate string expressions, placed next to the row element
 *   as siblings, not combined into the same string as the row's markup.
 *
 * If the code breaks any of these rules, Highcharts renders an empty box
 * instead of the popover. Do not use this pattern outside this file.
 *
 * Write every inline style value as a string that includes its unit. The
 * serializer does not add units to a plain number. Instead, it drops the
 * style rule, with no error message.
 *
 * Highcharts escapes the values it inserts into the placeholders. This
 * component does not escape them again.
 *
 * @see docs/decisions/2026-08-18-chart-tooltip-plain-serializable-component.md
 * @see docs/decisions/2026-08-21-shared-chart-tooltip-each-block.md
 */
export const ChartPopoverContent = ({
  categoryPlaceholder,
  isShared,
  odysseyDesignTokens,
  seriesLabelPlaceholder,
  valuePlaceholder,
}: ChartPopoverContentProps) => {
  const row = (
    <div
      style={{
        color: odysseyDesignTokens.TypographyColorBody,
        fontSize: odysseyDesignTokens.TypographySizeBody,
        marginBlockStart: odysseyDesignTokens.Spacing1,
      }}
    >
      {seriesLabelPlaceholder}
      {/*
       * Highcharts removes the `translate="no"` attribute when it
       * serializes this markup. It keeps the `notranslate` class name,
       * which browsers' translation tools also respect.
       */}
      <span className="notranslate">{": "}</span>
      <span
        style={{ fontWeight: odysseyDesignTokens.TypographyWeightBodyBold }}
      >
        {valuePlaceholder}
      </span>
    </div>
  );

  return (
    <div>
      <div
        style={{
          color: odysseyDesignTokens.TypographyColorBody,
          fontSize: odysseyDesignTokens.TypographySizeBody,
          fontWeight: odysseyDesignTokens.TypographyWeightBodyBold,
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
