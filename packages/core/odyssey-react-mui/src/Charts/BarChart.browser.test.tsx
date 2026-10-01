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

import { page, userEvent } from "vitest/browser";

import { translate as odysseyTranslate } from "../i18n.generated/i18n.js";
import { renderWithOdysseyProvider } from "../test-utils/renderWithOdysseyProvider.js";
import { BarChart } from "./BarChart.js";

describe(BarChart.displayName!, () => {
  test("two series across two categories", async () => {
    const { container } = await renderWithOdysseyProvider(
      <BarChart
        ariaDescription="Bar chart of sign-in success rate by authentication method."
        categories={["Password", "WebAuthn"]}
        series={[
          { name: "Success", data: [4.2, 1.4] },
          { name: "Failure", data: [0.6, 0.1] },
        ]}
        title="Sign-in Success Rate"
      />,
    );

    await expect(container).toBeAccessible();
    // Every point carries its category, its value, and its series name, so a
    // screen reader user can read a point without reading the legend.
    await expect
      .element(
        page.getByRole("img", {
          name: "Password, 4.2. Success.",
          exact: true,
        }),
      )
      .toBeVisible();
    await expect
      .element(
        page.getByRole("img", {
          name: "WebAuthn, 1.4. Success.",
          exact: true,
        }),
      )
      .toBeVisible();
    await expect
      .element(
        page.getByRole("img", {
          name: "Password, 0.6. Failure.",
          exact: true,
        }),
      )
      .toBeVisible();
    await expect
      .element(
        page.getByRole("img", {
          name: "WebAuthn, 0.1. Failure.",
          exact: true,
        }),
      )
      .toBeVisible();
    // More than one series draws a legend without the caller asking for one.
    await expect
      .element(page.getByRole("button", { name: "Show Success", exact: true }))
      .toBeVisible();
    await expect
      .element(page.getByRole("button", { name: "Show Failure", exact: true }))
      .toBeVisible();
  });

  test("hovering one bar in a multi-series category", async () => {
    const { container } = await renderWithOdysseyProvider(
      <BarChart
        ariaDescription="Bar chart of sign-in success rate by authentication method."
        categories={["Password", "WebAuthn"]}
        series={[
          { name: "Success", data: [4.2, 1.4] },
          { name: "Failure", data: [0.6, 0.1] },
        ]}
        title="Sign-in Success Rate"
      />,
    );

    await expect(container).toBeAccessible();
    await userEvent.hover(
      page.getByLabelText("Password, 4.2. Success.", { exact: true }),
    );
    await expect(container).toBeAccessible();
    await expect
      .element(page.getByText("Success: 4.2", { exact: true }))
      .toBeVisible();
    await expect
      .element(page.getByText("Failure: 0.6", { exact: true }))
      .toBeVisible();
  });

  test("null values in two series", async () => {
    const { container } = await renderWithOdysseyProvider(
      <BarChart
        ariaDescription="Bar chart of sign-in success rate by authentication method."
        categories={["A", "B", "C"]}
        series={[
          { name: "Success", data: [1, null, 3] },
          { name: "Failure", data: [0.6, 0.1, null] },
        ]}
        title="Sign-in Success Rate"
      />,
    );

    await expect(container).toBeAccessible();
    await expect
      .element(page.getByLabelText("A, 1. Success.", { exact: true }))
      .toBeVisible();
    await expect
      .element(page.getByLabelText("C, 3. Success.", { exact: true }))
      .toBeVisible();
    await expect
      .element(page.getByLabelText("B, 0.1. Failure.", { exact: true }))
      .toBeVisible();
    // A null value draws no bar. The chart library exposes the gap as an
    // invisible accessibility placeholder with no `img` role, so these check
    // presence in the document rather than visibility.
    //
    // Series "Success" has the gap at B, where "Failure" has a value, and
    // "Failure" has the gap at C, where "Success" has a value.
    await expect
      .element(page.getByLabelText("B, No value. Success.", { exact: true }))
      .toBeInTheDocument();
    await expect
      .element(page.getByLabelText("C, No value. Failure.", { exact: true }))
      .toBeInTheDocument();
  });

  test("a series with more values than the chart has categories", async () => {
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    await expect(
      renderWithOdysseyProvider(
        <BarChart
          ariaDescription="Bar chart of sign-in success rate by authentication method."
          categories={["Password"]}
          series={[{ name: "Events", data: [4.2, 1.4] }]}
          title="Sign-in Success Rate"
        />,
      ),
    ).rejects.toThrow(
      'Series "Events" has 2 values, but the chart has 1 categories.',
    );

    consoleErrorSpy.mockRestore();
  });

  test("two series with the same name", async () => {
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    await expect(
      renderWithOdysseyProvider(
        <BarChart
          ariaDescription="Bar chart of sign-in success rate by authentication method."
          categories={["Password"]}
          series={[
            { name: "Events", data: [4.2] },
            { name: "Events", data: [1.4] },
          ]}
          title="Sign-in Success Rate"
        />,
      ),
    ).rejects.toThrow("This chart has two or more series with the same name.");

    consoleErrorSpy.mockRestore();
  });

  test("no xAxisFormat", async () => {
    const { container } = await renderWithOdysseyProvider(
      <BarChart
        ariaDescription="Bar chart of sign-in attempts by authentication method."
        categories={["Password", "WebAuthn", "Retry"]}
        series={[{ name: "Attempts", data: [1000, 2000, 3000] }]}
        title="Sign-in Attempts"
      />,
    );

    await expect(container).toBeAccessible();
    await expect.element(page.getByText("3K", { exact: true })).toBeVisible();
    expect(page.getByText("3,000", { exact: true }).query()).toBeNull();
  });

  test("an xAxisFormat of decimal", async () => {
    const { container } = await renderWithOdysseyProvider(
      <BarChart
        ariaDescription="Bar chart of sign-in attempts by authentication method."
        categories={["Password", "WebAuthn", "Retry"]}
        series={[{ name: "Attempts", data: [1000, 2000, 3000] }]}
        title="Sign-in Attempts"
        xAxisFormat="decimal"
      />,
    );

    await expect(container).toBeAccessible();
    await expect
      .element(page.getByText("3,000", { exact: true }))
      .toBeVisible();
    expect(page.getByText("3K", { exact: true }).query()).toBeNull();
  });

  test("axis labels land on the axis the reader sees, not the library's own axis", async () => {
    const { container } = await renderWithOdysseyProvider(
      <BarChart
        ariaDescription="Bar chart of sign-in attempts by authentication method."
        categories={["Password", "WebAuthn"]}
        series={[{ name: "Attempts", data: [4.2, 1.4] }]}
        title="Sign-in Attempts"
        xAxisLabel="Attempts"
        yAxisLabel="Method"
      />,
    );

    // An axis label carries no accessible role, and "Attempts" and "Method"
    // each render as a plain axis label whichever axis they land on. So an
    // accessible query, or a text query, passes just as well on a build that
    // swaps xAxisLabel and yAxisLabel onto the wrong library axis. The chart
    // library groups each axis's own elements under a class named for that
    // library axis, `highcharts-xaxis` or `highcharts-yaxis`, so reading that
    // group is the only way to assert which library axis actually received
    // which label. Do not replace this with `getByText`. That query cannot
    // fail on the one regression this test exists to catch.
    const libraryXAxisLabel = container.querySelector(
      ".highcharts-xaxis .highcharts-axis-title",
    );
    const libraryYAxisLabel = container.querySelector(
      ".highcharts-yaxis .highcharts-axis-title",
    );

    expect(libraryXAxisLabel).not.toBeNull();
    expect(libraryYAxisLabel).not.toBeNull();
    // The library's XAxis holds the categories in a bar chart, so it
    // receives yAxisLabel, the public prop that names the category axis.
    expect(libraryXAxisLabel?.textContent).toEqual("Method");
    // The library's YAxis holds the values in a bar chart, so it receives
    // xAxisLabel, the public prop that names the value axis.
    expect(libraryYAxisLabel?.textContent).toEqual("Attempts");
  });

  test("keyboard navigation between points", async () => {
    const onPointClick = vi.fn();

    const { container } = await renderWithOdysseyProvider(
      <BarChart
        ariaDescription="Bar chart of sign-in success rate by authentication method."
        categories={["Password", "WebAuthn"]}
        onPointClick={onPointClick}
        series={[{ name: "Events", data: [4.2, 1.4] }]}
        title="Sign-in Success Rate"
      />,
    );

    await expect(container).toBeAccessible();
    await userEvent.tab();
    await expect
      .element(page.getByLabelText("Password, 4.2. Events.", { exact: true }))
      .toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    await expect
      .element(page.getByLabelText("WebAuthn, 1.4. Events.", { exact: true }))
      .toHaveFocus();
    await userEvent.keyboard("{Enter}");

    expect(onPointClick).toHaveBeenCalledTimes(1);
    expect(onPointClick).toHaveBeenCalledWith({
      seriesName: "Events",
      category: "WebAuthn",
      value: 1.4,
    });
  });

  test("a loaded chart with a title and a subtitle", async () => {
    const { container } = await renderWithOdysseyProvider(
      <BarChart
        ariaDescription="Bar chart of sign-in success rate by authentication method."
        categories={["Password"]}
        series={[{ name: "Events", data: [4.2] }]}
        subtitle="Last 90 days, by method"
        title="Sign-in Success Rate"
      />,
    );

    await expect(container).toBeAccessible();
    // The title and the subtitle reach the page as real HTML above the chart,
    // rather than as text inside the chart library's own output.
    await expect
      .element(
        page.getByRole("heading", {
          level: 4,
          name: "Sign-in Success Rate",
          exact: true,
        }),
      )
      .toBeVisible();
    await expect
      .element(page.getByText("Last 90 days, by method", { exact: true }))
      .toBeVisible();
    await expect
      .element(
        page.getByRole("group", {
          name: "Chart. Highcharts interactive chart.",
          exact: true,
        }),
      )
      .toBeVisible();
  });

  test("isLoading with a title and a subtitle", async () => {
    const { container } = await renderWithOdysseyProvider(
      <BarChart
        ariaDescription="Bar chart of sign-in success rate by authentication method."
        categories={["Password"]}
        isLoading
        series={[{ name: "Events", data: [4.2] }]}
        subtitle="Last 90 days, by method"
        title="Sign-in Success Rate"
      />,
    );

    await expect(container).toBeAccessible();
    // The chart library draws no output while loading, so its own
    // accessible container is gone.
    expect(
      page
        .getByRole("group", {
          name: "Chart. Highcharts interactive chart.",
          exact: true,
        })
        .query(),
    ).toBeNull();
    await expect
      .element(
        page.getByRole("status", {
          name: odysseyTranslate("chart.loading.arialabel"),
          exact: true,
        }),
      )
      .toBeVisible();
    // The heading and subtitle stay on screen, because the frame renders
    // them outside the chart library's own output.
    await expect
      .element(
        page.getByRole("heading", {
          level: 4,
          name: "Sign-in Success Rate",
          exact: true,
        }),
      )
      .toBeVisible();
    await expect
      .element(page.getByText("Last 90 days, by method", { exact: true }))
      .toBeVisible();
  });

  test("hasError with a title and a subtitle, and a retry click", async () => {
    const onRetry = vi.fn();

    const { container } = await renderWithOdysseyProvider(
      <BarChart
        ariaDescription="Bar chart of sign-in success rate by authentication method."
        categories={["Password"]}
        hasError
        onRetry={onRetry}
        series={[{ name: "Events", data: [4.2] }]}
        subtitle="Last 90 days, by method"
        title="Sign-in Success Rate"
      />,
    );

    await expect(container).toBeAccessible();
    expect(
      page
        .getByRole("group", {
          name: "Chart. Highcharts interactive chart.",
          exact: true,
        })
        .query(),
    ).toBeNull();
    await expect
      .element(
        page.getByRole("heading", {
          name: odysseyTranslate("chart.error.heading"),
          exact: true,
        }),
      )
      .toBeVisible();
    // The heading and subtitle stay on screen even though the chart library
    // drew nothing.
    await expect
      .element(
        page.getByRole("heading", {
          level: 4,
          name: "Sign-in Success Rate",
          exact: true,
        }),
      )
      .toBeVisible();
    await expect
      .element(page.getByText("Last 90 days, by method", { exact: true }))
      .toBeVisible();

    const retryButton = page.getByRole("button", {
      name: odysseyTranslate("chart.error.retry"),
      exact: true,
    });

    await userEvent.click(retryButton);
    await expect(container).toBeAccessible();

    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  test("hasError and isLoading both true", async () => {
    const { container } = await renderWithOdysseyProvider(
      <BarChart
        ariaDescription="Bar chart of sign-in success rate by authentication method."
        categories={["Password"]}
        hasError
        isLoading
        series={[{ name: "Events", data: [4.2] }]}
        title="Sign-in Success Rate"
      />,
    );

    await expect(container).toBeAccessible();
    await expect
      .element(
        page.getByRole("status", {
          name: odysseyTranslate("chart.loading.arialabel"),
          exact: true,
        }),
      )
      .toBeVisible();
    expect(
      page
        .getByRole("heading", {
          name: odysseyTranslate("chart.error.heading"),
          exact: true,
        })
        .query(),
    ).toBeNull();
  });

  test("a focused point with two series and a percent pointPopoverValueFormat", async () => {
    const { container } = await renderWithOdysseyProvider(
      <BarChart
        ariaDescription="Bar chart of sign-in success rate by authentication method."
        categories={["Password"]}
        pointPopoverValueFormat="percent"
        series={[
          { name: "Success", data: [0.042] },
          { name: "Failure", data: [0.006] },
        ]}
        title="Sign-in Success Rate"
      />,
    );

    await userEvent.tab();
    await expect
      .element(
        page.getByLabelText("Password, 0.042. Success.", { exact: true }),
      )
      .toHaveFocus();
    await expect(container).toBeAccessible();

    // The values render through `formatChartValue`, not as the raw numbers.
    // One row per series proves the shared popover reads
    // `point.custom.formattedValue` once per series rather than `point.y`.
    await expect
      .element(page.getByText("Success: 4%", { exact: true }))
      .toBeVisible();
    await expect
      .element(page.getByText("Failure: 1%", { exact: true }))
      .toBeVisible();
  });
});
