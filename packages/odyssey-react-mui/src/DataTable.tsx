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
  Dispatch,
  SetStateAction,
  memo,
  useEffect,
  useRef,
  useState,
} from "react";
import { DefaultMaterialReactTableData, MaterialReactTableProps } from "./labs";
import { PopoverProps as MuiPopoverProps } from "@mui/material";
import MaterialReactTable, {
  MRT_DensityState,
  MRT_TableInstance,
  MRT_Virtualizer,
} from "material-react-table";
import { ArrowDownIcon, FilterIcon, SettingsIcon } from "./icons.generated";
import { Box } from "./Box";
import { SearchField } from "./SearchField";
import { Badge, Checkbox } from "@mui/material";
import { Button, ButtonProps } from "./Button";
import { DataFilters, DataFilter } from "./DataFilters";
import { RadioGroup } from "./RadioGroup";
import { Radio } from "./Radio";
import { Dialog } from "./Dialog";
import { CheckboxGroup } from "./CheckboxGroup";
import { TextFieldProps } from "./TextField";

export type DataTableProps<TData extends DefaultMaterialReactTableData> = {
  columns: MaterialReactTableProps<TData>["columns"];
  data: MaterialReactTableProps<TData>["data"];
  getRowId?: MaterialReactTableProps<TData>["getRowId"];
  isColumnResizingEnabled?: boolean;
  isRowSelectionEnabled?: boolean;
};

type DataTableSettingsProps = {
  isSettingsOpen: boolean;
  setSettingsOpen: Dispatch<SetStateAction<boolean>>;
  state: MaterialReactTableProps<DefaultMaterialReactTableData>["state"]; // Assuming DefaultMaterialReactTableData is the default type
  setState: Dispatch<
    SetStateAction<
      MaterialReactTableProps<DefaultMaterialReactTableData>["state"]
    >
  >; // Assuming DefaultMaterialReactTableData is the default type
  columns: MaterialReactTableProps<DefaultMaterialReactTableData>["columns"];
  visibleColumns: MaterialReactTableProps<DefaultMaterialReactTableData>["columns"];
};

const DataTableToolbar = ({
  table,
  isFiltersOpen,
  onToggleFilters,
  onToggleSettings,
  onChangeFilters,
  onClosePopover,
  allFilters,
  activeFilters,
  activeFiltersCount,
}: {
  table: MRT_TableInstance;
  isFiltersOpen: boolean;
  onToggleFilters: ButtonProps["onClick"];
  onToggleSettings: ButtonProps["onClick"];
  onChangeFilters: TextFieldProps["onChange"];
  onClosePopover: MuiPopoverProps["onClose"];
  allFilters: Array<DataFilter>;
  activeFilters: Array<DataFilter>;
  activeFiltersCount: number;
}) => {
  return (
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
          <Badge badgeContent={activeFiltersCount}>
            <Button
              variant={activeFiltersCount > 0 ? "secondary" : "tertiary"}
              endIcon={<FilterIcon />}
              onClick={() => {
                onToggleFilters(!isFiltersOpen);
              }}
              ariaLabel="Open table filters"
            />
          </Badge>
          <Button
            variant="tertiary"
            startIcon={<SettingsIcon />}
            onClick={() => {
              onToggleSettings(true);
            }}
            ariaLabel="Open table settings"
          />
        </Box>
      </Box>

      {isFiltersOpen && (
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
            onChange={onChangeFilters}
            onClosePopover={onClosePopover}
          />
        </Box>
      )}
    </Box>
  );
};

const DataTableSettings = ({
  isSettingsOpen,
  setSettingsOpen,
  state,
  setState,
  columns,
  visibleColumns,
}: DataTableSettingsProps) => {
  return (
    <Dialog
      isOpen={isSettingsOpen}
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
              state?.density === "comfortable" || state?.density === undefined
            }
            label="Default"
            value="comfortable"
          />
          <Radio
            isChecked={state?.density === "spacious"}
            label="Comfortable"
            value="spacious"
          />
          <Radio
            isChecked={state?.density === "compact"}
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
                isDisabled={column.getIsVisible() && visibleColumns <= 1}
              />
            ))}
          </>
        </CheckboxGroup>
      </Box>
    </Dialog>
  );
};

const DataTable = <TData extends DefaultMaterialReactTableData>({
  columns,
  data,
  getRowId,
  isColumnResizingEnabled,
  isRowSelectionEnabled,
}: DataTableProps<TData>) => {
  const [state, setState] = useState<MaterialReactTableProps<TData>["state"]>(
    {}
  );
  const rowVirtualizerInstanceRef =
    useRef<MRT_Virtualizer<HTMLDivElement, HTMLTableRowElement>>(null);
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
  const [filtersOpen, setFiltersOpen] = useState<boolean>(true);

  useEffect(() => {
    try {
      // Scroll to top of table when sorting or filters change.
      rowVirtualizerInstanceRef.current?.scrollToIndex?.(0);
    } catch (error) {
      console.error(error);
    }
  }, []);
  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      rowVirtualizerInstanceRef={rowVirtualizerInstanceRef}
      rowVirtualizerProps={{ overscan: 4 }}
      state={state}
      muiTableBodyCellProps={{
        className: `MuiTableCell-${state?.density ?? "comfortable"}`,
      }}
      muiTableHeadCellProps={{
        className: `MuiTableCell-${state?.density ?? "comfortable"}`,
      }}
      enableBottomToolbar={false}
      enableColumnResizing={isColumnResizingEnabled}
      enableDensityToggle={false}
      enableFullScreenToggle={false}
      enablePagination={false}
      enableRowVirtualization={data.length > 50}
      enableRowSelection={isRowSelectionEnabled}
      enableColumnActions={false}
      enableGlobalFilter={true}
      globalFilterFn="contains"
      getRowId={getRowId}
      icons={{ ArrowDownwardIcon: ArrowDownIcon }}
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
              value: state.columnFilters?.find((item) => item.id === column.id)
                ?.value,
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
          value: string | undefined;
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
            <DataTableToolbar
              table={table}
              isFiltersOpen={filtersOpen}
              onToggleFilters={setFiltersOpen}
              onToggleSettings={setSettingsOpen}
              onChangeFilters={changeFilters}
              onClosePopover={scrubFilters}
              allFilters={allFilters}
              activeFilters={activeFilters}
              activeFiltersCount={filtersCount}
            />
            <DataTableSettings
              isSettingsOpen={settingsOpen}
              setSettingsOpen={setSettingsOpen}
              state={state}
              setState={setState}
              columns={columns}
              visibleColumns={visibleColumns}
            />
          </>
        );
      }}
    />
  );
};

const MemoizedDataTable = memo(DataTable) as typeof DataTable;
export { MemoizedDataTable as DataTable };
