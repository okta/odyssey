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
  MRT_RowVirtualizer,
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
  MRT_TableInstance,
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
  KeyboardEvent,
} from "react";
import {
  ArrowBottomIcon,
  ArrowDownIcon,
  ArrowTopIcon,
  ArrowUnsortedIcon,
  ArrowUpIcon,
  DragIndicatorIcon,
  ListIcon,
  MoreIcon,
  ShowIcon,
} from "../icons.generated/index.js";
import { Checkbox as MuiCheckbox } from "@mui/material";
import { useOdysseyDesignTokens } from "../OdysseyDesignTokensContext.js";
import {
  DataTablePagination,
  paginationTypeValues,
} from "./DataTablePagination.js";
import { DataFilter, DataFilters } from "./DataFilters.js";
import { Button } from "../Buttons/Button.js";
import { MenuButton } from "../Buttons/MenuButton.js";
import { MenuItem } from "../Buttons/MenuItem.js";
import { Box } from "../Box.js";
import { useTranslation } from "react-i18next";

export const densityValues = ["comfortable", "spacious", "compact"] as const;

export type {
  MRT_ColumnFiltersState,
  MRT_SortingState,
  MRT_ColumnDef as TableColumn,
} from "material-react-table";

// The shape of the table columns,
// with props named to match their MRT_ColumnDef counterparts
export type DataTableColumn<TData extends MRT_RowData> = {
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
  Cell?: MRT_ColumnDef<TData>["Cell"];
  /**
   * The UI control that will be used to filter the column.
   * Defaults to a standard text input.
   */
  filterVariant?: MRT_ColumnDef<TData>["filterVariant"];
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
   * If set to false, the column won't be hidable
   */
  enableHiding?: boolean;
};

export type DataTableProps<TData extends MRT_RowData> = {
  /**
   * The columns that make up the table
   */
  columns: DataTableColumn<TData>[];
  /**
   * The data that goes into the table, which will be displayed
   * as the table rows
   */
  data: MRT_TableOptions<TData>["data"];
  /**
   * The total number of rows in the table. Optional, because it's sometimes impossible
   * to calculate. Used in table pagination to know when to disable the "next"/"more" button.
   */
  totalRows?: number;
  /**
   * The function to get the ID of a row
   */
  getRowId?: MRT_TableOptions<TData>["getRowId"];
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
   * The debounce time, in milliseconds, for the search input firing
   * `onChangeSearch` when changed. If `hasSearchSubmitButton` is true,
   * this doesn't do anything.
   */
  searchDelayTime?: number;
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
  }) =>
    | MRT_TableOptions<TData>["data"]
    | Promise<MRT_TableOptions<TData>["data"]>;
  /**
   * Callback that fires when the user reorders rows within the table. Can be used
   * to propagate order change to the backend.
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
    row: TData,
  ) => ReactElement<typeof Button | typeof Fragment>;
  /**
   * Menu items to include in the optional actions menu on each row.
   */
  rowActionMenuItems?: (
    row: TData,
  ) => ReactElement<typeof MenuItem | typeof Fragment>;
};

type TableType<TData extends MRT_RowData> = MRT_TableInstance<TData>;

const reorderDataRowsLocally = <TData extends MRT_RowData>({
  currentData,
  rowId,
  newIndex,
}: {
  currentData: MRT_TableOptions<TData>["data"];
  rowId: string;
  newIndex: number;
}) => {
  const updatedData = [...currentData];

  const rowIndex = updatedData.findIndex((row) => row.id === rowId);

  if (rowIndex !== -1) {
    // Remove the row from its current position
    const [removedRow] = updatedData.splice(rowIndex, 1);

    // Insert the row at the new index
    updatedData.splice(newIndex, 0, removedRow);
  }

  return updatedData;
};

const DataTable = <TData extends MRT_RowData>({
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
  searchDelayTime,
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
}: DataTableProps<TData>) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();
  const { t } = useTranslation();
  const [draggingRow, setDraggingRow] = useState<MRT_Row<TData> | null>();
  const [showSkeletons, setShowSkeletons] = useState<boolean>(true);
  const [data, setData] = useState<MRT_TableOptions<TData>["data"]>(dataProp);
  const [page, setPage] = useState<number>(pageProp);
  const [resultsPerPage, setResultsPerPage] =
    useState<number>(resultsPerPageProp);
  const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});
  const [sorting, setSorting] = useState<MRT_SortingState>([]);
  const [density, setDensity] = useState<MRT_DensityState>(initialDensity);

  const initialColumnVisibility = useMemo(() => {
    return columns.reduce((acc, column) => {
      acc[column.accessorKey] = true;
      return acc;
    }, {} as MRT_VisibilityState);
  }, [columns]);

  const [columnVisibility, setColumnVisibility] = useState<MRT_VisibilityState>(
    initialColumnVisibility,
  );

  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [filters, setFilters] = useState<Array<DataFilter>>();

  useEffect(() => {
    setShowSkeletons(false);
  }, [data]);

  useEffect(() => {
    onRowSelectionChange?.(rowSelection);
  }, [rowSelection, onRowSelectionChange]);

  const refreshData = useCallback(async () => {
    setShowSkeletons(true);
    try {
      const newData = fetchDataFn({
        page: page,
        resultsPerPage: resultsPerPage,
        sort: sorting,
        search: globalFilter,
        filters: filters,
      });

      setData(newData instanceof Promise ? await newData : newData);

      setShowSkeletons(false);
    } catch (error) {
      console.error(error);
      setShowSkeletons(false);
    }
  }, [page, resultsPerPage, sorting, globalFilter, filters, fetchDataFn]);

  useEffect(() => {
    refreshData();
  }, [refreshData, page, resultsPerPage, sorting, globalFilter, filters]);

  const handleSortingChange = useCallback(
    (updater: MRT_Updater<MRT_SortingState>) => {
      setSorting((prevSorting) =>
        updater instanceof Function ? updater(prevSorting) : sorting,
      );
    },
    [sorting],
  );

  const handleColumnVisibility = useCallback(
    (columnId: string) => {
      setColumnVisibility((prevVisibility) => ({
        ...prevVisibility,
        [columnId]: !columnVisibility[columnId],
      }));
    },
    [columnVisibility],
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
        updater instanceof Function ? updater(prevRowSelection) : rowSelection,
      );
    },
    [rowSelection],
  );

  const updateRowOrder = useCallback(
    ({ rowId, newIndex }: { rowId: string; newIndex: number }) => {
      if (newIndex < 0) {
        return;
      }

      if (totalRows && newIndex > totalRows) {
        return;
      }

      const newData = reorderDataRowsLocally({
        currentData: data,
        rowId,
        newIndex,
      });

      setData(newData);
      reorderDataFn?.({ rowId, newIndex });
      refreshData();
    },
    [data, totalRows, reorderDataFn, refreshData],
  );

  const rowVirtualizerInstanceRef =
    useRef<MRT_RowVirtualizer<HTMLDivElement, HTMLTableRowElement>>(null);

  const setHoveredRow = useCallback<
    (table: TableType<TData>, id: TData["id"]) => void
  >((table, id) => {
    if (id) {
      const nextRow = table.getRow(id) as MRT_Row<TData>;

      if (nextRow) {
        table.setHoveredRow(nextRow);
      }
    }
  }, []);

  const resetDraggingAndHoveredRow = useCallback<
    (table: TableType<TData>) => void
  >(
    (table) => {
      setDraggingRow(null);
      table.setHoveredRow(null);
    },
    [setDraggingRow],
  );

  type HandleDragHandleKeyDownArgs = {
    table: TableType<TData>;
    row: MRT_Row<TData>;
    event: KeyboardEvent<HTMLButtonElement>;
  };

  const handleDragHandleKeyDown = useCallback(
    ({ table, row, event }: HandleDragHandleKeyDownArgs) => {
      const { hoveredRow } = table.getState();

      const { key } = event;

      const isSpaceKey = key === " ";
      const isEnterKey = key === "Enter";
      const isEscapeKey = key === "Escape";
      const isArrowDown = key === "ArrowDown";
      const isArrowUp = key === "ArrowUp";
      const isSpaceOrEnter = isSpaceKey || isEnterKey;
      const zeroIndexedPageNumber = page - 1;
      const currentIndex = row.index + zeroIndexedPageNumber * resultsPerPage;

      if (isEscapeKey) {
        resetDraggingAndHoveredRow(table);
        return;
      }

      if (isSpaceOrEnter) {
        event.preventDefault();
        event.stopPropagation();
      }

      if (draggingRow) {
        if (typeof hoveredRow?.index === "number") {
          const { index } = hoveredRow;

          if (isSpaceOrEnter) {
            const pageRelativeIndex =
              index + zeroIndexedPageNumber * resultsPerPage;

            if (pageRelativeIndex !== currentIndex) {
              updateRowOrder({
                rowId: row.id,
                newIndex: pageRelativeIndex,
              });

              // Can't transition CSS hover effect. Use timeout to delay hovered row effect removal
              setTimeout(() => {
                resetDraggingAndHoveredRow(table);
              }, odysseyDesignTokens.TransitionDurationMainAsNumber);
              return;
            }
          }

          if (isArrowDown || isArrowUp) {
            const nextIndex = isArrowDown ? index + 1 : index - 1;
            // This is a legacy file. In general, we shouldn't have `as` here. Newer versions will have this fixed. --Kevin Ghadyani
            setHoveredRow(table, data[nextIndex]?.id as TData["id"]);
          }
        } else {
          if (isArrowDown || isArrowUp) {
            const nextIndex = isArrowDown ? row.index + 1 : row.index - 1;
            // This is a legacy file. In general, we shouldn't have `as` here. Newer versions will have this fixed. --Kevin Ghadyani
            setHoveredRow(table, data[nextIndex]?.id as TData["id"]);
          }
        }
      } else {
        if (isSpaceOrEnter) {
          setDraggingRow(row);
        }
      }
    },
    [
      data,
      draggingRow,
      odysseyDesignTokens.TransitionDurationMainAsNumber,
      page,
      resetDraggingAndHoveredRow,
      resultsPerPage,
      setHoveredRow,
      updateRowOrder,
    ],
  );

  const handleDragHandleOnDragEnd = useCallback(
    (table: TableType<TData>) => {
      const cols = table.getAllColumns();
      cols[0].toggleVisibility();

      const { draggingRow, hoveredRow } = table.getState();

      if (draggingRow) {
        updateRowOrder({
          newIndex: (hoveredRow as TData).index as number,
          rowId: draggingRow.id,
        });
      }

      setDraggingRow(null);
    },
    [updateRowOrder],
  );

  const handleDragHandleOnDragCapture = useCallback(
    (table: TableType<TData>) => {
      if (!draggingRow && table.getState().draggingRow?.id) {
        setDraggingRow(table.getState().draggingRow);
      }
    },
    [draggingRow],
  );

  const tableState = useMemo(
    () => ({
      density,
      sorting,
      globalFilter,
      columnVisibility,
      rowSelection,
      showSkeletons,
    }),
    [
      density,
      sorting,
      globalFilter,
      columnVisibility,
      rowSelection,
      showSkeletons,
    ],
  );

  const table = useMaterialReactTable({
    columns: columns,
    data: data,
    state: tableState,
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
          },
        },
      },
      "mrt-row-drag": {
        header: "",
        muiTableBodyCellProps: {
          sx: {
            minWidth: 0,
            width: "auto",
          },
        },
        muiTableHeadCellProps: {
          sx: {
            minWidth: 0,
            width: "auto",
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
      hasRowReordering === true || rowActionButtons || rowActionMenuItems
        ? true
        : false,
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

    muiRowDragHandleProps: ({ table, row }) => ({
      title: t("table.draghandle.tooltip"),
      "aria-label": t("table.draghandle.arialabel"),
      onKeyDown: (event) => handleDragHandleKeyDown({ table, row, event }),
      onBlur: () => {
        resetDraggingAndHoveredRow(table);
      },
      onDragEnd: () => handleDragHandleOnDragEnd(table),
      onDragCapture: () => handleDragHandleOnDragCapture(table),
      sx: {
        padding: odysseyDesignTokens.Spacing1,
        borderRadius: odysseyDesignTokens.BorderRadiusMain,

        "&:focus-visible": {
          boxShadow: `0 0 0 2px ${odysseyDesignTokens.HueNeutralWhite}, 0 0 0 4px ${odysseyDesignTokens.PalettePrimaryMain}`,
          outline: "2px solid transparent",
          outlineOffset: "1px",
        },
      },
    }),

    renderRowActions: ({ row }) => {
      const currentIndex = row.index + (page - 1) * resultsPerPage;

      return (
        <Box sx={{ display: "flex" }}>
          {rowActionButtons?.(row.original)}
          {(rowActionMenuItems || hasRowReordering) && (
            <MenuButton
              endIcon={<MoreIcon />}
              size="small"
              buttonVariant="floating"
              ariaLabel={t("table.moreactions.arialabel")}
              menuAlignment="right"
            >
              {rowActionMenuItems && (
                <>
                  {rowActionMenuItems(row.original)}
                  <hr />
                </>
              )}
              <MenuItem
                isDisabled={currentIndex <= 0}
                onClick={() => updateRowOrder({ rowId: row.id, newIndex: 0 })}
              >
                <ArrowTopIcon /> Bring to front
              </MenuItem>
              <MenuItem
                isDisabled={currentIndex <= 0}
                onClick={() =>
                  updateRowOrder({
                    rowId: row.id,
                    newIndex: currentIndex <= 0 ? 0 : currentIndex - 1,
                  })
                }
              >
                <ArrowUpIcon /> Bring forward
              </MenuItem>
              <MenuItem
                isDisabled={totalRows ? currentIndex >= totalRows - 1 : false}
                onClick={() =>
                  updateRowOrder({
                    rowId: row.id,
                    newIndex: currentIndex + 1,
                  })
                }
              >
                <ArrowDownIcon /> Send backward
              </MenuItem>
              <>
                {totalRows && (
                  <MenuItem
                    isDisabled={currentIndex >= totalRows - 1}
                    onClick={() =>
                      updateRowOrder({
                        rowId: row.id,
                        newIndex: totalRows,
                      })
                    }
                  >
                    <ArrowBottomIcon /> Send to back
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
                    onClick={() => handleColumnVisibility(column.accessorKey)}
                  >
                    <MuiCheckbox
                      checked={columnVisibility[column.accessorKey] !== false}
                    />
                    {column.header}
                  </MenuItem>
                ))}
            </>
          </MenuButton>
        )}
      </>
    ),
    [
      columnVisibility,
      columns,
      density,
      hasChangeableDensity,
      handleColumnVisibility,
      hasColumnVisibility,
    ],
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <DataFilters
        onChangeSearch={hasSearch ? handleSearch : undefined}
        onChangeFilters={handleFilters}
        hasSearchSubmitButton={hasSearchSubmitButton}
        searchDelayTime={searchDelayTime}
        additionalActions={tableSettings}
        filters={
          hasFilters
            ? columns
                .filter((column) => column.enableColumnFilter !== false)
                .map((column) => {
                  return {
                    id: column.accessorKey,
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
