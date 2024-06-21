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
import styled, { CSSObject } from "@emotion/styled";
import {
  MRT_Row,
  MRT_RowData,
  MRT_RowSelectionState,
  MRT_TableInstance,
} from "material-react-table";

import { Box } from "../../Box";
import { Checkbox as MuiCheckbox } from "@mui/material";
import { CircularProgress } from "../../CircularProgress";
import {
  DesignTokens,
  useOdysseyDesignTokens,
} from "../../OdysseyDesignTokensContext";
import { RowActions } from "./RowActions";
import { StackCard } from "./StackCard";
import { StackLayout, StackProps, UniversalProps } from "./componentTypes";

export type StackContentProps = {
  currentLayout: StackLayout;
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
  pagination: { pageIndex: number; pageSize: number };
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
  stackOptions: StackProps;
  totalRows: UniversalProps["totalRows"];
};

const StackContent = ({
  currentLayout,
  data,
  emptyState,
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
  stackOptions,
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
    display: currentLayout === "list" ? "flex" : "grid",
    flexDirection: "column",
    gap: odysseyDesignTokens.Spacing5,

    ...(currentLayout === "grid" && {
      [`@media (max-width: 720px)`]: {
        gridTemplateColumns: "repeat(1, 1fr)",
      },
      [`@media (min-width: 720px) and (max-width: 960px)`]: {
        gridTemplateColumns: "repeat(2, 1fr)",
      },
      [`@media (min-width: 960px)`]: {
        gridTemplateColumns: `repeat(${maxGridColumns}, 1fr)`,
      },
    }),
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
                    Accessory={
                      hasRowSelection && (
                        // Negative margin to counteract the checkbox's inbuilt spacing
                        <Box sx={{ marginBlockStart: -1 }}>
                          <MuiCheckbox
                            checked={rowSelection[row.id] ?? false}
                            onChange={() => handleRowSelectionChange(row)}
                          />
                        </Box>
                      )
                    }
                    children={children}
                    description={description}
                    image={image}
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
                    overline={overline}
                    title={title}
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
