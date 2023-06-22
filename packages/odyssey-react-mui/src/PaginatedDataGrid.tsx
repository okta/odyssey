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

import { AlertProps, TablePaginationProps, Typography } from "@mui/material";
import MaterialReactTable, {
  MRT_PaginationState,
  type MRT_ColumnFiltersState,
  type MRT_RowSelectionState,
  type MRT_TableInstance,
  type MRT_Virtualizer,
} from "material-react-table";
import {
  FunctionComponent,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Trans, useTranslation } from "react-i18next";

import type {
  DefaultMaterialReactTableData,
  MaterialReactTableProps,
} from "./materialReactTableTypes";

export type PaginatedDataGridProps<
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
  onPaginationChange?: MaterialReactTableProps<TData>["onPaginationChange"];
  onRowSelectionChange?: MaterialReactTableProps<TData>["onRowSelectionChange"];
  rowsPerPage?: number;
  state?: MaterialReactTableProps<TData>["state"];
  ToolbarButtons?: FunctionComponent<
    { table: MRT_TableInstance<TData> } & unknown
  >;
};

const PaginatedDataGrid = <TData extends DefaultMaterialReactTableData>({
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
  rowsPerPage = 10,
  state,
  ToolbarButtons,
}: PaginatedDataGridProps<TData>) => {
  const { t } = useTranslation();

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

  useEffect(() => {
    try {
      // Scroll to top of table when sorting or filters change.
      rowVirtualizerInstanceRef.current?.scrollToIndex?.(0);
    } catch (error) {
      console.error(error);
    }
  }, [columnFilters, globalFilter]);

  const renderBottomToolbarCustomActions = useCallback(
    () =>
      fetchMoreData ? (
        <Typography>
          <Trans
            count={totalFetchedRows}
            i18nKey="datagrid.fetchedrows.text"
            values={{
              totalRows: totalFetchedRows,
            }}
          />
        </Typography>
      ) : (
        <Typography>
          <Trans
            count={totalFetchedRows}
            i18nKey="datagrid.rows.text"
            values={{
              totalRows: totalFetchedRows,
            }}
          />
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

  const [pagination, setPagination] = useState<MRT_PaginationState>(
    initialState?.pagination || {
      pageIndex: 0,
      pageSize: rowsPerPage,
    }
  );

  const dataLengthRef = useRef(data.length);

  const updatePagination = useCallback(
    (paginationFunction) => {
      if (data.length === dataLengthRef.current) {
        setPagination((previousPagination) => {
          const nextPagination = paginationFunction(previousPagination);
          return nextPagination;
        });
      } else {
        dataLengthRef.current = data.length;
      }
    },
    [data.length]
  );

  useEffect(() => {
    const numberOfPages = Math.floor(data.length / pagination.pageSize);

    if (!isFetching && pagination.pageIndex > numberOfPages - 1) {
      fetchMoreData?.();
    }
  }, [
    data.length,
    fetchMoreData,
    isFetching,
    pagination.pageIndex,
    pagination.pageSize,
  ]);

  useEffect(() => {
    onPaginationChange?.({
      pageIndex: pagination.pageIndex,
      pageSize: pagination.pageSize,
    });
  }, [onPaginationChange, pagination.pageIndex, pagination.pageSize]);

  const modifiedInitialState = useMemo(
    () => ({
      pagination,
      ...initialState,
    }),
    [initialState, pagination]
  );

  const modifiedState = useMemo(
    () => ({
      ...state,
      pagination: {
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
      },
      rowSelection,
    }),
    [pagination.pageIndex, pagination.pageSize, rowSelection, state]
  );

  const muiToolbarAlertBannerProps: AlertProps = useMemo(
    () =>
      hasError
        ? {
            children: t("datagrid.error"),
            severity: "error",
          }
        : {},
    [hasError, t]
  );

  const muiTablePaginationProps: Partial<
    Omit<TablePaginationProps, "rowsPerPage">
  > = useMemo(
    () => ({
      rowsPerPageOptions: [],
      showFirstButton: false,
      showLastButton: false,
    }),
    []
  );

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      enableMultiRowSelection={hasRowSelection}
      enablePagination
      enableRowSelection={hasRowSelection}
      enableSorting={false}
      getRowId={getRowId}
      initialState={modifiedInitialState}
      muiTablePaginationProps={muiTablePaginationProps}
      muiToolbarAlertBannerProps={muiToolbarAlertBannerProps}
      onColumnFiltersChange={setColumnFilters}
      onGlobalFilterChange={setGlobalFilter}
      onPaginationChange={updatePagination}
      onRowSelectionChange={setRowSelection}
      renderBottomToolbarCustomActions={renderBottomToolbarCustomActions}
      renderTopToolbarCustomActions={renderTopToolbarCustomActions}
      rowVirtualizerInstanceRef={rowVirtualizerInstanceRef}
      rowVirtualizerProps={{ overscan: 4 }}
      state={modifiedState}
    />
  );
};

const MemoizedPaginatedDataGrid = memo(
  PaginatedDataGrid
) as typeof PaginatedDataGrid;

// @ts-expect-error | This is going to error because the component isn't and can't be defined as a `FunctionComponent`, and therefore, doesn't have a `displayName` prop.
MemoizedPaginatedDataGrid.displayName = "PaginatedDataGrid";

export { MemoizedPaginatedDataGrid as PaginatedDataGrid };
