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
  Chart,
  Credits,
  Legend,
  PlotOptions,
  Tooltip as Popover,
  XAxis,
  YAxis,
} from "@highcharts/react";
import { Accessibility } from "@highcharts/react/modules/Accessibility.js";
import { BarSeries } from "@highcharts/react/series/Bar.js";
import { memo, useMemo } from "react";

import type { CartesianChartProps } from "./utils/chartTypes.js";
import type { ChartValueFormat } from "./utils/formatChartValue.js";

import { useStableCallback } from "../useStableCallback.js";
import { ChartContainer } from "./components/ChartContainer.js";
import { ChartFrame } from "./components/ChartFrame.js";
import { ChartPopoverContent } from "./components/ChartPopoverContent.js";
import { useChartAnimation } from "./useChartAnimation.js";
import { useChartTokens } from "./utils/chartTokens.js";
import { getChartSeriesPointData } from "./utils/getChartSeriesPointData.js";
import { hasDuplicateSeries } from "./utils/hasDuplicateSeries.js";
import { useChartValueFormatter } from "./utils/useChartValueFormatter.js";
import { useStableValue } from "./utils/useStableValue.js";

/** The props for a bar chart. */
export type BarChartProps = CartesianChartProps & {
  /**
   * The format for the values on the horizontal axis. A bar chart shows its
   * numeric values on that axis. If no preset gives the format that you need,
   * supply a function.
   * @default "compact"
   */
  xAxisFormat?: ChartValueFormat;
};

const BarChartContent = ({
  ariaDescription,
  categories,
  onPointClick,
  pointPopoverValueFormat,
  series,
  xAxisFormat = "compact",
  xAxisLabel,
  yAxisLabel,
}: BarChartProps) => {
  const chartTokens = useChartTokens();
  const formatValue = useChartValueFormatter();

  if (hasDuplicateSeries({ series })) {
    throw new Error("This chart has two or more series with the same name.");
  }

  const animation = useChartAnimation();

  // This memo builds a click handler and formats the value for each point.
  // Highcharts registers a new click handler for a point whenever the
  // identity of that point's data changes. Without this memo, every render
  // would build new data, so Highcharts would tear down and re-register its
  // handlers even when nothing changed.
  //
  // This memo works because BarChart passes its props through
  // useStableValue. That hook keeps `series` at the same identity across a
  // render that does not change the data, so this memo does not rerun.
  // BarChart also passes `onPointClick` through useStableCallback, so an
  // inline handler from the caller keeps the same identity here.
  //
  // useStableValue compares a function by identity, not by what the function
  // does. `pointPopoverValueFormat` accepts a function, and this memo formats
  // each value at build time. So a caller that supplies a new function on
  // every render for that property still defeats this memo. Such a caller
  // needs its own useCallback.
  const seriesList = useMemo(
    () =>
      series.map((chartSeries) => ({
        chartSeries,
        pointData: getChartSeriesPointData({
          categories,
          chartSeries,
          formatValue,
          onPointClick,
          pointPopoverValueFormat,
        }),
      })),
    [categories, formatValue, onPointClick, pointPopoverValueFormat, series],
  );

  const hasLegend = useMemo(() => series.length > 1, [series.length]);

  const options = useMemo(
    () => ({
      chart: {
        animation,
        backgroundColor: chartTokens.chart.backgroundColor,
        spacingBottom: chartTokens.chart.edgeSpacing,
        spacingLeft: chartTokens.chart.edgeSpacing,
        spacingRight: chartTokens.chart.edgeSpacing,
        spacingTop: chartTokens.chart.topEdgeSpacing,
        style: { fontFamily: chartTokens.chart.fontFamily },
      },
      // Each series takes the next color from this list. So a change to the
      // order of `seriesColors`, in `chartTokens.ts`, changes the color of every
      // series.
      colors: chartTokens.seriesColors,
      // The chart library ships a default title text of "Chart title". Its
      // documented way to disable a title is a `text` of undefined, which draws
      // an empty text element that measures zero and so reserves no height. A
      // whole `title` of undefined does not work, because the React wrapper
      // always merges a `title` object over the `options` prop.
      subtitle: { text: undefined },
      title: { text: undefined },
    }),
    [animation, chartTokens],
  );

  const keyboardNavigation = useMemo(
    () => ({
      focusBorder: {
        margin: chartTokens.focusRing.offset,
        style: {
          borderRadius: chartTokens.focusRing.radius,
          color: chartTokens.focusRing.color,
          lineWidth: chartTokens.focusRing.width,
        },
      },
    }),
    [chartTokens],
  );
  const xAxisCrosshair = useMemo(
    () => ({
      color: chartTokens.axis.categoryHoverBandColor,
      zIndex: 0,
    }),
    [chartTokens],
  );
  const xAxisLabels = useMemo(
    () => ({ style: chartTokens.axis.valueStyle }),
    [chartTokens],
  );
  const xAxisTitle = useMemo(
    () => ({
      align: "middle" as const,
      // This axis draws down the left side, so its label is the rotated one.
      margin: chartTokens.axis.rotatedLabelSpacing,
      style: chartTokens.axis.labelStyle,
      text: yAxisLabel,
    }),
    [chartTokens, yAxisLabel],
  );
  const yAxisLabels = useMemo(
    () => ({
      formatter: (context: { value: unknown }) =>
        formatValue({
          format: xAxisFormat,
          value: Number(context.value),
        }),
      style: chartTokens.axis.valueStyle,
    }),
    [chartTokens, formatValue, xAxisFormat],
  );
  const yAxisTitle = useMemo(
    () => ({
      align: "middle" as const,
      margin: chartTokens.axis.uprightLabelSpacing,
      style: chartTokens.axis.labelStyle,
      text: xAxisLabel,
    }),
    [chartTokens, xAxisLabel],
  );
  const barPlotOptions = useMemo(
    () => ({
      borderRadius: chartTokens.bar.radius,
      borderWidth: 0,
      dataLabels: { enabled: false },
      states: {
        hover: { brightness: 0 },
      },
    }),
    [chartTokens],
  );
  const seriesPlotOptions = useMemo(() => ({ animation }), [animation]);

  return (
    <ChartContainer>
      <Chart options={options} type="bar">
        <Accessibility
          description={ariaDescription}
          enabled
          keyboardNavigation={keyboardNavigation}
          landmarkVerbosity="disabled"
        />
        <XAxis
          categories={categories}
          crosshair={xAxisCrosshair}
          gridLineColor={chartTokens.axis.lineColor}
          gridLineWidth={0}
          labels={xAxisLabels}
          lineColor={chartTokens.axis.lineColor}
          lineWidth={0}
          tickColor={chartTokens.axis.lineColor}
          tickLength={0}
          title={xAxisTitle}
        />
        <YAxis
          gridLineColor={chartTokens.axis.lineColor}
          gridLineWidth={chartTokens.axis.gridLineWidth}
          labels={yAxisLabels}
          lineColor="transparent"
          tickColor="transparent"
          title={yAxisTitle}
        />
        <Legend
          enabled={hasLegend}
          {...chartTokens.legend.shared}
          {...chartTokens.legend.default}
        />
        <Popover
          backgroundColor={chartTokens.popover.backgroundColor}
          borderColor={chartTokens.popover.borderColor}
          borderRadius={chartTokens.popover.borderRadius}
          borderWidth={chartTokens.popover.borderWidth}
          padding={chartTokens.popover.padding}
          shadow={false}
          shared
          style={chartTokens.popover.containerStyle}
        >
          <ChartPopoverContent
            categoryPlaceholder="{point.key}"
            chartTokens={chartTokens}
            isShared
            seriesLabelPlaceholder="{series.name}"
            valuePlaceholder="{point.custom.formattedValue}"
          />
        </Popover>
        <PlotOptions bar={barPlotOptions} series={seriesPlotOptions} />
        <Credits enabled={false} />
        {seriesList.map(({ chartSeries, pointData }) => (
          <BarSeries
            data={pointData}
            key={chartSeries.name}
            name={chartSeries.name}
          />
        ))}
      </Chart>
    </ChartContainer>
  );
};

// `BarChart` passes props that keep the same identity across a render. This
// memo then stops a render of the caller from reaching the children of
// `Chart`. A new child identity forces Highcharts to rebuild and redraw the
// whole chart.
const MemoizedBarChartContent = memo(BarChartContent);

/**
 * Renders a horizontal bar chart that gets its theme from Odyssey design
 * tokens. The chart plots each series against the shared `categories` of the
 * chart. Each value in a series lines up by index with a category, so a
 * series and `categories` must have the same length. If a value is `null`,
 * the chart draws a gap at that category, and not a bar with a value of
 * zero.
 */
const BarChart = (props: BarChartProps) => {
  // Highcharts rebuilds and redraws the whole chart when the identity of any
  // React child changes. A caller that builds the `series` array inside its
  // own render creates a new array on every render. That new array would
  // reach every child below this point.
  //
  // useStableValue holds one chart props object while its contents stay the same,
  // so `MemoizedBarChartContent` keeps the same children across those
  // renders.
  //
  // useStableValue cannot hold `onPointClick`, because it compares a function
  // by identity. An inline handler therefore arrives with a new identity on
  // each render of the caller, and every memo below misses. useStableCallback
  // wraps that handler in one callback of its own that keeps the same
  // identity, and calls the latest handler when a user clicks a point.
  //
  // useStableCallback also turns an absent handler into a callback that does
  // nothing. The chart attaches a click listener to a point as soon as it
  // finds one, so a chart with no `onPointClick` must pass nothing at all.
  // The condition below keeps that behavior, and returns the one stable
  // callback in every other case.
  const stableOnPointClick = useStableCallback(props.onPointClick);
  const stableOnRetry = useStableCallback(props.onRetry);
  const { hasError, isLoading, onRetry, subtitle, title, ...chartProps } =
    props;
  const stableChartProps = useStableValue({
    ...chartProps,
    onPointClick: props.onPointClick ? stableOnPointClick : undefined,
  });

  return (
    <ChartFrame
      hasError={hasError}
      isLoading={isLoading}
      onRetry={onRetry ? stableOnRetry : undefined}
      subtitle={subtitle}
      title={title}
    >
      <MemoizedBarChartContent {...stableChartProps} />
    </ChartFrame>
  );
};

const MemoizedBarChart = memo(BarChart);
MemoizedBarChart.displayName = "BarChart";

export { MemoizedBarChart as BarChart };
