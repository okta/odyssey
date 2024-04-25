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

import styled from "@emotion/styled";
import { ReactNode, memo } from "react";
import {
  DesignTokens,
  useOdysseyDesignTokens,
} from "../OdysseyDesignTokensContext";
import { Box } from "../Box";

type SupportedColumnRatios =
  | [1]
  | [1, 1]
  | [2, 1]
  | [1, 2]
  | [3, 1]
  | [1, 3]
  | [1, 1, 1]
  | [1, 2, 1]
  | [2, 1, 1]
  | [1, 1, 2]
  | [1, 1, 1, 1];

export type GridProps = {
  columns: SupportedColumnRatios;
  /**
   * The content of the layout. May be a `string` or any other `ReactNode` or array of `ReactNode`s.
   */
  children?: ReactNode;
};

interface GridContentProps {
  odysseyDesignTokens: DesignTokens;
  columns: string;
}

const GridContent = styled("div", {
  shouldForwardProp: (prop) =>
    !["odysseyDesignTokens", "columns"].includes(prop),
})<GridContentProps>(({ columns }) => ({
  maxWidth: "1440px",
  display: "grid",
  gridTemplateColumns: columns,
  gridColumnGap: "16px",
  columnGap: "16px",
}));

const Grid = ({ columns, children }: GridProps) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();
  const mappedColumns = columns.map((col) => `minmax(0, ${col}fr)`).join(" ");

  return (
    <GridContent
      odysseyDesignTokens={odysseyDesignTokens}
      columns={mappedColumns}
    >
      {Array.isArray(children) ? (
        children.map((child, idx) => {
          return (
            <Box
              key={idx}
              sx={{
                backgroundColor: "white",
                borderRadius: "16px",
                padding: "16px",
              }}
            >
              {child}
            </Box>
          );
        })
      ) : (
        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: "16px",
            padding: "16px",
          }}
        >
          {children}
        </Box>
      )}
    </GridContent>
  );
};

const MemoizedGrid = memo(Grid);
MemoizedGrid.displayName = "Grid";

export { MemoizedGrid as Grid };
