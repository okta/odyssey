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

import { MuiThemeDecorator } from "../../../../.storybook/components";

const storybookMeta: Meta<typeof Autocomplete> = {
  title: "MUI Components/Forms/Autocomplete",
  component: Autocomplete,
  argTypes: {
    label: {
      control: "text",
      defaultValue: "Destination",
    },
    hint: {
      control: "text",
      defaultValue: "Select your destination in the Sol system.",
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

export const Default: StoryObj<AutocompleteType> = {
  render: function C(props) {
    return <Autocomplete {...props} options={stations} />;
  },
};

export const Disabled: StoryObj<AutocompleteType> = {
  ...Default,
  args: {
    isDisabled: true,
    value: { label: "Tycho Station" },
  },
};

export const IsCustomValueAllowed: StoryObj<AutocompleteType> = {
  ...Default,
  args: {
    isCustomValueAllowed: true,
  },
};

export const Loading: StoryObj<AutocompleteType> = {
  ...Default,
  args: {
    isLoading: true,
  },
};

export const Multiple: StoryObj<AutocompleteType> = {
  ...Default,
  args: {
    hasMultipleChoices: true,
  },
};

export const MultipleDisabled: StoryObj<AutocompleteType> = {
  ...Default,
  args: {
    hasMultipleChoices: true,
    isDisabled: true,
    value: [{ label: "Tycho Station" }],
  },
};

export const MultipleReadOnly: StoryObj<AutocompleteType> = {
  ...Default,
  args: {
    hasMultipleChoices: true,
    isReadOnly: true,
    value: [{ label: "Tycho Station" }],
  },
};

export const ReadOnly: StoryObj<AutocompleteType> = {
  ...Default,
  args: {
    isReadOnly: true,
    value: { label: "Tycho Station" },
  },
};
