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

import { MRT_RowSelectionState } from "material-react-table";
import { memo } from "react";
import { UniversalProps } from "./types";
import { MenuButton } from "../../MenuButton";
import { MoreIcon } from "../../icons.generated";

export type BulkActionMenuProps = {
  menuItems: UniversalProps["bulkActionMenuItems"];
  rowSelection: MRT_RowSelectionState;
};

const BulkActionMenu = ({ menuItems, rowSelection }: BulkActionMenuProps) => (
  <MenuButton
    buttonVariant="secondary"
    endIcon={<MoreIcon />}
    isDisabled={Object.keys(rowSelection).length === 0}
    ariaLabel="More actions"
  >
    {menuItems?.(rowSelection)}
  </MenuButton>
);

const MemoizedBulkActionMenu = memo(BulkActionMenu);
MemoizedBulkActionMenu.displayName = "BulkActionMenu";

export { MemoizedBulkActionMenu as BulkActionMenu };
