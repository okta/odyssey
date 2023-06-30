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

import {
  FavoriteIcon,
  TabItemProps,
  TabsProps,
  Tabs,
} from "@okta/odyssey-react-mui";
import { MuiThemeDecorator } from "../../../../.storybook/components";
import { userEvent, waitFor, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { axeRun } from "../../../axe-util";
import { screen } from "@storybook/testing-library";
import type { PlaywrightProps } from "../storybookTypes";

const storybookMeta: Meta<TabsProps & TabItemProps> = {
  title: "MUI Components/Tabs",
  component: Tabs,
  argTypes: {
    isDisabled: {
      control: "boolean",
      defaultValue: false,
    },
    startIcon: {
      control: "text",
      defaultValue: null,
    },
    value: {
      control: "text",
    },
    label: {
      control: "text",
    },
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

        if (actionName === "Tab Disabled") {
          const disabledTab = canvas.getByText("Disabled Tab");
          userEvent.click(disabledTab);
          const tabData = screen.queryByText("Tab is disabled");
          expect(tabData).not.toBeInTheDocument();
        }
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
    startIcon: <FavoriteIcon />,
    label: "Icon Tab",
    children: <ExampleTabContent label="Icon Tab" />,
  },
  play: async ({ canvasElement, step }) => {
    selectTab({ canvasElement, step })("Tab Icon", "Icon Tab");
  },
};
