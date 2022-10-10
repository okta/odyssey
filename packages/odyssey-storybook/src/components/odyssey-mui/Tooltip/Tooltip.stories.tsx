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
import { Button, Tooltip } from "@mui/material";
import { DownloadIcon } from "@okta/odyssey-react-mui";
import { MuiThemeDecorator } from "../../../../.storybook/components";

import TooltipMdx from "./Tooltip.mdx";

export default {
  title: `MUI Components/Tooltip`,
  component: Tooltip,
  parameters: {
    docs: {
      page: TooltipMdx,
    },
  },
  argTypes: {
    content: {
      control: { type: "object" },
    },
    describeChild: {
      control: { type: "boolean" },
    },
    placement: {
      options: ["top", "right", "bottom", "left"],
      control: { type: "radio" },
    },
    title: {
      control: { type: "text" },
    },
  },
  decorators: [MuiThemeDecorator],
};

const Template: Story = (args) => {
  const {} = args;
  return (
    <Tooltip
      title={args.title}
      placement={args.placement}
      describeChild={args.describeChild}
    >
      {args.content}
    </Tooltip>
  );
};

export const Default = Template.bind({});
Default.args = {
  content: <Button>Launch</Button>,
  describeChild: true,
  placement: "top",
  title: "This will begin a 10-second countdown",
};

export const Icon = Template.bind({});
Icon.args = {
  content: (
    <Button variant="secondary">
      <DownloadIcon />
    </Button>
  ),
  describeChild: false,
  placement: "top",
  title: "Download logs",
};

export const Disabled = Template.bind({});
Disabled.args = {
  content: (
    <Button variant="secondary" disabled>
      <DownloadIcon />
    </Button>
  ),
  describeChild: true,
  placement: "top",
  title: "You don't have access to these logs",
};

const PlacementTemplate: Story = (args) => {
  const {} = args;
  return (
    <>
      <Tooltip title="Top" placement="top">
        <Button>Top</Button>
      </Tooltip>
      <Tooltip title="Right" placement="right">
        <Button>Right</Button>
      </Tooltip>
      <Tooltip title="Bottom" placement="bottom">
        <Button>Bottom</Button>
      </Tooltip>
      <Tooltip title="Left" placement="left">
        <Button>Left</Button>
      </Tooltip>
    </>
  );
};

export const Placement = PlacementTemplate.bind({});
Placement.args = {};
