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
  MRT_Cell,
  MRT_Column,
  MRT_DensityState,
  MRT_RowSelectionState,
  MRT_SortingState,
  MRT_TableOptions,
  MRT_VisibilityState,
} from "material-react-table";
import {
  DataTableColumn,
  DataTableGetDataType,
  DataTableOnReorderRowsType,
  DataTableRowData,
  DataTableRowSelectionState,
} from "../../DataTable";
import { DataFilter } from "../DataFilters";
import { paginationTypeValues } from "../DataTablePagination";
import {
  availableLayouts,
  availableStackLayouts,
  densityValues,
} from "./constants";
import { MenuButtonProps } from "../..";
import { ReactNode } from "react";
import { DataTableRowActionsProps } from "../../DataTable/DataTableRowActions";

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
  }: DataTableGetDataType) =>
    | MRT_TableOptions<DataTableRowData>["data"]
    | Promise<MRT_TableOptions<DataTableRowData>["data"]>;
  getRowId?: MRT_TableOptions<DataTableRowData>["getRowId"];
  hasRowReordering?: boolean;
  onReorderRows?: ({ rowId, newRowIndex }: DataTableOnReorderRowsType) => void;

  // Row selection
  hasRowSelection?: boolean;
  onChangeRowSelection?: (rowSelection: DataTableRowSelectionState) => void;
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
  emptyPlaceholder?: ReactNode;
  noResultsPlaceholder?: ReactNode;
};

export type TableProps = {
  columns: DataTableColumn<DataTableRowData>[];
  initialDensity?: (typeof densityValues)[number];
  hasChangeableDensity?: boolean;
  hasColumnResizing?: boolean;
  hasColumnVisibility?: boolean;
  renderDetailPanel?: MRT_TableOptions<DataTableRowData>["renderDetailPanel"];
  rowActionButtons?: DataTableRowActionsProps["rowActionButtons"];
  rowActionMenuItems?: DataTableRowActionsProps["rowActionMenuItems"];
  hasSorting?: boolean;
};

export type StackProps = {
  initialLayout?: (typeof availableStackLayouts)[number];
  availableLayouts?: AvailableStackLayouts;
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

export type DataQueryParamsType = {
  page?: number;
  resultsPerPage?: number;
  search?: string;
  filters?: DataFilter[];
  sort?: MRT_SortingState;
};

export type DataTableColumnInstance<T extends DataTableRowData> = Omit<
  MRT_Column<T, unknown>,
  "columnDef"
> & {
  columnDef: DataTableColumn<T>;
};

export type DataTableCell<T extends DataTableRowData> = Omit<
  MRT_Cell<T>,
  "column"
> & {
  column: DataTableColumnInstance<T>;
};
