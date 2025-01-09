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

import { memo, useCallback } from "react";
import { useColumns, data, OdysseyComponent } from "./roadmapData";
import {
  Box,
  Callout,
  createOdysseyMuiTheme,
  CssBaseline,
  DataTable,
  DataTableGetDataType,
  OdysseyThemeProvider,
  ScopedCssBaseline,
} from "@okta/odyssey-react-mui";
import { ThemeProvider as StorybookThemeProvider } from "@storybook/theming";
import * as odysseyTokens from "@okta/odyssey-design-tokens";

export const InnerRoadmapTable = () => {
  const columns = useColumns(); // Use the hook to get columns
  const filterData = ({
    data,
  }: {
    data: OdysseyComponent[];
  } & DataTableGetDataType) => {
    const filteredData = data;

    return filteredData;
  };

  const fetchData = useCallback(({ ...props }: DataTableGetDataType) => {
    return filterData({ data, ...props });
  }, []);

  return <DataTable columns={columns} getData={fetchData} hasSorting={false} />;
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
          <Box
            sx={{
              width: "700px",
              maxWidth: "100%",
              margin: "0 auto",
            }}
          >
            <MemoizedInnerRoadmapTable />
          </Box>
        </ScopedCssBaseline>
      </StorybookThemeProvider>
    </OdysseyThemeProvider>
  );
};

export { WrappedRoadmapTable as RoadmapTable };
