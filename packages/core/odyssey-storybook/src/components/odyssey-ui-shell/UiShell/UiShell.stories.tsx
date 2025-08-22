/*!
 * Copyright (c) 2023-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import {
  Banner,
  Box,
  Button,
  OdysseyProvider,
  Paragraph,
  SearchField,
  Surface,
} from "@okta/odyssey-react-mui";
import { PageTemplate, UserProfile } from "@okta/odyssey-react-mui/labs";
import {
  UiShell,
  uiShellDataAttribute,
  type UiShellNavComponentProps,
  type UiShellProps,
} from "@okta/odyssey-react-mui/ui-shell";
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
import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { useCallback, useEffect, useRef, useState } from "react";
import PlaceholderLogo from "../../odyssey-labs/PickerWithOptionAdornment/PlaceholderLogo.js";
import { createMessageBus } from "../../../../../odyssey-react-mui/src/ui-shell/createMessageBus.js";
import { BaseButton } from "../../../../../odyssey-react-mui/src/Buttons/BaseButton.js";

const meta = {
  title: "UI Shell Components/UI Shell",
  component: UiShell,
  tags: ["!autodocs"],
  argTypes: {
    appBackgroundColor: {
      control: "color",
      description:
        "Custom color for app content background. Should only be used as a stop-gap to allow support for dark mode.",
      table: {
        type: {
          summary: "hex color code",
        },
      },
    },
    appElement: {
      control: undefined,
      description: "Element that the consuming app renders into.",
      table: {
        type: {
          summary: "InputType",
        },
      },
    },
    appElementScrollingMode: {
      control: undefined,
      description: "Mode used for scrolling.",
      table: {
        type: {
          summary: "InputType",
        },
      },
    },
    hasStandardAppContentPadding: {
      control: "boolean",
      description:
        "defaults to `true`. If `false`, the content area will have no padding provided",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    initialVisibleSections: {
      control: "text",
      description:
        "A list of UiShell components that should be (minimally) rendered initially, with their isLoading property set when applicable. Allows the initial visibility of UiShell components to be influenced.",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    onError: {
      description:
        'Notifies when a React rendering error occurs. This could be useful for logging, flagging "p0"s, and recovering UI Shell when errors occur.',
      table: {
        defaultValue: {
          summary: "console.error",
        },
        type: {
          summary: "string",
        },
      },
    },
    onSubscriptionCreated: {
      description:
        "Notifies when subscribed to prop changes. UI Shell listens to prop updates, and it won't subscribe synchronously. Because of that, this callback notifies when that subscription is ready.",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    optionalComponents: {
      description:
        "Components that will render as children of various other components such as the top nav or side nav.",
      table: {
        type: {
          summary: "ReactElement",
        },
      },
    },
    sideNavBackgroundColor: {
      control: "color",
      description: "Custom color for side nav background",
      table: {
        type: {
          summary: "hex color code",
        },
      },
    },
    subscribeToPropChanges: {
      description:
        "This is a callback that provides a subscriber callback to listen for changes to state. It allows UI Shell to listen for state changes. The props coming in this callback go directly to a React state; therefore, it shares the same signature and provides a previous state.",
      table: {
        type: {
          summary: "MouseEventHandler",
        },
      },
    },
    topNavBackgroundColor: {
      control: "color",
      description:
        "Custom color for top nav background. Should only be used as a stop-gap to allow support for dark mode.",
      table: {
        type: {
          summary: "hex color code",
        },
      },
    },
  },
  args: {
    appElement: document.createElement("div"),
    appElementScrollingMode: "vertical",
    onSubscriptionCreated: fn(),
    uiShellAppElement: document.createElement("div"),
    uiShellStylesElement: document.head,
  },
  parameters: {
    // docs: {
    //   inlineStories: false,
    // },
    layout: "fullscreen",
  },
} satisfies Meta<typeof UiShell>;

export default meta;

const sharedAppSwitcherProps = {
  appIcons: [
    {
      appIconDefaultUrl: "/appswitcher/admin-app-default.svg",
      appIconSelectedUrl: "/appswitcher/admin-app-selected.svg",
      appName: "saasure",
      label: "Admin Dashboard",
      linkUrl: "http://rain-admin.okta1.com:1802/admin/dashboard",
    },
    {
      appIconDefaultUrl: "/appswitcher/okta-dashboard-default.svg",
      appIconSelectedUrl: "/appswitcher/okta-dashboard-selected.svg",
      appName: "okta_enduser",
      label: "Okta Dashboard",
      linkUrl: "http://rain.okta1.com:1802/app/UserHome",
    },
    {
      appIconDefaultUrl: "/appswitcher/workflows-default.svg",
      appIconSelectedUrl: "/appswitcher/workflows-selected.svg",
      appName: "okta_flow_sso",
      label: "Okta Workflows",
      linkUrl: "http://rain-admin.okta1.com:1802/flow/go",
    },
  ],
  isLoading: false,
  selectedAppName: "okta_enduser",
} as const satisfies UiShellNavComponentProps["appSwitcherProps"];

const sharedSideNavProps = {
  appName: "Enduser",
  isCollapsible: true,
  sideNavItems: [
    {
      id: "item1",
      label: "Add new folder",
      endIcon: <AddCircleIcon />,
      onClick: () => {},
    },
    {
      id: "item2",
      label: "Admin",
      isSectionHeader: true,
    },
    {
      id: "item3",
      href: "/?path=/docs/mui-components-typography--docs",
      label: "Users",
      startIcon: <UserIcon />,
    },
    {
      id: "item4",
      label: "Dashboard",
      startIcon: <HomeIcon />,
      isDisabled: true,
      nestedNavItems: [
        {
          id: "item4-1",
          href: "/",
          label: "Home",
        },
      ],
    },
    {
      id: "item5",
      href: "/",
      label: "Applications",
      startIcon: <AppsIcon />,
    },
    {
      id: "item6",
      label: "Onboarding",
      startIcon: <FolderIcon />,
      nestedNavItems: [
        {
          id: "item6-1",
          href: "/",
          label: "Start",
        },
        {
          id: "item6-2",
          href: "/",
          label: "Tasks",
        },
        {
          id: "item6-3",
          href: "/",
          label: "Getting Started",
        },
      ],
    },
    {
      id: "item7",
      href: "/",
      label: "Directory",
      startIcon: <DirectoryIcon />,
    },
    {
      id: "item8",
      label: "Resource Management",
      isSectionHeader: true,
    },
    {
      id: "item9",
      href: "/",
      label: "Kubernetes",
      startIcon: <ServerIcon />,
      severity: "info",
      statusLabel: "BETA",
    },
    {
      id: "item10",
      href: "/",
      label: "Reports",
      startIcon: <DownloadIcon />,
    },
    {
      id: "item11",
      href: "/",
      label: "Identify Governance",
      target: "_blank",
      isDisabled: true,
      startIcon: <Fido2Icon />,
    },
    {
      id: "item12",
      href: "/",
      label: "Workflows",
      target: "_blank",
      startIcon: <ClockIcon />,
    },
    {
      id: "item13",
      label: "Security Administration",
      isSectionHeader: true,
    },
    {
      id: "item14",
      href: "/",
      label: "Security",
      startIcon: <LockIcon />,
      endIcon: <LockIcon />,
    },
    {
      id: "item15",
      label: "Settings",
      isDefaultExpanded: true,
      isSortable: true,
      startIcon: <SettingsIcon />,
      nestedNavItems: [
        {
          id: "item15-1",
          href: "/",
          label: "General",
        },
        {
          id: "item15-2",
          href: "/",
          label: "Custom Domain",
          isSelected: true,
        },
        {
          id: "item15-3",
          label: "Account Management",
        },
        {
          id: "item15-4",
          href: "/",
          label: "Authentication Policies",
          isDisabled: true,
        },
        {
          id: "item15-5",
          href: "/",
          label: "IDP Configuration",
        },
      ],
    },
    {
      id: "item16",
      href: "/",
      label: "System Configuration",
      startIcon: <FolderIcon />,
    },
    {
      id: "item17-0",
      label: "Enduser",
      isSectionHeader: true,
    },
    {
      id: "item17",
      label: "My Apps",
      isDefaultExpanded: true,
      isSortable: true,
      startIcon: <HomeIcon />,
      nestedNavItems: [
        {
          id: "item17-1",
          label: "Recently Used",
        },
        {
          id: "item17-2",
          label: "Work",
        },
        {
          id: "item17-3",
          label: "Add section",
          endIcon: <AddCircleIcon />,
        },
      ],
    },
    {
      id: "item18",
      label: "Notifications",
      startIcon: <NotificationIcon />,
      count: 1,
    },
    {
      id: "item19",
      label: "Add apps",
      startIcon: <AppsIcon />,
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
} as const satisfies UiShellNavComponentProps["sideNavProps"];

type Story = StoryObj<typeof meta>;

const sharedTopNavProps = {
  // topNavLinkItems: [
  //   {
  //     id: "link-01",
  //     label: "Home",
  //     href: "#none",
  //   },
  //   {
  //     id: "link-02",
  //     label: "Flows",
  //     href: "#none",
  //   },
  //   {
  //     id: "link-03",
  //     label: "Connections",
  //     href: "#none",
  //     isDisabled: true,
  //   },
  //   {
  //     id: "link-04",
  //     label: "Template",
  //     onClick: () => {},
  //   },
  // ],
} as const satisfies UiShellNavComponentProps["topNavProps"];

const sharedOptionalComponents = {
  topNavLeftSide: (
    <div>
      <SearchField label="Search" placeholder="Search..." />
    </div>
  ),
  topNavRightSide: (
    <UserProfile
      profileIcon={<UserIcon />}
      orgName="ORG123"
      userName="test.user@test.com"
    />
  ),
} as const satisfies UiShellProps["optionalComponents"];

const useRefWithRerenderHack = () => {
  /**
   * We need to force a rerender due to the funky ref stuff
   */
  const [, setHack] = useState(0);

  useEffect(() => {
    setHack(1);
  }, []);

  return useRef<HTMLDivElement>(null);
};

export const Default: Story = {
  args: {
    subscribeToPropChanges: (subscriber) => {
      subscriber({
        sideNavProps: {
          appName: "Odyssey Storybook",
          sideNavItems: [],
        },
      });

      return () => {};
    },
  },
};

export const LoadingFirstRender: Story = {
  args: {
    subscribeToPropChanges: () => fn(),
  },
};

export const InvisibleFirstRender: Story = {
  args: {
    initialVisibleSections: [],
    subscribeToPropChanges: () => fn(),
  },
};

export const TopNavOnly: Story = {
  args: {
    initialVisibleSections: ["TopNav"],
    optionalComponents: sharedOptionalComponents,
    subscribeToPropChanges: (subscriber) => {
      subscriber({
        topNavProps: sharedTopNavProps,
      });

      return () => {};
    },
  },
};

export const AppSwitcherOnly: Story = {
  args: {
    hasStandardAppContentPadding: false,
    initialVisibleSections: ["AppSwitcher"],
    subscribeToPropChanges: (subscriber) => {
      subscriber({
        appSwitcherProps: sharedAppSwitcherProps,
      });

      return () => {};
    },
  },
};

export const LoadingData: Story = {
  args: {
    optionalComponents: sharedOptionalComponents,
    subscribeToPropChanges: (subscriber) => {
      subscriber({
        appSwitcherProps: {
          ...sharedAppSwitcherProps,
          isLoading: true,
        },
        sideNavProps: {
          ...sharedSideNavProps,
          isLoading: true,
        },
        topNavProps: {},
      });

      return () => {};
    },
  },
};

export const WithCustomColors: Story = {
  args: {
    appBackgroundColor: undefined,
    optionalComponents: sharedOptionalComponents,
    sideNavBackgroundColor: undefined,
    subscribeToPropChanges: (subscriber) => {
      subscriber({
        topNavProps: sharedTopNavProps,
        sideNavProps: {
          ...sharedSideNavProps,
          logoProps: {
            isSameBackgroundAsMain: true,
          },
        },
      });

      return () => {};
    },
    topNavBackgroundColor: undefined,
  },
};

export const WithoutAppContent: Story = {
  args: {
    optionalComponents: sharedOptionalComponents,
    subscribeToPropChanges: (subscriber) => {
      subscriber({
        appSwitcherProps: sharedAppSwitcherProps,
        sideNavProps: sharedSideNavProps,
        topNavProps: sharedTopNavProps,
      });

      return () => {};
    },
  },
};

export const WithoutSideNav: Story = {
  args: {
    initialVisibleSections: ["AppSwitcher", "TopNav"],
    optionalComponents: sharedOptionalComponents,
    subscribeToPropChanges: (subscriber) => {
      subscriber({
        appSwitcherProps: sharedAppSwitcherProps,
        sideNavProps: {
          ...sharedSideNavProps,
          isCollapsed: true,
          isCollapsible: false,
        },
        topNavProps: sharedTopNavProps,
      });

      return () => {};
    },
  },
};

const EXPECTED_LINE_HEIGHT = "30px";
export const WithTallAppContentAndNoStorybookDecorator: Story = {
  args: {
    optionalComponents: sharedOptionalComponents,
    subscribeToPropChanges: (subscriber) => {
      subscriber({
        appSwitcherProps: sharedAppSwitcherProps,
        sideNavProps: {
          ...sharedSideNavProps,
          logoProps: {
            logoComponent: <PlaceholderLogo.One />,
          },
        },
        topNavProps: sharedTopNavProps,
      });

      return () => {};
    },
  },
  parameters: {
    isMuiThemeDecoratorDisabled: true,
  },
  render: function C(props) {
    const appElementRef = useRefWithRerenderHack();

    const [isReady, setIsReady] = useState(false);

    const onSubscriptionCreated = useCallback(() => {
      setIsReady(true);
    }, []);

    useEffect(() => {
      if (isReady) {
        const outputSpan = document.getElementById("lineHeightOutput");

        if (outputSpan) {
          outputSpan.innerText = getComputedStyle(outputSpan).lineHeight;
        }
      }
    }, [isReady]);

    return (
      <>
        <div ref={appElementRef}>
          <style>
            {`body { line-height: ${EXPECTED_LINE_HEIGHT} !important; }`}
          </style>

          {isReady && (
            <Surface>
              <div
                style={{
                  float: "right",
                  width: "200px",
                  height: "200px",
                  padding: "20px",
                  backgroundColor: "lightgray",
                  zIndex: 1,
                  position: "relative",
                }}
              >
                A box to demonstrate whether the TopNav shadow clips or not (it
                should not since{" "}
                <a href="https://github.com/okta/odyssey/pull/2461/files#diff-45b62c71e0e59aaed6b2683e0efe6fb7239b2bcf5573f4946340992efeff3c4a">
                  this PR
                </a>
                ).
              </div>
              <p>
                Line Height: <span id="lineHeightOutput"></span> &lt;- THIS
                VALUE SHOULD BE "{EXPECTED_LINE_HEIGHT}" if there hasn't been a
                regression.
              </p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
              lacinia leo quis sodales scelerisque. Maecenas tempor eget nunc
              sit amet ultrices. Maecenas et varius ante. Nulla eu quam sit amet
              orci fermentum dictum sit amet scelerisque libero. Proin luctus
              semper elit, ut pretium massa tristique a. Mauris hendrerit ex eu
              commodo egestas. Etiam a lacus aliquet, convallis metus et,
              sollicitudin odio. Fusce vehicula purus sed orci elementum, ut
              cursus diam sollicitudin. Pellentesque pulvinar nibh turpis, eu
              finibus dolor egestas eget. Duis tellus mauris, pulvinar sit amet
              ante a, aliquet laoreet sapien. Ut quis tempus massa. Fusce
              fringilla mattis lacinia. Cras at pharetra quam, eu ultrices
              ipsum. Etiam malesuada, ex consectetur fringilla faucibus, quam
              lorem luctus diam, vitae lobortis urna lorem ac libero. Nulla a
              fermentum ligula, ut pulvinar odio. Cras in dictum nibh. Ut et
              orci sodales, laoreet sem nec, volutpat sapien. Phasellus dui
              turpis, euismod vitae euismod porta, semper a tellus. Morbi
              bibendum eros quam, et suscipit ex blandit eu. Etiam placerat,
              tellus viverra rutrum porttitor, elit arcu molestie nibh, at porta
              arcu odio ut neque. Donec id odio ut neque malesuada pulvinar a in
              tortor. Fusce eu urna lobortis, rhoncus odio nec, scelerisque
              dolor. Donec tempor eros sed condimentum rutrum. Vivamus ac odio
              ac erat bibendum ultricies. Cras nec libero sit amet leo luctus
              gravida. Praesent placerat massa ex. Donec vehicula orci ac
              consequat mollis. Sed vitae magna ligula. Nulla pulvinar lectus
              ex, sed varius enim pulvinar vel. Morbi viverra vitae dui sit amet
              mattis. Phasellus quis augue viverra, rhoncus tellus non,
              elementum massa. Donec posuere luctus ultrices. Ut eu massa sem.
              Aliquam sed mattis nulla, ac fermentum magna. Vestibulum ac ex ut
              massa molestie gravida. Cras est arcu, varius nec fringilla
              semper, aliquet id nunc. Quisque facilisis, nulla nec ornare
              vehicula, justo urna feugiat lorem, nec pretium odio nisl
              facilisis diam. Sed a quam in risus semper convallis sed eget
              mauris. Proin vitae purus augue. Ut et risus justo. Mauris porta,
              leo non vestibulum cursus, ante nisi sagittis magna, et convallis
              enim arcu a diam. Ut tincidunt urna ac massa consectetur euismod.
              Aenean sagittis nisi mi, eu bibendum arcu auctor at. Sed et urna
              sit amet sapien euismod vulputate molestie eu ipsum. Phasellus
              mattis semper neque, et porttitor mi scelerisque eget. Donec non
              egestas ex, ac consequat nunc. Nunc sed risus ac orci ullamcorper
              lacinia vel at risus. Nulla et odio eros. Vivamus tempor ultricies
              mi sed luctus. Duis faucibus sollicitudin odio, quis rhoncus orci
              volutpat nec. Vivamus id eros et est aliquam porttitor. Maecenas
              maximus magna sed est condimentum hendrerit. Integer fringilla
              posuere nisl, vitae molestie magna dictum id. Suspendisse volutpat
              pharetra mauris, sed vehicula nulla suscipit a. Morbi sed augue
              sodales, molestie purus et, egestas enim. Proin ut metus tempus,
              ultricies neque vel, vulputate lectus. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Mauris lacinia leo quis sodales
              scelerisque. Maecenas tempor eget nunc sit amet ultrices. Maecenas
              et varius ante. Nulla eu quam sit amet orci fermentum dictum sit
              amet scelerisque libero. Proin luctus semper elit, ut pretium
              massa tristique a. Mauris hendrerit ex eu commodo egestas. Etiam a
              lacus aliquet, convallis metus et, sollicitudin odio. Fusce
              vehicula purus sed orci elementum, ut cursus diam sollicitudin.
              Pellentesque pulvinar nibh turpis, eu finibus dolor egestas eget.
              Duis tellus mauris, pulvinar sit amet ante a, aliquet laoreet
              sapien. Ut quis tempus massa. Fusce fringilla mattis lacinia. Cras
              at pharetra quam, eu ultrices ipsum. Etiam malesuada, ex
              consectetur fringilla faucibus, quam lorem luctus diam, vitae
              lobortis urna lorem ac libero. Nulla a fermentum ligula, ut
              pulvinar odio. Cras in dictum nibh. Ut et orci sodales, laoreet
              sem nec, volutpat sapien. Phasellus dui turpis, euismod vitae
              euismod porta, semper a tellus. Morbi bibendum eros quam, et
              suscipit ex blandit eu. Etiam placerat, tellus viverra rutrum
              porttitor, elit arcu molestie nibh, at porta arcu odio ut neque.
              Donec id odio ut neque malesuada pulvinar a in tortor. Fusce eu
              urna lobortis, rhoncus odio nec, scelerisque dolor. Donec tempor
              eros sed condimentum rutrum. Vivamus ac odio ac erat bibendum
              ultricies. Cras nec libero sit amet leo luctus gravida. Praesent
              placerat massa ex. Donec vehicula orci ac consequat mollis. Sed
              vitae magna ligula. Nulla pulvinar lectus ex, sed varius enim
              pulvinar vel. Morbi viverra vitae dui sit amet mattis. Phasellus
              quis augue viverra, rhoncus tellus non, elementum massa. Donec
              posuere luctus ultrices. Ut eu massa sem. Aliquam sed mattis
              nulla, ac fermentum magna. Vestibulum ac ex ut massa molestie
              gravida. Cras est arcu, varius nec fringilla semper, aliquet id
              nunc. Quisque facilisis, nulla nec ornare vehicula, justo urna
              feugiat lorem, nec pretium odio nisl facilisis diam. Sed a quam in
              risus semper convallis sed eget mauris. Proin vitae purus augue.
              Ut et risus justo. Mauris porta, leo non vestibulum cursus, ante
              nisi sagittis magna, et convallis enim arcu a diam. Ut tincidunt
              urna ac massa consectetur euismod. Aenean sagittis nisi mi, eu
              bibendum arcu auctor at. Sed et urna sit amet sapien euismod
              vulputate molestie eu ipsum. Phasellus mattis semper neque, et
              porttitor mi scelerisque eget. Donec non egestas ex, ac consequat
              nunc. Nunc sed risus ac orci ullamcorper lacinia vel at risus.
              Nulla et odio eros. Vivamus tempor ultricies mi sed luctus. Duis
              faucibus sollicitudin odio, quis rhoncus orci volutpat nec.
              Vivamus id eros et est aliquam porttitor. Maecenas maximus magna
              sed est condimentum hendrerit. Integer fringilla posuere nisl,
              vitae molestie magna dictum id. Suspendisse volutpat pharetra
              mauris, sed vehicula nulla suscipit a. Morbi sed augue sodales,
              molestie purus et, egestas enim. Proin ut metus tempus, ultricies
              neque vel, vulputate lectus. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Mauris lacinia leo quis sodales
              scelerisque. Maecenas tempor eget nunc sit amet ultrices. Maecenas
              et varius ante. Nulla eu quam sit amet orci fermentum dictum sit
              amet scelerisque libero. Proin luctus semper elit, ut pretium
              massa tristique a. Mauris hendrerit ex eu commodo egestas. Etiam a
              lacus aliquet, convallis metus et, sollicitudin odio. Fusce
              vehicula purus sed orci elementum, ut cursus diam sollicitudin.
              Pellentesque pulvinar nibh turpis, eu finibus dolor egestas eget.
              Duis tellus mauris, pulvinar sit amet ante a, aliquet laoreet
              sapien. Ut quis tempus massa. Fusce fringilla mattis lacinia. Cras
              at pharetra quam, eu ultrices ipsum. Etiam malesuada, ex
              consectetur fringilla faucibus, quam lorem luctus diam, vitae
              lobortis urna lorem ac libero. Nulla a fermentum ligula, ut
              pulvinar odio. Cras in dictum nibh. Ut et orci sodales, laoreet
              sem nec, volutpat sapien. Phasellus dui turpis, euismod vitae
              euismod porta, semper a tellus. Morbi bibendum eros quam, et
              suscipit ex blandit eu. Etiam placerat, tellus viverra rutrum
              porttitor, elit arcu molestie nibh, at porta arcu odio ut neque.
              Donec id odio ut neque malesuada pulvinar a in tortor. Fusce eu
              urna lobortis, rhoncus odio nec, scelerisque dolor. Donec tempor
              eros sed condimentum rutrum. Vivamus ac odio ac erat bibendum
              ultricies. Cras nec libero sit amet leo luctus gravida. Praesent
              placerat massa ex. Donec vehicula orci ac consequat mollis. Sed
              vitae magna ligula. Nulla pulvinar lectus ex, sed varius enim
              pulvinar vel. Morbi viverra vitae dui sit amet mattis. Phasellus
              quis augue viverra, rhoncus tellus non, elementum massa. Donec
              posuere luctus ultrices. Ut eu massa sem. Aliquam sed mattis
              nulla, ac fermentum magna. Vestibulum ac ex ut massa molestie
              gravida. Cras est arcu, varius nec fringilla semper, aliquet id
              nunc. Quisque facilisis, nulla nec ornare vehicula, justo urna
              feugiat lorem, nec pretium odio nisl facilisis diam. Sed a quam in
              risus semper convallis sed eget mauris. Proin vitae purus augue.
              Ut et risus justo. Mauris porta, leo non vestibulum cursus, ante
              nisi sagittis magna, et convallis enim arcu a diam. Ut tincidunt
              urna ac massa consectetur euismod. Aenean sagittis nisi mi, eu
              bibendum arcu auctor at. Sed et urna sit amet sapien euismod
              vulputate molestie eu ipsum. Phasellus mattis semper neque, et
              porttitor mi scelerisque eget. Donec non egestas ex, ac consequat
              nunc. Nunc sed risus ac orci ullamcorper lacinia vel at risus.
              Nulla et odio eros. Vivamus tempor ultricies mi sed luctus. Duis
              faucibus sollicitudin odio, quis rhoncus orci volutpat nec.
              Vivamus id eros et est aliquam porttitor. Maecenas maximus magna
              sed est condimentum hendrerit. Integer fringilla posuere nisl,
              vitae molestie magna dictum id. Suspendisse volutpat pharetra
              mauris, sed vehicula nulla suscipit a. Morbi sed augue sodales,
              molestie purus et, egestas enim. Proin ut metus tempus, ultricies
              neque vel, vulputate lectus. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Mauris lacinia leo quis sodales
              scelerisque. Maecenas tempor eget nunc sit amet ultrices. Maecenas
              et varius ante. Nulla eu quam sit amet orci fermentum dictum sit
              amet scelerisque libero. Proin luctus semper elit, ut pretium
              massa tristique a. Mauris hendrerit ex eu commodo egestas. Etiam a
              lacus aliquet, convallis metus et, sollicitudin odio. Fusce
              vehicula purus sed orci elementum, ut cursus diam sollicitudin.
              Pellentesque pulvinar nibh turpis, eu finibus dolor egestas eget.
              Duis tellus mauris, pulvinar sit amet ante a, aliquet laoreet
              sapien. Ut quis tempus massa. Fusce fringilla mattis lacinia. Cras
              at pharetra quam, eu ultrices ipsum. Etiam malesuada, ex
              consectetur fringilla faucibus, quam lorem luctus diam, vitae
              lobortis urna lorem ac libero. Nulla a fermentum ligula, ut
              pulvinar odio. Cras in dictum nibh. Ut et orci sodales, laoreet
              sem nec, volutpat sapien. Phasellus dui turpis, euismod vitae
              euismod porta, semper a tellus. Morbi bibendum eros quam, et
              suscipit ex blandit eu. Et…
            </Surface>
          )}
        </div>

        <UiShell
          {...props}
          appElement={appElementRef.current!}
          onSubscriptionCreated={onSubscriptionCreated}
        />
      </>
    );
  },

  // NOTE: NO `decorators` HERE as we explicitly don't want the `<OdysseyProvider>` present in the decorator.
  // ALL OTHER STORIES in this file should have `decorators` specified.
};

const {
  publish: closeRightSideMenu,
  subscribe: subscribeToCloseRightSideMenu,
} = createMessageBus();

export const WithOdysseyAppContent: Story = {
  args: {
    optionalComponents: {
      ...sharedOptionalComponents,
      banners: <Banner severity="success" text="This is an app!" />,
      rightSideMenu: (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <BaseButton onClick={() => closeRightSideMenu()} variant="floating">
            <UserProfile
              orgName="ORG123"
              profileIcon={<UserIcon />}
              userName="test.user@test.com"
            />
          </BaseButton>
        </Box>
      ),
    },
    subscribeToCloseRightSideMenu,
    subscribeToPropChanges: (subscriber) => {
      subscriber({
        appSwitcherProps: sharedAppSwitcherProps,
        sideNavProps: sharedSideNavProps,
        topNavProps: sharedTopNavProps,
      });

      return () => {};
    },
  },
  render: function C(props) {
    const appElementRef = useRefWithRerenderHack();

    const [isReady, setIsReady] = useState(false);

    const onSubscriptionCreated = useCallback(() => {
      setIsReady(true);
    }, []);

    return (
      <>
        <div ref={appElementRef}>
          {/* This is normally rendered by `renderUiShell`, but we're rendering `UiShell` outside of a web component, so we need to add this data attribute ourselves. */}
          <div {...{ [uiShellDataAttribute]: "" }} />

          {isReady && (
            <OdysseyProvider>
              <PageTemplate
                description="This is my app."
                title="Access Certification"
              >
                <Surface>
                  <div style={{ marginBlockEnd: `${16 / 14}rem` }}>
                    <Paragraph>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Mauris lacinia leo quis sodales scelerisque. Maecenas
                      tempor eget nunc sit amet ultrices. Maecenas et varius
                      ante. Nulla eu quam sit amet orci fermentum dictum sit
                      amet scelerisque libero. Proin luctus semper elit, ut
                      pretium massa tristique a. Mauris hendrerit ex eu commodo
                      egestas. Etiam a lacus aliquet, convallis metus et,
                      sollicitudin odio. Fusce vehicula purus sed orci
                      elementum, ut cursus diam sollicitudin. Pellentesque
                      pulvinar nibh turpis, eu finibus dolor egestas eget. Duis
                      tellus mauris, pulvinar sit amet ante a, aliquet laoreet
                      sapien. Ut quis tempus massa. Fusce fringilla mattis
                      lacinia. Cras at pharetra quam, eu ultrices ipsum.
                    </Paragraph>
                  </div>
                  <div>
                    <Button label="I understand" variant="primary" />
                  </div>
                </Surface>
              </PageTemplate>
            </OdysseyProvider>
          )}
        </div>

        <UiShell
          {...props}
          appElement={appElementRef.current!}
          onSubscriptionCreated={onSubscriptionCreated}
        />
      </>
    );
  },
};
