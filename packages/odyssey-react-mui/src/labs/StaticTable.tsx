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

import MaterialReactTable, {
  type MRT_ColumnFiltersState,
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
import { useTranslation } from "react-i18next";

import type {
  DefaultMaterialReactTableData,
  MaterialReactTableProps,
} from "./materialReactTableTypes";

export type StaticTableProps<TData extends DefaultMaterialReactTableData> = {
  columns: MaterialReactTableProps<TData>["columns"];
  data: MaterialReactTableProps<TData>["data"];
  getRowId?: MaterialReactTableProps<TData>["getRowId"];
  hasError?: boolean;
  initialState?: MaterialReactTableProps<TData>["initialState"];
  onGlobalFilterChange?: MaterialReactTableProps<TData>["onGlobalFilterChange"];
  state?: MaterialReactTableProps<TData>["state"];
  ToolbarButtons?: FunctionComponent<
    { table: MRT_TableInstance<TData> } & unknown
  >;
};

const StaticTable = <TData extends DefaultMaterialReactTableData>({
  columns,
  data,
  getRowId,
  hasError,
  initialState,
  onGlobalFilterChange,
  state,
  ToolbarButtons,
}: StaticTableProps<TData>) => {
  const { t } = useTranslation();

  const rowVirtualizerInstanceRef =
    useRef<MRT_Virtualizer<HTMLDivElement, HTMLTableRowElement>>(null);

  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
    []
  );

  const [globalFilter, setGlobalFilter] = useState<string>();

  useEffect(() => {
    if (globalFilter !== undefined) {
      onGlobalFilterChange?.(globalFilter);
    }
  }, [globalFilter, onGlobalFilterChange]);

  const modifiedState = useMemo(
    () => ({
      ...state,
      globalFilter,
      columnFilters
    }),
    [globalFilter, columnFilters, state]
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

  useEffect(() => {
    try {
      // Scroll to top of table when sorting or filters change.
      rowVirtualizerInstanceRef.current?.scrollToIndex?.(0);
    } catch (error) {
      console.error(error);
    }
  }, [columnFilters, globalFilter]);

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      enableBottomToolbar={false}
      enablePagination={false}
      enableRowVirtualization={data.length > 50}
      enableSorting={false}
      getRowId={getRowId}
      initialState={initialState}
      muiToolbarAlertBannerProps={
        hasError
          ? {
              children: t("table.error"),
              color: "error",
            }
          : undefined
      }
      onColumnFiltersChange={setColumnFilters}
      onGlobalFilterChange={setGlobalFilter}
      renderTopToolbarCustomActions={renderTopToolbarCustomActions}
      rowVirtualizerInstanceRef={rowVirtualizerInstanceRef}
      rowVirtualizerProps={{ overscan: 4 }}
      state={modifiedState}
    />
  );
};

const MemoizedStaticTable = memo(StaticTable) as typeof StaticTable;

export { MemoizedStaticTable as StaticTable };
