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

import { type ReactNode } from "react";
import { createRoot, type Root } from "react-dom/client";

import {
  createUnattachedShadowDomElements,
  type ShadowDomElements,
} from "./shadow-dom";

export const reactElementName = "react-web-component";

export type RenderReactInWebComponentProps = {
  contentElementId: string;
  getReactComponent: (shadowDomElements: ShadowDomElements) => ReactNode;
  rootElement: HTMLElement;
};

export const renderReactInWebComponent = ({
  contentElementId,
  getReactComponent,
  rootElement,
}: RenderReactInWebComponentProps) => {
  class ReactElement extends HTMLElement {
    shadowDomElements: ShadowDomElements;
    reactRoot: Root;

    constructor() {
      super();

      this.shadowDomElements = createUnattachedShadowDomElements();

      const shadowRoot = this.attachShadow({ mode: "open" });

      shadowRoot.appendChild(this.shadowDomElements.emotionRootElement);
      shadowRoot.appendChild(this.shadowDomElements.appRootElement);

      this.reactRoot = createRoot(this.shadowDomElements.appRootElement);
    }

    connectedCallback() {
      this.reactRoot.render(getReactComponent(this.shadowDomElements));
    }

    disconnectedCallback() {
      this.reactRoot.unmount();
    }
  }

  if (!customElements.get(reactElementName)) {
    customElements.define(reactElementName, ReactElement);
  }

  const reactAppRootElement = document.createElement("div");
  const reactElement = new ReactElement();

  reactAppRootElement.id = contentElementId;

  reactElement.appendChild(reactAppRootElement);
  rootElement.appendChild(reactElement);
};
