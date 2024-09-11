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

import { memo, useEffect, useMemo, useState } from "react";
import {
  MRT_Row,
  MRT_RowData,
  MRT_RowSelectionState,
} from "material-react-table";
import { useTranslation } from "react-i18next";

import {
  availableLayouts as allAvailableLayouts,
  densityValues,
} from "./constants";
import {
  DataLayout,
  UniversalProps,
  ViewProps,
  TableState,
} from "./componentTypes";
import { Box } from "../../Box";
import { BulkActionsMenu } from "./BulkActionsMenu";
import { Callout } from "../../Callout";
import { DataFilters } from "../DataFilters";
import { EmptyState } from "../../EmptyState";
import { fetchData } from "./fetchData";
import { LayoutSwitcher } from "./LayoutSwitcher";
import { MenuButton } from "../..";
import { MoreIcon } from "../../icons.generated";
import { TableSettings } from "./TableSettings";
import { Pagination, usePagination } from "../../Pagination";
import { TableLayoutContent } from "./TableLayoutContent";
import { CardLayoutContent } from "./CardLayoutContent";
import { useFilterConversion } from "./useFilterConversion";
import { useRowReordering } from "../../DataTable/useRowReordering";
import {
  DesignTokens,
  useOdysseyDesignTokens,
} from "../../OdysseyDesignTokensContext";
import styled from "@emotion/styled";

export type DataViewProps = UniversalProps & ViewProps<DataLayout>;

const DataViewContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{ odysseyDesignTokens: DesignTokens }>(({ odysseyDesignTokens }) => ({
  display: "flex",
  flexDirection: "column",
  gap: odysseyDesignTokens.Spacing4,
}));

const BulkActionsContainer = styled("div")(() => ({
  display: "flex",
  justifyContent: "space-between",
}));

const AdditionalActionsContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{ odysseyDesignTokens: DesignTokens }>(({ odysseyDesignTokens }) => ({
  display: "flex",
  justifyContent: "flex-end",
  gap: odysseyDesignTokens.Spacing2,
}));

const DataView = ({
  additionalActionButton,
  additionalActionMenuItems,
  availableLayouts = allAvailableLayouts,
  bulkActionMenuItems,
  currentPage = 1,
  emptyPlaceholder,
  errorMessage: errorMessageProp,
  filters: filtersProp,
  getData,
  getRowId: getRowIdProp,
  hasFilters,
  hasPagination,
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
  noResultsPlaceholder,
  onChangeRowSelection,
  onReorderRows,
  paginationType = "paged",
  resultsPerPage = 20,
  searchDelayTime,
  cardLayoutOptions,
  tableLayoutOptions,
  totalRows,
  maxPages,
  maxResultsPerPage,
}: DataViewProps) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();
  const { t } = useTranslation();

  const [currentLayout, setCurrentLayout] = useState<DataLayout>(
    initialLayout ?? availableLayouts[0],
  );

  const [data, setData] = useState<MRT_RowData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(isLoadingProp ?? true);
  const [isEmpty, setIsEmpty] = useState<boolean>(isEmptyProp ?? true);
  const [isNoResults, setIsNoResults] = useState<boolean>(
    isNoResultsProp ?? false,
  );
  const [errorMessage, setErrorMessage] =
    useState<UniversalProps["errorMessage"]>(errorMessageProp);

  const [search, setSearch] = useState<string>("");

  const [initialFilters, setInitialFilters] =
    useState<UniversalProps["filters"]>(filtersProp);
  const [filters, setFilters] =
    useState<UniversalProps["filters"]>(filtersProp);

  const [draggingRow, setDraggingRow] = useState<MRT_Row<MRT_RowData> | null>();

  const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});

  useEffect(() => {
    onChangeRowSelection?.(rowSelection);
  }, [rowSelection, onChangeRowSelection]);

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

  const getRowId = getRowIdProp ? getRowIdProp : (row: MRT_RowData) => row.id;

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
        filters === initialFilters &&
        data.length === 0,
    );
  }, [
    currentPage,
    data,
    filters,
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

  const additionalActions = useMemo(
    () => (
      <>
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
      </>
    ),
    [
      currentLayout,
      tableLayoutOptions,
      tableState,
      availableLayouts,
      additionalActionButton,
      additionalActionMenuItems,
      t,
    ],
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
    <DataViewContainer odysseyDesignTokens={odysseyDesignTokens}>
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
        <BulkActionsContainer>
          <BulkActionsMenu
            data={data}
            menuItems={bulkActionMenuItems}
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
          />
          {!shouldShowFilters && additionalActions}
        </BulkActionsContainer>
      )}

      {!shouldShowFilters && !bulkActionMenuItems && !hasRowSelection && (
        <AdditionalActionsContainer odysseyDesignTokens={odysseyDesignTokens}>
          {additionalActions}
        </AdditionalActionsContainer>
      )}

      {currentLayout === "table" && tableLayoutOptions && (
        <TableLayoutContent
          columns={tableLayoutOptions.columns}
          data={data}
          draggingRow={draggingRow}
          emptyState={emptyState}
          getRowId={getRowId}
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
            getRowId={getRowId}
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
    </DataViewContainer>
  );
};

const MemoizedDataView = memo(DataView);
MemoizedDataView.displayName = "DataView";

export { MemoizedDataView as DataView };
