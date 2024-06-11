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
import { StackLayout, StackProps, UniversalProps } from "./componentTypes";
import { Box } from "../../Box";
import styled, { CSSObject } from "@emotion/styled";
import {
  MRT_Row,
  MRT_RowData,
  MRT_RowSelectionState,
  MRT_TableInstance,
} from "material-react-table";
import { CircularProgress } from "../../CircularProgress";
import { Checkbox as MuiCheckbox } from "@mui/material";
import { RowActions } from "./RowActions";
import { StackCard } from "./StackCard";
import {
  DesignTokens,
  useOdysseyDesignTokens,
} from "../../OdysseyDesignTokensContext";

export type StackContentProps = {
  currentLayout: StackLayout;
  data: MRT_RowData[];
  getRowId: UniversalProps["getRowId"];
  stackOptions: StackProps;
  isLoading: boolean;
  isEmpty?: boolean;
  isNoResults?: boolean;
  hasRowReordering: UniversalProps["hasRowReordering"];
  isRowReorderingDisabled?: boolean;
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
  isRowReorderingDisabled,
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

  const odysseyDesignTokens = useOdysseyDesignTokens();

  const StackContainer = styled("div", {
    shouldForwardProp: (prop) =>
      prop !== "odysseyDesignTokens" &&
      prop !== "currentLayout" &&
      prop !== "maxGridColumns",
  })<{
    odysseyDesignTokens: DesignTokens;
    currentLayout: StackLayout;
    maxGridColumns: number;
  }>(({ odysseyDesignTokens, currentLayout, maxGridColumns }) => ({
    display: currentLayout === "stack" ? "flex" : "grid",
    flexDirection: currentLayout === "stack" ? "column" : undefined,
    gap: odysseyDesignTokens.Spacing5,
    [`@media (max-width: 720px)`]: {
      gridTemplateColumns:
        currentLayout === "grid" ? "repeat(1, 1fr)" : undefined,
    },
    [`@media (min-width: 720px) and (max-width: 960px)`]: {
      gridTemplateColumns:
        currentLayout === "grid" ? "repeat(2, 1fr)" : undefined,
    },
    [`@media (min-width: 960px)`]: {
      gridTemplateColumns:
        currentLayout === "grid" ? `repeat(${maxGridColumns}, 1fr)` : undefined,
    },
  }));

  const LoadingContainer = styled("div", {
    shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
  })<{
    odysseyDesignTokens: DesignTokens;
  }>(({ odysseyDesignTokens }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingBlock: odysseyDesignTokens.Spacing5,
  }));

  return (
    <StackContainer
      odysseyDesignTokens={odysseyDesignTokens}
      currentLayout={currentLayout}
      maxGridColumns={stackOptions.maxGridColumns ?? 3}
    >
      {isLoading ? (
        <LoadingContainer odysseyDesignTokens={odysseyDesignTokens}>
          <CircularProgress />
        </LoadingContainer>
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
                  <StackCard
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
                          isRowReorderingDisabled={isRowReorderingDisabled}
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
    </StackContainer>
  );
};

const MemoizedStackContent = memo(StackContent);
MemoizedStackContent.displayName = "StackContent";

export { MemoizedStackContent as StackContent };
