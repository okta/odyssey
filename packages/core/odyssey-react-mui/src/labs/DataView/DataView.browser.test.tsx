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

import { renderWithOdysseyProvider } from "@okta/odyssey-test-tooling/browser";
import { MRT_RowSelectionState } from "material-react-table";
import { type ReactElement, useCallback, useState } from "react";
import { page, userEvent } from "vitest/browser";

import { Button } from "../../Buttons/Button.js";
import { MenuItem } from "../../Buttons/MenuItem.js";
import { EmptyState } from "../../EmptyState.js";
import { TranslationProvider } from "../../i18n.generated/i18n.js";
import { DataTableRowData } from "../../index.js";
import {
  type CardLayoutProps,
  type DataLayout,
  type TableLayoutProps,
} from "./componentTypes.js";
import { DataTable } from "./DataTable.js";
import {
  type DataGetDataType,
  type DataOnReorderRowsType,
  type DataTableColumn,
} from "./dataTypes.js";
import { DataView } from "./DataView.js";
import {
  columns,
  data,
  filterData,
  Person,
  reorderData,
} from "./testSupportData.js";

const PING_PONG_LAYOUTS: DataLayout[] = ["table"];

const PING_PONG_TABLE_OPTIONS = { columns };

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

// Marker strings no English default contains, so an English label means the component skipped the translation provider. Each test turns off the provider's own `TranslationProvider`, because its effect runs after this one and resets the language to the browser default.
const translationOverrides = {
  ar: {
    "table.mrt.toggleselectall": "ar select all",
    "table.mrt.toggleselectrow": "ar select row",
  },
};

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

    test("provides the submitted search query to table cell renderers", async () => {
      const columnsWithSearchAwareCell = columns.map<DataTableColumn<Person>>(
        (column) =>
          column.accessorKey === "name"
            ? {
                ...column,
                Cell: ({ table }) => `Query: ${table.getState().globalFilter}`,
              }
            : column,
      );

      await renderDataView(
        <DataView
          availableLayouts={["table"]}
          getData={getData}
          hasSearch
          hasSearchSubmitButton
          tableLayoutOptions={{
            columns: columnsWithSearchAwareCell,
          }}
        />,
      );

      await expect(document.body).toBeAccessible();

      const searchInput = page.getByPlaceholder(/Search/i);
      const submitButton = page.getByRole("button", { name: "Search" });
      await userEvent.fill(searchInput, data[1].name);
      await userEvent.click(submitButton);

      await expect
        .element(page.getByRole("table").getByText(`Query: ${data[1].name}`))
        .toBeVisible();

      await expect(document.body).toBeAccessible();
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
    test("disabled row renders a non-interactive selection checkbox", async () => {
      await renderDataView(
        <DataView
          availableLayouts={["table"]}
          getData={getData}
          hasRowSelection
          isRowSelectionDisabled={(row) => row.id === data[0].id}
          tableLayoutOptions={{
            columns,
          }}
        />,
      );

      // nth(0) is the header "select all" checkbox; nth(1) is the first data row.
      await expect.element(page.getByRole("checkbox").nth(1)).toBeDisabled();
    });

    test("a selectable row is unaffected when another row is disabled", async () => {
      await renderDataView(
        <DataView
          availableLayouts={["table"]}
          getData={getData}
          hasRowSelection
          isRowSelectionDisabled={(row) => row.id === data[0].id}
          tableLayoutOptions={{
            columns,
          }}
        />,
      );

      await userEvent.click(page.getByRole("checkbox").nth(2));

      await expect
        .element(page.getByRole("button", { name: "More actions" }))
        .toHaveTextContent("1 selected");
    });

    test("Select all skips disabled rows", async () => {
      await renderDataView(
        <DataView
          availableLayouts={["table"]}
          getData={getData}
          hasRowSelection
          isRowSelectionDisabled={(row) => row.id === data[0].id}
          tableLayoutOptions={{
            columns,
          }}
        />,
      );

      await userEvent.click(page.getByRole("button", { name: "Select all" }));

      await expect
        .element(page.getByRole("button", { name: "More actions" }))
        .toHaveTextContent(`${data.length - 1} selected`);
    });

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

    test("disabled row's card checkbox is non-interactive", async () => {
      await renderDataView(
        <DataView
          availableLayouts={["grid"]}
          cardLayoutOptions={{
            itemProps: gridItemProps,
          }}
          getData={getData}
          hasRowSelection
          isRowSelectionDisabled={(row) => row.id === data[0].id}
        />,
      );

      // Card layouts have no header select-all checkbox; nth(0) is the first card.
      await expect.element(page.getByRole("checkbox").nth(0)).toBeDisabled();
      await expect.element(page.getByRole("checkbox").nth(1)).toBeEnabled();
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

    describe("cards with a custom getRowId", () => {
      // A prefix makes every key differ from row.id, so a card that reads or writes row.id finds no match.
      const getPrefixedRowId = (row: Person) => `person-${row.id}`;

      test("Select all clicked", async () => {
        const { container } = await renderDataView(
          <DataView
            availableLayouts={["grid"]}
            cardLayoutOptions={{
              itemProps: gridItemProps,
            }}
            getData={getData}
            getRowId={getPrefixedRowId}
            hasRowSelection
          />,
        );

        await userEvent.click(page.getByRole("button", { name: "Select all" }));

        await expect
          .element(page.getByRole("button", { name: "More actions" }).first())
          .toHaveTextContent(`${data.length} selected`);
        await expect
          .poll(() =>
            page
              .getByRole("checkbox")
              .elements()
              .map((checkbox) => (checkbox as HTMLInputElement).checked),
          )
          .toStrictEqual(data.map(() => true));

        await expect(container).toBeAccessible();
      });

      test("Select all clicked, then one card unchecked", async () => {
        const onRowSelectionChange = vi.fn();

        const { container } = await renderDataView(
          <DataView
            availableLayouts={["grid"]}
            cardLayoutOptions={{
              itemProps: gridItemProps,
            }}
            getData={getData}
            getRowId={getPrefixedRowId}
            hasRowSelection
            onRowSelectionChange={onRowSelectionChange}
          />,
        );

        await userEvent.click(page.getByRole("button", { name: "Select all" }));
        await userEvent.click(page.getByRole("checkbox").nth(0));

        await expect
          .element(page.getByRole("button", { name: "More actions" }).first())
          .toHaveTextContent(`${data.length - 1} selected`);
        await expect
          .element(page.getByRole("checkbox").nth(0))
          .not.toBeChecked();
        expect(onRowSelectionChange).toHaveBeenLastCalledWith(
          Object.fromEntries(
            data.slice(1).map((person) => [getPrefixedRowId(person), true]),
          ),
        );

        await expect(container).toBeAccessible();
      });

      test("a card checked, then the layout switched to table", async () => {
        const { container } = await renderDataView(
          <DataView
            availableLayouts={["grid", "table"]}
            cardLayoutOptions={{
              itemProps: gridItemProps,
            }}
            getData={getData}
            getRowId={getPrefixedRowId}
            hasRowSelection
            tableLayoutOptions={{
              columns,
            }}
          />,
        );

        await userEvent.click(page.getByRole("checkbox").nth(0));
        await userEvent.click(page.getByRole("button", { name: "Layout" }));
        await userEvent.click(page.getByRole("menuitem", { name: "Table" }));
        // The layout menu stays open after a choice, and an open menu hides the rest of the page from role queries.
        await userEvent.keyboard("{Escape}");
        await expect.element(page.getByRole("menu")).not.toBeInTheDocument();

        // nth(0) is the table's header select-all checkbox; nth(1) is the first data row.
        await expect.element(page.getByRole("checkbox").nth(1)).toBeChecked();
        await expect
          .element(page.getByRole("button", { name: "More actions" }).first())
          .toHaveTextContent("1 selected");

        await expect(container).toBeAccessible();
      });
    });

    test("a card with a numeric id checked, then unchecked", async () => {
      // DataView's default getRowId returns a numeric id unconverted, while the keys of the selection object are always strings.
      const numericIdData = data.map((person, index) => ({
        ...person,
        id: index + 1,
      }));

      await renderDataView(
        <DataView
          availableLayouts={["grid"]}
          cardLayoutOptions={{
            itemProps: (row: (typeof numericIdData)[number]) => ({
              title: row.name,
            }),
          }}
          getData={() => numericIdData}
          hasRowSelection
        />,
      );

      await userEvent.click(page.getByRole("checkbox").nth(0));
      await expect
        .element(page.getByRole("button", { name: "More actions" }).first())
        .toHaveTextContent("1 selected");

      await userEvent.click(page.getByRole("checkbox").nth(0));

      await expect.element(page.getByRole("checkbox").nth(0)).not.toBeChecked();
      await expect
        .element(page.getByRole("button", { name: "Select none" }))
        .toHaveAttribute("aria-disabled", "true");
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

    test("Select all on one page after selecting a row on another page", async () => {
      const { container } = await renderDataView(
        <DataView
          availableLayouts={["table"]}
          getData={getData}
          hasPagination
          hasRowSelection
          paginationType="paged"
          resultsPerPage={5}
          tableLayoutOptions={{
            columns,
          }}
          totalRows={data.length}
        />,
      );
      await expect(container).toBeAccessible();

      await userEvent.click(page.getByRole("button", { name: "Next page" }));
      await expect.element(page.getByText(data[5].name)).toBeVisible();

      // Page 2 holds only the sixth row, so nth(1) is that row's checkbox.
      await userEvent.click(page.getByRole("checkbox").nth(1));

      const selectionButton = page.getByRole("button", {
        name: "More actions",
      });
      await expect.element(selectionButton).toHaveTextContent("1 selected");

      await userEvent.click(
        page.getByRole("button", { name: "Previous page" }),
      );
      await expect.element(page.getByText(data[0].name)).toBeVisible();

      await userEvent.click(page.getByRole("button", { name: "Select all" }));

      await expect
        .element(selectionButton)
        .toHaveTextContent(`${data.length} selected`);
      await expect(container).toBeAccessible();

      await userEvent.click(page.getByRole("button", { name: "Next page" }));
      await expect.element(page.getByText(data[5].name)).toBeVisible();

      await expect.element(page.getByRole("checkbox").nth(1)).toBeChecked();
      await expect(container).toBeAccessible();
    });

    test("Select all with a controlled rowSelection holding an off-page row", async () => {
      const mockOnRowSelectionChange = vi.fn();

      const { container } = await renderDataView(
        <DataView
          availableLayouts={["table"]}
          getData={getData}
          hasPagination
          hasRowSelection
          onRowSelectionChange={mockOnRowSelectionChange}
          paginationType="paged"
          resultsPerPage={5}
          rowSelection={{
            [data[1].id]: false,
            [data[5].id]: true,
            "no-longer-listed": false,
          }}
          tableLayoutOptions={{
            columns,
          }}
          totalRows={data.length}
        />,
      );
      await expect(container).toBeAccessible();

      await userEvent.click(page.getByRole("button", { name: "Select all" }));

      expect(mockOnRowSelectionChange).toHaveBeenLastCalledWith({
        [data[0].id]: true,
        [data[1].id]: true,
        [data[2].id]: true,
        [data[3].id]: true,
        [data[4].id]: true,
        [data[5].id]: true,
        "no-longer-listed": false,
      });
      await expect(container).toBeAccessible();
    });

    test("Select all with a disabled row on the page and an off-page row selected", async () => {
      const mockOnRowSelectionChange = vi.fn();

      const { container } = await renderDataView(
        <DataView
          availableLayouts={["table"]}
          getData={getData}
          hasPagination
          hasRowSelection
          initialRowSelection={{ [data[5].id]: true }}
          isRowSelectionDisabled={(row) => row.id === data[0].id}
          onRowSelectionChange={mockOnRowSelectionChange}
          paginationType="paged"
          resultsPerPage={5}
          tableLayoutOptions={{
            columns,
          }}
          totalRows={data.length}
        />,
      );
      await expect(container).toBeAccessible();

      await userEvent.click(page.getByRole("button", { name: "Select all" }));

      await expect
        .element(page.getByRole("button", { name: "More actions" }))
        .toHaveTextContent(`${data.length - 1} selected`);
      expect(mockOnRowSelectionChange).toHaveBeenLastCalledWith({
        [data[1].id]: true,
        [data[2].id]: true,
        [data[3].id]: true,
        [data[4].id]: true,
        [data[5].id]: true,
      });
      await expect(container).toBeAccessible();
    });

    test("Select all on each page in turn", async () => {
      const { container } = await renderDataView(
        <DataView
          availableLayouts={["table"]}
          getData={getData}
          hasPagination
          hasRowSelection
          paginationType="paged"
          resultsPerPage={5}
          tableLayoutOptions={{
            columns,
          }}
          totalRows={data.length}
        />,
      );
      await expect(container).toBeAccessible();

      await userEvent.click(page.getByRole("button", { name: "Select all" }));

      const selectionButton = page.getByRole("button", {
        name: "More actions",
      });
      await expect.element(selectionButton).toHaveTextContent("5 selected");

      await userEvent.click(page.getByRole("button", { name: "Next page" }));
      await expect.element(page.getByText(data[5].name)).toBeVisible();

      await userEvent.click(page.getByRole("button", { name: "Select all" }));

      await expect
        .element(selectionButton)
        .toHaveTextContent(`${data.length} selected`);
      await expect
        .element(page.getByRole("button", { name: "Select all" }))
        .toHaveAttribute("aria-disabled", "true");
      await expect(container).toBeAccessible();
    });

    test("Select all on a partly selected page after the header checkbox and a row on another page", async () => {
      const { container } = await renderDataView(
        <DataView
          availableLayouts={["table"]}
          getData={getData}
          hasPagination
          hasRowSelection
          paginationType="paged"
          resultsPerPage={5}
          tableLayoutOptions={{
            columns,
          }}
          totalRows={data.length}
        />,
      );
      await expect(container).toBeAccessible();

      // nth(0) is the header "select all" checkbox.
      await userEvent.click(page.getByRole("checkbox").nth(0));

      const selectionButton = page.getByRole("button", {
        name: "More actions",
      });
      await expect.element(selectionButton).toHaveTextContent("5 selected");

      await userEvent.click(page.getByRole("button", { name: "Next page" }));
      await expect.element(page.getByText(data[5].name)).toBeVisible();

      // Page 2 holds only the sixth row, so nth(1) is that row's checkbox.
      await userEvent.click(page.getByRole("checkbox").nth(1));
      await expect
        .element(selectionButton)
        .toHaveTextContent(`${data.length} selected`);

      await userEvent.click(
        page.getByRole("button", { name: "Previous page" }),
      );
      await expect.element(page.getByText(data[0].name)).toBeVisible();

      await userEvent.click(page.getByRole("checkbox").nth(1));
      await expect
        .element(selectionButton)
        .toHaveTextContent(`${data.length - 1} selected`);
      // The selection holds as many keys as page 1 has rows, so only an on-screen check shows the header as partial here.
      await expect
        .element(page.getByRole("checkbox").nth(0))
        .toHaveAttribute("data-indeterminate", "true");
      await expect(container).toBeAccessible();

      await userEvent.click(page.getByRole("button", { name: "Select all" }));

      await expect
        .element(selectionButton)
        .toHaveTextContent(`${data.length} selected`);
      await expect(container).toBeAccessible();

      await userEvent.click(page.getByRole("button", { name: "Next page" }));
      await expect.element(page.getByText(data[5].name)).toBeVisible();

      await expect.element(page.getByRole("checkbox").nth(1)).toBeChecked();
      await expect(container).toBeAccessible();
    });

    test("Select all on a page with fewer selectable rows than another page", async () => {
      const { container } = await renderDataView(
        <DataView
          availableLayouts={["table"]}
          getData={getData}
          hasPagination
          hasRowSelection
          isRowSelectionDisabled={(row) => row.id === data[5].id}
          paginationType="paged"
          resultsPerPage={3}
          tableLayoutOptions={{
            columns,
          }}
          totalRows={data.length}
        />,
      );
      await expect(container).toBeAccessible();

      await userEvent.click(page.getByRole("checkbox").nth(1));

      await userEvent.click(page.getByRole("button", { name: "Next page" }));
      await expect.element(page.getByText(data[3].name)).toBeVisible();
      await userEvent.click(page.getByRole("button", { name: "Select all" }));

      await userEvent.click(
        page.getByRole("button", { name: "Previous page" }),
      );
      await expect.element(page.getByText(data[0].name)).toBeVisible();

      // Page 1 has three selectable rows and the selection now holds three, but two of page 1's rows are still unchecked.
      await expect
        .element(page.getByRole("button", { name: "Select all" }))
        .toHaveAttribute("aria-disabled", "false");
      await expect
        .element(page.getByRole("button", { name: "More actions" }))
        .toHaveTextContent("3 selected");
      await expect(container).toBeAccessible();
    });

    test("Select all with a disabled row that is already selected", async () => {
      const mockOnRowSelectionChange = vi.fn();

      const { container } = await renderDataView(
        <DataView
          availableLayouts={["table"]}
          getData={getData}
          hasRowSelection
          initialRowSelection={{ [data[0].id]: true }}
          isRowSelectionDisabled={(row) => row.id === data[0].id}
          onRowSelectionChange={mockOnRowSelectionChange}
          tableLayoutOptions={{
            columns,
          }}
        />,
      );
      await expect(container).toBeAccessible();

      await userEvent.click(page.getByRole("button", { name: "Select all" }));

      await expect
        .element(page.getByRole("button", { name: "More actions" }))
        .toHaveTextContent(`${data.length} selected`);
      expect(mockOnRowSelectionChange).toHaveBeenLastCalledWith(
        Object.fromEntries(data.map((row) => [row.id, true])),
      );
      await expect.element(page.getByRole("checkbox").nth(1)).toBeChecked();
      await expect(container).toBeAccessible();
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

    describe("selection that includes rows that are not selectable on screen", () => {
      // Five rows per page leaves the last row of the six-row fixture on page 2, so a selection can hold a row that is not on screen.
      const resultsPerPage = 5;
      const offPageRow = data[resultsPerPage];

      test("some rows on the page selected, with the same total as the page size", async () => {
        const { container } = await renderDataView(
          <DataView
            availableLayouts={["table"]}
            getData={getData}
            hasPagination
            hasRowSelection
            resultsPerPage={resultsPerPage}
            rowSelection={Object.fromEntries(
              data.slice(1).map((person) => [person.id, true]),
            )}
            tableLayoutOptions={{
              columns,
            }}
            totalRows={data.length}
          />,
        );

        // nth(0) is the header "select all" checkbox. MUI exposes the partial state only through this attribute, not the native `indeterminate` property.
        await expect
          .element(page.getByRole("checkbox").nth(0))
          .toHaveAttribute("data-indeterminate", "true");
        await expect
          .element(page.getByRole("checkbox").nth(0))
          .not.toBeChecked();
        await expect
          .element(page.getByRole("button", { name: "Select all" }))
          .toHaveAttribute("aria-disabled", "false");

        await expect(container).toBeAccessible();
      });

      test("only a row on another page selected", async () => {
        const { container } = await renderDataView(
          <DataView
            availableLayouts={["table"]}
            getData={getData}
            hasPagination
            hasRowSelection
            resultsPerPage={resultsPerPage}
            rowSelection={{ [offPageRow.id]: true }}
            tableLayoutOptions={{
              columns,
            }}
            totalRows={data.length}
          />,
        );

        await expect
          .element(page.getByRole("checkbox").nth(0))
          .toHaveAttribute("data-indeterminate", "false");
        await expect
          .element(page.getByRole("checkbox").nth(0))
          .not.toBeChecked();
        await expect
          .element(page.getByRole("button", { name: "Select all" }))
          .toHaveAttribute("aria-disabled", "false");

        await expect(container).toBeAccessible();
      });

      test("every row on the page selected, plus a row on another page", async () => {
        const { container } = await renderDataView(
          <DataView
            availableLayouts={["table"]}
            getData={getData}
            hasPagination
            hasRowSelection
            resultsPerPage={resultsPerPage}
            rowSelection={Object.fromEntries(
              data.map((person) => [person.id, true]),
            )}
            tableLayoutOptions={{
              columns,
            }}
            totalRows={data.length}
          />,
        );

        await expect
          .element(page.getByRole("checkbox").nth(0))
          .toHaveAttribute("data-indeterminate", "false");
        await expect.element(page.getByRole("checkbox").nth(0)).toBeChecked();
        await expect
          .element(page.getByRole("button", { name: "Select all" }))
          .toHaveAttribute("aria-disabled", "true");

        await expect(container).toBeAccessible();
      });

      test("every selectable row on the page selected, with a disabled row and a row on another page", async () => {
        const { container } = await renderDataView(
          <DataView
            availableLayouts={["table"]}
            getData={getData}
            hasPagination
            hasRowSelection
            isRowSelectionDisabled={(row) => row.id === data[0].id}
            resultsPerPage={resultsPerPage}
            rowSelection={Object.fromEntries(
              data.slice(1).map((person) => [person.id, true]),
            )}
            tableLayoutOptions={{
              columns,
            }}
            totalRows={data.length}
          />,
        );

        await expect
          .element(page.getByRole("checkbox").nth(0))
          .toHaveAttribute("data-indeterminate", "false");
        await expect.element(page.getByRole("checkbox").nth(0)).toBeChecked();
        await expect
          .element(page.getByRole("button", { name: "Select all" }))
          .toHaveAttribute("aria-disabled", "true");

        await expect(container).toBeAccessible();
      });

      test("only a disabled row selected", async () => {
        const { container } = await renderDataView(
          <DataView
            availableLayouts={["table"]}
            getData={getData}
            hasPagination
            hasRowSelection
            isRowSelectionDisabled={(row) => row.id === data[0].id}
            resultsPerPage={resultsPerPage}
            rowSelection={{ [data[0].id]: true }}
            tableLayoutOptions={{
              columns,
            }}
            totalRows={data.length}
          />,
        );

        await expect
          .element(page.getByRole("checkbox").nth(0))
          .toHaveAttribute("data-indeterminate", "false");
        await expect
          .element(page.getByRole("checkbox").nth(0))
          .not.toBeChecked();
        await expect
          .element(page.getByRole("button", { name: "Select all" }))
          .toHaveAttribute("aria-disabled", "false");

        await expect(container).toBeAccessible();
      });

      test("a row selected on the first page, then the second page opened, with DataView owning the selection", async () => {
        const { container } = await renderDataView(
          <DataView
            availableLayouts={["table"]}
            getData={getData}
            hasPagination
            hasRowSelection
            resultsPerPage={resultsPerPage}
            tableLayoutOptions={{
              columns,
            }}
            totalRows={data.length}
          />,
        );

        await userEvent.click(page.getByRole("checkbox").nth(1));
        await userEvent.click(page.getByRole("button", { name: "Next page" }));

        await expect.element(page.getByText(offPageRow.name)).toBeVisible();
        await expect
          .element(page.getByRole("button", { name: "More actions" }).first())
          .toHaveTextContent("1 selected");
        await expect
          .element(page.getByRole("checkbox").nth(0))
          .toHaveAttribute("data-indeterminate", "false");
        await expect
          .element(page.getByRole("checkbox").nth(0))
          .not.toBeChecked();
        await expect
          .element(page.getByRole("button", { name: "Select all" }))
          .toHaveAttribute("aria-disabled", "false");

        await expect(container).toBeAccessible();
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
        .element(
          page
            .getByRole("row")
            .nth(1)
            .getByRole("cell", { name: data[1].name, exact: true }),
        )
        .toBeVisible();
      await expect
        .element(
          page
            .getByRole("row")
            .nth(2)
            .getByRole("cell", { name: data[0].name, exact: true }),
        )
        .toBeVisible();
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
        .element(
          page
            .getByRole("row")
            .nth(1)
            .getByRole("cell", { name: data[5].name, exact: true }),
        )
        .toBeVisible();
      await expect
        .element(
          page
            .getByRole("row")
            .nth(2)
            .getByRole("cell", { name: data[0].name, exact: true }),
        )
        .toBeVisible();
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
        .element(
          page
            .getByRole("row")
            .nth(6)
            .getByRole("cell", { name: data[0].name, exact: true }),
        )
        .toBeVisible();
      await expect
        .element(
          page
            .getByRole("row")
            .nth(5)
            .getByRole("cell", { name: data[5].name, exact: true }),
        )
        .toBeVisible();
    });

    describe("with a custom getRowId", () => {
      // A prefix makes every id differ from row.id, so a path that sends or matches row.id finds no row.
      const getPrefixedRowId = (row: Person) => `person-${row.id}`;

      // The drag handle's accessible name goes on with keyboard instructions after "Drag row", so only its start is matched.
      const DRAG_HANDLE_NAME = /^Drag row/;

      const rowNames = data.map((row) => row.name);

      const getRowNames = () =>
        page
          .getByRole("rowgroup")
          .nth(1)
          .getByRole("cell")
          .elements()
          .map((cell) => cell.textContent)
          .filter((text) => rowNames.includes(text));

      const renderReorderableTable = async ({
        onReorderRows,
      }: {
        onReorderRows: (args: DataOnReorderRowsType) => void;
      }) =>
        renderDataView(
          <DataView
            availableLayouts={["table"]}
            getData={getData}
            getRowId={getPrefixedRowId}
            hasRowReordering
            onReorderRows={onReorderRows}
            tableLayoutOptions={{
              columns,
            }}
            totalRows={data.length}
          />,
        );

      test("drag handle moved with the keyboard", async () => {
        const onReorderRows = vi.fn();

        const { container } = await renderReorderableTable({ onReorderRows });

        page
          .getByRole("button", { name: DRAG_HANDLE_NAME })
          .first()
          .element()
          .focus();
        await userEvent.keyboard(" ");
        await userEvent.keyboard("{ArrowDown}");
        await userEvent.keyboard(" ");

        await vi.waitFor(() => {
          expect(onReorderRows).toHaveBeenLastCalledWith({
            rowId: "person-1",
            newRowIndex: 1,
          });
        });
        expect(onReorderRows).toHaveBeenCalledTimes(1);
        await expect
          .poll(getRowNames)
          .toStrictEqual([
            data[1].name,
            data[0].name,
            data[2].name,
            data[3].name,
            data[4].name,
            data[5].name,
          ]);
        await expect(container).toBeAccessible();
      });

      test("drag handle dragged with the mouse", async () => {
        const onReorderRows = vi.fn();

        const { container } = await renderReorderableTable({ onReorderRows });

        await userEvent.dragAndDrop(
          page.getByRole("button", { name: DRAG_HANDLE_NAME }).first(),
          page.getByRole("row").nth(3),
        );

        await vi.waitFor(() => {
          expect(onReorderRows).toHaveBeenLastCalledWith({
            rowId: "person-1",
            newRowIndex: 2,
          });
        });
        await expect
          .poll(getRowNames)
          .toStrictEqual([
            data[1].name,
            data[2].name,
            data[0].name,
            data[3].name,
            data[4].name,
            data[5].name,
          ]);
        await expect(container).toBeAccessible();
      });

      test("table row menu Send to back", async () => {
        const onReorderRows = vi.fn();

        const { container } = await renderReorderableTable({ onReorderRows });

        await userEvent.click(
          page.getByRole("button", { name: "More actions" }).first(),
        );
        await userEvent.click(
          page.getByRole("menuitem", { name: "Send to back" }),
        );

        expect(onReorderRows).toHaveBeenLastCalledWith({
          rowId: "person-1",
          newRowIndex: data.length - 1,
        });
        await expect
          .poll(getRowNames)
          .toStrictEqual([
            data[1].name,
            data[2].name,
            data[3].name,
            data[4].name,
            data[5].name,
            data[0].name,
          ]);
        await expect(container).toBeAccessible();
      });

      test("grid card menu Bring forward", async () => {
        const onReorderRows = vi.fn();

        const { container } = await renderDataView(
          <DataView
            availableLayouts={["grid"]}
            cardLayoutOptions={{
              itemProps: gridItemProps,
            }}
            getData={getData}
            getRowId={getPrefixedRowId}
            hasRowReordering
            onReorderRows={onReorderRows}
            totalRows={data.length}
          />,
        );

        await userEvent.click(
          page.getByRole("button", { name: "More actions" }).nth(1),
        );
        await userEvent.click(
          page.getByRole("menuitem", { name: "Bring forward" }),
        );

        expect(onReorderRows).toHaveBeenLastCalledWith({
          rowId: "person-2",
          newRowIndex: 0,
        });
        await expect
          .poll(() =>
            page
              .getByRole("listitem")
              .elements()
              .map((card) => card.textContent),
          )
          .toStrictEqual(
            [data[1], data[0], data[2], data[3], data[4], data[5]].map(
              (row) => `Grid card${row.name}`,
            ),
          );
        await expect(container).toBeAccessible();
      });
    });

    test("numeric ids with the default getRowId, moved with the keyboard", async () => {
      type NumericIdPerson = Omit<Person, "id"> & { id: number };

      const numericIdData: NumericIdPerson[] = data.map((row) => ({
        ...row,
        id: Number(row.id),
      }));
      const numericIdColumns: DataTableColumn<NumericIdPerson>[] = [
        { accessorKey: "name", header: "Name" },
      ];
      const onReorderRows = vi.fn();

      await renderDataView(
        <DataView
          availableLayouts={["table"]}
          getData={() => numericIdData}
          hasRowReordering
          onReorderRows={onReorderRows}
          tableLayoutOptions={{
            columns: numericIdColumns,
          }}
          totalRows={numericIdData.length}
        />,
      );

      page
        .getByRole("button", { name: /^Drag row/ })
        .first()
        .element()
        .focus();
      await userEvent.keyboard(" ");
      await userEvent.keyboard("{ArrowDown}");
      await userEvent.keyboard(" ");

      // DataView's default getRowId passes a numeric id through unconverted, so onReorderRows receives a number.
      await vi.waitFor(() => {
        expect(onReorderRows).toHaveBeenLastCalledWith({
          rowId: 1,
          newRowIndex: 1,
        });
      });
      await expect
        .element(page.getByRole("row").nth(1))
        .toHaveTextContent(data[1].name);
      await expect
        .element(page.getByRole("row").nth(2))
        .toHaveTextContent(data[0].name);
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
      .element(
        page
          .getByRole("row")
          .nth(6)
          .getByRole("cell", { name: data[0].name, exact: true }),
      )
      .toBeVisible();
  });

  test("initialSorting seeds column sort on first render", async () => {
    await renderDataView(
      <DataView
        availableLayouts={["table"]}
        getData={getData}
        tableLayoutOptions={{
          columns,
          hasSorting: true,
          initialSorting: [{ id: "name", desc: false }],
        }}
      />,
    );

    await expect
      .element(page.getByRole("button", { name: "Sorted by Name ascending" }))
      .toBeVisible();

    await expect(document.body).toBeAccessible();
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

    // Since table density is a purely visible attribute, there's no ARIA attribute to target here. We're forced to use the className directly.
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

    // Ensure that the resize handle is displayed when hasColumnResizing is true
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

    test("inline onPaginationChange while the consumer resets currentPage during render", async () => {
      function PingPongHarness() {
        const [filterCount, setFilterCount] = useState(0);
        const [currentPage, setCurrentPage] = useState(1);
        const [previousFilterCount, setPreviousFilterCount] =
          useState(filterCount);

        // Resetting state during render when an input changes is a documented React pattern, so DataView must not need the reset moved into an effect.
        if (previousFilterCount !== filterCount) {
          setPreviousFilterCount(filterCount);

          if (currentPage !== 1) {
            setCurrentPage(1);
          }
        }

        const changeFilter = useCallback(
          () => setFilterCount((count) => count + 1),
          [],
        );

        return (
          <>
            <Button
              label="Change filter"
              onClick={changeFilter}
              variant="primary"
            />

            <DataView
              availableLayouts={PING_PONG_LAYOUTS}
              currentPage={currentPage}
              getData={getData}
              hasPagination
              // eslint-disable-next-line memoized-props/no-new-function-as-prop -- asserts DataView handles a new onPaginationChange identity on every render
              onPaginationChange={({ pageIndex }) => setCurrentPage(pageIndex)}
              paginationType="paged"
              resultsPerPage={2}
              tableLayoutOptions={PING_PONG_TABLE_OPTIONS}
            />
          </>
        );
      }

      const { container } = await renderDataView(<PingPongHarness />);

      await expect.element(page.getByText(data[0].name)).toBeVisible();
      await expect(container).toBeAccessible();

      await userEvent.click(page.getByRole("button", { name: "Next page" }));

      await expect.element(page.getByText(data[2].name)).toBeVisible();
      await expect(container).toBeAccessible();

      await userEvent.click(
        page.getByRole("button", { name: "Change filter" }),
      );

      await expect.element(page.getByText(data[0].name)).toBeVisible();
      await expect
        .element(page.getByText(data[2].name))
        .not.toBeInTheDocument();

      await expect(container).toBeAccessible();
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
      // Page 2's fetch stays pending until the test releases it. A fixed delay let the fetch resolve before the assertion below ran on a loaded CI agent, so page 1's rows were already gone.
      const { promise: pageTwoFetchReleased, resolve: releasePageTwoFetch } =
        Promise.withResolvers<void>();

      const asyncGetData = ({ ...props }: DataGetDataType) =>
        (props.page ?? 1) === 1
          ? Promise.resolve(filterData({ data, ...props }))
          : pageTwoFetchReleased.then(() => filterData({ data, ...props }));

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

      // The fetch for page 2 is still pending.
      // With the bug, fetchData calls setIsLoading(true) which causes MRT to replace the actual rows with skeleton placeholders, making data[0].name disappear.
      // With the fix, setIsLoading is not passed to fetchData when isLoading is controlled, so the previous page rows remain visible throughout.
      await expect.element(page.getByText(data[0].name)).toBeVisible();

      releasePageTwoFetch();

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

      // The parent never fed the change back into the prop, so the controlled value stays empty: the row is unchecked and no bulk-actions bar appears.
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

  describe("Data loading", () => {
    test("a rejected request shows the translated error", async () => {
      await renderWithOdysseyProvider(
        <DataView
          availableLayouts={["table"]}
          getData={() => Promise.reject(new Error("nope"))}
          tableLayoutOptions={{ columns }}
        />,
      );

      await expect.element(page.getByText("Error loading data.")).toBeVisible();
    });

    test("a rejected request with a string message shows that message", async () => {
      await renderWithOdysseyProvider(
        <DataView
          availableLayouts={["table"]}
          // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
          getData={() => Promise.reject("The service is down")}
          tableLayoutOptions={{ columns }}
        />,
      );

      await expect.element(page.getByText("The service is down")).toBeVisible();
    });
  });

  describe("Filters from columns", () => {
    test("filters given as column keys, column objects, and custom filters", async () => {
      await renderWithOdysseyProvider(
        <DataView
          availableLayouts={["table"]}
          filters={[
            "name",
            "missing",
            columns[2],
            { id: "custom", label: "Custom filter", variant: "text" },
            {
              accessorKey: "state",
              enableColumnFilter: false,
              header: "State",
            },
          ]}
          getData={getData}
          hasFilters
          tableLayoutOptions={{ columns }}
        />,
      );

      await userEvent.click(page.getByLabelText("Filters", { exact: true }));

      await expect
        .element(page.getByRole("menuitem", { name: /Name/ }))
        .toBeVisible();
      await expect
        .element(page.getByRole("menuitem", { name: /City/ }))
        .toBeVisible();
      await expect
        .element(page.getByRole("menuitem", { name: /Custom filter/ }))
        .toBeVisible();
      await expect
        .element(page.getByRole("menuitem", { name: /State/ }))
        .not.toBeInTheDocument();
    });

    test("filters inferred from columns convert their select options", async () => {
      await renderWithOdysseyProvider(
        <DataView
          availableLayouts={["table"]}
          getData={getData}
          hasFilters
          tableLayoutOptions={{
            columns: [
              {
                accessorKey: "plain",
                filterSelectOptions: [
                  "one",
                  { label: "Two", value: undefined },
                  { value: "three" },
                ],
                filterVariant: "select",
                header: "Plain",
              },
            ],
          }}
        />,
      );

      await userEvent.click(page.getByLabelText("Filters", { exact: true }));
      await userEvent.click(page.getByRole("menuitem", { name: /Plain/ }));

      await expect
        .element(page.getByRole("radio", { name: "one" }))
        .toBeVisible();
      await expect
        .element(page.getByRole("radio", { name: "Two" }))
        .toBeVisible();
      await expect
        .element(page.getByRole("radio", { name: "three" }))
        .toBeVisible();
    });
  });

  describe("Layout switching", () => {
    test("switching from table to grid shows cards", async () => {
      await renderWithOdysseyProvider(
        <DataView
          availableLayouts={["table", "grid", "list"]}
          cardLayoutOptions={{
            itemProps: (row: Person) => ({ title: row.name }),
          }}
          getData={getData}
          tableLayoutOptions={{ columns }}
        />,
      );

      await expect.element(page.getByRole("table")).toBeVisible();

      await userEvent.click(page.getByRole("button", { name: "Layout" }));
      await userEvent.click(page.getByRole("menuitem", { name: "Grid" }));
      await userEvent.keyboard("{Escape}");

      await expect.element(page.getByRole("table")).not.toBeInTheDocument();
      await expect.element(page.getByRole("list")).toBeVisible();
    });
  });

  describe("Card row actions", () => {
    test("bring forward moves the card up one", async () => {
      const onReorderRows = vi.fn();

      await renderWithOdysseyProvider(
        <DataView
          availableLayouts={["list"]}
          cardLayoutOptions={{
            itemProps: (row: Person) => ({ title: row.name }),
            rowActionMenuItems: (row: Person) => (
              <MenuItem>Archive {row.name}</MenuItem>
            ),
          }}
          getData={getData}
          hasRowReordering
          onReorderRows={onReorderRows}
          totalRows={data.length}
        />,
      );

      await expect.element(page.getByText(data[1].name)).toBeVisible();

      await userEvent.click(
        page.getByRole("button", { name: "More actions" }).nth(1),
      );
      await userEvent.click(
        page.getByRole("menuitem", { name: "Bring forward" }),
      );

      expect(onReorderRows).toHaveBeenCalledWith({
        newRowIndex: 0,
        rowId: data[1].id,
      });
    });

    test("reordering menu items are disabled while reordering is disabled", async () => {
      await renderWithOdysseyProvider(
        <DataView
          availableLayouts={["list"]}
          cardLayoutOptions={{
            itemProps: (row: Person) => ({ title: row.name }),
          }}
          getData={getData}
          hasRowReordering
          isRowReorderingDisabled
          onReorderRows={vi.fn()}
        />,
      );

      await expect.element(page.getByText(data[1].name)).toBeVisible();

      await userEvent.click(
        page.getByRole("button", { name: "More actions" }).nth(1),
      );

      await expect
        .element(page.getByRole("menuitem", { name: "Bring forward" }))
        .toHaveAttribute("aria-disabled", "true");
    });

    test("table row menu without a total hides the send to back item", async () => {
      await renderWithOdysseyProvider(
        <DataView
          availableLayouts={["table"]}
          getData={getData}
          hasRowReordering
          onReorderRows={vi.fn()}
          tableLayoutOptions={{
            columns,
            rowActionMenuItems: (row: Person) => (
              <MenuItem>Archive {row.name}</MenuItem>
            ),
          }}
        />,
      );

      await expect.element(page.getByText(data[1].name)).toBeVisible();

      await userEvent.click(
        page.getByRole("button", { name: "More actions" }).nth(1),
      );

      await expect
        .element(page.getByRole("menuitem", { name: "Send backward" }))
        .toBeVisible();
      await expect
        .element(page.getByRole("menuitem", { name: "Send to back" }))
        .not.toBeInTheDocument();
    });
  });
});

describe(DataTable.displayName!, () => {
  test("passes the table options through to the table layout", async () => {
    await renderWithOdysseyProvider(
      <DataTable
        columns={columns}
        getData={getData}
        hasChangeableDensity
        hasColumnVisibility
        hasSorting
        rowActionMenuItems={() => <></>}
      />,
    );

    await expect.element(page.getByText("Luke Skywalker")).toBeVisible();
    await expect
      .element(page.getByRole("button", { name: "Table density" }))
      .toBeVisible();
    await expect
      .element(page.getByRole("button", { name: "Show/hide columns" }))
      .toBeVisible();
    await expect
      .element(page.getByRole("button", { name: "More actions" }).first())
      .toBeVisible();
  });

  test("selection labels in a non-English language", async () => {
    await renderWithOdysseyProvider(
      <TranslationProvider<"ar">
        languageCode="ar"
        translationOverrides={translationOverrides}
      >
        <DataView
          availableLayouts={["table"]}
          getData={getData}
          hasRowSelection
          tableLayoutOptions={{ columns }}
        />
      </TranslationProvider>,
      { providerProps: { hasTranslationProvider: false } },
    );

    await expect
      .element(page.getByRole("checkbox", { name: "ar select all" }))
      .toBeVisible();
    await expect
      .element(page.getByRole("checkbox", { name: "ar select row" }).first())
      .toBeVisible();
  });
});
