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
  useEffect,
  useRef,
  useState,
} from "react";
import { ErrorBoundary } from "react-error-boundary";

import { Button } from "../Buttons/Button.js";
import type { HtmlProps } from "../HtmlProps.js";
import { CloseIcon } from "../icons.generated/Close.js";
import { MoreIcon } from "../icons.generated/More.js";
import {
  DesignTokens,
  useOdysseyDesignTokens,
} from "../OdysseyDesignTokensContext.js";
import { SideNav } from "./SideNav/SideNav.js";
import { SideNavLogo } from "./SideNav/SideNavLogo.js";
import { HamburgerMenuIcon } from "./TopNav/HamburgerMenuIcon.js";
import { UiShellColors, useUiShellContext } from "./UiShellProvider.js";
import {
  UiShellNavComponentProps,
  UiShellContentProps,
} from "./uiShellContentTypes.js";
import {
  emptySideNavItems,
  SIDE_NAV_WIDTH,
  TOP_NAV_HEIGHT,
  UI_SHELL_BASE_Z_INDEX,
} from "./uiShellSharedConstants.js";
import { useScrollState } from "./useScrollState.js";
import { useMatchAppElementToUiShellAppArea } from "./useMatchAppElementToUiShellAppArea.js";
import { hexToRgb } from "../hexToRgb.js";

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
  overflow: "hidden",
  width: "100%",
}));

const StyledBannersContainer = styled("div")({
  gridArea: "banners",
  zIndex: UI_SHELL_BASE_Z_INDEX,
});

const StyledLeftSideContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "isOpen",
})<{
  isOpen: boolean;
}>(({ isOpen }) => ({
  display: isOpen ? "block" : "none",
  height: "100%",
  gridArea: "left-side",
  overflowY: "auto",
  position: "absolute",
  zIndex: UI_SHELL_BASE_Z_INDEX,
}));

const StyledRightSideContainer = styled("div", {
  shouldForwardProp: (prop) =>
    prop !== "isOpen" && prop !== "odysseyDesignTokens",
})<{
  isOpen: boolean;
  odysseyDesignTokens: DesignTokens;
}>(({ isOpen, odysseyDesignTokens }) => ({
  backgroundColor: odysseyDesignTokens.HueNeutralWhite,
  display: isOpen ? "block" : "none",
  gridArea: "right-side",
  height: "100%",
  maxWidth: SIDE_NAV_WIDTH,
  overflowY: "auto",
  position: "absolute",
  right: 0,
  width: SIDE_NAV_WIDTH,
  zIndex: UI_SHELL_BASE_Z_INDEX,
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

const StyledLogoContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{
  odysseyDesignTokens: DesignTokens;
}>(({ odysseyDesignTokens }) => ({
  height: TOP_NAV_HEIGHT,
  paddingBlock: odysseyDesignTokens.Spacing4,

  "svg, img": {
    maxHeight: "100%",
    width: "auto",
    maxWidth: "100%",
  },
}));

const StyledPageOverlay = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{
  odysseyDesignTokens: DesignTokens;
}>(({ odysseyDesignTokens }) => ({
  backgroundColor: hexToRgb(
    odysseyDesignTokens.HueNeutral900,
  ).asFormattedString.replace(/rgb\((.+)\)$/, "rgba($1, 0.26)"),
  gridArea: "app-content",
  height: "100vh",
  left: 0,
  position: "absolute",
  top: 0,
  width: "100vw",
  zIndex: UI_SHELL_BASE_Z_INDEX,
}));

const StyledSideNavContainer = styled("div")({
  height: "100%", // Without this value, side nav won't fill up the height if the content is too short.
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
  overflow: "hidden",
  width: "100vw",
}));

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
  backgroundColor: odysseyDesignTokens.HueNeutralWhite || topNavBackgroundColor, // This logic doesn't make sense, but I wanted to leave it here for when we eventually make a decision on `topNavBackgroundColor`. --Kevin Ghadyani
  boxShadow: isContentScrolled ? odysseyDesignTokens.DepthMedium : undefined,
  clipPath: "inset(0 0 -100vh 0)",
  display: "flex",
  flexDirection: "column",
  gridArea: "top-nav",
  height: "100%",
  justifyContent: "center",
  position: "relative",
  transition: `box-shadow ${odysseyDesignTokens.TransitionDurationMain} ${odysseyDesignTokens.TransitionTimingMain}`,
  zIndex: UI_SHELL_BASE_Z_INDEX,
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

export type NarrowUiShellContentProps = Pick<HtmlProps, "testId"> &
  Pick<UiShellNavComponentProps, "sideNavProps" | "topNavProps"> &
  UiShellContentProps;

const NarrowUiShellContent = ({
  appElement,
  appElementScrollingMode,
  hasStandardAppContentPadding = true,
  initialVisibleSections = ["TopNav", "SideNav", "AppSwitcher"],
  onError = console.error,
  optionalComponents,
  sideNavProps,
  topNavProps,
}: NarrowUiShellContentProps) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();
  const uiShellContext = useUiShellContext();

  const { isContentScrolled } = useScrollState(appElement);

  const sideNavContainerRef = useRef<HTMLDivElement>(null);
  const topNavContainerRef = useRef<HTMLDivElement>(null);
  const uiShellAppAreaRef = useRef<HTMLDivElement>(null);

  const [isLeftSideMenuOpen, setIsLeftSideMenuOpen] = useState(false);
  const [isRightSideMenuOpen, setIsRightSideMenuOpen] = useState(false);

  const closeSideMenus = useCallback(() => {
    setIsLeftSideMenuOpen(false);
    setIsRightSideMenuOpen(false);
  }, []);

  useEffect(() => {
    const unsubscribeFromCloseRightSideMenu =
      uiShellContext?.subscribeToCloseRightSideMenu(() => {
        closeSideMenus();
      });

    const unsubscribeFromSideNavItemClicked =
      uiShellContext?.subscribeToCloseSideNavMenu(() => {
        closeSideMenus();
      });

    return () => {
      unsubscribeFromCloseRightSideMenu?.();
      unsubscribeFromSideNavItemClicked?.();
    };
  }, [closeSideMenus, uiShellContext]);

  const toggleLeftSideMenu = useCallback(() => {
    setIsRightSideMenuOpen(false);
    setIsLeftSideMenuOpen((isLeftSideMenuOpen) => !isLeftSideMenuOpen);
  }, []);

  const toggleRightSideMenu = useCallback(() => {
    setIsLeftSideMenuOpen(false);
    setIsRightSideMenuOpen((isRightSideMenuOpen) => !isRightSideMenuOpen);
  }, []);

  const { parentContainerRef } = useMatchAppElementToUiShellAppArea({
    appElement,
    appElementScrollingMode,
    paddingMode: hasStandardAppContentPadding ? "compact" : "none",
    uiShellAppAreaRef,
    uiShellResizableRefs: [
      sideNavContainerRef,
      topNavContainerRef,
      uiShellAppAreaRef,
    ],
  });

  return (
    <>
      {(isLeftSideMenuOpen || isRightSideMenuOpen) && (
        <StyledPageOverlay
          odysseyDesignTokens={odysseyDesignTokens}
          onClick={closeSideMenus}
        />
      )}

      <StyledUiShellContainer
        odysseyDesignTokens={odysseyDesignTokens}
        ref={parentContainerRef}
      >
        <StyledBannersContainer>
          {optionalComponents?.banners}
        </StyledBannersContainer>

        {(initialVisibleSections?.includes("TopNav") || topNavProps) && (
          <ErrorBoundary fallback={null} onError={onError}>
            <StyledTopNav
              isContentScrolled={isContentScrolled}
              odysseyDesignTokens={odysseyDesignTokens}
              topNavBackgroundColor={uiShellContext?.topNavBackgroundColor}
            >
              <StyledTopNavMenu
                odysseyDesignTokens={odysseyDesignTokens}
                topNavBackgroundColor={uiShellContext?.sideNavBackgroundColor}
              >
                <StyledMenuLogo odysseyDesignTokens={odysseyDesignTokens}>
                  {(sideNavProps?.isCollapsible ||
                    !sideNavProps?.isCollapsed) && (
                    <Button
                      onClick={toggleLeftSideMenu}
                      startIcon={<HamburgerMenuIcon />}
                      variant="floating"
                    />
                  )}

                  <StyledLogoContainer
                    odysseyDesignTokens={odysseyDesignTokens}
                  >
                    {sideNavProps?.isLoading ? (
                      //  The skeleton takes the hardcoded dimensions of the Okta logo
                      <Skeleton variant="rounded" height={24} width={67} />
                    ) : (
                      <SideNavLogo {...sideNavProps?.logoProps} />
                    )}
                  </StyledLogoContainer>
                </StyledMenuLogo>

                {optionalComponents?.rightSideMenu && (
                  <Button
                    onClick={toggleRightSideMenu}
                    startIcon={
                      isRightSideMenuOpen ? <CloseIcon /> : <MoreIcon />
                    }
                    variant="floating"
                  />
                )}
              </StyledTopNavMenu>

              {optionalComponents?.topNavLeftSide && (
                <StyledTopNavSearch odysseyDesignTokens={odysseyDesignTokens}>
                  {optionalComponents?.topNavLeftSide}
                </StyledTopNavSearch>
              )}
            </StyledTopNav>
          </ErrorBoundary>
        )}

        <StyledAppContentArea>
          <StyledLeftSideContainer isOpen={isLeftSideMenuOpen}>
            {
              /* If SideNav should be initially visible and we have not yet received props, render SideNav with minimal inputs */
              initialVisibleSections?.includes("SideNav") &&
                sideNavProps === undefined && (
                  <ErrorBoundary fallback={null} onError={onError}>
                    <SideNav isLoading sideNavItems={emptySideNavItems} />
                  </ErrorBoundary>
                )
            }

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
                    isObtrusive
                  />
                </StyledSideNavContainer>
              </ErrorBoundary>
            )}
          </StyledLeftSideContainer>

          <StyledRightSideContainer
            isOpen={isRightSideMenuOpen}
            odysseyDesignTokens={odysseyDesignTokens}
          >
            <StyledSideNavContainer>
              {optionalComponents?.rightSideMenu}
            </StyledSideNavContainer>
          </StyledRightSideContainer>

          <StyledAppContainer
            appBackgroundColor={uiShellContext?.appBackgroundColor}
            tabIndex={0}
            ref={uiShellAppAreaRef}
          />
        </StyledAppContentArea>
      </StyledUiShellContainer>
    </>
  );
};

const MemoizedNarrowUiShellContent = memo(NarrowUiShellContent);
MemoizedNarrowUiShellContent.displayName = "NarrowUiShellContent";

export { MemoizedNarrowUiShellContent as NarrowUiShellContent };
