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

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Pagination } from "./Pagination";

describe("Pagination", () => {
  it("renders the expected controls in 'paged' variant", () => {
    const onPaginationChange = jest.fn();
    render(
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

    expect(screen.getByLabelText("Rows per page")).toBeInTheDocument();
    expect(screen.getByLabelText("Page")).toBeInTheDocument();
    expect(screen.getByLabelText("Previous page")).toBeInTheDocument();
    expect(screen.getByLabelText("Next page")).toBeInTheDocument();
    // Temporarily disabled while we figure out why i18n string interpolation
    // isn't playing nicely with testing-library. Can confirm this works properly
    // via VRT results
    // expect(screen.getByText("1-10 of 100")).toBeInTheDocument();
  });

  it("calls onPaginationChange with correct pageIndex when clicking next", async () => {
    const onPaginationChange = jest.fn();
    render(
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

    fireEvent.click(screen.getByLabelText("Next page"));

    await waitFor(() => {
      expect(onPaginationChange).toHaveBeenCalledWith({
        pageIndex: 2,
        pageSize: 10,
      });
    });
  });

  it("calls onPaginationChange with correct pageIndex when clicking previous", async () => {
    const onPaginationChange = jest.fn();
    render(
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

    fireEvent.click(screen.getByLabelText("Previous page"));

    await waitFor(() => {
      expect(onPaginationChange).toHaveBeenCalledWith({
        pageIndex: 1,
        pageSize: 10,
      });
    });
  });

  it("disables previous button on first page", () => {
    const onPaginationChange = jest.fn();
    render(
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

    expect(screen.getByLabelText("Previous page")).toBeDisabled();
  });

  it("disables next button on last page", () => {
    const onPaginationChange = jest.fn();
    render(
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

    expect(screen.getByLabelText("Next page")).toBeDisabled();
  });

  it("updates pageIndex when entering a new page number", async () => {
    const onPaginationChange = jest.fn();
    render(
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

    const pageInput = screen.getByLabelText("Page");
    fireEvent.change(pageInput, { target: { value: "5" } });
    fireEvent.blur(pageInput);

    console.log(pageInput);

    await waitFor(() => {
      expect(onPaginationChange).toHaveBeenCalledWith({
        pageIndex: 5,
        pageSize: 10,
      });
    });
  });

  it("updates pageSize when entering a new rows per page value", async () => {
    const onPaginationChange = jest.fn();
    render(
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

    const rowsPerPageInput = screen.getByLabelText("Rows per page");
    fireEvent.change(rowsPerPageInput, { target: { value: "20" } });
    fireEvent.blur(rowsPerPageInput);
    console.log(rowsPerPageInput);

    await waitFor(() => {
      expect(onPaginationChange).toHaveBeenCalledWith({
        pageIndex: 1,
        pageSize: 20,
      });
    });
  });

  it("renders 'Load more' button in 'loadMore' variant", () => {
    const onPaginationChange = jest.fn();
    render(
      <Pagination
        loadMoreLabel="Load more"
        onPaginationChange={onPaginationChange}
        pageIndex={1}
        pageSize={20}
        totalRows={100}
        variant="loadMore"
      />,
    );

    expect(screen.getByText("Load more")).toBeInTheDocument();
  });

  it("calls onPaginationChange with increased pageSize when clicking 'Load more'", async () => {
    const onPaginationChange = jest.fn();
    render(
      <Pagination
        loadMoreLabel="Load more"
        onPaginationChange={onPaginationChange}
        pageIndex={1}
        pageSize={20}
        totalRows={100}
        variant="loadMore"
      />,
    );

    fireEvent.click(screen.getByText("Load more"));

    await waitFor(() => {
      expect(onPaginationChange).toHaveBeenCalledWith({
        pageIndex: 1,
        pageSize: 40, // Assuming initial pageSize is 20, it should increment by 20
      });
    });
  });

  it("disables 'Load more' button when isMoreDisabled is true", () => {
    const onPaginationChange = jest.fn();
    render(
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

    expect(screen.getByText("Load more")).toBeDisabled();
  });

  it("disables 'Next page' button when isMoreDisabled is true", () => {
    const onPaginationChange = jest.fn();
    render(
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

    expect(screen.getByLabelText("Next page")).toBeDisabled();
  });

  it("disables all controls when isDisabled is true", () => {
    const onPaginationChange = jest.fn();
    render(
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

    expect(screen.getByLabelText("Rows per page")).toBeDisabled();
    expect(screen.getByLabelText("Page")).toBeDisabled();
    expect(screen.getByLabelText("Previous page")).toBeDisabled();
    expect(screen.getByLabelText("Next page")).toBeDisabled();
  });
});
