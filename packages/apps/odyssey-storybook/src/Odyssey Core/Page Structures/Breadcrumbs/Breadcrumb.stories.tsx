/*!
 * Copyright (c) 2025-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import type { Meta, StoryObj } from "@storybook/react-vite";

import { Breadcrumb, type BreadcrumbProps } from "@okta/odyssey-react-mui";
import { action } from "storybook/actions";

import { OdysseyStorybookThemeDecorator } from "../../../tools/OdysseyStorybookThemeDecorator.js";

const storybookMeta = {
  component: Breadcrumb,
  decorators: [OdysseyStorybookThemeDecorator],
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "`Breadcrumb` composes `BreadcrumbList`. It is not supported as a standalone Odyssey component.",
      },
    },
  },
  argTypes: {
    children: {
      control: "text",
      description: "Label text displayed for the breadcrumb",
      table: {
        category: "Visual",
        type: {
          summary: "string",
        },
      },
    },
    href: {
      control: "text",
      description: "Target URL when the breadcrumb renders as a link",
      table: {
        category: "Functional",
        type: {
          summary: "string",
        },
      },
    },
    iconName: {
      control: { type: "radio" },
      options: ["group", "user"],
      description: "Optional leading icon that represents the destination",
      table: {
        category: "Visual",
        type: {
          summary: '"group" | "user"',
        },
      },
    },
    onClick: {
      control: false,
      description:
        "Callback fired when the breadcrumb is activated. Only used when `href` is provided",
      table: {
        category: "Functional",
        type: {
          summary: "MouseEventHandler",
        },
      },
    },
  },
  args: {
    children: "Breadcrumb label",
  },
} satisfies Meta<typeof Breadcrumb>;

export default storybookMeta;

type Story = StoryObj<typeof Breadcrumb>;

export const Default: Story = {
  render: (args: BreadcrumbProps) => <Breadcrumb {...args} />,
};

export const Link: Story = {
  args: {
    href: "#anchor",
  },
  render: (args: BreadcrumbProps) => <Breadcrumb {...args} />,
};

export const WithClick: Story = {
  args: {
    href: "#anchor",
    onClick: action("Breadcrumb clicked"),
  },
  render: (args: BreadcrumbProps) => <Breadcrumb {...args} />,
};

export const Icon: Story = {
  args: {
    iconName: "group",
  },
  render: (args: BreadcrumbProps) => <Breadcrumb {...args} />,
};
