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
import { DataFilter, DataFilters } from "@okta/odyssey-react-mui/labs";
import { MuiThemeDecorator } from "../../../../.storybook/components";
import { BugIcon, SettingsIcon } from "@okta/odyssey-react-mui/icons";
import { Box, Button } from "@okta/odyssey-react-mui";
import { fn } from "@storybook/test";

const meta = {
  title: "Labs Components/DataFilters",
  component: DataFilters,
  argTypes: {
    onChangeSearch: {
      description: "",
      table: {
        type: {
          summary: "(value: string) => void",
        },
      },
    },
    onChangeFilters: {
      description: "",
      table: {
        type: {
          summary: "(filters: Array<DataFilter>) => void",
        },
      },
    },
    hasSearchSubmitButton: {
      control: "boolean",
      description: "",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    searchDelayTime: {
      control: "number",
      description: "",
      table: {
        type: {
          summary: "number",
        },
      },
    },
    defaultSearchTerm: {
      control: "text",
      description: "",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    additionalActions: {
      description: "",
      table: {
        type: {
          summary: "ReactNode",
        },
      },
    },
    filters: {
      description: "",
      table: {
        type: {
          summary: "Array<DataFilter>",
        },
      },
    },
  },
  args: {
    onChangeFilters: fn(),
  },
  decorators: [MuiThemeDecorator],
} satisfies Meta<typeof DataFilters>;

export default meta;

type Story = StoryObj<typeof meta>;

const demoFilters: DataFilter[] = [
  {
    id: "text-filter",
    label: "Text filter",
    variant: "text",
  },
  {
    id: "autocomplete-filter",
    label: "Autocomplete filter",
    variant: "autocomplete",
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
    id: "number-filter",
    label: "Number filter",
    variant: "range",
  },
  {
    id: "checkbox-filter",
    label: "Checkbox filter",
    variant: "multi-select",
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
    variant: "select",
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
];

export const Default: Story = {
  args: {
    filters: demoFilters,
    onChangeSearch: (value) => console.log(value),
  },
};

export const NoSearch: Story = {
  args: {
    filters: demoFilters,
    onChangeSearch: undefined,
  },
};

export const JustSearch: Story = {
  args: {
    filters: [],
    onChangeSearch: (value) => console.log(value),
  },
};

export const SearchOnSubmit: Story = {
  args: {
    filters: [],
    hasSearchSubmitButton: true,
    onChangeSearch: (value) => console.log(value),
  },
};

export const AdditionalActions: Story = {
  args: {
    filters: demoFilters,
    onChangeSearch: (value) => console.log(value),
    additionalActions: (
      <Box>
        <Button
          variant="secondary"
          endIcon={<BugIcon />}
          label="Another button"
        />
        <Button
          variant="secondary"
          endIcon={<SettingsIcon />}
          ariaLabel="Settings"
        />
      </Box>
    ),
  },
};
