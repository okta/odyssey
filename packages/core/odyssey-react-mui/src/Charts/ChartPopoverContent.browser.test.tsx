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
  Tooltip as HighchartsTooltip,
  XAxis,
  YAxis,
} from "@highcharts/react";
import { Accessibility } from "@highcharts/react/modules/Accessibility.js";
import { LineSeries } from "@highcharts/react/series/Line.js";
import { type ReactElement } from "react";
import { page, userEvent } from "vitest/browser";

import { defaultOdysseyDesignTokensContextValue } from "../OdysseyDesignTokensContext.js";
import { renderWithOdysseyProvider } from "../test-utils/renderWithOdysseyProvider.js";
import { ChartPopoverContent } from "./ChartPopoverContent.js";

const renderChartPopoverContent = () =>
  renderWithOdysseyProvider(
    <ChartPopoverContent
      categoryPlaceholder="Password"
      odysseyDesignTokens={defaultOdysseyDesignTokensContextValue}
      seriesLabelPlaceholder="Events"
      valuePlaceholder="4%"
    />,
  );

// The helper renders a minimal line chart. Each series has one point in the
// same category. The helper hovers that category.
// React never mounts `ChartPopoverContent` directly. Its serialization
// through `@highcharts/react` needs a real chart. Its `isShared` each-block
// also needs a real chart.
const renderChartPopoverInChart = async ({
  isPopoverShared,
  seriesList,
  popoverContent,
}: {
  isPopoverShared: boolean;
  popoverContent: ReactElement;
  seriesList: Array<{ formattedValue: string; name: string; value: number }>;
}) => {
  const renderResult = await renderWithOdysseyProvider(
    <Chart options={{ chart: { animation: false } }} type="line">
      <Accessibility enabled landmarkVerbosity="one" />
      <XAxis categories={["Password"]} />
      <YAxis />
      <HighchartsTooltip shared={isPopoverShared}>
        {popoverContent}
      </HighchartsTooltip>
      <Credits enabled={false} />
      {seriesList.map((series) => (
        <LineSeries
          data={[
            {
              custom: { formattedValue: series.formattedValue },
              y: series.value,
            },
          ]}
          key={series.name}
          name={series.name}
        />
      ))}
    </Chart>,
  );

  await userEvent.tab();

  return renderResult;
};

// The chart hover tests in this directory cover serialization through
// `@highcharts/react`. They also cover the escape of substituted values.
// Both cases need a real chart.
describe(ChartPopoverContent.displayName, () => {
  test("the label separator disables browser translation", async () => {
    const { container } = await renderChartPopoverContent();
    await expect(container).toBeAccessible();

    const separator = page.getByText(":", { exact: true });
    await expect.element(separator).toBeVisible();
    await expect.element(separator).toHaveClass("notranslate");
  });

  test("isShared renders one row per series with the correct series names and values", async () => {
    const { container } = await renderChartPopoverInChart({
      isPopoverShared: true,
      seriesList: [
        { formattedValue: "4.2", name: "Success", value: 4.2 },
        { formattedValue: "0.6", name: "Failure", value: 0.6 },
        { formattedValue: "1.1", name: "Retry", value: 1.1 },
      ],
      popoverContent: (
        <ChartPopoverContent
          categoryPlaceholder="{point.key}"
          isShared
          odysseyDesignTokens={defaultOdysseyDesignTokensContextValue}
          seriesLabelPlaceholder="{series.name}"
          valuePlaceholder="{point.y}"
        />
      ),
    });

    await expect(container).toBeAccessible();
    await expect
      .element(page.getByText("Success: 4.2", { exact: true }))
      .toBeVisible();
    await expect
      .element(page.getByText("Failure: 0.6", { exact: true }))
      .toBeVisible();
    await expect
      .element(page.getByText("Retry: 1.1", { exact: true }))
      .toBeVisible();
  });

  test("isShared resolves point.custom.formattedValue once per series", async () => {
    const { container } = await renderChartPopoverInChart({
      isPopoverShared: true,
      seriesList: [
        { formattedValue: "4%", name: "Success", value: 0.042 },
        { formattedValue: "1%", name: "Failure", value: 0.006 },
        { formattedValue: "13%", name: "Retry", value: 0.131 },
      ],
      popoverContent: (
        <ChartPopoverContent
          categoryPlaceholder="{point.key}"
          isShared
          odysseyDesignTokens={defaultOdysseyDesignTokensContextValue}
          seriesLabelPlaceholder="{series.name}"
          valuePlaceholder="{point.custom.formattedValue}"
        />
      ),
    });

    await expect(container).toBeAccessible();
    await expect
      .element(page.getByText("Success: 4%", { exact: true }))
      .toBeVisible();
    await expect
      .element(page.getByText("Failure: 1%", { exact: true }))
      .toBeVisible();
    await expect
      .element(page.getByText("Retry: 13%", { exact: true }))
      .toBeVisible();
  });

  test("a per-point popover still renders exactly one row", async () => {
    const { container } = await renderChartPopoverInChart({
      isPopoverShared: false,
      seriesList: [{ formattedValue: "4%", name: "Events", value: 0.042 }],
      popoverContent: (
        <ChartPopoverContent
          categoryPlaceholder="{point.key}"
          odysseyDesignTokens={defaultOdysseyDesignTokensContextValue}
          seriesLabelPlaceholder="{series.name}"
          valuePlaceholder="{point.custom.formattedValue}"
        />
      ),
    });

    await expect(container).toBeAccessible();
    await expect
      .element(page.getByText("Events: 4%", { exact: true }))
      .toBeVisible();
    expect(
      container.querySelectorAll(".highcharts-tooltip .notranslate").length,
    ).toEqual(1);
  });
});
