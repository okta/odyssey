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

export const createShadowDomElements = (containerElement: HTMLElement) => {
  const shadowRoot = containerElement.attachShadow({ mode: "open" });

  // Container for Emotion `<style>` elements.
  const emotionRootElement = document.createElement("div");
  emotionRootElement.setAttribute("id", "style-root");
  emotionRootElement.setAttribute("nonce", window.cspNonce);

  // React app root component.
  const shadowRootElement = document.createElement("div");
  shadowRootElement.setAttribute("id", "shadow-root");

  shadowRoot.appendChild(emotionRootElement);
  shadowRoot.appendChild(shadowRootElement);

  return { emotionRootElement, shadowRootElement };
};

/** @deprecated Use `createShadowDomElements` instead. */
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
