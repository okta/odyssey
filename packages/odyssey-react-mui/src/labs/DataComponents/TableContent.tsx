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
  MRT_TableContainer,
  MRT_TableOptions,
  useMaterialReactTable,
  MRT_Row,
  MRT_RowData,
  MRT_TableInstance,
  MRT_RowSelectionState,
} from "material-react-table";
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
import { TableProps, TableState, UniversalProps, DataTableCell } from "./types";
import { DataTableRowData } from "../../DataTable";
import { DataTableRowActions } from "../../DataTable/DataTableRowActions";
import {
  ArrowDownIcon,
  ArrowUnsortedIcon,
  ChevronDownIcon,
  DragIndicatorIcon,
} from "../../icons.generated";
import {
  dataTableImmutableSettings,
  displayColumnDefOptions,
  ScrollableTableContainer,
} from "./tableConstants";
import { useScrollIndication } from "../../DataTable/useScrollIndication";
import { useOdysseyDesignTokens } from "../../OdysseyDesignTokensContext";
import { Box } from "../../Box";
import { CSSObject } from "@emotion/styled";

export type TableContentProps = {
  data: MRT_TableOptions<DataTableRowData>["data"];
  columns: TableProps["columns"];
  getRowId: UniversalProps["getRowId"];
  tableState: TableState;
  setTableState: Dispatch<SetStateAction<TableState>>;
  tableOptions: TableProps;
  isLoading: boolean;
  hasRowReordering: UniversalProps["hasRowReordering"];
  onReorderRows: UniversalProps["onReorderRows"];
  totalRows: UniversalProps["totalRows"];
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
  hasRowSelection: UniversalProps["hasRowSelection"];
  rowSelection: MRT_RowSelectionState;
  setRowSelection: Dispatch<SetStateAction<MRT_RowSelectionState>>;
  emptyState: ReactNode;
  pagination: {
    pageIndex: number;
    pageSize: number;
  };
  draggingRow?: MRT_Row<DataTableRowData> | null;
};

const TableContent = ({
  data,
  columns,
  getRowId,
  tableOptions,
  tableState,
  setTableState,
  isLoading,
  hasRowReordering,
  onReorderRows,
  rowReorderingUtilities,
  hasRowSelection,
  rowSelection,
  setRowSelection,
  emptyState,
  pagination,
  totalRows,
  draggingRow,
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
    tableOuterContainer: tableOuterContainerRef.current,
    tableInnerContainer: tableInnerContainerRef.current,
    setIsTableContainerScrolledToStart: setIsTableContainerScrolledToStart,
    setIsTableContainerScrolledToEnd: setIsTableContainerScrolledToEnd,
    setTableInnerContainerWidth: setTableInnerContainerWidth,
  });

  const odysseyDesignTokens = useOdysseyDesignTokens();

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
    ({ cell }: { cell: DataTableCell<DataTableRowData> }) => {
      const value = cell.getValue<string>();
      const hasTextWrapping = cell.column.columnDef.hasTextWrapping;

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

  const {
    dragHandleStyles,
    dragHandleText,
    draggableTableBodyRowClassName,
    handleDragHandleKeyDown,
    handleDragHandleOnDragCapture,
    handleDragHandleOnDragEnd,
    resetDraggingAndHoveredRow,
    updateRowOrder,
  } = rowReorderingUtilities;

  const renderRowActions = useCallback(
    ({ row }: { row: MRT_Row<DataTableRowData> }) => {
      // TODO: is there a better way to get the row index?
      // Maybe inject the true index into each row when retrieved
      const currentIndex =
        row.index + (pagination.pageIndex - 1) * pagination.pageSize;
      return (
        <DataTableRowActions
          row={row}
          rowIndex={currentIndex}
          rowActionButtons={tableOptions.rowActionButtons}
          rowActionMenuItems={tableOptions.rowActionMenuItems}
          totalRows={totalRows}
          updateRowOrder={
            hasRowReordering && onReorderRows ? updateRowOrder : undefined
          }
        />
      );
    },
    [
      pagination,
      tableOptions,
      hasRowReordering,
      onReorderRows,
      totalRows,
      updateRowOrder,
    ],
  );

  const emptyStateContainer = useCallback(
    () => <Box sx={{ width: tableInnerContainerWidth }}>{emptyState}</Box>,
    [tableInnerContainerWidth, emptyState],
  );

  const dataTable = useMaterialReactTable({
    data,
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
      displayColumnDefOptions as MRT_TableOptions<DataTableRowData>["displayColumnDefOptions"],
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
      odysseyDesignTokens={odysseyDesignTokens}
      isScrollableStart={!isTableContainerScrolledToStart}
      isScrollableEnd={!isTableContainerScrolledToEnd}
      ref={tableOuterContainerRef}
    >
      <MRT_TableContainer table={dataTable} />
    </ScrollableTableContainer>
  );
};

const MemoizedTableContent = memo(TableContent);
MemoizedTableContent.displayName = "TableContent";

export { MemoizedTableContent as TableContent };
