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

import { bufferUntil } from "./bufferUntil";
import { createMessageBus } from "./createMessageBus";
import { UiShell, UiShellProps, type UiShellComponentProps } from "./UiShell";
import { renderReactInWebComponent } from "../web-component/renderReactInWebComponent";

export const optionalComponentSlotNames: Record<
  keyof Required<UiShellProps>["optionalComponents"],
  string
> = {
  additionalTopNavItems: "additional-top-nav-items",
  footer: "footer",
  logo: "logo",
  searchField: "search-field",
};

export const renderUiShell = ({
  appRootElement: explicitAppRootElement,
  onError = console.error,
  uiShellRootElement,
}: {
  appRootElement?: HTMLDivElement;
  onError?: () => void;
  uiShellRootElement: HTMLElement;
}) => {
  const appRootElement =
    explicitAppRootElement || document.createElement("div");

  const { publish: publishPropChanges, subscribe: subscribeToPropChanges } =
    createMessageBus<SetStateAction<UiShellComponentProps>>();

  const {
    publish: publishSubscriptionCreated,
    subscribe: subscribeToReactAppSubscribed,
  } = createMessageBus();

  const publishAfterReactAppReadyForProps = bufferUntil({
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

  const uiShellElement = renderReactInWebComponent({
    getReactComponent: (shadowDomElements) => (
      <ErrorBoundary fallback={<slot />} onError={onError}>
        <UiShell
          appComponent={<slot />}
          appRootElement={shadowDomElements.appRootElement}
          emotionRootElement={shadowDomElements.emotionRootElement}
          onError={onError}
          onSubscriptionCreated={publishSubscriptionCreated}
          optionalComponents={Object.fromEntries(
            Object.entries(optionalComponentSlotNames).map(
              ([optionalComponentKey, slotName]) => [
                optionalComponentKey,
                <slot name={slotName} />,
              ],
            ),
          )}
          subscribeToPropChanges={subscribeToPropChanges}
        />
      </ErrorBoundary>
    ),
    rootElement: uiShellRootElement,
    webComponentChildren,
  });

  return {
    appRootElement,
    setComponentProps: publishAfterReactAppReadyForProps,
    slottedElements,
    uiShellElement,
  };
};
