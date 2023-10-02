/*!
 * Copyright (c) 2023-present, Okta, Inc. and/or its affiliates. All rights reserved.
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
  // Dispatch,
  // SetStateAction,
  createContext,
  memo,
  // useEffect,
  useRef,
  useState,
} from "react";
import { DefaultMaterialReactTableData, MaterialReactTableProps } from "./labs";
// import { PopoverProps as MuiPopoverProps } from "@mui/material";
import MaterialReactTable, {
  // MRT_DensityState,
  // MRT_Column,
  // MRT_TableInstance,
  MRT_Virtualizer,
} from "material-react-table";
import { ArrowDownIcon } from "./icons.generated";
import { Box } from "./Box";
// import { SearchField } from "./SearchField";
// import { Badge } from "@mui/material";
// import { Button, ButtonProps } from "./Button";
import { DataFilter, DataFilters } from "./DataFilters";
// import { RadioGroup } from "./RadioGroup";
// import { Checkbox } from "./Checkbox";
// import { Radio } from "./Radio";
// import { Dialog } from "./Dialog";
// import { CheckboxGroup } from "./CheckboxGroup";

export type DataTableProps<TData extends DefaultMaterialReactTableData> = {
  columns: MaterialReactTableProps<TData>["columns"];
  data: MaterialReactTableProps<TData>["data"];
  getRowId?: MaterialReactTableProps<TData>["getRowId"];
  hasFilters?: boolean;
  hasSearch?: boolean;
  hasPagination?: boolean;
  hasColumnVisibility?: boolean;
  hasColumnResizing?: boolean;
  hasRowSelection?: boolean;
  hasChangeableDensity?: boolean;
  defaultDensity?: "comfortable" | "spacious" | "compact";
};

// columns = { this.args?.columns }
// data = { this.args?.data }
// getRowId = { this.args?.getRowId }
// hasFilters
// hasSearch
// hasPagination
// hasColumnVisibility
// hasColumnResizing
// hasRowSelection
// hasChangeableDensity
// defaultDensity = "spacious"

const DataTable = <TData extends DefaultMaterialReactTableData>({
  columns,
  data,
  getRowId,
  // hasFilters,
  // hasSearch,
  hasPagination,
  // hasColumnVisibility,
  hasColumnResizing,
  hasRowSelection,
}: // hasChangeableDensity,
// defaultDensity,
DataTableProps<TData>) => {
  const [tableState, setTableState] = useState<
    MaterialReactTableProps<TData>["state"]
  >({});

  const rowVirtualizerInstanceRef =
    useRef<MRT_Virtualizer<HTMLDivElement, HTMLTableRowElement>>(null);

  const filters = columns.map((column) => {
    return {
      id: column.accessorKey as string,
      name: column.header,
      value: tableState?.columnFilters?.find((item) => item.id === column.id)
        ?.value as string,
    };
  });

  const ColumnsContext = createContext(columns);
  const FiltersContext = createContext(tableState?.columnFilters);

  const updateFilters = (updatedFilters: DataFilter[]) => {
    setTableState({
      ...tableState,
      columnFilters: updatedFilters.map((filter) => {
        return {
          id: filter.id,
          value: filter.value,
        };
      }),
    });
  };

  return (
    <ColumnsContext.Provider value={columns}>
      <FiltersContext.Provider value={tableState?.columnFilters}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <DataFilters filters={filters} onChangeFilters={updateFilters} />

          <MaterialReactTable
            columns={columns}
            data={data}
            rowVirtualizerInstanceRef={rowVirtualizerInstanceRef}
            rowVirtualizerProps={{ overscan: 4 }}
            state={tableState}
            muiTableBodyCellProps={{
              className: `MuiTableCell-${tableState?.density}`,
            }}
            muiTableHeadCellProps={{
              className: `MuiTableCell-${tableState?.density}`,
            }}
            muiTablePaperProps={{ elevation: 0 }}
            muiTableContainerProps={{ sx: { padding: 0 } }}
            enableTopToolbar={false}
            enableColumnResizing={hasColumnResizing}
            enableDensityToggle={false}
            enableFullScreenToggle={false}
            enablePagination={false}
            enableRowVirtualization={data.length > 50}
            enableRowSelection={hasRowSelection}
            enableColumnActions={false}
            enableGlobalFilter={false}
            globalFilterFn="contains"
            getRowId={getRowId}
            icons={{ ArrowDownwardIcon: ArrowDownIcon }}
          />

          {hasPagination && <p>Pagination</p>}
        </Box>
      </FiltersContext.Provider>
    </ColumnsContext.Provider>
  );
};

const MemoizedDataTable = memo(DataTable) as typeof DataTable;
export { MemoizedDataTable as DataTable };
