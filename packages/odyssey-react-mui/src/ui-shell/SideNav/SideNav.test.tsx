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

import { render, screen, waitFor, within } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { SideNav } from "./SideNav.js";
import { OdysseyProvider } from "../../OdysseyProvider.js";

describe(SideNav.displayName!, () => {
  test("can show the default Okta logo", () => {
    render(
      <OdysseyProvider>
        <SideNav
          appName="Header text"
          sideNavItems={[
            {
              id: "item0",
              href: "#",
              label: "Users",
            },
          ]}
        />
      </OdysseyProvider>,
    );

    expect(screen.getByTitle("Okta")).toBeVisible();
  });

  test("can show a custom logo", () => {
    render(
      <OdysseyProvider>
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
        />
      </OdysseyProvider>,
    );

    expect(screen.getByAltText("Custom logo")).toBeVisible();
  });

  test("can show header text", () => {
    const headerText = "Header text";

    render(
      <OdysseyProvider>
        <SideNav
          appName={headerText}
          sideNavItems={[
            {
              id: "item0",
              href: "#",
              label: "Users",
            },
          ]}
        />
      </OdysseyProvider>,
    );

    expect(screen.getByRole("heading", { name: headerText })).toBeVisible();
  });

  test("is collapsible", async () => {
    const menuItemText = "Users";

    render(
      <OdysseyProvider>
        <SideNav
          isCollapsible
          appName="Header text"
          sideNavItems={[
            {
              id: "item0",
              href: "#",
              label: menuItemText,
            },
          ]}
        />
      </OdysseyProvider>,
    );

    expect(screen.getByText(menuItemText)).toBeVisible();

    const collapseButton = screen.getByLabelText("Close navigation");
    await userEvent.click(collapseButton);

    expect(screen.getByText(menuItemText)).not.toBeVisible();

    const expandButton = screen.getByLabelText("Open navigation");
    await userEvent.click(expandButton);

    expect(screen.getByText(menuItemText)).toBeVisible();
  });

  test("can fire onCollapse event", async () => {
    const menuItemText = "Users";
    const mockOnCollapse = vi.fn();

    render(
      <OdysseyProvider>
        <SideNav
          isCollapsible
          onCollapse={mockOnCollapse}
          appName="Header text"
          sideNavItems={[
            {
              id: "item0",
              href: "#",
              label: menuItemText,
            },
          ]}
        />
      </OdysseyProvider>,
    );

    const collapseButton = screen.getByLabelText("Close navigation");
    await userEvent.click(collapseButton);

    expect(mockOnCollapse).toBeCalled();
  });

  test("can fire onExpand event", async () => {
    const menuItemText = "Users";
    const mockOnExpand = vi.fn();

    render(
      <OdysseyProvider>
        <SideNav
          isCollapsible
          onExpand={mockOnExpand}
          appName="Header text"
          sideNavItems={[
            {
              id: "item0",
              href: "#",
              label: menuItemText,
            },
          ]}
        />
      </OdysseyProvider>,
    );

    const collapseButton = screen.getByLabelText("Close navigation");
    await userEvent.click(collapseButton);

    const expandButton = screen.getByLabelText("Open navigation");
    await userEvent.click(expandButton);

    expect(mockOnExpand).toBeCalled();
  });

  test("shows loading skeleton state", () => {
    const menuItemText = "Menu item";

    render(
      <OdysseyProvider>
        <SideNav
          isLoading
          appName="Header text"
          sideNavItems={[
            {
              id: "item0",
              href: "#",
              label: menuItemText,
            },
          ]}
        />
      </OdysseyProvider>,
    );

    expect(screen.queryByText(menuItemText)).not.toBeInTheDocument();
  });

  test("shows footer links", () => {
    const footerItemLabel = "Footer item";
    render(
      <OdysseyProvider>
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
        />
      </OdysseyProvider>,
    );

    const footer = screen.getByRole("menubar");
    expect(within(footer).getByText(footerItemLabel)).toBeVisible();
  });

  test("shows custom footer component", () => {
    const footerComponentText = "This is a custom footer component.";
    const footerComponent = <p>{footerComponentText}</p>;

    render(
      <OdysseyProvider>
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
        />
      </OdysseyProvider>,
    );

    expect(screen.getByText(footerComponentText)).toBeVisible();
  });

  test("displays sidenav link", async () => {
    const accordionInner = "Accordion inside";
    const accordionOuter = "Accordion outside";
    const headingText = "Heading";
    const menuClickableText = "Clickable";
    const menuLinkText = "Link";

    render(
      <OdysseyProvider>
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
        />
      </OdysseyProvider>,
    );

    expect(screen.getByRole("link", { name: menuLinkText })).toBeVisible();
    expect(
      screen.getByRole("button", { name: menuClickableText }),
    ).toBeVisible();
    expect(screen.getByRole("heading", { name: headingText })).toBeVisible();

    const accordion = screen.getByText(accordionOuter);
    expect(screen.getByText(accordionInner)).not.toBeVisible();
    await userEvent.click(accordion);
    expect(screen.getByText(accordionInner)).toBeVisible();
  });

  test("can show notification badge", async () => {
    const menuItemText = "Menu item text";
    const badgeCount = 9;

    render(
      <OdysseyProvider>
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
        />
      </OdysseyProvider>,
    );

    await waitFor(() => {
      expect(screen.getByRole("listitem")).toHaveTextContent(
        String(badgeCount),
      );
    });
  });
});
