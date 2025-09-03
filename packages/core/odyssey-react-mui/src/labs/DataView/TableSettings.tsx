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

import { Checkbox as MuiCheckbox } from "@mui/material";
import { MRT_DensityState, MRT_RowData } from "material-react-table";
import { Dispatch, memo, SetStateAction, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { MenuButton, MenuItem } from "../../Buttons/index.js";
import { ListIcon, ShowIcon } from "../../icons.generated/index.js";
import { TableLayoutProps, TableState } from "./componentTypes.js";
import { densityValues } from "./constants.js";

export type TableSettingsProps<TData extends MRT_RowData> = {
  setTableState: Dispatch<SetStateAction<TableState>>;
  tableLayoutOptions: TableLayoutProps<TData>;
  tableState: TableState;
};

type TableSettingsComponent = (<TData extends MRT_RowData>(
  props: TableSettingsProps<TData>,
) => JSX.Element) & {
  displayName?: string;
};

const TableSettings: TableSettingsComponent = <TData extends MRT_RowData>({
  setTableState,
  tableLayoutOptions,
  tableState,
}: TableSettingsProps<TData>) => {
  const { t } = useTranslation();

  const { hasChangeableDensity, hasColumnVisibility, columns } =
    tableLayoutOptions;
  const { rowDensity, columnVisibility } = tableState;

  const changeRowDensity = useCallback<(value: MRT_DensityState) => void>(
    (value) => {
      setTableState((prevState) => ({
        ...prevState,
        rowDensity: value,
      }));
    },
    [setTableState],
  );

  const changeColumnVisibility = useCallback<(columnId: string) => void>(
    (columnId) => {
      setTableState((prevState) => ({
        ...prevState,
        columnVisibility: {
          ...prevState.columnVisibility,
          [columnId]: prevState.columnVisibility
            ? prevState.columnVisibility[columnId] === false
            : false,
        },
      }));
    },
    [setTableState],
  );

  const visibleColumns = useMemo(
    () =>
      new Set(
        columns
          .filter((column) =>
            columnVisibility
              ? columnVisibility[column.accessorKey!] !== false
              : true,
          )
          .map((column) => column.accessorKey!),
      ),
    [columns, columnVisibility],
  );

  const memoizedDensityMenu = useMemo(
    () =>
      hasChangeableDensity && (
        <MenuButton
          ariaLabel={t("table.density.arialabel")}
          endIcon={<ListIcon />}
          menuAlignment="right"
          shouldCloseOnSelect={false}
        >
          {densityValues.map((value) => (
            <MenuItem
              isSelected={rowDensity === value}
              key={value}
              onClick={() => changeRowDensity(value)}
            >
              {t(`table.density.${value}`)}
            </MenuItem>
          ))}
        </MenuButton>
      ),
    [hasChangeableDensity, t, rowDensity, changeRowDensity],
  );

  const memoizedColumnVisibilityMenu = useMemo(
    () =>
      hasColumnVisibility && (
        <MenuButton
          ariaLabel={t("table.columnvisibility.arialabel")}
          endIcon={<ShowIcon />}
          menuAlignment="right"
          shouldCloseOnSelect={false}
        >
          {columns
            .filter((column) => Boolean(column.enableHiding !== false))
            .map((column) => (
              <MenuItem
                key={column.accessorKey}
                onClick={() => changeColumnVisibility(column.id!)}
              >
                <MuiCheckbox checked={visibleColumns.has(column.id!)} />
                {column.header}
              </MenuItem>
            ))}
        </MenuButton>
      ),
    [hasColumnVisibility, t, columns, changeColumnVisibility, visibleColumns],
  );

  return (
    <>
      {memoizedDensityMenu}
      {memoizedColumnVisibilityMenu}
    </>
  );
};

const MemoizedTableSettings = memo(TableSettings) as TableSettingsComponent;
MemoizedTableSettings.displayName = "TableSettings";

export { MemoizedTableSettings as TableSettings };
