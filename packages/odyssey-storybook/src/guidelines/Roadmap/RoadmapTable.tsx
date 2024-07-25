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
import { memo, useCallback } from "react";
import { DataTable, DataTableGetDataType } from "@okta/odyssey-react-mui";
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
  const filterData = ({
    data,
    ...args
  }: {
    data: OdysseyComponent[];
  } & DataTableGetDataType) => {
    let filteredData = data;
    const { search } = args;

    // Implement text-based query filtering
    if (search) {
      filteredData = filteredData.filter((row) =>
        Object.values(row).some((value) =>
          value.toString().toLowerCase().includes(search.toLowerCase()),
        ),
      );
    }

    return filteredData;
  };

  const fetchData = useCallback(
    ({ ...props }: DataTableGetDataType) => {
      return filterData({ data, ...props });
    },
    [data],
  );

  return (
    <DataTable
      columns={columns} // Use the columns from the hook
      getData={fetchData}
      hasSorting={false}
    />
  );
};

const WrappedRoadmapTable = () => {
  const odysseyTheme = createOdysseyMuiTheme({ odysseyTokens });
  const MemoizedInnerRoadmapTable = memo(InnerRoadmapTable);
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
