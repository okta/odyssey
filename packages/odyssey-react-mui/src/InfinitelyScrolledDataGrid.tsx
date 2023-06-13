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
  type MRT_ColumnFiltersState,
  type MRT_RowSelectionState,
  type MRT_TableInstance,
  type MRT_Virtualizer,
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
import { useTranslation } from "react-i18next";

export type DefaultMaterialReactTableData = Record<string, unknown>;

export type MaterialReactTableProps<
  TData extends DefaultMaterialReactTableData
> = Parameters<typeof MaterialReactTable<TData>>[0];

export type InfinitelyScrolledDataGridProps<
  TData extends DefaultMaterialReactTableData
> = {
  columns: MaterialReactTableProps<TData>["columns"];
  data: MaterialReactTableProps<TData>["data"];
  fetchMoreData?: () => void;
  getRowId?: MaterialReactTableProps<TData>["getRowId"];
  hasError?: boolean;
  hasRowSelection?: boolean;
  initialState?: MaterialReactTableProps<TData>["initialState"];
  isFetching?: boolean;
  onGlobalFilterChange?: MaterialReactTableProps<TData>["onGlobalFilterChange"];
  onRowSelectionChange?: MaterialReactTableProps<TData>["onRowSelectionChange"];
  // rowsPerPageOptions?: MaterialReactTableProps<TData>["muiTablePaginationProps"]['rowsPerPageOptions'];
  state?: MaterialReactTableProps<TData>["state"];
  ToolbarButtons?: FunctionComponent<
    { table: MRT_TableInstance<TData> } & unknown
  >;
};

// Once the user has scrolled within this many pixels of the bottom of the table, fetch more data if we can.
const scrollAmountBeforeFetchingData = 400;

const InfinitelyScrolledDataGrid = <
  TData extends DefaultMaterialReactTableData
>({
  columns,
  data,
  fetchMoreData,
  getRowId,
  hasError,
  hasRowSelection,
  initialState,
  isFetching,
  onGlobalFilterChange,
  onRowSelectionChange: onRowSelectionChangeProp,
  state,
  ToolbarButtons,
}: InfinitelyScrolledDataGridProps<TData>) => {
  const { t } = useTranslation();

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
        <Typography>
          {t("datagrid.fetchedrows.text", String(totalFetchedRows))}
        </Typography>
      ) : (
        <Typography>
          {t("datagrid.rows.text", String(totalFetchedRows))}
        </Typography>
      ),
    [fetchMoreData, totalFetchedRows]
  );

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
              children: t("datagrid.error"),
              color: "error",
            }
          : undefined
      }
      onColumnFiltersChange={setColumnFilters}
      onGlobalFilterChange={setGlobalFilter}
      onRowSelectionChange={setRowSelection}
      renderBottomToolbarCustomActions={renderBottomToolbarCustomActions}
      renderTopToolbarCustomActions={renderTopToolbarCustomActions}
      rowVirtualizerInstanceRef={rowVirtualizerInstanceRef}
      rowVirtualizerProps={{ overscan: 4 }}
      state={modifiedState}
    />
  );
};

const MemoizedInfinitelyScrolledDataGrid = memo(
  InfinitelyScrolledDataGrid
) as typeof InfinitelyScrolledDataGrid;

export { MemoizedInfinitelyScrolledDataGrid as InfinitelyScrolledDataGrid };
