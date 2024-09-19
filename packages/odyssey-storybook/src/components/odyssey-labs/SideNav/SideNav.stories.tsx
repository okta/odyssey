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
  CopyIcon,
  HomeIcon,
  Fido2Icon,
  LockIcon,
  BugIcon,
  CloseIcon,
  CalendarIcon,
  CallIcon,
  CheckIcon,
  AddCircleIcon,
  DownloadIcon,
  ChatIcon,
  RefreshIcon,
  UserIcon,
  DirectoryIcon,
  GlobeIcon,
  IdpIcon,
  InformationCircleIcon,
  InformationCircleFilledIcon,
  ServerIcon,
  ExpandLeftIcon,
  FolderIcon,
} from "@okta/odyssey-react-mui/icons";
import { expect } from "@storybook/jest";
import {
  configure,
  userEvent,
  waitFor,
  within,
} from "@storybook/testing-library";
import { PlaywrightProps } from "../../odyssey-mui/storybookTypes";

const storybookMeta: Meta<SideNavProps> = {
  title: "Labs Components/SideNav",
  component: SideNav,
  argTypes: {
    navHeaderText: {
      control: "text",
      description: "Header text for the side nav",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    isCollapsible: {
      control: "boolean",
      description: "Controls whether the side nav is collapsible",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    onCollapse: {
      description: "Callback to be triggered when the side nav is collapsed",
    },
    onExpand: {
      description: "Callback to be triggered when the side nav is expanded",
    },
    sideNavItems: {
      description: "",
      table: {
        type: {
          summary: "Array<SideNavItem>",
        },
      },
    },
    footerItems: {
      description: "",
      table: {
        type: {
          summary: "Array<SideNavFooterItem>",
        },
      },
    },
  },
  args: {
    navHeaderText: "Admin",
    isCollapsible: true,
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
        href: "/?path=/story/labs-components-switch--default",
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
            startIcon: <CheckIcon />,
          },
        ],
      },
      {
        id: "item001",
        label: "Onboarding",
        startIcon: <CalendarIcon />,
        children: [
          {
            id: "item1-2",
            href: "/",
            label: "Start",
            startIcon: <CloseIcon />,
            endIcon: <InformationCircleFilledIcon />,
          },
          {
            id: "item1-3",
            href: "/",
            label: "Onboarding",
            startIcon: <HomeIcon />,
          },
          {
            id: "item1-4",
            href: "/",
            label: "Tasks",
            startIcon: <CallIcon />,
            endIcon: <ExpandLeftIcon />,
          },
          {
            id: "item1-5",
            href: "/",
            label: "Getting Started",
            startIcon: <InformationCircleIcon />,
            endIcon: <CalendarIcon />,
          },
        ],
      },
      {
        id: "item0-2",
        href: "/",
        label: "Profiles",
        startIcon: <GlobeIcon />,
        endIcon: <GlobeIcon />,
        isDisabled: true,
      },
      {
        id: "item2",
        href: "/",
        label: "Applications",
        startIcon: <AppsIcon />,
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
        endIcon: <ServerIcon />,
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
      },
      {
        id: "item4",
        label: "Settings",
        startIcon: <SettingsIcon />,
        isDefaultExpanded: true,
        children: [
          {
            id: "item4-1",
            href: "/",
            label: "General",
            startIcon: <BugIcon />,
            endIcon: <ChatIcon />,
          },
          {
            id: "item4-3",
            href: "/",
            label: "Custom Login page",
            startIcon: <CheckIcon />,
          },
          {
            id: "item4-2",
            href: "/",
            isSelected: true,
            label: "Custom Domain",
            startIcon: <CloseIcon />,
            endIcon: <CopyIcon />,
          },
          {
            id: "item4-4",
            href: "/",
            label: "Authentication Policies Rules",
            startIcon: <RefreshIcon />,
          },
          {
            id: "item4-5",
            href: "/",
            label: "IDP Configuration",
            startIcon: <IdpIcon />,
          },
        ],
      },
      {
        id: "item5-0",
        href: "/",
        label: "System Configuration",
        startIcon: <FolderIcon />,
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
  tags: ["autodocs"],
};

export default storybookMeta;

export const Default: StoryObj<SideNavProps> = {
  render: (props: SideNavProps) => {
    return (
      <div style={{ height: "100vh" }}>
        <SideNav
          navHeaderText={props.navHeaderText}
          isCollapsible={props.isCollapsible}
          onCollapse={props.onCollapse}
          onExpand={props.onExpand}
          sideNavItems={props.sideNavItems}
          footerItems={props.footerItems}
        />
      </div>
    );
  },
  play: async ({ canvasElement, step }: PlaywrightProps<SideNavProps>) => {
    configure({ testIdAttribute: "data-se" });
    const canvas = within(canvasElement);
    const expandedRegion = canvas.getByTestId("expanded-region");
    const collapsedRegion = canvas.getByTestId("collapsed-region");
    const scrollableRegion = canvas.getByTestId("scrollable-region");

    /**
     * The scroll behavior in SideNav is such that if an item has isSelected and the item
     * is not on screen initially, it will scroll to make that item be visible on the screen.
     * So, we should expect that the scrollable container (found by data-se="scrollable-region")
     * should have a non-zero scrollTop once this operation has completed.
     */
    await step("Side Nav Should be scrolled as expected", async ({}) => {
      // On initial load, scrollTop will be zero. Then, once the scroll operation completes,
      // it should be non-zero.
      expect(scrollableRegion.scrollTop).toBe(0);
      await waitFor(() => {
        expect(scrollableRegion.scrollTop).not.toBe(0);
      });
    });
    await step("Side Nav Collapse", async ({}) => {
      const collapseButton = within(expandedRegion).getByLabelText(
        "collapse side navigation",
      );
      await userEvent.click(collapseButton);
      await waitFor(() => {
        expect(expandedRegion).not.toBeVisible();
        expect(collapsedRegion).toBeVisible();
      });
    });
    await step("Side Nav Expand", async ({}) => {
      await userEvent.click(collapsedRegion);
      await waitFor(() => {
        expect(collapsedRegion).not.toBeVisible();
        expect(expandedRegion).toBeVisible();
      });
    });
  },
};
