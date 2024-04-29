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
import {
  InputAdornment,
  Link,
  TextField,
  textFieldTypeValues,
} from "@okta/odyssey-react-mui";

import { userEvent, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { fieldComponentPropsMetaData } from "../../../fieldComponentPropsMetaData";
import { MuiThemeDecorator } from "../../../../.storybook/components";
import { ChangeEvent, useCallback, useState } from "react";

const storybookMeta: Meta<typeof TextField> = {
  title: "MUI Components/Forms/TextField",
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
    hasVisibleLabel: fieldComponentPropsMetaData.hasVisibleLabel,
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
          summary: false,
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
      control: null,
      description: "Callback fired when the `input` element loses focus",
      table: {
        type: {
          summary: "func",
        },
      },
    },
    onChange: {
      control: null,
      description: "Callback fired when the value is changed",
      table: {
        type: {
          summary: "func",
        },
      },
    },
    onFocus: {
      control: null,
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
    label: "Destination",
    defaultValue: undefined,
  },
  decorators: [MuiThemeDecorator],
  tags: ["autodocs"],
};

export default storybookMeta;

// States

export const Default: StoryObj<typeof TextField> = {
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

export const Disabled: StoryObj<typeof TextField> = {
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

export const Optional: StoryObj<typeof TextField> = {
  args: {
    isOptional: true,
    defaultValue: "",
  },
};

export const ReadOnly: StoryObj<typeof TextField> = {
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

export const Error: StoryObj<typeof TextField> = {
  args: {
    errorMessage: "This field is required.",
    defaultValue: "",
  },
};

export const ErrorsList: StoryObj<typeof TextField> = {
  args: {
    errorMessage: "This field is required:",
    errorMessageList: ["At least 2 chars", "No more than 20 chars"],
    defaultValue: "",
  },
};

export const FullWidth: StoryObj<typeof TextField> = {
  args: {
    isFullWidth: true,
  },
};

export const Hint: StoryObj<typeof TextField> = {
  args: {
    hint: "Specify your destination within the Sol system.",
    defaultValue: "",
  },
};

export const HintLink: StoryObj<typeof TextField> = {
  args: {
    hint: "Specify your destination within the Sol system. Learn more ",
    HintLinkComponent: <Link href="/learn-more">about the Sol system</Link>,
    defaultValue: "",
  },
};

export const Adornment: StoryObj<typeof TextField> = {
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
export const Email: StoryObj<typeof TextField> = {
  args: {
    autoCompleteType: "work email",
    label: "Company email",
    type: "email",
    defaultValue: "",
  },
};

export const Multiline: StoryObj<typeof TextField> = {
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
  storyName: "Multiline (Textarea)",
};

export const Placeholder: StoryObj<typeof TextField> = {
  args: {
    placeholder: "Destination within the Sol system",
  },
};

export const NoVisibleLabel: StoryObj<typeof TextField> = {
  parameters: {
    docs: {
      description: {
        story:
          "TextFields with `hasVisibleLabel` set to false will not render a visible label. Although, the `label` prop is still required for accessibility purposes",
      },
    },
  },
  args: {
    hasVisibleLabel: false,
  },
};

export const Tel: StoryObj<typeof TextField> = {
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

export const ControlledTextField: StoryObj<typeof TextField> = {
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
    return <TextField {...props} value={localValue} onChange={onChange} />;
  },
};
