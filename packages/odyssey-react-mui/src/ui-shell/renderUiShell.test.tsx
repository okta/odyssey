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

import { reactInWebComponentElementName } from "../web-component/renderReactInWebComponent";
import { renderUiShell } from "./renderUiShell";

describe("renderUiShell", () => {
  afterEach(() => {
    // This needs to be wrapped in `act` because the web component unmounts the React app, and React events have to be wrapped in `act`.
    act(() => {
      // Remove any appended elements because of this hacky process of rendering to the global DOM.
      document.body.innerHTML = "";
    });
  });

  test("renders `UiShell` component in a web component", async () => {
    const rootElement = document.createElement("div");

    // If this isn't appended to the DOM, the React app won't exist because of how Web Components run.
    document.body.append(rootElement);

    // This needs to be wrapped in `act` because the web component mounts the React app, and React events have to be wrapped in `act`.
    act(() => {
      renderUiShell({
        rootElement,
      });
    });

    expect(
      Array.from(
        rootElement.querySelector(reactInWebComponentElementName)!.shadowRoot!
          .children,
      ).length,
    ).toBeGreaterThan(0);
  });

  test("renders `UiShell` with updated props", async () => {
    const rootElement = document.createElement("div");
    const navHeaderText = "Hello World!";

    // If this isn't appended to the DOM, the React app won't exist because of how Web Components run.
    document.body.append(rootElement);

    let setComponentProps: ReturnType<
      typeof renderUiShell
    >["setComponentProps"];

    // This needs to be wrapped in `act` because the web component mounts the React app, and React events have to be wrapped in `act`.
    act(() => {
      const renderUiShellReturnValue = renderUiShell({
        rootElement,
      });

      setComponentProps = renderUiShellReturnValue.setComponentProps;
    });

    act(() => {
      setComponentProps({
        sideNavProps: {
          navHeaderText,
          sideNavItems: [],
        },
        topNavProps: {
          topNavLinkItems: [],
        },
      });
    });

    expect(
      rootElement.querySelector(reactInWebComponentElementName)!.shadowRoot,
    ).toHaveTextContent(navHeaderText);
  });

  test("renders `UiShell` with immediately updated props", async () => {
    const rootElement = document.createElement("div");
    const navHeaderText = "Hello World!";

    // If this isn't appended to the DOM, the React app won't exist because of how Web Components run.
    document.body.append(rootElement);

    // This needs to be wrapped in `act` because the web component mounts the React app, and React events have to be wrapped in `act`.
    act(() => {
      const { setComponentProps } = renderUiShell({
        rootElement,
      });

      setComponentProps({
        sideNavProps: {
          navHeaderText,
          sideNavItems: [],
        },
        topNavProps: {
          topNavLinkItems: [],
        },
      });
    });

    expect(
      rootElement.querySelector(reactInWebComponentElementName)!.shadowRoot,
    ).toHaveTextContent(navHeaderText);
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

    act(() => {
      const { setComponentProps } = renderUiShell({
        onError,
        rootElement,
      });

      setComponentProps(
        // @ts-expect-error We're purposefully testing an error state, so we need to send something that will cause an error.
        {},
      );
    });

    consoleErrorSpy.mockRestore();

    expect(onError).toHaveBeenCalledTimes(1);
    expect(consoleError).toHaveBeenCalledTimes(1);
    expect(
      rootElement
        .querySelector(reactInWebComponentElementName)!
        .shadowRoot?.querySelector("slot"),
    ).toBeInstanceOf(HTMLSlotElement);
  });
});
