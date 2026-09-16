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
import { Paragraph } from "../Typography.js";
import { ChartFrame } from "./ChartFrame.js";

// A plain paragraph with distinctive text stands in for a real chart. This
// component knows nothing about charts, so its tests should not depend on
// one either.
const children = <Paragraph>Plot content.</Paragraph>;

describe(ChartFrame.displayName!, () => {
  test("a title, a subtitle, and a chart", async () => {
    const { container } = await renderWithOdysseyProvider(
      <ChartFrame
        subtitle="Last 90 days, by method"
        title="Sign-in Success Rate"
      >
        {children}
      </ChartFrame>,
    );

    await expect(container).toBeAccessible();
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
      .element(page.getByText("Plot content.", { exact: true }))
      .toBeVisible();
    // The heading gives the section its accessible name, and a section only
    // carries the region role once it has one.
    await expect
      .element(
        page.getByRole("region", {
          name: "Sign-in Success Rate",
          exact: true,
        }),
      )
      .toBeVisible();
  });

  test("a subtitle with no title", async () => {
    const { container } = await renderWithOdysseyProvider(
      <ChartFrame subtitle="Last 90 days, by method">{children}</ChartFrame>,
    );

    await expect(container).toBeAccessible();
    // A subtitle explains a title and means nothing alone, so the frame
    // drops it when there is no title.
    expect(
      page.getByText("Last 90 days, by method", { exact: true }).query(),
    ).toBeNull();
  });

  test("no title", async () => {
    const { container } = await renderWithOdysseyProvider(
      <ChartFrame>{children}</ChartFrame>,
    );

    await expect(container).toBeAccessible();
    // The level pins this to the heading that the frame itself renders, so a
    // heading of any other level inside the chart does not fail this test.
    expect(page.getByRole("heading", { level: 4 }).query()).toBeNull();
    // A section with no accessible name does not carry the region role, so
    // there is no region to find.
    expect(page.getByRole("region").query()).toBeNull();
  });

  test("hasError with a retry button", async () => {
    const onRetry = vi.fn();

    const { container } = await renderWithOdysseyProvider(
      <ChartFrame hasError onRetry={onRetry} title="Sign-in Success Rate">
        {children}
      </ChartFrame>,
    );

    await expect(container).toBeAccessible();
    await expect
      .element(
        page.getByRole("heading", {
          name: odysseyTranslate("chart.error.heading"),
          exact: true,
        }),
      )
      .toBeVisible();
    expect(page.getByText("Plot content.", { exact: true }).query()).toBeNull();
    // The heading survives the error state.
    await expect
      .element(
        page.getByRole("heading", {
          level: 4,
          name: "Sign-in Success Rate",
          exact: true,
        }),
      )
      .toBeVisible();

    await userEvent.click(
      page.getByRole("button", {
        name: odysseyTranslate("chart.error.retry"),
        exact: true,
      }),
    );

    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  test("hasError with no onRetry", async () => {
    const { container } = await renderWithOdysseyProvider(
      <ChartFrame hasError title="Sign-in Success Rate">
        {children}
      </ChartFrame>,
    );

    await expect(container).toBeAccessible();
    await expect
      .element(
        page.getByRole("heading", {
          name: odysseyTranslate("chart.error.heading"),
          exact: true,
        }),
      )
      .toBeVisible();
    expect(
      page
        .getByRole("button", {
          name: odysseyTranslate("chart.error.retry"),
          exact: true,
        })
        .query(),
    ).toBeNull();
  });

  test("isLoading", async () => {
    const { container } = await renderWithOdysseyProvider(
      <ChartFrame isLoading title="Sign-in Success Rate">
        {children}
      </ChartFrame>,
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
    expect(page.getByText("Plot content.", { exact: true }).query()).toBeNull();
    // The heading survives the loading state.
    await expect
      .element(
        page.getByRole("heading", {
          level: 4,
          name: "Sign-in Success Rate",
          exact: true,
        }),
      )
      .toBeVisible();
  });

  // This test reads like a copy of the `isLoading` test above, and that
  // likeness is the point: the combined state must behave exactly like the
  // loading state. It guards the order of the two branches in the frame's
  // body. A retry sets `isLoading` while the failed data is still on record,
  // so checking `hasError` first would freeze the error the user just tried
  // to clear. See docs/decisions/2026-08-25-chart-error-state-api.md.
  test("hasError and isLoading both true", async () => {
    const { container } = await renderWithOdysseyProvider(
      <ChartFrame hasError isLoading title="Sign-in Success Rate">
        {children}
      </ChartFrame>,
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
    expect(page.getByText("Plot content.", { exact: true }).query()).toBeNull();
    // The heading survives this combined state too.
    await expect
      .element(
        page.getByRole("heading", {
          level: 4,
          name: "Sign-in Success Rate",
          exact: true,
        }),
      )
      .toBeVisible();
  });
});
