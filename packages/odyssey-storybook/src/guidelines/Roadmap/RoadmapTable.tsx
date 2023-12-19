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

import {
  DataFilter,
  DataTable,
  MRT_SortingState,
} from "@okta/odyssey-react-mui/labs";
import { columns, data as incomingData, OdysseyComponent } from "./roadmapData";
import {
  Callout,
  CssBaseline,
  OdysseyThemeProvider,
  ScopedCssBaseline,
  createOdysseyMuiTheme,
} from "@okta/odyssey-react-mui";
import { ThemeProvider as StorybookThemeProvider } from "@storybook/theming";
import * as odysseyTokens from "@okta/odyssey-design-tokens";

const processData = ({
  initialData,
  page = 1,
  resultsPerPage = 20,
  search,
  filters,
  sort,
}: {
  initialData: OdysseyComponent[];
  page?: number;
  resultsPerPage?: number;
  search?: string;
  filters?: DataFilter[];
  sort?: MRT_SortingState;
}) => {
  let filteredData = [...initialData];

  // Implement text-based query filtering
  if (search) {
    filteredData = filteredData.filter((row) =>
      Object.values(row).some((value) =>
        value.toString().toLowerCase().includes(search.toLowerCase())
      )
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

        // General filtering for other columns
        return row[id as keyof OdysseyComponent]
          ?.toString()
          .includes(value.toString());
      });
    });
  }

  function parseCustomDate(dateStr: string): Date {
    if (dateStr.length <= 0) {
      return new Date(2999, 0);
    }

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const [monthStr, yearStr] = dateStr.split(" ");

    const month = months.indexOf(monthStr);
    const year = parseInt(yearStr.replace("'", ""), 10) + 2000; // Adjust for century

    return new Date(year, month);
  }

  // Implement sorting
  if (sort && sort.length > 0) {
    filteredData.sort((a, b) => {
      for (const { id, desc } of sort) {
        let aValue: string | Date = a[id as keyof OdysseyComponent];
        let bValue: string | Date = b[id as keyof OdysseyComponent];

        if (
          id === "startDate" ||
          id === "labsRelease" ||
          id === "fullRelease"
        ) {
          aValue = parseCustomDate(aValue);
          bValue = parseCustomDate(bValue);
        }

        if (aValue < bValue) return desc ? 1 : -1;
        if (aValue > bValue) return desc ? -1 : 1;
      }

      return 0;
    });
  }

  // Implement pagination
  const startIdx = (page - 1) * resultsPerPage;
  const endIdx = startIdx + resultsPerPage;
  const paginatedData = filteredData.slice(startIdx, endIdx);

  return paginatedData;
};

export const InnerRoadmapTable = () => {
  const data = incomingData;

  const fetchData = ({
    page,
    resultsPerPage,
    search,
    filters,
    sort,
  }: {
    page?: number;
    resultsPerPage?: number;
    search?: string;
    filters?: DataFilter[];
    sort?: MRT_SortingState;
  }) => {
    return processData({
      initialData: data,
      page: page,
      resultsPerPage: resultsPerPage,
      search: search,
      filters: filters,
      sort: sort,
    });
  };

  const startingData = fetchData({});

  return (
    <DataTable
      columns={columns}
      data={startingData}
      totalRows={data.length}
      getRowId={({ name }) => name}
      fetchDataFn={fetchData}
      hasChangeableDensity
      hasColumnResizing
      hasColumnVisibility
      hasFilters={false}
      hasPagination={false}
      hasRowSelection={false}
      hasRowReordering={false}
      searchDelayTime={0}
      hasSearch
      hasSorting
    />
  );
};

const WrappedRoadmapTable = () => {
  const odysseyTheme = createOdysseyMuiTheme({ odysseyTokens });

  return (
    <OdysseyThemeProvider>
      {/* @ts-expect-error type mismatch on "typography" */}
      <StorybookThemeProvider theme={odysseyTheme}>
        <CssBaseline />
        <ScopedCssBaseline>
          <Callout severity="info">
            Dates in the future are projected and may change.
          </Callout>
          <InnerRoadmapTable />
        </ScopedCssBaseline>
      </StorybookThemeProvider>
    </OdysseyThemeProvider>
  );
};

export { WrappedRoadmapTable as RoadmapTable };
