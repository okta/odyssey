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

import { Status } from "@okta/odyssey-react-mui";
import { DataColumn } from "@okta/odyssey-react-mui";

export type OdysseyComponent = {
  name: string;
  status: "Fully released" | "In Labs" | "In progress" | "Not started";
  startDate: string;
  labsRelease: string;
  fullRelease: string;
};

export const columns: DataColumn[] = [
  {
    accessorKey: "name",
    header: "Name",
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: "Status",
    Cell: ({ cell }) => {
      const value = cell.getValue<string>();
      const severity =
        value === "Fully released"
          ? "success"
          : value === "In Labs"
            ? "warning"
            : value === "In progress"
              ? "default"
              : value === "Not started"
                ? "error"
                : "default";
      return <Status label={value} severity={severity} />;
    },
  },
  {
    accessorKey: "startDate",
    header: "Start date",
    //@ts-expect-error need to address typing here
    Cell: ({ cell }) => {
      return cell.getValue() ? cell.getValue() : "—";
    },
  },
  {
    accessorKey: "labsRelease",
    header: "Available in Odyssey Labs",
    //@ts-expect-error need to address typing here
    Cell: ({ cell }) => {
      return cell.getValue() ? cell.getValue() : "—";
    },
  },
  {
    accessorKey: "fullRelease",
    header: "Available in full release",
    //@ts-expect-error need to address typing here
    Cell: ({ cell }) => {
      return cell.getValue() ? cell.getValue() : "—";
    },
  },
];

export const data: OdysseyComponent[] = [
  {
    name: "Date picker",
    status: "In Labs",
    startDate: "Oct '22",
    labsRelease: "Oct '22",
    fullRelease: "",
  },
  {
    name: "Data filters",
    status: "In Labs",
    startDate: "Sep '23",
    labsRelease: "Nov '23",
    fullRelease: "Jan '24",
  },
  {
    name: "Data table",
    status: "In Labs",
    startDate: "Sep '23",
    labsRelease: "Nov '23",
    fullRelease: "Jan '24",
  },
  {
    name: "Accordion",
    status: "In Labs",
    startDate: "Oct '23",
    labsRelease: "Oct '23",
    fullRelease: "Dec '23",
  },

  {
    name: "Badge",
    status: "In progress",
    startDate: "Oct '23",
    labsRelease: "Dec '23",
    fullRelease: "",
  },
  {
    name: "Tile",
    status: "In progress",
    startDate: "Oct '23",
    labsRelease: "Dec '23",
    fullRelease: "",
  },
  {
    name: "Hint text for checkbox/radio",
    status: "In progress",
    startDate: "Nov '23",
    labsRelease: "",
    fullRelease: "Dec '23",
  },
  {
    name: "Links in hint text",
    status: "In progress",
    startDate: "Nov '23",
    labsRelease: "",
    fullRelease: "Dec '23",
  },
  {
    name: "Drawer",
    status: "In progress",
    startDate: "Dec '23",
    labsRelease: "Jan '24",
    fullRelease: "",
  },
  {
    name: "Inline inputs",
    status: "In progress",
    startDate: "Dec '23",
    labsRelease: "",
    fullRelease: "",
  },
  {
    name: "Gray background",
    status: "In progress",
    startDate: "Dec '23",
    labsRelease: "",
    fullRelease: "",
  },
  {
    name: "Navigation",
    status: "Not started",
    startDate: "Dec '23",
    labsRelease: "",
    fullRelease: "",
  },
  {
    name: "Toggle",
    status: "Not started",
    startDate: "Dec '23",
    labsRelease: "Dec '23",
    fullRelease: "Jan '23",
  },
  {
    name: "Data list",
    status: "Not started",
    startDate: "Jan '24",
    labsRelease: "Feb '24",
    fullRelease: "",
  },
  {
    name: "Horizontal stepper/wizard pattern",
    status: "Not started",
    startDate: "Jan '24",
    labsRelease: "",
    fullRelease: "",
  },
  {
    name: "Vertical stepper pattern",
    status: "Not started",
    startDate: "Jan '24",
    labsRelease: "",
    fullRelease: "",
  },
  {
    name: "Configuration screen pattern",
    status: "Not started",
    startDate: "",
    labsRelease: "",
    fullRelease: "",
  },
  {
    name: "Help/support pattern",
    status: "Not started",
    startDate: "",
    labsRelease: "",
    fullRelease: "",
  },
  {
    name: "Page templates",
    status: "Not started",
    startDate: "",
    labsRelease: "",
    fullRelease: "",
  },
  {
    name: "Panel",
    status: "Not started",
    startDate: "",
    labsRelease: "",
    fullRelease: "",
  },
  {
    name: "Primary actions area",
    status: "Not started",
    startDate: "",
    labsRelease: "",
    fullRelease: "",
  },
];
