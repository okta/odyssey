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

import { memo, useEffect, useState, type SetStateAction } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { type ReactRootElements } from "../web-component/createReactRootElements.js";
import { CssBaseline } from "../CssBaseline.js";
import { NarrowUiShellContent } from "./NarrowUiShellContent.js";
import { OdysseyProvider } from "../OdysseyProvider.js";
import { UiShellProvider, UiShellProviderProps } from "./UiShellProvider.js";
import {
  UiShellNavComponentProps,
  UiShellContentProps,
} from "./uiShellContentTypes.js";
import {
  UiShellBreakpointConfig,
  useUiShellBreakpoints,
} from "./useUiShellBreakpoints.js";
import { WideUiShellContent } from "./WideUiShellContent.js";
import { MessageBus } from "./createMessageBus.js";

export const defaultComponentProps: UiShellNavComponentProps = {
  sideNavProps: undefined,
  topNavProps: undefined,
} as const;

const errorComponent = <div data-error />;

export type UiShellProps = {
  /**
   * Customized breakpoints for UI Shell.
   *
   * The defaults are set for you. Pass these only if your app doesn't work properly with the defaults (like Admin).
   */
  breakpointConfig?: UiShellBreakpointConfig;
  /**
   * Notifies when subscribed to prop changes.
   *
   * UI Shell listens to prop updates, and it won't subscribe synchronously. Because of that, this callback notifies when that subscription is ready.
   */
  onSubscriptionCreated: () => void;
  /**
   * This is a callback that provides a subscriber callback to listen for changes to state.
   * It allows UI Shell to listen for state changes.
   *
   * The props coming in this callback go directly to a React state; therefore, it shares the same signature and provides a previous state.
   */
  subscribeToPropChanges: MessageBus<
    SetStateAction<UiShellNavComponentProps>
  >["subscribe"];
  /**
   * Element inside UI Shell's React root component renders into. If using a web component, this is going to exist inside it.
   */
  uiShellAppElement: ReactRootElements["appRootElement"];
  /**
   * Typically, this is your `<head>` element. If using a web component, you need to create one yourself as Shadow DOM's don't have a `<head>`.
   */
  uiShellStylesElement: ReactRootElements["stylesRootElement"];
} & UiShellProviderProps &
  Pick<
    UiShellContentProps,
    | "appElement"
    | "appElementScrollingMode"
    | "hasStandardAppContentPadding"
    | "initialVisibleSections"
    | "onError"
    | "optionalComponents"
  >;

/**
 * Our new Unified Platform UI Shell.
 *
 * This includes the top and side navigation as well as the footer and provides a spot for your app to render into.
 *
 * If an error occurs, this will revert to only showing the app.
 */
const UiShell = ({
  appBackgroundColor,
  appBackgroundContrastMode,
  appElement,
  appElementScrollingMode,
  breakpointConfig,
  closeSideNavMenu,
  hasStandardAppContentPadding,
  initialVisibleSections,
  onError = console.error,
  onSubscriptionCreated,
  optionalComponents,
  sideNavBackgroundColor,
  subscribeToCloseRightSideMenu,
  subscribeToCloseSideNavMenu,
  subscribeToPropChanges,
  topNavBackgroundColor,
  uiShellAppElement,
  uiShellStylesElement,
}: UiShellProps) => {
  const [componentProps, setComponentProps] = useState(defaultComponentProps);

  const activeBreakpoint = useUiShellBreakpoints(breakpointConfig);

  useEffect(() => {
    const unsubscribe = subscribeToPropChanges((componentProps) => {
      // If for some reason nothing is passed as `componentProps`, we fallback on `defaultComponentProps` as a safety mechanism to ensure nothing breaks.
      setComponentProps(componentProps || defaultComponentProps);
    });

    onSubscriptionCreated();

    return () => {
      unsubscribe();
    };
  }, [onSubscriptionCreated, subscribeToPropChanges]);

  return activeBreakpoint === "none" ? null : (
    <ErrorBoundary fallback={errorComponent} onError={onError}>
      <OdysseyProvider
        emotionRootElement={uiShellStylesElement}
        shadowRootElement={uiShellAppElement}
      >
        <ErrorBoundary fallback={errorComponent} onError={onError}>
          <CssBaseline />

          <UiShellProvider
            appBackgroundColor={appBackgroundColor}
            appBackgroundContrastMode={appBackgroundContrastMode}
            closeSideNavMenu={closeSideNavMenu}
            sideNavBackgroundColor={sideNavBackgroundColor}
            subscribeToCloseRightSideMenu={subscribeToCloseRightSideMenu}
            subscribeToCloseSideNavMenu={subscribeToCloseSideNavMenu}
            topNavBackgroundColor={topNavBackgroundColor}
          >
            {activeBreakpoint === "narrow" && (
              <NarrowUiShellContent
                {...componentProps}
                appElement={appElement}
                appElementScrollingMode={appElementScrollingMode}
                hasStandardAppContentPadding={hasStandardAppContentPadding}
                initialVisibleSections={initialVisibleSections}
                onError={onError}
                optionalComponents={optionalComponents}
              />
            )}

            {(activeBreakpoint === "medium" || activeBreakpoint === "wide") && (
              <WideUiShellContent
                {...{
                  ...componentProps,
                  ...{
                    sideNavProps: {
                      sideNavItems: [],
                      ...componentProps.sideNavProps,
                      hasSessionStorageState: activeBreakpoint === "wide",
                      isCollapsed:
                        activeBreakpoint === "medium" ||
                        componentProps.sideNavProps?.isCollapsed,
                      isCollapsible:
                        activeBreakpoint === "medium" ||
                        componentProps.sideNavProps?.isCollapsible,
                      // We have to use `as` because sideNavProps expects you to have `sideNavItems` defined even though it had to be passed in `...componentProps.sideNavProps`.
                    } as typeof componentProps.sideNavProps,
                  },
                }}
                appElement={appElement}
                appElementScrollingMode={appElementScrollingMode}
                hasStandardAppContentPadding={hasStandardAppContentPadding}
                initialVisibleSections={initialVisibleSections}
                onError={onError}
                optionalComponents={optionalComponents}
              />
            )}
          </UiShellProvider>
        </ErrorBoundary>
      </OdysseyProvider>
    </ErrorBoundary>
  );
};

const MemoizedUiShell = memo(UiShell);
MemoizedUiShell.displayName = "UiShell";

export { MemoizedUiShell as UiShell };
