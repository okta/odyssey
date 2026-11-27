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
import { MRT_Row, MRT_RowSelectionState } from "material-react-table";
import { useState } from "react";
import { page, userEvent } from "vitest/browser";

import { useRowReordering } from "../../DataTable/useRowReordering.js";
import { CardLayoutContent } from "./CardLayoutContent.js";
import {
  type CardLayoutProps,
  type TableLayoutProps,
  type TableState,
} from "./componentTypes.js";
import { type DataOnReorderRowsType } from "./dataTypes.js";
import { TableLayoutContent } from "./TableLayoutContent.js";
import { columns, data, Person } from "./testSupportData.js";

// A prefix makes every id differ from row.id, so the layouts and the hook disagree unless the layouts take their id from the hook.
const getPrefixedRowId = (row: Person) => `person-${row.id}`;

const pagination = { pageIndex: 1, pageSize: data.length };

const tableLayoutOptions: TableLayoutProps<Person> = { columns };

const cardLayoutOptions: CardLayoutProps<Person> = {
  itemProps: (row) => ({ title: row.name }),
};

type LayoutWithoutHookGetRowIdProps = {
  layout: "grid" | "table";
  onReorderRows: (args: DataOnReorderRowsType) => void;
};

// Contribution packages render these layouts from `__internal` with their own `useRowReordering` call, which does not pass `getRowId`.
const LayoutWithoutHookGetRowId = ({
  layout,
  onReorderRows,
}: LayoutWithoutHookGetRowIdProps) => {
  const [rows, setRows] = useState<Person[]>(data);
  const [draggingRow, setDraggingRow] = useState<MRT_Row<Person> | null>();
  const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});
  const [tableState, setTableState] = useState<TableState>({
    columnSorting: [],
    columnVisibility: {},
  });

  const rowReorderingUtilities = useRowReordering({
    data: rows,
    draggingRow,
    onReorderRows,
    page: pagination.pageIndex,
    resultsPerPage: pagination.pageSize,
    setData: setRows,
    setDraggingRow,
    totalRows: rows.length,
  });

  const sharedProps = {
    data: rows,
    draggingRow,
    emptyState: null,
    getRowId: getPrefixedRowId,
    hasRowReordering: true,
    hasRowSelection: false,
    isLoading: false,
    onReorderRows,
    pagination,
    rowReorderingUtilities,
    rowSelection,
    setRowSelection,
    totalRows: rows.length,
  };

  return layout === "table" ? (
    <TableLayoutContent
      {...sharedProps}
      columns={columns}
      setTableState={setTableState}
      tableLayoutOptions={tableLayoutOptions}
      tableState={tableState}
    />
  ) : (
    <CardLayoutContent
      {...sharedProps}
      cardLayoutOptions={cardLayoutOptions}
      currentLayout="grid"
    />
  );
};

describe("layouts with a useRowReordering call that leaves out getRowId", () => {
  test("table row menu Send to back", async () => {
    const onReorderRows = vi.fn();

    const { container } = await renderWithOdysseyProvider(
      <LayoutWithoutHookGetRowId
        layout="table"
        onReorderRows={onReorderRows}
      />,
    );

    await userEvent.click(
      page.getByRole("button", { name: "More actions" }).first(),
    );
    await userEvent.click(page.getByRole("menuitem", { name: "Send to back" }));

    expect(onReorderRows).toHaveBeenLastCalledWith({
      rowId: data[0].id,
      newRowIndex: data.length - 1,
    });
    await expect
      .element(
        page
          .getByRole("row")
          .last()
          .getByRole("cell", { name: data[0].name, exact: true }),
      )
      .toBeVisible();
    await expect(container).toBeAccessible();
  });

  test("table drag handle moved with the keyboard", async () => {
    const onReorderRows = vi.fn();

    const { container } = await renderWithOdysseyProvider(
      <LayoutWithoutHookGetRowId
        layout="table"
        onReorderRows={onReorderRows}
      />,
    );

    page
      .getByRole("button", { name: /^Drag row/ })
      .first()
      .element()
      .focus();
    await userEvent.keyboard(" ");
    await userEvent.keyboard("{ArrowDown}");

    await expect
      .element(page.getByRole("row").nth(2))
      .toHaveClass("isDragTarget");
    await expect(container).toBeAccessible();
  });

  test("grid card menu Bring to front", async () => {
    const onReorderRows = vi.fn();

    const { container } = await renderWithOdysseyProvider(
      <LayoutWithoutHookGetRowId layout="grid" onReorderRows={onReorderRows} />,
    );

    await userEvent.click(
      page.getByRole("button", { name: "More actions" }).nth(2),
    );
    await userEvent.click(
      page.getByRole("menuitem", { name: "Bring to front" }),
    );

    expect(onReorderRows).toHaveBeenLastCalledWith({
      rowId: data[2].id,
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
        [data[2], data[0], data[1], data[3], data[4], data[5]].map(
          (row) => row.name,
        ),
      );
    await expect(container).toBeAccessible();
  });
});
