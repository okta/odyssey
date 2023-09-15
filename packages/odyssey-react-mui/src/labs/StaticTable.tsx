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
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { Checkbox as MuiCheckbox } from "@mui/material";
import type {
  DefaultMaterialReactTableData,
  MaterialReactTableProps,
} from "./materialReactTableTypes";
import { Box, Button, MenuButton, MenuItem } from "..";
import { ArrowDownIcon } from "../icons.generated";

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
  state: stateOverride,
  ToolbarButtons,
}: StaticTableProps<TData>) => {
  const { t } = useTranslation();

  const [state, setState] = useState(stateOverride ?? {});

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

  const isRowSelectionEnabled = true;

  return (
    <>
      <MaterialReactTable
        columns={columns}
        data={data}
        enableBottomToolbar={false}
        enableColumnResizing={true}
        enableDensityToggle={false}
        enableFullScreenToggle={false}
        enablePagination={false}
        enableRowVirtualization={data.length > 50}
        enableRowSelection={isRowSelectionEnabled}
        enableColumnActions={false}
        enableFilters={false}
        getRowId={getRowId}
        icons={{
          ArrowDownwardIcon: ArrowDownIcon,
        }}
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
        renderTopToolbar={({ table }) => {
          const columns = table
            .getAllColumns()
            .filter((column) => column.columnDef.header !== "Select");

          const totalColumns = columns.length;
          const visibleColumns = isRowSelectionEnabled
            ? table.getVisibleFlatColumns().length - 1
            : table.getVisibleFlatColumns().length;
          const hiddenColumns = totalColumns - visibleColumns;
          let columnVisibilityLabel = "";

          if (hiddenColumns === 0) {
            columnVisibilityLabel = "Show/hide columns";
          } else if (hiddenColumns === totalColumns) {
            columnVisibilityLabel = "All columns hidden";
          } else if (hiddenColumns === 1) {
            columnVisibilityLabel = "1 column hidden";
          } else {
            columnVisibilityLabel = `${hiddenColumns} columns hidden`;
          }

          return (
            <Box sx={{ padding: 4, display: "flex", gap: 2 }}>
              <MenuButton
                ariaLabel="Choose table density"
                buttonLabel="Density"
                buttonVariant="tertiary"
                size="small"
              >
                <MenuItem
                  isSelected={
                    state.density === "comfortable" ||
                    state.density === undefined
                  }
                  onClick={() => setState({ density: "comfortable" })}
                >
                  <MuiCheckbox
                    checked={
                      state.density === "comfortable" ||
                      state.density === undefined
                    }
                  />
                  Default
                </MenuItem>
                <MenuItem
                  isSelected={state.density === "spacious"}
                  onClick={() => setState({ density: "spacious" })}
                >
                  <MuiCheckbox checked={state.density === "spacious"} />
                  Comfortable
                </MenuItem>
                <MenuItem
                  isSelected={state.density === "compact"}
                  onClick={() => setState({ density: "compact" })}
                >
                  <MuiCheckbox checked={state.density === "compact"} />
                  Compact
                </MenuItem>
              </MenuButton>

              <MenuButton
                ariaLabel="Choose columns to hide"
                buttonLabel={columnVisibilityLabel}
                buttonVariant="tertiary"
                size="small"
              >
                <Box>
                  <Button
                    onClick={() => table.toggleAllColumnsVisible(true)}
                    label="Show all"
                    variant="secondary"
                    isDisabled={hiddenColumns === 0}
                  />
                  <Button
                    onClick={() => table.toggleAllColumnsVisible(false)}
                    label="Hide all"
                    variant="secondary"
                    isDisabled={hiddenColumns === totalColumns}
                  />
                </Box>
                <>
                  {columns.map((column) => (
                    <MenuItem
                      isSelected={column.getIsVisible()}
                      onClick={() => column.toggleVisibility()}
                      key={column.id}
                    >
                      <MuiCheckbox checked={column.getIsVisible()} />
                      {column.columnDef.header}
                    </MenuItem>
                  ))}
                </>
              </MenuButton>
            </Box>
          );
        }}
        rowVirtualizerInstanceRef={rowVirtualizerInstanceRef}
        rowVirtualizerProps={{ overscan: 4 }}
        state={state}
        muiTableBodyCellProps={{
          className: `MuiTableCell-${state.density ?? "comfortable"}`,
        }}
        muiTableHeadCellProps={{
          className: `MuiTableCell-${state.density ?? "comfortable"}`,
        }}
      />
    </>
  );
};

const MemoizedStaticTable = memo(StaticTable) as typeof StaticTable;

export { MemoizedStaticTable as StaticTable };
