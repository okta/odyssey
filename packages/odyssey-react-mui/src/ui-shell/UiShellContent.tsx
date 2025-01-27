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
import { memo, type ReactElement, type ReactNode } from "react";
import { ErrorBoundary, ErrorBoundaryProps } from "react-error-boundary";

import { AppSwitcher, type AppSwitcherProps } from "./AppSwitcher/index.js";
import { SideNav, type SideNavProps } from "./SideNav/index.js";
import { TopNav, type TopNavProps } from "./TopNav/index.js";
import {
  useOdysseyDesignTokens,
  type DesignTokens,
} from "../OdysseyDesignTokensContext.js";
import { useScrollState } from "./useScrollState.js";
import { ContrastMode } from "../useContrastMode.js";
import { UiShellColors, useUiShellContext } from "./UiShellProvider.js";

const emptySideNavItems = [] satisfies SideNavProps["sideNavItems"];

const StyledAppContainer = styled("div", {
  shouldForwardProp: (prop) =>
    prop !== "odysseyDesignTokens" &&
    prop !== "appBackgroundColor" &&
    prop !== "hasStandardAppContentPadding" &&
    prop !== "scrollableContentElement",
})<{
  appBackgroundColor?: UiShellColors["appBackgroundColor"];
  hasStandardAppContentPadding: UiShellContentProps["hasStandardAppContentPadding"];
  odysseyDesignTokens: DesignTokens;
  scrollableContentElement?: HTMLDivElement;
}>(
  ({
    appBackgroundColor,
    hasStandardAppContentPadding,
    odysseyDesignTokens,
    scrollableContentElement,
  }) => ({
    gridArea: "app-content",
    backgroundColor: appBackgroundColor,
    ...(scrollableContentElement
      ? {
          width: "100%",
          height: "100%",
          overflow: "hidden",
        }
      : {
          overflowX: "hidden",
          overflowY: "auto",
        }),
    ...(hasStandardAppContentPadding && {
      paddingBlock: odysseyDesignTokens.Spacing5,
      paddingInline: odysseyDesignTokens.Spacing8,
    }),
  }),
);

const StyledBannersContainer = styled("div")(() => ({
  gridArea: "banners",
}));

const StyledAppSwitcherContainer = styled("div")(() => ({
  gridArea: "app-switcher",
}));

const StyledSideNavContainer = styled("div")(() => ({
  gridArea: "side-nav",
}));

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

const StyledTopNavContainer = styled("div")(() => ({
  gridArea: "top-nav",
}));

export const subComponentNames = ["TopNav", "SideNav", "AppSwitcher"] as const;
export type SubComponentName = (typeof subComponentNames)[number];

export type UiShellNavComponentProps = {
  /**
   * Object that gets pass directly to the app switcher component.
   */
  appSwitcherProps?: AppSwitcherProps;
  /**
   * Object that gets pass directly to the side nav component. If `undefined` and in `initialVisibleSections`, SideNav will be initially rendered. Pass `null` to hide a previously-visible SideNav.
   */
  sideNavProps?: Omit<SideNavProps, "footerComponent"> | null;
  /**
   * Object that gets pass directly to the top nav component. If `undefined` and in `initialVisibleSections`, TopNav will be initially rendered. Pass `null` to hide a previously-visible TopNav.
   */
  topNavProps?: Omit<
    TopNavProps,
    "leftSideComponent" | "rightSideComponent"
  > | null;
  /**
   * If the consumer has an element that should be the scroll container for the content area, they should pass it here.
   * They will set e.g. height: 100%; overflow-y: scroll; or whatnot on their own. We use this element to monitor scroll
   * state and apply the bottom border to TopNav
   */
  scrollableContentElement?: HTMLDivElement;
};

export type UiShellContentProps = {
  /**
   * Sets a custom background color for the app content area.
   */
  appBackgroundColor?: string;
  /**
   * Sets either a gray or white background color for the app content area.
   */
  appBackgroundContrastMode?: ContrastMode;
  /**
   * React app component that renders as children in the correct location of the shell.
   */
  appComponent: ReactNode;
  /**
   * defaults to `true`. If `false`, the content area will have no padding provided
   */
  hasStandardAppContentPadding?: boolean;
  /**
   * Which parts of the UI Shell should be visible initially? For example,
   * if sideNavProps is undefined, should the space for the sidenav be initially visible?
   */
  initialVisibleSections?: SubComponentName[];
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
    topNavRightSideMobileMenu?: TopNavProps["mobileMenuContentComponent"];
  };
} & UiShellNavComponentProps;

/**
 * Our new Unified Platform UI Shell.
 *
 * This includes the top and side navigation as well as the footer and provides a spot for your app to render into.
 *
 * If an error occurs, this will revert to only showing the app.
 */
const UiShellContent = ({
  appComponent,
  hasStandardAppContentPadding = true,
  initialVisibleSections = ["TopNav", "SideNav", "AppSwitcher"],
  onError = console.error,
  optionalComponents,
  appSwitcherProps,
  sideNavProps,
  topNavProps,
  scrollableContentElement,
}: UiShellContentProps) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();
  const { isContentScrolled, scrollableContentRef } = useScrollState(
    scrollableContentElement,
  );
  const uiShellContext = useUiShellContext();

  return (
    <StyledShellContainer odysseyDesignTokens={odysseyDesignTokens}>
      <StyledBannersContainer>
        {optionalComponents?.banners}
      </StyledBannersContainer>

      <StyledAppSwitcherContainer>
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
      </StyledAppSwitcherContainer>

      <StyledSideNavContainer>
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
      </StyledSideNavContainer>
      <StyledTopNavContainer>
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
      </StyledTopNavContainer>

      <StyledAppContainer
        appBackgroundColor={uiShellContext?.appBackgroundColor}
        hasStandardAppContentPadding={hasStandardAppContentPadding}
        odysseyDesignTokens={odysseyDesignTokens}
        tabIndex={0}
        {...(!scrollableContentElement
          ? { ref: scrollableContentRef }
          : { scrollableContentElement })}
      >
        {appComponent}
      </StyledAppContainer>
    </StyledShellContainer>
  );
};

const MemoizedUiShellContent = memo(UiShellContent);
MemoizedUiShellContent.displayName = "UiShellContent";

export { MemoizedUiShellContent as UiShellContent };
