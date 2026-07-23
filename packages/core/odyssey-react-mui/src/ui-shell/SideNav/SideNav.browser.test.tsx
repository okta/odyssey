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

import { translate as odysseyTranslate } from "../../i18n.generated/i18n.js";
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

    const collapsibleRegion = page.elementLocator(
      document.querySelector('[data-se="collapsible-region"]')!,
    );
    await expect.element(collapsibleRegion).not.toHaveAttribute("inert");

    await userEvent.click(page.getByLabelText("Close navigation"));

    // `inert` flips synchronously on collapse; the visual hide runs on a CSS
    // width/opacity transition. Assert `opacity` reaches 0 first — that retry
    // waits out the animation, so `not.toBeVisible()` (which needs the settled
    // zero-width box) checks the finished state rather than a mid-animation
    // frame. Keep this order: without a preceding wait, a visibility matcher
    // would race the transition and pass against the still-open frame.
    await expect.element(collapsibleRegion).toHaveAttribute("inert");
    await expect.element(collapsibleRegion).toHaveStyle({ opacity: "0" });
    await expect.element(collapsibleRegion).not.toBeVisible();

    await userEvent.click(page.getByLabelText("Open navigation"));

    await expect.element(page.getByText(menuItemText)).toBeVisible();
  });

  test("collapsed content is not exposed to screen readers or keyboard", async () => {
    const logoLabel = "Company logo";
    const menuItemText = "Users";

    const { container } = await renderWithOdysseyProvider(
      <SideNav
        isCollapsible
        logoProps={{
          ariaLabel: logoLabel,
          href: "https://okta.com",
          imageAltText: "Company logo image",
          imageUrl: "https://placehold.co/600x400/EEE/31343C",
        }}
        sideNavItems={[
          {
            id: "item0",
            href: "#",
            label: menuItemText,
          },
        ]}
      />,
    );

    await expect
      .element(page.getByRole("link", { name: logoLabel }))
      .toBeVisible();
    await expect.element(page.getByText(menuItemText)).toBeVisible();
    await expect(container).toBeAccessible();

    await userEvent.click(page.getByLabelText("Close navigation"));

    // SC 1.3.2 — the collapsed region is marked `inert`, removing its logo link and
    // menu items from the accessibility tree so a screen reader no longer announces
    // them while browsing with arrow keys. `opacity: 0` alone left them exposed.
    await expect
      .element(
        page.elementLocator(
          document.querySelector('[data-se="collapsible-region"]')!,
        ),
      )
      .toHaveAttribute("inert");

    // SC 2.4.3 — the hidden logo link is no longer a keyboard tab stop. Focus cannot
    // land inside an `inert` subtree, so focusing the link is a no-op.
    const logoLink = document.querySelector<HTMLAnchorElement>(
      '[data-se="sidenav-header-logo"]',
    )!;
    logoLink.focus();
    expect(document.activeElement).not.toBe(logoLink);

    await expect(container).toBeAccessible();
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

  test("exposes nav items and their sub-items as accessible lists", async () => {
    const { container } = await renderWithOdysseyProvider(
      <SideNav
        appName="Header text"
        sideNavItems={[
          {
            id: "my-apps",
            href: "#my-apps",
            label: "My Apps",
            nestedNavItems: [
              {
                id: "recently-used",
                href: "#recently-used",
                label: "Recently Used",
              },
              { id: "work", href: "#work", label: "Work" },
            ],
          },
          {
            id: "notifications",
            href: "#notifications",
            label: "Notifications",
          },
          { id: "add-apps", href: "#add-apps", label: "Add apps" },
        ]}
      />,
    );

    // The nav container and the nested sub-nav must both be conveyed as lists.
    // role="none"/role="presentation" previously stripped these semantics so
    // screen readers announced no list structure at all (WCAG 1.3.1).
    const lists = page.getByRole("list").elements();
    expect(lists.length).toBeGreaterThanOrEqual(2);

    // The nested sub-nav is named after its parent item so screen readers
    // announce it as e.g. "My Apps, list" rather than an unnamed list.
    await expect
      .element(page.getByRole("list", { name: "My Apps" }))
      .toBeInTheDocument();

    // The top-level nav items and the nested items are all real list items.
    const listItemLabels = [
      "My Apps",
      "Notifications",
      "Add apps",
      "Recently Used",
      "Work",
    ];
    await Promise.all(
      listItemLabels.map((label) =>
        expect.element(page.getByRole("link", { name: label })).toBeVisible(),
      ),
    );

    await expect(container).toBeAccessible();
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

  describe("button nav item `aria-expanded`", () => {
    test("button item with isExpanded true", async () => {
      const { container } = await renderWithOdysseyProvider(
        <SideNav
          appName="App"
          sideNavItems={[
            {
              id: "notifications",
              label: "Notifications",
              onClick: () => {},
              isExpanded: true,
            },
          ]}
        />,
      );

      const button = page.getByRole("button", { name: "Notifications" });
      await expect.element(button).toHaveAttribute("aria-expanded", "true");
      await expect(container).toBeAccessible();
    });

    test("button item with isExpanded false", async () => {
      const { container } = await renderWithOdysseyProvider(
        <SideNav
          appName="App"
          sideNavItems={[
            {
              id: "notifications",
              label: "Notifications",
              onClick: () => {},
              isExpanded: false,
            },
          ]}
        />,
      );

      const button = page.getByRole("button", { name: "Notifications" });
      await expect.element(button).toHaveAttribute("aria-expanded", "false");
      await expect(container).toBeAccessible();
    });

    test("button item without isExpanded prop", async () => {
      const { container } = await renderWithOdysseyProvider(
        <SideNav
          appName="App"
          sideNavItems={[
            {
              id: "notifications",
              label: "Notifications",
              onClick: () => {},
            },
          ]}
        />,
      );

      const button = page.getByRole("button", { name: "Notifications" });
      await expect.element(button).not.toHaveAttribute("aria-expanded");
      await expect(container).toBeAccessible();
    });

    test("button item with ariaControls", async () => {
      const { container } = await renderWithOdysseyProvider(
        <>
          <SideNav
            appName="App"
            sideNavItems={[
              {
                id: "notifications",
                label: "Notifications",
                onClick: () => {},
                ariaControls: "notifications-panel",
                isExpanded: true,
              },
            ]}
          />
          {/* aria-controls must reference a real element id, or axe flags
              aria-valid-attr-value. This stands in for the panel a consumer
              would toggle open. */}
          <div id="notifications-panel" />
        </>,
      );

      const button = page.getByRole("button", { name: "Notifications" });
      await expect
        .element(button)
        .toHaveAttribute("aria-controls", "notifications-panel");
      await expect.element(button).toHaveAttribute("aria-expanded", "true");
      await expect(container).toBeAccessible();
    });
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

        // Collapsed, the region is visually hidden. Its removal from the
        // accessibility tree and tab order via `inert` is asserted separately, in
        // "collapsed content is not exposed to screen readers or keyboard".
        await expect
          .element(
            page.elementLocator(
              document.querySelector('[data-se="collapsible-region"]')!,
            ),
          )
          .not.toBeVisible();
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

        // Collapsed, the region is visually hidden. Its removal from the
        // accessibility tree and tab order via `inert` is asserted separately, in
        // "collapsed content is not exposed to screen readers or keyboard".
        await expect
          .element(
            page.elementLocator(
              document.querySelector('[data-se="collapsible-region"]')!,
            ),
          )
          .not.toBeVisible();
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

  describe("sortable drag handle accessible names", () => {
    test("each sortable item's drag handle names its own item", async () => {
      const { container } = await renderWithOdysseyProvider(
        <SideNav
          appName="Header text"
          sideNavItems={[
            {
              id: "workspaces",
              label: "Workspaces",
              isDefaultExpanded: true,
              isSortable: true,
              nestedNavItems: [
                { id: "work", href: "#work", label: "Work" },
                { id: "test", href: "#test", label: "Test" },
              ],
            },
          ]}
        />,
      );

      await expect
        .element(
          page.getByRole("button", {
            name: odysseyTranslate("navigation.drag.handle.label", {
              label: "Work",
            }),
          }),
        )
        .toBeVisible();

      await expect
        .element(
          page.getByRole("button", {
            name: odysseyTranslate("navigation.drag.handle.label", {
              label: "Test",
            }),
          }),
        )
        .toBeVisible();

      // No generic "Drag handle" — every handle must carry its item's name.
      await expect
        .element(
          page.getByRole("button", {
            name: odysseyTranslate("navigation.drag.handle"),
            exact: true,
          }),
        )
        .not.toBeInTheDocument();

      await expect(container).toBeAccessible();
    });

    test("sortable items belong to one shared list, not a list per item", async () => {
      const { container } = await renderWithOdysseyProvider(
        <SideNav
          appName="Header text"
          sideNavItems={[
            {
              id: "workspaces",
              label: "Workspaces",
              isDefaultExpanded: true,
              isSortable: true,
              nestedNavItems: [
                { id: "work", href: "#work", label: "Work" },
                { id: "test", href: "#test", label: "Test" },
              ],
            },
          ]}
        />,
      );

      const workLink = page.getByRole("link", { name: "Work" }).element();

      // Each sortable row previously wrapped its content in its own <ul>, so
      // the nearest list to a row's link was a single-item list — screen
      // readers announced "list, 1 item" per row. The nearest enclosing list
      // must now be the shared sortable list holding every row.
      const sortableList = workLink.closest("ul");
      expect(sortableList).not.toBeNull();

      const directListItems = Array.from(sortableList!.children).filter(
        (child) => child.tagName === "LI",
      );
      expect(directListItems.length).toBe(2);

      // The row's list item must not contain a nested list of its own.
      expect(workLink.closest("li")!.querySelector("ul")).toBeNull();

      await expect(container).toBeAccessible();
    });
  });

  describe("selected item `aria-current`", () => {
    test("selected link item carries aria-current on the anchor, not the list item", async () => {
      const menuItemText = "Personal details";

      const { container } = await renderWithOdysseyProvider(
        <SideNav
          appName="App"
          sideNavItems={[
            {
              id: "profile",
              href: "/account-settings/profile",
              label: menuItemText,
              isSelected: true,
            },
          ]}
        />,
      );

      // Screen readers convey the current page from the interactive anchor,
      // so aria-current must live on the link — not its wrapping list item.
      const link = page.getByRole("link", { name: menuItemText });
      await expect.element(link).toHaveAttribute("aria-current", "page");

      const listItem = link.element().closest("li");
      expect(listItem?.hasAttribute("aria-current")).toBe(false);

      await expect(container).toBeAccessible();
    });

    test("selected button item carries aria-current on the button", async () => {
      const menuItemText = "Notifications";

      const { container } = await renderWithOdysseyProvider(
        <SideNav
          appName="App"
          sideNavItems={[
            {
              id: "notifications",
              label: menuItemText,
              onClick: () => {},
              isSelected: true,
            },
          ]}
        />,
      );

      const button = page.getByRole("button", { name: menuItemText });
      await expect.element(button).toHaveAttribute("aria-current", "page");

      const listItem = button.element().closest("li");
      expect(listItem?.hasAttribute("aria-current")).toBe(false);

      await expect(container).toBeAccessible();
    });

    test("unselected link item has no aria-current", async () => {
      const menuItemText = "Personal details";

      const { container } = await renderWithOdysseyProvider(
        <SideNav
          appName="App"
          sideNavItems={[
            {
              id: "profile",
              href: "/account-settings/profile",
              label: menuItemText,
            },
          ]}
        />,
      );

      const link = page.getByRole("link", { name: menuItemText }).element();
      expect(link.hasAttribute("aria-current")).toBe(false);

      await expect(container).toBeAccessible();
    });
  });

  describe("external link nav item", () => {
    test("exposes the new-tab hint to screen readers", async () => {
      const linkLabel = "Resource Catalog";
      const newWindowText = odysseyTranslate("link.external.newwindow");

      const { container } = await renderWithOdysseyProvider(
        <SideNav
          appName="Header text"
          sideNavItems={[
            {
              id: "catalog",
              href: "https://example.com/catalog",
              label: linkLabel,
              target: "_blank",
            },
          ]}
        />,
      );

      // The presentational external-link icon conveys "opens in a new tab"
      // visually; the ScreenReaderText makes the same hint part of the link's
      // accessible name (WCAG 1.1.1).
      await expect
        .element(
          page.getByRole("link", { name: `${linkLabel} ${newWindowText}` }),
        )
        .toBeVisible();

      await expect(container).toBeAccessible();
    });
  });
});
