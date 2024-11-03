/*!
 * Copyright (c) 2021-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { SideNav, SideNavProps } from "@okta/odyssey-react-mui/labs";
import { Meta, StoryObj } from "@storybook/react";
import { MuiThemeDecorator } from "../../../../.storybook/components";
import {
  AppsIcon,
  ClockIcon,
  SettingsIcon,
  HomeIcon,
  Fido2Icon,
  LockIcon,
  AddCircleIcon,
  DownloadIcon,
  UserIcon,
  DirectoryIcon,
  ServerIcon,
  FolderIcon,
  NotificationIcon,
} from "@okta/odyssey-react-mui/icons";
import { expect } from "@storybook/jest";
import {
  configure,
  userEvent,
  waitFor,
  within,
} from "@storybook/testing-library";
import { PlaywrightProps } from "../../odyssey-mui/storybookTypes";
import PlaceholderLogo from "../PickerWithOptionAdornment/PlaceholderLogo";

const storybookMeta: Meta<SideNavProps> = {
  title: "Labs Components/SideNav",
  component: SideNav,
  argTypes: {
    appName: {
      control: "text",
      description: "Header text for the side nav",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    footerComponent: {
      description:
        "Custom footer component to render in place of footer items.",
    },
    footerItems: {
      description: "",
      table: {
        type: {
          summary: "Array<SideNavFooterItem>",
        },
      },
    },
    // hasCustomFooter: {
    //   control: "boolean",
    //   description:
    //     "Defines if a custom footer should be visible when available.",
    //   table: {
    //     type: {
    //       summary: "boolean",
    //     },
    //   },
    // },
    isCollapsible: {
      control: "boolean",
      description: "Controls whether the side nav is collapsible",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    isCompact: {
      control: "boolean",
      description: "Controls whether the side nav uses compact layout",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    isLoading: {
      control: "boolean",
      description: "Controls whether the side nav shows the skeleton loader.",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    logoProps: {
      description: "Props passed in to render custom logo and/or link",
      table: {
        type: {
          summary:
            "href?: string; logoSrcUrl?: string; altText?: string; logoComponent?: ReactElement",
        },
      },
    },
    onCollapse: {
      description: "Callback to be triggered when the side nav is collapsed",
    },
    onExpand: {
      description: "Callback to be triggered when the side nav is expanded",
    },
    onSort: {
      description:
        "Callback to be triggered when a nested side nav item inside is reordered. Returns the new items list",
    },
    sideNavItems: {
      description: "",
      table: {
        type: {
          summary: "Array<SideNavItem>",
        },
      },
    },
  },
  args: {
    appName: "Admin",
    isCollapsible: true,
    isCompact: false,
    sideNavItems: [
      {
        id: "AddNewFolder",
        label: "Add new folder",
        endIcon: <AddCircleIcon />,
        onClick: () => {},
      },
      {
        id: "item0-0",
        label: "Admin",
        isSectionHeader: true,
      },
      {
        id: "item0-1",
        href: "/?path=/docs/mui-components-typography--docs",
        label: "Users",
        startIcon: <UserIcon />,
      },
      {
        id: "item1",
        label: "Dashboard",
        startIcon: <HomeIcon />,
        isDisabled: true,
        children: [
          {
            id: "item1-1",
            href: "/",
            label: "Home",
          },
        ],
      },
      {
        id: "item2",
        href: "/",
        label: "Applications",
        startIcon: <AppsIcon />,
      },
      {
        id: "item001",
        label: "Onboarding",
        startIcon: <FolderIcon />,
        children: [
          {
            id: "item1-1",
            href: "/",
            label: "Start",
          },
          {
            id: "item1-2",
            href: "/",
            label: "Tasks",
          },
          {
            id: "item1-3",
            href: "/",
            label: "Getting Started",
          },
        ],
      },
      {
        id: "item0-1-2",
        href: "/",
        label: "Directory",
        startIcon: <DirectoryIcon />,
      },
      {
        id: "item0-3",
        label: "Resource Management",
        isSectionHeader: true,
      },
      {
        id: "item3-2-1",
        href: "/",
        label: "Kubernetes",
        startIcon: <ServerIcon />,
        severity: "success",
        statusLabel: "success",
      },
      {
        id: "item5",
        href: "/",
        label: "Reports",
        startIcon: <DownloadIcon />,
      },
      {
        id: "item3-1-0",
        href: "/",
        label: "Identify Governance",
        target: "_blank",
        isDisabled: true,
        startIcon: <Fido2Icon />,
      },
      {
        id: "item3-1-3",
        href: "/",
        label: "Workflows",
        target: "_blank",
        startIcon: <ClockIcon />,
      },
      {
        id: "item3-0",
        label: "Security Administration",
        isSectionHeader: true,
      },
      {
        id: "item3",
        href: "/",
        label: "Security",
        startIcon: <LockIcon />,
        endIcon: <LockIcon />,
        isSelected: true,
      },
      {
        id: "item4",
        label: "Settings",
        isDefaultExpanded: true,
        isSortable: true,
        startIcon: <SettingsIcon />,
        children: [
          {
            id: "item4-1",
            href: "/",
            label: "General",
          },
          {
            id: "item4-2",
            href: "/",
            label: "Custom Domain",
          },
          {
            id: "item4-3",
            label: "Account Management",
          },
          {
            id: "item4-4",
            href: "/",
            label: "Authentication Policies",
            isDisabled: true,
          },
          {
            id: "item4-5",
            href: "/",
            label: "IDP Configuration",
          },
        ],
      },
      {
        id: "item5-0",
        href: "/",
        label: "System Configuration",
        startIcon: <FolderIcon />,
      },
      {
        id: "item6",
        href: "/",
        label: "Notifications",
        startIcon: <NotificationIcon />,
        count: 1,
      },
    ],
    footerItems: [
      {
        id: "footer-item-1",
        label: "Docs",
        href: "/",
      },
      {
        id: "footer-item-2",
        label: "Privacy",
      },
      {
        id: "footer-item-3",
        label: "Security",
        href: "/",
      },
    ],
  },
  decorators: [MuiThemeDecorator],
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default storybookMeta;

export const Default: StoryObj<typeof SideNav> = {
  render: (props) => {
    return (
      <div style={{ height: "100vh" }}>
        <SideNav {...props} />
      </div>
    );
  },
  play: async ({ canvasElement, step }: PlaywrightProps<SideNavProps>) => {
    configure({ testIdAttribute: "data-se" });
    const canvas = within(canvasElement);

    const toggleButton = canvas.getByRole("button", {
      name: "Close navigation",
    });
    const navElement = canvas.getByRole("navigation", {
      name: "Main navigation",
    });
    // const collapsedRegion = canvas.getByTestId("collapsed-region");
    const scrollableRegion = canvas.getByTestId("scrollable-region");

    /**
     * The scroll behavior in SideNav is such that if an item has isSelected and the item
     * is not on screen initially, it will scroll to make that item be visible on the screen.
     * So, we should expect that the scrollable container (found by data-se="scrollable-region")
     * should have a non-zero scrollTop once this operation has completed.
     */
    await step("Side Nav Should be scrolled as expected", async ({}) => {
      // Add a small delay to allow initial rendering and scrolling
      await new Promise((resolve) => setTimeout(resolve, 100));

      // On initial load, scrollTop will be zero. Then, once the scroll operation completes,
      // it should be non-zero.
      if (scrollableRegion.scrollTop !== 0) {
        expect(scrollableRegion.scrollTop).not.toBe(0);
      } else {
        await waitFor(
          () => {
            expect(scrollableRegion.scrollTop).not.toBe(0);
          },
          { timeout: 1000 },
        );
      }
    });
    await step("Side Nav Collapse", async ({}) => {
      await userEvent.click(toggleButton);

      await waitFor(() => {
        expect(toggleButton.ariaExpanded).toEqual("false");
        expect(navElement).toHaveStyle({ width: 0 });
      });
    });
    await step("Side Nav Expand", async ({}) => {
      await userEvent.click(toggleButton);
      await waitFor(() => {
        expect(toggleButton.ariaExpanded).toEqual("true");
        expect(navElement).toBeVisible();
      });
    });
  },
};

export const Loading: StoryObj<typeof SideNav> = {
  args: {
    isLoading: true,
  },
  render: (props) => {
    return (
      <div style={{ height: "100vh" }}>
        <SideNav {...props} />
      </div>
    );
  },
};

export const CustomLogoElement: StoryObj<typeof SideNav> = {
  args: {
    logoProps: {
      logoComponent: <PlaceholderLogo.One />,
    },
  },
  render: (props) => {
    return (
      <div style={{ height: "100vh" }}>
        <SideNav {...props} />
      </div>
    );
  },
};

export const CustomLogoImage: StoryObj<typeof SideNav> = {
  args: {
    logoProps: {
      imageUrl: "https://placehold.co/600x60",
      imageAltText: "My custom image logo",
    },
  },
  render: (props) => {
    return (
      <div style={{ height: "100vh" }}>
        <SideNav {...props} />
      </div>
    );
  },
};
