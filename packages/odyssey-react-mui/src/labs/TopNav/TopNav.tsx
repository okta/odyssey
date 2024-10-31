/*!
 * Copyright (c) 2022-present, Okta, Inc. and/or its affiliates. All rights reserved.
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
import { memo, type ReactElement } from "react";

import type { HtmlProps } from "../../HtmlProps";
import {
  DesignTokens,
  useOdysseyDesignTokens,
} from "../../OdysseyDesignTokensContext";

export const TOP_NAV_HEIGHT = `${64 / 14}rem`;

const StyledLeftSideContainer = styled("div")(() => ({
  flexGrow: 1,
}));

const StyledRightSideContainer = styled("div")(() => ({
  flexShrink: 0,
}));

const StyledTopNavContainer = styled("div", {
  shouldForwardProp: (prop) =>
    prop !== "odysseyDesignTokens" && prop !== "isScrolled",
})<{
  odysseyDesignTokens: DesignTokens;
  isScrolled?: boolean;
}>(({ odysseyDesignTokens, isScrolled }) => ({
  alignItems: "center",
  backgroundColor: odysseyDesignTokens.HueNeutral50,
  boxShadow: isScrolled ? odysseyDesignTokens.DepthMedium : undefined,
  clipPath: "inset(0 0 -100% 0)",
  display: "flex",
  gap: odysseyDesignTokens.Spacing4,
  height: "100%",
  justifyContent: "space-between",
  maxHeight: TOP_NAV_HEIGHT,
  minHeight: TOP_NAV_HEIGHT,
  paddingBlock: odysseyDesignTokens.Spacing2,
  paddingInline: odysseyDesignTokens.Spacing6,
  transition: `box-shadow ${odysseyDesignTokens.TransitionDurationMain} ${odysseyDesignTokens.TransitionTimingMain}`,
}));

export type TopNavProps = {
  /**
   * Whether or not the underlying content has been scrolled
   */
  isScrolled?: boolean;
  /**
   * React components that render into the left side of the top nav.
   */
  leftSideComponent?: ReactElement;
  /**
   * React components that render into the right side of the top nav.
   */
  rightSideComponent?: ReactElement;
} & Pick<HtmlProps, "testId">;

const TopNav = ({
  isScrolled,
  leftSideComponent,
  rightSideComponent,
}: TopNavProps) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();

  return (
    <StyledTopNavContainer
      odysseyDesignTokens={odysseyDesignTokens}
      isScrolled={isScrolled}
    >
      <StyledLeftSideContainer>
        {leftSideComponent ?? <div />}
      </StyledLeftSideContainer>
      <StyledRightSideContainer>
        {rightSideComponent ?? <div />}
      </StyledRightSideContainer>
    </StyledTopNavContainer>
  );
};

const MemoizedTopNav = memo(TopNav);
MemoizedTopNav.displayName = "TopNav";

export { MemoizedTopNav as TopNav };
