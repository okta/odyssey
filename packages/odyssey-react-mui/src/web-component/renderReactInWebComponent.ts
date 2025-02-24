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
import type { Root } from "react-dom/client";

import {
  createReactRootElements,
  type ReactRootElements,
} from "./createReactRootElements.js";

export const reactWebComponentElementName = "odyssey-react-web-component";

export type GetReactComponentInWebComponent = (
  reactRootElements: ReactRootElements,
) => ReactNode;

const SsrFriendlyHtmlElementClass =
  "HTMLElement" in globalThis
    ? HTMLElement
    : (class {} as unknown as typeof globalThis.HTMLElement);

export class ReactInWebComponentElement extends SsrFriendlyHtmlElementClass {
  getReactComponent: GetReactComponentInWebComponent;
  reactRootElements: ReactRootElements;
  reactRootPromise: Promise<Root>;

  constructor(getReactComponent: GetReactComponentInWebComponent) {
    super();

    this.getReactComponent = getReactComponent;
    this.reactRootElements = createReactRootElements();

    const styleElement = document.createElement("style");
    const shadowRoot = this.attachShadow({ mode: "open" });

    styleElement.innerHTML = `
      :host {
        all: initial;
        contain: content;
      }
    `;

    styleElement.setAttribute("nonce", window.cspNonce);

    this.reactRootElements.stylesRootElement.appendChild(styleElement);
    shadowRoot.appendChild(this.reactRootElements.stylesRootElement);
    shadowRoot.appendChild(this.reactRootElements.appRootElement);

    // If we want to support React v17 in the future, we can use a try-catch on the import to grab the old `ReactDOM.render` function if `react-dom/client` errors. --Kevin Ghadyani
    this.reactRootPromise = import("react-dom/client").then(({ createRoot }) =>
      createRoot(this.reactRootElements.appRootElement),
    );
  }

  connectedCallback() {
    this.reactRootPromise.then((reactRoot) =>
      reactRoot.render(this.getReactComponent(this.reactRootElements)),
    );
  }

  disconnectedCallback() {
    this.reactRootPromise.then((reactRoot) => reactRoot.unmount());
  }
}

if (
  "customElements" in globalThis &&
  !customElements.get(reactWebComponentElementName)
) {
  customElements.define(
    reactWebComponentElementName,
    ReactInWebComponentElement,
  );
}

export type RenderReactInWebComponentProps = {
  /**
   * This is a callback function for rendering your React component or app in the Web Component.
   * It gives you access to the Shadow DOM elements if you need them for Odyssey, Emotion, or MUI.
   *
   * You will need to add `<slot>` elements if you want to pass child elements or components or React apps.
   * You can have multiple slots in your app if you add a `name` attribute to your `<slot>` elements.
   */
  getReactComponent: GetReactComponentInWebComponent;
  /**
   * One or more HTML elements that are going to render as `children` of the web component.
   * If your React component doesn't take children, this is unnecessary.
   *
   * Typically, a React app root element is passed, but it can include an array of other elements if there are multiple slots for children.
   *
   * You will need to have rendered `<slot>` elements in your React component or `children` won't show up.
   */
  webComponentChildren?: HTMLElement | HTMLElement[];
  /**
   * You React app renders in the web component, but the web component needs to be rendered in the document.
   *
   * This is the element the web component is rendered into.
   */
  webComponentRootElement: HTMLElement;
};

/**
 * Lets you render React apps or components in a Web Component.
 *
 * This is useful when global styles are causing conflicts with your React components.
 */
export const renderReactInWebComponent = ({
  getReactComponent,
  webComponentChildren,
  webComponentRootElement,
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

  webComponentRootElement.appendChild(reactElement);

  return reactElement;
};
