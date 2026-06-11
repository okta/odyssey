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

import { useCallback } from "react";
import { page, userEvent } from "vitest/browser";

import { type DataTableRowData } from "../index.js";
import { renderWithOdysseyProvider } from "../test-utils/renderWithOdysseyProvider.js";
import {
  DataTable,
  type DataTableColumn,
  type DataTableProps,
} from "./DataTable.js";

type SamplePerson = { id: string; name: string; role: string };

const sampleData: SamplePerson[] = [
  { id: "1", name: "Ada Lovelace", role: "Engineer" },
  { id: "2", name: "Grace Hopper", role: "Engineer" },
];

const sampleColumns: DataTableColumn<DataTableRowData>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "role", header: "Role" },
];

const renderDetailPanel: NonNullable<DataTableProps["renderDetailPanel"]> = ({
  row,
}) => <div>Detail content for row {row.id}</div>;

const DataTableWithExpandableRowsAndColumnResizing = () => {
  const getData = useCallback(() => sampleData, []);

  return (
    <DataTable
      columns={sampleColumns}
      getData={getData}
      hasColumnResizing
      renderDetailPanel={renderDetailPanel}
    />
  );
};

const DataTableWithExpandableRows = () => {
  const getData = useCallback(() => sampleData, []);

  return (
    <DataTable
      columns={sampleColumns}
      getData={getData}
      renderDetailPanel={renderDetailPanel}
    />
  );
};

const getDetailPanelAndCollapseWidths = (container: Element) => {
  const detailPanelCell = container.querySelector(
    "td.Mui-TableBodyCell-DetailPanel",
  );
  const collapseRoot = detailPanelCell?.querySelector(".MuiCollapse-root");
  const cellStyle = detailPanelCell
    ? getComputedStyle(detailPanelCell)
    : undefined;
  const cellPaddingX = cellStyle
    ? parseFloat(cellStyle.paddingLeft) + parseFloat(cellStyle.paddingRight)
    : 0;
  const cellWidth = detailPanelCell?.getBoundingClientRect().width ?? 0;

  return {
    cellContentWidth: cellWidth - cellPaddingX,
    collapseWidth: collapseRoot?.getBoundingClientRect().width ?? 0,
  };
};

describe(DataTable.displayName!, () => {
  test("renderDetailPanel with hasColumnResizing", async () => {
    const { container } = await renderWithOdysseyProvider(
      <DataTableWithExpandableRowsAndColumnResizing />,
    );

    await expect(container).toBeAccessible();

    const detailContent = page.getByText("Detail content for row 1");
    await expect.element(detailContent).not.toBeInTheDocument();

    const expandButton = page.getByRole("button", { name: "Expand" }).first();
    await userEvent.click(expandButton);

    await expect.element(detailContent).toBeVisible();

    await expect(container).toBeAccessible();
  });

  test("renderDetailPanel content width", async () => {
    const { container } = await renderWithOdysseyProvider(
      <DataTableWithExpandableRows />,
    );

    const expandButton = page.getByRole("button", { name: "Expand" }).first();
    await userEvent.click(expandButton);

    await expect
      .element(page.getByText("Detail content for row 1"))
      .toBeVisible();

    const { cellContentWidth, collapseWidth } =
      getDetailPanelAndCollapseWidths(container);

    expect(cellContentWidth).toBeGreaterThan(0);
    expect(collapseWidth).toBeCloseTo(cellContentWidth, 0);
  });
});
