/*!
 * Copyright (c) 2026-present, Okta, Inc. and/or its affiliates. All rights reserved.
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
  CollapsibleCard,
  type CollapsibleCardProps,
  collapsibleCardVariantValues,
} from "@okta/odyssey-contributions-opa-components";
import { Paragraph, Stack } from "@okta/odyssey-react-mui";
import { useCallback } from "react";

import { OdysseyStorybookThemeDecorator } from "../tools/OdysseyStorybookThemeDecorator.js";
import { OpaComponentsOdysseyStorybookThemeDecorator } from "../tools/OpaComponentsOdysseyStorybookThemeDecorator.js";
import { useStoryArgOrLocalState } from "../tools/useStoryArgOrLocalState.js";

const meta = {
  component: CollapsibleCard,
  decorators: [
    OdysseyStorybookThemeDecorator,
    OpaComponentsOdysseyStorybookThemeDecorator,
  ],
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `\`CollapsibleCard\` is a bordered card whose tinted header stays visible while the body collapses. Use it to break a long task or setup flow into discrete, individually expandable steps.

The header band holds up to four slots, stacked in this order: \`overline\`, \`label\`, \`description\`, \`tags\`. All of them remain visible while the card is collapsed, so a collapsed card still communicates what it contains and why it matters. Use \`tags\` for progress or status text such as "3 steps".

The entire band is the expand toggle, so its content must stay non-interactive. Putting a button or a link inside \`description\` nests an interactive element inside a \`role="button"\`, which fails accessibility checks and leaves the control unreachable by keyboard. Put those actions in \`children\` instead.

Cards do not space themselves. Stack them in a flex column and set the gap.`,
      },
    },
  },
  argTypes: {
    children: {
      control: "text",
      description: "Content rendered in the collapsible body.",
      table: { type: { summary: "ReactNode" } },
    },
    description: {
      control: "text",
      description:
        "Supporting copy rendered under the label, inside the header band. Remains visible while the card is collapsed.",
      table: { type: { summary: "ReactNode" } },
    },
    isDisabled: {
      control: "boolean",
      description:
        "If `true`, the card is disabled and cannot be expanded or collapsed.",
      table: { type: { summary: "boolean" } },
    },
    isExpanded: {
      control: "boolean",
      description: "If `true`, the card is expanded (controlled).",
      table: { type: { summary: "boolean" } },
    },
    label: {
      control: "text",
      description: "The primary heading text in the header band.",
      table: { type: { summary: "string" } },
    },
    overline: {
      control: "text",
      description:
        "Short categorising text rendered above the label in uppercase.",
      table: { type: { summary: "string" } },
    },
    tags: {
      control: "object",
      description:
        "Labels for the status tags rendered at the bottom of the header band. The tags are non-interactive, because the whole band is the expand toggle.",
      table: { type: { summary: "string[]" } },
    },
    variant: {
      control: "select",
      options: collapsibleCardVariantValues,
      description:
        "Background tone of the header band. The body and the border stay neutral.",
      table: {
        defaultValue: { summary: "default" },
        type: { summary: collapsibleCardVariantValues.join(" | ") },
      },
    },
  },
  args: {
    children: "Complete each item before moving on to the next task.",
    isDisabled: false,
    label: "Before you begin",
    overline: "Prerequisites",
    variant: "info",
  },
} satisfies Meta<typeof CollapsibleCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    description:
      "To manage access to user accounts on your database instance, you must create a separate integration for each instance.",
    isExpanded: true,
    tags: ["2 steps", "Optional"],
  },
  render: function C(props, context) {
    const {
      children,
      description,
      isDisabled,
      isExpanded: isExpandedArg,
      label,
      overline,
      tags,
      variant,
    } = props;
    const { value: isExpanded, setValue: setIsExpanded } =
      useStoryArgOrLocalState<CollapsibleCardProps, "isExpanded">({
        args: props,
        context,
        argKey: "isExpanded",
        defaultValue: isExpandedArg,
      });
    const onChange = useCallback<NonNullable<CollapsibleCardProps["onChange"]>>(
      (_event, expanded) => setIsExpanded(expanded),
      [setIsExpanded],
    );

    return (
      <CollapsibleCard
        description={description}
        isDisabled={isDisabled}
        isExpanded={isExpanded}
        label={label}
        onChange={onChange}
        overline={overline}
        tags={tags}
        variant={variant}
      >
        {children}
      </CollapsibleCard>
    );
  },
};

export const Collapsed: Story = {
  args: {
    description:
      "To manage access to user accounts on your database instance, you must create a separate integration for each instance.",
    isDefaultExpanded: false,
    label: "Add database integration",
    overline: "Task 1 of 3",
    tags: ["2 steps"],
  },
};

export const WithTags: Story = {
  args: {
    description:
      "To manage access to user accounts on your database instance, you must create a separate integration for each instance.",
    isDefaultExpanded: true,
    label: "Add database integration",
    overline: "Task 1 of 3",
    tags: ["2 steps", "Optional"],
  },
};

export const Variants: Story = {
  render: function C() {
    return (
      <Stack spacing={4}>
        <CollapsibleCard
          isDefaultExpanded
          label="Before you begin"
          overline="Prerequisites"
          tags={["3 steps"]}
          variant="info"
        >
          <Paragraph>Ensure you have a resource admin role.</Paragraph>
        </CollapsibleCard>
        <CollapsibleCard
          description="To manage access to user accounts on your database instance, you must create a separate integration for each instance."
          label="Add database integration"
          overline="Task 1 of 2"
          tags={["2 steps"]}
          variant="default"
        >
          <Paragraph>Pick the instance you want to manage.</Paragraph>
        </CollapsibleCard>
      </Stack>
    );
  },
};

export const LabelOnly: Story = {
  args: {
    isDefaultExpanded: true,
    overline: undefined,
  },
};

export const Disabled: Story = {
  args: {
    description: "Finish the prerequisites before opening this task.",
    isDisabled: true,
  },
};
