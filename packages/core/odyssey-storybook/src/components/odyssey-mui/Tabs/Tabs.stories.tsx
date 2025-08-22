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

import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import {
  badgeContentMaxValues,
  Box,
  Button,
  TabItemProps,
  Tabs,
  TabsProps,
} from "@okta/odyssey-react-mui";
import { BugIcon } from "@okta/odyssey-react-mui/icons";
import { expect, userEvent, waitFor, within } from "@storybook/test";

import icons from "../../../../.storybook/components/iconUtils.js";
import { axeRun } from "../../../axe-util.js";
import type { PlaywrightProps } from "../storybookTypes.js";

const storybookMeta: Meta<TabsProps & TabItemProps> = {
  title: "MUI Components/Tabs",
  component: Tabs,
  argTypes: {
    children: {
      control: "text",
      description: "The content of the tab item",
      table: {
        type: {
          summary: "ReactNode",
        },
      },
      type: {
        required: true,
        name: "string",
      },
    },
    startIcon: {
      control: {
        type: "select",
      },
      options: Object.keys(icons),
      mapping: icons,
      description: "An optional icon to display at the start of the tab item",
      table: {
        type: {
          summary: "<Icon />",
        },
      },
    },
    label: {
      control: "text",
      description: "The label text for the tab item",
      table: {
        type: {
          summary: "string",
        },
      },
      type: {
        required: true,
        name: "string",
      },
    },
    isDisabled: {
      control: "boolean",
      description: "If `true`, the tab item is disabled",
      table: {
        type: {
          summary: "boolean",
        },
        defaultValue: {
          summary: "false",
        },
      },
    },
    value: {
      control: "text",
      description: "The value associated with the tab item",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    onChange: {
      description: "Callback fired when the active tab is changed",
      table: {
        type: {
          summary: "func",
        },
      },
    },
    notificationCount: {
      control: { type: "number" },
      description: "The value associated with the Badge",
      table: {
        type: {
          summary: "number",
        },
      },
    },
    notificationCountMax: {
      control: {
        type: "select",
      },
      options: badgeContentMaxValues,
      description:
        "The limit at which the badge will show `{notificationCountMax} +`. Can be increments of 10, up to 100",
      table: {
        type: {
          summary: badgeContentMaxValues.join("|"),
        },
        defaultValue: {
          summary: "10",
        },
      },
      type: {
        required: false,
        name: "number",
      },
    },
  },
  args: {
    children: "This is the tab content. This tab happens to be about stars.",
    notificationCountMax: 10,
    label: "Stars",
    value: "stars",
  },
};

export default storybookMeta;

const selectTab =
  ({ canvasElement, step }: PlaywrightProps<TabItemProps>) =>
  async (actionName: string, tabName: string) => {
    await step(`select the ${tabName} tab`, async () => {
      await axeRun(actionName);

      await waitFor(async () => {
        const canvas = within(canvasElement);
        const tabElement = canvas.getByText(tabName);

        await userEvent.click(tabElement);
        await userEvent.tab();

        const tabData = canvas.getByText(`Information about ${tabName}`);
        expect(tabData).toBeInTheDocument();
      });
    });
  };

const DefaultTemplate: StoryObj<TabItemProps> = {
  render: function C(args) {
    const tabs: TabItemProps[] = [
      {
        label: "Planets",
        value: "planets",
        children: "Information about Planets",
      },
      {
        label: "Moons",
        value: "moons",
        children: "Information about Moons",
      },
    ];

    if (args?.label) {
      tabs.push({
        notificationCount: args?.notificationCount,
        notificationCountMax: args?.notificationCountMax,
        label: args.label,
        value: args.value,
        isDisabled: args.isDisabled,
        startIcon: args.startIcon,
        children: args.children,
      });
    }

    return (
      <Tabs initialValue="planets" ariaLabel="basic tabs example" tabs={tabs} />
    );
  },
};

const ExampleTabContent = ({ label }: { label: string }) => {
  return <>Information about {label}</>;
};

export const Default: StoryObj<TabItemProps> = {
  ...DefaultTemplate,
  play: async ({ canvasElement, step }) => {
    await selectTab({ canvasElement, step })("Tab Default", "Moons");
  },
};

export const Disabled: StoryObj<TabItemProps> = {
  ...DefaultTemplate,
  args: {
    isDisabled: true,
    label: "Disabled Tab",
    children: "Tab is disabled",
  },
  play: async ({ canvasElement, step }) => {
    await selectTab({ canvasElement, step })("Tab Disabled", "Moons");
  },
};

export const Icons: StoryObj<TabItemProps> = {
  ...DefaultTemplate,
  args: {
    startIcon: <BugIcon />,
    label: "Xenomorphs",
    children: <ExampleTabContent label="Xenomorphs" />,
  },
  play: async ({ canvasElement, step }) => {
    await selectTab({ canvasElement, step })("Tab Icon", "Xenomorphs");
  },
};

export const Controlled: StoryObj<TabItemProps> = {
  render: function C() {
    const [value, setValue] = useState("planets");

    const onChange: TabsProps["onChange"] = (_e: unknown, value: string) => {
      setValue(value);
    };

    const tabs: TabItemProps[] = [
      {
        label: "Planets",
        value: "planets",
        children: "Information about Planets",
      },
      {
        label: "Moons",
        value: "moons",
        children: "Information about Moons",
      },
      {
        label: "Galaxies",
        value: "galaxies",
        children: "Information about Galaxies",
      },
    ];

    return (
      <>
        <Tabs
          value={value}
          ariaLabel="controlled tabs example"
          tabs={tabs}
          onChange={onChange}
        />
        <Box sx={{ marginTop: 4 }}>
          <Button
            label="Navigate to Galaxies"
            variant="primary"
            onClick={() => {
              setValue("galaxies");
            }}
            size="small"
          />
        </Box>
      </>
    );
  },
};

export const WithBadge: StoryObj<TabItemProps> = {
  ...DefaultTemplate,
  args: {
    notificationCount: 1,
    label: "Xenomorphs",
    value: "xenomorphs",
    children: <ExampleTabContent label="Xenomorphs" />,
  },
  play: async ({ canvasElement, step }) => {
    await selectTab({ canvasElement, step })("Tab Icon", "Xenomorphs");
  },
};

export const CountMax: StoryObj<TabItemProps> = {
  ...DefaultTemplate,
  args: {
    notificationCount: 101,
    notificationCountMax: 100,
    label: "Xenomorphs",
    value: "xenomorphs",
    children: <ExampleTabContent label="Xenomorphs" />,
  },
};
