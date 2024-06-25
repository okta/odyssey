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
} from "@okta/odyssey-react-mui/icons";

const storybookMeta: Meta<SideNavProps> = {
  title: "Labs Components/SideNav",
  component: SideNav,
  argTypes: {
    navHeaderText: {
      control: "text",
      description: "The label text for the Nav link",
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
  },
  args: {
    navHeaderText: "Admin",
    isCollapsible: true,
    onCollapse: () => {},
    sideNavItems: [
      {
        id: "AddNewFolder",
        href: "/?path=/story/labs-components-switch--default",
        label: "Add new folder",
        endIcon: <AddCircleIcon />,
      },
      {
        id: "item0-0",
        label: "Admin",
        href: "",
        isSectionHeader: true,
      },
      {
        id: "item1",
        href: "/",
        label: "Dashboard",
        children: [
          {
            id: "item1-1",
            href: "/",
            label: "Home",
            startIcon: <HomeIcon />,
          },
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
            startIcon: <CheckIcon />,
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
        id: "item0-1",
        href: "/",
        label: "Users",
        startIcon: <UserIcon />,
      },
      {
        id: "item0-2",
        href: "/",
        label: "Profiles",
        startIcon: <GlobeIcon />,
      },
      {
        id: "item0-3",
        label: "Resource Management",
        href: "",
        isSectionHeader: true,
      },
      {
        id: "item0-1-2",
        href: "/",
        label: "Directory",
        startIcon: <DirectoryIcon />,
      },
      {
        id: "item2",
        href: "/",
        label: "Applications",
        startIcon: <AppsIcon />,
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
        startIcon: <CopyIcon />,
        endIcon: <DownloadIcon />,
      },
      {
        id: "item3-1-2",
        href: "/",
        label: "Workflows",
        target: "_blank",
        startIcon: <ClockIcon />,
      },
      {
        id: "item3-0",
        label: "Security Administration",
        href: "",
        isSectionHeader: true,
      },
      {
        id: "item3",
        href: "/",
        label: "Security",
        endIcon: <LockIcon />,
      },
      {
        id: "item4",
        href: "/",
        label: "Settings",
        startIcon: <SettingsIcon />,
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
        href: "/",
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
      <SideNav
        navHeaderText={props.navHeaderText}
        isCollapsible={props.isCollapsible}
        onCollapse={props.onCollapse}
        sideNavItems={props.sideNavItems}
        footerItems={props.footerItems}
      />
    );
  },
};
