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
import { NavRail, NavRailProps } from "@okta/odyssey-react-mui/labs";
import { expect } from "@storybook/jest";
import { within } from "@storybook/testing-library";
import { PlaywrightProps } from "../../odyssey-mui/storybookTypes";

const storybookMeta: Meta<NavRailProps> = {
  title: "Labs Components/NavRail",
  component: NavRail,
  argTypes: {
    appIcons: {
      description: "",
      table: {
        type: {
          summary: "Array<NavRailAppIcon>",
        },
      },
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
    backgrounds: {
      default: "gray",
      values: [
        { name: "gray", value: "#f4f4f4" },
        { name: "white", value: "#ffffff" },
      ],
    },
  },
};

export default storybookMeta;

type Story = StoryObj<NavRailProps>;

export const AllApps: Story = {
  args: {
    appIcons: [
      {
        appIconDefaultUrl: "/navrail/admin-app-default.svg",
        appIconSelectedUrl: "/navrail/admin-app-selected.svg",
        appName: "saasure",
        label: "Admin Dashboard",
        linkUrl: "http://rain-admin.okta1.com:1802/admin/dashboard",
      },
      {
        appIconDefaultUrl: "/navrail/okta-dashboard-default.svg",
        appIconSelectedUrl: "/navrail/okta-dashboard-selected.svg",
        appName: "okta_enduser",
        label: "Okta Dashboard",
        linkUrl: "http://rain.okta1.com:1802/app/UserHome",
      },
      {
        appIconDefaultUrl: "/navrail/workflows-default.svg",
        appIconSelectedUrl: "/navrail/workflows-selected.svg",
        appName: "okta_flow_sso",
        label: "Okta Workflows",
        linkUrl: "http://rain-admin.okta1.com:1802/flow/go",
      },
    ],
    selectedAppName: "saasure",
  },
  render: (props) => {
    return (
      <div style={{ height: "100vh" }}>
        <NavRail {...props} />
      </div>
    );
  },
  play: async ({ canvasElement, step }: PlaywrightProps<NavRailProps>) => {
    const canvas = within(canvasElement);

    await step("Nav rail successfully loads", async () => {
      await expect(canvas.getAllByRole("link")).toHaveLength(3);
    });
  },
};

export const NoApps: Story = {
  args: {
    appIcons: [],
    selectedAppName: "okta_enduser",
  },
  render: (props) => {
    return (
      <div style={{ height: "100vh" }}>
        <NavRail {...props} />
      </div>
    );
  },
  play: async ({ canvasElement, step }: PlaywrightProps<NavRailProps>) => {
    const canvas = within(canvasElement);

    await step("Nav rail does not load", async () => {
      await expect(canvas.queryAllByRole("link")).toHaveLength(0);
    });
  },
};
