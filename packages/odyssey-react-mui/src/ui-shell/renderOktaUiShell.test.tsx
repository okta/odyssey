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

import { captureConsoleError } from "../test-utils/captureConsoleError";
import { reactInWebComponentElementName } from "../web-component/renderReactInWebComponent";
import { renderOktaUiShell } from "./renderOktaUiShell";

describe("renderOktaUiShell", () => {
  afterEach(() => {
    // This needs to be wrapped in `act` because the web component unmounts the React app, and React events have to be wrapped in `act`.
    act(() => {
      // Remove any appended elements because of this hacky process of rendering to the global DOM.
      document.body.innerHTML = "";
    });
  });

  test("renders `OktaUiShell` component in a web component", async () => {
    const rootElement = document.createElement("div");

    // If this isn't appended to the DOM, the React app won't exist because of how Web Components run.
    document.body.append(rootElement);

    // This needs to be wrapped in `act` because the web component mounts the React app, and React events have to be wrapped in `act`.
    act(() => {
      renderOktaUiShell({
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

  test("renders `OktaUiShell` with updated props", async () => {
    const rootElement = document.createElement("div");
    const navHeaderText = "Hello World!";

    // If this isn't appended to the DOM, the React app won't exist because of how Web Components run.
    document.body.append(rootElement);

    let setComponentProps: ReturnType<
      typeof renderOktaUiShell
    >["setComponentProps"];

    // This needs to be wrapped in `act` because the web component mounts the React app, and React events have to be wrapped in `act`.
    act(() => {
      const renderOktaUiShellReturnValue = renderOktaUiShell({
        rootElement,
      });

      setComponentProps = renderOktaUiShellReturnValue.setComponentProps;
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

  test("renders `OktaUiShell` with immediately updated props", async () => {
    const rootElement = document.createElement("div");
    const navHeaderText = "Hello World!";

    // If this isn't appended to the DOM, the React app won't exist because of how Web Components run.
    document.body.append(rootElement);

    // This needs to be wrapped in `act` because the web component mounts the React app, and React events have to be wrapped in `act`.
    act(() => {
      const { setComponentProps } = renderOktaUiShell({
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
    const onError = jest.fn();

    // If this isn't appended to the DOM, the React app won't exist because of how Web Components run.
    document.body.append(rootElement);

    const replacementConsoleError = jest.fn();

    captureConsoleError({
      callback: () => {
        // This needs to be wrapped in `act` because the web component mounts the React app, and React events have to be wrapped in `act`.
        act(() => {
          const { setComponentProps } = renderOktaUiShell({
            onError,
            rootElement,
          });

          setComponentProps(
            // @ts-expect-error We're purposefully testing an error state, so we need to send something that will cause an error.
            null,
          );
        });
      },
      replacementConsoleError,
    });

    expect(onError).toHaveBeenCalledTimes(1);
    expect(replacementConsoleError).toHaveBeenCalledTimes(1);
    expect(
      rootElement
        .querySelector(reactInWebComponentElementName)!
        .shadowRoot?.querySelector("slot"),
    ).toBeInstanceOf(HTMLSlotElement);
  });
});
