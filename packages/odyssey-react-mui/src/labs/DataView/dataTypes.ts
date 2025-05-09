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
  MRT_ColumnDef,
  MRT_RowData,
  MRT_RowSelectionState,
  MRT_SortingState,
} from "material-react-table";

import { DataFilter } from "../DataFilters.js";

export type DataQueryParamsType = {
  filters?: DataFilter[];
  page?: number;
  resultsPerPage?: number;
  search?: string;
  sort?: MRT_SortingState;
};

export type DataTableColumn<
  TData extends MRT_RowData,
  TValue = unknown,
> = MRT_ColumnDef<TData, TValue> & {
  /**
   * @deprecated use hasTextWrapping instead of enableWrapping
   */
  enableWrapping?: boolean;
  hasTextWrapping?: boolean;
};

export type DataTableColumnInstance<TData extends MRT_RowData, TValue> = Omit<
  MRT_Column<TData, TValue>,
  "columnDef"
> & {
  columnDef: DataTableColumn<TData, TValue>;
};

export type DataTableCell<TData extends MRT_RowData, TValue> = Omit<
  MRT_Cell<TData>,
  "column"
> & {
  column: DataTableColumnInstance<TData, TValue>;
};

export type DataColumns<
  TData extends MRT_RowData,
  TValue = unknown,
> = DataTableColumn<TData, TValue>[];

export type DataRow = MRT_RowData;

export type DataGetDataType = {
  filters?: DataFilter[];
  page?: number;
  resultsPerPage?: number;
  search?: string;
  sort?: MRT_SortingState;
};

export type DataOnReorderRowsType = {
  newRowIndex: number;
  rowId: string;
};

export type DataRowSelectionState = MRT_RowSelectionState;

// Provided for backwards compatibilty with old DataTable types
export type DataTableGetDataType = DataGetDataType;
export type DataTableOnReorderRowsType = DataOnReorderRowsType;
export type DataTableRowSelectionState = DataRowSelectionState;
export type DataTableRow = DataRow;
