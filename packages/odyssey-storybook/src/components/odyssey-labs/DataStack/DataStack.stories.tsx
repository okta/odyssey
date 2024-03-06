/*!
 * Copyright (c) 2024-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import {
  Box,
  DataStack,
  DataStackGetDataType,
  DataStackProps,
  Heading5,
  Paragraph,
  Status,
  Support,
} from "@okta/odyssey-react-mui";
import { Card as MuiCard } from "@mui/material";
import { MuiThemeDecorator } from "../../../../.storybook/components";
import { Meta, StoryObj } from "@storybook/react";
import {
  Person,
  data as personData,
} from "../../odyssey-mui/DataTable/personData";
import { DataFilter } from "@okta/odyssey-react-mui/src/labs";

const storybookMeta: Meta<DataStackProps<Person>> = {
  title: "Labs Components/DataStack",
  component: DataStack,
  argTypes: {},
  decorators: [MuiThemeDecorator],
};

export default storybookMeta;

const getData = ({ ...args }: DataStackGetDataType) => {
  let filteredData = personData;
  const { search, filters, page = 1, resultsPerPage = 20 } = args;

  // Implement text-based query filtering
  if (search) {
    filteredData = filteredData.filter((row) =>
      row.name.toString().toLowerCase().includes(search.toLowerCase()),
    );
  }

  // Implement column-specific filtering
  if (filters) {
    filteredData = filteredData.filter((row) => {
      return filters.every(({ id, value }) => {
        // If filter value is null or undefined, skip this filter
        if (value === null || value === undefined) {
          return true;
        }

        // If filter value is array, search for each array value
        if (Array.isArray(value)) {
          return value.some((arrayValue) => {
            return row[id as keyof Person]
              ?.toString()
              .toLowerCase()
              .includes(arrayValue.toString().toLowerCase());
          });
        }

        // General filtering for other columns
        return row[id as keyof Person]
          ?.toString()
          .toLowerCase()
          .includes(value.toString().toLowerCase());
      });
    });
  }

  // Implement pagination
  const startRow = (page - 1) * resultsPerPage;
  const endRow = startRow + resultsPerPage;
  filteredData = filteredData.slice(startRow, endRow);

  return filteredData;
};

export const Default: StoryObj<DataStackProps<Person>> = {
  args: {
    hasPagination: true,
    hasSearch: true,
    layout: "grid",
  },
  render: function C(props) {
    const renderItem = (item: Person) => {
      const severity =
        item.risk === "low"
          ? "success"
          : item.risk === "medium"
            ? "warning"
            : "error";
      return (
        <MuiCard>
          <Support component="div">{item.state}</Support>
          <Heading5 component="div">{item.name}</Heading5>
          <Paragraph color="textSecondary">
            {item.name} lives in {item.city}, {item.state} and is {item.age}{" "}
            years old.
          </Paragraph>
          <Box sx={{ marginBlockStart: 4 }}>
            <Status
              label={`${item.risk.charAt(0).toUpperCase() + item.risk.slice(1)} risk`}
              severity={severity}
            />
          </Box>
        </MuiCard>
      );
    };

    const filters = [
      {
        id: "city",
        label: "City",
        variant: "text",
      },
      {
        id: "state",
        label: "State",
        variant: "text",
      },
      {
        id: "risk",
        label: "Risk level",
        variant: "multi-select",
        options: [
          {
            label: "Low",
            value: "low",
          },
          {
            label: "Medium",
            value: "medium",
          },
          {
            label: "High",
            value: "high",
          },
        ],
      },
    ];

    return (
      <DataStack<Person>
        {...props}
        getData={getData}
        renderItem={renderItem}
        totalItems={personData.length}
        filters={filters as DataFilter[]}
      />
    );
  },
};
