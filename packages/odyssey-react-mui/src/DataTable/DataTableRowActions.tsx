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
import { Fragment, ReactElement, memo } from "react";
import { Button } from "../Button";
import { MenuItem } from "../MenuItem";
import { Box as MuiBox } from "@mui/material";
import { MenuButton, MenuButtonProps } from "../MenuButton";
import {
  ArrowBottomIcon,
  ArrowDownIcon,
  ArrowTopIcon,
  ArrowUpIcon,
  MoreIcon,
} from "../icons.generated";
import { DataTableProps } from "./DataTable";
import { Trans, useTranslation } from "react-i18next";

export type DataTableRowActionsProps = {
  row: MRT_Row<MRT_RowData>;
  rowIndex: number;
  rowActionButtons?: (
    row: MRT_RowData,
  ) => ReactElement<typeof Button | typeof Fragment>;
  rowActionMenuItems?: (row: MRT_RowData) => MenuButtonProps["children"];
  totalRows?: DataTableProps["totalRows"];
  updateRowOrder?: ({
    rowId,
    newRowIndex,
  }: {
    rowId: string;
    newRowIndex: number;
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
  return (
    <MuiBox display="flex">
      {rowActionButtons?.(row)}
      {(rowActionMenuItems || updateRowOrder) && (
        <MenuButton
          endIcon={<MoreIcon />}
          size="small"
          buttonVariant="floating"
          ariaLabel={t("table.moreactions.arialabel")}
          menuAlignment="right"
        >
          {rowActionMenuItems && <>{rowActionMenuItems(row)}</>}
          {rowActionMenuItems && updateRowOrder && <hr />}
          {updateRowOrder && (
            <>
              <MenuItem
                isDisabled={rowIndex <= 0}
                onClick={() =>
                  updateRowOrder({ rowId: row.id, newRowIndex: 0 })
                }
              >
                <ArrowTopIcon /> <Trans i18nKey="table.reorder.tofront" />
              </MenuItem>
              <MenuItem
                isDisabled={rowIndex <= 0}
                onClick={() =>
                  updateRowOrder({
                    rowId: row.id,
                    newRowIndex: rowIndex <= 0 ? 0 : rowIndex - 1,
                  })
                }
              >
                <ArrowUpIcon /> <Trans i18nKey="table.reorder.forward" />
              </MenuItem>
              <MenuItem
                isDisabled={totalRows ? rowIndex >= totalRows - 1 : false}
                onClick={() =>
                  updateRowOrder({
                    rowId: row.id,
                    newRowIndex: rowIndex + 1,
                  })
                }
              >
                <ArrowDownIcon /> <Trans i18nKey="table.reorder.backward" />
              </MenuItem>
              <>
                {totalRows && (
                  <MenuItem
                    isDisabled={rowIndex >= totalRows - 1}
                    onClick={() =>
                      updateRowOrder({
                        rowId: row.id,
                        newRowIndex: totalRows,
                      })
                    }
                  >
                    <ArrowBottomIcon /> <Trans i18nKey="table.reorder.toback" />
                  </MenuItem>
                )}
              </>
            </>
          )}
        </MenuButton>
      )}
    </MuiBox>
  );
};

const MemoizedDataTableRowActions = memo(DataTableRowActions);
export { MemoizedDataTableRowActions as DataTableRowActions };
