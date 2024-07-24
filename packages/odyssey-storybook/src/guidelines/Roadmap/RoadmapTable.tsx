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
import { useCallback, memo, useState } from "react";
//import { columns, data } from "./roadmapData";
import {
  Callout,
  DataTable,
  CssBaseline,
  OdysseyThemeProvider,
  DataTableGetDataType,
  DataTableRowSelectionState,
  ScopedCssBaseline,
  createOdysseyMuiTheme,
} from "@okta/odyssey-react-mui";
import { ThemeProvider as StorybookThemeProvider } from "@storybook/theming";
import * as odysseyTokens from "@okta/odyssey-design-tokens";
import {
  Planet,
  columns as planetColumns,
  data as planetData,
} from "./planetData";

const filterData = ({
  data,
  ...args
}: {
  data: Planet[];
} & DataTableGetDataType) => {
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
            return row[id as keyof Planet]
              ?.toString()
              .toLowerCase()
              .includes(arrayValue.toString().toLowerCase());
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
        return row[id as keyof Planet]
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
        const aValue = a[id as keyof Planet];
        const bValue = b[id as keyof Planet];

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

export const InnerRoadmapTable = () => {
  const [data] = useState<Planet[]>(planetData);

  const getData = useCallback(
    ({ ...props }: DataTableGetDataType) => {
      return filterData({ data, ...props });
    },
    [data],
  );

  const onChangeRowSelection = useCallback(
    (rowSelection: DataTableRowSelectionState) => {
      if (Object.keys(rowSelection).length > 0) {
        console.log(`${Object.keys(rowSelection).length} selected`);
      }
    },
    [],
  );

  return (
    <DataTable
      columns={planetColumns}
      getData={getData}
      onChangeRowSelection={onChangeRowSelection}
    />
  );
};

const MemoizedInnerRoadmapTable = memo(InnerRoadmapTable);
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
          <MemoizedInnerRoadmapTable />
        </ScopedCssBaseline>
      </StorybookThemeProvider>
    </OdysseyThemeProvider>
  );
};

export { WrappedRoadmapTable as RoadmapTable };
