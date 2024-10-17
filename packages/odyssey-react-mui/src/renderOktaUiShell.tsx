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

import { ErrorBoundary } from "react-error-boundary";
import { bufferUntil } from "./bufferUntil";
import { createMessageBus } from "./createMessageBus";
import {
  OktaUiShell,
  OktaUiShellProps,
  type OktaUiShellComponentProps,
} from "./OktaUiShell";
import { renderReactInWebComponent } from "./renderReactInWebComponent";

export const optionalComponentSlotNames: Record<
  keyof Required<OktaUiShellProps>["optionalComponents"],
  string
> = {
  additionalTopNavItems: "additional-top-nav-items",
  footer: "footer",
  logo: "logo",
  searchField: "search-field",
};

export const defaultReactAppRootId = "react-app-root";
export const defaultAppElement = document.createElement("div");

defaultAppElement.setAttribute("id", defaultReactAppRootId);

export const renderOktaUiShell = ({
  appElement = defaultAppElement,
  onError = console.error,
  rootElement,
}: {
  appElement?: HTMLDivElement;
  onError?: () => void;
  rootElement: HTMLElement;
}) => {
  const { publish: publishPropChanges, subscribe: subscribeToPropChanges } =
    createMessageBus<OktaUiShellComponentProps>();

  const {
    publish: publishSubscriptionCreated,
    subscribe: subscribeToReactAppSubscribed,
  } = createMessageBus();

  const publishAfterReactAppReadyForProps = bufferUntil({
    publish: publishPropChanges,
    subscribe: subscribeToReactAppSubscribed,
  });

  const slottedComponents = Object.fromEntries(
    Object.entries(optionalComponentSlotNames).map(
      ([optionalComponentKey, slotName]) => {
        const element = document.createElement("div");

        element.setAttribute("slot", slotName);

        return [optionalComponentKey, element];
      },
    ),
  );

  const webComponentChildren =
    Object.values(slottedComponents).concat(appElement);

  const reactInWebComponentElement = renderReactInWebComponent({
    getReactComponent: (shadowDomElements) => (
      <ErrorBoundary fallback={<slot />} onError={onError}>
        <OktaUiShell
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
    rootElement,
    webComponentChildren,
  });

  return {
    reactInWebComponentElement,
    setComponentProps: publishAfterReactAppReadyForProps,
    slottedComponents,
  };
};
