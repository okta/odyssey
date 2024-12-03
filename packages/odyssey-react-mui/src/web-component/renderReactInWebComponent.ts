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

/**
 * Creates elements for a Shadow DOM that Odyssey will render into.
 * The Emotion root is for `<style>` tags and the app root is for an app to render into.
 * These are bare elements that
 */
export const createReactRootElements = () => {
  const appRootElement = document.createElement("div");
  const stylesRootElement = document.createElement("div");

  // This `div` may cause layout issues unless it inherits the parent's height.
  appRootElement.style.setProperty("height", "inherit");

  appRootElement.setAttribute("id", "app-root");
  stylesRootElement.setAttribute("id", "style-root");
  stylesRootElement.setAttribute("nonce", window.cspNonce);

  return {
    /**
     * The element your React root component renders into.
     * React has to render or portal somewhere, and this element can be used for that root element.
     *
     * In the case of a web component, there is no defined root element, so you have to define it yourself.
     */
    appRootElement,
    /**
     * In React apps, your styles typically go in `document.head`, but you may want to render them somewhere else.
     *
     * Specifically when rendering in a web component, there is no `<head>`, so you have to create a spot for styles to render.
     */
    stylesRootElement,
  };
};

export type ReactRootElements = ReturnType<typeof createReactRootElements>;

export const reactWebComponentElementName = "odyssey-react-web-component";

export type GetReactComponentInWebComponent = (
  reactRootElements: ReactRootElements,
) => ReactNode;

export class ReactInWebComponentElement extends HTMLElement {
  getReactComponent: GetReactComponentInWebComponent;
  reactRoot: Root;
  reactRootElements: ReactRootElements;

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

    this.reactRoot = createRoot(this.reactRootElements.appRootElement);
  }

  connectedCallback() {
    this.reactRoot.render(this.getReactComponent(this.reactRootElements));
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
