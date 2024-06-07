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
import { AvailableStackLayouts, StackProps, UniversalProps } from "./types";
import { availableStackLayouts } from "./constants";

export type DataStackProps = UniversalProps &
  StackProps & {
    initialLayout?: (typeof availableStackLayouts)[number];
    availableLayouts?: AvailableStackLayouts;
  };

const DataStack = (props: DataStackProps) => {
  return (
    <DataView
      availableLayouts={props.availableLayouts}
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
      stackOptions={{
        cardProps: props.cardProps,
        maxGridColumns: props.maxGridColumns,
        rowActionMenuItems: props.rowActionMenuItems,
      }}
    />
  );
};

const MemoizedDataStack = memo(DataStack);
MemoizedDataStack.displayName = "DataStack";

export { MemoizedDataStack as DataStack };
