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
import { memo, type ReactNode, useCallback, useContext } from "react";

import type { HtmlProps } from "../HtmlProps.js";

import { MenuContext } from "./MenuContext.js";

export type MenuItemProps = {
  /**
   * Label or content rendered inside the clickable menu item row.
   */
  children: ReactNode;
  /**
   * If `true`, the menu item receives focus automatically when the menu opens.
   */
  hasInitialFocus?: boolean;
  /**
   * If `true`, the menu item is visually and functionally disabled.
   */
  isDisabled?: boolean;
  /**
   * If `true`, the menu item is visually marked as the current selection.
   */
  isSelected?: boolean;
  /**
   * Called when the menu item is clicked.
   */
  onClick?: MuiMenuItemProps["onClick"];
  /**
   * The value associated with the menu item.
   */
  value?: string;
  /**
   * Controls the visual style of the menu item.
   * - If `'default'`, standard menu item appearance.
   * - If `'destructive'`, red text and icon, indicating a destructive or irreversible action.
   * @default "default"
   */
  variant?: "default" | "destructive";
} & Pick<HtmlProps, "id" | "testId">;

/**
 * An individual action item rendered inside a Menu. Supports default and destructive visual
 * variants, disabled and selected states, and auto-closes the parent Menu on click by default.
 */
const MenuItem = ({
  children,
  hasInitialFocus,
  id,
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
      aria-current={isSelected}
      /* eslint-disable-next-line jsx-a11y/no-autofocus */
      autoFocus={hasInitialFocus}
      className={
        variant === "destructive"
          ? `${menuItemClasses.root}-destructive`
          : undefined
      }
      data-se={testId}
      disabled={isDisabled}
      id={id}
      onClick={onClick}
      selected={isSelected}
      tabIndex={0}
      value={value}
    >
      {children}
    </MuiMenuItem>
  );
};

const MemoizedMenuItem = memo(MenuItem);
MemoizedMenuItem.displayName = "MenuItem";

export { MemoizedMenuItem as MenuItem };
