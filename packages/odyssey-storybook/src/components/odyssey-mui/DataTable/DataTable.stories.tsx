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

import { MuiThemeDecorator } from "../../../../.storybook/components";
import {
  Box,
  Button,
  DataTable,
  MenuItem,
  densityValues,
  paginationTypeValues,
} from "@okta/odyssey-react-mui";

import { TableColumn } from "@okta/odyssey-react-mui/labs";
import {
  columns as clientColumns,
  data as clientData,
} from "./clientTableData";

const storybookMeta: Meta = {
  title: "Labs Components/DataTable",
  component: DataTable,
  argTypes: {
    defaultDensity: {
      options: densityValues,
      control: { type: "radio" },
      description: "The default table density.",
      table: {
        type: {
          summary: densityValues.join(" | "),
        },
        defaultValue: {
          summary: "comfortable",
        },
      },
    },
    hasChangeableDensity: {
      control: "boolean",
      description:
        "If `true`, the end user will be able to change the table density via the settings dialog.",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    hasColumnResizing: {
      control: "boolean",
      description:
        "If `true`, the end user will be able to change the width of each column.",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    hasColumnVisibility: {
      control: "boolean",
      description:
        "If `true`, the end user will be able to show and hide columns via the settings dialog.",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    hasFilters: {
      control: "boolean",
      description: "If `true`, the table will include column filters.",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    hasPagination: {
      control: "boolean",
      description: "If `true`, the table will include pagination controls.",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    hasRowSelection: {
      control: "boolean",
      description:
        "If `true`, each row will include a checkbox. If rows are selected, an additional set of bulk actions will be exposed.",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    hasSearch: {
      control: "boolean",
      description: "If `true`, the table will include a search interface.",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    hasSorting: {
      control: "boolean",
      description: "If `true`, the table columns will be sortable.",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    paginationType: {
      options: paginationTypeValues,
      control: { type: "radio" },
      description: "The type of pagination controls.",
      table: {
        type: {
          summary: paginationTypeValues.join(" | "),
        },
        defaultValue: {
          summary: "paged",
        },
      },
    },
    errorMessage: {
      control: "text",
      description: "The error message.",
      table: {
        type: {
          summary: "string",
        },
        defaultValue: "",
      },
    },
    resultsPerPage: {
      control: "number",
      description: "The number of results per page of pagination.",
      table: {
        type: {
          summary: "number",
        },
        defaultValue: "20",
      },
    },
    hasBulkActions: {
      name: "STORY ONLY: Include bulk actions",
      control: "boolean",
      description:
        "Include a slot with buttons that appear when 1+ rows is selected.",
    },
    hasBulkMenuItems: {
      name: "STORY ONLY: Include bulk menu items",
      control: "boolean",
      description:
        "Include a slot for menu items that appear in a dropdown menu when 1+ rows is selected.",
    },
    clientOrServer: {
      name: "STORY ONLY: Data source",
      control: "radio",
      options: ["client", "server"],
      description:
        "Whether the table's data is coming from a client-side variable, or an API call to a server.",
    },
  },
  args: {
    defaultDensity: "comfortable",
    hasChangeableDensity: false,
    hasColumnResizing: false,
    hasColumnVisibility: false,
    hasFilters: false,
    hasPagination: false,
    hasRowSelection: false,
    hasSearch: false,
    hasSorting: false,
    paginationType: "paged",
    errorMessage: undefined,
    resultsPerPage: 20,
    hasBulkActions: false,
    hasBulkMenuItems: false,
    clientOrServer: "client",
  },
  decorators: [MuiThemeDecorator],
};

export default storybookMeta;

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  eyeColor: string;
};

const serverColumns: TableColumn<User>[] = [
  {
    accessorKey: "firstName",
    header: "First name",
  },
  {
    accessorKey: "lastName",
    header: "Last name",
  },
  {
    accessorKey: "age",
    header: "Age",
  },
  {
    accessorKey: "eyeColor",
    header: "Eye color",
    Cell: ({ cell }) => (
      <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
        <Box
          sx={{
            width: 16,
            height: 16,
            borderRadius: 16,
            backgroundColor: `${
              cell.getValue<string>() === "Amber"
                ? "darkorange"
                : cell.getValue<string>().toLowerCase()
            }`,
          }}
        />{" "}
        {cell.getValue()}
      </Box>
    ),
  },
];

const bulkActions = () => (
  <>
    <Button label="Button 1" variant="tertiary" size="small" />
    <Button label="Button 2" variant="tertiary" size="small" />
  </>
);

const bulkMenuItems = () => (
  <>
    <MenuItem>Action 1</MenuItem>
    <MenuItem>Action 2</MenuItem>
    <MenuItem>Action 3</MenuItem>
  </>
);

const fetchData = async (values: {
  page: number;
  resultsPerPage: number;
  search?: string;
}) => {
  const url = new URL(
    `https://dummyjson.com/users${values.search ? "/search" : ""}`
  );
  url.searchParams.set("limit", `${values.resultsPerPage}`);
  url.searchParams.set("skip", `${values.resultsPerPage * (values.page - 1)}`);
  if (values.search) {
    url.searchParams.set("q", values.search);
  }

  const response = await fetch(url.href);
  const json = await response.json();

  return json.users.map((user: User) => {
    return {
      id: user.id.toString(),
      firstName: user.firstName,
      lastName: user.lastName,
      age: user.age,
      eyeColor: user.eyeColor,
    };
  });
};

export const Default: StoryObj = {
  render: function C(args) {
    return (
      <DataTable
        columns={
          args.clientOrServer === "client" ? clientColumns : serverColumns
        }
        data={args.clientOrServer === "client" ? clientData.slice(0, 10) : []}
        defaultDensity={args.defaultDensity}
        getRowId={({ id }) => id}
        hasChangeableDensity={args.hasChangeableDensity}
        hasColumnResizing={args.hasColumnResizing}
        hasColumnVisibility={args.hasColumnVisibility}
        hasFilters={args.hasFilters}
        hasPagination={args.hasPagination}
        hasRowSelection={args.hasRowSelection}
        hasSearch={args.hasSearch}
        hasSorting={args.hasSorting}
        paginationType={args.paginationType}
        bulkActions={args.hasBulkActions && bulkActions}
        bulkMenuItems={args.hasBulkMenuItems && bulkMenuItems}
        errorMessage={args.errorMessage}
        resultsPerPage={args.resultsPerPage}
        manualData={args.clientOrServer === "server"}
        onFetchData={args.clientOrServer === "server" && fetchData}
      />
    );
  },
};

export const ColumnFeatures: StoryObj = {
  ...Default,
  args: {
    hasColumnSorting: true,
    hasColumnVisibility: true,
    hasColumnResizing: true,
  },
};

export const TableDensity: StoryObj = {
  ...Default,
  args: {
    hasColumnSorting: true,
    hasColumnVisibility: true,
    hasColumnResizing: true,
    hasChangeableDensity: true,
  },
};

export const RowSelectionWithMenu: StoryObj = {
  ...Default,
  args: {
    hasRowSelection: true,
    hasBulkMenuItems: true,
  },
};

export const RowSelectionWithActions: StoryObj = {
  ...Default,
  args: {
    hasRowSelection: true,
    hasBulkActions: true,
  },
};

export const RowSelectionWithMenuAndActions: StoryObj = {
  ...Default,
  args: {
    hasRowSelection: true,
    hasBulkActions: true,
    hasBulkMenuItems: true,
  },
};

export const FilterAndSearch: StoryObj = {
  ...Default,
  args: {
    hasFilters: true,
    hasSearch: true,
  },
};

export const ServerData: StoryObj = {
  ...Default,
  args: {
    resultsPerPage: 8,
    clientOrServer: "server",
    hasSearch: true,
    hasPagination: true,
  },
};

export const LoadMorePagination: StoryObj = {
  ...Default,
  args: {
    resultsPerPage: 8,
    clientOrServer: "server",
    hasSearch: true,
    hasPagination: true,
    paginationType: "loadMore",
  },
};

export const KitchenSink: StoryObj = {
  ...Default,
  args: {
    hasChangeableDensity: true,
    hasColumnResizing: true,
    hasColumnVisibility: true,
    hasFilters: true,
    hasPagination: true,
    hasRowSelection: true,
    hasSearch: true,
    hasSorting: true,
    paginationType: "paged",
    errorMessage: "This is an error.",
    resultsPerPage: 20,
    hasBulkActions: true,
    hasBulkMenuItems: true,
    clientOrServer: "client",
  },
};
