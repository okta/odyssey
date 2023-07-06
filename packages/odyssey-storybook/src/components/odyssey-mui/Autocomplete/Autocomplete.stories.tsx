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

type StationType = { label: string };

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
    label: {
      control: "text",
    },
    hint: {
      control: "text",
    },
    isDisabled: {
      control: "boolean",
    },
    isCustomValueAllowed: {
      control: "boolean",
    },
    isLoading: {
      control: "boolean",
    },
    hasMultipleChoices: {
      control: "boolean",
    },
    isReadOnly: {
      control: "boolean",
    },
  },
  args: {
    label: "Destination",
    hint: "Select your destination in the Sol system.",
    options: stations,
  },
  decorators: [MuiThemeDecorator],
};

export default storybookMeta;

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

export const IsCustomValueAllowed: StoryObj<AutocompleteType> = {
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

export const ReadOnly: StoryObj<AutocompleteType> = {
  args: {
    isReadOnly: true,
    value: { label: "Tycho Station" },
  },
};
