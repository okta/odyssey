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

import { render } from "@testing-library/react";

import { Dialog } from "./Dialog";
import {
  defaultComponentProps,
  OktaUiShell,
  OktaUiShellProps,
} from "./OktaUiShell";

describe("OktaUiShell", () => {
  test("renders the `appRootElement`", async () => {
    const subscribeToPropChanges: OktaUiShellProps["subscribeToPropChanges"] = (
      subscription,
    ) => {
      subscription({
        ...defaultComponentProps,
        topNavProps: {
          ...defaultComponentProps.topNavProps,
          SearchFieldComponent: (
            <Dialog
              children={undefined}
              title="Hello World!"
              isOpen
              onClose={() => {}}
            />
          ),
        },
      });

      return () => {};
    };

    const appRootElement = document.createElement("div");

    render(
      <OktaUiShell
        appRootElement={appRootElement}
        emotionRootElement={document.createElement("div")}
        subscribeToPropChanges={subscribeToPropChanges}
      />,
    );

    expect(Array.from(appRootElement.children)).toHaveLength(1);
    expect(appRootElement).toHaveTextContent("Hello World!");
  });

  test("renders the `emotionRootElement`", async () => {
    const rootElement = document.createElement("div");

    // If this isn't appended to the DOM, the React app won't exist because of how Web Components run.
    document.body.append(rootElement);

    const emotionRootElement = document.createElement("div");

    render(
      <OktaUiShell
        appRootElement={document.createElement("div")}
        emotionRootElement={emotionRootElement}
        subscribeToPropChanges={() => () => {}}
      />,
    );

    expect(Array.from(emotionRootElement.children).length).toBeGreaterThan(0);
  });

  test("Unsubscribes from prop changes when unmounted", async () => {
    const rootElement = document.createElement("div");

    // If this isn't appended to the DOM, the React app won't exist because of how Web Components run.
    document.body.append(rootElement);

    const unsubscribeFromPropChanges = jest.fn();
    const subscribeToPropChanges = jest.fn(() => unsubscribeFromPropChanges);

    const { unmount } = render(
      <OktaUiShell
        appRootElement={document.createElement("div")}
        emotionRootElement={document.createElement("div")}
        subscribeToPropChanges={subscribeToPropChanges}
      />,
    );

    unmount();

    expect(subscribeToPropChanges).toHaveBeenCalledTimes(1);
    expect(unsubscribeFromPropChanges).toHaveBeenCalledTimes(1);
  });
});
