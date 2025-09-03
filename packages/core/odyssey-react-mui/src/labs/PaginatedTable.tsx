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

import { AlertProps, CheckboxProps } from "@mui/material";
import {
  MaterialReactTable,
  type MRT_ColumnFiltersState,
  MRT_PaginationState,
  type MRT_RowSelectionState,
  type MRT_TableInstance,
  type MRT_Virtualizer,
  useMaterialReactTable,
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
} from "./materialReactTableTypes.js";

import { Typography } from "../Typography.js";

export type PaginatedTableProps<TData extends DefaultMaterialReactTableData> = {
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
  ToolbarButtons?: FunctionComponent<{ table: MRT_TableInstance<TData> }>;
};

const PaginatedTable = <TData extends DefaultMaterialReactTableData>({
  columns = [],
  data = [],
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
}: PaginatedTableProps<TData>) => {
  const { t } = useTranslation();

  const rowVirtualizerInstanceRef =
    useRef<MRT_Virtualizer<HTMLDivElement, HTMLTableRowElement>>(null);

  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
    [],
  );

  const [globalFilter, setGlobalFilter] = useState<string>();

  useEffect(() => {
    if (globalFilter !== undefined) {
      onGlobalFilterChange?.(globalFilter);
    }
  }, [globalFilter, onGlobalFilterChange]);

  useEffect(() => {
    try {
      // Scroll to top of table when sorting or filters change.
      rowVirtualizerInstanceRef.current?.scrollToIndex?.(0);
    } catch (error) {
      console.error(error);
    }
  }, [columnFilters, globalFilter]);

  const totalFetchedRows = data.length ?? 0;

  const renderBottomToolbarCustomActions = useCallback(
    () =>
      fetchMoreData ? (
        <Typography>
          <Trans
            count={totalFetchedRows}
            i18nKey="table.fetchedrows.text"
            values={{
              totalRows: totalFetchedRows,
            }}
          />
        </Typography>
      ) : (
        <Typography>
          <Trans
            count={totalFetchedRows}
            i18nKey="table.rows.text"
            values={{
              totalRows: totalFetchedRows,
            }}
          />
        </Typography>
      ),
    [fetchMoreData, totalFetchedRows],
  );

  const renderTopToolbarCustomActions = useCallback<
    Exclude<
      MaterialReactTableProps<TData>["renderTopToolbarCustomActions"],
      undefined
    >
  >(
    ({ table }: { table: MRT_TableInstance<TData> }) => (
      <>{ToolbarButtons && <ToolbarButtons table={table} />}</>
    ),
    [ToolbarButtons],
  );

  const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});

  useEffect(() => {
    onRowSelectionChangeProp?.(rowSelection);
  }, [onRowSelectionChangeProp, rowSelection]);

  const [pagination, setPagination] = useState<MRT_PaginationState>(
    initialState?.pagination || {
      pageIndex: 0,
      pageSize: rowsPerPage,
    },
  );

  const dataLengthRef = useRef(data.length);

  const updatePagination = useCallback<
    Required<MaterialReactTableProps<TData>>["onPaginationChange"]
  >(
    (paginationFunction) => {
      if (data.length === dataLengthRef.current) {
        setPagination((previousPagination) => {
          // @ts-expect-error This broke in the upgrade, but this component is legacy and replaced by `DataView`.
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          const nextPagination = paginationFunction(previousPagination);

          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          return nextPagination;
        });
      } else {
        dataLengthRef.current = data.length;
      }
    },
    [data.length],
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
    [initialState, pagination],
  );

  const modifiedState = useMemo(
    () => ({
      pagination: {
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
      },
      rowSelection,
      globalFilter,
      columnFilters,
      ...state,
    }),
    [
      pagination.pageIndex,
      pagination.pageSize,
      rowSelection,
      globalFilter,
      columnFilters,
      state,
    ],
  );

  const muiToolbarAlertBannerProps: AlertProps = useMemo(
    () =>
      hasError
        ? {
            children: t("table.error"),
            severity: "error",
          }
        : {},
    [hasError, t],
  );

  const muiTablePaginationProps = useMemo(
    () => ({
      rowsPerPageOptions: [],
      showFirstButton: false,
      showLastButton: false,
    }),
    [],
  );

  const muiCheckboxStyles = useCallback<
    // @ts-expect-error This breaks after the upgrade, but it doesn't matter as this is a legacy function and internal type.
    NonNullable<Required<CheckboxProps>["sx"]>
  >(
    (theme) =>
      typeof theme.components?.MuiCheckbox?.styleOverrides?.root === "function"
        ? theme.components?.MuiCheckbox?.styleOverrides?.root?.({
            ownerState: {},
            theme,
          })
        : "",
    [],
  );

  const table = useMaterialReactTable({
    columns: columns,
    data: data,
    enableMultiRowSelection: hasRowSelection,
    enablePagination: true,
    enableRowSelection: hasRowSelection,
    enableSorting: false,
    getRowId: getRowId,
    initialState: modifiedInitialState,
    muiSelectAllCheckboxProps: { sx: muiCheckboxStyles },
    muiSelectCheckboxProps: { sx: muiCheckboxStyles },
    muiPaginationProps: muiTablePaginationProps,
    muiToolbarAlertBannerProps: muiToolbarAlertBannerProps,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: updatePagination,
    onRowSelectionChange: setRowSelection,
    renderBottomToolbarCustomActions: renderBottomToolbarCustomActions,
    renderTopToolbarCustomActions: renderTopToolbarCustomActions,
    rowVirtualizerInstanceRef: rowVirtualizerInstanceRef,
    rowVirtualizerOptions: { overscan: 4 },
    state: modifiedState,
  });

  return <MaterialReactTable table={table} />;
};

const MemoizedPaginatedTable = memo(PaginatedTable) as typeof PaginatedTable;

// @ts-expect-error | This is going to error because the component isn't and can't be defined as a `FunctionComponent`, and therefore, doesn't have a `displayName` prop.
MemoizedPaginatedTable.displayName = "PaginatedTable";

export { MemoizedPaginatedTable as PaginatedTable };
