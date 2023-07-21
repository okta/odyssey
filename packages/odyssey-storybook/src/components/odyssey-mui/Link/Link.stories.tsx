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

import type { StoryObj } from "@storybook/react";

import { MuiThemeDecorator } from "../../../../.storybook/components";
import { Link, LinkProps, linkVariantValues } from "@okta/odyssey-react-mui";
import { InformationCircleFilledIcon } from "@okta/odyssey-react-mui/icons";
import icons from "../../../../.storybook/components/iconUtils";

export default {
  title: "MUI Components/Link",
  component: Link,
  argTypes: {
    children: {
      control: "text",
      table: {
        type: {
          summary: "ReactNode",
        },
        defaultValue: "",
      },
    },
    href: {
      control: "text",
      table: {
        type: {
          summary: "string",
        },
        defaultValue: "",
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
        defaultValue: "",
      },
    },
    rel: {
      control: "text",
      table: {
        type: {
          summary: "string",
        },
        defaultValue: "",
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
        defaultValue: "",
      },
    },
    variant: {
      control: { type: "radio" },
      options: linkVariantValues,
      table: {
        type: {
          summary: linkVariantValues.join(" | "),
        },
        defaultValue: "default",
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
  },
};
