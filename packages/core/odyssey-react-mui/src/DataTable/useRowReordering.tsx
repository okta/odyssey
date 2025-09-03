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

import { MRT_Row, MRT_RowData, MRT_TableInstance } from "material-react-table";
import { Dispatch, KeyboardEvent, SetStateAction } from "react";
import { useTranslation } from "react-i18next";

import { useOdysseyDesignTokens } from "../OdysseyDesignTokensContext.js";
import { DataTableProps } from "./DataTable.js";
import { reorderDataRowsLocally } from "./reorderDataRowsLocally.js";

export const useRowReordering = <TData extends MRT_RowData>({
  totalRows,
  onReorderRows,
  data,
  setData,
  draggingRow,
  setDraggingRow,
  resultsPerPage,
  page,
}: {
  data: TData[];
  draggingRow?: MRT_Row<TData> | null;
  onReorderRows: DataTableProps["onReorderRows"];
  page: number;
  resultsPerPage: number;
  setData: Dispatch<SetStateAction<TData[]>>;
  setDraggingRow: Dispatch<SetStateAction<MRT_Row<TData> | null | undefined>>;
  totalRows: DataTableProps["totalRows"];
}) => {
  const { t } = useTranslation();

  const updateRowOrder = ({
    rowId,
    newRowIndex,
  }: {
    newRowIndex: number;
    rowId: string;
  }) => {
    if (newRowIndex < 0) {
      return;
    }

    // Needs to include the totalRows check because totalRows might not
    // be set. If it isn't set, this whole check doesn't matter.
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
    title: t("table.draghandle.tooltip"),
    "aria-label": t("table.draghandle.arialabel"),
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

  const setHoveredRow = (table: MRT_TableInstance<TData>, id: TData["id"]) => {
    if (id) {
      // The `as MRT_Row<TData>` is necessary here to overcome some type/generic
      // issues with the type of `setHoveredRow` defined by MRT. It's not ideal code,
      // but it's the only way that works without a much larger rewrite.
      const nextRow = table.getRow(id) as MRT_Row<TData>;

      if (nextRow) {
        table.setHoveredRow(nextRow);
      }
    }
  };

  type HandleDragHandleKeyDownArgs = {
    event: KeyboardEvent<HTMLButtonElement>;
    row: MRT_Row<TData>;
    table: MRT_TableInstance<TData>;
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
          // This is a legacy file, and this type isn't a problem in `DataView` --Kevin Ghadyani
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          setHoveredRow(table, data[nextIndex]?.id);
        }
      } else {
        if (isArrowDown || isArrowUp) {
          const nextIndex = isArrowDown ? row.index + 1 : row.index - 1;
          // This is a legacy file, and this type isn't a problem in `DataView` --Kevin Ghadyani
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          setHoveredRow(table, data[nextIndex]?.id);
        }
      }
    } else {
      if (isSpaceOrEnter) {
        setDraggingRow(row);
      }
    }
  };

  const handleDragHandleOnDragEnd = (table: MRT_TableInstance<TData>) => {
    const cols = table.getAllColumns();
    cols[0].toggleVisibility();

    const { draggingRow, hoveredRow } = table.getState();
    if (draggingRow) {
      updateRowOrder({
        newRowIndex: (hoveredRow as TData).index as number,
        rowId: draggingRow.id,
      });
    }

    setDraggingRow(null);
  };

  const handleDragHandleOnDragCapture = (table: MRT_TableInstance<TData>) => {
    if (!draggingRow && table.getState().draggingRow?.id) {
      setDraggingRow(table.getState().draggingRow);
    }
  };

  const resetDraggingAndHoveredRow = (table: MRT_TableInstance<TData>) => {
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
