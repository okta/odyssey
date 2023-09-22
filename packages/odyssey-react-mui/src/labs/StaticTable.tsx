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
  MRT_DensityState,
  // type MRT_ColumnFiltersState,
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
import type {
  DefaultMaterialReactTableData,
  MaterialReactTableProps,
} from "./materialReactTableTypes";
import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  DataFilters,
  Dialog,
  Radio,
  RadioGroup,
  SearchField,
} from "..";
import { ArrowDownIcon, FilterIcon, SettingsIcon } from "../icons.generated";
import { Badge } from "@mui/material";

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
  // onGlobalFilterChange,
  state: stateOverride,
  ToolbarButtons,
}: StaticTableProps<TData>) => {
  const { t } = useTranslation();

  const [state, setState] = useState(stateOverride ?? {});

  const rowVirtualizerInstanceRef =
    useRef<MRT_Virtualizer<HTMLDivElement, HTMLTableRowElement>>(null);

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
  }, []);

  const isRowSelectionEnabled = true;

  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
  const [filtersOpen, setFiltersOpen] = useState<boolean>(true);

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
        enableGlobalFilter={true}
        globalFilterFn="contains"
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
        renderTopToolbarCustomActions={renderTopToolbarCustomActions}
        renderTopToolbar={({ table }) => {
          const columns = table
            .getAllColumns()
            .filter((column) => column.columnDef.header !== "Select");

          const visibleColumns = isRowSelectionEnabled
            ? table.getVisibleFlatColumns().length - 1
            : table.getVisibleFlatColumns().length;

          const allFilters = table
            .getVisibleFlatColumns()
            .filter((column, i) => {
              return !(i == 0 && column.columnDef.header === "Select");
            })
            .map((column) => {
              return {
                id: column.id,
                name: column.columnDef.header as string,
                value: state.columnFilters?.find(
                  (item) => item.id === column.id
                )?.value,
              };
            });

          const activeFilters = state.columnFilters?.map((filter) => {
            return {
              id: filter.id,
              name: allFilters.find((column) => column.id === filter.id)?.name,
              value: filter.value,
            };
          });

          const filtersCount = activeFilters?.length ?? 0;

          const changeFilters = ({
            id,
            value,
          }: {
            id: string;
            value: string | number | null | undefined;
          }) => {
            if (value === null) {
              setState({
                ...state,
                columnFilters: activeFilters?.filter(
                  (column) => column.id !== id
                ),
              });
              return;
            }

            let updatedFilters = activeFilters?.map((filter) => {
              if (filter.id === id) {
                return { ...filter, value: value };
              }

              return filter;
            });

            if (!updatedFilters) {
              updatedFilters = [];
            }

            const column = allFilters.find((column) => column.id === id);
            if (!column) {
              return;
            }

            if (!updatedFilters?.some((filter) => filter.id === id)) {
              updatedFilters?.push({
                id: id,
                name: column.name,
                value: value,
              });
            }

            setState({ ...state, columnFilters: updatedFilters });
          };

          const scrubFilters = () => {
            setState({
              ...state,
              columnFilters: activeFilters?.filter(
                (column) => column.value !== "" && column.value !== null
              ),
            });
          };

          return (
            <>
              <Box sx={{ borderBottom: "1px solid #eee", marginBottom: 2 }}>
                <Box
                  sx={{
                    paddingX: 4,
                    paddingY: 2,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Box sx={{ minWidth: 280, width: "50%" }}>
                    <SearchField
                      label="Search table"
                      placeholder="Search..."
                      onClear={() => table.resetGlobalFilter()}
                      onChange={(ev) => {
                        table.setGlobalFilter(ev.target.value);
                      }}
                    />
                  </Box>
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <Badge badgeContent={filtersCount}>
                      <Button
                        variant={filtersCount > 0 ? "secondary" : "tertiary"}
                        endIcon={<FilterIcon />}
                        onClick={() => {
                          setFiltersOpen(!filtersOpen);
                        }}
                        ariaLabel="Open table filters"
                      />
                    </Badge>
                    <Button
                      variant="tertiary"
                      startIcon={<SettingsIcon />}
                      onClick={() => {
                        setSettingsOpen(true);
                      }}
                      ariaLabel="Open table settings"
                    />
                  </Box>
                </Box>

                {filtersOpen && (
                  <Box
                    sx={{
                      borderTop: "1px solid #eee",
                      paddingX: 4,
                      paddingY: 2,
                      display: "flex",
                      gap: 2,
                    }}
                  >
                    <DataFilters
                      allFilters={allFilters}
                      activeFilters={activeFilters}
                      onChange={changeFilters}
                      onClosePopover={scrubFilters}
                    />
                  </Box>
                )}
              </Box>

              <Dialog
                isOpen={settingsOpen}
                title="Table settings"
                onClose={() => {
                  setSettingsOpen(false);
                }}
                ariaLabel="Table settings"
                callToActionFirstComponent={
                  <Button
                    variant="primary"
                    label="Finish"
                    onClick={() => {
                      setSettingsOpen(false);
                    }}
                  />
                }
              >
                <Box sx={{ minWidth: 320 }}>
                  <RadioGroup
                    label="Table density"
                    onChange={(ev) => {
                      setState({
                        density: (ev.target as HTMLInputElement)
                          .value as MRT_DensityState,
                      });
                    }}
                  >
                    <Radio
                      isChecked={
                        state.density === "comfortable" ||
                        state.density === undefined
                      }
                      label="Default"
                      value="comfortable"
                    />
                    <Radio
                      isChecked={state.density === "spacious"}
                      label="Comfortable"
                      value="spacious"
                    />
                    <Radio
                      isChecked={state.density === "compact"}
                      label="Compact"
                      value="compact"
                    />
                  </RadioGroup>
                  <CheckboxGroup
                    label="Visible columns"
                    isRequired
                    hint="At least one column must be visible."
                  >
                    <>
                      {columns.map((column) => (
                        <Checkbox
                          key={column.id}
                          label={column.columnDef.header}
                          isDefaultChecked={column.getIsVisible()}
                          onChange={() => column.toggleVisibility()}
                          isDisabled={
                            column.getIsVisible() && visibleColumns <= 1
                          }
                        />
                      ))}
                    </>
                  </CheckboxGroup>
                </Box>
              </Dialog>
            </>
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
