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
import { memo, useCallback, useContext, type ReactElement } from "react";

import { MenuContext } from "../MenuContext";
import type { SeleniumProps } from "../SeleniumProps";

export type IconMenuItemProps = {
  /**
   * If `true`, the menu item will receive focus automatically.
   */
  hasInitialFocus?: boolean;
  /**
   * Icon for the menu item.
   */
  icon: ReactElement;
  /**
   * If `true`, the menu item will be visually marked as selected.
   */
  isSelected?: boolean;
  /**
   * If `true`, the menu item will be visually marked as disabled.
   */
  isDisabled?: boolean;
  /**
   * Title of the menu item.
   */
  label: string;
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
} & SeleniumProps;

const IconMenuItem = ({
  hasInitialFocus,
  icon,
  isSelected,
  isDisabled,
  label,
  onClick: onClickProp,
  testId,
  value,
  variant = "default",
}: IconMenuItemProps) => {
  const { closeMenu } = useContext(MenuContext);

  const onClick = useCallback<NonNullable<MuiMenuItemProps["onClick"]>>(
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
    >
      {icon}
      {label}
    </MuiMenuItem>
  );
};

const MemoizedIconMenuItem = memo(IconMenuItem);
MemoizedIconMenuItem.displayName = "IconMenuItem";

export { MemoizedIconMenuItem as IconMenuItem };
