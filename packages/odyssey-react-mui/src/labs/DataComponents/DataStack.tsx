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
import {
  AvailableStackLayouts,
  StackProps,
  UniversalProps,
} from "./componentTypes";
import { availableStackLayouts } from "./constants";

export type DataStackProps = UniversalProps &
  StackProps & {
    initialLayout?: (typeof availableStackLayouts)[number];
    availableLayouts?: AvailableStackLayouts;
  };

const DataStack = ({
  availableLayouts,
  bulkActionMenuItems,
  cardProps,
  currentPage,
  emptyPlaceholder,
  errorMessage,
  filters,
  getData,
  hasFilters,
  hasPagination,
  hasRowReordering,
  hasRowSelection,
  hasSearch,
  hasSearchSubmitButton,
  isEmpty,
  isLoading,
  isNoResults,
  isRowReorderingDisabled,
  maxGridColumns,
  noResultsPlaceholder,
  onChangeRowSelection,
  paginationType,
  resultsPerPage,
  rowActionMenuItems,
  searchDelayTime,
  totalRows,
}: DataStackProps) => {
  return (
    <DataView
      availableLayouts={availableLayouts}
      bulkActionMenuItems={bulkActionMenuItems}
      currentPage={currentPage}
      emptyPlaceholder={emptyPlaceholder}
      errorMessage={errorMessage}
      filters={filters}
      getData={getData}
      hasFilters={hasFilters}
      hasPagination={hasPagination}
      hasRowReordering={hasRowReordering}
      hasSearch={hasSearch}
      hasSearchSubmitButton={hasSearchSubmitButton}
      hasRowSelection={hasRowSelection}
      isEmpty={isEmpty}
      isLoading={isLoading}
      isNoResults={isNoResults}
      isRowReorderingDisabled={isRowReorderingDisabled}
      noResultsPlaceholder={noResultsPlaceholder}
      onChangeRowSelection={onChangeRowSelection}
      paginationType={paginationType}
      resultsPerPage={resultsPerPage}
      searchDelayTime={searchDelayTime}
      stackOptions={{
        cardProps,
        maxGridColumns,
        rowActionMenuItems,
      }}
      totalRows={totalRows}
    />
  );
};

const MemoizedDataStack = memo(DataStack);
MemoizedDataStack.displayName = "DataStack";

export { MemoizedDataStack as DataStack };
