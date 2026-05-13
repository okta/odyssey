/*!
 * Copyright (c) 2023-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { Accordion, AccordionProps } from "@okta/odyssey-react-mui";
import { Meta, StoryObj } from "@storybook/react-vite";
import { useCallback, useState } from "react";
import { userEvent, within } from "storybook/test";

import { OdysseyStorybookThemeDecorator } from "../../tools/OdysseyStorybookThemeDecorator.js";

const storybookMeta = {
  component: Accordion,
  decorators: [OdysseyStorybookThemeDecorator],
  argTypes: {
    children: {
      control: "text",
      description: "",
      table: {
        type: {
          summary: "ReactNode",
        },
      },
    },
    label: {
      control: "text",
      description: "",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    isDisabled: {
      control: "boolean",
      description: "",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    isExpanded: {
      control: "boolean",
      description: "",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    variant: {
      control: "select",
      options: ["default", "borderless"],
      description: "Visual style for the accordion",
      table: {
        type: {
          summary: "string",
        },
        defaultValue: { summary: "default" },
      },
    },
  },
  args: {
    children: "Lorem ipsum dolor sit amet.",
    isDisabled: false,
    isExpanded: undefined,
    label: "Label",
    variant: "default",
  },
} satisfies Meta<typeof Accordion>;

export default storybookMeta;

type Story = StoryObj<typeof storybookMeta>;

export const Single: Story = {
  args: {
    children: "This is the content of the box.",
  },
  render: function C(props: AccordionProps) {
    return (
      <Accordion
        isDisabled={props.isDisabled}
        isExpanded={props.isExpanded}
        label={props.label}
        variant={props.variant}
      >
        {props.children}
      </Accordion>
    );
  },
};

export const Borderless: Story = {
  args: {
    children: "This is the content of the box.",
    variant: "borderless",
  },
  play: async ({ canvasElement, step }) => {
    await step("Expand accordion", async () => {
      const canvas = within(canvasElement);
      await userEvent.click(canvas.getByRole("button", { name: "Label" }));
    });
  },
  render: function C(props: AccordionProps) {
    return (
      <Accordion
        isDisabled={props.isDisabled}
        isExpanded={props.isExpanded}
        label={props.label}
        variant={props.variant}
      >
        {props.children}
      </Accordion>
    );
  },
};
export const Multi: Story = {
  args: {
    children: "This is the content of the box.",
  },
  play: async ({ canvasElement, step }) => {
    await step("Expand middle accordion", async () => {
      const canvas = within(canvasElement);
      await userEvent.click(
        canvas.getByRole("button", { name: "Accordion 3" }),
      );
    });
  },
  render: function C(props: AccordionProps) {
    return (
      <>
        <Accordion
          isDisabled={props.isDisabled}
          isExpanded={props.isExpanded}
          label={props.label}
        >
          {props.children}
        </Accordion>
        <Accordion label="Accordion 2">
          This is the second accordion item.
        </Accordion>
        <Accordion label="Accordion 3">
          This is the third accordion item.
        </Accordion>
        <Accordion label="Accordion 4">
          This is the fourth accordion item.
        </Accordion>
        <Accordion label="Accordion 5">
          This is the fifth accordion item.
        </Accordion>
      </>
    );
  },
};

export const Disabled: Story = {
  args: {
    children: "This is the content of the box.",
    isDisabled: true,
  },
  render: function C(props: AccordionProps) {
    return (
      <Accordion isDisabled={props.isDisabled} label="Label">
        {props.children}
      </Accordion>
    );
  },
};

export const Expanded: Story = {
  args: {
    children: "This is the content of the box.",
  },
  render: function C(props: AccordionProps) {
    const [isExpanded, setIsExpanded] = useState(true);
    const onChange = useCallback<NonNullable<AccordionProps["onChange"]>>(
      (_event, expanded) => setIsExpanded(expanded),
      [],
    );
    return (
      <Accordion isExpanded={isExpanded} label="Label" onChange={onChange}>
        {props.children}
      </Accordion>
    );
  },
};
