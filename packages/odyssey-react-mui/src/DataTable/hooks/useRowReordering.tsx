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

import { Dispatch, SetStateAction, KeyboardEvent } from "react";
import { DataTableProps } from "../DataTable";
import { reorderDataRowsLocally } from "../utils/reorderDataRowsLocally";
import { useOdysseyDesignTokens } from "../../OdysseyDesignTokensContext";
import { MRT_Row, MRT_RowData, MRT_TableInstance } from "material-react-table";

export const useRowReordering = ({
  totalRows,
  onReorderRows,
  data,
  setData,
  draggingRow,
  setDraggingRow,
  resultsPerPage,
  page,
}: {
  totalRows: DataTableProps["totalRows"];
  onReorderRows: DataTableProps["onReorderRows"];
  data: DataTableProps["data"];
  setData: Dispatch<SetStateAction<DataTableProps["data"]>>;
  draggingRow?: MRT_Row<MRT_RowData> | null;
  setDraggingRow: Dispatch<
    SetStateAction<MRT_Row<MRT_RowData> | null | undefined>
  >;
  resultsPerPage: number;
  page: number;
}) => {
  const updateRowOrder = ({
    rowId,
    newRowIndex,
  }: {
    rowId: string;
    newRowIndex: number;
  }) => {
    if (newRowIndex < 0) {
      return;
    }

    if (totalRows && newRowIndex > totalRows) {
      return;
    }

    const newData = reorderDataRowsLocally({
      currentData: data,
      rowId,
      newRowIndex,
    });

    setData(newData);
    onReorderRows?.({ rowId, newRowIndex });
  };

  const odysseyDesignTokens = useOdysseyDesignTokens();
  const dragHandleStyles = {
    padding: odysseyDesignTokens.Spacing1,
    borderRadius: odysseyDesignTokens.BorderRadiusMain,

    "&:focus-visible": {
      boxShadow: `0 0 0 2px ${odysseyDesignTokens.HueNeutralWhite}, 0 0 0 4px ${odysseyDesignTokens.PalettePrimaryMain}`,
      outline: "2px solid transparent",
      outlineOffset: "1px",
    },
  };

  const dragHandleText = {
    title: "Drag row or press space/enter key to start and stop reordering",
    "aria-label":
      "Drag row to reorder. Or, press space or enter to start and stop reordering and esc to cancel.",
  };

  const draggableTableBodyRowClassName = ({
    currentRowId,
    draggingRowId,
    hoveredRowId,
  }: {
    currentRowId: string;
    draggingRowId?: string;
    hoveredRowId?: string;
  }) => {
    if (draggingRowId === currentRowId && hoveredRowId !== currentRowId) {
      return "isDragging";
    }

    if (hoveredRowId === currentRowId && draggingRowId !== currentRowId) {
      return "isDragTarget";
    }

    if (draggingRowId === currentRowId && hoveredRowId === currentRowId) {
      return "isDragging isDragTarget";
    }

    return undefined;
  };

  const getRowFromTableAndSetHovered = (
    table: MRT_TableInstance<MRT_RowData>,
    id: MRT_RowData["id"]
  ) => {
    if (id) {
      const nextRow: MRT_RowData = table.getRow(id);

      if (nextRow) {
        table.setHoveredRow(nextRow);
      }
    }
  };

  type HandleDragHandleKeyDownArgs = {
    table: MRT_TableInstance<MRT_RowData>;
    row: MRT_Row<MRT_RowData>;
    event: KeyboardEvent<HTMLButtonElement>;
  };

  const handleDragHandleKeyDown = ({
    table,
    row,
    event,
  }: HandleDragHandleKeyDownArgs) => {
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
              newRowIndex: pageRelativeIndex,
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
          getRowFromTableAndSetHovered(table, data[nextIndex]?.id);
        }
      } else {
        if (isArrowDown || isArrowUp) {
          const nextIndex = isArrowDown ? row.index + 1 : row.index - 1;
          getRowFromTableAndSetHovered(table, data[nextIndex]?.id);
        }
      }
    } else {
      if (isSpaceOrEnter) {
        setDraggingRow(row);
      }
    }
  };

  const handleDragHandleOnDragEnd = (table: MRT_TableInstance<MRT_RowData>) => {
    const cols = table.getAllColumns();
    cols[0].toggleVisibility();

    const { draggingRow, hoveredRow } = table.getState();
    if (draggingRow) {
      updateRowOrder({
        rowId: draggingRow.id,
        newRowIndex: (hoveredRow as MRT_RowData).index,
      });
    }

    setDraggingRow(null);
  };

  const handleDragHandleOnDragCapture = (
    table: MRT_TableInstance<MRT_RowData>
  ) => {
    if (!draggingRow && table.getState().draggingRow?.id) {
      setDraggingRow(table.getState().draggingRow);
    }
  };

  const resetDraggingAndHoveredRow = (
    table: MRT_TableInstance<MRT_RowData>
  ) => {
    setDraggingRow(null);
    table.setHoveredRow(null);
  };

  return {
    dragHandleStyles,
    dragHandleText,
    draggableTableBodyRowClassName,
    handleDragHandleKeyDown,
    handleDragHandleOnDragCapture,
    handleDragHandleOnDragEnd,
    resetDraggingAndHoveredRow,
    updateRowOrder,
  };
};
