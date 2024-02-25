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

import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  MRT_Cell,
  MRT_DensityState,
  MRT_Row,
  MRT_RowData,
  MRT_SortingState,
  MRT_TableOptions,
  MRT_RowSelectionState,
  MRT_RowVirtualizer,
  MRT_VisibilityState,
  useMaterialReactTable,
  MRT_TableContainer,
} from "material-react-table";
import {
  ArrowDownIcon,
  ArrowUnsortedIcon,
  DragIndicatorIcon,
  MoreIcon,
} from "../icons.generated";
import { densityValues } from "./constants";
import {
  DataTablePagination,
  paginationTypeValues,
} from "../labs/DataTablePagination";
import { DataFilter, DataFilters } from "../labs/DataFilters";
import {
  DataTableRowActions,
  DataTableRowActionsProps,
} from "./DataTableRowActions";
import { useRowReordering } from "./useRowReordering";
import { DataTableSettings } from "./DataTableSettings";
import { MenuButton, MenuButtonProps } from "../MenuButton";
import { Box } from "../Box";
import { DataTableRowSelectionState } from ".";
import {
  DesignTokens,
  useOdysseyDesignTokens,
} from "../OdysseyDesignTokensContext";
import { useScrollIndication } from "./useScrollIndication";
import styled from "@emotion/styled";

export type DataTableProps = {
  /**
   * The columns that make up the table
   */
  columns: MRT_TableOptions<MRT_RowData>["columns"];
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
   * The debounce time, in milliseconds, for the search input firing
   * `onChangeSearch` when changed. If `hasSearchSubmitButton` is true,
   * this doesn't do anything.
   */
  searchDelayTime?: number;
  /**
   * Callback that fires when a row (or rows) is selected or unselected.
   */
  onChangeRowSelection?: (rowSelection: DataTableRowSelectionState) => void;
  /**
   * Callback that fires whenever the table needs to fetch new data, due to changes in
   * page, results per page, search input, filters, or sorting
   */
  getData: ({
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
    | MRT_TableOptions<MRT_RowData>["data"]
    | Promise<MRT_TableOptions<MRT_RowData>["data"]>;
  /**
   * Callback that fires when the user reorders rows within the table. Can be used
   * to propogate order change to the backend.
   */
  onReorderRows?: ({
    rowId,
    newRowIndex,
  }: {
    rowId: string;
    newRowIndex: number;
  }) => void;
  /**
   * The current page number.
   */
  currentPage?: number;
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
  rowActionButtons?: DataTableRowActionsProps["rowActionButtons"];
  /**
   * Menu items to include in the optional actions menu on each row.
   */
  rowActionMenuItems?: DataTableRowActionsProps["rowActionMenuItems"];
  /**
   * Menu items to include in the bulk actions menu, which appears above the table if a row or rows are selected
   */
  bulkActionMenuItems?: (
    selectedRows: MRT_RowSelectionState,
  ) => MenuButtonProps["children"];
};

const displayColumnDefOptions = {
  "mrt-row-actions": {
    header: "",
    grow: true,
    muiTableBodyCellProps: {
      align: "right",
      sx: {
        overflow: "visible",
        width: "unset",
      },
      className: "ods-actions-cell",
    },
    muiTableHeadCellProps: {
      align: "right",
      sx: {
        width: "unset",
      },
      className: "ods-actions-cell",
    },
  },
  "mrt-row-drag": {
    header: "",
    muiTableBodyCellProps: {
      sx: {
        minWidth: 0,
        width: "auto",
      },
      className: "ods-drag-handle",
    },
    muiTableHeadCellProps: {
      sx: {
        minWidth: 0,
        width: "auto",
      },
      children: (
        // Add a spacer to simulate the width of the drag handle in the column.
        // Without this, the head cells are offset from their body cell counterparts
        <Box sx={{ marginInline: "-0.1rem" }}>
          <DragIndicatorIcon sx={{ marginInline: 1, opacity: 0 }} />
        </Box>
      ),
    },
  },
  "mrt-row-select": {
    muiTableHeadCellProps: {
      padding: "checkbox",
    },
    muiTableBodyCellProps: {
      padding: "checkbox",
    },
  },
};

const ScrollableTableContainer = styled("div", {
  shouldForwardProp: (prop) =>
    prop !== "odysseyDesignTokens" &&
    prop !== "isScrollableStart" &&
    prop !== "isScrollableEnd",
})<{
  odysseyDesignTokens: DesignTokens;
  isScrollableStart: boolean;
  isScrollableEnd: boolean;
}>`
  border-block-end-color: ${({ odysseyDesignTokens }) =>
    odysseyDesignTokens.HueNeutral100};
  border-block-end-style: solid;
  border-block-end-width: ${({ odysseyDesignTokens }) =>
    odysseyDesignTokens.BorderWidthMain};
  margin-block-end: ${({ odysseyDesignTokens }) =>
    odysseyDesignTokens.Spacing4};
  position: relative;

  border-inline-start-color: ${({ odysseyDesignTokens, isScrollableStart }) =>
    isScrollableStart ? odysseyDesignTokens.HueNeutral200 : "transparent"};
  border-inline-start-style: ${({ odysseyDesignTokens }) =>
    odysseyDesignTokens.BorderStyleMain};
  border-inline-start-width: ${({ odysseyDesignTokens }) =>
    odysseyDesignTokens.BorderWidthMain};

  &::before {
    background: linear-gradient(
      -90deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.33) 50%,
      rgba(0, 0, 0, 1) 100%
    );
    content: "";
    opacity: ${({ isScrollableStart }) => (isScrollableStart ? "0.075" : "0")};
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: ${({ odysseyDesignTokens }) => odysseyDesignTokens.Spacing6};
    z-index: 100;
    transition: opacity
      ${({ odysseyDesignTokens }) => odysseyDesignTokens.TransitionDurationMain}
      ${({ odysseyDesignTokens }) => odysseyDesignTokens.TransitionTimingMain};
  }

  border-inline-end-color: ${({ odysseyDesignTokens, isScrollableEnd }) =>
    isScrollableEnd ? odysseyDesignTokens.HueNeutral200 : "transparent"};
  border-inline-end-style: ${({ odysseyDesignTokens }) =>
    odysseyDesignTokens.BorderStyleMain};
  border-inline-end-width: ${({ odysseyDesignTokens }) =>
    odysseyDesignTokens.BorderWidthMain};

  &::after {
    background: linear-gradient(
      90deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.33) 50%,
      rgba(0, 0, 0, 1) 100%
    );
    content: "";
    opacity: ${({ isScrollableEnd }) => (isScrollableEnd ? "0.075" : "0")};
    pointer-events: none;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: ${({ odysseyDesignTokens }) => odysseyDesignTokens.Spacing6};
    transition: opacity
      ${({ odysseyDesignTokens }) => odysseyDesignTokens.TransitionDurationMain}
      ${({ odysseyDesignTokens }) => odysseyDesignTokens.TransitionTimingMain};
  }
`;

const DataTable = ({
  columns,
  getRowId: getRowIdProp,
  currentPage = 1,
  initialDensity = densityValues[0],
  resultsPerPage = 20,
  getData,
  onReorderRows,
  totalRows,
  hasSearchSubmitButton,
  searchDelayTime,
  paginationType = "paged",
  onChangeRowSelection,
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
  bulkActionMenuItems,
}: DataTableProps) => {
  const [data, setData] = useState<MRT_RowData[]>([]);
  const [pagination, setPagination] = useState({
    pageIndex: currentPage,
    pageSize: resultsPerPage,
  });
  const [draggingRow, setDraggingRow] = useState<MRT_Row<MRT_RowData> | null>();
  const [numberOfRowsSelected, setNumberOfRowsSelected] = useState<number>(0);
  const [isTableContainerScrolledToStart, setIsTableContainerScrolledToStart] =
    useState<boolean>(false);
  const [isTableContainerScrolledToEnd, setIsTableContainerScrolledToEnd] =
    useState<boolean>(false);
  const tableOuterContainerRef = useRef<HTMLDivElement>(null);
  const tableInnerContainerRef = useRef<HTMLDivElement>(null);
  const tableContentRef = useRef<HTMLTableElement>(null);

  // Table states
  const [columnSorting, setColumnSorting] = useState<MRT_SortingState>([]);
  const [columnVisibility, setColumnVisibility] =
    useState<MRT_VisibilityState>();
  const [rowDensity, setRowDensity] =
    useState<MRT_DensityState>(initialDensity);
  const [search, setSearch] = useState<string>("");
  const [filters, setFilters] = useState<DataFilter[]>();

  const { onTableContainerScroll, setupInitialScrollState } =
    useScrollIndication();
  const odysseyDesignTokens = useOdysseyDesignTokens();

  const {
    dragHandleStyles,
    dragHandleText,
    draggableTableBodyRowClassName,
    handleDragHandleKeyDown,
    handleDragHandleOnDragCapture,
    handleDragHandleOnDragEnd,
    resetDraggingAndHoveredRow,
    updateRowOrder,
  } = useRowReordering({
    totalRows,
    onReorderRows,
    data,
    setData,
    draggingRow,
    setDraggingRow,
    resultsPerPage: pagination.pageSize,
    page: pagination.pageIndex,
  });

  const getRowId = getRowIdProp ? getRowIdProp : (row: MRT_RowData) => row.id;

  const rowDensityCellClassName = useMemo(() => {
    return rowDensity === "spacious"
      ? "MuiTableCell-spacious"
      : rowDensity === "compact"
        ? "MuiTableCell-compact"
        : "MuiTableCell-default";
  }, [rowDensity]);

  const renderRowActions = useCallback(
    ({ row }: { row: MRT_Row<MRT_RowData> }) => {
      const currentIndex =
        row.index + (pagination.pageIndex - 1) * pagination.pageSize;
      return (
        <DataTableRowActions
          row={row}
          rowIndex={currentIndex}
          rowActionButtons={rowActionButtons}
          rowActionMenuItems={rowActionMenuItems}
          totalRows={totalRows}
          updateRowOrder={
            hasRowReordering && onReorderRows ? updateRowOrder : undefined
          }
        />
      );
    },
    [
      pagination,
      rowActionButtons,
      rowActionMenuItems,
      hasRowReordering,
      onReorderRows,
      totalRows,
      updateRowOrder,
    ],
  );

  const dataTableFilters = useMemo(
    () =>
      columns
        .filter((column) => column.enableColumnFilter !== false)
        .map((column) => {
          return {
            id: column.accessorKey as string,
            label: column.header,
            variant: column.filterVariant ?? "text",
            options: column.filterSelectOptions,
          } as DataFilter;
        }),
    [columns],
  );

  const defaultCell = useCallback(
    ({ cell }: { cell: MRT_Cell<MRT_RowData> }) => {
      const value = cell.getValue<string>();
      return (
        <Box
          sx={{
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
        >
          {value}
        </Box>
      );
    },
    [],
  );

  const tableState = useMemo(
    () => ({
      density: rowDensity,
      sorting: columnSorting,
      globalFilter: search,
      columnVisibility,
    }),
    [rowDensity, columnSorting, search, columnVisibility],
  );

  const dataTable = useMaterialReactTable({
    columns: columns,
    data: data,
    getRowId: getRowId,
    state: tableState,
    icons: {
      ArrowDownwardIcon: ArrowDownIcon,
      DragHandleIcon: DragIndicatorIcon,
      SyncAltIcon: ArrowUnsortedIcon,
    },

    // Base table settings
    enableColumnActions: false,
    enableColumnResizing: hasColumnResizing,
    enableDensityToggle: false,
    enableFilters: false,
    enableFullScreenToggle: false,
    enableGlobalFilter: false,
    enableHiding: false,
    enablePagination: false,
    layoutMode: "grid-no-grow",
    manualFiltering: true,
    manualSorting: true,
    muiTablePaperProps: {
      elevation: 0,
      sx: {
        overflow: "visible",
      },
    },
    selectAllMode: "all",
    displayColumnDefOptions:
      displayColumnDefOptions as MRT_TableOptions<MRT_RowData>["displayColumnDefOptions"],
    muiTableBodyCellProps: () => ({
      className: rowDensityCellClassName,
    }),
    defaultColumn: {
      Cell: defaultCell,
    },

    // Reordering
    enableRowOrdering: hasRowReordering && Boolean(onReorderRows),
    enableRowDragging: hasRowReordering && Boolean(onReorderRows),
    muiTableBodyRowProps: ({ table, row }) => ({
      className: draggableTableBodyRowClassName({
        currentRowId: row.id,
        draggingRowId: draggingRow?.id,
        hoveredRowId: table.getState().hoveredRow?.id,
      }),
    }),
    muiRowDragHandleProps: ({ table, row }) => ({
      onKeyDown: (event) => handleDragHandleKeyDown({ table, row, event }),
      onBlur: () => resetDraggingAndHoveredRow(table),
      onDragEnd: () => handleDragHandleOnDragEnd(table),
      onDragCapture: () => handleDragHandleOnDragCapture(table),
      sx: dragHandleStyles,
      ...dragHandleText,
    }),

    // Row actions
    enableRowActions:
      (hasRowReordering === true && onReorderRows) ||
      rowActionButtons ||
      rowActionMenuItems
        ? true
        : false,
    positionActionsColumn:
      "last" as MRT_TableOptions<MRT_RowData>["positionActionsColumn"],
    renderRowActions: ({ row }) => renderRowActions({ row }),

    // Row selection
    enableRowSelection: hasRowSelection,

    // Sorting
    enableSorting: hasSorting,
    onSortingChange: setColumnSorting,
    muiTableHeadCellProps: ({ column: currentColumn }) => ({
      className: columnSorting.find(
        (sortedColumn) => sortedColumn.id === currentColumn.id,
      )
        ? "isSorted"
        : "isUnsorted",
    }),

    // Virtualization
    enableRowVirtualization:
      paginationType === "loadMore" || pagination.pageSize > 50,
    rowVirtualizerInstanceRef:
      useRef<MRT_RowVirtualizer<HTMLDivElement, HTMLTableRowElement>>(null),
    rowVirtualizerOptions: {
      overscan: 4,
    },

    muiTableProps: {
      ref: tableContentRef,
    },

    muiTableContainerProps: {
      ref: tableInnerContainerRef,
    },
  });

  // Effects
  const handleTableContainerScroll = useCallback(
    () =>
      onTableContainerScroll({
        tableOuterContainer: tableOuterContainerRef.current,
        tableInnerContainer: tableInnerContainerRef.current,
        setIsTableContainerScrolledToStart,
        setIsTableContainerScrolledToEnd,
      }),
    [tableOuterContainerRef, tableInnerContainerRef],
  );

  useEffect(() => {
    onChangeRowSelection?.(dataTable.getState().rowSelection);
    setNumberOfRowsSelected(
      Object.keys(dataTable.getState().rowSelection).length,
    );
  }, [dataTable.getState().rowSelection, dataTable, onChangeRowSelection]);

  useEffect(() => {
    setupInitialScrollState(tableInnerContainerRef.current);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const incomingData = await getData?.({
          page: pagination.pageIndex,
          resultsPerPage: pagination.pageSize,
          search,
          filters,
          sort: columnSorting,
        });
        setData(incomingData);
      } catch (error) {
      } finally {
      }
    })();
  }, [pagination, columnSorting, search, filters, getData]);

  // Render the table
  return (
    <>
      <Box sx={{ marginBottom: 5 }}>
        <DataFilters
          onChangeSearch={hasSearch ? setSearch : undefined}
          onChangeFilters={hasFilters ? setFilters : undefined}
          hasSearchSubmitButton={hasSearchSubmitButton}
          searchDelayTime={searchDelayTime}
          filters={hasFilters ? dataTableFilters : undefined}
          additionalActions={
            <>
              <DataTableSettings
                hasChangeableDensity={hasChangeableDensity}
                rowDensity={rowDensity}
                setRowDensity={setRowDensity}
                hasColumnVisibility={hasColumnVisibility}
                columns={columns}
                columnVisibility={columnVisibility}
                setColumnVisibility={setColumnVisibility}
              />
              {bulkActionMenuItems && (
                <>
                  <MenuButton
                    buttonVariant="secondary"
                    endIcon={<MoreIcon />}
                    isDisabled={numberOfRowsSelected === 0}
                    ariaLabel="More actions"
                  >
                    {bulkActionMenuItems(dataTable.getState().rowSelection)}
                  </MenuButton>
                </>
              )}
            </>
          }
        />
      </Box>

      <ScrollableTableContainer
        odysseyDesignTokens={odysseyDesignTokens}
        isScrollableStart={!isTableContainerScrolledToStart}
        isScrollableEnd={!isTableContainerScrolledToEnd}
        ref={tableOuterContainerRef}
      >
        <MRT_TableContainer
          table={dataTable}
          onScroll={handleTableContainerScroll}
        />
      </ScrollableTableContainer>

      {hasPagination && (
        <DataTablePagination
          paginationType={paginationType}
          currentNumberOfResults={data.length}
          currentPage={pagination.pageIndex}
          isPreviousButtonDisabled={pagination.pageIndex <= 1}
          isNextButtonDisabled={false} // TODO: Add logic for disabling next/load more button
          onClickPrevious={() =>
            setPagination({
              pageIndex: pagination.pageIndex - 1,
              pageSize: pagination.pageSize,
            })
          }
          onClickNext={() => {
            if (paginationType === "loadMore") {
              setPagination({
                pageSize: pagination.pageSize,
                pageIndex: pagination.pageSize + resultsPerPage,
              });
            } else {
              setPagination({
                pageSize: pagination.pageSize,
                pageIndex: pagination.pageIndex + 1,
              });
            }
          }}
        />
      )}
    </>
  );
};

const MemoizedDataTable = memo(DataTable);
MemoizedDataTable.displayName = "DataTable";

export { MemoizedDataTable as DataTable };
