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

import { Dispatch, SetStateAction, memo, useCallback, useMemo } from "react";
import { Checkbox as MuiCheckbox } from "@mui/material";
import { MenuButton, MenuItem } from "../Buttons";
import { ListIcon, ShowIcon } from "../icons.generated";
import { densityValues } from "./constants";
import { DataTableProps } from "./DataTable";
import { MRT_VisibilityState } from "material-react-table";
import { useTranslation } from "react-i18next";

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
}: DataTableSettingsProps) => {
  const { t } = useTranslation();

  const changeRowDensity = useCallback(
    (value: (typeof densityValues)[number]) =>
      (_event: React.MouseEvent<HTMLLIElement>) => {
        // This is necessary to avoid linter errors, while the _event is necessary to satisfy the onClick type
        if (process.env.NODE_ENV === "development") console.debug(_event);

        setRowDensity(value);
      },
    [setRowDensity],
  );

  const changeColumnVisibility = useCallback(
    (columnId: string) => (_event: React.MouseEvent<HTMLLIElement>) => {
      // This is necessary to avoid linter errors, while the _event is necessary to satisfy the onClick type
      if (process.env.NODE_ENV === "development") console.debug(_event);

      setColumnVisibility((prevVisibility) => ({
        ...prevVisibility,
        [columnId]: prevVisibility ? prevVisibility[columnId] === false : false,
      }));
    },
    [setColumnVisibility],
  );

  const isColumnVisibilityChecked = useMemo(() => {
    return columns.reduce(
      (acc, column) => {
        const isChecked = columnVisibility
          ? columnVisibility[column.accessorKey!] !== false
          : true;
        acc[column.accessorKey!] = isChecked;
        return acc;
      },
      {} as Record<string, boolean>,
    );
  }, [columns, columnVisibility]);

  return (
    <>
      {hasChangeableDensity && (
        <MenuButton
          endIcon={<ListIcon />}
          ariaLabel={t("table.density.arialabel")}
          menuAlignment="right"
          shouldCloseOnSelect={false}
        >
          <>
            {densityValues.map((value: (typeof densityValues)[number]) => (
              <MenuItem
                key={value}
                isSelected={rowDensity === value}
                onClick={changeRowDensity(value)}
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
          ariaLabel={t("table.columnvisibility.arialabel")}
          menuAlignment="right"
          shouldCloseOnSelect={false}
        >
          <>
            {columns
              .filter((column) => column.enableHiding !== false)
              .map((column) => (
                <MenuItem
                  key={column.accessorKey}
                  onClick={changeColumnVisibility(column.id as string)}
                >
                  <MuiCheckbox
                    checked={isColumnVisibilityChecked[column.accessorKey!]}
                  />
                  {column.header}
                </MenuItem>
              ))}
          </>
        </MenuButton>
      )}
    </>
  );
};

const MemoizedDataTableSettings = memo(DataTableSettings);
MemoizedDataTableSettings.displayName = "DataTableSettings";

export { MemoizedDataTableSettings as DataTableSettings };
