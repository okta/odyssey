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

import { userEvent, within } from "@storybook/testing-library";
import { axeRun, sleep } from "../../../axe-util";
import { expect } from "@storybook/jest";
// eslint-disable-next-line import/no-extraneous-dependencies
import { screen } from "@testing-library/react";

import { MuiThemeDecorator } from "../../../../.storybook/components";

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
  },
  decorators: [MuiThemeDecorator],
};

export default storybookMeta;

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

type AutocompleteType = AutocompleteProps<
  StationType | undefined,
  boolean | undefined,
  boolean | undefined
>;

const Template: StoryObj<AutocompleteType> = {
  render: function C(props) {
    return <Autocomplete {...props} options={stations} />;
  },
};

export const Default: StoryObj<AutocompleteType> = {
  ...Template,
  play: async ({ canvasElement, step }) => {
    await step("Filter and Select from listbox", async () => {
      const canvas = within(canvasElement);
      const comboBox = canvas.getByRole("combobox") as HTMLInputElement;
      userEvent.click(comboBox);
      const listbox = screen.getByRole("listbox");
      expect(listbox).not.toBeNull();

      await axeRun("Autocomplete Default");

      await sleep(500);

      // Check for "No options" in the list
      userEvent.type(comboBox, "q");
      const noOpts = screen.getByText("No options");
      expect(noOpts).not.toBeNull();

      // Check filtered item
      await sleep(100);
      userEvent.clear(comboBox);
      userEvent.type(comboBox, "z");
      const listItem = screen.getByRole("listbox").firstChild as HTMLLIElement;
      expect(listItem?.textContent).toBe("Shirazi-Ma Complex");

      // Check the selected item
      await sleep(100);
      userEvent.click(listItem);
      expect(comboBox.value).toBe("Shirazi-Ma Complex");

      //Clear the selected item
      await sleep(100);
      const clearButton = canvas.getByTitle("Clear");
      userEvent.click(clearButton);
      expect(comboBox.value).toBe("");
      userEvent.tab();
    });
  },
};

export const Disabled: StoryObj<AutocompleteType> = {
  ...Template,
  args: {
    isDisabled: true,
    value: { label: "Tycho Station" },
  },
};

export const IsCustomValueAllowed: StoryObj<AutocompleteType> = {
  ...Template,
  args: {
    isCustomValueAllowed: true,
  },
  play: async ({ canvasElement, step }) => {
    await step("Enter custom value", async () => {
      const canvas = within(canvasElement);
      const comboBox = canvas.getByRole("combobox") as HTMLInputElement;
      userEvent.click(comboBox);

      // Select filtered items
      userEvent.type(comboBox, "qwerty");
      userEvent.tab();
      expect(comboBox.value).toBe("qwerty");
    });
  },
};

export const Loading: StoryObj<AutocompleteType> = {
  ...Template,
  args: {
    isLoading: true,
  },
};

export const Multiple: StoryObj<AutocompleteType> = {
  ...Template,
  args: {
    hasMultipleChoices: true,
  },
  play: async ({ canvasElement, step }) => {
    await step("Select multiple items", async () => {
      const canvas = within(canvasElement);
      const comboBox = canvas.getByRole("combobox") as HTMLInputElement;
      userEvent.click(comboBox);
      const listbox = screen.getByRole("listbox");
      expect(listbox).not.toBeNull();

      // Select filtered items
      userEvent.type(comboBox, "z");
      userEvent.click(screen.getByRole("listbox").firstChild as HTMLLIElement);
      userEvent.clear(comboBox);
      userEvent.type(comboBox, "w");
      userEvent.click(screen.getByRole("listbox").firstChild as HTMLLIElement);

      await axeRun("Autocomplete Multiple");

      //Clear the selected item
      await sleep(500);
      const clearButton = canvas.getByTitle("Clear");
      userEvent.click(clearButton);
      expect(comboBox.value).toBe("");
      userEvent.tab();
    });
  },
};

export const MultipleDisabled: StoryObj<AutocompleteType> = {
  ...Template,
  args: {
    hasMultipleChoices: true,
    isDisabled: true,
    value: [{ label: "Tycho Station" }],
  },
};

export const MultipleReadOnly: StoryObj<AutocompleteType> = {
  ...Template,
  args: {
    hasMultipleChoices: true,
    isReadOnly: true,
    value: [{ label: "Tycho Station" }],
  },
};

export const ReadOnly: StoryObj<AutocompleteType> = {
  ...Template,
  args: {
    isReadOnly: true,
    value: { label: "Tycho Station" },
  },
};
