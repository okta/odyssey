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

import { Meta, StoryObj } from "@storybook/react";
import { within } from "@storybook/testing-library";
import { PasswordField, odysseyTranslate } from "@okta/odyssey-react-mui";
import { userEvent, waitFor } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

import { fieldComponentPropsMetaData } from "../../../fieldComponentPropsMetaData";
import { axeRun } from "../../../axe-util";

import { MuiThemeDecorator } from "../../../../.storybook/components";
import { useCallback, useState } from "react";

const storybookMeta: Meta<typeof PasswordField> = {
  title: "MUI Components/Forms/PasswordField",
  component: PasswordField,
  argTypes: {
    autoCompleteType: {
      control: "text",
      description:
        "This prop helps users to fill forms faster, especially on mobile devices. The name can be confusing, as it's more like an autofill. You can learn more about it [following the specification](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill)",
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
    errorMessage: fieldComponentPropsMetaData.errorMessage,
    hasInitialFocus: {
      control: "boolean",
      description: "If `true`, the component will receive focus automatically",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    hasShowPassword: {
      control: "boolean",
      description: "If `true`, the show/hide eye icon is not shown to the user",
      table: {
        type: {
          summary: "boolean",
        },
        defaultValue: {
          summary: true,
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
      description: "The label text for the password field input",
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
    onBlur: {
      control: null,
      description:
        "Callback fired when the autocomplete component loses focus.",
      table: {
        type: {
          summary: "func",
        },
      },
    },
    onChange: {
      control: null,
      description: "Callback fired when the password value is changed.",
      table: {
        type: {
          summary: "func",
        },
      },
    },
    onFocus: {
      control: null,
      description:
        "Callback fired when the autocomplete component gains focus.",
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
    value: {
      control: "text",
      description:
        "The value of the `input` element. Use when component is controlled",
      table: {
        type: {
          summary: "string",
        },
      },
    },
  },
  args: {
    autoCompleteType: "current-password",
    hasShowPassword: true,
    isOptional: false,
    id: "password-input",
    label: "Password",
  },
  decorators: [MuiThemeDecorator],
};

export default storybookMeta;

export const Default: StoryObj<typeof PasswordField> = {
  play: async ({ canvasElement, step }) => {
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
        userEvent.type(fieldElement, "qwerty");
        userEvent.click(buttonElement);
        userEvent.tab();
        await waitFor(() => {
          expect(fieldElement).toHaveAttribute("type", "text");
          expect(buttonElement.ariaLabel).toBe(
            odysseyTranslate("passwordfield.icon.label.hide")
          );
        });
        userEvent.click(buttonElement);
        await waitFor(() => {
          expect(fieldElement).toHaveAttribute("type", "password");
          expect(buttonElement.ariaLabel).toBe(
            odysseyTranslate("passwordfield.icon.label.show")
          );
        });
      }
      await waitFor(() => {
        axeRun("Password Field Default");
      });
    });
  },
};

export const Disabled: StoryObj<typeof PasswordField> = {
  parameters: {
    docs: {
      description: {
        story: "The values of disabled inputs will not be submitted.",
      },
    },
  },
  args: {
    isDisabled: true,
    defaultValue: "PasswordValue",
  },
};

export const Error: StoryObj<typeof PasswordField> = {
  args: {
    errorMessage: "This password is incorrect",
    defaultValue: "",
  },
};

export const Errors: StoryObj<typeof PasswordField> = {
  args: {
    errorMessage: "Password requires: ",
    errorMessageList: [
      "At least 8 chars",
      "An uppercase letter",
      "A number",
      "A symbol",
    ],
  },
};

export const Hint: StoryObj<typeof PasswordField> = {
  args: {
    hint: "Your first pet's name",
    defaultValue: "",
  },
};

export const NoShowPassword: StoryObj<typeof PasswordField> = {
  args: {
    hasShowPassword: false,
    defaultValue: "",
  },
  play: async ({ canvasElement, step }) => {
    await step("toggle password", async () => {
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
  },
};

export const Optional: StoryObj<typeof PasswordField> = {
  args: {
    isOptional: true,
    defaultValue: "",
  },
};

export const ReadOnly: StoryObj<typeof PasswordField> = {
  parameters: {
    docs: {
      description: {
        story: "The values of readonly inputs will be submitted.",
      },
    },
  },
  args: {
    isReadOnly: true,
    defaultValue: "PasswordValue",
  },
};

export const Controlled: StoryObj<typeof PasswordField> = {
  parameters: {
    docs: {
      description: {
        story:
          "Provide `value` when component is to be controlled by parent. Update `value` based on updates from `onChange` event.",
      },
    },
  },
  args: {
    value: "",
  },
  render: function C(props) {
    const [localValue, setLocalValue] = useState("");
    const onChange = useCallback(
      (event) => setLocalValue(event?.target.value),
      []
    );
    return (
      <PasswordField
        {...props}
        defaultValue={undefined}
        value={localValue}
        onChange={onChange}
      />
    );
  },
};

export const ControlledDefaultInput: StoryObj<typeof PasswordField> = {
  parameters: {
    docs: {
      description: {
        story:
          "Provide `value` when component is to be controlled by parent. Update `value` based on updates from `onChange` event.",
      },
    },
  },
  args: {
    value: "PasswordValue",
  },
  render: function C(props) {
    const [localValue, setLocalValue] = useState("PasswordValue");
    const onChange = useCallback(
      (event) => setLocalValue(event?.target.value),
      []
    );
    return (
      <PasswordField
        {...props}
        defaultValue={undefined}
        value={localValue}
        onChange={onChange}
      />
    );
  },
};
