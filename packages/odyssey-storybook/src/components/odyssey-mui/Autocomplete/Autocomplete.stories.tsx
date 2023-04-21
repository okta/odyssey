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
import { ComponentMeta, Story } from "@storybook/react";

import { MuiThemeDecorator } from "../../../../.storybook/components";
import AutocompleteMdx from "./Autocomplete.mdx";

const storybookMeta: ComponentMeta<typeof Autocomplete> = {
  title: `MUI Components/Forms/Autocomplete`,
  component: Autocomplete,
  parameters: {
    docs: {
      page: AutocompleteMdx,
    },
  },
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

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
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

const Template: Story<AutocompleteType> = (args) => {
  return <Autocomplete {...args} options={stations} />;
};

const EmptyTemplate: Story<AutocompleteType> = (args) => {
  return <Autocomplete {...args} options={[]} />;
};

export const Default = Template.bind({});
Default.args = {};

export const disabled = Template.bind({});
disabled.args = {
  isDisabled: true,
  value: { label: "Tycho Station" },
};

export const isCustomValueAllowed = Template.bind({});
isCustomValueAllowed.args = {
  isCustomValueAllowed: true,
};

export const loading = EmptyTemplate.bind({});
loading.args = {
  isLoading: true,
};

export const multiple = Template.bind({});
multiple.args = {
  hasMultipleChoices: true,
};

export const multipleDisabled = Template.bind({});
multipleDisabled.args = {
  hasMultipleChoices: true,
  isDisabled: true,
  value: [{ label: "Tycho Station" }],
};

export const multipleReadOnly = Template.bind({});
multipleReadOnly.args = {
  hasMultipleChoices: true,
  isReadOnly: true,
  value: [{ label: "Tycho Station" }],
};

export const readOnly = Template.bind({});
readOnly.args = {
  isReadOnly: true,
  value: { label: "Tycho Station" },
};
