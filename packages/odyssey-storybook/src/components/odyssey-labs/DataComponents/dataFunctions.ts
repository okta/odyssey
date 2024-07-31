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

import { DataGetDataType } from "@okta/odyssey-react-mui/labs";
import { Person } from "./personData";

export const filterData = ({
  data,
  ...args
}: {
  data: Person[];
} & DataGetDataType) => {
  const { search, filters, sort, page = 1, resultsPerPage = 20 } = args;

  const searchFiltered = search
    ? data.filter((row) =>
        Object.values(row).some((value) =>
          value.toString().toLowerCase().includes(search.toLowerCase()),
        ),
      )
    : data;

  // In a real-world scenario, the consumer would provide their own backend
  // filtering/searching logic. This is a demo of what that could look like
  // for the provided sample data and demo filters.
  const columnFiltered = filters
    ? searchFiltered.filter((row) =>
        filters.every(({ id, value }) => {
          // If the filter value is null, return all the data
          // rather than none of the data. (This is better UX.)
          if (value === null || value === undefined) {
            return true;
          }

          // If the filter is of a sort that provides multiple values,
          // such as a checkbox group, check against the whole
          // array of provided values
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

          // This is the backend for the demo of custom (not-built-in) filters;
          // the user can specifiy if the the first letter of the name is a
          // vowel or a consonant
          if (id === "startLetter" && typeof row.name === "string") {
            const firstLetter = row.name[0]?.toLowerCase();
            if (value === "vowel") return "aeiou".includes(firstLetter);
            if (value === "consonant") return !"aeiou".includes(firstLetter);
            return true;
          }

          // If none of the other filters apply, check the data against
          // the incoming string from the filter
          return row[id as keyof Person]
            ?.toString()
            .toLowerCase()
            .includes(value.toString().toLowerCase());
        }),
      )
    : searchFiltered;

  const sorted =
    sort && sort.length > 0
      ? [...columnFiltered].sort((a, b) =>
          sort.reduce((result, { id, desc }) => {
            if (result !== 0) {
              return result;
            }

            const aValue = a[id as keyof Person];
            const bValue = b[id as keyof Person];

            return desc
              ? bValue < aValue
                ? -1
                : bValue > aValue
                  ? 1
                  : 0
              : aValue < bValue
                ? -1
                : aValue > bValue
                  ? 1
                  : 0;
          }, 0),
        )
      : columnFiltered;

  const startRow = (page - 1) * resultsPerPage;
  const endRow = startRow + resultsPerPage;

  return sorted.slice(startRow, endRow);
};

export const reorderData = <Data extends Person>({
  data,
  rowId,
  newRowIndex,
}: {
  data: Data[];
  rowId: string | number;
  newRowIndex: number;
}): Data[] => {
  const rowIndex = data.findIndex((row) => row.id === rowId);

  if (rowIndex === -1) {
    return data;
  }

  const reorderedData = [
    ...data.slice(0, rowIndex),
    ...data.slice(rowIndex + 1, newRowIndex),
    data[rowIndex],
    ...data.slice(newRowIndex),
  ];

  return reorderedData;
};
