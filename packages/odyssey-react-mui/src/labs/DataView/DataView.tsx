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

import { memo, useCallback, useEffect, useMemo, useState } from "react";
import {
  MRT_Row,
  MRT_RowData,
  MRT_RowSelectionState,
} from "material-react-table";
import { useTranslation } from "react-i18next";

import {
  availableLayouts as allAvailableLayouts,
  densityValues,
} from "./constants.js";
import {
  DataLayout,
  UniversalProps,
  ViewProps,
  TableState,
} from "./componentTypes.js";
import { Box } from "../../Box.js";
import { BulkActionsMenu } from "./BulkActionsMenu.js";
import { Callout } from "../../Callout.js";
import { DataFilters } from "../DataFilters.js";
import { EmptyState } from "../../EmptyState.js";
import { fetchData } from "./fetchData.js";
import { LayoutSwitcher } from "./LayoutSwitcher.js";
import { MenuButton } from "../../Buttons/index.js";
import { MoreIcon } from "../../icons.generated/index.js";
import { TableSettings } from "./TableSettings.js";
import { Pagination, usePagination } from "../../Pagination/index.js";
import { TableLayoutContent } from "./TableLayoutContent.js";
import { CardLayoutContent } from "./CardLayoutContent.js";
import { useFilterConversion } from "./useFilterConversion.js";
import { useRowReordering } from "../../DataTable/useRowReordering.js";
import { Typography } from "../../Typography.js";
import {
  DesignTokens,
  useOdysseyDesignTokens,
} from "../../OdysseyDesignTokensContext.js";
import styled from "@emotion/styled";

export type DataViewProps<TData extends MRT_RowData> = UniversalProps<TData> &
  ViewProps<TData, DataLayout>;
type DataViewComponent = (<TData extends MRT_RowData>(
  props: DataViewProps<TData>,
) => JSX.Element) & {
  displayName?: string;
};

const StyledDataViewContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{ odysseyDesignTokens: DesignTokens }>(({ odysseyDesignTokens }) => ({
  display: "flex",
  flexDirection: "column",
  gap: odysseyDesignTokens.Spacing4,
}));

const StyledBulkActionsContainer = styled("div")(() => ({
  display: "flex",
  justifyContent: "space-between",
}));

const StyledAdditionalActionsContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{ odysseyDesignTokens: DesignTokens }>(({ odysseyDesignTokens }) => ({
  display: "flex",
  justifyContent: "flex-end",
  gap: odysseyDesignTokens.Spacing2,
}));

const StyledAdditionalActionsInner = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{ odysseyDesignTokens: DesignTokens }>(({ odysseyDesignTokens }) => ({
  display: "flex",
  alignItems: "center",
  gap: odysseyDesignTokens.Spacing2,
}));

const StyledMetaTextContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{ odysseyDesignTokens: DesignTokens }>(({ odysseyDesignTokens }) => ({
  marginInlineEnd: odysseyDesignTokens.Spacing2,
}));

const DataView = <TData extends MRT_RowData>({
  additionalActionButton,
  additionalActionMenuItems,
  availableLayouts = allAvailableLayouts,
  bulkActionMenuItems,
  currentPage = 1,
  emptyPlaceholder,
  enableVirtualization: enableVirtualizationProp,
  errorMessage: errorMessageProp,
  filters: filtersProp,
  getData,
  getRowId: getRowIdProp,
  hasFilters,
  hasPagination,
  hasPageInput,
  hasRowCountInput,
  hasRowCountLabel,
  hasSearch,
  hasSearchSubmitButton,
  hasRowReordering,
  hasRowSelection,
  initialLayout,
  isEmpty: isEmptyProp,
  isLoading: isLoadingProp,
  isNoResults: isNoResultsProp,
  isPaginationMoreDisabled,
  isRowReorderingDisabled,
  metaText,
  noResultsPlaceholder,
  onChangeRowSelection,
  onRowSelectionChange,
  onReorderRows,
  paginationType = "paged",
  resultsPerPage = 20,
  searchDelayTime,
  cardLayoutOptions,
  tableLayoutOptions,
  totalRows,
  maxPages,
  maxResultsPerPage,
  onPaginationChange,
}: DataViewProps<TData>) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();
  const { t } = useTranslation();

  const [currentLayout, setCurrentLayout] = useState<DataLayout>(
    initialLayout ?? availableLayouts[0],
  );

  const [data, setData] = useState<TData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(isLoadingProp ?? true);
  const [isEmpty, setIsEmpty] = useState<boolean>(isEmptyProp ?? true);
  const [isNoResults, setIsNoResults] = useState<boolean>(
    isNoResultsProp ?? false,
  );
  const [errorMessage, setErrorMessage] =
    useState<UniversalProps<TData>["errorMessage"]>(errorMessageProp);

  const [search, setSearch] = useState<string>("");

  const [initialFilters, setInitialFilters] =
    useState<UniversalProps<TData>["filters"]>(filtersProp);
  const [filters, setFilters] =
    useState<UniversalProps<TData>["filters"]>(filtersProp);

  const [draggingRow, setDraggingRow] = useState<MRT_Row<TData> | null>();

  const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});

  useEffect(() => {
    onChangeRowSelection?.(rowSelection);
  }, [rowSelection, onChangeRowSelection]);

  useEffect(() => {
    onRowSelectionChange?.(rowSelection);
  }, [rowSelection, onRowSelectionChange]);

  const [pagination, setPagination] = useState({
    pageIndex: currentPage,
    pageSize: resultsPerPage,
  });

  const [tableState, setTableState] = useState<TableState>({
    columnSorting: [],
    columnVisibility: {},
    rowDensity: tableLayoutOptions?.initialDensity ?? densityValues[0],
  });

  const shouldShowFilters =
    hasSearch ||
    hasFilters ||
    additionalActionButton ||
    additionalActionMenuItems;

  const availableFilters = useFilterConversion({
    filters: filters,
    columns: tableLayoutOptions?.columns,
  });

  useEffect(() => {
    if (!initialFilters && availableFilters) {
      setInitialFilters(availableFilters);
    }
  }, [availableFilters, initialFilters]);

  const dataQueryParams = useMemo(
    () => ({
      page: pagination.pageIndex,
      resultsPerPage: pagination.pageSize,
      search,
      filters: availableFilters,
      sort: tableState?.columnSorting,
    }),
    [
      pagination.pageIndex,
      pagination.pageSize,
      search,
      availableFilters,
      tableState?.columnSorting,
    ],
  );

  const getRowId = useCallback<Required<DataViewProps<TData>>["getRowId"]>(
    (originalRow) => originalRow.id as string,
    [],
  );

  // Update pagination state if props change
  useEffect(() => {
    setPagination({
      pageIndex: currentPage,
      pageSize: resultsPerPage,
    });
  }, [currentPage, resultsPerPage]);

  // Reset pagination if search or filters change
  useEffect(() => {
    setPagination((prev) => ({
      pageIndex: 1,
      pageSize: paginationType == "loadMore" ? resultsPerPage : prev.pageSize,
    }));
  }, [filters, paginationType, resultsPerPage, search]);

  // Fire onPaginationChange if pagination changes
  useEffect(() => {
    onPaginationChange?.(pagination);
  }, [onPaginationChange, pagination]);

  // Retrieve the data
  useEffect(() => {
    fetchData({
      dataQueryParams,
      errorMessageProp,
      getData,
      setData,
      setErrorMessage,
      // Only include setIsLoading if that's not being controlled manually
      setIsLoading: isLoadingProp ? undefined : setIsLoading,
    });
  }, [dataQueryParams, errorMessageProp, getData, isLoadingProp]);

  // When data is updated
  useEffect(() => {
    setIsEmpty(
      pagination.pageIndex === currentPage &&
        pagination.pageSize === resultsPerPage &&
        search === "" &&
        (!hasFilters || filters === initialFilters) &&
        data.length === 0,
    );
  }, [
    currentPage,
    data,
    filters,
    hasFilters,
    initialFilters,
    pagination,
    resultsPerPage,
    search,
  ]);

  // Change loading, empty and noResults state on prop change
  useEffect(() => {
    setIsLoading((prevValue) => isLoadingProp ?? prevValue);
  }, [isLoadingProp]);

  useEffect(() => {
    setIsEmpty((prevValue) => isEmptyProp ?? prevValue);
  }, [isEmptyProp]);

  useEffect(() => {
    setIsNoResults((prevValue) => isNoResultsProp ?? prevValue);
  }, [isNoResultsProp]);

  const emptyState = useMemo(() => {
    const noResultsInnerContent = noResultsPlaceholder || (
      <EmptyState
        description={t("table.noresults.text")}
        heading={t("table.noresults.heading")}
      />
    );

    if (isEmpty) {
      return emptyPlaceholder || noResultsInnerContent;
    }

    if (isNoResults) {
      return noResultsInnerContent;
    }

    return;
  }, [noResultsPlaceholder, t, isEmpty, isNoResults, emptyPlaceholder]);

  const additionalActions = useMemo(() => {
    return (
      (metaText ||
        (currentLayout === "table" && tableLayoutOptions) ||
        availableLayouts.length > 1 ||
        additionalActionButton ||
        additionalActionMenuItems) && (
        <StyledAdditionalActionsInner odysseyDesignTokens={odysseyDesignTokens}>
          {metaText && (
            <StyledMetaTextContainer odysseyDesignTokens={odysseyDesignTokens}>
              <Typography color="textSecondary">{metaText}</Typography>
            </StyledMetaTextContainer>
          )}

          {currentLayout === "table" && tableLayoutOptions && (
            <TableSettings
              setTableState={setTableState}
              tableLayoutOptions={tableLayoutOptions}
              tableState={tableState}
            />
          )}

          {availableLayouts.length > 1 && (
            <LayoutSwitcher
              availableLayouts={availableLayouts}
              currentLayout={currentLayout}
              setCurrentLayout={setCurrentLayout}
            />
          )}

          {additionalActionButton}

          {additionalActionMenuItems && (
            <MenuButton
              endIcon={<MoreIcon />}
              ariaLabel={t("table.moreactions.arialabel")}
              buttonVariant="secondary"
              menuAlignment="right"
            >
              {additionalActionMenuItems}
            </MenuButton>
          )}
        </StyledAdditionalActionsInner>
      )
    );
  }, [
    additionalActionButton,
    additionalActionMenuItems,
    availableLayouts,
    currentLayout,
    metaText,
    odysseyDesignTokens,
    tableLayoutOptions,
    tableState,
    t,
  ]);

  const enableVirtualization = useMemo(
    () => enableVirtualizationProp ?? paginationType === "loadMore",
    [enableVirtualizationProp, paginationType],
  );

  const { lastRow: lastRowOnPage } = usePagination({
    currentRowsCount: data.length,
    pageIndex: pagination.pageIndex,
    pageSize: pagination.pageSize,
    totalRows,
  });

  const rowReorderingUtilities = useRowReordering({
    totalRows,
    onReorderRows,
    data,
    setData,
    draggingRow,
    setDraggingRow,
    resultsPerPage: pagination.pageSize,
    page: pagination.pageIndex,
  });

  return (
    <StyledDataViewContainer odysseyDesignTokens={odysseyDesignTokens}>
      {errorMessage && (
        <Box>
          <Callout severity="error" text={errorMessage} />
        </Box>
      )}

      {shouldShowFilters && (
        <DataFilters
          additionalActions={additionalActions}
          filters={hasFilters ? availableFilters : undefined}
          hasSearchSubmitButton={hasSearchSubmitButton}
          isDisabled={isEmpty}
          onChangeFilters={hasFilters ? setFilters : undefined}
          onChangeSearch={hasSearch ? setSearch : undefined}
          searchDelayTime={searchDelayTime}
        />
      )}

      {(bulkActionMenuItems || hasRowSelection) && (
        <StyledBulkActionsContainer>
          <BulkActionsMenu
            data={data}
            menuItems={bulkActionMenuItems}
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
          />
          {!shouldShowFilters && additionalActions}
        </StyledBulkActionsContainer>
      )}

      {!shouldShowFilters &&
        !bulkActionMenuItems &&
        !hasRowSelection &&
        additionalActions && (
          <StyledAdditionalActionsContainer
            odysseyDesignTokens={odysseyDesignTokens}
          >
            {additionalActions}
          </StyledAdditionalActionsContainer>
        )}

      {currentLayout === "table" && tableLayoutOptions && (
        <TableLayoutContent
          columns={tableLayoutOptions.columns}
          data={data}
          draggingRow={draggingRow}
          emptyState={emptyState}
          enableVirtualization={enableVirtualization}
          getRowId={getRowIdProp || getRowId}
          hasRowReordering={hasRowReordering}
          hasRowSelection={hasRowSelection}
          isEmpty={isEmpty}
          isLoading={isLoading}
          isNoResults={isNoResults}
          isRowReorderingDisabled={isRowReorderingDisabled}
          onReorderRows={onReorderRows}
          pagination={pagination}
          rowReorderingUtilities={rowReorderingUtilities}
          rowSelection={rowSelection}
          setRowSelection={setRowSelection}
          setTableState={setTableState}
          tableLayoutOptions={tableLayoutOptions}
          tableState={tableState}
          totalRows={totalRows}
        />
      )}
      {(currentLayout === "list" || currentLayout === "grid") &&
        cardLayoutOptions && (
          <CardLayoutContent
            currentLayout={currentLayout}
            data={data}
            draggingRow={draggingRow}
            emptyState={emptyState}
            getRowId={getRowIdProp || getRowId}
            hasRowReordering={hasRowReordering}
            hasRowSelection={hasRowSelection}
            isEmpty={isEmpty}
            isLoading={isLoading}
            isNoResults={isNoResults}
            isRowReorderingDisabled={isRowReorderingDisabled}
            onReorderRows={onReorderRows}
            pagination={pagination}
            rowReorderingUtilities={rowReorderingUtilities}
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
            cardLayoutOptions={cardLayoutOptions}
            totalRows={totalRows}
          />
        )}

      {hasPagination && (
        <Pagination
          currentPageLabel={t("pagination.page")}
          hasPageInput={hasPageInput}
          hasRowCountInput={hasRowCountInput}
          hasRowCountLabel={hasRowCountLabel}
          isDisabled={isEmpty}
          isMoreDisabled={isPaginationMoreDisabled}
          lastRow={lastRowOnPage}
          loadMoreLabel={t("pagination.loadmore")}
          maxPageIndex={maxPages}
          maxPageSize={maxResultsPerPage}
          nextLabel={t("pagination.next")}
          onPaginationChange={setPagination}
          pageIndex={pagination.pageIndex}
          pageSize={pagination.pageSize}
          previousLabel={t("pagination.previous")}
          rowsPerPageLabel={t("pagination.rowsperpage")}
          totalRows={totalRows}
          currentRowsCount={data.length}
          variant={paginationType}
        />
      )}
    </StyledDataViewContainer>
  );
};

const MemoizedDataView = memo(DataView) as DataViewComponent;
MemoizedDataView.displayName = "DataView";

export { MemoizedDataView as DataView };
