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

import { renderWithOdysseyProvider } from "@okta/odyssey-test-tooling/browser";
import { page, userEvent } from "vitest/browser";

import { DataTablePagination } from "./DataTablePagination.js";

describe(DataTablePagination.displayName!, () => {
  test("paged navigation", async () => {
    const onClickNext = vi.fn();
    const onClickPrevious = vi.fn();

    const { container } = await renderWithOdysseyProvider(
      <DataTablePagination
        currentPage={2}
        onClickNext={onClickNext}
        onClickPrevious={onClickPrevious}
        paginationType="paged"
      />,
    );

    await expect(container).toBeAccessible();
    await expect.element(page.getByText("Page 2")).toBeVisible();

    await userEvent.click(page.getByRole("button", { name: "Next" }));
    await userEvent.click(page.getByRole("button", { name: "Previous" }));

    expect(onClickNext).toHaveBeenCalledTimes(1);
    expect(onClickPrevious).toHaveBeenCalledTimes(1);
  });

  test("load more", async () => {
    const onClickNext = vi.fn();

    await renderWithOdysseyProvider(
      <DataTablePagination
        currentNumberOfResults={40}
        onClickNext={onClickNext}
        paginationType="loadMore"
      />,
    );

    await userEvent.click(page.getByRole("button", { name: "Show more" }));
    expect(onClickNext).toHaveBeenCalledTimes(1);
  });
});
