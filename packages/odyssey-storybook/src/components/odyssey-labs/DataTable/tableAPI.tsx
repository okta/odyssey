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

import { faker } from "@faker-js/faker";
import { Status } from "@okta/odyssey-react-mui";
import { DataColumn } from "@okta/odyssey-react-mui/labs";

export type Person = {
  order: number;
  id: string;
  name: string;
  city: string;
  state: string;
  age: number;
  risk: "high" | "medium" | "low";
};

export const columns: DataColumn[] = [
  {
    accessorKey: "order",
    header: "Original order",
    enableColumnFilter: false,
    size: 120,
  },
  {
    accessorKey: "name",
    header: "Name",
    enableHiding: false,
  },
  {
    accessorKey: "city",
    header: "City",
  },
  {
    accessorKey: "state",
    header: "State",
  },
  {
    accessorKey: "age",
    header: "Age",
    filterVariant: "number",
    size: 80,
  },
  {
    accessorKey: "risk",
    header: "Risk level",
    Cell: ({ cell }) => {
      const value = cell.getValue<string>();
      const severity =
        value === "low" ? "success" : value === "medium" ? "warning" : "error";
      return (
        <Status
          label={value.charAt(0).toUpperCase() + value.slice(1)}
          severity={severity}
          variant="pill"
        />
      );
    },
    filterVariant: "checkbox",
    filterSelectOptions: [
      {
        text: "Low",
        value: "low",
      },
      {
        text: "Medium",
        value: "medium",
      },
      {
        text: "High",
        value: "high",
      },
    ],
  },
];

const generatePerson = (index: number): Person => ({
  order: index,
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  city: faker.location.city(),
  state: faker.location.state(),
  age: faker.datatype.number({ min: 18, max: 99 }),
  risk: faker.helpers.arrayElement(["high", "medium", "low"]),
});

export const data: Person[] = Array.from({ length: 200 }, (_, index) =>
  generatePerson(index)
);
