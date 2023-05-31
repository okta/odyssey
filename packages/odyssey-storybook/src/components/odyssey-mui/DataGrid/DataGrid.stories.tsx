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

import { Meta, Story } from "@storybook/react";
import { DataGrid, DataGridColumnType } from "@okta/odyssey-react-mui";
import { useMemo } from "react";

import { MuiThemeDecorator } from "../../../../.storybook/components";

const storybookMeta: Meta = {
  title: `MUI Components/Data Grid`,
  component: DataGrid,
  argTypes: {
    //
  },
  decorators: [MuiThemeDecorator],
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

const columns: DataGridColumnType<Person>[] = [
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

export const Example: Story<typeof DataGrid> = () => {
  const data = useMemo<Person[]>(
    () => [
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
    ],
    []
  );

  return (
    <DataGrid
      columns={columns}
      data={data}
      getRowId={({ id }) => id}
      hasRowSelection
    />
  );
};
