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
import {
  Button,
  DownloadIcon,
  Tooltip,
  TooltipProps,
} from "@okta/odyssey-react-mui";
import { MuiThemeDecorator } from "../../../../.storybook/components";

import TooltipMdx from "./Tooltip.mdx";

const storybookMeta: Meta<TooltipProps> = {
  title: `MUI Components/Tooltip`,
  component: Tooltip,
  parameters: {
    docs: {
      page: TooltipMdx,
    },
  },
  argTypes: {
    children: {
      control: { type: "object" },
    },
    describeChild: {
      control: { type: "boolean" },
    },
    label: {
      control: {
        type: "text",
        defaultValue: "This is a tooltip.",
      },
    },
    placement: {
      options: ["top", "right", "bottom", "left"],
      control: { type: "radio" },
    },
  },
  decorators: [MuiThemeDecorator],
};

export default storybookMeta;

const Template: Story<TooltipProps> = (args) => {
  return (
    <Tooltip
      label={args.label}
      placement={args.placement}
      describeChild={args.describeChild}
    >
      {args.children}
    </Tooltip>
  );
};

export const Default = Template.bind({});
Default.args = {
  children: <Button text="Launch" />,
  describeChild: true,
  placement: "top",
  label: "This will begin a 10-second countdown",
};

export const Icon = Template.bind({});
Icon.args = {
  children: <Button variant="secondary" startIcon={<DownloadIcon />} />,
  describeChild: false,
  placement: "top",
  label: "Download logs",
};

export const Disabled = Template.bind({});
Disabled.args = {
  children: (
    <Button variant="secondary" isDisabled startIcon={<DownloadIcon />} />
  ),
  describeChild: true,
  placement: "top",
  label: "You don't have access to these logs",
};

const PlacementTemplate: Story<TooltipProps> = () => {
  return (
    <>
      <Tooltip label="Top" placement="top">
        <Button text="Top" />
      </Tooltip>
      <Tooltip label="Right" placement="right">
        <Button text="Right" />
      </Tooltip>
      <Tooltip label="Bottom" placement="bottom">
        <Button text="Bottom" />
      </Tooltip>
      <Tooltip label="Left" placement="left">
        <Button text="Left" />
      </Tooltip>
    </>
  );
};

export const Placement = PlacementTemplate.bind({});
Placement.args = {};
