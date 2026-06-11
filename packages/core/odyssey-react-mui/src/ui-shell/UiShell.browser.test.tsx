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

import { type ReactElement } from "react";
import { render } from "vitest-browser-react";
import { page, userEvent } from "vitest/browser";

import { i18n, translate as odysseyTranslate } from "../i18n.generated/i18n.js";
import { AddCircleIcon } from "../icons.generated/AddCircle.js";
import { appendToSandbox } from "../test-utils/appendToSandbox.js";
import { defaultComponentProps, UiShell, UiShellProps } from "./UiShell.js";
import { defaultUiShellBreakpointConfig } from "./useUiShellBreakpoints.js";

const getTestDomElements = () => {
  // Tagged via `appendToSandbox` so the global afterEach removes it.
  const rootElement = appendToSandbox(document.createElement("div"));
  const appElement = appendToSandbox(document.createElement("div"));

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
  describe("Rendering", () => {
    test("renders `uiShellStylesElement`", async () => {
      const { appElement, uiShellAppElement, uiShellStylesElement } =
        getTestDomElements();

      const { container } = await render(
        <UiShell
          appElement={appElement}
          appElementScrollingMode="vertical"
          onSubscriptionCreated={() => {}}
          subscribeToPropChanges={() => () => {}}
          uiShellAppElement={uiShellAppElement}
          uiShellStylesElement={uiShellStylesElement}
        />,
      );

      await expect(container).toBeAccessible();

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

      await render(
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

      await Promise.all(
        optionalComponentTestIds.map((testId) =>
          expect.element(page.getByTestId(testId)).toBeInTheDocument(),
        ),
      );
    });

    test("renders optionally-available `componentSlots`", async () => {
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

      await render(
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

      await Promise.all(
        optionalComponentTestIds.map((testId) =>
          expect.element(page.getByTestId(testId)).toBeInTheDocument(),
        ),
      );
    });

    test("unsubscribes from prop changes when unmounted", async () => {
      const { appElement, uiShellAppElement, uiShellStylesElement } =
        getTestDomElements();

      const unsubscribeFromPropChanges = vi.fn();
      const subscribeToPropChanges = vi.fn(() => unsubscribeFromPropChanges);

      const { unmount } = await render(
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

    test("allows changing props through the subscription", async () => {
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

      const { container } = await render(
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

    test("uses default props if no value passed to subscription", async () => {
      const { appElement, uiShellAppElement, uiShellStylesElement } =
        getTestDomElements();

      // This is the subscription we give the component, and then once subscribed, we're going to immediately call it to see if it passes us the previous state.
      const subscribeToPropChanges: UiShellProps["subscribeToPropChanges"] = (
        subscriber,
      ) => {
        // @ts-expect-error This unit test is checking what happens when we don't pass a value.
        subscriber();

        return () => {};
      };

      const { container } = await render(
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

    test("renders shell-rendered chrome in the language from `subscribeToTranslationSettings`", async () => {
      const { appElement, uiShellAppElement, uiShellStylesElement } =
        getTestDomElements();

      const subscribeToTranslationSettings: UiShellProps["subscribeToTranslationSettings"] =
        (subscriber) => {
          subscriber({ languageCode: "fr" });
          return () => {};
        };

      const { container } = await render(
        <UiShell
          appElement={appElement}
          appElementScrollingMode="vertical"
          onSubscriptionCreated={() => {}}
          subscribeToPropChanges={() => () => {}}
          subscribeToTranslationSettings={subscribeToTranslationSettings}
          uiShellAppElement={uiShellAppElement}
          uiShellStylesElement={uiShellStylesElement}
        />,
      );

      const expectedFrenchSkipLink = i18n.getResource(
        "fr",
        "odyssey-react-mui",
        "skiplinks.main",
      ) as string;

      expect(container).toHaveTextContent(expectedFrenchSkipLink);
    });

    test("unsubscribes from translation settings when unmounted", async () => {
      const { appElement, uiShellAppElement, uiShellStylesElement } =
        getTestDomElements();

      const unsubscribeFromTranslationSettings = vi.fn();
      const subscribeToTranslationSettings = vi.fn(
        () => unsubscribeFromTranslationSettings,
      );

      const { unmount } = await render(
        <UiShell
          appElement={appElement}
          appElementScrollingMode="vertical"
          onSubscriptionCreated={() => {}}
          subscribeToPropChanges={() => () => {}}
          subscribeToTranslationSettings={subscribeToTranslationSettings}
          uiShellAppElement={uiShellAppElement}
          uiShellStylesElement={uiShellStylesElement}
        />,
      );

      unmount();

      expect(subscribeToTranslationSettings).toHaveBeenCalledTimes(1);
      expect(unsubscribeFromTranslationSettings).toHaveBeenCalledTimes(1);
    });

    test("notifies on subscription creation", async () => {
      const { appElement, uiShellAppElement, uiShellStylesElement } =
        getTestDomElements();

      // This passed to React's state setter. The return value here prevents a test error. It wouldn't be required otherwise as this test could care less what's returned.
      const onSubscriptionCreated = vi.fn();

      await render(
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

    test("has previous state in prop change subscription", async () => {
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

      await render(
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

      await render(
        <UiShell
          appElement={appElement}
          appElementScrollingMode="both"
          onSubscriptionCreated={() => {}}
          subscribeToPropChanges={() => () => {}}
          uiShellAppElement={uiShellAppElement}
          uiShellStylesElement={uiShellStylesElement}
        />,
      );

      await vi.waitFor(() => {
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

      await render(
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

      await vi.waitFor(() => {
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

    const renderSideNav = async () => {
      const { appElement, uiShellAppElement, uiShellStylesElement } =
        getTestDomElements();

      await render(
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
    };

    test("narrow width", async () => {
      await page.viewport(
        defaultUiShellBreakpointConfig.medium - 1,
        PAGE_HEIGHT,
      );

      await renderSideNav();

      // No app name in narrow view
      await expect.element(page.getByText(itemLabel)).not.toBeVisible();
    });

    test("medium width", async () => {
      await page.viewport(defaultUiShellBreakpointConfig.medium, PAGE_HEIGHT);

      await renderSideNav();

      // TODO: fix a11y — SideNav hides collapsed content with opacity:0, which is still
      // perceivable by screen readers. Use visibility:hidden or remove from DOM instead.
      await expect
        .element(
          page.elementLocator(
            document.querySelector('[data-se="collapsible-region"]')!,
          ),
        )
        .toHaveStyle({ opacity: "0" });
    });

    test("wide width", async () => {
      await page.viewport(defaultUiShellBreakpointConfig.wide, PAGE_HEIGHT);

      await renderSideNav();

      await expect.element(page.getByText(appName)).toBeVisible();
      await expect.element(page.getByText(itemLabel)).toBeVisible();
    });
  });

  describe("Keyboard Interactions", () => {
    const appName = "My Test App";
    const itemLabel = "Add new folder";
    const PAGE_HEIGHT = 1000;

    test("closes left side menu in narrow view when Escape key is pressed", async () => {
      await page.viewport(
        defaultUiShellBreakpointConfig.medium - 1,
        PAGE_HEIGHT,
      );

      const { appElement, uiShellAppElement, uiShellStylesElement } =
        getTestDomElements();

      await render(
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
                sideNavItems: [
                  {
                    id: "item1",
                    label: itemLabel,
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

      await userEvent.click(
        page.getByRole("button", {
          name: odysseyTranslate("topnav.sidenavmenu.toggle"),
        }),
      );

      await expect.element(page.getByText(itemLabel)).toBeVisible();

      await userEvent.keyboard("{Escape}");

      await expect.element(page.getByText(itemLabel)).not.toBeVisible();
    });

    test("closes right side menu in narrow view when Escape key is pressed", async () => {
      await page.viewport(
        defaultUiShellBreakpointConfig.medium - 1,
        PAGE_HEIGHT,
      );

      const { appElement, uiShellAppElement, uiShellStylesElement } =
        getTestDomElements();

      await render(
        <UiShell
          appElement={appElement}
          appElementScrollingMode="none"
          hasStandardAppContentPadding={false}
          onSubscriptionCreated={() => {}}
          optionalComponents={{
            rightSideMenu: <div>{itemLabel}</div>,
          }}
          subscribeToPropChanges={(subscriber) => {
            subscriber(defaultComponentProps);

            return () => {};
          }}
          uiShellAppElement={uiShellAppElement}
          uiShellStylesElement={uiShellStylesElement}
        />,
      );

      await userEvent.click(
        page.getByRole("button", {
          name: odysseyTranslate("topnav.usermenu.toggle"),
        }),
      );

      await expect.element(page.getByText(itemLabel)).toBeVisible();

      await userEvent.keyboard("{Escape}");

      await expect.element(page.getByText(itemLabel)).not.toBeVisible();
    });
  });
});
