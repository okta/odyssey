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

import { Status } from "../../Status";
import { DataColumns, DataFilter, DataGetDataType } from "../";

export type Person = {
  order: number;
  id: string;
  name: string;
  city: string;
  state: string;
  age: number;
  risk: "high" | "medium" | "low";
};

export const columns: DataColumns<Person> = [
  {
    accessorKey: "order",
    header: "ID",
    enableColumnFilter: false,
    size: 120,
  },
  {
    accessorKey: "name",
    header: "Name",
    enableHiding: false,
  },
  {
    accessorKey: "city",
    header: "City",
  },
  {
    accessorKey: "state",
    header: "State",
  },
  {
    accessorKey: "age",
    header: "Age",
    size: 80,
    filterVariant: "range",
  },
  {
    accessorKey: "risk",
    header: "Risk level",
    Cell: ({ cell }) => {
      const value = cell.getValue<string>();
      const severity =
        value === "low" ? "success" : value === "medium" ? "warning" : "error";
      return (
        <Status
          label={value.charAt(0).toUpperCase() + value.slice(1)}
          severity={severity}
        />
      );
    },
    filterVariant: "multi-select",
    filterSelectOptions: [
      {
        label: "Low",
        value: "low",
      },
      {
        label: "Medium",
        value: "medium",
      },
      {
        label: "High",
        value: "high",
      },
    ],
  },
];

export const data: Person[] = [
  {
    order: 1,
    id: "1",
    name: "Luke Skywalker",
    city: "Mos Eisley",
    state: "Tatooine",
    age: 19,
    risk: "low",
  },
  {
    order: 2,
    id: "2",
    name: "Han Solo",
    city: "Corellia",
    state: "Corellia",
    age: 40,
    risk: "medium",
  },
  {
    order: 3,
    id: "3",
    name: "Leia Organa",
    city: "Alderaan City",
    state: "Alderaan",
    age: 19,
    risk: "low",
  },
  {
    order: 4,
    id: "4",
    name: "Chewbacca",
    city: "Kashyyyk City",
    state: "Kashyyyk",
    age: 50,
    risk: "high",
  },
  {
    order: 5,
    id: "5",
    name: "C-3P0",
    city: "Mos Espa",
    state: "Tatooine",
    age: 25,
    risk: "low",
  },
  {
    order: 6,
    id: "6",
    name: "R2-D2",
    city: "Theed",
    state: "Naboo",
    age: 25,
    risk: "low",
  },
];

let result: Person[] = [];
for (let i = 0; i < 50; i++) {
  result = result.concat(data);
}
export const lotsOfData = result;

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
