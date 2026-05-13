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

import { appendToSandbox } from "../test-utils/appendToSandbox.js";
import {
  renderReactInWebComponent,
  versionedWebComponentName,
  webComponentDataAttributeName,
} from "./renderReactInWebComponent.js";

describe(renderReactInWebComponent.name, () => {
  test("returns web component element", async () => {
    const nonce = "test-nonce";
    globalThis.cspNonce = nonce;
    // If this isn't appended to the DOM, the React app won't exist because of how Web Components run.
    // Tagged via `appendToSandbox` so the global afterEach removes it.
    const rootElement = appendToSandbox(document.createElement("div"));
    const testElementText = "I'm a test component!";

    const reactInWebComponentElement = renderReactInWebComponent({
      getReactComponent: () => <div>{testElementText}</div>,
      webComponentParentElement: rootElement,
    });

    await vi.waitFor(() => {
      expect(reactInWebComponentElement.elementName).toEqual(
        versionedWebComponentName,
      );
      expect(reactInWebComponentElement.shadowRoot).toBeInstanceOf(ShadowRoot);
      expect(reactInWebComponentElement).toBeInTheDocument();
      expect(reactInWebComponentElement).toHaveAttribute("nonce", nonce);
    });
  });

  test("renders a React app into a web component", async () => {
    const nonce = "test-nonce-2";
    // If this isn't appended to the DOM, the React app won't exist because of how Web Components run.
    const rootElement = appendToSandbox(document.createElement("div"));
    const testElementText = "I'm a test component!";

    const reactInWebComponentElement = renderReactInWebComponent({
      getReactComponent: () => <div>{testElementText}</div>,
      webComponentParentElement: rootElement,
      nonce,
    });

    await vi.waitFor(() => {
      expect(reactInWebComponentElement.shadowRoot).toHaveTextContent(
        testElementText,
      );
      expect(reactInWebComponentElement).toHaveAttribute("nonce", nonce);
    });
  });

  test("renders 2 React apps without erroring", () => {
    // If this isn't appended to the DOM, the React app won't exist because of how Web Components run.
    const rootElement = appendToSandbox(document.createElement("div"));

    renderReactInWebComponent({
      getReactComponent: () => <div />,
      webComponentParentElement: rootElement,
    });

    renderReactInWebComponent({
      getReactComponent: () => <div />,
      webComponentParentElement: rootElement,
    });

    expect(
      document.querySelectorAll(`[${webComponentDataAttributeName}]`),
    ).toHaveLength(2);
  });

  test("renders a single element as children of the web component", () => {
    // If this isn't appended to the DOM, the React app won't exist because of how Web Components run.
    const rootElement = appendToSandbox(document.createElement("div"));
    const webComponentChildren = document.createElement("div");

    webComponentChildren.setAttribute("slot", "app");

    renderReactInWebComponent({
      getReactComponent: () => <div />,
      webComponentParentElement: rootElement,
      webComponentChildren,
    });

    expect(document.querySelector("[slot=app]")).toBe(webComponentChildren);
  });

  test("renders multiple elements as children of the web component", () => {
    // If this isn't appended to the DOM, the React app won't exist because of how Web Components run.
    const rootElement = appendToSandbox(document.createElement("div"));
    const webComponentChild1 = document.createElement("div");
    const webComponentChild2 = document.createElement("div");

    const webComponentChildren = [webComponentChild1, webComponentChild2];

    webComponentChild1.setAttribute("slot", "app");
    webComponentChild2.setAttribute("slot", "footer");

    renderReactInWebComponent({
      getReactComponent: () => <div />,
      webComponentParentElement: rootElement,
      webComponentChildren,
    });

    expect(document.querySelector("[slot=app]")).toBe(webComponentChild1);
    expect(document.querySelector("[slot=footer]")).toBe(webComponentChild2);
  });

  describe("Throws errors if connected/disconnected are called out of order", () => {
    const rootElement = document.createElement("div");

    test("init -> connect -> disconnect -> connect passes", async () => {
      const reactInWebComponentElement = renderReactInWebComponent({
        getReactComponent: () => <div></div>,
        webComponentRootElement: rootElement,
      });

      reactInWebComponentElement.connectedCallback();
      reactInWebComponentElement.disconnectedCallback();
      reactInWebComponentElement.connectedCallback();

      await reactInWebComponentElement.reactRootPromise;

      await expect(
        reactInWebComponentElement.reactRootPromise,
      ).resolves.not.toThrow();
    });

    test("init -> disconnect fails", async () => {
      const reactInWebComponentElement = renderReactInWebComponent({
        getReactComponent: () => <div></div>,
        webComponentRootElement: rootElement,
      });

      reactInWebComponentElement.disconnectedCallback();

      await expect(
        reactInWebComponentElement.reactRootPromise,
      ).rejects.toThrow();
    });

    test("init -> connect -> connect fails", async () => {
      const reactInWebComponentElement = renderReactInWebComponent({
        getReactComponent: () => <div></div>,
        webComponentRootElement: rootElement,
      });

      reactInWebComponentElement.connectedCallback();
      reactInWebComponentElement.connectedCallback();

      await expect(
        reactInWebComponentElement.reactRootPromise,
      ).rejects.toThrow();
    });

    test("init -> connect -> disconnect -> disconnect fails", async () => {
      const reactInWebComponentElement = renderReactInWebComponent({
        getReactComponent: () => <div></div>,
        webComponentRootElement: rootElement,
      });

      reactInWebComponentElement.connectedCallback();
      reactInWebComponentElement.disconnectedCallback();
      reactInWebComponentElement.disconnectedCallback();

      await expect(
        reactInWebComponentElement.reactRootPromise,
      ).rejects.toThrow();
    });
  });
});
