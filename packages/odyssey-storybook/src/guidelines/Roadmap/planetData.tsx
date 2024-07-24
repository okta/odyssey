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

import {
  DataTableColumn,
  DataTableRowData,
  Status,
} from "@okta/odyssey-react-mui";

export type Planet = {
  id: number;
  name: string;
  distance: number;
  visit: "flyby" | "orbit" | "landing";
};

export const columns: DataTableColumn<DataTableRowData>[] = [
  {
    accessorKey: "id",
    header: "Number",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "distance",
    header: "Distance from Sun (AU)",
  },
  {
    accessorKey: "visit",
    header: "Type of visit",
    filterVariant: "select",
    Cell: ({ cell }) => {
      const value = cell.getValue<string>();
      const severity =
        value === "landing"
          ? "success"
          : value === "orbit"
            ? "warning"
            : "error";
      return (
        <Status
          label={value.charAt(0).toUpperCase() + value.slice(1)}
          severity={severity}
        />
      );
    },
    filterSelectOptions: [
      {
        label: "Flyby",
        value: "Flyby",
      },
      {
        label: "Orbit",
        value: "orbit",
      },
      {
        label: "Landing",
        value: "landing",
      },
    ],
  },
];

export const data: Planet[] = [
  {
    id: 1,
    name: "Mercury",
    distance: 0.4,
    visit: "landing",
  },
  {
    id: 2,
    name: "Venus",
    distance: 0.7,
    visit: "landing",
  },
  {
    id: 3,
    name: "Earth",
    distance: 1.0,
    visit: "landing",
  },
  {
    id: 4,
    name: "Mars",
    distance: 1.5,
    visit: "landing",
  },
  {
    id: 5,
    name: "Jupiter",
    distance: 5.2,
    visit: "orbit",
  },
  {
    id: 6,
    name: "Saturn",
    distance: 9.6,
    visit: "landing",
  },
  {
    id: 7,
    name: "Uranus",
    distance: 19.2,
    visit: "flyby",
  },
  {
    id: 8,
    name: "Neptune",
    distance: 30.0,
    visit: "flyby",
  },
  {
    id: 9,
    name: "Pluto",
    distance: 39.5,
    visit: "flyby",
  },
];
