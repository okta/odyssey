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

import { memo, useCallback, Dispatch, SetStateAction } from "react";
import { MRT_RowData, MRT_RowSelectionState } from "material-react-table";
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";

import { Box } from "../../Box";
import { Button, MenuButton } from "../../Buttons";
import { ChevronDownIcon } from "../../icons.generated";
import { UniversalProps } from "./componentTypes";
import {
  DesignTokens,
  useOdysseyDesignTokens,
} from "../../OdysseyDesignTokensContext";

export type BulkActionsMenuProps = {
  data: MRT_RowData[];
  menuItems: UniversalProps["bulkActionMenuItems"];
  rowSelection: MRT_RowSelectionState;
  setRowSelection: Dispatch<SetStateAction<MRT_RowSelectionState>>;
};

const BulkActionsContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{
  odysseyDesignTokens: DesignTokens;
}>(({ odysseyDesignTokens }) => ({
  display: "flex",
  gap: odysseyDesignTokens.Spacing2,
}));

const BulkActionsMenu = ({
  data,
  menuItems,
  rowSelection,
  setRowSelection,
}: BulkActionsMenuProps) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();
  const { t } = useTranslation();

  const selectedRowCount = Object.values(rowSelection).filter(Boolean).length;

  const handleSelectAll = useCallback(() => {
    const rows = Object.fromEntries(data.map((row) => [row.id, true]));
    setRowSelection(rows);
  }, [data, setRowSelection]);

  const handleSelectNone = useCallback(() => {
    setRowSelection({});
  }, [setRowSelection]);

  return (
    <BulkActionsContainer odysseyDesignTokens={odysseyDesignTokens}>
      {selectedRowCount > 0 && (
        <MenuButton
          ariaLabel="More actions"
          buttonLabel={t("table.actions.selectsome", { selectedRowCount })}
          buttonVariant="primary"
          endIcon={<ChevronDownIcon />}
        >
          {menuItems?.(rowSelection)}
        </MenuButton>
      )}
      <Box>
        <Button
          isDisabled={selectedRowCount === data.length} // Disabled if all are selected
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

const MemoizedBulkActionsMenu = memo(BulkActionsMenu);
MemoizedBulkActionsMenu.displayName = "BulkActionsMenu";

export { MemoizedBulkActionsMenu as BulkActionsMenu };
