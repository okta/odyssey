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

import { Button } from "../Buttons/Button.js";
import { MenuItem } from "../Buttons/MenuItem.js";
import { type DataTableRowData } from "../index.js";
import {
  DataTable,
  type DataTableColumn,
  type DataTableProps,
} from "./DataTable.js";

const sampleRows = [
  { id: "1", name: "Ada Lovelace", role: "Engineer" },
  { id: "2", name: "Grace Hopper", role: "Admiral" },
  { id: "3", name: "Alan Turing", role: "Mathematician" },
];

const sampleColumns: DataTableColumn<DataTableRowData>[] = [
  { accessorKey: "name", header: "Name", id: "name" },
  { accessorKey: "role", header: "Role", id: "role" },
];

const getSampleRows: DataTableProps["getData"] = () => sampleRows;

const rowNames = sampleRows.map((row) => row.name);

// The drag handle's accessible name goes on with keyboard instructions after "Drag row", so only its start is matched.
const DRAG_HANDLE_NAME = /^Drag row/;

const getRowNames = () =>
  page
    .getByRole("rowgroup")
    .nth(1)
    .getByRole("cell")
    .elements()
    .map((cell) => cell.textContent)
    .filter((text) => rowNames.includes(text));

describe(DataTable.displayName!, () => {
  test("row density and column visibility menus", async () => {
    await renderWithOdysseyProvider(
      <DataTable
        columns={sampleColumns}
        getData={getSampleRows}
        hasChangeableDensity
        hasColumnVisibility
      />,
    );

    await expect.element(page.getByText("Ada Lovelace")).toBeVisible();

    await userEvent.click(page.getByRole("button", { name: "Table density" }));

    const compact = page.getByRole("menuitem", { name: "Compact" });
    const spacious = page.getByRole("menuitem", { name: "Spacious" });

    await userEvent.click(compact);

    await expect.element(compact).toHaveAttribute("aria-current", "true");
    await expect.element(spacious).toHaveAttribute("aria-current", "false");

    await userEvent.click(spacious);

    await expect.element(spacious).toHaveAttribute("aria-current", "true");
    await expect.element(compact).toHaveAttribute("aria-current", "false");
    await userEvent.keyboard("{Escape}");

    await userEvent.click(
      page.getByRole("button", { name: "Show/hide columns" }),
    );
    await userEvent.click(page.getByRole("menuitem", { name: "Role" }));
    await userEvent.keyboard("{Escape}");

    await expect.element(page.getByText("Admiral")).not.toBeInTheDocument();

    await userEvent.click(
      page.getByRole("button", { name: "Show/hide columns" }),
    );
    await userEvent.click(page.getByRole("menuitem", { name: "Role" }));
    await userEvent.keyboard("{Escape}");

    await expect.element(page.getByText("Admiral")).toBeVisible();
  });

  test("column that cannot be hidden is left out of the visibility menu", async () => {
    await renderWithOdysseyProvider(
      <DataTable
        columns={[
          { ...sampleColumns[0], enableHiding: false },
          sampleColumns[1],
        ]}
        getData={getSampleRows}
        hasColumnVisibility
      />,
    );

    await userEvent.click(
      page.getByRole("button", { name: "Show/hide columns" }),
    );

    await expect
      .element(page.getByRole("menuitem", { name: "Role" }))
      .toBeVisible();
    await expect
      .element(page.getByRole("menuitem", { name: "Name" }))
      .not.toBeInTheDocument();
  });

  test("row selection with bulk actions", async () => {
    const onChangeRowSelection = vi.fn();
    const { container } = await renderWithOdysseyProvider(
      <DataTable
        bulkActionMenuItems={(selectedRows) => (
          <MenuItem>{`Delete ${Object.keys(selectedRows).length}`}</MenuItem>
        )}
        columns={sampleColumns}
        getData={getSampleRows}
        hasRowSelection
        onChangeRowSelection={onChangeRowSelection}
      />,
    );

    const bulkActions = page.getByRole("button", { name: "More actions" });
    await expect.element(bulkActions).toBeDisabled();

    await userEvent.click(
      page.getByRole("checkbox", { name: "Toggle select row" }).first(),
    );

    expect(onChangeRowSelection).toHaveBeenLastCalledWith({ "1": true });
    await expect.element(bulkActions).toBeEnabled();

    await userEvent.click(bulkActions);

    await expect
      .element(page.getByRole("menuitem", { name: "Delete 1" }))
      .toBeVisible();
    await expect(container).toBeAccessible();
  });

  test("externally controlled row selection", async () => {
    await renderWithOdysseyProvider(
      <DataTable
        columns={sampleColumns}
        getData={getSampleRows}
        hasRowSelection
        selectedRows={{ "2": true }}
      />,
    );

    await expect
      .element(page.getByRole("checkbox", { name: "Toggle select row" }).nth(1))
      .toBeChecked();
  });

  test("row action buttons and menu items", async () => {
    const { container } = await renderWithOdysseyProvider(
      <DataTable
        columns={sampleColumns}
        getData={getSampleRows}
        rowActionButtons={(row) => (
          <Button label={`Edit ${row.id}`} variant="floating" />
        )}
        rowActionMenuItems={(row) => <MenuItem>{`Remove ${row.id}`}</MenuItem>}
      />,
    );

    await expect
      .element(page.getByRole("button", { name: "Edit 1" }))
      .toBeVisible();

    await userEvent.click(
      page.getByRole("button", { name: "More actions" }).first(),
    );

    await expect
      .element(page.getByRole("menuitem", { name: "Remove 1" }))
      .toBeVisible();
    await expect(container).toBeAccessible();
  });

  test("row reordering through the row action menu", async () => {
    const onReorderRows = vi.fn();
    await renderWithOdysseyProvider(
      <DataTable
        columns={sampleColumns}
        getData={getSampleRows}
        hasRowReordering
        onReorderRows={onReorderRows}
        rowActionMenuItems={(row) => <MenuItem>{`Remove ${row.id}`}</MenuItem>}
        totalRows={3}
      />,
    );

    await expect.element(page.getByText("Ada Lovelace")).toBeVisible();

    await userEvent.click(
      page.getByRole("button", { name: "More actions" }).nth(1),
    );
    await userEvent.click(
      page.getByRole("menuitem", { name: "Bring to front" }),
    );

    expect(onReorderRows).toHaveBeenLastCalledWith({
      rowId: "2",
      newRowIndex: 0,
    });
    expect(getRowNames()).toStrictEqual([
      "Grace Hopper",
      "Ada Lovelace",
      "Alan Turing",
    ]);

    await userEvent.click(
      page.getByRole("button", { name: "More actions" }).nth(1),
    );
    await userEvent.click(page.getByRole("menuitem", { name: "Send to back" }));

    expect(onReorderRows).toHaveBeenLastCalledWith({
      rowId: "1",
      newRowIndex: 2,
    });

    await userEvent.click(
      page.getByRole("button", { name: "More actions" }).nth(1),
    );
    await userEvent.click(
      page.getByRole("menuitem", { name: "Send backward" }),
    );

    expect(onReorderRows).toHaveBeenLastCalledWith({
      rowId: "3",
      newRowIndex: 2,
    });

    await userEvent.click(
      page.getByRole("button", { name: "More actions" }).nth(2),
    );
    await userEvent.click(
      page.getByRole("menuitem", { name: "Bring forward" }),
    );

    expect(onReorderRows).toHaveBeenLastCalledWith({
      rowId: "3",
      newRowIndex: 1,
    });
  });

  test("row reordering without a known total row count", async () => {
    const onReorderRows = vi.fn();
    await renderWithOdysseyProvider(
      <DataTable
        columns={sampleColumns}
        getData={getSampleRows}
        hasRowReordering
        onReorderRows={onReorderRows}
      />,
    );

    await userEvent.click(
      page.getByRole("button", { name: "More actions" }).first(),
    );

    await expect
      .element(page.getByRole("menuitem", { name: "Send to back" }))
      .not.toBeInTheDocument();

    await userEvent.click(
      page.getByRole("menuitem", { name: "Send backward" }),
    );

    expect(onReorderRows).toHaveBeenLastCalledWith({
      rowId: "1",
      newRowIndex: 1,
    });
  });

  test("row reordering with the keyboard", async () => {
    const onReorderRows = vi.fn();
    await renderWithOdysseyProvider(
      <DataTable
        columns={sampleColumns}
        getData={getSampleRows}
        hasRowReordering
        onReorderRows={onReorderRows}
        totalRows={3}
      />,
    );

    await expect.element(page.getByText("Ada Lovelace")).toBeVisible();

    const dragHandle = page
      .getByRole("button", { name: DRAG_HANDLE_NAME })
      .first();

    dragHandle.element().focus();
    await userEvent.keyboard("{Enter}");
    await userEvent.keyboard("{ArrowDown}");
    await userEvent.keyboard("{ArrowDown}");
    await userEvent.keyboard("{ArrowUp}");
    await userEvent.keyboard("{Enter}");

    await vi.waitFor(() => {
      expect(onReorderRows).toHaveBeenCalledWith({
        rowId: "1",
        newRowIndex: 1,
      });
    });
    expect(getRowNames()).toStrictEqual([
      "Grace Hopper",
      "Ada Lovelace",
      "Alan Turing",
    ]);
  });

  test("keyboard row reordering cancelled with Escape", async () => {
    const onReorderRows = vi.fn();
    await renderWithOdysseyProvider(
      <DataTable
        columns={sampleColumns}
        getData={getSampleRows}
        hasRowReordering
        onReorderRows={onReorderRows}
      />,
    );

    await expect.element(page.getByText("Ada Lovelace")).toBeVisible();

    const dragHandle = page
      .getByRole("button", { name: DRAG_HANDLE_NAME })
      .first();

    dragHandle.element().focus();
    await userEvent.keyboard(" ");
    await userEvent.keyboard("{ArrowDown}");
    await userEvent.keyboard("{Escape}");
    await userEvent.keyboard("{Enter}");
    await userEvent.keyboard("{Enter}");

    expect(onReorderRows).not.toHaveBeenCalled();
  });

  test("keyboard row reordering on the second page", async () => {
    const onReorderRows = vi.fn();
    await renderWithOdysseyProvider(
      <DataTable
        columns={sampleColumns}
        getData={getSampleRows}
        hasPagination
        hasRowReordering
        onReorderRows={onReorderRows}
        resultsPerPage={3}
        totalRows={9}
      />,
    );

    await expect.element(page.getByText("Ada Lovelace")).toBeVisible();

    await userEvent.click(page.getByRole("button", { name: "Next page" }));
    await expect
      .element(page.getByRole("button", { name: "Previous page" }))
      .toBeEnabled();

    page
      .getByRole("button", { name: DRAG_HANDLE_NAME })
      .first()
      .element()
      .focus();
    await userEvent.keyboard("{Enter}");
    await userEvent.keyboard("{ArrowDown}");
    await userEvent.keyboard("{Enter}");

    await vi.waitFor(() => {
      expect(onReorderRows).toHaveBeenCalledWith({
        rowId: "1",
        newRowIndex: 4,
      });
    });
  });

  test("Enter on the row already in place", async () => {
    const onReorderRows = vi.fn();
    await renderWithOdysseyProvider(
      <DataTable
        columns={sampleColumns}
        getData={getSampleRows}
        hasRowReordering
        onReorderRows={onReorderRows}
        totalRows={3}
      />,
    );

    await expect.element(page.getByText("Ada Lovelace")).toBeVisible();

    page
      .getByRole("button", { name: DRAG_HANDLE_NAME })
      .first()
      .element()
      .focus();
    await userEvent.keyboard("{Enter}");
    await userEvent.keyboard("{ArrowDown}");
    await userEvent.keyboard("{ArrowUp}");
    await userEvent.keyboard("{Enter}");

    expect(onReorderRows).not.toHaveBeenCalled();
    expect(getRowNames()).toStrictEqual(rowNames);
  });

  test("row dragged onto another row", async () => {
    const onReorderRows = vi.fn();
    await renderWithOdysseyProvider(
      <DataTable
        columns={sampleColumns}
        getData={getSampleRows}
        hasRowReordering
        onReorderRows={onReorderRows}
        totalRows={3}
      />,
    );

    await expect.element(page.getByText("Ada Lovelace")).toBeVisible();

    const dragHandles = page.getByRole("button", { name: DRAG_HANDLE_NAME });
    await userEvent.dragAndDrop(dragHandles.first(), dragHandles.nth(1));

    await vi.waitFor(() => {
      expect(onReorderRows).toHaveBeenCalledWith({
        rowId: "1",
        newRowIndex: 1,
      });
    });
  });

  test("sorting columns", async () => {
    const getData = vi.fn<NonNullable<DataTableProps["getData"]>>(
      () => sampleRows,
    );
    await renderWithOdysseyProvider(
      <DataTable columns={sampleColumns} getData={getData} hasSorting />,
    );

    await expect.element(page.getByText("Ada Lovelace")).toBeVisible();

    await userEvent.click(page.getByRole("button", { name: /Name/ }).first());

    await vi.waitFor(() => {
      expect(getData).toHaveBeenLastCalledWith({
        page: 1,
        resultsPerPage: 20,
        search: "",
        filters: undefined,
        sort: [{ id: "name", desc: false }],
      });
    });
  });

  test("search", async () => {
    const getData = vi.fn<NonNullable<DataTableProps["getData"]>>(
      () => sampleRows,
    );
    await renderWithOdysseyProvider(
      <DataTable
        columns={sampleColumns}
        getData={getData}
        hasSearch
        searchDelayTime={0}
      />,
    );

    await expect.element(page.getByText("Ada Lovelace")).toBeVisible();

    await userEvent.fill(page.getByRole("searchbox"), "Grace");

    await vi.waitFor(() => {
      expect(getData.mock.lastCall?.[0].search).toBe("Grace");
    });
  });

  test("filters from column ids, columns, and filter definitions", async () => {
    await renderWithOdysseyProvider(
      <DataTable
        columns={[
          sampleColumns[0],
          {
            ...sampleColumns[1],
            filterSelectOptions: [
              "Engineer",
              { label: "Admiral rank", value: "admiral" },
              { value: "Only value" },
            ],
            filterVariant: "select",
          },
          {
            accessorKey: "hidden",
            header: "Hidden",
            enableColumnFilter: false,
          },
        ]}
        filters={[
          "role",
          "missing",
          "hidden",
          sampleColumns[0],
          { id: "custom", label: "Custom", options: [] },
        ]}
        getData={getSampleRows}
        hasFilters
      />,
    );

    await userEvent.click(page.getByRole("button", { name: "Filters" }));

    const filterMenuItems = page.getByRole("menuitem");
    expect(filterMenuItems.all()).toHaveLength(3);
    await expect
      .element(filterMenuItems.nth(0))
      .toHaveAccessibleName("Role Any role");
    await expect
      .element(filterMenuItems.nth(1))
      .toHaveAccessibleName("Name Any name");
    await expect
      .element(filterMenuItems.nth(2))
      .toHaveAccessibleName("Custom Any custom");

    await userEvent.click(filterMenuItems.nth(0));

    const roleOptions = page
      .getByRole("radiogroup", { name: "Role" })
      .getByRole("radio");
    expect(roleOptions.all()).toHaveLength(4);
    await expect.element(roleOptions.nth(0)).toHaveAccessibleName("Any");
    await expect.element(roleOptions.nth(1)).toHaveAccessibleName("Engineer");
    await expect
      .element(roleOptions.nth(2))
      .toHaveAccessibleName("Admiral rank");
    await expect.element(roleOptions.nth(3)).toHaveAccessibleName("Only value");
  });
  test("filters default to the columns", async () => {
    await renderWithOdysseyProvider(
      <DataTable columns={sampleColumns} getData={getSampleRows} hasFilters />,
    );

    await expect
      .element(page.getByRole("button", { name: "Filters" }))
      .toBeVisible();
  });

  test("pagination", async () => {
    const getData = vi.fn<NonNullable<DataTableProps["getData"]>>(
      () => sampleRows,
    );
    await renderWithOdysseyProvider(
      <DataTable
        columns={sampleColumns}
        getData={getData}
        hasPagination
        resultsPerPage={3}
        totalRows={9}
      />,
    );

    await expect.element(page.getByText("Ada Lovelace")).toBeVisible();

    await userEvent.click(page.getByRole("button", { name: "Next page" }));

    await vi.waitFor(() => {
      expect(getData).toHaveBeenLastCalledWith({
        page: 2,
        resultsPerPage: 3,
        search: "",
        filters: undefined,
        sort: [],
      });
    });
  });

  test("load more pagination", async () => {
    const getData = vi.fn<NonNullable<DataTableProps["getData"]>>(
      () => sampleRows,
    );
    await renderWithOdysseyProvider(
      <DataTable
        columns={sampleColumns}
        getData={getData}
        hasPagination
        paginationType="loadMore"
        resultsPerPage={3}
        totalRows={9}
      />,
    );

    await expect.element(page.getByText("Ada Lovelace")).toBeVisible();

    await userEvent.click(page.getByRole("button", { name: "Show more" }));

    await vi.waitFor(() => {
      expect(getData).toHaveBeenLastCalledWith({
        page: 1,
        resultsPerPage: 6,
        search: "",
        filters: undefined,
        sort: [],
      });
    });
  });

  test("data that fails to load with a message", async () => {
    const { container } = await renderWithOdysseyProvider(
      <DataTable
        columns={sampleColumns}
        // DataTable shows a string rejection as the error message, so this branch needs a non-Error reason.
        // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
        getData={() => Promise.reject("Server unavailable")}
      />,
    );

    await expect.element(page.getByText("Server unavailable")).toBeVisible();
    await expect(container).toBeAccessible();
  });

  test("data that fails to load with an error object", async () => {
    await renderWithOdysseyProvider(
      <DataTable
        columns={sampleColumns}
        getData={() => Promise.reject(new Error("boom"))}
      />,
    );

    await expect.element(page.getByText("Error loading data.")).toBeVisible();
  });

  test("empty table shows the default no results state", async () => {
    const { container } = await renderWithOdysseyProvider(
      <DataTable columns={sampleColumns} getData={() => []} />,
    );

    await expect.element(page.getByText("There are no results.")).toBeVisible();
    await expect(container).toBeAccessible();
  });

  test("empty table with custom placeholders", async () => {
    await renderWithOdysseyProvider(
      <DataTable
        columns={sampleColumns}
        emptyPlaceholder={<div>Nothing here yet</div>}
        getData={() => []}
        noResultsPlaceholder={<div>No matches</div>}
      />,
    );

    await expect.element(page.getByText("Nothing here yet")).toBeVisible();
  });

  test("no results after searching shows the no results placeholder", async () => {
    await renderWithOdysseyProvider(
      <DataTable
        columns={sampleColumns}
        emptyPlaceholder={<div>Nothing here yet</div>}
        getData={({ search }) => (search ? [] : sampleRows)}
        hasSearch
        noResultsPlaceholder={<div>No matches</div>}
        searchDelayTime={0}
      />,
    );

    await expect.element(page.getByText("Ada Lovelace")).toBeVisible();

    await userEvent.fill(page.getByRole("searchbox"), "zzz");

    await expect.element(page.getByText("No matches")).toBeVisible();
  });
});
