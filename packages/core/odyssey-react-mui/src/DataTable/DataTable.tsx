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

import styled from "@emotion/styled";
import {
  MRT_Cell,
  MRT_Column,
  MRT_ColumnDef,
  MRT_DensityState,
  MRT_Row,
  MRT_RowData,
  MRT_RowSelectionState,
  MRT_RowVirtualizer,
  MRT_SortingState,
  MRT_TableContainer,
  MRT_TableInstance,
  MRT_TableOptions,
  MRT_VisibilityState,
  useMaterialReactTable,
} from "material-react-table";
import {
  memo,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { Box } from "../Box.js";
import { Button, MenuButton, MenuButtonProps } from "../Buttons/index.js";
import { Callout } from "../Callout.js";
import { EmptyState } from "../EmptyState.js";
import { useTranslation } from "../i18n.generated/i18n.js";
import {
  ArrowDownIcon,
  ArrowUnsortedIcon,
  ChevronDownIcon,
  DragIndicatorIcon,
  MoreIcon,
} from "../icons.generated/index.js";
import { DataFilter, DataFilters } from "../labs/DataFilters.js";
import {
  DesignTokens,
  useOdysseyDesignTokens,
} from "../OdysseyDesignTokensContext.js";
import {
  Pagination,
  paginationTypeValues,
  usePagination,
} from "../Pagination/index.js";
import { densityValues } from "./constants.js";
import {
  DataTableRowActions,
  DataTableRowActionsProps,
} from "./DataTableRowActions.js";
import { DataTableSettings } from "./DataTableSettings.js";
import { DataTableRowData, DataTableRowSelectionState } from "./index.js";
import { useRowReordering } from "./useRowReordering.js";
import { useScrollIndication } from "./useScrollIndication.js";

export type DataTableColumn<T extends DataTableRowData> = MRT_ColumnDef<T> & {
  /**
   * @deprecated use hasTextWrapping instead of enableWrapping
   */
  enableWrapping?: boolean;
  hasTextWrapping?: boolean;
};

type DataTableColumnInstance<T extends DataTableRowData> = Omit<
  MRT_Column<T, unknown>,
  "columnDef"
> & {
  columnDef: DataTableColumn<T>;
};

type DataTableCell<T extends DataTableRowData> = Omit<MRT_Cell<T>, "column"> & {
  column: DataTableColumnInstance<T>;
};

/**
 * Utility type to extract a callback function type from a given key of `MRT_TableOptions`.
 *
 * The `Extract<>` utility is used to filter out only the function type from the property,
 * as some `MRT_TableOptions` properties can be union types (e.g., `function` | `object`).
 *
 * The `@typescript-eslint/no-unsafe-function-type` rule is disabled here because we must extract
 * a function type from a property of `MRT_TableOptions`, but the exact function signature varies
 * depending on the key.
 */
type MRT_TableOptionsCallback<
  TableOptionKey extends keyof Required<MRT_TableOptions<MRT_RowData>>,
  TData extends MRT_RowData = MRT_RowData,
> = Extract<
  Required<MRT_TableOptions<TData>>[TableOptionKey],
  Function // eslint-disable-line @typescript-eslint/no-unsafe-function-type
>;

export type DataTableGetDataType = {
  filters?: DataFilter[];
  page?: number;
  resultsPerPage?: number;
  search?: string;
  sort?: MRT_SortingState;
};

export type DataTableOnReorderRowsType = {
  newRowIndex: number;
  rowId: string;
};

export type DataTableRenderDetailPanelType = {
  row: MRT_Row<DataTableRowData>;
  table: MRT_TableInstance<DataTableRowData>;
};

export type DataTableProps = {
  /**
   * An optional action button above the table.
   */
  additionalActionButton?: ReactNode;
  /**
   * MenuItems that go in an optional action menu above the table.
   */
  additionalActionMenuItems?: ReactNode;
  /**
   * Menu items to include in the bulk actions menu, which appears above the table if a row or rows are selected
   */
  bulkActionMenuItems?: (
    selectedRows: MRT_RowSelectionState,
  ) => MenuButtonProps["children"];
  /**
   * The columns that make up the table
   */
  columns: DataTableColumn<DataTableRowData>[];
  /**
   * The current page number.
   */
  currentPage?: number;
  /**
   * The component to display when the table is displaying the initial empty state
   */
  emptyPlaceholder?: ReactNode;
  /**
   * If `error` is not undefined, the DataTable will indicate an error.
   */
  errorMessage?: string;
  /**
   * An optional set of filters to render in the filters menu
   */
  filters?: Array<DataFilter | DataTableColumn<DataTableRowData> | string>;
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
  }: DataTableGetDataType) =>
    | MRT_TableOptions<DataTableRowData>["data"]
    | Promise<MRT_TableOptions<DataTableRowData>["data"]>;
  /**
   * The function to get the ID of a row
   */
  getRowId?: MRT_TableOptions<DataTableRowData>["getRowId"];
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
   * If true, the end user can reorder rows via a drag-and-drop interface
   */
  hasRowReordering?: boolean;
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
   * If true, the search field will include a Search button, rather than
   * firing on input change.
   */
  hasSearchSubmitButton?: boolean;
  /**
   * If true, the end user can sort columns (ascending, descending, or neither)
   */
  hasSorting?: boolean;
  /**
   * The initial density (height & padding) of the table rows. This is available even if the
   * table density isn't changeable by the end user via hasChangeableDensity.
   */
  initialDensity?: (typeof densityValues)[number];
  /**
   * The initial search value
   */
  initialSearchValue?: string;
  /**
   * Is the next or show-more button disabled
   */
  isPaginationMoreDisabled?: boolean;
  /**
   * The highest page number allowed to be manually input in pagination
   */
  maxPages?: number;
  /**
   * The largest number of rows allowed to be shown per page. This only affects the row input
   * in pagination.
   */
  maxResultsPerPage?: number;
  /**
   * The component to display when the query returns no results
   */
  noResultsPlaceholder?: ReactNode;
  /**
   * Callback that fires when a row (or rows) is selected or unselected.
   */
  onChangeRowSelection?: (rowSelection: DataTableRowSelectionState) => void;
  /**
   * Callback that fires when the user reorders rows within the table. Can be used
   * to propagate order change to the backend.
   */
  onReorderRows?: ({ rowId, newRowIndex }: DataTableOnReorderRowsType) => void;
  /**
   * The type of pagination controls shown. Defaults to next/prev buttons, but can be
   * set to a simple "Load more" button by setting to "loadMore".
   */
  paginationType?: (typeof paginationTypeValues)[number];
  /**
   * The optional component to display when expanding a row.
   */
  renderDetailPanel?: MRT_TableOptions<DataTableRowData>["renderDetailPanel"];
  /**
   * The number of results per page.
   */
  resultsPerPage?: number;
  /**
   * Action buttons to display in each row
   */
  rowActionButtons?: DataTableRowActionsProps["rowActionButtons"];
  /**
   * Menu items to include in the optional actions menu on each row.
   */
  rowActionMenuItems?: DataTableRowActionsProps["rowActionMenuItems"];
  /**
   * The debounce time, in milliseconds, for the search input firing
   * `onChangeSearch` when changed. If `hasSearchSubmitButton` is true,
   * this doesn't do anything.
   */
  searchDelayTime?: number;
  /**
   * Allows for external control of the selected row state
   * use in tandem with onChangeRowSelection to manage your state
   */
  selectedRows?: DataTableRowSelectionState;
  /**
   * The total number of rows in the table. Optional, because it's sometimes impossible
   * to calculate. Used in table pagination to know when to disable the "next"/"more" button.
   */
  totalRows?: number;
};

const ScrollableTableContainer = styled("div", {
  shouldForwardProp: (prop) =>
    prop !== "odysseyDesignTokens" &&
    prop !== "isScrollableStart" &&
    prop !== "isScrollableEnd",
})<{
  isScrollableEnd: boolean;
  isScrollableStart: boolean;
  odysseyDesignTokens: DesignTokens;
}>(({ odysseyDesignTokens, isScrollableStart, isScrollableEnd }) => ({
  marginBlockEnd: odysseyDesignTokens.Spacing4,
  position: "relative",
  borderInlineStartColor: isScrollableStart
    ? odysseyDesignTokens.HueNeutral200
    : "transparent",
  borderInlineStartStyle: "solid",
  borderInlineStartWidth: odysseyDesignTokens.BorderWidthMain,
  "::before": {
    background:
      "linear-gradient(-90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.33) 50%, rgba(0, 0, 0, 1) 100%)",
    content: '""',
    opacity: isScrollableStart ? "0.075" : "0",
    pointerEvents: "none",
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    width: odysseyDesignTokens.Spacing6,
    zIndex: 100,
    transition: `opacity ${odysseyDesignTokens.TransitionDurationMain} ${odysseyDesignTokens.TransitionTimingMain}`,
  },
  borderInlineEndColor: isScrollableEnd
    ? odysseyDesignTokens.HueNeutral200
    : "transparent",
  borderInlineEndStyle: "solid",
  borderInlineEndWidth: odysseyDesignTokens.BorderWidthMain,
  "::after": {
    background:
      "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.33) 50%, rgba(0, 0, 0, 1) 100%)",
    content: '""',
    opacity: isScrollableEnd ? "0.075" : "0",
    pointerEvents: "none",
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    width: odysseyDesignTokens.Spacing6,
    transition: `opacity ${odysseyDesignTokens.TransitionDurationMain} ${odysseyDesignTokens.TransitionTimingMain}`,
  },
}));

const defaultGetRowId: DataTableProps["getRowId"] = (row) => row.id as string;

const DataTable = ({
  additionalActionButton,
  additionalActionMenuItems,
  bulkActionMenuItems,
  columns,
  currentPage = 1,
  emptyPlaceholder,
  errorMessage: errorMessageProp,
  filters: filtersProp,
  getData,
  getRowId = defaultGetRowId,
  hasChangeableDensity,
  hasColumnResizing,
  hasColumnVisibility,
  hasFilters,
  hasPagination,
  hasRowReordering,
  hasRowSelection,
  hasSearch,
  hasSearchSubmitButton,
  hasSorting,
  initialDensity = densityValues[0],
  initialSearchValue = "",
  isPaginationMoreDisabled,
  noResultsPlaceholder,
  onChangeRowSelection,
  onReorderRows,
  paginationType = "paged",
  renderDetailPanel,
  resultsPerPage = 20,
  maxResultsPerPage,
  maxPages,
  rowActionButtons,
  rowActionMenuItems,
  searchDelayTime,
  selectedRows,
  totalRows,
}: DataTableProps) => {
  const { t } = useTranslation();

  const [data, setData] = useState<DataTableRowData[]>([]);
  const [pagination, setPagination] = useState({
    pageIndex: currentPage,
    pageSize: resultsPerPage,
  });
  const [draggingRow, setDraggingRow] =
    useState<MRT_Row<DataTableRowData> | null>();
  const [isTableContainerScrolledToStart, setIsTableContainerScrolledToStart] =
    useState(true);
  const [isTableContainerScrolledToEnd, setIsTableContainerScrolledToEnd] =
    useState(true);
  const [tableInnerContainerWidth, setTableInnerContainerWidth] =
    useState<string>("100%");
  const tableOuterContainerRef = useRef<HTMLDivElement>(null);
  const tableInnerContainerRef = useRef<HTMLDivElement>(null);
  const tableContentRef = useRef<HTMLTableElement>(null);

  // Table states
  const [columnSorting, setColumnSorting] = useState<MRT_SortingState>([]);
  const [columnVisibility, setColumnVisibility] =
    useState<MRT_VisibilityState>();
  const [rowDensity, setRowDensity] =
    useState<MRT_DensityState>(initialDensity);
  const [search, setSearch] = useState<string>(initialSearchValue);
  const [filters, setFilters] = useState<DataFilter[]>();
  const [initialFilters, setInitialFilters] = useState<DataFilter[]>();
  const [isLoading, setIsLoading] = useState<boolean | undefined>(true);
  const [isEmpty, setIsEmpty] = useState<boolean | undefined>();
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    errorMessageProp,
  );
  const [_rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});
  const rowSelection = selectedRows || _rowSelection;

  useScrollIndication({
    tableOuterContainer: tableOuterContainerRef.current,
    tableInnerContainer: tableInnerContainerRef.current,
    setIsTableContainerScrolledToStart: setIsTableContainerScrolledToStart,
    setIsTableContainerScrolledToEnd: setIsTableContainerScrolledToEnd,
    setTableInnerContainerWidth: setTableInnerContainerWidth,
  });

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

  const rowDensityClassName = useMemo(() => {
    return rowDensity === "spacious"
      ? "MuiTableBody-spacious"
      : rowDensity === "compact"
        ? "MuiTableBody-compact"
        : "MuiTableBody-default";
  }, [rowDensity]);

  const renderRowActions = useCallback(
    ({ row }: { row: MRT_Row<DataTableRowData> }) => {
      const currentIndex =
        row.index + (pagination.pageIndex - 1) * pagination.pageSize;
      return (
        <DataTableRowActions
          row={row}
          rowActionButtons={rowActionButtons}
          rowActionMenuItems={rowActionMenuItems}
          rowIndex={currentIndex}
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

  /**
   * This hack is to provide compatibility with Material-React-Table's
   * filterOptions format, which allows for strings and { label: string, value: string }
   */
  const convertFilterSelectOptions = useCallback(
    (options: DataTableColumn<DataTableRowData>["filterSelectOptions"]) =>
      options?.map((option) =>
        typeof option === "string"
          ? {
              label: option,
              value: option,
            }
          : {
              // If the option isn't a string, it must have value and/or option defined
              // If either is undefined, use the other
              // These shouldn't need `as`, but this is a legacy file now. --Kevin Ghadyani
              label: (option.label ?? option.value) as string,
              value: (option.value ?? option.label) as string,
            },
      ),
    [],
  );

  const convertColumnToFilter = useCallback(
    (column: DataTableColumn<DataTableRowData>) =>
      column.enableColumnFilter !== false && column.accessorKey
        ? ({
            id: column.accessorKey,
            label: column.header,
            variant: column.filterVariant,
            options: convertFilterSelectOptions(column.filterSelectOptions),
          } satisfies DataFilter as DataFilter)
        : null,
    [convertFilterSelectOptions],
  );

  /**
   * Filters default to the columns, but can be overridden
   * with the `filters` prop. `filters` should be an array
   * of column accessorKeys, column defs, or DataFilters.
   */
  const dataTableFilters = useMemo(() => {
    const providedFilters = filtersProp || columns;
    return providedFilters.reduce<DataFilter[]>((accumulator, item) => {
      if (typeof item === "string") {
        const foundColumn = columns.find(
          (column) => column.accessorKey === item,
        );
        if (foundColumn) {
          const filter = convertColumnToFilter(foundColumn);
          if (filter) {
            return accumulator.concat(filter);
          }
        }
      } else if ("accessorKey" in item) {
        // Checks if it's a column
        const filter = convertColumnToFilter(item);
        if (filter) {
          return accumulator.concat(filter);
        }
      } else if ("label" in item) {
        // Checks if it's a DataFilter
        return accumulator.concat(item);
      }
      // If none of the conditions match, item is ignored (not mapping to undefined)
      return accumulator;
    }, []);
  }, [columns, filtersProp, convertColumnToFilter]);

  const defaultCell = useCallback(
    ({ cell }: { cell: DataTableCell<DataTableRowData> }) => {
      const value = cell.getValue<string>();
      const hasTextWrapping =
        cell.column.columnDef.hasTextWrapping ||
        cell.column.columnDef.enableWrapping;

      return hasTextWrapping ? (
        value
      ) : (
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

  const emptyState = useCallback(() => {
    const noResultsInnerContent = noResultsPlaceholder || (
      <EmptyState
        description={t("table.noresults.text")}
        heading={t("table.noresults.heading")}
      />
    );

    const emptyStateInnerContent =
      emptyPlaceholder && isEmpty ? emptyPlaceholder : noResultsInnerContent;

    return (
      <Box sx={{ width: tableInnerContainerWidth }}>
        {emptyStateInnerContent}
      </Box>
    );
  }, [
    emptyPlaceholder,
    isEmpty,
    noResultsPlaceholder,
    t,
    tableInnerContainerWidth,
  ]);

  const columnIds = useMemo(() => {
    return columns.map((column) => column.accessorKey);
  }, [columns]);

  const columnOrder = useMemo(
    () => [
      "mrt-row-drag",
      "mrt-row-select",
      "mrt-row-expand",
      ...columnIds,
      "mrt-row-actions",
    ],
    [columnIds],
  ) as string[];

  const shouldDisplayRowActions = useMemo(
    () =>
      (hasRowReordering === true && onReorderRows) ||
      rowActionButtons ||
      rowActionMenuItems
        ? true
        : false,
    [hasRowReordering, onReorderRows, rowActionButtons, rowActionMenuItems],
  );

  const muiTableBodyProps = useCallback<
    MRT_TableOptionsCallback<"muiTableBodyProps">
  >(
    () => ({
      className: rowDensityClassName,
    }),
    [rowDensityClassName],
  );

  const muiTableBodyCellProps = useCallback<
    MRT_TableOptionsCallback<"muiTableBodyCellProps">
  >(
    ({ column }) => ({
      className: column.getIsResizing() ? "isResizing" : "",
      sx: {
        overflowWrap: "anywhere",
      },
    }),
    [],
  );

  const muiDetailPanelProps = useCallback<
    MRT_TableOptionsCallback<"muiDetailPanelProps">
  >(
    ({ row }) => ({
      sx: {
        paddingBlock: row.getIsExpanded()
          ? `${odysseyDesignTokens.Spacing3} !important`
          : undefined,
      },
    }),
    [odysseyDesignTokens.Spacing3],
  );

  const muiTableBodyRowProps = useCallback<
    MRT_TableOptionsCallback<"muiTableBodyRowProps">
  >(
    ({ table, row, isDetailPanel }) => ({
      className: draggableTableBodyRowClassName({
        currentRowId: row.id,
        draggingRowId: draggingRow?.id,
        hoveredRowId: table.getState().hoveredRow?.id,
      }),
      sx: {
        ...(isDetailPanel && {
          paddingBlock: "0 !important",
          border: 0,
          ["&:hover"]: {
            backgroundColor: `transparent !important`,
          },
        }),
      },
    }),
    [draggableTableBodyRowClassName, draggingRow?.id],
  );

  const muiRowDragHandleProps = useCallback<
    MRT_TableOptionsCallback<"muiRowDragHandleProps">
  >(
    ({ table, row }) => ({
      onKeyDown: (event) => handleDragHandleKeyDown({ table, row, event }),
      onBlur: () => resetDraggingAndHoveredRow(table),
      onDragEnd: () => handleDragHandleOnDragEnd(table),
      onDragCapture: () => handleDragHandleOnDragCapture(table),
      sx: dragHandleStyles,
      ...dragHandleText,
    }),
    [
      dragHandleStyles,
      dragHandleText,
      handleDragHandleKeyDown,
      resetDraggingAndHoveredRow,
      handleDragHandleOnDragEnd,
      handleDragHandleOnDragCapture,
    ],
  );

  const muiTableHeadCellProps = useCallback<
    MRT_TableOptionsCallback<"muiTableHeadCellProps">
  >(
    ({ column: currentColumn }) => ({
      className: columnSorting.find(
        (sortedColumn) => sortedColumn.id === currentColumn.id,
      )
        ? "isSorted"
        : "isUnsorted",
    }),
    [columnSorting],
  );

  const hasColumnWithGrow = useMemo(
    () => columns.some((column) => column.grow === true),
    [columns],
  );

  const dataTable = useMaterialReactTable({
    columns: columns,
    data: data,
    getRowId,
    state: {
      sorting: columnSorting,
      globalFilter: search,
      columnVisibility,
      isLoading,
      rowSelection,
      columnOrder,
    },
    icons: {
      ArrowDownwardIcon: ArrowDownIcon,
      DragHandleIcon: DragIndicatorIcon,
      SyncAltIcon: ArrowUnsortedIcon,
      ExpandMoreIcon: ChevronDownIcon,
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
    displayColumnDefOptions: {
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
          children: (
            <Box sx={{ display: "flex", visibility: "hidden" }}>
              {rowActionButtons && rowActionButtons({ id: null })}
              {((hasRowReordering && onReorderRows) || rowActionMenuItems) && (
                <Box>
                  <Button
                    ariaLabel={t("table.moreactions.arialabel")}
                    endIcon={<MoreIcon />}
                    isDisabled
                    size="small"
                    variant="floating"
                  />
                </Box>
              )}
            </Box>
          ),
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
      "mrt-row-expand": {
        header: "",
      },
    },
    muiTableBodyProps,
    defaultColumn: {
      Cell: defaultCell,
    },
    muiTableBodyCellProps,

    // Reordering
    enableRowOrdering: hasRowReordering && Boolean(onReorderRows),
    enableRowDragging: hasRowReordering && Boolean(onReorderRows),
    muiDetailPanelProps,
    muiTableBodyRowProps,
    muiRowDragHandleProps,

    // Row actions
    enableRowActions: shouldDisplayRowActions,
    positionActionsColumn:
      "last" as MRT_TableOptions<DataTableRowData>["positionActionsColumn"],
    renderRowActions: ({ row }) => renderRowActions({ row }),

    // Row selection
    enableRowSelection: hasRowSelection,
    onRowSelectionChange: setRowSelection,

    // Sorting
    enableSorting: hasSorting,
    onSortingChange: setColumnSorting,
    muiTableHeadCellProps,

    // Virtualization
    enableRowVirtualization:
      paginationType !== "loadMore" && pagination.pageSize > 50,
    rowVirtualizerInstanceRef:
      useRef<MRT_RowVirtualizer<HTMLDivElement, HTMLTableRowElement>>(null),
    rowVirtualizerOptions: {
      overscan: 4,
    },

    // States
    renderEmptyRowsFallback: emptyState,

    // Refs
    muiTableProps: {
      ref: tableContentRef,
      className:
        !shouldDisplayRowActions && hasColumnResizing
          ? hasColumnWithGrow
            ? "ods-hide-spacer-column"
            : "ods-hide-spacer-column ods-column-grow"
          : "",
    },

    muiTableContainerProps: {
      ref: tableInnerContainerRef,
    },

    // Row expansion
    enableExpandAll: false,
    renderDetailPanel: renderDetailPanel,
  });

  // Effects
  const bulkActionMenuButton = useMemo(
    () => (
      <>
        <MenuButton
          ariaLabel="More actions"
          buttonVariant="secondary"
          endIcon={<MoreIcon />}
          isDisabled={Object.keys(rowSelection).length === 0}
        >
          {bulkActionMenuItems?.(rowSelection)}
        </MenuButton>
      </>
    ),
    [bulkActionMenuItems, rowSelection],
  );

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      setErrorMessage(errorMessageProp);
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
        setErrorMessage(typeof error === "string" ? error : t("table.error"));
      } finally {
        setIsLoading(false);
      }
    })();
  }, [
    columnSorting,
    errorMessageProp,
    filters,
    getData,
    pagination,
    search,
    t,
  ]);

  useEffect(() => {
    if (!initialFilters && filters) {
      setInitialFilters(filters);
    }

    setIsEmpty(
      pagination.pageIndex === currentPage &&
        pagination.pageSize === resultsPerPage &&
        search === "" &&
        filters === initialFilters &&
        data.length === 0,
    );
  }, [
    filters,
    pagination,
    search,
    data,
    currentPage,
    initialFilters,
    resultsPerPage,
  ]);

  useEffect(() => {
    setPagination((prev) => ({
      pageIndex: 1,
      pageSize: prev.pageSize,
    }));
  }, [filters, search]);

  useEffect(() => {
    onChangeRowSelection?.(rowSelection);
  }, [rowSelection, onChangeRowSelection]);

  const { lastRow } = usePagination({
    currentRowsCount: data.length,
    pageIndex: pagination.pageIndex,
    pageSize: pagination.pageSize,
    totalRows,
  });

  // Render the table
  return (
    <>
      {(hasSearch ||
        hasFilters ||
        hasChangeableDensity ||
        hasColumnVisibility ||
        bulkActionMenuItems ||
        additionalActionButton ||
        additionalActionMenuItems) && (
        <Box sx={{ marginBottom: 5 }}>
          <DataFilters
            additionalActions={
              <>
                <DataTableSettings
                  columns={columns}
                  columnVisibility={columnVisibility}
                  hasChangeableDensity={hasChangeableDensity}
                  hasColumnVisibility={hasColumnVisibility}
                  rowDensity={rowDensity}
                  setColumnVisibility={setColumnVisibility}
                  setRowDensity={setRowDensity}
                />
                {bulkActionMenuItems && bulkActionMenuButton}
                {additionalActionButton}
                {additionalActionMenuItems && (
                  <MenuButton
                    ariaLabel={t("table.moreactions.arialabel")}
                    buttonVariant="secondary"
                    endIcon={<MoreIcon />}
                    menuAlignment="right"
                  >
                    {additionalActionMenuItems}
                  </MenuButton>
                )}
              </>
            }
            defaultSearchTerm={initialSearchValue}
            filters={hasFilters ? dataTableFilters : undefined}
            hasSearchSubmitButton={hasSearchSubmitButton}
            isDisabled={isEmpty}
            onChangeFilters={hasFilters ? setFilters : undefined}
            onChangeSearch={hasSearch ? setSearch : undefined}
            searchDelayTime={searchDelayTime}
          />
        </Box>
      )}

      {errorMessage && (
        <Box sx={{ marginBlockEnd: 2 }}>
          <Callout severity="error" text={errorMessage} />
        </Box>
      )}

      <ScrollableTableContainer
        isScrollableEnd={!isTableContainerScrolledToEnd}
        isScrollableStart={!isTableContainerScrolledToStart}
        odysseyDesignTokens={odysseyDesignTokens}
        ref={tableOuterContainerRef}
      >
        <MRT_TableContainer table={dataTable} />
      </ScrollableTableContainer>

      {hasPagination && (
        <Pagination
          currentPageLabel={t("pagination.page")}
          currentRowsCount={data.length}
          isDisabled={isEmpty}
          isMoreDisabled={isPaginationMoreDisabled}
          lastRow={lastRow}
          loadMoreLabel={t("pagination.loadmore")}
          maxPageIndex={maxPages}
          maxPageSize={maxResultsPerPage}
          nextLabel={t("pagination.next")}
          onPaginationChange={setPagination}
          pageIndex={pagination.pageIndex}
          pageSize={pagination.pageSize}
          previousLabel={t("pagination.previous")}
          rowsPerPageLabel={t("pagination.rowsperpage")}
          totalRows={totalRows}
          variant={paginationType}
        />
      )}
    </>
  );
};

const MemoizedDataTable = memo(DataTable);
MemoizedDataTable.displayName = "DataTable";

export { MemoizedDataTable as DataTable };
