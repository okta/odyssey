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

import { Box as MuiBox } from "@mui/material";
import { MRT_Row, MRT_RowData } from "material-react-table";
import { Fragment, memo, ReactElement, useCallback } from "react";
import { Trans, useTranslation } from "react-i18next";

import {
  Button,
  MenuButton,
  MenuButtonProps,
  MenuItem,
} from "../Buttons/index.js";
import {
  ArrowBottomIcon,
  ArrowDownIcon,
  ArrowTopIcon,
  ArrowUpIcon,
  MoreIcon,
} from "../icons.generated/index.js";
import { DataTableProps } from "./DataTable.js";

export type DataTableRowActionsProps = {
  row: (MRT_Row<MRT_RowData> | MRT_RowData) & { id: string };
  rowActionButtons?: (
    row: MRT_RowData,
  ) => ReactElement<typeof Button | typeof Fragment>;
  rowActionMenuItems?: (row: MRT_RowData) => MenuButtonProps["children"];
  rowIndex: number;
  totalRows?: DataTableProps["totalRows"];
  updateRowOrder?: ({
    rowId,
    newRowIndex,
  }: {
    newRowIndex: number;
    rowId: string;
  }) => void;
};

const DataTableRowActions = ({
  row,
  rowIndex,
  rowActionButtons,
  rowActionMenuItems,
  totalRows,
  updateRowOrder,
}: DataTableRowActionsProps) => {
  const { t } = useTranslation();

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
    <MuiBox display="flex">
      {rowActionButtons?.(row)}
      {(rowActionMenuItems || updateRowOrder) && (
        <MenuButton
          ariaLabel={t("table.moreactions.arialabel")}
          buttonVariant="floating"
          endIcon={<MoreIcon />}
          menuAlignment="right"
          size="small"
        >
          {rowActionMenuItems && <>{rowActionMenuItems(row)}</>}
          {rowActionMenuItems && updateRowOrder && <hr />}
          {updateRowOrder && (
            <>
              <MenuItem isDisabled={rowIndex <= 0} onClick={handleToFrontClick}>
                <ArrowTopIcon /> <Trans i18nKey="table.reorder.tofront" />
              </MenuItem>
              <MenuItem isDisabled={rowIndex <= 0} onClick={handleForwardClick}>
                <ArrowUpIcon /> <Trans i18nKey="table.reorder.forward" />
              </MenuItem>
              <MenuItem
                isDisabled={totalRows ? rowIndex >= totalRows - 1 : false}
                onClick={handleBackwardClick}
              >
                <ArrowDownIcon /> <Trans i18nKey="table.reorder.backward" />
              </MenuItem>
              {totalRows && (
                <MenuItem
                  isDisabled={rowIndex >= totalRows - 1}
                  onClick={handleToBackClick}
                >
                  <ArrowBottomIcon /> <Trans i18nKey="table.reorder.toback" />
                </MenuItem>
              )}
            </>
          )}
        </MenuButton>
      )}
    </MuiBox>
  );
};

const MemoizedDataTableRowActions = memo(DataTableRowActions);
MemoizedDataTableRowActions.displayName = "DataTableRowActions";

export { MemoizedDataTableRowActions as DataTableRowActions };
