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
import {
  MRT_Row,
  MRT_RowData,
  MRT_RowSelectionState,
  MRT_TableInstance,
} from "material-react-table";
import {
  Dispatch,
  memo,
  ReactNode,
  SetStateAction,
  useCallback,
  useMemo,
} from "react";

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
type RowDataCardProps<TData extends MRT_RowData> = {
  currentIndex: number;
  handleRowSelectionChange: (row: TData) => void;
  row: TData;
} & Pick<
  CardLayoutContentProps<TData>,
  | "cardLayoutOptions"
  | "hasRowReordering"
  | "hasRowSelection"
  | "isRowReorderingDisabled"
  | "onReorderRows"
  | "rowReorderingUtilities"
  | "rowSelection"
  | "totalRows"
>;
type RowDataCardComponent = (<TData extends MRT_RowData>(
  props: RowDataCardProps<TData>,
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

const RowDataCard = <TData extends MRT_RowData>({
  cardLayoutOptions,
  currentIndex,
  handleRowSelectionChange,
  hasRowReordering,
  hasRowSelection,
  isRowReorderingDisabled,
  onReorderRows,
  row,
  rowReorderingUtilities,
  rowSelection,
  totalRows,
}: RowDataCardProps<TData>) => {
  const { overline, title, description, image, children, variant } =
    cardLayoutOptions.itemProps(row);

  const onSelectionChange = useCallback(
    () => handleRowSelectionChange(row),
    [handleRowSelectionChange, row],
  );

  const detailPanel = useMemo(
    () => cardLayoutOptions.renderDetailPanel?.({ row }),
    [cardLayoutOptions, row],
  );

  const menuButtonChildren = useMemo(
    () =>
      cardLayoutOptions.rowActionMenuItems || hasRowReordering ? (
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
              ? rowReorderingUtilities.updateRowOrder
              : undefined
          }
        />
      ) : null,
    [
      cardLayoutOptions.rowActionMenuItems,
      currentIndex,
      hasRowReordering,
      isRowReorderingDisabled,
      onReorderRows,
      row,
      rowReorderingUtilities,
      totalRows,
    ],
  );

  return (
    <DataCard
      children={children}
      description={description}
      detailPanel={detailPanel}
      hasSelection={hasRowSelection}
      image={image}
      isSelected={rowSelection[row.id as number] ?? false}
      key={row.id as string}
      menuButtonChildren={menuButtonChildren}
      onSelectionChange={onSelectionChange}
      overline={overline}
      title={title}
      variant={variant}
    />
  );
};

const MemoizedRowDataCard = memo(RowDataCard) as RowDataCardComponent;
MemoizedRowDataCard.displayName = "RowDataCard";

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
                const currentIndex =
                  index + (pagination.pageIndex - 1) * pagination.pageSize;

                return (
                  <MemoizedRowDataCard
                    cardLayoutOptions={cardLayoutOptions}
                    currentIndex={currentIndex}
                    handleRowSelectionChange={handleRowSelectionChange}
                    hasRowReordering={hasRowReordering}
                    hasRowSelection={hasRowSelection}
                    isRowReorderingDisabled={isRowReorderingDisabled}
                    key={row.id as string}
                    onReorderRows={onReorderRows}
                    row={row}
                    rowReorderingUtilities={rowReorderingUtilities}
                    rowSelection={rowSelection}
                    totalRows={totalRows}
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
