/*!
 * Copyright (c) 2024-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import styled from "@emotion/styled";
import { MRT_RowData, MRT_RowSelectionState } from "material-react-table";
import { Dispatch, memo, SetStateAction, useCallback, useMemo } from "react";

import { Box } from "../../Box.js";
import { Button } from "../../Buttons/Button.js";
import { MenuButton } from "../../Buttons/MenuButton.js";
import { useTranslation } from "../../i18n.generated/i18n.js";
import { ChevronDownIcon } from "../../icons.generated/index.js";
import {
  DesignTokens,
  useOdysseyDesignTokens,
} from "../../OdysseyDesignTokensContext.js";
import { UniversalProps } from "./componentTypes.js";
import { GetRowId } from "./dataTypes.js";

export type BulkActionsMenuProps<TData extends MRT_RowData> = {
  data: TData[];
  getRowId: GetRowId<TData>;
  isRowSelectionDisabled?: UniversalProps<TData>["isRowSelectionDisabled"];
  menuItems: UniversalProps<TData>["bulkActionMenuItems"];
  rowSelection: MRT_RowSelectionState;
  setRowSelection: Dispatch<SetStateAction<MRT_RowSelectionState>>;
};

type BulkActionsMenuComponent = (<TData extends MRT_RowData>(
  props: BulkActionsMenuProps<TData>,
) => React.ReactNode) & { displayName?: string };

const BulkActionsContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{
  odysseyDesignTokens: DesignTokens;
}>(({ odysseyDesignTokens }) => ({
  display: "flex",
  gap: odysseyDesignTokens.Spacing2,
}));

const BulkActionsMenu = <TData extends MRT_RowData>({
  data,
  getRowId,
  isRowSelectionDisabled,
  menuItems,
  rowSelection,
  setRowSelection,
}: BulkActionsMenuProps<TData>) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();
  const { t } = useTranslation();

  const selectedRowCount = Object.values(rowSelection).filter(Boolean).length;

  // The selection keeps rows that are not on screen (other pages, rows hidden by search or filters) and can hold disabled rows, so a count of every selected row says nothing about the selectable rows on screen.
  const isEveryPageRowSelected = useMemo(
    () =>
      data
        .map((row, index) => [getRowId(row, index), row] as const)
        .filter(([, row]) => !isRowSelectionDisabled?.(row))
        .every(([rowId]) => rowSelection[rowId]),
    [data, getRowId, isRowSelectionDisabled, rowSelection],
  );

  const handleSelectAll = useCallback(() => {
    const pageRowSelection = Object.fromEntries(
      data
        .map((row, index) => [getRowId(row, index), row] as const)
        .filter(([, row]) => !isRowSelectionDisabled?.(row))
        .map(([rowId]) => [rowId, true]),
    );
    // `data` is only the current page, and selection persists across pages, so keys from other pages are kept rather than replaced. This matches the header checkbox, which spreads the previous selection too.
    setRowSelection({ ...rowSelection, ...pageRowSelection });
  }, [data, getRowId, isRowSelectionDisabled, rowSelection, setRowSelection]);

  const handleSelectNone = useCallback(() => {
    setRowSelection({});
  }, [setRowSelection]);

  return (
    <BulkActionsContainer odysseyDesignTokens={odysseyDesignTokens}>
      {selectedRowCount > 0 && (
        <MenuButton
          ariaLabel={t("table.actions.arialabel")}
          buttonLabel={t("table.actions.selectsome", { selectedRowCount })}
          buttonVariant="primary"
          endIcon={<ChevronDownIcon />}
        >
          {menuItems?.(rowSelection)}
        </MenuButton>
      )}
      <Box>
        <Button
          isDisabled={isEveryPageRowSelected}
          label={t("table.actions.selectall")}
          onClick={handleSelectAll}
          variant="secondary"
        />
        <Button
          isDisabled={selectedRowCount === 0} // Disabled if none are selected
          label={t("table.actions.selectnone")}
          onClick={handleSelectNone}
          variant="secondary"
        />
      </Box>
    </BulkActionsContainer>
  );
};

const MemoizedBulkActionsMenu = memo(
  BulkActionsMenu,
) as BulkActionsMenuComponent;
MemoizedBulkActionsMenu.displayName = "BulkActionsMenu";

export { MemoizedBulkActionsMenu as BulkActionsMenu };
