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
  InputAdornment,
  Link,
  TextField,
  textFieldTypeValues,
} from "@okta/odyssey-react-mui";
import { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within } from "@storybook/test";
import { ChangeEvent, useCallback, useState } from "react";

import { fieldComponentPropsMetaData } from "../fieldComponentPropsMetaData.js";

const meta = {
  component: TextField,
  argTypes: {
    autoCompleteType: {
      control: "text",
      description:
        "This prop helps users to fill forms faster, especially on mobile devices. You can learn more about it [following the specification](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill)",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    defaultValue: {
      control: "text",
      description:
        "The value of the `input` element. Use when the component is not controlled",
      table: {
        type: {
          summary: "string",
        },
        defaultValue: {
          summary: undefined,
        },
      },
    },
    endAdornment: {
      control: "text",
      description: "End `InputAdornment` for this component",
      table: {
        type: {
          summary: "string | ReactElement<typeof Icon>",
        },
      },
    },
    errorMessage: fieldComponentPropsMetaData.errorMessage,
    errorMessageList: fieldComponentPropsMetaData.errorMessageList,
    hasInitialFocus: {
      control: "boolean",
      description: "If `true`, the component will receive focus automatically",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    hint: fieldComponentPropsMetaData.hint,
    HintLinkComponent: fieldComponentPropsMetaData.HintLinkComponent,
    id: fieldComponentPropsMetaData.id,
    isDisabled: fieldComponentPropsMetaData.isDisabled,
    isFullWidth: fieldComponentPropsMetaData.isFullWidth,
    isMultiline: {
      control: "boolean",
      description: "If `true`, a TextareaAutosize element is rendered",
      table: {
        type: {
          summary: "boolean",
        },
        defaultValue: {
          summary: "false",
        },
      },
    },
    isOptional: fieldComponentPropsMetaData.isOptional,
    isReadOnly: fieldComponentPropsMetaData.isReadOnly,
    label: {
      control: "text",
      description: "The label for the `input` element",
      table: {
        type: {
          summary: "string",
        },
      },
      type: {
        required: true,
        name: "string",
      },
    },
    name: fieldComponentPropsMetaData.name,
    onBlur: {
      description: "Callback fired when the `input` element loses focus",
      table: {
        type: {
          summary: "func",
        },
      },
    },
    onChange: {
      description: "Callback fired when the value is changed",
      table: {
        type: {
          summary: "func",
        },
      },
    },
    onFocus: {
      description: "Callback fired when the `input` element gets focus",
      table: {
        type: {
          summary: "func",
        },
      },
    },
    placeholder: {
      control: "text",
      description:
        "The short hint displayed in the `input` before the user enters a value",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    startAdornment: {
      control: "text",
      description: "Start `InputAdornment` for this component",
      table: {
        type: {
          summary: "string | ReactElement<typeof Icon>",
        },
      },
    },
    type: {
      options: textFieldTypeValues,
      control: { type: "radio" },
      description:
        "Type of the `input` element. It should be [a valid HTML5 input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types)",
      table: {
        type: {
          summary: textFieldTypeValues.join(" | "),
        },
        defaultValue: {
          summary: "text",
        },
      },
    },
    value: {
      control: "text",
      description:
        "The value of the `input` element, required for a controlled component",
      table: {
        type: {
          summary: "string",
        },
      },
    },
  },
  args: {
    defaultValue: undefined,
    label: "Destination",
    onBlur: fn(),
    onChange: fn(),
    onFocus: fn(),
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TextField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultValue: "",
  },
  play: async ({ args, canvasElement, step }) => {
    await step("Textfield callback", async () => {
      const canvas = within(canvasElement);
      const textbox = canvas.getByRole("textbox");
      await userEvent.click(textbox);
      await expect(args.onFocus).toHaveBeenCalledTimes(1);
      await userEvent.type(textbox, "Earth");
      await expect(args.onChange).toHaveBeenCalledTimes(5);
      await userEvent.clear(textbox);
      await userEvent.tab();
      await expect(args.onBlur).toHaveBeenCalledTimes(1);
    });
  },
};

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story: "The values of disabled inputs will not be submitted.",
      },
    },
  },
  args: {
    isDisabled: true,
    defaultValue: "Earth",
  },
};

export const Optional: Story = {
  args: {
    isOptional: true,
    defaultValue: "",
  },
};

export const ReadOnly: Story = {
  parameters: {
    docs: {
      description: {
        story: "The values of readonly inputs will be submitted.",
      },
    },
  },
  args: {
    isReadOnly: true,
    value: "Earth",
  },
};

export const Error: Story = {
  args: {
    errorMessage: "This field is required.",
    defaultValue: "",
  },
};

export const ErrorsList: Story = {
  args: {
    errorMessage: "This field is required:",
    errorMessageList: ["At least 2 chars", "No more than 20 chars"],
    defaultValue: "",
  },
};

export const FullWidth: Story = {
  args: {
    isFullWidth: true,
  },
};

export const Hint: Story = {
  args: {
    hint: "Specify your destination within the Sol system.",
    defaultValue: "",
  },
};

export const HintLink: Story = {
  args: {
    hint: "Specify your destination within the Sol system. Learn more",
    HintLinkComponent: <Link href="/learn-more">about the Sol system</Link>,
    defaultValue: "",
  },
};

export const Adornment: Story = {
  parameters: {
    docs: {
      description: {
        story: "TextField supports both `string` and `<Icon />` adornments.",
      },
    },
  },
  args: {
    label: "Cargo weight",
    endAdornment: <InputAdornment position="end">kg</InputAdornment>,
    defaultValue: "",
  },
};

// Types
export const Email: Story = {
  args: {
    autoCompleteType: "work email",
    label: "Company email",
    type: "email",
    defaultValue: "",
  },
};

export const Multiline: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "As the user types, the field will grow vertically to accommodate the new lines.",
      },
    },
  },
  args: {
    autoCompleteType: "shipping street-address",
    label: "Permanent residence",
    isMultiline: true,
    defaultValue: "",
  },
  name: "Multiline (Textarea)",
};

export const Placeholder: Story = {
  args: {
    placeholder: "Destination within the Sol system",
  },
};

export const Tel: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "TextFields of type `tel` are not automatically validated because global formats are so varied.",
      },
    },
  },
  args: {
    autoCompleteType: "mobile tel",
    label: "Phone number",
    startAdornment: <InputAdornment position="start">+1</InputAdornment>,
    type: "tel",
    defaultValue: "",
  },
};

export const ControlledTextField: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "When the component is controlled, the parent component is responsible for passing `value` to the component and listening for changes with `onChange`",
      },
    },
  },
  args: {
    value: "Initial state",
  },
  render: function C({ ...props }) {
    const [localValue, setLocalValue] = useState("Initial state");
    const onChange = useCallback(
      (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setLocalValue(event.target.value),
      [],
    );
    return <TextField {...props} onChange={onChange} value={localValue} />;
  },
};
