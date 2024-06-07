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

import {
  MRT_DensityState,
  MRT_RowData,
  MRT_RowSelectionState,
  MRT_SortingState,
  MRT_TableOptions,
  MRT_VisibilityState,
} from "material-react-table";
import { DataFilter } from "../DataFilters";
import { paginationTypeValues } from "../DataTablePagination";
import {
  availableLayouts,
  availableStackLayouts,
  densityValues,
} from "./constants";
import { CardProps, MenuButtonProps } from "../..";
import { ReactNode } from "react";
import { DataTableRowActionsProps } from "../../DataTable/DataTableRowActions";
import {
  DataGetDataType,
  DataOnReorderRowsType,
  DataRowSelectionState,
  DataTableColumn,
} from "./dataTypes";

export type Layout = (typeof availableLayouts)[number];
export type StackLayout = (typeof availableStackLayouts)[number];

export type AvailableLayouts = Layout | Layout[];
export type AvailableStackLayouts = StackLayout | StackLayout[];

export type UniversalProps = {
  // Data handling
  getData: ({
    page,
    resultsPerPage,
    search,
    filters,
    sort,
  }: DataGetDataType) => MRT_RowData[] | Promise<MRT_RowData[]>;
  getRowId?: MRT_TableOptions<MRT_RowData>["getRowId"];
  hasRowReordering?: boolean;
  onReorderRows?: ({ rowId, newRowIndex }: DataOnReorderRowsType) => void;

  // Row selection
  hasRowSelection?: boolean;
  onChangeRowSelection?: (rowSelection: DataRowSelectionState) => void;
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
  filters?: Array<DataFilter | DataTableColumn<MRT_RowData> | string>;
  searchDelayTime?: number;

  // States
  errorMessage?: string;
  emptyPlaceholder?: ReactNode;
  noResultsPlaceholder?: ReactNode;
  isLoading?: boolean;
  isEmpty?: boolean;
  isNoResults?: boolean;
};

export type TableProps = {
  columns: DataTableColumn<MRT_RowData>[];
  initialDensity?: (typeof densityValues)[number];
  hasChangeableDensity?: boolean;
  hasColumnResizing?: boolean;
  hasColumnVisibility?: boolean;
  renderDetailPanel?: MRT_TableOptions<MRT_RowData>["renderDetailPanel"];
  rowActionButtons?: DataTableRowActionsProps["rowActionButtons"];
  rowActionMenuItems?: DataTableRowActionsProps["rowActionMenuItems"];
  hasSorting?: boolean;
};

export type StackCardProps = {
  description?: CardProps["description"];
  image?: CardProps["image"];
  overline?: CardProps["overline"];
  title?: CardProps["title"];
  children?: CardProps["children"];
};

export type StackProps = {
  cardProps: (row: MRT_RowData) => StackCardProps;
  maxGridColumns?: number;
  rowActionMenuItems?: DataTableRowActionsProps["rowActionMenuItems"];
};

export type ViewProps = {
  initialLayout?: (typeof availableLayouts)[number];
  availableLayouts?: AvailableLayouts;
  tableOptions?: TableProps;
  stackOptions?: StackProps;
};

export type TableState = {
  columnSorting: MRT_SortingState;
  columnVisibility: MRT_VisibilityState;
  rowDensity?: MRT_DensityState;
};
