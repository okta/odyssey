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
  Box,
  Button,
  TabItemProps,
  Tabs,
  TabsProps,
} from "@okta/odyssey-react-mui";
import { BugIcon } from "@okta/odyssey-react-mui/icons";
import { expect } from "@storybook/jest";
import { userEvent, waitFor, within } from "@storybook/testing-library";
import { MuiThemeDecorator } from "../../../../.storybook/components";
import icons from "../../../../.storybook/components/iconUtils";
import { axeRun } from "../../../axe-util";
import type { PlaywrightProps } from "../storybookTypes";

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
          summary: false,
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
      control: null,
      description: "Callback fired when the active tab is changed",
      table: {
        type: {
          summary: "func",
        },
      },
    },
  },
  args: {
    value: "stars",
    label: "Stars",
    children: "This is the tab content. This tab happens to be about stars.",
  },
  decorators: [MuiThemeDecorator],
};

export default storybookMeta;

const selectTab =
  ({ canvasElement, step }: PlaywrightProps<TabItemProps>) =>
  async (actionName: string, tabName: string) => {
    await step(`select the ${tabName} tab`, async () => {
      await axeRun(actionName);

      waitFor(() => {
        const canvas = within(canvasElement);
        const tabElement = canvas.getByText(tabName);
        userEvent.click(tabElement);
        userEvent.tab();
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
    selectTab({ canvasElement, step })("Tab Default", "Moons");
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
    selectTab({ canvasElement, step })("Tab Disabled", "Moons");
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
    selectTab({ canvasElement, step })("Tab Icon", "Xenomorphs");
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

export const Overflow: StoryObj<TabItemProps> = {
  render: function C() {
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
      {
        label: "Stars",
        value: "stars",
        children: "Information about Stars",
      },
      {
        label: "Asteroids",
        value: "asteroids",
        children: "Information about Asteroids",
      },
      {
        label: "Comets",
        value: "comets",
        children: "Information about Comets",
      },
      {
        label: "Black Holes",
        value: "black_holes",
        children: "Information about Black Holes",
      },
      {
        label: "Nebulae",
        value: "nebulae",
        children: "Information about Nebulae",
      },
      {
        label: "Space Missions",
        value: "space_missions",
        children: "Information about Space Missions",
      },
      {
        label: "Exoplanets",
        value: "exoplanets",
        children: "Information about Exoplanets",
      },
      {
        label: "Spacecrafts",
        value: "spacecrafts",
        children: "Information about Spacecrafts",
      },
      {
        label: "Astronauts",
        value: "astronauts",
        children: "Information about Astronauts",
      },
      {
        label: "Cosmology",
        value: "cosmology",
        children: "Information about Cosmology",
      },
      {
        label: "Space Stations",
        value: "space_stations",
        children: "Information about Space Stations",
      },
      {
        label: "Alien Life",
        value: "alien_life",
        children: "Information about Alien Life",
      },
    ];

    return <Tabs tabs={tabs} />;
  },
};
