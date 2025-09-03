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

import { MRT_Row, MRT_RowData } from "material-react-table";
import { Fragment, memo, ReactElement, useCallback } from "react";
import { useTranslation } from "react-i18next";

import { Button, MenuButtonProps, MenuItem } from "../../Buttons/index.js";
import {
  ArrowBottomIcon,
  ArrowDownIcon,
  ArrowTopIcon,
  ArrowUpIcon,
} from "../../icons.generated/index.js";
import { DataTableProps } from "./DataTable.js";

// Rows coming from TableLayoutContent will be in the MRT-expected row format,
// while rows coming from CardLayoutContent will be pure data
type RowOrTableRow<TData extends MRT_RowData> = MRT_Row<TData> | TData;

export type RowActionsProps<TData extends MRT_RowData> = {
  isRowReorderingDisabled?: boolean;
  row: RowOrTableRow<TData>;
  rowActionButtons?: (
    row?: TData,
  ) => ReactElement<typeof Button> | ReactElement<typeof Fragment>;
  rowActionMenuItems?: (row: TData) => MenuButtonProps["children"];
  rowIndex: number;
  totalRows?: DataTableProps<TData>["totalRows"];
  updateRowOrder?: ({
    newRowIndex,
    rowId,
  }: {
    newRowIndex: number;
    rowId: string;
  }) => void;
};

const RowActions = <TData extends MRT_RowData>({
  isRowReorderingDisabled,
  row: incomingRow,
  rowActionMenuItems,
  rowIndex,
  totalRows,
  updateRowOrder,
}: RowActionsProps<TData>) => {
  const { t } = useTranslation();

  const row = (
    incomingRow.original ? incomingRow.original : incomingRow
  ) as TData & { id: string };

  const handleToFrontClick = useCallback(() => {
    if (updateRowOrder) {
      updateRowOrder({ rowId: row.id, newRowIndex: 0 });
    }
  }, [row.id, updateRowOrder]);

  const handleForwardClick = useCallback(() => {
    if (updateRowOrder) {
      updateRowOrder({ rowId: row.id, newRowIndex: Math.max(0, rowIndex - 1) });
    }
  }, [row.id, rowIndex, updateRowOrder]);

  const handleBackwardClick = useCallback(() => {
    if (updateRowOrder) {
      updateRowOrder({ rowId: row.id, newRowIndex: rowIndex + 1 });
    }
  }, [row.id, rowIndex, updateRowOrder]);

  const handleToBackClick = useCallback(() => {
    if (updateRowOrder) {
      updateRowOrder({
        rowId: row.id,
        newRowIndex: totalRows ? totalRows - 1 : rowIndex,
      });
    }
  }, [row.id, rowIndex, totalRows, updateRowOrder]);

  return (
    <>
      {rowActionMenuItems && rowActionMenuItems(row)}
      {rowActionMenuItems && updateRowOrder && <hr />}
      {updateRowOrder && (
        <>
          <MenuItem
            isDisabled={rowIndex <= 0 || isRowReorderingDisabled}
            onClick={handleToFrontClick}
          >
            <ArrowTopIcon /> {t("table.reorder.tofront")}
          </MenuItem>
          <MenuItem
            isDisabled={rowIndex <= 0 || isRowReorderingDisabled}
            onClick={handleForwardClick}
          >
            <ArrowUpIcon /> {t("table.reorder.forward")}
          </MenuItem>
          <MenuItem
            isDisabled={
              (totalRows ? rowIndex >= totalRows - 1 : false) ||
              isRowReorderingDisabled
            }
            onClick={handleBackwardClick}
          >
            <ArrowDownIcon /> {t("table.reorder.backward")}
          </MenuItem>
          {totalRows && (
            <MenuItem
              isDisabled={rowIndex >= totalRows - 1 || isRowReorderingDisabled}
              onClick={handleToBackClick}
            >
              <ArrowBottomIcon /> {t("table.reorder.toback")}
            </MenuItem>
          )}
        </>
      )}
    </>
  );
};

const MemoizedRowActions = memo(RowActions);
MemoizedRowActions.displayName = "RowActions";

export { MemoizedRowActions as RowActions };
