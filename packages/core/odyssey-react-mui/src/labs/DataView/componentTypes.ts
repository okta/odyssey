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
import { ReactNode } from "react";

import { MenuButtonProps } from "../../Buttons/MenuButton.js";
import { type PaginationProps } from "../../Pagination/index.js";
import { DataFilter } from "../DataFilters.js";
import { paginationTypeValues } from "../DataTablePagination.js";
import { availableCardLayouts, availableLayouts } from "./constants.js";
import { DataCardProps } from "./DataCard.js";
import {
  DataGetDataType,
  DataOnReorderRowsType,
  DataRowSelectionState,
  DataTableColumn,
} from "./dataTypes.js";
import { RowActionsProps } from "./RowActions.js";

export type DataLayout = (typeof availableLayouts)[number];
export type CardLayout = (typeof availableCardLayouts)[number];

export type AvailableLayouts = DataLayout[];
export type AvailableCardLayouts = CardLayout[];

export type UniversalProps<TData extends MRT_RowData> = {
  additionalActionButton?: ReactNode;
  additionalActionMenuItems?: ReactNode;
  bulkActionMenuItems?: (
    selectedRows: MRT_RowSelectionState,
  ) => MenuButtonProps["children"];
  currentPage?: number;
  emptyPlaceholder?: ReactNode;
  enableVirtualization?: boolean;
  errorMessage?: string;
  filters?: Array<DataFilter | DataTableColumn<TData> | string>;
  getData: ({
    page,
    resultsPerPage,
    search,
    filters,
    sort,
  }: DataGetDataType) => TData[] | Promise<TData[]>;
  getRowId?: MRT_TableOptions<TData>["getRowId"];
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
} & Pick<
  PaginationProps,
  "hasPageInput" | "hasRowCountInput" | "hasRowCountLabel"
>;

export type TableLayoutProps<TData extends MRT_RowData> = {
  columns: DataTableColumn<TData>[];
  hasChangeableDensity?: boolean;
  hasColumnResizing?: boolean;
  hasColumnVisibility?: boolean;
  hasSorting?: boolean;
  initialDensity?: MRT_DensityState;
  renderDetailPanel?: MRT_TableOptions<TData>["renderDetailPanel"];
  rowActionButtons?: RowActionsProps<TData>["rowActionButtons"];
  rowActionMenuItems?: RowActionsProps<TData>["rowActionMenuItems"];
};

export type CardLayoutProps<TData extends MRT_RowData> = {
  itemProps: (row: TData) => Omit<DataCardProps<TData>, "row">;
  maxGridColumns?: number;
  renderDetailPanel?: (props: { row: TData }) => ReactNode;
  rowActionMenuItems?: RowActionsProps<TData>["rowActionMenuItems"];
};

export type ViewProps<TData extends MRT_RowData, L extends DataLayout> = {
  availableLayouts?: L[];
  cardLayoutOptions?: CardLayoutProps<TData>;
  initialLayout?: L;
  tableLayoutOptions?: TableLayoutProps<TData>;
};

export type TableState = {
  columnSorting: MRT_SortingState;
  columnVisibility: MRT_VisibilityState;
  rowDensity?: MRT_DensityState;
};
