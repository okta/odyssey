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
  Button,
  buttonSizeValues,
  buttonVariantValues,
  MenuItem,
  useUniqueId,
} from "./";
import { Divider, ListSubheader, Menu } from "@mui/material";
import { ChevronDownIcon, MoreIcon } from "./icons.generated";
import { memo, type ReactElement, useCallback, useMemo, useState } from "react";

import { MenuContext, MenuContextType } from "./MenuContext";
import { NullElement } from "./NullElement";
import type { SeleniumProps } from "./SeleniumProps";

export type MenuButtonProps = {
  /**
   * The ARIA label for the Button
   */
  ariaLabel?: string;
  /**
   * The ID of the element that labels the Button
   */
  ariaLabelledBy?: string;
  /**
   * The ID of the element that describes the Button
   */
  ariaDescribedBy?: string;
  /**
   * The label on the triggering Button
   */
  buttonLabel?: string;
  /**
   * The variant of the triggering Button
   */
  buttonVariant?: (typeof buttonVariantValues)[number];
  /**
   * The <MenuItem> components within the Menu.
   */
  children: Array<
    | ReactElement<typeof MenuItem | typeof Divider | typeof ListSubheader>
    | NullElement
  >;
  /**
   * The end Icon on the trigggering Button
   */
  endIcon?: ReactElement;
  /**
   * The id of the Button
   */
  id?: string;
  /**
   * If the MenuButton is an overflow menu or standard menu.
   */
  isOverflow?: boolean;
  /**
   * The size of the button
   */
  size?: (typeof buttonSizeValues)[number];
  /**
   * The tooltip text for the Button if it's icon-only
   */
  tooltipText?: string;
} & (
  | {
      ariaLabel?: string;
      ariaLabelledBy?: string;
      buttonLabel: string;
    }
  | {
      ariaLabel: string;
      ariaLabelledBy?: string;
      buttonLabel?: undefined | "";
    }
  | {
      ariaLabel?: string;
      ariaLabelledBy: string;
      buttonLabel?: undefined | "";
    }
) &
  SeleniumProps;

const MenuButton = ({
  ariaLabel,
  ariaLabelledBy,
  ariaDescribedBy,
  buttonLabel = "",
  buttonVariant = "secondary",
  children,
  endIcon: endIconProp,
  id: idOverride,
  isOverflow,
  size,
  testId,
  tooltipText,
}: MenuButtonProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const isOpen = Boolean(anchorEl);

  const closeMenu = useCallback<MenuContextType["closeMenu"]>(() => {
    setAnchorEl(null);
  }, []);

  const openMenu = useCallback<MenuContextType["openMenu"]>((event) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const uniqueId = useUniqueId(idOverride);

  const menuListProps = useMemo(
    () => ({ "aria-labelledby": `${uniqueId}-button` }),
    [uniqueId]
  );

  const providerValue = useMemo<MenuContextType>(
    () => ({
      closeMenu,
      openMenu,
    }),
    [closeMenu, openMenu]
  );

  const endIcon = endIconProp ? (
    endIconProp
  ) : isOverflow ? (
    <MoreIcon />
  ) : (
    <ChevronDownIcon />
  );

  return (
    <div>
      <Button
        aria-controls={isOpen ? `${uniqueId}-menu` : undefined}
        aria-expanded={isOpen ? "true" : undefined}
        aria-haspopup="true"
        ariaDescribedBy={ariaDescribedBy}
        ariaLabel={ariaLabel}
        ariaLabelledBy={ariaLabelledBy}
        data-se={testId}
        endIcon={endIcon}
        id={`${uniqueId}-button`}
        label={buttonLabel}
        onClick={openMenu}
        size={size}
        tooltipText={tooltipText}
        variant={buttonVariant}
      />

      <Menu
        anchorEl={anchorEl}
        id={`${uniqueId}-menu`}
        MenuListProps={menuListProps}
        onClose={closeMenu}
        open={isOpen}
      >
        <MenuContext.Provider value={providerValue}>
          {children}
        </MenuContext.Provider>
      </Menu>
    </div>
  );
};

const MemoizedMenuButton = memo(MenuButton);
MemoizedMenuButton.displayName = "MenuButton";

export { MemoizedMenuButton as MenuButton };
