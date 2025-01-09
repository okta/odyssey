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

import { useMemo } from "react";
import {
  DataTableColumn,
  DataTableRowData,
  Status,
  statusSeverityValues,
  Tooltip,
} from "@okta/odyssey-react-mui";

import rawData from "./roadmap.json";

export type OdysseyComponent = {
  name: string;
  type: string;
  status: "" | "Released" | "In Labs" | "In progress" | "Not started";
  define: string;
  design: string;
  develop: string;
  deliverableTiming: string;
};

export const data: OdysseyComponent[] = rawData as OdysseyComponent[];

const severityMap = new Map<string, (typeof statusSeverityValues)[number]>([
  ["Released", "success"],
  ["In Labs", "warning"],
  ["In progress", "default"],
  ["Not started", "error"],
]);

const getTooltipText = (
  defineValue: string,
  designValue: string,
  developValue: string,
): string => {
  let text = "";
  if (defineValue === "In progress") {
    text += "Project definition in progress";
  }
  if (["Complete", "In progress"].includes(designValue)) {
    text += (text ? " " : "") + "Design: " + designValue;
  }
  if (["Complete", "In progress"].includes(developValue)) {
    text += (text ? " " : "") + "Develop: " + developValue;
  }
  return text.trim();
};

type CellProps = {
  cell: { getValue: () => string };
  row: { original: OdysseyComponent };
};

const StatusCell: React.FC<CellProps> = ({ cell, row }) => {
  const statusValue = cell.getValue();
  const {
    define: defineValue,
    design: designValue,
    develop: developValue,
  } = row.original;

  const severity = useMemo(
    () => severityMap.get(statusValue) || "default",
    [statusValue],
  );
  const tooltipText = useMemo(
    () => getTooltipText(defineValue, designValue, developValue),
    [defineValue, designValue, developValue],
  );

  if (defineValue === "In Progress") {
    return (
      <Tooltip
        ariaType="label"
        placement="top"
        text="Planning and research in progress"
      >
        <Status label="Planning and research in progress" severity={severity} />
      </Tooltip>
    );
  }

  if (tooltipText && statusValue !== "Released") {
    return (
      <Tooltip ariaType="label" placement="top" text={tooltipText}>
        <Status label={statusValue} severity={severity} />
      </Tooltip>
    );
  }

  return <Status label={statusValue} severity={severity} />;
};

export const useColumns = (): DataTableColumn<DataTableRowData>[] => {
  return useMemo(
    () =>
      [
        {
          accessorKey: "name",
          header: "Name",
          enableHiding: false,
          size: 280,
        },
        {
          accessorKey: "type",
          header: "Type",
          enableHiding: true,
          size: 120,
        },
        {
          accessorKey: "status",
          header: "Status",
          size: 115,
          Cell: ({ cell, row }: CellProps) => (
            <StatusCell cell={cell} row={row} />
          ),
        },
        {
          accessorKey: "deliverableTiming",
          header: "Deliverable timing",
          enableHiding: false,
          size: 155,
        },
      ] as DataTableColumn<DataTableRowData>[],
    [],
  );
};
