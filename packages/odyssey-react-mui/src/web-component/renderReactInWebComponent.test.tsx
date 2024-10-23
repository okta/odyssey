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

import { waitFor } from "@testing-library/dom";

import {
  createReactRootElements,
  ReactInWebComponentElement,
  reactWebComponentElementName,
  renderReactInWebComponent,
} from "./renderReactInWebComponent";

describe("createReactRootElements", () => {
  test("returns two elements at attach to a Shadow DOM", () => {
    const { appRootElement, stylesRootElement } = createReactRootElements();

    expect(appRootElement).toBeInstanceOf(HTMLDivElement);
    expect(stylesRootElement).toBeInstanceOf(HTMLDivElement);
  });

  test("App root element has the correct attributes", () => {
    const { appRootElement } = createReactRootElements();

    expect(appRootElement).toHaveAttribute("id", "app-root");
    expect(appRootElement).toHaveAttribute("style", "height: inherit;");
  });

  test("Emotion root element has the correct attributes", () => {
    const nonce = "hello-world";

    window.cspNonce = nonce;

    const { stylesRootElement } = createReactRootElements();

    expect(stylesRootElement).toHaveAttribute("id", "style-root");
    expect(stylesRootElement).toHaveAttribute("nonce", nonce);
  });
});

describe("renderReactInWebComponent", () => {
  afterEach(() => {
    // Remove any appended elements
    document.body.innerHTML = "";
  });

  test("returns web component element", async () => {
    const rootElement = document.createElement("div");
    const testElementText = "I'm a test component!";

    // If this isn't appended to the DOM, the React app won't exist because of how Web Components run.
    document.body.append(rootElement);

    const reactInWebComponentElement = renderReactInWebComponent({
      getReactComponent: () => <div>{testElementText}</div>,
      webComponentRootElement: rootElement,
    });

    await waitFor(() => {
      expect(reactInWebComponentElement).toBeInstanceOf(
        ReactInWebComponentElement,
      );
      expect(reactInWebComponentElement.shadowRoot).toBeInstanceOf(ShadowRoot);
      expect(reactInWebComponentElement).toBeInTheDocument();
    });
  });

  test("renders a React app into a web component", async () => {
    const rootElement = document.createElement("div");
    const testElementText = "I'm a test component!";

    // If this isn't appended to the DOM, the React app won't exist because of how Web Components run.
    document.body.append(rootElement);

    const reactInWebComponentElement = renderReactInWebComponent({
      getReactComponent: () => <div>{testElementText}</div>,
      webComponentRootElement: rootElement,
    });

    await waitFor(() => {
      expect(reactInWebComponentElement!.shadowRoot).toHaveTextContent(
        testElementText,
      );
    });
  });

  test("renders 2 React apps without erroring", () => {
    const rootElement = document.createElement("div");

    // If this isn't appended to the DOM, the React app won't exist because of how Web Components run.
    document.body.append(rootElement);

    renderReactInWebComponent({
      getReactComponent: () => <div />,
      webComponentRootElement: rootElement,
    });

    renderReactInWebComponent({
      getReactComponent: () => <div />,
      webComponentRootElement: rootElement,
    });

    expect(
      document.querySelectorAll(reactWebComponentElementName),
    ).toHaveLength(2);
  });

  test("renders a single element as children of the web component", () => {
    const rootElement = document.createElement("div");
    const webComponentChildren = document.createElement("div");

    webComponentChildren.setAttribute("slot", "app");

    // If this isn't appended to the DOM, the React app won't exist because of how Web Components run.
    document.body.append(rootElement);

    renderReactInWebComponent({
      getReactComponent: () => <div />,
      webComponentRootElement: rootElement,
      webComponentChildren,
    });

    expect(document.querySelector("[slot=app]")).toBe(webComponentChildren);
  });

  test("renders multiple elements as children of the web component", () => {
    const rootElement = document.createElement("div");
    const webComponentChild1 = document.createElement("div");
    const webComponentChild2 = document.createElement("div");

    const webComponentChildren = [webComponentChild1, webComponentChild2];

    webComponentChild1.setAttribute("slot", "app");
    webComponentChild2.setAttribute("slot", "footer");

    // If this isn't appended to the DOM, the React app won't exist because of how Web Components run.
    document.body.append(rootElement);

    renderReactInWebComponent({
      getReactComponent: () => <div />,
      webComponentRootElement: rootElement,
      webComponentChildren,
    });

    expect(document.querySelector("[slot=app]")).toBe(webComponentChild1);
    expect(document.querySelector("[slot=footer]")).toBe(webComponentChild2);
  });
});
