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

import { getChartSeriesPointData } from "./getChartSeriesPointData.js";

const formatValue = ({ value }: { value: number }) => `${value}%`;

describe(getChartSeriesPointData.name, () => {
  test("a series whose values are all numbers", () => {
    expect(
      getChartSeriesPointData({
        chartSeries: { name: "Events", data: [3, 1] },
        categories: ["WebAuthn", "Password"],
        formatValue,
      }),
    ).toEqual([
      { y: 3, custom: { formattedValue: "3%" } },
      { y: 1, custom: { formattedValue: "1%" } },
    ]);
  });

  test("a series with a null value at the start", () => {
    expect(
      getChartSeriesPointData({
        chartSeries: { name: "Events", data: [null, 1] },
        categories: ["WebAuthn", "Password"],
        formatValue,
      }),
    ).toEqual([null, { y: 1, custom: { formattedValue: "1%" } }]);
  });

  test("a series with a null value at the end", () => {
    expect(
      getChartSeriesPointData({
        chartSeries: { name: "Events", data: [3, null] },
        categories: ["WebAuthn", "Password"],
        formatValue,
      }),
    ).toEqual([{ y: 3, custom: { formattedValue: "3%" } }, null]);
  });

  test("a series with a null value between two numbers", () => {
    expect(
      getChartSeriesPointData({
        chartSeries: { name: "Events", data: [1, null, 3] },
        categories: ["A", "B", "C"],
        formatValue,
      }),
    ).toEqual([
      { y: 1, custom: { formattedValue: "1%" } },
      null,
      { y: 3, custom: { formattedValue: "3%" } },
    ]);
  });

  test("a series where every value is null", () => {
    expect(
      getChartSeriesPointData({
        chartSeries: { name: "Events", data: [null, null] },
        categories: ["WebAuthn", "Password"],
        formatValue,
      }),
    ).toEqual([null, null]);
  });

  test("a series with no categories and no data", () => {
    expect(
      getChartSeriesPointData({
        chartSeries: { name: "Events", data: [] },
        categories: [],
        formatValue,
      }),
    ).toEqual([]);
  });

  test("a value of zero", () => {
    expect(
      getChartSeriesPointData({
        chartSeries: { name: "Events", data: [0] },
        categories: ["WebAuthn"],
        formatValue,
      }),
    ).toEqual([{ y: 0, custom: { formattedValue: "0%" } }]);
  });

  test("a negative value", () => {
    expect(
      getChartSeriesPointData({
        chartSeries: { name: "Events", data: [-3] },
        categories: ["WebAuthn"],
        formatValue,
      }),
    ).toEqual([{ y: -3, custom: { formattedValue: "-3%" } }]);
  });

  test("data shorter than categories", () => {
    expect(() =>
      getChartSeriesPointData({
        chartSeries: { name: "Attempts", data: [1, 2] },
        categories: ["A", "B", "C"],
        formatValue,
      }),
    ).toThrow(
      'Series "Attempts" has 2 values, but the chart has 3 categories. Series data and categories must have the same length.',
    );
  });

  test("data longer than categories", () => {
    expect(() =>
      getChartSeriesPointData({
        chartSeries: { name: "Attempts", data: [1, 2, 3] },
        categories: ["A", "B"],
        formatValue,
      }),
    ).toThrow(
      'Series "Attempts" has 3 values, but the chart has 2 categories. Series data and categories must have the same length.',
    );
  });

  test("a series with onPointClick has an events.click handler on its datum", async () => {
    const clickedWithExpectedPoint = new Promise<void>((resolve, reject) => {
      const pointData = getChartSeriesPointData({
        chartSeries: { name: "Events", data: [3, 1] },
        categories: ["WebAuthn", "Password"],
        formatValue,

        onPointClick: (point) => {
          if (
            point.seriesName === "Events" &&
            point.category === "Password" &&
            point.value === 1
          ) {
            resolve();
          } else {
            reject(new Error("onPointClick received an unexpected point"));
          }
        },
      });

      pointData[1]?.events?.click();
    });

    await expect(clickedWithExpectedPoint).resolves.toBeUndefined();
  });

  test("a series without onPointClick has no events key on its datum", () => {
    const [pointDatum] = getChartSeriesPointData({
      chartSeries: { name: "Events", data: [3] },
      categories: ["WebAuthn"],
      formatValue,
    });

    expect(pointDatum).toEqual({ y: 3, custom: { formattedValue: "3%" } });
  });
});
