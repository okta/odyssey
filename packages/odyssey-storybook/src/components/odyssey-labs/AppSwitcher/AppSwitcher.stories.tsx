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

import { Meta, StoryObj } from "@storybook/react";
import { MuiThemeDecorator } from "../../../../.storybook/components";
import { AppSwitcher, AppSwitcherProps } from "@okta/odyssey-react-mui/labs";
import { expect } from "@storybook/jest";
import { within } from "@storybook/testing-library";
import { PlaywrightProps } from "../../odyssey-mui/storybookTypes";

const storybookMeta: Meta<AppSwitcherProps> = {
  title: "Labs Components/AppSwitcher",
  component: AppSwitcher,
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
  decorators: [MuiThemeDecorator],
  parameters: {
    layout: "fullscreen",
  },
};

export default storybookMeta;

type Story = StoryObj<AppSwitcherProps>;

export const AllApps: Story = {
  args: {
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
    selectedAppName: "saasure",
  },
  render: (props) => {
    return (
      <div style={{ height: "100vh" }}>
        <AppSwitcher {...props} />
      </div>
    );
  },
  play: async ({ canvasElement, step }: PlaywrightProps<AppSwitcherProps>) => {
    const canvas = within(canvasElement);

    await step("App switcher shows all items", async () => {
      await expect(canvas.getAllByRole("navigation")).toHaveLength(1);
      await expect(canvas.queryAllByRole("listitem")).toHaveLength(3);
      await expect(canvas.queryAllByRole("link")).toHaveLength(3);
    });
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
  play: async ({ canvasElement, step }: PlaywrightProps<AppSwitcherProps>) => {
    const canvas = within(canvasElement);

    await step("App switcher shows no items, but is loaded", async () => {
      await expect(canvas.getAllByRole("navigation")).toHaveLength(1);
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
  play: async ({ canvasElement, step }: PlaywrightProps<AppSwitcherProps>) => {
    const canvas = within(canvasElement);

    await step("App switcher shows no items, but is loaded", async () => {
      await expect(canvas.getAllByRole("navigation")).toHaveLength(1);
      await expect(canvas.queryAllByRole("listitem")).toHaveLength(3);
      await expect(canvas.queryAllByRole("link")).toHaveLength(0);
    });
  },
};
