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
  MRT_Updater,
  MRT_Virtualizer,
  MRT_RowData,
  MRT_TableOptions,
  useMaterialReactTable,
  MRT_SortingState,
  MRT_DensityState,
  MRT_VisibilityState,
  MRT_TableContainer,
  MRT_RowSelectionState,
  MRT_Row,
  MRT_ColumnDef,
  MRT_ColumnFiltersState,
} from "material-react-table";
import {
  Fragment,
  ReactElement,
  memo,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  ArrowTopIcon,
  ArrowBottomIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  DragIndicatorIcon,
  ListIcon,
  ShowIcon,
  MoreIcon,
} from "../icons.generated";
import { Checkbox as MuiCheckbox } from "@mui/material";
import {
  DataTablePagination,
  paginationTypeValues,
} from "./DataTablePagination";
import {
  DataFilter,
  DataFilters,
  dataFilterVariantValues,
} from "./DataFilters";
import { Button } from "../Button";
import { Box } from "../Box";
import { MenuButton, MenuItem } from "..";
import { ArrowUnsortedIcon } from "../icons.generated";

export const densityValues = ["comfortable", "spacious", "compact"] as const;

export type {
  MRT_ColumnFiltersState,
  MRT_SortingState,
} from "material-react-table";

export type DataColumn = {
  accessorKey: string;
  header: string;
  Cell?: MRT_ColumnDef<MRT_RowData>["Cell"];
  filterVariant?: MRT_ColumnDef<MRT_RowData>["filterVariant"];
  filterControl?: (typeof dataFilterVariantValues)[number];
  filterSelectOptions?: Array<{ label: string; value: string }>;
  size?: number;
  minSize?: number;
  maxSize?: number;
  enableColumnFilter?: boolean;
  enableGlobalFilter?: boolean;
  enableSorting?: boolean;
  enableResizing?: boolean;
  enableHiding?: boolean;
};

export type DataTableProps = {
  columns: DataColumn[];
  data: MRT_TableOptions<MRT_RowData>["data"];
  totalRows?: number;
  getRowId?: MRT_TableOptions<MRT_RowData>["getRowId"];
  initialDensity?: (typeof densityValues)[number];

  hasChangeableDensity?: boolean;
  hasColumnResizing?: boolean;
  hasColumnVisibility?: boolean;
  hasFilters?: boolean;
  hasPagination?: boolean;
  hasRowSelection?: boolean;
  hasSearch?: boolean;
  hasSorting?: boolean;
  hasRowReordering?: boolean;

  searchOnSubmit?: boolean;
  onRowSelectionChange?: (rowSelection: MRT_RowSelectionState) => void;

  fetchDataFn: ({
    page,
    resultsPerPage,
    search,
    filters,
    sort,
  }: {
    page?: number;
    resultsPerPage?: number;
    search?: string;
    filters?: MRT_ColumnFiltersState;
    sort?: MRT_SortingState;
  }) => MRT_TableOptions<MRT_RowData>["data"];
  reorderDataFn: ({
    rowId,
    newIndex,
  }: {
    rowId: string;
    newIndex: number;
  }) => void;

  page?: number;
  resultsPerPage?: number;
  paginationType?: (typeof paginationTypeValues)[number];
  rowActionButtons?: (
    row: MRT_RowData
  ) => ReactElement<typeof Button | typeof Fragment>;
  rowActionMenuItems?: (
    row: MRT_RowData
  ) => ReactElement<typeof MenuItem | typeof Fragment>;
};

const DataTable = ({
  columns,
  data: dataProp,
  getRowId,
  page: pageProp = 1,
  initialDensity = densityValues[0],
  resultsPerPage: resultsPerPageProp = 20,
  fetchDataFn,
  reorderDataFn,
  totalRows,
  searchOnSubmit,
  paginationType = "paged",
  onRowSelectionChange,
  rowActionButtons,
  rowActionMenuItems,
  hasChangeableDensity,
  hasColumnResizing,
  hasColumnVisibility,
  hasFilters,
  hasPagination,
  hasRowReordering,
  hasRowSelection,
  hasSearch,
  hasSorting,
}: DataTableProps) => {
  const [draggingRow, setDraggingRow] = useState<MRT_Row<MRT_RowData> | null>();
  const [showSkeletons, setShowSkeletons] = useState<boolean>(true);
  const [data, setData] =
    useState<MRT_TableOptions<MRT_RowData>["data"]>(dataProp);
  const [page, setPage] = useState<number>(pageProp);
  const [resultsPerPage, setResultsPerPage] =
    useState<number>(resultsPerPageProp);
  const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});
  const [sorting, setSorting] = useState<MRT_SortingState>([]);
  const [density, setDensity] = useState<MRT_DensityState>(initialDensity);
  const [columnVisibility, setColumnVisibility] = useState<MRT_VisibilityState>(
    columns.reduce((acc, column) => {
      acc[column.accessorKey as string] = true;
      return acc;
    }, {} as MRT_VisibilityState)
  );
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [filters, setFilters] = useState<Array<DataFilter>>();

  const refreshData = async () => {
    setShowSkeletons(true);
    try {
      const newData = await fetchDataFn({
        page: page,
        resultsPerPage: resultsPerPage,
        sort: sorting,
        search: globalFilter,
        filters: filters,
      });

      setData(newData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSortingChange = (updater: MRT_Updater<MRT_SortingState>) => {
    setSorting((prevSorting) =>
      updater instanceof Function ? updater(prevSorting) : sorting
    );
  };

  const handleColumnVisibility = (columnId: string) => {
    setColumnVisibility((prevVisibility) => ({
      ...prevVisibility,
      [columnId]: !columnVisibility[columnId],
    }));
  };

  const handleSearch = (value: string) => {
    setGlobalFilter(value);
  };

  const handleFilters = (updatedFilters: Array<DataFilter>) => {
    setFilters(updatedFilters);
  };

  const handleRowSelectionChange = (
    updater: MRT_Updater<MRT_RowSelectionState>
  ) => {
    setRowSelection((prevRowSelection) =>
      updater instanceof Function ? updater(prevRowSelection) : rowSelection
    );
  };

  const handleReordering = ({
    rowId,
    newIndex,
  }: {
    rowId: string;
    newIndex: number;
  }) => {
    if (newIndex < 0) {
      return;
    }

    if (totalRows && newIndex > totalRows) {
      return;
    }

    reorderDataFn({ rowId: rowId, newIndex: newIndex });
    refreshData();
  };

  useEffect(() => {
    setShowSkeletons(false);
  }, [data]);

  useEffect(() => {
    refreshData();
  }, [page, resultsPerPage, sorting, globalFilter, filters, refreshData]);

  useEffect(() => {
    onRowSelectionChange?.(rowSelection);
  }, [rowSelection, onRowSelectionChange]);

  const rowVirtualizerInstanceRef =
    useRef<MRT_Virtualizer<HTMLDivElement, HTMLTableRowElement>>(null);

  const table = useMaterialReactTable({
    columns: columns,
    data: data,
    state: {
      density,
      sorting,
      globalFilter,
      columnVisibility,
      rowSelection,
      showSkeletons,
    },
    rowVirtualizerInstanceRef: rowVirtualizerInstanceRef,
    rowVirtualizerOptions: { overscan: 4 },
    enableRowVirtualization:
      paginationType === "loadMore" || resultsPerPage > 50,
    enableColumnResizing: hasColumnResizing,
    enableDensityToggle: false,
    enableFullScreenToggle: false,
    enablePagination: false,
    enableRowSelection: hasRowSelection,
    enableFilters: false,
    enableHiding: false,
    enableRowOrdering: hasRowReordering,
    enableRowDragging: hasRowReordering,
    enableSorting: hasSorting,
    selectAllMode: "all",
    enableColumnActions: false,
    layoutMode: "grid-no-grow",
    displayColumnDefOptions: {
      "mrt-row-actions": {
        muiTableBodyCellProps: {
          align: "right",
          sx: {
            overflow: "visible",
            width: "unset",
          },
        },
        muiTableHeadCellProps: {
          align: "right",
          sx: {
            width: "unset",
            // TODO: Make the right padding here 16px (and possibly adapt it to the density padding)
          },
        },
      },
      "mrt-row-drag": {
        header: "",
        muiTableBodyCellProps: {
          sx: {
            minWidth: 0,
            width: 32,
          },
        },
        muiTableHeadCellProps: {
          sx: {
            minWidth: 0,
            width: 32,
          },
        },
      },
    },
    enableGlobalFilter: false,
    manualFiltering: true,
    manualSorting: true,
    getRowId: getRowId,
    icons: {
      ArrowDownwardIcon: ArrowDownIcon,
      DragHandleIcon: DragIndicatorIcon,
      SyncAltIcon: ArrowUnsortedIcon,
    },
    onSortingChange: handleSortingChange,
    onRowSelectionChange: handleRowSelectionChange,
    enableRowActions:
      hasRowReordering || rowActionButtons || rowActionMenuItems ? true : false,
    positionActionsColumn: "last",

    muiTableHeadCellProps: ({ column }) => ({
      className: sorting.find((item) => item.id === column.id)
        ? "isSorted"
        : "isUnsorted",
    }),

    muiTableBodyRowProps: ({ table, row }) => ({
      className:
        draggingRow?.id === row.id && table.getState().hoveredRow?.id !== row.id
          ? "isDragging"
          : table.getState().hoveredRow?.id === row.id &&
            draggingRow?.id !== row.id
          ? "isDragTarget"
          : draggingRow?.id === row.id &&
            table.getState().hoveredRow?.id === row.id
          ? "isDragging isDragTarget"
          : undefined,
    }),

    muiRowDragHandleProps: {
      tabIndex: -1,
      onDragEnd: () => {
        const cols = table.getAllColumns();
        cols[0].toggleVisibility();

        const { draggingRow, hoveredRow } = table.getState();
        if (draggingRow) {
          handleReordering({
            rowId: draggingRow.id,
            newIndex: (hoveredRow as MRT_RowData).index,
          });
        }

        setDraggingRow(null);
      },

      onDragCapture: () => {
        if (!draggingRow && table.getState().draggingRow?.id) {
          setDraggingRow(table.getState().draggingRow);
        }
      },
    },

    renderRowActions: ({ row }) => {
      const currentIndex = row.index + (page - 1) * resultsPerPage;

      return (
        <>
          {hasRowReordering ? (
            <div className="DataTableRowActions-root">
              <div className="DataTableRowActions-hoverActions">
                <div className="DataTableRowActions-reorderButtons">
                  <Button
                    endIcon={<ArrowTopIcon />}
                    isDisabled={currentIndex <= 0}
                    ariaLabel="Move to top"
                    tooltipText="Move to start"
                    variant="floating"
                    size="small"
                    onClick={() =>
                      handleReordering({ rowId: row.id, newIndex: 0 })
                    }
                  />
                  <Button
                    endIcon={<ArrowUpIcon />}
                    isDisabled={currentIndex <= 0}
                    ariaLabel="Move up one position"
                    tooltipText="Move up one position"
                    variant="floating"
                    size="small"
                    onClick={() =>
                      handleReordering({
                        rowId: row.id,
                        newIndex: currentIndex - 1,
                      })
                    }
                  />
                  <Button
                    endIcon={<ArrowDownIcon />}
                    isDisabled={
                      totalRows ? currentIndex >= totalRows - 1 : false
                    }
                    tooltipText="Move down one position"
                    ariaLabel="Move down one position"
                    variant="floating"
                    size="small"
                    onClick={() =>
                      handleReordering({
                        rowId: row.id,
                        newIndex: currentIndex + 1,
                      })
                    }
                  />
                  {totalRows && (
                    <Button
                      endIcon={<ArrowBottomIcon />}
                      isDisabled={currentIndex >= totalRows - 1}
                      tooltipText="Move to end"
                      ariaLabel="Move to end"
                      variant="floating"
                      size="small"
                      onClick={() =>
                        handleReordering({ rowId: row.id, newIndex: totalRows })
                      }
                    />
                  )}
                </div>

                <Box sx={{ display: "flex" }}>
                  {rowActionButtons?.(row)}
                  <MenuButton
                    endIcon={<MoreIcon />}
                    size="small"
                    buttonVariant="floating"
                    ariaLabel="More actions"
                    menuAlignment="right"
                  >
                    {rowActionMenuItems && (
                      <>
                        {rowActionMenuItems(row)}
                        <hr />
                      </>
                    )}
                    <MenuItem
                      isDisabled={currentIndex <= 0}
                      onClick={() =>
                        handleReordering({ rowId: row.id, newIndex: 0 })
                      }
                    >
                      <ArrowTopIcon /> Move to start
                    </MenuItem>
                    <MenuItem
                      isDisabled={currentIndex <= 0}
                      onClick={() =>
                        handleReordering({
                          rowId: row.id,
                          newIndex: currentIndex - 1,
                        })
                      }
                    >
                      <ArrowUpIcon /> Move up one position
                    </MenuItem>
                    <MenuItem
                      isDisabled={
                        totalRows ? currentIndex >= totalRows - 1 : false
                      }
                      onClick={() =>
                        handleReordering({
                          rowId: row.id,
                          newIndex: currentIndex + 1,
                        })
                      }
                    >
                      <ArrowDownIcon /> Move down one position
                    </MenuItem>
                    {totalRows && (
                      <MenuItem
                        isDisabled={currentIndex >= totalRows - 1}
                        onClick={() =>
                          handleReordering({
                            rowId: row.id,
                            newIndex: totalRows,
                          })
                        }
                      >
                        <ArrowBottomIcon /> Move to end
                      </MenuItem>
                    )}
                  </MenuButton>
                </Box>
              </div>

              <div
                className="DataTableRowActions-dummyButtons"
                aria-hidden={true}
              >
                {rowActionButtons?.(row)}
                <Button
                  endIcon={<MoreIcon />}
                  size="small"
                  variant="floating"
                  ariaLabel="More actions"
                />
              </div>
            </div>
          ) : (
            <div className="DataTableRowActions-buttons">
              {rowActionButtons?.(row)}
              {rowActionMenuItems && (
                <Button
                  endIcon={<MoreIcon />}
                  size="small"
                  variant="floating"
                  ariaLabel="More actions"
                />
              )}
            </div>
          )}
        </>
      );
    },
  });

  const TableSettings = () => {
    return (
      <>
        {hasChangeableDensity && (
          <MenuButton
            endIcon={<ListIcon />}
            ariaLabel="Table density"
            menuAlignment="right"
            preventCloseOnChildClick
          >
            <>
              {densityValues.map((value: MRT_DensityState) => (
                <MenuItem
                  key={value}
                  isSelected={density === value}
                  onClick={() => setDensity(value)}
                >
                  {`${value.charAt(0).toUpperCase()}${value.slice(1)}`}
                </MenuItem>
              ))}
            </>
          </MenuButton>
        )}

        {hasColumnVisibility && (
          <MenuButton
            endIcon={<ShowIcon />}
            ariaLabel="Show/hide columns"
            menuAlignment="right"
            preventCloseOnChildClick
          >
            <>
              {columns
                .filter((column) => column.enableHiding !== false)
                .map((column) => (
                  <MenuItem
                    key={column.accessorKey}
                    onClick={() =>
                      handleColumnVisibility(column.accessorKey as string)
                    }
                  >
                    <MuiCheckbox
                      checked={
                        columnVisibility[column.accessorKey as string] !== false
                      }
                    />
                    {column.header}
                  </MenuItem>
                ))}
            </>
          </MenuButton>
        )}
      </>
    );
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <DataFilters
        onChangeSearch={hasSearch ? handleSearch : undefined}
        onChangeFilters={handleFilters}
        searchOnSubmit={searchOnSubmit}
        additionalActions={<TableSettings />}
        filters={
          hasFilters
            ? columns
                .filter((column) => column.enableColumnFilter !== false)
                .map((column) => {
                  return {
                    id: column.accessorKey as string,
                    label: column.header,
                    variant: column.filterControl ?? "text",
                    options: column.filterSelectOptions,
                  };
                })
            : undefined
        }
      />

      <MRT_TableContainer table={table} />

      {hasPagination && (
        <DataTablePagination
          paginationType={paginationType}
          currentNumberOfResults={data.length}
          currentPage={page}
          isPreviousButtonDisabled={page <= 1}
          isNextButtonDisabled={false} // TODO: Add logic for disabling next/load more button
          onClickPrevious={() => setPage(page - 1)}
          onClickNext={() => {
            if (paginationType === "loadMore") {
              setResultsPerPage(resultsPerPage + resultsPerPageProp);
            } else {
              setPage(page + 1);
            }
          }}
        />
      )}
    </Box>
  );
};

const MemoizedDataTable = memo(DataTable);
MemoizedDataTable.displayName = "DataTable";

export { MemoizedDataTable as DataTable };
