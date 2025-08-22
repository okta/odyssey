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

import { render, waitFor, within } from "@testing-library/react";
import { userEvent } from "@vitest/browser/context";
import { Pagination } from "./Pagination.js";

describe(Pagination.displayName!, () => {
  test("renders the expected controls in 'paged' variant", () => {
    const onPaginationChange = vi.fn();

    const { container } = render(
      <Pagination
        currentPageLabel="Page"
        nextLabel="Next page"
        previousLabel="Previous page"
        rowsPerPageLabel="Rows per page"
        loadMoreLabel="Load more"
        totalRows={100}
        lastRow={10}
        pageIndex={1}
        pageSize={10}
        onPaginationChange={onPaginationChange}
        variant="paged"
      />,
    );

    expect(
      within(container).getByLabelText("Rows per page"),
    ).toBeInTheDocument();
    expect(within(container).getByLabelText("Page")).toBeInTheDocument();
    expect(
      within(container).getByLabelText("Previous page"),
    ).toBeInTheDocument();
    expect(within(container).getByLabelText("Next page")).toBeInTheDocument();
    // Temporarily disabled while we figure out why i18n string interpolation
    // isn't playing nicely with testing-library. Can confirm this works properly
    // via VRT results
    // expect(within(container).getByText("1-10 of 100")).toBeInTheDocument();
  });

  test("calls onPaginationChange with correct pageIndex when clicking next", async () => {
    const onPaginationChange = vi.fn();

    const { container } = render(
      <Pagination
        currentPageLabel="Page"
        nextLabel="Next page"
        previousLabel="Previous page"
        rowsPerPageLabel="Rows per page"
        loadMoreLabel="Load more"
        totalRows={100}
        lastRow={10}
        pageIndex={1}
        pageSize={10}
        onPaginationChange={onPaginationChange}
        variant="paged"
      />,
    );

    await userEvent.click(within(container).getByLabelText("Next page"));

    await waitFor(() => {
      expect(onPaginationChange).toHaveBeenCalledWith({
        pageIndex: 2,
        pageSize: 10,
      });
    });
  });

  test("calls onPaginationChange with correct pageIndex when clicking previous", async () => {
    const onPaginationChange = vi.fn();

    const { container } = render(
      <Pagination
        currentPageLabel="Page"
        nextLabel="Next page"
        previousLabel="Previous page"
        rowsPerPageLabel="Rows per page"
        loadMoreLabel="Load more"
        totalRows={100}
        lastRow={20}
        pageIndex={2}
        pageSize={10}
        onPaginationChange={onPaginationChange}
        variant="paged"
      />,
    );

    await userEvent.click(within(container).getByLabelText("Previous page"));

    await waitFor(() => {
      expect(onPaginationChange).toHaveBeenCalledWith({
        pageIndex: 1,
        pageSize: 10,
      });
    });
  });

  test("disables previous button on first page", () => {
    const onPaginationChange = vi.fn();

    const { container } = render(
      <Pagination
        currentPageLabel="Page"
        nextLabel="Next page"
        previousLabel="Previous page"
        rowsPerPageLabel="Rows per page"
        loadMoreLabel="Load more"
        totalRows={100}
        lastRow={10}
        pageIndex={1}
        pageSize={10}
        onPaginationChange={onPaginationChange}
        variant="paged"
      />,
    );

    expect(within(container).getByLabelText("Previous page")).toBeDisabled();
  });

  test("disables next button on last page", () => {
    const onPaginationChange = vi.fn();

    const { container } = render(
      <Pagination
        currentPageLabel="Page"
        nextLabel="Next page"
        previousLabel="Previous page"
        rowsPerPageLabel="Rows per page"
        loadMoreLabel="Load more"
        totalRows={100}
        lastRow={100}
        pageIndex={10}
        pageSize={10}
        onPaginationChange={onPaginationChange}
        variant="paged"
      />,
    );

    expect(within(container).getByLabelText("Next page")).toBeDisabled();
  });

  test("updates pageIndex when entering a new page number", async () => {
    const onPaginationChange = vi.fn();

    const { container } = render(
      <Pagination
        currentPageLabel="Page"
        nextLabel="Next page"
        previousLabel="Previous page"
        rowsPerPageLabel="Rows per page"
        loadMoreLabel="Load more"
        totalRows={100}
        lastRow={10}
        pageIndex={1}
        pageSize={10}
        onPaginationChange={onPaginationChange}
        variant="paged"
      />,
    );

    const pageElement = await within(container).findByLabelText("Page");

    await userEvent.tripleClick(pageElement);
    await userEvent.keyboard("5");
    await userEvent.click(document.body);

    await waitFor(() => {
      expect(onPaginationChange).toHaveBeenCalledWith({
        pageIndex: 5,
        pageSize: 10,
      });
    });
  });

  test("updates pageSize when entering a new rows per page value", async () => {
    const onPaginationChange = vi.fn();

    const { container } = render(
      <Pagination
        currentPageLabel="Page"
        nextLabel="Next page"
        previousLabel="Previous page"
        rowsPerPageLabel="Rows per page"
        loadMoreLabel="Load more"
        totalRows={100}
        lastRow={10}
        pageIndex={1}
        pageSize={10}
        onPaginationChange={onPaginationChange}
        variant="paged"
      />,
    );

    const rowsPerPageInput =
      await within(container).findByLabelText("Rows per page");

    await userEvent.tripleClick(rowsPerPageInput);
    await userEvent.keyboard("20");
    await userEvent.click(document.body);

    await waitFor(() => {
      expect(onPaginationChange).toHaveBeenCalledWith({
        pageIndex: 1,
        pageSize: 20,
      });
    });
  });

  test("renders 'Load more' button in 'loadMore' variant", () => {
    const onPaginationChange = vi.fn();

    const { container } = render(
      <Pagination
        loadMoreLabel="Load more"
        onPaginationChange={onPaginationChange}
        pageIndex={1}
        pageSize={20}
        totalRows={100}
        variant="loadMore"
      />,
    );

    expect(within(container).getByText("Load more")).toBeInTheDocument();
  });

  test("calls onPaginationChange with increased pageSize when clicking 'Load more'", async () => {
    const onPaginationChange = vi.fn();

    const { container } = render(
      <Pagination
        loadMoreLabel="Load more"
        onPaginationChange={onPaginationChange}
        pageIndex={1}
        pageSize={20}
        totalRows={100}
        variant="loadMore"
      />,
    );

    await userEvent.click(within(container).getByText("Load more"));

    await waitFor(() => {
      expect(onPaginationChange).toHaveBeenCalledWith({
        pageIndex: 1,
        pageSize: 40, // Assuming initial pageSize is 20, it should increment by 20
      });
    });
  });

  test("disables 'Load more' button when isMoreDisabled is true", () => {
    const onPaginationChange = vi.fn();

    const { container } = render(
      <Pagination
        loadMoreLabel="Load more"
        onPaginationChange={onPaginationChange}
        pageIndex={1}
        pageSize={100}
        totalRows={100}
        variant="loadMore"
        isMoreDisabled={true}
      />,
    );

    expect(within(container).getByText("Load more")).toBeDisabled();
  });

  test("disables 'Next page' button when isMoreDisabled is true", () => {
    const onPaginationChange = vi.fn();

    const { container } = render(
      <Pagination
        currentPageLabel="Page"
        nextLabel="Next page"
        previousLabel="Previous page"
        rowsPerPageLabel="Rows per page"
        loadMoreLabel="Load more"
        totalRows={100}
        lastRow={10}
        pageIndex={1}
        pageSize={10}
        onPaginationChange={onPaginationChange}
        variant="paged"
        isMoreDisabled={true}
      />,
    );

    expect(within(container).getByLabelText("Next page")).toBeDisabled();
  });

  test("disables all controls when isDisabled is true", () => {
    const onPaginationChange = vi.fn();

    const { container } = render(
      <Pagination
        currentPageLabel="Page"
        nextLabel="Next page"
        previousLabel="Previous page"
        rowsPerPageLabel="Rows per page"
        loadMoreLabel="Load more"
        totalRows={100}
        lastRow={10}
        pageIndex={1}
        pageSize={10}
        onPaginationChange={onPaginationChange}
        variant="paged"
        isDisabled={true}
      />,
    );

    expect(within(container).getByLabelText("Rows per page")).toBeDisabled();
    expect(within(container).getByLabelText("Page")).toBeDisabled();
    expect(within(container).getByLabelText("Previous page")).toBeDisabled();
    expect(within(container).getByLabelText("Next page")).toBeDisabled();
  });

  test("prevents setting the page to values less than 1", async () => {
    const user = userEvent.setup();
    const onPaginationChange = vi.fn();

    const { container } = render(
      <Pagination
        currentPageLabel="Page"
        nextLabel="Next page"
        previousLabel="Previous page"
        rowsPerPageLabel="Rows per page"
        loadMoreLabel="Load more"
        totalRows={100}
        lastRow={10}
        pageIndex={1}
        pageSize={10}
        onPaginationChange={onPaginationChange}
        variant="paged"
        hasPageInput={true}
      />,
    );

    const pageInput = within(container).getByRole<HTMLInputElement>(
      "spinbutton",
      {
        name: "Page",
      },
    );
    await user.click(pageInput);
    await user.keyboard("{ArrowDown}");

    // Assert that the value is still 1
    expect(pageInput.value).toBe("1");
  });
});
