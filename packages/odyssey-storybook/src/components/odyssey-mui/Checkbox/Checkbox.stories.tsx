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

import { Checkbox, CheckboxProps } from "@okta/odyssey-react-mui";
import { Meta, ReactRenderer, StoryObj } from "@storybook/react";

import { MuiThemeDecorator } from "../../../../.storybook/components";

import { userEvent, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { axeRun } from "../../../axe-util";
// eslint-disable-next-line import/no-extraneous-dependencies
import { StepFunction } from "@storybook/types";

const storybookMeta: Meta<CheckboxProps> = {
  title: "MUI Components/Forms/Checkbox",
  component: Checkbox,
  argTypes: {
    ariaLabel: {
      control: "text",
      description: "Aria-label for the checkbox",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    ariaLabelledBy: {
      control: "text",
      description: "Aria-labelledby for the checkbox",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    isInvalid: {
      control: "boolean",
      description:
        "If `true`, indicates that the checkbox has an invalid value",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    isValid: {
      control: "boolean",
      description: "If `true`, indicates that the checkbox has a valid value",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    isChecked: {
      control: "boolean",
      description: "If `true`, the checkbox is checked",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    isDisabled: {
      control: "boolean",
      description: "If `true`, the checkbox is disabled",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    isIndeterminate: {
      control: "boolean",
      description: "If `true`, the checkbox is in an indeterminate state",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    isRequired: {
      control: "boolean",
      description: "If `true`, the checkbox is required",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    label: {
      control: "text",
      description: "The label text for the checkbox",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    name: {
      control: "text",
      description: "The name attribute of the checkbox",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    onChange: {
      control: null,
      description: "Callback fired when the checkbox value changes",
      table: {
        type: {
          summary: "func",
        },
        defaultValue: "",
      },
    },
    value: {
      control: "text",
      description: "The value attribute of the checkbox",
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

const checkTheBox = async (
  canvasElement: HTMLElement,
  step: StepFunction<ReactRenderer, CheckboxProps>,
  action: string
) => {
  await step("check the box", async () => {
    const canvas = within(canvasElement);
    const checkBox = canvas.getByRole("checkbox") as HTMLInputElement;
    checkBox && (await userEvent.click(checkBox));
    expect(checkBox.checked).toBe(true);
    await axeRun(action);
  });
};

export const Default: StoryObj<CheckboxProps> = {
  args: {
    label: "Enable warp drive recalibration",
  },
  play: async ({ canvasElement, step }) => {
    checkTheBox(canvasElement, step, "Checkbox Default");
  },
};

export const Required: StoryObj<CheckboxProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "Checkboxes are optional by default, and there are few circumstances in which a checkbox is required. Odyssey provides an `isRequired` boolean that, when set to `true`, makes the checkbox required. Note that when a checkbox is required, it must be checked for the form to submit, so this is only appropriate for checkboxes that must be checked to continue, such as a confirmation.",
      },
    },
  },
  args: {
    label: "I agree to the terms and conditions",
    isRequired: true,
  },
  play: async ({ canvasElement, step }) => {
    checkTheBox(canvasElement, step, "Checkbox Required");
  },
};

export const Checked: StoryObj<CheckboxProps> = {
  args: {
    label: "Pre-flight systems check complete",
    isChecked: true,
  },
  play: async ({ canvasElement, step }) => {
    checkTheBox(canvasElement, step, "Checkbox Checked");
  },
};

export const Disabled: StoryObj<CheckboxProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "Checkboxes may be disabled individually or as a group. The values of disabled inputs will not be submitted.",
      },
    },
  },
  args: {
    label: "Pre-flight systems check complete",
    isDisabled: true,
  },
};

export const Indeterminate: StoryObj<CheckboxProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "In the case of nested checkboxes, an indeterminate state may be required. Note that this state is visual- only and will be submitted as either checked or unchecked depending on the internal state.",
      },
    },
  },
  args: {
    label: "Pre-flight systems check complete",
    isIndeterminate: true,
    isChecked: true,
  },
  play: async ({ canvasElement, step }) => {
    checkTheBox(canvasElement, step, "Checkbox Indeterminate");
  },
};

export const Invalid: StoryObj<CheckboxProps> = {
  args: {
    label: "Pre-flight systems check complete",
    isInvalid: true,
  },
  play: async ({ canvasElement, step }) => {
    checkTheBox(canvasElement, step, "Checkbox Disabled");
  },
};
