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
import { LineChart } from "./LineChart.js";

describe(LineChart.displayName!, () => {
  test("two series across two categories", async () => {
    const { container } = await renderWithOdysseyProvider(
      <LineChart
        ariaDescription="Line chart of sign-in success rate by authentication method."
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

  test("null values in two series", async () => {
    const { container } = await renderWithOdysseyProvider(
      <LineChart
        ariaDescription="Line chart of sign-in success rate by authentication method."
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
    // A null value draws no marker. The chart library exposes the gap as an
    // invisible accessibility placeholder with no `img` role, so these check
    // presence in the document rather than visibility.
    //
    // Series "Success" has the gap at B, where "Failure" has a value, and
    // "Failure" has the gap at C, where "Success" has a value. The gap at B
    // also sits between two values in the same series, which the earlier
    // per-point data shape could not express.
    await expect
      .element(page.getByLabelText("B, No value. Success.", { exact: true }))
      .toBeInTheDocument();
    await expect
      .element(page.getByLabelText("C, No value. Failure.", { exact: true }))
      .toBeInTheDocument();
  });

  test("three series", async () => {
    const { container } = await renderWithOdysseyProvider(
      <LineChart
        ariaDescription="Line chart of sign-in success rate by authentication method."
        categories={["Password"]}
        series={[
          { name: "Success", data: [4.2] },
          { name: "Failure", data: [0.6] },
          { name: "Retry", data: [1.1] },
        ]}
        title="Sign-in Success Rate"
      />,
    );

    await expect(container).toBeAccessible();
    // The chart library draws each marker as an SVG path with no symbol-name
    // class, so the shapes are compared through their path data. A circle's
    // `d` attribute contains an arc command. A square's and a diamond's do
    // not, and those two differ from each other in their point coordinates.
    const seriesZeroMarker = container.querySelector(
      ".highcharts-series-0 .highcharts-point",
    );
    const seriesOneMarker = container.querySelector(
      ".highcharts-series-1 .highcharts-point",
    );
    const seriesTwoMarker = container.querySelector(
      ".highcharts-series-2 .highcharts-point",
    );

    // Without these, a library that renamed its class scheme would leave every
    // path undefined and the shape comparisons below would guard nothing.
    expect(seriesZeroMarker).not.toBeNull();
    expect(seriesOneMarker).not.toBeNull();
    expect(seriesTwoMarker).not.toBeNull();

    const seriesZeroPath = seriesZeroMarker?.getAttribute("d");
    const seriesOnePath = seriesOneMarker?.getAttribute("d");
    const seriesTwoPath = seriesTwoMarker?.getAttribute("d");

    expect(seriesZeroPath).toContain("A 4 4");
    expect(seriesOnePath).not.toContain("A ");
    expect(seriesTwoPath).not.toContain("A ");
    expect(seriesOnePath).not.toEqual(seriesTwoPath);
  });

  test("a series with more values than the chart has categories", async () => {
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    await expect(
      renderWithOdysseyProvider(
        <LineChart
          ariaDescription="Line chart of sign-in success rate by authentication method."
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

  test("a series with fewer values than the chart has categories", async () => {
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    await expect(
      renderWithOdysseyProvider(
        <LineChart
          ariaDescription="Line chart of sign-in success rate by authentication method."
          categories={["Password", "WebAuthn", "Retry"]}
          series={[{ name: "Attempts", data: [4.2, 1.4] }]}
          title="Sign-in Success Rate"
        />,
      ),
    ).rejects.toThrow(
      'Series "Attempts" has 2 values, but the chart has 3 categories.',
    );

    consoleErrorSpy.mockRestore();
  });

  test("two series with the same name", async () => {
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    await expect(
      renderWithOdysseyProvider(
        <LineChart
          ariaDescription="Line chart of sign-in success rate by authentication method."
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

  test("no yAxisFormat", async () => {
    const { container } = await renderWithOdysseyProvider(
      <LineChart
        ariaDescription="Line chart of sign-in attempts by authentication method."
        categories={["Password", "WebAuthn", "Retry"]}
        series={[{ name: "Attempts", data: [1000, 2000, 3000] }]}
        title="Sign-in Attempts"
      />,
    );

    await expect(container).toBeAccessible();
    await expect.element(page.getByText("3K", { exact: true })).toBeVisible();
    expect(page.getByText("3,000", { exact: true }).query()).toBeNull();
  });

  test("a yAxisFormat of decimal", async () => {
    const { container } = await renderWithOdysseyProvider(
      <LineChart
        ariaDescription="Line chart of sign-in attempts by authentication method."
        categories={["Password", "WebAuthn", "Retry"]}
        series={[{ name: "Attempts", data: [1000, 2000, 3000] }]}
        title="Sign-in Attempts"
        yAxisFormat="decimal"
      />,
    );

    await expect(container).toBeAccessible();
    await expect
      .element(page.getByText("3,000", { exact: true }))
      .toBeVisible();
    expect(page.getByText("3K", { exact: true }).query()).toBeNull();
  });

  test("keyboard navigation between points", async () => {
    const onPointClick = vi.fn();

    const { container } = await renderWithOdysseyProvider(
      <LineChart
        ariaDescription="Line chart of sign-in success rate by authentication method."
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
      <LineChart
        ariaDescription="Line chart of sign-in success rate by authentication method."
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
    // The frame owns the accessible name, so the chart library's own container
    // keeps the library's default label rather than the title. The loading
    // state and the error state each assert that this container is gone.
    // Asserting that it is here when the chart draws is what keeps those
    // absence checks meaningful.
    await expect
      .element(
        page.getByRole("group", {
          name: "Chart. Highcharts interactive chart.",
          exact: true,
        }),
      )
      .toBeVisible();
    // The chart library renders `ariaDescription` into a screen-reader-only
    // part of its output, not as visible text, so this checks presence in the
    // document rather than visibility.
    await expect
      .element(
        page.getByText(
          "Line chart of sign-in success rate by authentication method.",
          { exact: true },
        ),
      )
      .toBeInTheDocument();
    // The chart library draws a default title of its own when no title option
    // is set on the library, and that default once reached the rendered
    // chart. The chart sets a `text` of undefined, which leaves an empty title
    // element that measures zero and reserves no height, so this asserts on
    // the text of that element and not on its absence. The element is hidden
    // from assistive technology, so no accessible query reaches it and this
    // reads the DOM directly.
    //
    // The series anchor comes first on purpose. Without it, a library that
    // renamed its class prefix would satisfy the checks below for the wrong
    // reason and this assertion would guard nothing.
    const libraryTitle = container.querySelector(".highcharts-title");

    expect(container.querySelector(".highcharts-series-0")).not.toBeNull();
    expect(libraryTitle).not.toBeNull();
    expect(libraryTitle?.textContent).toEqual("");
  });

  test("isLoading with a title and a subtitle", async () => {
    const { container } = await renderWithOdysseyProvider(
      <LineChart
        ariaDescription="Line chart of sign-in success rate by authentication method."
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

  test("hasError with a title and a subtitle", async () => {
    const { container } = await renderWithOdysseyProvider(
      <LineChart
        ariaDescription="Line chart of sign-in success rate by authentication method."
        categories={["Password"]}
        hasError
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
  });

  // The chart forwards both flags to the frame, which is where the order of
  // the two branches lives. This test exists at the chart level as well
  // because a consumer sets these two props on the chart, not on the frame:
  // a retry sets `isLoading` while the failed data is still on record, and
  // checking `hasError` first would freeze the error the user just tried to
  // clear. See docs/decisions/2026-08-25-chart-error-state-api.md.
  test("hasError and isLoading both true", async () => {
    const { container } = await renderWithOdysseyProvider(
      <LineChart
        ariaDescription="Line chart of sign-in success rate by authentication method."
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
      <LineChart
        ariaDescription="Line chart of sign-in success rate by authentication method."
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

    // A focused point draws a solid one-pixel crosshair on the category axis.
    const crosshair = container.querySelector(".highcharts-crosshair");

    expect(crosshair).not.toBeNull();
    expect(crosshair?.getAttribute("stroke-width")).toEqual("1");
    expect(crosshair?.getAttribute("dashstyle")).toBeNull();
  });

  test("a series name containing HTML", async () => {
    const { container } = await renderWithOdysseyProvider(
      <LineChart
        ariaDescription="Line chart of sign-in success rate by authentication method."
        categories={["Password"]}
        series={[
          {
            name: "danger<script>alert(1)</script>",
            data: [4.2],
          },
        ]}
        title="Sign-in Success Rate"
      />,
    );

    const point = page.getByLabelText("Password, 4.2. dangeralert(1).", {
      exact: true,
    });
    await userEvent.tab();
    await expect.element(point).toHaveFocus();

    await expect(container).toBeAccessible();
    await expect
      .element(page.getByText("danger: 4.2", { exact: true }))
      .toBeVisible();

    // The popover anchor comes first on purpose. Without it, a library that
    // renamed its tooltip class would satisfy the null check below for the
    // wrong reason and the script assertion would guard nothing.
    const popover = container.querySelector(".highcharts-tooltip");

    expect(popover).not.toBeNull();
    expect(popover?.querySelector("script")).toBeNull();
  });
});
