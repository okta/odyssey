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
import { useMemo, useCallback } from "react";
import { DataFilter } from "@okta/odyssey-react-mui/labs";
import {
  DataTable,
  DataTableGetDataType,
  DataTableSortingState,
} from "@okta/odyssey-react-mui";
import { useColumns, data, OdysseyComponent } from "./roadmapData";
import {
  Callout,
  CssBaseline,
  OdysseyThemeProvider,
  ScopedCssBaseline,
  createOdysseyMuiTheme,
} from "@okta/odyssey-react-mui";
import { ThemeProvider as StorybookThemeProvider } from "@storybook/theming";
import * as odysseyTokens from "@okta/odyssey-design-tokens";

export const InnerRoadmapTable = () => {
  const columns = useColumns(); // Use the hook to get columns

  // Memoize filter options
  const typeOptions = useMemo(
    () => [
      { label: "Component", value: "Component" },
      { label: "Pattern", value: "Pattern" },
    ],
    [],
  );

  const statusOptions = useMemo(
    () => [
      { label: "In Progress", value: "In progress" },
      { label: "In Labs", value: "In labs" },
      { label: "Released", value: "Released" },
      { label: "Not Started", value: "Not started" },
    ],
    [],
  );

  const expectedOptions = useMemo(
    () => [
      { label: "FY24", value: "FY24" },
      { label: "TBD", value: "TBD" },
      { label: "Q1 FY25", value: "Q1 FY25" },
      { label: "Q2 FY25", value: "Q2 FY25" },
      { label: "Q3 FY25", value: "Q3 FY25" },
      { label: "Q4 FY25", value: "Q4 FY25" },
      { label: "Q1 FY26", value: "Q1 FY26" },
      { label: "Q2 FY26", value: "Q2 FY26" },
      { label: "Q3 FY26", value: "Q3 FY26" },
      { label: "Q4 FY26", value: "Q4 FY26" },
    ],
    [],
  );
  // const filterData = ({
  //   data,
  //   ...args
  // }: {
  //   data: OdysseyComponent[];
  // } & DataTableGetDataType) => {
  //   let filteredData = data;
  //   const { search, sort } = args;

  //   // Implement text-based query filtering
  //   if (search) {
  //     filteredData = filteredData.filter((row) =>
  //       Object.values(row).some((value) =>
  //         value.toString().toLowerCase().includes(search.toLowerCase()),
  //       ),
  //     );
  //   }

  //   // Implement sorting
  //   if (sort && sort.length > 0) {
  //     filteredData.sort((a, b) => {
  //       for (const { id, desc } of sort) {
  //         const aValue: string | Date = a[id as keyof OdysseyComponent];
  //         const bValue: string | Date = b[id as keyof OdysseyComponent];

  //         if (aValue < bValue) return desc ? 1 : -1;
  //         if (aValue > bValue) return desc ? -1 : 1;
  //       }

  //       return 0;
  //     });
  //   }

  //   return filteredData;
  // };

  const filterData = ({
    data,
    search,
    sort,
    filters,
  }: {
    data: OdysseyComponent[];
    search?: string;
    sort?: DataTableSortingState;
    filters?: DataFilter[];
  }) => {
    let filteredData = [...data];

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
          if (value === null || value === undefined) {
            return true;
          }
          return row[id as keyof OdysseyComponent]
            ?.toString()
            .includes(value.toString());
        });
      });
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
            aValue = parseCustomDate(aValue as string);
            bValue = parseCustomDate(bValue as string);
          }

          if (aValue < bValue) return desc ? 1 : -1;
          if (aValue > bValue) return desc ? -1 : 1;
        }

        return 0;
      });
    }

    return filteredData;
  };

  // Helper function for parsing custom date formats
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
  const fetchData = useCallback(
    ({ ...props }: DataTableGetDataType) => {
      return filterData({ data, ...props });
    },
    [data],
  );

  const tableFilters = useMemo<DataFilter[]>(
    () => [
      {
        id: "type",
        label: "Type",
        variant: "select",
        options: typeOptions,
      },
      {
        id: "status",
        label: "Status",
        variant: "select",
        options: statusOptions,
      },
      {
        id: "deliverableTiming",
        label: "Deliverable timing",
        variant: "autocomplete",
        options: expectedOptions,
      },
    ],
    [typeOptions, statusOptions, expectedOptions],
  );

  return (
    <DataTable
      columns={columns} // Use the columns from the hook
      getData={fetchData}
      hasFilters
      filters={tableFilters}
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
            Any products, features or functionality referenced in this
            presentation that are not currently generally available may not be
            delivered on time or at all. Product roadmaps do not represent a
            commitment, obligation or promise to deliver any product, feature or
            functionality, and you should not rely on them to make your purchase
            decisions.
          </Callout>
          <InnerRoadmapTable />
        </ScopedCssBaseline>
      </StorybookThemeProvider>
    </OdysseyThemeProvider>
  );
};

export { WrappedRoadmapTable as RoadmapTable };
