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

import { Dispatch, ReactNode, SetStateAction, memo, useCallback } from "react";
import { StackLayout, StackProps, UniversalProps } from "./types";
import {
  MRT_Row,
  MRT_RowData,
  MRT_RowSelectionState,
  MRT_TableInstance,
  MRT_TableOptions,
} from "material-react-table";
import { DataTableRowData } from "../../DataTable";
import { Box } from "../../Box";
import { CSSObject } from "@emotion/styled";
import { StackItem } from "./StackItem";
import { DataTableRowActions } from "../../DataTable/DataTableRowActions";

export type StackContentProps = {
  currentLayout: StackLayout;
  data: MRT_TableOptions<DataTableRowData>["data"];
  getRowId: UniversalProps["getRowId"];
  stackOptions: StackProps;
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

const StackContent = ({
  currentLayout,
  data,
  getRowId,
  stackOptions,
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
}: StackContentProps) => {
  console.log({
    currentLayout,
    data,
    getRowId,
    stackOptions,
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
  });

  const handleRowSelectionChange = useCallback(
    (row: DataTableRowData) => {
      setRowSelection((prev) => ({
        ...prev,
        [row.id]: !prev[row.id],
      }));
    },
    [setRowSelection],
  );

  const { updateRowOrder } = rowReorderingUtilities;

  const renderRowActions = useCallback(
    (row: DataTableRowData) => {
      // TODO: is there a better way to get the row index?
      // Maybe inject the true index into each row when retrieved
      const currentIndex =
        row.index + (pagination.pageIndex - 1) * pagination.pageSize;
      return (
        <DataTableRowActions
          row={row}
          rowIndex={currentIndex}
          rowActionMenuItems={stackOptions.rowActionMenuItems}
          totalRows={totalRows}
          updateRowOrder={
            hasRowReordering && onReorderRows ? updateRowOrder : undefined
          }
        />
      );
    },
    [
      pagination,
      stackOptions,
      hasRowReordering,
      onReorderRows,
      totalRows,
      updateRowOrder,
    ],
  );

  return (
    <Box
      sx={{
        display: currentLayout === "stack" ? "flex" : "grid",
        flexDirection: currentLayout === "stack" ? "column" : undefined,
        gap: 5,
        gridTemplateColumns:
          currentLayout === "grid"
            ? {
                xs: "repeat(1, 1fr)",
                sm: "repeat(2, 1fr)",
                md: `repeat(${stackOptions.maxGridColumns ?? 3}, 1fr)`,
              }
            : undefined,
      }}
    >
      {data.map((row: DataTableRowData) => (
        <StackItem
          children={stackOptions.renderRow(row)}
          isSelectable={hasRowSelection}
          onToggleRowSelection={() => handleRowSelectionChange(row)}
          isSelected={rowSelection[row.id] ?? false}
          key={row.id}
          menuActions={renderRowActions(row)}
        />
      ))}
    </Box>
  );
};

const MemoizedStackContent = memo(StackContent);
MemoizedStackContent.displayName = "StackContent";

export { MemoizedStackContent as StackContent };
