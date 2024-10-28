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
import { memo, type ReactNode } from "react";
import { ErrorBoundary, ErrorBoundaryProps } from "react-error-boundary";

import { SideNav, type SideNavProps } from "../SideNav";
import { TopNav, type TopNavProps } from "../TopNav";
import {
  useOdysseyDesignTokens,
  type DesignTokens,
} from "../../OdysseyDesignTokensContext";

const AppContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{
  odysseyDesignTokens: DesignTokens;
}>(({ odysseyDesignTokens }) => ({
  overflowX: "hidden",
  overflowY: "scroll",
  paddingBlockEnd: odysseyDesignTokens.Spacing4,
  paddingBlockStart: odysseyDesignTokens.Spacing4,
  paddingInlineEnd: odysseyDesignTokens.Spacing4,
  paddingInlineStart: odysseyDesignTokens.Spacing4,
}));

const FlexibleContentContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{
  odysseyDesignTokens: DesignTokens;
}>(({ odysseyDesignTokens }) => ({
  backgroundColor: odysseyDesignTokens.HueNeutral50,
  display: "flex",
  flexBasis: "100%",
  flexDirection: "column",
  flexGrow: 1,
}));

const RigidContentContainer = styled("div")(() => ({
  flexShrink: 0,
  height: "100%",
}));

const ShellContainer = styled("div")(() => ({
  display: "flex",
  flexWrap: "nowrap",
  height: "100vh",
  width: "100vw",
}));

export type UiShellContentProps = {
  /**
   * React app component that renders as children in the correct location of the shell.
   */
  appComponent: ReactNode;
  /**
   * Notifies when a React rendering error occurs. This could be useful for logging, flagging "p0"s, and recovering UI Shell when errors occur.
   */
  onError?: ErrorBoundaryProps["onError"];
  /**
   * Components that will render as children of various other components such as the top nav or side nav.
   */
  optionalComponents?: {
    additionalTopNavItems?: TopNavProps["AdditionalNavItemComponent"];
    footer?: SideNavProps["footerComponent"];
    logo?: SideNavProps["logo"];
    searchField?: TopNavProps["SearchFieldComponent"];
  };
  /**
   * Object that gets pass directly to the side nav component.
   */
  sideNavProps?: SideNavProps;
  /**
   * Object that gets pass directly to the top nav component.
   */
  topNavProps: TopNavProps;
};

/**
 * Our new Unified Platform UI Shell.
 *
 * This includes the top and side navigation as well as the footer and provides a spot for your app to render into.
 *
 * If an error occurs, this will revert to only showing the app.
 */
const UiShellContent = ({
  appComponent,
  onError = console.error,
  optionalComponents,
  sideNavProps,
  topNavProps,
}: UiShellContentProps) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();

  return (
    <ShellContainer>
      <RigidContentContainer>
        {sideNavProps && (
          <ErrorBoundary fallback={null} onError={onError}>
            <SideNav
              {...("footerItems" in sideNavProps
                ? sideNavProps
                : {
                    ...sideNavProps,
                    footerComponent: optionalComponents?.footer,
                    footerItems: undefined,
                  })}
              logo={optionalComponents?.logo}
            />
          </ErrorBoundary>
        )}
      </RigidContentContainer>

      <FlexibleContentContainer odysseyDesignTokens={odysseyDesignTokens}>
        <ErrorBoundary fallback={null} onError={onError}>
          <TopNav
            {...topNavProps}
            AdditionalNavItemComponent={
              optionalComponents?.additionalTopNavItems
            }
            SearchFieldComponent={optionalComponents?.searchField}
          />
        </ErrorBoundary>

        <AppContainer odysseyDesignTokens={odysseyDesignTokens}>
          {appComponent}
        </AppContainer>
      </FlexibleContentContainer>
    </ShellContainer>
  );
};

const MemoizedUiShellContent = memo(UiShellContent);
MemoizedUiShellContent.displayName = "UiShellContent";

export { MemoizedUiShellContent as UiShellContent };
