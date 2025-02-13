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

import { HamburgerMenu } from "./HamburgerMenuIcon.js";
import type { HtmlProps } from "../../HtmlProps.js";
import { MoreIcon } from "../../icons.generated/More.js";
import {
  DesignTokens,
  useOdysseyDesignTokens,
} from "../../OdysseyDesignTokensContext.js";
import {
  UiShellColors,
  useUiShellContext,
} from "../../ui-shell/UiShellProvider.js";
import { TOP_NAV_HEIGHT } from "./TopNav.js";

const StyledLeftSideContainer = styled("div")(() => ({
  flexGrow: 1,
}));

const StyledRightSideContainer = styled("div")(() => ({
  flexShrink: 0,
}));

const StyledTopNavContainer = styled("div", {
  shouldForwardProp: (prop) =>
    prop !== "odysseyDesignTokens" &&
    prop !== "isScrolled" &&
    prop !== "topNavBackgroundColor",
})<{
  isScrolled?: boolean;
  odysseyDesignTokens: DesignTokens;
  topNavBackgroundColor?: UiShellColors["topNavBackgroundColor"];
}>(({ odysseyDesignTokens, isScrolled, topNavBackgroundColor }) => ({
  alignItems: "center",
  backgroundColor: topNavBackgroundColor,
  boxShadow: isScrolled ? odysseyDesignTokens.DepthMedium : undefined,
  clipPath: "inset(0 0 -100vh 0)",
  display: "flex",
  gap: odysseyDesignTokens.Spacing4,
  height: "100%",
  justifyContent: "space-between",
  maxHeight: TOP_NAV_HEIGHT,
  minHeight: TOP_NAV_HEIGHT,
  overflowX: "hidden",
  paddingBlock: odysseyDesignTokens.Spacing2,
  paddingInline: odysseyDesignTokens.Spacing8,
  position: "relative",
  transition: `box-shadow ${odysseyDesignTokens.TransitionDurationMain} ${odysseyDesignTokens.TransitionTimingMain}`,
  zIndex: 100,

  ...(topNavBackgroundColor === odysseyDesignTokens.HueNeutralWhite && {
    borderBottom: `${odysseyDesignTokens.BorderWidthMain} ${odysseyDesignTokens.BorderStyleMain} ${odysseyDesignTokens.HueNeutral100}`,
  }),
}));

export type NarrowTopNavProps = {
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

const NarrowTopNav = ({
  isScrolled,
  leftSideComponent,
  rightSideComponent,
}: NarrowTopNavProps) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();
  const uiShellContext = useUiShellContext();

  return (
    <StyledTopNavContainer
      odysseyDesignTokens={odysseyDesignTokens}
      isScrolled={isScrolled}
      topNavBackgroundColor={uiShellContext?.topNavBackgroundColor}
    >
      <HamburgerMenu />
      <MoreIcon />
      <StyledLeftSideContainer>
        {leftSideComponent ?? <div />}
      </StyledLeftSideContainer>
      <StyledRightSideContainer>
        {rightSideComponent ?? <div />}
      </StyledRightSideContainer>
    </StyledTopNavContainer>
  );
};

const MemoizedNarrowTopNav = memo(NarrowTopNav);
MemoizedNarrowTopNav.displayName = "NarrowTopNav";

export { MemoizedNarrowTopNav as NarrowTopNav };
