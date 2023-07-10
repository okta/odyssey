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
import {
  Button,
  TableColumn,
  PaginatedTable,
  PaginatedTableProps,
} from "@okta/odyssey-react-mui";

import { MuiThemeDecorator } from "../../../../.storybook/components";
import { useCallback, useRef, useState } from "react";

const storybookMeta: Meta = {
  title: "MUI Components/Table/Paginated",
  component: PaginatedTable,
  argTypes: {
    columns: {
      control: "array",
    },
    data: {
      control: "object",
    },
    getRowId: {
      control: "function",
    },
    fetchMoreData: {
      control: "function",
    },
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
    onGlobalFilterChange: {
      control: "function",
    },
    onPaginationChange: {
      control: "function",
    },
    onRowSelectionChange: {
      control: "function",
    },
    state: {
      control: "object",
    },
    ToolbarButtons: {
      control: "function",
    },
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

const columns: TableColumn<Person>[] = [
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

export const BasicUsage: StoryObj<PaginatedTableProps<Person>> = {
  args: {
    columns,
    data,
    getRowId: ({ id }: { id: string }) => id,
  },
};

export const Pagination: StoryObj<PaginatedTableProps<Person>> = {
  args: {
    columns,
    data,
    getRowId: ({ id }: { id: string }) => id,
  },
  render: function C(args) {
    const countRef = useRef(15);
    const [data, setData] = useState(args.data.slice(0, countRef.current));

    const fetchMoreData = useCallback(() => {
      countRef.current = countRef.current + 10;

      setData(args.data.slice(0, Math.min(countRef.current, args.data.length)));
    }, [args.data]);

    return (
      <PaginatedTable {...args} data={data} fetchMoreData={fetchMoreData} />
    );
  },
};

export const Selection: StoryObj<PaginatedTableProps<Person>> = {
  args: {
    columns,
    data,
    getRowId: ({ id }: { id: string }) => id,
    hasRowSelection: true,
  },
};

export const CustomToolbar: StoryObj<PaginatedTableProps<Person>> = {
  args: {
    columns,
    data,
    getRowId: ({ id }: { id: string }) => id,
    ToolbarButtons: ({ table }) => (
      <Button
        variant="primary"
        onClick={() => console.info(table.getState())}
        text="New Action"
      />
    ),
  },
};

// const reportColumns: TableColumn<any>[] = [
//   {
//     accessorKey: "name",
//     Cell: ({ cell }) => <Link href="#none">{cell.getValue<string>()}</Link>,
//     header: "Name",
//   },
//   {
//     accessorFn: (object) => object.authenticators,
//     Cell: ({ cell }) => cell.getValue<string[]>().join(", "),
//     header: "Authenticators",
//   },
//   {
//     accessorKey: "createdDate",
//     Cell: ({ cell }) => new Date(cell.getValue<string>()).getFullYear(),
//     header: "Address",
//   },
// ];

// const reportData: any[] = [
//   {
//     login: "login_VCXLG_2@okta.com",
//     email: "testemail_VCXLG_2@okta.com",
//     name: "TestFirstName_2 TestLastName_2",
//     primaryPhone: null,
//     mobilePhone: "555-415-1337",
//     phone: "555-415-1337",
//     status: "ACTIVE",
//     isAdmin: false,
//     authenticators: ["Email", "Password"],
//     authenticatorsCount: 2,
//     groupNames: ["ReportsTestGroup_VCXLG"],
//     createdDate: "2021-06-27T06:11:27.000Z",
//     activationDate: "2021-06-27T06:11:29.000Z",
//   },
//   {
//     login: "login_VCXLG_4@okta.com",
//     email: "testemail_VCXLG_4@okta.com",
//     name: "TestFirstName_4 TestLastName_4",
//     primaryPhone: null,
//     mobilePhone: "555-415-1337",
//     phone: "555-415-1337",
//     status: "ACTIVE",
//     isAdmin: false,
//     authenticators: ["Email", "Password"],
//     authenticatorsCount: 2,
//     groupNames: ["ReportsTestGroup_VCXLG"],
//     createdDate: "2021-06-27T06:11:40.000Z",
//     activationDate: "2021-06-27T06:11:40.000Z",
//   },
//   {
//     login: "login_VCXLG_5@okta.com",
//     email: "testemail_VCXLG_5@okta.com",
//     name: "TestFirstName_5 TestLastName_5",
//     primaryPhone: null,
//     mobilePhone: "555-415-1337",
//     phone: "555-415-1337",
//     status: "ACTIVE",
//     isAdmin: false,
//     authenticators: ["Email", "Password"],
//     authenticatorsCount: 2,
//     groupNames: ["ReportsTestGroup_VCXLG"],
//     createdDate: "2021-06-27T06:11:44.000Z",
//     activationDate: "2021-06-27T06:11:44.000Z",
//   },
//   {
//     login: "login_VCXLG_6@okta.com",
//     email: "testemail_VCXLG_6@okta.com",
//     name: "TestFirstName_6 TestLastName_6",
//     primaryPhone: null,
//     mobilePhone: "555-415-1337",
//     phone: "555-415-1337",
//     status: "ACTIVE",
//     isAdmin: false,
//     authenticators: ["Email", "Password"],
//     authenticatorsCount: 2,
//     groupNames: ["ReportsTestGroup_VCXLG"],
//     createdDate: "2021-06-27T06:11:48.000Z",
//     activationDate: "2021-06-27T06:11:48.000Z",
//   },
//   {
//     login: "login_uEGLa_1@okta.com",
//     email: "testemail_uEGLa_1@okta.com",
//     name: "Johnny Unverified",
//     primaryPhone: null,
//     mobilePhone: "555-415-1337",
//     phone: "555-415-1337",
//     status: "ACTIVE",
//     isAdmin: false,
//     authenticators: ["Email", "Password"],
//     authenticatorsCount: 2,
//     groupNames: ["ReportsTestGroup_uEGLa"],
//     createdDate: "2021-06-27T06:26:57.000Z",
//     activationDate: "2021-06-27T06:26:57.000Z",
//   },
// ];

/*
- Column visibility view w/ filter box at the top because there are so many columns.
- Remove context menu on column headers.
- Add title to header.
- Remove header.
- Add `enableRowVirtualization`.
- Add `onColumnVisibilityChange`.
- Hide firstName column by default `initialState={{ columnVisibility: { firstName: false } }}` PREFERRED TO HAVE HIDDEN PROP ON COLUMN.
- Pass component to expanded row. -- NOT TODAY
- Infinite scroll.
*/
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// export const Reports: StoryObj<TableProps<any>> = {
//   args: {
//     columns: reportColumns,
//     data: reportData,
//   },
// };

/*
- Pagination, but no known item count.
- Sorting
- Custom Sorting
- Row Selection
- Custom Cell Render
- More buttons (3) and search on left
- Search makes an API call
- Other filters outside the table
- Know which rows are selected
- Customized LOADING state -> Progress bar on top of table for loading table data. Want to keep showing old items while loading.
- Customized ERROR state -> "Something went wrong" and "Reload" button to refetch data.
- Customized NO_DATA state -> "No pending review items found" when searching and nothing's there.
- Change size (CSS `flex`, `text-align`, `header-align`) of table cells
- Initial sort state
- Sorting order (multi-sort)
- Row re-ordering. Currently drag 'n drop, but we could also do "type in number" to change row order.
- Expandable row icon on right side
- Custom cell and header types
  - Text Alignment
  - `MenuButton`
  - Date display
- `StaticTable` with virtualization, no pagination, and no footer display nor toolbars.
*/
