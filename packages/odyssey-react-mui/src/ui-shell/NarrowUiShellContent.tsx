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
import { Skeleton } from "@mui/material";
import {
  CSSProperties,
  memo,
  useCallback,
  useRef,
  useState,
  type ReactElement,
} from "react";
import { ErrorBoundary, ErrorBoundaryProps } from "react-error-boundary";

import { Button } from "../Buttons/Button.js";
import type { HtmlProps } from "../HtmlProps.js";
import { MoreIcon } from "../icons.generated/More.js";
import {
  DesignTokens,
  useOdysseyDesignTokens,
} from "../OdysseyDesignTokensContext.js";
import { SharedUnifiedUiShellProps } from "./SharedUnifiedUiShellProps.js";
import { SideNav } from "./SideNav/SideNav.js";
import { SideNavLogo } from "./SideNav/SideNavLogo.js";
import { SideNavProps } from "./SideNav/types.js";
import { OktaLogo } from "./SideNav/OktaLogo.js";
import { HamburgerMenu } from "./TopNav/HamburgerMenuIcon.js";
import { TOP_NAV_HEIGHT, TopNavProps } from "./TopNav/TopNav.js";
import {
  SubComponentName,
  UiShellNavComponentProps,
} from "./UiShellContent.js";
import { UiShellColors, useUiShellContext } from "./UiShellProvider.js";
import { ContrastMode } from "../useContrastMode.js";
import { useScrollState } from "./useScrollState.js";
import { useRepositionAppElementToContainer } from "./useRepositionAppElementToContainer.js";

const StyledAppContentArea = styled("div")({
  gridArea: "app-content",
  position: "relative",
  display: "grid",
  gridGap: 0,
  gridTemplateAreas: `
    "left-side app-container right-side"
  `,
  gridTemplateColumns: "auto 1fr auto",
  gridTemplateRows: "1fr",
  height: "100%",
  width: "100%",
});

const StyledAppContainer = styled("div", {
  shouldForwardProp: (prop) =>
    prop !== "appBackgroundColor" && prop !== "odysseyDesignTokens",
})<{
  appBackgroundColor?: UiShellColors["appBackgroundColor"];
}>(({ appBackgroundColor }) => ({
  backgroundColor: appBackgroundColor,
  height: "100%",
  gridArea: "app-container",
  width: "100%",
}));

const StyledBannersContainer = styled("div")({
  gridArea: "banners",
});

const StyledLeftSideContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "isOpen",
})<{
  isOpen: boolean;
}>(({ isOpen }) => ({
  display: isOpen ? "block" : "none",
  height: "100%",
  // left: 0,
  gridArea: "left-side",
  overflowY: "auto",
  position: "absolute",
  // top: 0,
  // width: 0,
  zIndex: 100,
}));

const StyledRightSideContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "isOpen",
})<{
  isOpen: boolean;
}>(({ isOpen }) => ({
  display: isOpen ? "block" : "none",
  height: "100%",
  gridArea: "right-side",
  overflowY: "auto",
  position: "absolute",
  right: 0,
  // top: 0,
  // width: 0,
  zIndex: 100,
}));

const StyledMenuLogo = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{
  odysseyDesignTokens: DesignTokens;
}>(({ odysseyDesignTokens }) => ({
  alignItems: "center",
  display: "inline-flex",
  gap: odysseyDesignTokens.Spacing3,
}));

const StyledSideNavContainer = styled("div")({
  height: "auto", // Without `height: "auto"`, side nav won't scroll.
});

const StyledUiShellContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{
  odysseyDesignTokens: DesignTokens;
}>(({ odysseyDesignTokens }) => ({
  backgroundColor: odysseyDesignTokens.HueNeutral50,
  display: "grid",
  gridGap: 0,
  gridTemplateAreas: `
    "banners"
    "top-nav"
    "app-content"
  `,
  gridTemplateColumns: "1fr",
  gridTemplateRows: "auto auto 1fr",
  height: "100vh",
  width: "100vw",
}));

const StyledLogoContainer = styled("div")({
  "svg, img": {
    maxHeight: "100%",
    width: "auto",
    maxWidth: "100%",
  },
});

const StyledTopNav = styled("div", {
  shouldForwardProp: (prop) =>
    prop !== "odysseyDesignTokens" &&
    prop !== "isContentScrolled" &&
    prop !== "topNavBackgroundColor",
})<{
  isContentScrolled?: boolean;
  odysseyDesignTokens: DesignTokens;
  topNavBackgroundColor?: UiShellColors["topNavBackgroundColor"];
}>(({ odysseyDesignTokens, isContentScrolled, topNavBackgroundColor }) => ({
  alignItems: "stretch",
  backgroundColor: topNavBackgroundColor,
  boxShadow: isContentScrolled ? odysseyDesignTokens.DepthMedium : undefined,
  clipPath: "inset(0 0 -100vh 0)",
  display: "flex",
  flexDirection: "column",
  gridArea: "top-nav",
  height: "100%",
  justifyContent: "center",
  position: "relative",
  transition: `box-shadow ${odysseyDesignTokens.TransitionDurationMain} ${odysseyDesignTokens.TransitionTimingMain}`,
  zIndex: 100,

  ...(topNavBackgroundColor === odysseyDesignTokens.HueNeutralWhite &&
    ({
      borderBottomColor: odysseyDesignTokens.HueNeutral100,
      borderBottomStyle: odysseyDesignTokens.BorderStyleMain,
      borderBottomWidth: odysseyDesignTokens.BorderWidthMain,
    } as CSSProperties)),
}));

const StyledTopNavMenu = styled("div", {
  shouldForwardProp: (prop) =>
    prop !== "odysseyDesignTokens" && prop !== "topNavBackgroundColor",
})<{
  odysseyDesignTokens: DesignTokens;
  topNavBackgroundColor?: UiShellColors["topNavBackgroundColor"];
}>(({ odysseyDesignTokens, topNavBackgroundColor }) => ({
  alignItems: "center",
  display: "flex",
  gap: odysseyDesignTokens.Spacing3,
  height: "100%",
  justifyContent: "space-between",
  maxHeight: TOP_NAV_HEIGHT,
  minHeight: TOP_NAV_HEIGHT,
  paddingBlock: odysseyDesignTokens.Spacing2,
  paddingInline: odysseyDesignTokens.Spacing3,
  transition: `box-shadow ${odysseyDesignTokens.TransitionDurationMain} ${odysseyDesignTokens.TransitionTimingMain}`,

  ...(topNavBackgroundColor === odysseyDesignTokens.HueNeutralWhite &&
    ({
      borderBottomColor: odysseyDesignTokens.HueNeutral100,
      borderBottomStyle: odysseyDesignTokens.BorderStyleMain,
      borderBottomWidth: odysseyDesignTokens.BorderWidthMain,
    } as CSSProperties)),
}));

const StyledTopNavSearch = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{
  odysseyDesignTokens: DesignTokens;
}>(({ odysseyDesignTokens }) => ({
  paddingBlock: odysseyDesignTokens.Spacing2,
  paddingInline: odysseyDesignTokens.Spacing3,
}));

export type NarrowUiShellContentProps = {
  /**
   * Sets a custom background color for the app content area.
   */
  appBackgroundColor?: string;
  /**
   * Sets either a gray or white background color for the app content area.
   */
  appBackgroundContrastMode?: ContrastMode;
  /**
   * Which parts of the UI Shell should be visible initially? For example,
   * if sideNavProps is undefined, should the space for the sidenav be initially visible?
   */
  initialVisibleSections?: SubComponentName[];
  /**
   *  Before the side nav has items, it will be in a loading state.
   */
  isLoading?: boolean;
  /**
   * React components that render under the top nav. This is typically a search bar.
   */
  lowerTopNavComponent?: ReactElement;
  /**
   * Notifies when a React rendering error occurs. This could be useful for logging, flagging "p0"s, and recovering UI Shell when errors occur.
   */
  onError?: ErrorBoundaryProps["onError"];
  /**
   * Components that will render as children of various other components such as the top nav or side nav.
   */
  optionalComponents?: {
    banners?: ReactElement;
    sideNavFooter?: SideNavProps["footerComponent"];
    topNavLeftSide?: TopNavProps["leftSideComponent"];
    topNavRightSide?: TopNavProps["rightSideComponent"];
  };
  /**
   * React components that render into the right side menu of the top nav.
   */
  rightSideMenuComponent?: ReactElement;
} & Pick<HtmlProps, "testId"> &
  Pick<UiShellNavComponentProps, "sideNavProps" | "topNavProps"> &
  SharedUnifiedUiShellProps;

const NarrowUiShellContent = ({
  appContainerElement,
  appContainerScrollingMode,
  hasStandardAppContentPadding = true,
  // initialVisibleSections = ["TopNav", "SideNav", "AppSwitcher"],
  isLoading,
  lowerTopNavComponent,
  onError = console.error,
  optionalComponents,
  rightSideMenuComponent,
  sideNavProps,
  // topNavProps,
}: NarrowUiShellContentProps) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();
  const { isContentScrolled, scrollableContentRef: appContainerRef } =
    useScrollState(appContainerElement);
  const sideNavContainerRef = useRef<HTMLDivElement>(null);
  const topNavContainerRef = useRef<HTMLDivElement>(null);
  const uiShellContext = useUiShellContext();

  const [isLeftSideMenuOpen, setIsLeftSideMenuOpen] = useState(false);
  const [isRightSideMenuOpen, setIsRightSideMenuOpen] = useState(false);

  const toggleLeftSideMenu = useCallback(() => {
    setIsRightSideMenuOpen(false);
    setIsLeftSideMenuOpen((isLeftSideMenuOpen) => !isLeftSideMenuOpen);
  }, []);

  const toggleRightSideMenu = useCallback(() => {
    setIsLeftSideMenuOpen(false);
    setIsRightSideMenuOpen((isRightSideMenuOpen) => !isRightSideMenuOpen);
  }, []);

  useRepositionAppElementToContainer({
    appContainerElement,
    appContainerRef,
    appContainerScrollingMode,
    hasStandardAppContentPadding,
    odysseyDesignTokens,
    resizingRefs: [sideNavContainerRef, topNavContainerRef],
  });

  // TODO: Change this to use passed-in props.
  const logoProps = {
    logoComponent: <OktaLogo />,
  };

  return (
    <StyledUiShellContainer odysseyDesignTokens={odysseyDesignTokens}>
      <StyledBannersContainer>
        {optionalComponents?.banners}
      </StyledBannersContainer>

      <ErrorBoundary fallback={null} onError={onError}>
        <StyledTopNav
          odysseyDesignTokens={odysseyDesignTokens}
          isContentScrolled={isContentScrolled}
          topNavBackgroundColor={uiShellContext?.sideNavBackgroundColor}
        >
          <StyledTopNavMenu
            odysseyDesignTokens={odysseyDesignTokens}
            topNavBackgroundColor={uiShellContext?.sideNavBackgroundColor}
          >
            <StyledMenuLogo odysseyDesignTokens={odysseyDesignTokens}>
              <Button
                onClick={toggleLeftSideMenu}
                startIcon={<HamburgerMenu />}
                variant="floating"
              />

              <StyledLogoContainer>
                {isLoading ? (
                  //  The skeleton takes the hardcoded dimensions of the Okta logo
                  <Skeleton variant="rounded" height={24} width={67} />
                ) : (
                  <SideNavLogo {...logoProps} />
                )}
              </StyledLogoContainer>
            </StyledMenuLogo>

            <Button
              onClick={toggleRightSideMenu}
              startIcon={<MoreIcon />}
              variant="floating"
            />
          </StyledTopNavMenu>

          <StyledTopNavSearch odysseyDesignTokens={odysseyDesignTokens}>
            {optionalComponents?.topNavLeftSide}
          </StyledTopNavSearch>
        </StyledTopNav>
      </ErrorBoundary>

      <StyledAppContentArea>
        <StyledLeftSideContainer isOpen={isLeftSideMenuOpen}>
          <ErrorBoundary fallback={null} onError={onError}>
            {lowerTopNavComponent ?? <div />}
          </ErrorBoundary>

          {sideNavProps && (
            <ErrorBoundary fallback={null} onError={onError}>
              <StyledSideNavContainer>
                <SideNav
                  {...{
                    ...{
                      ...sideNavProps,
                      // This hides the side nav logo or app name from showing up as we already have one in the narrow top nav.
                      appName: undefined,
                      logoProps: undefined,
                    },
                    ...(sideNavProps.hasCustomFooter &&
                    optionalComponents?.sideNavFooter
                      ? {
                          footerComponent: optionalComponents.sideNavFooter,
                          footerItems: undefined,
                          hasCustomFooter: sideNavProps.hasCustomFooter,
                        }
                      : {
                          footerItems: sideNavProps.footerItems,
                          hasCustomFooter: false,
                        }),
                  }}
                  isCollapsed={false}
                  isCollapsible={false}
                />
              </StyledSideNavContainer>
            </ErrorBoundary>
          )}
        </StyledLeftSideContainer>

        <StyledRightSideContainer isOpen={isRightSideMenuOpen}>
          {rightSideMenuComponent ?? <div />}
        </StyledRightSideContainer>

        <StyledAppContainer
          appBackgroundColor={uiShellContext?.appBackgroundColor}
          tabIndex={0}
          ref={appContainerRef}
        />
      </StyledAppContentArea>
    </StyledUiShellContainer>
  );
};

const MemoizedNarrowUiShellContent = memo(NarrowUiShellContent);
MemoizedNarrowUiShellContent.displayName = "NarrowUiShellContent";

export { MemoizedNarrowUiShellContent as NarrowUiShellContent };
