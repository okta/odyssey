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

import { Meta, StoryObj } from "@storybook/react";
import { MuiThemeDecorator } from "../../../../.storybook/components";
import {
  Banner,
  Button,
  OdysseyProvider,
  Paragraph,
  // SearchField,
  Surface,
} from "@okta/odyssey-react-mui";
import { PageTemplate, UserProfile } from "@okta/odyssey-react-mui/labs";
import {
  UiShell,
  uiShellDataAttribute,
  type UiShellNavComponentProps,
  type UiShellProps,
} from "@okta/odyssey-react-mui/ui-shell";
import { DataTable } from "@okta/odyssey-react-mui";
import {
  columns as planetColumns,
  data as planetData,
} from "../../odyssey-mui/DataTable/planetData";
import {
  DataTableGetDataType,
  DataTableOnReorderRowsType,
} from "@okta/odyssey-react-mui/labs";
import { Planet } from "../../odyssey-mui/DataTable/planetData";
import { Person } from "../../odyssey-mui/DataTable/personData";
import {
  AddCircleIcon,
  //  HomeIcon,
  UserIcon,
} from "@okta/odyssey-react-mui/icons";

const filterData = ({
  data,
  ...args
}: {
  data: (Planet | Person)[];
} & DataTableGetDataType) => {
  let filteredData = data;
  const { search, filters, sort, page = 1, resultsPerPage = 20 } = args;

  if (search) {
    filteredData = filteredData.filter((row) =>
      Object.values(row).some((value) =>
        value.toString().toLowerCase().includes(search.toLowerCase()),
      ),
    );
  }

  if (filters) {
    filteredData = filteredData.filter((row) => {
      return filters.every(({ id, value }) => {
        if (value === null || value === undefined) {
          return true;
        }
        if (Array.isArray(value)) {
          return value.some((arrayValue) =>
            row[id as keyof (Planet | Person)]
              ?.toString()
              .toLowerCase()
              .includes(arrayValue.toString().toLowerCase()),
          );
        }
        return row[id as keyof (Planet | Person)]
          ?.toString()
          .toLowerCase()
          .includes(value.toString().toLowerCase());
      });
    });
  }

  if (sort && sort.length > 0) {
    filteredData.sort((a, b) => {
      for (const { id, desc } of sort) {
        const aValue = a[id as keyof (Planet | Person)];
        const bValue = b[id as keyof (Planet | Person)];
        if (aValue < bValue) return desc ? 1 : -1;
        if (aValue > bValue) return desc ? -1 : 1;
      }
      return 0;
    });
  }

  const startRow = (page - 1) * resultsPerPage;
  const endRow = startRow + resultsPerPage;
  filteredData = filteredData.slice(startRow, endRow);

  return filteredData;
};

const reorderData = <T extends { id: string | number }>({
  data,
  ...args
}: {
  data: T[];
} & DataTableOnReorderRowsType) => {
  const updatedData = data;
  const { rowId, newRowIndex } = args;
  const rowIndex = updatedData.findIndex((row) => row.id === rowId);

  if (rowIndex !== -1) {
    const [removedRow] = updatedData.splice(rowIndex, 1);
    updatedData.splice(newRowIndex, 0, removedRow);
  }

  return updatedData;
};

const storybookMeta: Meta<UiShellProps> = {
  title: "UI Shell Components/UI Shell",
  component: UiShell,
  argTypes: {
    appComponent: {
      control: "",
      description: "App component that renders inside the content area.",
      table: {
        type: {
          summary: "string",
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
      control: "function",
      description:
        'Notifies when a React rendering error occurs. This could be useful for logging, flagging "p0"s, and recovering UI Shell when errors occur.',
      table: {
        defaultValue: console.error,
        type: {
          summary: "string",
        },
      },
    },
    onSubscriptionCreated: {
      control: "function",
      description:
        "Notifies when subscribed to prop changes. UI Shell listens to prop updates, and it won't subscribe synchronously. Because of that, this callback notifies when that subscription is ready.",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    optionalComponents: {
      control: null,
      description:
        "Components that will render as children of various other components such as the top nav or side nav.",
      table: {
        type: {
          summary: "ReactElement",
        },
      },
    },
    subscribeToPropChanges: {
      control: "function",
      description:
        "This is a callback that provides a subscriber callback to listen for changes to state. It allows UI Shell to listen for state changes. The props coming in this callback go directly to a React state; therefore, it shares the same signature and provides a previous state.",
      table: {
        type: {
          summary: "MouseEventHandler",
        },
      },
    },
  },
  args: {
    appComponent: <div />,
    subscribeToPropChanges: () => () => {},
  },
  decorators: [MuiThemeDecorator],
  parameters: {
    layout: "fullscreen",
  },
};

export default storybookMeta;

const sharedAppSwitcherProps: UiShellNavComponentProps["appSwitcherProps"] = {
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
};

const sharedSideNavProps: UiShellNavComponentProps["sideNavProps"] = {
  appName: "Enduser",
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
      // startIcon: <HomeIcon />,
      isDisabled: true,
      nestedNavItems: [
        {
          id: "item1-1",
          href: "/",
          label: "Home",
        },
      ],
    },
  ],
};

const sharedTopNavProps: UiShellNavComponentProps["topNavProps"] = {
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
};

const sharedOptionalComponents: UiShellProps["optionalComponents"] = {
  topNavLeftSide: (
    <div>{/* <SearchField label="Search" placeholder="Search..." /> */}</div>
  ),
  topNavRightSide: (
    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
      <Button
        variant="secondary"
        tooltipText={
          window.location.href.includes("backgrounds.value:!hex(1d1d1d)")
            ? "Toggle Light mode"
            : "Toggle Dark mode"
        }
        href={
          window.location.href.includes("backgrounds.value:!hex(1d1d1d)")
            ? window.location.href.replace(
                "backgrounds.value:!hex(1d1d1d)",
                "backgrounds.value:!hex(ffffff)",
              )
            : window.location.href.replace(
                "backgrounds.value:!hex(ffffff)",
                "backgrounds.value:!hex(1d1d1d)",
              )
        }
        label={
          window.location.href.includes("backgrounds.value:!hex(1d1d1d)")
            ? "☾"
            : "☼"
        }
      />
      <UserProfile
        profileIcon={<UserIcon />}
        contrastMode={
          window.location.href.includes("backgrounds.value:!hex(1d1d1d)")
            ? "highContrast"
            : "lowContrast"
        }
        orgName="ORG123"
        userName="test.user@test.com"
      />
    </div>
  ),
};
export const Default: StoryObj<UiShellProps> = {
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

export const LoadingFirstRender: StoryObj<UiShellProps> = {};

export const InvisibleFirstRender: StoryObj<UiShellProps> = {
  args: {
    initialVisibleSections: [],
  },
};

export const TopNavOnly: StoryObj<UiShellProps> = {
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

export const AppSwitcherOnly: StoryObj<UiShellProps> = {
  args: {
    initialVisibleSections: ["AppSwitcher"],
    subscribeToPropChanges: (subscriber) => {
      subscriber({
        topNavProps: {},
        appSwitcherProps: sharedAppSwitcherProps,
      });

      return () => {};
    },
  },
};

export const LoadingData: StoryObj<UiShellProps> = {
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

export const WithoutAppContent: StoryObj<UiShellProps> = {
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

export const HackweekTableExample: StoryObj<UiShellProps> = {
  args: {
    appComponent: (
      <div
        style={{
          backgroundColor: window.location.href.includes(
            "backgrounds.value:!hex(1d1d1d)",
          )
            ? "#1d1d1d"
            : "#fff",
          padding: "16px",
          borderRadius: "12px",
        }}
      >
        {/* DataTable integration */}
        <DataTable
          hasChangeableDensity={true}
          hasColumnResizing={true}
          hasColumnVisibility={false}
          hasFilters={false}
          hasPagination={false}
          hasRowSelection={true}
          hasSearch={true}
          hasSorting={true}
          hasRowReordering={false}
          columns={planetColumns}
          getData={({ page, resultsPerPage, search, filters, sort }) =>
            filterData({
              data: planetData,
              page,
              resultsPerPage,
              search,
              filters,
              sort,
            })
          }
          onReorderRows={({ rowId, newRowIndex }) =>
            reorderData({
              data: planetData,
              rowId,
              newRowIndex,
            })
          }
          onChangeRowSelection={(rowSelection) =>
            console.log(`${Object.keys(rowSelection).length} selected rows`)
          }
        />
      </div>
    ),
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

export const WithOdysseyAppContent: StoryObj<UiShellProps> = {
  args: {
    appComponent: (
      <OdysseyProvider>
        {/* This is normally rendered by `renderUiShell`, but we're rendering `UiShell` outside of a web component, so we need to add this data attribute ourselves. */}
        <div {...{ [uiShellDataAttribute]: "" }} />

        <PageTemplate
          description="This is my app."
          title="Access Certification"
        >
          <Surface>
            <div style={{ marginBlockEnd: `${16 / 14}rem` }}>
              <Paragraph>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
                lacinia leo quis sodales scelerisque. Maecenas tempor eget nunc
                sit amet ultrices. Maecenas et varius ante. Nulla eu quam sit
                amet orci fermentum dictum sit amet scelerisque libero. Proin
                luctus semper elit, ut pretium massa tristique a. Mauris
                hendrerit ex eu commodo egestas. Etiam a lacus aliquet,
                convallis metus et, sollicitudin odio. Fusce vehicula purus sed
                orci elementum, ut cursus diam sollicitudin. Pellentesque
                pulvinar nibh turpis, eu finibus dolor egestas eget. Duis tellus
                mauris, pulvinar sit amet ante a, aliquet laoreet sapien. Ut
                quis tempus massa. Fusce fringilla mattis lacinia. Cras at
                pharetra quam, eu ultrices ipsum.
              </Paragraph>
            </div>
            <div>
              <Button label="I understand" variant="primary" />
            </div>
          </Surface>
        </PageTemplate>
      </OdysseyProvider>
    ),
    optionalComponents: {
      ...sharedOptionalComponents,
      banners: <Banner severity="success" text="This is an app!" />,
    },
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
