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
import { appRootElementId } from "../web-component/createReactRootElements.js";
import {
  versionedWebComponentName,
  webComponentDataAttributeName,
} from "../web-component/renderReactInWebComponent.js";
import { renderUiShell } from "./renderUiShell.js";

const webComponentSelector = `[${webComponentDataAttributeName}]`;

// `parentElement` in every test is tagged via `appendToSandbox` so the global
// afterEach in `vitest-browser-setup.ts` removes it.
describe(renderUiShell.name, () => {
  test("`UiShell` renders after `onRender`", async () => {
    const nonce = "test-nonce";
    globalThis.cspNonce = nonce;
    const onRender = vi.fn();
    // If this isn't appended to the DOM, the React app won't exist because of how Web Components run.
    const parentElement = appendToSandbox(document.createElement("div"));

    expect(parentElement.innerHTML).toBe("");

    const { uiShellElement } = renderUiShell({
      appElementScrollingMode: "vertical",
      onRender,
      parentElement,
    });

    expect(parentElement.innerHTML).not.toBe("");
    expect(uiShellElement).toHaveAttribute("nonce", nonce);
    expect(
      uiShellElement.shadowRoot!.getElementById(appRootElementId)!.innerHTML,
    ).toBe("");

    await vi.waitFor(() => {
      expect(onRender).toHaveBeenCalled();
    });

    expect(
      uiShellElement.shadowRoot!.getElementById(appRootElementId)!.innerHTML,
    ).not.toBe("");

    expect(onRender).toHaveBeenCalledTimes(1);
  });

  test("`onRender` contains UI Shell return values", async () => {
    const nonce = "test-nonce-2";
    const onRender =
      vi.fn<NonNullable<Parameters<typeof renderUiShell>[0]["onRender"]>>();
    // If this isn't appended to the DOM, the React app won't exist because of how Web Components run.
    const parentElement = appendToSandbox(document.createElement("div"));

    const { uiShellElement } = renderUiShell({
      appElementScrollingMode: "vertical",
      onRender,
      parentElement,
      nonce,
    });

    expect(uiShellElement).toHaveAttribute("nonce", nonce);

    await vi.waitFor(() => {
      expect(onRender).toHaveBeenCalled();
    });

    const {
      appElement,
      closeRightSideMenu,
      closeSideNavMenu,
      setComponentProps,
      slottedElements,
      uiShellElement: returnedUiShellElement,
    } = onRender.mock.calls[0][0];

    expect(appElement).toBeInstanceOf(HTMLDivElement);
    expect(closeRightSideMenu).toBeInstanceOf(Function);
    expect(closeSideNavMenu).toBeInstanceOf(Function);
    expect(setComponentProps).toBeInstanceOf(Function);
    expect(slottedElements).toBeInstanceOf(Object);
    expect(returnedUiShellElement).toHaveAttribute(
      webComponentDataAttributeName,
    );
  });

  test("returns app's element", () => {
    // If this isn't appended to the DOM, the React app won't exist because of how Web Components run.
    const parentElement = appendToSandbox(document.createElement("div"));

    const { appElement } = renderUiShell({
      appElementScrollingMode: "vertical",
      parentElement,
    });

    expect(appElement).toBeInstanceOf(HTMLDivElement);
  });

  test("returns slotted elements from inside the web component", () => {
    // If this isn't appended to the DOM, the React app won't exist because of how Web Components run.
    const parentElement = appendToSandbox(document.createElement("div"));

    const { slottedElements } = renderUiShell({
      appElementScrollingMode: "vertical",
      parentElement,
    });

    expect(slottedElements.banners).toBeInstanceOf(HTMLDivElement);
    expect(slottedElements.sideNavFooter).toBeInstanceOf(HTMLDivElement);
    expect(slottedElements.topNavLeftSide).toBeInstanceOf(HTMLDivElement);
    expect(slottedElements.topNavRightSide).toBeInstanceOf(HTMLDivElement);
  });

  test("returns UI Shell web component element", () => {
    // If this isn't appended to the DOM, the React app won't exist because of how Web Components run.
    const parentElement = appendToSandbox(document.createElement("div"));

    const { uiShellElement } = renderUiShell({
      appElementScrollingMode: "vertical",
      parentElement,
    });

    expect(uiShellElement.elementName).toEqual(versionedWebComponentName);
  });

  test("renders `UiShell` component in a web component", async () => {
    // If this isn't appended to the DOM, the React app won't exist because of how Web Components run.
    const parentElement = appendToSandbox(document.createElement("div"));

    renderUiShell({
      appElementScrollingMode: "vertical",
      parentElement,
    });

    await vi.waitFor(() => {
      expect(
        Array.from(
          parentElement.querySelector(webComponentSelector)!.shadowRoot!
            .children,
        ).length,
      ).toBeGreaterThan(0);
    });
  });

  test("renders `UiShell` with updated props", async () => {
    // If this isn't appended to the DOM, the React app won't exist because of how Web Components run.
    const parentElement = appendToSandbox(document.createElement("div"));
    const appName = "Hello World!";

    const { setComponentProps } = renderUiShell({
      appElementScrollingMode: "vertical",
      parentElement,
    });

    setComponentProps({
      sideNavProps: {
        appName,
        sideNavItems: [],
      },
      topNavProps: {},
    });

    await vi.waitFor(() => {
      expect(
        parentElement
          .querySelector(webComponentSelector)!
          .shadowRoot?.getElementById(appRootElementId),
      ).toHaveTextContent(appName);
    });
  });

  test("renders `UiShell` with immediately updated props", async () => {
    // If this isn't appended to the DOM, the React app won't exist because of how Web Components run.
    const parentElement = appendToSandbox(document.createElement("div"));
    const appName = "Hello World!";

    const { setComponentProps } = renderUiShell({
      appElementScrollingMode: "vertical",
      parentElement,
    });

    setComponentProps({
      sideNavProps: {
        appName,
        sideNavItems: [],
      },
      topNavProps: {},
    });

    await vi.waitFor(() => {
      expect(
        parentElement
          .querySelector(webComponentSelector)!
          .shadowRoot?.getElementById(appRootElementId),
      ).toHaveTextContent(appName);
    });
  });

  test("renders `<div>` in the event of an error", async () => {
    const onError = vi.fn();
    const testBreakError = new Error("TEST BREAK!");

    // If this isn't appended to the DOM, the React app won't exist because of how Web Components run.
    const parentElement = appendToSandbox(document.createElement("div"));

    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(vi.fn());

    const { setComponentProps } = renderUiShell({
      appElementScrollingMode: "vertical",
      onError,
      parentElement,
    });

    setComponentProps(
      // We're purposefully testing an error state, so we need to send something that will cause an error.
      () => {
        throw testBreakError;
      },
    );

    await vi.waitFor(() => {
      expect(onError).toHaveBeenCalledTimes(1);

      expect(
        parentElement
          .querySelector(webComponentSelector)!
          .shadowRoot?.querySelector("[data-error]"),
      ).toBeInstanceOf(HTMLDivElement);
    });

    consoleErrorSpy.mockRestore();
  });
});
