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
  Button,
  DownloadIcon,
  Tooltip,
  TooltipProps,
} from "@okta/odyssey-react-mui";
import { MuiThemeDecorator } from "../../../../.storybook/components";

import TooltipMdx from "./Tooltip.mdx";

const storybookMeta: Meta<TooltipProps> = {
  title: "MUI Components/Tooltip",
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
    ariaType: {
      control: {
        options: ["label", "description"],
        type: "radio",
        defaultValue: "label",
      },
      description:
        "Choose `description` if the tooltip is an ARIA description of the child element. Otherwise, choose `label`. This must be explicitly set.",
    },
    text: {
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

const Template: StoryObj<TooltipProps> = {
  render: function C(args) {
    return (
      <Tooltip
        text={args.text}
        placement={args.placement}
        ariaType={args.ariaType}
      >
        {args.children}
      </Tooltip>
    );
  }
};

export const Default: StoryObj<TooltipProps> = {
  ...Template,
  args: {
    children: <Button text="Launch" />,
    ariaType: "description",
    placement: "top",
    text: "This will begin a 10-second countdown",
  }
};

export const Icon: StoryObj<TooltipProps> = {
  ...Template,
  args: {
    children: <Button variant="secondary" startIcon={<DownloadIcon />} />,
    ariaType: "label",
    placement: "top",
    text: "Download logs",
  }
};

export const Disabled: StoryObj<TooltipProps> = {
  ...Template,
  args: {
    children: (
      <Button variant="secondary" isDisabled startIcon={<DownloadIcon />} />
    ),
    ariaType: "description",
    placement: "top",
    text: "You don't have access to these logs",
  }
};

export const Placement: StoryObj<TooltipProps> = {
  render: function C() {
    return (
      <>
        <Tooltip text="Top" placement="top" ariaType="label">
          <Button text="Top" />
        </Tooltip>
        <Tooltip text="Right" placement="right" ariaType="label">
          <Button text="Right" />
        </Tooltip>
        <Tooltip text="Bottom" placement="bottom" ariaType="label">
          <Button text="Bottom" />
        </Tooltip>
        <Tooltip text="Left" placement="left" ariaType="label">
          <Button text="Left" />
        </Tooltip>
      </>
    );
  }
};
