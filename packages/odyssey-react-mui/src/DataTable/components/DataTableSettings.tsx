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

import { Dispatch, SetStateAction, memo } from "react";
import { Checkbox as MuiCheckbox } from "@mui/material";
import { MenuButton } from "../../MenuButton";
import { MenuItem } from "../../MenuItem";
import { ListIcon, ShowIcon } from "../../icons.generated";
import { densityValues } from "../utils/constants";
import { DataTableProps } from "../DataTable";
import { MRT_VisibilityState } from "material-react-table";

export type DataTableSettingsProps = {
  hasChangeableDensity: DataTableProps["hasChangeableDensity"];
  rowDensity: (typeof densityValues)[number];
  setRowDensity: Dispatch<SetStateAction<(typeof densityValues)[number]>>;
  hasColumnVisibility: DataTableProps["hasColumnVisibility"];
  columns: DataTableProps["columns"];
  columnVisibility?: MRT_VisibilityState;
  setColumnVisibility: Dispatch<
    SetStateAction<MRT_VisibilityState | undefined>
  >;
};

const DataTableSettings = ({
  hasChangeableDensity,
  rowDensity,
  setRowDensity,
  hasColumnVisibility,
  columns,
  columnVisibility,
  setColumnVisibility,
}: DataTableSettingsProps) => (
  <>
    {hasChangeableDensity && (
      <MenuButton
        endIcon={<ListIcon />}
        ariaLabel="Table density"
        menuAlignment="right"
        shouldCloseOnSelect={false}
      >
        <>
          {densityValues.map((value: (typeof densityValues)[number]) => (
            <MenuItem
              key={value}
              isSelected={rowDensity === value}
              onClick={() => setRowDensity(value)}
            >
              {`${value.charAt(0).toUpperCase()}${value.slice(1)}`}
            </MenuItem>
          ))}
        </>
      </MenuButton>
    )}

    {hasColumnVisibility && (
      <MenuButton
        endIcon={<ShowIcon />}
        ariaLabel="Show/hide columns"
        menuAlignment="right"
        shouldCloseOnSelect={false}
      >
        <>
          {columns
            .filter((column) => column.enableHiding !== false)
            .map((column) => (
              <MenuItem
                key={column.accessorKey}
                onClick={() => {
                  const columnId = column.id as string;
                  setColumnVisibility((prevVisibility) => ({
                    ...prevVisibility,
                    [columnId]: prevVisibility
                      ? !prevVisibility[columnId]
                      : true,
                  }));
                }}
              >
                <MuiCheckbox
                  checked={
                    columnVisibility
                      ? columnVisibility[column.accessorKey as string] !== false
                      : false
                  }
                />
                {column.header}
              </MenuItem>
            ))}
        </>
      </MenuButton>
    )}
  </>
);
const MemoizedDataTableSettings = memo(DataTableSettings);
export { MemoizedDataTableSettings as DataTableSettings };
