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
import { memo, useRef, type ReactElement } from "react";

import type { HtmlProps } from "../../HtmlProps.js";
import {
  DesignTokens,
  useOdysseyDesignTokens,
} from "../../OdysseyDesignTokensContext.js";
import {
  UiShellColors,
  useUiShellContext,
} from "../../ui-shell/UiShellProvider.js";
import useResizeObserver from "../../useResizeObserver.js";
import { Button } from "../../Buttons/Button.js";
import { MenuButton } from "../../Buttons/MenuButton.js";

export const TOP_NAV_HEIGHT = `${64 / 14}rem`;

const StyledLeftSideContainer = styled("div")(() => ({
  flexGrow: 1,
}));

const StyledRightSideContainer = styled("div")(() => ({
  flexShrink: 0,
}));

const nonForwardedProps = [
  "isMobile",
  "isScrolled",
  "odysseyDesignTokens",
  "topNavBackgroundColor",
];

const StyledTopNavContainer = styled("div", {
  shouldForwardProp: (prop) => !nonForwardedProps.includes(prop),
})<{
  isMobile: TopNavProps["isMobile"];
  isScrolled?: boolean;
  odysseyDesignTokens: DesignTokens;
  topNavBackgroundColor?: UiShellColors["topNavBackgroundColor"];
}>(({ isMobile, odysseyDesignTokens, isScrolled, topNavBackgroundColor }) => ({
  alignItems: "center",
  backgroundColor: isMobile
    ? odysseyDesignTokens.HueNeutralWhite
    : topNavBackgroundColor,
  boxShadow: isScrolled ? odysseyDesignTokens.DepthMedium : undefined,
  clipPath: "inset(0 0 -100vh 0)",
  display: "flex",
  gap: odysseyDesignTokens.Spacing4,
  height: "100%",
  justifyContent: "space-between",
  maxHeight: TOP_NAV_HEIGHT,
  minHeight: TOP_NAV_HEIGHT,
  paddingBlock: odysseyDesignTokens.Spacing2,
  paddingInline: odysseyDesignTokens.Spacing8,
  position: "relative",
  transition: `box-shadow ${odysseyDesignTokens.TransitionDurationMain} ${odysseyDesignTokens.TransitionTimingMain}`,
  zIndex: 1,

  ...(topNavBackgroundColor === odysseyDesignTokens.HueNeutralWhite && {
    borderBottom: `${odysseyDesignTokens.BorderWidthMain} ${odysseyDesignTokens.BorderStyleMain} ${odysseyDesignTokens.HueNeutral100}`,
  }),
}));

export type TopNavProps = {
  /**
   * Whether or not the topnav should render in a mobile friendly manner
   */
  isMobile?: boolean;
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
  /**
   * React components that render into the popover of the mobile menu button.
   */
  mobileMenuContentComponent?: ReactElement;
} & Pick<HtmlProps, "testId">;

const TopNav = ({
  isMobile = true,
  isScrolled,
  leftSideComponent,
  rightSideComponent,
}: TopNavProps) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();
  const uiShellContext = useUiShellContext();
  const topNavContentContainerRef = useRef<HTMLDivElement>(null);
  const leftSideContainerRef = useRef<HTMLDivElement>(null);
  const rightSideContainerRef = useRef<HTMLDivElement>(null);

  const { width: topNavContainerWidth } = useResizeObserver(
    topNavContentContainerRef,
  );

  const { width: leftSideContainerWidth } =
    useResizeObserver(leftSideContainerRef);

  const { width: rightSideContainerWidth } = useResizeObserver(
    rightSideContainerRef,
  );
  console.log(
    { topNavContainerWidth },
    { leftSideContainerWidth },
    { rightSideContainerWidth },
  );

  return (
    <StyledTopNavContainer
      isMobile={isMobile}
      isScrolled={isScrolled}
      odysseyDesignTokens={odysseyDesignTokens}
      ref={topNavContentContainerRef}
      topNavBackgroundColor={uiShellContext?.topNavBackgroundColor}
    >
      {isMobile ? (
        <>
          <Button label="open mobile menu" variant="floating" />
          <MenuButton
            buttonLabel="open right side"
            popoverContent={rightSideComponent}
          />
        </>
      ) : (
        <>
          <StyledLeftSideContainer ref={leftSideContainerRef}>
            {leftSideComponent ?? <div />}
          </StyledLeftSideContainer>
          <StyledRightSideContainer ref={rightSideContainerRef}>
            {rightSideComponent ?? <div />}
          </StyledRightSideContainer>
        </>
      )}
    </StyledTopNavContainer>
  );
};

const MemoizedTopNav = memo(TopNav);
MemoizedTopNav.displayName = "TopNav";

export { MemoizedTopNav as TopNav };
