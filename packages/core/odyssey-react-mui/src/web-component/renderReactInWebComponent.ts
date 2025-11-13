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

import type { Root } from "react-dom/client";

import { type ReactNode } from "react";

import {
  createReactRootElements,
  type ReactRootElements,
} from "./createReactRootElements.js";
import { encapsulateShadowDomFromGlobalStyles } from "./encapsulateShadowDomFromGlobalStyles.js";
import version from "./odysseyWebComponentVersion.generated.js";

interface GetReactWebComponentOptions {
  getReactComponent: (reactRootElements: ReactRootElements) => ReactNode;
  nonce: string;
  webComponentName?: string;
}

// Used by selenium when selecting for odyssey web components regardless of their name.
export const webComponentDataAttributeName = "data-odyssey-react-web-component";

// Unique name to avoid multiple versions of odyssey overwriting each other's implementations
export const versionedWebComponentName =
  `odyssey-react-web-component-${version}`.toLowerCase();

const SsrFriendlyHtmlElementClass =
  "HTMLElement" in globalThis
    ? HTMLElement
    : (class {} as unknown as typeof globalThis.HTMLElement);

export class WebComponentClass extends SsrFriendlyHtmlElementClass {
  #getReactComponent: GetReactComponentInWebComponent | null = null;
  readonly #reactRootElements: ReactRootElements;
  public readonly elementName: string = this.localName;
  // public for testing
  public reactRootPromise: Promise<Root | null> = Promise.resolve(null);

  constructor() {
    super();

    this.#reactRootElements = createReactRootElements();
    const { appRootElement, stylesRootElement } = this.#reactRootElements;

    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(stylesRootElement);
    shadowRoot.appendChild(appRootElement);
  }

  /**
   * Provides the function used to initialize react content that is specific to this instance
   * of the web component, which is used later in the connectedCallback.
   *
   * Always set immediately after creation via document.createElement
   */
  setGetReactComponent(getReactComponent: GetReactComponentInWebComponent) {
    this.reactRootPromise = this.reactRootPromise.then((reactRoot) => {
      this.#getReactComponent = getReactComponent;
      if (reactRoot) {
        // connectedCallback has already been fired. Need to mount this content to the existing root
        reactRoot.render(this.#getReactComponent(this.#reactRootElements));
      } else {
        // Nothing to do. Content will be mounted when connectedCallback is called
      }

      return reactRoot;
    });
  }

  connectedCallback() {
    encapsulateShadowDomFromGlobalStyles({
      nonce: this.getAttribute("nonce") || window.cspNonce,
      stylesRootElement: this.#reactRootElements.stylesRootElement,
    });

    this.reactRootPromise = this.reactRootPromise
      .then((reactRoot) => {
        if (reactRoot) {
          // Shouldn't ever happen. connected and disconnected should never be called out of order
          throw new Error(
            `connectedCallback fired when reactRoot is already mounted.`,
          );
        }

        // Ensure react root is available before mounting
        // If we want to support React v17 in the future, we can use a try-catch on the import to grab the old `ReactDOM.render` function if `react-dom/client` errors. --Kevin Ghadyani
        return import("react-dom/client").then(({ createRoot }) =>
          createRoot(this.#reactRootElements.appRootElement),
        );
      })
      .then((reactRoot) => {
        if (!this.#getReactComponent) {
          // getReactComponent hasn't been set yet. Content will be mounted once it's set.
        } else {
          reactRoot.render(this.#getReactComponent(this.#reactRootElements));
        }
        return reactRoot;
      });
  }

  disconnectedCallback() {
    this.reactRootPromise = this.reactRootPromise.then((reactRoot) => {
      if (!reactRoot) {
        // Shouldn't ever happen
        throw new Error(
          `disconnectedCallback fired when reactRoot is already unmounted.`,
        );
      }

      reactRoot.unmount();
      // Set root to null. We don't want to attempt to render to a root that's already been unmounted.
      return null;
    });
  }
}

/**
 * Returns a constructed web component which manages it's own shadow dom and react dom roots
 * A custom name can be specified, otherwise a default is provided
 */
export const getReactWebComponent = ({
  webComponentName = versionedWebComponentName,
  getReactComponent,
  nonce,
}: GetReactWebComponentOptions) => {
  // This name hasn't been defined yet. Add a definition for it before constructing one.
  if (!customElements.get(webComponentName)) {
    customElements.define(webComponentName, WebComponentClass);
  }

  const element = document.createElement(webComponentName) as InstanceType<
    typeof WebComponentClass
  >;
  // Set selenium attribute so this can be selected
  element.setAttribute(webComponentDataAttributeName, "");
  // Set the nonce for CSP compliance
  element.setAttribute("nonce", nonce);
  // function used for creating react content
  element.setGetReactComponent(getReactComponent);
  return element;
};

export type GetReactComponentInWebComponent = (
  reactRootElements: ReactRootElements,
) => ReactNode;

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
   * Optional nonce for CSP compliance.
   * Defaults to `window.cspNonce`.
   */
  nonce?: string;
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
   * Optional name given to this web component.
   * Defaults to a 'odyssey-react-wc-' plus the current odyssey version
   */
  webComponentName?: string;
} & (
  | {
      /**
       * The React app renders in the web component, but the web component needs to be rendered in the document.
       *
       * This is the element the web component is rendered into.
       */
      webComponentParentElement: HTMLElement;
      webComponentRootElement?: never;
    }
  | {
      webComponentParentElement?: never;
      /**
       * @deprecated Use `webComponentParentElement` instead.
       */
      webComponentRootElement: HTMLElement;
    }
);

/**
 * Lets you render React apps or components in a Web Component.
 *
 * This is useful when global styles are causing conflicts with your React components.
 */
export const renderReactInWebComponent = ({
  webComponentName,
  getReactComponent,
  webComponentChildren,
  webComponentParentElement,
  webComponentRootElement,
  nonce = window.cspNonce,
}: RenderReactInWebComponentProps) => {
  const reactElement = getReactWebComponent({
    getReactComponent,
    webComponentName,
    nonce,
  });

  if (webComponentChildren) {
    (Array.isArray(webComponentChildren)
      ? webComponentChildren
      : [webComponentChildren]
    ).forEach((webComponentChild) => {
      reactElement.appendChild(webComponentChild);
    });
  }

  if (webComponentParentElement) {
    webComponentParentElement.appendChild(reactElement);
  }
  // Remove this condition when `webComponentRootElement` is no longer a prop.
  else if (webComponentRootElement) {
    webComponentRootElement.appendChild(reactElement);
  }

  return reactElement;
};
