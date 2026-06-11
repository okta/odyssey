/*!
 * Copyright (c) 2026-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { webComponentDataAttributeName } from "@okta/odyssey-react-mui/web-component";
import { afterEach, describe, expect, test, vi } from "vitest";

import {
  type ModifiedUiShellNavComponentProps,
  renderUiShell,
} from "./renderUiShellWrapped.js";

const webComponentSelector = `[${webComponentDataAttributeName}]`;

const sandboxAttribute = "data-real-test-sandbox";

const appendToSandbox = (element: HTMLElement) => {
  element.setAttribute(sandboxAttribute, "");
  document.body.appendChild(element);
  return element;
};

const findSideNavItemElement = (
  parentElement: HTMLElement,
  navItemText: string,
) => {
  const shadowRootElement =
    parentElement.querySelector(webComponentSelector)!.shadowRoot!;

  const sideNavItemElements = Array.from(
    shadowRootElement.querySelectorAll("a, button"),
  );

  return sideNavItemElements.find((sideNavItemElement) =>
    sideNavItemElement.textContent?.includes(navItemText),
  ) as HTMLElement | undefined;
};

describe("renderUiShell (unified-ui-shell wrapper)", () => {
  afterEach(() => {
    document
      .querySelectorAll(`[${sandboxAttribute}]`)
      .forEach((sandboxElement) => sandboxElement.remove());
  });

  test("renders a real UI Shell web component into the parent element", async () => {
    const parentElement = appendToSandbox(document.createElement("div"));

    renderUiShell({
      appElementScrollingMode: "vertical",
      parentElement,
    });

    await vi.waitFor(() => {
      const webComponent = parentElement.querySelector(webComponentSelector);

      expect(webComponent).not.toBeNull();
      expect(
        Array.from(webComponent!.shadowRoot!.children).length,
      ).toBeGreaterThan(0);
    });
  });

  test("forwards `appElement` to `onRender` so consumers can mount their app", async () => {
    const parentElement = appendToSandbox(document.createElement("div"));
    const onRender = vi.fn();

    renderUiShell({
      appElementScrollingMode: "vertical",
      onRender,
      parentElement,
    });

    await vi.waitFor(() => {
      expect(onRender).toHaveBeenCalledTimes(1);
    });

    const renderedUiShell = onRender.mock.calls[0][0] as Parameters<
      NonNullable<Parameters<typeof renderUiShell>[0]["onRender"]>
    >[0];

    expect(renderedUiShell.appElement).toBeInstanceOf(HTMLElement);
    expect(renderedUiShell.setComponentProps).toBeTypeOf("function");
  });

  test("`startIconName` on a side-nav item resolves to a real Odyssey icon SVG", async () => {
    const parentElement = appendToSandbox(document.createElement("div"));

    const { setComponentProps } = renderUiShell({
      appElementScrollingMode: "vertical",
      parentElement,
    });

    setComponentProps({
      sideNavProps: {
        sideNavItems: [
          {
            id: "home",
            label: "Home",
            href: "#home",
            startIconName: "HomeIcon",
          },
        ],
      },
    } satisfies ModifiedUiShellNavComponentProps);

    await vi.waitFor(() => {
      const homeNavItem = findSideNavItemElement(parentElement, "Home");

      expect(homeNavItem).toBeDefined();

      const iconSvgElement = homeNavItem!.querySelector("svg");

      expect(iconSvgElement).not.toBeNull();
      expect(iconSvgElement!.getAttribute("viewBox")).toBe("0 0 16 16");
    });
  });

  test("`endIconName` on a nested side-nav item resolves to a real Odyssey icon SVG", async () => {
    const parentElement = appendToSandbox(document.createElement("div"));

    const { setComponentProps } = renderUiShell({
      appElementScrollingMode: "vertical",
      parentElement,
    });

    setComponentProps({
      sideNavProps: {
        sideNavItems: [
          {
            id: "settings",
            label: "Settings",
            isDefaultExpanded: true,
            nestedNavItems: [
              {
                id: "settings-profile",
                label: "Profile",
                href: "#profile",
                endIconName: "SettingsIcon",
              },
            ],
          },
        ],
      },
    } satisfies ModifiedUiShellNavComponentProps);

    await vi.waitFor(() => {
      const profileNavItem = findSideNavItemElement(parentElement, "Profile");

      expect(profileNavItem).toBeDefined();

      const iconSvgElement = profileNavItem!.querySelector("svg");

      expect(iconSvgElement).not.toBeNull();
      expect(iconSvgElement!.getAttribute("viewBox")).toBe("0 0 16 16");
    });
  });

  test("an unknown `startIconName` is ignored without crashing the shell", async () => {
    const parentElement = appendToSandbox(document.createElement("div"));

    const { setComponentProps } = renderUiShell({
      appElementScrollingMode: "vertical",
      parentElement,
    });

    setComponentProps({
      sideNavProps: {
        sideNavItems: [
          {
            id: "mystery",
            label: "Mystery",
            href: "#mystery",
            // The `startIconName` type is constrained to known icon keys at the
            // public API; a `DoesNotExistIcon` string is a runtime-only edge
            // case (e.g. a stale config) so we cast through `unknown` to
            // exercise the dictionary-miss branch without weakening the type.
            startIconName: "DoesNotExistIcon" as unknown as "HomeIcon",
          },
        ],
      },
    } satisfies ModifiedUiShellNavComponentProps);

    await vi.waitFor(() => {
      const mysteryNavItem = findSideNavItemElement(parentElement, "Mystery");

      expect(mysteryNavItem).toBeDefined();
      expect(mysteryNavItem!.querySelector("svg")).toBeNull();
    });
  });
});
