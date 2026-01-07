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

import type { Meta, StoryObj } from "@storybook/react";

import { HintLink } from "@okta/odyssey-react-mui";
import { expect, within } from "@storybook/test";

import { OdysseyStorybookThemeDecorator } from "../../../tools/OdysseyStorybookThemeDecorator.js";

const meta = {
  component: HintLink,
  decorators: [OdysseyStorybookThemeDecorator],
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "HintLink pairs with other Odyssey field components to add additional guidance links. It is not intended to be rendered on its own.",
      },
    },
  },
  argTypes: {
    children: {
      control: "text",
      description: "Content rendered inside the link component",
      table: {
        category: "Visual",
        type: {
          summary: "ReactNode",
        },
      },
    },
    href: {
      control: "text",
      description:
        "Destination URL applied to the underlying `<a href>` attribute",
      table: {
        category: "Functional",
        type: {
          summary: "string",
        },
      },
    },
    onClick: {
      action: true,
      control: false,
      description: "Callback fired when the link is clicked",
      table: {
        category: "Functional",
        type: {
          summary: "(event: MouseEvent<HTMLAnchorElement, MouseEvent>) => void",
        },
      },
    },
    rel: {
      control: "text",
      description:
        'Relationship hints passed to the browser (for example `"noopener"` when using `target="_blank"`',
      table: {
        category: "Functional",
        type: {
          summary: "string",
        },
      },
    },
    target: {
      control: "text",
      description: "If set to `_blank`, the Link will display an external icon",
      table: {
        category: "Functional",
        type: {
          summary: "string",
        },
      },
    },
    testId: {
      control: "text",
      description:
        "Adds a `data-se` attribute for integration tests and analytics hooks",
      table: {
        category: "Functional",
        type: {
          summary: "string",
        },
      },
    },
  },
  args: {
    children: "Learn more",
    href: "#learn-more",
  },
} satisfies Meta<typeof HintLink>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const External: Story = {
  args: {
    href: "https://www.okta.com",
    rel: "noopener",
    target: "_blank",
    children: "Read documentation",
  },
  play: async ({ canvasElement, step }) => {
    await step("Verify external attributes", async ({ args }) => {
      const canvas = within(canvasElement);
      const link = canvas.getByRole("link", { name: args.children as string });
      await expect(link).toHaveAttribute("href", args.href);
      await expect(link).toHaveAttribute("target", args.target ?? "");
      await expect(link).toHaveAttribute("rel", args.rel ?? "");
    });
  },
};
