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

import {
  memo,
  ReactNode,
  useEffect,
  useState,
  type SetStateAction,
} from "react";
import { ErrorBoundary } from "react-error-boundary";

import { type ReactRootElements } from "../web-component/createReactRootElements.js";
import { CssBaseline } from "../CssBaseline.js";
import { NarrowUiShellContent } from "./NarrowUiShellContent.js";
import { OdysseyProvider, OdysseyProviderProps } from "../OdysseyProvider.js";
import { UiShellProvider } from "./UiShellProvider.js";
import {
  UiShellNavComponentProps,
  UiShellContentProps,
} from "./uiShellContentTypes.js";
import { useUiShellBreakpoints } from "./useUiShellBreakpoints.js";
import { ContrastMode } from "../useContrastMode.js";
import { WideUiShellContent } from "./WideUiShellContent.js";

export const defaultComponentProps: UiShellNavComponentProps = {
  sideNavProps: undefined,
  topNavProps: undefined,
} as const;

export type UiShellProps = {
  /**
   * Sets a custom background color for the app content area.
   */
  appBackgroundColor?: string;
  /**
   * Sets either a gray or white background color for the app content area.
   */
  appBackgroundContrastMode?: ContrastMode;
  /**
   * React app component that renders as children in the correct location of the shell. Only used as fallback for ErrorBoundary.
   */
  appComponent?: ReactNode;
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
  subscribeToPropChanges: (
    subscriber: (
      componentProps: SetStateAction<UiShellNavComponentProps>,
    ) => void,
  ) => () => void;
  /**
   * Sets a custom background color for the side nav area.
   */
  sideNavBackgroundColor?: string;
  /**
   * Sets a custom background color for the top nav area.
   */
  topNavBackgroundColor?: string;
} & Pick<ReactRootElements, "appRootElement" | "stylesRootElement"> &
  Pick<
    UiShellContentProps,
    | "appContainerElement"
    | "appContainerScrollingMode"
    | "hasStandardAppContentPadding"
    | "initialVisibleSections"
    | "onError"
    | "optionalComponents"
  > &
  Pick<OdysseyProviderProps, "height">;

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
  appComponent,
  appContainerElement,
  appContainerScrollingMode,
  appRootElement,
  hasStandardAppContentPadding,
  height,
  initialVisibleSections,
  onError = console.error,
  onSubscriptionCreated,
  optionalComponents,
  sideNavBackgroundColor,
  stylesRootElement,
  topNavBackgroundColor,
  subscribeToPropChanges,
}: UiShellProps) => {
  const [componentProps, setComponentProps] = useState(defaultComponentProps);

  const activeBreakpoint = useUiShellBreakpoints();

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
    <ErrorBoundary fallback={appComponent} onError={onError}>
      <OdysseyProvider
        emotionRootElement={stylesRootElement}
        height={height}
        shadowRootElement={appRootElement}
      >
        <ErrorBoundary fallback={appComponent} onError={onError}>
          <CssBaseline />

          <UiShellProvider
            appBackgroundColor={appBackgroundColor}
            appBackgroundContrastMode={appBackgroundContrastMode}
            sideNavBackgroundColor={sideNavBackgroundColor}
            topNavBackgroundColor={topNavBackgroundColor}
          >
            {activeBreakpoint === "constrained" && (
              <NarrowUiShellContent
                {...componentProps}
                appContainerElement={appContainerElement}
                appContainerScrollingMode={appContainerScrollingMode}
                hasStandardAppContentPadding={hasStandardAppContentPadding}
                initialVisibleSections={initialVisibleSections}
                onError={onError}
                optionalComponents={optionalComponents}
              />
            )}

            {(activeBreakpoint === "compact" ||
              activeBreakpoint === "comfortable") && (
              <WideUiShellContent
                {...{
                  ...componentProps,
                  ...(componentProps.sideNavProps
                    ? {
                        sideNavProps: {
                          ...componentProps.sideNavProps,
                          isCollapsed:
                            activeBreakpoint === "compact" ||
                            componentProps.sideNavProps?.isCollapsed,
                          isCollapsible:
                            activeBreakpoint === "compact" ||
                            componentProps.sideNavProps?.isCollapsible,
                          // We have to use `as` because sideNavProps expects you to have `sideNavItems` defined even though it had to be passed in `...componentProps.sideNavProps`.
                        } as typeof componentProps.sideNavProps,
                      }
                    : {}),
                }}
                appContainerElement={appContainerElement}
                appContainerScrollingMode={appContainerScrollingMode}
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
