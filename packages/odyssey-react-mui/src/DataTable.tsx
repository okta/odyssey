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

import { ReactElement, memo, useEffect, useRef, useState } from "react";
import { DefaultMaterialReactTableData, MaterialReactTableProps } from "./labs";
import MaterialReactTable, {
  MRT_ColumnFiltersState,
  MRT_DensityState,
  MRT_SortingState,
  MRT_TableInstance,
  MRT_Virtualizer,
} from "material-react-table";
import {
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  SettingsIcon,
} from "./icons.generated";
import { Box } from "./Box";
import { DataFilter, DataFilters } from "./DataFilters";
import { Button } from "./Button";
import { Support } from "./Typography";
import { Callout } from "./Callout";
import { MenuButton } from "./MenuButton";
import { Dialog } from "./Dialog";
import { RadioGroup } from "./RadioGroup";
import { Radio } from "./Radio";
import { CheckboxGroup } from "./CheckboxGroup";
import { Checkbox } from "./Checkbox";

export const paginationTypeValues = ["paged", "loadMore"] as const;
export const densityValues = ["comfortable", "spacious", "compact"] as const;

export type DataTableProps<TData extends DefaultMaterialReactTableData> = {
  // Table parameters
  columns: MaterialReactTableProps<TData>["columns"];
  data: MaterialReactTableProps<TData>["data"];
  defaultDensity?: (typeof densityValues)[number];
  getRowId?: MaterialReactTableProps<TData>["getRowId"];

  // Table features
  hasChangeableDensity?: boolean;
  hasColumnResizing?: boolean;
  hasColumnVisibility?: boolean;
  hasFilters?: boolean;
  hasPagination?: boolean;
  hasRowSelection?: boolean;
  hasSearch?: boolean;
  hasSorting?: boolean;
  paginationType?: (typeof paginationTypeValues)[number];

  // Slots
  bulkActions?: (table: MRT_TableInstance) => ReactElement | ReactElement[];
  bulkMenuItems?: (table: MRT_TableInstance) => ReactElement | ReactElement[];

  // Table state
  errorMessage?: string;
  page?: number;
  resultsPerPage?: number;
  totalResults?: number;

  // Manual data
  manualData?: boolean;
  onFetchData?: ({
    page,
    resultsPerPage,
    filters,
    search,
    sort,
  }: {
    page?: number;
    resultsPerPage?: number;
    filters?: MRT_ColumnFiltersState;
    search?: string;
    sort?: MRT_SortingState;
  }) => TData;
};

const DataTable = <TData extends DefaultMaterialReactTableData>({
  columns,
  data: dataProp,
  defaultDensity = "comfortable",
  getRowId,
  hasChangeableDensity,
  hasColumnResizing,
  hasColumnVisibility,
  hasFilters,
  hasPagination,
  hasSorting,
  paginationType = "paged",
  hasRowSelection = false,
  hasSearch,
  errorMessage: errorMessageProp,
  page: pageProp = 1,
  resultsPerPage = 20,
  totalResults: totalResultsProp,
  manualData,
  onFetchData,
  bulkActions,
  bulkMenuItems,
}: DataTableProps<TData>) => {
  const [tableState, setTableState] = useState<
    MaterialReactTableProps<TData>["state"]
  >({
    density: defaultDensity,
  });

  const [data, setData] =
    useState<MaterialReactTableProps<TData>["data"]>(dataProp);

  const [page, setPage] = useState<number>(pageProp);
  const [limit, setLimit] = useState<number>(resultsPerPage);
  const [totalResults, setTotalResults] = useState<number | undefined>(
    totalResultsProp
  );
  console.log(setTotalResults);
  const [errorMessage, setErrorMessage] = useState<string | null | undefined>(
    errorMessageProp
  );
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const tableRef = useRef<HTMLTableElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isTableNarrow, setIsTableNarrow] = useState<boolean>(false);

  const debouncer = useRef<NodeJS.Timeout | undefined>(undefined);
  const debounce = (fn: () => void) => {
    if (debouncer.current) {
      clearTimeout(debouncer.current);
    }

    debouncer.current = setTimeout(() => {
      fn();
    });
  };

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current && tableRef.current) {
        setIsTableNarrow(false);

        const containerWidth = containerRef.current.offsetWidth ?? 0;
        const tableWidth = tableRef.current.offsetWidth ?? 0;

        setIsTableNarrow(tableWidth < containerWidth);
      }
    };

    const debouncedHandleResize = () => debounce(handleResize);

    // Initial check
    handleResize();

    // Attach event listener for window resize and component mount
    window.addEventListener("resize", debouncedHandleResize);
    tableRef.current?.addEventListener("resize", debouncedHandleResize);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", debouncedHandleResize);
      tableRef.current?.removeEventListener("resize", debouncedHandleResize);
    };
  }, []);

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

  const updateFilters = (updatedFilters: DataFilter[]) => {
    const filters = updatedFilters
      .map((filter) => {
        return {
          id: filter.id,
          value: filter.value,
        };
      })
      .filter((filter) => filter.value);

    setTableState({
      ...tableState,
      columnFilters: filters,
    });
  };

  useEffect(() => {
    if (onFetchData) {
      const fetchData = async () => {
        setTableState({ ...tableState, isLoading: true });
        try {
          const incomingData = await onFetchData({
            page: page,
            resultsPerPage: limit,
            filters: tableState?.columnFilters,
            search: tableState?.globalFilter,
            sort: tableState?.sorting,
          });
          setData(incomingData);
        } catch (error) {
          setErrorMessage(error as string);
          console.log(error);
          return;
        }
        setErrorMessage(null);
        setTableState({ ...tableState, isLoading: false });
      };
      fetchData();
    }
  }, [
    page,
    limit,
    tableState?.columnFilters,
    tableState?.globalFilter,
    tableState?.sorting,
  ]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      {errorMessage && (
        <Box>
          <Callout role="alert" severity="error">
            {errorMessage}
          </Callout>
        </Box>
      )}

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
        muiTableContainerProps={{
          ref: containerRef,
        }}
        muiTableProps={{
          ref: tableRef,

          className: isTableNarrow ? "narrow" : "",
        }}
        renderTopToolbar={({ table }) => (
          <>
            <DataFilters
              filters={hasFilters ? filters : undefined}
              onChangeFilters={updateFilters}
              onChangeSearch={
                hasSearch
                  ? (value: string) => table.setGlobalFilter(value)
                  : undefined
              }
              onClearSearch={
                hasSearch ? () => table.resetGlobalFilter() : undefined
              }
              actions={
                (hasChangeableDensity || hasColumnVisibility) && (
                  <Button
                    variant="tertiary"
                    endIcon={<SettingsIcon />}
                    ariaLabel="Table settings"
                    onClick={() => setIsSettingsOpen(true)}
                  />
                )
              }
            />

            {(table.getIsSomeRowsSelected() || table.getIsAllRowsSelected()) &&
              (bulkActions || bulkMenuItems) && (
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    alignItems: "center",
                    marginBottom: 4,
                    paddingTop:
                      hasFilters ||
                      hasSearch ||
                      hasChangeableDensity ||
                      hasColumnVisibility
                        ? 4
                        : null,
                    borderTop:
                      hasFilters ||
                      hasSearch ||
                      hasChangeableDensity ||
                      hasColumnVisibility
                        ? "1px solid"
                        : null,
                    borderColor:
                      hasFilters ||
                      hasSearch ||
                      hasChangeableDensity ||
                      hasColumnVisibility
                        ? "#e1e1e1"
                        : null,
                  }}
                >
                  {bulkMenuItems && (
                    <MenuButton
                      buttonVariant="secondary"
                      size="small"
                      buttonLabel={`${
                        table.getIsAllRowsSelected() ? "All " : ""
                      }${table.getSelectedRowModel().rows.length} row${
                        table.getSelectedRowModel().rows.length !== 1 ? "s" : ""
                      }`}
                    >
                      {bulkMenuItems?.(table)}
                    </MenuButton>
                  )}

                  {!bulkMenuItems && bulkActions && (
                    <Support component="span">
                      {`${table.getIsAllRowsSelected() ? "All " : ""}${
                        table.getSelectedRowModel().rows.length
                      } row${
                        table.getSelectedRowModel().rows.length !== 1 ? "s" : ""
                      }`}
                      :
                    </Support>
                  )}

                  {bulkActions && <Box>{bulkActions?.(table)}</Box>}
                </Box>
              )}
          </>
        )}
        enableColumnResizing={hasColumnResizing}
        enableDensityToggle={false}
        enableFullScreenToggle={false}
        enablePagination={false}
        enableRowVirtualization={data.length > 50}
        enableRowSelection={hasRowSelection}
        enableSorting={hasSorting}
        selectAllMode="all"
        enableColumnActions={false}
        enableGlobalFilter={true}
        manualFiltering={manualData}
        manualSorting={manualData}
        manualPagination={true}
        globalFilterFn="contains"
        getRowId={getRowId}
        icons={{ ArrowDownwardIcon: ArrowDownIcon }}
        renderBottomToolbar={({ table }) => (
          <Dialog
            isOpen={isSettingsOpen}
            onClose={() => setIsSettingsOpen(false)}
            title="Table settings"
            ariaLabel="Table settings"
            callToActionFirstComponent={
              <Button
                variant="primary"
                label="Finish"
                onClick={() => {
                  setIsSettingsOpen(false);
                }}
              />
            }
          >
            <Box sx={{ minWidth: 320 }}>
              {hasChangeableDensity && (
                <RadioGroup
                  label="Table density"
                  onChange={(ev) => {
                    setTableState({
                      density: (ev.target as HTMLInputElement)
                        .value as MRT_DensityState,
                    });
                  }}
                >
                  {densityValues.map((density: string) => (
                    <Radio
                      isChecked={tableState?.density === density}
                      key={density}
                      label={`${density.charAt(0).toUpperCase()}${density.slice(
                        1
                      )}`}
                      value={density}
                    />
                  ))}
                </RadioGroup>
              )}
              {hasColumnVisibility && (
                <CheckboxGroup
                  label="Visible columns"
                  isRequired
                  hint="At least one column must be visible."
                >
                  <>
                    {table
                      .getAllColumns()
                      .filter(
                        (column, i) =>
                          column.columnDef.header !== "Select" && i !== 0
                      )
                      .map((column) => (
                        <Checkbox
                          key={column.id}
                          label={column.columnDef.header}
                          isDefaultChecked={column.getIsVisible()}
                          onChange={() => column.toggleVisibility()}
                          isDisabled={
                            column.getIsVisible() &&
                            table
                              .getVisibleFlatColumns()
                              .filter(
                                (column, i) =>
                                  column.columnDef.header !== "Select" &&
                                  i !== 0
                              ).length <= 1
                          }
                        />
                      ))}
                  </>
                </CheckboxGroup>
              )}
            </Box>
          </Dialog>
        )}
      />

      {hasPagination && paginationType === "paged" && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
          <Button
            isDisabled={page === 1}
            variant="tertiary"
            ariaLabel="Previous"
            startIcon={<ArrowLeftIcon />}
            onClick={() => setPage(page - 1)}
          />
          <Box sx={{ minWidth: `${"Page 999".length}ch`, textAlign: "center" }}>
            <Support color="textSecondary" component="span">
              Page {page}
            </Support>
          </Box>
          <Button
            isDisabled={
              totalResults
                ? page >= totalResults / resultsPerPage
                : data.length === 0
            }
            variant="tertiary"
            ariaLabel="Next"
            endIcon={<ArrowRightIcon />}
            onClick={() => setPage(page + 1)}
          />
        </Box>
      )}

      {hasPagination && paginationType === "loadMore" && (
        <Box sx={{}}>
          <Button
            variant="tertiary"
            ariaLabel="Load more"
            label="Load more"
            onClick={() => setLimit(limit + resultsPerPage)}
          />
        </Box>
      )}
    </Box>
  );
};

const MemoizedDataTable = memo(DataTable) as typeof DataTable;
export { MemoizedDataTable as DataTable };
