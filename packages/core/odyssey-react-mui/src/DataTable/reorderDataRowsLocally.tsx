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

import { MRT_RowData } from "material-react-table";

/**
 * Reorders data rows locally.
 *
 * @param currentData - The current array of data rows.
 * @param rowId - The ID of the row to move.
 * @param newIndex - The new index to move the row to.
 * @returns A new array of data with the row moved to the specified index.
 */
export const reorderDataRowsLocally = <TData extends MRT_RowData>({
  currentData,
  rowId,
  newRowIndex,
}: {
  currentData: TData[];
  newRowIndex: number;
  rowId: string;
}): TData[] => {
  const updatedData = [...currentData];
  const rowIndex = updatedData.findIndex((row) => row.id === rowId);

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
