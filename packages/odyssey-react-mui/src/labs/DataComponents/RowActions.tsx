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
import { Fragment, ReactElement, memo, useCallback } from "react";
import { Button } from "../../Button";
import { MenuItem } from "../../MenuItem";
import { MenuButtonProps } from "../../MenuButton";
import {
  ArrowBottomIcon,
  ArrowDownIcon,
  ArrowTopIcon,
  ArrowUpIcon,
} from "../../icons.generated";
import { DataTableProps } from "./DataTable";
import { Trans } from "react-i18next";

export type RowActionsProps = {
  isRowReorderingDisabled?: boolean;
  row: MRT_Row<MRT_RowData> | MRT_RowData;
  rowActionButtons?: (
    row: MRT_RowData,
  ) => ReactElement<typeof Button | typeof Fragment>;
  rowActionMenuItems?: (row: MRT_RowData) => MenuButtonProps["children"];
  rowIndex: number;
  totalRows?: DataTableProps["totalRows"];
  updateRowOrder?: ({
    newRowIndex,
    rowId,
  }: {
    newRowIndex: number;
    rowId: string;
  }) => void;
};

const RowActions = ({
  isRowReorderingDisabled,
  row,
  rowActionMenuItems,
  rowIndex,
  totalRows,
  updateRowOrder,
}: RowActionsProps) => {
  const handleToFrontClick = useCallback(() => {
    updateRowOrder && updateRowOrder({ rowId: row.id, newRowIndex: 0 });
  }, [row.id, updateRowOrder]);

  const handleForwardClick = useCallback(() => {
    updateRowOrder &&
      updateRowOrder({ rowId: row.id, newRowIndex: Math.max(0, rowIndex - 1) });
  }, [row.id, rowIndex, updateRowOrder]);

  const handleBackwardClick = useCallback(() => {
    updateRowOrder &&
      updateRowOrder({ rowId: row.id, newRowIndex: rowIndex + 1 });
  }, [row.id, rowIndex, updateRowOrder]);

  const handleToBackClick = useCallback(() => {
    updateRowOrder &&
      updateRowOrder({
        rowId: row.id,
        newRowIndex: totalRows ? totalRows - 1 : rowIndex,
      });
  }, [row.id, rowIndex, totalRows, updateRowOrder]);

  return (
    <>
      {rowActionMenuItems && <>{rowActionMenuItems(row)}</>}
      {rowActionMenuItems && updateRowOrder && <hr />}
      {updateRowOrder && (
        <>
          <MenuItem
            isDisabled={rowIndex <= 0 || isRowReorderingDisabled}
            onClick={handleToFrontClick}
          >
            <ArrowTopIcon /> <Trans i18nKey="table.reorder.tofront" />
          </MenuItem>
          <MenuItem
            isDisabled={rowIndex <= 0 || isRowReorderingDisabled}
            onClick={handleForwardClick}
          >
            <ArrowUpIcon /> <Trans i18nKey="table.reorder.forward" />
          </MenuItem>
          <MenuItem
            isDisabled={
              (totalRows ? rowIndex >= totalRows - 1 : false) ||
              isRowReorderingDisabled
            }
            onClick={handleBackwardClick}
          >
            <ArrowDownIcon /> <Trans i18nKey="table.reorder.backward" />
          </MenuItem>
          {totalRows && (
            <MenuItem
              isDisabled={rowIndex >= totalRows - 1 || isRowReorderingDisabled}
              onClick={handleToBackClick}
            >
              <ArrowBottomIcon /> <Trans i18nKey="table.reorder.toback" />
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
