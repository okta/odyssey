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

import {
  Banner,
  BannerProps,
  bannerRoleValues,
  bannerSeverityValues,
} from "@okta/odyssey-react-mui";
import { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within } from "@storybook/test";

import { axeRun } from "../../../axe-util.js";
import type { PlaywrightProps } from "../storybookTypes.js";

type PlayType = {
  args: BannerProps;
  canvasElement: HTMLElement;
  step: PlaywrightProps<BannerProps>["step"];
};

const storybookMeta: Meta<BannerProps> = {
  title: "MUI Components/Banner",
  component: Banner,
  argTypes: {
    linkRel: {
      control: "text",
      description:
        "The rel attribute defines the relationship between a linked resource and the current document.",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    linkTarget: {
      control: "text",
      description:
        "The target property of the `HTMLAnchorElement` interface is a string that indicates where to display the linked resource.",
      table: {
        type: {
          summary: "string",
        },
      },
    },
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
      description: "If defined, the alert will include a link to the URL",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    onClose: {
      description:
        "The function that's fired when the user clicks the close button. If undefined, the close button will not be shown",
      table: {
        type: {
          summary: "func",
        },
      },
    },
    role: {
      options: bannerRoleValues,
      control: { type: "radio" },
      description:
        "Sets the ARIA role of the alert ('status' for something that dynamically updates, 'alert' for errors, null for something unchanging)",
      table: {
        type: {
          summary: bannerRoleValues.join(" | "),
        },
      },
    },
    severity: {
      options: bannerSeverityValues,
      control: { type: "radio" },
      description: "Determine the color and icon of the alert",
      table: {
        type: {
          summary: bannerSeverityValues.join(" | "),
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
      description: "The text content of the alert",
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
  },
  args: {
    severity: "info",
    text: "The mission to Sagittarius A is set for January 7.",
    onClose: undefined,
  },
  tags: ["autodocs"],
};

export default storybookMeta;

export const Info: StoryObj<BannerProps> = {
  args: {
    severity: "info",
    text: "The mission to Sagittarius A is set for January 7.",
  },
};

export const Error: StoryObj<BannerProps> = {
  args: {
    role: "status",
    severity: "error",
    text: "An unidentified flying object compromised Hangar 18.",
  },
};

export const Warning: StoryObj<BannerProps> = {
  args: {
    role: "status",
    severity: "warning",
    text: "Severe solar winds detected. Local system flights may be delayed.",
  },
};

export const Linked: StoryObj<BannerProps> = {
  args: {
    linkText: "View report",
    linkUrl: "#anchor",
    role: "status",
    severity: "error",
    text: "An unidentified flying object compromised Hangar 18.",
  },
  play: async ({ canvasElement, step }: PlayType) => {
    await step("check for the link text", async () => {
      const canvas = within(canvasElement);
      const link = canvas.getByText<HTMLAnchorElement>("View report");
      await expect(link?.tagName).toBe("A");
      await expect(link?.href).toBe(`${link?.baseURI}#anchor`);
    });
  },
};

export const LinkWithTarget: StoryObj<BannerProps> = {
  args: {
    linkTarget: "_blank",
    linkText: "View report",
    linkUrl: "#anchor",
    role: "status",
    severity: "error",
    text: "An unidentified flying object compromised Hangar 18.",
  },
};

export const Dismissible: StoryObj<BannerProps> = {
  args: {
    onClose: fn(),
  },
  play: async ({ args, canvasElement, step }: PlayType) => {
    await step("dismiss the banner on click", async () => {
      const canvas = within(canvasElement);
      const button = canvas.getByTitle("Close");
      await userEvent.click(button);
      await userEvent.tab();
      await expect(args.onClose).toHaveBeenCalled();
      await axeRun("Dismissible Banner");
    });
  },
};
