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

import {
  Checkbox,
  CheckboxProps,
  checkboxValidityValues,
} from "@okta/odyssey-react-mui";
import { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

import { fieldComponentPropsMetaData } from "../../../fieldComponentPropsMetaData";
import { MuiThemeDecorator } from "../../../../.storybook/components";
import { axeRun } from "../../../axe-util";
import type { PlaywrightProps } from "../storybookTypes";
import { ChangeEvent, useCallback, useState } from "react";

const storybookMeta: Meta<typeof Checkbox> = {
  title: "MUI Components/Forms/Checkbox",
  component: Checkbox,
  argTypes: {
    ariaLabel: {
      control: "text",
      description: "Aria-label for the checkboxx",
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
    id: fieldComponentPropsMetaData.id,
    isChecked: {
      control: "boolean",
      description: "The checkbox checked state",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    isDefaultChecked: {
      control: "boolean",
      description: "If `true`, the checkbox starts checked",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    isDisabled: fieldComponentPropsMetaData.isDisabled,
    isIndeterminate: {
      control: "boolean",
      description: "If `true`, the checkbox is in an indeterminate state",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    isReadOnly: {
      control: "boolean",
      description: "If `true`, the checkbox is read-only",
      table: {
        type: {
          summary: "boolean",
        },
        defaultValue: {
          summary: false,
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
    hint: {
      control: "text",
      description: "The helper text content",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    name: fieldComponentPropsMetaData.name,
    onChange: {
      control: null,
      description: "Callback fired when the checkbox value changes",
      table: {
        type: {
          summary: "func",
        },
      },
    },
    onBlur: {
      control: null,
      description: "Callback fired when the blur event happens",
      table: {
        type: {
          summary: "func",
        },
      },
    },
    validity: {
      options: checkboxValidityValues,
      control: { type: "radio" },
      description:
        "The checkbox validity, if different from its enclosing group. Doesn't need to be set if the checkbox isn't a different validity from an enclosing `CheckboxGroup`.",
      table: {
        type: {
          summary: checkboxValidityValues.join(" | "),
        },
        defaultValue: {
          summary: "inherit",
        },
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

const checkTheBox =
  ({ canvasElement, step }: PlaywrightProps<CheckboxProps>) =>
  async (actionName: string) => {
    await step("check the box", async ({ args }) => {
      const canvas = within(canvasElement);
      const checkBox = canvas.getByRole("checkbox") as HTMLInputElement;
      if (checkBox) {
        await userEvent.click(checkBox);
      }
      await userEvent.tab();
      await expect(checkBox).toBeChecked();
      await expect(args.onBlur).toHaveBeenCalledTimes(1);
      await axeRun(actionName);
    });
  };

export const Default: StoryObj<typeof Checkbox> = {
  args: {
    label: "Enable warp drive recalibration",
    isDefaultChecked: false,
  },
  play: async ({ canvasElement, step }) => {
    await checkTheBox({ canvasElement, step })("Checkbox Default");
  },
};

export const Required: StoryObj<typeof Checkbox> = {
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
    isDefaultChecked: false,
  },
  play: async ({ canvasElement, step }) => {
    await checkTheBox({ canvasElement, step })("Checkbox Required");
  },
};

export const Checked: StoryObj<typeof Checkbox> = {
  args: {
    label: "Automatically assign Okta Admin Console",
    isDefaultChecked: true,
  },
};

export const Disabled: StoryObj<typeof Checkbox> = {
  parameters: {
    docs: {
      description: {
        story:
          "Checkboxes may be disabled individually or as a group. The values of disabled inputs will not be submitted.",
      },
    },
  },
  args: {
    label: "Automatically assign Okta Admin Console",
    isDisabled: true,
    isDefaultChecked: false,
  },
};

export const Indeterminate: StoryObj<typeof Checkbox> = {
  parameters: {
    docs: {
      description: {
        story:
          "In the case of nested checkboxes, an indeterminate state may be required. Note that this state is visual- only and will be submitted as either checked or unchecked depending on the internal state.",
      },
    },
  },
  args: {
    label: "Automatically assign Okta Admin Console",
    isIndeterminate: true,
    isDefaultChecked: true,
  },
};

export const Invalid: StoryObj<typeof Checkbox> = {
  args: {
    label: "Automatically assign Okta Admin Console",
    validity: "invalid",
    isDefaultChecked: false,
  },
  play: async ({ canvasElement, step }) => {
    await checkTheBox({ canvasElement, step })("Checkbox Disabled");
  },
};

export const ReadOnly: StoryObj<typeof Checkbox> = {
  args: {
    label: "Automatically assign Okta Admin Console",
    isReadOnly: true,
    isDefaultChecked: true,
  },
  play: async ({ canvasElement, step }) => {
    await checkTheBox({ canvasElement, step })("ReadOnly Checkbox");
  },
};

export const Hint: StoryObj<typeof Checkbox> = {
  parameters: {
    docs: {
      description: {
        story: "hint provides helper text to the Checkbox",
      },
    },
  },
  args: {
    label: "I agree to the terms and conditions",
    hint: "Really helpful hint",
  },
  play: async ({ canvasElement, step }) => {
    await checkTheBox({ canvasElement, step })("Checkbox Hint");
  },
};

export const Controlled: StoryObj<typeof Checkbox> = {
  parameters: {
    docs: {
      description: {
        story:
          "When the component is controlled, the parent component is responsible for managing the state of `Checkbox`. `onChange` should be used to listen for component changes and to update the values in the `value` prop.",
      },
    },
  },
  args: {
    label: "Automatically assign Okta Admin Console",
    isChecked: true,
    onChange: () => {},
  },
  render: function C(args) {
    const [isChecked, setIsChecked] = useState(true);
    const onChange = useCallback(
      (_event: ChangeEvent<HTMLInputElement>, checked: boolean) =>
        setIsChecked(checked),
      [],
    );
    return (
      <Checkbox
        {...args}
        isChecked={isChecked}
        isDefaultChecked={undefined}
        onChange={onChange}
      />
    );
  },
};
