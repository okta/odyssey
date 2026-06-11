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

import type { RenderResult } from "vitest-browser-react";

import { MRT_RowSelectionState } from "material-react-table";
import { type ReactElement, useState } from "react";
import { page, userEvent } from "vitest/browser";

import { Button } from "../../Buttons/Button.js";
import { MenuItem } from "../../Buttons/MenuItem.js";
import { EmptyState } from "../../EmptyState.js";
import { DataTableRowData } from "../../index.js";
import { renderWithOdysseyProvider } from "../../test-utils/renderWithOdysseyProvider.js";
import {
  type CardLayoutProps,
  type TableLayoutProps,
} from "./componentTypes.js";
import { type DataOnReorderRowsType } from "./dataTypes.js";
import { DataView } from "./DataView.js";
import {
  columns,
  data,
  filterData,
  Person,
  reorderData,
} from "./testSupportData.js";

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

const renderDataView = async (ui: ReactElement): Promise<RenderResult> => {
  const result = await renderWithOdysseyProvider(ui);

  await expect.element(page.getByRole("progressbar")).not.toBeInTheDocument();

  return result;
};

describe("DataView", { timeout: 10000 }, () => {
  describe("DataView layouts", () => {
    test("displays a table view", async () => {
      await renderDataView(
        <DataView
          availableLayouts={["table"]}
          getData={getData}
          tableLayoutOptions={{
            columns,
          }}
        />,
      );

      await expect(document.body).toBeAccessible();

      await expect.element(page.getByRole("table")).toBeVisible();
      await expect.element(page.getByRole("list")).not.toBeInTheDocument();
    });

    test("displays a list view", async () => {
      await renderDataView(
        <DataView
          availableLayouts={["list"]}
          cardLayoutOptions={{
            itemProps: listItemProps,
          }}
          getData={getData}
        />,
      );

      await expect.element(page.getByRole("table")).not.toBeInTheDocument();
      await expect.element(page.getByRole("list")).toBeVisible();
    });

    test("displays a grid view", async () => {
      await renderDataView(
        <DataView
          availableLayouts={["grid"]}
          cardLayoutOptions={{
            itemProps: gridItemProps,
          }}
          getData={getData}
        />,
      );

      await expect(document.body).toBeAccessible();

      await expect.element(page.getByRole("table")).not.toBeInTheDocument();
      await expect.element(page.getByRole("list")).toBeVisible();
    });

    test("displays the layout switcher", async () => {
      await renderDataView(
        <DataView
          availableLayouts={["table", "list"]}
          cardLayoutOptions={{
            itemProps: listItemProps,
          }}
          getData={getData}
          tableLayoutOptions={{
            columns,
          }}
        />,
      );

      const layoutSwitcherButton = page.getByRole("button", { name: "Layout" });
      await userEvent.click(layoutSwitcherButton);

      const menuLocator = page.getByRole("menu");

      await expect.element(menuLocator.getByRole("menuitem")).toHaveLength(2);

      await expect
        .element(menuLocator.getByRole("menuitem", { name: "Table" }))
        .toBeVisible();
      await expect
        .element(menuLocator.getByRole("menuitem", { name: "List" }))
        .toBeVisible();

      await expect.element(menuLocator).toBeAccessible();
    });
  });

  test("can display meta text", async () => {
    const metaText = "Last updated 12 hours ago";

    await renderDataView(
      <DataView
        availableLayouts={["table"]}
        getData={getData}
        metaText={metaText}
        tableLayoutOptions={{
          columns,
        }}
      />,
    );

    await expect(document.body).toBeAccessible();
    await expect.element(page.getByText(metaText)).toBeVisible();
  });

  describe("Filter and search", () => {
    test("can filter rows", async () => {
      await renderDataView(
        <DataView
          availableLayouts={["table"]}
          getData={getData}
          hasFilters
          tableLayoutOptions={{
            columns,
          }}
        />,
      );

      await expect.element(page.getByText(data[0].name)).toBeVisible();
      await expect.element(page.getByText(data[1].name)).toBeVisible();

      const rows = page.getByRole("table").getByRole("row");

      await expect.element(rows).toHaveLength(7);

      const filterButton = page.getByRole("button", { name: "Filters" });
      await userEvent.click(filterButton);
      const filterMenu = page.getByRole("menu");
      await expect.element(filterMenu).toBeAccessible();
      const nameMenuItem = filterMenu.getByRole("menuitem", {
        name: /Name/i,
      });
      await userEvent.click(nameMenuItem);

      const nameInput = page.getByLabelText("Name");
      const submitButton = page.getByRole("button", { name: "Submit" });

      await userEvent.fill(nameInput, data[1].name);
      await userEvent.click(submitButton);

      await expect.element(page.getByText("Clear filters")).toBeVisible();

      await expect
        .element(page.getByText(data[0].name))
        .not.toBeInTheDocument();
      await expect
        .element(page.getByRole("table").getByText(data[1].name))
        .toBeVisible();

      await expect.element(rows).toHaveLength(2);
    });

    test("can search rows", async () => {
      await renderDataView(
        <DataView
          availableLayouts={["table"]}
          getData={getData}
          hasSearch
          hasSearchSubmitButton
          tableLayoutOptions={{
            columns,
          }}
        />,
      );

      await expect.element(page.getByText(data[0].name)).toBeVisible();
      await expect.element(page.getByText(data[1].name)).toBeVisible();

      const searchInput = page.getByPlaceholder(/Search/i);
      const submitButton = page.getByRole("button", { name: "Search" });
      await userEvent.fill(searchInput, data[1].name);
      await userEvent.click(submitButton);

      await expect
        .element(page.getByText(data[0].name))
        .not.toBeInTheDocument();
      await expect
        .element(page.getByRole("table").getByText(data[1].name))
        .toBeVisible();
    });

    test("can clear the search input", async () => {
      await renderDataView(
        <DataView
          availableLayouts={["table"]}
          getData={getData}
          hasSearch
          hasSearchSubmitButton
          tableLayoutOptions={{
            columns,
          }}
        />,
      );

      await expect.element(page.getByText(data[0].name)).toBeVisible();
      await expect.element(page.getByText(data[1].name)).toBeVisible();

      const searchInput = page.getByPlaceholder(/Search/i);
      const submitButton = page.getByRole("button", { name: "Search" });
      await userEvent.fill(searchInput, data[1].name);
      await userEvent.click(submitButton);

      await expect
        .element(page.getByText(data[0].name))
        .not.toBeInTheDocument();
      await expect
        .element(page.getByRole("table").getByText(data[1].name))
        .toBeVisible();

      const clearButton = page.getByRole("button", { name: "Clear" });
      await userEvent.click(clearButton);

      await expect.element(searchInput).toHaveValue("");

      await expect.element(page.getByRole("row")).toHaveLength(7);

      await expect.element(page.getByText(data[0].name)).toBeVisible();
      await expect.element(page.getByText(data[1].name)).toBeVisible();
    });
  });

  describe("Row actions", () => {
    test("can display row action menu", async () => {
      const rowActionMenuItems: TableLayoutProps<Person>["rowActionMenuItems"] =
        (row) => <MenuItem>Action for {row.name}</MenuItem>;

      await renderDataView(
        <DataView
          availableLayouts={["table"]}
          getData={getData}
          tableLayoutOptions={{
            columns,
            rowActionMenuItems,
          }}
        />,
      );

      // nth(1) because row[0] is the th row
      const firstBodyRowActionButton = page
        .getByRole("row")
        .nth(1)
        .getByRole("button");
      await userEvent.click(firstBodyRowActionButton);

      const actionMenuLocator = page.getByRole("menu");

      await expect
        .element(
          actionMenuLocator
            .getByRole("menuitem")
            .getByText(`Action for ${data[0].name}`),
        )
        .toBeVisible();
    });

    test("can display row action buttons", async () => {
      const rowActionButtons: TableLayoutProps<Person>["rowActionButtons"] = (
        row,
      ) => <Button label={`Button for ${row?.name}`} variant="primary" />;

      await renderDataView(
        <DataView
          availableLayouts={["table"]}
          getData={getData}
          tableLayoutOptions={{
            columns,
            rowActionButtons,
          }}
        />,
      );

      // nth(1) because row[0] is the th row
      const firstBodyRowActionButton = page
        .getByRole("row")
        .nth(1)
        .getByRole("button", { name: `Button for ${data[0].name}` });

      await expect.element(firstBodyRowActionButton).toBeVisible();
    });
  });

  describe("Row selection", () => {
    test("can select table rows", async () => {
      await renderDataView(
        <DataView
          availableLayouts={["table"]}
          getData={getData}
          hasRowSelection
          tableLayoutOptions={{
            columns,
          }}
        />,
      );

      await userEvent.click(page.getByRole("checkbox").nth(1));

      await expect
        .element(page.getByRole("button", { name: "More actions" }))
        .toHaveTextContent("1 selected");
    });

    test("can select all rows", async () => {
      await renderDataView(
        <DataView
          availableLayouts={["table"]}
          getData={getData}
          hasRowSelection
          tableLayoutOptions={{
            columns,
          }}
        />,
      );

      await userEvent.click(page.getByRole("checkbox").nth(0));

      await expect
        .element(page.getByRole("button", { name: "More actions" }))
        .toHaveTextContent(`${data.length} selected`);
    });

    test("can select card rows", async () => {
      await renderDataView(
        <DataView
          availableLayouts={["grid"]}
          cardLayoutOptions={{
            itemProps: gridItemProps,
          }}
          getData={getData}
          hasRowSelection
        />,
      );

      await userEvent.click(page.getByRole("checkbox").nth(1));

      await expect
        .element(page.getByRole("button", { name: "More actions" }))
        .toHaveTextContent("1 selected");
    });

    test("can select all card rows", async () => {
      await renderDataView(
        <DataView
          availableLayouts={["table"]}
          getData={getData}
          hasRowSelection
          tableLayoutOptions={{
            columns,
          }}
        />,
      );

      await userEvent.click(page.getByRole("checkbox").nth(0));

      await expect
        .element(page.getByRole("button", { name: "More actions" }))
        .toHaveTextContent(`${data.length} selected`);
    });

    test("can deselect rows", async () => {
      await renderDataView(
        <DataView
          availableLayouts={["table"]}
          getData={getData}
          hasRowSelection
          tableLayoutOptions={{
            columns,
          }}
        />,
      );

      await userEvent.click(page.getByRole("checkbox").nth(1));
      await userEvent.click(page.getByRole("checkbox").nth(2));

      const selectionButton = page.getByRole("button", {
        name: "More actions",
      });
      await expect.element(selectionButton).toHaveTextContent("2 selected");

      await userEvent.click(page.getByRole("checkbox").nth(1));

      await expect.element(selectionButton).toHaveTextContent("1 selected");
    });

    test("can deselect all rows", async () => {
      await renderDataView(
        <DataView
          availableLayouts={["table"]}
          getData={getData}
          hasRowSelection
          tableLayoutOptions={{
            columns,
          }}
        />,
      );

      await userEvent.click(page.getByRole("checkbox").nth(0));

      const selectionButton = page.getByRole("button", {
        name: "More actions",
      });
      await expect
        .element(selectionButton)
        .toHaveTextContent(`${data.length} selected`);

      await userEvent.click(page.getByRole("checkbox").nth(0));

      await expect.element(selectionButton).not.toBeInTheDocument();
    });

    test("Select none button deselects all rows", async () => {
      await renderDataView(
        <DataView
          availableLayouts={["table"]}
          getData={getData}
          hasRowSelection
          tableLayoutOptions={{
            columns,
          }}
        />,
      );

      await userEvent.click(page.getByRole("checkbox").first());

      await expect
        .element(page.getByRole("button", { name: "More actions" }))
        .toBeVisible();

      await userEvent.click(page.getByRole("button", { name: "Select none" }));

      await expect
        .element(page.getByRole("button", { name: "More actions" }))
        .not.toBeInTheDocument();
    });

    test("Select all button keys selection state using getRowId", async () => {
      const mockOnRowSelectionChange = vi.fn();
      const getCustomRowId = (row: Person) => `custom-${row.name}`;
      const bulkActionMenuItems = (selectedRows: MRT_RowSelectionState) => (
        <MenuItem>Selected {Object.keys(selectedRows).length}</MenuItem>
      );

      await renderDataView(
        <DataView
          availableLayouts={["table"]}
          bulkActionMenuItems={bulkActionMenuItems}
          getData={getData}
          getRowId={getCustomRowId}
          hasRowSelection
          onRowSelectionChange={mockOnRowSelectionChange}
          tableLayoutOptions={{
            columns,
          }}
        />,
      );

      await userEvent.click(page.getByRole("button", { name: "Select all" }));

      const expectedSelection = Object.fromEntries(
        data.map((row) => [`custom-${row.name}`, true]),
      );
      expect(mockOnRowSelectionChange).toHaveBeenLastCalledWith(
        expectedSelection,
      );

      const selectedButton = page.getByRole("button", { name: "More actions" });
      await userEvent.click(selectedButton);

      const bulkActionsMenuLocator = page.getByRole("menu");
      await expect
        .element(bulkActionsMenuLocator.getByRole("menuitem"))
        .toHaveTextContent(`Selected ${data.length}`);
    });

    test("onChangeRowSelection is called when row selection changes", async () => {
      const mockOnRowSelectionChange = vi.fn();

      await renderDataView(
        <DataView
          availableLayouts={["table"]}
          getData={getData}
          hasRowSelection
          onRowSelectionChange={mockOnRowSelectionChange}
          tableLayoutOptions={{
            columns,
          }}
        />,
      );

      await userEvent.click(page.getByRole("checkbox").nth(1));

      expect(mockOnRowSelectionChange).toHaveBeenLastCalledWith({
        [data[0].id]: true,
      });
    });

    test("can perform bulk actions on rows", async () => {
      const bulkActionMenuItems = (selectedRows: MRT_RowSelectionState) => (
        <MenuItem>Bulk action for {Object.keys(selectedRows).length}</MenuItem>
      );

      await renderDataView(
        <DataView
          availableLayouts={["table"]}
          bulkActionMenuItems={bulkActionMenuItems}
          getData={getData}
          hasRowSelection
          tableLayoutOptions={{
            columns,
          }}
        />,
      );

      await userEvent.click(page.getByRole("button", { name: "Select all" }));

      const selectedButton = page.getByRole("button", {
        name: "More actions",
      });
      await userEvent.click(selectedButton);

      const bulkActionsMenuLocator = page.getByRole("menu");
      const bulkActionsMenuItem = bulkActionsMenuLocator
        .getByRole("menuitem")
        .element();
      expect(bulkActionsMenuItem.textContent).toBe(
        `Bulk action for ${data.length}`,
      );
    });

    test("initialRowSelection seeds selected rows on mount", async () => {
      const { container } = await renderDataView(
        <DataView
          availableLayouts={["table"]}
          getData={getData}
          hasRowSelection
          initialRowSelection={{ [data[0].id]: true }}
          tableLayoutOptions={{
            columns,
          }}
        />,
      );

      await expect.element(page.getByRole("checkbox").nth(1)).toBeChecked();
      await expect
        .element(page.getByRole("button", { name: "More actions" }))
        .toHaveTextContent("1 selected");

      await expect(container).toBeAccessible();
    });

    test("rows stay selectable after initialRowSelection seeds the mount", async () => {
      const mockOnRowSelectionChange = vi.fn();

      await renderDataView(
        <DataView
          availableLayouts={["table"]}
          getData={getData}
          hasRowSelection
          initialRowSelection={{ [data[0].id]: true }}
          onRowSelectionChange={mockOnRowSelectionChange}
          tableLayoutOptions={{
            columns,
          }}
        />,
      );

      await userEvent.click(page.getByRole("checkbox").nth(2));

      await expect
        .element(page.getByRole("button", { name: "More actions" }))
        .toHaveTextContent("2 selected");

      expect(mockOnRowSelectionChange).toHaveBeenLastCalledWith({
        [data[0].id]: true,
        [data[1].id]: true,
      });
    });
  });

  describe("Row reordering", () => {
    test("can reorder rows", async () => {
      let updatedData = data.slice();

      const handleReorderRows = ({
        rowId,
        newRowIndex,
      }: DataOnReorderRowsType) => {
        updatedData = reorderData({ data: updatedData, rowId, newRowIndex });
      };

      await renderDataView(
        <DataView
          availableLayouts={["table"]}
          getData={() => updatedData}
          hasRowReordering
          onReorderRows={handleReorderRows}
          tableLayoutOptions={{
            columns,
          }}
        />,
      );

      await expect.element(page.getByText(data[0].name)).toBeVisible();
      await expect.element(page.getByText(data[1].name)).toBeVisible();

      const moreActionsButton = page
        .getByRole("row")
        .nth(2)
        .getByRole("button", { name: "More actions" });
      await userEvent.click(moreActionsButton);

      const moreActionsMenuLocator = page.getByRole("menu");
      await userEvent.click(
        moreActionsMenuLocator.getByRole("menuitem", { name: "Bring forward" }),
      );

      // Confirm that the first two rows have swapped
      await expect
        .element(page.getByRole("row").nth(1))
        .toHaveTextContent(data[1].name);
      await expect
        .element(page.getByRole("row").nth(2))
        .toHaveTextContent(data[0].name);
    });

    test("can reorder to front", async () => {
      let updatedData = data.slice();

      const handleReorderRows = ({
        rowId,
        newRowIndex,
      }: DataOnReorderRowsType) => {
        updatedData = reorderData({ data: updatedData, rowId, newRowIndex });
      };

      await renderDataView(
        <DataView
          availableLayouts={["table"]}
          getData={() => updatedData}
          hasRowReordering
          onReorderRows={handleReorderRows}
          tableLayoutOptions={{
            columns,
          }}
        />,
      );

      await expect.element(page.getByText(data[0].name)).toBeVisible();
      await expect.element(page.getByText(data[5].name)).toBeVisible();

      const moreActionsButton = page
        .getByRole("row")
        .nth(6)
        .getByRole("button", { name: "More actions" });
      await userEvent.click(moreActionsButton);

      const moreActionsMenuLocator = page.getByRole("menu");
      await userEvent.click(
        moreActionsMenuLocator.getByRole("menuitem", {
          name: "Bring to front",
        }),
      );

      // Confirm that the first two rows have swapped
      await expect
        .element(page.getByRole("row").nth(1))
        .toHaveTextContent(data[5].name);
      await expect
        .element(page.getByRole("row").nth(2))
        .toHaveTextContent(data[0].name);
    });

    test("can reorder to back", async () => {
      let updatedData = data.slice();

      const handleReorderRows = ({
        rowId,
        newRowIndex,
      }: DataOnReorderRowsType) => {
        updatedData = reorderData({ data: updatedData, rowId, newRowIndex });
      };

      await renderDataView(
        <DataView
          availableLayouts={["table"]}
          getData={() => updatedData}
          hasRowReordering
          onReorderRows={handleReorderRows}
          tableLayoutOptions={{
            columns,
          }}
          totalRows={updatedData.length}
        />,
      );

      await expect.element(page.getByText(data[0].name)).toBeVisible();
      await expect.element(page.getByText(data[5].name)).toBeVisible();

      const moreActionsButton = page
        .getByRole("row")
        .nth(1)
        .getByRole("button", { name: "More actions" });
      await userEvent.click(moreActionsButton);

      const moreActionsMenuLocator = page.getByRole("menu");
      await userEvent.click(
        moreActionsMenuLocator.getByRole("menuitem", { name: "Send to back" }),
      );

      await expect
        .element(page.getByRole("row").nth(6))
        .toHaveTextContent(data[0].name);
      await expect
        .element(page.getByRole("row").nth(5))
        .toHaveTextContent(data[5].name);
    });

    test("can expand table rows", async () => {
      const tableDetails: TableLayoutProps<Person>["renderDetailPanel"] = ({
        row,
      }) => {
        return <p>This is additional content for {row.original.name}</p>;
      };

      await renderDataView(
        <DataView
          availableLayouts={["table"]}
          getData={getData}
          tableLayoutOptions={{
            columns,
            renderDetailPanel: tableDetails,
          }}
        />,
      );

      await expect
        .element(
          page.getByText(`This is additional content for ${data[0].name}`),
        )
        .not.toBeInTheDocument();

      // nth(1) because row[0] is the th row
      const firstBodyRowExpandButton = page
        .getByRole("row")
        .nth(1)
        .getByRole("button", { name: "Expand" });
      await userEvent.click(firstBodyRowExpandButton);

      await expect
        .element(
          page.getByText(`This is additional content for ${data[0].name}`),
        )
        .toBeVisible();
    });
  });

  test("can expand card rows", async () => {
    const cardDetails = ({ row }: { row: DataTableRowData }) => {
      return <p>This is additional content for {row.name}</p>;
    };

    await renderDataView(
      <DataView
        availableLayouts={["grid"]}
        cardLayoutOptions={{
          itemProps: gridItemProps,
          renderDetailPanel: cardDetails,
        }}
        getData={getData}
      />,
    );

    await expect.element(page.getByText(data[0].name)).toBeVisible();
    await expect
      .element(page.getByText(`This is additional content for ${data[0].name}`))
      .not.toBeInTheDocument();

    const firstCardExpandButton = page
      .getByRole("listitem")
      .nth(0)
      .getByRole("button", { name: "Expand" });
    await userEvent.click(firstCardExpandButton);

    await expect
      .element(page.getByText(`This is additional content for ${data[0].name}`))
      .toBeVisible();
  });

  test("can display empty state", async () => {
    const emptyText = "This is the empty state text.";

    await renderDataView(
      <DataView
        availableLayouts={["table"]}
        emptyPlaceholder={
          <EmptyState description={emptyText} heading="Empty" />
        }
        getData={() => []}
        tableLayoutOptions={{
          columns,
        }}
      />,
    );

    await expect.element(page.getByText(emptyText)).toBeVisible();
  });

  test("can display no-results state", async () => {
    const noResultsText = "This is the no results state text.";

    await renderDataView(
      <DataView
        availableLayouts={["table"]}
        getData={() => []}
        noResultsPlaceholder={
          <EmptyState description={noResultsText} heading="No results" />
        }
        tableLayoutOptions={{
          columns,
        }}
      />,
    );

    await expect.element(page.getByText(noResultsText)).toBeVisible();
  });

  test("can sort rows", async () => {
    await renderDataView(
      <DataView
        availableLayouts={["table"]}
        getData={getData}
        tableLayoutOptions={{
          columns,
          hasSorting: true,
        }}
      />,
    );

    const initialRows = page.getByRole("row").elements();
    expect(initialRows[1].textContent).toContain(data[0].name);

    await userEvent.click(
      page.getByRole("button", { name: "Sort by ID descending" }),
    );

    await expect.element(page.getByText(data[0].name)).toBeVisible();

    await expect
      .element(page.getByRole("row").nth(6))
      .toHaveTextContent(data[0].name);
  });

  test("can change row density", async () => {
    await renderDataView(
      <DataView
        availableLayouts={["table"]}
        getData={getData}
        tableLayoutOptions={{
          columns,
          hasChangeableDensity: true,
        }}
      />,
    );

    // Since table density is a purely visible attribute, there's no ARIA
    // attribute to target here. We're forced to use the className directly.
    const tBody = page.getByRole("row").elements()[1].parentElement;
    expect(tBody?.className).not.toContain("MuiTableBody-compact");

    const densityButton = page.getByRole("button", { name: "Table density" });
    await userEvent.click(densityButton);

    const densityMenuLocator = page.getByRole("menu");
    await userEvent.click(
      densityMenuLocator.getByRole("menuitem", { name: "Compact" }),
    );

    expect(tBody?.className).toContain("MuiTableBody-compact");
  });

  describe("Column visibility", () => {
    test("can change column visibility", async () => {
      await renderDataView(
        <DataView
          availableLayouts={["table"]}
          getData={getData}
          tableLayoutOptions={{
            columns,
            hasColumnVisibility: true,
          }}
        />,
      );

      // Detect if the data has loaded in
      await expect.element(page.getByText(data[0].city)).toBeVisible();

      const visibilityButton = page.getByRole("button", {
        name: "Show/hide columns",
      });
      await userEvent.click(visibilityButton);

      const visibilityMenuLocator = page.getByRole("menu");
      await userEvent.click(visibilityMenuLocator.getByText("City"));

      await expect
        .element(page.getByText(data[0].city))
        .not.toBeInTheDocument();
    });

    test("initialColumnVisibility hides specified columns on mount", async () => {
      await renderDataView(
        <DataView
          availableLayouts={["table"]}
          getData={getData}
          tableLayoutOptions={{
            columns,
            hasColumnVisibility: true,
            initialColumnVisibility: { city: false },
          }}
        />,
      );

      await expect
        .element(page.getByText(data[0].city))
        .not.toBeInTheDocument();
    });

    test("onColumnVisibilityChange called when column is toggled", async () => {
      const mockOnColumnVisibilityChange = vi.fn();

      await renderDataView(
        <DataView
          availableLayouts={["table"]}
          getData={getData}
          onColumnVisibilityChange={mockOnColumnVisibilityChange}
          tableLayoutOptions={{
            columns,
            hasColumnVisibility: true,
          }}
        />,
      );

      await expect.element(page.getByText(data[0].city)).toBeVisible();

      const visibilityButton = page.getByRole("button", {
        name: "Show/hide columns",
      });
      await userEvent.click(visibilityButton);

      const visibilityMenuLocator = page.getByRole("menu");
      await userEvent.click(visibilityMenuLocator.getByText("City"));

      await expect
        .element(page.getByText(data[0].city, { exact: true }))
        .not.toBeInTheDocument();
      expect(mockOnColumnVisibilityChange).toHaveBeenCalledWith({
        city: false,
      });
    });
  });

  test("can resize columns", async () => {
    await renderDataView(
      <DataView
        availableLayouts={["table"]}
        getData={getData}
        tableLayoutOptions={{
          columns,
          hasColumnResizing: true,
        }}
      />,
    );

    const tHead = page.getByRole("row").elements()[0].parentElement;

    // Ensure that the resize handle is displayed when
    // hasColumnResizing is true
    const hrElement = tHead!.querySelector("hr");
    expect(tHead).toContainElement(hrElement);
  });

  describe("Pagination", () => {
    test("displays paged pagination", async () => {
      await renderDataView(
        <DataView
          availableLayouts={["table"]}
          getData={getData}
          hasPagination
          paginationType="paged"
          tableLayoutOptions={{
            columns,
          }}
        />,
      );

      await expect
        .element(
          page
            .getByRole("navigation", { name: "Pagination" })
            .getByRole("button", { name: "Next page" }),
        )
        .toBeVisible();
    });

    test("displays loadMore pagination", async () => {
      await renderDataView(
        <DataView
          availableLayouts={["table"]}
          enableVirtualization={false}
          getData={getData}
          hasPagination
          paginationType="loadMore"
          tableLayoutOptions={{
            columns,
          }}
        />,
      );

      await expect
        .element(page.getByRole("button", { name: "Show more" }))
        .toBeVisible();
    });

    test("can load more rows via loadMore pagination", async () => {
      await renderDataView(
        <DataView
          availableLayouts={["table"]}
          enableVirtualization={false}
          getData={getData}
          hasPagination
          paginationType="loadMore"
          resultsPerPage={3}
          tableLayoutOptions={{
            columns,
          }}
        />,
      );

      expect(page.getByRole("row").elements()).toHaveLength(4);

      await userEvent.click(page.getByRole("button", { name: "Show more" }));

      await expect.element(page.getByRole("row")).toHaveLength(7); // 6 data rows + header row
    });

    test("can go to the next page", async () => {
      await renderDataView(
        <DataView
          availableLayouts={["table"]}
          getData={getData}
          hasPagination
          paginationType="paged"
          resultsPerPage={2}
          tableLayoutOptions={{
            columns,
          }}
        />,
      );

      await expect.element(page.getByText(data[0].name)).toBeVisible();
      await expect
        .element(page.getByText(data[2].name))
        .not.toBeInTheDocument();

      await userEvent.click(page.getByRole("button", { name: "Next page" }));

      await expect.element(page.getByText(data[2].name)).toBeVisible();
      await expect
        .element(page.getByText(data[0].name))
        .not.toBeInTheDocument();
    });

    test("can go to the previous page", async () => {
      await renderDataView(
        <DataView
          availableLayouts={["table"]}
          getData={getData}
          hasPagination
          paginationType="paged"
          resultsPerPage={2}
          tableLayoutOptions={{
            columns,
          }}
        />,
      );

      await expect.element(page.getByText(data[0].name)).toBeVisible();
      await expect
        .element(page.getByText(data[2].name))
        .not.toBeInTheDocument();

      await userEvent.click(page.getByRole("button", { name: "Next page" }));

      await expect.element(page.getByText(data[2].name)).toBeVisible();
      await expect
        .element(page.getByText(data[0].name))
        .not.toBeInTheDocument();

      await userEvent.click(
        page.getByRole("button", { name: "Previous page" }),
      );

      await expect.element(page.getByText(data[0].name)).toBeVisible();
      await expect
        .element(page.getByText(data[2].name))
        .not.toBeInTheDocument();
    });

    test("can disable the next page button based on max rows", async () => {
      await renderDataView(
        <DataView
          availableLayouts={["table"]}
          getData={getData}
          hasPagination
          paginationType="paged"
          resultsPerPage={data.length - 1}
          tableLayoutOptions={{
            columns,
          }}
          totalRows={data.length}
        />,
      );

      const nextPageButton = page.getByRole("button", { name: "Next page" });
      const prevPageButton = page.getByRole("button", {
        name: "Previous page",
      });

      await expect.element(prevPageButton).toBeDisabled();
      await expect.element(nextPageButton).not.toBeDisabled();

      await userEvent.click(nextPageButton);

      await expect.element(prevPageButton).not.toBeDisabled();
      await expect.element(nextPageButton).toBeDisabled();
    });
  });

  describe("Controlled state props", () => {
    test("isEmpty={false} suppresses empty placeholder after async fetch resolves with no rows", async () => {
      const emptyText = "Custom empty placeholder";

      await renderDataView(
        <DataView
          availableLayouts={["table"]}
          emptyPlaceholder={
            <EmptyState description={emptyText} heading="Empty" />
          }
          getData={() => []}
          isEmpty={false}
          tableLayoutOptions={{
            columns,
          }}
        />,
      );

      // Wait for loading to finish (progressbar disappears when isLoading becomes false)
      await expect
        .element(page.getByRole("progressbar"))
        .not.toBeInTheDocument();

      // Since isEmpty={false}, we will see the no results placeholder, rather than isEmpty placeholder
      await expect
        .element(page.getByText("There are no results."))
        .toBeVisible();
      await expect.element(page.getByText(emptyText)).not.toBeInTheDocument();
    });

    test("isNoResults={false} suppresses no-results placeholder when getData returns no rows", async () => {
      const noResultsText = "Custom no results placeholder";

      await renderDataView(
        <DataView
          availableLayouts={["table"]}
          getData={() => []}
          isEmpty={false}
          isNoResults={false}
          noResultsPlaceholder={
            <EmptyState description={noResultsText} heading="No results" />
          }
          tableLayoutOptions={{ columns }}
        />,
      );

      // Wait for loading to finish
      await expect
        .element(page.getByRole("progressbar"))
        .not.toBeInTheDocument();

      await expect
        .element(page.getByText(noResultsText))
        .not.toBeInTheDocument();
    });

    test("isLoading={false} keeps rows visible when dataQueryParams change triggers a refetch", async () => {
      const asyncGetData = ({ ...props }) =>
        new Promise<Person[]>((resolve) =>
          setTimeout(() => resolve(filterData({ data, ...props })), 50),
        );

      await renderDataView(
        <DataView
          availableLayouts={["table"]}
          getData={asyncGetData}
          hasPagination
          isLoading={false}
          paginationType="paged"
          resultsPerPage={2}
          tableLayoutOptions={{ columns }}
        />,
      );

      await expect.element(page.getByText(data[0].name)).toBeVisible();
      await expect
        .element(page.getByText(data[2].name))
        .not.toBeInTheDocument();

      await userEvent.click(page.getByRole("button", { name: "Next page" }));

      // The async fetch for page 2 has started but not resolved yet (50 ms delay).
      // With the bug, fetchData calls setIsLoading(true) which causes MRT to replace
      // the actual rows with skeleton placeholders, making data[0].name disappear.
      // With the fix, setIsLoading is not passed to fetchData when isLoading is controlled,
      // so the previous page rows remain visible throughout.
      await expect.element(page.getByText(data[0].name)).toBeVisible();

      await expect.element(page.getByText(data[2].name)).toBeVisible();
      await expect
        .element(page.getByText(data[0].name))
        .not.toBeInTheDocument();
    });

    test("rowSelection prop is the source of truth and is not self-updated", async () => {
      const mockOnRowSelectionChange = vi.fn();

      await renderDataView(
        <DataView
          availableLayouts={["table"]}
          getData={getData}
          hasRowSelection
          onRowSelectionChange={mockOnRowSelectionChange}
          rowSelection={{}}
          tableLayoutOptions={{ columns }}
        />,
      );

      await userEvent.click(page.getByRole("checkbox").nth(1));

      // The parent never fed the change back into the prop, so the controlled
      // value stays empty: the row is unchecked and no bulk-actions bar appears.
      await expect.element(page.getByRole("checkbox").nth(1)).not.toBeChecked();
      await expect
        .element(page.getByRole("button", { name: "More actions" }))
        .not.toBeInTheDocument();

      expect(mockOnRowSelectionChange).toHaveBeenLastCalledWith({
        [data[0].id]: true,
      });
    });

    test("controlled rowSelection round-trips through onRowSelectionChange", async () => {
      function ControlledDataViewHarness() {
        const [selectedRows, setSelectedRows] = useState<MRT_RowSelectionState>(
          { [data[0].id]: true },
        );

        return (
          <DataView
            availableLayouts={["table"]}
            getData={getData}
            hasRowSelection
            onRowSelectionChange={setSelectedRows}
            rowSelection={selectedRows}
            tableLayoutOptions={{ columns }}
          />
        );
      }

      const { container } = await renderDataView(<ControlledDataViewHarness />);

      // Controlled initial value is reflected on mount.
      await expect.element(page.getByRole("checkbox").nth(1)).toBeChecked();
      await expect
        .element(page.getByRole("button", { name: "More actions" }))
        .toHaveTextContent("1 selected");

      await expect(container).toBeAccessible();

      // Parent state drives updates back into the prop.
      await userEvent.click(page.getByRole("checkbox").nth(2));
      await expect
        .element(page.getByRole("button", { name: "More actions" }))
        .toHaveTextContent("2 selected");

      await userEvent.click(page.getByRole("checkbox").nth(1));
      await expect
        .element(page.getByRole("button", { name: "More actions" }))
        .toHaveTextContent("1 selected");
    });
  });
});
