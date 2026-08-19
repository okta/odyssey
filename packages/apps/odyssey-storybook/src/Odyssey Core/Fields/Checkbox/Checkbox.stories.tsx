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
import { action } from "storybook/actions";

import {
  staticBoardParameters,
  StoryFieldCell,
  StoryGrid,
  StorySection,
} from "../../../tools/boardStoryHelpers.js";
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
    onBlur: action("onBlur"),
    onChange: action("onChange"),
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

export const Playground: Story = {
  ...deepmerge(CheckboxTemplate, {
    parameters: {
      docs: {
        description: {
          story:
            "When the component is controlled, the parent component is responsible for managing the state of `Checkbox`. `onChange` should be used to listen for component changes and to update the values in the `value` prop.",
        },
      },
    },
  }),
};

export const AllStates: Story = {
  parameters: staticBoardParameters,
  render: function C() {
    return (
      <StorySection title="Every checkbox state.">
        <StoryGrid columns={3}>
          <StoryFieldCell>
            <Checkbox label="Unchecked" />
          </StoryFieldCell>

          <StoryFieldCell>
            <Checkbox isDefaultChecked label="Checked" />
          </StoryFieldCell>

          <StoryFieldCell>
            <Checkbox isIndeterminate label="Indeterminate" />
          </StoryFieldCell>

          <StoryFieldCell>
            <Checkbox isDisabled label="Disabled" />
          </StoryFieldCell>

          <StoryFieldCell>
            <Checkbox isDefaultChecked isDisabled label="Disabled checked" />
          </StoryFieldCell>

          <StoryFieldCell>
            <Checkbox label="Invalid" validity="invalid" />
          </StoryFieldCell>

          <StoryFieldCell>
            <Checkbox isDefaultChecked isReadOnly label="Read-only" />
          </StoryFieldCell>

          <StoryFieldCell>
            <Checkbox isRequired label="Required" />
          </StoryFieldCell>

          <StoryFieldCell>
            <Checkbox hint="Hint text" label="With hint" />
          </StoryFieldCell>
        </StoryGrid>
      </StorySection>
    );
  },
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
