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

import { availableLayouts, availableCardLayouts } from "./constants";
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
import { DataCardProps } from "./DataCard";

export type DataLayout = (typeof availableLayouts)[number];
export type CardLayout = (typeof availableCardLayouts)[number];

export type AvailableLayouts = DataLayout[];
export type AvailableCardLayouts = CardLayout[];

export type UniversalProps = {
  additionalActionButton?: ReactNode;
  additionalActionMenuItems?: ReactNode;
  bulkActionMenuItems?: (
    selectedRows: MRT_RowSelectionState,
  ) => MenuButtonProps["children"];
  currentPage?: number;
  emptyPlaceholder?: ReactNode;
  enableVirtualization?: boolean;
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
  metaText?: string;
  noResultsPlaceholder?: ReactNode;
  /**
   * @deprecated onChangeRowSelection is now onRowSelectionChange
   */
  onChangeRowSelection?: (rowSelection: DataRowSelectionState) => void;
  onPaginationChange?: ({
    pageIndex,
    pageSize,
  }: {
    pageIndex: number;
    pageSize: number;
  }) => void;
  onReorderRows?: ({ rowId, newRowIndex }: DataOnReorderRowsType) => void;
  onRowSelectionChange?: (rowSelection: DataRowSelectionState) => void;
  paginationType?: (typeof paginationTypeValues)[number];
  resultsPerPage?: number;
  searchDelayTime?: number;
  totalRows?: number;
};

export type TableLayoutProps = {
  columns: DataTableColumn<MRT_RowData>[];
  hasChangeableDensity?: boolean;
  hasColumnResizing?: boolean;
  hasColumnVisibility?: boolean;
  hasSorting?: boolean;
  initialDensity?: MRT_DensityState;
  renderDetailPanel?: MRT_TableOptions<MRT_RowData>["renderDetailPanel"];
  rowActionButtons?: DataTableRowActionsProps["rowActionButtons"];
  rowActionMenuItems?: DataTableRowActionsProps["rowActionMenuItems"];
};

export type CardLayoutProps = {
  itemProps: (row: MRT_RowData) => DataCardProps;
  maxGridColumns?: number;
  renderDetailPanel?: (props: { row: MRT_RowData }) => ReactNode;
  rowActionMenuItems?: DataTableRowActionsProps["rowActionMenuItems"];
};

export type ViewProps<L extends DataLayout> = {
  availableLayouts?: L[];
  initialLayout?: L;
  cardLayoutOptions?: CardLayoutProps;
  tableLayoutOptions?: TableLayoutProps;
};

export type TableState = {
  columnSorting: MRT_SortingState;
  columnVisibility: MRT_VisibilityState;
  rowDensity?: MRT_DensityState;
};
