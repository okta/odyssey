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

import { Children, ReactNode, memo } from "react";
import styled from "@emotion/styled";

import { Box } from "../../Box";
import {
  DesignTokens,
  useOdysseyDesignTokens,
} from "../../OdysseyDesignTokensContext";

type SupportedRegionRatios =
  | [1]
  | [1, 1]
  | [1, 2]
  | [2, 1]
  | [1, 3]
  | [3, 1]
  | [1, 1, 1]
  | [1, 1, 1, 1];

export type LayoutProps = {
  /**
   * The supported region ratios for the Grid. Each number is a fractional unit that is mapped to the 'fr' CSS unit.
   * e.g. [2, 1] defines a 2/3, 1/3 layout and [1, 1, 1] defines a 1/3, 1/3, 1/3 layout
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout/Basic_concepts_of_grid_layout#the_fr_unit
   */
  regions: SupportedRegionRatios;
  /**
   * The content of the Grid. May be a `string` or any other `ReactNode` or array of `ReactNode`s.
   */
  children?: ReactNode;
};

interface LayoutContentProps {
  odysseyDesignTokens: DesignTokens;
  regions: string;
}

const LayoutContent = styled("div", {
  shouldForwardProp: (prop) =>
    !["odysseyDesignTokens", "regions"].includes(prop),
})<LayoutContentProps>(({ odysseyDesignTokens, regions }) => ({
  display: "grid",
  gridTemplateColumns: regions,
  gridColumnGap: odysseyDesignTokens.Spacing4,
  columnGap: odysseyDesignTokens.Spacing4,

  "& + &": {
    marginBlockStart: odysseyDesignTokens.Spacing4,
  },
}));

const Layout = ({ regions, children }: LayoutProps) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();
  const mappedRegions = regions
    .map((region) => `minmax(0, ${region}fr)`)
    .join(" ");

  return (
    <Box>
      <LayoutContent
        odysseyDesignTokens={odysseyDesignTokens}
        regions={mappedRegions}
      >
        {Children.toArray(children).map((child) => child)}
      </LayoutContent>
    </Box>
  );
};

const MemoizedLayout = memo(Layout);
MemoizedLayout.displayName = "Layout";

export { MemoizedLayout as Layout };
