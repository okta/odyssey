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
import { LineSeries } from "@highcharts/react/series/Line.js";
import { memo, useMemo } from "react";

import type { CartesianChartProps } from "./chartTypes.js";
import type { ChartValueFormat } from "./formatChartValue.js";

import { useMediaQuery } from "../theme/useMediaQuery.js";
import { useStableCallback } from "../useStableCallback.js";
import { ChartFrame } from "./ChartFrame.js";
import { ChartPopoverContent } from "./ChartPopoverContent.js";
import { useChartTokens } from "./chartTokens.js";
import { getChartSeriesPointData } from "./getChartSeriesPointData.js";
import { hasDuplicateSeries } from "./hasDuplicateSeries.js";
import { useChartValueFormatter } from "./useChartValueFormatter.js";
import { useStableValue } from "./useStableValue.js";

const REDUCED_MOTION_CONDITION = "(prefers-reduced-motion: reduce)";

/** The props for a line chart. */
export type LineChartProps = CartesianChartProps & {
  /**
   * The format for the values on the vertical axis. A line chart shows its
   * numeric values on that axis. If no preset gives the format that you need,
   * supply a function.
   * @default "compact"
   */
  yAxisFormat?: ChartValueFormat;
};

const LineChartContent = ({
  ariaDescription,
  categories,
  onPointClick,
  pointPopoverValueFormat,
  series,
  xAxisLabel,
  yAxisFormat = "compact",
  yAxisLabel,
}: LineChartProps) => {
  const {
    animationDuration,
    axisLabelStyle,
    axisValueStyle,
    bodyFontFamily,
    borderColor,
    borderWidth,
    chartBackgroundColor,
    crosshairColor,
    crosshairWidth,
    edgeSpacing,
    focusRingColor,
    focusRingOffset,
    focusRingRadius,
    focusRingWidth,
    legendItemHiddenStyle,
    legendItemHoverStyle,
    legendItemSpacing,
    legendItemStyle,
    legendLineSymbolHeight,
    legendLineSymbolWidth,
    legendSpacing,
    legendSymbolSpacing,
    lineHoverStrokeWidthPlus,
    lineMarkerHoverHaloOpacity,
    lineMarkerHoverHaloRadius,
    lineMarkerHoverRadius,
    lineMarkerRadius,
    lineStrokeWidth,
    odysseyDesignTokens,
    popoverBackgroundColor,
    popoverRadius,
    popoverSpacing,
    popoverStyle,
    seriesColors,
    topEdgeSpacing,
    xAxisLabelSpacing,
    yAxisLabelSpacing,
  } = useChartTokens();
  const prefersReducedMotion = useMediaQuery(REDUCED_MOTION_CONDITION);
  const formatValue = useChartValueFormatter();

  if (hasDuplicateSeries({ series })) {
    throw new Error("This chart has two or more series with the same name.");
  }

  const animation = prefersReducedMotion
    ? (false as const)
    : { duration: animationDuration };

  // This memo builds a click handler and formats the value for each point.
  // Highcharts registers a new click handler for a point whenever the
  // identity of that point's data changes. Without this memo, every render
  // would build new data, so Highcharts would tear down and re-register its
  // handlers even when nothing changed.
  //
  // This memo works because LineChart passes its props through
  // useStableValue. That hook keeps `series` at the same identity across a
  // render that does not change the data, so this memo does not rerun.
  // LineChart also passes `onPointClick` through useStableCallback, so an
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

  const options = {
    chart: {
      animation,
      backgroundColor: chartBackgroundColor,
      spacingBottom: edgeSpacing,
      spacingLeft: edgeSpacing,
      spacingRight: edgeSpacing,
      spacingTop: topEdgeSpacing,
      style: { fontFamily: bodyFontFamily },
    },
    // Each series takes the next color from this list. So a change to the
    // order of `seriesColors`, in `chartTokens.ts`, changes the color of every
    // series.
    colors: seriesColors,
    // The chart library ships a default title text of "Chart title". Its
    // documented way to disable a title is a `text` of undefined, which draws
    // an empty text element that measures zero and so reserves no height. A
    // whole `title` of undefined does not work, because the React wrapper
    // always merges a `title` object over the `options` prop.
    subtitle: { text: undefined },
    title: { text: undefined },
  };

  return (
    <Chart options={options} type="line">
      <Accessibility
        description={ariaDescription}
        enabled
        keyboardNavigation={{
          focusBorder: {
            margin: focusRingOffset,
            style: {
              borderRadius: focusRingRadius,
              color: focusRingColor,
              lineWidth: focusRingWidth,
            },
          },
        }}
        landmarkVerbosity="disabled"
      />
      <XAxis
        categories={categories}
        crosshair={{ color: crosshairColor, width: crosshairWidth }}
        gridLineColor={borderColor}
        gridLineWidth={0}
        labels={{ style: axisValueStyle }}
        lineColor={borderColor}
        lineWidth={0}
        tickColor={borderColor}
        tickLength={0}
        title={{
          align: "middle",
          margin: xAxisLabelSpacing,
          style: axisLabelStyle,
          text: xAxisLabel,
        }}
      />
      <YAxis
        gridLineColor={borderColor}
        gridLineWidth={borderWidth}
        labels={{
          formatter: (context) =>
            formatValue({
              format: yAxisFormat,
              value: Number(context.value),
            }),
          style: axisValueStyle,
        }}
        lineColor="transparent"
        tickColor="transparent"
        title={{
          align: "middle",
          margin: yAxisLabelSpacing,
          style: axisLabelStyle,
          text: yAxisLabel,
        }}
      />
      <Legend
        borderWidth={0}
        enabled={hasLegend}
        itemDistance={legendItemSpacing}
        itemHiddenStyle={legendItemHiddenStyle}
        itemHoverStyle={legendItemHoverStyle}
        itemStyle={legendItemStyle}
        margin={legendSpacing}
        padding={0}
        symbolHeight={legendLineSymbolHeight}
        symbolPadding={legendSymbolSpacing}
        symbolWidth={legendLineSymbolWidth}
      />
      <Popover
        backgroundColor={popoverBackgroundColor}
        borderColor={borderColor}
        borderRadius={popoverRadius}
        borderWidth={borderWidth}
        padding={popoverSpacing}
        shadow={false}
        shared
        style={popoverStyle}
      >
        <ChartPopoverContent
          categoryPlaceholder="{point.key}"
          isShared
          odysseyDesignTokens={odysseyDesignTokens}
          seriesLabelPlaceholder="{series.name}"
          valuePlaceholder="{point.custom.formattedValue}"
        />
      </Popover>
      <PlotOptions
        line={{
          dataLabels: { enabled: false },
          lineWidth: lineStrokeWidth,
          marker: {
            lineWidth: 0,
            radius: lineMarkerRadius,
            states: {
              hover: {
                lineWidthPlus: 0,
                radius: lineMarkerHoverRadius,
              },
            },
          },
          states: {
            hover: {
              halo: {
                opacity: lineMarkerHoverHaloOpacity,
                size: lineMarkerHoverHaloRadius,
              },
              lineWidthPlus: lineHoverStrokeWidthPlus,
            },
          },
        }}
        series={{ animation }}
      />
      <Credits enabled={false} />
      {seriesList.map(({ chartSeries, pointData }) => (
        <LineSeries
          data={pointData}
          key={chartSeries.name}
          name={chartSeries.name}
        />
      ))}
    </Chart>
  );
};

// `LineChart` passes props that keep the same identity across a render. This
// memo then stops a render of the caller from reaching the children of
// `Chart`. A new child identity forces Highcharts to rebuild and redraw the
// whole chart.
const MemoizedLineChartContent = memo(LineChartContent);

/**
 * Renders a line chart that gets its theme from Odyssey design tokens. The
 * chart plots each series against the shared `categories` of the chart. Each
 * value in a series lines up by index with a category, so a series and
 * `categories` must have the same length. If a value is `null`, the chart
 * draws a gap at that category, and not a point with a value of zero.
 *
 * The chart also gives a different marker shape to each series. The shape lets
 * a user identify a series without color. The chart library applies its five
 * built-in shapes in series order. A sixth series repeats the first shape.
 */
const LineChart = (props: LineChartProps) => {
  // Highcharts rebuilds and redraws the whole chart when the identity of any
  // React child changes. A caller that builds the `series` array inside its
  // own render creates a new array on every render. That new array would
  // reach every child below this point.
  //
  // useStableValue holds one props object while its contents stay the same,
  // so `MemoizedLineChartContent` keeps the same children across those
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
  const stableProps = useStableValue({
    ...props,
    onPointClick: props.onPointClick ? stableOnPointClick : undefined,
  });

  return (
    <ChartFrame
      hasError={stableProps.hasError}
      isLoading={stableProps.isLoading}
      onRetry={stableProps.onRetry}
      subtitle={stableProps.subtitle}
      title={stableProps.title}
    >
      <MemoizedLineChartContent {...stableProps} />
    </ChartFrame>
  );
};

const MemoizedLineChart = memo(LineChart);
MemoizedLineChart.displayName = "LineChart";

export { MemoizedLineChart as LineChart };
