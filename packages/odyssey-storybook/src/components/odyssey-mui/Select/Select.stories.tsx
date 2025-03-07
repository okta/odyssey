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

import { SelectChangeEvent, menuItemClasses } from "@mui/material";
import { Meta, StoryObj } from "@storybook/react";
import { Select, SelectProps, Link } from "@okta/odyssey-react-mui";
import { queryOdysseySelector } from "@okta/odyssey-react-mui/test-selectors";
import { expect, fn, screen, userEvent, waitFor } from "@storybook/test";
import { useCallback, useState } from "react";

import { axeRun } from "../../../axe-util.js";
import { fieldComponentPropsMetaData } from "../../../fieldComponentPropsMetaData.js";
import { MuiThemeDecorator } from "../../../../.storybook/components/index.js";

const optionsArray: SelectProps<string | string[], boolean>["options"] = [
  "Roles and permissions",
  "Okta Privileged Access components",
  "Users and Groups administration",
  "Resource administration",
  "Security administration",
  "Deploy and manage servers",
  "Okta Privileged Access clients",
];

const optionsObject: SelectProps<string | string[], boolean>["options"] = [
  {
    text: "Roles and permissions",
    value: "roles-and-permissions",
  },
  {
    text: "Okta Privileged Access gateways",
    value: "okta-privileged-access-gateways",
  },
  {
    text: "Users and Groups administration",
    value: "users-and-groups-administration",
  },
  {
    text: "Resource administration",
    value: "resource-administration",
  },
  {
    text: "Security administration",
    value: "security-administrator",
  },
  {
    text: "Deploy and manage servers",
    value: "deploy-and-manage-servers",
  },
  {
    text: "Okta Privileged Access clients",
    value: "okta-privileged-access-clients",
  },
];

const optionsGrouped: SelectProps<string | string[], boolean>["options"] = [
  {
    text: "Okta Privileged Access",
    type: "heading",
  },
  {
    text: "Roles and permissions",
    value: "roles-and-permissions",
  },
  {
    text: "Okta Privileged Access gateways",
    value: "okta-privileged-access-gateways",
  },
  {
    text: "Users and Groups administration",
    value: "users-and-groups-administration",
  },
  {
    text: "Resource administration",
    value: "resource-administration",
  },
  {
    text: "Security administration",
    value: "security-administrator",
  },
  {
    text: "Deploy and manage servers",
    value: "deploy-and-manage-servers",
  },
  {
    text: "Okta Privileged Access clients",
    value: "okta-privileged-access-clients",
  },
  {
    text: "Audit events",
    type: "heading",
  },
  "Resource",
  "Action",
  "Related Info",
  "Actor",
  "Date",
];

const meta = {
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
    errorMessageList: fieldComponentPropsMetaData.errorMessageList,
    hasMultipleChoices: {
      control: "boolean",
      description: "If `true`, the select component allows multiple selections",
      table: {
        type: {
          summary: "boolean",
        },
        defaultValue: {
          summary: "false",
        },
      },
    },
    hint: fieldComponentPropsMetaData.hint,
    HintLinkComponent: fieldComponentPropsMetaData.HintLinkComponent,
    id: fieldComponentPropsMetaData.id,
    isDisabled: fieldComponentPropsMetaData.isFullWidth,
    isFullWidth: fieldComponentPropsMetaData.isFullWidth,
    isOptional: fieldComponentPropsMetaData.isOptional,
    isReadOnly: fieldComponentPropsMetaData.isReadOnly,
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
      description: "Callback fired when the select component loses focus",
      table: {
        type: {
          summary: "func",
        },
      },
    },
    onChange: {
      description:
        "Callback fired when the value of the select component changes",
      table: {
        type: {
          summary: "func",
        },
      },
    },
    onFocus: {
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
    hint: "Select a topic to learn more",
    label: "Okta documentation",
    onBlur: fn(),
    onChange: fn(),
    onFocus: fn(),
    options: optionsArray,
  },
  decorators: [MuiThemeDecorator],
  tags: ["autodocs"],
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { defaultValue: "" },
  play: async ({ canvasElement, step }) => {
    await step("Select Roles and permissions from the listbox", async () => {
      const comboBoxElement = canvasElement.querySelector(
        '[aria-haspopup="listbox"]',
      );
      if (comboBoxElement) {
        await userEvent.click(comboBoxElement);
        const listboxElement = screen.getByRole("listbox");
        await expect(listboxElement).toBeInTheDocument();
        const listItem = listboxElement.children[0];

        // Change body overflow to visible to test a11y in MUI Popover content
        document.body.style.overflow = "visible";
        // Sadly this will not add ':hover' pseudo-class
        await userEvent.hover(listItem);
        // Simulate adding ':hover' pseudo-class with adding 'MuiMenuItem-root-hover' class
        listItem.classList.add(`${menuItemClasses.root}-hover`);
        await waitFor(() => axeRun("Hovered Option"));

        await userEvent.click(listItem);
        await userEvent.tab();
        await waitFor(() => {
          expect(listboxElement).not.toBeInTheDocument();
        });
        const inputElement = canvasElement.querySelector("input");
        await expect(inputElement?.value).toBe("Roles and permissions");
        await waitFor(() => {
          axeRun("Select Default");
        });
      }
    });
  },
};

export const DefaultValue: Story = {
  args: {
    defaultValue: "Roles and permissions",
  },
  play: async ({ canvasElement, step }) => {
    await step("can click dropdown option", async () => {
      const querySelect = queryOdysseySelector("Select");

      const selector = querySelect({
        element: canvasElement,
        options: {
          label: /Okta documentation/,
        },
      });

      await userEvent.click(selector.element);

      const list = selector.selectChild({
        name: "list",
      });

      await waitFor(() => {
        expect(list.element).toBeVisible();
      });

      // Change body overflow to visible to test a11y in MUI Popover content
      document.body.style.overflow = "visible";
      await waitFor(async () => await axeRun("Selected Hovered Option"));

      const listItemElement = list.selectChild({
        name: "listItem",
        options: {
          label: "Roles and permissions",
        },
      }).element;

      await waitFor(() => {
        expect(listItemElement).toBeVisible();
      });

      if (listItemElement) {
        await userEvent.click(listItemElement);
      }

      await waitFor(() => {
        expect(list?.element).not.toBeVisible();
      });
    });
  },
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
    defaultValue: "",
  },
};
export const Error: Story = {
  args: {
    errorMessage: "Select a topic.",
    defaultValue: "",
  },
  play: async ({ step }) => {
    await step("Check for a11y errors on Select Error", async () => {
      await waitFor(() => axeRun("Select Error"));
    });
  },
};

export const ErrorsList: Story = {
  args: {
    isMultiSelect: true,
    errorMessage: "Select a topic.",
    errorMessageList: [
      "Select at least one item",
      "Select no more than 3 items",
    ],
    defaultValue: [],
  },
  play: async ({ step }) => {
    await step("Check for a11y errors on Select Error", async () => {
      await waitFor(() => axeRun("Select Errors List"));
    });
  },
};

export const FullWidth: Story = {
  args: {
    isFullWidth: true,
  },
};

export const HintLink: Story = {
  args: {
    HintLinkComponent: <Link href="/learn-more">Learn more</Link>,
  },
};

export const EmptyValue: Story = {
  args: {
    value: "",
    options: [
      { value: "", text: "" },
      { value: "value1", text: "Value 1" },
      { value: "value2", text: "Value 2" },
    ],
  },
};

export const OptionsObject: Story = {
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

export const OptionsObjectAndMultiSelect: Story = {
  args: {
    options: optionsObject,
    value: [],
    hasMultipleChoices: true,
  },
  render: function C(props) {
    const [localValue, setLocalValue] = useState<string[]>([]);
    const onChange = useCallback(
      (event: SelectChangeEvent<string | string[]>) =>
        setLocalValue(event.target.value as string[]),
      [],
    );
    return <Select {...props} value={localValue} onChange={onChange} />;
  },
};

export const OptionsGrouped: Story = {
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

export const MultiSelect: Story = {
  args: {
    isMultiSelect: true,
    defaultValue: [],
  },
  play: async ({ canvasElement, step }) => {
    await step("Select Multiple items from the listbox", async () => {
      const comboBoxElement = canvasElement.querySelector(
        '[aria-haspopup="listbox"]',
      );
      if (comboBoxElement) {
        await userEvent.click(comboBoxElement);
        const listboxElement = screen.getByRole("listbox");
        await expect(listboxElement).toBeInTheDocument();

        await userEvent.click(listboxElement.children[0]);
        await userEvent.click(listboxElement.children[1]);
        await userEvent.tab();
        await waitFor(() => {
          expect(listboxElement).not.toBeInTheDocument();
        });

        const inputElement = canvasElement.querySelector("input");
        await expect(inputElement?.value).toBe(
          "Roles and permissions,Okta Privileged Access components",
        );
        await userEvent.click(canvasElement);
        await waitFor(() => {
          axeRun("Select Multiple");
        });
      }
    });
  },
};
export const ReadOnly: Story = {
  args: {
    isReadOnly: true,
    defaultValue: "Security administration",
  },
};
export const ReadOnlyMultiSelect: Story = {
  args: {
    isMultiSelect: true,
    isReadOnly: true,
    defaultValue: [
      "Roles and permissions",
      "Security administration",
      "Deploy and manage servers",
    ],
  },
};
export const ControlledSelect: Story = {
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
      (event: SelectChangeEvent<string | string[]>) =>
        setLocalValue(event.target.value as string),
      [],
    );
    return <Select {...props} value={localValue} onChange={onChange} />;
  },
};

export const ControlledMultipleSelect: Story = {
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
      (event: SelectChangeEvent<string | string[]>) =>
        setLocalValue(event.target.value as string[]),
      [],
    );
    return <Select {...props} value={localValue} onChange={onChange} />;
  },
};

export const ControlledPreselectedMultipleSelect: Story = {
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
    const [localValue, setLocalValue] = useState([
      "Roles and permissions",
      "Resource administration",
    ]);
    const onChange = useCallback(
      (event: SelectChangeEvent<string | string[]>) =>
        setLocalValue(event.target.value as string[]),
      [],
    );
    return <Select {...props} value={localValue} onChange={onChange} />;
  },
};
