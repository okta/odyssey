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
import { userEvent, waitFor, screen } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { useCallback, useState } from "react";

import { MuiThemeDecorator } from "../../../../.storybook/components";
import { axeRun } from "../../../axe-util";
import { fieldComponentPropsMetaData } from "../../../fieldComponentPropsMetaData";

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
    defaultValue: {
      control: "text",
      description:
        "The default value. Use when the component is not controlled.",
      table: {
        type: {
          summary: "string | string[]",
        },
        defaultValue: {
          summary: undefined,
        },
      },
    },
    errorMessage: fieldComponentPropsMetaData.errorMessage,
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
    hint: fieldComponentPropsMetaData.hint,
    HintLinkComponent: fieldComponentPropsMetaData.HintLinkComponent,
    id: fieldComponentPropsMetaData.id,
    isDisabled: fieldComponentPropsMetaData.isFullWidth,
    isFullWidth: fieldComponentPropsMetaData.isFullWidth,
    isOptional: fieldComponentPropsMetaData.isOptional,
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
    name: fieldComponentPropsMetaData.name,
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
      description:
        "The `input` value. Use when the component is controlled.\n\nProviding an empty string will select no options.\n\nSet to an empty string `''` if you don't want any of the available options to be selected.",
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

export const Default: StoryObj<typeof Select> = {
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
Default.args = { defaultValue: "" };

export const Disabled: StoryObj<typeof Select> = {
  args: {
    isDisabled: true,
    defaultValue: "",
  },
};

export const Error: StoryObj<typeof Select> = {
  args: {
    errorMessage: "Select your destination.",
    defaultValue: "",
  },
  play: async ({ step }) => {
    await step("Check for a11y errors on Select Error", async () => {
      await waitFor(() => axeRun("Select Error"));
    });
  },
};

export const OptionsObject: StoryObj<typeof Select> = {
  args: {
    options: optionsObject,
    defaultValue: "",
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

export const OptionsGrouped: StoryObj<typeof Select> = {
  args: {
    options: optionsGrouped,
    defaultValue: "",
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

export const MultiSelect: StoryObj<typeof Select> = {
  args: {
    isMultiSelect: true,
    defaultValue: [],
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

export const ControlledSelect: StoryObj<typeof Select> = {
  parameters: {
    docs: {
      description: {
        story:
          "When the component is controlled, the parent component is responsible for managing the state of `Select`. `onChange` should be used to listen for component changes and to update the values in the `value` prop.",
      },
    },
  },
  args: {
    value: "",
  },
  render: function C(props) {
    const [localValue, setLocalValue] = useState("");
    const onChange = useCallback(
      (event) => setLocalValue(event.target.value),
      []
    );
    return <Select {...props} value={localValue} onChange={onChange} />;
  },
};

export const ControlledMultipleSelect: StoryObj<typeof Select> = {
  parameters: {
    docs: {
      description: {
        story:
          'When the component is controlled, the parent component is responsible for managing the state of `Select`. `onChange` should be used to listen for component changes and to update the values in the `value` prop.\n\nWhen `hasMultipleChoices` is `true` and nothing is preselected, pass `[""]` as this initial controlled `value`',
      },
    },
  },
  args: {
    value: [],
    hasMultipleChoices: true,
  },
  render: function C(props) {
    const [localValue, setLocalValue] = useState([""]);
    const onChange = useCallback(
      (event) => setLocalValue(event.target.value),
      []
    );
    return <Select {...props} value={localValue} onChange={onChange} />;
  },
};

export const ControlledPreselectedMultipleSelect: StoryObj<typeof Select> = {
  parameters: {
    docs: {
      description: {
        story:
          "When the component is controlled, the parent component is responsible for managing the state of `Select`. `onChange` should be used to listen for component changes and to update the values in the `value` prop.",
      },
    },
  },
  args: {
    value: [],
    hasMultipleChoices: true,
  },
  render: function C(props) {
    const [localValue, setLocalValue] = useState(["Earth", "Mars"]);
    const onChange = useCallback(
      (event) => setLocalValue(event.target.value),
      []
    );
    return <Select {...props} value={localValue} onChange={onChange} />;
  },
};

export const ControlledEmptyValue: StoryObj<typeof Select> = {
  args: {
    value: "",
    options: [
      { value: "", text: "Default option" },
      { value: "value1", text: "Value 1" },
      { value: "value2", text: "Value 2" },
    ],
  },
  render: function C(props) {
    const [localValue, setLocalValue] = useState("");
    const onChange = useCallback(
      (event) => setLocalValue(event.target.value),
      []
    );
    return <Select {...props} value={localValue} onChange={onChange} />;
  },
};
