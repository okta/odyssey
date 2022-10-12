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

import * as React from "react";
import { Story } from "@storybook/react";
import {
  Box,
  FavoriteIcon,
  Tab,
  TabContext,
  TabList,
  TabPanel,
  Typography,
} from "@okta/odyssey-react-mui";
// import { TabContext, TabList, TabPanel } from "@mui/lab";
import { MuiThemeDecorator } from "../../../../.storybook/components";

import TabsMdx from "./Tabs.mdx";

export default {
  title: `MUI Components/Tabs`,
  component: Tab,
  parameters: {
    docs: {
      page: TabsMdx,
    },
  },
  argTypes: {
    disabled: {
      control: "boolean",
      defaultValue: false,
    },
    icon: {
      control: "text",
      defaultValue: null,
    },
    label: {
      control: "text",
      defaultValue: "Asteroids",
    },
    wrapped: {
      control: "boolean",
      defaultValue: false,
    },
  },
  decorators: [MuiThemeDecorator],
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const DefaultTemplate: Story = (args) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box>
      <TabContext value={value}>
        <TabList onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Planets" value="0" />
          <Tab label="Moons" value="1" />

          <Tab
            disabled={args.disabled}
            icon={args.icon}
            label={args.label}
            value="2"
            wrapped={args.wrapped}
          />
        </TabList>

        <TabPanel value="0">Information about Planets</TabPanel>

        <TabPanel value="1">Information about Moons</TabPanel>

        <TabPanel value="2">Information about {args.label}</TabPanel>
      </TabContext>
    </Box>
  );
};

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Disabled = DefaultTemplate.bind({});
Disabled.args = {
  disabled: true,
  label: "Disabled Tab",
};

export const Icons = DefaultTemplate.bind({});
Icons.args = {
  icon: <FavoriteIcon />,
  label: "Icon Tab",
};

export const Wrapped = DefaultTemplate.bind({});
Wrapped.args = {
  label: "This Variant Is Only a Fallback for Silly Long Labels",
  wrapped: true,
};
