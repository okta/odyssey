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
import { Select, SelectProps } from "@okta/odyssey-react-mui";
import { MuiThemeDecorator } from "../../../../.storybook/components";
import { userEvent, waitFor, screen } from "@storybook/testing-library";
import { axeRun } from "../../../axe-util";
import { expect } from "@storybook/jest";

const optionsArray: SelectProps<string | string[], boolean>["options"] = [
  "Earth",
  "Mars",
  "Ceres",
  "Eros",
  "Tycho Station",
  "Phoebe",
  "Ganymede",
];

const optionsObject: SelectProps<string | string[], boolean>["options"] = [
  {
    text: "Earth",
    value: "earth",
  },
  {
    text: "Mars",
    value: "mars",
  },
  {
    text: "Ceres",
    value: "ceres",
  },
  {
    text: "Eros",
    value: "eros",
  },
  {
    text: "Tycho Station",
    value: "tycho-station",
  },
  {
    text: "Phoebe",
    value: "phoebe",
  },
  {
    text: "Ganymede",
    value: "ganymede",
  },
];

const optionsGrouped: SelectProps<string | string[], boolean>["options"] = [
  {
    text: "Sol System",
    type: "heading",
  },
  {
    text: "Earth",
    value: "earth",
  },
  {
    text: "Mars",
    value: "mars",
  },
  {
    text: "Ceres",
    value: "ceres",
  },
  {
    text: "Eros",
    value: "eros",
  },
  {
    text: "Tycho Station",
    value: "tycho-station",
  },
  {
    text: "Phoebe",
    value: "phoebe",
  },
  {
    text: "Ganymede",
    value: "ganymede",
  },
  {
    text: "Extrasolar",
    type: "heading",
  },
  "Auberon",
  "Al-Halub",
  "Freehold",
  "Laconia",
  "New Terra",
];

const storybookMeta: Meta<SelectProps<string | string[], boolean>> = {
  title: "MUI Components/Forms/Select",
  component: Select,
  argTypes: {
    errorMessage: {
      control: "text",
      description: "The error message for the select component",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    hasMultipleChoices: {
      control: "boolean",
      description: "If `true`, the select component allows multiple selections",
      table: {
        type: {
          summary: "boolean",
        },
        defaultValue: {
          summary: false,
        },
      },
    },
    hint: {
      control: "text",
      description: "The hint text for the select component",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    id: {
      control: "text",
      description: "The id attribute of the select component",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    isDisabled: {
      control: "boolean",
      description: "If `true`, the select component is disabled",
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
      description: "If `true`, the select component is optional",
      table: {
        type: {
          summary: "boolean",
        },
        defaultValue: {
          summary: false,
        },
      },
    },
    label: {
      control: "text",
      description: "The label text for the select component",
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
        "The name of the select component. Defaults to the `id` if not set.",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    onBlur: {
      control: null,
      description: "Callback fired when the select component loses focus",
      table: {
        type: {
          summary: "func",
        },
      },
    },
    onChange: {
      control: null,
      description:
        "Callback fired when the value of the select component changes",
      table: {
        type: {
          summary: "func",
        },
      },
    },
    onFocus: {
      control: null,
      description: "Callback fired when the select component gains focus",
      table: {
        type: {
          summary: "func",
        },
      },
    },
    options: {
      control: "object",
      description: "The options for the select component",
      table: {
        type: {
          summary: "(string | SelectOption)[]",
        },
      },
      type: {
        required: true,
        name: "other",
        value: "(string | SelectOption)[]",
      },
    },
    value: {
      control: "text",
      description: "The value or values selected in the select component",
      table: {
        type: {
          summary: "string | string[]",
        },
      },
    },
  },
  args: {
    hint: "Select your destination in the Sol system.",
    label: "Destination",
    options: optionsArray,
  },
  decorators: [MuiThemeDecorator],
  tags: ["autodocs"],
};

export default storybookMeta;

export const Default: StoryObj<SelectProps<string | string[], boolean>> = {
  play: async ({ canvasElement, step }) => {
    await step("Select Earth from the listbox", async () => {
      const comboBoxElement = canvasElement.querySelector(
        '[aria-haspopup="listbox"]'
      );
      if (comboBoxElement) {
        userEvent.click(comboBoxElement);
        const listboxElement = screen.getByRole("listbox");
        expect(listboxElement).toBeInTheDocument();
        const listItem = listboxElement.children[0];
        userEvent.click(listItem);
        userEvent.tab();
        await waitFor(() => expect(listboxElement).not.toBeInTheDocument());
        const inputElement = canvasElement.querySelector("input");
        expect(inputElement?.value).toBe("Earth");
        await waitFor(() => axeRun("Select Default"));
      }
    });
  },
};
Default.args = {};

export const Disabled: StoryObj<SelectProps<string | string[], boolean>> = {
  args: {
    isDisabled: true,
  },
};

export const Error: StoryObj<SelectProps<string | string[], boolean>> = {
  args: {
    errorMessage: "Select your destination.",
  },
  play: async ({ step }) => {
    await step("Check for a11y errors on Select Error", async () => {
      await waitFor(() => axeRun("Select Error"));
    });
  },
};

export const OptionsObject: StoryObj<SelectProps<string | string[], boolean>> =
  {
    args: {
      options: optionsObject,
    },
    parameters: {
      docs: {
        description: {
          story:
            "Select can accept `options` as a flat array, an array of objects, or both. This demonstrates an array of objects with `value` and `name`.",
        },
      },
    },
  };

export const OptionsGrouped: StoryObj<SelectProps<string | string[], boolean>> =
  {
    args: {
      options: optionsGrouped,
    },
    parameters: {
      docs: {
        description: {
          story:
            'Objects with `type: "heading"` will have their `text` displayed as a heading.',
        },
      },
    },
  };

export const MultiSelect: StoryObj<SelectProps<string | string[], boolean>> = {
  args: {
    isMultiSelect: true,
  },
  play: async ({ canvasElement, step }) => {
    await step("Select Multiple items from the listbox", async () => {
      const comboBoxElement = canvasElement.querySelector(
        '[aria-haspopup="listbox"]'
      );
      if (comboBoxElement) {
        userEvent.click(comboBoxElement);
        const listboxElement = screen.getByRole("listbox");
        expect(listboxElement).toBeInTheDocument();

        userEvent.click(listboxElement.children[0]);
        userEvent.click(listboxElement.children[1]);
        userEvent.tab();
        await waitFor(() => expect(listboxElement).not.toBeInTheDocument());
        const inputElement = canvasElement.querySelector("input");
        expect(inputElement?.value).toBe("Earth,Mars");
        userEvent.click(canvasElement);
        await waitFor(() => axeRun("Select Multiple"));
      }
    });
  },
};
