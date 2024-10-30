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

import { bufferLatest } from "./bufferLatest";
import { createMessageBus } from "./createMessageBus";
import { UiShell, UiShellProps } from "./UiShell";
import { renderReactInWebComponent } from "../../web-component/renderReactInWebComponent";
import { type UiShellNavComponentProps } from "./UiShellContent";

export const optionalComponentSlotNames: Record<
  keyof Required<UiShellProps>["optionalComponents"],
  string
> = {
  banners: "banners",
  companyLogo: "company-logo",
  sideNavFooter: "side-nav-footer",
  topNavLeftSide: "top-nav-left-side",
  topNavRightSide: "top-nav-right-side",
};

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
  appRootElement: explicitAppRootElement,
  onError = console.error,
  uiShellRootElement,
}: {
  /**
   * HTML element used as the root for a React app.
   */
  appRootElement?: HTMLDivElement;
  /**
   * Notifies when a React rendering error occurs. This could be useful for logging, reporting priority 0 issues, and recovering UI Shell when errors occur.
   */
  onError?: () => void;
  /**
   * HTML element used as the root for UI Shell.
   */
  uiShellRootElement: HTMLElement;
}) => {
  const appRootElement =
    explicitAppRootElement || document.createElement("div");

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

  const slottedElements = Object.fromEntries(
    Object.entries(optionalComponentSlotNames).map(
      ([optionalComponentKey, slotName]) => {
        const element = document.createElement("div");

        element.setAttribute("slot", slotName);

        return [optionalComponentKey, element];
      },
    ),
  ) as Record<
    keyof Required<UiShellProps>["optionalComponents"],
    HTMLDivElement
  >;

  const webComponentChildren =
    Object.values(slottedElements).concat(appRootElement);

  const appComponent = <slot />;

  const uiShellElement = renderReactInWebComponent({
    getReactComponent: (reactRootElements) => (
      <ErrorBoundary fallback={appComponent} onError={onError}>
        <UiShell
          appComponent={appComponent}
          appRootElement={reactRootElements.appRootElement}
          onError={onError}
          onSubscriptionCreated={publishSubscriptionCreated}
          // `optionalComponents` doesn't need to be memoized because gets passed in once.
          optionalComponents={Object.fromEntries(
            Object.entries(optionalComponentSlotNames).map(
              ([optionalComponentKey, slotName]) => [
                optionalComponentKey,
                <slot name={slotName} />,
              ],
            ),
          )}
          stylesRootElement={reactRootElements.stylesRootElement}
          subscribeToPropChanges={subscribeToPropChanges}
        />
      </ErrorBoundary>
    ),
    webComponentRootElement: uiShellRootElement,
    webComponentChildren,
  });

  return {
    appRootElement,
    setComponentProps: publishAfterReactAppReadyForProps,
    slottedElements,
    uiShellElement,
  };
};
