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

import { memo, forwardRef } from "react";
import { MenuItem as MuiMenuItem } from "@mui/material";
import { menuItemClasses } from "@mui/material/MenuItem";
import type { MenuItemProps as MuiMenuItemProps } from "@mui/material";

export interface MenuItemProps
  extends Omit<
    MuiMenuItemProps,
    | "component"
    | "dense"
    | "disableGutters"
    | "divider"
    | "focusVisibleClassName"
  > {
  /**
   * Toggles whether or not the MenuItem represents a destructive action.
   */
  isDestructive?: boolean;
}

const MenuItem = forwardRef<HTMLLIElement, MenuItemProps>(
  ({ isDestructive, ...props }, ref) => (
    <MuiMenuItem
      {...props}
      ref={ref}
      className={
        isDestructive ? `${menuItemClasses.root}-destructive` : undefined
      }
    >
      {props.children}
    </MuiMenuItem>
  )
);

const MemoizedMenuItem = memo(MenuItem);

export { MemoizedMenuItem as MenuItem };
