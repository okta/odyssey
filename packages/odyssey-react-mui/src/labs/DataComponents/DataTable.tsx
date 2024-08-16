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

import { memo, useMemo } from "react";

import { DataView } from "./DataView";
import { TableProps, UniversalProps } from "./componentTypes";

export type DataTableProps = UniversalProps & TableProps;

const DataTable = ({
  additionalActionButton,
  additionalActionMenuItems,
  bulkActionMenuItems,
  columns,
  currentPage,
  emptyPlaceholder,
  errorMessage,
  filters,
  getData,
  hasChangeableDensity,
  hasColumnResizing,
  hasColumnVisibility,
  initialDensity,
  hasFilters,
  hasPagination,
  hasRowReordering,
  hasRowSelection,
  hasSearch,
  hasSearchSubmitButton,
  hasSorting,
  isLoading,
  isEmpty,
  isNoResults,
  isPaginationMoreDisabled,
  isRowReorderingDisabled,
  maxResultsPerPage,
  maxPages,
  noResultsPlaceholder,
  onChangeRowSelection,
  paginationType,
  renderDetailPanel,
  resultsPerPage,
  rowActionButtons,
  rowActionMenuItems,
  searchDelayTime,
  totalRows,
}: DataTableProps) => {
  const tableOptions = useMemo(
    () => ({
      columns,
      hasChangeableDensity,
      hasColumnResizing,
      hasColumnVisibility,
      hasSorting,
      initialDensity,
      renderDetailPanel,
      rowActionButtons,
      rowActionMenuItems,
    }),
    [
      columns,
      hasChangeableDensity,
      hasColumnResizing,
      hasColumnVisibility,
      hasSorting,
      initialDensity,
      renderDetailPanel,
      rowActionButtons,
      rowActionMenuItems,
    ],
  );

  return (
    <DataView
      additionalActionButton={additionalActionButton}
      additionalActionMenuItems={additionalActionMenuItems}
      availableLayouts={["table"]}
      bulkActionMenuItems={bulkActionMenuItems}
      currentPage={currentPage}
      emptyPlaceholder={emptyPlaceholder}
      errorMessage={errorMessage}
      filters={filters}
      getData={getData}
      hasFilters={hasFilters}
      hasPagination={hasPagination}
      hasRowReordering={hasRowReordering}
      hasRowSelection={hasRowSelection}
      hasSearch={hasSearch}
      hasSearchSubmitButton={hasSearchSubmitButton}
      isEmpty={isEmpty}
      isLoading={isLoading}
      isNoResults={isNoResults}
      isPaginationMoreDisabled={isPaginationMoreDisabled}
      isRowReorderingDisabled={isRowReorderingDisabled}
      maxPages={maxPages}
      maxResultsPerPage={maxResultsPerPage}
      noResultsPlaceholder={noResultsPlaceholder}
      onChangeRowSelection={onChangeRowSelection}
      paginationType={paginationType}
      resultsPerPage={resultsPerPage}
      searchDelayTime={searchDelayTime}
      tableOptions={tableOptions}
      totalRows={totalRows}
    />
  );
};

const MemoizedDataTable = memo(DataTable);
MemoizedDataTable.displayName = "DataTable";

export { MemoizedDataTable as DataTable };
