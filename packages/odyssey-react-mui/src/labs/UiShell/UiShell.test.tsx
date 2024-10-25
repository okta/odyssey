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

import { render, within } from "@testing-library/react";

import { Dialog } from "../../Dialog";
import { defaultComponentProps, UiShell, UiShellProps } from "./UiShell";
import { ReactElement } from "react";

describe("UiShell", () => {
  test("renders `appRootElement`", async () => {
    const appRootElement = document.createElement("div");

    render(
      <UiShell
        appComponent={<div />}
        appRootElement={appRootElement}
        onSubscriptionCreated={() => {}}
        optionalComponents={{
          additionalTopNavItems: <div />,
          footer: <div />,
          logo: <div />,
          searchField: (
            <Dialog
              children={undefined}
              title="Hello World!"
              isOpen
              onClose={() => {}}
            />
          ),
        }}
        stylesRootElement={document.createElement("div")}
        subscribeToPropChanges={() => () => {}}
      />,
    );

    expect(Array.from(appRootElement.children)).toHaveLength(1);
    expect(appRootElement).toHaveTextContent("Hello World!");
  });

  test("renders `stylesRootElement`", async () => {
    const rootElement = document.createElement("div");

    // If this isn't appended to the DOM, the React app won't exist because of how Web Components run.
    document.body.append(rootElement);

    const stylesRootElement = document.createElement("div");

    render(
      <UiShell
        appComponent={<div />}
        appRootElement={document.createElement("div")}
        onSubscriptionCreated={() => {}}
        stylesRootElement={stylesRootElement}
        subscribeToPropChanges={() => () => {}}
      />,
    );

    expect(Array.from(stylesRootElement.children).length).toBeGreaterThan(0);
  });

  test("renders `appComponent`", async () => {
    const testId = "app-component";

    const { container } = render(
      <UiShell
        appComponent={<div data-testid={testId} />}
        appRootElement={document.createElement("div")}
        onSubscriptionCreated={() => {}}
        stylesRootElement={document.createElement("div")}
        subscribeToPropChanges={() => () => {}}
      />,
    );

    expect(within(container).getByTestId(testId)).toBeInTheDocument();
  });

  test("renders `componentSlots`", async () => {
    const optionalComponentTestIds: Array<
      keyof Required<UiShellProps>["optionalComponents"]
    > = ["additionalTopNavItems", "footer", "logo", "searchField"];

    const { container } = render(
      <UiShell
        appComponent={<div />}
        appRootElement={document.createElement("div")}
        onSubscriptionCreated={() => {}}
        optionalComponents={
          Object.fromEntries(
            optionalComponentTestIds.map((testId) => [
              testId,
              <div data-testid={testId} />,
            ]),
          ) as Record<keyof UiShellProps["optionalComponents"], ReactElement>
        }
        stylesRootElement={document.createElement("div")}
        subscribeToPropChanges={() => () => {}}
      />,
    );

    optionalComponentTestIds.forEach((testId) => {
      expect(within(container).getByTestId(testId)).toBeInTheDocument();
    });
  });
  test("unsubscribes from prop changes when unmounted", async () => {
    const rootElement = document.createElement("div");

    // If this isn't appended to the DOM, the React app won't exist because of how Web Components run.
    document.body.append(rootElement);

    const unsubscribeFromPropChanges = jest.fn();
    const subscribeToPropChanges = jest.fn(() => unsubscribeFromPropChanges);

    const { unmount } = render(
      <UiShell
        appComponent={<div />}
        appRootElement={document.createElement("div")}
        onSubscriptionCreated={() => {}}
        stylesRootElement={document.createElement("div")}
        subscribeToPropChanges={subscribeToPropChanges}
      />,
    );

    unmount();

    expect(subscribeToPropChanges).toHaveBeenCalledTimes(1);
    expect(unsubscribeFromPropChanges).toHaveBeenCalledTimes(1);
  });

  test("allows changing props through the subscription", async () => {
    const rootElement = document.createElement("div");
    const sideNavItemText = "Add New Folder";

    // If this isn't appended to the DOM, the React app won't exist because of how Web Components run.
    document.body.append(rootElement);

    // This is the subscription we give the component, and then once subscribed, we're going to immediately call it with new props.
    const subscribeToPropChanges: UiShellProps["subscribeToPropChanges"] = (
      subscriber,
    ) => {
      subscriber({
        ...defaultComponentProps,
        sideNavProps: {
          navHeaderText: "",
          sideNavItems: [
            {
              id: "AddNewFolder",
              label: sideNavItemText,
              onClick: () => {},
            },
          ],
        },
      });

      return () => {};
    };

    const { container } = render(
      <UiShell
        appComponent={<div />}
        appRootElement={document.createElement("div")}
        onSubscriptionCreated={() => {}}
        stylesRootElement={document.createElement("div")}
        subscribeToPropChanges={subscribeToPropChanges}
      />,
    );

    expect(container).toHaveTextContent(sideNavItemText);
  });

  test("uses default props if no value passed to subscription", async () => {
    const rootElement = document.createElement("div");

    // If this isn't appended to the DOM, the React app won't exist because of how Web Components run.
    document.body.append(rootElement);

    // This is the subscription we give the component, and then once subscribed, we're going to immediately call it with new props.
    const subscribeToPropChanges: UiShellProps["subscribeToPropChanges"] = (
      subscriber,
    ) => {
      // @ts-expect-error This unit test is checking what happens when we don't pass a value.
      subscriber();

      return () => {};
    };

    const { container } = render(
      <UiShell
        appComponent={<div />}
        appRootElement={document.createElement("div")}
        onSubscriptionCreated={() => {}}
        stylesRootElement={document.createElement("div")}
        subscribeToPropChanges={subscribeToPropChanges}
      />,
    );

    expect(container).toBeInTheDocument();
  });

  test("has previous state in prop change subscription", async () => {
    const rootElement = document.createElement("div");

    // If this isn't appended to the DOM, the React app won't exist because of how Web Components run.
    document.body.append(rootElement);

    // This passed to React's state setter. The return value here prevents a test error. It wouldn't be required otherwise as this test could care less what's returned.
    const stateUpdater = jest.fn(() => defaultComponentProps);

    // This is the subscription we give the component, and then once subscribed, we're going to immediately call it to see if it passes us the previous state.
    const subscribeToPropChanges: UiShellProps["subscribeToPropChanges"] = (
      subscriber,
    ) => {
      subscriber(stateUpdater);

      return () => {};
    };

    render(
      <UiShell
        appComponent={<div />}
        appRootElement={document.createElement("div")}
        onSubscriptionCreated={() => {}}
        stylesRootElement={document.createElement("div")}
        subscribeToPropChanges={subscribeToPropChanges}
      />,
    );

    expect(stateUpdater).toHaveBeenCalledWith(defaultComponentProps);
    expect(stateUpdater).toHaveBeenCalledTimes(1);
  });
});
