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

import { Story } from "@storybook/react";
import {
  Box,
  FavoriteIcon,
  Tab,
  TabProps,
  Tabs,
} from "@okta/odyssey-react-mui";
// import { TabContext, TabList, TabPanel } from "@mui/lab";
import { MuiThemeDecorator } from "../../../../.storybook/components";

import TabsMdx from "./Tabs.mdx";

const storybookMeta = {
  title: `MUI Components/Tabs`,
  component: Tab,
  parameters: {
    docs: {
      page: TabsMdx,
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
    isWrapped: {
      control: "boolean",
      defaultValue: false,
    },
  },
  decorators: [MuiThemeDecorator],
};

export default storybookMeta;

const DefaultTemplate: Story<TabProps> = (args) => {
  return (
    <Box>
      <Tabs initialValue="planets" ariaLabel="basic tabs example">
        <Tab label="Planets" value="planets">
          Information about Planets.
        </Tab>
        <Tab label="Moons" value="moons">
          Information about Moons.
        </Tab>
        <Tab
          label={args.label}
          value={args.value}
          isDisabled={args.isDisabled}
          startIcon={args.startIcon}
          isWrapped={args.isWrapped}
        >
          Information about {args.label}.
        </Tab>
      </Tabs>
    </Box>
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

export const Wrapped = DefaultTemplate.bind({});
Wrapped.args = {
  label: "This Variant Is Only a Fallback for Silly Long Labels",
  value: "long-label",
  isWrapped: true,
};
