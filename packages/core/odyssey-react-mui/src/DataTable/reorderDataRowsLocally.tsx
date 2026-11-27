/*!
 * Copyright (c) 2023-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { MRT_Row, MRT_RowData, MRT_TableOptions } from "material-react-table";

export type GetDataRowId<TData extends MRT_RowData> = NonNullable<
  MRT_TableOptions<TData>["getRowId"]
>;

/**
 * Returns the row's own `id` field, which is the id a table uses when no `getRowId` is given.
 */
export const getRawRowId = <TData extends MRT_RowData>(row: TData): string =>
  row.id as string;

export type GetTableRowIdArgs<TData extends MRT_RowData> = {
  getRowId?: GetDataRowId<TData>;
  index: number;
  row: TData;
};

/**
 * Returns the id the table knows a top-level row by. Material React Table falls back to the row's index when `getRowId` returns nothing, so this does too.
 *
 * The return type is `string` only because `getRowId`'s is. DataView's default `getRowId` passes a numeric `id` through unconverted, so this can return a number. It is not converted here because `onReorderRows` receives this value, and a consumer that looks a row up by a numeric `id` would stop matching it. Convert it with `String` before comparing it with another id.
 */
export const getTableRowId = <TData extends MRT_RowData>({
  getRowId = getRawRowId,
  index,
  row,
}: GetTableRowIdArgs<TData>): string =>
  // Every row Odyssey reorders is a top-level row, which has no parent row. MRT's type marks the parent as required anyway.
  getRowId(row, index, undefined as unknown as MRT_Row<TData>) ?? String(index);

export type ReorderDataRowsLocallyArgs<TData extends MRT_RowData> = {
  currentData: TData[];
  /**
   * Returns the id the table knows each row by. `rowId` is matched against it, so it must be the same function the table was given.
   * @default getRawRowId
   */
  getRowId?: GetDataRowId<TData>;
  newRowIndex: number;
  rowId: string;
};

/**
 * Reorders data rows locally.
 *
 * @param currentData - The current array of data rows.
 * @param getRowId - Returns the id the table knows each row by.
 * @param rowId - The ID of the row to move, as `getRowId` returns it.
 * @param newIndex - The new index to move the row to.
 * @returns A new array of data with the row moved to the specified index.
 */
export const reorderDataRowsLocally = <TData extends MRT_RowData>({
  currentData,
  getRowId = getRawRowId,
  rowId,
  newRowIndex,
}: ReorderDataRowsLocallyArgs<TData>): TData[] => {
  const updatedData = [...currentData];
  // A `getRowId` may pass a numeric `id` through unconverted, so both sides are compared as strings.
  const rowIndex = updatedData.findIndex(
    (row, index) =>
      String(getTableRowId({ getRowId, index, row })) === String(rowId),
  );

  // Ensure the row exists and the new index is within bounds
  if (rowIndex === -1 || newRowIndex < 0 || newRowIndex >= updatedData.length) {
    console.warn("Invalid row ID or newIndex; cannot reorder rows.");
    return updatedData; // Return the original data if conditions aren't met
  }

  // Remove the row from its current position
  const [removedRow] = updatedData.splice(rowIndex, 1);

  // Insert the row at the new index
  updatedData.splice(newRowIndex, 0, removedRow);

  return updatedData;
};
