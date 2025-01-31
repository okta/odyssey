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

import { CssBaseline } from "../CssBaseline.js";
import { OdysseyProvider } from "../OdysseyProvider.js";
import {
  UiShellContent,
  type UiShellContentProps,
  type UiShellNavComponentProps,
} from "./UiShellContent.js";
import { type ReactRootElements } from "../web-component/renderReactInWebComponent.js";
import { UiShellProvider } from "./UiShellProvider.js";

export const defaultComponentProps: UiShellNavComponentProps = {
  sideNavProps: undefined,
  topNavProps: undefined,
} as const;

export type UiShellProps = {
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
  /**
   * React app component that renders as children in the correct location of the shell. Only used as fallback for ErrorBoundary.
   */
  appComponent?: ReactNode;
} & Pick<ReactRootElements, "appRootElement" | "stylesRootElement"> &
  Pick<
    UiShellContentProps,
    | "appBackgroundColor"
    | "appBackgroundContrastMode"
    | "appContainerElement"
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
  appComponent,
  appRootElement,
  appContainerElement,
  hasStandardAppContentPadding,
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
        emotionRootElement={stylesRootElement}
        shadowRootElement={appRootElement}
        hasScopedCssBaseline={false}
      >
        <ErrorBoundary fallback={appComponent} onError={onError}>
          <CssBaseline />
          <UiShellProvider
            appBackgroundColor={appBackgroundColor}
            appBackgroundContrastMode={appBackgroundContrastMode}
            sideNavBackgroundColor={sideNavBackgroundColor}
            topNavBackgroundColor={topNavBackgroundColor}
          >
            <UiShellContent
              {...componentProps}
              appContainerElement={appContainerElement}
              hasStandardAppContentPadding={hasStandardAppContentPadding}
              initialVisibleSections={initialVisibleSections}
              onError={onError}
              optionalComponents={optionalComponents}
            />
          </UiShellProvider>
        </ErrorBoundary>
      </OdysseyProvider>
    </ErrorBoundary>
  );
};

const MemoizedUiShell = memo(UiShell);
MemoizedUiShell.displayName = "UiShell";

export { MemoizedUiShell as UiShell };
