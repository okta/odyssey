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
  TextField,
  TextFieldProps,
  textFieldTypeValues,
} from "@okta/odyssey-react-mui";

import { MuiThemeDecorator } from "../../../../.storybook/components";

const storybookMeta: Meta<TextFieldProps> = {
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
    endAdornment: {
      control: "text",
      description: "End `InputAdornment` for this component",
      table: {
        type: {
          summary: "string | ReactElement<typeof Icon>",
        },
      },
    },
    errorMessage: {
      control: "text",
      description:
        "If `error` is not undefined, the `input` will indicate an error",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    hasInitialFocus: {
      control: "boolean",
      description: "If `true`, the component will receive focus automatically",
      table: {
        type: {
          summary: "boolean",
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
    id: {
      control: "text",
      description: "The id of the `input` element",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    isDisabled: {
      control: "boolean",
      description: "If `true`, the component is disabled",
      table: {
        type: {
          summary: "boolean",
        },
        defaultValue: {
          summary: false,
        },
      },
    },
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
    isOptional: {
      control: "boolean",
      description: "If `true`, the `input` element is not required",
      table: {
        type: {
          summary: "boolean",
        },
        defaultValue: {
          summary: false,
        },
      },
    },
    isReadOnly: {
      control: "boolean",
      description: "It prevents the user from changing the value of the field",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
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
    name: {
      control: "text",
      description:
        "The name of the `input` element. Defaults to the `id` if not set.",
      table: {
        type: {
          summary: "string",
        },
      },
    },
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
  },
  decorators: [MuiThemeDecorator],
  tags: ["autodocs"],
};

export default storybookMeta;

// States

export const Default: StoryObj<TextFieldProps> = {
  args: {
    //
  },
};

export const Disabled: StoryObj<TextFieldProps> = {
  parameters: {
    docs: {
      description: {
        story: "The values of disabled inputs will not be submitted.",
      },
    },
  },
  args: {
    isDisabled: true,
    value: "Earth",
  },
};

export const Optional: StoryObj<TextFieldProps> = {
  args: {
    isOptional: true,
  },
};

export const ReadOnly: StoryObj<TextFieldProps> = {
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

export const Error: StoryObj<TextFieldProps> = {
  args: {
    errorMessage: "This field is required.",
  },
};

export const Hint: StoryObj<TextFieldProps> = {
  args: {
    hint: "Specify your destination within the Sol system.",
  },
};

export const Adornment: StoryObj<TextFieldProps> = {
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
  },
};

// Types
export const Email: StoryObj<TextFieldProps> = {
  args: {
    autoCompleteType: "work email",
    label: "Company email",
    type: "email",
  },
};

export const Multiline: StoryObj<TextFieldProps> = {
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
  },
};

export const Tel: StoryObj<TextFieldProps> = {
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
  },
};
