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
import {
  PasswordField,
  PasswordFieldProps,
  odysseyTranslate,
} from "@okta/odyssey-react-mui";
import { userEvent, waitFor } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { axeRun } from "../../../axe-util";

import { MuiThemeDecorator } from "../../../../.storybook/components";

const storybookMeta: Meta<PasswordFieldProps> = {
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
    errorMessage: {
      control: "text",
      description: "The error message for the password field component",
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
    hasShowPassword: {
      control: "boolean",
      description: "If `true`, the show/hide eye icon is not shown to the user",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    hint: {
      control: "text",
      description: "The hint text for the password field component",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    id: {
      control: "text",
      description:
        "An optional id for the HTML elemenet rendered by the component. It will also be the `name` prop by default",
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
      },
    },
    isOptional: {
      control: "boolean",
      description: "If `true`, the `input` element is not required",
      table: {
        type: {
          summary: "boolean",
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
      description: "The label text for the password field input",
      table: {
        type: {
          summary: "string",
        },
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
        defaultValue: "",
      },
    },
    onChange: {
      control: null,
      description: "Callback fired when the password value is changed.",
      table: {
        type: {
          summary: "func",
        },
        defaultValue: "",
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
        defaultValue: "",
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
        "The value of the `input` element, required for a controlled component",
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

export const Default: StoryObj<PasswordFieldProps> = {
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

export const NoShowPassword: StoryObj<PasswordFieldProps> = {
  args: {
    hasShowPassword: false,
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
