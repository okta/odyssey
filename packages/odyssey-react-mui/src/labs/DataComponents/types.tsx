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

export type UniversalProps = {
  // Data handling
  getData?: string;
  getRowId?: string;
  hasRowReordering?: string;
  onReorderRows?: string;

  // Row selection
  hasRowSelection?: string;
  onChangeRowSelection?: string;
  bulkActionMenuItems?: string;

  // Pagination
  hasPagination?: string;
  currentPage?: string;
  resultsPerPage?: string;
  totalRows?: string;

  // Search & filtering
  hasFilters?: string;
  hasSearch?: string;
  hasSearchSubmitButton?: string;
  filters?: string;
  paginationType?: string;
  searchDelayTime?: string;

  // States
  errorMessage?: string;
  emptyPlaceholder?: string;
  noResultsPlaceholder?: string;
};

export type TableProps = {
  columns?: string;
  initialDensity?: string;
  hasChangeableDensity?: string;
  hasColumnResizing?: string;
  hasColumnVisibility?: string;
  renderDetailPanel?: string;
  rowActionButtons?: string;
  rowActionMenuItems?: string;
  hasSorting?: string;
};

export type StackProps = {
  availableLayouts?: string;
  stackLayout?: string;
  initialLayout?: string;
};

export type ViewProps = {
  availableLayouts?: string;
  initialLayout?: string;
  tableProps?: TableProps;
  stackProps?: StackProps;
};
