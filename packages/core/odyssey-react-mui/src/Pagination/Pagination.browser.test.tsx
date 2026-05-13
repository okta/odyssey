/*!
 * Copyright (c) 2024-present, Okta, Inc. and/or its affiliates. All rights reserved.
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

import { renderWithOdysseyProvider } from "../test-utils/renderWithOdysseyProvider.js";
import { Pagination } from "./Pagination.js";

describe(Pagination.displayName!, () => {
  test("renders the expected controls in 'paged' variant", async () => {
    const onPaginationChange = vi.fn();

    const { container } = await renderWithOdysseyProvider(
      <Pagination
        currentPageLabel="Page"
        currentRowsCount={10}
        lastRow={10}
        loadMoreLabel="Load more"
        nextLabel="Next page"
        onPaginationChange={onPaginationChange}
        pageIndex={1}
        pageSize={10}
        previousLabel="Previous page"
        rowsPerPageLabel="Rows per page"
        totalRows={100}
        variant="paged"
      />,
    );

    await expect(container).toBeAccessible();

    await expect
      .element(page.getByLabelText("Rows per page"))
      .toBeInTheDocument();
    await expect
      .element(page.getByLabelText("Page", { exact: true }))
      .toBeInTheDocument();
    await expect
      .element(page.getByLabelText("Previous page"))
      .toBeInTheDocument();
    await expect.element(page.getByLabelText("Next page")).toBeInTheDocument();

    await expect.element(page.getByText("1-10 of 100")).toBeInTheDocument();
  });

  test("calls onPaginationChange with correct pageIndex when clicking next", async () => {
    const onPaginationChange = vi.fn();

    await renderWithOdysseyProvider(
      <Pagination
        currentPageLabel="Page"
        lastRow={10}
        loadMoreLabel="Load more"
        nextLabel="Next page"
        onPaginationChange={onPaginationChange}
        pageIndex={1}
        pageSize={10}
        previousLabel="Previous page"
        rowsPerPageLabel="Rows per page"
        totalRows={100}
        variant="paged"
      />,
    );

    await userEvent.click(page.getByLabelText("Next page"));

    expect(onPaginationChange).toHaveBeenCalledWith({
      pageIndex: 2,
      pageSize: 10,
    });
  });

  test("calls onPaginationChange with correct pageIndex when clicking previous", async () => {
    const onPaginationChange = vi.fn();

    await renderWithOdysseyProvider(
      <Pagination
        currentPageLabel="Page"
        lastRow={20}
        loadMoreLabel="Load more"
        nextLabel="Next page"
        onPaginationChange={onPaginationChange}
        pageIndex={2}
        pageSize={10}
        previousLabel="Previous page"
        rowsPerPageLabel="Rows per page"
        totalRows={100}
        variant="paged"
      />,
    );

    await userEvent.click(page.getByLabelText("Previous page"));

    expect(onPaginationChange).toHaveBeenCalledWith({
      pageIndex: 1,
      pageSize: 10,
    });
  });

  test("disables previous button on first page", async () => {
    const onPaginationChange = vi.fn();

    await renderWithOdysseyProvider(
      <Pagination
        currentPageLabel="Page"
        lastRow={10}
        loadMoreLabel="Load more"
        nextLabel="Next page"
        onPaginationChange={onPaginationChange}
        pageIndex={1}
        pageSize={10}
        previousLabel="Previous page"
        rowsPerPageLabel="Rows per page"
        totalRows={100}
        variant="paged"
      />,
    );

    await expect.element(page.getByLabelText("Previous page")).toBeDisabled();
  });

  test("disables next button on last page", async () => {
    const onPaginationChange = vi.fn();

    await renderWithOdysseyProvider(
      <Pagination
        currentPageLabel="Page"
        lastRow={100}
        loadMoreLabel="Load more"
        nextLabel="Next page"
        onPaginationChange={onPaginationChange}
        pageIndex={10}
        pageSize={10}
        previousLabel="Previous page"
        rowsPerPageLabel="Rows per page"
        totalRows={100}
        variant="paged"
      />,
    );

    await expect.element(page.getByLabelText("Next page")).toBeDisabled();
  });

  test("updates pageIndex when entering a new page number", async () => {
    const onPaginationChange = vi.fn();

    await renderWithOdysseyProvider(
      <Pagination
        currentPageLabel="Page"
        lastRow={10}
        loadMoreLabel="Load more"
        nextLabel="Next page"
        onPaginationChange={onPaginationChange}
        pageIndex={1}
        pageSize={10}
        previousLabel="Previous page"
        rowsPerPageLabel="Rows per page"
        totalRows={100}
        variant="paged"
      />,
    );

    const pageElement = page.getByLabelText("Page", { exact: true });

    await userEvent.tripleClick(pageElement);
    await userEvent.keyboard("5");
    await userEvent.click(page.getByRole("document"));

    expect(onPaginationChange).toHaveBeenCalledWith({
      pageIndex: 5,
      pageSize: 10,
    });
  });

  test("submits page change on Enter key", async () => {
    const onPaginationChange = vi.fn();

    await renderWithOdysseyProvider(
      <Pagination
        currentPageLabel="Page"
        lastRow={10}
        loadMoreLabel="Load more"
        nextLabel="Next page"
        onPaginationChange={onPaginationChange}
        pageIndex={1}
        pageSize={10}
        previousLabel="Previous page"
        rowsPerPageLabel="Rows per page"
        totalRows={100}
        variant="paged"
      />,
    );

    await userEvent.tripleClick(page.getByLabelText("Page", { exact: true }));
    await userEvent.keyboard("3{Enter}");

    expect(onPaginationChange).toHaveBeenCalledWith({
      pageIndex: 3,
      pageSize: 10,
    });
  });

  test("submits rows per page change on Enter key", async () => {
    const onPaginationChange = vi.fn();

    await renderWithOdysseyProvider(
      <Pagination
        currentPageLabel="Page"
        lastRow={10}
        loadMoreLabel="Load more"
        nextLabel="Next page"
        onPaginationChange={onPaginationChange}
        pageIndex={1}
        pageSize={10}
        previousLabel="Previous page"
        rowsPerPageLabel="Rows per page"
        totalRows={100}
        variant="paged"
      />,
    );

    await userEvent.tripleClick(page.getByLabelText("Rows per page"));
    await userEvent.keyboard("20{Enter}");

    expect(onPaginationChange).toHaveBeenCalledWith({
      pageIndex: 1,
      pageSize: 20,
    });
  });

  test("updates pageSize when entering a new rows per page value", async () => {
    const onPaginationChange = vi.fn();

    await renderWithOdysseyProvider(
      <Pagination
        currentPageLabel="Page"
        lastRow={10}
        loadMoreLabel="Load more"
        nextLabel="Next page"
        onPaginationChange={onPaginationChange}
        pageIndex={1}
        pageSize={10}
        previousLabel="Previous page"
        rowsPerPageLabel="Rows per page"
        totalRows={100}
        variant="paged"
      />,
    );

    const rowsPerPageInput = page.getByLabelText("Rows per page");

    await userEvent.tripleClick(rowsPerPageInput);
    await userEvent.keyboard("20");
    await userEvent.click(page.getByRole("document"));

    expect(onPaginationChange).toHaveBeenCalledWith({
      pageIndex: 1,
      pageSize: 20,
    });
  });

  test("renders 'Load more' button in 'loadMore' variant", async () => {
    const onPaginationChange = vi.fn();

    await renderWithOdysseyProvider(
      <Pagination
        loadMoreLabel="Load more"
        onPaginationChange={onPaginationChange}
        pageIndex={1}
        pageSize={20}
        totalRows={100}
        variant="loadMore"
      />,
    );

    await expect.element(page.getByText("Load more")).toBeInTheDocument();
  });

  test("calls onPaginationChange with increased pageSize when clicking 'Load more'", async () => {
    const onPaginationChange = vi.fn();

    await renderWithOdysseyProvider(
      <Pagination
        loadMoreLabel="Load more"
        onPaginationChange={onPaginationChange}
        pageIndex={1}
        pageSize={20}
        totalRows={100}
        variant="loadMore"
      />,
    );

    await userEvent.click(page.getByText("Load more"));

    expect(onPaginationChange).toHaveBeenCalledWith({
      pageIndex: 1,
      pageSize: 40, // Assuming initial pageSize is 20, it should increment by 20
    });
  });

  test("disables 'Load more' button when isMoreDisabled is true", async () => {
    const onPaginationChange = vi.fn();

    await renderWithOdysseyProvider(
      <Pagination
        isMoreDisabled={true}
        loadMoreLabel="Load more"
        onPaginationChange={onPaginationChange}
        pageIndex={1}
        pageSize={100}
        totalRows={100}
        variant="loadMore"
      />,
    );

    await expect.element(page.getByText("Load more")).toBeDisabled();
  });

  test("disables 'Next page' button when isMoreDisabled is true", async () => {
    const onPaginationChange = vi.fn();

    await renderWithOdysseyProvider(
      <Pagination
        currentPageLabel="Page"
        isMoreDisabled={true}
        lastRow={10}
        loadMoreLabel="Load more"
        nextLabel="Next page"
        onPaginationChange={onPaginationChange}
        pageIndex={1}
        pageSize={10}
        previousLabel="Previous page"
        rowsPerPageLabel="Rows per page"
        totalRows={100}
        variant="paged"
      />,
    );

    await expect.element(page.getByLabelText("Next page")).toBeDisabled();
  });

  test("disables all controls when isDisabled is true", async () => {
    const onPaginationChange = vi.fn();

    await renderWithOdysseyProvider(
      <Pagination
        currentPageLabel="Page"
        isDisabled={true}
        lastRow={10}
        loadMoreLabel="Load more"
        nextLabel="Next page"
        onPaginationChange={onPaginationChange}
        pageIndex={1}
        pageSize={10}
        previousLabel="Previous page"
        rowsPerPageLabel="Rows per page"
        totalRows={100}
        variant="paged"
      />,
    );

    await expect.element(page.getByLabelText("Rows per page")).toBeDisabled();
    await expect
      .element(page.getByLabelText("Page", { exact: true }))
      .toBeDisabled();
    await expect.element(page.getByLabelText("Previous page")).toBeDisabled();
    await expect.element(page.getByLabelText("Next page")).toBeDisabled();
  });

  test("prevents setting the page to values less than 1", async () => {
    const user = userEvent.setup();
    const onPaginationChange = vi.fn();

    await renderWithOdysseyProvider(
      <Pagination
        currentPageLabel="Page"
        hasPageInput={true}
        lastRow={10}
        loadMoreLabel="Load more"
        nextLabel="Next page"
        onPaginationChange={onPaginationChange}
        pageIndex={1}
        pageSize={10}
        previousLabel="Previous page"
        rowsPerPageLabel="Rows per page"
        totalRows={100}
        variant="paged"
      />,
    );

    const pageInput = page.getByRole("spinbutton", {
      name: "Page",
      exact: true,
    });
    await user.click(pageInput);
    await user.keyboard("{ArrowDown}");

    // Assert that the value is still 1
    await expect.element(pageInput).toHaveValue(1);
  });
});
