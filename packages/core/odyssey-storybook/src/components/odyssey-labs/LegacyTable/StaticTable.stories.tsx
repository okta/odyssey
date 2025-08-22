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

import { Meta, StoryObj } from "@storybook/react";
import { Button, DataTableColumn } from "@okta/odyssey-react-mui";
import { StaticTable, StaticTableProps } from "@okta/odyssey-react-mui/labs";

const storybookMeta: Meta = {
  title: "Labs Components/Legacy Table/StaticTable",
  component: StaticTable,
  argTypes: {
    columns: {
      control: "object",
      type: {
        required: true,
        name: "other",
        value: "MaterialReactTableProps<TData>",
      },
    },
    data: {
      control: "object",
      type: {
        required: true,
        name: "other",
        value: "MaterialReactTableProps<TData>",
      },
    },
    getRowId: {},
    fetchMoreData: {},
    hasError: {
      control: "boolean",
    },
    hasRowSelection: {
      control: "boolean",
    },
    initialState: {
      control: "object",
    },
    isFetching: {
      control: "boolean",
    },
    onGlobalFilterChange: {},
    onPaginationChange: {},
    onRowSelectionChange: {},
    state: {
      control: "object",
    },
  },
};

export default storybookMeta;

type Person = {
  id: string;
  name: {
    firstName: string;
    lastName: string;
  };
  address: string;
  city: string;
  state: string;
};

const columns: DataTableColumn<Person>[] = [
  {
    accessorKey: "name.firstName",
    header: "First Name",
  },
  {
    accessorKey: "name.lastName",
    header: "Last Name",
  },
  {
    accessorKey: "address",
    Cell: ({ cell }) => cell.getValue<string>().concat(","),
    header: "Address",
  },
  {
    accessorKey: "city",
    header: "City",
  },
  {
    accessorKey: "state",
    header: "State",
  },
];

const data: Person[] = [
  {
    address: "261 Erdman Ford",
    city: "East Daphne",
    id: "234823773",
    name: {
      firstName: "John",
      lastName: "Doe",
    },
    state: "Kentucky",
  },
  {
    address: "769 Dominic Grove",
    city: "Columbus",
    id: "234823774",
    name: {
      firstName: "Jane",
      lastName: "Doe",
    },
    state: "Ohio",
  },
  {
    address: "566 Brakus Inlet",
    city: "South Linda",
    id: "234823775",
    name: {
      firstName: "Joe",
      lastName: "Doe",
    },
    state: "West Virginia",
  },
  {
    address: "722 Emie Stream",
    city: "Lincoln",
    id: "234823776",
    name: {
      firstName: "Kevin",
      lastName: "Vandy",
    },
    state: "Nebraska",
  },
  {
    address: "32188 Larkin Turnpike",
    city: "Omaha",
    id: "234823777",
    name: {
      firstName: "Joshua",
      lastName: "Rolluffs",
    },
    state: "Nebraska",
  },
  {
    address: "261 Erdman Ford",
    city: "East Daphne",
    id: "334823773",
    name: {
      firstName: "John",
      lastName: "Doe",
    },
    state: "Kentucky",
  },
  {
    address: "769 Dominic Grove",
    city: "Columbus",
    id: "334823774",
    name: {
      firstName: "Jane",
      lastName: "Doe",
    },
    state: "Ohio",
  },
  {
    address: "566 Brakus Inlet",
    city: "South Linda",
    id: "334823775",
    name: {
      firstName: "Joe",
      lastName: "Doe",
    },
    state: "West Virginia",
  },
  {
    address: "722 Emie Stream",
    city: "Lincoln",
    id: "334823776",
    name: {
      firstName: "Kevin",
      lastName: "Vandy",
    },
    state: "Nebraska",
  },
  {
    address: "32188 Larkin Turnpike",
    city: "Omaha",
    id: "334823777",
    name: {
      firstName: "Joshua",
      lastName: "Rolluffs",
    },
    state: "Nebraska",
  },
  {
    address: "261 Erdman Ford",
    city: "East Daphne",
    id: "434823773",
    name: {
      firstName: "John",
      lastName: "Doe",
    },
    state: "Kentucky",
  },
  {
    address: "769 Dominic Grove",
    city: "Columbus",
    id: "434823774",
    name: {
      firstName: "Jane",
      lastName: "Doe",
    },
    state: "Ohio",
  },
  {
    address: "566 Brakus Inlet",
    city: "South Linda",
    id: "434823775",
    name: {
      firstName: "Joe",
      lastName: "Doe",
    },
    state: "West Virginia",
  },
  {
    address: "722 Emie Stream",
    city: "Lincoln",
    id: "434823776",
    name: {
      firstName: "Kevin",
      lastName: "Vandy",
    },
    state: "Nebraska",
  },
  {
    address: "32188 Larkin Turnpike",
    city: "Omaha",
    id: "434823777",
    name: {
      firstName: "Joshua",
      lastName: "Rolluffs",
    },
    state: "Nebraska",
  },
  {
    address: "261 Erdman Ford",
    city: "East Daphne",
    id: "534823773",
    name: {
      firstName: "John",
      lastName: "Doe",
    },
    state: "Kentucky",
  },
  {
    address: "769 Dominic Grove",
    city: "Columbus",
    id: "534823774",
    name: {
      firstName: "Jane",
      lastName: "Doe",
    },
    state: "Ohio",
  },
  {
    address: "566 Brakus Inlet",
    city: "South Linda",
    id: "534823775",
    name: {
      firstName: "Joe",
      lastName: "Doe",
    },
    state: "West Virginia",
  },
  {
    address: "722 Emie Stream",
    city: "Lincoln",
    id: "534823776",
    name: {
      firstName: "Kevin",
      lastName: "Vandy",
    },
    state: "Nebraska",
  },
  {
    address: "32188 Larkin Turnpike",
    city: "Omaha",
    id: "534823777",
    name: {
      firstName: "Joshua",
      lastName: "Rolluffs",
    },
    state: "Nebraska",
  },
  {
    address: "261 Erdman Ford",
    city: "East Daphne",
    id: "634823773",
    name: {
      firstName: "John",
      lastName: "Doe",
    },
    state: "Kentucky",
  },
  {
    address: "769 Dominic Grove",
    city: "Columbus",
    id: "634823774",
    name: {
      firstName: "Jane",
      lastName: "Doe",
    },
    state: "Ohio",
  },
  {
    address: "566 Brakus Inlet",
    city: "South Linda",
    id: "634823775",
    name: {
      firstName: "Joe",
      lastName: "Doe",
    },
    state: "West Virginia",
  },
  {
    address: "722 Emie Stream",
    city: "Lincoln",
    id: "634823776",
    name: {
      firstName: "Kevin",
      lastName: "Vandy",
    },
    state: "Nebraska",
  },
  {
    address: "32188 Larkin Turnpike",
    city: "Omaha",
    id: "634823777",
    name: {
      firstName: "Joshua",
      lastName: "Rolluffs",
    },
    state: "Nebraska",
  },
  {
    address: "261 Erdman Ford",
    city: "East Daphne",
    id: "734823773",
    name: {
      firstName: "John",
      lastName: "Doe",
    },
    state: "Kentucky",
  },
  {
    address: "769 Dominic Grove",
    city: "Columbus",
    id: "734823774",
    name: {
      firstName: "Jane",
      lastName: "Doe",
    },
    state: "Ohio",
  },
  {
    address: "566 Brakus Inlet",
    city: "South Linda",
    id: "734823775",
    name: {
      firstName: "Joe",
      lastName: "Doe",
    },
    state: "West Virginia",
  },
  {
    address: "722 Emie Stream",
    city: "Lincoln",
    id: "734823776",
    name: {
      firstName: "Kevin",
      lastName: "Vandy",
    },
    state: "Nebraska",
  },
  {
    address: "32188 Larkin Turnpike",
    city: "Omaha",
    id: "734823777",
    name: {
      firstName: "Joshua",
      lastName: "Rolluffs",
    },
    state: "Nebraska",
  },
  {
    address: "261 Erdman Ford",
    city: "East Daphne",
    id: "834823773",
    name: {
      firstName: "John",
      lastName: "Doe",
    },
    state: "Kentucky",
  },
  {
    address: "769 Dominic Grove",
    city: "Columbus",
    id: "834823774",
    name: {
      firstName: "Jane",
      lastName: "Doe",
    },
    state: "Ohio",
  },
  {
    address: "566 Brakus Inlet",
    city: "South Linda",
    id: "834823775",
    name: {
      firstName: "Joe",
      lastName: "Doe",
    },
    state: "West Virginia",
  },
  {
    address: "722 Emie Stream",
    city: "Lincoln",
    id: "834823776",
    name: {
      firstName: "Kevin",
      lastName: "Vandy",
    },
    state: "Nebraska",
  },
  {
    address: "32188 Larkin Turnpike",
    city: "Omaha",
    id: "834823777",
    name: {
      firstName: "Joshua",
      lastName: "Rolluffs",
    },
    state: "Nebraska",
  },
  {
    address: "261 Erdman Ford",
    city: "East Daphne",
    id: "934823773",
    name: {
      firstName: "John",
      lastName: "Doe",
    },
    state: "Kentucky",
  },
  {
    address: "769 Dominic Grove",
    city: "Columbus",
    id: "934823774",
    name: {
      firstName: "Jane",
      lastName: "Doe",
    },
    state: "Ohio",
  },
  {
    address: "566 Brakus Inlet",
    city: "South Linda",
    id: "934823775",
    name: {
      firstName: "Joe",
      lastName: "Doe",
    },
    state: "West Virginia",
  },
  {
    address: "722 Emie Stream",
    city: "Lincoln",
    id: "934823776",
    name: {
      firstName: "Kevin",
      lastName: "Vandy",
    },
    state: "Nebraska",
  },
  {
    address: "32188 Larkin Turnpike",
    city: "Omaha",
    id: "934823777",
    name: {
      firstName: "Joshua",
      lastName: "Rolluffs",
    },
    state: "Nebraska",
  },
];

export const BasicUsage: StoryObj<StaticTableProps<Person>> = {
  args: {
    columns,
    data,
    getRowId: ({ id }: { id: string }) => id,
  },
};

export const CustomToolbar: StoryObj<StaticTableProps<Person>> = {
  args: {
    columns,
    data,
    getRowId: ({ id }: { id: string }) => id,
    ToolbarButtons: ({ table }) => (
      <Button
        label="New Action"
        onClick={() => console.info(table.getState())}
        variant="primary"
      />
    ),
  },
};
