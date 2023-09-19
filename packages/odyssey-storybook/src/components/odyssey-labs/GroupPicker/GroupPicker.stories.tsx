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
  GroupPicker,
  GroupPickerProps,
  GroupPickerOptionType,
} from "@okta/odyssey-react-mui/labs";
import { Meta, StoryObj } from "@storybook/react";

import { userEvent, waitFor, within, screen } from "@storybook/testing-library";
import { axeRun } from "../../../axe-util";
import { expect } from "@storybook/jest";
import { MuiThemeDecorator } from "../../../../.storybook/components";
import demoImage from "./demo.png";

const stations: ReadonlyArray<GroupPickerOptionType> = [
  { id: "en", name: "English", description: "", logo: demoImage },
  {
    id: "fr",
    name: "French",
    description: "Français",
    logo: "",
    usersCount: 100,
    appsCount: 200,
  },
  {
    id: "jp",
    name: "Japanese",
    description: "日本語",
    logo: demoImage,
    usersCount: 0,
    appsCount: 0,
  },
  {
    id: "es",
    name: "Spanish",
    description: "Español",
    logo: demoImage,
    usersCount: 101,
    appsCount: 202,
    groupPushMappingsCount: 303,
  },
];

const storybookMeta: Meta<typeof GroupPicker> = {
  title: "Labs Components/GroupPicker",
  component: GroupPicker,
  argTypes: {
    hasMultipleChoices: {
      control: "boolean",
      description: "Enables multiple choice selection",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    hint: {
      control: "text",
      description: "The hint text for the autocomplete input",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    isCustomValueAllowed: {
      control: "boolean",
      description: "Allows the input of custom values",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    isDisabled: {
      control: "boolean",
      description: "Disables the autocomplete input",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    isLoading: {
      control: "boolean",
      description: "Displays a loading indicator",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    isReadOnly: {
      control: "boolean",
      description: "Makes the autocomplete input read-only",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    label: {
      control: "text",
      description: "The label text for the autocomplete input",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    onChange: {
      control: null,
      description:
        "Callback fired when the value of the autocomplete input changes",
      table: {
        type: {
          summary: "func",
        },
        defaultValue: "",
      },
    },
    onInputChange: {
      control: null,
      description:
        "Callback fired when the input value of the autocomplete input changes",
      table: {
        type: {
          summary: "func",
        },
        defaultValue: "",
      },
    },
    options: {
      control: null,
      description: "The options for the autocomplete input",
      table: {
        type: {
          summary:
            "Array<OptionType> | GroupedOptionType<OptionType>[] | Promise<Array<OptionType> | GroupedOptionType<OptionType>[]>",
        },
      },
    },
    value: {
      control: null,
      description: "The value of the autocomplete input",
      table: {
        type: {
          summary: "OptionType | OptionType[]",
        },
      },
    },
    filterSelectedOptions: {
      control: "boolean",
      description: "Filter out selected options",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
  },
  args: {
    label: "Languages",
    hint: "Languages supports in the system",
    options: stations,
  },
  decorators: [MuiThemeDecorator],
  tags: ["autodocs"],
};

export default storybookMeta;

type GroupPickerType = GroupPickerProps<
  GroupPickerOptionType,
  boolean | undefined,
  boolean | undefined
>;

export const GroupPickerDefault: StoryObj<GroupPickerType> = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const comboBoxElement = canvas.getByRole("combobox") as HTMLInputElement;
    await step("Filter and Select from listbox", async () => {
      userEvent.click(comboBoxElement);
      const listboxElement = screen.getByRole("listbox");
      expect(listboxElement).toBeVisible();
    });
    await step("Check for 'No options' in the list", async () => {
      await axeRun("Autocomplete Default");
      waitFor(() => {
        userEvent.type(comboBoxElement, "q");
        const noOptionsElement = screen.getByText("No options");
        expect(noOptionsElement).toBeVisible();
      });
    });
    await step("Check for Filtered item from the list", async () => {
      userEvent.clear(comboBoxElement);
      userEvent.type(comboBoxElement, "z");
      const listItem = screen.getByRole("listbox").firstChild as HTMLLIElement;
      expect(listItem?.textContent).toBe("Shirazi-Ma Complex");
      userEvent.click(listItem);
      expect(comboBoxElement.value).toBe("Shirazi-Ma Complex");
    });
    await step("Clear the selected item", async () => {
      const clearButton = canvas.getByTitle("Clear");
      userEvent.click(clearButton);
      expect(comboBoxElement.value).toBe("");
      userEvent.tab();
    });
  },
};

export const Multiple: StoryObj<GroupPickerType> = {
  args: {
    hasMultipleChoices: true,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const comboBoxElement = canvas.getByRole("combobox") as HTMLInputElement;
    await step("Check for list box to be visible", async () => {
      userEvent.click(comboBoxElement);
      const listboxElement = screen.getByRole("listbox");
      expect(listboxElement).toBeVisible();
    });
    await step("Select multiple items", async () => {
      userEvent.type(comboBoxElement, "z");
      userEvent.click(screen.getByRole("listbox").firstChild as HTMLLIElement);
      userEvent.clear(comboBoxElement);
      userEvent.type(comboBoxElement, "w");
      userEvent.click(screen.getByRole("listbox").firstChild as HTMLLIElement);
      await axeRun("Autocomplete Multiple");
    });
    await step("Clear the selected items", async () => {
      waitFor(() => {
        const clearButton = canvas.getByTitle("Clear");
        userEvent.click(clearButton);
        expect(comboBoxElement.value).toBe("");
        userEvent.tab();
      });
    });
  },
};

export const FilterSelectedOptions: StoryObj<GroupPickerType> = {
  args: {
    hasMultipleChoices: true,
    filterSelectedOptions: true,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const comboBoxElement = canvas.getByRole("combobox") as HTMLInputElement;
    await step("Check for list box to be visible", async () => {
      userEvent.click(comboBoxElement);
      const listboxElement = screen.getByRole("listbox");
      expect(listboxElement).toBeVisible();
    });
    await step("Select multiple items", async () => {
      userEvent.type(comboBoxElement, "z");
      userEvent.click(screen.getByRole("listbox").firstChild as HTMLLIElement);
      userEvent.clear(comboBoxElement);
      userEvent.type(comboBoxElement, "w");
      userEvent.click(screen.getByRole("listbox").firstChild as HTMLLIElement);
      await axeRun("Autocomplete Multiple");
    });
    await step("Clear the selected items", async () => {
      waitFor(() => {
        const clearButton = canvas.getByTitle("Clear");
        userEvent.click(clearButton);
        expect(comboBoxElement.value).toBe("");
        userEvent.tab();
      });
    });
  },
};
