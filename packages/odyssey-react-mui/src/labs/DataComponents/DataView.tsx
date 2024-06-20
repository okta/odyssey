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
import { t } from "i18next";

import {
  availableLayouts as allAvailableLayouts,
  densityValues,
} from "./constants";
import {
  Layout,
  UniversalProps,
  ViewProps,
  TableState,
} from "./componentTypes";
import { Box } from "../../Box";
import { BulkActionMenu } from "./BulkActionsMenu";
import { Callout } from "../../Callout";
import { DataFilter, DataFilters } from "../DataFilters";
import { EmptyState } from "../../EmptyState";
import { fetchData } from "./fetchData";
import { LayoutSwitcher } from "./LayoutSwitcher";
import { TableSettings } from "./TableSettings";
import { Pagination, usePagination } from "../../Pagination";
import { TableContent } from "./TableContent";
import { StackContent } from "./StackContent";
import { useFilterConversion } from "./useFilterConversion";
import { useRowReordering } from "../../DataTable/useRowReordering";

export type DataViewProps = UniversalProps & ViewProps<Layout>;

const DataView = ({
  availableLayouts = allAvailableLayouts,
  bulkActionMenuItems,
  currentPage = 1,
  emptyPlaceholder,
  errorMessage: errorMessageProp,
  getData: getDataFn,
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
  isRowReorderingDisabled,
  noResultsPlaceholder,
  onChangeRowSelection,
  onReorderRows,
  paginationType = "paged",
  resultsPerPage = 20,
  searchDelayTime,
  stackOptions,
  tableOptions,
  totalRows,
}: DataViewProps) => {
  const [currentLayout, setCurrentLayout] = useState<Layout>(
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
  const [initialFilters, setInitialFilters] = useState<DataFilter[]>();
  const [filters, setFilters] = useState<DataFilter[]>();

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
    rowDensity: tableOptions?.initialDensity ?? densityValues[0],
  });

  const hasMultipleAvailableLayouts = useMemo(
    () => typeof availableLayouts !== "string" && availableLayouts.length > 1,
    [availableLayouts],
  );

  const shouldShowFilters = useMemo(
    () => hasSearch || hasFilters,
    [hasSearch, hasFilters],
  );

  const availableFilters = useFilterConversion({
    filters: filters,
    columns: tableOptions?.columns,
  });

  const dataQueryParams = useMemo(
    () => ({
      page: pagination.pageIndex,
      resultsPerPage: pagination.pageSize,
      search,
      filters,
      sort: tableState?.columnSorting,
    }),
    [pagination, search, filters, tableState?.columnSorting],
  );

  const getRowId = getRowIdProp ? getRowIdProp : (row: MRT_RowData) => row.id;

  // Set initial filters
  useEffect(() => {
    if (!initialFilters && filters) {
      setInitialFilters(filters);
    }
  }, [filters, initialFilters]);

  // Update pagination state if props change
  useEffect(() => {
    setPagination({
      pageIndex: currentPage,
      pageSize: resultsPerPage,
    });
  }, [currentPage, resultsPerPage]);

  // Retrieve the data
  useEffect(() => {
    fetchData({
      getDataFn,
      setIsLoading,
      setErrorMessage,
      errorMessageProp,
      setData,
      dataQueryParams,
    });
  }, [dataQueryParams, errorMessageProp, getDataFn]);

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
  }, [emptyPlaceholder, noResultsPlaceholder, isEmpty, isNoResults]);

  const additionalActions = useMemo(
    () => (
      <>
        {currentLayout === "table" && tableOptions && (
          <TableSettings
            setTableState={setTableState}
            tableOptions={tableOptions}
            tableState={tableState}
          />
        )}

        {hasMultipleAvailableLayouts && (
          <LayoutSwitcher
            availableLayouts={availableLayouts}
            currentLayout={currentLayout}
            setCurrentLayout={setCurrentLayout}
          />
        )}
      </>
    ),
    [
      currentLayout,
      tableOptions,
      tableState,
      hasMultipleAvailableLayouts,
      availableLayouts,
    ],
  );

  const { lastRow: lastRowOnPage } = usePagination({
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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <BulkActionMenu
            data={data}
            menuItems={bulkActionMenuItems}
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
          />
          {!shouldShowFilters && additionalActions}
        </Box>
      )}

      {!shouldShowFilters && !bulkActionMenuItems && !hasRowSelection && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          {additionalActions}
        </Box>
      )}

      {currentLayout === "table" && tableOptions && (
        <TableContent
          columns={tableOptions.columns}
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
          tableOptions={tableOptions}
          tableState={tableState}
          totalRows={totalRows}
        />
      )}
      {(currentLayout === "list" || currentLayout === "grid") &&
        stackOptions && (
          <StackContent
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
            stackOptions={stackOptions}
            totalRows={totalRows}
          />
        )}

      {hasPagination && (
        <Pagination
          currentPageLabel={t("pagination.page")}
          isDisabled={isEmpty}
          lastRow={lastRowOnPage}
          loadMoreLabel={t("pagination.loadmore")}
          nextLabel={t("pagination.next")}
          onPaginationChange={setPagination}
          pageIndex={pagination.pageIndex}
          pageSize={pagination.pageSize}
          previousLabel={t("pagination.previous")}
          rowsPerPageLabel={t("pagination.rowsperpage")}
          totalRows={totalRows}
          variant={paginationType}
        />
      )}
    </Box>
  );
};

const MemoizedDataView = memo(DataView);
MemoizedDataView.displayName = "DataView";

export { MemoizedDataView as DataView };
