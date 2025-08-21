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

import { render, screen, waitFor, within } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { OdysseyProvider } from "../../OdysseyProvider.js";
import { MRT_RowSelectionState } from "material-react-table";
import { describe, test } from "vitest";

import {
  CardLayoutProps,
  DataOnReorderRowsType,
  DataView,
  TableLayoutProps,
} from "./index.js";
import {
  data,
  columns,
  filterData,
  reorderData,
  Person,
} from "./testSupportData.js";
import { Button, MenuItem } from "../../Buttons/index.js";
import { DataTableRowData } from "../../DataTable/index.js";
import { EmptyState } from "../../EmptyState.js";
import { getControlledElement } from "../../test-selectors/linkedHtmlSelectors.js";

const getData = ({ ...props }) => {
  return filterData({ data, ...props });
};

const listItemProps: CardLayoutProps<Person>["itemProps"] = (row) => ({
  title: row.name,
  overline: "List card",
});

const gridItemProps: CardLayoutProps<Person>["itemProps"] = (row) => ({
  title: row.name,
  overline: "Grid card",
});

const waitUntilTableLoadedHack = async () =>
  await waitFor(async () =>
    expect(await screen.findByText(data[0].name)).toBeVisible(),
  );

describe("DataView", { timeout: 10000 }, () => {
  describe("DataView layouts", () => {
    test("displays a table view", async () => {
      const { container } = render(
        <OdysseyProvider>
          <DataView
            availableLayouts={["table"]}
            getData={getData}
            tableLayoutOptions={{
              columns,
            }}
          />
        </OdysseyProvider>,
      );

      await waitUntilTableLoadedHack();

      expect(within(container).queryByRole("table")).not.toBeNull();
      expect(within(container).queryByRole("list")).toBeNull();
    });

    test("displays a list view", async () => {
      const { container } = render(
        <OdysseyProvider>
          <DataView
            availableLayouts={["list"]}
            getData={getData}
            cardLayoutOptions={{
              itemProps: listItemProps,
            }}
          />
        </OdysseyProvider>,
      );

      await waitUntilTableLoadedHack();

      expect(within(container).queryByRole("table")).toBeNull();
      expect(within(container).queryByRole("list")).not.toBeNull();
    });

    test("displays a grid view", async () => {
      const { container } = render(
        <OdysseyProvider>
          <DataView
            availableLayouts={["grid"]}
            getData={getData}
            cardLayoutOptions={{
              itemProps: gridItemProps,
            }}
          />
        </OdysseyProvider>,
      );

      await waitUntilTableLoadedHack();

      expect(within(container).queryByRole("table")).toBeNull();
      expect(within(container).queryByRole("list")).not.toBeNull();
    });

    test("displays the layout switcher", async () => {
      const user = userEvent.setup();

      render(
        <OdysseyProvider>
          <DataView
            availableLayouts={["table", "list"]}
            getData={getData}
            tableLayoutOptions={{
              columns,
            }}
            cardLayoutOptions={{
              itemProps: listItemProps,
            }}
          />
        </OdysseyProvider>,
      );

      const layoutSwitcherButton = screen.getByLabelText("Layout", {
        selector: "button",
      });
      await user.click(layoutSwitcherButton);

      const layoutSwitcherMenu = getControlledElement({
        element: layoutSwitcherButton,
      });

      await waitFor(() => {
        expect(
          within(layoutSwitcherMenu).getAllByRole("menuitem"),
        ).toHaveLength(2);

        expect(
          within(layoutSwitcherMenu).getByRole("menuitem", { name: "Table" }),
        ).toBeVisible();

        expect(
          within(layoutSwitcherMenu).getByRole("menuitem", { name: "List" }),
        ).toBeVisible();
      });
    });
  });

  test("can display meta text", () => {
    const metaText = "Last updated 12 hours ago";

    render(
      <OdysseyProvider>
        <DataView
          availableLayouts={["table"]}
          getData={getData}
          tableLayoutOptions={{
            columns,
          }}
          metaText={metaText}
        />
      </OdysseyProvider>,
    );

    expect(screen.getByText(metaText)).toBeVisible();
  });

  describe("Filter and search", () => {
    test("can filter rows", async () => {
      const user = userEvent.setup();

      render(
        <OdysseyProvider>
          <DataView
            availableLayouts={["table"]}
            hasFilters
            getData={getData}
            tableLayoutOptions={{
              columns,
            }}
          />
        </OdysseyProvider>,
      );

      expect(await screen.findByText(data[0].name)).toBeVisible();
      expect(await screen.findByText(data[1].name)).toBeVisible();

      const filterButton = screen.getByLabelText("Filters", {
        selector: "button",
      });
      await user.click(filterButton);

      const filterMenu = getControlledElement({ element: filterButton });
      const nameMenuItem = within(filterMenu).getByRole("menuitem", {
        name: /Name/i,
      });
      await user.click(nameMenuItem);

      const nameFilterMenu = getControlledElement({ element: nameMenuItem });
      const nameInput = within(nameFilterMenu).getByLabelText("Name");
      const submitButton = within(nameFilterMenu).getByRole("button");

      await user.click(nameInput);

      await user.keyboard(`${data[1].name}{ENTER}`);
      await user.click(submitButton);

      await screen.findByText("Clear filters");

      const table = screen.getByRole("table");
      expect(screen.queryByText(data[0].name)).toBeNull();
      expect(await within(table).findByText(data[1].name)).toBeVisible();
    });

    test("can search rows", async () => {
      const user = userEvent.setup();

      render(
        <OdysseyProvider>
          <DataView
            availableLayouts={["table"]}
            hasSearch
            hasSearchSubmitButton
            getData={getData}
            tableLayoutOptions={{
              columns,
            }}
          />
        </OdysseyProvider>,
      );

      expect(await screen.findByText(data[0].name)).toBeVisible();
      expect(await screen.findByText(data[1].name)).toBeVisible();

      const searchInput = screen.getByPlaceholderText(/Search/i);
      const submitButton = screen.getByText("Search", { selector: "button" });
      await user.click(searchInput);
      await user.keyboard(`${data[1].name}`);
      await user.click(submitButton);

      const table = screen.getByRole("table");
      expect(screen.queryByText(data[0].name)).toBeNull();
      expect(await within(table).findByText(data[1].name)).toBeVisible();
    });

    test("can clear the search input", async () => {
      const user = userEvent.setup();

      render(
        <OdysseyProvider>
          <DataView
            availableLayouts={["table"]}
            hasSearch
            hasSearchSubmitButton
            getData={getData}
            tableLayoutOptions={{
              columns,
            }}
          />
        </OdysseyProvider>,
      );

      expect(await screen.findByText(data[0].name)).toBeVisible();
      expect(await screen.findByText(data[1].name)).toBeVisible();

      const searchInput = screen.getByPlaceholderText(/Search/i);
      const submitButton = screen.getByText("Search", { selector: "button" });
      await user.click(searchInput);
      await user.keyboard(`${data[1].name}`);
      await user.click(submitButton);

      const table = screen.getByRole("table");
      expect(screen.queryByText(data[0].name)).toBeNull();
      expect(await within(table).findByText(data[1].name)).toBeVisible();

      const clearButton = screen.getByLabelText("Clear", {
        selector: "button",
      });
      await user.click(clearButton);

      await waitFor(() => {
        expect(searchInput).toHaveValue("");
        expect(screen.getAllByRole("row")).toHaveLength(7);
        expect(screen.getByText(data[0].name)).toBeVisible();
        expect(screen.getByText(data[1].name)).toBeVisible();
      });
    });
  });

  describe("Row actions", () => {
    test("can display row action menu", async () => {
      const user = userEvent.setup();

      const rowActionMenuItems: TableLayoutProps<Person>["rowActionMenuItems"] =
        (row) => <MenuItem>Action for {row.name}</MenuItem>;

      render(
        <OdysseyProvider>
          <DataView
            availableLayouts={["table"]}
            getData={getData}
            tableLayoutOptions={{
              columns,
              rowActionMenuItems,
            }}
          />
        </OdysseyProvider>,
      );

      await waitUntilTableLoadedHack();

      // Index 1 because row[0] is the th row
      const firstBodyRow = (await screen.findAllByRole("row"))[1];
      const firstBodyRowActionButton = within(firstBodyRow).getByRole("button");
      await user.click(firstBodyRowActionButton);

      const actionMenu = getControlledElement({
        element: firstBodyRowActionButton,
      });
      const actionMenuItem = within(actionMenu).getByRole("menuitem");

      await waitFor(() => {
        expect(
          within(actionMenuItem).getByText(`Action for ${data[0].name}`),
        ).toBeVisible();
      });
    });

    test("can display row action buttons", async () => {
      const rowActionButtons: TableLayoutProps<Person>["rowActionButtons"] = (
        row,
      ) => <Button variant="primary" label={`Button for ${row?.name}`} />;

      render(
        <OdysseyProvider>
          <DataView
            availableLayouts={["table"]}
            getData={getData}
            tableLayoutOptions={{
              columns,
              rowActionButtons,
            }}
          />
        </OdysseyProvider>,
      );

      await waitUntilTableLoadedHack();

      // Index 1 because row[0] is the th row
      const firstBodyRow = (await screen.findAllByRole("row"))[1];
      const firstBodyRowActionButton = within(firstBodyRow).getByText(
        `Button for ${data[0].name}`,
        { selector: "button" },
      );

      expect(firstBodyRowActionButton).toBeVisible();
    });
  });

  describe("Row selection", () => {
    test("can select table rows", async () => {
      const user = userEvent.setup();

      render(
        <OdysseyProvider>
          <DataView
            availableLayouts={["table"]}
            getData={getData}
            hasRowSelection
            tableLayoutOptions={{
              columns,
            }}
          />
        </OdysseyProvider>,
      );

      await waitUntilTableLoadedHack();

      const checkboxes = screen.getAllByRole("checkbox");
      await user.click(checkboxes[1]);

      const selectedText = screen.getByText("1 selected", {
        selector: "button",
      });
      expect(selectedText).toBeVisible();
    });

    test("can select all rows", async () => {
      const user = userEvent.setup();

      render(
        <OdysseyProvider>
          <DataView
            availableLayouts={["table"]}
            getData={getData}
            hasRowSelection
            tableLayoutOptions={{
              columns,
            }}
          />
        </OdysseyProvider>,
      );

      await waitUntilTableLoadedHack();

      const checkboxes = screen.getAllByRole("checkbox");
      await user.click(checkboxes[0]);

      const selectedText = screen.getByText(`${data.length} selected`, {
        selector: "button",
      });
      expect(selectedText).toBeVisible();
    });

    test("can select card rows", async () => {
      const user = userEvent.setup();

      render(
        <OdysseyProvider>
          <DataView
            availableLayouts={["grid"]}
            getData={getData}
            hasRowSelection
            cardLayoutOptions={{
              itemProps: gridItemProps,
            }}
          />
        </OdysseyProvider>,
      );

      await waitUntilTableLoadedHack();

      const checkboxes = screen.getAllByRole("checkbox");
      await user.click(checkboxes[1]);

      const selectedText = screen.getByText("1 selected", {
        selector: "button",
      });
      expect(selectedText).toBeVisible();
    });

    test("can select all card rows", async () => {
      const user = userEvent.setup();

      render(
        <OdysseyProvider>
          <DataView
            availableLayouts={["table"]}
            getData={getData}
            hasRowSelection
            tableLayoutOptions={{
              columns,
            }}
          />
        </OdysseyProvider>,
      );

      await waitUntilTableLoadedHack();

      const checkboxes = screen.getAllByRole("checkbox");
      await user.click(checkboxes[0]);

      const selectedText = screen.getByText(`${data.length} selected`, {
        selector: "button",
      });
      expect(selectedText).toBeVisible();
    });

    test("can deselect rows", async () => {
      const user = userEvent.setup();

      render(
        <OdysseyProvider>
          <DataView
            availableLayouts={["table"]}
            getData={getData}
            hasRowSelection
            tableLayoutOptions={{
              columns,
            }}
          />
        </OdysseyProvider>,
      );

      await waitUntilTableLoadedHack();

      const checkboxes = screen.getAllByRole("checkbox");
      await user.click(checkboxes[1]);
      await user.click(checkboxes[2]);

      expect(
        screen.getByText("2 selected", { selector: "button" }),
      ).toBeVisible();

      await user.click(checkboxes[1]);

      expect(
        screen.getByText("1 selected", { selector: "button" }),
      ).toBeVisible();
    });

    test("can deselect all rows", async () => {
      const user = userEvent.setup();

      render(
        <OdysseyProvider>
          <DataView
            availableLayouts={["table"]}
            getData={getData}
            hasRowSelection
            tableLayoutOptions={{
              columns,
            }}
          />
        </OdysseyProvider>,
      );

      await waitUntilTableLoadedHack();

      const checkboxes = screen.getAllByRole("checkbox");
      await user.click(checkboxes[0]);

      const selectedText = screen.getByText(`${data.length} selected`, {
        selector: "button",
      });
      expect(selectedText).toBeVisible();

      await user.click(checkboxes[0]);

      expect(
        screen.queryByText(`${data.length} selected`, { selector: "button" }),
      ).toBeNull();
    });

    test("can perform bulk actions on rows", async () => {
      const user = userEvent.setup();

      const bulkActionMenuItems = (selectedRows: MRT_RowSelectionState) => (
        <MenuItem>Bulk action for {Object.keys(selectedRows).length}</MenuItem>
      );

      render(
        <OdysseyProvider>
          <DataView
            availableLayouts={["table"]}
            getData={getData}
            hasRowSelection
            tableLayoutOptions={{
              columns,
            }}
            bulkActionMenuItems={bulkActionMenuItems}
          />
        </OdysseyProvider>,
      );

      await waitUntilTableLoadedHack();

      const selectAllButton = screen.getByText("Select all", {
        selector: "button",
      });
      await user.click(selectAllButton);

      const selectedButton = screen.getByText(`${data.length} selected`, {
        selector: "button",
      });
      await user.click(selectedButton);

      const bulkActionsMenu = getControlledElement({ element: selectedButton });
      const bulkActionsMenuItem = within(bulkActionsMenu).getByRole("menuitem");
      expect(bulkActionsMenuItem.textContent).toBe(
        `Bulk action for ${data.length}`,
      );
    });
  });

  describe("Row reordering", () => {
    test("can reorder rows", async () => {
      const user = userEvent.setup();

      let updatedData = data.slice();

      const handleReorderRows = ({
        rowId,
        newRowIndex,
      }: DataOnReorderRowsType) => {
        updatedData = reorderData({ data: updatedData, rowId, newRowIndex });
      };

      render(
        <OdysseyProvider>
          <DataView
            availableLayouts={["table"]}
            getData={() => updatedData}
            hasRowReordering
            onReorderRows={handleReorderRows}
            tableLayoutOptions={{
              columns,
            }}
          />
        </OdysseyProvider>,
      );

      expect(await screen.findByText(data[0].name)).toBeVisible();
      expect(await screen.findByText(data[1].name)).toBeVisible();

      const moreActionsButton = within(
        screen.getAllByRole("row")[2],
      ).getByLabelText("More actions", { selector: "button" });
      await user.click(moreActionsButton);

      const moreActionsMenu = getControlledElement({
        element: moreActionsButton,
      });
      const moveForwardButton = within(moreActionsMenu).getByRole("menuitem", {
        name: "Bring forward",
      });
      await user.click(moveForwardButton);

      const updatedRows = await screen.findAllByRole("row");

      // Confirm that the first two rows have swapped
      expect(updatedRows[1].textContent).toContain(data[1].name);
      expect(updatedRows[2].textContent).toContain(data[0].name);
    });

    test("can reorder to front", async () => {
      const user = userEvent.setup();

      let updatedData = data.slice();

      const handleReorderRows = ({
        rowId,
        newRowIndex,
      }: DataOnReorderRowsType) => {
        updatedData = reorderData({ data: updatedData, rowId, newRowIndex });
      };

      render(
        <OdysseyProvider>
          <DataView
            availableLayouts={["table"]}
            getData={() => updatedData}
            hasRowReordering
            onReorderRows={handleReorderRows}
            tableLayoutOptions={{
              columns,
            }}
          />
        </OdysseyProvider>,
      );

      expect(await screen.findByText(data[0].name)).toBeVisible();
      expect(await screen.findByText(data[5].name)).toBeVisible();

      const moreActionsButton = within(
        screen.getAllByRole("row")[6],
      ).getByLabelText("More actions", { selector: "button" });
      await user.click(moreActionsButton);

      const moreActionsMenu = getControlledElement({
        element: moreActionsButton,
      });
      const moveToFrontButton = within(moreActionsMenu).getByRole("menuitem", {
        name: "Bring to front",
      });
      await user.click(moveToFrontButton);

      const updatedRows = await screen.findAllByRole("row");

      // Confirm that the first two rows have swapped
      expect(updatedRows[1].textContent).toContain(data[5].name);
      expect(updatedRows[2].textContent).toContain(data[0].name);
    });

    test("can reorder to back", async () => {
      const user = userEvent.setup();

      let updatedData = data.slice();

      const handleReorderRows = ({
        rowId,
        newRowIndex,
      }: DataOnReorderRowsType) => {
        updatedData = reorderData({ data: updatedData, rowId, newRowIndex });
      };

      render(
        <OdysseyProvider>
          <DataView
            availableLayouts={["table"]}
            getData={() => updatedData}
            hasRowReordering
            onReorderRows={handleReorderRows}
            totalRows={updatedData.length}
            tableLayoutOptions={{
              columns,
            }}
          />
        </OdysseyProvider>,
      );

      expect(await screen.findByText(data[0].name)).toBeVisible();
      expect(await screen.findByText(data[5].name)).toBeVisible();

      const moreActionsButton = within(
        screen.getAllByRole("row")[1],
      ).getByLabelText("More actions", { selector: "button" });
      await user.click(moreActionsButton);

      const moreActionsMenu = getControlledElement({
        element: moreActionsButton,
      });
      const moveToBackButton = within(moreActionsMenu).getByRole("menuitem", {
        name: "Send to back",
      });
      await user.click(moveToBackButton);

      const updatedRows = await screen.findAllByRole("row");

      expect(updatedRows[6].textContent).toContain(data[0].name);
      expect(updatedRows[5].textContent).toContain(data[5].name);
    });

    test("can expand table rows", async () => {
      const user = userEvent.setup();

      const tableDetails: TableLayoutProps<Person>["renderDetailPanel"] = ({
        row,
      }) => {
        return <p>This is additional content for {row.original.name}</p>;
      };

      render(
        <OdysseyProvider>
          <DataView
            availableLayouts={["table"]}
            getData={getData}
            tableLayoutOptions={{
              columns,
              renderDetailPanel: tableDetails,
            }}
          />
        </OdysseyProvider>,
      );

      await waitUntilTableLoadedHack();
      expect(
        screen.queryByText(`This is additional content for ${data[0].name}`),
      ).toBeNull();

      const firstBodyRow = (await screen.findAllByRole("row"))[1];
      const firstBodyRowExpandButton = within(firstBodyRow).getByLabelText(
        "Expand",
        { selector: "button" },
      );
      await user.click(firstBodyRowExpandButton);

      expect(
        screen.queryByText(`This is additional content for ${data[0].name}`),
      ).not.toBeNull();
    });
  });

  test("can expand card rows", async () => {
    const user = userEvent.setup();

    const cardDetails = ({ row }: { row: DataTableRowData }) => {
      return <p>This is additional content for {row.name}</p>;
    };

    render(
      <OdysseyProvider>
        <DataView
          availableLayouts={["grid"]}
          getData={getData}
          cardLayoutOptions={{
            itemProps: gridItemProps,
            renderDetailPanel: cardDetails,
          }}
        />
      </OdysseyProvider>,
    );

    expect(await screen.findAllByText(data[0].name)).toHaveLength(1);
    expect(
      screen.queryByText(`This is additional content for ${data[0].name}`),
    ).toBeNull();

    const firstCard = (await screen.findAllByRole("listitem"))[0];
    const firstCardExpandButton = within(firstCard).getByLabelText("Expand", {
      selector: "button",
    });
    await user.click(firstCardExpandButton);

    expect(
      screen.queryByText(`This is additional content for ${data[0].name}`),
    ).not.toBeNull();
  });

  test("can display empty state", async () => {
    const emptyText = "This is the empty state text.";

    render(
      <OdysseyProvider>
        <DataView
          availableLayouts={["table"]}
          getData={() => []}
          tableLayoutOptions={{
            columns,
          }}
          emptyPlaceholder={
            <EmptyState heading="Empty" description={emptyText} />
          }
        />
      </OdysseyProvider>,
    );

    expect(await screen.findByText(emptyText)).not.toBeNull();
  });

  test("can display no-results state", async () => {
    const noResultsText = "This is the no results state text.";

    render(
      <OdysseyProvider>
        <DataView
          availableLayouts={["table"]}
          getData={() => []}
          tableLayoutOptions={{
            columns,
          }}
          noResultsPlaceholder={
            <EmptyState heading="No results" description={noResultsText} />
          }
        />
      </OdysseyProvider>,
    );

    expect(await screen.findByText(noResultsText)).not.toBeNull();
  });

  test("can sort rows", async () => {
    const user = userEvent.setup();

    render(
      <OdysseyProvider>
        <DataView
          availableLayouts={["table"]}
          getData={getData}
          tableLayoutOptions={{
            columns,
            hasSorting: true,
          }}
        />
      </OdysseyProvider>,
    );

    await waitUntilTableLoadedHack();

    const initialRows = screen.getAllByRole("row");
    expect(initialRows[1].textContent).toContain(data[0].name);

    const idHeader = screen.getByRole("button", {
      name: "Sort by ID descending",
    });
    await user.click(idHeader);

    expect(await screen.findByText(data[0].name)).toBeVisible();

    const sortedRows = screen.getAllByRole("row");
    expect(sortedRows[6].textContent).toContain(data[0].name);
  });

  test("can change row density", async () => {
    const user = userEvent.setup();

    render(
      <OdysseyProvider>
        <DataView
          availableLayouts={["table"]}
          getData={getData}
          tableLayoutOptions={{
            columns,
            hasChangeableDensity: true,
          }}
        />
      </OdysseyProvider>,
    );

    await waitUntilTableLoadedHack();

    // Since table density is a purely visible attribute, there's no ARIA
    // attribute to target here. We're forced to use the className directly.
    const tBody = screen.getAllByRole("row")[1].parentElement;
    expect(tBody?.className).not.toContain("MuiTableBody-compact");

    const densityButton = screen.getByLabelText("Table density", {
      selector: "button",
    });
    await user.click(densityButton);

    const densityMenu = getControlledElement({ element: densityButton });
    const densityCompact = within(densityMenu).getByRole("menuitem", {
      name: "Compact",
    });
    await user.click(densityCompact);

    expect(tBody?.className).toContain("MuiTableBody-compact");
  });

  test("can change column visibility", async () => {
    const user = userEvent.setup();

    render(
      <OdysseyProvider>
        <DataView
          availableLayouts={["table"]}
          getData={getData}
          tableLayoutOptions={{
            columns,
            hasColumnVisibility: true,
          }}
        />
      </OdysseyProvider>,
    );

    // Detect if the data has loaded in
    await screen.findByText(data[0].city);

    const visibilityButton = screen.getByLabelText("Show/hide columns", {
      selector: "button",
    });
    await user.click(visibilityButton);

    const visibilityMenu = getControlledElement({ element: visibilityButton });

    const cityCheckbox = within(visibilityMenu).getByText("City");
    await user.click(cityCheckbox);

    expect(screen.queryByText(data[0].city)).toBeNull();
  });

  test("can resize columns", async () => {
    render(
      <OdysseyProvider>
        <DataView
          availableLayouts={["table"]}
          getData={getData}
          tableLayoutOptions={{
            columns,
            hasColumnResizing: true,
          }}
        />
      </OdysseyProvider>,
    );

    await waitUntilTableLoadedHack();

    const rows = await screen.findAllByRole("row");
    const tHead = rows[0].parentElement;

    // Ensure that the resize handle is displayed when
    // hasColumnResizing is true
    const hrElement = tHead!.querySelector("hr");
    expect(tHead).toContainElement(hrElement);
  });

  describe("Pagination", () => {
    test("displays paged pagination", async () => {
      render(
        <OdysseyProvider>
          <DataView
            availableLayouts={["table"]}
            getData={getData}
            hasPagination
            paginationType="paged"
            tableLayoutOptions={{
              columns,
            }}
          />
        </OdysseyProvider>,
      );

      await waitUntilTableLoadedHack();

      const paginationContainer = await screen.findByLabelText("Pagination", {
        selector: "nav",
      });
      expect(
        within(paginationContainer).getByLabelText("Next page", {
          selector: "button",
        }),
      ).toBeInTheDocument();
    });

    test("displays loadMore pagination", async () => {
      render(
        <OdysseyProvider>
          <DataView
            availableLayouts={["table"]}
            getData={getData}
            hasPagination
            paginationType="loadMore"
            enableVirtualization={false}
            tableLayoutOptions={{
              columns,
            }}
          />
        </OdysseyProvider>,
      );

      await waitUntilTableLoadedHack();

      expect(
        screen.getByText("Show more", { selector: "button" }),
      ).toBeInTheDocument();
    });

    test("can load more rows via loadMore pagination", async () => {
      const user = userEvent.setup();

      render(
        <OdysseyProvider>
          <DataView
            availableLayouts={["table"]}
            getData={getData}
            hasPagination
            paginationType="loadMore"
            resultsPerPage={3}
            enableVirtualization={false}
            tableLayoutOptions={{
              columns,
            }}
          />
        </OdysseyProvider>,
      );

      await waitUntilTableLoadedHack();

      expect(screen.getAllByRole("row")).toHaveLength(4);

      const loadMoreButton = screen.getByText("Show more", {
        selector: "button",
      });
      await user.click(loadMoreButton);

      await waitFor(() => {
        expect(screen.getAllByRole("row")).toHaveLength(7); // 6 data rows + header row
      });
    });

    test("can go to the next page", async () => {
      const user = userEvent.setup();

      render(
        <OdysseyProvider>
          <DataView
            availableLayouts={["table"]}
            getData={getData}
            hasPagination
            paginationType="paged"
            resultsPerPage={2}
            tableLayoutOptions={{
              columns,
            }}
          />
        </OdysseyProvider>,
      );

      await waitUntilTableLoadedHack();

      expect(screen.queryByText(data[0].name)).not.toBeNull();
      expect(screen.queryByText(data[2].name)).toBeNull();

      const nextPageButton = screen.getByLabelText("Next page", {
        selector: "button",
      });
      await user.click(nextPageButton);

      await screen.findByText(data[2].name);

      expect(screen.queryByText(data[0].name)).toBeNull();
      expect(screen.queryByText(data[2].name)).not.toBeNull();
    });

    test("can go to the previous page", async () => {
      const user = userEvent.setup();

      render(
        <OdysseyProvider>
          <DataView
            availableLayouts={["table"]}
            getData={getData}
            hasPagination
            paginationType="paged"
            resultsPerPage={2}
            tableLayoutOptions={{
              columns,
            }}
          />
        </OdysseyProvider>,
      );

      await waitUntilTableLoadedHack();

      expect(screen.queryByText(data[0].name)).not.toBeNull();
      expect(screen.queryByText(data[2].name)).toBeNull();

      const nextPageButton = screen.getByLabelText("Next page", {
        selector: "button",
      });
      await user.click(nextPageButton);

      await screen.findByText(data[2].name);

      expect(screen.queryByText(data[0].name)).toBeNull();
      expect(screen.queryByText(data[2].name)).not.toBeNull();

      const prevPageButton = screen.getByLabelText("Previous page", {
        selector: "button",
      });
      await user.click(prevPageButton);

      await waitUntilTableLoadedHack();

      expect(screen.queryByText(data[0].name)).not.toBeNull();
      expect(screen.queryByText(data[2].name)).toBeNull();
    });

    test("can disable the next page button based on max rows", async () => {
      const user = userEvent.setup();

      render(
        <OdysseyProvider>
          <DataView
            availableLayouts={["table"]}
            getData={getData}
            hasPagination
            paginationType="paged"
            resultsPerPage={data.length - 1}
            totalRows={data.length}
            tableLayoutOptions={{
              columns,
            }}
          />
        </OdysseyProvider>,
      );

      await waitUntilTableLoadedHack();

      const nextPageButton = screen.getByLabelText("Next page", {
        selector: "button",
      });
      const prevPageButton = screen.getByLabelText("Previous page", {
        selector: "button",
      });

      expect(prevPageButton).toBeDisabled();
      expect(nextPageButton).not.toBeDisabled();

      await user.click(nextPageButton);

      expect(prevPageButton).not.toBeDisabled();
      expect(nextPageButton).toBeDisabled();
    });
  });
});
