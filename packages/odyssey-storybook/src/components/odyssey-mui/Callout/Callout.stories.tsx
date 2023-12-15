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
  Callout,
  CalloutProps,
  calloutRoleValues,
  calloutSeverityValues,
} from "@okta/odyssey-react-mui";
import { MuiThemeDecorator } from "../../../../.storybook/components";

const storybookMeta: Meta<CalloutProps> = {
  title: "MUI Components/Callout",
  component: Callout,
  argTypes: {
    linkText: {
      control: "text",
      description:
        "If linkUrl is defined, this is the text of the link. If left blank, it defaults to 'Learn more'. Note that linkText does nothing if linkUrl is not defined",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    linkUrl: {
      control: "text",
      description: "If defined, the Callout will include a link to the URL",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    role: {
      options: calloutRoleValues,
      control: { type: "radio" },
      description:
        "Sets the ARIA role of the Callout ('status' for something that dynamically updates, 'alert' for errors, null for something unchanging)",
      table: {
        type: {
          summary: calloutRoleValues.join(" | "),
        },
      },
    },
    severity: {
      options: calloutSeverityValues,
      control: { type: "radio" },
      description: "Determine the color and icon of the Callout",
      table: {
        type: {
          summary: calloutSeverityValues.join(" | "),
        },
      },
      type: {
        name: "other",
        value: "radio",
      },
    },
    text: {
      control: "text",
      description: "The text content of the Callout",
      table: {
        type: {
          summary: "string",
        },
      },
      type: {
        name: "string",
      },
    },
    title: {
      control: "text",
      description: "The title of the Callout",
      table: {
        type: {
          summary: "string",
        },
      },
    },
  },
  args: {
    text: "You're signed in from Moonbase Alpha-6, located on Luna.",
    severity: "info",
  },
  decorators: [MuiThemeDecorator],
  tags: ["autodocs"],
};

export default storybookMeta;

export const Info: StoryObj<CalloutProps> = {
  args: {
    severity: "info",
    title: "Authentication status",
    text: "You're signed in from Moonbase Alpha-6, located on Luna.",
  },
};

export const Error: StoryObj<CalloutProps> = {
  args: {
    role: "alert",
    severity: "error",
    title: "Safety checks failed",
    text: "Reconfigure the fuel mixture ratios and perform safety checks again.",
  },
};

export const Warning: StoryObj<CalloutProps> = {
  args: {
    role: "status",
    severity: "warning",
    title: "Safety checks incomplete",
    text: "Complete all safety checks before requesting approval to launch your mission.",
  },
};

export const Success: StoryObj<CalloutProps> = {
  args: {
    role: "status",
    severity: "success",
    title: "Approved for launch",
    text: "Safety checks are complete. Your mission is ready for liftoff.",
  },
};

export const WithLink: StoryObj<CalloutProps> = {
  args: {
    role: "alert",
    severity: "error",
    title: "Safety checks failed",
    text: "There is an issue with the fuel mixture ratios. Reconfigure the fuel mixture and perform the safety checks again.",
    linkText: "Visit fueling console",
    linkUrl: "#",
  },
};
