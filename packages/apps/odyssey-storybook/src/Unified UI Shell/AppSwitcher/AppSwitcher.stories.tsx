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

import { AppSwitcher } from "@okta/odyssey-react-mui/ui-shell";
import { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import { OdysseyStorybookThemeDecorator } from "../../tools/OdysseyStorybookThemeDecorator.js";

const meta = {
  component: AppSwitcher,
  decorators: [OdysseyStorybookThemeDecorator],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    appIcons: {
      description: "",
      table: {
        type: {
          summary: "Array<AppSwitcherAppIcon>",
        },
      },
    },
    isLoading: {
      control: "boolean",
    },
    selectedAppName: {
      description: "The App Instance app name that the UI is on",
      control: "text",
    },
  },
  args: {
    appIcons: [],
  },
} satisfies Meta<typeof AppSwitcher>;

export default meta;

type Story = StoryObj<typeof meta>;

const REAL_APP_ICONS = [
  {
    appIconDefaultUrl: "/appswitcher/admin-app-default.svg",
    appIconSelectedUrl: "/appswitcher/admin-app-selected.svg",
    appName: "saasure",
    label: "Okta Admin Console",
    linkUrl: "https://example.okta.com/admin/dashboard",
  },
  {
    appIconDefaultUrl: "/appswitcher/okta-dashboard-default.svg",
    appIconSelectedUrl: "/appswitcher/okta-dashboard-selected.svg",
    appName: "okta_enduser",
    label: "Okta End-User Dashboard",
    linkUrl: "https://example.okta.com/app/UserHome",
  },
  {
    appIconDefaultUrl: "/appswitcher/workflows-default.svg",
    appIconSelectedUrl: "/appswitcher/workflows-selected.svg",
    appName: "okta_flow_sso",
    label: "Okta Workflows",
    linkUrl: "https://example.workflows.okta.com",
  },
  {
    appIconDefaultUrl: "/appswitcher/partner-portal-app-default.svg",
    appIconSelectedUrl: "/appswitcher/partner-portal-app-selected.svg",
    appName: "partner_portal",
    label: "Partner Admin Portal",
    linkUrl: "https://example.okta.com/partner-portal",
  },
  {
    appIconDefaultUrl: "/appswitcher/ispm-default.svg",
    appIconSelectedUrl: "/appswitcher/ispm-selected.svg",
    appName: "okta_ispm",
    label: "Identity Security Posture Management",
    linkUrl: "https://appswitcher.spera-app.com",
  },
];

export const AllApps: Story = {
  args: {
    appIcons: REAL_APP_ICONS,
    isLoading: false,
    selectedAppName: "saasure",
  },
  render: (props) => {
    return (
      <div style={{ height: "100vh" }}>
        <AppSwitcher {...props} />
      </div>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("App switcher shows all items", async () => {
      await expect(canvas.getByRole("navigation")).toBeVisible();
      await expect(canvas.queryAllByRole("listitem")).toHaveLength(5);
      await expect(canvas.queryAllByRole("link")).toHaveLength(5);
      await expect(
        canvas.queryByRole("link", { name: "Okta Admin Console" }),
      ).toBeVisible();
      await expect(
        canvas.queryByRole("link", { name: "Okta End-User Dashboard" }),
      ).toBeVisible();
      await expect(
        canvas.queryByRole("link", { name: "Okta Workflows" }),
      ).toBeVisible();
      await expect(
        canvas.queryByRole("link", { name: "Partner Admin Portal" }),
      ).toBeVisible();
      await expect(
        canvas.queryByRole("link", {
          name: "Identity Security Posture Management",
        }),
      ).toBeVisible();
    });
  },
};

export const EnduserSelected: Story = {
  args: {
    appIcons: REAL_APP_ICONS,
    isLoading: false,
    selectedAppName: "okta_enduser",
  },
  render: (props) => {
    return (
      <div style={{ height: "100vh" }}>
        <AppSwitcher {...props} />
      </div>
    );
  },
};

export const WorkflowsSelected: Story = {
  args: {
    appIcons: REAL_APP_ICONS,
    isLoading: false,
    selectedAppName: "okta_flow_sso",
  },
  render: (props) => {
    return (
      <div style={{ height: "100vh" }}>
        <AppSwitcher {...props} />
      </div>
    );
  },
};

export const NoApps: Story = {
  args: {
    appIcons: [],
    isLoading: false,
    selectedAppName: "saasure",
  },
  render: (props) => {
    return (
      <div style={{ height: "100vh" }}>
        <AppSwitcher {...props} />
      </div>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("App switcher shows no items, but is loaded", async () => {
      await expect(canvas.getByRole("navigation")).toBeVisible();
      await expect(canvas.queryAllByRole("listitem")).toHaveLength(0);
      await expect(canvas.queryAllByRole("link")).toHaveLength(0);
    });
  },
};

export const Loading: Story = {
  args: {
    appIcons: [],
    isLoading: true,
    selectedAppName: "saasure",
  },
  render: (props) => {
    return (
      <div style={{ height: "100vh" }}>
        <AppSwitcher {...props} />
      </div>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("App switcher shows no items, but is loaded", async () => {
      await expect(canvas.getByRole("navigation")).toBeVisible();
      await expect(canvas.queryAllByRole("listitem")).toHaveLength(3);
      await expect(canvas.queryAllByRole("link")).toHaveLength(0);
    });
  },
};
