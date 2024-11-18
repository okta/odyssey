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
import { DataCard } from "./DataCard";
import { CardLayout, CardLayoutProps, UniversalProps } from "./componentTypes";

export type CardLayoutContentProps<TData extends MRT_RowData> = {
  currentLayout: CardLayout;
  data: TData[];
  draggingRow?: MRT_Row<TData> | null;
  emptyState: ReactNode;
  getRowId: UniversalProps<TData>["getRowId"];
  hasRowReordering: UniversalProps<TData>["hasRowReordering"];
  hasRowSelection: UniversalProps<TData>["hasRowSelection"];
  isEmpty?: boolean;
  isLoading: boolean;
  isNoResults?: boolean;
  isRowReorderingDisabled?: boolean;
  onReorderRows: UniversalProps<TData>["onReorderRows"];
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
  cardLayoutOptions: CardLayoutProps<TData>;
  totalRows: UniversalProps<TData>["totalRows"];
};
type CardLayoutContentComponent = (<TData extends MRT_RowData>(
  props: CardLayoutContentProps<TData>,
) => JSX.Element) & {
  displayName?: string;
};

const StackContainer = styled("div", {
  shouldForwardProp: (prop) =>
    prop !== "odysseyDesignTokens" &&
    prop !== "currentLayout" &&
    prop !== "maxGridColumns",
})<{
  odysseyDesignTokens: DesignTokens;
  currentLayout: CardLayout;
  maxGridColumns: number;
}>(({ odysseyDesignTokens, currentLayout, maxGridColumns }) => ({
  display: currentLayout === "list" ? "flex" : "grid",
  flexDirection: "column",
  columnGap: odysseyDesignTokens.Spacing5,

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

const CheckboxContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{
  odysseyDesignTokens: DesignTokens;
}>(({ odysseyDesignTokens }) => ({
  marginBlockStart: `-${odysseyDesignTokens.Spacing1}`,
}));

const CardLayoutContent = <TData extends MRT_RowData>({
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
  cardLayoutOptions,
  totalRows,
}: CardLayoutContentProps<TData>) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();

  const handleRowSelectionChange = useCallback(
    (row: MRT_RowData) => {
      setRowSelection((rowSelection) =>
        Object.fromEntries(
          row.id in rowSelection
            ? Object.entries(rowSelection).filter(([key]) => key !== row.id)
            : Object.entries(rowSelection).concat([[row.id, true]]),
        ),
      );
    },
    [setRowSelection],
  );

  const { updateRowOrder } = rowReorderingUtilities;

  return (
    <StackContainer
      odysseyDesignTokens={odysseyDesignTokens}
      currentLayout={currentLayout}
      maxGridColumns={cardLayoutOptions.maxGridColumns ?? 3}
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
              {data.map((row: TData, index: number) => {
                const {
                  overline,
                  title,
                  description,
                  image,
                  children,
                  variant,
                } = cardLayoutOptions.itemProps(row);
                const currentIndex =
                  index + (pagination.pageIndex - 1) * pagination.pageSize;

                return (
                  <DataCard
                    Accessory={
                      hasRowSelection && (
                        // Negative margin to counteract the checkbox's inbuilt spacing
                        <CheckboxContainer
                          odysseyDesignTokens={odysseyDesignTokens}
                        >
                          <MuiCheckbox
                            checked={rowSelection[row.id] ?? false}
                            onChange={() => handleRowSelectionChange(row)}
                          />
                        </CheckboxContainer>
                      )
                    }
                    children={children}
                    description={description}
                    renderDetailPanel={cardLayoutOptions.renderDetailPanel}
                    row={row}
                    image={image}
                    key={row.id}
                    menuButtonChildren={
                      (cardLayoutOptions.rowActionMenuItems ||
                        hasRowReordering) && (
                        <RowActions
                          row={row}
                          rowIndex={currentIndex}
                          rowActionMenuItems={
                            cardLayoutOptions.rowActionMenuItems
                          }
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
                    variant={variant}
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

const MemoizedCardLayoutContent = memo(
  CardLayoutContent,
) as CardLayoutContentComponent;
MemoizedCardLayoutContent.displayName = "CardLayoutContent";

export { MemoizedCardLayoutContent as CardLayoutContent };
