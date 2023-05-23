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

import { Meta, Story } from "@storybook/react";
import { useMemo } from "react";
import { FavoriteIcon, TabItemProps, Tabs } from "@okta/odyssey-react-mui";
// import { TabContext, TabList, TabPanel } from "@mui/lab";
import { MuiThemeDecorator } from "../../../../.storybook/components";

import TabsMdx from "./Tabs.mdx";

const storybookMeta: Meta<TabItemProps> = {
  title: `MUI Components/Tabs`,
  component: Tabs,
  parameters: {
    docs: {
      page: TabsMdx,
      // Without this line, the Docs page hangs indefinitely.
      // https://github.com/storybookjs/storybook/issues/17025
      source: { type: "code" },
    },
  },
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

const ExampleTabContent = ({ label }: { label: string }) => {
  return useMemo(() => <>{`Information about ${label}`}</>, [label]);
};

const DefaultTemplate: Story<TabItemProps> = (args) => {
  return (
    <Tabs
      initialValue="planets"
      ariaLabel="basic tabs example"
      tabs={[
        {
          label: "Planets",
          value: "planets",
          children: "Information about Planets.",
        },
        {
          label: "Moons",
          value: "moons",
          children: "Information about Moons.",
        },
        {
          label: args.label,
          value: args.value,
          isDisabled: args.isDisabled,
          startIcon: args.startIcon,
          children: <ExampleTabContent label={args.label} />,
        },
      ]}
    />
  );
};

export const Default = DefaultTemplate.bind({});
Default.args = {
  label: "Asteroids",
  value: "asteroids",
};

export const Disabled = DefaultTemplate.bind({});
Disabled.args = {
  isDisabled: true,
  label: "Disabled Tab",
  value: "disabled-tab",
};

export const Icons = DefaultTemplate.bind({});
Icons.args = {
  startIcon: <FavoriteIcon />,
  label: "Icon Tab",
  value: "icon-tab",
};
