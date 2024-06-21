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
} from "../../icons.generated";
import { Box } from "../../Box";
import { TableProps, TableState, UniversalProps } from "./componentTypes";
import { DataTableCell } from "./dataTypes";
import {
  dataTableImmutableSettings,
  displayColumnDefOptions,
  ScrollableTableContainer,
} from "./tableConstants";
import { MenuButton } from "../../MenuButton";
import { MoreIcon } from "../../icons.generated";
import { RowActions } from "./RowActions";
import { useOdysseyDesignTokens } from "../../OdysseyDesignTokensContext";
import { useScrollIndication } from "../../DataTable/useScrollIndication";

const TextWrapper = styled("div")(() => ({
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  overflow: "hidden",
}));

const RowActionsContainer = styled("div")(() => ({
  display: "flex",
}));

export type TableContentProps = {
  columns: TableProps["columns"];
  data: MRT_RowData[];
  draggingRow?: MRT_Row<MRT_RowData> | null;
  emptyState: ReactNode;
  getRowId: UniversalProps["getRowId"];
  hasRowReordering: UniversalProps["hasRowReordering"];
  hasRowSelection: UniversalProps["hasRowSelection"];
  isEmpty?: boolean;
  isLoading: boolean;
  isNoResults?: boolean;
  isRowReorderingDisabled?: boolean;
  onReorderRows: UniversalProps["onReorderRows"];
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
      table: MRT_TableInstance<MRT_RowData>;
      row: MRT_Row<MRT_RowData>;
      event: React.KeyboardEvent<HTMLButtonElement>;
    }) => void;
    handleDragHandleOnDragCapture: (
      table: MRT_TableInstance<MRT_RowData>,
    ) => void;
    handleDragHandleOnDragEnd: (table: MRT_TableInstance<MRT_RowData>) => void;
    resetDraggingAndHoveredRow: (table: MRT_TableInstance<MRT_RowData>) => void;
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
  tableOptions: TableProps;
  tableState: TableState;
  totalRows: UniversalProps["totalRows"];
};

const TableContent = ({
  columns,
  data,
  draggingRow,
  emptyState,
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
  tableOptions,
  tableState,
  totalRows,
}: TableContentProps) => {
  const [isTableContainerScrolledToStart, setIsTableContainerScrolledToStart] =
    useState(true);
  const [isTableContainerScrolledToEnd, setIsTableContainerScrolledToEnd] =
    useState(true);
  const [tableInnerContainerWidth, setTableInnerContainerWidth] =
    useState<string>("100%");
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
      ...columnIds,
      "mrt-row-actions",
    ],
    [columnIds],
  ) as string[];

  const rowDensityClassName = useMemo(() => {
    return tableState.rowDensity === "spacious"
      ? "MuiTableBody-spacious"
      : tableState.rowDensity === "compact"
        ? "MuiTableBody-compact"
        : "MuiTableBody-default";
  }, [tableState]);

  const defaultCell = useCallback(
    ({ cell }: { cell: DataTableCell<MRT_RowData> }) => {
      const value = cell.getValue<string>();
      const hasTextWrapping =
        cell.column.columnDef.hasTextWrapping ||
        cell.column.columnDef.enableWrapping;

      return hasTextWrapping ? value : <TextWrapper>{value}</TextWrapper>;
    },
    [],
  );

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
    ({ row }: { row: MRT_Row<MRT_RowData> }) => {
      const currentIndex =
        row.index + (pagination.pageIndex - 1) * pagination.pageSize;
      return (
        <RowActionsContainer>
          {tableOptions.rowActionButtons?.(row)}
          {(tableOptions.rowActionMenuItems || hasRowReordering) && (
            <MenuButton
              ariaLabel={t("table.moreactions.arialabel")}
              buttonVariant="floating"
              endIcon={<MoreIcon />}
              menuAlignment="right"
              size="small"
            >
              <RowActions
                isRowReorderingDisabled={isRowReorderingDisabled}
                row={row}
                rowActionMenuItems={tableOptions.rowActionMenuItems}
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
      tableOptions,
      totalRows,
      updateRowOrder,
    ],
  );

  const emptyStateContainer = useCallback(
    () => <Box sx={{ width: tableInnerContainerWidth }}>{emptyState}</Box>,
    [tableInnerContainerWidth, emptyState],
  );

  const dataTable = useMaterialReactTable({
    data: !isEmpty && !isNoResults ? data : [],
    columns,
    getRowId,
    state: {
      sorting: tableState.columnSorting,
      columnVisibility: tableState.columnVisibility,
      isLoading: isLoading,
      rowSelection: rowSelection,
      columnOrder: columnOrder,
    },
    icons: {
      ArrowDownwardIcon: ArrowDownIcon,
      DragHandleIcon: DragIndicatorIcon,
      SyncAltIcon: ArrowUnsortedIcon,
      ExpandMoreIcon: ChevronDownIcon,
    },
    ...dataTableImmutableSettings,
    displayColumnDefOptions:
      displayColumnDefOptions as MRT_TableOptions<MRT_RowData>["displayColumnDefOptions"],
    muiTableProps: {
      ref: tableContentRef,
    },
    muiTableContainerProps: {
      ref: tableInnerContainerRef,
    },
    muiTableBodyProps: () => ({
      className: rowDensityClassName,
    }),
    enableColumnResizing: tableOptions.hasColumnResizing,
    defaultColumn: {
      Cell: defaultCell,
    },
    enableRowActions:
      (hasRowReordering === true && onReorderRows) ||
      tableOptions.rowActionButtons ||
      tableOptions.rowActionMenuItems
        ? true
        : false,
    renderRowActions: ({ row }) => renderRowActions({ row }),
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
      disabled: isRowReorderingDisabled,
      sx: dragHandleStyles,
      ...dragHandleText,
    }),
    renderDetailPanel: tableOptions.renderDetailPanel,
    enableRowVirtualization: data.length >= 50,
    muiTableHeadCellProps: ({ column: currentColumn }) => ({
      className: tableState.columnSorting.find(
        (sortedColumn) => sortedColumn.id === currentColumn.id,
      )
        ? "isSorted"
        : "isUnsorted",
    }),
    enableSorting: tableOptions.hasSorting === true, // I don't know why this needs to be true, but it still works if undefined otherwise
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

const MemoizedTableContent = memo(TableContent);
MemoizedTableContent.displayName = "TableContent";

export { MemoizedTableContent as TableContent };
