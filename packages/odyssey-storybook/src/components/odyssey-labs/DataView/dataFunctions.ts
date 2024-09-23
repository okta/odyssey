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

import { DataFilter, DataGetDataType } from "@okta/odyssey-react-mui/labs";
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

  const personKeys: (keyof Person)[] = [
    "order",
    "id",
    "name",
    "city",
    "state",
    "age",
    "risk",
  ];

  const isKeyOfPerson = (key: string): key is keyof Person => {
    return personKeys.includes(key as keyof Person);
  };

  const handleStartLetterFilter = (
    row: Person,
    value: DataFilter["value"],
  ): boolean => {
    if (typeof row.name !== "string") return true;
    const firstLetter = row.name[0]?.toLowerCase();
    if (value === "vowel") return "aeiou".includes(firstLetter);
    if (value === "consonant") return !"aeiou".includes(firstLetter);
    return true;
  };

  const handleStandardFilter = (
    row: Person,
    id: keyof Person,
    value: DataFilter["value"],
  ): boolean => {
    const rowValue = String(row[id]).toLowerCase();

    if (value === null || value === undefined) {
      return true;
    }

    if (typeof value === "string" || typeof value === "number") {
      return rowValue.includes(String(value).toLowerCase());
    }

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

    return false;
  };

  const compareValues = (
    a: string | number,
    b: string | number,
    desc: boolean,
  ): number => {
    if (a < b) return desc ? 1 : -1;
    if (a > b) return desc ? -1 : 1;
    return 0;
  };

  // In a real-world scenario, the consumer would provide their own backend
  // filtering/searching logic. This is a demo of what that could look like
  // for the provided sample data and demo filters.
  const columnFiltered = filters
    ? searchFiltered.filter((row) =>
        filters.every(({ id, value }: DataFilter) => {
          // If the filter value is null, return all the data
          if (value === null || value === undefined) {
            return true;
          }

          // Handle custom filters
          if (id === "startLetter") {
            return handleStartLetterFilter(row, value);
          }

          // Handle standard Person properties
          if (isKeyOfPerson(id)) {
            return handleStandardFilter(row, id, value);
          }

          return true;
        }),
      )
    : searchFiltered;

  const sorted =
    sort && sort.length > 0
      ? [...columnFiltered].sort((a, b) =>
          sort.reduce((result, { id, desc }) => {
            if (result !== 0) return result;

            if (isKeyOfPerson(id)) {
              const aValue = a[id];
              const bValue = b[id];
              return compareValues(aValue, bValue, desc);
            }

            // Handle custom sort fields if needed
            return 0;
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

  const [removedRow] = data.splice(rowIndex, 1);

  const reorderedData = [
    ...data.slice(0, newRowIndex),
    removedRow,
    ...data.slice(newRowIndex),
  ];

  return reorderedData;
};
