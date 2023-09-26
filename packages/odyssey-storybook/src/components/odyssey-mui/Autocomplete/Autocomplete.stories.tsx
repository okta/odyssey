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

import { Autocomplete, AutocompleteProps } from "@okta/odyssey-react-mui";
import { Meta, StoryObj } from "@storybook/react";

import { userEvent, waitFor, within, screen } from "@storybook/testing-library";
import { axeRun } from "../../../axe-util";
import { expect } from "@storybook/jest";
import { MuiThemeDecorator } from "../../../../.storybook/components";

const stations: ReadonlyArray<StationType> = [
  { label: "Anderson Station" },
  { label: "Bara Gaon Complex" },
  { label: "Ceres" },
  { label: "Corley Station" },
  { label: "Deep Transfer Station Three" },
  { label: "Eros" },
  { label: "Free Navy Supply Depot" },
  { label: "Ganymede" },
  { label: "Gewitter Base" },
  { label: "Iapetus Station" },
  { label: "Kelso Station" },
  { label: "Laconian Transfer Station" },
  { label: "Mao Station" },
  { label: "Medina Station" },
  { label: "Nauvoo" },
  { label: "Oshima" },
  { label: "Osiris Station" },
  { label: "Pallas" },
  { label: "Phoebe Station" },
  { label: "Prospero Station" },
  { label: "Shirazi-Ma Complex" },
  { label: "Terryon Lock" },
  { label: "Thoth Station" },
  { label: "Tycho Station" },
  { label: "Vesta" },
];

const storybookMeta: Meta<typeof Autocomplete> = {
  title: "MUI Components/Forms/Autocomplete",
  component: Autocomplete,
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
    isOptional: {
      control: "boolean",
      description: "If `true`, the select component is optional",
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
  },
  args: {
    label: "Destination",
    hint: "Select your destination in the Sol system.",
    options: stations,
  },
  decorators: [MuiThemeDecorator],
  tags: ["autodocs"],
};

export default storybookMeta;

type StationType = { label: string };
type AutocompleteType = AutocompleteProps<
  StationType | undefined,
  boolean | undefined,
  boolean | undefined
>;

export const Default: StoryObj<AutocompleteType> = {
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

export const Disabled: StoryObj<AutocompleteType> = {
  args: {
    isDisabled: true,
    value: { label: "Tycho Station" },
  },
};

export const Error: StoryObj<AutocompleteType> = {
  args: {
    errorMessage: "Select your destination.",
  },
  play: async ({ step }) => {
    await step("Check for a11y errors on Select Error", async () => {
      await waitFor(() => axeRun("Select Error"));
    });
  },
};

export const IsCustomValueAllowed: StoryObj<AutocompleteType> = {
  parameters: {
    docs: {
      description: {
        story:
          "Autocomplete supports user-submitted values via the `isCustomValueAllowed` prop.",
      },
    },
  },
  ...Default,
  args: {
    isCustomValueAllowed: true,
  },
  play: async ({ canvasElement, step }) => {
    await step("Enter custom value", async () => {
      const canvas = within(canvasElement);
      const comboBoxElement = canvas.getByRole("combobox") as HTMLInputElement;
      userEvent.click(comboBoxElement);
      userEvent.type(comboBoxElement, "qwerty");
      userEvent.tab();
      expect(comboBoxElement.value).toBe("qwerty");
    });
  },
};

export const Loading: StoryObj<AutocompleteType> = {
  args: {
    isLoading: true,
    options: [],
  },
};

export const Multiple: StoryObj<AutocompleteType> = {
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

export const MultipleDisabled: StoryObj<AutocompleteType> = {
  args: {
    hasMultipleChoices: true,
    isDisabled: true,
    value: [{ label: "Tycho Station" }],
  },
};

export const MultipleReadOnly: StoryObj<AutocompleteType> = {
  args: {
    hasMultipleChoices: true,
    isReadOnly: true,
    value: [{ label: "Tycho Station" }],
  },
};

export const Optional: StoryObj<AutocompleteType> = {
  args: {
    isOptional: true,
  },
};

export const ReadOnly: StoryObj<AutocompleteType> = {
  args: {
    isReadOnly: true,
    value: { label: "Tycho Station" },
  },
};
