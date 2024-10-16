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

import { bufferUntil } from "./bufferUntil";
import { createMessageBus } from "./createMessageBus";
import { OktaUiShell, type OktaUiShellComponentProps } from "./OktaUiShell";
import { renderReactInWebComponent } from "./renderReactInWebComponent";

export const renderOktaUiShell = ({
  contentElementId,
  rootElement,
}: {
  contentElementId?: string;
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

  renderReactInWebComponent({
    getReactComponent: (shadowDomElements) => (
      <OktaUiShell
        appRootElement={shadowDomElements.appRootElement}
        emotionRootElement={shadowDomElements.emotionRootElement}
        onSubscriptionCreated={publishSubscriptionCreated}
        subscribeToPropChanges={subscribeToPropChanges}
      />
    ),
    contentElementId,
    rootElement,
  });

  return publishAfterReactAppReadyForProps;
};
