/*!
 * Copyright (c) 2023-present, Okta, Inc. and/or its affiliates. All rights reserved.
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
  odysseyTranslate,
  PasswordField,
  PasswordFieldProps,
  Stack,
} from "@okta/odyssey-react-mui";
import { useCallback } from "@storybook/preview-api";
import { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within } from "@storybook/test";
import { ChangeEvent } from "react";

import { axeRun } from "../../../axeRun.js";
import { OdysseyStorybookThemeDecorator } from "../../../tools/OdysseyStorybookThemeDecorator.js";
import { useStoryArgOrLocalState } from "../../../tools/useStoryArgOrLocalState.js";
import { fieldComponentPropsMetaData } from "../fieldComponentPropsMetaData.js";

const meta = {
  component: PasswordField,
  decorators: [OdysseyStorybookThemeDecorator],
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
    hasShowPassword: {
      control: "boolean",
      description: "If `true`, the show/hide eye icon is not shown to the user",
      table: {
        category: "Visual",
        type: {
          summary: "boolean",
        },
        defaultValue: {
          summary: "true",
        },
      },
    },
    hint: fieldComponentPropsMetaData.hint,
    id: fieldComponentPropsMetaData.id,
    isDisabled: fieldComponentPropsMetaData.isDisabled,
    isFullWidth: fieldComponentPropsMetaData.isFullWidth,
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
    autoCompleteType: "current-password",
    hasShowPassword: true,
    id: "password-input",
    isOptional: false,
    label: "Password",
    onBlur: fn(),
    onChange: fn(),
    onFocus: fn(),
    value: "",
  },
} satisfies Meta<typeof PasswordField>;

export default meta;

type Story = StoryObj<typeof meta>;

const PasswordFieldTemplate: Story = {
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
      PasswordFieldProps,
      "value"
    >({
      args,
      argKey: "value",
      context,
      defaultValue: args.value ?? "",
    });

    const handleChange = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
      },
      [setValue],
    );

    return <PasswordField {...props} onChange={handleChange} value={value} />;
  },
};

const passwordFieldPlay: NonNullable<Story["play"]> = async ({
  canvasElement,
  step,
}) => {
  await step("toggle password", async () => {
    const canvas = within(canvasElement);
    const fieldElement = canvas.getByRole("textbox", {
      name: "Password",
    });
    expect(fieldElement).toHaveAttribute("type", "password");

    const buttonElement = canvas.getByRole("button", {
      name: odysseyTranslate("passwordfield.icon.label.show"),
    });
    if (buttonElement) {
      await userEvent.type(fieldElement, "password", { delay: 50 });
      await userEvent.click(buttonElement);
      await userEvent.tab();

      expect(fieldElement).toHaveAttribute("type", "text");
      expect(buttonElement.ariaLabel).toBe(
        odysseyTranslate("passwordfield.icon.label.show"),
      );
      expect(buttonElement.ariaPressed).toBe("true");

      await userEvent.click(buttonElement);

      expect(fieldElement).toHaveAttribute("type", "password");
      expect(buttonElement.ariaLabel).toBe(
        odysseyTranslate("passwordfield.icon.label.show"),
      );
      expect(buttonElement.ariaPressed).toBe("false");
    }
    await axeRun("Password Field Default");
  });
};

const noShowPasswordPlay: NonNullable<Story["play"]> = async ({
  canvasElement,
  step,
}) => {
  await step("toggle password", () => {
    const canvas = within(canvasElement);
    const fieldElement = canvas.getByRole("textbox", {
      name: "Password",
    });
    expect(fieldElement).toHaveAttribute("type", "password");

    const buttonElement = canvas.queryByRole("button", {
      name: odysseyTranslate("passwordfield.icon.label.show"),
    });
    expect(buttonElement).toBe(null);
  });
};

export const Default: Story = {
  ...deepmerge(PasswordFieldTemplate, {
    play: passwordFieldPlay,
  }),
};

export const Disabled: Story = {
  ...deepmerge(PasswordFieldTemplate, {
    parameters: {
      docs: {
        description: {
          story: "The values of disabled inputs will not be submitted.",
        },
      },
    },
    args: {
      isDisabled: true,
      value: "password",
    },
  }),
};

export const Error: Story = {
  ...deepmerge(PasswordFieldTemplate, {
    args: {
      errorMessage: "Error Message",
    },
  }),
};

export const ErrorsList: Story = {
  ...deepmerge(PasswordFieldTemplate, {
    args: {
      errorMessage: "Error Message",
      errorMessageList: ["Error A"],
    },
  }),
};

export const Hint: Story = {
  ...deepmerge(PasswordFieldTemplate, {
    args: {
      hint: "Hint text",
    },
  }),
};

export const NoShowPassword: Story = {
  ...deepmerge(PasswordFieldTemplate, {
    args: {
      hasShowPassword: false,
    },
    play: noShowPasswordPlay,
  }),
};

export const Optional: Story = {
  ...deepmerge(PasswordFieldTemplate, {
    args: {
      isOptional: true,
    },
  }),
};

export const ReadOnly: Story = {
  ...deepmerge(PasswordFieldTemplate, {
    parameters: {
      docs: {
        description: {
          story: "The values of readonly inputs will be submitted.",
        },
      },
    },
    args: {
      isReadOnly: true,
      value: "password",
    },
  }),
};

export const Focused: Story = {
  parameters: {
    docs: {
      description: {
        story: "This `PasswordField` will receive focus when the page loads",
      },
    },
  },
  args: {
    hasInitialFocus: true,
    label: "Label",
    value: "",
  },
  render: function Render(args, context) {
    const { value, setValue } = useStoryArgOrLocalState<
      PasswordFieldProps,
      "value"
    >({
      args,
      argKey: "value",
      context,
      defaultValue: args.value ?? "",
    });

    const handleChange = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
      },
      [setValue],
    );

    return (
      <Stack spacing={2}>
        <PasswordField label="Not Focused" />
        <PasswordField {...args} onChange={handleChange} value={value} />
      </Stack>
    );
  },
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
    defaultValue: "Initial password",
    value: undefined,
  },
  argTypes: {
    value: { control: false },
  },
  render: (props) => {
    const { value, ...rest } = props;
    void value;
    return <PasswordField {...rest} />;
  },
};
