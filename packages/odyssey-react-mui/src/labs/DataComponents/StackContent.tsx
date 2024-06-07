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
import { Box } from "../../Box";
import { CSSObject } from "@emotion/styled";
// import { DataTableRowActions } from "../../DataTable/DataTableRowActions";
import {
  MRT_Row,
  MRT_RowData,
  MRT_RowSelectionState,
  MRT_TableInstance,
} from "material-react-table";
import { CircularProgress } from "../../CircularProgress";
import { Card } from "../..";
import { Checkbox as MuiCheckbox } from "@mui/material";
import { RowActions } from "./RowActions";

export type StackContentProps = {
  currentLayout: StackLayout;
  data: MRT_RowData[];
  getRowId: UniversalProps["getRowId"];
  stackOptions: StackProps;
  isLoading: boolean;
  isEmpty?: boolean;
  isNoResults?: boolean;
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
  draggingRow?: MRT_Row<MRT_RowData> | null;
};

const StackContent = ({
  currentLayout,
  data,
  stackOptions,
  isLoading,
  isEmpty,
  isNoResults,
  hasRowReordering,
  onReorderRows,
  rowReorderingUtilities,
  hasRowSelection,
  rowSelection,
  setRowSelection,
  emptyState,
  pagination,
  totalRows,
}: StackContentProps) => {
  const handleRowSelectionChange = useCallback(
    (row: MRT_RowData) => {
      setRowSelection((prev) => {
        const newSelection = { ...prev };
        if (newSelection[row.id]) {
          delete newSelection[row.id];
        } else {
          newSelection[row.id] = true;
        }
        return newSelection;
      });
    },
    [setRowSelection],
  );

  const { updateRowOrder } = rowReorderingUtilities;

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
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            paddingBlock: 5,
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          {!data || data.length === 0 || isEmpty || isNoResults ? (
            <Box>{emptyState}</Box>
          ) : (
            <>
              {data.map((row: MRT_RowData, index: number) => {
                const { overline, title, description, image, children } =
                  stackOptions.cardProps(row);
                const currentIndex =
                  index + (pagination.pageIndex - 1) * pagination.pageSize;

                return (
                  <Card
                    overline={overline}
                    title={title}
                    description={description}
                    image={image}
                    children={children}
                    Accessory={
                      hasRowSelection && (
                        <Box sx={{ marginBlockStart: -1 }}>
                          <MuiCheckbox
                            checked={rowSelection[row.id] ?? false}
                            onChange={() => handleRowSelectionChange(row)}
                          />
                        </Box>
                      )
                    }
                    key={row.id}
                    menuButtonChildren={
                      (stackOptions.rowActionMenuItems || hasRowReordering) && (
                        <RowActions
                          row={row}
                          rowIndex={currentIndex}
                          rowActionMenuItems={stackOptions.rowActionMenuItems}
                          totalRows={totalRows}
                          updateRowOrder={
                            hasRowReordering && onReorderRows
                              ? updateRowOrder
                              : undefined
                          }
                        />
                      )
                    }
                  />
                );
              })}
            </>
          )}
        </>
      )}
    </Box>
  );
};

const MemoizedStackContent = memo(StackContent);
MemoizedStackContent.displayName = "StackContent";

export { MemoizedStackContent as StackContent };
