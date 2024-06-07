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
import { TableProps, UniversalProps } from "./types";

export type DataTableProps = UniversalProps & TableProps;

const DataTable = (props: DataTableProps) => {
  return (
    <DataView
      availableLayouts="table"
      getData={props.getData}
      hasRowSelection={props.hasRowSelection}
      onChangeRowSelection={props.onChangeRowSelection}
      bulkActionMenuItems={props.bulkActionMenuItems}
      hasPagination={props.hasPagination}
      currentPage={props.currentPage}
      paginationType={props.paginationType}
      resultsPerPage={props.resultsPerPage}
      totalRows={props.totalRows}
      hasFilters={props.hasFilters}
      hasSearch={props.hasSearch}
      hasSearchSubmitButton={props.hasSearchSubmitButton}
      filters={props.filters}
      searchDelayTime={props.searchDelayTime}
      errorMessage={props.errorMessage}
      emptyPlaceholder={props.emptyPlaceholder}
      noResultsPlaceholder={props.noResultsPlaceholder}
      isLoading={props.isLoading}
      isEmpty={props.isEmpty}
      isNoResults={props.isNoResults}
      tableOptions={{
        columns: props.columns,
        initialDensity: props.initialDensity,
        hasChangeableDensity: props.hasChangeableDensity,
        hasColumnResizing: props.hasColumnResizing,
        hasColumnVisibility: props.hasColumnVisibility,
        renderDetailPanel: props.renderDetailPanel,
        rowActionButtons: props.rowActionButtons,
        rowActionMenuItems: props.rowActionMenuItems,
        hasSorting: props.hasSorting,
      }}
    />
  );
};

const MemoizedDataTable = memo(DataTable);
MemoizedDataTable.displayName = "DataTable";

export { MemoizedDataTable as DataTable };
