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

import { Box } from "../../Box";
import { Button } from "../../Button";
import { ChevronDownIcon } from "../../icons.generated";
import { MenuButton } from "../../MenuButton";
import { UniversalProps } from "./componentTypes";

export type BulkActionMenuProps = {
  data: MRT_RowData[];
  menuItems: UniversalProps["bulkActionMenuItems"];
  rowSelection: MRT_RowSelectionState;
  setRowSelection: Dispatch<SetStateAction<MRT_RowSelectionState>>;
};

const BulkActionMenu = ({
  data,
  menuItems,
  rowSelection,
  setRowSelection,
}: BulkActionMenuProps) => {
  const selectedRowCount = Object.values(rowSelection).filter(
    (value) => value === true,
  ).length;

  const handleSelectAll = useCallback(() => {
    const rows = Object.fromEntries(data.map((row) => [row.id, true]));
    setRowSelection(rows);
  }, [data, setRowSelection]);

  const handleSelectNone = useCallback(() => {
    setRowSelection({});
  }, [setRowSelection]);

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
      }}
    >
      {selectedRowCount > 0 && (
        <MenuButton
          ariaLabel="More actions"
          buttonLabel={`${selectedRowCount} selected`}
          buttonVariant="primary"
          endIcon={<ChevronDownIcon />}
        >
          {menuItems?.(rowSelection)}
        </MenuButton>
      )}
      <Box>
        <Button
          isDisabled={selectedRowCount === 20}
          label="Select all"
          onClick={handleSelectAll}
          variant="secondary"
        />
        <Button
          isDisabled={selectedRowCount === 0}
          label="Select none"
          onClick={handleSelectNone}
          variant="secondary"
        />
      </Box>
    </Box>
  );
};

const MemoizedBulkActionMenu = memo(BulkActionMenu);
MemoizedBulkActionMenu.displayName = "BulkActionMenu";

export { MemoizedBulkActionMenu as BulkActionMenu };
