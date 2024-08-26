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
  memo,
  type ReactElement,
  useCallback,
  useMemo,
  useState,
  ReactNode,
} from "react";
import { Menu as MuiMenu, PopoverOrigin } from "@mui/material";

import { Button, buttonSizeValues, buttonVariantValues, useUniqueId } from "./";
import { ChevronDownIcon, MoreIcon } from "./icons.generated";
import { FieldComponentProps } from "./FieldComponentProps";
import { MenuContext, MenuContextType } from "./MenuContext";
import { NullElement } from "./NullElement";
import type { HtmlProps } from "./HtmlProps";

export const menuAlignmentValues = ["left", "right"] as const;

export type MenuButtonProps = {
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
  children: ReactNode | NullElement;
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
   * The horizontal alignment of the menu.
   */
  menuAlignment?: (typeof menuAlignmentValues)[number];
  /**
   * If true (the default), the menu will close when a child MenuItem is clicked.
   * Otherwise, it will remain open.
   */
  shouldCloseOnSelect?: boolean;
  /**
   * The size of the button
   */
  size?: (typeof buttonSizeValues)[number];
  /**
   * The tooltip text for the Button if it's icon-only
   */
  tooltipText?: string;
  /**
   * The event handler if the menu button is clickable.
   */
  onClickMenuButton?: React.MouseEventHandler<HTMLButtonElement>;
} & Pick<
  HtmlProps,
  "ariaDescribedBy" | "ariaLabel" | "ariaLabelledBy" | "testId" | "translate"
> &
  Pick<FieldComponentProps, "isDisabled"> &
  (
    | { buttonLabel: string }
    | (Required<Pick<HtmlProps, "ariaLabelledBy">> &
        Partial<Pick<HtmlProps, "ariaLabel">> & {
          buttonLabel?: undefined | "";
        })
    | (Required<Pick<HtmlProps, "ariaLabel">> &
        Partial<Pick<HtmlProps, "ariaLabelledBy">> & {
          buttonLabel?: undefined | "";
        })
  );

const MenuButton = ({
  ariaLabel,
  ariaLabelledBy,
  ariaDescribedBy,
  buttonLabel = "",
  buttonVariant = "secondary",
  children,
  shouldCloseOnSelect = true,
  endIcon: endIconProp,
  id: idOverride,
  isDisabled,
  isOverflow,
  menuAlignment = "left",
  size,
  testId,
  tooltipText,
  translate,
  onClickMenuButton,
}: MenuButtonProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const isOpen = Boolean(anchorEl);

  const closeMenu = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const openMenu = useCallback<MenuContextType["openMenu"]>((event) => {
    if (onClickMenuButton) {
      onClickMenuButton(event as React.MouseEvent<HTMLButtonElement>);
      return;
    }
    setAnchorEl(event.currentTarget);
  }, []);

  const uniqueId = useUniqueId(idOverride);

  const menuListProps = useMemo(
    () => ({ "aria-labelledby": `${uniqueId}-button` }),
    [uniqueId],
  );

  const providerValue = useMemo<MenuContextType>(
    () => ({
      closeMenu,
      openMenu,
      shouldCloseOnSelect,
    }),
    [closeMenu, openMenu, shouldCloseOnSelect],
  );

  const endIcon = endIconProp ? (
    endIconProp
  ) : isOverflow ? (
    <MoreIcon />
  ) : (
    <ChevronDownIcon />
  );

  const anchorOrigin = useMemo(
    () =>
      ({
        horizontal: menuAlignment,
        vertical: "bottom",
      }) as PopoverOrigin,
    [menuAlignment],
  );

  const transformOrigin = useMemo(
    () =>
      ({
        horizontal: menuAlignment,
        vertical: "top",
      }) as PopoverOrigin,
    [menuAlignment],
  );

  return (
    <div>
      <Button
        ariaControls={isOpen ? `${uniqueId}-menu` : undefined}
        ariaExpanded={isOpen ? "true" : undefined}
        ariaHasPopup="true"
        ariaDescribedBy={ariaDescribedBy}
        ariaLabel={ariaLabel}
        ariaLabelledBy={ariaLabelledBy}
        testId={testId}
        endIcon={endIcon}
        id={`${uniqueId}-button`}
        isDisabled={isDisabled}
        label={buttonLabel}
        onClick={openMenu}
        size={size}
        tooltipText={tooltipText}
        translate={translate}
        variant={buttonVariant}
      />

      <MuiMenu
        anchorOrigin={anchorOrigin}
        transformOrigin={transformOrigin}
        anchorEl={anchorEl}
        id={`${uniqueId}-menu`}
        MenuListProps={menuListProps}
        onClose={closeMenu}
        open={isOpen}
      >
        <MenuContext.Provider value={providerValue}>
          {children}
        </MenuContext.Provider>
      </MuiMenu>
    </div>
  );
};

const MemoizedMenuButton = memo(MenuButton);
MemoizedMenuButton.displayName = "MenuButton";

export { MemoizedMenuButton as MenuButton };
