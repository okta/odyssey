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

import {
  Drawer,
  type DrawerProps,
  drawerSizeValues,
} from "@okta/odyssey-contributions-orpheus-components";
import { Button, Paragraph } from "@okta/odyssey-react-mui";
import { useCallback, useState } from "react";
import { userEvent, within } from "storybook/test";

import { OdysseyStorybookThemeDecorator } from "../../tools/OdysseyStorybookThemeDecorator.js";
import { OrpheusComponentsStorybookThemeDecorator } from "../../tools/OrpheusComponentsStorybookThemeDecorator.js";

const meta = {
  component: Drawer,
  decorators: [
    OdysseyStorybookThemeDecorator,
    OrpheusComponentsStorybookThemeDecorator,
  ],
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A panel that slides in from the edge of the screen to display supplementary content or actions without navigating away from the current page. Forked from the Odyssey Core Drawer to add a `size` prop with three preset widths. Prefer the Core Drawer unless you need to change the drawer's width.",
      },
    },
  },
  argTypes: {
    ariaLabel: {
      control: "text",
      description: "The accessible label for the drawer's close button.",
      table: { type: { summary: "string" } },
    },
    children: {
      control: "text",
      description:
        "The content of the Drawer can be a `string` or any other `ReactNode` or array of `ReactNode`s.",
      table: { type: { summary: "ReactNode | Array<ReactNode>" } },
    },
    hasDividers: {
      control: "boolean",
      description:
        "If `true`, renders divider lines separating the header, content, and footer sections. Dividers also appear automatically when the content is scrollable.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    isOpen: {
      control: "boolean",
      description: "If `true`, the drawer is visible.",
      table: { type: { summary: "boolean" } },
    },
    onClose: {
      description:
        "Called when the drawer is dismissed. Receives the event and the reason for closing.",
      table: {
        type: {
          summary:
            "(event: MuiOnCloseEvent, reason: DrawerOnCloseReason) => void",
        },
      },
    },
    primaryCallToActionComponent: {
      description:
        "An optional Button object to be situated in the Drawer footer. Should almost always be of variant `primary`.",
      table: { type: { summary: "<Button />" } },
    },
    secondaryCallToActionComponent: {
      description:
        "An optional Button object to be situated in the Drawer footer, alongside the `callToActionPrimaryComponent`.",
      table: { type: { summary: "<Button />" } },
    },
    size: {
      control: "select",
      options: drawerSizeValues,
      description:
        "**[Orpheus extension]** Preset width of the drawer, at the default root font size. Small is 400px, medium is 720px, large is 1152px. The widths are set in rem, so they scale with the browser's font-size preference.",
      table: {
        type: { summary: '"sm" | "md" | "lg"' },
        defaultValue: { summary: '"md"' },
      },
    },
    tertiaryCallToActionComponent: {
      description:
        "An optional Button object to be situated in the Drawer footer, alongside the other two `callToAction` components.",
      table: { type: { summary: "<Button />" } },
    },
    title: {
      control: "text",
      description: "Heading text displayed at the top of the drawer.",
      table: { type: { summary: "string" } },
    },
    variant: {
      control: "select",
      options: ["temporary", "persistent"],
      description:
        "Controls how the Drawer positions relative to page content. `temporary` overlays content and dismisses when the user clicks the backdrop. `persistent` pushes the page layout to the side and stays open until explicitly closed.",
      table: {
        type: { summary: '"temporary" | "persistent"' },
        defaultValue: { summary: '"temporary"' },
      },
    },
  },
  args: {
    ariaLabel: "Close drawer",
    children: "Drawer body content goes here.",
    hasDividers: false,
    title: "Drawer title",
  },
  // Every story opens the drawer so visual regression captures the panel rather
  // than just the trigger button.
  play: async ({ canvasElement, step }) => {
    await step("Open the drawer", async () => {
      const canvas = within(canvasElement);
      await userEvent.click(
        canvas.getByRole("button", { name: "Open drawer" }),
      );
    });
  },
  render: function C(props: DrawerProps) {
    const [isOpen, setIsOpen] = useState(false);

    const openDrawer = useCallback(() => {
      setIsOpen(true);
    }, []);

    const closeDrawer = useCallback(() => {
      setIsOpen(false);
    }, []);

    return (
      <>
        <Button label="Open drawer" onClick={openDrawer} variant="primary" />
        <Drawer
          {...props}
          isOpen={isOpen}
          onClose={closeDrawer}
          primaryCallToActionComponent={
            <Button
              label="Primary action"
              onClick={closeDrawer}
              variant="primary"
            />
          }
          secondaryCallToActionComponent={
            <Button label="Cancel" onClick={closeDrawer} variant="secondary" />
          }
        />
      </>
    );
  },
} satisfies Meta<typeof Drawer>;

export default meta;

export const Default: StoryObj<DrawerProps> = {};

export const Small: StoryObj<DrawerProps> = {
  args: {
    size: "sm",
    title: "Small drawer",
  },
};

export const Medium: StoryObj<DrawerProps> = {
  parameters: {
    docs: {
      description: {
        story: "The default width, used when no `size` is supplied.",
      },
    },
  },
  args: {
    size: "md",
    title: "Medium drawer",
  },
};

export const Large: StoryObj<DrawerProps> = {
  args: {
    size: "lg",
    title: "Large drawer",
  },
};

export const WithDividers: StoryObj<DrawerProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "Divider lines separate the header, content, and footer. They also appear on their own once the content becomes scrollable.",
      },
    },
  },
  args: {
    hasDividers: true,
    title: "Drawer with dividers",
  },
};

export const Persistent: StoryObj<DrawerProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "A persistent drawer pushes the page layout aside instead of overlaying it, and stays open until it is explicitly closed.",
      },
    },
  },
  args: {
    title: "Persistent drawer",
    variant: "persistent",
  },
};

export const ScrollingContent: StoryObj<DrawerProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "When the content overflows, the body scrolls and the dividers appear automatically to anchor the sticky header and footer.",
      },
    },
  },
  args: {
    children: Array.from({ length: 12 }, (_unused, index) => (
      <Paragraph key={index}>
        Recovery point {index + 1} captured from the production vault.
      </Paragraph>
    )),
    size: "sm",
    title: "Scrolling drawer",
  },
};
