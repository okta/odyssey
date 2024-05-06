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

type SupportedPaneRatios =
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
   * The supported pane ratios for the Grid. Each number is a fractional unit that is mapped to the 'fr' CSS unit.
   * e.g. [2, 1] defines a 2/3, 1/3 layout and [1, 2, 1] defines a 1/4, 1/2, 1/4 layout
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout/Basic_concepts_of_grid_layout#the_fr_unit
   */
  panes: SupportedPaneRatios;
  /**
   * The content of the Grid. May be a `string` or any other `ReactNode` or array of `ReactNode`s.
   */
  children?: ReactNode;
};

interface GridContentProps {
  odysseyDesignTokens: DesignTokens;
  panes: string;
}

const GridContainer = styled("div", {
  shouldForwardProp: (prop) => prop != "odysseyDesignTokens",
})<Pick<GridContentProps, "odysseyDesignTokens">>(
  ({ odysseyDesignTokens }) => ({
    "& + &": {
      marginBlockStart: odysseyDesignTokens.Spacing4,
    },
  }),
);

const GridContent = styled("div", {
  shouldForwardProp: (prop) => !["odysseyDesignTokens", "panes"].includes(prop),
})<GridContentProps>(({ odysseyDesignTokens, panes }) => ({
  display: "grid",
  gridTemplateColumns: panes,
  gridColumnGap: odysseyDesignTokens.Spacing4,
  columnGap: odysseyDesignTokens.Spacing4,

  "& + &": {
    marginBlockStart: odysseyDesignTokens.Spacing4,
  },
}));

const Grid = ({ panes, children }: GridProps) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();
  const mappedPanes = panes.map((pane) => `minmax(0, ${pane}fr)`).join(" ");

  return (
    <GridContainer odysseyDesignTokens={odysseyDesignTokens}>
      <GridContent
        odysseyDesignTokens={odysseyDesignTokens}
        panes={mappedPanes}
      >
        {Children.toArray(children).map((child, index) => (
          <div key={index}>{child}</div>
        ))}
      </GridContent>
    </GridContainer>
  );
};

const MemoizedGrid = memo(Grid);
MemoizedGrid.displayName = "Grid";

export { MemoizedGrid as Grid };
