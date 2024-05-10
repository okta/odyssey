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
import { memo, useCallback, useContext, type ReactNode } from "react";

import { MenuContext } from "./MenuContext";
import type { HtmlProps } from "./HtmlProps";

export type MenuItemProps = {
  /**
   * The content of the menu item.
   */
  children: ReactNode;
  /**
   * If `true`, the menu item will receive focus automatically.
   */
  hasInitialFocus?: boolean;
  /**
   * If `true`, the menu item will be visually marked as selected.
   */
  isSelected?: boolean;
  /**
   * If `true`, the menu item will be visually marked as disabled.
   */
  isDisabled?: boolean;
  /**
   * Callback fired when the menu item is clicked.
   */
  onClick?: MuiMenuItemProps["onClick"];
  /**
   * The value associated with the menu item.
   */
  value?: string;
  /**
   * The variant of the menu item.
   * - "default": The default variant.
   * - "destructive": A variant indicating a destructive action.
   */
  variant?: "default" | "destructive";
} & Pick<HtmlProps, "testId">;

const MenuItem = ({
  children,
  hasInitialFocus,
  isSelected,
  isDisabled,
  onClick: onClickProp,
  testId,
  value,
  variant = "default",
}: MenuItemProps) => {
  const { closeMenu, shouldCloseOnSelect } = useContext(MenuContext);

  const onClick = useCallback<NonNullable<MuiMenuItemProps["onClick"]>>(
    (event) => {
      onClickProp?.(event);
      if (shouldCloseOnSelect) {
        closeMenu();
      }
    },
    [onClickProp, closeMenu, shouldCloseOnSelect],
  );

  return (
    <MuiMenuItem
      /* eslint-disable-next-line jsx-a11y/no-autofocus */
      autoFocus={hasInitialFocus}
      className={
        variant === "destructive"
          ? `${menuItemClasses.root}-destructive`
          : undefined
      }
      data-se={testId}
      disabled={isDisabled}
      onClick={onClick}
      selected={isSelected}
      value={value}
      tabIndex={0}
    >
      {children}
    </MuiMenuItem>
  );
};

const MemoizedMenuItem = memo(MenuItem);
MemoizedMenuItem.displayName = "MenuItem";

export { MemoizedMenuItem as MenuItem };
