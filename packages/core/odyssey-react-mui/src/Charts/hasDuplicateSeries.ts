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

import type { ChartSeries } from "./chartTypes.js";

export type HasDuplicateSeriesProps = {
  series: ChartSeries[];
};

/**
 * Returns `true` when two or more series share one name.
 *
 * A chart uses the name of a series as its React key and as its legend label.
 * When two series share one name, React drops one of them, and the chart draws
 * fewer lines than the data holds.
 */
export const hasDuplicateSeries = ({ series }: HasDuplicateSeriesProps) =>
  new Set(series.map((chartSeries) => chartSeries.name)).size !== series.length;
