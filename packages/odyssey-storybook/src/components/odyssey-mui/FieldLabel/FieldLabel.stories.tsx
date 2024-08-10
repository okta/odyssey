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

import { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

import { FieldLabel, FieldLabelProps } from "@okta/odyssey-react-mui";
import { MuiThemeDecorator } from "../../../../.storybook/components";
import { axeRun } from "../../../axe-util";
import type { PlaywrightProps } from "../storybookTypes";

const storybookMeta: Meta<typeof FieldLabel> = {
  title: "MUI Components/Forms/FieldLabel",
  component: FieldLabel,
  argTypes: {
    hasVisibleLabel: {
      control: "boolean",
      description:
        "Whether the label is visible or hidden (for screen readers only)",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    id: {
      control: "text",
      description: "The ID of the label element",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    inputId: {
      control: "text",
      description: "The ID of the associated input element",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    isOptional: {
      control: "boolean",
      description: "Whether the field is optional",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    text: {
      control: "text",
      description: "The label text",
      table: {
        type: {
          summary: "string",
        },
      },
    },
  },
  decorators: [MuiThemeDecorator],
  tags: ["autodocs"],
};

export default storybookMeta;

const focusLabel =
  ({ canvasElement, step }: PlaywrightProps<FieldLabelProps>) =>
  async (actionName: string) => {
    await step("focus the label", async () => {
      const canvas = within(canvasElement);
      const label = canvas.getByText(actionName);
      if (label) {
        await userEvent.tab();
      }
      await expect(label).toHaveFocus();
      await axeRun(actionName);
    });
  };

export const Default: StoryObj<typeof FieldLabel> = {
  args: {
    hasVisibleLabel: true,
    id: "name-label",
    inputId: "name-label",
    isOptional: false,
    text: "Name",
  },
  play: async ({ canvasElement, step }: PlaywrightProps<FieldLabelProps>) => {
    await focusLabel({ canvasElement, step })("Username");
  },
};

export const OptionalField: StoryObj<typeof FieldLabel> = {
  parameters: {
    docs: {
      description: {
        story:
          "An optional field label includes additional text indicating that the field is optional.",
      },
    },
  },
  args: {
    ...Default.args,
    isOptional: true,
    text: "Email",
  } as FieldLabelProps,
  play: async ({ canvasElement, step }: PlaywrightProps<FieldLabelProps>) => {
    await focusLabel({ canvasElement, step })("Email");
  },
};

export const HiddenLabel: StoryObj<typeof FieldLabel> = {
  parameters: {
    docs: {
      description: {
        story:
          "A hidden label is not visible but still accessible to screen readers.",
      },
    },
  },
  args: {
    ...Default.args,
    hasVisibleLabel: false,
    text: "Password",
  } as FieldLabelProps,
};

export const LongLabel: StoryObj<typeof FieldLabel> = {
  parameters: {
    docs: {
      description: {
        story: "A label with longer text to demonstrate wrapping behavior.",
      },
    },
  },
  args: {
    ...Default.args,
    text: "This is a very long label that demonstrates how the component handles text wrapping for lengthy labels",
  } as FieldLabelProps,
  play: async ({ canvasElement, step }: PlaywrightProps<FieldLabelProps>) => {
    await focusLabel({ canvasElement, step })(
      "This is a very long label that demonstrates how the component handles text wrapping for lengthy labels",
    );
  },
};
