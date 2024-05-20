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
  DataTableRowData,
  Status,
  statusSeverityValues,
  Tooltip,
} from "@okta/odyssey-react-mui";
import { DataTableColumn } from "@okta/odyssey-react-mui";
import { useMemo } from "react";

import rawData from "./roadmap.json";
export const data: OdysseyComponent[] = rawData as OdysseyComponent[];

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
      const severityMap = useMemo(
        () =>
          new Map<string, (typeof statusSeverityValues)[number]>([
            ["Released", "success"],
            ["In Labs", "warning"],
            ["In progress", "default"],
            ["Not started", "error"],
          ]),
        [],
      );
      const severity = severityMap.get(statusValue) || "default";

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
      if (defineValue === "In progress") {
        tooltipText += "Project definition in progress";
      }
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
    header: "Deliverable timing",
    enableHiding: false,
    size: 200,
  },
];
