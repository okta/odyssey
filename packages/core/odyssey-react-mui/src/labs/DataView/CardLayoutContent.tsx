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

import styled, { CSSObject } from "@emotion/styled";
import { Checkbox as MuiCheckbox } from "@mui/material";
import {
  MRT_Row,
  MRT_RowData,
  MRT_RowSelectionState,
  MRT_TableInstance,
} from "material-react-table";
import { Dispatch, memo, ReactNode, SetStateAction, useCallback } from "react";

import { Box } from "../../Box.js";
import { CircularProgress } from "../../CircularProgress.js";
import {
  DesignTokens,
  useOdysseyDesignTokens,
} from "../../OdysseyDesignTokensContext.js";
import {
  CardLayout,
  CardLayoutProps,
  UniversalProps,
} from "./componentTypes.js";
import { DataCard } from "./DataCard.js";
import { RowActions } from "./RowActions.js";

export type CardLayoutContentProps<TData extends MRT_RowData> = {
  cardLayoutOptions: CardLayoutProps<TData>;
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
    draggableTableBodyRowClassName: ({
      currentRowId,
      draggingRowId,
      hoveredRowId,
    }: {
      currentRowId: string;
      draggingRowId?: string;
      hoveredRowId?: string;
    }) => string | undefined;
    dragHandleStyles: CSSObject;
    dragHandleText: {
      "aria-label": string;
      title: string;
    };
    handleDragHandleKeyDown: ({
      table,
      row,
      event,
    }: {
      event: React.KeyboardEvent<HTMLButtonElement>;
      row: MRT_Row<TData>;
      table: MRT_TableInstance<TData>;
    }) => void;
    handleDragHandleOnDragCapture: (table: MRT_TableInstance<TData>) => void;
    handleDragHandleOnDragEnd: (table: MRT_TableInstance<TData>) => void;
    resetDraggingAndHoveredRow: (table: MRT_TableInstance<TData>) => void;
    updateRowOrder: ({
      rowId,
      newRowIndex,
    }: {
      newRowIndex: number;
      rowId: string;
    }) => void;
  };
  rowSelection: MRT_RowSelectionState;
  setRowSelection: Dispatch<SetStateAction<MRT_RowSelectionState>>;
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
  currentLayout: CardLayout;
  maxGridColumns: number;
  odysseyDesignTokens: DesignTokens;
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
    (row: TData) => {
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
    <Box>
      {isLoading ? (
        <LoadingContainer odysseyDesignTokens={odysseyDesignTokens}>
          <CircularProgress />
        </LoadingContainer>
      ) : (
        <>
          {!data || data.length === 0 || isEmpty || isNoResults ? (
            <Box>{emptyState}</Box>
          ) : (
            <StackContainer
              currentLayout={currentLayout}
              maxGridColumns={cardLayoutOptions.maxGridColumns ?? 3}
              odysseyDesignTokens={odysseyDesignTokens}
              role="list"
            >
              {data.map((row, index) => {
                const {
                  overline,
                  title,
                  description,
                  image,
                  children,
                  variant,
                  button,
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
                            checked={rowSelection[row.id as string] ?? false}
                            onChange={() => handleRowSelectionChange(row)}
                          />
                        </CheckboxContainer>
                      )
                    }
                    button={button}
                    children={children}
                    description={description}
                    image={image}
                    key={row.id as string}
                    menuButtonChildren={
                      (cardLayoutOptions.rowActionMenuItems ||
                        hasRowReordering) && (
                        <RowActions
                          isRowReorderingDisabled={isRowReorderingDisabled}
                          row={row}
                          rowActionMenuItems={
                            cardLayoutOptions.rowActionMenuItems as CardLayoutProps<MRT_RowData>["rowActionMenuItems"]
                          }
                          rowIndex={currentIndex}
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
                    renderDetailPanel={cardLayoutOptions.renderDetailPanel}
                    row={row}
                    title={title}
                    variant={variant}
                  />
                );
              })}
            </StackContainer>
          )}
        </>
      )}
    </Box>
  );
};

const MemoizedCardLayoutContent = memo(
  CardLayoutContent,
) as CardLayoutContentComponent;
MemoizedCardLayoutContent.displayName = "CardLayoutContent";

export { MemoizedCardLayoutContent as CardLayoutContent };
