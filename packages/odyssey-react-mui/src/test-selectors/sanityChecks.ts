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

// Code modified from: https://github.com/testing-library/jest-dom/blob/main/src/utils.js

export class ElementError extends Error {
  constructor(message: string, element: HTMLElement) {
    super(message);

    this.name = "ElementError";

    console.error("ElementError", element);
  }
}

export const normalizeText = (text: string) => {
  return text.replace(/\s+/g, " ").trim();
};

export const getWindow = (htmlElement: HTMLElement) => {
  if (
    !htmlElement ||
    !htmlElement.ownerDocument ||
    !htmlElement.ownerDocument.defaultView
  ) {
    throw new ElementError("Expected element to have a `window`", htmlElement);
  }

  return htmlElement.ownerDocument.defaultView;
};

export const validateHtmlElement = (htmlElement: HTMLElement) => {
  const window = getWindow(htmlElement);

  if (
    !(htmlElement instanceof window.SVGElement) &&
    !(htmlElement instanceof window.HTMLElement)
  ) {
    throw new ElementError(
      "Expected element to be an HTMLElement or an SVGElement",
      htmlElement,
    );
  }
};
