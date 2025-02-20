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
import { ScopedCssBaseline } from "@mui/material";
import { memo, useRef } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { AppSwitcher } from "./AppSwitcher/index.js";
import {
  useOdysseyDesignTokens,
  type DesignTokens,
} from "../OdysseyDesignTokensContext.js";
import {
  UiShellNavComponentProps,
  UnifiedUiShellContentProps,
} from "./unifiedUiShellContentTypes.js";
import { SideNav, type SideNavProps } from "./SideNav/index.js";
import { TopNav } from "./TopNav/index.js";
import { useScrollState } from "./useScrollState.js";
import { useRepositionAppElementToContainerEffect } from "./useRepositionAppElementToContainerEffect.js";
import { UiShellColors, useUiShellContext } from "./UiShellProvider.js";

const fullHeightStyles = { height: "100%" };

const emptySideNavItems = [] satisfies SideNavProps["sideNavItems"];

const StyledAppContainer = styled("div", {
  shouldForwardProp: (prop) =>
    prop !== "appBackgroundColor" && prop !== "odysseyDesignTokens",
})<{
  appBackgroundColor?: UiShellColors["appBackgroundColor"];
}>(({ appBackgroundColor }) => ({
  gridArea: "app-content",
  backgroundColor: appBackgroundColor,
}));

const StyledBannersContainer = styled("div")({
  gridArea: "banners",
});

const StyledAppSwitcherContainer = styled("div")({
  gridArea: "app-switcher",
});

const StyledSideNavContainer = styled("div")({
  gridArea: "side-nav",
});

const StyledShellContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{
  odysseyDesignTokens: DesignTokens;
}>(({ odysseyDesignTokens }) => ({
  backgroundColor: odysseyDesignTokens.HueNeutral50,
  display: "grid",
  gridGap: 0,
  gridTemplateAreas: `
    "banners banners banners"
    "app-switcher side-nav top-nav"
    "app-switcher side-nav app-content"
  `,
  gridTemplateColumns: "auto auto 1fr",
  gridTemplateRows: "auto auto 1fr",
  height: "100vh",
  width: "100vw",
}));

const StyledTopNavContainer = styled("div")({
  gridArea: "top-nav",
});

export type WideUiShellContentProps = UiShellNavComponentProps &
  UnifiedUiShellContentProps;

/**
 * Our new Unified Platform UI Shell.
 *
 * This includes the top and side navigation as well as the footer and provides a spot for your app to render into.
 *
 * If an error occurs, this will revert to only showing the app.
 */
const WideUiShellContent = ({
  appContainerElement,
  hasStandardAppContentPadding = true,
  appContainerScrollingMode,
  initialVisibleSections = ["TopNav", "SideNav", "AppSwitcher"],
  onError = console.error,
  optionalComponents,
  appSwitcherProps,
  sideNavProps,
  topNavProps,
}: WideUiShellContentProps) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();
  const { isContentScrolled, scrollableContentRef: appContainerRef } =
    useScrollState(appContainerElement);
  const sideNavContainerRef = useRef<HTMLDivElement>(null);
  const topNavContainerRef = useRef<HTMLDivElement>(null);
  const uiShellContext = useUiShellContext();

  useRepositionAppElementToContainerEffect({
    appContainerElement,
    appContainerRef,
    appContainerScrollingMode,
    hasStandardAppContentPadding,
    odysseyDesignTokens,
    resizingRefs: [sideNavContainerRef, topNavContainerRef],
  });

  return (
    <StyledShellContainer odysseyDesignTokens={odysseyDesignTokens}>
      <StyledBannersContainer>
        {optionalComponents?.banners}
      </StyledBannersContainer>

      <StyledAppSwitcherContainer>
        <ScopedCssBaseline sx={fullHeightStyles}>
          {
            /* If AppSwitcher should be initially visible and we have not yet received props, render AppSwitcher in the loading state */
            initialVisibleSections?.includes("AppSwitcher") &&
              !appSwitcherProps && (
                <ErrorBoundary fallback={null} onError={onError}>
                  <AppSwitcher isLoading appIcons={[]} selectedAppName="" />
                </ErrorBoundary>
              )
          }

          {appSwitcherProps && (
            <ErrorBoundary fallback={null} onError={onError}>
              <AppSwitcher {...appSwitcherProps} />
            </ErrorBoundary>
          )}
        </ScopedCssBaseline>
      </StyledAppSwitcherContainer>

      <StyledSideNavContainer ref={sideNavContainerRef}>
        <ScopedCssBaseline sx={fullHeightStyles}>
          {
            /* If SideNav should be initially visible and we have not yet received props, render SideNav with minimal inputs */
            initialVisibleSections?.includes("SideNav") &&
              sideNavProps === undefined && (
                <ErrorBoundary fallback={null} onError={onError}>
                  <SideNav
                    isLoading
                    appName=""
                    sideNavItems={emptySideNavItems}
                  />
                </ErrorBoundary>
              )
          }
          {sideNavProps && (
            <ErrorBoundary fallback={null} onError={onError}>
              <SideNav
                {...{
                  ...sideNavProps,
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
              />
            </ErrorBoundary>
          )}
        </ScopedCssBaseline>
      </StyledSideNavContainer>

      <StyledTopNavContainer ref={topNavContainerRef}>
        <ScopedCssBaseline sx={fullHeightStyles}>
          {
            /* If TopNav should be initially visible and we have not yet received props, render Topnav with minimal inputs */
            initialVisibleSections?.includes("TopNav") &&
              topNavProps === undefined && (
                <ErrorBoundary fallback={null} onError={onError}>
                  <TopNav
                    leftSideComponent={optionalComponents?.topNavLeftSide}
                    rightSideComponent={optionalComponents?.topNavRightSide}
                  />
                </ErrorBoundary>
              )
          }

          {topNavProps && (
            <ErrorBoundary fallback={null} onError={onError}>
              <TopNav
                {...topNavProps}
                isScrolled={isContentScrolled}
                leftSideComponent={optionalComponents?.topNavLeftSide}
                rightSideComponent={optionalComponents?.topNavRightSide}
              />
            </ErrorBoundary>
          )}
        </ScopedCssBaseline>
      </StyledTopNavContainer>

      <StyledAppContainer
        appBackgroundColor={uiShellContext?.appBackgroundColor}
        tabIndex={0}
        ref={appContainerRef}
      />
    </StyledShellContainer>
  );
};

const MemoizedWideUiShellContent = memo(WideUiShellContent);
MemoizedWideUiShellContent.displayName = "WideUiShellContent";

export { MemoizedWideUiShellContent as WideUiShellContent };
