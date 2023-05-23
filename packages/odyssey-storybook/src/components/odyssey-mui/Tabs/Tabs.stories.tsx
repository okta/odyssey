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
import { Meta, StoryObj } from "@storybook/react";
import {
  Box,
  FavoriteIcon,
  Tab,
  TabContext,
  TabList,
  TabProps,
  TabPanel,
} from "@okta/odyssey-react-mui";
import { MuiThemeDecorator } from "../../../../.storybook/components";

const storybookMeta: Meta<TabProps> = {
  title: "MUI Components/Tabs",
  component: Tab,
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

export default storybookMeta;

const DefaultTemplate: StoryObj<TabProps> = {
  render: function C(args) {
    const [value, setValue] = React.useState("0");

    const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
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
  },
};

export const Default: StoryObj<TabProps> = {
  ...DefaultTemplate,
  args: {
    //
  },
};

export const Disabled: StoryObj<TabProps> = {
  ...DefaultTemplate,
  args: {
    disabled: true,
    label: "Disabled Tab",
  },
};

export const Icons: StoryObj<TabProps> = {
  ...DefaultTemplate,
  args: {
    icon: <FavoriteIcon />,
    label: "Icon Tab",
  },
};

export const Wrapped: StoryObj<TabProps> = {
  ...DefaultTemplate,
  args: {
    label: "This Variant Is Only a Fallback for Silly Long Labels",
    wrapped: true,
  },
};
