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
  CheckboxGroup,
  CheckboxGroupProps,
  Link,
} from "@okta/odyssey-react-mui";
import { Meta, StoryObj } from "@storybook/react-vite";

import { OdysseyStorybookThemeDecorator } from "../../../tools/OdysseyStorybookThemeDecorator.js";
import { fieldComponentPropsMetaData } from "../fieldComponentPropsMetaData.js";

const meta = {
  component: CheckboxGroup,
  decorators: [OdysseyStorybookThemeDecorator],
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: false,
      description: "A single Checkbox element or an array of Checkbox elements",
      table: {
        category: "Functional",
        type: {
          summary:
            "ReactElement<typeof Checkbox> | Array<ReactElement<typeof Checkbox>>",
        },
      },
      type: {
        required: true,
        name: "other",
        value:
          "ReactElement<typeof Checkbox> | Array<ReactElement<typeof Checkbox>>",
      },
    },
    errorMessage: fieldComponentPropsMetaData.errorMessage,
    errorMessageList: fieldComponentPropsMetaData.errorMessageList,
    hint: fieldComponentPropsMetaData.hint,
    HintLinkComponent: fieldComponentPropsMetaData.HintLinkComponent,
    isDisabled: fieldComponentPropsMetaData.isDisabled,
    isReadOnly: {
      control: "boolean",
      description: "If `true`, the checkbox group is read-only",
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
      description: "If `true`, the checkbox group is required",
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
    label: {
      control: "text",
      description: "The label text for the checkbox group",
      table: {
        category: "Visual",
        type: {
          summary: "string",
        },
      },
      type: {
        required: true,
        name: "string",
      },
    },
    ariaDescribedBy: {
      control: "text",
      description: "The ID of the element that describes the checkbox group",
      table: {
        category: "Functional",
        type: {
          summary: "string",
        },
      },
      type: {
        name: "string",
      },
    },
    testId: {
      control: "text",
      description: "The data-testid attribute for the checkbox group",
      table: {
        category: "Functional",
        type: {
          summary: "string",
        },
      },
      type: {
        name: "string",
      },
    },
    translate: {
      control: "radio",
      options: ["yes", "no", undefined],
      description:
        "Indicates whether the element's content should be translated",
      table: {
        category: "Functional",
        type: {
          summary: "yes | no",
        },
      },
      type: {
        name: "string",
      },
    },
  },
  args: {
    label: "Label",
    isDisabled: false,
    isReadOnly: false,
    isRequired: false,
  },
} satisfies Meta<typeof CheckboxGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

const GroupTemplate: Story = {
  args: {} as CheckboxGroupProps, // This is a hack,
  render: (args) => (
    <CheckboxGroup
      ariaDescribedBy={args.ariaDescribedBy}
      errorMessage={args.errorMessage}
      errorMessageList={args.errorMessageList}
      hint={args.hint}
      HintLinkComponent={args.HintLinkComponent}
      isDisabled={args.isDisabled}
      isReadOnly={args.isReadOnly}
      isRequired={args.isRequired}
      label={args.label}
      testId={args.testId}
      translate={args.translate}
    >
      <Checkbox label="Item label 1" name="item-1" value="item-1" />
      <Checkbox label="Item label 2" name="item-2" value="item-2" />
      <Checkbox label="Item label 3" name="item-3" value="item-3" />
    </CheckboxGroup>
  ),
  parameters: {
    controls: {
      exclude: ["isDefaultChecked", "isIndeterminate"],
    },
  },
};

export const Default: Story = {
  ...GroupTemplate,
};

export const Disabled: Story = {
  ...GroupTemplate,
  parameters: {
    controls: {
      exclude: ["isDefaultChecked", "isIndeterminate"],
    },
  },
  args: {
    isDisabled: true,
  } as CheckboxGroupProps, // This is a hack
};

export const ReadOnly: Story = {
  ...GroupTemplate,
  parameters: {
    controls: {
      exclude: ["isDefaultChecked", "isIndeterminate"],
    },
  },
  args: {
    isReadOnly: true,
  } as CheckboxGroupProps, // This is a hack
};

export const Error: Story = {
  ...GroupTemplate,
  parameters: {
    controls: {
      exclude: ["isDefaultChecked", "isIndeterminate"],
    },
    docs: {
      description: {
        story:
          "Unlike Radio Buttons, Checkboxes validate individually, not as a group. Validity must be set individually on each checkbox using the `isInvalid` prop, even if the group has an `errorMessage` set.",
      },
    },
  },
  args: {
    errorMessage: "Error Message",
  } as CheckboxGroupProps, // This is a hack
};

export const ErrorsList: Story = {
  ...GroupTemplate,
  args: {
    isRequired: true,
    errorMessage: "Error Message",
    errorMessageList: ["Error A"],
  } as CheckboxGroupProps, // This is a hack
};

export const ErrorWithIndividualHint: Story = {
  ...GroupTemplate,
  render: function C(props) {
    return (
      <CheckboxGroup {...props}>
        <Checkbox
          hint="Hint text 1"
          label="Item label 1"
          name="item-1"
          value="item-1"
        />
        <Checkbox
          hint="Hint text 2"
          label="Item label 2"
          name="item-2"
          value="item-2"
        />
        <Checkbox
          hint="Hint text 3"
          label="Item label 3"
          name="item-3"
          value="item-3"
        />
      </CheckboxGroup>
    );
  },
};

export const Hint: Story = {
  ...GroupTemplate,
  args: {
    hint: "Hint text",
  } as CheckboxGroupProps, // This is a hack
};

export const HintLink: Story = {
  ...GroupTemplate,
  args: {
    hint: "Hint text",
    HintLinkComponent: <Link href="#link">Link</Link>,
  } as CheckboxGroupProps, // This is a hack
};

export const Required: Story = {
  ...GroupTemplate,
  args: {
    isRequired: true,
  } as CheckboxGroupProps, // This is a hack
};

export const MixedError: Story = {
  render: (args) => (
    <CheckboxGroup
      errorMessage={args.errorMessage}
      hint={args.hint}
      isDisabled={args.isDisabled}
      isRequired={args.isRequired}
      label="Label"
    >
      <Checkbox
        isDefaultChecked={true}
        label="Item label 1"
        name="item-1"
        value="item-1"
      />
      <Checkbox
        label="Item label 2"
        name="item-2"
        validity="valid"
        value="item-2"
      />
      <Checkbox
        isDefaultChecked={true}
        label="Item Label 3"
        name="item-3"
        value="item-3"
      />
    </CheckboxGroup>
  ),
  parameters: {
    controls: {
      exclude: ["isDefaultChecked", "isIndeterminate"],
    },
    docs: {
      description: {
        story:
          "Individual checkboxes can take a different validity than the whole group; if a group is invalid, individual checkboxes can be marked valid, and vice versa. This is particularly useful in cases where the state of particular checkboxes affect the validity of the entire group.",
      },
    },
  },
  args: {
    errorMessage: "Error Message",
  } as CheckboxGroupProps, // This is a hack
};
