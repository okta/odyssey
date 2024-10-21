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

export const reactWebComponentElementName = "odyssey-react-web-component";

export type GetReactComponentInWebComponent = (
  shadowDomElements: ShadowDomElements,
) => ReactNode;

export class ReactInWebComponentElement extends HTMLElement {
  getReactComponent: GetReactComponentInWebComponent;
  shadowDomElements: ShadowDomElements;
  reactRoot: Root;

  constructor(getReactComponent: GetReactComponentInWebComponent) {
    super();

    this.getReactComponent = getReactComponent;
    this.shadowDomElements = createUnattachedShadowDomElements();

    const styleElement = document.createElement("style");
    const shadowRoot = this.attachShadow({ mode: "open" });

    styleElement.innerHTML = `
      :host {
        all: initial;
        contain: content;
      }
    `;

    styleElement.setAttribute("nonce", window.cspNonce);

    this.shadowDomElements.emotionRootElement.appendChild(styleElement);
    shadowRoot.appendChild(this.shadowDomElements.emotionRootElement);
    shadowRoot.appendChild(this.shadowDomElements.appRootElement);

    this.reactRoot = createRoot(this.shadowDomElements.appRootElement);
  }

  connectedCallback() {
    this.reactRoot.render(this.getReactComponent(this.shadowDomElements));
  }

  disconnectedCallback() {
    this.reactRoot.unmount();
  }
}

if (!customElements.get(reactWebComponentElementName)) {
  customElements.define(
    reactWebComponentElementName,
    ReactInWebComponentElement,
  );
}

export type RenderReactInWebComponentProps = {
  getReactComponent: GetReactComponentInWebComponent;
  webComponentChildren?: HTMLElement | HTMLElement[];
  rootElement: HTMLElement;
};

export const renderReactInWebComponent = ({
  getReactComponent,
  rootElement,
  webComponentChildren,
}: RenderReactInWebComponentProps) => {
  const reactElement = new ReactInWebComponentElement(getReactComponent);

  if (webComponentChildren) {
    (Array.isArray(webComponentChildren)
      ? webComponentChildren
      : [webComponentChildren]
    ).forEach((webComponentChild) => {
      reactElement.appendChild(webComponentChild);
    });
  }

  rootElement.appendChild(reactElement);

  return reactElement;
};
