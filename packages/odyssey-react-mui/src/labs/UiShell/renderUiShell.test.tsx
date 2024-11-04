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

import { act } from "@testing-library/react";

import { renderUiShell } from "./renderUiShell";
import {
  ReactInWebComponentElement,
  reactWebComponentElementName,
} from "../../web-component/renderReactInWebComponent";

describe("renderUiShell", () => {
  afterEach(() => {
    // This needs to be wrapped in `act` because the web component unmounts the React app, and React events have to be wrapped in `act`.
    act(() => {
      // Remove any appended elements because of this hacky process of rendering to the global DOM.
      document.body.innerHTML = "";
    });
  });

  test("returns app root element", async () => {
    const rootElement = document.createElement("div");

    // If this isn't appended to the DOM, the React app won't exist because of how Web Components run.
    document.body.append(rootElement);

    act(() => {
      const { appRootElement } = renderUiShell({
        uiShellRootElement: rootElement,
      });

      expect(appRootElement).toBeInstanceOf(HTMLDivElement);
    });
  });

  test("returns slotted elements", async () => {
    const rootElement = document.createElement("div");

    // If this isn't appended to the DOM, the React app won't exist because of how Web Components run.
    document.body.append(rootElement);

    act(() => {
      const { slottedElements } = renderUiShell({
        uiShellRootElement: rootElement,
      });

      expect(slottedElements.banners).toBeInstanceOf(HTMLDivElement);
      expect(slottedElements.sideNavFooter).toBeInstanceOf(HTMLDivElement);
      expect(slottedElements.topNavLeftSide).toBeInstanceOf(HTMLDivElement);
      expect(slottedElements.topNavRightSide).toBeInstanceOf(HTMLDivElement);
    });
  });

  test("returns ui shell root element", async () => {
    const rootElement = document.createElement("div");

    // If this isn't appended to the DOM, the React app won't exist because of how Web Components run.
    document.body.append(rootElement);

    act(() => {
      const { uiShellElement } = renderUiShell({
        uiShellRootElement: rootElement,
      });

      expect(uiShellElement).toBeInstanceOf(ReactInWebComponentElement);
    });
  });

  test("renders `UiShell` component in a web component", async () => {
    const rootElement = document.createElement("div");

    // If this isn't appended to the DOM, the React app won't exist because of how Web Components run.
    document.body.append(rootElement);

    // This needs to be wrapped in `act` because the web component mounts the React app, and React events have to be wrapped in `act`.
    act(() => {
      renderUiShell({
        uiShellRootElement: rootElement,
      });
    });

    expect(
      Array.from(
        rootElement.querySelector(reactWebComponentElementName)!.shadowRoot!
          .children,
      ).length,
    ).toBeGreaterThan(0);
  });

  test("renders `UiShell` with updated props", async () => {
    const rootElement = document.createElement("div");
    const appName = "Hello World!";

    // If this isn't appended to the DOM, the React app won't exist because of how Web Components run.
    document.body.append(rootElement);

    let setComponentProps: ReturnType<
      typeof renderUiShell
    >["setComponentProps"];

    // This needs to be wrapped in `act` because the web component mounts the React app, and React events have to be wrapped in `act`.
    act(() => {
      const renderUiShellReturnValue = renderUiShell({
        uiShellRootElement: rootElement,
      });

      setComponentProps = renderUiShellReturnValue.setComponentProps;
    });

    act(() => {
      setComponentProps({
        sideNavProps: {
          appName,
          sideNavItems: [],
        },
        topNavProps: {},
      });
    });

    expect(
      rootElement.querySelector(reactWebComponentElementName)!.shadowRoot,
    ).toHaveTextContent(appName);
  });

  test("renders `UiShell` with immediately updated props", async () => {
    const rootElement = document.createElement("div");
    const appName = "Hello World!";

    // If this isn't appended to the DOM, the React app won't exist because of how Web Components run.
    document.body.append(rootElement);

    // This needs to be wrapped in `act` because the web component mounts the React app, and React events have to be wrapped in `act`.
    act(() => {
      const { setComponentProps } = renderUiShell({
        uiShellRootElement: rootElement,
      });

      setComponentProps({
        sideNavProps: {
          appName,
          sideNavItems: [],
        },
        topNavProps: {},
      });
    });

    expect(
      rootElement.querySelector(reactWebComponentElementName)!.shadowRoot,
    ).toHaveTextContent(appName);
  });

  test("renders `<slot>` in the event of an error", async () => {
    const rootElement = document.createElement("div");
    const consoleError = jest.fn();
    const onError = jest.fn();

    // If this isn't appended to the DOM, the React app won't exist because of how Web Components run.
    document.body.append(rootElement);

    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(consoleError);

    await act(() => {
      const { setComponentProps } = renderUiShell({
        onError,
        uiShellRootElement: rootElement,
      });

      setComponentProps(
        // We're purposefully testing an error state, so we need to send something that will cause an error.
        () => {
          throw new Error("TEST BREAK!");
        },
      );
    });

    consoleErrorSpy.mockRestore();

    expect(onError).toHaveBeenCalledTimes(1);
    expect(consoleError).toHaveBeenCalledTimes(1);
    expect(
      rootElement
        .querySelector(reactWebComponentElementName)!
        .shadowRoot?.querySelector("slot"),
    ).toBeInstanceOf(HTMLSlotElement);
  });
});
