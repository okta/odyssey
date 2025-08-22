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

import { Autocomplete, Link } from "@okta/odyssey-react-mui";
import { Meta, StoryObj } from "@storybook/react";
import {
  expect,
  fn,
  screen,
  userEvent,
  waitFor,
  within,
} from "@storybook/test";
import { SyntheticEvent, useCallback, useState } from "react";

import { LargeDataSet, largeDataSet } from "./large-data-collection.js";
import { axeRun } from "../../../axe-util.js";
import { fieldComponentPropsMetaData } from "../../../fieldComponentPropsMetaData.js";

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
    errorMessage: fieldComponentPropsMetaData.errorMessage,
    errorMessageList: fieldComponentPropsMetaData.errorMessageList,
    hasMultipleChoices: {
      control: "boolean",
      description: "Enables multiple choice selection",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    hint: fieldComponentPropsMetaData.hint,
    HintLinkComponent: fieldComponentPropsMetaData.HintLinkComponent,
    id: fieldComponentPropsMetaData.id,
    isCustomValueAllowed: {
      control: "boolean",
      description: "Allows the input of custom values",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    isDisabled: fieldComponentPropsMetaData.isDisabled,
    isFullWidth: fieldComponentPropsMetaData.isFullWidth,
    isLoading: {
      control: "boolean",
      description: "Displays a loading indicator",
      table: {
        type: {
          summary: "boolean",
        },
        defaultValue: {
          summary: "false",
        },
      },
    },
    isOptional: fieldComponentPropsMetaData.isOptional,
    isReadOnly: fieldComponentPropsMetaData.isReadOnly,
    isVirtualized: {
      control: "boolean",
      description: "Let's the component know it should virtualize the list",
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
      type: {
        required: true,
        name: "string",
      },
    },
    name: fieldComponentPropsMetaData.name,
    onBlur: {
      description:
        "Callback fired when the autocomplete component loses focus.",
      table: {
        type: {
          summary: "func",
        },
      },
    },
    onChange: {
      description: "Callback fired when a selection is made.",
      table: {
        type: {
          summary: "func",
        },
      },
    },
    onInputChange: {
      description: "Callback fired when the textbox receives typed characters.",
      table: {
        type: {
          summary: "func",
        },
      },
    },
    onFocus: {
      description:
        "Callback fired when the autocomplete component gains focus.",
      table: {
        type: {
          summary: "func",
        },
      },
    },
    options: {
      description: "The options for the autocomplete input",
      table: {
        type: {
          summary:
            "Array<OptionType> | GroupedOptionType<OptionType>[] | Promise<Array<OptionType> | GroupedOptionType<OptionType>[]>",
        },
      },
      type: {
        required: true,
        name: "other",
        value:
          "Array<OptionType> | GroupedOptionType<OptionType>[] | Promise<Array<OptionType> | GroupedOptionType<OptionType>[]>",
      },
    },
    value: {
      description: "The value of the autocomplete input",
      table: {
        type: {
          summary: "OptionType | OptionType[]",
        },
      },
    },
  },
  args: {
    hint: "Select your destination in the Sol system.",
    id: "testId",
    label: "Destination",
    onBlur: fn(),
    onChange: fn(),
    onFocus: fn(),
    onInputChange: fn(),
    options: stations,
  },
  tags: ["autodocs"],
};

export default storybookMeta;

type StationType = { label: string };
type AutocompleteType = typeof Autocomplete<StationType, boolean, boolean>;

export const Default: StoryObj<AutocompleteType> = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const comboBoxElement = canvas.getByRole<HTMLInputElement>("combobox");
    await step("Filter and Select from listbox", async () => {
      await userEvent.click(comboBoxElement);
      const listboxElement = screen.getByRole("listbox");
      expect(listboxElement).toBeVisible();
    });
    await step("Check for 'No options' in the list", async () => {
      await axeRun("Autocomplete Default");
      await waitFor(async () => {
        await userEvent.type(comboBoxElement, "q");
        const noOptionsElement = screen.getByText("No options");
        expect(noOptionsElement).toBeVisible();
      });
    });
    await step("Check for Filtered item from the list", async () => {
      await userEvent.clear(comboBoxElement);
      await userEvent.type(comboBoxElement, "z");
      const listItem = screen.getByRole("listbox").firstChild as HTMLLIElement;
      await expect(listItem?.textContent).toBe("Shirazi-Ma Complex");
      await userEvent.click(listItem);
      await expect(comboBoxElement.value).toBe("Shirazi-Ma Complex");
    });
    await step("Clear the selected item", async () => {
      const clearButton = canvas.getByTitle("Clear");
      await userEvent.click(clearButton);
      await expect(comboBoxElement.value).toBe("");
      await userEvent.tab();
    });
    await step("Check id and name", async () => {
      await expect(comboBoxElement.getAttribute("id")).toBe("testId");
      await expect(comboBoxElement.getAttribute("name")).toBe("testId");
    });
  },
};

export const Disabled: StoryObj<AutocompleteType> = {
  args: {
    isDisabled: true,
    value: { label: "Tycho Station" },
    getIsOptionEqualToValue: (option, value) => option.label === value.label,
  },
};

export const Error: StoryObj<AutocompleteType> = {
  args: {
    errorMessage: "Select your destination.",
  },
  play: async ({ step }) => {
    await step("Check for a11y errors on Select Error", async () => {
      await waitFor(async () => await axeRun("Select Error"));
    });
  },
};

export const ErrorsList: StoryObj<AutocompleteType> = {
  args: {
    hasMultipleChoices: true,
    errorMessage: "Select your destination.",
    errorMessageList: [
      "Select at least 1 destination",
      "Select no more than 3 destinations",
    ],
  },
  play: async ({ step }) => {
    await step("Check for a11y errors on Select Error", async () => {
      await waitFor(async () => await axeRun("Select Error"));
    });
  },
};

export const FullWidth: StoryObj<AutocompleteType> = {
  args: {
    isFullWidth: true,
  },
};

export const HintLink: StoryObj<AutocompleteType> = {
  args: {
    HintLinkComponent: <Link href="/learn-more">Learn more</Link>,
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
      const comboBoxElement = canvas.getByRole<HTMLInputElement>("combobox");
      await userEvent.click(comboBoxElement);
      await userEvent.type(comboBoxElement, "qwerty");
      await userEvent.tab();
      await expect(comboBoxElement.value).toBe("qwerty");
    });
  },
};

export const Loading: StoryObj<AutocompleteType> = {
  args: {
    isLoading: true,
    options: [],
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const comboBoxElement = canvas.getByRole<HTMLInputElement>("combobox");
    await step("Click for loading to be visible", async () => {
      await userEvent.click(comboBoxElement);
      const loadingElement = screen.getByText("Loading…");
      expect(loadingElement).toBeVisible();
    });
  },
};

export const NoOptions: StoryObj<AutocompleteType> = {
  args: {
    options: [],
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const comboBoxElement = canvas.getByRole<HTMLInputElement>("combobox");
    await step("Click for loading to be visible", async () => {
      await userEvent.click(comboBoxElement);
      const loadingElement = screen.getByText("No options");
      expect(loadingElement).toBeVisible();
    });
  },
};

export const Multiple: StoryObj<AutocompleteType> = {
  args: {
    hasMultipleChoices: true,
    name: "testName",
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const comboBoxElement = canvas.getByRole<HTMLInputElement>("combobox");
    await step("Check for list box to be visible", async () => {
      await userEvent.click(comboBoxElement);
      const listboxElement = screen.getByRole("listbox");
      expect(listboxElement).toBeVisible();
    });
    await step("Select multiple items", async () => {
      await userEvent.type(comboBoxElement, "z");
      await userEvent.click(
        screen.getByRole("listbox").firstChild as HTMLLIElement,
      );
      await userEvent.clear(comboBoxElement);
      await userEvent.type(comboBoxElement, "w");
      await userEvent.click(
        screen.getByRole("listbox").firstChild as HTMLLIElement,
      );
      await axeRun("Autocomplete Multiple");
    });
    await step("Clear the selected items", async () => {
      await waitFor(async () => {
        const clearButton = canvas.getByTitle("Clear");
        await userEvent.click(clearButton);
        await expect(comboBoxElement.value).toBe("");
        await userEvent.tab();
      });
    });
    await step("Check id and name", async () => {
      await expect(comboBoxElement.getAttribute("id")).toBe("testId");
      await expect(comboBoxElement.getAttribute("name")).toBe("testName");
    });
  },
};

export const MultipleDisabled: StoryObj<AutocompleteType> = {
  args: {
    hasMultipleChoices: true,
    isDisabled: true,
    defaultValue: [{ label: "Tycho Station" }],
    getIsOptionEqualToValue: (option, value) => option.label === value.label,
  },
};

export const MultipleReadOnly: StoryObj<AutocompleteType> = {
  args: {
    hasMultipleChoices: true,
    isReadOnly: true,
    defaultValue: [{ label: "Tycho Station" }],
    getIsOptionEqualToValue: (option, value) => option.label === value.label,
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
    defaultValue: { label: "Tycho Station" },
    getIsOptionEqualToValue: (option, value) => option.label === value.label,
  },
};

type MoonMeta = {
  id: string;
  label: string;
  diameterInKm: number;
  description: string;
};

type JupiterMoonsAutocomplete = typeof Autocomplete<MoonMeta, boolean, boolean>;

const jupiterGalileanMoons: MoonMeta[] = [
  {
    id: "ent1rs1yjAIYGKjX48g6",
    label: "Io",
    diameterInKm: 3643.2,
    description:
      "The innermost and third-largest of the four Galilean moons of the planet Jupiter.",
  },
  {
    id: "ent1rs1ys3O7JDBxe8g6",
    label: "Europa",
    diameterInKm: 3121.6,
    description:
      "The smallest of the four Galilean moons orbiting Jupiter, and the sixth-closest to the planet of all the 95 known moons of Jupiter.",
  },
  {
    id: "ent1rs21aA4w60TJG8g6",
    label: "Ganymede",
    diameterInKm: 5268.2,
    description:
      "The largest and most massive natural satellite of Jupiter as well as in the Solar System, being a planetary-mass moon.",
  },
  {
    id: "ent1rs2qgOg42zhYV8g6",
    label: "Callisto",
    diameterInKm: 4820.6,
    description:
      "The third-largest moon after Ganymede and Saturn's largest moon Titan, and as large as the smallest planet Mercury",
  },
];

export const ControlledMultipleAutocomplete: StoryObj<JupiterMoonsAutocomplete> =
  {
    parameters: {
      docs: {
        description: {
          story:
            "When the component is controlled, the parent component is responsible for managing the state of Autocomplete. `onChange` should be used to listen for component changes and to update the values in the `value` prop.",
        },
      },
    },
    args: {
      options: jupiterGalileanMoons,
      value: jupiterGalileanMoons.slice(0, 2),
      hasMultipleChoices: true,
      isReadOnly: false,
      label: "label",
      getIsOptionEqualToValue: (option, value) => option.id === value.id,
    },
    render: function C(props) {
      const [localValue, setLocalValue] = useState<MoonMeta[] | undefined>(
        jupiterGalileanMoons.slice(0, 2),
      );
      const onChange = useCallback(
        (
          _event: SyntheticEvent<Element, Event>,
          value: string | MoonMeta | (string | MoonMeta)[] | null,
        ) => setLocalValue(value as MoonMeta[]),
        [],
      );
      return <Autocomplete {...props} value={localValue} onChange={onChange} />;
    },
  };

export const UncontrolledMultipleAutocomplete: StoryObj<JupiterMoonsAutocomplete> =
  {
    args: {
      options: jupiterGalileanMoons,
      defaultValue: jupiterGalileanMoons.slice(0, 2),
      hasMultipleChoices: true,
      isReadOnly: false,
      label: "label",
      getIsOptionEqualToValue: (option, value) => option.id === value.id,
    },
  };

export const ControlledAutocomplete: StoryObj<JupiterMoonsAutocomplete> = {
  parameters: {
    docs: {
      description: {
        story:
          "When the component is controlled, the parent component is responsible for managing the state of Autocomplete. `onChange` should be used to listen for component changes and to update the values in the `value` prop.",
      },
    },
  },
  args: {
    options: jupiterGalileanMoons,
    value: jupiterGalileanMoons[0],
    isReadOnly: false,
    label: "label",
    getIsOptionEqualToValue: (option, value) => option.id === value.id,
  },
  render: function C(props) {
    const [localValue, setLocalValue] = useState<MoonMeta | undefined>(
      jupiterGalileanMoons[0],
    );
    const onChange = useCallback(
      (
        _event: SyntheticEvent<Element, Event>,
        value: string | MoonMeta | (string | MoonMeta)[] | null,
      ) => setLocalValue(value ? (value as MoonMeta) : undefined),
      [],
    );
    return <Autocomplete {...props} value={localValue} onChange={onChange} />;
  },
};

export const UncontrolledAutocomplete: StoryObj<JupiterMoonsAutocomplete> = {
  args: {
    options: jupiterGalileanMoons,
    defaultValue: jupiterGalileanMoons[0],
    isReadOnly: false,
    label: "label",
    getIsOptionEqualToValue: (option, value) => option.id === value.id,
  },
};

export const ControlledVirtualizedAutocomplete: StoryObj<
  typeof Autocomplete<LargeDataSet, boolean, boolean>
> = {
  parameters: {
    docs: {
      description: {
        story: "Rendering a list of 10,000 options in the autocomplete",
      },
    },
  },
  args: {
    isVirtualized: true,
    options: largeDataSet,
    value: largeDataSet[0],
    isReadOnly: false,
    label: "label",
    getIsOptionEqualToValue: (option, value) => option.id === value.id,
  },
  render: function C(props) {
    const [localValue, setLocalValue] = useState<LargeDataSet | undefined>(
      largeDataSet[0],
    );
    const onChange = useCallback(
      (
        _event: SyntheticEvent<Element, Event>,
        value: string | LargeDataSet | (string | LargeDataSet)[] | null,
      ) =>
        setLocalValue(
          value === undefined ? undefined : (value as LargeDataSet),
        ),
      [],
    );
    return <Autocomplete {...props} value={localValue} onChange={onChange} />;
  },
};

export const ControlledMultipleVirtualizedAutocomplete: StoryObj<
  typeof Autocomplete<LargeDataSet, boolean, boolean>
> = {
  parameters: {
    docs: {
      description: {
        story: "Rendering a list of 10,000 options in the autocomplete",
      },
    },
  },
  args: {
    hasMultipleChoices: true,
    isVirtualized: true,
    options: largeDataSet,
    value: largeDataSet.slice(0, 2),
    isReadOnly: false,
    label: "label",
    getIsOptionEqualToValue: (option, value) => option.id === value.id,
  },
  render: function C(props) {
    const [localValue, setLocalValue] = useState<LargeDataSet[] | undefined>(
      largeDataSet.slice(0, 2),
    );
    const onChange = useCallback(
      (
        _event: SyntheticEvent<Element, Event>,
        value: string | LargeDataSet | (string | LargeDataSet)[] | null,
      ) =>
        setLocalValue(
          value === undefined ? undefined : (value as LargeDataSet[]),
        ),
      [],
    );
    return <Autocomplete {...props} value={localValue} onChange={onChange} />;
  },
};
