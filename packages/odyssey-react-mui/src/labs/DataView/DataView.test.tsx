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

import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { DataOnReorderRowsType, DataRow, DataView } from "./index";
import { data, columns, filterData, reorderData } from "./testSupportData";
import { EmptyState } from "../../EmptyState";
import { DataTableRowData } from "../../DataTable";
import { MenuItem } from "../../MenuItem";
import { Button } from "../../Button";
import { MRT_RowSelectionState } from "material-react-table";
import { getControlledElement } from "../../test-selectors/linkedHtmlSelectors";

const getData = ({ ...props }) => {
  return filterData({ data, ...props });
};

const listItemProps = (row: DataRow) => ({
  title: row.name,
  overline: "List card",
});

const gridItemProps = (row: DataRow) => ({
  title: row.name,
  overline: "Grid card",
});

describe("DataView", () => {
  it("displays a table view", async () => {
    const { container } = render(
      <DataView
        availableLayouts={["table"]}
        getData={getData}
        tableLayoutOptions={{
          columns: columns,
        }}
      />,
    );

    await screen.findByText(data[0].name);

    expect(within(container).queryByRole("table")).not.toBeNull();
    expect(within(container).queryByRole("list")).toBeNull();
  });

  it("displays a list view", async () => {
    const { container } = render(
      <DataView
        availableLayouts={["list"]}
        getData={getData}
        cardLayoutOptions={{
          itemProps: listItemProps,
        }}
      />,
    );

    await screen.findByText(data[0].name);

    expect(within(container).queryByRole("table")).toBeNull();
    expect(within(container).queryByRole("list")).not.toBeNull();
  });

  it("displays a grid view", async () => {
    const { container } = render(
      <DataView
        availableLayouts={["grid"]}
        getData={getData}
        cardLayoutOptions={{
          itemProps: gridItemProps,
        }}
      />,
    );

    await screen.findByText(data[0].name);

    expect(within(container).queryByRole("table")).toBeNull();
    expect(within(container).queryByRole("list")).not.toBeNull();
  });

  it("displays the layout switcher", async () => {
    render(
      <DataView
        availableLayouts={["table", "list"]}
        getData={getData}
        tableLayoutOptions={{
          columns: columns,
        }}
        cardLayoutOptions={{
          itemProps: listItemProps,
        }}
      />,
    );

    const layoutSwitcherButton = screen.getByLabelText("Layout", {
      selector: "button",
    });
    fireEvent.click(layoutSwitcherButton);

    const layoutSwitcherMenu = getControlledElement({
      element: layoutSwitcherButton,
    });
    expect(within(layoutSwitcherMenu).getAllByRole("menuitem")).toHaveLength(2);
    expect(
      within(layoutSwitcherMenu).getByRole("menuitem", { name: "Table" }),
    ).toBeVisible();
    expect(
      within(layoutSwitcherMenu).getByRole("menuitem", { name: "List" }),
    ).toBeVisible();
  });

  it("can display meta text", async () => {
    const metaText = "Last updated 12 hours ago";

    render(
      <DataView
        availableLayouts={["table"]}
        getData={getData}
        tableLayoutOptions={{
          columns: columns,
        }}
        metaText={metaText}
      />,
    );

    expect(screen.getByText(metaText)).toBeInTheDocument();
  });

  it("can filter rows", async () => {
    render(
      <DataView
        availableLayouts={["table"]}
        hasFilters
        getData={getData}
        tableLayoutOptions={{
          columns: columns,
        }}
      />,
    );

    expect(await screen.findByText(data[0].name)).toBeVisible();
    expect(await screen.findByText(data[1].name)).toBeVisible();

    const filterButton = screen.getByLabelText("Filters", {
      selector: "button",
    });
    fireEvent.click(filterButton);

    const filterMenu = getControlledElement({ element: filterButton });
    const nameMenuItem = within(filterMenu).getByRole("menuitem", {
      name: /Name/i,
    });
    fireEvent.click(nameMenuItem);

    const nameFilterMenu = getControlledElement({ element: nameMenuItem });
    const nameInput = within(nameFilterMenu).getByLabelText("Name");
    const submitButton = within(nameFilterMenu).getByRole("button");
    fireEvent.change(nameInput, { target: { value: data[1].name } });
    fireEvent.click(submitButton);

    await screen.findByText("Clear filters");

    const table = screen.getByRole("table");
    expect(screen.queryByText(data[0].name)).toBeNull();
    expect(await within(table).findByText(data[1].name)).toBeVisible();
  });

  it("can search rows", async () => {
    render(
      <DataView
        availableLayouts={["table"]}
        hasSearch
        hasSearchSubmitButton
        getData={getData}
        tableLayoutOptions={{
          columns: columns,
        }}
      />,
    );

    expect(await screen.findByText(data[0].name)).toBeVisible();
    expect(await screen.findByText(data[1].name)).toBeVisible();

    const searchInput = screen.getByPlaceholderText(/Search/i);
    const submitButton = screen.getByText("Search", { selector: "button" });
    fireEvent.change(searchInput, { target: { value: data[1].name } });
    fireEvent.click(submitButton);

    const table = screen.getByRole("table");
    expect(screen.queryByText(data[0].name)).toBeNull();
    expect(await within(table).findByText(data[1].name)).toBeVisible();
  });

  it("can clear the search input", async () => {
    render(
      <DataView
        availableLayouts={["table"]}
        hasSearch
        hasSearchSubmitButton
        getData={getData}
        tableLayoutOptions={{
          columns: columns,
        }}
      />,
    );

    expect(await screen.findByText(data[0].name)).toBeVisible();
    expect(await screen.findByText(data[1].name)).toBeVisible();

    const searchInput = screen.getByPlaceholderText(/Search/i);
    const submitButton = screen.getByText("Search", { selector: "button" });
    fireEvent.change(searchInput, { target: { value: data[1].name } });
    fireEvent.click(submitButton);

    const table = screen.getByRole("table");
    expect(screen.queryByText(data[0].name)).toBeNull();
    expect(await within(table).findByText(data[1].name)).toBeVisible();

    const clearButton = screen.getByLabelText("Clear", { selector: "button" });
    fireEvent.click(clearButton);

    waitFor(() => {
      expect(searchInput).toHaveValue("");
      expect(screen.getAllByRole("row")).toHaveLength(7);
      expect(screen.getByText(data[0].name)).toBeVisible();
      expect(screen.getByText(data[1].name)).toBeVisible();
    });
  });

  it("can display row action menu", async () => {
    const rowActionMenuItems = (row: DataTableRowData) => (
      <MenuItem>Action for {row.original.name}</MenuItem>
    );

    render(
      <DataView
        availableLayouts={["table"]}
        getData={getData}
        tableLayoutOptions={{
          columns: columns,
          rowActionMenuItems: rowActionMenuItems,
        }}
      />,
    );

    expect(await screen.findByText(data[0].name)).toBeVisible();

    // Index 1 because row[0] is the th row
    const firstBodyRow = (await screen.findAllByRole("row"))[1];
    const firstBodyRowActionButton = within(firstBodyRow).getByRole("button");
    fireEvent.click(firstBodyRowActionButton);

    const actionMenu = getControlledElement({
      element: firstBodyRowActionButton,
    });
    const actionMenuItem = within(actionMenu).getByRole("menuitem");
    expect(
      within(actionMenuItem).getByText(`Action for ${data[0].name}`),
    ).toBeVisible();
  });

  it("can display row action buttons", async () => {
    const rowActionButtons = (row: DataTableRowData) => (
      <Button variant="primary" label={`Button for ${row?.original?.name}`} />
    );

    render(
      <DataView
        availableLayouts={["table"]}
        getData={getData}
        tableLayoutOptions={{
          columns: columns,
          rowActionButtons: rowActionButtons,
        }}
      />,
    );

    expect(await screen.findByText(data[0].name)).toBeVisible();

    // Index 1 because row[0] is the th row
    const firstBodyRow = (await screen.findAllByRole("row"))[1];
    const firstBodyRowActionButton = within(firstBodyRow).getByText(
      `Button for ${data[0].name}`,
      { selector: "button" },
    );

    expect(firstBodyRowActionButton).toBeVisible();
  });

  it("can select table rows", async () => {
    render(
      <DataView
        availableLayouts={["table"]}
        getData={getData}
        hasRowSelection
        tableLayoutOptions={{
          columns: columns,
        }}
      />,
    );

    expect(await screen.findByText(data[0].name)).toBeVisible();

    const checkboxes = screen.getAllByRole("checkbox");
    fireEvent.click(checkboxes[1]);

    const selectedText = screen.getByText("1 selected", { selector: "button" });
    expect(selectedText).toBeVisible();
  });

  it("can select all rows", async () => {
    render(
      <DataView
        availableLayouts={["table"]}
        getData={getData}
        hasRowSelection
        tableLayoutOptions={{
          columns: columns,
        }}
      />,
    );

    expect(await screen.findByText(data[0].name)).toBeVisible();

    const checkboxes = screen.getAllByRole("checkbox");
    fireEvent.click(checkboxes[0]);

    const selectedText = screen.getByText(`${data.length} selected`, {
      selector: "button",
    });
    expect(selectedText).toBeVisible();
  });

  it("can select card rows", async () => {
    render(
      <DataView
        availableLayouts={["grid"]}
        getData={getData}
        hasRowSelection
        cardLayoutOptions={{
          itemProps: gridItemProps,
        }}
      />,
    );

    expect(await screen.findByText(data[0].name)).toBeVisible();

    const checkboxes = screen.getAllByRole("checkbox");
    fireEvent.click(checkboxes[1]);

    const selectedText = screen.getByText("1 selected", { selector: "button" });
    expect(selectedText).toBeVisible();
  });

  it("can deselect rows", async () => {
    render(
      <DataView
        availableLayouts={["table"]}
        getData={getData}
        hasRowSelection
        tableLayoutOptions={{
          columns: columns,
        }}
      />,
    );

    expect(await screen.findByText(data[0].name)).toBeVisible();

    const checkboxes = screen.getAllByRole("checkbox");
    fireEvent.click(checkboxes[1]);
    fireEvent.click(checkboxes[2]);

    expect(
      screen.getByText("2 selected", { selector: "button" }),
    ).toBeVisible();

    fireEvent.click(checkboxes[1]);

    expect(
      screen.getByText("1 selected", { selector: "button" }),
    ).toBeVisible();
  });

  it("can deselect all rows", async () => {
    render(
      <DataView
        availableLayouts={["table"]}
        getData={getData}
        hasRowSelection
        tableLayoutOptions={{
          columns: columns,
        }}
      />,
    );

    expect(await screen.findByText(data[0].name)).toBeVisible();

    const checkboxes = screen.getAllByRole("checkbox");
    fireEvent.click(checkboxes[0]);

    const selectedText = screen.getByText(`${data.length} selected`, {
      selector: "button",
    });
    expect(selectedText).toBeVisible();

    fireEvent.click(checkboxes[0]);

    expect(
      screen.queryByText(`${data.length} selected`, { selector: "button" }),
    ).toBeNull();
  });

  it("can perform bulk actions on rows", async () => {
    const bulkActionMenuItems = (selectedRows: MRT_RowSelectionState) => (
      <MenuItem>Bulk action for {Object.keys(selectedRows).length}</MenuItem>
    );

    render(
      <DataView
        availableLayouts={["table"]}
        getData={getData}
        hasRowSelection
        tableLayoutOptions={{
          columns: columns,
        }}
        bulkActionMenuItems={bulkActionMenuItems}
      />,
    );

    expect(await screen.findByText(data[0].name)).toBeVisible();

    const selectAllButton = screen.getByText("Select all", {
      selector: "button",
    });
    fireEvent.click(selectAllButton);

    const selectedButton = screen.getByText(`${data.length} selected`, {
      selector: "button",
    });
    fireEvent.click(selectedButton);

    const bulkActionsMenu = getControlledElement({ element: selectedButton });
    const bulkActionsMenuItem = within(bulkActionsMenu).getByRole("menuitem");
    expect(bulkActionsMenuItem.textContent).toBe(
      `Bulk action for ${data.length}`,
    );
  });

  it("can reorder rows", async () => {
    let updatedData = [...data];

    const handleReorderRows = ({
      rowId,
      newRowIndex,
    }: DataOnReorderRowsType) => {
      updatedData = reorderData({ data: updatedData, rowId, newRowIndex });
    };

    render(
      <DataView
        availableLayouts={["table"]}
        getData={() => updatedData}
        hasRowReordering
        onReorderRows={handleReorderRows}
        tableLayoutOptions={{
          columns: columns,
        }}
      />,
    );

    expect(await screen.findByText(data[0].name)).toBeVisible();
    expect(await screen.findByText(data[1].name)).toBeVisible();

    const moreActionsButton = within(
      screen.getAllByRole("row")[2],
    ).getByLabelText("More actions", { selector: "button" });
    fireEvent.click(moreActionsButton);

    const moreActionsMenu = getControlledElement({
      element: moreActionsButton,
    });
    const moveForwardButton = within(moreActionsMenu).getByRole("menuitem", {
      name: "Bring forward",
    });
    fireEvent.click(moveForwardButton);

    const updatedRows = await screen.findAllByRole("row");

    // Confirm that the first two rows have swapped
    expect(updatedRows[1].textContent).toContain(data[1].name);
    expect(updatedRows[2].textContent).toContain(data[0].name);
  });

  it("can reorder to front", async () => {
    let updatedData = [...data];

    const handleReorderRows = ({
      rowId,
      newRowIndex,
    }: DataOnReorderRowsType) => {
      updatedData = reorderData({ data: updatedData, rowId, newRowIndex });
    };

    render(
      <DataView
        availableLayouts={["table"]}
        getData={() => updatedData}
        hasRowReordering
        onReorderRows={handleReorderRows}
        tableLayoutOptions={{
          columns: columns,
        }}
      />,
    );

    expect(await screen.findByText(data[0].name)).toBeVisible();
    expect(await screen.findByText(data[5].name)).toBeVisible();

    const moreActionsButton = within(
      screen.getAllByRole("row")[6],
    ).getByLabelText("More actions", { selector: "button" });
    fireEvent.click(moreActionsButton);

    const moreActionsMenu = getControlledElement({
      element: moreActionsButton,
    });
    const moveToFrontButton = within(moreActionsMenu).getByRole("menuitem", {
      name: "Bring to front",
    });
    fireEvent.click(moveToFrontButton);

    const updatedRows = await screen.findAllByRole("row");

    // Confirm that the first two rows have swapped
    expect(updatedRows[1].textContent).toContain(data[5].name);
    expect(updatedRows[2].textContent).toContain(data[0].name);
  });

  it("can reorder to back", async () => {
    let updatedData = [...data];

    const handleReorderRows = ({
      rowId,
      newRowIndex,
    }: DataOnReorderRowsType) => {
      updatedData = reorderData({ data: updatedData, rowId, newRowIndex });
    };

    render(
      <DataView
        availableLayouts={["table"]}
        getData={() => updatedData}
        hasRowReordering
        onReorderRows={handleReorderRows}
        totalRows={updatedData.length}
        tableLayoutOptions={{
          columns: columns,
        }}
      />,
    );

    expect(await screen.findByText(data[0].name)).toBeVisible();
    expect(await screen.findByText(data[5].name)).toBeVisible();

    const moreActionsButton = within(
      screen.getAllByRole("row")[1],
    ).getByLabelText("More actions", { selector: "button" });
    fireEvent.click(moreActionsButton);

    const moreActionsMenu = getControlledElement({
      element: moreActionsButton,
    });
    const moveToBackButton = within(moreActionsMenu).getByRole("menuitem", {
      name: "Send to back",
    });
    fireEvent.click(moveToBackButton);

    const updatedRows = await screen.findAllByRole("row");

    expect(updatedRows[6].textContent).toContain(data[0].name);
    expect(updatedRows[5].textContent).toContain(data[5].name);
  });

  it("can expand table rows", async () => {
    const tableDetails = ({ row }: { row: DataTableRowData }) => {
      return <p>This is additional content for {row.original.name}</p>;
    };

    render(
      <DataView
        availableLayouts={["table"]}
        getData={getData}
        tableLayoutOptions={{
          columns: columns,
          renderDetailPanel: tableDetails,
        }}
      />,
    );

    expect(await screen.findByText(data[0].name)).toBeVisible();
    expect(
      screen.queryByText(`This is additional content for ${data[0].name}`),
    ).toBeNull();

    const firstBodyRow = (await screen.findAllByRole("row"))[1];
    const firstBodyRowExpandButton = within(firstBodyRow).getByLabelText(
      "Expand",
      { selector: "button" },
    );
    fireEvent.click(firstBodyRowExpandButton);

    expect(
      screen.queryByText(`This is additional content for ${data[0].name}`),
    ).not.toBeNull();
  });

  it("can expand card rows", async () => {
    const cardDetails = ({ row }: { row: DataTableRowData }) => {
      return <p>This is additional content for {row.name}</p>;
    };

    render(
      <DataView
        availableLayouts={["grid"]}
        getData={getData}
        cardLayoutOptions={{
          itemProps: gridItemProps,
          renderDetailPanel: cardDetails,
        }}
      />,
    );

    expect(await screen.findAllByText(data[0].name)).toHaveLength(1);
    expect(
      screen.queryByText(`This is additional content for ${data[0].name}`),
    ).toBeNull();

    const firstCard = (await screen.findAllByRole("listitem"))[0];
    const firstCardExpandButton = within(firstCard).getByLabelText("Expand", {
      selector: "button",
    });
    fireEvent.click(firstCardExpandButton);

    expect(
      screen.queryByText(`This is additional content for ${data[0].name}`),
    ).not.toBeNull();
  });

  it("can display empty state", async () => {
    const emptyText = "This is the empty state text.";

    render(
      <DataView
        availableLayouts={["table"]}
        getData={() => []}
        tableLayoutOptions={{
          columns: columns,
        }}
        emptyPlaceholder={
          <EmptyState heading="Empty" description={emptyText} />
        }
      />,
    );

    expect(await screen.findByText(emptyText)).not.toBeNull();
  });

  it("can display no-results state", async () => {
    const noResultsText = "This is the no results state text.";

    render(
      <DataView
        availableLayouts={["table"]}
        getData={() => []}
        tableLayoutOptions={{
          columns: columns,
        }}
        noResultsPlaceholder={
          <EmptyState heading="No results" description={noResultsText} />
        }
      />,
    );

    expect(await screen.findByText(noResultsText)).not.toBeNull();
  });

  it("can sort rows", async () => {
    render(
      <DataView
        availableLayouts={["table"]}
        getData={getData}
        tableLayoutOptions={{
          columns: columns,
          hasSorting: true,
        }}
      />,
    );

    expect(await screen.findByText(data[0].name)).toBeVisible();

    const initialRows = screen.getAllByRole("row");
    expect(initialRows[1].textContent).toContain(data[0].name);

    const idHeader = screen.getByRole("button", {
      name: "Sort by ID descending",
    });
    fireEvent.click(idHeader);

    expect(await screen.findByText(data[0].name)).toBeVisible();

    const sortedRows = screen.getAllByRole("row");
    expect(sortedRows[6].textContent).toContain(data[0].name);
  });

  it("can change row density", async () => {
    render(
      <DataView
        availableLayouts={["table"]}
        getData={getData}
        tableLayoutOptions={{
          columns: columns,
          hasChangeableDensity: true,
        }}
      />,
    );

    expect(await screen.findByText(data[0].name)).toBeVisible();

    // Since table density is a purely visible attribute, there's no ARIA
    // attribute to target here. We're forced to use the className directly.
    const tBody = screen.getAllByRole("row")[1].parentElement;
    expect(tBody?.className).not.toContain("MuiTableBody-compact");

    const densityButton = screen.getByLabelText("Table density", {
      selector: "button",
    });
    fireEvent.click(densityButton);

    const densityMenu = getControlledElement({ element: densityButton });
    const densityCompact = within(densityMenu).getByRole("menuitem", {
      name: "Compact",
    });
    fireEvent.click(densityCompact);

    expect(tBody?.className).toContain("MuiTableBody-compact");
  });

  it("can change column visibility", async () => {
    render(
      <DataView
        availableLayouts={["table"]}
        getData={getData}
        tableLayoutOptions={{
          columns: columns,
          hasColumnVisibility: true,
        }}
      />,
    );

    // Detect if the data has loaded in
    await screen.findByText(data[0].city);

    const visibilityButton = screen.getByLabelText("Show/hide columns", {
      selector: "button",
    });
    fireEvent.click(visibilityButton);

    const visibilityMenu = getControlledElement({ element: visibilityButton });

    const cityCheckbox = within(visibilityMenu).getByText("City");
    fireEvent.click(cityCheckbox);

    expect(screen.queryByText(data[0].city)).toBeNull();
  });

  it("can resize columns", async () => {
    render(
      <DataView
        availableLayouts={["table"]}
        getData={getData}
        tableLayoutOptions={{
          columns: columns,
          hasColumnResizing: true,
        }}
      />,
    );

    await screen.findByText(data[0].name);

    const rows = await screen.findAllByRole("row");
    const tHead = rows[0].parentElement;

    // Ensure that the resize handle is displayed when
    // hasColumnResizing is true
    const hrElement = tHead!.querySelector("hr");
    expect(tHead).toContainElement(hrElement);
  });

  it("displays paged pagination", async () => {
    render(
      <DataView
        availableLayouts={["table"]}
        getData={getData}
        hasPagination
        paginationType="paged"
        tableLayoutOptions={{
          columns: columns,
        }}
      />,
    );

    await screen.findByText(data[0].name);

    const paginationContainer = await screen.findByLabelText("Pagination", {
      selector: "nav",
    });
    expect(
      within(paginationContainer).getByLabelText("Next page", {
        selector: "button",
      }),
    ).toBeInTheDocument();
  });

  it("displays loadMore pagination", async () => {
    render(
      <DataView
        availableLayouts={["table"]}
        getData={getData}
        hasPagination
        paginationType="loadMore"
        enableVirtualization={false}
        tableLayoutOptions={{
          columns: columns,
        }}
      />,
    );

    await screen.findByText(data[0].name);

    expect(
      screen.getByText("Show more", { selector: "button" }),
    ).toBeInTheDocument();
  });

  it("can load more rows via loadMore pagination", async () => {
    render(
      <DataView
        availableLayouts={["table"]}
        getData={getData}
        hasPagination
        paginationType="loadMore"
        resultsPerPage={3}
        enableVirtualization={false}
        tableLayoutOptions={{
          columns: columns,
        }}
      />,
    );

    await screen.findByText(data[0].name);

    expect(screen.getAllByRole("row")).toHaveLength(4);

    const loadMoreButton = screen.getByText("Show more", {
      selector: "button",
    });
    fireEvent.click(loadMoreButton);

    await waitFor(() => {
      expect(screen.getAllByRole("row")).toHaveLength(7); // 6 data rows + header row
    });
  });

  it("can go to the next page", async () => {
    render(
      <DataView
        availableLayouts={["table"]}
        getData={getData}
        hasPagination
        paginationType="paged"
        resultsPerPage={2}
        tableLayoutOptions={{
          columns: columns,
        }}
      />,
    );

    await screen.findByText(data[0].name);

    expect(screen.queryByText(data[0].name)).not.toBeNull();
    expect(screen.queryByText(data[2].name)).toBeNull();

    const nextPageButton = screen.getByLabelText("Next page", {
      selector: "button",
    });
    fireEvent.click(nextPageButton);

    await screen.findByText(data[2].name);

    expect(screen.queryByText(data[0].name)).toBeNull();
    expect(screen.queryByText(data[2].name)).not.toBeNull();
  });

  it("can go to the previous page", async () => {
    render(
      <DataView
        availableLayouts={["table"]}
        getData={getData}
        hasPagination
        paginationType="paged"
        resultsPerPage={2}
        tableLayoutOptions={{
          columns: columns,
        }}
      />,
    );

    await screen.findByText(data[0].name);

    expect(screen.queryByText(data[0].name)).not.toBeNull();
    expect(screen.queryByText(data[2].name)).toBeNull();

    const nextPageButton = screen.getByLabelText("Next page", {
      selector: "button",
    });
    fireEvent.click(nextPageButton);

    await screen.findByText(data[2].name);

    expect(screen.queryByText(data[0].name)).toBeNull();
    expect(screen.queryByText(data[2].name)).not.toBeNull();

    const prevPageButton = screen.getByLabelText("Previous page", {
      selector: "button",
    });
    fireEvent.click(prevPageButton);

    await screen.findByText(data[0].name);

    expect(screen.queryByText(data[0].name)).not.toBeNull();
    expect(screen.queryByText(data[2].name)).toBeNull();
  });

  it("can disable the next page button based on max rows", async () => {
    render(
      <DataView
        availableLayouts={["table"]}
        getData={getData}
        hasPagination
        paginationType="paged"
        resultsPerPage={data.length - 1}
        totalRows={data.length}
        tableLayoutOptions={{
          columns: columns,
        }}
      />,
    );

    await screen.findByText(data[0].name);

    const nextPageButton = screen.getByLabelText("Next page", {
      selector: "button",
    });
    const prevPageButton = screen.getByLabelText("Previous page", {
      selector: "button",
    });

    expect(prevPageButton).toBeDisabled();
    expect(nextPageButton).not.toBeDisabled();

    fireEvent.click(nextPageButton);

    expect(prevPageButton).not.toBeDisabled();
    expect(nextPageButton).toBeDisabled();
  });
});
