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

import { memo } from "react";
import { DataView } from "./DataView";
import { TableProps, UniversalProps } from "./componentTypes";

export type DataTableProps = UniversalProps & TableProps;

const DataTable = ({
  getData,
  hasRowSelection,
  onChangeRowSelection,
  bulkActionMenuItems,
  hasPagination,
  currentPage,
  paginationType,
  resultsPerPage,
  totalRows,
  hasFilters,
  hasSearch,
  hasSearchSubmitButton,
  hasRowReordering,
  isRowReorderingDisabled,
  filters,
  searchDelayTime,
  errorMessage,
  emptyPlaceholder,
  noResultsPlaceholder,
  isLoading,
  isEmpty,
  isNoResults,
  columns,
  initialDensity,
  hasChangeableDensity,
  hasColumnResizing,
  hasColumnVisibility,
  renderDetailPanel,
  rowActionButtons,
  rowActionMenuItems,
  hasSorting,
}: DataTableProps) => {
  return (
    <DataView
      availableLayouts={["table"]}
      getData={getData}
      hasRowSelection={hasRowSelection}
      onChangeRowSelection={onChangeRowSelection}
      bulkActionMenuItems={bulkActionMenuItems}
      hasPagination={hasPagination}
      currentPage={currentPage}
      paginationType={paginationType}
      resultsPerPage={resultsPerPage}
      totalRows={totalRows}
      hasFilters={hasFilters}
      hasSearch={hasSearch}
      hasSearchSubmitButton={hasSearchSubmitButton}
      hasRowReordering={hasRowReordering}
      isRowReorderingDisabled={isRowReorderingDisabled}
      filters={filters}
      searchDelayTime={searchDelayTime}
      errorMessage={errorMessage}
      emptyPlaceholder={emptyPlaceholder}
      noResultsPlaceholder={noResultsPlaceholder}
      isLoading={isLoading}
      isEmpty={isEmpty}
      isNoResults={isNoResults}
      tableOptions={{
        columns,
        initialDensity,
        hasChangeableDensity,
        hasColumnResizing,
        hasColumnVisibility,
        renderDetailPanel,
        rowActionButtons,
        rowActionMenuItems,
        hasSorting,
      }}
    />
  );
};

const MemoizedDataTable = memo(DataTable);
MemoizedDataTable.displayName = "DataTable";

export { MemoizedDataTable as DataTable };
