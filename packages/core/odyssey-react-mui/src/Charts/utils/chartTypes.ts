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

import type { ChartValueFormat } from "./formatChartValue.js";

/**
 * One line on the chart. A series has a name and one value for each category.
 *
 * The chart holds the list of categories. A series holds only the values. Put
 * the values in the same order as the categories.
 *
 * A category is always text, such as `"Week 1"` or `"2026-08"`. If your data
 * has dates or times, put that data into groups of equal length first. A chart
 * that needs a true time axis uses a different series type. See
 * `docs/decisions/2026-08-21-chart-data-model-and-axis-api.md`.
 */
export type ChartSeries = {
  /**
   * The values of this series, one for each category, in the same order as
   * the chart's `categories`.
   *
   * An entry of `null` means the series has no measurement for that
   * category. The chart then draws a gap at that category. It does not draw
   * a point with a value of zero.
   */
  data: Array<number | null>;
  /**
   * The name of the series. The chart shows this name in the legend and in the
   * popover. Each series in one chart must have a different name.
   */
  name: string;
};

/**
 * A data point that the chart sends to an interaction callback, such as
 * `onPointClick`. The callback receives one point at a time, so the point
 * carries the name of its own series.
 */
export type ChartPoint = {
  /** The category that this point belongs to. */
  category: string;
  /** The name of the series that this point belongs to. */
  seriesName: ChartSeries["name"];
  /**
   * The measured value of this point. The type comes from one series value,
   * with `null` removed. The chart draws no point at a gap, so a user cannot
   * click one.
   */
  value: NonNullable<ChartSeries["data"][number]>;
};

/**
 * The parts of a point that hold no position. Every chart type gives these
 * parts to a point, whatever axes that chart has.
 *
 * `custom.formattedValue` holds the text that the popover shows. The chart
 * formats a value once, when it builds the point, so the popover does not
 * format that value again on each hover.
 *
 * `events` is absent when the caller supplies no click handler. Highcharts
 * attaches a listener when it finds an `events` property, so a point with no
 * click behavior must omit the property.
 */
export type ChartPointDecoration = {
  custom: { formattedValue: string };
  events?: { click: () => void };
};

/**
 * The properties for a chart that plots series against a category axis and a
 * value axis.
 * The layout around a chart often supplies its own heading in surrounding HTML,
 * so a chart may need neither `title` nor `subtitle`.
 */
export type CartesianChartProps = {
  /**
   * A text description of the chart for assistive technology. The chart
   * library puts this description in a hidden region of its own.
   */
  ariaDescription: string;
  /**
   * The categories on the horizontal axis, in the order that the chart shows
   * them. Each series in `series` supplies one value for each category, at
   * the same index.
   */
  categories: string[];
  /**
   * If `true`, the chart shows an error state in place of its series.
   * `isLoading` takes precedence over this property.
   */
  hasError?: boolean;
  /**
   * If `true`, the chart shows a loading state in place of its series.
   * `isLoading` takes precedence over `hasError`.
   */
  isLoading?: boolean;
  /** The chart calls this function when a user clicks a point. */
  onPointClick?: (point: ChartPoint) => void;
  /**
   * The chart calls this function when a user clicks the retry button in the
   * error state. The error state shows no retry button when the caller
   * omits this property.
   *
   * Set `isLoading` to `true` in this function, then set `hasError` to
   * `false` once the data arrives. `isLoading` takes precedence over
   * `hasError`, so the loading state replaces the error state for the length
   * of the request. Leaving `isLoading` alone holds the error state, and its
   * retry button, on screen while the request is in flight.
   */
  onRetry?: () => void;
  /**
   * The format for the value in the popover of a point. If you omit this
   * property, the popover shows the value in full.
   */
  pointPopoverValueFormat?: ChartValueFormat;
  /**
   * The series that the chart plots. Each series is a set of values with a
   * name. Each value lines up by index with the chart's `categories`.
   */
  series: ChartSeries[];
  /**
   * The subtitle of the chart. The chart shows the subtitle below the title. A
   * subtitle gives more information about the title, so the chart ignores a
   * subtitle that arrives with no title.
   */
  subtitle?: string;
  /** The title of the chart. */
  title?: string;
  /** The label for the horizontal axis. */
  xAxisLabel?: string;
  /** The label for the vertical axis. */
  yAxisLabel?: string;
};
