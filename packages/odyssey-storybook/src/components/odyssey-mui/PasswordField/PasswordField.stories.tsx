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
    },
    hasInitialFocus: {
      control: "boolean",
    },
    isDisabled: {
      control: "boolean",
    },
    errorMessage: {
      control: "text",
    },
    hint: {
      control: "text",
    },
    id: {
      control: "text",
    },
    label: {
      control: "text",
    },
    onBlur: {
      control: "function",
    },
    onChange: {
      control: "function",
    },
    onFocus: {
      control: "function",
    },
    placeholder: {
      control: "text",
    },
    isReadOnly: {
      control: "boolean",
    },
    isOptional: {
      control: "boolean",
    },
    hasShowPassword: {
      control: "boolean",
    },
    value: {
      control: "text",
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
