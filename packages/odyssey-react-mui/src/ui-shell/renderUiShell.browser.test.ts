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

import { act, waitFor } from "@testing-library/react";

import { renderUiShell } from "./renderUiShell.js";
import {
  webComponentDataAttributeName,
  versionedWebComponentName,
} from "../web-component/renderReactInWebComponent.js";
import { appRootElementId } from "../web-component/createReactRootElements.js";
const webComponentSelector = `[${webComponentDataAttributeName}]`;

describe(renderUiShell.name, () => {
  afterEach(async () => {
    // This needs to be wrapped in `act` because the web component unmounts the React app, and React events have to be wrapped in `act`.
    await act(async () => {
      // Remove any appended elements because of this hacky process of rendering to the global DOM.
      document.body.innerHTML = "";
      await Promise.resolve();
    });
  });

  test("notifies on render", () => {
    const parentElement = document.createElement("div");

    // If this isn't appended to the DOM, the React app won't exist because of how Web Components run.
    document.body.append(parentElement);

    const onRender = vi.fn();

    renderUiShell({
      appElementScrollingMode: "vertical",
      onRender,
      parentElement,
    });

    waitFor(() => {
      expect(onRender).toHaveBeenCalled();
    });
  });

  test("returns app's element", () => {
    const parentElement = document.createElement("div");

    // If this isn't appended to the DOM, the React app won't exist because of how Web Components run.
    document.body.append(parentElement);

    act(() => {
      const { appElement } = renderUiShell({
        appElementScrollingMode: "vertical",
        parentElement,
      });

      expect(appElement).toBeInstanceOf(HTMLDivElement);
    });
  });

  test("returns slotted elements from inside the web component", () => {
    const parentElement = document.createElement("div");

    // If this isn't appended to the DOM, the React app won't exist because of how Web Components run.
    document.body.append(parentElement);

    act(() => {
      const { slottedElements } = renderUiShell({
        appElementScrollingMode: "vertical",
        parentElement,
      });

      expect(slottedElements.banners).toBeInstanceOf(HTMLDivElement);
      expect(slottedElements.sideNavFooter).toBeInstanceOf(HTMLDivElement);
      expect(slottedElements.topNavLeftSide).toBeInstanceOf(HTMLDivElement);
      expect(slottedElements.topNavRightSide).toBeInstanceOf(HTMLDivElement);
    });
  });

  test("returns UI Shell web component element", () => {
    const parentElement = document.createElement("div");

    // If this isn't appended to the DOM, the React app won't exist because of how Web Components run.
    document.body.append(parentElement);

    act(() => {
      const { uiShellElement } = renderUiShell({
        appElementScrollingMode: "vertical",
        parentElement,
      });

      expect(uiShellElement.elementName).toEqual(versionedWebComponentName);
    });
  });

  test("renders `UiShell` component in a web component", () => {
    const parentElement = document.createElement("div");

    // If this isn't appended to the DOM, the React app won't exist because of how Web Components run.
    document.body.append(parentElement);

    // This needs to be wrapped in `act` because the web component mounts the React app, and React events have to be wrapped in `act`.
    act(() => {
      renderUiShell({
        appElementScrollingMode: "vertical",
        parentElement,
      });
    });

    expect(
      Array.from(
        parentElement.querySelector(webComponentSelector)!.shadowRoot!.children,
      ).length,
    ).toBeGreaterThan(0);
  });

  test("renders `UiShell` with updated props", async () => {
    const parentElement = document.createElement("div");
    const appName = "Hello World!";

    // If this isn't appended to the DOM, the React app won't exist because of how Web Components run.
    document.body.append(parentElement);

    let setComponentProps: ReturnType<
      typeof renderUiShell
    >["setComponentProps"];

    // This needs to be wrapped in `act` because the web component mounts the React app, and React events have to be wrapped in `act`.
    act(() => {
      const renderUiShellReturnValue = renderUiShell({
        appElementScrollingMode: "vertical",
        parentElement,
      });

      setComponentProps = renderUiShellReturnValue.setComponentProps;
    });

    await act(async () => {
      await Promise.resolve();

      setComponentProps({
        sideNavProps: {
          appName,
          sideNavItems: [],
        },
        topNavProps: {},
      });
    });

    await waitFor(() => {
      expect(
        parentElement
          .querySelector(webComponentSelector)!
          .shadowRoot?.getElementById(appRootElementId),
      ).toHaveTextContent(appName);
    });
  });

  test("renders `UiShell` with immediately updated props", async () => {
    const parentElement = document.createElement("div");
    const appName = "Hello World!";

    // If this isn't appended to the DOM, the React app won't exist because of how Web Components run.
    document.body.append(parentElement);

    // This needs to be wrapped in `act` because the web component mounts the React app, and React events have to be wrapped in `act`.
    act(() => {
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
    });

    await waitFor(() => {
      expect(
        parentElement
          .querySelector(webComponentSelector)!
          .shadowRoot?.getElementById(appRootElementId),
      ).toHaveTextContent(appName);
    });
  });

  test("renders `<div>` in the event of an error", async () => {
    const consoleError = vi.fn();
    const onError = vi.fn();
    const testBreakError = new Error("TEST BREAK!");

    const parentElement = document.createElement("div");

    // If this isn't appended to the DOM, the React app won't exist because of how Web Components run.
    document.body.append(parentElement);

    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(consoleError);

    act(() => {
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
    });

    await waitFor(() => {
      expect(onError).toHaveBeenCalledTimes(1);

      expect(consoleError).toHaveBeenCalledWith(testBreakError);

      expect(
        parentElement
          .querySelector(webComponentSelector)!
          .shadowRoot?.querySelector("[data-error]"),
      ).toBeInstanceOf(HTMLDivElement);
    });

    consoleErrorSpy.mockRestore();
  });
});
