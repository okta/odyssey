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

/** @deprecated `ChartPoint` moved to `@okta/odyssey-labs`. */
export type ChartPoint = Record<string, unknown>;

/** @deprecated `ChartSeries` moved to `@okta/odyssey-labs`. */
export type ChartSeries = Record<string, unknown>;

/** @deprecated `ChartValueFormat` moved to `@okta/odyssey-labs`. */
export type ChartValueFormat = unknown;

/** @deprecated `BarChart` moved to `@okta/odyssey-labs`. */
export type BarChartProps = Record<string, unknown>;

/** @deprecated `LineChart` moved to `@okta/odyssey-labs`. */
export type LineChartProps = Record<string, unknown>;

// The charts left core before their API was stable. The export stays so an app that still imports it keeps building, and the error tells its developers where the charts went.
const createMovedChart = <ChartProps>({
  chartName,
}: {
  chartName: string;
}): ((props: ChartProps) => null) => {
  const MovedChart = () => {
    console.error(
      `${chartName} moved to @okta/odyssey-labs. Import it from "@okta/odyssey-labs" instead of "@okta/odyssey-react-mui/charts", which renders nothing.`,
    );

    return null;
  };

  MovedChart.displayName = chartName;

  return MovedChart;
};

/** @deprecated `BarChart` moved to `@okta/odyssey-labs`. This export renders nothing. */
export const BarChart = createMovedChart<BarChartProps>({
  chartName: "BarChart",
});

/** @deprecated `LineChart` moved to `@okta/odyssey-labs`. This export renders nothing. */
export const LineChart = createMovedChart<LineChartProps>({
  chartName: "LineChart",
});
