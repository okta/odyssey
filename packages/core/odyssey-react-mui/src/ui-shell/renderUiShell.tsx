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

import { type FullscreenModeMessageBus } from "../message-bus/index.js";
import { bufferLatest } from "../tools/bufferLatest.js";
import { createMessageBus, PublishMessage } from "../tools/createMessageBus.js";
import { renderReactInWebComponent } from "../web-component/renderReactInWebComponent.js";
import { createUiShellFullscreenState } from "./createUiShellFullscreenState.js";
import {
  UiShell,
  UiShellProps,
  UiShellTranslationSettings,
} from "./UiShell.js";
import { UiShellNavComponentProps } from "./uiShellContentTypes.js";
import { uiShellDataAttribute } from "./useHasUiShell.js";

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
  /**
   * Put the whole app area in fullscreen. UI Shell hides its top nav, side nav, and banners so the app fills the page.
   *
   * Use this when your app isn't built with Odyssey's `FullscreenButton`, for example a non-React app.
   *
   * The app area is one more entry in the page's fullscreen stack, so a `FullscreenRegion` can enter on top of it, and Escape goes back one step at a time. Removing `uiShellElement` from the page clears the stack.
   */
  enterAppFullscreen: () => void;
  /**
   * Take the app area out of fullscreen. A `FullscreenRegion` that entered on top of it stays in fullscreen.
   */
  exitAppFullscreen: () => void;
  /**
   * The page's current fullscreen state.
   */
  getFullscreenState: FullscreenModeMessageBus["getFullscreenState"];
  setComponentProps: ReturnType<
    typeof bufferLatest<SetStateAction<UiShellNavComponentProps>>
  >;
  /**
   * Update the shell's translation settings (`languageCode`, `translationOverrides`) at runtime.
   *
   * Call this after the consumer's locale changes to re-localize shell-rendered chrome (skip-to-content link, top nav icons, side nav toggle) without re-rendering UI Shell.
   *
   * Accepts a React `SetStateAction`: passing a plain object **replaces** the entire settings value (so omitting `translationOverrides` clears it). Pass an updater function — `(previous) => ({ ...previous, languageCode: "es" })` — to merge with
   * the previous value.
   */
  setTranslationSettings: ReturnType<
    typeof bufferLatest<SetStateAction<UiShellTranslationSettings>>
  >;
  slottedElements: SlottedElements;
  /**
   * Listen for fullscreen changes anywhere on the page, including ones from other apps. Returns a function that stops listening.
   */
  subscribeToFullscreenState: FullscreenModeMessageBus["subscribeToFullscreenState"];
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
  languageCode,
  onError = console.error,
  onRender,
  parentElement,
  sideNavBackgroundColor,
  sideNavBackgroundContrastColor,
  topNavBackgroundColor,
  translationOverrides,
  nonce = window.cspNonce,
}: {
  /**
   * Optional nonce for CSP compliance.
   */
  nonce?: string;
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
  | "sideNavBackgroundContrastColor"
  | "topNavBackgroundColor"
> &
  Partial<UiShellTranslationSettings> &
  Partial<Pick<UiShellProps, "appElement">>) => {
  const appElement = providedAppElement || document.createElement("div");

  // Add this attribute so `PageTemplate` and potentially other components will know if they're in UI Shell with special padding already available.
  parentElement.setAttribute(uiShellDataAttribute, "");

  const { publish: publishPropChanges, subscribe: subscribeToPropChanges } =
    createMessageBus<SetStateAction<UiShellNavComponentProps>>();

  const {
    publish: publishTranslationSettings,
    subscribe: subscribeToTranslationSettings,
  } = createMessageBus<SetStateAction<UiShellTranslationSettings>>();

  const {
    publish: publishSubscriptionCreated,
    subscribe: subscribeToReactAppSubscribed,
  } = createMessageBus();

  const publishAfterReactAppReadyForProps = bufferLatest({
    publish: publishPropChanges,
    subscribe: subscribeToReactAppSubscribed,
  });

  const publishAfterReactAppReadyForTranslationSettings = bufferLatest({
    publish: publishTranslationSettings,
    subscribe: subscribeToReactAppSubscribed,
  });

  publishAfterReactAppReadyForTranslationSettings({
    languageCode,
    translationOverrides,
  });

  const {
    publish: closeRightSideMenu,
    subscribe: subscribeToCloseRightSideMenu,
  } = createMessageBus();

  const { publish: closeSideNavMenu, subscribe: subscribeToCloseSideNavMenu } =
    createMessageBus();

  const {
    connect: connectFullscreenState,
    enterAppFullscreen: enterAppFullscreenNow,
    exitAppFullscreen: exitAppFullscreenNow,
    getFullscreenState,
    subscribeToFullscreenState,
  } = createUiShellFullscreenState();

  // The page's fullscreen host starts when UI Shell's React tree renders, so a request made before then would reach no one. Like props, only the latest request is kept, so an enter followed by an exit leaves the app where it was.
  const requestAfterReactAppReady = bufferLatest<() => void>({
    publish: (sendFullscreenRequest) => sendFullscreenRequest(),
    subscribe: subscribeToReactAppSubscribed,
  });

  const enterAppFullscreen = () =>
    requestAfterReactAppReady(enterAppFullscreenNow);

  const exitAppFullscreen = () =>
    requestAfterReactAppReady(exitAppFullscreenNow);

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
          appBackgroundColor={appBackgroundColor}
          appBackgroundContrastMode={appBackgroundContrastMode}
          appElement={appElement}
          appElementScrollingMode={appElementScrollingMode}
          breakpointConfig={breakpointConfig}
          closeSideNavMenu={closeSideNavMenu}
          connectFullscreenState={connectFullscreenState}
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
          sideNavBackgroundContrastColor={sideNavBackgroundContrastColor}
          subscribeToCloseRightSideMenu={subscribeToCloseRightSideMenu}
          subscribeToCloseSideNavMenu={subscribeToCloseSideNavMenu}
          subscribeToPropChanges={subscribeToPropChanges}
          subscribeToTranslationSettings={subscribeToTranslationSettings}
          topNavBackgroundColor={topNavBackgroundColor}
          uiShellAppElement={reactRootElements.appRootElement}
          uiShellStylesElement={reactRootElements.stylesRootElement}
        />
      </ErrorBoundary>
    ),
    webComponentChildren,
    webComponentParentElement: parentElement,
    nonce,
  });

  const unsubscribeFromUnifiedUiShellRendered = subscribeToReactAppSubscribed(
    () => {
      unsubscribeFromUnifiedUiShellRendered();

      onRender?.({
        appElement,
        closeRightSideMenu,
        closeSideNavMenu,
        enterAppFullscreen,
        exitAppFullscreen,
        getFullscreenState,
        setComponentProps: publishAfterReactAppReadyForProps,
        setTranslationSettings: publishAfterReactAppReadyForTranslationSettings,
        slottedElements,
        subscribeToFullscreenState,
        uiShellElement,
      });
    },
  );

  parentElement.appendChild(appElement);

  return {
    appElement,
    closeRightSideMenu,
    closeSideNavMenu,
    enterAppFullscreen,
    exitAppFullscreen,
    getFullscreenState,
    setComponentProps: publishAfterReactAppReadyForProps,
    setTranslationSettings: publishAfterReactAppReadyForTranslationSettings,
    slottedElements,
    subscribeToFullscreenState,
    uiShellElement,
  } satisfies RenderedUiShell;
};
