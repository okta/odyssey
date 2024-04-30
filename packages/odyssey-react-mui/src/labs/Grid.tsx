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
import { Children, ReactNode, memo } from "react";
import {
  DesignTokens,
  useOdysseyDesignTokens,
} from "../OdysseyDesignTokensContext";

type SupportedColumnRatios =
  | [1]
  | [1, 1]
  | [1, 2]
  | [2, 1]
  | [1, 3]
  | [3, 1]
  | [1, 1, 1]
  | [1, 2, 1]
  | [2, 1, 1]
  | [1, 1, 2]
  | [1, 1, 1, 1];

export type GridProps = {
  /**
   * The supported column ratios for the Grid. Each number is a fractional unit that is mapped to the 'fr' CSS unit.
   * e.g. [2, 1] defines a 2/3, 1/3 layout and [1, 2, 1] defines a 1/4, 1/2, 1/4 layout
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout/Basic_concepts_of_grid_layout#the_fr_unit
   */
  columns: SupportedColumnRatios;
  /**
   * The content of the Grid. May be a `string` or any other `ReactNode` or array of `ReactNode`s.
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
})<GridContentProps>(({ odysseyDesignTokens, columns }) => ({
  display: "grid",
  gridTemplateColumns: columns,
  gridColumnGap: odysseyDesignTokens.Spacing4,
  columnGap: odysseyDesignTokens.Spacing4,
}));

const GridPane = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{
  odysseyDesignTokens: DesignTokens;
}>(({ odysseyDesignTokens }) => ({
  backgroundColor: odysseyDesignTokens.HueNeutralWhite,
  borderRadius: odysseyDesignTokens.Spacing4,
  padding: odysseyDesignTokens.Spacing4,
}));

const Grid = ({ columns, children }: GridProps) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();
  const mappedColumns = columns.map((col) => `minmax(0, ${col}fr)`).join(" ");

  return (
    <GridContent
      odysseyDesignTokens={odysseyDesignTokens}
      columns={mappedColumns}
    >
      {Children.toArray(children).map((child, index) => {
        return (
          <GridPane key={index} odysseyDesignTokens={odysseyDesignTokens}>
            {child}
          </GridPane>
        );
      })}
    </GridContent>
  );
};

const MemoizedGrid = memo(Grid);
MemoizedGrid.displayName = "Grid";

export { MemoizedGrid as Grid };
