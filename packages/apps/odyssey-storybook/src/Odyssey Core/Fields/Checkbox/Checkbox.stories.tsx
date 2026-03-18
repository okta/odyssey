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
  deepmerge,
} from "@okta/odyssey-react-mui";
import { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import { OdysseyStorybookThemeDecorator } from "../../../tools/OdysseyStorybookThemeDecorator.js";
import { useStoryArgOrLocalState } from "../../../tools/useStoryArgOrLocalState.js";
import { fieldComponentPropsMetaData } from "../fieldComponentPropsMetaData.js";

const meta = {
  component: Checkbox,
  decorators: [OdysseyStorybookThemeDecorator],
  tags: ["autodocs"],
  argTypes: {
    ariaLabel: {
      control: "text",
      description: "Aria-label for the checkbox",
      table: {
        category: "Functional",
        type: {
          summary: "string",
        },
      },
    },
    ariaLabelledBy: {
      control: "text",
      description: "Aria-labelledby for the checkbox",
      table: {
        category: "Functional",
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
        category: "Visual",
        type: {
          summary: "boolean",
        },
      },
    },
    isDefaultChecked: {
      control: "boolean",
      description: "If `true`, the checkbox starts checked",
      table: {
        category: "Functional",
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
        category: "Visual",
        type: {
          summary: "boolean",
        },
      },
    },
    isReadOnly: {
      control: "boolean",
      description: "If `true`, the checkbox is read-only",
      table: {
        category: "Visual",
        type: {
          summary: "boolean",
        },
        defaultValue: {
          summary: "false",
        },
      },
    },
    isRequired: {
      control: "boolean",
      description: "If `true`, the checkbox is required",
      table: {
        category: "Visual",
        type: {
          summary: "boolean",
        },
      },
    },
    label: {
      control: "text",
      description: "The label text for the checkbox",
      table: {
        category: "Visual",
        type: {
          summary: "string",
        },
      },
    },
    hint: {
      control: "text",
      description: "The helper text content",
      table: {
        category: "Visual",
        type: {
          summary: "string",
        },
      },
    },
    name: fieldComponentPropsMetaData.name,
    onChange: {
      description: "Callback fired when the checkbox value changes",
      table: {
        category: "Functional",
        type: {
          summary: "func",
        },
      },
    },
    onBlur: {
      description: "Callback fired when the blur event happens",
      table: {
        category: "Functional",
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
        category: "Visual",
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
        category: "Functional",
        type: {
          summary: "string",
        },
      },
    },
  },
  args: {
    isReadOnly: false,
    validity: "inherit",
    onBlur: fn(),
    onChange: fn(),
  },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

const CheckboxTemplate: Story = {
  args: {
    isChecked: false,
    isDisabled: false,
    isReadOnly: false,
    label: "Label",
  },
  argTypes: {
    isDefaultChecked: { control: false },
  },
  render: function Render(args, context) {
    const { value, setValue } = useStoryArgOrLocalState<
      CheckboxProps,
      "isChecked"
    >({
      args,
      context,
      argKey: "isChecked",
      defaultValue: args.isChecked ?? false,
    });

    const onChange = () => {
      setValue(!value);
    };

    return (
      <Checkbox
        {...args}
        isChecked={value}
        isDefaultChecked={undefined}
        onChange={onChange}
      />
    );
  },
};

const checkTheBox =
  (): Story["play"] =>
  ({ canvasElement, step }) =>
    step("check the box", async ({ args }) => {
      const canvas = within(canvasElement);
      const checkBox = canvas.getByRole("checkbox");
      if (checkBox) {
        await userEvent.click(checkBox);
      }
      await userEvent.tab();
      await expect(checkBox).toBeChecked();
      await expect(args.onBlur).toHaveBeenCalledTimes(1);
    });

export const Default: Story = {
  ...deepmerge(CheckboxTemplate, {
    parameters: {
      docs: {
        description: {
          story:
            "When the component is controlled, the parent component is responsible for managing the state of `Checkbox`. `onChange` should be used to listen for component changes and to update the values in the `value` prop.",
        },
      },
    },
    play: checkTheBox(),
    tags: ["!autodocs"],
  }),
};

export const Required: Story = {
  ...deepmerge(CheckboxTemplate, {
    parameters: {
      docs: {
        description: {
          story:
            "Checkboxes are optional by default, and there are few circumstances in which a checkbox is required. Odyssey provides an `isRequired` boolean that, when set to `true`, makes the checkbox required. Note that when a checkbox is required, it must be checked for the form to submit, so this is only appropriate for checkboxes that must be checked to continue, such as a confirmation.",
        },
      },
    },
    args: {
      isRequired: true,
      isChecked: false,
    },
    play: checkTheBox(),
  }),
};

export const Checked: Story = {
  ...deepmerge(CheckboxTemplate, {
    args: {
      isChecked: true,
    },
  }),
};

export const Disabled: Story = {
  ...deepmerge(CheckboxTemplate, {
    parameters: {
      docs: {
        description: {
          story:
            "Checkboxes may be disabled individually or as a group. The values of disabled inputs will not be submitted.",
        },
      },
    },
    args: {
      isDisabled: true,
      isChecked: false,
    },
  }),
};

export const Indeterminate: Story = {
  ...deepmerge(CheckboxTemplate, {
    parameters: {
      docs: {
        description: {
          story:
            "In the case of nested checkboxes, an indeterminate state may be required. Note that this state is visual- only and will be submitted as either checked or unchecked depending on the internal state.",
        },
      },
    },
    args: {
      isIndeterminate: true,
      isChecked: true,
    },
  }),
};

export const Invalid: Story = {
  ...deepmerge(CheckboxTemplate, {
    args: {
      validity: "invalid",
      isChecked: false,
    },
    play: checkTheBox(),
  }),
};

export const ReadOnly: Story = {
  ...deepmerge(CheckboxTemplate, {
    args: {
      isReadOnly: true,
      isChecked: true,
    },
    play: checkTheBox(),
  }),
};

export const Hint: Story = {
  ...deepmerge(CheckboxTemplate, {
    parameters: {
      docs: {
        description: {
          story: "hint provides helper text to the Checkbox",
        },
      },
    },
    args: {
      hint: "Hint text",
    },
    play: checkTheBox(),
  }),
};

export const Uncontrolled: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "When `isChecked` is omitted the checkbox manages its own state via `isDefaultChecked`.",
      },
    },
  },
  args: {
    label: "Label",
    isDefaultChecked: true,
  },
  argTypes: {
    isDefaultChecked: { control: false },
    isChecked: { control: false },
  },
  render: (args) => <Checkbox {...args} />,
};
