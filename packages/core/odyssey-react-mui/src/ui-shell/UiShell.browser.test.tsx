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

import { act, render, waitFor, within } from "@testing-library/react";
import { page } from "@vitest/browser/context";
import { type ReactElement } from "react";

import { AddCircleIcon } from "../icons.generated/AddCircle.js";
import { defaultComponentProps, UiShell, UiShellProps } from "./UiShell.js";
import { defaultUiShellBreakpointConfig } from "./useUiShellBreakpoints.js";

const getTestDomElements = () => {
  const rootElement = document.createElement("div");

  // If this isn't appended to the DOM, the React app won't exist because of how Web Components run.
  document.body.append(rootElement);

  const appElement = document.createElement("div");

  document.body.append(appElement);

  const uiShellAppElement = document.createElement("div");
  const uiShellStylesElement = document.head;

  return {
    appElement,
    rootElement,
    uiShellAppElement,
    uiShellStylesElement,
  };
};

describe("UiShell", () => {
  afterEach(async () => {
    // This needs to be wrapped in `act` because the web component unmounts the React app, and React events have to be wrapped in `act`.
    await act(async () => {
      // Remove any appended elements because of this hacky process of rendering to the global DOM.
      document.head.innerHTML = "";
      document.body.innerHTML = "";
      sessionStorage.clear();
      return Promise.resolve();
    });
  });

  describe("Rendering", () => {
    test("renders `uiShellStylesElement`", () => {
      const { appElement, uiShellAppElement, uiShellStylesElement } =
        getTestDomElements();

      render(
        <UiShell
          appElement={appElement}
          appElementScrollingMode="vertical"
          onSubscriptionCreated={() => {}}
          subscribeToPropChanges={() => () => {}}
          uiShellAppElement={uiShellAppElement}
          uiShellStylesElement={uiShellStylesElement}
        />,
      );

      expect(Array.from(uiShellStylesElement.children).length).toBeGreaterThan(
        0,
      );
    });

    test("renders always-available `componentSlots`", async () => {
      const { appElement, uiShellAppElement, uiShellStylesElement } =
        getTestDomElements();

      const optionalComponentTestIds: Array<
        keyof Required<UiShellProps>["optionalComponents"]
      > = ["banners", "topNavLeftSide", "topNavRightSide"];

      // This is the subscription we give the component, and then once subscribed, we're going to immediately call it with new props.
      // TopNav won't render unless we pass something into it.
      const subscribeToPropChanges: UiShellProps["subscribeToPropChanges"] = (
        subscriber,
      ) => {
        subscriber({
          ...defaultComponentProps,
          topNavProps: {},
        });

        return () => {};
      };

      const { container } = render(
        <UiShell
          appElement={appElement}
          appElementScrollingMode="vertical"
          onSubscriptionCreated={() => {}}
          optionalComponents={
            Object.fromEntries(
              optionalComponentTestIds.map((testId) => [
                testId,
                <div data-testid={testId} />,
              ]),
            ) as Record<keyof UiShellProps["optionalComponents"], ReactElement>
          }
          subscribeToPropChanges={subscribeToPropChanges}
          uiShellAppElement={uiShellAppElement}
          uiShellStylesElement={uiShellStylesElement}
        />,
      );

      await waitFor(() => {
        optionalComponentTestIds.forEach((testId) => {
          expect(within(container).getByTestId(testId)).toBeVisible();
        });
      });
    });

    test("renders optionally-available `componentSlots`", () => {
      const { appElement, uiShellAppElement, uiShellStylesElement } =
        getTestDomElements();

      const optionalComponentTestIds: Array<
        keyof Required<UiShellProps>["optionalComponents"]
      > = ["sideNavFooter"];

      // This is the subscription we give the component, and then once subscribed, we're going to immediately call it with new props.
      const subscribeToPropChanges: UiShellProps["subscribeToPropChanges"] = (
        subscriber,
      ) => {
        subscriber({
          ...defaultComponentProps,
          sideNavProps: {
            appName: "",
            hasCustomFooter: true,
            sideNavItems: [],
          },
        });

        return () => {};
      };

      const { container } = render(
        <UiShell
          appElement={appElement}
          appElementScrollingMode={"vertical"}
          onSubscriptionCreated={() => {}}
          optionalComponents={
            Object.fromEntries(
              optionalComponentTestIds.map((testId) => [
                testId,
                <div data-testid={testId} />,
              ]),
            ) as Record<keyof UiShellProps["optionalComponents"], ReactElement>
          }
          subscribeToPropChanges={subscribeToPropChanges}
          uiShellAppElement={uiShellAppElement}
          uiShellStylesElement={uiShellStylesElement}
        />,
      );

      optionalComponentTestIds.forEach((testId) => {
        expect(within(container).getByTestId(testId)).toBeVisible();
      });
    });

    test("unsubscribes from prop changes when unmounted", () => {
      const { appElement, uiShellAppElement, uiShellStylesElement } =
        getTestDomElements();

      const unsubscribeFromPropChanges = vi.fn();
      const subscribeToPropChanges = vi.fn(() => unsubscribeFromPropChanges);

      const { unmount } = render(
        <UiShell
          appElement={appElement}
          appElementScrollingMode="vertical"
          onSubscriptionCreated={() => {}}
          subscribeToPropChanges={subscribeToPropChanges}
          uiShellAppElement={uiShellAppElement}
          uiShellStylesElement={uiShellStylesElement}
        />,
      );

      unmount();

      expect(subscribeToPropChanges).toHaveBeenCalledTimes(1);
      expect(unsubscribeFromPropChanges).toHaveBeenCalledTimes(1);
    });

    test("allows changing props through the subscription", () => {
      const { appElement, uiShellAppElement, uiShellStylesElement } =
        getTestDomElements();

      const sideNavItemText = "Add New Folder";

      // This is the subscription we give the component, and then once subscribed, we're going to immediately call it with new props.
      const subscribeToPropChanges: UiShellProps["subscribeToPropChanges"] = (
        subscriber,
      ) => {
        subscriber({
          ...defaultComponentProps,
          sideNavProps: {
            appName: "",
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
          appElement={appElement}
          appElementScrollingMode="vertical"
          onSubscriptionCreated={() => {}}
          subscribeToPropChanges={subscribeToPropChanges}
          uiShellAppElement={uiShellAppElement}
          uiShellStylesElement={uiShellStylesElement}
        />,
      );

      expect(container).toHaveTextContent(sideNavItemText);
    });

    test("uses default props if no value passed to subscription", () => {
      const { appElement, uiShellAppElement, uiShellStylesElement } =
        getTestDomElements();

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
          appElement={appElement}
          appElementScrollingMode="vertical"
          onSubscriptionCreated={() => {}}
          subscribeToPropChanges={subscribeToPropChanges}
          uiShellAppElement={uiShellAppElement}
          uiShellStylesElement={uiShellStylesElement}
        />,
      );

      expect(container).toBeVisible();
    });

    test("notifies on subscription creation", () => {
      const { appElement, uiShellAppElement, uiShellStylesElement } =
        getTestDomElements();

      // This passed to React's state setter. The return value here prevents a test error. It wouldn't be required otherwise as this test could care less what's returned.
      const onSubscriptionCreated = vi.fn();

      render(
        <UiShell
          appElement={appElement}
          appElementScrollingMode="vertical"
          onSubscriptionCreated={onSubscriptionCreated}
          subscribeToPropChanges={() => () => {}}
          uiShellAppElement={uiShellAppElement}
          uiShellStylesElement={uiShellStylesElement}
        />,
      );

      expect(onSubscriptionCreated).toHaveBeenCalledTimes(1);
    });

    test("has previous state in prop change subscription", () => {
      const { appElement, uiShellAppElement, uiShellStylesElement } =
        getTestDomElements();

      // This passed to React's state setter. The return value here prevents a test error. It wouldn't be required otherwise as this test could care less what's returned.
      const stateUpdater = vi.fn(() => defaultComponentProps);

      // This is the subscription we give the component, and then once subscribed, we're going to immediately call it to see if it passes us the previous state.
      const subscribeToPropChanges: UiShellProps["subscribeToPropChanges"] = (
        subscriber,
      ) => {
        subscriber(stateUpdater);

        return () => {};
      };

      render(
        <UiShell
          appElement={appElement}
          appElementScrollingMode="vertical"
          onSubscriptionCreated={() => {}}
          subscribeToPropChanges={subscribeToPropChanges}
          uiShellAppElement={uiShellAppElement}
          uiShellStylesElement={uiShellStylesElement}
        />,
      );

      expect(stateUpdater).toHaveBeenCalledWith(defaultComponentProps);
    });

    test("places expected padding on appElement", async () => {
      const { appElement, uiShellAppElement, uiShellStylesElement } =
        getTestDomElements();

      render(
        <UiShell
          appElement={appElement}
          appElementScrollingMode="both"
          onSubscriptionCreated={() => {}}
          subscribeToPropChanges={() => () => {}}
          uiShellAppElement={uiShellAppElement}
          uiShellStylesElement={uiShellStylesElement}
        />,
      );

      await waitFor(() => {
        expect(appElement.style.getPropertyValue("position")).toBe("absolute");

        expect(appElement.style.getPropertyValue("overflow-x")).toBe("auto");

        expect(appElement.style.getPropertyValue("overflow-y")).toBe("auto");

        expect(appElement.style.getPropertyValue("padding-inline")).toBe(
          "3.42857rem",
        );

        expect(appElement.style.getPropertyValue("padding-block")).toBe(
          "1.71429rem",
        );
      });
    });

    test("places expected padding on appElement", async () => {
      const { appElement, uiShellAppElement, uiShellStylesElement } =
        getTestDomElements();

      render(
        <UiShell
          appElement={appElement}
          appElementScrollingMode="none"
          hasStandardAppContentPadding={false}
          onSubscriptionCreated={() => {}}
          subscribeToPropChanges={() => () => {}}
          uiShellAppElement={uiShellAppElement}
          uiShellStylesElement={uiShellStylesElement}
        />,
      );

      await waitFor(() => {
        expect(appElement.style.getPropertyValue("position")).toBe("absolute");

        expect(appElement.style.getPropertyValue("overflow-x")).toBe("hidden");

        expect(appElement.style.getPropertyValue("overflow-y")).toBe("hidden");

        expect(appElement.style.getPropertyValue("padding-inline")).toBe("");

        expect(appElement.style.getPropertyValue("padding-block")).toBe("");
      });
    });
  });

  describe("SideNav Collapsed State", () => {
    const appName = "My Test App";
    const itemLabel = "Add new folder";
    const PAGE_HEIGHT = 1000;

    const getContainer = () => {
      const { appElement, uiShellAppElement, uiShellStylesElement } =
        getTestDomElements();

      const { container } = render(
        <UiShell
          appElement={appElement}
          appElementScrollingMode="none"
          hasStandardAppContentPadding={false}
          onSubscriptionCreated={() => {}}
          subscribeToPropChanges={(subscriber) => {
            subscriber({
              ...defaultComponentProps,
              sideNavProps: {
                appName,
                // isCollapsed: true,
                sideNavItems: [
                  {
                    id: "item1",
                    label: itemLabel,
                    endIcon: <AddCircleIcon />,
                    onClick: () => {},
                  },
                ],
              },
            });

            return () => {};
          }}
          uiShellAppElement={uiShellAppElement}
          uiShellStylesElement={uiShellStylesElement}
        />,
      );

      return container;
    };

    test("narrow width", async () => {
      await page.viewport(
        defaultUiShellBreakpointConfig.medium - 1,
        PAGE_HEIGHT,
      );

      const container = getContainer();

      await waitFor(() => {
        // No app name in narrow view
        expect(within(container).getByText(itemLabel)).not.toBeVisible();
      });
    });

    test("medium width", async () => {
      await page.viewport(defaultUiShellBreakpointConfig.medium, PAGE_HEIGHT);

      const container = getContainer();

      await waitFor(() => {
        expect(within(container).getByText(appName)).not.toBeVisible();
        expect(within(container).getByText(itemLabel)).not.toBeVisible();
      });
    });

    test("wide width", async () => {
      await page.viewport(defaultUiShellBreakpointConfig.wide, PAGE_HEIGHT);

      const container = getContainer();

      await waitFor(() => {
        expect(within(container).getByText(appName)).toBeVisible();
        expect(within(container).getByText(itemLabel)).toBeVisible();
      });
    });
  });
});
