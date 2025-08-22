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
import { userEvent, within } from "@storybook/test";
import { IconWithTooltip, IconWithTooltipProps } from "@okta/odyssey-react-mui";
import { GroupIcon } from "@okta/odyssey-react-mui/icons";

import { axeRun } from "../../../axe-util.js";
import type { PlaywrightProps } from "../storybookTypes.js";

const storybookMeta: Meta<IconWithTooltipProps> = {
  title: "MUI Components/IconWithTooltip",
  component: IconWithTooltip,
  argTypes: {
    IconComponent: {
      description: "The icon to render",
      table: {
        type: {
          summary: "ReactNode",
        },
        defaultValue: {
          summary: "<InformationCircleIcon />",
        },
      },
      type: {
        required: true,
        name: "string",
      },
    },
    tooltipText: {
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
          summary: "right",
        },
      },
    },
  },
  args: {
    testId: "tooltip",
  },
  tags: ["autodocs"],
};

export default storybookMeta;

const showTooltip =
  ({ canvasElement, step }: PlaywrightProps<IconWithTooltipProps>) =>
  async (actionName: string) => {
    await step("show the tooltip on hover", async () => {
      const canvas = within(canvasElement);
      const icon = canvas.getByTitle(
        "Use the `i` icon to give details that might not be critical but are 'good to know'",
      );
      await userEvent.hover(icon);
      await axeRun(actionName);
      await userEvent.unhover(icon);
    });
  };

export const Default: StoryObj<typeof IconWithTooltip> = {
  args: {
    tooltipText:
      "Use the `i` icon to give details that might not be critical but are 'good to know'",
  },
  play: async ({ canvasElement, step }) => {
    await showTooltip({ canvasElement, step })("IconWithTooltip");
  },
};

export const AnyIcon: StoryObj<typeof IconWithTooltip> = {
  args: {
    IconComponent: <GroupIcon />,
    tooltipText: "This is a group of people",
  },
};
