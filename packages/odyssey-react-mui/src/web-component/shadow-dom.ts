/*!
 * Copyright (c) 2023-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

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

/**
 * @deprecated Use `renderReactInWebComponent` from `@okta/odyssey-react-mui/ui-shell` instead. This function was necessary when using bare Shadow DOM, but with UI Shell rendering in a Web Component, you won't be able to render your Shadow DOM in its Shadow DOM without using a Web Component.
 */
export const createShadowDomElements = (containerElement: HTMLElement) => {
  const shadowRoot = containerElement.attachShadow({ mode: "open" });

  // Container for Emotion `<style>` elements.
  const { appRootElement, stylesRootElement } = createReactRootElements();

  shadowRoot.appendChild(appRootElement);
  shadowRoot.appendChild(stylesRootElement);

  return {
    emotionRootElement: stylesRootElement,
    shadowRootElement: appRootElement,
  };
};

/**
 * @deprecated Use `createShadowDomElements` instead which returns an object instead of an array. It's otherwise the same.
 * @deprecated Ideally, use `renderReactInWebComponent` from `@okta/odyssey-react-mui/ui-shell` instead. This function was necessary when using bare Shadow DOM, but with UI Shell rendering in a Web Component, you won't be able to render your Shadow DOM in its Shadow DOM without using a Web Component. */
export const createShadowRootElement = (
  containerElement: HTMLElement,
): [HTMLStyleElement, HTMLDivElement] => {
  const shadowRoot = containerElement.attachShadow({ mode: "open" });

  // the element that styles will be cached into
  const emotionRootElement = document.createElement("style");
  emotionRootElement.setAttribute("id", "style-root");
  emotionRootElement.setAttribute("nonce", window.cspNonce);

  // the element that emotion renders html into
  const shadowRootElement = document.createElement("div");
  shadowRootElement.setAttribute("id", "shadow-root");

  shadowRoot.appendChild(emotionRootElement);
  shadowRoot.appendChild(shadowRootElement);

  return [emotionRootElement, shadowRootElement];
};
