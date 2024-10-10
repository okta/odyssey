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
  findAllByRole,
  fireEvent,
  getByText,
  queryAllByRole,
  queryByText,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { DataOnReorderRowsType, DataRow, DataView } from "./index";
import {
  data,
  columns,
  Person,
} from "@okta/odyssey-storybook/src/components/odyssey-labs/DataView/personData";
import {
  filterData,
  reorderData,
} from "@okta/odyssey-storybook/src/components/odyssey-labs/DataView/dataFunctions";
import { EmptyState } from "../../EmptyState";
import { DataTableRowData } from "../../DataTable";
import { MenuItem } from "../../MenuItem";
import { Button } from "../../Button";
import { MRT_RowSelectionState } from "material-react-table";

const simpleData: Person[] = [
  {
    order: 1,
    id: "1",
    name: "Luke Skywalker",
    city: "Mos Eisley",
    state: "Tatooine",
    age: 19,
    risk: "low",
  },
  {
    order: 2,
    id: "2",
    name: "Han Solo",
    city: "Corellia",
    state: "Corellia",
    age: 40,
    risk: "medium",
  },
  {
    order: 3,
    id: "3",
    name: "Leia Organa",
    city: "Alderaan City",
    state: "Alderaan",
    age: 19,
    risk: "low",
  },
  {
    order: 4,
    id: "4",
    name: "Chewbacca",
    city: "Kashyyyk City",
    state: "Kashyyyk",
    age: 50,
    risk: "high",
  },
  {
    order: 5,
    id: "5",
    name: "C-3P0",
    city: "Mos Espa",
    state: "Tatooine",
    age: 25,
    risk: "low",
  },
  {
    order: 6,
    id: "6",
    name: "R2-D2",
    city: "Theed",
    state: "Naboo",
    age: 25,
    risk: "low",
  },
];

const getData = ({ ...props }) => {
  return filterData({ data, ...props });
};

const getSimpleData = ({ ...props }) => {
  return filterData({ data: [...simpleData], ...props });
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
    render(
      <DataView
        availableLayouts={["table"]}
        getData={getData}
        tableLayoutOptions={{
          columns: columns,
        }}
      />,
    );

    await screen.findByText(data[0].name);

    expect(screen.queryByRole("table")).not.toBeNull();
    expect(screen.queryByText("Card")).toBeNull();
  });

  it("displays a list view", async () => {
    render(
      <DataView
        availableLayouts={["list"]}
        getData={getData}
        cardLayoutOptions={{
          itemProps: listItemProps,
        }}
      />,
    );

    await screen.findByText(data[0].name);

    expect(screen.queryByRole("table")).toBeNull();
    expect(screen.findAllByText("List card")).not.toBeNull();
    expect(screen.queryByText("Grid card")).toBeNull();
  });

  it("displays a grid view", async () => {
    render(
      <DataView
        availableLayouts={["grid"]}
        getData={getData}
        cardLayoutOptions={{
          itemProps: gridItemProps,
        }}
      />,
    );

    await screen.findByText(data[0].name);

    expect(screen.queryByRole("table")).toBeNull();
    expect(screen.queryByText("List card")).toBeNull();
    expect(screen.findAllByText("Grid card")).not.toBeNull();
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

    expect(
      screen.queryByLabelText("Layout", { selector: "button" }),
    ).not.toBeNull();
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

    expect(screen.queryAllByText(metaText).length).toBe(1);
  });

  it("can filter rows", async () => {
    render(
      <DataView
        availableLayouts={["table"]}
        hasFilters
        getData={getSimpleData}
        tableLayoutOptions={{
          columns: columns,
        }}
      />,
    );

    expect((await screen.findAllByText("Han Solo")).length).toBe(1);
    expect((await screen.findAllByText("Luke Skywalker")).length).toBe(1);

    fireEvent.click(screen.getByLabelText("Filters", { selector: "button" }));

    const nameParagraph = screen.getByText(/Name/i, { selector: "p" });
    const nameMenuItem = nameParagraph.closest('[role="menuitem"]');
    if (nameMenuItem) {
      fireEvent.click(nameMenuItem);
    }

    const nameInput = screen.getByLabelText(/Name/i);
    const submitButton = screen.getByLabelText("Submit", {
      selector: "button",
    });
    fireEvent.change(nameInput, { target: { value: "Han Solo" } });
    fireEvent.click(submitButton);

    const updatedTable = await screen.findByRole("table");

    expect(queryByText(updatedTable, "Han Solo")).not.toBeNull();
    expect(queryByText(updatedTable, "Luke Skywalker")).toBeNull();
  });

  it("can search rows", async () => {
    render(
      <DataView
        availableLayouts={["table"]}
        hasSearch
        hasSearchSubmitButton
        getData={getSimpleData}
        tableLayoutOptions={{
          columns: columns,
        }}
      />,
    );

    expect((await screen.findAllByText("Han Solo")).length).toBe(1);
    expect((await screen.findAllByText("Luke Skywalker")).length).toBe(1);

    const searchInput = screen.getByPlaceholderText(/Search/i);
    const submitButton = screen.getByText("Search", { selector: "button" });
    fireEvent.change(searchInput, { target: { value: "Han Solo" } });
    fireEvent.click(submitButton);

    const updatedTable = await screen.findByRole("table");

    expect(queryByText(updatedTable, "Han Solo")).not.toBeNull();
    expect(queryByText(updatedTable, "Luke Skywalker")).toBeNull();
  });
  it("can clear the search input", async () => {
    render(
      <DataView
        availableLayouts={["table"]}
        hasSearch
        hasSearchSubmitButton
        getData={getSimpleData}
        tableLayoutOptions={{
          columns: columns,
        }}
      />,
    );

    expect((await screen.findAllByText("Han Solo")).length).toBe(1);
    expect((await screen.findAllByText("Luke Skywalker")).length).toBe(1);

    const searchInput = screen.getByPlaceholderText(/Search/i);
    const submitButton = screen.getByText("Search", { selector: "button" });
    fireEvent.change(searchInput, { target: { value: "Han Solo" } });
    fireEvent.click(submitButton);

    const updatedTable = await screen.findByRole("table");

    expect(queryByText(updatedTable, "Han Solo")).not.toBeNull();
    expect(queryByText(updatedTable, "Luke Skywalker")).toBeNull();

    expect(queryAllByRole(updatedTable, "row").length).toBe(2);

    const clearButton = screen.getByLabelText("Clear", { selector: "button" });
    fireEvent.click(clearButton);

    const clearedSearchTable = await screen.findByRole("table");

    expect(searchInput).toHaveValue("");
    expect(queryAllByRole(clearedSearchTable, "row").length).toBe(7);
    expect((await screen.findAllByText("Han Solo")).length).toBe(1);
    expect((await screen.findAllByText("Luke Skywalker")).length).toBe(1);
  });

  it("can display row action menu", async () => {
    const rowActionMenuItems = (row: DataTableRowData) => (
      <MenuItem>Action for {row.original.name}</MenuItem>
    );

    render(
      <DataView
        availableLayouts={["table"]}
        getData={getSimpleData}
        tableLayoutOptions={{
          columns: columns,
          rowActionMenuItems: rowActionMenuItems,
        }}
      />,
    );

    expect((await screen.findAllByText("Luke Skywalker")).length).toBe(1);
    expect(screen.queryByText("Action for Luke Skywalker")).toBeNull();

    const rows = await screen.findAllByRole("row");
    const firstRow = rows[1];

    const actionButton = within(firstRow).getByRole("button");
    fireEvent.click(actionButton);

    const actionMenu = await screen.findByRole("menuitem");
    expect(actionMenu.textContent).toBe("Action for Luke Skywalker");
  });
  it("can display row action buttons", async () => {
    const rowActionButtons = (row: DataTableRowData) => (
      <Button variant="primary" label={`Button for ${row?.original?.name}`} />
    );

    render(
      <DataView
        availableLayouts={["table"]}
        getData={getSimpleData}
        tableLayoutOptions={{
          columns: columns,
          rowActionButtons: rowActionButtons,
        }}
      />,
    );

    expect(
      (await screen.findAllByText("Button for Luke Skywalker")).length,
    ).toBe(1);
  });

  it("can select table rows", async () => {
    render(
      <DataView
        availableLayouts={["table"]}
        getData={getSimpleData}
        hasRowSelection
        tableLayoutOptions={{
          columns: columns,
        }}
      />,
    );

    await waitFor(async () => {
      const checkboxes = await screen.findAllByRole("checkbox");
      expect(checkboxes.length).toBeGreaterThan(1);
    });

    const checkboxes = await screen.findAllByRole("checkbox");
    expect(checkboxes.length).toBe(simpleData.length + 1);

    fireEvent.click(checkboxes[1]);

    expect(await screen.findByText("1 selected")).toBeInTheDocument();
  });
  it("can select card rows", async () => {
    render(
      <DataView
        availableLayouts={["grid"]}
        getData={getSimpleData}
        hasRowSelection
        cardLayoutOptions={{
          itemProps: gridItemProps,
        }}
      />,
    );

    await waitFor(async () => {
      const checkboxes = await screen.findAllByRole("checkbox");
      expect(checkboxes.length).toBeGreaterThan(1);
    });

    const checkboxes = await screen.findAllByRole("checkbox");
    expect(checkboxes.length).toBe(simpleData.length);

    fireEvent.click(checkboxes[1]);

    expect(await screen.findByText("1 selected")).toBeInTheDocument();
  });

  it("can select all rows", async () => {
    render(
      <DataView
        availableLayouts={["table"]}
        getData={getSimpleData}
        hasRowSelection
        tableLayoutOptions={{
          columns: columns,
        }}
      />,
    );

    await waitFor(async () => {
      const checkboxes = await screen.findAllByRole("checkbox");
      expect(checkboxes.length).toBeGreaterThan(1);
    });

    const selectAllButton = screen.getByText("Select all", {
      selector: "button",
    });
    fireEvent.click(selectAllButton);

    expect(
      await screen.findByText(`${simpleData.length} selected`),
    ).toBeInTheDocument();
  });
  it("can deselect rows", async () => {
    render(
      <DataView
        availableLayouts={["grid"]}
        getData={getSimpleData}
        hasRowSelection
        cardLayoutOptions={{
          itemProps: gridItemProps,
        }}
      />,
    );

    await waitFor(async () => {
      const checkboxes = await screen.findAllByRole("checkbox");
      expect(checkboxes.length).toBeGreaterThan(1);
    });

    const checkboxes = await screen.findAllByRole("checkbox");
    expect(checkboxes.length).toBe(simpleData.length);

    fireEvent.click(checkboxes[1]);
    fireEvent.click(checkboxes[2]);

    expect(await screen.findByText("2 selected")).toBeInTheDocument();

    fireEvent.click(checkboxes[1]);

    expect(await screen.findByText("1 selected")).toBeInTheDocument();
  });
  it("can deselect all rows", async () => {
    render(
      <DataView
        availableLayouts={["table"]}
        getData={getSimpleData}
        hasRowSelection
        tableLayoutOptions={{
          columns: columns,
        }}
      />,
    );

    await waitFor(async () => {
      const checkboxes = await screen.findAllByRole("checkbox");
      expect(checkboxes.length).toBeGreaterThan(1);
    });

    const selectAllButton = screen.getByText("Select all", {
      selector: "button",
    });
    fireEvent.click(selectAllButton);

    expect(
      await screen.findByText(`${simpleData.length} selected`),
    ).toBeInTheDocument();

    const selectNoneButton = screen.getByText("Select none", {
      selector: "button",
    });
    fireEvent.click(selectNoneButton);

    expect(await screen.queryByText("selected")).toBeNull();
  });
  it("can perform bulk actions on rows", async () => {
    const bulkActionMenuItems = (selectedRows: MRT_RowSelectionState) => (
      <MenuItem>Bulk action for {Object.keys(selectedRows).length}</MenuItem>
    );

    render(
      <DataView
        availableLayouts={["table"]}
        getData={getSimpleData}
        hasRowSelection
        tableLayoutOptions={{
          columns: columns,
        }}
        bulkActionMenuItems={bulkActionMenuItems}
      />,
    );

    await waitFor(async () => {
      const checkboxes = await screen.findAllByRole("checkbox");
      expect(checkboxes.length).toBeGreaterThan(1);
    });

    const selectAllButton = screen.getByText("Select all", {
      selector: "button",
    });
    fireEvent.click(selectAllButton);

    const bulkActionsButton = await screen.findByText(
      `${simpleData.length} selected`,
    );
    expect(bulkActionsButton).toBeInTheDocument();
    fireEvent.click(bulkActionsButton);

    const bulkActionMenu = await screen.findByRole("menuitem");
    expect(bulkActionMenu.textContent).toBe(
      `Bulk action for ${simpleData.length}`,
    );
  });

  it("can reorder rows", async () => {
    let data = [...simpleData];

    const handleReorderRows = ({
      rowId,
      newRowIndex,
    }: DataOnReorderRowsType) => {
      data = reorderData({ data, rowId, newRowIndex });
    };

    render(
      <DataView
        availableLayouts={["table"]}
        getData={() => data}
        hasRowReordering
        onReorderRows={handleReorderRows}
        tableLayoutOptions={{
          columns: columns,
        }}
      />,
    );

    await waitFor(async () => {
      const rows = await screen.findAllByRole("row");
      expect(rows.length).toBeGreaterThan(1);
    });

    const rows = await screen.findAllByRole("row");
    expect(rows[1].textContent).toContain("Luke Skywalker");
    expect(rows[2].textContent).toContain("Han Solo");

    const reorderMenuButton = within(rows[2]).getAllByRole("button")[1];
    fireEvent.click(reorderMenuButton);

    const reorderButtons = await screen.findByRole("menu");
    const moveUpButton = within(reorderButtons).getByText("Bring forward");
    fireEvent.click(moveUpButton);

    const updatedRows = await screen.findAllByRole("row");

    expect(updatedRows[1].textContent).toContain("Han Solo");
    expect(updatedRows[2].textContent).toContain("Luke Skywalker");
  });
  it("can reorder to front", async () => {
    let data = [...simpleData];

    const handleReorderRows = ({
      rowId,
      newRowIndex,
    }: DataOnReorderRowsType) => {
      data = reorderData({ data, rowId, newRowIndex });
    };

    render(
      <DataView
        availableLayouts={["table"]}
        getData={() => data}
        hasRowReordering
        onReorderRows={handleReorderRows}
        tableLayoutOptions={{
          columns: columns,
        }}
      />,
    );

    await waitFor(async () => {
      const rows = await screen.findAllByRole("row");
      expect(rows.length).toBeGreaterThan(1);
    });

    const rows = await screen.findAllByRole("row");
    expect(rows[1].textContent).toContain("Luke Skywalker");
    expect(rows[6].textContent).toContain("R2-D2");

    const reorderMenuButton = within(rows[6]).getAllByRole("button")[1];
    fireEvent.click(reorderMenuButton);

    const reorderButtons = await screen.findByRole("menu");
    const moveUpButton = within(reorderButtons).getByText("Bring to front");
    fireEvent.click(moveUpButton);

    const updatedRows = await screen.findAllByRole("row");

    expect(updatedRows[1].textContent).toContain("R2-D2");
    expect(updatedRows[2].textContent).toContain("Luke Skywalker");
  });
  it("can reorder to back", async () => {
    let data = [...simpleData];

    const handleReorderRows = ({
      rowId,
      newRowIndex,
    }: DataOnReorderRowsType) => {
      data = reorderData({ data, rowId, newRowIndex });
    };

    render(
      <DataView
        availableLayouts={["table"]}
        getData={() => data}
        hasRowReordering
        onReorderRows={handleReorderRows}
        totalRows={simpleData.length}
        tableLayoutOptions={{
          columns: columns,
        }}
      />,
    );

    await waitFor(async () => {
      const rows = await screen.findAllByRole("row");
      expect(rows.length).toBeGreaterThan(1);
    });

    const rows = await screen.findAllByRole("row");
    expect(rows[1].textContent).toContain("Luke Skywalker");
    expect(rows[6].textContent).toContain("R2-D2");

    const reorderMenuButton = within(rows[1]).getAllByRole("button")[1];
    fireEvent.click(reorderMenuButton);

    const reorderButtons = await screen.findByRole("menu");
    const moveDownButton = within(reorderButtons).getByText("Send to back");
    fireEvent.click(moveDownButton);

    const updatedRows = await screen.findAllByRole("row");

    expect(updatedRows[1].textContent).toContain("Han Solo");
    expect(updatedRows[5].textContent).toContain("R2-D2");
    expect(updatedRows[6].textContent).toContain("Luke Skywalker");
  });

  it("can expand table rows", async () => {
    const tableDetails = ({ row }: { row: DataTableRowData }) => {
      return <p>This is additional content for {row.original.name}</p>;
    };

    render(
      <DataView
        availableLayouts={["table"]}
        getData={getSimpleData}
        tableLayoutOptions={{
          columns: columns,
          renderDetailPanel: tableDetails,
        }}
      />,
    );

    expect((await screen.findAllByText("Luke Skywalker")).length).toBe(1);
    expect(
      screen.queryByText("This is additional content for Luke Skywalker"),
    ).toBeNull();

    const expandButtons = screen.getAllByLabelText("Expand", {
      selector: "button",
    });
    fireEvent.click(expandButtons[0]);

    const expandedRows = screen.getAllByRole("row");
    expect(expandedRows[2].textContent).toBe(
      "This is additional content for Luke Skywalker",
    );
  });
  it("can expand card rows", async () => {
    const cardDetails = ({ row }: { row: DataTableRowData }) => {
      return <p>This is additional content for {row.name}</p>;
    };

    render(
      <DataView
        availableLayouts={["grid"]}
        getData={getSimpleData}
        cardLayoutOptions={{
          itemProps: gridItemProps,
          renderDetailPanel: cardDetails,
        }}
      />,
    );

    expect((await screen.findAllByText("Luke Skywalker")).length).toBe(1);
    expect(
      screen.queryByText("This is additional content for Luke Skywalker"),
    ).toBeNull();

    const expandButtons = screen.getAllByLabelText("Expand", {
      selector: "button",
    });
    fireEvent.click(expandButtons[0]);

    expect(
      screen.queryByText("This is additional content for Luke Skywalker"),
    ).not.toBeNull();
  });

  it("can display empty state", async () => {
    render(
      <DataView
        availableLayouts={["table"]}
        getData={() => []}
        tableLayoutOptions={{
          columns: columns,
        }}
        emptyPlaceholder={<EmptyState heading="Empty" description="Empty" />}
      />,
    );

    await screen.findAllByRole("row");

    expect(screen.queryAllByText("Empty").length).toBeGreaterThan(0);
  });
  it("can display no-results state", async () => {
    render(
      <DataView
        availableLayouts={["table"]}
        getData={getSimpleData}
        tableLayoutOptions={{
          columns: columns,
        }}
        isNoResults
        noResultsPlaceholder={
          <EmptyState heading="No results" description="No results" />
        }
      />,
    );

    await screen.findByRole("table");
    expect(screen.queryAllByText("No results").length).toBeGreaterThan(0);
  });

  it("can sort rows", async () => {
    render(
      <DataView
        availableLayouts={["table"]}
        getData={getSimpleData}
        tableLayoutOptions={{
          columns: columns,
          hasSorting: true,
        }}
      />,
    );

    // Detect if the data has loaded in
    await screen.findByText("Luke Skywalker");

    const initialRows = await screen.findAllByRole("row");
    expect(queryByText(initialRows[1], "Luke Skywalker")).not.toBeNull();
    expect(queryByText(initialRows[6], "R2-D2")).not.toBeNull();

    // Sort by order
    const idHeader = getByText(initialRows[0], "ID");
    fireEvent.click(idHeader);

    // Detect if the data has loaded in again
    await screen.findByText("Luke Skywalker");

    const updatedRows = await screen.findAllByRole("row");
    expect(queryByText(updatedRows[1], "R2-D2")).not.toBeNull();
    expect(queryByText(updatedRows[6], "Luke Skywalker")).not.toBeNull();
  });

  it("can change row density", async () => {
    render(
      <DataView
        availableLayouts={["table"]}
        getData={getSimpleData}
        tableLayoutOptions={{
          columns: columns,
          hasChangeableDensity: true,
        }}
      />,
    );

    // Detect if the data has loaded in
    await screen.findByText("Luke Skywalker");

    const rows = await screen.findAllByRole("row");
    const tBody = rows[1].parentElement;
    expect(tBody?.className).not.toContain("MuiTableBody-compact");

    const densityButton = screen.getByLabelText("Table density");
    fireEvent.click(densityButton);

    const densityCompactButton = screen.getByText("Compact", {
      selector: "li",
    });
    fireEvent.click(densityCompactButton);

    expect(tBody?.className).toContain("MuiTableBody-compact");
  });
  it("can change column visibility", async () => {
    render(
      <DataView
        availableLayouts={["table"]}
        getData={getSimpleData}
        tableLayoutOptions={{
          columns: columns,
          hasColumnVisibility: true,
        }}
      />,
    );

    // Detect if the data has loaded in
    await screen.findByText("Mos Eisley");

    const visibilityButton = screen.getByLabelText("Show/hide columns");
    fireEvent.click(visibilityButton);

    const cityCheckbox = screen.getByText("City", { selector: "li" });
    fireEvent.click(cityCheckbox);

    expect(screen.queryByText("Mos Eisley")).toBeNull();
  });
  it("can resize columns", async () => {
    render(
      <DataView
        availableLayouts={["table"]}
        getData={getSimpleData}
        tableLayoutOptions={{
          columns: columns,
          hasColumnResizing: true,
        }}
      />,
    );

    // Detect if the data has loaded in
    await screen.findByText("Luke Skywalker");

    const rows = await screen.findAllByRole("row");
    const tHead = rows[0].parentElement;
    const hrElement = tHead!.querySelector("hr");
    expect(tHead).toContainElement(hrElement);
  });

  it("displays paged pagination", async () => {
    render(
      <DataView
        availableLayouts={["table"]}
        getData={getSimpleData}
        hasPagination
        paginationType="paged"
        tableLayoutOptions={{
          columns: columns,
        }}
      />,
    );

    expect(await screen.findByLabelText("Next page")).toBeInTheDocument();
  });
  it("displays loadMore pagination", async () => {
    render(
      <DataView
        availableLayouts={["table"]}
        getData={getSimpleData}
        hasPagination
        paginationType="loadMore"
        tableLayoutOptions={{
          columns: columns,
        }}
      />,
    );

    expect(
      await screen.findByText("Show more", { selector: "button" }),
    ).toBeInTheDocument();
  });
  it("can load more rows via loadMore pagination", async () => {
    render(
      <DataView
        availableLayouts={["table"]}
        getData={getSimpleData}
        hasPagination
        paginationType="loadMore"
        resultsPerPage={3}
        enableVirtualization={false}
        tableLayoutOptions={{
          columns: columns,
        }}
      />,
    );

    const table = await screen.findByRole("table");

    expect((await findAllByRole(table, "row")).length).toBe(4);

    const loadMoreButton = await screen.findByText("Show more", {
      selector: "button",
    });
    fireEvent.click(loadMoreButton);

    const updatedTable = await screen.findByRole("table");
    expect((await findAllByRole(updatedTable, "row")).length).toBe(7);
  });
  it("can go to the next page", async () => {
    render(
      <DataView
        availableLayouts={["table"]}
        getData={getSimpleData}
        hasPagination
        paginationType="paged"
        resultsPerPage={2}
        tableLayoutOptions={{
          columns: columns,
        }}
      />,
    );

    expect(await screen.findByLabelText("Next page")).toBeInTheDocument();

    const nextPageButton = screen.getByLabelText("Next page", {
      selector: "button",
    });

    expect(await screen.findByText("Luke Skywalker")).toBeInTheDocument();
    expect(screen.queryByText("Chewbacca")).not.toBeInTheDocument();

    fireEvent.click(nextPageButton);

    expect(await screen.findByText("Chewbacca")).toBeInTheDocument();
    expect(screen.queryByText("Luke Skywalker")).not.toBeInTheDocument();
  });
  it("can go to the previous page", async () => {
    render(
      <DataView
        availableLayouts={["table"]}
        getData={getSimpleData}
        hasPagination
        paginationType="paged"
        resultsPerPage={2}
        tableLayoutOptions={{
          columns: columns,
        }}
      />,
    );

    expect(await screen.findByLabelText("Next page")).toBeInTheDocument();

    const nextPageButton = screen.getByLabelText("Next page", {
      selector: "button",
    });
    const prevPageButton = screen.getByLabelText("Previous page", {
      selector: "button",
    });

    expect(await screen.findByText("Luke Skywalker")).toBeInTheDocument();
    expect(screen.queryByText("Chewbacca")).not.toBeInTheDocument();

    fireEvent.click(nextPageButton);

    expect(await screen.findByText("Chewbacca")).toBeInTheDocument();
    expect(screen.queryByText("Luke Skywalker")).not.toBeInTheDocument();

    fireEvent.click(prevPageButton);

    expect(await screen.findByText("Luke Skywalker")).toBeInTheDocument();
    expect(screen.queryByText("Chewbacca")).not.toBeInTheDocument();
  });
  it("can disable the next page button based on max rows", async () => {
    render(
      <DataView
        availableLayouts={["table"]}
        getData={getSimpleData}
        hasPagination
        paginationType="paged"
        resultsPerPage={simpleData.length - 1}
        totalRows={simpleData.length}
        tableLayoutOptions={{
          columns: columns,
        }}
      />,
    );

    expect(await screen.findByText("Luke Skywalker")).toBeInTheDocument();

    const nextPageButton = screen.getByLabelText("Next page", {
      selector: "button",
    });

    expect(nextPageButton).not.toBeDisabled();

    fireEvent.click(nextPageButton);

    expect(nextPageButton).toBeDisabled();
  });
});
