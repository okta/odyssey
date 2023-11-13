/*!
 * Copyright (c) 2023-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import type { Meta, StoryObj } from "@storybook/react";
import {
  DataFilter,
  DataFilters,
  DataFiltersProps,
} from "@okta/odyssey-react-mui/labs";
import { MuiThemeDecorator } from "../../../../.storybook/components";
import { BugIcon, SettingsIcon } from "@okta/odyssey-react-mui/icons";
import { Box, Button } from "@okta/odyssey-react-mui";

// additionalActions ?: ReactNode;
// filters: Array<DataFilter>;

const storybookMeta: Meta<DataFiltersProps> = {
  title: "Labs Components/DataFilters",
  component: DataFilters,
  argTypes: {
    onChangeSearch: {
      control: null,
      description: "",
      table: {
        type: {
          summary: "(value: string) => void",
        },
      },
    },
    onChangeFilters: {
      control: null,
      description: "",
      table: {
        type: {
          summary: "(filters: Array<DataFilter>) => void",
        },
      },
    },
    searchOnSubmit: {
      control: "boolean",
      description: "",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    searchDelay: {
      control: "number",
      description: "",
      table: {
        type: {
          summary: "number",
        },
      },
    },
    initialSearchTerm: {
      control: "text",
      description: "",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    additionalActions: {
      control: null,
      description: "",
      table: {
        type: {
          summary: "ReactNode",
        },
      },
    },
    filters: {
      control: null,
      description: "",
      table: {
        type: {
          summary: "Array<DataFilter>",
        },
      },
    },
  },
  decorators: [MuiThemeDecorator],
  tags: ["autodocs"],
};

export default storybookMeta;

const demoFilters: Array<DataFilter> = [
  {
    id: "text-filter",
    label: "Text filter",
    variant: "text",
  },
  {
    id: "number-filter",
    label: "Number filter",
    variant: "number",
  },
  {
    id: "checkbox-filter",
    label: "Checkbox filter",
    variant: "checkbox",
    options: [
      {
        label: "Option 1",
        value: "option1",
      },
      {
        label: "Option 2",
        value: "option2",
      },
      {
        label: "Option 3",
        value: "option3",
      },
    ],
  },
  {
    id: "radio-filter",
    label: "Radio filter",
    variant: "radio",
    options: [
      {
        label: "Option 1",
        value: "option1",
      },
      {
        label: "Option 2",
        value: "option2",
      },
      {
        label: "Option 3",
        value: "option3",
      },
    ],
  },
  {
    id: "autocomplete",
    label: "Autocomplete filter",
    variant: "autocomplete",
    options: [
      {
        label: "Mercury",
        value: "mercury",
      },
      {
        label: "Venus",
        value: "venus",
      },
      {
        label: "Earth",
        value: "earth",
      },
      {
        label: "Mars",
        value: "mars",
      },
      {
        label: "Jupiter",
        value: "jupiter",
      },
      {
        label: "Saturn",
        value: "saturn",
      },
      {
        label: "Uranus",
        value: "uranus",
      },
      {
        label: "Neptune",
        value: "neptune",
      },
      {
        label: "Pluto",
        value: "pluto",
      },
      {
        label: "Ceres",
        value: "ceres",
      },
      {
        label: "Tycho Station",
        value: "tycho-station",
      },
    ],
  },
];

export const Default: StoryObj<DataFiltersProps> = {
  args: {
    filters: demoFilters,
  },
  render: function C(props) {
    return <DataFilters {...props} />;
  },
};

export const NoSearch: StoryObj<DataFiltersProps> = {
  args: {
    filters: demoFilters,
    onChangeSearch: undefined,
  },
  render: function C(props) {
    return <DataFilters {...props} />;
  },
};

export const JustSearch: StoryObj<DataFiltersProps> = {
  args: {
    filters: [],
  },
  render: function C(props) {
    return <DataFilters {...props} />;
  },
};

export const SearchOnSubmit: StoryObj<DataFiltersProps> = {
  args: {
    filters: [],
    searchOnSubmit: true,
  },
  render: function C(props) {
    return <DataFilters {...props} />;
  },
};

export const AdditionalActions: StoryObj<DataFiltersProps> = {
  args: {
    filters: demoFilters,
    additionalActions: (
      <Box>
        <Button
          variant="secondary"
          endIcon={<BugIcon />}
          label="Another button"
        />
        <Button variant="secondary" endIcon={<SettingsIcon />} />
      </Box>
    ),
  },
  render: function C(props) {
    return <DataFilters {...props} />;
  },
};
