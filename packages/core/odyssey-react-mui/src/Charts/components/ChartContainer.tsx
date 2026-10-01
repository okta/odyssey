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

import { createOdysseyStyledComponent } from "../../createOdysseyStyledComponent.js";
import { chartTokens } from "../utils/chartTokens.js";

/**
 * A full-height container for a Highcharts React chart. The container also
 * corrects the optical alignment of rectangular legend symbols. Highcharts
 * positions line and marker symbols with a separate rule.
 */
export const ChartContainer = createOdysseyStyledComponent({ tag: "div" })({
  height: "100%",
  minHeight: 0,
  minWidth: 0,
  "& > div": { height: "100%" },
  "& .highcharts-legend-item rect.highcharts-point": {
    transform: `translateY(${chartTokens.ChartLegendRectangleVerticalOffset}px)`,
  },
});
