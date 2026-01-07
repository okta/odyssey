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
  deepmerge,
  InputAdornment,
  Link,
  Stack,
  TextField,
  TextFieldProps,
  textFieldTypeValues,
} from "@okta/odyssey-react-mui";
import { AddCircleIcon, CallIcon } from "@okta/odyssey-react-mui/icons";
import { useCallback } from "@storybook/preview-api";
import { Meta, StoryObj } from "@storybook/react";
import { fn, userEvent, within } from "@storybook/test";
import { ChangeEvent } from "react";

import { OdysseyStorybookThemeDecorator } from "../../../tools/OdysseyStorybookThemeDecorator.js";
import { useStoryArgOrLocalState } from "../../../tools/useStoryArgOrLocalState.js";
import { fieldComponentPropsMetaData } from "../fieldComponentPropsMetaData.js";

const meta = {
  component: TextField,
  decorators: [OdysseyStorybookThemeDecorator],
  tags: ["autodocs"],
  argTypes: {
    autoCompleteType: {
      control: "text",
      description:
        "The native HTML [autocomplete](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) attribute for enabling browser autofill (e.g., `email`, `username`, `current-password`)",
      table: {
        category: "Functional",
        type: {
          summary: "string",
        },
      },
    },
    defaultValue: {
      control: "text",
      description:
        "If `value` is undefined, the field is uncontrolled and `defaultValue` provides its initial text",
      table: {
        category: "Functional",
        type: {
          summary: "string",
        },
        defaultValue: {
          summary: undefined,
        },
      },
    },
    endAdornment: {
      control: { type: "select" },
      options: ["None", "String", "Icon"],
      mapping: {
        None: undefined,
        String: "%",
        Icon: <CallIcon />,
      },
      description:
        "Content displayed at the end of the input. Use string for units and symbols, or an Odyssey icon for actions",
      table: {
        category: "Visual",
        type: {
          summary: "string | ReactElement<typeof Icon>",
        },
      },
    },
    errorMessage: fieldComponentPropsMetaData.errorMessage,
    errorMessageList: fieldComponentPropsMetaData.errorMessageList,
    hasInitialFocus: {
      control: false,
      description: "If `true`, the component will receive focus automatically",
      table: {
        category: "Functional",
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
      description: "If `true`, a `textarea` element is rendered",
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
    isOptional: fieldComponentPropsMetaData.isOptional,
    isReadOnly: fieldComponentPropsMetaData.isReadOnly,
    label: {
      control: "text",
      description: "The label for the `input` element",
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
    name: fieldComponentPropsMetaData.name,
    onBlur: {
      description:
        "Callback fired after the input loses focus; useful for validation or analytics hooks",
      table: {
        category: "Functional",
        type: {
          summary: "func",
        },
      },
    },
    onChange: {
      description:
        "Callback fired whenever the value changes; required when controlling the component via `value`",
      table: {
        category: "Functional",
        type: {
          summary: "func",
        },
      },
    },
    onFocus: {
      description:
        "Callback fired when the input gains focus; helpful for analytics or guided workflows",
      table: {
        category: "Functional",
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
        category: "Visual",
        type: {
          summary: "string",
        },
      },
    },
    startAdornment: {
      control: { type: "select" },
      options: ["None", "String", "Icon"],
      mapping: {
        None: undefined,
        String: "$",
        Icon: <AddCircleIcon />,
      },
      description:
        "Content displayed at the start of the input. Use string for units or symbols, or an Odyssey icon for actions",
      table: {
        category: "Visual",
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
        category: "Functional",
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
        "If `value` is provided, you control the input externally and must handle updates with `onChange`",
      table: {
        category: "Functional",
        type: {
          summary: "string",
        },
      },
    },
  },
  args: {
    endAdornment: "None",
    label: "Label",
    onBlur: fn(),
    onChange: fn(),
    onFocus: fn(),
    startAdornment: "None",
    value: "",
  },
} satisfies Meta<typeof TextField>;

export default meta;

type Story = StoryObj<typeof meta>;

const TextFieldTemplate: Story = {
  args: {
    value: "",
  },
  argTypes: {
    defaultValue: { control: false },
  },
  render: function Render(args, context) {
    const { defaultValue, ...props } = args;
    void defaultValue;

    const { value, setValue } = useStoryArgOrLocalState<
      TextFieldProps,
      "value"
    >({
      args,
      context,
      argKey: "value",
      defaultValue: args.value ?? "",
    });

    const handleChange = useCallback(
      (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValue(event.target.value);
      },
      [setValue],
    );
    return <TextField {...props} onChange={handleChange} value={value} />;
  },
};

const textFieldPlay: NonNullable<Story["play"]> = async ({
  canvasElement,
  step,
}) => {
  await step("Textfield callback", async () => {
    const canvas = within(canvasElement);
    const textbox = await canvas.findByRole("textbox");
    await userEvent.click(textbox);
    await userEvent.type(textbox, "v");
    await userEvent.clear(textbox);
    await userEvent.tab();
  });
};

export const Default: Story = {
  ...deepmerge(TextFieldTemplate, {
    play: textFieldPlay,
    tags: ["!autodocs"],
  }),
};

export const Disabled: Story = {
  ...deepmerge(TextFieldTemplate, {
    parameters: {
      docs: {
        description: {
          story: "The values of disabled inputs will not be submitted.",
        },
      },
    },
    args: {
      isDisabled: true,
      value: "Value",
    },
  }),
};

export const Optional: Story = {
  ...deepmerge(TextFieldTemplate, {
    args: {
      isOptional: true,
      value: "",
    },
  }),
};

export const ReadOnly: Story = {
  ...deepmerge(TextFieldTemplate, {
    parameters: {
      docs: {
        description: {
          story: "The values of readonly inputs will be submitted.",
        },
      },
    },
    args: {
      isReadOnly: true,
      value: "Value",
    },
  }),
};

export const Error: Story = {
  ...deepmerge(TextFieldTemplate, {
    args: {
      errorMessage: "Error Message",
      value: "",
    },
  }),
};

export const ErrorsList: Story = {
  ...deepmerge(TextFieldTemplate, {
    args: {
      errorMessage: "Error Message",
      errorMessageList: ["Error A"],
      value: "",
    },
  }),
};

export const FullWidth: Story = {
  ...deepmerge(TextFieldTemplate, {
    args: {
      isFullWidth: true,
    },
  }),
};

export const Hint: Story = {
  ...deepmerge(TextFieldTemplate, {
    args: {
      hint: "Hint text",
      value: "",
    },
  }),
};

export const HintLink: Story = {
  ...deepmerge(TextFieldTemplate, {
    args: {
      hint: "Hint text",
      HintLinkComponent: <Link href="#link">Link</Link>,
      value: "",
    },
  }),
};

export const Adornments: Story = {
  ...deepmerge(TextFieldTemplate, {
    parameters: {
      docs: {
        description: {
          story: "TextField supports both `string` and `<Icon />` adornments.",
        },
      },
    },
    args: {
      label: "Label",
      endAdornment: "String",
      startAdornment: "Icon",
      value: "",
    },
  }),
};

export const Multiline: Story = {
  ...deepmerge(TextFieldTemplate, {
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
      label: "Label",
      isMultiline: true,
      value: "",
    },
  }),
  name: "Multiline (Textarea)",
};

export const Focused: Story = {
  parameters: {
    docs: {
      description: {
        story: "This `TextField` will receive focus when the page loads",
      },
    },
  },
  args: {
    hasInitialFocus: true,
    label: "Label",
    value: "",
  },
  render: (args) => {
    return (
      <Stack spacing={2}>
        <TextField label="Not Focused" />
        <TextField {...args} />
      </Stack>
    );
  },
};

export const Placeholder: Story = {
  ...deepmerge(TextFieldTemplate, {
    args: {
      placeholder: "Placeholder text",
    },
  }),
};

export const Tel: Story = {
  ...deepmerge(TextFieldTemplate, {
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
      value: "",
    },
  }),
};
export const Uncontrolled: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "When `value` is omitted the field manages its own state via `defaultValue`.",
      },
    },
  },
  args: {
    defaultValue: "Initial state",
    value: undefined,
  },
  argTypes: {
    value: { control: false },
  },
  render: (props) => {
    const { value, ...rest } = props;
    void value;
    return <TextField {...rest} />;
  },
};
