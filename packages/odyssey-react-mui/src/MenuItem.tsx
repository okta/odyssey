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

import {
  MenuItem as MuiMenuItem,
  MenuItemProps as MuiMenuItemProps,
} from "@mui/material";
import { menuItemClasses } from "@mui/material/MenuItem";
import {
  memo,
  useCallback,
  useContext,
  type MouseEventHandler,
  type ReactNode,
} from "react";

import { MenuContext } from "./MenuContext";

export type MenuItemProps = {
  children: ReactNode;
  hasInitialFocus?: boolean;
  isSelected?: boolean;
  isDestructive?: boolean;
  onClick?: MuiMenuItemProps["onClick"];
  value?: string;
  variant?: "default" | "destructive";
};

const MenuItem = ({
  children,
  hasInitialFocus,
  isSelected,
  onClick: onClickProp,
  value,
  variant = "default",
}: MenuItemProps) => {
  const { closeMenu } = useContext(MenuContext);

  const onClick = useCallback<MouseEventHandler<HTMLLIElement>>(
    (event) => {
      onClickProp?.(event);
      closeMenu();
    },
    [onClickProp, closeMenu]
  );

  return (
    <MuiMenuItem
      /* eslint-disable-next-line jsx-a11y/no-autofocus */
      autoFocus={hasInitialFocus}
      selected={isSelected}
      value={value}
      onClick={onClick}
      className={
        variant === "destructive"
          ? `${menuItemClasses.root}-destructive`
          : undefined
      }
    >
      {children}
    </MuiMenuItem>
  );
};

const MemoizedMenuItem = memo(MenuItem);
MemoizedMenuItem.displayName = "MenuItem";

export { MemoizedMenuItem as MenuItem };
