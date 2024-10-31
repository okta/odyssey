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

import { fireEvent, render, screen, within } from "@testing-library/react";
import { SideNav } from "./SideNav";
import { OdysseyProvider } from "../../OdysseyProvider";

describe("SideNav", () => {
  test("can show the default Okta logo", async () => {
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

    expect(screen.getByTitle("Okta")).toBeInTheDocument();
  });

  test("can show a custom logo", async () => {
    render(
      <OdysseyProvider>
        <SideNav
          logo={
            <img
              src="https://placehold.co/600x400/EEE/31343C"
              alt="Custom logo"
            />
          }
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

    expect(screen.getByAltText("Custom logo")).toBeInTheDocument();
  });

  test("can show header text", async () => {
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

    expect(
      screen.getByRole("heading", { name: headerText }),
    ).toBeInTheDocument();
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

    const collapseButton = screen.getByLabelText("Collapse side navigation");
    fireEvent.click(collapseButton);

    expect(screen.getByText(menuItemText)).not.toBeVisible;

    const expandButton = screen.getByLabelText("Expand side navigation");
    fireEvent.click(expandButton);

    expect(screen.getByText(menuItemText)).toBeVisible();
  });

  test("can fire onCollapse event", async () => {
    const menuItemText = "Users";
    const mockOnCollapse = jest.fn();

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

    const collapseButton = screen.getByLabelText("Collapse side navigation");
    fireEvent.click(collapseButton);

    expect(mockOnCollapse).toBeCalled();
  });

  test("can fire onExpand event", async () => {
    const menuItemText = "Users";
    const mockOnExpand = jest.fn();

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

    const collapseButton = screen.getByLabelText("Collapse side navigation");
    fireEvent.click(collapseButton);

    const expandButton = screen.getByLabelText("Expand side navigation");
    fireEvent.click(expandButton);

    expect(mockOnExpand).toBeCalled();
  });

  test("shows loading skeleton state", async () => {
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

  test("shows footer links", async () => {
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

  test("shows custom footer component", async () => {
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
    const menuLinkText = "Link";
    const menuClickableText = "Clickable";
    const headingText = "Heading";
    const accordionOuter = "Accordion outside";
    const accordionInner = "Accordion inside";

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
              children: [
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

    expect(screen.getByRole("menuitem", { name: menuLinkText })).toBeVisible();
    expect(
      screen.getByRole("button", { name: menuClickableText }),
    ).toBeVisible();
    expect(screen.getByRole("heading", { name: headingText })).toBeVisible();

    const accordion = screen.getByText(accordionOuter);
    expect(screen.getByText(accordionInner)).not.toBeVisible();
    fireEvent.click(accordion);
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

    expect(screen.getByRole("menuitem")).toHaveTextContent(`${badgeCount}`);
  });
});
