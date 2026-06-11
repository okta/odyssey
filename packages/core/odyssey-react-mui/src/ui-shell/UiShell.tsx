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

import { memo, type SetStateAction, useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";

import {
  type TranslationOverrides,
  type TranslationProviderProps,
} from "../i18n.generated/i18n.js";
import { OdysseyProvider } from "../OdysseyProvider.js";
import { MessageBus } from "../tools/createMessageBus.js";
import { type ReactRootElements } from "../web-component/createReactRootElements.js";
import { NarrowUiShellContent } from "./NarrowUiShellContent.js";
import {
  UiShellContentProps,
  UiShellNavComponentProps,
} from "./uiShellContentTypes.js";
import { UiShellProvider, UiShellProviderProps } from "./UiShellProvider.js";
import {
  UiShellBreakpointConfig,
  useUiShellBreakpoints,
} from "./useUiShellBreakpoints.js";
import { WideUiShellContent } from "./WideUiShellContent.js";

export const defaultComponentProps: UiShellNavComponentProps = {
  sideNavProps: undefined,
  topNavProps: undefined,
} as const;

/**
 * Runtime-updatable translation settings forwarded to UI Shell's internal `OdysseyProvider`.
 *
 * Consumers pass these as initial props to `renderUiShell({...})` and can update them later
 * by calling `setTranslationSettings(...)` on the returned object.
 */
export type UiShellTranslationSettings = Pick<
  TranslationProviderProps,
  "languageCode"
> & {
  translationOverrides?: TranslationOverrides;
};

const defaultTranslationSettings: UiShellTranslationSettings = {};

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
   * Subscriber for runtime-updatable translation settings (`languageCode`, `translationOverrides`).
   *
   * These are forwarded to the shell's internal `OdysseyProvider` so consumers can drive shell
   * localization from their own i18n source instead of the browser's `navigator.language`.
   *
   * Optional for backward compatibility — when omitted, the shell falls back to
   * `window.navigator.language` (its prior behavior).
   */
  subscribeToTranslationSettings?: MessageBus<
    SetStateAction<UiShellTranslationSettings>
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
  sideNavBackgroundContrastColor,
  subscribeToCloseRightSideMenu,
  subscribeToCloseSideNavMenu,
  subscribeToPropChanges,
  subscribeToTranslationSettings,
  topNavBackgroundColor,
  uiShellAppElement,
  uiShellStylesElement,
}: UiShellProps) => {
  const [componentProps, setComponentProps] = useState(defaultComponentProps);
  const [translationSettings, setTranslationSettings] =
    useState<UiShellTranslationSettings>(defaultTranslationSettings);

  const activeBreakpoint = useUiShellBreakpoints(breakpointConfig);

  if (componentProps.sideNavProps?.logoProps && componentProps.logoProps) {
    throw new Error(
      "Unified UI Shell: You passed both `logoProps` and `sideNavProps.logoProps` as component props. Please only use the top-level `logoProps` instead.",
    );
  }

  useEffect(() => {
    const unsubscribeFromPropChanges = subscribeToPropChanges(
      (componentProps) => {
        // If for some reason nothing is passed as `componentProps`, we fallback on `defaultComponentProps` as a safety mechanism to ensure nothing breaks.
        setComponentProps(componentProps || defaultComponentProps);
      },
    );

    // Both subscribers must be wired BEFORE `onSubscriptionCreated()` fires.
    // `renderUiShell` uses `bufferLatest` to queue the initial translation settings
    // until the React app subscribes; if we called `onSubscriptionCreated()` first,
    // the buffered emission would fire before this subscriber exists and be lost.
    const unsubscribeFromTranslationSettings = subscribeToTranslationSettings?.(
      (nextSettings) => {
        setTranslationSettings(nextSettings || defaultTranslationSettings);
      },
    );

    onSubscriptionCreated();

    return () => {
      unsubscribeFromPropChanges();
      unsubscribeFromTranslationSettings?.();
    };
  }, [
    onSubscriptionCreated,
    subscribeToPropChanges,
    subscribeToTranslationSettings,
  ]);

  return activeBreakpoint === "none" ? null : (
    <ErrorBoundary fallback={errorComponent} onError={onError}>
      <OdysseyProvider
        emotionRootElement={uiShellStylesElement}
        fullScreenOverlayId="odyssey-react-overlay-component-render-ui-shell"
        hasCssBaseline
        languageCode={translationSettings.languageCode}
        shadowRootElement={uiShellAppElement}
        translationOverrides={translationSettings.translationOverrides}
      >
        <ErrorBoundary fallback={errorComponent} onError={onError}>
          <UiShellProvider
            appBackgroundColor={appBackgroundColor}
            appBackgroundContrastMode={appBackgroundContrastMode}
            closeSideNavMenu={closeSideNavMenu}
            sideNavBackgroundColor={sideNavBackgroundColor}
            sideNavBackgroundContrastColor={sideNavBackgroundContrastColor}
            subscribeToCloseRightSideMenu={subscribeToCloseRightSideMenu}
            subscribeToCloseSideNavMenu={subscribeToCloseSideNavMenu}
            topNavBackgroundColor={topNavBackgroundColor}
          >
            {activeBreakpoint === "narrow" && (
              <NarrowUiShellContent
                {...componentProps}
                appElement={appElement}
                appElementScrollingMode={appElementScrollingMode}
                hasSideNavProps={Boolean(componentProps.sideNavProps)}
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
                      ...componentProps.sideNavProps,
                      hasSessionStorageState: activeBreakpoint === "wide",
                      isCollapsed:
                        activeBreakpoint === "medium" ||
                        componentProps.sideNavProps?.isCollapsed,
                      isCollapsible:
                        activeBreakpoint === "medium" ||
                        componentProps.sideNavProps?.isCollapsible,
                      logoProps:
                        componentProps.sideNavProps?.logoProps ||
                        componentProps.logoProps,
                    } as typeof componentProps.sideNavProps, // We have to use `as` because sideNavProps expects you to have `sideNavItems` defined even though it had to be passed in `...componentProps.sideNavProps`.
                  },
                }}
                appElement={appElement}
                appElementScrollingMode={appElementScrollingMode}
                hasSideNavProps={Boolean(componentProps.sideNavProps)}
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
