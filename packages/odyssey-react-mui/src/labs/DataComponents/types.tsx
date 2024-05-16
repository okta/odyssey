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

import { MRT_RowSelectionState } from "material-react-table";
import { DataTableColumn, DataTableRowData } from "../../DataTable";
import { DataFilter } from "../DataFilters";
import { paginationTypeValues } from "../DataTablePagination";
import {
  availableLayouts,
  availableStackLayouts,
  densityValues,
} from "./constants";
import { MenuButtonProps } from "../..";

export type UniversalProps = {
  // Data handling
  getData?: string;
  getRowId?: string;
  hasRowReordering?: boolean;
  onReorderRows?: string;

  // Row selection
  hasRowSelection?: boolean;
  onChangeRowSelection?: string;
  bulkActionMenuItems?: (
    selectedRows: MRT_RowSelectionState,
  ) => MenuButtonProps["children"];

  // Pagination
  hasPagination?: boolean;
  currentPage?: number;
  paginationType?: (typeof paginationTypeValues)[number];
  resultsPerPage?: number;
  totalRows?: number;

  // Search & filtering
  hasFilters?: boolean;
  hasSearch?: boolean;
  hasSearchSubmitButton?: boolean;
  filters?: Array<DataFilter | DataTableColumn<DataTableRowData> | string>;
  searchDelayTime?: number;

  // States
  errorMessage?: string;
  emptyPlaceholder?: string;
  noResultsPlaceholder?: string;
};

export type TableProps = {
  columns: DataTableColumn<DataTableRowData>[];
  initialDensity?: (typeof densityValues)[number];
  hasChangeableDensity?: boolean;
  hasColumnResizing?: boolean;
  hasColumnVisibility?: boolean;
  renderDetailPanel?: string;
  rowActionButtons?: string;
  rowActionMenuItems?: string;
  hasSorting?: boolean;
};

export type StackProps = {
  initialLayout?: (typeof availableStackLayouts)[number];
  availableLayouts?:
    | (typeof availableStackLayouts)[number]
    | (typeof availableStackLayouts)[number][];
};

export type ViewProps = {
  initialLayout?: (typeof availableLayouts)[number];
  availableLayouts?:
    | (typeof availableLayouts)[number]
    | (typeof availableLayouts)[number][];
  tableProps?: TableProps;
  stackProps?: StackProps;
};
