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

import { DataTableRowData, Status, Tooltip } from "@okta/odyssey-react-mui";
import { DataTableColumn } from "@okta/odyssey-react-mui";

export type OdysseyComponent = {
  name: string;
  type: string;
  status: "" | "Released" | "In Labs" | "In progress" | "Not started";
  define: string;
  design: string;
  develop: string;
  deliverableTiming: string;
};

export const columns: DataTableColumn<DataTableRowData>[] = [
  {
    accessorKey: "name",
    header: "Name",
    enableHiding: false,
    size: 325,
  },
  {
    accessorKey: "type",
    header: "Type",
    enableHiding: true,
    size: 200,
  },
  {
    accessorKey: "status",
    header: "Status",
    size: 200,
    Cell: ({ cell, row }) => {
      const statusValue = cell.getValue<string>();
      const defineValue = row.original.define;
      const designValue = row.original.design;
      const developValue = row.original.develop;
      const severity =
        statusValue === "Released"
          ? "success"
          : statusValue === "In Labs"
            ? "warning"
            : statusValue === "In progress"
              ? "default"
              : statusValue === "Not started"
                ? "error"
                : "default";

      // First priority: Check if the define stage is "In Progress"
      if (defineValue === "In Progress") {
        // Return a Tooltip specifically for this condition and do nothing else
        return (
          <Tooltip
            ariaType="label"
            placement="top"
            text="Planning and research in progress"
          >
            <Status
              label="Planning and research in progress"
              severity={severity}
            />
          </Tooltip>
        );
      }

      // If defineValue is not "In Progress", then proceed with this logic:
      let tooltipText = "";
      if (["Complete", "In progress"].includes(designValue)) {
        tooltipText += "Design: " + designValue + " ";
      }
      if (["Complete", "In progress"].includes(developValue)) {
        tooltipText += "Develop: " + developValue;
      }

      // Only show the tooltip if there's relevant information to display
      if (tooltipText && statusValue !== "Released") {
        return (
          <Tooltip ariaType="label" placement="top" text={tooltipText.trim()}>
            <Status label={statusValue} severity={severity} />
          </Tooltip>
        );
      }

      // If there is no relevant tooltip text, just show the status without any tooltip
      return <Status label={statusValue} severity={severity} />;
    },
  },

  {
    accessorKey: "deliverableTiming",
    header: "Expected",
    enableHiding: false,
    size: 200,
  },
];

export const data: OdysseyComponent[] = [
  {
    name: "Accordion",
    type: "Component",
    status: "Released",
    define: "Complete",
    design: "Complete",
    develop: "In progress",
    deliverableTiming: "Q2 FY25",
  },
  {
    name: "Autocomplete",
    type: "Component",
    status: "Released",
    define: "Complete",
    design: "Complete",
    develop: "Complete",
    deliverableTiming: "Q1 FY25",
  },
  {
    name: "Badge",
    type: "Component",
    status: "Released",
    define: "Complete",
    design: "Complete",
    develop: "Complete",
    deliverableTiming: "Q2 FY25",
  },
  {
    name: "Banner",
    type: "Component",
    status: "Released",
    define: "Complete",
    design: "Complete",
    develop: "Complete",
    deliverableTiming: "Q2 FY25",
  },
  {
    name: "Breadcrumbs",
    type: "Component",
    status: "Released",
    define: "Complete",
    design: "Complete",
    develop: "Complete",
    deliverableTiming: "FY24",
  },
  {
    name: "Button",
    type: "Component",
    status: "Released",
    define: "Complete",
    design: "Complete",
    develop: "Complete",
    deliverableTiming: "FY24",
  },
  {
    name: "Callout",
    type: "Component",
    status: "Released",
    define: "Complete",
    design: "Complete",
    develop: "Complete",
    deliverableTiming: "Q1 FY25",
  },
  {
    name: "Card (tile?)",
    type: "Component",
    status: "In Labs",
    define: "In Labs",
    design: "In Labs",
    develop: "In Labs",
    deliverableTiming: "TBD",
  },
  {
    name: "Checkbox and checkbox group",
    type: "Component",
    status: "Released",
    define: "Complete",
    design: "Complete",
    develop: "Complete",
    deliverableTiming: "FY24",
  },
  {
    name: "Circular progress",
    type: "Component",
    status: "Released",
    define: "Complete",
    design: "Complete",
    develop: "Complete",
    deliverableTiming: "FY24",
  },
  {
    name: "Dashboard",
    type: "Component",
    status: "Not started",
    define: "Not started",
    design: "Not started",
    develop: "Not started",
    deliverableTiming: "Q2 FY25",
  },
  {
    name: "Data stack (data list, resource list?)",
    type: "Component",
    status: "Not started",
    define: "In progress",
    design: "Not started",
    develop: "Not started",
    deliverableTiming: "Q2 FY25",
  },
  {
    name: "Data table",
    type: "Component",
    status: "Released",
    define: "Complete",
    design: "Complete",
    develop: "Complete",
    deliverableTiming: "Q1 FY25",
  },
  {
    name: "Date picker",
    type: "Component",
    status: "In Labs",
    define: "In progress",
    design: "In progress",
    develop: "In progress",
    deliverableTiming: "Q2 FY25",
  },
  {
    name: "Dialog",
    type: "Component",
    status: "Released",
    define: "Complete",
    design: "Complete",
    develop: "Complete",
    deliverableTiming: "FY24",
  },
  {
    name: "Drawer",
    type: "Component",
    status: "Released",
    define: "Complete",
    design: "Complete",
    develop: "Complete",
    deliverableTiming: "Q1 FY25",
  },
  {
    name: "Duration picker\n(or fieldset)",
    type: "Component",
    status: "Not started",
    define: "Not started",
    design: "Not started",
    develop: "Not started",
    deliverableTiming: "Q2 FY25",
  },
  {
    name: "Empty states v1 (no illustration)",
    type: "Component",
    status: "In progress",
    define: "Complete",
    design: "Complete",
    develop: "Complete",
    deliverableTiming: "Q2 FY25",
  },
  {
    name: "Empty states v2 (illustration)",
    type: "Component",
    status: "Not started",
    define: "Not started",
    design: "Not started",
    develop: "Not started",
    deliverableTiming: "Q3 FY25",
  },
  {
    name: "Fieldset",
    type: "Component",
    status: "Released",
    define: "Complete",
    design: "Complete",
    develop: "Complete",
    deliverableTiming: "FY24",
  },
  {
    name: "File uploader",
    type: "Component",
    status: "In Labs",
    define: "In Labs",
    design: "In Labs",
    develop: "In Labs",
    deliverableTiming: "Q2 FY25",
  },
  {
    name: "Form",
    type: "Component",
    status: "Released",
    define: "Complete",
    design: "Complete",
    develop: "Complete",
    deliverableTiming: "FY24",
  },
  {
    name: "Form Layout (Advanced)",
    type: "Component",
    status: "In progress",
    define: "In progress",
    design: "-",
    develop: "-",
    deliverableTiming: "Q2 FY25",
  },
  {
    name: "Link",
    type: "Component",
    status: "Released",
    define: "Complete",
    design: "Complete",
    develop: "Complete",
    deliverableTiming: "FY24",
  },
  {
    name: "Log Investigator \n(AI Pattern)",
    type: "Pattern",
    status: "Not started",
    define: "Not started",
    design: "Not started",
    develop: "Not started",
    deliverableTiming: "Q3 FY25",
  },
  {
    name: "Menu button",
    type: "Component",
    status: "Released",
    define: "Complete",
    design: "Complete",
    develop: "Complete",
    deliverableTiming: "FY24",
  },
  {
    name: "Multi-select dropdown",
    type: "Component",
    status: "Complete",
    define: "Complete",
    design: "Complete",
    develop: "Complete",
    deliverableTiming: "TBD",
  },
  {
    name: "Navigation",
    type: "Pattern",
    status: "In progress",
    define: "Complete",
    design: "Complete",
    develop: "In progress",
    deliverableTiming: "Q2 FY25",
  },
  {
    name: "Policy Recommender\n(AI Pattern)",
    type: "Pattern",
    status: "Not started",
    define: "Not started",
    design: "Not started",
    develop: "Not started",
    deliverableTiming: "Q3 FY25",
  },
  {
    name: "Progress Bar",
    type: "Component",
    status: "Not started",
    define: "Not started",
    design: "Not started",
    develop: "Not started",
    deliverableTiming: "Q3 FY25",
  },
  {
    name: "Radio group",
    type: "Component",
    status: "Released",
    define: "Complete",
    design: "Complete",
    develop: "Complete",
    deliverableTiming: "FY24",
  },
  {
    name: "Search",
    type: "Pattern",
    status: "Not started",
    define: "Not started",
    design: "Not started",
    develop: "Not started",
    deliverableTiming: "TBD",
  },
  {
    name: "Select",
    type: "Component",
    status: "Released",
    define: "Complete",
    design: "Complete",
    develop: "Complete",
    deliverableTiming: "FY24",
  },
  {
    name: "Show all",
    type: "Component",
    status: "Not started",
    define: "Not started",
    design: "Not started",
    develop: "Not started",
    deliverableTiming: "Q3 FY25",
  },
  {
    name: "Status",
    type: "Component",
    status: "Released",
    define: "Complete",
    design: "Complete",
    develop: "Complete",
    deliverableTiming: "FY24",
  },
  {
    name: "Switch",
    type: "Component",
    status: "In Labs",
    define: "In Labs",
    design: "In Labs",
    develop: "In Labs",
    deliverableTiming: "Q1 FY25",
  },
  {
    name: "Tabs",
    type: "Component",
    status: "Released",
    define: "Complete",
    design: "Complete",
    develop: "Complete",
    deliverableTiming: "FY24",
  },
  {
    name: "Tag",
    type: "Component",
    status: "Released",
    define: "Complete",
    design: "Complete",
    develop: "Complete",
    deliverableTiming: "FY24",
  },
  {
    name: "Text field",
    type: "Component",
    status: "Released",
    define: "Complete",
    design: "Complete",
    develop: "Complete",
    deliverableTiming: "FY24",
  },
  {
    name: "Time Picker\n(or field set)",
    type: "Component",
    status: "Not started",
    define: "Not started",
    design: "Not started",
    develop: "Not started",
    deliverableTiming: "Q2 FY25",
  },
  {
    name: "Toast",
    type: "Component",
    status: "Released",
    define: "Complete",
    design: "Complete",
    develop: "Complete",
    deliverableTiming: "FY24",
  },
];
