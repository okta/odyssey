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
import {
  CSSProperties,
  memo,
  useEffect,
  useMemo,
  useRef,
  type ReactElement,
} from "react";
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
import { ScopedCssBaseline } from "@mui/material";

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
   * When passed, the app is expected to render into this element, not the Shadow DOM. UI Shell will position this element appropriately as if it was rendered in the app content area of the Shadow DOM.
   */
  appContainerElement: HTMLDivElement;
  /**
   * Controls the scrolling behavior of the app content area. Defaults to "vertical".
   */
  appContainerScrollingMode?: "none" | "horizontal" | "vertical" | "both";
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
  };
} & UiShellNavComponentProps;

export const convertCamelCaseToKebabCase = (string: string) =>
  string.replace(/([A-Z])/g, "-$1").toLowerCase();

export const setStylesToMatchElement = ({
  additionalStyles,
  appContainerElement,
  appContentReferenceElement,
}: {
  additionalStyles: CSSProperties;
  appContainerElement: HTMLElement;
  appContentReferenceElement: HTMLElement;
}) => {
  const boundingRect = appContentReferenceElement.getBoundingClientRect();

  appContainerElement.style.setProperty("position", "absolute");
  appContainerElement.style.setProperty("top", `${boundingRect.y}px`);
  appContainerElement.style.setProperty("left", `${boundingRect.x}px`);
  appContainerElement.style.setProperty("width", `${boundingRect.width}px`);
  appContainerElement.style.setProperty("height", `${boundingRect.height}px`);

  (
    Object.entries(additionalStyles) as Array<
      [
        keyof typeof additionalStyles,
        (typeof additionalStyles)[keyof typeof additionalStyles],
      ]
    >
  ).forEach(([cssPropertyName, cssPropertyValue]) => {
    appContainerElement.style.setProperty(
      convertCamelCaseToKebabCase(cssPropertyName),
      String(cssPropertyValue),
    );
  });
};

/**
 * Our new Unified Platform UI Shell.
 *
 * This includes the top and side navigation as well as the footer and provides a spot for your app to render into.
 *
 * If an error occurs, this will revert to only showing the app.
 */
const UiShellContent = ({
  appContainerElement,
  hasStandardAppContentPadding = true,
  appContainerScrollingMode = "vertical",
  initialVisibleSections = ["TopNav", "SideNav", "AppSwitcher"],
  onError = console.error,
  optionalComponents,
  appSwitcherProps,
  sideNavProps,
  topNavProps,
}: UiShellContentProps) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();
  const { isContentScrolled, scrollableContentRef: appContainerRef } =
    useScrollState(appContainerElement);
  const sideNavContainerRef = useRef<HTMLDivElement>(null);
  const topNavContainerRef = useRef<HTMLDivElement>(null);
  const uiShellContext = useUiShellContext();

  const appContainerElementStyles = useMemo<CSSProperties>(
    () => ({
      ...(hasStandardAppContentPadding
        ? {
            paddingBlock: odysseyDesignTokens.Spacing5 ?? null,
            paddingInline: odysseyDesignTokens.Spacing8 ?? null,
          }
        : {}),
      ...(appContainerScrollingMode === "horizontal" ||
      appContainerScrollingMode === "both"
        ? {
            overflowX: "auto",
          }
        : {
            overflowX: "hidden",
          }),
      ...(appContainerScrollingMode === "vertical" ||
      appContainerScrollingMode === "both"
        ? {
            overflowY: "auto",
          }
        : {
            overflowY: "hidden",
          }),
    }),
    [
      hasStandardAppContentPadding,
      appContainerScrollingMode,
      odysseyDesignTokens,
    ],
  );

  useEffect(() => {
    // Once appContainerRef is rendered, we can position appContainerElement on top
    if (appContainerRef.current && appContainerElement) {
      let animationFrameId: number;

      const updateStyles = () => {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = requestAnimationFrame(() => {
          if (appContainerRef.current) {
            setStylesToMatchElement({
              additionalStyles: appContainerElementStyles,
              appContentReferenceElement: appContainerRef.current,
              appContainerElement,
            });
          }
        });
      };

      // This element might have changed from `.current`, so it's important to keep track of the old one when we attach event listeners.
      const sideNavElement = sideNavContainerRef.current;

      sideNavElement?.addEventListener("transitionend", updateStyles);

      // Setup a mutation observer to sync later updates
      const observer = new ResizeObserver(updateStyles);
      observer.observe(appContainerRef.current);

      if (sideNavElement) {
        observer.observe(sideNavElement);
      }

      if (topNavContainerRef.current) {
        observer.observe(topNavContainerRef.current);
      }

      // Set the initial styles
      updateStyles();

      return () => {
        observer.disconnect();
        sideNavElement?.removeEventListener("transitionend", updateStyles);
      };
    }
    return () => {};
  }, [appContainerElement, appContainerElementStyles, appContainerRef]);

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

const MemoizedUiShellContent = memo(UiShellContent);
MemoizedUiShellContent.displayName = "UiShellContent";

export { MemoizedUiShellContent as UiShellContent };
