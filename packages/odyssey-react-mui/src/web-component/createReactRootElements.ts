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

/**
 * blah blah
 */
export type ReactRootElements = {
  /**
   * The element your root React component renders into.
   * React has to render or portal somewhere, and this element can be used for that root element.
   */
  appRootElement: HTMLDivElement;
  /**
   * In React apps, your styles typically go in `document.head`, but you may want to render them somewhere else.
   *
   * Specifically when rendering in a web component, there is no `<head>`, so you have to create a spot for styles to render.
   */
  stylesRootElement: HTMLDivElement | HTMLHeadElement;
};

export const appRootElementId = "app-root";
export const stylesRootElementId = "style-root";

export const createReactRootElements = () => {
  const appRootElement = document.createElement("div");
  const stylesRootElement = document.createElement("div");

  // This `div` may cause layout issues unless it inherits the parent's height.
  appRootElement.style.setProperty("height", "inherit");

  appRootElement.setAttribute("id", appRootElementId);
  stylesRootElement.setAttribute("id", stylesRootElementId);
  stylesRootElement.setAttribute("nonce", window.cspNonce);

  return {
    appRootElement,
    stylesRootElement,
  } satisfies ReactRootElements;
};
