/*!
 * Copyright (c) 2024-present, Okta, Inc. and/or its affiliates. All rights reserved.
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
  SetStateAction,
  memo,
  useCallback,
  useMemo,
  useRef,
  useState,
  ReactNode,
  Dispatch,
  ReactElement,
  useEffect,
} from "react";
import styled, { CSSObject } from "@emotion/styled";
import {
  MRT_Row,
  MRT_RowData,
  MRT_RowSelectionState,
  MRT_TableContainer,
  MRT_TableInstance,
  MRT_TableOptions,
  useMaterialReactTable,
} from "material-react-table";
import { useTranslation } from "react-i18next";

import {
  ArrowDownIcon,
  ArrowUnsortedIcon,
  ChevronDownIcon,
  DragIndicatorIcon,
  MoreIcon,
} from "../../icons.generated/index.js";
import { Box } from "../../Box.js";
import { Button, MenuButton } from "../../Buttons/index.js";
import {
  TableLayoutProps,
  TableState,
  UniversalProps,
} from "./componentTypes.js";
import { DataTableCell } from "./dataTypes.js";
import {
  dataTableImmutableSettings,
  displayColumnDefOptions,
  ScrollableTableContainer,
} from "./tableConstants.js";
import { RowActions } from "./RowActions.js";
import { useOdysseyDesignTokens } from "../../OdysseyDesignTokensContext.js";
import { useScrollIndication } from "../../DataTable/useScrollIndication.js";

const TextWrapper = styled("div")({
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  overflow: "hidden",
});

const RowActionsContainer = styled("div")({
  display: "flex",
});

export type TableLayoutContentProps<TData extends MRT_RowData> = {
  columns: TableLayoutProps<TData>["columns"];
  data: MRT_RowData[];
  draggingRow?: MRT_Row<TData> | null;
  emptyState: ReactNode;
  enableVirtualization?: boolean;
  getRowId: UniversalProps<TData>["getRowId"];
  hasRowReordering: UniversalProps<TData>["hasRowReordering"];
  hasRowSelection: UniversalProps<TData>["hasRowSelection"];
  isEmpty?: boolean;
  isLoading: boolean;
  isNoResults?: boolean;
  isRowReorderingDisabled?: boolean;
  onReorderRows: UniversalProps<TData>["onReorderRows"];
  pagination: {
    pageIndex: number;
    pageSize: number;
  };
  rowReorderingUtilities: {
    dragHandleStyles: CSSObject;
    dragHandleText: {
      title: string;
      "aria-label": string;
    };
    draggableTableBodyRowClassName: ({
      currentRowId,
      draggingRowId,
      hoveredRowId,
    }: {
      currentRowId: string;
      draggingRowId?: string;
      hoveredRowId?: string;
    }) => string | undefined;
    handleDragHandleKeyDown: ({
      table,
      row,
      event,
    }: {
      table: MRT_TableInstance<TData>;
      row: MRT_Row<TData>;
      event: React.KeyboardEvent<HTMLButtonElement>;
    }) => void;
    handleDragHandleOnDragCapture: (table: MRT_TableInstance<TData>) => void;
    handleDragHandleOnDragEnd: (table: MRT_TableInstance<TData>) => void;
    resetDraggingAndHoveredRow: (table: MRT_TableInstance<TData>) => void;
    updateRowOrder: ({
      rowId,
      newRowIndex,
    }: {
      rowId: string;
      newRowIndex: number;
    }) => void;
  };
  rowSelection: MRT_RowSelectionState;
  setRowSelection: Dispatch<SetStateAction<MRT_RowSelectionState>>;
  setTableState: Dispatch<SetStateAction<TableState>>;
  tableLayoutOptions: TableLayoutProps<TData>;
  tableState: TableState;
  totalRows: UniversalProps<TData>["totalRows"];
};

type TableLayoutContentComponent = (<TData extends MRT_RowData>(
  props: TableLayoutContentProps<TData>,
) => JSX.Element) & {
  displayName?: string;
};

const TableLayoutContent = <TData extends MRT_RowData>({
  columns,
  data,
  draggingRow,
  emptyState,
  enableVirtualization,
  getRowId,
  hasRowReordering,
  hasRowSelection,
  isEmpty,
  isLoading,
  isNoResults,
  isRowReorderingDisabled,
  onReorderRows,
  pagination,
  rowReorderingUtilities,
  rowSelection,
  setRowSelection,
  setTableState,
  tableLayoutOptions,
  tableState,
  totalRows,
}: TableLayoutContentProps<TData>) => {
  const [isTableContainerScrolledToStart, setIsTableContainerScrolledToStart] =
    useState(true);
  const [isTableContainerScrolledToEnd, setIsTableContainerScrolledToEnd] =
    useState(true);
  const [tableInnerContainerWidth, setTableInnerContainerWidth] =
    useState<string>("100%");
  const shouldUpdateScroll = useRef<boolean>(false);
  const tableOuterContainerRef = useRef<HTMLDivElement>(null);
  const tableInnerContainerRef = useRef<HTMLDivElement>(null);
  const tableContentRef = useRef<HTMLTableElement>(null);

  useScrollIndication({
    setIsTableContainerScrolledToEnd: setIsTableContainerScrolledToEnd,
    setIsTableContainerScrolledToStart: setIsTableContainerScrolledToStart,
    setTableInnerContainerWidth: setTableInnerContainerWidth,
    tableInnerContainer: tableInnerContainerRef.current,
    tableOuterContainer: tableOuterContainerRef.current,
  });

  const odysseyDesignTokens = useOdysseyDesignTokens();
  const { t } = useTranslation();

  const columnIds = useMemo(() => {
    return columns.map((column) => column.accessorKey) ?? [];
  }, [columns]);

  const columnOrder = useMemo(
    () => [
      "mrt-row-drag",
      "mrt-row-select",
      "mrt-row-expand",
      ...(columnIds?.filter((id): id is string => typeof id === "string") ||
        []),
      "mrt-row-actions",
    ],
    [columnIds],
  );

  const rowDensityClassName = useMemo(() => {
    return tableState.rowDensity === "spacious"
      ? "MuiTableBody-spacious"
      : tableState.rowDensity === "compact"
        ? "MuiTableBody-compact"
        : "MuiTableBody-default";
  }, [tableState]);

  const defaultCell = useCallback<
    ({ cell }: { cell: DataTableCell<TData, unknown> }) => ReactElement | string
  >(({ cell }) => {
    const value = cell.getValue<string>();
    const hasTextWrapping =
      cell.column.columnDef.hasTextWrapping ||
      cell.column.columnDef.enableWrapping;
    return hasTextWrapping ? value : <TextWrapper>{value}</TextWrapper>;
  }, []);

  const {
    draggableTableBodyRowClassName,
    dragHandleStyles,
    dragHandleText,
    handleDragHandleKeyDown,
    handleDragHandleOnDragCapture,
    handleDragHandleOnDragEnd,
    resetDraggingAndHoveredRow,
    updateRowOrder,
  } = rowReorderingUtilities;

  const renderRowActions = useCallback(
    ({ row }: { row: MRT_Row<TData> }) => {
      const currentIndex =
        row.index + (pagination.pageIndex - 1) * pagination.pageSize;
      return (
        <RowActionsContainer>
          {tableLayoutOptions.rowActionButtons?.(row)}
          {(tableLayoutOptions.rowActionMenuItems || hasRowReordering) && (
            <MenuButton
              ariaLabel={t("table.moreactions.arialabel")}
              buttonVariant="floating"
              endIcon={<MoreIcon />}
              menuAlignment="right"
              size="small"
            >
              <RowActions
                isRowReorderingDisabled={isRowReorderingDisabled}
                row={
                  row as unknown as MRT_Row<MRT_RowData> // TODO: FIX THIS! The types are wrong. `row` is incorrectly set in `RowActions` to not be TData.
                }
                rowActionMenuItems={
                  // TODO: FIX THIS! The types are wrong. `row` is incorrectly set in `RowActions` to not be TData.
                  tableLayoutOptions.rowActionMenuItems as unknown as (
                    row: MRT_Row<MRT_RowData>,
                  ) => any // eslint-disable-line @typescript-eslint/no-explicit-any
                }
                rowIndex={currentIndex}
                totalRows={totalRows}
                updateRowOrder={
                  hasRowReordering && onReorderRows ? updateRowOrder : undefined
                }
              />
            </MenuButton>
          )}
        </RowActionsContainer>
      );
    },
    [
      hasRowReordering,
      isRowReorderingDisabled,
      onReorderRows,
      pagination.pageIndex,
      pagination.pageSize,
      t,
      tableLayoutOptions,
      totalRows,
      updateRowOrder,
    ],
  );

  const innerWidthStyle = useMemo(
    () => ({ width: tableInnerContainerWidth }),
    [tableInnerContainerWidth],
  );

  const emptyStateContainer = useCallback(
    () => <Box sx={innerWidthStyle}>{emptyState}</Box>,
    [innerWidthStyle, emptyState],
  );

  // Scroll to the bottom as soon as data loads after clicking the
  // loadMore pagination button
  useEffect(() => {
    if (enableVirtualization) {
      shouldUpdateScroll.current = true;
    }
  }, [enableVirtualization, pagination]);

  useEffect(() => {
    if (
      shouldUpdateScroll.current &&
      tableContentRef.current &&
      typeof tableInnerContainerRef.current?.scrollTo !== "undefined"
    ) {
      tableInnerContainerRef.current?.scrollTo(
        0,
        tableContentRef.current.clientHeight,
      );
      shouldUpdateScroll.current = false;
    }
  }, [data]);

  const shouldDisplayRowActions = useMemo(
    () =>
      (hasRowReordering === true && onReorderRows) ||
      tableLayoutOptions.rowActionButtons ||
      tableLayoutOptions.rowActionMenuItems
        ? true
        : false,
    [
      hasRowReordering,
      onReorderRows,
      tableLayoutOptions.rowActionButtons,
      tableLayoutOptions.rowActionMenuItems,
    ],
  );

  const hasColumnWithGrow = columns.some((column) => column.grow === true);

  const dataTable = useMaterialReactTable<TData>({
    data: (!isEmpty && !isNoResults ? data : []) as TData[],
    columns,
    getRowId,
    state: {
      sorting: tableState.columnSorting,
      columnVisibility: tableState.columnVisibility,
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
    ...dataTableImmutableSettings,
    displayColumnDefOptions: {
      ...(displayColumnDefOptions satisfies Partial<
        MRT_TableOptions<MRT_RowData>["displayColumnDefOptions"]
      >),
      "mrt-row-actions": {
        header: "",
        grow: !hasColumnWithGrow,
        muiTableBodyCellProps: {
          align: "right" as const,
          sx: {
            overflow: "visible",
            width: "unset",
          },
          className: "ods-actions-cell",
        },
        muiTableHeadCellProps: {
          align: "right" as const,
          sx: {
            width: "unset",
          },
          className: "ods-actions-cell",
          children: (
            <Box sx={{ display: "flex", visibility: "hidden" }}>
              {tableLayoutOptions.rowActionButtons &&
                // @ts-expect-error TODO: This type is wrong and needs to be fixed
                tableLayoutOptions.rowActionButtons({ id: null })}
              {((hasRowReordering === true && onReorderRows) ||
                tableLayoutOptions.rowActionMenuItems) && (
                <Box>
                  <Button
                    endIcon={<MoreIcon />}
                    size="small"
                    variant="floating"
                    ariaLabel={t("table.moreactions.arialabel")}
                    isDisabled
                  />
                </Box>
              )}
            </Box>
          ),
        },
      },
    },
    muiTableProps: {
      ref: tableContentRef,
      className:
        !shouldDisplayRowActions && tableLayoutOptions.hasColumnResizing
          ? hasColumnWithGrow
            ? "ods-hide-spacer-column"
            : "ods-hide-spacer-column ods-column-grow"
          : "",
    },
    muiTableContainerProps: {
      ref: tableInnerContainerRef,
    },
    muiTableBodyProps: () => ({
      className: rowDensityClassName,
      tabIndex: 0,
      /**
       * This is a fix for an issue related to the empty state creating a
       * vertical scrollbar when virtualization is enabled. The root cause
       * is tablebody having height: 0 when virtualization is enabled and there
       * being no data
       * https://okta.slack.com/archives/C7T2H3KNJ/p1742842106148929
       */
      sx:
        isEmpty || isNoResults
          ? {
              height: "unset",
            }
          : undefined,
    }),
    enableColumnResizing: tableLayoutOptions.hasColumnResizing,
    defaultColumn: {
      Cell: defaultCell,
    },
    enableRowActions:
      (hasRowReordering === true && onReorderRows) ||
      tableLayoutOptions.rowActionButtons ||
      tableLayoutOptions.rowActionMenuItems
        ? true
        : false,
    renderRowActions: ({ row }) => renderRowActions({ row }),
    enableRowOrdering: hasRowReordering && Boolean(onReorderRows),
    enableRowDragging: hasRowReordering && Boolean(onReorderRows),
    muiDetailPanelProps: ({ row }) => ({
      sx: {
        paddingBlock: row.getIsExpanded()
          ? `${odysseyDesignTokens.Spacing3} !important`
          : undefined,
      },
    }),
    muiTableBodyRowProps: ({ table, row, isDetailPanel }) => ({
      className: draggableTableBodyRowClassName({
        currentRowId: row.id,
        draggingRowId: draggingRow?.id,
        hoveredRowId: table.getState().hoveredRow?.id,
      }),
      sx: isDetailPanel
        ? {
            paddingBlock: "0 !important",
            border: 0,
            ["&:hover"]: {
              backgroundColor: `${odysseyDesignTokens.HueNeutralWhite} !important`,
            },
          }
        : {},
    }),
    muiRowDragHandleProps: ({ table, row }) => ({
      onKeyDown: (event) => handleDragHandleKeyDown({ table, row, event }),
      onBlur: () => resetDraggingAndHoveredRow(table),
      onDragEnd: () => handleDragHandleOnDragEnd(table),
      onDragCapture: () => handleDragHandleOnDragCapture(table),
      disabled: isRowReorderingDisabled,
      sx: dragHandleStyles,
      ...dragHandleText,
    }),
    renderDetailPanel: tableLayoutOptions.renderDetailPanel,
    enableRowVirtualization: enableVirtualization,
    muiTableHeadCellProps: ({ column: currentColumn }) => ({
      className: tableState.columnSorting.find(
        (sortedColumn) => sortedColumn.id === currentColumn.id,
      )
        ? "isSorted"
        : "isUnsorted",
    }),
    muiTableBodyCellProps: ({ column }) => ({
      className: column.getIsResizing() ? "isResizing" : "",
    }),
    enableSorting: tableLayoutOptions.hasSorting === true, // I don't know why this needs to be true, but it still works if undefined otherwise
    onSortingChange: (sortingUpdater) => {
      const newSortVal =
        typeof sortingUpdater === "function"
          ? sortingUpdater(tableState.columnSorting)
          : tableState.columnSorting;
      setTableState((prevState) => ({
        ...prevState,
        columnSorting: newSortVal,
      }));
    },
    enableRowSelection: hasRowSelection,
    onRowSelectionChange: setRowSelection,
    renderEmptyRowsFallback: emptyStateContainer,
    localization: {
      collapse: t("table.rowexpansion.collapse"),
      collapseAll: t("table.rowexpansion.collapseall"),
      expand: t("table.rowexpansion.expand"),
      expandAll: t("table.rowexpansion.expandall"),
    },
  });

  return (
    <ScrollableTableContainer
      isScrollableEnd={!isTableContainerScrolledToEnd}
      isScrollableStart={!isTableContainerScrolledToStart}
      odysseyDesignTokens={odysseyDesignTokens}
      ref={tableOuterContainerRef}
    >
      <MRT_TableContainer table={dataTable} />
    </ScrollableTableContainer>
  );
};

const MemoizedTableLayoutContent = memo(
  TableLayoutContent,
) as TableLayoutContentComponent;
MemoizedTableLayoutContent.displayName = "TableLayoutContent";

export { MemoizedTableLayoutContent as TableLayoutContent };
