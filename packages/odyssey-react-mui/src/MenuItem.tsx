/*!
 * Copyright (c) 2022-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { ReactNode, memo } from "react";
import { MenuItem as MuiMenuItem } from "@mui/material";
import { menuItemClasses } from "@mui/material/MenuItem";

export type MenuItemProps = {
  hasInitialFocus?: boolean;
  children: ReactNode;
  isSelected?: boolean;
  isDestructive?: boolean;
};

const MenuItem = ({
  children,
  hasInitialFocus,
  isDestructive,
  isSelected,
}: MenuItemProps) => (
  <MuiMenuItem
    /* eslint-disable-next-line jsx-a11y/no-autofocus */
    autoFocus={hasInitialFocus}
    className={
      isDestructive ? `${menuItemClasses.root}-destructive` : undefined
    }
    selected={isSelected}
  >
    {children}
  </MuiMenuItem>
);

const MemoizedMenuItem = memo(MenuItem);
MemoizedMenuItem.displayName = "MenuItem";

export { MemoizedMenuItem as MenuItem };
