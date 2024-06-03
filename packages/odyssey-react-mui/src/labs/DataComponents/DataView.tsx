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
  AvailableLayouts,
  Layout,
  UniversalProps,
  ViewProps,
  TableState,
} from "./types";
import {
  availableLayouts as allAvailableLayouts,
  densityValues,
} from "./constants";
import { Box } from "../../Box";
import { DataFilter, DataFilters } from "../DataFilters";
import { useFilterConversion } from "./useFilterConversion";
import { BulkActionMenu } from "./BulkActionsMenu";
import { LayoutSwitcher } from "./LayoutSwitcher";
import { TableSettings } from "./TableSettings";
import { Callout } from "../../Callout";
import { Pagination, usePagination } from "../../Pagination";
import { t } from "i18next";
import { fetchData } from "./fetchData";
import { DataTableRowData } from "../../DataTable";
import { TableContent } from "./TableContent";
import { StackContent } from "./StackContent";
import { useRowReordering } from "../../DataTable/useRowReordering";
import { EmptyState } from "../../EmptyState";
import { MRT_Row, MRT_RowSelectionState } from "material-react-table";

export type DataViewProps = UniversalProps & ViewProps;

// Helper to get the starting layout:
// - If availableLayouts is a string, return that
// - If initialLayout is one of an array of availableLayouts, return initialLayout
// - If initialLayout is not in the availableLayouts array, return the first item in availableLayouts
const getInitialLayout = (
  availableLayouts: AvailableLayouts,
  initialLayout: Layout,
): Layout => {
  if (typeof availableLayouts === "string") {
    return availableLayouts === initialLayout
      ? initialLayout
      : availableLayouts;
  }
  return availableLayouts.includes(initialLayout)
    ? initialLayout
    : availableLayouts[0];
};

const DataView = ({
  getData: getDataFn,
  getRowId: getRowIdProp,
  availableLayouts = allAvailableLayouts,
  initialLayout: initialLayoutProp = allAvailableLayouts[0],
  hasSearch,
  hasFilters,
  hasSearchSubmitButton,
  searchDelayTime,
  bulkActionMenuItems,
  hasPagination,
  paginationType = "paged",
  resultsPerPage = 20,
  currentPage = 1,
  totalRows,
  errorMessage: errorMessageProp,
  hasRowReordering,
  onReorderRows,
  emptyPlaceholder,
  noResultsPlaceholder,
  tableOptions,
  stackOptions,
  hasRowSelection,
  onChangeRowSelection,
}: DataViewProps) => {
  const initialLayout = getInitialLayout(availableLayouts, initialLayoutProp);
  const [currentLayout, setCurrentLayout] = useState<Layout>(initialLayout);

  const [data, setData] = useState<DataTableRowData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isEmpty, setIsEmpty] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] =
    useState<UniversalProps["errorMessage"]>(errorMessageProp);

  const [search, setSearch] = useState<string>("");
  const [initialFilters, setInitialFilters] = useState<DataFilter[]>();
  const [filters, setFilters] = useState<DataFilter[]>();

  // TODO: Create a Row type that can be used for table or stack items
  const [draggingRow, setDraggingRow] =
    useState<MRT_Row<DataTableRowData> | null>();

  const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});

  useEffect(() => {
    onChangeRowSelection?.(rowSelection);
  }, [rowSelection, onChangeRowSelection]);

  const [pagination, setPagination] = useState({
    pageIndex: currentPage,
    pageSize: resultsPerPage,
  });

  const [tableState, setTableState] = useState<TableState>({
    rowDensity: tableOptions?.initialDensity ?? densityValues[0],
    columnSorting: [],
    columnVisibility: {},
  });

  // TODO: Remove
  if (process.env.NODE_ENV !== "development") {
    console.log(
      stackOptions,
      setCurrentLayout,
      search,
      setErrorMessage,
      isLoading,
      setIsEmpty,
    );
  }

  const hasMultipleAvailableLayouts = useMemo(
    () => typeof availableLayouts !== "string" && availableLayouts.length > 1,
    [availableLayouts],
  );

  const shouldShowFilters = useMemo(
    () =>
      hasSearch ||
      hasFilters ||
      bulkActionMenuItems ||
      tableOptions?.hasChangeableDensity ||
      tableOptions?.hasColumnVisibility ||
      hasMultipleAvailableLayouts,
    [
      hasSearch,
      hasFilters,
      bulkActionMenuItems,
      tableOptions,
      hasMultipleAvailableLayouts,
    ],
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

  const getRowId = getRowIdProp
    ? getRowIdProp
    : (row: DataTableRowData) => row.id;

  // Set initial filters
  useEffect(() => {
    if (!initialFilters && filters) {
      setInitialFilters(filters);
    }
  }, [filters, initialFilters]);

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

  const emptyState = useMemo(() => {
    const noResultsInnerContent = noResultsPlaceholder || (
      <EmptyState
        heading={t("table.noresults.heading")}
        description={t("table.noresults.text")}
      />
    );

    return emptyPlaceholder && isEmpty
      ? emptyPlaceholder
      : noResultsInnerContent;
  }, [emptyPlaceholder, noResultsPlaceholder, isEmpty]);

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
      {shouldShowFilters && (
        <DataFilters
          onChangeSearch={hasSearch ? setSearch : undefined}
          onChangeFilters={hasFilters ? setFilters : undefined}
          hasSearchSubmitButton={hasSearchSubmitButton}
          searchDelayTime={searchDelayTime}
          filters={hasFilters ? availableFilters : undefined}
          isDisabled={isEmpty}
          additionalActions={
            <>
              {currentLayout === "table" && tableOptions && (
                <TableSettings
                  tableOptions={tableOptions}
                  tableState={tableState}
                  setTableState={setTableState}
                />
              )}

              {hasMultipleAvailableLayouts && (
                <LayoutSwitcher
                  currentLayout={currentLayout}
                  availableLayouts={availableLayouts}
                  setCurrentLayout={setCurrentLayout}
                />
              )}
            </>
          }
        />
      )}

      {errorMessage && (
        <Box>
          <Callout severity="error" text={errorMessage} />
        </Box>
      )}

      {bulkActionMenuItems && (
        <BulkActionMenu
          data={data}
          menuItems={bulkActionMenuItems}
          rowSelection={rowSelection}
          setRowSelection={setRowSelection}
        />
      )}

      {currentLayout === "table" && tableOptions && (
        <TableContent
          data={data}
          columns={tableOptions.columns}
          getRowId={getRowId}
          tableState={tableState}
          setTableState={setTableState}
          tableOptions={tableOptions}
          isLoading={isLoading}
          hasRowReordering={hasRowReordering}
          onReorderRows={onReorderRows}
          rowReorderingUtilities={rowReorderingUtilities}
          hasRowSelection={hasRowSelection}
          rowSelection={rowSelection}
          setRowSelection={setRowSelection}
          emptyState={emptyState}
          pagination={pagination}
          totalRows={totalRows}
          draggingRow={draggingRow}
        />
      )}
      {currentLayout !== "table" && stackOptions && (
        <StackContent
          currentLayout={currentLayout}
          data={data}
          getRowId={getRowId}
          stackOptions={stackOptions}
          isLoading={isLoading}
          hasRowReordering={hasRowReordering}
          onReorderRows={onReorderRows}
          rowReorderingUtilities={rowReorderingUtilities}
          hasRowSelection={hasRowSelection}
          rowSelection={rowSelection}
          setRowSelection={setRowSelection}
          emptyState={emptyState}
          pagination={pagination}
          totalRows={totalRows}
          draggingRow={draggingRow}
        />
      )}

      {hasPagination && (
        <Pagination
          pageIndex={pagination.pageIndex}
          pageSize={pagination.pageSize}
          onPaginationChange={setPagination}
          lastRow={lastRowOnPage}
          totalRows={totalRows}
          isDisabled={isEmpty}
          variant={paginationType}
          rowsPerPageLabel={t("pagination.rowsperpage")}
          currentPageLabel={t("pagination.page")}
          previousLabel={t("pagination.previous")}
          nextLabel={t("pagination.next")}
          loadMoreLabel={t("pagination.loadmore")}
        />
      )}
    </Box>
  );
};

const MemoizedDataView = memo(DataView);
MemoizedDataView.displayName = "DataView";

export { MemoizedDataView as DataView };

// const DataView = ({
// }: DataViewProps) => {
//

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         gap: 5,
//       }}
//     >

//       {layout === "table" && (
//         <DataContentTable
//           // Essentials
//           data={data}
//           columns={tableOptions?.columns ?? []}
//           getRowId={getRowId}

//           // Settings
//           hasColumnResizing={tableOptions?.hasColumnResizing}
//           hasRowReordering={hasRowReordering}
//           hasRowSelection={hasRowSelection}
//           setRowSelection={setRowSelection}
//           hasSorting={tableOptions?.hasSorting}
//           noResultsPlaceholder={noResultsPlaceholder}
//           emptyPlaceholder={emptyPlaceholder}

//           // Table state
//           columnSorting={columnSorting}
//           columnVisibility={columnVisibility}
//           draggingRow={draggingRow}
//           isLoading={isLoading}
//           isEmpty={isEmpty}
//           rowDensity={rowDensity}
//           rowSelection={rowSelection}

//           // Row options
//           renderDetailPanel={tableOptions?.renderDetailPanel}
//           rowActionButtons={tableOptions?.rowActionButtons}
//           rowActionMenuItems={tableOptions?.rowActionMenuItems}

//           // This is the useRowReordering hook
//           rowReordering={rowReordering}
//           onReorderRows={onReorderRows}

//           setColumnSorting={setColumnSorting}

//           pagination={pagination}
//           totalRows={totalRows}

//         />
//       )}
//     </Box>
//   );
// };

// const MemoizedDataView = memo(DataView);
// MemoizedDataView.displayName = "DataView";

// export { MemoizedDataView as DataView };
