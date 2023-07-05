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
import { ReactNode, memo, useCallback, useContext } from "react";

import { MenuContext } from "./MenuContext";

export type MenuItemProps = {
  children: ReactNode;
  content?: string;
  hasInitialFocus?: boolean;
  isSelected?: boolean;
  isDestructive?: boolean;
  onClick?: MuiMenuItemProps["onClick"];
  rel?: string;
  rev?: string;
  value?: string;
};

const MenuItem = ({
  children,
  content,
  hasInitialFocus,
  isSelected,
  isDestructive,
  onClick: onClickProp,
  rel,
  rev,
  value,
}: MenuItemProps) => {
  const { closeMenu } = useContext(MenuContext);

  const onClick = useCallback(
    (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
      onClickProp?.(event);
      closeMenu();
    },
    [onClickProp, closeMenu]
  );

  return (
    <MuiMenuItem
      content={content}
      /* eslint-disable-next-line jsx-a11y/no-autofocus */
      autoFocus={hasInitialFocus}
      selected={isSelected}
      rel={rel}
      rev={rev}
      value={value}
      onClick={onClick}
      className={
        isDestructive ? `${menuItemClasses.root}-destructive` : undefined
      }
    >
      {children}
    </MuiMenuItem>
  );
};

const MemoizedMenuItem = memo(MenuItem);
MemoizedMenuItem.displayName = "MenuItem";

export { MemoizedMenuItem as MenuItem };
