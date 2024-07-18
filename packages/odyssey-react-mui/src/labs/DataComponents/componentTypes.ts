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

import {
  availableLayouts,
  availableStackLayouts,
  densityValues,
} from "./constants";
import { DataFilter } from "../DataFilters";
import {
  DataGetDataType,
  DataOnReorderRowsType,
  DataRowSelectionState,
  DataTableColumn,
} from "./dataTypes";
import { DataTableRowActionsProps } from "../../DataTable/DataTableRowActions";
import { MenuButtonProps } from "../..";
import { paginationTypeValues } from "../DataTablePagination";
import { ReactNode } from "react";
import { StackCardProps } from "./StackCard";

export type Layout = (typeof availableLayouts)[number];
export type StackLayout = (typeof availableStackLayouts)[number];

export type AvailableLayouts = Layout[];
export type AvailableStackLayouts = StackLayout[];

export type UniversalProps = {
  bulkActionMenuItems?: (
    selectedRows: MRT_RowSelectionState,
  ) => MenuButtonProps["children"];
  currentPage?: number;
  emptyPlaceholder?: ReactNode;
  errorMessage?: string;
  filters?: Array<DataFilter | DataTableColumn<MRT_RowData> | string>;
  getData: ({
    page,
    resultsPerPage,
    search,
    filters,
    sort,
  }: DataGetDataType) => MRT_RowData[] | Promise<MRT_RowData[]>;
  getRowId?: MRT_TableOptions<MRT_RowData>["getRowId"];
  hasFilters?: boolean;
  hasPagination?: boolean;
  hasRowReordering?: boolean;
  hasRowSelection?: boolean;
  hasSearch?: boolean;
  hasSearchSubmitButton?: boolean;
  isEmpty?: boolean;
  isLoading?: boolean;
  isNoResults?: boolean;
  isPaginationMoreDisabled?: boolean;
  isRowReorderingDisabled?: boolean;
  maxPages?: number;
  maxResultsPerPage?: number;
  noResultsPlaceholder?: ReactNode;
  onChangeRowSelection?: (rowSelection: DataRowSelectionState) => void;
  onReorderRows?: ({ rowId, newRowIndex }: DataOnReorderRowsType) => void;
  paginationType?: (typeof paginationTypeValues)[number];
  resultsPerPage?: number;
  searchDelayTime?: number;
  totalRows?: number;
};

export type TableProps = {
  columns: DataTableColumn<MRT_RowData>[];
  hasChangeableDensity?: boolean;
  hasColumnResizing?: boolean;
  hasColumnVisibility?: boolean;
  hasSorting?: boolean;
  initialDensity?: (typeof densityValues)[number];
  renderDetailPanel?: MRT_TableOptions<MRT_RowData>["renderDetailPanel"];
  rowActionButtons?: DataTableRowActionsProps["rowActionButtons"];
  rowActionMenuItems?: DataTableRowActionsProps["rowActionMenuItems"];
};

export type StackProps = {
  cardProps: (row: MRT_RowData) => StackCardProps;
  maxGridColumns?: number;
  renderDetailPanel?: (props: { row: MRT_RowData }) => ReactNode;
  rowActionMenuItems?: DataTableRowActionsProps["rowActionMenuItems"];
};

export type ViewProps<L extends Layout> = {
  availableLayouts?: L[];
  initialLayout?: L;
  stackOptions?: StackProps;
  tableOptions?: TableProps;
};

export type TableState = {
  columnSorting: MRT_SortingState;
  columnVisibility: MRT_VisibilityState;
  rowDensity?: MRT_DensityState;
};
