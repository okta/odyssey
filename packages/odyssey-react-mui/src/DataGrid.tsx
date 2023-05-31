/*!
 * Copyright (c) 2022-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import MaterialReactTable from "material-react-table";
import { memo } from "react";

export type { MRT_ColumnDef as DataGridColumnType } from "material-react-table";

type DefaultMaterialReactTableData = Record<string, unknown>;

type MaterialReactTableProps<TData extends DefaultMaterialReactTableData> =
  Parameters<typeof MaterialReactTable<TData>>[0];

export type DataGridProps<TData extends DefaultMaterialReactTableData> = {
  columns: MaterialReactTableProps<TData>["columns"];
  data: MaterialReactTableProps<TData>["data"];
  getRowId?: MaterialReactTableProps<TData>["getRowId"];
  hasRowSelection?: boolean;
  onRowSelectionChange?: MaterialReactTableProps<TData>["onRowSelectionChange"];
  tableState?: MaterialReactTableProps<TData>["state"];
};

const DataGrid = <TData extends DefaultMaterialReactTableData>({
  columns,
  data,
  getRowId,
  hasRowSelection,
  onRowSelectionChange,
  tableState,
}: DataGridProps<TData>) => {
  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      enableRowSelection={hasRowSelection}
      getRowId={getRowId}
      onRowSelectionChange={onRowSelectionChange}
      state={tableState}
    />
  );
};

const MemoizedDataGrid = memo(DataGrid) as typeof DataGrid;

export { MemoizedDataGrid as DataGrid };
