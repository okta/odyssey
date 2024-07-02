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

// import {
//   DataTableGetDataType,
//   DataTableOnReorderRowsType,
// } from "@okta/odyssey-react-mui";
import {
  DataGetDataType,
  DataOnReorderRowsType,
} from "@okta/odyssey-react-mui/labs";
import { Person } from "./personData";

export const filterData = ({
  data,
  ...args
}: {
  data: Person[];
} & DataGetDataType) => {
  let filteredData = data;
  const { search, filters, sort, page = 1, resultsPerPage = 20 } = args;

  // Implement text-based query filtering
  if (search) {
    filteredData = filteredData.filter((row) =>
      Object.values(row).some((value) =>
        value.toString().toLowerCase().includes(search.toLowerCase()),
      ),
    );
  }

  // Implement column-specific filtering
  if (filters) {
    filteredData = filteredData.filter((row) => {
      return filters.every(({ id, value }) => {
        // If filter value is null or undefined, skip this filter
        if (value === null || value === undefined) {
          return true;
        }

        // If filter value is array, search for each array value
        if (Array.isArray(value)) {
          return value.some((arrayValue) => {
            const filterValue =
              typeof arrayValue === "object" ? arrayValue.value : arrayValue;
            return row[id as keyof Person]
              ?.toString()
              .toLowerCase()
              .includes(filterValue.toString().toLowerCase());
          });
        }

        // In the custom filter examples, we provide a "starting letter"
        // control that allows the user to filter by whether the
        // first letter is a vowel or consonant
        if (id === "startLetter" && typeof row.name === "string") {
          const firstLetter = row.name[0]?.toLowerCase();
          if (value === "vowel") return "aeiou".includes(firstLetter);
          if (value === "consonant") return !"aeiou".includes(firstLetter);
          return true;
        }

        // General filtering for other columns
        return row[id as keyof Person]
          ?.toString()
          .toLowerCase()
          .includes(value.toString().toLowerCase());
      });
    });
  }

  // Implement sorting
  if (sort && sort.length > 0) {
    filteredData.sort((a, b) => {
      for (const { id, desc } of sort) {
        const aValue = a[id as keyof Person];
        const bValue = b[id as keyof Person];

        if (aValue < bValue) return desc ? 1 : -1;
        if (aValue > bValue) return desc ? -1 : 1;
      }

      return 0;
    });
  }

  // Implement pagination
  const startRow = (page - 1) * resultsPerPage;
  const endRow = startRow + resultsPerPage;
  filteredData = filteredData.slice(startRow, endRow);

  return filteredData;
};

export const reorderData = <T extends { id: string | number }>({
  data,
  ...args
}: {
  data: T[];
} & DataOnReorderRowsType) => {
  const updatedData = data;
  const { rowId, newRowIndex } = args;
  const rowIndex = updatedData.findIndex((row) => row.id === rowId);

  if (rowIndex !== -1) {
    // Remove the row from its current position
    const [removedRow] = updatedData.splice(rowIndex, 1);

    // Insert the row at the new index
    updatedData.splice(newRowIndex, 0, removedRow);
  }

  return updatedData;
};
