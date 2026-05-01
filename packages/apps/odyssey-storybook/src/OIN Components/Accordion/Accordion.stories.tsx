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

import {
  Accordion,
  AccordionProps,
} from "@okta/odyssey-contributions-oin-components";
import { Box, Button } from "@okta/odyssey-react-mui";
import { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect, within } from "storybook/test";

import { OdysseyStorybookThemeDecorator } from "../../tools/OdysseyStorybookThemeDecorator.js";
import { OinComponentsStorybookThemeDecorator } from "../../tools/OinComponentsStorybookThemeDecorator.js";

const storybookMeta: Meta<AccordionProps> = {
  component: Accordion,
  argTypes: {
    title: {
      control: "text",
      description: "The title displayed in the accordion header",
      table: {
        type: { summary: "string" },
      },
      type: {
        required: true,
        name: "string",
      },
    },
    hint: {
      control: "text",
      description: "Optional hint text displayed next to the title",
      table: {
        type: { summary: "string" },
      },
    },
    description: {
      control: "text",
      description:
        "Optional description displayed below the header when expanded",
      table: {
        type: { summary: "string | ReactElement" },
      },
    },
    isLoading: {
      control: "boolean",
      description: "Whether the accordion content is loading",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    isDisabled: {
      control: "boolean",
      description: "Whether the accordion is disabled",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    isDefaultExpanded: {
      control: "boolean",
      description:
        "Whether the accordion is expanded by default (uncontrolled). Do not use together with isExpanded.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
      },
    },
    isExpanded: {
      control: "boolean",
      description:
        "Whether the accordion is expanded (controlled). Do not use together with isDefaultExpanded.",
      table: {
        type: { summary: "boolean" },
      },
    },
    testId: {
      control: "text",
      description: "A test ID for integration testing",
      table: {
        type: { summary: "string" },
      },
    },
    children: {
      control: false,
      description: "Content rendered inside the accordion",
      table: {
        type: { summary: "ReactNode" },
      },
    },
  },
  decorators: [
    OdysseyStorybookThemeDecorator,
    OinComponentsStorybookThemeDecorator,
  ],
  tags: ["autodocs"],
};

export default storybookMeta;

const DefaultTemplate: StoryObj<AccordionProps> = {
  render: function C(args) {
    return (
      <Accordion {...args}>
        {args.children ?? "This is the accordion content."}
      </Accordion>
    );
  },
};

export const Default: StoryObj<AccordionProps> = {
  ...DefaultTemplate,
  args: {
    title: "Accordion Title",
    children: "This is the accordion content.",
  },
};

export const WithHint: StoryObj<AccordionProps> = {
  ...DefaultTemplate,
  args: {
    title: "Accordion Title",
    hint: "Optional",
    children: "This is the accordion content with a hint.",
  },
};

export const WithDescription: StoryObj<AccordionProps> = {
  ...DefaultTemplate,
  args: {
    title: "Accordion Title",
    description:
      "This description provides additional context about the accordion content.",
    children: "This is the accordion content.",
  },
};

export const Loading: StoryObj<AccordionProps> = {
  ...DefaultTemplate,
  args: {
    title: "Loading Accordion",
    isLoading: true,
    children: "This content is not yet available.",
  },
  play: async ({ canvasElement, step }) => {
    await step("verify loading state", async () => {
      const canvas = within(canvasElement);
      const spinner = await canvas.findByRole("progressbar");
      expect(spinner).toBeTruthy();

      const button = await canvas.findByRole("button");
      expect(button).toHaveAttribute("aria-disabled", "true");
      expect(button).toHaveAttribute("aria-expanded", "false");

      expect(canvas.getByText("Loading Accordion")).toBeTruthy();
    });
  },
  parameters: {
    docs: {
      description: {
        story:
          "When `isLoading` is true, a spinner replaces the expand icon, the accordion is collapsed and non-interactive. The title remains visible.",
      },
    },
  },
};

export const Disabled: StoryObj<AccordionProps> = {
  ...DefaultTemplate,
  args: {
    title: "Disabled Accordion",
    isDisabled: true,
    children: "This accordion is disabled and cannot be toggled.",
  },
  parameters: {
    a11y: {
      config: {
        rules: [
          {
            // WCAG 2.1 exempts disabled UI components from contrast requirements.
            // MUI renders aria-disabled="true" (not HTML disabled) so axe does not
            // automatically exempt it — we disable the rule explicitly here.
            id: "color-contrast",
            enabled: false,
          },
        ],
      },
    },
  },
};

export const CollapsedByDefault: StoryObj<AccordionProps> = {
  ...DefaultTemplate,
  args: {
    title: "Collapsed Accordion",
    isDefaultExpanded: false,
    children: "Expand to see this content.",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Set `isDefaultExpanded` to `false` to render the accordion collapsed on initial mount (uncontrolled).",
      },
    },
  },
};

export const ExpandedByDefault: StoryObj<AccordionProps> = {
  ...DefaultTemplate,
  args: {
    title: "Expanded Accordion",
    isDefaultExpanded: true,
    children: "Collapse to hide this content.",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Set `isDefaultExpanded` to `true` to render the accordion expanded on initial mount (uncontrolled).",
      },
    },
  },
};

export const Controlled: StoryObj<AccordionProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "Use `isExpanded` together with `onChange` to fully control the open/close state externally.",
      },
    },
  },
  render: function C() {
    const [expanded, setExpanded] = useState(false);
    return (
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Button
          label={expanded ? "Collapse" : "Expand"}
          onClick={() => setExpanded((prev) => !prev)}
          variant="secondary"
        />
        <Accordion
          isExpanded={expanded}
          onChange={() => setExpanded((prev) => !prev)}
          title="Controlled Accordion"
        >
          This accordion is controlled externally.
        </Accordion>
      </Box>
    );
  },
};

export const MultipleAccordions: StoryObj<AccordionProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "Multiple accordions can be composed independently. Each manages its own expand/collapse state by default.",
      },
    },
  },
  render: function C() {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Accordion hint="Required" title="Section 1">
          Content for section 1.
        </Accordion>
        <Accordion description="Extra details here." title="Section 2">
          Content for section 2.
        </Accordion>
        <Accordion title="Section 3">Content for section 3.</Accordion>
      </Box>
    );
  },
};
