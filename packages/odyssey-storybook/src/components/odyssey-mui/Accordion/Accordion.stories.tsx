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

import { Meta, StoryObj } from "@storybook/react";
import { Accordion, AccordionProps } from "@okta/odyssey-react-mui";
import { expect, userEvent, within, waitFor } from "@storybook/test";
import { useCallback, useState } from "react";

import { PlaywrightProps } from "../storybookTypes";
import { MuiThemeDecorator } from "../../../../.storybook/components";

const storybookMeta: Meta<AccordionProps> = {
  title: "MUI Components/Accordion",
  component: Accordion,
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
          summary: "ReactNode",
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
  },
  args: {
    children: "Lorem ipsum dolor sit amet.",
    isDisabled: false,
    isExpanded: undefined,
    label: "Label",
  },
  decorators: [MuiThemeDecorator],
};

export default storybookMeta;

export const Single: StoryObj<AccordionProps> = {
  args: {
    children: "This is the content of the box.",
  },
  render: function C(props: AccordionProps) {
    return (
      <Accordion
        label={props.label}
        isDisabled={props.isDisabled}
        isExpanded={props.isExpanded}
      >
        {props.children}
      </Accordion>
    );
  },
};

export const Multi: StoryObj<AccordionProps> = {
  args: {
    children: "This is the content of the box.",
  },
  render: function C(props: AccordionProps) {
    return (
      <>
        <Accordion
          label={props.label}
          isDisabled={props.isDisabled}
          isExpanded={props.isExpanded}
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

export const Disabled: StoryObj<AccordionProps> = {
  args: {
    children: "This is the content of the box.",
    isDisabled: true,
  },
  render: function C(props: AccordionProps) {
    return (
      <Accordion label="Label" isDisabled={props.isDisabled}>
        {props.children}
      </Accordion>
    );
  },
};

export const Expanded: StoryObj<AccordionProps> = {
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
      <Accordion label="Label" isExpanded={isExpanded} onChange={onChange}>
        {props.children}
      </Accordion>
    );
  },
  play: async ({ canvasElement, step }: PlaywrightProps<AccordionProps>) => {
    await step("Accordion Expanded", async () => {
      const canvas = within(canvasElement);
      const accordion = canvas.getByRole("button");
      const accordionContent = canvas.getByRole("region");

      await waitFor(() => {
        expect(accordionContent).toBeVisible();
      });

      await userEvent.click(accordion);
      await waitFor(() => {
        expect(accordionContent).not.toBeVisible();
      });

      await userEvent.click(accordion);
      await waitFor(() => {
        expect(accordionContent).toBeVisible();
      });
    });
  },
};
