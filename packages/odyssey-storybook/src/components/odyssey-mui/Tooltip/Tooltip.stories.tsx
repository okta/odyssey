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
  Status,
  Tag,
  Tooltip,
  TooltipProps,
} from "@okta/odyssey-react-mui";
import { DownloadIcon } from "@okta/odyssey-react-mui/icons";
import { MuiThemeDecorator } from "../../../../.storybook/components";
import { userEvent, within } from "@storybook/testing-library";
import { axeRun } from "../../../axe-util";
import type { PlaywrightProps } from "../storybookTypes";

const storybookMeta: Meta<TooltipProps> = {
  title: "MUI Components/Tooltip",
  component: Tooltip,
  argTypes: {
    children: {
      control: "obj",
      description: "The content that will trigger the tooltip",
      table: {
        type: {
          summary: "ReactElement",
        },
      },
      type: {
        required: true,
        name: "other",
        value: "ReactElement",
      },
    },
    ariaType: {
      options: ["description", "label"],
      control: { type: "radio" },
      description: "The type of ARIA attribute to use",
      table: {
        type: {
          summary: "description | label",
        },
      },
      type: {
        required: true,
        name: "other",
        value: "radio",
      },
    },
    text: {
      control: "text",
      description: "The text to display in the tooltip",
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
    placement: {
      options: ["top", "right", "bottom", "left"],
      control: { type: "radio" },
      description: "The placement of the tooltip",
      table: {
        type: {
          summary: "top | right | bottom | left",
        },
        defaultValue: {
          summary: "top",
        },
      },
    },
  },
  args: {
    ariaType: "label",
  },
  decorators: [MuiThemeDecorator],
  tags: ["autodocs"],
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
  },
};

const showTooltip =
  ({ canvasElement, step }: PlaywrightProps<TooltipProps>) =>
  async (actionName: string) => {
    await step("show the tooltip on hover", async () => {
      const canvas = within(canvasElement);
      const button = canvas.getByText("Launch");
      userEvent.hover(button);
      await axeRun(actionName);
    });
  };

export const Default: StoryObj<TooltipProps> = {
  ...Template,
  args: {
    children: <Button label="Launch" variant="primary" />,
    ariaType: "description",
    placement: "top",
    text: "This will begin a 10-second countdown",
  },
  play: async ({ canvasElement, step }) => {
    await showTooltip({ canvasElement, step })("Tooltip Default");
  },
};

export const IconButton: StoryObj<TooltipProps> = {
  ...Template,
  args: {
    children: (
      <Button
        ariaLabel="Download logs"
        startIcon={<DownloadIcon />}
        variant="secondary"
      />
    ),
    ariaType: "label",
    placement: "top",
    text: "Download logs",
  },
  play: async ({ canvasElement, step }: PlaywrightProps<TooltipProps>) => {
    await step("tooltip text", async () => {
      const canvas = within(canvasElement);
      const button = canvas.getByRole("button");
      userEvent.hover(button);
      await axeRun("Tooltip Icon Button");
    });
  },
};

export const StatusWrapper: StoryObj<TooltipProps> = {
  ...Template,
  args: {
    children: <Status label="Warp drive online" severity="success" />,
    ariaType: "label",
    placement: "top",
    text: "The warp drive is currently online.",
  },
  play: async ({ canvasElement, step }: PlaywrightProps<TooltipProps>) => {
    await step("tooltip text", async () => {
      const canvas = within(canvasElement);
      const button = canvas.getByLabelText(
        "The warp drive is currently online.",
      );
      userEvent.hover(button);

      await axeRun("Tooltip Icon Button");
    });
  },
};

export const Placement: StoryObj<TooltipProps> = {
  render: function C({}) {
    return (
      <>
        <Tooltip text="Top" placement="top" ariaType="label">
          <Tag label="Bow" />
        </Tooltip>

        <Tooltip text="Left" placement="left" ariaType="label">
          <Tag label="Stern" />
        </Tooltip>

        <Tooltip text="Bottom" placement="bottom" ariaType="label">
          <Tag label="Port" />
        </Tooltip>

        <Tooltip text="Right" placement="right" ariaType="label">
          <Tag label="Starboard" />
        </Tooltip>
      </>
    );
  },
};
