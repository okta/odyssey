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
  useEffect,
  useState,
  type ReactNode,
  type SetStateAction,
} from "react";
import { ErrorBoundary, ErrorBoundaryProps } from "react-error-boundary";

import { SideNav, type SideNavProps } from "../labs/SideNav";
import { TopNav, type TopNavProps } from "../labs/TopNav";
import { OdysseyProvider } from "../OdysseyProvider";
import { ShadowDomElements } from "../web-component/shadow-dom";

const appContainerStyles = {
  flexGrow: "1",
};

const uiShellContainerStyles = {
  display: "flex",
};

export type UiShellComponentProps = {
  sideNavProps?: Omit<SideNavProps, "logo" | "footerComponent">;
  topNavProps: Omit<
    TopNavProps,
    "AdditionalNavItemComponent" | "SearchFieldComponent"
  >;
};

export const defaultComponentProps: UiShellComponentProps = {
  topNavProps: {
    topNavLinkItems: [],
  },
} as const;

export type UiShellProps = {
  /**
   * React app component that renders as children in the correct location of the shell.
   */
  appComponent: ReactNode;
  /**
   * Notifies when a React rendering error occurs. This could be useful for logging, flagging "p0"s, and recovering UI Shell when errors occur.
   */
  onError?: ErrorBoundaryProps["onError"];
  /**
   * Notifies when subscribed to prop changes.
   *
   * UI Shell listens to prop updates, and it won't subscribe synchronously. Because of that, this callback notifies when that subscription is ready.
   */
  onSubscriptionCreated: () => void;
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
   * This is a callback that provides a subscriber callback to listen for changes to state.
   * It allows UI Shell to listen for state changes.
   *
   * The props coming in this callback go directly to a React state; therefore, it shares the same signature and provides a previous state.
   */
  subscribeToPropChanges: (
    subscriber: (componentProps: SetStateAction<UiShellComponentProps>) => void,
  ) => () => void;
} & ShadowDomElements;

/**
 * Our new Unified Platform UI Shell.
 *
 * This includes the top and side navigation as well as the footer and provides a spot for your app to render into.
 *
 * If an error occurs, this will revert to only showing the app.
 */
const UiShell = ({
  appComponent,
  appRootElement,
  emotionRootElement,
  onError = console.error,
  onSubscriptionCreated,
  optionalComponents,
  subscribeToPropChanges,
}: UiShellProps) => {
  const [componentProps, setComponentProps] = useState(defaultComponentProps);

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

  return (
    <ErrorBoundary fallback={appComponent} onError={onError}>
      <OdysseyProvider
        emotionRootElement={emotionRootElement}
        shadowRootElement={appRootElement}
      >
        <div style={uiShellContainerStyles}>
          {componentProps.sideNavProps && (
            <ErrorBoundary fallback={null} onError={onError}>
              <SideNav
                {...("footerItems" in componentProps.sideNavProps
                  ? componentProps.sideNavProps
                  : {
                      ...componentProps.sideNavProps,
                      footerComponent: optionalComponents?.footer,
                      footerItems: undefined,
                    })}
                logo={optionalComponents?.logo}
              />
            </ErrorBoundary>
          )}

          <div style={appContainerStyles}>
            <ErrorBoundary fallback={null} onError={onError}>
              <TopNav
                {...componentProps.topNavProps}
                AdditionalNavItemComponent={
                  optionalComponents?.additionalTopNavItems
                }
                SearchFieldComponent={optionalComponents?.searchField}
              />
            </ErrorBoundary>

            {appComponent}
          </div>
        </div>
      </OdysseyProvider>
    </ErrorBoundary>
  );
};

const MemoizedUiShell = memo(UiShell);
MemoizedUiShell.displayName = "UiShell";

export { MemoizedUiShell as UiShell };
