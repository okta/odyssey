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
} from "material-react-table";
import {
  Fragment,
  ReactElement,
  memo,
  useCallback,
  useEffect,
  useMemo,
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
import { DataFilter, DataFilters } from "./DataFilters";
import { Button } from "../Button";
import { Box } from "../Box";
import { MenuButton, MenuItem } from "..";
import { ArrowUnsortedIcon } from "../icons.generated";

export const densityValues = ["comfortable", "spacious", "compact"] as const;

export type {
  MRT_ColumnFiltersState,
  MRT_SortingState,
  MRT_ColumnDef as TableColumn,
} from "material-react-table";

// The shape of the table columns,
// with props named to match their MRT_ColumnDef counterparts
export type DataColumn = {
  /**
   * The unique ID of the column
   */
  accessorKey: string;
  /**
   * The human-friendly title of the column
   */
  header: string;
  /**
   * Customize the way each cell in the column is
   * displayed via a custom React component.
   */
  Cell?: MRT_ColumnDef<MRT_RowData>["Cell"];
  /**
   * The UI control that will be used to filter the column.
   * Defaults to a standard text input.
   */
  filterVariant?: MRT_ColumnDef<MRT_RowData>["filterVariant"];
  /**
   * If the filter control has preset options (such as a select or multi-select),
   * these are the options provided.
   */
  filterSelectOptions?: Array<{ label: string; value: string }>;
  /**
   * The optional column width, in pixels
   */
  size?: number;
  /**
   * The minimum column width, in pixels
   */
  minSize?: number;
  /**
   * The maximum column width, in pixels
   */
  maxSize?: number;
  /**
   * If set to false, the column won't be filterable
   */
  enableColumnFilter?: boolean;
  /**
   * If set to false, the column won't be searchable
   */
  enableGlobalFilter?: boolean;
  /**
   * If set to false, the column won't be sortable
   */
  enableSorting?: boolean;
  /**
   * If set to false, the column won't be resizable
   */
  enableResizing?: boolean;
  /**
   * If set to false, the column won't be hideable
   */
  enableHiding?: boolean;
};

export type DataTableProps = {
  /**
   * The columns that make up the table
   */
  columns: DataColumn[];
  /**
   * The data that goes into the table, which will be displayed
   * as the table rows
   */
  data: MRT_TableOptions<MRT_RowData>["data"];
  /**
   * The total number of rows in the table. Optional, because it's sometimes impossible
   * to calculate. Used in table pagination to know when to disable the "next"/"more" button.
   */
  totalRows?: number;
  /**
   * The function to get the ID of a row
   */
  getRowId?: MRT_TableOptions<MRT_RowData>["getRowId"];
  /**
   * The initial density of the table. This is available even if the table density
   * isn't changeable.
   */
  initialDensity?: (typeof densityValues)[number];
  /**
   * If true, the end user will be able to change the table density.
   */
  hasChangeableDensity?: boolean;
  /**
   * If true, the end user can resize individual columns.
   */
  hasColumnResizing?: boolean;
  /**
   * If true, the end user will be able to show/hide columns.
   */
  hasColumnVisibility?: boolean;
  /**
   * If true, the end user will be able to filter columns.
   */
  hasFilters?: boolean;
  /**
   * If true, the table will include pagination controls.
   */
  hasPagination?: boolean;
  /**
   * If true, the table will include checkboxes on each row, enabling
   * the user to select some or all rows.
   */
  hasRowSelection?: boolean;
  /**
   * If true, the global table search controls will be shown.
   */
  hasSearch?: boolean;
  /**
   * If true, the end user can sort columns (ascending, descending, or neither)
   */
  hasSorting?: boolean;
  /**
   * If true, the end user can reorder rows via a drag-and-drop interface
   */
  hasRowReordering?: boolean;
  /**
   * If true, the search field will include a Search button, rather than
   * firing on input change.
   */
  hasSearchSubmitButton?: boolean;
  /**
   * Callback that fires when a row (or rows) is selected or unselected.
   */
  onRowSelectionChange?: (rowSelection: MRT_RowSelectionState) => void;
  /**
   * Callback that fires whenever the table needs to fetch new data, due to changes in
   * page, results per page, search input, filters, or sorting
   */
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
    filters?: DataFilter[];
    sort?: MRT_SortingState;
  }) => MRT_TableOptions<MRT_RowData>["data"];
  /**
   * Callback that fires when the user reorders rows within the table. Can be used
   * to propogate order change to the backend.
   */
  reorderDataFn?: ({
    rowId,
    newIndex,
  }: {
    rowId: string;
    newIndex: number;
  }) => void;
  /**
   * The current page number.
   */
  page?: number;
  /**
   * The number of results per page.
   */
  resultsPerPage?: number;
  /**
   * The type of pagination controls shown. Defaults to next/prev buttons, but can be
   * set to a simple "Load more" button by setting to "loadMore".
   */
  paginationType?: (typeof paginationTypeValues)[number];
  /**
   * Action buttons to display in each row
   */
  rowActionButtons?: (
    row: MRT_RowData
  ) => ReactElement<typeof Button | typeof Fragment>;
  /**
   * Menu items to include in the optional actions menu on each row.
   */
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
  hasSearchSubmitButton,
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

  const initialColumnVisibility = useMemo(() => {
    return columns.reduce((acc, column) => {
      acc[column.accessorKey as string] = true;
      return acc;
    }, {} as MRT_VisibilityState);
  }, [columns]);

  const [columnVisibility, setColumnVisibility] = useState<MRT_VisibilityState>(
    initialColumnVisibility
  );

  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [filters, setFilters] = useState<Array<DataFilter>>();

  const refreshData = useCallback(async () => {
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
      setShowSkeletons(false);
    } catch (error) {
      console.log(error);
      setShowSkeletons(false);
    }
  }, [page, resultsPerPage, sorting, globalFilter, filters, fetchDataFn]);

  const handleSortingChange = useCallback(
    (updater: MRT_Updater<MRT_SortingState>) => {
      setSorting((prevSorting) =>
        updater instanceof Function ? updater(prevSorting) : sorting
      );
    },
    [sorting]
  );

  const handleColumnVisibility = useCallback(
    (columnId: string) => {
      setColumnVisibility((prevVisibility) => ({
        ...prevVisibility,
        [columnId]: !columnVisibility[columnId],
      }));
    },
    [columnVisibility]
  );

  const handleSearch = useCallback((value: string) => {
    setGlobalFilter(value);
  }, []);

  const handleFilters = useCallback((updatedFilters: Array<DataFilter>) => {
    setFilters(updatedFilters);
  }, []);

  const handleRowSelectionChange = useCallback(
    (updater: MRT_Updater<MRT_RowSelectionState>) => {
      setRowSelection((prevRowSelection) =>
        updater instanceof Function ? updater(prevRowSelection) : rowSelection
      );
    },
    [rowSelection]
  );

  const handleReordering = useCallback(
    ({ rowId, newIndex }: { rowId: string; newIndex: number }) => {
      if (newIndex < 0) {
        return;
      }

      if (totalRows && newIndex > totalRows) {
        return;
      }

      reorderDataFn?.({ rowId, newIndex });
      refreshData();
    },
    [totalRows, reorderDataFn, refreshData]
  );

  useEffect(() => {
    setShowSkeletons(false);
  }, [data]);

  useEffect(() => {
    refreshData();
  }, [refreshData, page, resultsPerPage, sorting, globalFilter, filters]);

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
        <Box sx={{ display: "flex" }}>
          {rowActionButtons?.(row)}
          {(rowActionMenuItems || hasRowReordering) && (
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
                onClick={() => handleReordering({ rowId: row.id, newIndex: 0 })}
              >
                <ArrowTopIcon /> Move to start
              </MenuItem>
              <MenuItem
                isDisabled={currentIndex <= 0}
                onClick={() =>
                  handleReordering({
                    rowId: row.id,
                    newIndex: currentIndex <= 0 ? 0 : currentIndex - 1,
                  })
                }
              >
                <ArrowUpIcon /> Move up one position
              </MenuItem>
              <MenuItem
                isDisabled={totalRows ? currentIndex >= totalRows - 1 : false}
                onClick={() =>
                  handleReordering({
                    rowId: row.id,
                    newIndex: currentIndex + 1,
                  })
                }
              >
                <ArrowDownIcon /> Move down one position
              </MenuItem>
              <>
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
              </>
            </MenuButton>
          )}
        </Box>
      );
    },
  });

  const tableSettings = useMemo(
    () => (
      <>
        {hasChangeableDensity && (
          <MenuButton
            endIcon={<ListIcon />}
            ariaLabel="Table density"
            menuAlignment="right"
            shouldCloseOnSelect={false}
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
            shouldCloseOnSelect={false}
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
    ),
    [density, columnVisibility, columns, hasChangeableDensity]
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <DataFilters
        onChangeSearch={hasSearch ? handleSearch : undefined}
        onChangeFilters={handleFilters}
        hasSearchSubmitButton={hasSearchSubmitButton}
        additionalActions={tableSettings}
        filters={
          hasFilters
            ? columns
                .filter((column) => column.enableColumnFilter !== false)
                .map((column) => {
                  return {
                    id: column.accessorKey as string,
                    label: column.header,
                    variant: column.filterVariant ?? "text",
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
