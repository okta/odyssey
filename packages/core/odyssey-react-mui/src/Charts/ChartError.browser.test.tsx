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
import { ChartError } from "./ChartError.js";

describe(ChartError.displayName!, () => {
  test("error state with a retry button", async () => {
    const onRetry = vi.fn();

    const { container } = await renderWithOdysseyProvider(
      <ChartError onRetry={onRetry} />,
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

    const alert = page.getByRole("alert");

    await expect.element(alert).toBeVisible();

    expect(alert.element().textContent).toBe(
      `${odysseyTranslate("chart.error.heading")}${odysseyTranslate(
        "chart.error.text",
      )}`,
    );

    await userEvent.click(
      page.getByRole("button", {
        name: odysseyTranslate("chart.error.retry"),
        exact: true,
      }),
    );

    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  test("no onRetry", async () => {
    const { container } = await renderWithOdysseyProvider(<ChartError />);

    await expect(container).toBeAccessible();
    await expect
      .element(
        page.getByRole("button", {
          name: odysseyTranslate("chart.error.retry"),
          exact: true,
        }),
      )
      .not.toBeInTheDocument();
  });
});
