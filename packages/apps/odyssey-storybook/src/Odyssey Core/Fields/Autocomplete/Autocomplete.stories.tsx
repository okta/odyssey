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
import { Meta, StoryObj } from "@storybook/react-vite";
import { SyntheticEvent, useCallback, useState } from "react";
import { fn, screen, userEvent, within } from "storybook/test";

import { OdysseyStorybookThemeDecorator } from "../../../tools/OdysseyStorybookThemeDecorator.js";
import { fieldComponentPropsMetaData } from "../fieldComponentPropsMetaData.js";
import { LargeDataSet, largeDataSet } from "./large-data-collection.js";

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
  component: Autocomplete,
  decorators: [OdysseyStorybookThemeDecorator],
  tags: ["autodocs"],
  argTypes: {
    ariaDescribedBy: {
      control: "text",
      description:
        "The id of an external element that describes the input for assistive technologies.",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    defaultValue: {
      control: false,
      description:
        "The initial selected value for an uncontrolled component. For a controlled component, use `value` instead.",
      table: {
        type: {
          summary: "OptionType | string | null | Array<OptionType | string>",
        },
      },
    },
    errorMessage: fieldComponentPropsMetaData.errorMessage,
    errorMessageList: fieldComponentPropsMetaData.errorMessageList,
    getIsOptionEqualToValue: {
      control: false,
      description:
        "Determines whether an option matches the current value. Defaults to strict equality (`===`). Required when options are objects, to compare by a specific property (e.g., `id`) rather than by reference.",
      table: {
        type: {
          summary: "(option: OptionType, value: OptionType) => boolean",
        },
      },
    },
    getOptionLabel: {
      control: false,
      description:
        "Determines the string label displayed for a given option in the input field and dropdown list. Defaults to the option's `label` property. Required when options do not have a `label` property.",
      table: {
        type: {
          summary: "(option: OptionType) => string",
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
    hint: fieldComponentPropsMetaData.hint,
    HintLinkComponent: fieldComponentPropsMetaData.HintLinkComponent,
    id: fieldComponentPropsMetaData.id,
    inputValue: {
      control: "text",
      description:
        "The controlled value of the text input. Pair with `onInputChange` to update it. Use when controlling the input text independently from the selected value.",
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
      description:
        "Enables list virtualization for large option sets. Recommended when rendering hundreds of options or more.",
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
    noOptionsText: {
      control: "text",
      description:
        "The text displayed in the dropdown when no options match the current input. Defaults to 'No options'.",
      table: {
        type: {
          summary: "string",
        },
        defaultValue: {
          summary: "'No options'",
        },
      },
    },
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
          summary: "ReadonlyArray<OptionType>",
        },
      },
      type: {
        required: true,
        name: "other",
        value: "ReadonlyArray<OptionType>",
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
    testId: {
      control: "text",
      description:
        "The `data-se` attribute applied to the input element, used to target the component in automated tests.",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    translate: {
      control: { type: "radio" },
      options: ["yes", "no"],
      description: "Sets the HTML `translate` attribute on the input field",
      table: {
        type: {
          summary: '"yes" | "no"',
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
};

export default storybookMeta;

type StationType = { label: string };
type AutocompleteType = typeof Autocomplete<StationType, boolean, boolean>;

export const Default: StoryObj<AutocompleteType> = {
  play: async ({ canvasElement, step }) => {
    await step("Open dropdown", async () => {
      const canvas = within(canvasElement);
      await userEvent.click(canvas.getByRole("combobox"));
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
};

export const FullWidth: StoryObj<AutocompleteType> = {
  args: {
    isFullWidth: true,
  },
};

export const HintLink: StoryObj<AutocompleteType> = {
  args: {
    HintLinkComponent: <Link href="#link">Learn more</Link>,
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
};

export const Loading: StoryObj<AutocompleteType> = {
  args: {
    isLoading: true,
    options: [],
  },
  play: async ({ canvasElement, step }) => {
    await step("Open dropdown", async () => {
      const canvas = within(canvasElement);
      await userEvent.click(canvas.getByRole("combobox"));
    });
  },
};

export const NoOptions: StoryObj<AutocompleteType> = {
  args: {
    options: [],
  },
  play: async ({ canvasElement, step }) => {
    await step("Open dropdown", async () => {
      const canvas = within(canvasElement);
      await userEvent.click(canvas.getByRole("combobox"));
    });
  },
};

export const Multiple: StoryObj<AutocompleteType> = {
  args: {
    hasMultipleChoices: true,
    name: "testName",
  },
  play: async ({ canvasElement, step }) => {
    await step("Open dropdown", async () => {
      const canvas = within(canvasElement);
      await userEvent.click(canvas.getByRole("combobox"));
      await userEvent.click(screen.getByRole("option", { name: "Ceres" }));
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
  description: string;
  diameterInKm: number;
  id: string;
  label: string;
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
      return <Autocomplete {...props} onChange={onChange} value={localValue} />;
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
    return <Autocomplete {...props} onChange={onChange} value={localValue} />;
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
    return <Autocomplete {...props} onChange={onChange} value={localValue} />;
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
    return <Autocomplete {...props} onChange={onChange} value={localValue} />;
  },
};
