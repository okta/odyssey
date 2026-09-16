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

import type {
  ChartPoint,
  ChartPointDecoration,
  ChartSeries,
} from "./chartTypes.js";
import type { ChartValueFormat } from "./formatChartValue.js";
import type { ChartValueFormatter } from "./useChartValueFormatter.js";

/**
 * One point of a series that plots against a category axis. The category axis
 * gives the position, so the point holds only its value.
 *
 * Highcharts names the value axis `y` for a line chart and also for a
 * horizontal bar chart, because a bar chart inverts the drawing and not the
 * data. So `y` means the measured value here, and not a vertical position.
 *
 * A chart that needs a position on both axes, such as a scatter chart, takes a
 * point type of its own that adds `x`. That type shares
 * `ChartPointDecoration` and does not extend this type.
 */
export type ChartSeriesPointDatum = ChartPointDecoration & {
  y: number;
};

export type GetChartSeriesPointDataProps = {
  categories: string[];
  chartSeries: ChartSeries;
  formatValue: ChartValueFormatter;
  onPointClick?: (point: ChartPoint) => void;
  pointPopoverValueFormat?: ChartValueFormat;
};

/**
 * Returns one data point for each entry in `categories`, lined up by index
 * with `chartSeries.data`. A `null` entry in `chartSeries.data` returns
 * `null`. Highcharts then draws a gap, instead of a point with the value
 * zero.
 *
 * The function throws if `chartSeries.data` and `categories` have different
 * lengths. A value with no matching category has no position on the axis. If
 * the chart silently cut or padded the series to fit, the chart would look
 * correct while showing the wrong data. Throwing catches the mistake instead.
 */
export const getChartSeriesPointData = ({
  categories,
  chartSeries,
  formatValue,
  onPointClick,
  pointPopoverValueFormat,
}: GetChartSeriesPointDataProps): Array<ChartSeriesPointDatum | null> => {
  if (chartSeries.data.length !== categories.length) {
    throw new Error(
      `Series "${chartSeries.name}" has ${chartSeries.data.length} values, but the chart has ${categories.length} categories. Series data and categories must have the same length.`,
    );
  }

  return chartSeries.data.map((value, valueIndex) => {
    if (value === null) {
      return null;
    }

    return {
      custom: {
        formattedValue: formatValue({
          format: pointPopoverValueFormat,
          value,
        }),
      },
      y: value,
      ...(onPointClick
        ? {
            events: {
              click: () =>
                onPointClick({
                  category: categories[valueIndex],
                  seriesName: chartSeries.name,
                  value,
                }),
            },
          }
        : {}),
    };
  });
};
