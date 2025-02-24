/*!
 * Copyright (c) 2025-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

export type ReactRootElements = {
  /**
   * The element your React root component renders into.
   * React has to render or portal somewhere, and this element can be used for that root element.
   *
   * In the case of a web component, there is no defined root element, so you have to define it yourself.
   */
  appRootElement: HTMLDivElement;
  /**
   * In React apps, your styles typically go in `document.head`, but you may want to render them somewhere else.
   *
   * Specifically when rendering in a web component, there is no `<head>`, so you have to create a spot for styles to render.
   */
  stylesRootElement: HTMLDivElement | HTMLHeadElement;
};

export const createReactRootElements = () => {
  const appRootElement = document.createElement("div");
  const stylesRootElement = document.createElement("div");

  // This `div` may cause layout issues unless it inherits the parent's height.
  appRootElement.style.setProperty("height", "inherit");

  appRootElement.setAttribute("id", "app-root");
  stylesRootElement.setAttribute("id", "style-root");
  stylesRootElement.setAttribute("nonce", window.cspNonce);

  return {
    appRootElement,
    stylesRootElement,
  } satisfies ReactRootElements;
};
