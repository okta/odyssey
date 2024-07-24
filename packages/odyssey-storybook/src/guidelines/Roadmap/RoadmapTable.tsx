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

/* eslint-disable import/no-extraneous-dependencies */
import React, { useMemo, useCallback } from "react";
import { DataFilter } from "@okta/odyssey-react-mui/labs";
import { DataTable } from "@okta/odyssey-react-mui";
import {
  //CssBaseline,
  OdysseyThemeProvider,
  // ScopedCssBaseline,
  // createOdysseyMuiTheme,
} from "@okta/odyssey-react-mui";
//import { ThemeProvider as StorybookThemeProvider } from "@storybook/theming";
//import * as odysseyTokens from "@okta/odyssey-design-tokens";

// Assuming this is how your data and columns are imported
import { useColumns, data as initialData } from "./roadmapData";

// Memoize the initial data
const useData = () => useMemo(() => initialData, []);

// const processData = ({
//   initialData,
//   page = 1,
//   resultsPerPage = 100,
//   search,
//   filters,
//   sort,
// }: {
//   initialData: OdysseyComponent[];
//   page?: number;
//   resultsPerPage?: number;
//   search?: string;
//   filters?: DataFilter[];
//   sort?: DataTableSortingState;
// }) => {
//   let filteredData = [...initialData];

//   if (search) {
//     filteredData = filteredData.filter((row) =>
//       Object.values(row).some((value) =>
//         value.toString().toLowerCase().includes(search.toLowerCase()),
//       ),
//     );
//   }

//   if (filters) {
//     filteredData = filteredData.filter((row) =>
//       filters.every(({ id, value }) => {
//         if (value === null || value === undefined) {
//           return true;
//         }
//         return row[id as keyof OdysseyComponent]
//           ?.toString()
//           .includes(value.toString());
//       }),
//     );
//   }

//   if (sort && sort.length > 0) {
//     filteredData.sort((a, b) => {
//       for (const { id, desc } of sort) {
//         let aValue: string | Date = a[id as keyof OdysseyComponent];
//         let bValue: string | Date = b[id as keyof OdysseyComponent];

//         if (
//           id === "startDate" ||
//           id === "labsRelease" ||
//           id === "fullRelease"
//         ) {
//           aValue = parseCustomDate(aValue as string);
//           bValue = parseCustomDate(bValue as string);
//         }

//         if (aValue < bValue) return desc ? 1 : -1;
//         if (aValue > bValue) return desc ? -1 : 1;
//       }
//       return 0;
//     });
//   }

//   const startIdx = (page - 1) * resultsPerPage;
//   const endIdx = startIdx + resultsPerPage;
//   return filteredData.slice(startIdx, endIdx);
// };

const InnerRoadmapTable: React.FC = React.memo(() => {
  const columns = useColumns();
  const data = useData(); // Ensure this is memoized correctly

  const fetchData = useCallback(
    ({ search, filters, sort }) => {
      console.log("fetchData called", { search, filters, sort });
      return data; // Simplified for testing
    },
    [data],
  );

  const tableFilters = useMemo<DataFilter[]>(
    () => [
      {
        id: "type",
        label: "Type",
        variant: "select",
        options: [{ label: "Component", value: "Component" }],
      },
    ],
    [],
  );

  return (
    <DataTable
      columns={columns}
      getData={fetchData}
      filters={tableFilters}
      hasFilters
      hasSearch
      hasSorting
    />
  );
});

const WrappedRoadmapTable: React.FC = () => {
  // const odysseyTheme = useMemo(
  //   () => createOdysseyMuiTheme({ odysseyTokens }),
  //   [],
  // );

  return (
    <OdysseyThemeProvider>
      <InnerRoadmapTable />
    </OdysseyThemeProvider>
  );
};

export { WrappedRoadmapTable as RoadmapTable };
