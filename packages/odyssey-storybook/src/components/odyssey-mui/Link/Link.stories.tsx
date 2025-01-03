/*!
 * Copyright (c) 2022-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { Link, LinkProps, linkVariantValues } from "@okta/odyssey-react-mui";
import { InformationCircleFilledIcon } from "@okta/odyssey-react-mui/icons";
import type { StoryObj } from "@storybook/react";
import { expect, within } from "@storybook/test";
import { MuiThemeDecorator } from "../../../../.storybook/components";

import icons from "../../../../.storybook/components/iconUtils";

export default {
  title: "MUI Components/Link",
  component: Link,
  argTypes: {
    children: {
      control: "text",
      description: "<b>Required.</b>",
      table: {
        type: {
          summary: "ReactNode",
        },
      },
      type: {
        required: true,
      },
    },
    href: {
      control: "text",
      description: "<b>Required.</b>",
      table: {
        type: {
          summary: "string",
        },
      },
      type: {
        required: true,
      },
    },
    icon: {
      control: {
        type: "select",
      },
      options: Object.keys(icons),
      mapping: icons,
      description: "An optional icon to display at the start of the Link",
      table: {
        type: {
          summary: "<Icon />",
        },
      },
    },
    rel: {
      control: "text",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    target: {
      control: "text",
      description:
        "If set to `_blank`, the Link will display an external icon.",
      table: {
        type: {
          summary: "string",
        },
      },
      type: {
        required: true,
      },
    },
    variant: {
      control: { type: "radio" },
      options: linkVariantValues,
      table: {
        type: {
          summary: linkVariantValues.join(" | "),
        },
        defaultValue: {
          summary: "default",
        },
      },
    },
    onClick: {
      action: true,
      description: "Callback fired when the link is clicked",
      table: {
        type: {
          summary: "(() => void)",
        },
        defaultValue: "",
      },
    },
  },
  decorators: [MuiThemeDecorator],
};

export const Default: StoryObj<LinkProps> = {
  args: {
    href: "#anchor",
    variant: "default",
    children: "Anchor link",
  },
};

export const Monochrome: StoryObj<LinkProps> = {
  args: {
    href: "#anchor",
    variant: "monochrome",
    children: "Monochrome link",
  },
};

export const WithIcon: StoryObj<LinkProps> = {
  args: {
    href: "#anchor",
    children: "Info link",
    icon: <InformationCircleFilledIcon />,
  },
};

export const External: StoryObj<LinkProps> = {
  args: {
    href: "https://www.okta.com",
    children: "Visit okta.com",
    rel: "noopener",
    target: "_blank",
    ariaLabel: "External Link",
  },
  play: async ({ canvasElement, step }) => {
    await step("Link Aria-Label", ({ args }) => {
      const canvas = within(canvasElement);
      const link = canvas.getByRole("link", { name: "External Link" });
      expect(link).toHaveAttribute("href", args.href);
      expect(link).toHaveAttribute("rel", args.rel);
      expect(link).toHaveAttribute("target", args.target);
    });
  },
};
