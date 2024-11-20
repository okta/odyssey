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

import { SideNav, type SideNavProps } from "../SideNav";
import { TopNav, type TopNavProps } from "../TopNav";
import {
  useOdysseyDesignTokens,
  type DesignTokens,
} from "../../OdysseyDesignTokensContext";
import { useScrollState } from "./useScrollState";

const emptySideNavItems = [] satisfies SideNavProps["sideNavItems"];

const StyledAppContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{
  odysseyDesignTokens: DesignTokens;
}>(({ odysseyDesignTokens }) => ({
  gridArea: "app-content",
  overflowX: "hidden",
  overflowY: "auto",
  paddingBlock: odysseyDesignTokens.Spacing5,
  paddingInline: odysseyDesignTokens.Spacing8,
}));

const StyledBannersContainer = styled("div")(() => ({
  gridArea: "banners",
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
    "banners banners"
    "side-nav top-nav"
    "side-nav app-content"
  `,
  gridTemplateColumns: "auto 1fr",
  gridTemplateRows: "auto auto 1fr",
  height: "100vh",
  width: "100vw",
}));

const StyledTopNavContainer = styled("div")(() => ({
  gridArea: "top-nav",
}));

const subComponentNames = ["TopNav", "SideNav", "AppSwitcher"] as const;
type SubComponentName = (typeof subComponentNames)[number];

export type UiShellNavComponentProps = {
  /**
   * Object that gets pass directly to the side nav component.
   */
  sideNavProps?: Omit<SideNavProps, "footerComponent">;
  /**
   * Object that gets pass directly to the top nav component.
   */
  topNavProps?: Omit<TopNavProps, "leftSideComponent" | "rightSideComponent">;
};

export type UiShellContentProps = {
  /**
   * React app component that renders as children in the correct location of the shell.
   */
  appComponent: ReactNode;
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
  initialVisibleSections = ["TopNav", "SideNav", "AppSwitcher"],
  onError = console.error,
  optionalComponents,
  sideNavProps,
  topNavProps,
}: UiShellContentProps) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();
  const { isContentScrolled, scrollableContentRef } = useScrollState();

  return (
    <StyledShellContainer odysseyDesignTokens={odysseyDesignTokens}>
      <StyledBannersContainer>
        {optionalComponents?.banners}
      </StyledBannersContainer>

      <StyledSideNavContainer>
        {
          /* If SideNav should be initially visible and we have not yet received props, render SideNav with minimal inputs */
          initialVisibleSections?.includes("SideNav") && !sideNavProps && (
            <ErrorBoundary fallback={null} onError={onError}>
              <SideNav isLoading appName="" sideNavItems={emptySideNavItems} />
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
          initialVisibleSections?.includes("TopNav") && !topNavProps && (
            <ErrorBoundary fallback={null} onError={onError}>
              <TopNav />
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
        odysseyDesignTokens={odysseyDesignTokens}
        tabIndex={0}
        ref={scrollableContentRef}
      >
        {appComponent}
      </StyledAppContainer>
    </StyledShellContainer>
  );
};

const MemoizedUiShellContent = memo(UiShellContent);
MemoizedUiShellContent.displayName = "UiShellContent";

export { MemoizedUiShellContent as UiShellContent };
