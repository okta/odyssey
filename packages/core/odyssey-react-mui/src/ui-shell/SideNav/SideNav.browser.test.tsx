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

import { page, userEvent } from "vitest/browser";

import { renderWithOdysseyProvider } from "../../test-utils/renderWithOdysseyProvider.js";
import { SideNav } from "./SideNav.js";

describe(SideNav.displayName!, () => {
  test("can show the default Okta logo", async () => {
    await renderWithOdysseyProvider(
      <SideNav
        appName="Header text"
        sideNavItems={[
          {
            id: "item0",
            href: "#",
            label: "Users",
          },
        ]}
      />,
    );

    await expect.element(page.getByRole("img", { name: "Okta" })).toBeVisible();
  });

  test("can show a custom logo", async () => {
    await renderWithOdysseyProvider(
      <SideNav
        appName="Header text"
        logoProps={{
          imageAltText: "Custom logo",
          imageUrl: "https://placehold.co/600x400/EEE/31343C",
        }}
        sideNavItems={[
          {
            id: "item0",
            href: "#",
            label: "Users",
          },
        ]}
      />,
    );

    await expect.element(page.getByAltText("Custom logo")).toBeVisible();
  });

  test("can show header text", async () => {
    const headerText = "Header text";

    await renderWithOdysseyProvider(
      <SideNav
        appName={headerText}
        sideNavItems={[
          {
            id: "item0",
            href: "#",
            label: "Users",
          },
        ]}
      />,
    );

    await expect
      .element(page.getByRole("heading", { name: headerText }))
      .toBeVisible();
  });

  test("is collapsible", async () => {
    const menuItemText = "Users";

    await renderWithOdysseyProvider(
      <SideNav
        appName="Header text"
        isCollapsible
        sideNavItems={[
          {
            id: "item0",
            href: "#",
            label: menuItemText,
          },
        ]}
      />,
    );

    await expect.element(page.getByText(menuItemText)).toBeVisible();

    await userEvent.click(page.getByLabelText("Close navigation"));

    // TODO: fix a11y — SideNav hides collapsed content with opacity:0, which is still
    // perceivable by screen readers. Use visibility:hidden or remove from DOM instead.
    await expect
      .element(
        page.elementLocator(
          document.querySelector('[data-se="collapsible-region"]')!,
        ),
      )
      .toHaveStyle({ opacity: "0" });

    await userEvent.click(page.getByLabelText("Open navigation"));

    await expect.element(page.getByText(menuItemText)).toBeVisible();
  });

  test("can fire onCollapse event", async () => {
    const menuItemText = "Users";
    const mockOnCollapse = vi.fn();

    await renderWithOdysseyProvider(
      <SideNav
        appName="Header text"
        isCollapsible
        onCollapse={mockOnCollapse}
        sideNavItems={[
          {
            id: "item0",
            href: "#",
            label: menuItemText,
          },
        ]}
      />,
    );

    await userEvent.click(page.getByLabelText("Close navigation"));

    expect(mockOnCollapse).toBeCalled();
  });

  test("can fire onExpand event", async () => {
    const menuItemText = "Users";
    const mockOnExpand = vi.fn();

    await renderWithOdysseyProvider(
      <SideNav
        appName="Header text"
        isCollapsible
        onExpand={mockOnExpand}
        sideNavItems={[
          {
            id: "item0",
            href: "#",
            label: menuItemText,
          },
        ]}
      />,
    );

    await userEvent.click(page.getByLabelText("Close navigation"));

    await userEvent.click(page.getByLabelText("Open navigation"));

    expect(mockOnExpand).toHaveBeenCalled();
  });

  test("shows loading skeleton state", async () => {
    const menuItemText = "Menu item";

    await renderWithOdysseyProvider(
      <SideNav
        appName="Header text"
        isLoading
        sideNavItems={[
          {
            id: "item0",
            href: "#",
            label: menuItemText,
          },
        ]}
      />,
    );

    await expect.element(page.getByText(menuItemText)).not.toBeInTheDocument();
  });

  test("shows footer links", async () => {
    const footerItemLabel = "Footer item";
    await renderWithOdysseyProvider(
      <SideNav
        appName="Header text"
        footerItems={[
          {
            id: "footer-item-1",
            label: footerItemLabel,
            href: "/",
          },
        ]}
        sideNavItems={[
          {
            id: "item0",
            href: "#",
            label: "Menu item",
          },
        ]}
      />,
    );

    await expect
      .element(page.getByRole("menubar").getByText(footerItemLabel))
      .toBeVisible();
  });

  test("shows custom footer component", async () => {
    const footerComponentText = "This is a custom footer component.";
    const footerComponent = <p>{footerComponentText}</p>;

    await renderWithOdysseyProvider(
      <SideNav
        appName="Header text"
        footerComponent={footerComponent}
        hasCustomFooter
        sideNavItems={[
          {
            id: "item0",
            href: "#",
            label: "Menu item",
          },
        ]}
      />,
    );

    await expect.element(page.getByText(footerComponentText)).toBeVisible();
  });

  test("displays sidenav link", async () => {
    const accordionInner = "Accordion inside";
    const accordionOuter = "Accordion outside";
    const headingText = "Heading";
    const menuClickableText = "Clickable";
    const menuLinkText = "Link";

    await renderWithOdysseyProvider(
      <SideNav
        appName="Header text"
        sideNavItems={[
          {
            id: "menuClickable",
            label: menuClickableText,
            onClick: () => {},
          },
          {
            id: "menuHeading",
            label: headingText,
            isSectionHeader: true,
          },
          {
            id: "menuLink",
            href: "#",
            label: menuLinkText,
          },
          {
            id: "accordionOuter",
            label: accordionOuter,
            nestedNavItems: [
              {
                id: "accordionInner",
                href: "#",
                label: accordionInner,
              },
            ],
          },
        ]}
      />,
    );

    await expect
      .element(page.getByRole("link", { name: menuLinkText }))
      .toBeVisible();
    await expect
      .element(page.getByRole("button", { name: menuClickableText }))
      .toBeVisible();
    await expect
      .element(page.getByRole("heading", { name: headingText }))
      .toBeVisible();

    await expect.element(page.getByText(accordionInner)).not.toBeVisible();

    await userEvent.click(page.getByText(accordionOuter));
    await expect.element(page.getByText(accordionInner)).toBeVisible();
  });

  test("can show notification badge", async () => {
    const menuItemText = "Menu item text";
    const badgeCount = 9;

    await renderWithOdysseyProvider(
      <SideNav
        appName="Header text"
        sideNavItems={[
          {
            id: "item0",
            href: "#",
            label: menuItemText,
            count: badgeCount,
          },
        ]}
      />,
    );

    await expect
      .element(page.getByRole("link", { name: menuItemText }))
      .toHaveTextContent(String(badgeCount));
  });

  describe("`sessionStorage`", () => {
    describe("Collapsible", () => {
      test("collapses side nav when collapsed", async () => {
        const appName = "My App";

        await renderWithOdysseyProvider(
          <SideNav
            appName={appName}
            isCollapsed
            isCollapsible
            sideNavItems={[]}
          />,
        );

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

      test("opens side nav when not collapsed", async () => {
        const appName = "My App";

        await renderWithOdysseyProvider(
          <SideNav
            appName={appName}
            isCollapsed={false}
            isCollapsible
            sideNavItems={[]}
          />,
        );

        await expect.element(page.getByText(appName)).toBeVisible();
      });
    });

    describe("Not collapsible", () => {
      test("collapses side nav when collapsed", async () => {
        const appName = "My App";

        await renderWithOdysseyProvider(
          <SideNav
            appName={appName}
            isCollapsed
            isCollapsible={false}
            sideNavItems={[]}
          />,
        );

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

      test("opens side nav when not collapsed", async () => {
        const appName = "My App";

        await renderWithOdysseyProvider(
          <SideNav
            appName={appName}
            isCollapsed={false}
            isCollapsible={false}
            sideNavItems={[]}
          />,
        );

        await expect.element(page.getByText(appName)).toBeVisible();
      });
    });
  });
});
