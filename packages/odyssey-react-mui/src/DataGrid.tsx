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

import { Typography } from "@mui/material";
import MaterialReactTable, {
  MRT_ColumnFiltersState,
  MRT_RowSelectionState,
  MRT_TableInstance,
  MRT_Virtualizer,
} from "material-react-table";
import {
  FunctionComponent,
  memo,
  UIEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export type { MRT_ColumnDef as DataGridColumn } from "material-react-table";

type DefaultMaterialReactTableData = Record<string, unknown>;

type MaterialReactTableProps<TData extends DefaultMaterialReactTableData> =
  Parameters<typeof MaterialReactTable<TData>>[0];

export type DataGridProps<TData extends DefaultMaterialReactTableData> = {
  columns: MaterialReactTableProps<TData>["columns"];
  data: MaterialReactTableProps<TData>["data"];
  fetchMoreData?: () => void;
  getRowId?: MaterialReactTableProps<TData>["getRowId"];
  hasError?: boolean;
  hasRowSelection?: boolean;
  initialState?: MaterialReactTableProps<TData>["initialState"];
  isFetching?: boolean;
  onGlobalFilterChange?: MaterialReactTableProps<TData>["onGlobalFilterChange"];
  onPaginationChange?: MaterialReactTableProps<TData>["onPaginationChange"];
  onRowSelectionChange?: MaterialReactTableProps<TData>["onRowSelectionChange"];
  // rowsPerPageOptions?: MaterialReactTableProps<TData>["muiTablePaginationProps"]['rowsPerPageOptions'];
  state?: MaterialReactTableProps<TData>["state"];
  ToolbarButtons?: FunctionComponent<
    { table: MRT_TableInstance<TData> } & unknown
  >;
};

// Once the user has scrolled within this many pixels of the bottom of the table, fetch more data if we can.
const scrollAmountBeforeFetchingData = 400;

const DataGrid = <TData extends DefaultMaterialReactTableData>({
  columns,
  data,
  fetchMoreData,
  getRowId,
  hasError,
  hasRowSelection,
  initialState,
  isFetching,
  onGlobalFilterChange,
  onPaginationChange,
  onRowSelectionChange: onRowSelectionChangeProp,
  state,
  ToolbarButtons,
}: DataGridProps<TData>) => {
  const tableContainerRef = useRef<HTMLDivElement>(null);

  const rowVirtualizerInstanceRef =
    useRef<MRT_Virtualizer<HTMLDivElement, HTMLTableRowElement>>(null);

  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
    []
  );

  const [globalFilter, setGlobalFilter] = useState<string>();

  useEffect(() => {
    if (globalFilter) {
      onGlobalFilterChange?.(globalFilter);
    }
  }, [globalFilter, onGlobalFilterChange]);

  const totalFetchedRows = data.length ?? 0;

  const fetchMoreOnBottomReached = useCallback(
    (containerRefElement?: HTMLDivElement | null) => {
      if (containerRefElement) {
        const { scrollHeight, scrollTop, clientHeight } = containerRefElement;

        if (
          scrollHeight - scrollTop - clientHeight <
            scrollAmountBeforeFetchingData &&
          !isFetching
        ) {
          fetchMoreData?.();
        }
      }
    },
    [fetchMoreData, isFetching]
  );

  useEffect(() => {
    try {
      // Scroll to top of table when sorting or filters change.
      rowVirtualizerInstanceRef.current?.scrollToIndex?.(0);
    } catch (error) {
      console.error(error);
    }
  }, [columnFilters, globalFilter]);

  // Check on mount to see if the table is already scrolled to the bottom and immediately needs to fetch more data.
  useEffect(() => {
    fetchMoreOnBottomReached(tableContainerRef.current);
  }, [fetchMoreOnBottomReached]);

  const renderBottomToolbarCustomActions = useCallback(
    () =>
      fetchMoreData ? (
        <Typography>Fetched {totalFetchedRows} total rows</Typography>
      ) : (
        <Typography>{totalFetchedRows} rows</Typography>
      ),
    [fetchMoreData, totalFetchedRows]
  );

  // table: MRT_TableInstance<TData>
  const renderTopToolbarCustomActions = useCallback<
    Exclude<
      MaterialReactTableProps<TData>["renderTopToolbarCustomActions"],
      undefined
    >
  >(
    ({ table }) => <>{ToolbarButtons && <ToolbarButtons table={table} />}</>,
    [ToolbarButtons]
  );

  const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});

  useEffect(() => {
    onRowSelectionChangeProp?.(rowSelection);
  }, [onRowSelectionChangeProp, rowSelection]);

  const modifiedState = useMemo(
    () => ({
      ...state,
      rowSelection,
    }),
    [rowSelection, state]
  );

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      enableMultiRowSelection={hasRowSelection}
      enablePagination={false}
      enableRowSelection={hasRowSelection}
      enableRowVirtualization={data.length > 50}
      enableSorting={false}
      getRowId={getRowId}
      initialState={initialState}
      muiTableContainerProps={{
        onScroll: (event: UIEvent<HTMLDivElement>) =>
          fetchMoreOnBottomReached(event.target as HTMLDivElement),
        ref: tableContainerRef,
        sx: { maxHeight: String(500 / 14).concat("rem") },
      }}
      muiToolbarAlertBannerProps={
        hasError
          ? {
              children: "Error loading data.",
              color: "error",
            }
          : undefined
      }
      onColumnFiltersChange={setColumnFilters}
      onGlobalFilterChange={setGlobalFilter}
      onPaginationChange={onPaginationChange}
      onRowSelectionChange={setRowSelection}
      renderBottomToolbarCustomActions={renderBottomToolbarCustomActions}
      renderTopToolbarCustomActions={renderTopToolbarCustomActions}
      rowVirtualizerInstanceRef={rowVirtualizerInstanceRef}
      rowVirtualizerProps={{ overscan: 4 }}
      state={modifiedState}
    />
  );
};

const MemoizedDataGrid = memo(DataGrid) as typeof DataGrid;

export { MemoizedDataGrid as DataGrid };
