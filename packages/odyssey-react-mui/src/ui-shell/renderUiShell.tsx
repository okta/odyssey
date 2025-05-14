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

import { type SetStateAction } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { bufferLatest } from "./bufferLatest.js";
import { createMessageBus, PublishMessage } from "./createMessageBus.js";
import { UiShell, UiShellProps } from "./UiShell.js";
import { UiShellNavComponentProps } from "./uiShellContentTypes.js";
import { uiShellDataAttribute } from "./useHasUiShell.js";
import { renderReactInWebComponent } from "../web-component/renderReactInWebComponent.js";

export const optionalComponentSlotNames: Record<
  keyof Required<UiShellProps>["optionalComponents"],
  string
> = {
  banners: "banners",
  rightSideMenu: "right-side-menu",
  sideNavFooter: "side-nav-footer",
  topNavLeftSide: "top-nav-left-side",
  topNavRightSide: "top-nav-right-side",
};

export type SlottedElements = Record<
  keyof Required<UiShellProps>["optionalComponents"],
  HTMLDivElement
>;

export type RenderedUiShell = {
  closeRightSideMenu: PublishMessage<void>;
  closeSideNavMenu: PublishMessage<void>;
  setComponentProps: ReturnType<
    typeof bufferLatest<SetStateAction<UiShellNavComponentProps>>
  >;
  slottedElements: SlottedElements;
  uiShellElement: ReturnType<typeof renderReactInWebComponent>;
} & Partial<Pick<UiShellProps, "appElement">>;

/**
 * This function renders UI Shell in a web component.
 * This function is agnostic to the UI framework for your app is using. Your application can be another web component, a React app, or even vanilla HTML.
 *
 * **All styles are self-contained.** Even though your application visually renders as children of the web component, its within the global `document` scope, not the web component's `ShadowRoot`. That means any global styles will not affect UI Shell but will affect your application.
 *
 * It places your app's root element in a web component <slot> and ensures it remains rendered in the event of a UI Shell error.
 * It also provides you with other elements fitted to slots in the web component. **In React, you can portal to these components.**
 */
export const renderUiShell = ({
  appBackgroundColor,
  appBackgroundContrastMode,
  appElement: providedAppElement,
  appElementScrollingMode,
  breakpointConfig,
  hasStandardAppContentPadding,
  initialVisibleSections,
  onError = console.error,
  onRender,
  parentElement,
  sideNavBackgroundColor,
  topNavBackgroundColor,
}: {
  /**
   * Notifies when a React rendering error occurs. This could be useful for logging, reporting priority 0 issues, and recovering UI Shell when errors occur.
   */
  onError?: () => void;
  /**
   * Notify once when React has rendered UI Shell the first time.
   */
  onRender?: (renderedUiShell: RenderedUiShell) => void;
  /**
   * HTML element used as the container for UI Shell and the App. They're siblings inside this element.
   */
  parentElement: HTMLElement;
} & Pick<
  UiShellProps,
  | "appBackgroundColor"
  | "appBackgroundContrastMode"
  | "appElementScrollingMode"
  | "breakpointConfig"
  | "hasStandardAppContentPadding"
  | "initialVisibleSections"
  | "sideNavBackgroundColor"
  | "topNavBackgroundColor"
> &
  Partial<Pick<UiShellProps, "appElement">>) => {
  const appElement = providedAppElement || document.createElement("div");

  // Add this attribute so `PageTemplate` and potentially other components will know if they're in UI Shell with special padding already available.
  parentElement.setAttribute(uiShellDataAttribute, "");

  const { publish: publishPropChanges, subscribe: subscribeToPropChanges } =
    createMessageBus<SetStateAction<UiShellNavComponentProps>>();

  const {
    publish: publishSubscriptionCreated,
    subscribe: subscribeToReactAppSubscribed,
  } = createMessageBus();

  const publishAfterReactAppReadyForProps = bufferLatest({
    publish: publishPropChanges,
    subscribe: subscribeToReactAppSubscribed,
  });

  const {
    publish: closeRightSideMenu,
    subscribe: subscribeToCloseRightSideMenu,
  } = createMessageBus();

  const { publish: closeSideNavMenu, subscribe: subscribeToCloseSideNavMenu } =
    createMessageBus();

  const slottedElements = Object.fromEntries(
    Object.entries(optionalComponentSlotNames).map(
      ([optionalComponentKey, slotName]) => {
        const element = document.createElement("div");

        element.setAttribute("slot", slotName);

        return [optionalComponentKey, element];
      },
    ),
  ) as SlottedElements;

  const webComponentChildren = Object.values(slottedElements);

  const uiShellElement = renderReactInWebComponent({
    getReactComponent: (reactRootElements) => (
      <ErrorBoundary fallback={<div data-error />} onError={onError}>
        <UiShell
          breakpointConfig={breakpointConfig}
          appBackgroundColor={appBackgroundColor}
          appBackgroundContrastMode={appBackgroundContrastMode}
          appElement={appElement}
          appElementScrollingMode={appElementScrollingMode}
          closeSideNavMenu={closeSideNavMenu}
          hasStandardAppContentPadding={hasStandardAppContentPadding}
          initialVisibleSections={initialVisibleSections}
          onError={onError}
          onSubscriptionCreated={publishSubscriptionCreated}
          // `optionalComponents` doesn't need to be memoized because gets passed in once, and this isn't a React component.
          optionalComponents={Object.fromEntries(
            Object.entries(optionalComponentSlotNames).map(
              ([optionalComponentKey, slotName]) => [
                optionalComponentKey,
                <slot name={slotName} />,
              ],
            ),
          )}
          sideNavBackgroundColor={sideNavBackgroundColor}
          subscribeToCloseRightSideMenu={subscribeToCloseRightSideMenu}
          subscribeToCloseSideNavMenu={subscribeToCloseSideNavMenu}
          subscribeToPropChanges={subscribeToPropChanges}
          topNavBackgroundColor={topNavBackgroundColor}
          uiShellAppElement={reactRootElements.appRootElement}
          uiShellStylesElement={reactRootElements.stylesRootElement}
        />
      </ErrorBoundary>
    ),
    webComponentParentElement: parentElement,
    webComponentChildren,
  });

  const unsubscribeFromUnifiedUiShellRendered = subscribeToReactAppSubscribed(
    () => {
      unsubscribeFromUnifiedUiShellRendered();

      onRender?.({
        appElement,
        closeRightSideMenu,
        closeSideNavMenu,
        setComponentProps: publishAfterReactAppReadyForProps,
        slottedElements,
        uiShellElement,
      });
    },
  );

  parentElement.appendChild(appElement);

  return {
    appElement,
    closeRightSideMenu,
    closeSideNavMenu,
    setComponentProps: publishAfterReactAppReadyForProps,
    slottedElements,
    uiShellElement,
  };
};
